import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";

class ConfirmRejectDuplicateModal extends React.Component {
  //Close modal
  closeModal(action) {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.cancelModal(action);
    });
    
  }

  //Handle outside click of modal
  handleClose = () => false;

  handleSubmit = () => {
    this.props.submitData(true); 
  };

  render() {
    const {title, bodyMessage} = this.props
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="active-account reject-confirm"
          show={this.props?.canShow}
          centered
        >
          <Modal.Header>
            <h1>{title}</h1>

            <button
              type="button"
              className="close"
              onClick={() => this.closeModal(false)}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <p>{bodyMessage}</p>
            <div className="btn-wrap">
              <button className="btn green-btn" onClick={this.handleSubmit}>
                Yes
              </button>
              <button
                className="btn red-btn"
                onClick={() => this.closeModal(false)}
              >
                No
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConfirmRejectDuplicateModal;
