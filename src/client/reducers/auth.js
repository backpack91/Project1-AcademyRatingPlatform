import {
  CLOSE_MODAL,
  SHOW_UP_LOGIN_FORM,
  SHOW_UP_RECEIPT_SUBMISSION_FORM,
  SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
  ALREADY_REGISTERED_USER_NOTICE
} from '../constants/modalTypes';

const initialStates = {
  onLogin: false,
  token: '',
  user: {},
  isModalShownUp: false,
  modalTitle: ''
};

export default function auth (state = initialStates, action) {
  switch (action.type) {
    case SHOW_UP_LOGIN_FORM:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      };

    case SHOW_UP_RECEIPT_SUBMISSION_FORM:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      };

    case SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      };

    case CLOSE_MODAL:
      return {
        ...state,
        isModalShownUp: false,
        modalTitle: ''
      };

    case ALREADY_REGISTERED_USER_NOTICE:
      return {
        ...state,
        modalTitle: action.modalTitle
      };

    default:
      return state;
  }
}
