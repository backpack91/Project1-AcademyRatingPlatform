import React, {Component, Fragment} from "react";
import "./AcademyList.scss";

class AcademyList extends Component {
  constructor(props) {
    super(props);
    this.state={
    };
    this.renderList = this.renderList.bind(this);
  }

  renderList () {

    return this.props.academyList.map(item => {
      const image = {
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover'
      };

      return (
        <div className="academy" key={item.id}>
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
      );
    });
  }

  render () {
    console.log("props: ", this.props)
    return (
      <div className="academyList">
        {this.props.academyList.length ? this.renderList() : "정보가 없습니다..."}
      </div>
    );
  }
}

export default AcademyList;