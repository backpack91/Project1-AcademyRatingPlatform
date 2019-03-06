import * as types from '../constants/ActionTypes';
// import _ from 'lodash';

const initialStates = {
  onLogin: false,
  token: '',
  user: {},
  isModalShownUp: false,
  modalTitle: ''
};

export default function auth (state = initialStates, action) {
  switch (action.type) {
    case types.SHOW_UP_AUTH_MODAL:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      }

    case types.SHOW_UP_RECEIPT_SUBMISSION_MODAL:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      }

      case types.CLOSE_MODAL:
        return {
          ...state,
          isModalShownUp: false,
          modalTitle: ''
        };

    default:
      return state;
  }
}
