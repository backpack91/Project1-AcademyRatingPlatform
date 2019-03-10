import {
  FEED_LIST,
  ON_SEARCH
} from '../constants/actionTypes';

const initialStates = {
  currentList: {}
};

export default function academyList (state = initialStates, action) {
  switch (action.type) {
    case FEED_LIST:
      return {
        currentList: action.list
      }; 

    default:
      return state;
  }
}
