import React from "react";
import { Modal } from "react-bootstrap";
import moment from "moment";
import Fade from "react-reveal/Fade";
import callIcon from "../../../assets_crm/img/call-icon.jpg";
import _ from 'lodash';
import "./index.css";
import Constants from "../../../utils/constants"

class EndCallModal extends React.Component {
  state = {
    currentDateTime: moment().format('YYYY-MM-DDTHH:mm'),
    showModal: this.props?.canShow,
    callSuccess: true,
    unsuccessful_reason_dropdown: this.props?.unsuccessful_reason,
    unsuccessful_reason: this.props?.unsuccessful_reason[0].id,
    schedule_call_start: moment().add(1, 'hours').format('YYYY-MM-DDTHH:mm'),
    notes: '',
    scheduleDateErr: '',
    callType: (this.props?.callTypes.length > 0 && this.props?.callTypes[0].id == Constants['CallTypeOutbound']) ? this.props?.callTypes[0].id : ''
  };

  /**method to hide/show modal */
  handleModalCloseClick = () => {
    this.setState({ showModal: false });
    this.props.updateModal(false);
  };

  //Handle outside click of modal
  handleClose = () => false;

  /**method to update input values into state */
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value })
}

  /**method to change text */
  handleText(value) {
    this.setState({ callSuccess: value });

    if(value == false)
      this.setState({ callType: Constants['CallTypeOutbound'] });

  }

  /**method to submit form data of modal */
  handleSubmit = (event) => {
    event.preventDefault();
    let error = false;
    let fields = {}
    fields['status'] = this.state.callSuccess;
    fields['Call_type'] = parseInt(this.state.callType);

    if(!this.state.callSuccess){
      fields['unsuccessful_reason'] = this.state.unsuccessful_reason;

      if(this.state.unsuccessful_reason == 3 || this.state.unsuccessful_reason == 4){
        fields['schedule_call_start'] = moment(this.state.schedule_call_start).format('YYYY-MM-DD HH:mm:ss');
        fields['schedule_call_end'] = moment(this.state.schedule_call_start).add(1, 'hours').format('YYYY-MM-DD HH:mm:ss');

      }
    }

    if(this.state.notes){
      fields['notes']= this.state.notes;
    }

    if(this.state.callSuccess){
      delete this.state?.fields?.unsuccessful_reason;
      delete this.state?.fields?.schedule_call_start;
    }
    
    this.props.updateModal(fields);
    
  };

  render() {
    const { showModal, callSuccess, unsuccessful_reason_dropdown, unsuccessful_reason, currentDateTime, schedule_call_start, notes, callType} = this.state;
    const { callTypes } = this.props;
    return (
      <Fade>
      <Modal
        className="End-Call"
        id="myModal"
        onHide={this.handleClose}
        show={showModal}
        centered
        onHide={this.handleModalCloseClick}
        backdrop="static"
        size="sm"
      >
        <Modal.Header closeButton></Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <div className="main-content">
              <div className="call-icon-wrap">
                <img src={callIcon} />
              </div>
              <h1>Was the call answered</h1>
              <div className="btn-wrap-custom text-center">
                <button
                  type="button"
                  className={(this.state.callSuccess) ? 'btn btn-outline-primary green active' : 'btn btn-outline-primary green'}
                  onClick={() => this.handleText(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={(!this.state.callSuccess) ? 'btn btn-outline-primary red active' : 'btn btn-outline-primary red'}
                  onClick={() => this.handleText(false)}
                >
                  No
                </button>
              </div>

              <span className="mid-heading">
                {callSuccess
                  ? "Great! Let's get more information"
                  : "What was the main reason?"}
              </span>
              
              
                <div className="form-group">
                  <div className="input-wrap">
                  <label>Call Type</label>
                    <select className="form-control" value={callType} disabled={!callSuccess} id="callType" onChange={this.onChange}>
                    {(() => {
                      if (!_.isEmpty(callTypes)) {
                          return( 
                            callTypes.map((data, index) => (
                                  <option key={index} value={data.id}>{data.type}</option>
                              ))
                          )
                      }
                    })()}
                    </select>
                  </div>
                </div>
                

              {(!callSuccess) ?
              <div className="form-group">
                <div className="input-wrap">
                <label>Unsuccessful Reason</label>
                <select className="form-control" value={unsuccessful_reason} id="unsuccessful_reason" onChange={this.onChange}>
                {(() => {
                    if (!_.isEmpty(unsuccessful_reason_dropdown)) {
                        return( 
                          unsuccessful_reason_dropdown.map((data, index) => (
                                <option key={index} value={data.id}>{data.reason}</option>
                            ))
                        )
                    }
                })()}
                </select>
                
                  </div>
                  <small className="text-danger"></small>
              </div> : ''}

              {(!callSuccess) && (unsuccessful_reason == Constants['UnsuccessfulReason_Requested_a_Call_Back'] || unsuccessful_reason == Constants['UnsuccessfulReason_Booked_in_a_Call']) 
              ? <div className="form-group">
                <div className="input-wrap">
                <label>Schedule Next Start Call</label>
                <input type="datetime-local" defaultValue={schedule_call_start} id="schedule_call_start" min={currentDateTime} onChange={this.onChange} />
                </div>
                <small className="text-danger"></small>
              </div> : ''}
              <div className="form-group">
              <div className="input-wrap">
                <label>Notes</label>
                <textarea id="notes" onChange={this.onChange} value={notes}></textarea>
                </div>
                <small className="text-danger"></small>
              </div>
              <button type="submit" className="btn btn-primary">
              Submit
            </button>
            </div>
          </Modal.Body>
          <Modal.Footer>
           
          </Modal.Footer>
        </form>
      </Modal>
      </Fade>
    );
  }
}

export default EndCallModal;
