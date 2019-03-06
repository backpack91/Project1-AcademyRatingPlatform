import * as types from '../constants/ActionTypes';

const initialStates = {
  onLogin: false,
  token: '',
  user: {},
  isModalShownUp: false,
  modalTitle: ''
};

export default function auth (state = initialStates, action) {
  switch (action.type) {
    case types.SHOW_UP_LOGIN_FORM:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      };

    case types.SHOW_UP_RECEIPT_SUBMISSION_FORM:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      };

    case types.SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      };

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
