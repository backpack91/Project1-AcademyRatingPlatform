import * as types from '../constants/ActionTypes';
// import _ from 'lodash';

const initialStates = {
  onLogin: false,
  token: '',
  user: {},
  isModalShownUp: false
};

export default function auth (state = initialStates, action) {
  switch (action.type) {
    case types.SHOW_UP_LOGIN_MODAL:
      return {
        isModalShownUp: true
      }

      case types.CLOSE_LOGIN_MODAL:
        return {
          isModalShownUp: false
        };

    default:
      return state;
  }
}
