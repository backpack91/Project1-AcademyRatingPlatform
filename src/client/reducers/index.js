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
import {
  USER_LOG_IN,
  USER_LOG_OUT,
  FEED_LIST,
  ON_SEARCH,
  ACADEMY_DETAILS,
  TOGGLING_REVIEWS,
  TOGGLING_REVIEW_INPUT,
  TOGGLING_ACCOUNT_MENU,
  ADDING_NEW_REVIEW,
  ACADEMY_DETAILS_PAGE_INITIALIZATION
} from '../constants/actionTypes.js';
import * as _ from 'lodash';

const initialStates = {
  onLogin: false,
  access_token: '',
  user: {},
  isModalShownUp: false,
  modalTitle: '',
  currentList: {},
  isReviewsShownUp: false,
  isReviewInputShownUp: false,
  isAccountMenuShownUp: false,
  academyDetails: {}
};

export default function reducer (state = initialStates, action) {
  let academyDetailsClone;

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

      case USER_LOG_OUT:
        return {
          ...state,
          isAccountMenuShownUp: false,
          onLogin: false
        };

    case ACADEMY_REGISTRATION_FORM:
    return {
      ...state,
      isModalShownUp: true,
      modalTitle: action.modalTitle
    };

    case ACADEMY_REGISTRATION_FORM:
    return {
      ...state,
      isModalShownUp: true,
      modalTitle: action.modalTitle
    };

    case LOGIN_REQUIRED_FORM:
    return {
      ...state,
      isModalShownUp: true,
      modalTitle: action.modalTitle
    };

    case FEED_LIST:
      return {
        ...state,
        currentList: action.list
      };

    case ACADEMY_REGISTRATION_COMPLETION_FORM:
      return {
        ...state,
        isModalShownUp: true,
        modalTitle: action.modalTitle
      };

    case ACADEMY_DETAILS:
      academyDetailsClone = _.cloneDeep(action.payload);
      academyDetailsClone.data.reviews.reverse();

      return {
        ...state,
        // academyDetails: action.payload
        academyDetails: academyDetailsClone
      };

    case TOGGLING_REVIEWS:
      if (state.isReviewsShownUp) {
        return {
          ...state,
          isReviewsShownUp: false
        };
      } else {
        return {
          ...state,
          isReviewsShownUp: true
        };
      }

    case TOGGLING_REVIEW_INPUT:
      if (state.isReviewInputShownUp) {
        return {
          ...state,
          isReviewInputShownUp: false
        };
      } else {
        return {
          ...state,
          isReviewInputShownUp: true
        };
      }

    case TOGGLING_ACCOUNT_MENU:
      if (state.isAccountMenuShownUp) {
        return {
          ...state,
          isAccountMenuShownUp: false
        };
      } else {
        return {
          ...state,
          isAccountMenuShownUp: true
        };
      }

    case ADDING_NEW_REVIEW:
      academyDetailsClone = _.cloneDeep(state.academyDetails);
      academyDetailsClone.data.reviews.unshift(action.review);

      return {
        ...state,
        academyDetails: academyDetailsClone
      };

    case ACADEMY_DETAILS_PAGE_INITIALIZATION:
      return  {
        ...state,
        isReviewsShownUp: false,
        isReviewInputShownUp: false
      };

    default:
      return state;
  }
}
