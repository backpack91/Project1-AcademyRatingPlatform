import {
  USER_LOG_IN,
  USER_LOG_OUT,
  FEED_LIST,
  ON_SEARCH,
} from '../constants/actionTypes';
import {
  CLOSE_MODAL,
  SHOW_UP_LOGIN_FORM,
  SHOW_UP_RECEIPT_SUBMISSION_FORM,
  SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
  ALREADY_REGISTERED_USER_NOTICE,
  REGISTER_REQUIRED_NOTICE
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

export function userLogin(loginInfos) {
  return {
    type: USER_LOG_IN,
    name: loginInfos.name,
    access_token: loginInfos.access_token,
    email: loginInfos.email,
    image_profile: loginInfos.image_profile
  };
}

export function feedList(feedList) {
  console.log('feedlist!!!!!!!!!!!!!in action:', feedList.data);
  return {
    type: FEED_LIST,
    list: feedList.data
  };
}

export function alreadyRegisteredUserNotice() {
  return {
    type: ALREADY_REGISTERED_USER_NOTICE,
    modalTitle: 'AlreadyRegisteredUserNotice'
  };
}

export function registerRequiredNotice() {
  return {
    type: REGISTER_REQUIRED_NOTICE,
    modalTitle: 'RegisterRequiredNotice'
  };
}
