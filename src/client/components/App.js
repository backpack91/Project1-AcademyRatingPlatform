import React, {Component} from "react";
import { BrowserRouter as Router} from "react-router-dom";
import Header from "./Header.js";
import AcademyList from "./AcademyList.js";
import LoginForm from './LoginForm.js';
import Modal from './Modal.js';
import AuthRequestCompletionNotice from './AuthRequestCompletionNotice.js';
import ReceiptSubmissionForm from './ReceiptSubmissionForm.js';
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.renderModal = this.renderModal.bind(this);
  }

  renderModal () {
    switch(this.props.appState.modalTitle) {
      case 'LoginForm':
        return (<LoginForm showUpReceiptSubmissionModal={this.props.appState.showUpReceiptSubmissionForm}/>);

      case 'ReceiptSubmissionForm':
        return (<ReceiptSubmissionForm />);

      case 'AuthRequestCompletionNotice':
        return (<AuthRequestCompletionNotice />);
    }
  }

  render () {
    return (
      <Router>
        <div className="appWrapper">
          <Header showUpLoginForm={this.props.appState.showUpLoginForm}/>
          <AcademyList academyList={this.props.appState.currentList}/>
          {this.props.appState.isModalShownUp
            ? <Modal closeModal={this.props.appState.closeModal} >
                {this.props.appState.modalTitle === 'LoginForm'
                  ? <LoginForm
                      closeModal={this.props.appState.closeModal}
                      showUpReceiptSubmissionForm={this.props.appState.showUpReceiptSubmissionForm}
                    />
                  : null}
                {this.props.appState.modalTitle === 'ReceiptSubmissionForm' ? <ReceiptSubmissionForm showUpAuthRequestCompletionModal={this.props.appState.showUpAuthRequestCompletionNotice}/> : null}
                {this.props.appState.modalTitle === 'AuthRequestCompletionNotice' ? <AuthRequestCompletionNotice closeModal={this.props.appState.closeModal}/> : null}
              </Modal>
            : null}
        </div>
      </Router>
    );
  }
}

export default App;
