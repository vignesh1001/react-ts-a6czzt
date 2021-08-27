import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import presentationStyle from 'assets/jss/nextjs-material-kit-pro/pages/presentationStyle.js';
import Header from '../../components/Header/Header';
import HeaderLinks from '../../components/Header/HeaderLinks';
import ProfileInfo from './profileInfo';
import PartyMembers from './partyMembers';
import ProfileMenu from './profileMenu';
import Friends from './friends';
import UserFollowing from './userFollowing';
import Post from '../../components/post/post';

import { LoginCheck } from '../../actions/authActions';

import PropTypes from 'prop-types';

import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Grid from '@material-ui/core/Grid';

// import "./theme.css";
const useStyless = makeStyles(presentationStyle);
const useCardStyles = makeStyles(() => ({
  card: {
    minWidth: 320,
    position: 'relative',
    boxShadow: '0 0px 10px 0px rgb(0 0 0 / 20%)',
    overflow: 'visible',
    transition: '0.4s',
    borderTopRightRadius: '8px',
    borderTopLeftRadius: '8px',
    // '&:hover': {
    //     transform: 'translateY(-2px)',
    //     '& $shadow': {
    //         bottom: '-1.5rem',
    //     },
    //     '& $shadow2': {
    //         bottom: '-2.5rem',
    //     },
    // },
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: -1,
      display: 'block',
      width: '100%',
      bottom: -1,
      height: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '8px'
    }
  },
  main: {
    overflow: 'hidden',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    zIndex: 1,
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      display: 'block',
      width: '100%',
      height: '100%'
    }
  },
  content: {
    position: 'absolute',
    bottom: '50%',
    top: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    width: '100%',
    zIndex: 1,
    padding: '1.5rem 1.5rem 1rem',
    transform: 'translate(0,-50%)'
  },
  avatar: {
    width: 48,
    height: 48
  },
  postsAvatar: {
    width: 50,
    height: 50,
    backgroundColor: '#b1c576 !important',
    marginRight: '12px',
    borderRadius: '50%'
  },
  tag: {
    display: 'inline-block',
    fontFamily: "'Sen', sans-serif",
    backgroundColor: '#ff5dac',
    borderRadius: '0.5rem',
    padding: '2px 0.5rem',
    color: '#fff',
    marginBottom: '0.5rem'
  },
  ripple: {
    backgroundColor: '#00adae'
  },
  title: {
    fontFamily: 'Antonio, sans-serif',
    fontSize: '1.5rem',
    color: '#fff'
  },
  author: {
    zIndex: 1,
    position: 'relative',
    borderBottomLeftRadius: '1.5rem',
    borderBottomRightRadius: '1.5rem'
  },
  shadow: {
    transition: '0.2s',
    position: 'absolute',
    zIndex: 0,
    width: '88%',
    height: '100%',
    bottom: 0,
    borderRadius: '1.5rem',
    backgroundColor: 'rgba(0,0,0,0.06)',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  shadow2: {
    bottom: 0,
    width: '72%',
    backgroundColor: 'rgba(0,0,0,0.04)'
  },
  tabby: {
    flexGrow: 1,
    maxWidth: '100%'
  },
  partyProfileAvatar: {
    height: '45px !important',
    width: '45px !important',
    backgroundColor: '#b1c576 !important',
    marginRight: '30px',
    borderRadius: '50%'
  },
  guestProfileAvatar: {
    height: '45px !important',
    width: '45px !important',
    backgroundColor: '#b1c576 !important',
    margin: '18px',
    borderRadius: '50%'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
function SubTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sub-simple-tabpanel-${index}`}
      aria-labelledby={`sub-simple-tab-${index}`}
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

function SideTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`side-simple-tabpanel-${index}`}
      aria-labelledby={`side-simple-tab-${index}`}
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

function SecuritySetTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`security-settings-simple-tabpanel-${index}`}
      aria-labelledby={`security-settings-simple-tab-${index}`}
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
function MyFriendsSetTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`my-friends-settings-simple-tabpanel-${index}`}
      aria-labelledby={`my-friends-settings-simple-tab-${index}`}
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

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}
function a11yPropss(index) {
  return {
    id: `sub-simple-tab-${index}`,
    'aria-controls': `sub-simple-tabpanel-${index}`
  };
}
function a11yPropSide(index) {
  return {
    id: `side-simple-tab-${index}`,
    'aria-controls': `side-simple-tabpanel-${index}`
  };
}
function a11yPropsUserSettings(index) {
  return {
    id: `user-settings-simple-tab-${index}`,
    'aria-controls': `user-settings-simple-tabpanel-${index}`
  };
}
function a11yPropsSecuritySettings(index) {
  return {
    id: `security-settings-simple-tab-${index}`,
    'aria-controls': `security-settings-simple-tabpanel-${index}`
  };
}
function a11yPropsMyFriendsSettings(index) {
  return {
    id: `my-friends-settings-simple-tab-${index}`,
    'aria-controls': `my-friends-settings-simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      display: 'initial'
    },
    '& .MuiInputBase-root': {
      margin: '0px 8px 8px 8px',
      width: '100%'
    },
    '& .MuiAppBar-colorPrimary': {
      color: '#282829',
      backgroundColor: '#fff',
      boxShadow: 'none',
      borderBottomColor: 'transparent',
      paddingTop: '10px'
    },
    '& .MuiTab-textColorInherit': {
      backgroundColor: '#f7f7f7',
      borderRadius: '4px 4px 0px 0px',
      margin: '2px'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#6fdbe8!important',
      top: '0px',
      display: 'none'
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      backgroundColor: '#ececec',
      borderTop: '4px solid #01adae'
    },
    '& .MuiTab-wrapper': {
      fontSize: '12px'
    },
    '& .MuiFormLabel-root': {
      fontSize: '15px',
      fontWeigh: 'bold'
    },
    '& .MuiInputBase-input': {
      fontSize: '14px',
      fontWeigh: 'bold'
    },
    '& .MuiInputLabel-root': {
      display: 'contents',
      fontSize: '14px'
    },
    '& .MuiTableContainer-root': {
      marginTop: '12px',
      boxShadow: 'none'
    },
    '& .MuiTableCell-head': {
      fontSize: '13px'
    },
    '& .MuiTableCell-body': {
      fontSize: '13px'
    }
  },
  body: {
    margin: ' -23px'
  },
  subTabs: {
    [theme.breakpoints.down('md')]: {
      '& .MuiTabs-flexContainer': {
        overflow: 'auto!important'
      }
    },
    '& .MuiBox-root': {
      padding: '0px',
      marginTop: '15px'
    },
    '& .MuiFormControlLabel-root': {
      paddingLeft: '15px'
    },
    '& .MuiTypography-root': {
      fontSize: '14px'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#6fdbe8!important',
      display: 'none'
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      backgroundColor: '#ececec',
      borderTop: '4px solid #01adae'
    }
  },
  buttonPrimary: {
    backgroundColor: '#1a5962',
    borderColor: '#1a5962',
    background: '#00adae',
    color: '#fff !important',
    borderRadius: '25px',
    border: 'none',
    boxShadow: 'none',
    textShadow: 'none',
    outline: 'none !important',
    marginBottom: 0,
    fontSize: '14px',
    fontWeight: 600,
    padding: '8px 16px',
    '&,&:hover,&:focus': {
      backgroundColor: '#387c86',
      background: '#387c86',
      color: '#fff',
      boxShadow: 'none'
    }
  },
  buttonPrimaryUserAdd: {
    backgroundColor: '#ededed !important',
    borderColor: '#1a5962',
    background: '#ededed !important',
    color: '#7a7a7a !important',
    borderRadius: '0px 20px 20px 0px',
    border: 'none',
    boxShadow: 'none',
    textShadow: 'none',
    outline: 'none !important',
    marginBottom: 0,
    fontSize: '14px',
    fontWeight: 600,
    padding: '8px 16px',
    '&,&:hover,&:focus': {
      backgroundColor: '#387c86',
      background: '#387c86',
      color: '#fff',
      boxShadow: 'none'
    }
  },
  buttonDelete: {
    backgroundColor: '#E9735A',
    borderColor: '#E9735A',
    background: '#00adae',
    color: '#fff !important',
    borderRadius: '25px',
    border: 'none',
    boxShadow: 'none',
    textShadow: 'none',
    outline: 'none !important',
    marginBottom: 0,
    fontSize: '14px',
    fontWeight: 600,
    padding: '8px 16px',
    '&,&:hover,&:focus': {
      backgroundColor: '#e45334',
      background: '#e45334',
      color: '#fff',
      boxShadow: 'none'
    }
  },
  sideRoot: {
    [theme.breakpoints.down('md')]: {
      '& .MuiTabs-flexContainer': {
        flexDirection: 'row!important',
        overflow: 'auto!important',
        paddingTop: '0px!important'
      },
      '& .MuiButtonBase-root': {
        width: 'auto!important',
        marginRight: '5px'
      },
      '& .MuiTab-wrapper': {
        fontSize: '11px!important',
        paddingLeft: '0px!important',
        paddingRight: '7px!important'
      },
      '& .MuiTab-textColorInherit.Mui-selected': {
        backgroundColor: '#01adae!important',
        borderRadius: '5px!important',
        color: '#fff !important'
      },
      '& .MuiTab-wrapper': {
        color: '#555 !important'
      }
    },
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'flex-start'
    },
    '& .MuiAppBar-colorPrimary': {
      color: '#282829',
      backgroundColor: '#fff',
      boxShadow: 'none',
      borderBottomColor: 'transparent',
      paddingTop: '10px'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#6fdbe8!important',
      display: 'none'
    },
    '& .MuiTab-wrapper': {
      alignItems: 'start',
      minHeight: '20px',
      // paddingLeft: "20px",
      marginBottom: 0,
      fontWeight: 400,
      cursor: 'pointer',
      fontSize: '13px',
      color: '#282829',
      fontWeight: 'bold !important',
      display: 'inline-flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start'
    },
    '& .fa': { padding: '3px!important', marginRight: '5px !important' },
    '& .MuiTab-textColorInherit.Mui-selected': {
      backgroundColor: '#ececec',
      borderLeft: '4px solid #01adae'
    },
    '& .MuiButtonBase-root': {
      width: '100%',
      padding: '0px',
      display: 'block'
    }
  },
  panelDefault: {
    borderColor: '#ddd',
    marginBottom: '20px',
    backgroundColor: '#fff',
    border: '1px solid transparent',
    borderRadius: '8px',
    webkitBoxShadow: '0 1px 1px rgb(0 0 0 / 5%)',
    boxShadow: '0 1px 1px rgb(0 0 0 / 5%)',
    padding: '20px',
    position: 'relative'
  },
  panelHeading: {
    color: '#333333',
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
    fontSize: '16px',
    fontWeight: 300,
    color: '#282829',
    backgroundColor: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '4px'
  },
  errorMsg: {
    color: '#E9735A !important',
    fontSize: '12px'
  },
  table: {
    minWidth: 650
  },
  tableMsg: {
    fontSize: '13px',
    padding: '12px'
  },
  tableNotifcRoot: {
    '& .MuiBox-root': {
      padding: '0px!important'
    },
    '& .fa-circle': {
      color: '#01adae'
    },
    '& .fa-envelope, & .fa-bell': {
      top: '0px'
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      display: 'initial'
    },
    '& .MuiInputBase-root': {
      margin: '0px 8px 8px 8px',
      width: '100%'
    },
    '& .MuiAppBar-colorPrimary': {
      color: '#282829',
      backgroundColor: '#fff',
      boxShadow: 'none',
      borderBottomColor: 'transparent',
      paddingTop: '10px'
    },
    '& .MuiTab-textColorInherit': {
      backgroundColor: '#f7f7f7',
      borderRadius: '4px 4px 0px 0px',
      margin: '2px'
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#6fdbe8!important',
      top: '0px',
      display: 'none'
    },
    '& .MuiTab-textColorInherit.Mui-selected': {
      backgroundColor: '#ececec',
      borderTop: '4px solid #01adae'
    },
    '& .MuiTab-wrapper': {
      fontSize: '12px'
    },
    '& .MuiFormLabel-root': {
      fontSize: '15px',
      fontWeigh: 'bold'
    },
    '& .MuiInputBase-input': {
      fontSize: '14px',
      fontWeigh: 'bold'
    },
    '& .MuiInputLabel-root': {
      display: 'contents',
      fontSize: '14px'
    },
    '& .MuiTableContainer-root': {
      marginTop: '12px',
      boxShadow: 'none'
    },
    '& .MuiTableCell-head': {
      fontSize: '13px'
    },
    '& .MuiTableCell-body': {
      fontSize: '13px'
    },
    '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
      backgroundColor: '#01adae'
    },
    '& .MuiSwitch-colorSecondary.Mui-checked': {
      color: '#01adae'
    },
    '& .MuiSelect-root.MuiSelect-select.MuiSelect-selectMenu.MuiInputBase-input.MuiInput-input': {
      display: 'flex',
      padding: '5px',
      margin: '2px'
    },
    '& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.MuiInput-formControl': {
      margin: '0px 8px 8px 8px',
      border: '2px solid #ededed',
      borderRadius: '2px',
      padding: '2px'
    },
    '& .badge': {
      padding: '3px 5px',
      borderRadius: '2px',
      fontWeight: 'normal',
      fontFamily: 'Arial, sans-serif',
      fontSize: '10px !important',
      textTransform: 'uppercase',
      color: '#fff',
      verticalAlign: 'baseline',
      whiteSpace: 'nowrap',
      textShadow: 'none',
      backgroundColor: '#d7d7d7',
      lineHeight: '1'
    }
  },
  buttonTopic: {
    borderRadius: '30px',
    width: '12px',
    backgroundColor: '#1a5962',
    borderColor: '#1a5962',
    maxWidth: '12px',
    minWidth: '10px',
    margin: '4px',
    '& .fa-filter': {
      fontSize: '14px'
    },
    '& .fa-filter': {
      fontSize: '14px'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '14px'
    },
    '& .MuiButton-root': {
      minWidth: '20px',
      padding: '5px 12px'
    },
    '& .MuiButton-label': {
      display: 'contents',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  buttonTopicDelete: {
    borderRadius: '30px',
    width: '12px',
    backgroundColor: '#E9735A',
    borderColor: '#E9735A',
    maxWidth: '12px',
    minWidth: '10px',
    margin: '4px',
    '& .fa-times': {
      fontSize: '14px'
    },
    '& .MuiButton-root': {
      minWidth: '20px',
      padding: '5px 12px'
    },
    '& .MuiButton-label': {
      display: 'contents',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  buttonFriendsDelete: {
    borderRadius: '30px',
    width: '12px',
    backgroundColor: '#E9735A',
    borderColor: '#E9735A',
    maxWidth: '12px',
    margin: '4px',
    '& .fa-times': {
      fontSize: '14px'
    },
    '& .MuiButton-root': {
      minWidth: '20px',
      padding: '5px 12px'
    },
    '& .MuiButton-label': {
      display: 'contents',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  modelPopup: {
    '& .MuiDialogTitle-root': {
      padding: '20px 20px 0',
      borderBottom: 'none',
      textAlign: 'center'
    },
    '& .MuiTypography-root': {
      fontSize: '20px'
    },
    '& .MuiDialogContentText-root': {
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'column'
    },
    '& .MuiInputBase-root': {
      width: '300px',
      fontSize: '13px'
    },
    '& .MuiFormLabel-root': {
      fontSize: '13px'
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center'
    }
  }
}));
const profileSettings = props => {
  const classes = useStyles();
  const cardclasses = useCardStyles();

  const [friendTags, setFriendTags] = useState([]);

  const [token, setToken] = useState(
    'U2FsdGVkX18LI5/WLsSQ4ydKE199h3zTqCkUlwSo545tBPOqrUuw7tw2Wc4p5cdjSePl5yTjBbLqjNlwLX0dCK4emEz1j/UE9+MqjUJRc880ljEDO3Ai1dpq+TxuNiqLk11S6Ef70q9vj6M1YiMx/lkQo+4rwWo9pNA8CRmGsk2eV44Yll1e5UWhrrhJIjGwT78PX65WRbu0aUukaM8Cwa0xMYiLx1l841zf6WT/n9Ztn7ajfQnCu8kYP12VrABb3Ptc4YvnLoqtKOgvB/B/50HhPiPRcMaQgxW8KWqs/r+p7Mh7OuIVAvOS2vJpd3KFeFMu/4fKALwZa5FgAxSBKDe4qHBd7r0alKtXxDWz7JYuOYUxspzSz2PHwUBgqUJE'
  );
  const [followers, setFollowers] = useState([]);
  const [spaces, setSpaces] = useState([]);
  const [profileFollowing, setProfileFollowing] = useState('');

  const [value, setValue] = React.useState(0);
  const [subValue, setSubValue] = React.useState(0);
  const [sideValue, setSideValue] = React.useState(0);
  const [userSettingsValue, setUserSettingsValue] = React.useState(0);
  const [securitySettingsValue, setSecuritySettingsValue] = React.useState(1);
  const [myFriendsSettingsValue, setMyFriendsSettingsValue] = React.useState(0);

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  });

  const [general, setGeneral] = React.useState({
    name: {
      value: '',
      validation: true,
      show: false,
      isError: false,
      errorMsg: 'Name cannot be blank.'
    },
    lastName: {
      value: '',
      validation: true,
      show: false,
      isError: false,
      errorMsg: 'Last name cannot be blank.'
    },
    title: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Title cannot be blank.'
    },
    gender: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Gender cannot be blank.'
    },
    street: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Street cannot be blank.'
    },
    zip: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Zip cannot be blank.'
    },
    city: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'City cannot be blank.'
    },
    country: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Country cannot be blank.'
    },
    state: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'State cannot be blank.'
    },
    birthday: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Birthday cannot be blank.'
    },
    hideYearInProfile: {
      value: false,
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Hide year in profile cannot be blank.'
    },
    about: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'About cannot be blank.'
    },
    phonePrivate: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Phone Private cannot be blank.'
    },
    phoneWork: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Phone Work cannot be blank.'
    },
    mobile: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Mobile cannot be blank.'
    },
    fax: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Fax cannot be blank.'
    },
    skypeNickname: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Skype Nickname cannot be blank.'
    },
    xmppJabberAddress: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'XMPP Jabber Address cannot be blank.'
    },
    url: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Url cannot be blank.'
    },
    facebookUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Facebook URL cannot be blank.'
    },
    linkedinUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'LinkedIn URL cannot be blank.'
    },
    xingUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Xing URL cannot be blank.'
    },
    youtubeUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Youtube URL cannot be blank.'
    },
    vimeoUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Vimeo URL cannot be blank.'
    },
    flickrUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Flickr URL cannot be blank.'
    },
    myspaceUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'MySpace URL cannot be blank.'
    },
    twitterUrl: {
      value: '',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Twitter URL cannot be blank.'
    }
  });

  const [deleteAccount, setDeleteAccount] = React.useState({
    password: {
      value: '',
      validation: true,
      show: false,
      isError: false,
      errorMsg: 'Your password cannot be blank.'
    }
  });
  const [changePassword, setChangePassword] = React.useState({
    createPassword: {
      value: '',
      validation: true,
      show: false,
      isError: false,
      errorMsg: 'Current Password cannot be blank.'
    },
    newPassword: {
      value: '',
      validation: true,
      show: false,
      isError: false,
      errorMsg: 'New password cannot be blank.'
    },
    confirmNewPassword: {
      value: '',
      validation: true,
      show: false,
      isError: false,
      errorMsg: 'Confirm new password cannot be blank.'
    }
  });
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
  const [friends, setFriends] = React.useState([
    {
      name: 'Iterate Priyanka',
      username: 'iterate.priyanka',
      lastname: 'gupta',
      action: 'test'
    }
  ]);
  const [open, setOpen] = React.useState(false);
  const [openTopicDelete, setOpenTopicDelete] = React.useState(false);

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
  const [tableNotification, setTableNotification] = React.useState({
    email: {
      value: false,
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Email cannot be blank.'
    },
    notification: {
      value: false,
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Notification cannot be blank.'
    }
  });
  const [securitySettings, setSecuritySettings] = React.useState({
    YFReceivePrivateMessage: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Receive private messages cannot be blank.'
    },
    YFCreatePost: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Create post cannot be blank.'
    },
    YFViewYourAboutPage: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'View your about page cannot be blank.'
    },
    OUReceivePrivateMessage: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Receive private messages cannot be blank.'
    },
    OUCreatePost: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Create post cannot be blank.'
    },
    OUViewYourAboutPage: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'View your about page cannot be blank.'
    },
    NRUCreatePost: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'Create post cannot be blank.'
    },
    NRUViewYourAboutPage: {
      value: 'default',
      validation: false,
      show: false,
      isError: false,
      errorMsg: 'View your about page cannot be blank.'
    }
  });

  useEffect(() => {
    props.dispatch(LoginCheck());
  }, [0]);

  const handleClickOpenTopicDelete = prop => event => {
    setOpenTopicDelete(true);
    console.log(prop);
  };
  const handleClickUnfollowFriends = prop => event => {
    console.log('Action unfollow friend:', prop);
  };
  const handleClickRequestFriends = (prop, action) => event => {
    if (action == 'accept') {
      console.log('Action accept friend:', prop);
    } else {
      console.log('Action deny friend:', prop);
    }
  };
  const handleClickSendRequestFriends = (prop, action) => event => {
    console.log('Action send request friend:', prop);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSecuritySettings = prop => event => {
    let Obj = securitySettings[prop];
    if (event.target.type == 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setSecuritySettings({ ...securitySettings, [prop]: Obj });
  };

  const handleSecuritySettingsSubmit = () => event => {
    console.log(securitySettings);
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
  const handleChangeUserSettings = prop => event => {
    let Obj = userSettings[prop];
    if (event.target.type == 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setUserSettings({ ...userSettings, [prop]: Obj });
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
  const handleChangeGeneral = prop => event => {
    let Obj = general[prop];
    if (event.target.type == 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setGeneral({ ...general, [prop]: Obj });
  };
  const handleClickShowPasswordG = () => {
    let Obj = general['password'];
    Obj['show'] = !Obj['show'];
    setGeneral({ ...general, ['password']: Obj });
  };
  const handleGeneralSubmit = () => event => {
    let isError = false;
    Object.keys(general).map(function(key, index) {
      let Obj = general[key];
      if (Obj.validation && Obj.value == '') {
        Obj['isError'] = true;
        isError = true;
      } else {
        Obj['isError'] = false;
      }
      setGeneral({ ...general, [key]: Obj });
    });
    if (isError) {
      console.log('Error: Fill required inputs');
      return false;
    }
    console.log(general);
  };
  const handleNotificSettingsSubmit = () => event => {
    console.log('handleNotificSettingsSubmit', tableNotification);
  };

  const handleChangeDeleteAccount = prop => event => {
    let Obj = deleteAccount[prop];
    Obj['value'] = event.target.value;
    setDeleteAccount({ ...deleteAccount, [prop]: Obj });
  };
  const handleClickShowPasswordDA = () => {
    let Obj = deleteAccount['password'];
    Obj['show'] = !Obj['show'];
    setDeleteAccount({ ...deleteAccount, ['password']: Obj });
  };
  const handleDeleteAccountSubmit = () => event => {
    let isError = false;
    Object.keys(deleteAccount).map(function(key, index) {
      let Obj = deleteAccount[key];
      if (Obj.validation && Obj.value == '') {
        Obj['isError'] = true;
        isError = true;
      } else {
        Obj['isError'] = false;
      }
      setDeleteAccount({ ...deleteAccount, [key]: Obj });
    });
    if (isError) {
      console.log('Error: Fill required inputs');
      return false;
    }
    console.log(deleteAccount);
  };
  const toggleChecked = prop => event => {
    let Obj = tableNotification[prop];
    Obj['value'] = !Obj['value'];
    setTableNotification({ ...tableNotification, [prop]: Obj });
  };

  const handleChangePassword = prop => event => {
    let Obj = changePassword[prop];
    Obj['value'] = event.target.value;
    setChangePassword({ ...changePassword, [prop]: Obj });
  };
  const handleClickShowPasswordCP = prop => event => {
    let Obj = changePassword[prop];
    Obj['show'] = !Obj['show'];
    setChangePassword({ ...changePassword, [prop]: Obj });
  };

  const handleChangePasswordSubmit = () => event => {
    let isError = false;
    Object.keys(changePassword).map(function(key, index) {
      let Obj = changePassword[key];
      if (Obj.validation && Obj.value == '') {
        Obj['isError'] = true;
        isError = true;
      } else {
        Obj['isError'] = false;
      }
      setChangePassword({ ...changePassword, [key]: Obj });
    });
    if (isError) {
      console.log('Error: Fill required inputs');
      return false;
    }
    console.log(changePassword);
  };

  const handleChangeSub = (event, newValue) => {
    setSubValue(newValue);
  };
  const handleChangeSide = (event, newValue) => {
    setSideValue(newValue);
  };
  const handleChangeUserSet = (event, newValue) => {
    setUserSettingsValue(newValue);
  };
  const handleChangeSecuritySet = (event, newValue) => {
    setSecuritySettingsValue(newValue);
  };
  const handleChangeMyFriendsSet = (event, newValue) => {
    setMyFriendsSettingsValue(newValue);
  };

  const handleChanges = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const save = () => event => {
    console.log(values);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div>
      <div>
        <Header
          brand={require('assets/img/logo.png')}
          altText={'Table by Pampered Chef'}
          links={<HeaderLinks dropdownHoverColor="info" />}
          fixed
          color="info"
          groupId={props.acccount.user_group}
          // partyListData={partyListData}
          title={'Account Settings'}
          isMyParty={true}
        />
      </div>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        <Grid item xs={12} sm={2}>
          <div className={classes.sideRoot}>
            <div className={classes.panelDefault}>
              <div className={classes.panelHeading}>
                <strong>Account</strong> settings
              </div>
              <AppBar position="static">
                <Tabs
                  value={sideValue}
                  onChange={handleChangeSide}
                  aria-label="simple tabs example"
                >
                  <Tab
                    icon={<i className="fa fa-user" />}
                    label="Profile"
                    {...a11yPropSide(0)}
                  />
                  {/* <Tab
                      icon={<i className="fa fa-envelope"></i>}
                      label="E-Mail Summaries"
                      {...a11yPropSide(1)}
                    /> */}
                  <Tab
                    icon={<i className="fa fa-bell" />}
                    label="Table Notifications"
                    {...a11yPropSide(1)}
                  />
                  <Tab
                    icon={<i className="fa fa-wrench" />}
                    label="Settings"
                    {...a11yPropSide(2)}
                  />
                  <Tab
                    icon={<i className="fa fa-lock" />}
                    label="Security"
                    {...a11yPropSide(3)}
                  />
                  {/* <Tab
                      icon={<i className="fa fa-rocket"></i>}
                      label="Modules"
                      {...a11yPropSide(5)}
                    /> */}
                  <Tab
                    icon={<i className="fa fa-users" />}
                    label="Friends"
                    {...a11yPropSide(4)}
                  />
                </Tabs>
              </AppBar>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className={classes.body}>
            <SideTabPanel value={sideValue} index={0}>
              <div className={classes.panelDefault}>
                <div className={classes.panelHeading}>
                  <strong>Your</strong> profile
                </div>
                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="simple tabs example"
                    >
                      <Tab label="General" {...a11yProps(0)} />
                      <Tab label="Change Password" {...a11yProps(1)} />
                      {/* <Tab label="Delete Account" {...a11yProps(2)} /> */}
                    </Tabs>
                  </AppBar>
                  <TabPanel value={value} index={0}>
                    <div className="help-block">
                      Here you can edit your general profile data, which is
                      visible in the about page of your profile.{' '}
                    </div>
                    <div className={classes.subTabs}>
                      <AppBar position="static">
                        <Tabs
                          value={subValue}
                          onChange={handleChangeSub}
                          aria-label="simple tabs example"
                        >
                          <Tab label="General" {...a11yPropss(0)} />
                          <Tab label="Communication" {...a11yPropss(1)} />
                          <Tab label="Social bookmarks" {...a11yPropss(2)} />
                        </Tabs>
                      </AppBar>
                      <SubTabPanel value={subValue} index={0}>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.name.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-name">
                            Name*
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-name"
                            type={'text'}
                            value={general.name.value}
                            onChange={handleChangeGeneral('name')}
                          />
                          {general.name.isError && (
                            <p className={classes.errorMsg}>
                              {general.name.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.lastName.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-last-name">
                            Last name*
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-last-name"
                            type={'text'}
                            value={general.lastName.value}
                            onChange={handleChangeGeneral('lastName')}
                          />
                          {general.lastName.isError && (
                            <p className={classes.errorMsg}>
                              {general.lastName.errorMsg}
                            </p>
                          )}
                        </FormControl>

                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.title.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-title">
                            Title
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-title"
                            type={'text'}
                            value={general.title.value}
                            onChange={handleChangeGeneral('title')}
                          />
                          {general.title.isError && (
                            <p className={classes.errorMsg}>
                              {general.title.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.gender.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-gender">
                            Gender
                          </InputLabel>
                          <Select
                            labelId="standard-adornment-general-gender"
                            id="standard-adornment-general-gender"
                            value={general.gender.value}
                            onChange={handleChangeGeneral('gender')}
                          >
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Custom'}>Custom</MenuItem>
                          </Select>
                          {general.gender.isError && (
                            <p className={classes.errorMsg}>
                              {general.gender.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.street.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-street">
                            Street
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-street"
                            type={'text'}
                            value={general.street.value}
                            onChange={handleChangeGeneral('street')}
                          />
                          {general.street.isError && (
                            <p className={classes.errorMsg}>
                              {general.street.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.zip.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-zip">
                            Zip
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-zip"
                            type={'text'}
                            value={general.zip.value}
                            onChange={handleChangeGeneral('zip')}
                          />
                          {general.zip.isError && (
                            <p className={classes.errorMsg}>
                              {general.zip.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.city.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-city">
                            City
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-city"
                            type={'text'}
                            value={general.city.value}
                            onChange={handleChangeGeneral('city')}
                          />
                          {general.city.isError && (
                            <p className={classes.errorMsg}>
                              {general.city.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.country.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-country">
                            Country
                          </InputLabel>
                          <Select
                            labelId="standard-adornment-general-country"
                            id="standard-adornment-general-country"
                            value={general.country.value}
                            onChange={handleChangeGeneral('country')}
                          >
                            <MenuItem value="AF" id="738">
                              Afghanistan
                            </MenuItem>
                            <MenuItem value="AX" id="739">
                              Åland Islands
                            </MenuItem>
                            <MenuItem value="AL" id="740">
                              Albania
                            </MenuItem>
                            <MenuItem value="DZ" id="741">
                              Algeria
                            </MenuItem>
                            <MenuItem value="AS" id="742">
                              American Samoa
                            </MenuItem>
                            <MenuItem value="AD" id="743">
                              Andorra
                            </MenuItem>
                            <MenuItem value="AO" id="744">
                              Angola
                            </MenuItem>
                            <MenuItem value="AI" id="745">
                              Anguilla
                            </MenuItem>
                            <MenuItem value="AQ" id="746">
                              Antarctica
                            </MenuItem>
                            <MenuItem value="AG" id="747">
                              Antigua &amp; Barbuda
                            </MenuItem>
                            <MenuItem value="AR" id="748">
                              Argentina
                            </MenuItem>
                            <MenuItem value="AM" id="749">
                              Armenia
                            </MenuItem>
                            <MenuItem value="AW" id="750">
                              Aruba
                            </MenuItem>
                            <MenuItem value="AU" id="751">
                              Australia
                            </MenuItem>
                            <MenuItem value="AT" id="752">
                              Austria
                            </MenuItem>
                            <MenuItem value="AZ" id="753">
                              Azerbaijan
                            </MenuItem>
                            <MenuItem value="BS" id="754">
                              Bahamas
                            </MenuItem>
                            <MenuItem value="BH" id="755">
                              Bahrain
                            </MenuItem>
                            <MenuItem value="BD" id="756">
                              Bangladesh
                            </MenuItem>
                            <MenuItem value="BB" id="757">
                              Barbados
                            </MenuItem>
                            <MenuItem value="BY" id="758">
                              Belarus
                            </MenuItem>
                            <MenuItem value="BE" id="759">
                              Belgium
                            </MenuItem>
                            <MenuItem value="BZ" id="760">
                              Belize
                            </MenuItem>
                            <MenuItem value="BJ" id="761">
                              Benin
                            </MenuItem>
                            <MenuItem value="BM" id="762">
                              Bermuda
                            </MenuItem>
                            <MenuItem value="BT" id="763">
                              Bhutan
                            </MenuItem>
                            <MenuItem value="BO" id="764">
                              Bolivia
                            </MenuItem>
                            <MenuItem value="BA" id="765">
                              Bosnia &amp; Herzegovina
                            </MenuItem>
                            <MenuItem value="BW" id="766">
                              Botswana
                            </MenuItem>
                            <MenuItem value="BV" id="767">
                              Bouvet Island
                            </MenuItem>
                            <MenuItem value="BR" id="768">
                              Brazil
                            </MenuItem>
                            <MenuItem value="IO" id="769">
                              British Indian Ocean Territory
                            </MenuItem>
                            <MenuItem value="VG" id="770">
                              British Virgin Islands
                            </MenuItem>
                            <MenuItem value="BN" id="771">
                              Brunei
                            </MenuItem>
                            <MenuItem value="BG" id="772">
                              Bulgaria
                            </MenuItem>
                            <MenuItem value="BF" id="773">
                              Burkina Faso
                            </MenuItem>
                            <MenuItem value="BI" id="774">
                              Burundi
                            </MenuItem>
                            <MenuItem value="KH" id="775">
                              Cambodia
                            </MenuItem>
                            <MenuItem value="CM" id="776">
                              Cameroon
                            </MenuItem>
                            <MenuItem value="CA" id="777">
                              Canada
                            </MenuItem>
                            <MenuItem value="CV" id="778">
                              Cape Verde
                            </MenuItem>
                            <MenuItem value="BQ" id="779">
                              Caribbean Netherlands
                            </MenuItem>
                            <MenuItem value="KY" id="780">
                              Cayman Islands
                            </MenuItem>
                            <MenuItem value="CF" id="781">
                              Central African Republic
                            </MenuItem>
                            <MenuItem value="TD" id="782">
                              Chad
                            </MenuItem>
                            <MenuItem value="CL" id="783">
                              Chile
                            </MenuItem>
                            <MenuItem value="CN" id="784">
                              China
                            </MenuItem>
                            <MenuItem value="CX" id="785">
                              Christmas Island
                            </MenuItem>
                            <MenuItem value="CC" id="786">
                              Cocos (Keeling) Islands
                            </MenuItem>
                            <MenuItem value="CO" id="787">
                              Colombia
                            </MenuItem>
                            <MenuItem value="KM" id="788">
                              Comoros
                            </MenuItem>
                            <MenuItem value="CG" id="789">
                              Congo - Brazzaville
                            </MenuItem>
                            <MenuItem value="CD" id="790">
                              Congo - Kinshasa
                            </MenuItem>
                            <MenuItem value="CK" id="791">
                              Cook Islands
                            </MenuItem>
                            <MenuItem value="CR" id="792">
                              Costa Rica
                            </MenuItem>
                            <MenuItem value="CI" id="793">
                              Côte d’Ivoire
                            </MenuItem>
                            <MenuItem value="HR" id="794">
                              Croatia
                            </MenuItem>
                            <MenuItem value="CU" id="795">
                              Cuba
                            </MenuItem>
                            <MenuItem value="CW" id="796">
                              Curaçao
                            </MenuItem>
                            <MenuItem value="AN" id="797">
                              Curaçao
                            </MenuItem>
                            <MenuItem value="CY" id="798">
                              Cyprus
                            </MenuItem>
                            <MenuItem value="CZ" id="799">
                              Czechia
                            </MenuItem>
                            <MenuItem value="DK" id="800">
                              Denmark
                            </MenuItem>
                            <MenuItem value="DJ" id="801">
                              Djibouti
                            </MenuItem>
                            <MenuItem value="DM" id="802">
                              Dominica
                            </MenuItem>
                            <MenuItem value="DO" id="803">
                              Dominican Republic
                            </MenuItem>
                            <MenuItem value="EC" id="804">
                              Ecuador
                            </MenuItem>
                            <MenuItem value="EG" id="805">
                              Egypt
                            </MenuItem>
                            <MenuItem value="SV" id="806">
                              El Salvador
                            </MenuItem>
                            <MenuItem value="GQ" id="807">
                              Equatorial Guinea
                            </MenuItem>
                            <MenuItem value="ER" id="808">
                              Eritrea
                            </MenuItem>
                            <MenuItem value="EE" id="809">
                              Estonia
                            </MenuItem>
                            <MenuItem value="SZ" id="810">
                              Eswatini
                            </MenuItem>
                            <MenuItem value="ET" id="811">
                              Ethiopia
                            </MenuItem>
                            <MenuItem value="FK" id="812">
                              Falkland Islands
                            </MenuItem>
                            <MenuItem value="FO" id="813">
                              Faroe Islands
                            </MenuItem>
                            <MenuItem value="FJ" id="814">
                              Fiji
                            </MenuItem>
                            <MenuItem value="FI" id="815">
                              Finland
                            </MenuItem>
                            <MenuItem value="FR" id="816">
                              France
                            </MenuItem>
                            <MenuItem value="GF" id="817">
                              French Guiana
                            </MenuItem>
                            <MenuItem value="PF" id="818">
                              French Polynesia
                            </MenuItem>
                            <MenuItem value="TF" id="819">
                              French Southern Territories
                            </MenuItem>
                            <MenuItem value="GA" id="820">
                              Gabon
                            </MenuItem>
                            <MenuItem value="GM" id="821">
                              Gambia
                            </MenuItem>
                            <MenuItem value="GE" id="822">
                              Georgia
                            </MenuItem>
                            <MenuItem value="DE" id="823">
                              Germany
                            </MenuItem>
                            <MenuItem value="GH" id="824">
                              Ghana
                            </MenuItem>
                            <MenuItem value="GI" id="825">
                              Gibraltar
                            </MenuItem>
                            <MenuItem value="GR" id="826">
                              Greece
                            </MenuItem>
                            <MenuItem value="GL" id="827">
                              Greenland
                            </MenuItem>
                            <MenuItem value="GD" id="828">
                              Grenada
                            </MenuItem>
                            <MenuItem value="GP" id="829">
                              Guadeloupe
                            </MenuItem>
                            <MenuItem value="GU" id="830">
                              Guam
                            </MenuItem>
                            <MenuItem value="GT" id="831">
                              Guatemala
                            </MenuItem>
                            <MenuItem value="GG" id="832">
                              Guernsey
                            </MenuItem>
                            <MenuItem value="GN" id="833">
                              Guinea
                            </MenuItem>
                            <MenuItem value="GW" id="834">
                              Guinea-Bissau
                            </MenuItem>
                            <MenuItem value="GY" id="835">
                              Guyana
                            </MenuItem>
                            <MenuItem value="HT" id="836">
                              Haiti
                            </MenuItem>
                            <MenuItem value="HM" id="837">
                              Heard &amp; McDonald Islands
                            </MenuItem>
                            <MenuItem value="HN" id="838">
                              Honduras
                            </MenuItem>
                            <MenuItem value="HK" id="839">
                              Hong Kong SAR China
                            </MenuItem>
                            <MenuItem value="HU" id="840">
                              Hungary
                            </MenuItem>
                            <MenuItem value="IS" id="841">
                              Iceland
                            </MenuItem>
                            <MenuItem value="IN" id="842">
                              India
                            </MenuItem>
                            <MenuItem value="ID" id="843">
                              Indonesia
                            </MenuItem>
                            <MenuItem value="IR" id="844">
                              Iran
                            </MenuItem>
                            <MenuItem value="IQ" id="845">
                              Iraq
                            </MenuItem>
                            <MenuItem value="IE" id="846">
                              Ireland
                            </MenuItem>
                            <MenuItem value="IM" id="847">
                              Isle of Man
                            </MenuItem>
                            <MenuItem value="IL" id="848">
                              Israel
                            </MenuItem>
                            <MenuItem value="IT" id="849">
                              Italy
                            </MenuItem>
                            <MenuItem value="JM" id="850">
                              Jamaica
                            </MenuItem>
                            <MenuItem value="JP" id="851">
                              Japan
                            </MenuItem>
                            <MenuItem value="JE" id="852">
                              Jersey
                            </MenuItem>
                            <MenuItem value="JO" id="853">
                              Jordan
                            </MenuItem>
                            <MenuItem value="KZ" id="854">
                              Kazakhstan
                            </MenuItem>
                            <MenuItem value="KE" id="855">
                              Kenya
                            </MenuItem>
                            <MenuItem value="KI" id="856">
                              Kiribati
                            </MenuItem>
                            <MenuItem value="XK" id="857">
                              Kosovo
                            </MenuItem>
                            <MenuItem value="KW" id="858">
                              Kuwait
                            </MenuItem>
                            <MenuItem value="KG" id="859">
                              Kyrgyzstan
                            </MenuItem>
                            <MenuItem value="LA" id="860">
                              Laos
                            </MenuItem>
                            <MenuItem value="LV" id="861">
                              Latvia
                            </MenuItem>
                            <MenuItem value="LB" id="862">
                              Lebanon
                            </MenuItem>
                            <MenuItem value="LS" id="863">
                              Lesotho
                            </MenuItem>
                            <MenuItem value="LR" id="864">
                              Liberia
                            </MenuItem>
                            <MenuItem value="LY" id="865">
                              Libya
                            </MenuItem>
                            <MenuItem value="LI" id="866">
                              Liechtenstein
                            </MenuItem>
                            <MenuItem value="LT" id="867">
                              Lithuania
                            </MenuItem>
                            <MenuItem value="LU" id="868">
                              Luxembourg
                            </MenuItem>
                            <MenuItem value="MO" id="869">
                              Macao SAR China
                            </MenuItem>
                            <MenuItem value="MG" id="870">
                              Madagascar
                            </MenuItem>
                            <MenuItem value="MW" id="871">
                              Malawi
                            </MenuItem>
                            <MenuItem value="MY" id="872">
                              Malaysia
                            </MenuItem>
                            <MenuItem value="MV" id="873">
                              Maldives
                            </MenuItem>
                            <MenuItem value="ML" id="874">
                              Mali
                            </MenuItem>
                            <MenuItem value="MT" id="875">
                              Malta
                            </MenuItem>
                            <MenuItem value="MH" id="876">
                              Marshall Islands
                            </MenuItem>
                            <MenuItem value="MQ" id="877">
                              Martinique
                            </MenuItem>
                            <MenuItem value="MR" id="878">
                              Mauritania
                            </MenuItem>
                            <MenuItem value="MU" id="879">
                              Mauritius
                            </MenuItem>
                            <MenuItem value="YT" id="880">
                              Mayotte
                            </MenuItem>
                            <MenuItem value="MX" id="881">
                              Mexico
                            </MenuItem>
                            <MenuItem value="FM" id="882">
                              Micronesia
                            </MenuItem>
                            <MenuItem value="MD" id="883">
                              Moldova
                            </MenuItem>
                            <MenuItem value="MC" id="884">
                              Monaco
                            </MenuItem>
                            <MenuItem value="MN" id="885">
                              Mongolia
                            </MenuItem>
                            <MenuItem value="ME" id="886">
                              Montenegro
                            </MenuItem>
                            <MenuItem value="MS" id="887">
                              Montserrat
                            </MenuItem>
                            <MenuItem value="MA" id="888">
                              Morocco
                            </MenuItem>
                            <MenuItem value="MZ" id="889">
                              Mozambique
                            </MenuItem>
                            <MenuItem value="MM" id="890">
                              Myanmar (Burma)
                            </MenuItem>
                            <MenuItem value="NA" id="891">
                              Namibia
                            </MenuItem>
                            <MenuItem value="NR" id="892">
                              Nauru
                            </MenuItem>
                            <MenuItem value="NP" id="893">
                              Nepal
                            </MenuItem>
                            <MenuItem value="NL" id="894">
                              Netherlands
                            </MenuItem>
                            <MenuItem value="NC" id="895">
                              New Caledonia
                            </MenuItem>
                            <MenuItem value="NZ" id="896">
                              New Zealand
                            </MenuItem>
                            <MenuItem value="NI" id="897">
                              Nicaragua
                            </MenuItem>
                            <MenuItem value="NE" id="898">
                              Niger
                            </MenuItem>
                            <MenuItem value="NG" id="899">
                              Nigeria
                            </MenuItem>
                            <MenuItem value="NU" id="900">
                              Niue
                            </MenuItem>
                            <MenuItem value="NF" id="901">
                              Norfolk Island
                            </MenuItem>
                            <MenuItem value="KP" id="902">
                              North Korea
                            </MenuItem>
                            <MenuItem value="MK" id="903">
                              North Macedonia
                            </MenuItem>
                            <MenuItem value="MP" id="904">
                              Northern Mariana Islands
                            </MenuItem>
                            <MenuItem value="NO" id="905">
                              Norway
                            </MenuItem>
                            <MenuItem value="OM" id="906">
                              Oman
                            </MenuItem>
                            <MenuItem value="PK" id="907">
                              Pakistan
                            </MenuItem>
                            <MenuItem value="PW" id="908">
                              Palau
                            </MenuItem>
                            <MenuItem value="PS" id="909">
                              Palestinian Territories
                            </MenuItem>
                            <MenuItem value="PA" id="910">
                              Panama
                            </MenuItem>
                            <MenuItem value="PG" id="911">
                              Papua New Guinea
                            </MenuItem>
                            <MenuItem value="PY" id="912">
                              Paraguay
                            </MenuItem>
                            <MenuItem value="PE" id="913">
                              Peru
                            </MenuItem>
                            <MenuItem value="PH" id="914">
                              Philippines
                            </MenuItem>
                            <MenuItem value="PN" id="915">
                              Pitcairn Islands
                            </MenuItem>
                            <MenuItem value="PL" id="916">
                              Poland
                            </MenuItem>
                            <MenuItem value="PT" id="917">
                              Portugal
                            </MenuItem>
                            <MenuItem value="PR" id="918">
                              Puerto Rico
                            </MenuItem>
                            <MenuItem value="QA" id="919">
                              Qatar
                            </MenuItem>
                            <MenuItem value="RE" id="920">
                              Réunion
                            </MenuItem>
                            <MenuItem value="RO" id="921">
                              Romania
                            </MenuItem>
                            <MenuItem value="RU" id="922">
                              Russia
                            </MenuItem>
                            <MenuItem value="RW" id="923">
                              Rwanda
                            </MenuItem>
                            <MenuItem value="WS" id="924">
                              Samoa
                            </MenuItem>
                            <MenuItem value="SM" id="925">
                              San Marino
                            </MenuItem>
                            <MenuItem value="ST" id="926">
                              São Tomé &amp; Príncipe
                            </MenuItem>
                            <MenuItem value="SA" id="927">
                              Saudi Arabia
                            </MenuItem>
                            <MenuItem value="SN" id="928">
                              Senegal
                            </MenuItem>
                            <MenuItem value="RS" id="929">
                              Serbia
                            </MenuItem>
                            <MenuItem value="SC" id="930">
                              Seychelles
                            </MenuItem>
                            <MenuItem value="SL" id="931">
                              Sierra Leone
                            </MenuItem>
                            <MenuItem value="SG" id="932">
                              Singapore
                            </MenuItem>
                            <MenuItem value="SX" id="933">
                              Sint Maarten
                            </MenuItem>
                            <MenuItem value="SK" id="934">
                              Slovakia
                            </MenuItem>
                            <MenuItem value="SI" id="935">
                              Slovenia
                            </MenuItem>
                            <MenuItem value="SB" id="936">
                              Solomon Islands
                            </MenuItem>
                            <MenuItem value="SO" id="937">
                              Somalia
                            </MenuItem>
                            <MenuItem value="ZA" id="938">
                              South Africa
                            </MenuItem>
                            <MenuItem value="GS" id="939">
                              South Georgia &amp; South Sandwich Islands
                            </MenuItem>
                            <MenuItem value="KR" id="940">
                              South Korea
                            </MenuItem>
                            <MenuItem value="SS" id="941">
                              South Sudan
                            </MenuItem>
                            <MenuItem value="ES" id="942">
                              Spain
                            </MenuItem>
                            <MenuItem value="LK" id="943">
                              Sri Lanka
                            </MenuItem>
                            <MenuItem value="BL" id="944">
                              St. Barthélemy
                            </MenuItem>
                            <MenuItem value="SH" id="945">
                              St. Helena
                            </MenuItem>
                            <MenuItem value="KN" id="946">
                              St. Kitts &amp; Nevis
                            </MenuItem>
                            <MenuItem value="LC" id="947">
                              St. Lucia
                            </MenuItem>
                            <MenuItem value="MF" id="948">
                              St. Martin
                            </MenuItem>
                            <MenuItem value="PM" id="949">
                              St. Pierre &amp; Miquelon
                            </MenuItem>
                            <MenuItem value="VC" id="950">
                              St. Vincent &amp; Grenadines
                            </MenuItem>
                            <MenuItem value="SD" id="951">
                              Sudan
                            </MenuItem>
                            <MenuItem value="SR" id="952">
                              Suriname
                            </MenuItem>
                            <MenuItem value="SJ" id="953">
                              Svalbard &amp; Jan Mayen
                            </MenuItem>
                            <MenuItem value="SE" id="954">
                              Sweden
                            </MenuItem>
                            <MenuItem value="CH" id="955">
                              Switzerland
                            </MenuItem>
                            <MenuItem value="SY" id="956">
                              Syria
                            </MenuItem>
                            <MenuItem value="TW" id="957">
                              Taiwan
                            </MenuItem>
                            <MenuItem value="TJ" id="958">
                              Tajikistan
                            </MenuItem>
                            <MenuItem value="TZ" id="959">
                              Tanzania
                            </MenuItem>
                            <MenuItem value="TH" id="960">
                              Thailand
                            </MenuItem>
                            <MenuItem value="TL" id="961">
                              Timor-Leste
                            </MenuItem>
                            <MenuItem value="TG" id="962">
                              Togo
                            </MenuItem>
                            <MenuItem value="TK" id="963">
                              Tokelau
                            </MenuItem>
                            <MenuItem value="TO" id="964">
                              Tonga
                            </MenuItem>
                            <MenuItem value="TT" id="965">
                              Trinidad &amp; Tobago
                            </MenuItem>
                            <MenuItem value="TN" id="966">
                              Tunisia
                            </MenuItem>
                            <MenuItem value="TR" id="967">
                              Turkey
                            </MenuItem>
                            <MenuItem value="TM" id="968">
                              Turkmenistan
                            </MenuItem>
                            <MenuItem value="TC" id="969">
                              Turks &amp; Caicos Islands
                            </MenuItem>
                            <MenuItem value="TV" id="970">
                              Tuvalu
                            </MenuItem>
                            <MenuItem value="UM" id="971">
                              U.S. Outlying Islands
                            </MenuItem>
                            <MenuItem value="VI" id="972">
                              U.S. Virgin Islands
                            </MenuItem>
                            <MenuItem value="UG" id="973">
                              Uganda
                            </MenuItem>
                            <MenuItem value="UA" id="974">
                              Ukraine
                            </MenuItem>
                            <MenuItem value="AE" id="975">
                              United Arab Emirates
                            </MenuItem>
                            <MenuItem value="GB" id="976">
                              United Kingdom
                            </MenuItem>
                            <MenuItem value="US" id="977">
                              United States
                            </MenuItem>
                            <MenuItem value="UY" id="978">
                              Uruguay
                            </MenuItem>
                            <MenuItem value="UZ" id="979">
                              Uzbekistan
                            </MenuItem>
                            <MenuItem value="VU" id="980">
                              Vanuatu
                            </MenuItem>
                            <MenuItem value="VA" id="981">
                              Vatican City
                            </MenuItem>
                            <MenuItem value="VE" id="982">
                              Venezuela
                            </MenuItem>
                            <MenuItem value="VN" id="983">
                              Vietnam
                            </MenuItem>
                            <MenuItem value="WF" id="984">
                              Wallis &amp; Futuna
                            </MenuItem>
                            <MenuItem value="EH" id="985">
                              Western Sahara
                            </MenuItem>
                            <MenuItem value="YE" id="986">
                              Yemen
                            </MenuItem>
                            <MenuItem value="ZM" id="987">
                              Zambia
                            </MenuItem>
                            <MenuItem value="ZW" id="988">
                              Zimbabwe
                            </MenuItem>
                          </Select>
                          {general.country.isError && (
                            <p className={classes.errorMsg}>
                              {general.country.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.state.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-state">
                            State
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-state"
                            type={'text'}
                            value={general.state.value}
                            onChange={handleChangeGeneral('state')}
                          />
                          {general.state.isError && (
                            <p className={classes.errorMsg}>
                              {general.state.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.birthday.isError}
                        >
                          {/* <InputLabel htmlFor="standard-adornment-general-birthday">
                      Birthday
                    </InputLabel> */}
                          <TextField
                            id="standard-adornment-general-birthday"
                            label="Birthday"
                            type={'date'}
                            value={general.birthday.value}
                            onChange={handleChangeGeneral('birthday')}
                            InputLabelProps={{
                              shrink: true
                            }}
                          />
                          {general.birthday.isError && (
                            <p className={classes.errorMsg}>
                              {general.birthday.errorMsg}
                            </p>
                          )}
                        </FormControl>

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={general.hideYearInProfile.value}
                              onChange={handleChangeGeneral(
                                'hideYearInProfile'
                              )}
                              name="hideYearInProfile"
                              color="primary"
                            />
                          }
                          error={general.hideYearInProfile.isError}
                          label="Hide year in profile"
                        />
                        <br />
                        {general.hideYearInProfile.isError && (
                          <>
                            <p className={classes.errorMsg}>
                              {general.hideYearInProfile.errorMsg}
                            </p>
                            <br />
                          </>
                        )}

                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.about.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-general-about">
                            About
                          </InputLabel>
                          <Input
                            id="standard-adornment-general-about"
                            type={'text'}
                            value={general.about.value}
                            onChange={handleChangeGeneral('about')}
                          />
                          {general.about.isError && (
                            <p className={classes.errorMsg}>
                              {general.about.errorMsg}
                            </p>
                          )}
                        </FormControl>
                      </SubTabPanel>
                      <SubTabPanel value={subValue} index={1}>
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.phonePrivate.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-communication-phone-private">
                              Phone Private
                            </InputLabel>
                            <Input
                              id="standard-adornment-communication-phone-private"
                              type={"text"}
                              value={general.phonePrivate.value}
                              onChange={handleChangeGeneral("phonePrivate")}
                            />
                            {general.phonePrivate.isError && (
                              <p className={classes.errorMsg}>
                                {general.phonePrivate.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.phoneWork.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-communication-phone-work">
                              Phone Work
                            </InputLabel>
                            <Input
                              id="standard-adornment-communication-phone-work"
                              type={"text"}
                              value={general.phoneWork.value}
                              onChange={handleChangeGeneral("phoneWork")}
                            />
                            {general.phoneWork.isError && (
                              <p className={classes.errorMsg}>
                                {general.phoneWork.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.mobile.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-communication-mobile">
                            Mobile
                          </InputLabel>
                          <Input
                            id="standard-adornment-communication-mobile"
                            type={'text'}
                            value={general.mobile.value}
                            onChange={handleChangeGeneral('mobile')}
                          />
                          {general.mobile.isError && (
                            <p className={classes.errorMsg}>
                              {general.mobile.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.fax.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-communication-fax">
                              Fax
                            </InputLabel>
                            <Input
                              id="standard-adornment-communication-fax"
                              type={"text"}
                              value={general.fax.value}
                              onChange={handleChangeGeneral("fax")}
                            />
                            {general.fax.isError && (
                              <p className={classes.errorMsg}>
                                {general.fax.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.skypeNickname.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-communication-skype-nickname">
                              Skype Nickname
                            </InputLabel>
                            <Input
                              id="standard-adornment-communication-skype-nickname"
                              type={"text"}
                              value={general.skypeNickname.value}
                              onChange={handleChangeGeneral("skypeNickname")}
                            />
                            {general.skypeNickname.isError && (
                              <p className={classes.errorMsg}>
                                {general.skypeNickname.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.xmppJabberAddress.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-communication-xmpp-jabber-address">
                              XMPP Jabber Address
                            </InputLabel>
                            <Input
                              id="standard-adornment-communication-xmpp-jabber-address"
                              type={"text"}
                              value={general.xmppJabberAddress.value}
                              onChange={handleChangeGeneral(
                                "xmppJabberAddress"
                              )}
                            />
                            {general.xmppJabberAddress.isError && (
                              <p className={classes.errorMsg}>
                                {general.xmppJabberAddress.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                      </SubTabPanel>
                      <SubTabPanel value={subValue} index={2}>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.url.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-social-bookmarks-url">
                            Url
                          </InputLabel>
                          <Input
                            id="standard-adornment-social-bookmarks-url"
                            type={'text'}
                            value={general.url.value}
                            onChange={handleChangeGeneral('url')}
                          />
                          {general.url.isError && (
                            <p className={classes.errorMsg}>
                              {general.url.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.facebookUrl.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-social-bookmarks-facebook-url">
                            Facebook URL
                          </InputLabel>
                          <Input
                            id="standard-adornment-social-bookmarks-facebook-url"
                            type={'text'}
                            value={general.facebookUrl.value}
                            onChange={handleChangeGeneral('facebookUrl')}
                          />
                          {general.facebookUrl.isError && (
                            <p className={classes.errorMsg}>
                              {general.facebookUrl.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.linkedinUrl.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-social-bookmarks-linkedin-url">
                              LinkedIn URL
                            </InputLabel>
                            <Input
                              id="standard-adornment-social-bookmarks-linkedin-url"
                              type={"text"}
                              value={general.linkedinUrl.value}
                              onChange={handleChangeGeneral("linkedinUrl")}
                            />
                            {general.linkedinUrl.isError && (
                              <p className={classes.errorMsg}>
                                {general.linkedinUrl.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.xingUrl.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-social-bookmarks-xing-url">
                              Xing URL
                            </InputLabel>
                            <Input
                              id="standard-adornment-social-bookmarks-xing-url"
                              type={"text"}
                              value={general.xingUrl.value}
                              onChange={handleChangeGeneral("xingUrl")}
                            />
                            {general.xingUrl.isError && (
                              <p className={classes.errorMsg}>
                                {general.xingUrl.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        <FormControl
                          className={clsx(classes.margin, classes.textField)}
                          error={general.youtubeUrl.isError}
                        >
                          <InputLabel htmlFor="standard-adornment-social-bookmarks-youtube-url">
                            Youtube URL
                          </InputLabel>
                          <Input
                            id="standard-adornment-social-bookmarks-youtube-url"
                            type={'text'}
                            value={general.youtubeUrl.value}
                            onChange={handleChangeGeneral('youtubeUrl')}
                          />
                          {general.youtubeUrl.isError && (
                            <p className={classes.errorMsg}>
                              {general.youtubeUrl.errorMsg}
                            </p>
                          )}
                        </FormControl>
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.vimeoUrl.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-social-bookmarks-vimeo-url">
                              Vimeo URL
                            </InputLabel>
                            <Input
                              id="standard-adornment-social-bookmarks-vimeo-url"
                              type={"text"}
                              value={general.vimeoUrl.value}
                              onChange={handleChangeGeneral("vimeoUrl")}
                            />
                            {general.vimeoUrl.isError && (
                              <p className={classes.errorMsg}>
                                {general.vimeoUrl.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.flickrUrl.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-social-bookmarks-flickr-url">
                              Flickr URL
                            </InputLabel>
                            <Input
                              id="standard-adornment-social-bookmarks-flickr-url"
                              type={"text"}
                              value={general.flickrUrl.value}
                              onChange={handleChangeGeneral("flickrUrl")}
                            />
                            {general.flickrUrl.isError && (
                              <p className={classes.errorMsg}>
                                {general.flickrUrl.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.myspaceUrl.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-social-bookmarks-myspace-url">
                              MySpace URL
                            </InputLabel>
                            <Input
                              id="standard-adornment-social-bookmarks-myspace-url"
                              type={"text"}
                              value={general.myspaceUrl.value}
                              onChange={handleChangeGeneral("myspaceUrl")}
                            />
                            {general.myspaceUrl.isError && (
                              <p className={classes.errorMsg}>
                                {general.myspaceUrl.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                        {/* <FormControl
                            className={clsx(classes.margin, classes.textField)}
                            error={general.twitterUrl.isError}
                          >
                            <InputLabel htmlFor="standard-adornment-social-bookmarks-twitter-url">
                              Twitter URL
                            </InputLabel>
                            <Input
                              id="standard-adornment-social-bookmarks-twitter-url"
                              type={"text"}
                              value={general.twitterUrl.value}
                              onChange={handleChangeGeneral("twitterUrl")}
                            />
                            {general.twitterUrl.isError && (
                              <p className={classes.errorMsg}>
                                {general.twitterUrl.errorMsg}
                              </p>
                            )}
                          </FormControl> */}
                      </SubTabPanel>
                    </div>
                    <hr />
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                    >
                      {' '}
                      <Button
                        className={classes.buttonPrimary}
                        variant="contained"
                        onClick={handleGeneralSubmit()}
                      >
                        Save profile
                      </Button>
                    </FormControl>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <div className="help-block">
                      Your current password can be changed here.{' '}
                    </div>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      error={changePassword.createPassword.isError}
                    >
                      <InputLabel htmlFor="standard-adornment-current-password">
                        Current Password*
                      </InputLabel>
                      <Input
                        id="standard-adornment-current-password"
                        type={
                          changePassword.createPassword.show
                            ? 'text'
                            : 'password'
                        }
                        value={changePassword.createPassword.value}
                        onChange={handleChangePassword('createPassword')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordCP(
                                'createPassword'
                              )}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {changePassword.createPassword.show ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {changePassword.createPassword.isError && (
                        <p className={classes.errorMsg}>
                          {changePassword.createPassword.errorMsg}
                        </p>
                      )}
                    </FormControl>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      error={changePassword.newPassword.isError}
                    >
                      <InputLabel htmlFor="standard-adornment-new-password">
                        New Password*
                      </InputLabel>
                      <Input
                        id="standard-adornment-new-password"
                        type={
                          changePassword.newPassword.show ? 'text' : 'password'
                        }
                        value={changePassword.newPassword.value}
                        onChange={handleChangePassword('newPassword')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordCP('newPassword')}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {changePassword.newPassword.show ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {changePassword.newPassword.isError && (
                        <p className={classes.errorMsg}>
                          {changePassword.newPassword.errorMsg}
                        </p>
                      )}
                    </FormControl>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      error={changePassword.confirmNewPassword.isError}
                    >
                      <InputLabel htmlFor="standard-adornment-confirm-new-password">
                        Confirm New Password*
                      </InputLabel>
                      <Input
                        id="standard-adornment-confirm-new-password"
                        type={
                          changePassword.confirmNewPassword.show
                            ? 'text'
                            : 'password'
                        }
                        value={changePassword.confirmNewPassword.value}
                        onChange={handleChangePassword('confirmNewPassword')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordCP(
                                'confirmNewPassword'
                              )}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {changePassword.confirmNewPassword.show ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {changePassword.confirmNewPassword.isError && (
                        <p className={classes.errorMsg}>
                          {changePassword.confirmNewPassword.errorMsg}
                        </p>
                      )}
                    </FormControl>
                    <hr />
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                    >
                      {' '}
                      <Button
                        className={classes.buttonPrimary}
                        variant="contained"
                        onClick={handleChangePasswordSubmit()}
                      >
                        Save
                      </Button>
                    </FormControl>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <strong>
                      Are you sure that you want to delete your account?
                    </strong>
                    <br />
                    <br />
                    <div className="alert alert-danger">
                      All your personal data will be irrevocably deleted.
                    </div>
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                      helperText="Enter your password to continue"
                      error={deleteAccount.password.isError}
                    >
                      <InputLabel htmlFor="standard-adornment-password">
                        Your Password*
                      </InputLabel>
                      <Input
                        id="standard-adornment-password"
                        type={deleteAccount.password.show ? 'text' : 'password'}
                        value={deleteAccount.password.value}
                        onChange={handleChangeDeleteAccount('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordDA}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {deleteAccount.password.show ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      {deleteAccount.password.isError && (
                        <p className={classes.errorMsg}>
                          {deleteAccount.password.errorMsg}
                        </p>
                      )}
                    </FormControl>
                    <hr />
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                    >
                      {' '}
                      <Button
                        className={classes.buttonDelete}
                        variant="contained"
                        onClick={handleDeleteAccountSubmit()}
                      >
                        Delete Account
                      </Button>
                    </FormControl>
                  </TabPanel>
                </div>
              </div>
            </SideTabPanel>

            <SideTabPanel value={sideValue} index={1}>
              <div className={classes.panelDefault}>
                <div className={classes.panelHeading}>
                  <strong>Table Notification</strong> Settings
                </div>
                <div className={classes.tableNotifcRoot}>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x" />
                                <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                              </span>
                            </TableCell>
                            <TableCell align="left">
                              <strong>E-Mail Summaries</strong> <br /> E-Mail
                              summaries are sent to inform you about recent
                              activities in the network
                            </TableCell>
                            <TableCell align="right">
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={tableNotification.email.value}
                                    onChange={toggleChecked('email')}
                                  />
                                }
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              <span className="fa-stack fa-lg">
                                <i className="fa fa-circle fa-stack-2x" />
                                <i className="fa fa-bell fa-stack-1x fa-inverse" />
                              </span>
                            </TableCell>
                            <TableCell align="left">
                              <strong>Notification</strong> <br /> Notification
                              are sent instantly to you to inform you about new
                              activities in your network.
                            </TableCell>
                            <TableCell align="right">
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={
                                      tableNotification.notification.value
                                    }
                                    onChange={toggleChecked('notification')}
                                  />
                                }
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </FormControl>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                    {' '}
                    <Button
                      className={classes.buttonPrimary}
                      variant="contained"
                      onClick={handleNotificSettingsSubmit()}
                      style={{ 'margin-top': '10px' }}
                    >
                      Save
                    </Button>
                  </FormControl>
                </div>
              </div>
            </SideTabPanel>

            <SideTabPanel value={sideValue} index={2}>
              <div className={classes.panelDefault}>
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
                      <Tab
                        label="Basic Settings"
                        {...a11yPropsUserSettings(0)}
                      />
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
                        <p className={classes.errorMsg}>
                          {userSettings.tags.errorMsg}
                        </p>
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
                            userSettings.hideIntroductionTourPanelOnDashboard
                              .value
                          }
                          onChange={handleChangeUserSettings(
                            'hideIntroductionTourPanelOnDashboard'
                          )}
                          name="hideIntroductionTourPanelOnDashboard"
                          color="primary"
                        />
                      }
                      error={
                        userSettings.hideIntroductionTourPanelOnDashboard
                          .isError
                      }
                      label="Hide introduction tour panel on dashboard"
                    />
                    <br />
                    {userSettings.hideIntroductionTourPanelOnDashboard
                      .isError && (
                      <>
                        <p className={classes.errorMsg}>
                          {
                            userSettings.hideIntroductionTourPanelOnDashboard
                              .errorMsg
                          }
                        </p>
                        <br />
                      </>
                    )}
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                    >
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
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Sort order</TableCell>
                            <TableCell align="left">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userTopicSettings.userSettingsTopicArr.value.length >
                          0 ? (
                            userTopicSettings.userSettingsTopicArr.value.map(
                              row => (
                                <TableRow key={row.name}>
                                  <TableCell component="th" scope="row">
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="left">
                                    {row.sortOrder}
                                  </TableCell>
                                  <TableCell align="left">
                                    {/* {row.action} */}
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      className={classes.buttonTopic}
                                      startIcon={
                                        <i
                                          className="fa fa-filter"
                                          aria-hidden="true"
                                        />
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
                                        <i
                                          className="fa fa-times"
                                          aria-hidden="true"
                                        />
                                      }
                                      onClick={handleClickOpenTopicDelete(row)}
                                    />
                                  </TableCell>
                                </TableRow>
                              )
                            )
                          ) : (
                            <TableRow>
                              <p className={classes.tableMsg}>
                                No results found.
                              </p>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </UserSetTabPanel>
                </div>
              </div>
            </SideTabPanel>
            <SideTabPanel value={sideValue} index={3}>
              <div className={classes.panelDefault}>
                <div className={classes.panelHeading}>
                  <strong>Security</strong> Settings
                </div>
                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs
                      value={securitySettingsValue}
                      onChange={handleChangeSecuritySet}
                      aria-label="simple tabs example"
                    >
                      <Tab
                        label="Your friends"
                        {...a11yPropsSecuritySettings(0)}
                      />
                      <Tab
                        label="Other users"
                        {...a11yPropsSecuritySettings(1)}
                      />
                      <Tab
                        label="Not registered users"
                        {...a11yPropsSecuritySettings(1)}
                      />
                    </Tabs>
                  </AppBar>
                  <SecuritySetTabPanel value={securitySettingsValue} index={0}>
                    <div className={classes.tableNotifcRoot}>
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                      >
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>Receive private messages </strong>
                                  {'  '}
                                  <span className="badge">
                                    MAIL
                                  </span> <br /> Allow others to send you
                                  private messages
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={
                                      securitySettings.YFReceivePrivateMessage
                                        .value
                                    }
                                    onChange={handleChangeSecuritySettings(
                                      'YFReceivePrivateMessage'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Allow
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>Create post</strong>
                                  {'  '}
                                  <span className="badge">
                                    Post
                                  </span> <br /> Allow others to create new
                                  posts on your profile page
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={securitySettings.YFCreatePost.value}
                                    onChange={handleChangeSecuritySettings(
                                      'YFCreatePost'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Allow
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>View your about page</strong>
                                  {'  '}
                                  <span className="badge">
                                    USER
                                  </span> <br /> Allows access to your about
                                  page with personal information
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={
                                      securitySettings.YFViewYourAboutPage.value
                                    }
                                    onChange={handleChangeSecuritySettings(
                                      'YFViewYourAboutPage'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Allow
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </FormControl>
                    </div>
                  </SecuritySetTabPanel>
                  <SecuritySetTabPanel value={securitySettingsValue} index={1}>
                    <div className={classes.tableNotifcRoot}>
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                      >
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>Receive private messages</strong>
                                  {'  '}
                                  <span className="badge">
                                    MAIL
                                  </span> <br /> Allow others to send you
                                  private messages
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={
                                      securitySettings.OUReceivePrivateMessage
                                        .value
                                    }
                                    onChange={handleChangeSecuritySettings(
                                      'OUReceivePrivateMessage'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Allow
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>

                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>Create post</strong>
                                  {'  '}
                                  <span className="badge">
                                    Post
                                  </span> <br /> Allow others to create new
                                  posts on your profile page
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={securitySettings.OUCreatePost.value}
                                    onChange={handleChangeSecuritySettings(
                                      'OUCreatePost'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Allow
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>View your about page</strong>
                                  {'  '}
                                  <span className="badge">
                                    USER
                                  </span> <br /> Allows access to your about
                                  page with personal information
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={
                                      securitySettings.OUViewYourAboutPage.value
                                    }
                                    onChange={handleChangeSecuritySettings(
                                      'OUViewYourAboutPage'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Allow
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </FormControl>
                    </div>
                  </SecuritySetTabPanel>
                  <SecuritySetTabPanel value={securitySettingsValue} index={2}>
                    <div className={classes.tableNotifcRoot}>
                      <FormControl
                        className={clsx(classes.margin, classes.textField)}
                      >
                        <TableContainer component={Paper}>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableBody>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>Create post</strong>
                                  {'  '}
                                  <span className="badge">
                                    Post
                                  </span> <br /> Allow others to create new
                                  posts on your profile page
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={securitySettings.NRUCreatePost.value}
                                    onChange={handleChangeSecuritySettings(
                                      'NRUCreatePost'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Deny
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  component="th"
                                  scope="row"
                                  align="left"
                                >
                                  <strong>View your about page</strong>
                                  {'  '}
                                  <span className="badge">
                                    USER
                                  </span> <br /> Allows access to your about
                                  page with personal information
                                </TableCell>
                                <TableCell align="right">
                                  <Select
                                    labelId="filled-age-native-simple"
                                    id="filled-age-native-simple"
                                    value={
                                      securitySettings.NRUViewYourAboutPage
                                        .value
                                    }
                                    onChange={handleChangeSecuritySettings(
                                      'NRUViewYourAboutPage'
                                    )}
                                  >
                                    <MenuItem value={'default'}>
                                      Default - Deny
                                    </MenuItem>
                                    <MenuItem value={'0'}>Deny</MenuItem>
                                    <MenuItem value={'1'}>Allow</MenuItem>
                                  </Select>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </FormControl>
                    </div>
                  </SecuritySetTabPanel>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                  >
                    {' '}
                    <Button
                      className={classes.buttonPrimary}
                      variant="contained"
                      onClick={handleSecuritySettingsSubmit()}
                    >
                      Save
                    </Button>
                  </FormControl>
                </div>
              </div>
            </SideTabPanel>

            <SideTabPanel value={sideValue} index={4}>
              <div className={classes.panelDefault}>
                <div className={classes.panelHeading}>
                  {myFriendsSettingsValue == 0 ? (
                    <>
                      <strong>My</strong> friends
                    </>
                  ) : myFriendsSettingsValue == 1 ? (
                    <>
                      <strong>Pending</strong> friend requests
                    </>
                  ) : (
                    <>
                      <strong>Sent</strong> friend requests
                    </>
                  )}
                </div>
                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs
                      value={myFriendsSettingsValue}
                      onChange={handleChangeMyFriendsSet}
                      aria-label="simple tabs example"
                    >
                      <Tab
                        label={'Friends (' + friends.length + ')'}
                        {...a11yPropsMyFriendsSettings(0)}
                      />
                      <Tab
                        label={'Requests (' + friends.length + ')'}
                        {...a11yPropsMyFriendsSettings(1)}
                      />
                      <Tab
                        label={'Send Requests (' + friends.length + ')'}
                        {...a11yPropsMyFriendsSettings(1)}
                      />
                    </Tabs>
                  </AppBar>
                  <MyFriendsSetTabPanel
                    value={myFriendsSettingsValue}
                    index={0}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              {' '}
                              <strong>Username</strong>{' '}
                            </TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Last name</TableCell>
                            <TableCell align="left">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {friends.length > 0 ? (
                            friends.map(row => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  {row.username}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">
                                  {row.lastname}
                                </TableCell>
                                <TableCell align="left">
                                  {/* {row.action} */}
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonFriendsDelete}
                                    onClick={handleClickUnfollowFriends(row)}
                                  >
                                    Unfollow
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <p className={classes.tableMsg}>
                                No results found.
                              </p>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </MyFriendsSetTabPanel>
                  <MyFriendsSetTabPanel
                    value={myFriendsSettingsValue}
                    index={1}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              {' '}
                              <strong>Username</strong>{' '}
                            </TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Last name</TableCell>
                            <TableCell align="left">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {friends.length > 0 ? (
                            friends.map(row => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  {row.username}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">
                                  {row.lastname}
                                </TableCell>
                                <TableCell align="left">
                                  {/* {row.action} */}
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonFriendsDelete}
                                    onClick={handleClickRequestFriends(
                                      row,
                                      'accept'
                                    )}
                                    style={{ background: '#97d271' }}
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonFriendsDelete}
                                    onClick={handleClickRequestFriends(
                                      row,
                                      'deny'
                                    )}
                                  >
                                    Deny
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <p className={classes.tableMsg}>
                                No results found.
                              </p>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </MyFriendsSetTabPanel>
                  <MyFriendsSetTabPanel
                    value={myFriendsSettingsValue}
                    index={2}
                  >
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              {' '}
                              <strong>Username</strong>{' '}
                            </TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Last name</TableCell>
                            <TableCell align="left">Action</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {friends.length > 0 ? (
                            friends.map(row => (
                              <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                  {row.username}
                                </TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">
                                  {row.lastname}
                                </TableCell>
                                <TableCell align="left">
                                  {/* {row.action} */}
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.buttonFriendsDelete}
                                    onClick={handleClickSendRequestFriends(row)}
                                  >
                                    Cancel
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <p className={classes.tableMsg}>
                                No results found.
                              </p>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </MyFriendsSetTabPanel>
                </div>
              </div>
            </SideTabPanel>
          </div>
        </Grid>
      </Grid>
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
    </div>
  );
};
const mapStateToProps = state => ({
  acccount: state.login.acccount,
  profile: state.login.profile,
  token: state.login.token,
  loginStatus: state.login.loginStatus
});
export default connect(mapStateToProps)(profileSettings);
