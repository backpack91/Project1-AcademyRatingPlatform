import React, {Component, Fragment} from "react";
import "./LoginForm.scss";

class LoginForm extends Component {
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
            <div className="facebookAccountBtn" onClick={this.props.logInWithFacebook}>
              facebook계정으로 로그인하기
            </div>
            <div>
              회원가입하기
            </div>
            <div className="facebookAccountBtn" onClick={this.props.signUpWithFacebook}>
              facebook계정으로 가입하기
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LoginForm;
