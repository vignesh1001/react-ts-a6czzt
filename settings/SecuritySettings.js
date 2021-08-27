import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  AppBar,
  Button,
  FormControl,
  MenuItem,
  Select,
  Tab,
  Tabs,
  Box,
  Typography,
  Paper
} from '@material-ui/core';
import clsx from 'clsx';
import axios from 'axios';

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

function a11yPropsSecuritySettings(index) {
  return {
    id: `security-settings-simple-tab-${index}`,
    'aria-controls': `security-settings-simple-tabpanel-${index}`
  };
}

const SecuritySettings = ({ classes }) => {
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
  const [securitySettingsValue, setSecuritySettingsValue] = React.useState(1);

  React.useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/getProfileSecuritySettings`, {
        headers: { Authorization: `Bearer ${props.token}` }
      })
      .then(response => {
        const { default_permission, permission_list } = response;

        securitySettings.OUCreatePost.value = '2';
        securitySettings.OUReceivePrivateMessage.value = '2';
        securitySettings.NRUCreatePost.value = '2';
        securitySettings.NRUViewYourAboutPage.value = '2';

        if (default_permission.u_user) {
          if (
            default_permission.u_user[
              'humhub\\modules\\post\\permissions\\CreatePost'
            ]
          ) {
            const value =
              default_permission.u_user[
                'humhub\\modules\\post\\permissions\\CreatePost'
              ];
            if (value === 0 || value === '0') {
              securitySettings.OUCreatePost.value = '2';
            } else if (value === 1 || value === '1') {
              securitySettings.OUCreatePost.value = '3';
            }
          } else if (
            default_permission.u_user[
              'humhub\\modules\\user\\permissions\\ViewAboutPage'
            ]
          ) {
            const value =
              default_permission.u_user[
                'humhub\\modules\\user\\permissions\\ViewAboutPage'
              ];
            if (value === 0 || value === '0') {
              securitySettings.OUViewYourAboutPage.value = '2';
            } else if (value === 1 || value === '1') {
              securitySettings.OUViewYourAboutPage.value = '3';
            }
          }
        }
        if (default_permission.u_guest) {
          if (
            default_permission.u_guest[
              'humhub\\modules\\post\\permissions\\CreatePost'
            ]
          ) {
            const value =
              default_permission.u_guest[
                'humhub\\modules\\post\\permissions\\CreatePost'
              ];
            if (value === 0 || value === '0') {
              securitySettings.NRUCreatePost.value = '2';
            } else if (value === 1 || value === '1') {
              securitySettings.NRUCreatePost.value = '3';
            }
          } else if (
            default_permission.u_guest[
              'humhub\\modules\\user\\permissions\\ViewAboutPage'
            ]
          ) {
            const value =
              default_permission.u_guest[
                'humhub\\modules\\user\\permissions\\ViewAboutPage'
              ];
            if (value === 0 || value === '0') {
              securitySettings.NRUViewYourAboutPage.value = '2';
            } else if (value === 1 || value === '1') {
              securitySettings.NRUViewYourAboutPage.value = '3';
            }
          }
        }
        // const DEFAULT_u_user_CreatePost =
        //   default_permission.u_user[
        //     'humhub\\modules\\post\\permissions\\CreatePost'
        //   ];

        // const DEFAULT_u_user_ViewAboutPage =
        //   default_permission.u_user[
        //     'humhub\\modules\\user\\permissions\\ViewAboutPage'
        //   ];

        // const DEFAULT_u_guest_CreatePost =
        //   default_permission.u_guest[
        //     'humhub\\modules\\post\\permissions\\CreatePost'
        //   ];

        // const DEFAULT_u_guest_ViewAboutPage =
        //   default_permission.u_guest[
        //     'humhub\\modules\\user\\permissions\\ViewAboutPage'
        //   ];
        // securitySettings.OUCreatePost.value = DEFAULT_u_user_CreatePost
        //   ? DEFAULT_u_user_CreatePost.state + ''
        //   : '0';

        // securitySettings.OUViewYourAboutPage.value = DEFAULT_u_user_ViewAboutPage
        //   ? DEFAULT_u_user_ViewAboutPage.state + ''
        //   : '0';

        // securitySettings.NRUCreatePost.value = DEFAULT_u_guest_CreatePost
        //   ? DEFAULT_u_guest_CreatePost.state + ''
        //   : '0';
        // securitySettings.NRUViewYourAboutPage.value = DEFAULT_u_guest_ViewAboutPage
        //   ? DEFAULT_u_guest_ViewAboutPage.state + ''
        //   : '0';

        permission_list.forEach(item => {
          if (item.group_id === 'u_user') {
            if (item.module_id === 'post') {
              securitySettings.OUCreatePost.value = item.state;
            }
            if (item.module_id === 'user') {
              securitySettings.OUViewYourAboutPage.value = item.state;
            }
          } else if (item.group_id === 'u_guest') {
            if (item.module_id === 'post') {
              securitySettings.NRUCreatePost.value = item.state;
            }
            if (item.module_id === 'user') {
              securitySettings.NRUViewYourAboutPage.value = item.state;
            }
          }
        });
        setSecuritySettings({ ...securitySettings });
        /*{
        "permission_list": [
          {
            "permission_id": "humhub\\modules\\user\\permissions\\ViewAboutPage",
            "contentcontainer_id": 1,
            "group_id": "u_friend",
            "module_id": "user",
            "class": "humhub\\modules\\user\\permissions\\ViewAboutPage",
            "state": 0
          }
        ],
        "default_permission": {
          "u_friend": {
            "humhub\\modules\\mail\\permissions\\SendMail": {
              "module_id": "mail",
              "state": 1
            },
            "humhub\\modules\\post\\permissions\\CreatePost": {
              "module_id": "post",
              "state": 1
            },
            "humhub\\modules\\user\\permissions\\ViewAboutPage": {
              "module_id": "user",
              "state": 1
            }
          },
          "u_user": {
            "humhub\\modules\\mail\\permissions\\SendMail": {
              "module_id": "mail",
              "state": 1
            },
            "humhub\\modules\\post\\permissions\\CreatePost": {
              "module_id": "post",
              "state": 1
            },
            "humhub\\modules\\user\\permissions\\ViewAboutPage": {
              "module_id": "user",
              "state": 1
            }
          },
          "u_guest": {
            "humhub\\modules\\user\\permissions\\ViewAboutPage": {
              "module_id": "user",
              "state": 0
            }
          }
        }
      }
      */
      });
  }, []);
  const handleChangeSecuritySettings = (
    prop,
    groupId,
    moduleId,
    permissionId
  ) => event => {
    let Obj = securitySettings[prop];
    if (event.target.type === 'checkbox') {
      Obj['value'] = event.target.checked;
    } else {
      Obj['value'] = event.target.value;
    }
    setSecuritySettings({ ...securitySettings, [prop]: Obj });
    const state = Obj['value'];
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/setProfileSecuritySettings`,
        {
          groupId,
          moduleId,
          permissionId,
          state: state > 1 ? 2 : state
        },
        {
          headers: { Authorization: `Bearer ${props.token}` }
        }
      )
      .then(response => {}, errorResponse => {});
  };

  /*const handleSecuritySettingsSubmit = () => event => {
    /*
      {
        groupId : u_friend / u_user / u_guest
        moduleId : mail / post / user
        permissionId :
        humhub\modules\mail\permissions\SendMail
        or
        humhub\modules\post\permissions\CreatePost
        or
        humhub\modules\user\permissions\ViewAboutPage
        state : 0 / 1
      }
    * /
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/setProfileSecuritySettings`, {
        headers: { Authorization: `Bearer ${props.token}` }
      })
      .then(response => {}, errorResponse => {});
    console.log(securitySettings);
  };*/

  const handleChangeSecuritySet = (event, newValue) => {
    setSecuritySettingsValue(newValue);
  };

  return (
    <>
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
            {/*<Tab label="Your friends" {...a11yPropsSecuritySettings(0)} />*/}
            <Tab label="Other users" {...a11yPropsSecuritySettings(1)} />
            <Tab
              label="Not registered users"
              {...a11yPropsSecuritySettings(1)}
            />
          </Tabs>
        </AppBar>
        {/* <SecuritySetTabPanel value={securitySettingsValue} index={0}>
          <div className={classes.tableNotifcRoot}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                          <strong>Receive private messages </strong>
                          {'  '}
                          <span className="badge">MAIL</span> <br /> Allow others
                          to send you private messages
                      </TableCell>
                      <TableCell align="right">
                          <Select
                              labelId="filled-age-native-simple"
                              id="filled-age-native-simple"
                              value={securitySettings.YFReceivePrivateMessage.value}
                              onChange={handleChangeSecuritySettings(
                                'YFReceivePrivateMessage'
                              )}
                          >
                            <MenuItem value={'default'}>Default - Allow</MenuItem>
                            <MenuItem value={'0'}>Deny</MenuItem>
                            <MenuItem value={'1'}>Allow</MenuItem>
                          </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Create post</strong>
                        {'  '}
                        <span className="badge">Post</span> <br /> Allow others
                        to create new posts on your profile page
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
                          <MenuItem value={'default'}>Default - Allow</MenuItem>
                          <MenuItem value={'0'}>Deny</MenuItem>
                          <MenuItem value={'1'}>Allow</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>View your about page</strong>
                        {'  '}
                        <span className="badge">USER</span> <br /> Allows access
                        to your about page with personal information
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          labelId="filled-age-native-simple"
                          id="filled-age-native-simple"
                          value={securitySettings.YFViewYourAboutPage.value}
                          onChange={handleChangeSecuritySettings(
                            'YFViewYourAboutPage'
                          )}
                        >
                          <MenuItem value={'default'}>Default - Allow</MenuItem>
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
        </SecuritySetTabPanel> */}
        <SecuritySetTabPanel value={securitySettingsValue} index={0}>
          <div className={classes.tableNotifcRoot}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    {/*<TableRow>
                        <TableCell component="th" scope="row" align="left">
                            <strong>Receive private messages</strong>
                            {'  '}
                            <span className="badge">MAIL</span> <br /> Allow others
                            to send you private messages*
                        </TableCell>
                        <TableCell align="right">
                            <Select
                                labelId="filled-age-native-simple"
                                id="filled-age-native-simple"
                                value={securitySettings.OUReceivePrivateMessage.value}
                                onChange={handleChangeSecuritySettings(
                                    'OUReceivePrivateMessage'
                                )}
                            >
                                <MenuItem value={'default'}>Default - Allow</MenuItem>
                                <MenuItem value={'0'}>Deny</MenuItem>
                                <MenuItem value={'1'}>Allow</MenuItem>
                            </Select>
                        </TableCell>
                    </TableRow>*/}
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Create post</strong>
                        {'  '}
                        <span className="badge">Post</span> <br /> Allow others
                        to create new posts on your profile page
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          labelId="filled-age-native-simple"
                          id="filled-age-native-simple"
                          value={securitySettings.OUCreatePost.value}
                          onChange={handleChangeSecuritySettings(
                            'OUCreatePost',
                            'u_user',
                            'post',
                            'humhub\\modules\\post\\permissions\\CreatePost'
                          )}
                        >
                          {securitySettings.OUCreatePost.value === '3' ? (
                            <MenuItem value={'3'}>Default - Allow</MenuItem>
                          ) : (
                            <MenuItem value={'4'}>Default - Deny</MenuItem>
                          )}
                          <MenuItem value={'0'}>Deny</MenuItem>
                          <MenuItem value={'1'}>Allow</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>View your about page</strong>
                        {'  '}
                        <span className="badge">USER</span> <br /> Allows access
                        to your about page with personal information
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          labelId="filled-age-native-simple"
                          id="filled-age-native-simple"
                          value={securitySettings.OUViewYourAboutPage.value}
                          onChange={handleChangeSecuritySettings(
                            'OUViewYourAboutPage',
                            'u_user',
                            'user',
                            'humhub\\modules\\user\\permissions\\ViewAboutPage'
                          )}
                        >
                          {securitySettings.OUViewYourAboutPage.value ===
                          '3' ? (
                            <MenuItem value={'3'}>Default - Allow</MenuItem>
                          ) : (
                            <MenuItem value={'4'}>Default - Deny</MenuItem>
                          )}
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
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>Create post</strong>
                        {'  '}
                        <span className="badge">Post</span> <br /> Allow others
                        to create new posts on your profile page
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          labelId="filled-age-native-simple"
                          id="filled-age-native-simple"
                          value={securitySettings.NRUCreatePost.value}
                          onChange={handleChangeSecuritySettings(
                            'NRUCreatePost',
                            'u_guest',
                            'post',
                            'humhub\\modules\\post\\permissions\\CreatePost'
                          )}
                        >
                          {securitySettings.NRUCreatePost.value === '3' ? (
                            <MenuItem value={'3'}>Default - Allow</MenuItem>
                          ) : (
                            <MenuItem value={'4'}>Default - Deny</MenuItem>
                          )}
                          <MenuItem value={'0'}>Deny</MenuItem>
                          <MenuItem value={'1'}>Allow</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" align="left">
                        <strong>View your about page</strong>
                        {'  '}
                        <span className="badge">USER</span> <br /> Allows access
                        to your about page with personal information
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          labelId="filled-age-native-simple"
                          id="filled-age-native-simple"
                          value={securitySettings.NRUViewYourAboutPage.value}
                          onChange={handleChangeSecuritySettings(
                            'NRUViewYourAboutPage',
                            'u_guest',
                            'user',
                            'humhub\\modules\\user\\permissions\\ViewAboutPage'
                          )}
                        >
                          {securitySettings.NRUViewYourAboutPage.value ===
                          '3' ? (
                            <MenuItem value={'3'}>Default - Allow</MenuItem>
                          ) : (
                            <MenuItem value={'4'}>Default - Deny</MenuItem>
                          )}
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
        {/* <FormControl className={clsx(classes.margin, classes.textField)}>
          {' '}
          <Button
            className={classes.buttonPrimary}
            variant="contained"
            onClick={handleSecuritySettingsSubmit()}
          >
            Save
          </Button>
        </FormControl> */}
      </div>
    </>
  );
};

export default SecuritySettings;
