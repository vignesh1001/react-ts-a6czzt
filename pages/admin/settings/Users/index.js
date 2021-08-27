import React, { useEffect, useState } from 'react';
import {
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
  InputAdornment
} from '@material-ui/core';

import clsx from 'clsx';
import axios from 'axios';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import { NotificationManager } from 'react-notifications';
import SearchIcon from '@material-ui/icons/Search';
import Users from './Users';
import Groups from './Groups';

function UserSetTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-settings-simple-tabpanel-${index}`}
      aria-labelledby={`admin-settings-simple-tab-${index}`}
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
    id: `admin-settings-simple-tab-${index}`,
    'aria-controls': `admin-settings-simple-tabpanel-${index}`
  };
}
function UserPage({ classes, ...props }) {
  const [userSettingsValue, setUserSettingsValue] = React.useState(0);
  const [userList, setUserList] = React.useState([]);
  const handleChangeUserSet = (event, newValue) => {
    setUserSettingsValue(newValue);
  };

  return (
    <>
      <div className={classes.panelHeading} style={{ display: 'flex' }}>
        <strong>User </strong> Administration
      </div>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={userSettingsValue}
            onChange={handleChangeUserSet}
            aria-label="simple tabs example"
          >
            <Tab label="Users" {...a11yPropsUserSettings(0)} />
            <Tab label="Groups" {...a11yPropsUserSettings(1)} />
          </Tabs>
        </AppBar>
        <UserSetTabPanel value={userSettingsValue} index={0}>
          <Users
            userList={userList}
            setUserList={setUserList}
            classes={classes}
            {...props}
          />
        </UserSetTabPanel>
        <UserSetTabPanel value={userSettingsValue} index={1}>
          <Groups classes={classes} {...props} />
        </UserSetTabPanel>
      </div>
    </>
  );
}

export default UserPage;
