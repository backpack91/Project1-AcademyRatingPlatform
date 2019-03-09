import React, {Component} from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { firebase, provider } from './../../services/firebaseConfig.js';
import axios from 'axios';
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import LoginForm from './LoginForm.js';
import Modal from './Modal.js';
import AuthRequestCompletionNotice from './AuthRequestCompletionNotice.js';
import ReceiptSubmissionForm from './ReceiptSubmissionForm.js';
import AlreadyRegisteredUserNotice from './AlreadyRegisteredUserNotice.js';
import "./App.scss";



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      token: ''
    }

    this.logInWithFacebook = this.logInWithFacebook.bind(this);
    this.signUpWithFacebook = this.signUpWithFacebook.bind(this);
    this.requestNewMemberRegistration = this.requestNewMemberRegistration.bind(this);
  }

  logInWithFacebook() {
    const that = this;

    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;

      that.props.appState.closeModal();
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
        if (res.status === 200) {
          that.props.appState.showUpReceiptSubmissionForm();
        }  else {
          that.props.appState.noticeUserAlreadyRegistered();
        }
        that.setState(state => ({
          user,
          token
        }));
      })
      .catch(err => {
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

  render () {
    return (
      <Router>
        <div className="appWrapper">
          <Header showUpLoginForm={this.props.appState.showUpLoginForm}/>
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
              </Modal>
            : null}
        </div>
      </Router>
    );
  }
}

export default App;
