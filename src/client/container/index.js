import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLoggedIn, showAllFeeds, showUpLoginModal, closeLoginModal} from '../actions';
import App from '../components/App.js';
import axios from 'axios';


class AppContainer extends Component {

  componentDidMount() {
    this.props.onMount();
    console.log("AppContainer didMount =>", this.props);
  }

  render() {
    return (
      <App appState={this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("mapStateToProps_State: ", state);
  return {
    currentList: state.academyList.currentList,
    isModalShownUp: state.auth.isModalShownUp
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: () => {
      axios.get('../../../public/dummy.json')
      .then(res => {
        console.log("getAcademyList: ", res)
        dispatch(showAllFeeds(res));
      })
      .catch(err => {
        console.log(err);
      })
    },
    showUpLoginModal: () => {
      dispatch(showUpLoginModal());
    },
    closeLoginModal: () => {
      dispatch(closeLoginModal());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
