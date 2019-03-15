import reducer from '../reducers';
import { expect, equal } from 'chai';
import {
  CLOSE_MODAL,
  SHOW_UP_LOGIN_FORM,
  SHOW_UP_RECEIPT_SUBMISSION_FORM,
  SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
} from '../constants/modalTypes';
import {
  USER_LOG_IN,
  FEED_LIST,
} from '../constants/actionTypes.js';

const initialStates = {
  onLogin: false,
  access_token: '',
  user: {},
  isModalShownUp: false,
  modalTitle: '',
  currentList: {},
  isReviewsShownUp: false
};

describe("reducer function", function() {
  describe('SHOW_UP_LOGIN_FORM case', function() {
    const action = {
      type: SHOW_UP_LOGIN_FORM,
      modalTitle: 'LoginForm'
    };

    it('returned object contains some values changed from initial state', function() {
      expect(reducer(initialStates, action).isModalShownUp).to.equal(true);
      expect(reducer(initialStates, action).modalTitle).to.equal('LoginForm');
    });

    it('some values from initial state should be maintained', function() {
      expect(reducer(initialStates, action).onLogin).to.equal(false);
      expect(reducer(initialStates, action).access_token).to.equal('');
      expect(Object.keys(reducer(initialStates, action).user).length).to.equal(Object.keys(initialStates.user).length);
      expect(Object.keys(reducer(initialStates, action).currentList).length).to.equal(Object.keys(initialStates.currentList).length);
      expect(reducer(initialStates, action).isReviewsShownUp).to.equal(false);
    });

    it('initial state and returned state should has different reference', function() {
      expect(reducer(initialStates, action)).not.to.equal(initialStates);
    });
  });

  describe('SHOW_UP_RECEIPT_SUBMISSION_FORM case', function() {
    const action = {
      type: SHOW_UP_RECEIPT_SUBMISSION_FORM,
      modalTitle: 'ReceiptSubmissionForm'
    };

    it('returned object contains some values changed from initial state', function() {
      expect(reducer(initialStates, action).isModalShownUp).to.equal(true);
      expect(reducer(initialStates, action).modalTitle).to.equal('ReceiptSubmissionForm');
    });

    it('some values from initial state should be maintained', function() {
      expect(reducer(initialStates, action).onLogin).to.equal(false);
      expect(reducer(initialStates, action).access_token).to.equal('');
      expect(Object.keys(reducer(initialStates, action).user).length).to.equal(Object.keys(initialStates.user).length);
      expect(Object.keys(reducer(initialStates, action).currentList).length).to.equal(Object.keys(initialStates.currentList).length);
      expect(reducer(initialStates, action).isReviewsShownUp).to.equal(false);
    });

    it('initial state and returned state should has different reference', function() {
      expect(reducer(initialStates, action)).not.to.equal(initialStates);
    });
  });

  describe('SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE case', function() {
    const action = {
      type: SHOW_UP_AUTH_REQUEST_COMPLETION_NOTICE,
      modalTitle: 'AuthRequestCompletionNotice'
    };

    it('returned object contains some values changed from initial state', function() {
      expect(reducer(initialStates, action).isModalShownUp).to.equal(true);
      expect(reducer(initialStates, action).modalTitle).to.equal('AuthRequestCompletionNotice');
    });

    it('some values from initial state should be maintained', function() {
      expect(reducer(initialStates, action).onLogin).to.equal(false);
      expect(reducer(initialStates, action).access_token).to.equal('');
      expect(Object.keys(reducer(initialStates, action).user).length).to.equal(Object.keys(initialStates.user).length);
      expect(Object.keys(reducer(initialStates, action).currentList).length).to.equal(Object.keys(initialStates.currentList).length);
      expect(reducer(initialStates, action).isReviewsShownUp).to.equal(false);
    });

    it('initial state and returned state should has different reference', function() {
      expect(reducer(initialStates, action)).not.to.equal(initialStates);
    });
  });

  describe('CLOSE_MODAL case', function() {
    const action = {
      type: CLOSE_MODAL,
      modalTitle: ''
    };

    it('returned object contains some values changed from initial state', function() {
      expect(reducer(initialStates, action).isModalShownUp).to.equal(false);
      expect(reducer(initialStates, action).modalTitle).to.equal('');
    });

    it('some values from initial state should be maintained', function() {
      expect(reducer(initialStates, action).onLogin).to.equal(false);
      expect(reducer(initialStates, action).access_token).to.equal('');
      expect(Object.keys(reducer(initialStates, action).user).length).to.equal(Object.keys(initialStates.user).length);
      expect(Object.keys(reducer(initialStates, action).currentList).length).to.equal(Object.keys(initialStates.currentList).length);
      expect(reducer(initialStates, action).isReviewsShownUp).to.equal(false);
    });

    it('initial state and returned state should has different reference', function() {
      expect(reducer(initialStates, action)).not.to.equal(initialStates);
    });
  });

  describe('USER_LOG_IN case', function() {
    const action = {
      type: USER_LOG_IN,
      name: 'JongRyul',
      access_token: '123123',
      email: 'vaco@gmail.com',
      image_profile: 'image_sample'
    };

    it('returned object contains some values changed from initial state', function() {
      expect(reducer(initialStates, action).isModalShownUp).to.equal(false);
      expect(reducer(initialStates, action).onLogin).to.equal(true);
      expect(reducer(initialStates, action).access_token).to.equal('123123');
      expect(reducer(initialStates, action).user.name).to.equal('JongRyul');
      expect(reducer(initialStates, action).user.email).to.equal('vaco@gmail.com');
      expect(reducer(initialStates, action).user.image_profile).to.equal('image_sample');
    });

    it('some values from initial state should be maintained', function() {
      expect(Object.keys(reducer(initialStates, action).currentList).length).to.equal(Object.keys(initialStates.currentList).length);
      expect(reducer(initialStates, action).isReviewsShownUp).to.equal(false);
      expect(reducer(initialStates, action).modalTitle).to.equal('');
    });

    it('initial state and returned state should has different reference', function() {
      expect(reducer(initialStates, action)).not.to.equal(initialStates);
    });
  });

  describe('FEED_LIST case', function() {
    const sampleList = [
      {
        "name" : "바닐라코딩",
        "rate" : 5.0
      },
      {
        "name" : "코드스테이츠",
        "rate" : 3.5
      }
    ];

    const action = {
      type: FEED_LIST,
      list: sampleList
    };

    it('returned object contains some values changed from initial state', function() {
      expect(reducer(initialStates, action).currentList).to.equal(sampleList);
    });

    it('some values from initial state should be maintained', function() {
      expect(reducer(initialStates, action).onLogin).to.equal(false);
      expect(reducer(initialStates, action).access_token).to.equal('');
      expect(Object.keys(reducer(initialStates, action).user).length).to.equal(Object.keys(initialStates.user).length);
      expect(Object.keys(reducer(initialStates, action).user).length).to.equal(Object.keys(initialStates.user).length);
      expect(reducer(initialStates, action).isReviewsShownUp).to.equal(false);
      expect(reducer(initialStates, action).modalTitle).to.equal('');
    });

    it('initial state and returned state should has different reference', function() {
      expect(reducer(initialStates, action)).not.to.equal(initialStates);
    });
  });
});
