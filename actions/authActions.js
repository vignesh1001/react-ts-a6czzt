import { NotificationManager } from 'react-notifications';
import { SET_CURRENT_USER } from './types';
import UserService from '../services/UserService';

export const loginUser = (userDetails, path) => dispatch => {
  UserService.authenticateUser(userDetails)
    .then(response => {
      const { token, profile, acccount } = response;
      acccount.isGuest = acccount.user_group !== 4;

      localStorage.setItem('token', token);
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('account', JSON.stringify(acccount));

      dispatch(setCurrentUser(token, profile, acccount));
      NotificationManager.success(
        `Enjoy your party!`,
        `Welcome Back ${profile.firstname} ${profile.lastname}`,
        2000
      );
    })
    .catch(error => {
      NotificationManager.error(
        typeof error === 'string' ? error : error.response.data.error
      );
    })
    .finally();
};

export const LoginOut = () => dispatch => {
  localStorage.clear();
  dispatch(setCurrentUser());
};

export const LoginCheck = () => dispatch => {
  dispatch(setCurrentUser());
};

export const setCurrentUser = (
  token = localStorage.getItem('token', token)
    ? localStorage.getItem('token', token)
    : '',
  profile = JSON.parse(localStorage.getItem('profile')),
  acccount = JSON.parse(localStorage.getItem('account'))
) => {
  return {
    type: SET_CURRENT_USER,
    token: token,
    profile: profile,
    acccount: acccount
  };
};
