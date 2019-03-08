import React, {Component} from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import LoginForm from './LoginForm.js';
import Modal from './Modal.js';
import AuthRequestCompletionNotice from './AuthRequestCompletionNotice.js';
import ReceiptSubmissionForm from './ReceiptSubmissionForm.js';
import "./App.scss";
import { firebase, provider } from './../../services/firebaseConfig.js';
import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: ''
    }

    this.logInWithFacebook = this.logInWithFacebook.bind(this);
    this.signUpWithFacebook = this.signUpWithFacebook.bind(this);
    this.submitReceiptPhoto = this.submitReceiptPhoto.bind(this);
  }

  logInWithFacebook() {
    const closeModal = this.props.appState.closeModal;

    firebase.auth().signInWithPopup(provider).then(function(result) {
      const token = result.credential.accessToken;
      const user = result.user;
      console.log('login success: ', {
        token,
        user
      });
      closeModal();
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
      console.log('singUp success: ', {
        token,
        user
      });

      that.setState(state => ({
        user_id: user.uid
      }));

      axios.post('api/users/new', {
        token,
        user
      })
      .then(res => {
        console.log('sign up token is sent to server', res);
      })
      that.props.appState.showUpReceiptSubmissionForm();
    }).catch(function(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log("error.message : ", error.message);
    });
  }

  submitReceiptPhoto(file, image_preview_url) {
    axios.post('api/users/new/receiptPhoto', {
      user_id: this.state.user_id,
      image_preview_url
    })
    .then(res => {
      console.log('send image file successfully', res);
    })
    .catch(err => {
      console.log('err: ', err);
    });
  }

  render () {
    console.log('props!~!!!!!!: ', this.props)
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
                      submitReceiptPhoto={this.submitReceiptPhoto}
                    />
                  : null}
                {this.props.appState.modalTitle === 'AuthRequestCompletionNotice' ? <AuthRequestCompletionNotice closeModal={this.props.appState.closeModal}/> : null}
              </Modal>
            : null}
        </div>
      </Router>
    );
  }
}

export default App;
