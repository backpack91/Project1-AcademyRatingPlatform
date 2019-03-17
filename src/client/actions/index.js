import {
  USER_LOG_IN,
  USER_LOG_OUT,
  FEED_LIST,
  ON_SEARCH,
  ACADEMY_DETAILS,
  TOGGLING_REVIEWS,
  TOGGLING_REVIEW_INPUT,
  TOGGLING_ACCOUNT_MENU
} from '../constants/actionTypes';
import {
  CLOSE_MODAL,
  SHOW_UP_LOGIN_FORM,
  SHOW_UP_RECEIPT_SUBMISSION_FORM,
  SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
  ALREADY_REGISTERED_USER_NOTICE,
  REGISTER_REQUIRED_NOTICE,
  ACADEMY_REGISTRATION_FORM,
  LOGIN_REQUIRED_FORM,
  ACADEMY_REGISTRATION_COMPLETION_FORM
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

export function userLogout() {
  return {
    type: USER_LOG_OUT
  };
}

export function feedList(feedList) {
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

export function academyRegistrationForm() {
  return {
    type: ACADEMY_REGISTRATION_FORM,
    modalTitle: 'AcademyRegistrationForm'
  };
}

export function submissionAcademyInfos(academyInfos) {
  return {
    type: SUBMISSION_ACADEMY_INFOS,
    academyInfos
  };
}

export function loginRequiredForm() {
  return {
    type: LOGIN_REQUIRED_FORM,
    modalTitle: 'LoginRequiredForm'
  };
}

export function academyRegistrationCompletionForm() {
  return {
    type: ACADEMY_REGISTRATION_COMPLETION_FORM,
    modalTitle: 'AcademyRegistrationCompletionForm'
  };
}

export function academyDetails(payload) {
  return {
    type: ACADEMY_DETAILS,
    payload,
  };
}

export function togglingReviews() {
  return {
    type: TOGGLING_REVIEWS
  };
}

export function togglingReviewInput() {
  return {
    type: TOGGLING_REVIEW_INPUT
  };
}

export function togglingAccountMenu() {
  return {
    type: TOGGLING_ACCOUNT_MENU
  };
}
