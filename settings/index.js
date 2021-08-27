import Header from '@components/Header/Header';
import { Grid } from '@material-ui/core';
import LeftMenu from '@pages/profile/settings/LeftMenu';
import Profile from '@pages/profile/settings/Profile';
import { connect } from 'react-redux';
import TableNotificationSetttings from './TableNotificationSetttings';
import UserSetttings from './UserSetttings';

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

function settings({ handleChangeSide, a11yPropSide, ...props }) {
  const [sideValue, setSideValue] = React.useState(0);

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
          <LeftMenu
            a11yPropSide={a11yPropSide}
            handleChangeSide={handleChangeSide}
            sideValue={sideValue}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <div className={classes.body}>
            <SideTabPanel value={sideValue} index={0}>
              <div className={classes.panelDefault}>
                <Profile {...props} />
              </div>
            </SideTabPanel>
            <SideTabPanel value={sideValue} index={1}>
              <div className={classes.panelDefault}>
                <TableNotificationSetttings />
              </div>
            </SideTabPanel>
            <SideTabPanel value={sideValue} index={2}>
              <div className={classes.panelDefault}>
                <UserSetttings />
              </div>
            </SideTabPanel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = state => ({
  acccount: state.login.acccount,
  profile: state.login.profile,
  token: state.login.token,
  loginStatus: state.login.loginStatus
});
export default connect(mapStateToProps)(settings);
