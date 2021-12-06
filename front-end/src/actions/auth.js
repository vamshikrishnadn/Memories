import { SIGNIN, SIGNUP, LOGOUT, AUTH_ERROR } from './type';
import * as api from '../api';

export const signin = (formValues, history) => async dispatch => {
  try {
    const signin = (await api.signin(formValues)) || '';
    dispatch({
      type: SIGNIN,
      payload: signin.data,
    });
    history.push('/');
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Invalid Email or Password',
    });
  }
};

export const signup = (formValues, history) => async dispatch => {
  try {
    const signup = await api.signup(formValues);
    dispatch({
      type: SIGNUP,
      payload: signup.data,
    });
    history.push('/signin');
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: 'Email Already Exist',
    });
  }
};

export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT,
  });
};
