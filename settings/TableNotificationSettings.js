import {
  Button,
  FormControl,
  FormControlLabel,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Switch
} from '@material-ui/core';
import clsx from 'clsx';

function TableNotificationSetttings({ classes }) {
  const toggleChecked = prop => event => {
    let Obj = tableNotification[prop];
    Obj['value'] = !Obj['value'];
    setTableNotification({ ...tableNotification, [prop]: Obj });
  };

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

  const handleNotificSettingsSubmit = () => {};

  return (
    <>
      <div className={classes.panelHeading}>
        <strong>Table Notification</strong> Settings
      </div>
      <div className={classes.tableNotifcRoot}>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x" />
                      <i className="fa fa-envelope fa-stack-1x fa-inverse" />
                    </span>
                  </TableCell>
                  <TableCell align="left">
                    <strong>E-Mail Summaries</strong> <br /> E-Mail summaries
                    are sent to inform you about recent activities in the
                    network
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
                    <strong>Notification</strong> <br /> Notification are sent
                    instantly to you to inform you about new activities in your
                    network.
                  </TableCell>
                  <TableCell align="right">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={tableNotification.notification.value}
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
        <FormControl className={clsx(classes.margin, classes.textField)}>
          {' '}
          <Button
            className={classes.buttonPrimary}
            variant="contained"
            onClick={handleNotificSettingsSubmit}
            style={{ 'margin-top': 10 }}
          >
            Save
          </Button>
        </FormControl>
      </div>
    </>
  );
}

export default TableNotificationSetttings;
