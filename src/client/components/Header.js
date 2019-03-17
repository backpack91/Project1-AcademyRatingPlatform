import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./Header.scss";

class Header extends Component {
  renderUserAccountIcon() {
    return (
      <div className="userAccountIconWrapper" onClick={this.props.toggleAccountMenu}>
        <div className="border_left">{this.props.user.name}님</div>
        <img src={this.props.user.image_profile}></img>
        {this.props.isAccountMenuShownUp
          ? (
            <div className="accountMenues">
              <div className="accountMenu" onClick={this.props.userLogout}>
                로그아웃
              </div>
              <div className="accountMenu">
                계정정보
              </div>
            </div>
          )
          : null
        }
      </div>
    );
  }

  render () {
    return (
      <div className="header">
        <div className="navigatorsWrapper">
          <Link to="/">
            <div className="logo">
              <div>원장님귀는</div>
              <div>당나귀귀</div>
            </div>
          </Link>
          <div className="navigators">
            <div className="nav border_left" onClick={this.props.checkAuth}>학원등록</div>
            {this.props.onLogin
              ? this.renderUserAccountIcon()
              : <div className="nav border_left" onClick={this.props.showUpLoginForm}>로그인</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
