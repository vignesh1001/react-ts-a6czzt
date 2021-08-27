import React from 'react';
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Box,
  Typography,
  Grid,
  Input,
  TextField,
  InputAdornment,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableRow,
  TableCell
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import Helper from '../../../../services/Helper';
import Urls from '../../../../data/Urls';

function GroupSetTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`group-sub-settings-simple-tabpanel-${index}`}
      aria-labelledby={`group-sub-settings-simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yPropsGroupSettings(index) {
  return {
    id: `group-sub-settings-simple-tab-${index}`,
    'aria-controls': `group-sub-settings-simple-tabpanel-${index}`
  };
}
function GroupSubTabs({
  classes = {},
  showGroupIndex = 1,
  setShowGroupSubTab,
  groupMembers,
  ...props
}) {
  const [groupInfo, setGroupInfo] = React.useState({
    groupName: '',
    groupDescription: '',
    groupVisibility: '',
    groupSortOrder: ''
  });

  const [groupMemberDetails, setGroupMemberDetails] = React.useState({
    searchUserText: '',
    addUserName: ''
  });

  const [userSettingsValue, setUserSettingsValue] = React.useState(
    showGroupIndex
  );

  React.useEffect(() => {}, []);

  const handleChangeUserSet = (event, newValue) => {
    setUserSettingsValue(newValue);
  };

  const saveGroupInfo = () => {
    props.updateGroupInfo(groupInfo);
  };

  const handleChange = (propName, event) => {
    groupInfo[propName] = event.target.value;
    setGroupInfo({ ...groupInfo });
  };

  const handleGroupDetailChange = propName => event => {
    groupMemberDetails[propName] = event.target.value;
  };

  return (
    <>
      <div
        className={classes.panelHeading}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h4>Manage Group: Administrator </h4>
        <Button
          onClick={() => setShowGroupSubTab(false)}
          className={classes.userActionsButton}
          style={{ fontSize: 10, color: '#807d7d', fontWeight: 600 }}
          startIcon={
            <i
              className="fa fa-arrow-left"
              aria-hidden="true"
              style={{ fontSize: 12, paddingRight: 5 }}
            />
          }
        >
          Back to overview
        </Button>
      </div>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={userSettingsValue}
            onChange={handleChangeUserSet}
            aria-label="simple tabs example"
          >
            <Tab label="Settings" {...a11yPropsGroupSettings(0)} />
            <Tab label="Members" {...a11yPropsGroupSettings(1)} />
          </Tabs>
        </AppBar>
        <GroupSetTabPanel value={userSettingsValue} index={0}>
          <Grid>Name</Grid>
          <Grid>
            <Input
              style={{
                margin: 0,
                marginBottom: 15,
                border: '2px solid #EEE',
                borderBottom: 'none'
              }}
              name="groupName"
              id="groupName"
              onChange={event => handleChange('groupName', event)}
              placeholder="Group Name"
            />
          </Grid>

          <Grid>Description</Grid>
          <Grid>
            <TextField
              InputProps={{
                style: {
                  marginBottom: 15,
                  border: '2px solid #EEE',
                  borderBottom: 'none',
                  margin: 0,
                  marginBottom: 15,
                  borderBottom: 'none',
                  marginLeft: -8
                }
              }}
              multiline
              type="text"
              rows={2}
              rowsMax={4}
              name="groupDescription"
              id="groupDescription"
              onChange={event => handleChange('groupDescription', event)}
              placeholder="Group Description"
            />
          </Grid>

          <Grid style={{ marginTop: 20 }}>Visibility</Grid>
          <Grid
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Input
              style={{ width: 16, margin: '0 4px 1px 0' }}
              type="checkbox"
              name="groupVisibility"
              id="groupVisibility"
              onChange={event => handleChange('groupVisibility', event)}
            />{' '}
            Show At Direction
          </Grid>

          <Grid style={{ marginTop: 20 }}>Sort order</Grid>
          <Grid
            style={{
              display: 'flex',
              margin: 0,
              alignItems: 'center'
            }}
          >
            <Input
              placeholder="Sort Order"
              style={{ margin: 0, border: '1px solid #EEE' }}
              type="text"
              name="groupSortOrder"
              id="groupSortOrder"
              onChange={event => handleChange('groupSortOrder', event)}
            />
          </Grid>
          <Grid
            style={{
              display: 'flex',
              width: '100%',
              margin: '14px 0 0 0',
              alignItems: 'center'
            }}
          >
            <Button className={classes.buttonPrimary}>Save</Button>
          </Grid>
        </GroupSetTabPanel>
        <GroupSetTabPanel value={userSettingsValue} index={1}>
          <Grid container>
            <Grid style={{ marginRight: 12 }}>
              <Input
                id="standard-adornment-admin-group-tags"
                type={'text'}
                style={{
                  border: '1px solid #949494',
                  borderBottom: 'none',
                  borderRadius: '0 12px 12px 0',
                  paddingLeft: 6
                }}
                value={groupMemberDetails.searchUserText}
                onChange={handleGroupDetailChange('searchUserText')}
                placeholder="Add new members..."
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Add New members"
                      onClick={() =>
                        loadUsersSearch(userDetail.searchUserText, 1)
                      }
                      style={{
                        backgroundColor: '#002851',
                        borderRadius: '0 12px 12px 0',
                        height: 35,
                        marginRight: -6,
                        color: '#FFF'
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid>
              <Input
                id="standard-adornment-user-basic-admin-settings-tags"
                type={'text'}
                style={{
                  border: '1px solid #949494',
                  borderBottom: 'none',
                  borderRadius: '0 12px 12px 0',
                  paddingLeft: 6
                }}
                value={groupMemberDetails.searchUserText}
                onChange={handleGroupDetailChange('searchUserText')}
                placeholder="Search by name, email or id"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Search by name, email or id"
                      onClick={() =>
                        loadUsersSearch(userDetail.searchUserText, 1)
                      }
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
            </Grid>
            <Grid>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" />
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Member since</TableCell>
                      <TableCell align="left" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groupMembers.map(row => (
                      <TableRow>
                        <TableCell>
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
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.membersince}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </GroupSetTabPanel>
      </div>
    </>
  );
}

export default GroupSubTabs;
