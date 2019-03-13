import React, {Component} from "react";
import "./LoginRequiredForm.scss";

class AlreadyRegisteredUserNotice extends Component {
  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }

    return (
      <div className="loginRequiredFormWrapper">
        <div className="formTitle">
          <div>
            로그인 후에
          </div>
          <div>
            이용이 가능합니다
          </div>
        </div>
        <div className="contentWrapper">
          <p>이전 화면으로 돌아가, '페이스북으로 로그인 하기'</p>
          <p>버튼을 클릭해서 로그인해 주시기 바랍니다.</p>
          <div className="btnWrapper">
            <button onClick={this.props.showUpLoginForm}>확인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AlreadyRegisteredUserNotice;
