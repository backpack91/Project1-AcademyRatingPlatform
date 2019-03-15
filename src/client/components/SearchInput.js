import React, {Component, Fragment} from "react";
import "./SearchInput.scss";

class SearchInput extends Component {
  render () {
    return (
      <Fragment>
        <div className="homeImageBenner" >
          <h1>진짜 다녀본 사람들의</h1>
          <h1>진짜 이야기</h1>
          <div className="homeInputWrapper">
            <i className="fas fa-search"></i>
            <input
              onChange={this.props.onTypingSearchKeyword}
              onKeyDown={this.props.onSearch}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SearchInput;
