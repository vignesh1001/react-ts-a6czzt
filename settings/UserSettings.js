import {
  Button,
  FormControl,
  FormControlLabel,
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
  Typography
} from '@material-ui/core';

import clsx from 'clsx';

function UserSetTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-settings-simple-tabpanel-${index}`}
      aria-labelledby={`user-settings-simple-tab-${index}`}
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
function a11yPropsUserSettings(index) {
  return {
    id: `user-settings-simple-tab-${index}`,
    'aria-controls': `user-settings-simple-tabpanel-${index}`
  };
}
function UserSettings({ classes }) {
  const [userSettingsValue, setUserSettingsValue] = React.useState(0);
  const [userSettings, setUserSettings] = React.useState({
    tags: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Tags cannot be blank.'
    },
    language: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Language cannot be blank.'
    },
    timezone: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'TimeZone cannot be blank.'
    },
    profileVisibility: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Profile visibility cannot be blank.'
    },
    hideIntroductionTourPanelOnDashboard: {
      value: false,
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Hide introduction tour panel on dashboard cannot be blank.'
    }
  });
  const [userTopicSettings, setUserTopicSettings] = React.useState({
    topic: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Topic cannot be blank.'
    },
    userSettingsTopicArr: {
      value: [],
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Topic cannot be blank.'
    }
  });
  const [editTopic, setEditTopic] = React.useState({
    name: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Name cannot be blank.'
    },
    sortOrder: {
      value: 0,
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Sort Order cannot be blank.'
    }
  });
  const [openTopicDelete, setOpenTopicDelete] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleChangeUserSet = (event, newValue) => {
    setUserSettingsValue(newValue);
  };
  const handleChangeUserSettings = prop => event => {
    let Obj = userSettings[prop];
    if (event.target.type == 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setUserSettings({ ...userSettings, [prop]: Obj });
  };
  const handleChangeUserTopicSettings = prop => event => {
    let Obj = userTopicSettings[prop];
    if (event.target.type == 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setUserTopicSettings({ ...userTopicSettings, [prop]: Obj });
  };
  const handleUserTopicSettingsSubmit = () => event => {
    Object.keys(userTopicSettings).map(function(key, index) {
      let Obj = userTopicSettings[key];
      if (Obj.validation && Obj.value == '') {
        Obj['isError'] = true;
      } else {
        Obj['isError'] = false;
      }
      setUserTopicSettings({ ...userTopicSettings, [key]: Obj });
    });
    let topic = userTopicSettings['topic'];
    let userSettingsTopicArr = userTopicSettings['userSettingsTopicArr'];
    if (topic.value != '') {
      let myObj = {};
      myObj.name = topic.value;
      myObj.sortOrder = 0;
      myObj.action = '<Filter/Edit/Delete button>';
      userSettingsTopicArr.value.push(myObj);
      topic.value = '';
    }
    setUserTopicSettings({
      ...userTopicSettings,
      ['userSettingsTopicArr']: userSettingsTopicArr,
      ['topic']: topic
    });
    console.log(userTopicSettings);
  };
  const handleUserBasicSettingsSubmit = () => event => {
    let isError = false;
    Object.keys(userSettings).map(function(key, index) {
      let Obj = userSettings[key];
      if (Obj.validation && Obj.value == '') {
        Obj['isError'] = true;
        isError = true;
      } else {
        Obj['isError'] = false;
      }
      setUserSettings({ ...userSettings, [key]: Obj });
    });
    if (isError) {
      console.log('Error: Fill required inputs');
      return false;
    }
    console.log(userSettings);
  };
  const handleClickOpenTopicDelete = prop => event => {
    setOpenTopicDelete(true);
    console.log(prop);
  };
  const handleChangeEditTopic = prop => event => {
    let Obj = editTopic[prop];
    if (event.target.type == 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setEditTopic({ ...editTopic, [prop]: Obj });
  };
  const handleCloseTopicDelete = () => {
    setOpenTopicDelete(false);
  };
  const handleClickOpen = prop => event => {
    setOpen(true);
    let ObjName = editTopic['name'];
    let ObjSortOrder = editTopic['sortOrder'];
    ObjName.value = prop.name;
    ObjSortOrder.value = prop.sortOrder;
    setEditTopic({
      ...editTopic,
      ['name']: ObjName,
      ['sortOrder']: ObjSortOrder
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.panelHeading}>
        {userSettingsValue == 0 ? (
          <>
            <strong>User</strong> Settings
          </>
        ) : (
          <>
            <strong>Topic</strong> Overview
          </>
        )}
      </div>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={userSettingsValue}
            onChange={handleChangeUserSet}
            aria-label="simple tabs example"
          >
            <Tab label="Basic Settings" {...a11yPropsUserSettings(0)} />
            <Tab label="Topics" {...a11yPropsUserSettings(1)} />
          </Tabs>
        </AppBar>
        <UserSetTabPanel value={userSettingsValue} index={0}>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            error={userSettings.tags.isError}
          >
            <InputLabel htmlFor="standard-adornment-user-basic-settings-tags">
              Tags
            </InputLabel>
            <Input
              id="standard-adornment-user-basic-settings-tags"
              type={'text'}
              value={userSettings.tags.value}
              onChange={handleChangeUserSettings('tags')}
            />
            {userSettings.tags.isError && (
              <p className={classes.errorMsg}>{userSettings.tags.errorMsg}</p>
            )}
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            error={userSettings.language.isError}
          >
            <InputLabel htmlFor="standard-adornment-user-basic-settings-language">
              Language
            </InputLabel>
            <Select
              labelId="standard-adornment-user-basic-settings-language"
              id="standard-adornment-user-basic-settings-language"
              value={userSettings.language.value}
              onChange={handleChangeUserSettings('language')}
            >
              <MenuItem value={'US'}>English (US)</MenuItem>
              <MenuItem value={'UK'}>English (UK)</MenuItem>
            </Select>
            {userSettings.language.isError && (
              <p className={classes.errorMsg}>
                {userSettings.language.errorMsg}
              </p>
            )}
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            error={userSettings.timezone.isError}
          >
            <InputLabel htmlFor="standard-adornment-user-basic-settings-timezone">
              TimeZone
            </InputLabel>
            <Select
              labelId="standard-adornment-user-basic-settings-timezone"
              id="standard-adornment-user-basic-settings-timezone"
              value={userSettings.timezone.value}
              onChange={handleChangeUserSettings('timezone')}
            >
              <MenuItem value={'Pacific/Pago_Pago'}>
                UTC-11:00 - Pacific/Pago_Pago
              </MenuItem>
              <MenuItem value={'Pacific/Niue'}>
                UTC-11:00 - Pacific/Niue
              </MenuItem>
            </Select>
            {userSettings.timezone.isError && (
              <p className={classes.errorMsg}>
                {userSettings.timezone.errorMsg}
              </p>
            )}
          </FormControl>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            error={userSettings.profileVisibility.isError}
          >
            <InputLabel htmlFor="standard-adornment-user-basic-settings-profile-visibility">
              Profile visibility
            </InputLabel>
            <Select
              labelId="standard-adornment-user-basic-settings-profile-visibility"
              id="standard-adornment-user-basic-settings-profile-visibility"
              value={userSettings.profileVisibility.value}
              onChange={handleChangeUserSettings('profileVisibility')}
            >
              <MenuItem value={'1'}>Registered users only</MenuItem>
              <MenuItem value={'2'}>
                Visible for all (also unregistered users)
              </MenuItem>
            </Select>
            {userSettings.profileVisibility.isError && (
              <p className={classes.errorMsg}>
                {userSettings.profileVisibility.errorMsg}
              </p>
            )}
          </FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  userSettings.hideIntroductionTourPanelOnDashboard.value
                }
                onChange={handleChangeUserSettings(
                  'hideIntroductionTourPanelOnDashboard'
                )}
                name="hideIntroductionTourPanelOnDashboard"
                color="primary"
              />
            }
            error={userSettings.hideIntroductionTourPanelOnDashboard.isError}
            label="Hide introduction tour panel on dashboard"
          />
          <br />
          {userSettings.hideIntroductionTourPanelOnDashboard.isError && (
            <>
              <p className={classes.errorMsg}>
                {userSettings.hideIntroductionTourPanelOnDashboard.errorMsg}
              </p>
              <br />
            </>
          )}
          <FormControl className={clsx(classes.margin, classes.textField)}>
            {' '}
            <Button
              className={classes.buttonPrimary}
              variant="contained"
              onClick={handleUserBasicSettingsSubmit()}
            >
              Save
            </Button>
          </FormControl>
        </UserSetTabPanel>
        <UserSetTabPanel value={userSettingsValue} index={1}>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            error={userTopicSettings.topic.isError}
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '90%'
            }}
          >
            {/* <InputLabel htmlFor="standard-adornment-user-basic-topic-settings-tags">
                          Topic
                        </InputLabel> */}
            <Input
              id="standard-adornment-user-basic-topic-settings-tags"
              type={'text'}
              value={userTopicSettings.topic.value}
              onChange={handleChangeUserTopicSettings('topic')}
              placeholder="Add Topic"
            />
            <Button
              className={classes.buttonPrimaryUserAdd}
              variant="contained"
              onClick={handleUserTopicSettingsSubmit()}
            >
              Add
            </Button>
          </FormControl>
          {userTopicSettings.topic.isError && (
            <>
              <br />
              <p className={classes.errorMsg}>
                {userTopicSettings.topic.errorMsg}
              </p>
              <br />
            </>
          )}
          {/* <FormControl
                        className={clsx(classes.margin, classes.textField)}
                      >
                        {" "}
                        <Button
                          className={classes.buttonPrimaryUserAdd}
                          variant="contained"
                          onClick={handleUserTopicSettingsSubmit()}
                        >
                          Add
                        </Button>
                      </FormControl> */}

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="left">Sort order</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userTopicSettings.userSettingsTopicArr.value.length > 0 ? (
                  userTopicSettings.userSettingsTopicArr.value.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.sortOrder}</TableCell>
                      <TableCell align="left">
                        {/* {row.action} */}
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.buttonTopic}
                          startIcon={
                            <i className="fa fa-filter" aria-hidden="true" />
                          }
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.buttonTopic}
                          startIcon={<CreateOutlinedIcon />}
                          onClick={handleClickOpen(row)}
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.buttonTopicDelete}
                          startIcon={
                            <i className="fa fa-times" aria-hidden="true" />
                          }
                          onClick={handleClickOpenTopicDelete(row)}
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
        </UserSetTabPanel>
        <Dialog
          open={openTopicDelete}
          onClose={handleCloseTopicDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.modelPopup}
        >
          <DialogTitle id="alert-dialog-title">
            <strong>Confirm </strong> topic deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this topic?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.buttonDelete}
              onClick={handleCloseTopicDelete}
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
            <Button
              className={classes.buttonPrimary}
              onClick={handleCloseTopicDelete}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.modelPopup}
        >
          <DialogTitle id="alert-dialog-title">
            <strong>Edit </strong> Topic
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                error={editTopic.name.isError}
              >
                <InputLabel htmlFor="standard-adornment-edit-topic-name">
                  Name*
                </InputLabel>
                <Input
                  id="standard-adornment-edit-topic-name"
                  type={'text'}
                  value={editTopic.name.value}
                  onChange={handleChangeEditTopic('name')}
                />
                {editTopic.name.isError && (
                  <p className={classes.errorMsg}>{editTopic.name.errorMsg}</p>
                )}
              </FormControl>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                error={editTopic.sortOrder.isError}
              >
                <InputLabel htmlFor="standard-adornment-edit-topic-sort-ordet">
                  Sort order
                </InputLabel>
                <Input
                  id="standard-adornment-edit-topic-sort-ordet"
                  type={'number'}
                  value={editTopic.sortOrder.value}
                  onChange={handleChangeEditTopic('sortOrder')}
                />
                {editTopic.sortOrder.isError && (
                  <p className={classes.errorMsg}>
                    {editTopic.sortOrder.errorMsg}
                  </p>
                )}
              </FormControl>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.buttonPrimary}
              onClick={handleClose}
              color="primary"
            >
              Save
            </Button>
            <Button
              className={classes.buttonDelete}
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default UserSettings;
