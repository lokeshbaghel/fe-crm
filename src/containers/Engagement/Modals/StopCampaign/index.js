import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import Constant from "../../../../utils/constants";
import _ from "lodash";

class index extends React.Component {
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
          instance.props.updateModal(action,instance.props.camp_id);
    });
    this.setState({showHide: action});
  }

  //Handle outside click of modal
  handleClose = () => false;

  handleSubmit = () => {
    let fields = {
      camp_id: this.props.camp_id,
    };
    this.props.updateModal(fields,true);
    //this.closeModal(false);
   
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="active-account"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            <h1>Stop Campaign</h1>
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
            <p>Are you sure you want to stop this campaign?</p>
            <div className="btn-wrap">
              <a className="btn green-btn" onClick={this.handleSubmit}>
                Yes
              </a>
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
