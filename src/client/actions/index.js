import * as types from '../constants/ActionTypes';

export function showUpLoginModal () {
  return {
    type: types.SHOW_UP_LOGIN_MODAL
  };
}

export function closeLoginModal () {
  return {
    type: types.CLOSE_LOGIN_MODAL
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
