import React, {Component} from "react";
import { BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";
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
import AcademyRegistrationForm from './AcademyRegistrationForm.js';
import LoginRequiredForm from './LoginRequiredForm.js';
import AcademyRegistrationCompletionForm from './AcademyRegistrationCompletionForm.js';
import SearchInput from './SearchInput.js';
import Academy from './Academy.js';
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
    this.checkAuth = this.checkAuth.bind(this);
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

        localStorage.setItem('access_token', res.data.access_token);
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

      axios.post('/api/users/new', {
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

  checkAuth() {
    if (this.props.appState.access_token) {
      this.props.appState.showUpAcademyRegistrationForm();
    } else {
      this.props.appState.showUpLoginRequiredForm();
    }
  }

  render () {
    return (
      <Router>
        <div className='appWrapper'>
            <Route exact path='/'
            render={() =>
              <Redirect to='/newFeeds' />
            }
          />
        <Route path='/newFeeds'
            render={() => (
              <Header
                showUpLoginForm={this.props.appState.showUpLoginForm}
                onLogin={this.props.appState.onLogin}
                user={this.props.appState.user}
                showUpAcademyRegistrationForm={this.props.appState.showUpAcademyRegistrationForm}
                checkAuth={this.checkAuth}
                isAccountMenuShownUp={this.props.appState.isAccountMenuShownUp}
                toggleAccountMenu={this.props.appState.toggleAccountMenu}
                userLogout={this.props.appState.userLogout}
              />
            )}
          />
        <Route exact path='/newFeeds'
            render={() => (
              <SearchInput
                onTypingSearchKeyword={this.onTypingSearchKeyword}
                onSearch={this.onSearch}
              />
            )}
          />
        <Route exact path='/newFeeds'
            render={() => (
              <AcademyList
                academyList={this.props.appState.currentList}
                initializeAcademyDetailsPageState={this.props.appState.initializeAcademyDetailsPageState}
                getAcademyList={this.props.appState.getAcademyList}
              />
            )}
          />
        <Route exact path='/newFeeds/:academy_id'
            render={(props) => (
              <Academy
                {...props}
                getAcademyDetails={this.props.appState.getAcademyDetails}
                academyDetails={this.props.appState.academyDetails}
                toggleReview={this.props.appState.toggleReview}
                isReviewsShownUp={this.props.appState.isReviewsShownUp}
                toggleReviewInput={this.props.appState.toggleReviewInput}
                isReviewInputShownUp={this.props.appState.isReviewInputShownUp}
                accessToken={this.props.appState.access_token}
                addAcademyReview={this.props.appState.addAcademyReview}
              />
            )}
          />
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
                {this.props.appState.modalTitle === 'AcademyRegistrationForm'
                  ? <AcademyRegistrationForm
                      showUpAcademyRegistrationCompletionForm={this.props.appState.showUpAcademyRegistrationCompletionForm}
                    />
                  : null}
                {this.props.appState.modalTitle === 'LoginRequiredForm'
                  ? <LoginRequiredForm
                      showUpLoginForm={this.props.appState.showUpLoginForm}
                    />
                  : null}
                {this.props.appState.modalTitle === 'AcademyRegistrationCompletionForm'
                  ? <AcademyRegistrationCompletionForm
                      closeModal={this.props.appState.closeModal}
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
