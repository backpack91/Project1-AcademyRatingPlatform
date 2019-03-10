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
        <div className="navigatorWrapper">
          <div className="logo">
            <div>원장님귀는</div>
            <div>당나귀귀</div>
          </div>
          <div className="navigator">
            {this.props.onLogin
              ? this.renderUserAccountIcon()
              : <div onClick={this.props.showUpLoginForm}>로그인</div>
            }
          </div>
        </div>
        <div className="imageBenner" >
          <h1>진짜 다녀본 사람들의</h1>
          <h1>진짜 이야기</h1>
        </div>
        <div className="inputWrapper">
          <i className="fas fa-search"></i>
          <input />
        </div>
      </div>
    );
  }
}

export default Header;
