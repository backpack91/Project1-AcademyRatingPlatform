import * as types from '../constants/ActionTypes';

const initialStates = {
  currentList: {}
};

export default function academyList (state = initialStates, action) {
  switch (action.type) {
    case types.SHOW_ALL_FEEDS:
      return {
        currentList: action.list
      };

    default:
      return state;
  }
}
