import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";

class ConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: this.props?.canShow,
    };
  }

  //Close modal
  closeModal(action) {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.toggle(action);
    });
    this.setState({ showHide: action });
  }

  //Handle outside click of modal
  handleClose = () => false;

  handleSubmit = () => {
    this.props.modalAction(true);
    this.closeModal(false);
    
  };

  render() {
    return (
      <>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="unsubscribe-popup"
          show={this.state?.showHide}
          centered
        >
            <Modal.Body>
                <h2 className="sub-title">Are you sure you want to unsubscribe from Outcome First Groups marketing information?</h2>
                <div>
                    <button className="btn green-btn" onClick={this.handleSubmit}>Yes</button>
                    <button className="btn red-btn" onClick={() => this.closeModal(false)} data-dismiss="modal" aria-label="Close">No</button>
                </div>
            </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ConfirmModal;
