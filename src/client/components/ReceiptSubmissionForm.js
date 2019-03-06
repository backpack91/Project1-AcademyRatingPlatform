import React, {Component} from "react";
import "./ReceiptSubmissionForm.scss";

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      onAlert: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.showUpAuthRequestCompletionModal();
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (
      file &&
      (file.type === 'image/jpeg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'application/pdf')
    ) {
      reader.onloadend = () => {
        this.setState({
          file,
          imagePreviewUrl: reader.result,
          onAlert: false
        });
      };
      reader.readAsDataURL(file);
    } else {
      this.setState({
        onAlert: true
      });
    }
  }

  renderAlertFileType() {
    return (
      <div className="fileTypeAlert">
        jpg, jpeg, png, pdf 파일 확장자로 올려주세요.
      </div>
    );
  }

  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    };
    const {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">해당 학원의 결제 영수증 사진을 업로드해주세요 ;)</div>);
    }

    return (
      <div className="receiptSubmissionModalContents">
        <div className="modalTitle">
          <div>
            학원수강 영수증으로
          </div>
          <div>
            원생인증 하기
          </div>
        </div>
        <div className="imageUploaderWrapper">
          <div className="imgPreview">
            {$imagePreview}
            {this.state.onAlert ? this.renderAlertFileType() : null}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input className="fileInput"
              type="file"
              onChange={this.handleImageChange} />
            <button className="submitBtn"
              type="submit"
              disabled={this.state.onAlert || !this.state.file ? true : false}
              onClick={this.handleSubmit}
            >제출
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AuthModal;
