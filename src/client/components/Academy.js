import React, {Component, Fragment} from "react";
import "./Academy.scss";

class Academy extends Component {
  constructor(props) {
    super(props);

    this.state={
      review_rate: 0,
      review_text: ''
    }

    this.renderAcademyDetails = this.renderAcademyDetails.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.setFormDataAsState = this.setFormDataAsState.bind(this);
  }
  
  componentDidMount() {
    this.props.getAcademyDetails(this.props.match.params.academy_id);
  }

  renderAcademyDetails() {
    const {name, image, category, courses, description, homepage_adress, rate, reviews} = this.props.academyDetails.data;
    function renderCourses() {
      return courses.map(course => {
        return <li>코스명: {course.name} | 소개: {course.description}</li>
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
                    <i className="fas fa-pen-nib"></i>
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
        <div className="reviewWrapper">
          <div className="nameRateWrapper">
            <div className="user_name">{review.user_name}/</div>
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

    console.log('this.state.review_rate: ', this.state.review_rate)
    console.log('this.state.review_text: ', this.state.review_text)
    if (target.name === 'rate') {
      this.setState(state => ({
        review_rate: target.value
      }));
    } else if (target.name === 'text') {
      this.setState(state => ({
        review_text: target.value
      }));
    }
  }

  sendReview(e) {
    e.preventDefault();

    if (this.accessToken
      && this.state.review_rate !== '-'
      && this.state.review_rate !== ''
    ) {
      const newReviewData = {
        access_token: this.accessToken,
        text: this.review_text,
        rate: this.review_rate
      }

      axios.post(`/academies/${this.props.match.params.academy_id}/review`)
    } else {
      alert('로그인이 필요한 기능입니다 ;)')
    }
  }

  render() {
    console.log('academy_details: ', this.props.academyDetails);
    console.log('isReviewsShownUp: ', this.props)
    return (
      <Fragment>
        <div className="academyImageBenner"></div>
        <div className="academyDetailsWrapper">
          {this.props.academyDetails ? this.renderAcademyDetails() : null}
          <i className="far fa-comment" onClick={this.props.toggleReview}></i>
        </div>
      </Fragment>
    );
  }
}

export default Academy;