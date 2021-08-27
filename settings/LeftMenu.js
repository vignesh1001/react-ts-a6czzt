import { AppBar, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
  }
}));

function LeftMenu({ sideValue, handleChangeSide, a11yPropSide }) {
  const classes = useStyles();

  return (
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
            {/*<Tab*/}
            {/*    icon={<i className="fa fa-users"></i>}*/}
            {/*    label="Friends"*/}
            {/*    {...a11yPropSide(4)}*/}
            {/*/>*/}
          </Tabs>
        </AppBar>
      </div>
    </div>
  );
}

export default LeftMenu;
