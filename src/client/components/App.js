import React, {Component} from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { firebase, provider } from './../../services/firebaseConfig.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import LoginForm from './LoginForm.js';
import Modal from './Modal.js';
import AuthRequestCompletionNotice from './AuthRequestCompletionNotice.js';
import ReceiptSubmissionForm from './ReceiptSubmissionForm.js';
import AlreadyRegisteredUserNotice from './AlreadyRegisteredUserNotice.js';
import RegisterRequiredNotice from './RegisterRequiredNotice.js';
import "./App.scss";
import credentials from '../../server/config/credentials.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      access_token: '',
      searchKeyword: ''
    }

    this.logInWithFacebook = this.logInWithFacebook.bind(this);
    this.signUpWithFacebook = this.signUpWithFacebook.bind(this);
    this.requestNewMemberRegistration = this.requestNewMemberRegistration.bind(this);
    this.onTypingSearchKeyword = this.onTypingSearchKeyword.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  logInWithFacebook() {
    const that = this;

    firebase.auth().signInWithPopup(provider).then(function(result) {
      const user = result.user;

      axios.post('api/users/login', {
        facebook_id: user.uid
      })
      .then(res => {
        const decoded = jwt.verify(res.data.access_token, credentials.JWT_SECRET_KEY);

        that.props.appState.userLogin({
          name: decoded.name,
          access_token: res.data.access_token,
          email: decoded.email,
          image_profile: decoded.image_profile
        });
        that.props.appState.closeModal();
      })
      .catch(err => {
        that.props.appState.noticeUserRegisterRequired();
        console.error(err);
      });
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
  }

  signUpWithFacebook() {
    const that = this;

    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;

      axios.post('api/users/new', {
        token,
        facebook_id: user.uid
      })
      .then(res => {
        that.props.appState.showUpReceiptSubmissionForm();
        that.setState(state => ({
          user,
          token
        }));
      })
      .catch(err => {
        that.props.appState.noticeUserAlreadyRegistered();
        console.error(err);
      });
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.error("error.message : ", error.message);
    });
  }

  requestNewMemberRegistration() {
    const { uid, email, photoURL, displayName } = this.state.user;

    axios.post('api/users/new/registration', {
      receipt_image_url: `https://s3.ap-northeast-2.amazonaws.com/wondanggui-images/${uid}`,
      name: displayName,
      facebook_id: uid,
      email,
      image_profile: photoURL,
    })
    .then(res => {
      console.log('status code : ', res.status);
    })
    .catch(err => {
      console.error(err);
    });
  }

  onTypingSearchKeyword(e) {
    const input = e.target;

    this.setState(state => ({
      searchKeyword: input.value
    }));
  }

  onSearch(e) {
    if (e.keyCode === 13) {
      this.props.appState.onSearch(this.state.searchKeyword);
    }
  }

  render () {
    return (
      <Router>
        <div className="appWrapper">
          <Header
            showUpLoginForm={this.props.appState.showUpLoginForm}
            onLogin={this.props.appState.onLogin}
            user={this.props.appState.user}
            onTypingSearchKeyword={this.onTypingSearchKeyword}
            onSearch={this.onSearch}
          />
          <AcademyList academyList={this.props.appState.currentList}/>
          {this.props.appState.isModalShownUp
            ? <Modal closeModal={this.props.appState.closeModal} >
                {this.props.appState.modalTitle === 'LoginForm'
                  ? <LoginForm
                      logInWithFacebook={this.logInWithFacebook}
                      signUpWithFacebook={this.signUpWithFacebook}
                    />
                  : null}
                {this.props.appState.modalTitle === 'ReceiptSubmissionForm'
                  ? <ReceiptSubmissionForm
                      showUpAuthRequestCompletionModal={this.props.appState.showUpAuthRequestCompletionNotice}
                      user={this.state.user}
                      tokne={this.state.token}
                      requestNewMemberRegistration={this.requestNewMemberRegistration}
                    />
                  : null}
                {this.props.appState.modalTitle === 'AuthRequestCompletionNotice'
                  ? <AuthRequestCompletionNotice
                      closeModal={this.props.appState.closeModal}
                    />
                  : null}
                {this.props.appState.modalTitle === 'AlreadyRegisteredUserNotice'
                  ? <AlreadyRegisteredUserNotice
                      showUpLoginForm={this.props.appState.showUpLoginForm}
                    />
                  : null}
                {this.props.appState.modalTitle === 'RegisterRequiredNotice'
                  ? <RegisterRequiredNotice
                      showUpLoginForm={this.props.appState.showUpLoginForm}
                    />
                  : null}
              </Modal>
            : null}
        </div>
      </Router>
    );
  }
}

export default App;
