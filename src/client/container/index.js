import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App.js';
import axios from 'axios';
import credentials from '../../server/config/credentials.js';
import jwt from 'jsonwebtoken';

import {
  userLogin,
  userLogout,
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
  togglingReviewInput,
  togglingAccountMenu
} from '../actions';

class AppContainer extends Component {
  componentDidMount() {
    const access_token = localStorage.getItem('access_token');

    this.props.onMount();

    if (access_token) {
      const decoded = jwt.verify(access_token, credentials.JWT_SECRET_KEY);

      this.props.userLogin({
        name: decoded.name,
        access_token,
        email: decoded.email,
        image_profile: decoded.image_profile
      });
    }
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
    isReviewInputShownUp: state.isReviewInputShownUp,
    isAccountMenuShownUp: state.isAccountMenuShownUp
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
      axios.get(`/api/academies/${academy_id}`)
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
    userLogout: () => {
      localStorage.removeItem('access_token');
      dispatch(userLogout());
    },
    onSearch: (searchKeyword) => {
      axios.get(`/api/academies?q=${searchKeyword}`)
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
    },
    toggleAccountMenu: () => {
      dispatch(togglingAccountMenu());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
