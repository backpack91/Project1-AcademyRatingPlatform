import {
  SHOW_ALL_FEEDS
} from '../constants/actionTypes';

const initialStates = {
  currentList: {}
};

export default function academyList (state = initialStates, action) {
  switch (action.type) {
    case SHOW_ALL_FEEDS:
      return {
        currentList: action.list
      };

    default:
      return state;
  }
}
