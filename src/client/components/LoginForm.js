import React, {Component, Fragment} from "react";
import "./LoginForm.scss";
import { firebase, provider } from './firebaseConfig.js';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.logInWithFacebook = this.logInWithFacebook.bind(this);
    this.signUpWithFacebook = this.signUpWithFacebook.bind(this);
  }

  logInWithFacebook() {
    const closeModal = this.props.closeModal;

    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;
      closeModal();
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
  }

  signUpWithFacebook() {
    const showUpReceiptSubmissionForm = this.props.showUpReceiptSubmissionForm;

    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;
      showUpReceiptSubmissionForm();
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });
  }

  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }

    return (
      <Fragment>
        <div className="LoginForm">
          <div className="logo">
            <div>
              원장님귀는
            </div>
            <div>
              당나귀귀
            </div>
          </div>
          <div className="loginOptionWrapper">
            <div>
              로그인하기
            </div>
            <div className="facebookAccountBtn" onClick={this.logInWithFacebook}>
              facebook계정으로 로그인하기
            </div>
            <div>
              회원가입하기
            </div>
            <div className="facebookAccountBtn" onClick={this.signUpWithFacebook}>
              facebook계정으로 가입하기
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LoginForm;
