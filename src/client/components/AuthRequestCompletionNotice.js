import React, {Component} from "react";
import "./AuthRequestCompletionNotice.scss";

class AuthRequestCompletionNotice extends Component {
  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }

    return (
      <div className="authRequestCompletionNoticeWrapper">
        <div className="modalTitle">
          <div>
            회원가입 요청이
          </div>
          <div>
            완료되었습니다
          </div>
        </div>
        <div className="imageUploaderWrapper">
          <p>수강생 인증으로 인해</p>
          <p>회원가입 승인까지 1-2일 정도 소요될 수 있습니다</p>
          <p>가입 승인 후 부터 학원등록과 후기남기기가 가능하니 양해 부탁드립니다</p>
          <div className="submitBtn">
            <button onClick={this.props.closeModal}>확인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthRequestCompletionNotice;
