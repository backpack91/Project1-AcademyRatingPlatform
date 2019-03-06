import React, {Component, Fragment} from "react";
import "./AuthModal.scss";
import { firebase, provider } from './firebaseConfig.js';
// import SocialLogin from 'react-social-login'

class AuthModal extends Component {
  constructor(props) {
    super(props);

    this.logInWithFacebook = this.logInWithFacebook.bind(this);
    this.signUpWithFacebook = this.signUpWithFacebook.bind(this);
  }

  componentDidMount () {
  }

  logInWithFacebook() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log('token: ', token);
      // The signed-in user info.
      var user = result.user;
      console.log('user: ', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signUpWithFacebook() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      console.log('token: ', token);
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }

    console.log('Auth Modal props => ', this.props);

    return (
      <Fragment>
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
          <div className="nextBtn">
            <button onClick={this.props.showUpReceiptSubmissionModal}>다음</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AuthModal;
