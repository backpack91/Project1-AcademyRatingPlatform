import React, {Component} from "react";
import "./AcademyRegistrationCompletionForm.scss";

class AcademyRegistrationCompletionForm extends Component {
  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }

    return (
      <div className="academyRegistrationCompletionForm">
        <div className="modalTitle">
          <div>
            학원등록 요청이
          </div>
          <div>
            완료되었습니다
          </div>
        </div>
        <div className="imageUploaderWrapper">
          <p>학원등록 승인까지 1-2일 정도 소요될 수 있습니다</p>
          <p>가입 승인 후 부터 학원등록과 후기남기기가 가능하니 양해 부탁드립니다</p>
          <div className="submitBtn">
            <button onClick={this.props.closeModal}>확인</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AcademyRegistrationCompletionForm;
