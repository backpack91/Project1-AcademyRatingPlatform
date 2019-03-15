import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./AcademyList.scss";

class AcademyList extends Component {
  constructor(props) {
    super(props);

    this.renderList = this.renderList.bind(this);
  }

  renderList () {
    return this.props.academyList.map(item => {
      const image = {
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover'
      };

      return (
        <Link to={`/newFeeds/${item._id}`} key={item._id}>
          <div className="academy">
            <div className="image" style={image}>
              <div className="rate">{item.rate}</div>
            </div>
            <div className="details">
              <div className="name">{item.name}</div>
              <div className="category">분류: {item.category}</div>
              <div className="description">소개: {item.description}</div>
              <div className="best_comment">베스트 댓글: {item.best_comment}</div>
            </div>
          </div>
        </Link>
      );
    });
  }

  render () {
    return (
      <div className="academyList">
        {this.props.academyList.length ? this.renderList() : "저장된 정보가 없습니다..."}
      </div>
    );
  }
}

export default AcademyList;
