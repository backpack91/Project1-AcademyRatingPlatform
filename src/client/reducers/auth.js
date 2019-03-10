import {
  CLOSE_MODAL,
  SHOW_UP_LOGIN_FORM,
  SHOW_UP_RECEIPT_SUBMISSION_FORM,
  SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
  ALREADY_REGISTERED_USER_NOTICE,
  REGISTER_REQUIRED_NOTICE
} from '../constants/modalTypes';
import {
  USER_LOG_IN,
  USER_LOG_OUT
} from '../constants/actionTypes.js';

const initialStates = {
  onLogin: false,
  access_token: '',
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

    case REGISTER_REQUIRED_NOTICE:
      return {
        ...state,
        modalTitle: action.modalTitle
      };

    case USER_LOG_IN:
      return {
        ...state,
        isModalShownUp: false,
        onLogin: true,
        access_token: action.access_token,
        user: {
          name: action.name,
          email: action.email,
          image_profile: action.image_profile
        }
      };

    default:
      return state;
  }
}
