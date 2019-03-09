import {
  GET_LOGGED_IN,
  GET_LOGGED_OUT,
  SHOW_ALL_FEEDS,
} from '../constants/actionTypes';
import {
  CLOSE_MODAL,
  SHOW_UP_LOGIN_FORM,
  SHOW_UP_RECEIPT_SUBMISSION_FORM,
  SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
  ALREADY_REGISTERED_USER_NOTICE
} from '../constants/modalTypes';

export function showUpLoginForm() {
  return {
    type: SHOW_UP_LOGIN_FORM,
    modalTitle: 'LoginForm'
  };
}

export function showUpReceiptSubmissionForm() {
  return {
    type: SHOW_UP_RECEIPT_SUBMISSION_FORM,
    modalTitle: 'ReceiptSubmissionForm'
  };
}

export function showUpAuthRequestCompletionNotice() {
  return {
    type: SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
    modalTitle: 'AuthRequestCompletionNotice'
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL
  };
}

export function getLoggedIn(loginInfos) {
  return {
    type: USER_LOG_IN,
    id: loginInfos.token,
    user: loginInfos.user
  };
}

export function showAllFeeds(feedList) {
  return {
    type: SHOW_ALL_FEEDS,
    list: feedList.data
  };
}

export function alreadyRegisteredUserNotice() {
  return {
    type: ALREADY_REGISTERED_USER_NOTICE,
    modalTitle: 'AlreadyRegisteredUserNotice'
  };
}
