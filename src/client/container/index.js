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
  onSearch
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
  console.log('state.academyList.currentList: ', state.academyList.currentList)
  return {
    currentList: state.academyList.currentList,
    isModalShownUp: state.auth.isModalShownUp,
    modalTitle: state.auth.modalTitle,
    access_token: state.auth.accessToken,
    user: state.auth.user,
    onLogin: state.auth.onLogin,
    searchKeyword: state.academyList
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
      axios.get(`api/academies?q=${searchKeyword}`)
      .then(res => {
        dispatch(feedList(res));
      })
      .catch(err => {
        console.error(err);
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
