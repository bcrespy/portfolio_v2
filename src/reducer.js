import { combineReducers } from 'redux';

import playground from './reducers/playground';
import work from './reducers/work';


export default combineReducers({
  playground,
  work
});