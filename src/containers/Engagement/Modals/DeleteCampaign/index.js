import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import _ from "lodash";

import './index.css';

class index extends Component {
  state = {
    showHide: this.props?.canShow
  };

  /** method to close modal */
  closeModal(action) {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.handleModal(action);
    });
    this.setState({showHide: action})
  }

  //Handle click outside of modal
  handleClose = () => false;

  //Submit Form data
  handleSubmit = () => {
      let fields = {};
      fields.campaign_id = this.props.campaign.campaign_id;
      fields.campaign_type = 'delete';
      this.props.modalAction(fields)
  }

  render() {
    const { campaign } = this.props;
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="delete-campaign"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            <h1>Delete Campaign</h1>
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
            <p>Are you sure you want to delete this campaign <b>{campaign.campaignName}</b> ?</p>
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
