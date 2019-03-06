import React, {Component, Fragment} from "react";
import "./AuthModal.scss";
import { firebase, provider } from './firebaseConfig.js';
// import SocialLogin from 'react-social-login'

class AuthModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
  }

  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }



    return (
      <Fragment>
        <div>학원수강 영수증으로 원생확인하기</div>
        <div className="nextBtn">
          <button>제출</button>
        </div>
      </Fragment>
    );
  }
}

export default AuthModal;
