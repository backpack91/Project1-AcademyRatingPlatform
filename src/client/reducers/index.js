import { combineReducers } from "redux";
import auth from './auth.js';
import academyList from './academyList.js';

const rootReducer = combineReducers({
  auth,
  academyList
});

export default rootReducer;
