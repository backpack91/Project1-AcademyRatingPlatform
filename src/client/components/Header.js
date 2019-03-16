import React, {Component} from "react";
import "./Header.scss";

class Header extends Component {
  renderUserAccountIcon() {
    return (
      <div className="userAccountIconWrapper">
        <div>{this.props.user.name}님</div>
        <img src={this.props.user.image_profile}></img>
      </div>
    );
  }

  render () {
    return (
      <div className="header">
        <div className="navigatorsWrapper">
          <div className="logo">
            <div>원장님귀는</div>
            <div>당나귀귀</div>
          </div>
          <div className="navigators">
            <div className="nav" onClick={this.props.checkAuth}>학원등록</div>
            {this.props.onLogin
              ? this.renderUserAccountIcon()
              : <div className="nav" onClick={this.props.showUpLoginForm}>로그인</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
