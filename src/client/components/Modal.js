import React, {Component, Fragment} from "react";
import "./Modal.scss";

class Modal extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount () {
  }

  render () {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    }

    console.log('modal children =>', this.props.children);

    return (
      <div className="modalWrapper" style={modalBackgroundHeight}>
        <div className="modalBasicContents">
          <i onClick={this.props.closeModal} className="fas fa-times"></i>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
