import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import LoginModal from './LoginModal.js';
import "./App.scss";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      academyList: [],
      onLogin: false
    };

    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin() {
    this.setState(state => ({
      onLogin: true
    }))
  }

  getAcademyList() {
    axios.get('../../public/dummy.json')
    .then(res => {
      console.log("getAcademyList: ", res)
      this.setState(state => ({
        academyList: res.data
      }))
    })
    .catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.getAcademyList();
  }

  render () {
    return (
      <Router>
        <div className="appWrapper">
          <Header onClickLogin={this.onClickLogin}/>
          <AcademyList academyList={this.state.academyList}/>
          {this.state.onLogin ? <LoginModal /> : null}
        </div>
      </Router>
    );
  }
}

export default App;
