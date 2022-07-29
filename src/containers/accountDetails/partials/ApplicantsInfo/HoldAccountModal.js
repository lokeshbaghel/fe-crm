import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import moment from "moment";
import _ from "lodash";
import Constant from "../../../../utils/constants";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: this.props?.canShow,
      post_hold_to_charms: 1,
      hold_reason: this.props.hold_reasons[0].id,
      hold_notes: "",
      postHoldToCharms: true,
      schedule_call: 1,
      schedule_call_checked: true,
      currentDateTime: moment().format("YYYY-MM-DDTHH:mm"),
      schedule_call_start: moment().add(1, "hours").format("YYYY-MM-DDTHH:mm"),
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeInputRadio = (event) => {
    if (event.target.name == "post_hold_to_charms") {
      if (event.target.value == 1) {
        this.setState({ postHoldToCharms: true });
      } else {
        this.setState({ postHoldToCharms: false });
      }
    } else if (event.target.name == "schedule_call") {
      if (event.target.value == 1) {
        this.setState({ schedule_call_checked: true });
      } else {
        this.setState({ schedule_call_checked: false });
      }
    }

    this.setState({ [event.target.name]: event.target.value });
  };

  //Close modal
  handleModal(action) {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.updateModal(action);
    });
    this.setState({ showHide: action });
  }

  //Handle outside click of modal
  handleClose = () => false;

  handleSubmit = () => {
    let fields = {
      activity_type: 1,
      user_id: this.props.user_id,
      status: Constant["AccountHoldStatus"],
      post_hold_to_charms: parseInt(this.state.post_hold_to_charms),
      hold_reason: parseInt(this.state.hold_reason),
      hold_notes: this.state.hold_notes,
      schedule_call: parseInt(this.state.schedule_call) == 1 ? true : false,
    };

    if (this.state.schedule_call == 1) {
      fields.schedule_call_start = moment(
        this.state.schedule_call_start
      ).format("YYYY-MM-DD HH:mm:ss");
      fields.schedule_call_end = moment(this.state.schedule_call_start)
        .add(1, "hours")
        .format("YYYY-MM-DD HH:mm:ss");
    }
    this.handleModal(false);
    this.props.updateModal(fields);
  };

  render() {
    const {
      hold_reason,
      postHoldToCharms,
      schedule_call_checked,
      currentDateTime,
      schedule_call_start,
      hold_notes
    } = this.state;
    const { hold_reasons } = this.props;
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="close-account"
          size="sm"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            <h1>Account in hold</h1>

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
                <div className="options">
                  <label title="item1">
                    Pass over to Charms
                    <input
                      type="radio"
                      name="post_hold_to_charms"
                      value="1"
                      checked={postHoldToCharms}
                      onChange={this.handleChangeInputRadio}
                    />
                    <img />
                  </label>

                  <label title="item2">
                    Keep in the CRM
                    <input
                      type="radio"
                      name="post_hold_to_charms"
                      value="0"
                      checked={!postHoldToCharms}
                      onChange={this.handleChangeInputRadio}
                    />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>Schedule a call</p>
                <div className="options">
                  <label title="item1">
                    Yes
                    <input
                      type="radio"
                      name="schedule_call"
                      value="1"
                      checked={schedule_call_checked}
                      onChange={this.handleChangeInputRadio}
                    />
                    <img />
                  </label>

                  <label title="item2">
                    No
                    <input
                      type="radio"
                      name="schedule_call"
                      value="2"
                      checked={!schedule_call_checked}
                      onChange={this.handleChangeInputRadio}
                    />
                    <img />
                  </label>
                </div>
              </div>
            </div>
            {schedule_call_checked ? (
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <div className="input-wrap select-wrap">
                      <label>Schedule Next Start Call *</label>
                      <input
                        type="datetime-local"
                        defaultValue={schedule_call_start}
                        name="schedule_call_start"
                        min={currentDateTime}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <div className="input-wrap select-wrap">
                    <label>State the reason for this action</label>
                    <select
                      name="hold_reason"
                      value={hold_reason}
                      onChange={this.handleChange}
                    >
                      {(() => {
                        if (!_.isEmpty(hold_reasons)) {
                          return hold_reasons.map((data, index) => (
                            <option key={index} value={data.id}>
                              {data.name}
                            </option>
                          ));
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
                    <label>Add Notes for Hold</label>
                    <textarea
                      name="hold_notes"
                      value={hold_notes}
                      onChange={this.handleChange}
                    >                      
                    </textarea>
                  </div>
                  <small className="text-danger"></small>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-wrap">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                On Hold
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
