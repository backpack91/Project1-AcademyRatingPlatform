import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import "./App.scss";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      academyList: []
    };
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
          <Header />
          <AcademyList academyList={this.state.academyList}/>
        </div>
      </Router>
    );
  }
}

export default App;
