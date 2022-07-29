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
  handleModal(action) {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.updateModal(action);
    });
    this.setState({showHide: action});
  }

  //Handle outside click of modal
  handleClose = () => false;

  handleSubmit = () => {
    let fields = {
      status: Constant["AccountActiveStatus"],
    };

    this.handleModal(false);
    this.props.updateModal(fields);
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
            {/* <h1>Active Account</h1> */}
            <button type="button" className="close" onClick={(data) => this.handleModal(false)}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props?.message}</p>
            <div className="btn-wrap">
             
              {/* <button
                className="btn btn-primary add-activities"
                onClick={() => this.handleModal(false)}
              >
                 Close
              </button> */}
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default index;
