import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import moment from "moment";
import _ from "lodash";
import { images } from "../../../../../utils/helper";

import validateTaskForm from './ValidateTaskForm';
class TaskModal extends Component {
  state = {
    showModal: this.props?.showModal,
    heading: this.props?.heading,
    currentDateTime: moment().format("YYYY-MM-DDTHH:mm"),
    time_of_task: moment().format("YYYY-MM-DDTHH:mm"),
    notes: "",
    title: "",    
    account_id: this.props?.match?.params?.id,
    scheduleDateErr: "",
  };

  /** method to close modal */
  closeModal(action) {
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
    });
    this.props.handleModalClose(action);
  }
  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  //Handle click outside of modal
  handleClose = () => false;

  validateForm = () => {
    let fields = this.state;
    let response = validateTaskForm(fields);
    this.setState({errors: response.errors});
    return response.formIsValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    
    
    if (this.validateForm()) {
      //console.log("validated")
      let fields = {
        notes: this.state.notes,
        title: this.state.title,
      };
      
      this.props.submittaskActivity(fields)
    }
  };

  render() {
    const { title, notes, currentDateTime, errors } = this.state;
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          centered
          size="sm"
          backdrop="static"
          onHide={this.handleClose}
          className="email-modal"
          show={this.state?.showModal}
          centered
        >
          <Modal.Header> 
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
            <form onSubmit={this.handleSubmit}>
              <div className="main-content">
                <h2>
                <img src={images["task-icon.png"]} /> Log SMS
                </h2>
                <h1>{this.state.heading}</h1>
                <div className="form-group fixed-width">
                  <div className="input-wrap select-wrap">
                    <label>Title *</label>
                    {/* <input
                      type="datetime-local"
                      defaultValue={time_of_task}
                      id="schedule_call_start"
                      min={currentDateTime}
                      onChange={this.onChange}
                    /> */}
                    <input
                      type="text"
                      value={title}
                      id="title"
                      // min={currentDateTime}
                      onChange={this.onChange}
                    />
                    <small className="form-text text-danger">
                      {errors?.title}
                    </small>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-wrap">
                    <label>Notes *</label>
                    <textarea
                      id="notes"
                      onChange={this.onChange}
                      value={notes}
                    ></textarea>
                    <small className="form-text text-danger">
                      {errors?.notes}
                    </small>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
                {/* <button
                  className="btn btn-outline-primary cancle-btn"
                  onClick={() => this.closeModal(false)}
                >
                  Cancel
                </button> */}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TaskModal;
