import * as types from '../constants/ActionTypes';

export function showUpLoginForm() {
  return {
    type: types.SHOW_UP_LOGIN_FORM,
    modalTitle: 'LoginForm'
  };
}

export function showUpReceiptSubmissionForm() {
  return {
    type: types.SHOW_UP_RECEIPT_SUBMISSION_FORM,
    modalTitle: 'ReceiptSubmissionForm'
  };
}

export function showUpAuthRequestCompletionNotice() {
  return {
    type: types.SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
    modalTitle: 'AuthRequestCompletionNotice'
  };
}

export function closeModal() {
  return {
    type: types.CLOSE_MODAL
  };
}

export function getLoggedIn(loginInfos) {
  return {
    type: types.USER_LOG_IN,
    id: loginInfos.token,
    user: loginInfos.user
  };
}

export function showAllFeeds(feedList) {
  return {
    type: types.SHOW_ALL_FEEDS,
    list: feedList.data
  };
}
