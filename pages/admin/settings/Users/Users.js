import React, { useEffect } from 'react';
import {
  Avatar,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Paper,
  TableHead,
  IconButton,
  InputAdornment,
  Grid
} from '@material-ui/core';
import Helper from '../../../../services/Helper';
import Urls from '../../../../data/Urls';
import clsx from 'clsx';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import CustomDropdown from '@components/CustomDropdown/CustomDropdown';
import StorageKeys from '../../../../data/StorageKeys';
import { useRouter } from 'next/router';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 1);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 1}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 1}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

function Users({ classes, ...props }) {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [showModal, setShowModal] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [userDetail, setUserDetail] = React.useState({
    totalResults: '',
    searchUserText: '',
    searchUserType: 1,
    delete_Party_owner_transfer: false,
    deleteUserDetail: null,
    userMenuAnchor: null,
    userList: props.userList,
    userTypeList: [
      {
        value: 1,
        title: 'Active Users'
      },
      {
        value: 0,
        title: 'Disabled Users'
      },
      {
        value: 3,
        title: 'Deleted Users'
      }
    ]
  });
  const [showDelete, setShowDelete] = React.useState(false);
  const [totalNoOfRecords, setTotalNoOfRecords] = React.useState();
  useEffect(() => {
    if (props.token) {
      loadUsersByType();
    }
  }, [props.token]);

  useEffect(() => {
    setUserDetail({ ...userDetail, userList: props.userList });
  }, [props.userList]);

  const loadUsersSearch = () => {
    // https://stageapi.interplay.iterate.ai/searchUsers?searchUsers=mary&page=1&limit=5
    props.setUserList([]);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/searchUsers?${
      searchUserText ? `searchUsers=${searchUserText}&` : ``
    }page=${page}&limit=${rowsPerPage}&userStatus=1`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${props.token}` } })
      .then(response => {
        if (response.data && response.data.response) {
          const userList = response.data.response;
          setTotalNoOfRecords(response.data.pages || 0);
          userList.forEach(
            item =>
              (item.last_login_fmt = item.last_login
                ? moment(item.last_login, 'YYYY-MM-DD').format('MMM DD, YYYY')
                : '')
          );
          props.setUserList(userList);
          setUserDetail({ ...userDetail, totalResults: response.data.total });
          // setUserDetail({ ...userDetail, userList });
        }
      });
  };

  const loadUsersByType = (userStatus = 1, pageNo = 1) => {
    /*
      Active Users Status Should Be: 1
      Disabled Users Status Should Be: 0
      Deleted Users Status Should Be: 3
      https://stageapi.interplay.iterate.ai/userActiveStatus?userStatus=1&page=1&limit=5
    */
    props.setUserList([]);
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/userActiveStatus?userStatus=${userStatus}&page=${pageNo}&limit=20`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${props.token}` } })
      .then(response => {
        if (response.data && response.data.response) {
          const userList = response.data.response;
          userList.forEach(
            item =>
              (item.last_login_fmt = item.last_login
                ? moment(item.last_login, 'YYYY-MM-DD').format('MMM DD, YYYY')
                : '')
          );
          props.setUserList(userList);
          setUserDetail({ ...userDetail, totalResults: response.data.total });
        }
      });
  };

  /*** delete */
  const fetchDeleteDetails = userObj => {
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/userDetailForDelete?userID=${userObj.id}`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${props.token}` } })
      .then(
        resp => {
          setUserDetail({ ...userDetail, deleteUserDetail: resp.data });
          console.log(resp);
          setSelectedUser(userObj);
          setShowDelete(true);
        },
        errorResp => {
          console.log(errorResp);
        }
      );
  };

  const deleteUser = () => {
    const { delete_Party_owner_transfer } = userDetail;
    const { id, guid } = selectedUser;
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/deleteUser?userID=${id}&user_guid=${guid}&party_owner_transfer=${
      delete_Party_owner_transfer ? 1 : 0
    }`;
    /*axios.get(url,
                    { headers: { Authorization: `Bearer ${props.token}` } }).then(
                    resp => {
                        console.log(resp);
                        setSelectedUser(null);
                        setShowDelete(false);
                    }, errorResp => {
                        console.log(errorResp);
                    });*/
    alert(url);
  };

  const handleUserDetailChange = prop => event => {
    let Obj = userDetail[prop];
    if (event.target.type == 'checkbox') {
      Obj = event.target.checked;
    } else {
      Obj = event.target.value;
    }
    setUserDetail({ ...userDetail, [prop]: Obj });
    if (prop === 'userType') {
      loadUsersByType(Obj, 1);
    }
  };

  const showConfirm = (modalName, userObj) => {
    setSelectedUser(userObj);
    setShowModal(modalName);
  };

  const navigateToPath = pathName => {
    router.push(pathName).then();
  };

  const modalConfirmOK = () => {
    const { id } = selectedUser;
    const { id: adminID } = props.acccount;
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/impersonateUser?userID=${id}&adminID=${adminID}`;

    axios
      .get(url, { headers: { Authorization: `Bearer ${props.token}` } })
      .then(
        resp => {
          setSelectedUser(null);
          setShowModal(null);
          const { acccount, profile, token } = resp.data;
          localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(acccount));
          localStorage.setItem(StorageKeys.PROFILE, JSON.stringify(profile));
          localStorage.setItem(StorageKeys.TOKEN, token);
          navigateToPath('/profile/' + acccount.username);
        },
        errorResp => {
          console.log(errorResp);
        }
      );
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderDelete = () => (
    <Grid container>
      <Grid row>
        <Grid sm={12} xl={12} style={{ paddingBottom: 14 }}>
          <h3>Confirm user delete</h3>
        </Grid>
        <Grid style={{ paddingBottom: 12 }}>
          <span style={{ fontWeight: 'bold' }}>
            Are you sure that you want to delete following user?
          </span>
        </Grid>
        <div
          style={{ display: 'flex', alignItems: 'center', paddingBottom: 8 }}
        >
          <Avatar
            className="ml-2"
            src={`${Urls.downloadFileURL}${selectedUser.profile_id}`}
            style={{
              width: 45,
              height: 45,
              fontSize: 16,
              marginRight: 12
            }}
          >
            {Helper.getName(selectedUser)}
          </Avatar>
          <div>
            <div>{selectedUser.username}</div>
            <div>{selectedUser.email}</div>
          </div>
        </div>
        <hr />
      </Grid>
      <Grid container row>
        <div style={{ paddingBottom: 8 }}>
          <i
            className={'fa fa-exclamation-triangle'}
            aria-hidden="true"
            style={{ fontSize: 14, color: '#EC0101' }}
          />{' '}
          All the personal data of this user will be irrevocably deleted.
        </div>
        <Grid container row style={{ fontWeight: 'bold', paddingBottom: 8 }}>
          The User is the owner of these spaces:
        </Grid>
        {userDetail.deleteUserDetail.partyDetails &&
        userDetail.deleteUserDetail.partyDetails.length
          ? userDetail.deleteUserDetail.partyDetails.map(
              ({ name, color, description }) => {
                const displayName = name.split(' ');
                const avatarTxt = displayName[1]
                  ? displayName[0][0] + displayName[1][0]
                  : displayName[0][0];

                return (
                  <Grid>
                    <Avatar
                      variant="rounded"
                      className={`${classes.orange} party-list-avatar`}
                      style={{ backgroundColor: color ? color : '#b1c576' }}
                    >
                      {avatarTxt}
                    </Avatar>
                    <div className="party-list-item-text">
                      <strong>{name}</strong>
                      <div className="party-list-item-text-description">
                        {description}
                      </div>
                    </div>
                  </Grid>
                );
              }
            )
          : 'No spaces.'}
      </Grid>
      <Grid
        style={{
          display: 'flex',
          width: '100%',
          marginTop: 12,
          marginBottom: 12
        }}
      >
        <Input
          type={'checkbox'}
          name={'delete_space_checkbox'}
          id={'delete_space_checkbox'}
          style={{ width: 16 }}
          onChange={() =>
            setUserDetail({
              ...userDetail,
              delete_Party_owner_transfer: !userDetail.delete_Party_owner_transfer
            })
          }
        />
        <div>Delete spaces which are owned by this user.</div>
      </Grid>
      <div>
        If this option is not selected, the ownership of the spaces will be
        transferred to your account.
      </div>
      <Grid
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 40
        }}
      >
        <Button
          onClick={deleteUser}
          className={classes.buttonDelete}
          color="primary"
          autoFocus
        >
          Delete Account
        </Button>
        <Button
          onClick={() => setShowDelete(false)}
          className={classes.buttonPrimary}
          color="primary"
          autoFocus
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );

  return showDelete ? (
    renderDelete()
  ) : (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 16px'
        }}
      >
        <div>
          <strong>Overview</strong>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CustomDropdown
            left
            caret={false}
            hoverColor="info"
            buttonText={'Export'}
            buttonProps={{
              className: classes.buttonExport,
              style: {
                marginLeft: 12
              },
              color: 'transparent',
              startIcon: (
                <i
                  className="fa fa-download"
                  aria-hidden="true"
                  style={{ fontSize: 14 }}
                />
              ),
              endIcon: (
                <i
                  className="fa fa-sort-down"
                  aria-hidden="true"
                  style={{ marginTop: -6, fontSize: 18 }}
                />
              )
            }}
            dropdownList={[<Button style={{ padding: 0 }}>CSV</Button>]}
          />
        </div>
      </div>
      <FormControl
        className={clsx(classes.margin, classes.textField)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '90%'
        }}
      >
        <Input
          id="standard-adornment-user-basic-admin-settings-tags"
          type={'text'}
          style={{
            border: '1px solid #949494',
            borderBottom: 'none',
            borderRadius: '0 12px 12px 0',
            paddingLeft: 6
          }}
          value={userDetail.searchUserText}
          onChange={handleUserDetailChange('searchUserText')}
          placeholder="Search by name, email or id"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="Search by name, email or id"
                onClick={() => loadUsersSearch()}
                style={{
                  backgroundColor: '#EEE',
                  borderRadius: '0 12px 12px 0',
                  height: 35,
                  marginRight: -6
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
        <Select
          style={{
            border: '1px solid #949494',
            borderBottom: 'none',
            paddingLeft: 6
          }}
          labelId="standard-adornment-user-type"
          id="standard-adornment-user-type"
          value={userDetail.searchUserType}
          onChange={handleUserDetailChange('userType')}
        >
          {userDetail.userTypeList.map(userType => (
            <MenuItem value={userType.value}>{userType.title}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" />
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Last Login</TableCell>
              <TableCell align="left" />
            </TableRow>
          </TableHead>
          <TableBody>
            {userDetail.userList && userDetail.userList.length > 0 ? (
              userDetail.userList.map(row => (
                <TableRow key={row.name}>
                  <TableCell align="left">
                    <Avatar
                      className="ml-2"
                      src={`${Urls.downloadFileURL}${row.profile_id}`}
                      style={{
                        width: 24,
                        height: 24,
                        fontSize: 14
                      }}
                    >
                      {Helper.getName(row)}
                    </Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>{row.username}</div>
                    <span style={{ fontSize: 10 }}>{row.email}</span>
                  </TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.last_login_fmt}</TableCell>
                  <TableCell align="left">
                    <CustomDropdown
                      left
                      caret={false}
                      hoverColor="info"
                      buttonProps={{
                        className: classes.userActionsButton,
                        color: 'transparent',
                        startIcon: (
                          <i
                            className="fa fa-cog"
                            aria-hidden="true"
                            style={{ fontSize: 13 }}
                          />
                        ),
                        endIcon: (
                          <i
                            className="fa fa-sort-down"
                            aria-hidden="true"
                            style={{ marginTop: -6, fontSize: 16 }}
                          />
                        )
                      }}
                      dropdownList={[
                        <Button
                          style={{ padding: 0 }}
                          onClick={() =>
                            navigateToPath('/profile/settings/' + row.username)
                          }
                        >
                          Edit
                        </Button>,
                        <Button
                          style={{ padding: 0 }}
                          onClick={() => fetchDeleteDetails(row)}
                        >
                          Delete
                        </Button>,
                        <Button
                          style={{ padding: 0 }}
                          onClick={() => showConfirm('Impersonate', row)}
                        >
                          Impersonate
                        </Button>
                        // <Button
                        //     onClick={ () => navigateToPath('/profile/'+row.username) }
                        //     style={{ padding: 0 }}>
                        //     View Profile
                        // </Button>
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <p className={classes.tableMsg}>No results found.</p>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[20, 40, 60]}
                colSpan={3}
                count={totalNoOfRecords}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={(event, newPage) => {
                  setPage(newPage);
                }}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog
        open={showModal === 'Impersonate'}
        onClose={() => setShowModal(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.modelPopup}
      >
        <DialogTitle id="alert-dialog-title">
          <strong>Confirm </strong> Impersonate
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really sure that want to Impersonate this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonDelete}
            onClose={() => setShowModal(null)}
            color="primary"
            autoFocus
          >
            Cancel
          </Button>
          <Button
            className={classes.buttonPrimary}
            onClick={modalConfirmOK}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Users;
