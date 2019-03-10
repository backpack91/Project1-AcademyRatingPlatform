import React, {Component} from "react";
import "./RegisterRequiredNotice.scss";

class RegisterRequiredNotice extends Component {
  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }

    return (
      <div className="formWrapper">
        <div className="formTitle">
          <div>
            회원가입이 필요합니다.
          </div>
        </div>
        <div className="contentWrapper">
          <p>이전 화면으로 돌아가, '페이스북으로 가입하기'</p>
          <p>버튼을 클릭해서 회원가입 요청을 해 주시기 바랍니다.</p>
          <div className="btnWrapper">
            <button onClick={this.props.showUpLoginForm}>확인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterRequiredNotice;
