import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducers from './authReducers';
import postReducers from './postReducers';

export default combineReducers({
  posts: postReducers,
  auth: authReducers,
  form: formReducer,
});
