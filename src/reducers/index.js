import { combineReducers } from 'redux';
import auth from './auth';
import manage from './manage';

export default combineReducers({
  auth,
  manage
});
