import React, {Component} from "react";
import "./AcademyRegistrationForm.scss";
import axios from 'axios';
const _ = require('lodash');

class AcademyRegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      onAlert: false,
      academy_info: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleSubmit(e) {
    const target = e.target;
    e.preventDefault();
    const formData = new FormData();
    const objArr = [];

    formData.append('academy_image', this.state.file);
    formData.set('academy_details', JSON.stringify(this.state.academy_info));

    axios({
      method: 'post',
      url: 'api/academies/new/registration',
      data: formData,
      config: { headers: {'Content-Type': `multipart/form-data boundary=${formData._boundary}` }}
    })
    .then(res => {
      console.log('res: ',res);
    })
    .catch(err => {
      console.log('err: ', err);
    });

    this.props.showUpAcademyRegistrationCompletionForm();
  }

  handleFiles(e) {
    const target = e.target;

    this.setState(state => {
      const newAcademyInfo = _.cloneDeep(state.academy_info);
      const courses = [];

      if (target.name === "courseName") {
        if (state.courseName && state.courseDescription) {
          const course = {
            name: state.courseName,
            description: state.courseDescription
          };
          courses.push(course);

          newAcademyInfo['courses'] = courses;
        }

        return {
          academy_info: newAcademyInfo,
          courseName: target.value
        }
      } else if (target.name === "courseDescription") {
        if (state.courseName && state.courseDescription) {
          const course = {
            name: state.courseName,
            description: state.courseDescription
          };
          courses.push(course);

          newAcademyInfo['courses'] = courses;
        }

        return {
          academy_info: newAcademyInfo,
          courseDescription: target.value
        };
      } else {
        newAcademyInfo[target.name] = target.value;
      }

      return {
        academy_info: newAcademyInfo
      };
    });
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
      $imagePreview = (<div className="previewText">해당 학원의 프로필 사진을 등록해 주세요 ;)</div>);
    }

    return (
      <div className="academyRegistrationFormWrapper">
        <div className="modalTitle">
          <div>
            학원 등록하기
          </div>
        </div>
        <div className="academyRegistrationForm">
          <form onChange={this.handleFiles.bind(this)} onSubmit={this.handleSubmit} action='api/academies/new/registration' method='post'>
            <div className="categoryWrapper">
              <div>학원명</div>
              <input name="name"/>
            </div>
            <div className="categoryWrapper">
              <div>분류</div>
              <input name="category"/>
            </div>
            <div className="categoryWrapper">
              <div>소개</div>
              <input name="description"/>
            </div>
            <div className="categoryWrapper">
              <div>홈페이지 주소</div>
              <input name="homepage_adress"/>
            </div>
            <div className="categoryWrapper">
              <div>코스 종류</div>
              <div>
                코스명<input name="courseName"/>
                설명<input name="courseDescription" />
              </div>
            </div>
            <div className="imgPreview">
              {$imagePreview}
              {this.state.onAlert ? this.renderAlertFileType() : null}
            </div>
            <input className="fileInput"
              type="file"
              onChange={this.handleImageChange} />
            <button className="submitBtn"
              type="submit"
              disabled={
                this.state.onAlert
                || !this.state.file
                || !this.state.academy_info.name
                || !this.state.academy_info.homepage_adress
                || !this.state.academy_info.category
                || !this.state.academy_info.description
                || !this.state.academy_info.courses
                  ? true
                  : false}
              onClick={this.handleSubmit}
            >제출
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AcademyRegistrationForm;
