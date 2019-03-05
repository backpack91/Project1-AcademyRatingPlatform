import { combineReducers } from "redux";
import auth from './auth.js';
import academyList from './academyList.js';

// 객체의 형태를 정의하기 위해 ES6의 객체리터럴 단축문법을 사용
const rootReducer = combineReducers({
  auth,
  academyList
});

export default rootReducer;
