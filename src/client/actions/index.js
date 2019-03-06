import * as types from '../constants/ActionTypes';

export function showUpAuthModal () {
  return {
    type: types.SHOW_UP_AUTH_MODAL,
    modalTitle: 'Auth'
  };
}

export function showUpReceiptSubmissionModal () {
  return {
    type: types.SHOW_UP_RECEIPT_SUBMISSION_MODAL,
    modalTitle: 'ReceiptSubmission'
  };
}

export function showUpAuthRequestCompletionModal () {
  return {
    type: types.SHOW_UP_AUTH_REQUEST_COMPLETION_MODAL,
    modalTitle: 'AuthRequestCompletion'
  };
}

export function closeModal () {
  return {
    type: types.CLOSE_MODAL
  };
}

export function getLoggedIn (loginInfos) {
  return {
    type: types.USER_LOG_IN,
    id: loginInfos.token,
    user: loginInfos.user
  };
}

export function showAllFeeds (feedList) {
  return {
    type: types.SHOW_ALL_FEEDS,
    list: feedList.data
  };
}
