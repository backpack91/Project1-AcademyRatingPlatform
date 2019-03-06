import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import AuthModal from './AuthModal.js';
import Modal from './Modal.js';
import AuthRequestCompletionModal from './AuthRequestCompletionModal.js';
import ReceiptSubmissionModal from './ReceiptSubmissionModal.js';
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
    this.renderModal = this.renderModal.bind(this);
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

  renderModal () {
    switch(this.props.appState.modalTitle) {
      case 'Auth':
        return <AuthModal showUpReceiptSubmissionModal={this.props.appState.showUpReceiptSubmissionModal}/>

      case 'ReceiptSubmission':
        return <ReceiptSubmissionModal />

      case 'AuthRequestCompletion':
        return <AuthRequestCompletionModal />
    }
  }

  render () {
    return (
      <Router>
        <div className="appWrapper">
          <Header showUpAuthModal={this.props.appState.showUpAuthModal}/>
          <AcademyList academyList={this.props.appState.currentList}/>
          {this.props.appState.isModalShownUp
            ? <Modal closeModal={this.props.appState.closeModal} >
                {this.props.appState.modalTitle === 'Auth' ? <AuthModal showUpReceiptSubmissionModal={this.props.appState.showUpReceiptSubmissionModal}/> : null}
                {this.props.appState.modalTitle === 'ReceiptSubmission' ? <ReceiptSubmissionModal /> : null}
                {this.props.appState.modalTitle === 'AuthRequestCompletion' ? <AuthRequestCompletionModal /> : null}
              </Modal>
            : null}
        </div>
      </Router>
    );
  }
}

export default App;
