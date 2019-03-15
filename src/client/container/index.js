import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App.js';
import axios from 'axios';
import {
  userLogin,
  feedList,
  showUpLoginForm,
  closeModal,
  showUpReceiptSubmissionForm,
  showUpAuthRequestCompletionNotice,
  registerRequiredNotice,
  alreadyRegisteredUserNotice,
  onSearch,
  academyRegistrationForm,
  submissionAcademyInfos,
  loginRequiredForm,
  academyRegistrationCompletionForm,
  academyDetails,
  togglingReviews,
  togglingReviewInput
} from '../actions';

class AppContainer extends Component {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return (
      <App appState={this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentList: state.currentList,
    isModalShownUp: state.isModalShownUp,
    modalTitle: state.modalTitle,
    access_token: state.access_token,
    user: state.user,
    onLogin: state.onLogin,
    academyDetails: state.academyDetails,
    isReviewsShownUp: state.isReviewsShownUp,
    isReviewInputShownUp: state.isReviewInputShownUp
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      axios.get('api/academies')
      .then(res => {
        dispatch(feedList(res));
      })
      .catch(err => {
        console.log(err);
      });
    },
    getAcademyDetails: (academy_id) => {
      axios.get(`http://localhost:3000/api/academies/${academy_id}`)
      .then(res => {
        dispatch(academyDetails(res))
      })
      .catch(err => {
        console.log('err: ', err);
      });
    },
    showUpLoginForm: () => {
      dispatch(showUpLoginForm());
    },
    closeModal: () => {
      dispatch(closeModal());
    },
    showUpReceiptSubmissionForm: () => {
      dispatch(showUpReceiptSubmissionForm());
    },
    showUpAuthRequestCompletionNotice: () => {
      dispatch(showUpAuthRequestCompletionNotice());
    },
    showUpLoginRequiredForm: () => {
      dispatch(loginRequiredForm());
    },
    showUpAcademyRegistrationCompletionForm: () => {
      dispatch(academyRegistrationCompletionForm());
    },
    noticeUserAlreadyRegistered: () => {
      dispatch(alreadyRegisteredUserNotice());
    },
    noticeUserRegisterRequired: () => {
      dispatch(registerRequiredNotice());
    },
    userLogin: (loginInfos) => {
      dispatch(userLogin(loginInfos));
    },
    onSearch: (searchKeyword) => {
      axios.get(`http://localhost:3000/api/academies?q=${searchKeyword}`)
      .then(res => {
        dispatch(feedList(res));
      })
      .catch(err => {
        console.error(err);
      });
    },
    showUpAcademyRegistrationForm: () => {
      dispatch(academyRegistrationForm());
    },
    submitAcademyInfos: (academyInfos) => {
      dispatch(submissionAcademyInfos(academyInfos));
    },
    toggleReview: () => {
      dispatch(togglingReviews());
    },
    toggleReviewInput: () => {
      dispatch(togglingReviewInput());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
