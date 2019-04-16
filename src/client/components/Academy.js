import React, {Component, Fragment} from "react";
import "./Academy.scss";
import axios from 'axios';

class Academy extends Component {
  constructor(props) {
    super(props);

    this.state={
      review_rate: 0,
      review_text: '',
      nick_name: ''
    }

    this.renderAcademyDetails = this.renderAcademyDetails.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.setFormDataAsState = this.setFormDataAsState.bind(this);
    this.sendReview = this.sendReview.bind(this);
  }

  componentDidMount() {
    this.props.getAcademyDetails(this.props.match.params.academy_id);
  }

  renderAcademyDetails() {
    const {name, image, category, courses, description, homepage_adress, rate, reviews} = this.props.academyDetails.data;
    function renderCourses() {
      return courses.map((course, index) => {
        return <li key={index}>코스명: {course.name} | 소개: {course.description}</li>
      })
    }

    return (
      <Fragment>
      <img src={image}></img>
        <div className="academyDetails">
          <h1>{name}</h1>
          <div className="academyDetailsBorder">
            <ul className="parentWrapper">
              <li><span>카테고리</span> {category}</li>
              <li><span>소개</span> {description}</li>
              <li>
                <span>코스</span>
                <ul>
                  {renderCourses()}
                </ul>
              </li>
              <li><span>홈페이지</span><a href={`${homepage_adress}`}>{homepage_adress}</a></li>
            </ul>
            {this.props.isReviewsShownUp
              ? <div className="reviewTitleWrapper">
                  <div className="reviewTitle">Reviews</div>
                  <div className="writingBtnWrapper" onClick={this.props.toggleReviewInput}>
                    <span>후기쓰기..</span>
                    <i className="fa s fa-pen-nib"></i>
                  </div>
                </div>
              : null}
            {this.props.isReviewsShownUp
              ? <div className="reviewsWrapper">
                  {this.props.isReviewInputShownUp && this.renderReviewInput()}
                  {this.renderReviews()}
                </div>
              : null}
          </div>
        </div>
      </Fragment>
    );
  }

  renderReviews() {
    const {reviews} = this.props.academyDetails.data;

    return reviews.map(review => {
      return (
        <div className="reviewWrapper" key={review._id}>
          <div className="nameRateWrapper">
            <div className="nick_name">{review.nick_name}/</div>
            <div className="rate">{review.rate}점</div>
          </div>
          <div className="text">{review.text}</div>
          <div className="dateWrapper"><div>{review.date}</div></div>
        </div>
      );
    });
  }

  renderReviewInput() {
    return (
      <div className="formWrapper">
        <form onSubmit={this.sendReview} onChange={this.setFormDataAsState}>
          <div>
            <span>닉네임</span>
            <input name='nickName' className="nickNameInput" type="text"/>
            <span>나의 점수는?</span>
            <select name='rate' placeholder="5점만점에..">
              <option>-</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
            <span>점</span>
            <input className='submitInput' type='submit'/>
          </div>
          <textarea name='text' type='text'></textarea>
        </form>
      </div>
    );
  }

  setFormDataAsState(e) {
    const target = e.target;

    if (target.name === 'rate') {
      this.setState(state => ({
        review_rate: target.value
      }));
    } else if (target.name === 'text') {
      this.setState(state => ({
        review_text: target.value
      }));
    } else if (target.name === 'nickName') {
      this.setState(state => ({
        nick_name: target.value
      }));
    }
  }

  sendReview(e) {
    e.preventDefault();

    if (this.props.accessToken
      && this.state.review_rate !== '-'
      && this.state.review_rate !== ''
    ) {
      const newReviewData = {
        access_token: this.props.accessToken,
        text: this.state.review_text,
        rate: this.state.review_rate,
        nick_name: this.state.nick_name
      };

      axios.post(`/api/academies/${this.props.match.params.academy_id}/review`, {
        newReviewData
      })
      .then(res => {
        this.props.toggleReviewInput();
        this.props.addAcademyReview(newReviewData);
      });
    } else {
      alert('로그인이 필요한 기능입니다 ;)');
    }
  }

  render() {
    return (
      <Fragment>
        <div className="academyImageBenner"></div>
        <div className="academyDetailsWrapper">
          {this.props.academyDetails.data ? this.renderAcademyDetails() : null}
          <i className="far fa-comment" onClick={this.props.toggleReview}></i>
        </div>
      </Fragment>
    );
  }
}

export default Academy;
