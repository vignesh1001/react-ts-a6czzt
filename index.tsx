import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';
import GroupSubTabs from './pages/admin/settings/Users/GroupSubTabs';
import { makeStyles } from '@material-ui/core/styles';
import 'font-awesome/css/font-awesome.min.css';
import ScatterChart from './ScatterChart';
import Users from './pages/admin/settings/Users/Users';

interface AppProps {}
interface AppState {
  name: string;
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
      '& .MuiTab-textColorInherit.Mui-selected': {
        backgroundColor: '#01adae!important',
        borderRadius: '5px!important',
        color: '#fff !important'
      },
      '& .MuiTab-wrapper': {
        color: '#555 !important',
        fontSize: '11px!important',
        paddingLeft: '0px!important',
        paddingRight: '7px!important'
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
  buttonAddNew: {
    backgroundColor: '#5bb519',
    color: '#FFF',
    height: 25,
    borderRadius: 20,
    padding: 14,
    '&,&:hover,&:focus': {
      backgroundColor: '#5bb519'
    }
  },
  buttonExport: {
    height: 25,
    color: '#FFF',
    backgroundColor: '#59e8f9',
    borderRadius: 20,
    padding: 14,
    '&,&:hover,&:focus': {
      backgroundColor: '#59e8f9'
    }
  },
  userActionsButton: {
    height: 26,
    color: '#969696',
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 8,
    '& .MuiButton-label': {
      display: 'flex !important',
      justifyContent: 'center',
      alignItems: 'center'
    },
    '& .MuiButton-endIcon,.MuiButton-startIcon': {
      margin: '0 !important'
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

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <ScatterChart />
      <Users />
      {/* <GroupSubTabs classes={classes} />*/}
    </div>
  );
};

render(<App />, document.getElementById('root'));
