import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import LoginModal from './LoginModal.js';
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      academyList: [],
      onLogin: false
    };

    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickModalDeleteBtn = this.onClickModalDeleteBtn.bind(this);
  }

  onClickLogin() {
    this.setState(state => ({
      onLogin: true
    }))
  }

  onClickModalDeleteBtn() {
    this.setState(state => ({
      onLogin: false
    }))
  }

  // getAcademyList() {
  //   axios.get('../../../public/dummy.json')
  //   .then(res => {
  //     console.log("getAcademyList: ", res)
  //     this.setState(state => ({
  //       academyList: res.data
  //     }))
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }

  componentDidMount() {
    // this.getAcademyList();
    console.log("APP Props => ", this.props);
  }

  render () {
    return (
      <Router>
        <div className="appWrapper">
          <Header showUpLoginModal={this.props.appState.showUpLoginModal}/>
          <AcademyList academyList={this.props.appState.currentList}/>
          {this.props.appState.isModalShownUp ? <LoginModal closeLoginModal={this.props.appState.closeLoginModal} /> : null}
        </div>
      </Router>
    );
  }
}

export default App;
