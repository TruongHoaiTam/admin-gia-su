import { combineReducers } from 'redux';
import auth from './auth';
import manage from './manage';
import detail from './detail';

export default combineReducers({
  auth,
  manage,
  detail
});
