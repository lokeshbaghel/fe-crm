import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import moment from "moment";
import _ from "lodash";
import validateCallForm from "./CallFormValidation";
import { images } from "../../../../../utils/helper";

class CallModal extends Component {
  state = {
    showModal: this.props?.showModal,
    heading: this.props?.heading,
    schedule_call_start: moment().format("YYYY-MM-DDTHH:mm"),
    notes: "",
    account_id: this.props?.match?.params?.id,
    activity_type: 1,
    scheduleDateErr: "",
    callType: "2",
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
    let response = validateCallForm(fields);
    this.setState({ errors: response.errors });
    return response.formIsValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    if (this.validateForm()) {
      let fields = {
        callType: this.state.callType,
        notes: this.state.notes,
        activity_type: this.state.activity_type,
        schedule_call_start: this.state.schedule_call_start,
      };

      this.props.sendActivityCall(fields);
    }
  };

  render() {
    const { callType, schedule_call_start, notes, errors } = this.state;
    const { showModal, heading, type, CallTypeData } = this.props;
    return (
      <React.Fragment>
        <Modal
          className="call-modal"
          id="myModal"
          centered
          size="sm"
          backdrop="static"
          show={showModal}
        >
          <Modal.Header>   <button
              type="button"
              className="close"
              onClick={() => this.closeModal(false)}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button></Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <div className="main-content">
                <h2>
                  <img
                    src={
                      type === "Call"
                        ? images["call-icon-popup.png"]
                        : images["calendar-icon-pink"]
                    }
                  />
                  Log {type}
                </h2>
                <h1>{heading}</h1>
                <div className="form-group fixed-width">
                  <div className="input-wrap select-wrap">
                    <label>Call Type</label>
                    <select
                      id="callType"
                      defaultValue={callType}
                      onChange={this.onChange}
                    >
                      <option>Select Call Type</option>
                      {(() => {
                        if (!_.isEmpty(CallTypeData)) {
                          return CallTypeData.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.type}
                            </option>
                          ));
                        }
                      })()}
                    </select>
                    <small className="form-text text-danger">
                      {errors?.callType}
                    </small>
                  </div>
                  <small className="text-danger"></small>
                </div>
                <div className="form-group fixed-width">
                  <div className="input-wrap select-wrap">
                    <label>When did the call happen? *</label>
                    <input
                      type="datetime-local"
                      defaultValue={schedule_call_start}
                      id="schedule_call_start"
                      onChange={this.onChange}
                    />
                    <small className="form-text text-danger">
                      {errors?.schedule_call_start}
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

export default CallModal;

// import React from "react";
// import { Modal } from "react-bootstrap";

// import { images } from "../../../../../utils/helper";

// const CallModal = (props) => {
//     /**method to perform action on click of NO button */
//     function handleModalCloseClick(props){
//         props.handleModalClose();
//     }

//     /**method to perform action on click of YES button */
//     function handleModalSuccessClick(props, type){
//         props.handleModalSuccess(type);
//     }

//     const {showModal, heading, type} = props;

//     return (
//         <Modal className="call-modal" id="myModal" centered size="sm" backdrop="static"
//                 onHide={() => handleModalCloseClick(props)} show={showModal}
//         >
//             <Modal.Header>

//             </Modal.Header>
//             <Modal.Body>
//                 <div className="main-content">
//                     <h2><img src={type === "Call" ? images['call-icon-popup'] : images['calendar-icon-pink'] } />{type}</h2>
//                     <h1>{heading}</h1>
//                     <div className="form-group">
//                         <div className="input-wrap select-wrap">
//                             <label>Call Type</label>
//                             <select>
//                                 <option>Example?</option>
//                                 <option>Example?</option>
//                                 <option>Example?</option>
//                                 <option>Example?</option>
//                                 <option>Example?</option>
//                             </select>
//                         </div>
//                         <small className="text-danger"></small>
//                     </div>
//                     <div className="form-group">
//                         <div className="input-wrap select-wrap">
//                             <label>Schedule Next Start Call *</label>
//                             <input type="date" />
//                         </div>
//                     </div>
//                     <div className="form-group">
//                         <div className="input-wrap">
//                             <label>Schedule Next Start Call *</label>
//                             <textarea value="Jennifer wants to book in face to face Appointment with her and a husband."></textarea>
//                         </div>
//                     </div>
//                     <button className="btn btn-primary">Submit</button>
//                     <button className="btn btn-outline-primary cancle-btn" onClick={() => handleModalCloseClick(props)}>Cancel</button>
//                 </div>
//             </Modal.Body>
//             <Modal.Footer></Modal.Footer>
//         </Modal>
//     )
// }

// export default CallModal;
