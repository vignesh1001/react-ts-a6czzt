import React, { useEffect, useState } from 'react';
import {
  Avatar,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  AppBar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Dialog,
  Box,
  Typography,
  Paper,
  TableHead,
  IconButton,
  InputAdornment,
  Link
} from '@material-ui/core';
import Helper from '../../../../services/Helper';
import NavBar from '@components/Layouts/NavBar';
import Urls from '../../../../data/Urls';
import clsx from 'clsx';
import axios from 'axios';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { NotificationManager } from 'react-notifications';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import CustomDropdown from '@components/CustomDropdown/CustomDropdown';

function Groups({ classes, ...props }) {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [showModal, setShowModal] = React.useState(null);
  const [showGroupSubTab, setShowGroupSubTab] = React.useState(false);
  const [showGroupIndex, setShowGroupIndex] = React.useState(0);
  const [groupDetail, setGroupDetail] = React.useState({
    nameText: '',
    descText: '',
    groupList: []
  });
  useEffect(() => {
    if (props.token) {
      loadGroups();
    }
  }, [props.token]);

  const loadGroups = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/userGroupInformation`;
    axios
      .get(url, { headers: { Authorization: `Bearer ${props.token}` } })
      .then(response => {
        if (response.data) {
          setGroupDetail({ ...groupDetail, groupList: response.data });
          // setUserDetail({ ...userDetail, userList });
        }
      });
  };

  const handleDetailChange = prop => event => {
    let Obj = groupDetail[prop];
    if (event.target.type == 'checkbox') {
      Obj = event.target.checked;
    } else {
      Obj = event.target.value;
    }
    setGroupDetail({ ...groupDetail, [prop]: Obj });
  };

  const showConfirm = (modalName, userObj) => {
    setSelectedUser(userObj);
    setShowModal(modalName);
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
          console.log(resp);
          setSelectedUser(null);
          setShowModal(null);
        },
        errorResp => {
          console.log(errorResp);
        }
      );
  };

  const openMembersTab = () => {
    setShowGroupSubTab(true);
    setShowGroupIndex(1);
  };

  const openSettingsTab = () => {
    setShowGroupSubTab(true);
    setShowGroupIndex(0);
  };

  return (
    <>
      {showGroupSubTab ? (
        <GroupSubTabs
          showGroupIndex={showGroupIndex}
          setShowGroupSubTab={setShowGroupSubTab}
          groupMembers={groupMembers}
          {...props}
        />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 16px'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: '#000' }}>
                <strong>Manage Groups</strong>
              </div>
              <Button
                variant="contained"
                color="secondary"
                className={classes.buttonAddNew}
                startIcon={
                  <>
                    <i
                      className="fa fa-plus"
                      aria-hidden="true"
                      style={{ fontSize: 14 }}
                    />
                  </>
                }
                onClick={() => {}}
              >
                Create new group
              </Button>
            </div>
          </div>
          <div style={{ marginLeft: 16 }}>
            <span style={{ fontSize: 12, color: '#7d7c7c' }}>
              User can ne assigned to different groups (e.g terms, departments
              etc.) with specific standard spaces, group managers and
              permissions.
            </span>
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
              id="standard-adornment-admin-group-name"
              type={'text'}
              style={{
                border: '1px solid #949494',
                borderBottom: 'none',
                paddingLeft: 6
              }}
              value={groupDetail.nameText}
              onChange={handleDetailChange('nameText')}
              placeholder="Group Name"
            />
            <Input
              id="standard-adornment-admin-group-desc"
              type={'text'}
              style={{
                border: '1px solid #949494',
                borderBottom: 'none',
                paddingLeft: 6,
                marginLeft: 12
              }}
              value={groupDetail.descText}
              onChange={handleDetailChange('descText')}
              placeholder="Group Name"
            />
          </FormControl>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">Members</TableCell>
                  <TableCell align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {/*
                            {
                               "group.id": 1,
                               "name": "Administrator",
                               "description": "Administrator Group",
                               "members": 8
                            },
                            */}
                {groupDetail.groupList && groupDetail.groupList.length > 0 ? (
                  groupDetail.groupList.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        <div>{row.name}</div>
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.members}</TableCell>
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
                              onClick={() => openSettingsTab(row)}
                            >
                              Settings
                            </Button>,
                            <Button
                              style={{ padding: 0 }}
                              onClick={() => openMembersTab(row)}
                            >
                              Members
                            </Button>
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
            </Table>
          </TableContainer>
          <Dialog
            open={showModal !== null}
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
      )}
    </>
  );
}

export default Groups;
