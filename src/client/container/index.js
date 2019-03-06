import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getLoggedIn,
  showAllFeeds,
  showUpLoginForm,
  closeModal,
  showUpReceiptSubmissionForm,
  showUpAuthRequestCompletionNotice
} from '../actions';
import App from '../components/App.js';
import axios from 'axios';


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
    currentList: state.academyList.currentList,
    isModalShownUp: state.auth.isModalShownUp,
    modalTitle: state.auth.modalTitle
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      axios.get('../../../public/dummy.json')
      .then(res => {
        dispatch(showAllFeeds(res));
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
