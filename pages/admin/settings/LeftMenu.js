import { AppBar, Button, DialogActions, Tab, Tabs } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

function a11yPropSide(index) {
  return {
    id: `side-simple-tab-${index}`,
    'aria-controls': `side-simple-tabpanel-${index}`
  };
}
function LeftMenu({
  classes = {},
  setSideValue = () => {},
  sideValue,
  acccount = {}
}) {
  const handleChangeSide = (event, newValue) => {
    setSideValue(newValue);
  };
  return (
    <div className={classes.sideRoot}>
      <Button
        className={classes.buttonPrimary}
        color="primary"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        <Link href={`/profile/${acccount.username}`}>
          <a className={classes.dropdownLink} style={{ color: 'white' }}>
            Back to Profile
          </a>
        </Link>
      </Button>
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
              label="Users"
              {...a11yPropSide(0)}
            />
            {/* <Tab
                      icon={<i className="fa fa-envelope"></i>}
                      label="E-Mail Summaries"
                      {...a11yPropSide(1)}
                    /> */}
            <Tab
              icon={<i className="fa fa-bell" />}
              label="Spaces"
              {...a11yPropSide(1)}
            />
            <Tab
              icon={<i className="fa fa-wrench" />}
              label="Settings"
              {...a11yPropSide(2)}
            />
            {/*<Tab
                            icon={<i className="fa fa-lock"/>}
                            label="Security"
                            {...a11yPropSide(3)}
                        />*/}
            {/* <Tab
                      icon={<i className="fa fa-rocket"></i>}
                      label="Modules"
                      {...a11yPropSide(5)}
                    /> */}
            {/*<Tab>*/}
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
