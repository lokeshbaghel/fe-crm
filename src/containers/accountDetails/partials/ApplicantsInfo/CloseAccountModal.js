import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import Constant from "../../../../utils/constants";
import _ from 'lodash';

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: this.props?.canShow,
      close_requestor: (this.props.close_requestors) ? this.props.close_requestors[0].id : 1,
      close_reason: (this.props.close_reasons) ? this.props.close_reasons[0].id : 1,
      
    };

    this.handleChange = this.handleChange.bind(this);
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
      let fields = {
        status: Constant["AccountCloseStatus"],
        close_requested_by: this.state.close_requestor,
        closed_reason: this.state.close_reason,
      };
      this.handleModal(false);
      this.props.updateModal(fields);
  };

  render() {
    const { close_requestor, close_reason } = this.state;
    const { close_requestors, close_reasons } = this.props;
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="close-account"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            <h1>Account Closed</h1>

            <button
              type="button"
              className="close"
              onClick={() => this.handleModal(false)}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="input-wrap select-wrap">
                    <label>Reason Code</label>
                    <select
                      name="close_requestor"
                      value={close_requestor}
                      onChange={this.handleChange}
                    >
                      {(() => {
                          if (!_.isEmpty(close_requestors)) {
                              return( 
                                close_requestors.map((data, index) => (
                                      <option key={index} value={data.id}>{data.name}</option>
                                  ))
                              )
                          }
                      })()}
                    </select>
                  </div>
                  <small className="text-danger"></small>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="input-wrap select-wrap">
                    <label>State the reason for this action</label>
                    <select
                      name="close_reason"
                      value={close_reason}
                      onChange={this.handleChange}
                    >
                      {(() => {
                          if (!_.isEmpty(close_reasons)) {
                              return( 
                                  close_reasons.map((data, index) => (
                                      <option key={index} value={data.id}>{data.name}</option>
                                  ))
                              )
                          }
                      })()}
                    </select>
                  </div>
                  <small className="text-danger"></small>
                </div>
              </div>
            </div>
            {/* <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                <div className="input-wrap">
                  <label>State the reason for this action</label>
                  <textarea
                    value={this.state.close_reason}
                    onChange={this.handleChange}
                  />
                  </div>
                  <small className="text-danger">
                  {this.state.err_close_reason}
                </small>
                </div>
              </div>
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-wrap">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Submit Reason
              </button>
            </div>

            {/* <div className="btn-wrap">
              <a
                className="cancel-btn"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.handleModal(false)}
              >
                Cancel
              </a>
            </div> */}
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default index;
