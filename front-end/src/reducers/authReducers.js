import { LOGOUT, SIGNIN, AUTH_ERROR } from '../actions/type';

export default (state = { authData: null, token: null, errorMessage: '' }, action) => {
  switch (action.type) {
    case SIGNIN:
      const token = localStorage.setItem('profile', JSON.stringify(action.payload));
      return { ...state, authData: action.payload, token };
    case LOGOUT:
      localStorage.removeItem('profile');
      return { ...state, authData: null, token: null };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
