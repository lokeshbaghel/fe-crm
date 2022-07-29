import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";

class index extends React.Component {
  //Close modal
  closeModal(action) {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.updateModal(action);
    });
    
  }

  //Handle outside click of modal
  handleClose = () => false;

  handleSubmit = () => {
    this.props.actionModal(true); 
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="active-account"
          show={this.props?.canShow}
          centered
        >
          <Modal.Header>
            <h1>Delete Document</h1>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this document?</p>
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

export default index;
