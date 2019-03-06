import React, {Component} from "react";
import "./Modal.scss";

class Modal extends Component {
  componentDidMount() {
    document.body.classList.add('fixScroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('fixScroll');
  }

  render() {
    const modalBackgroundHeight = {
      height: document.body.clientHeight
    };

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
