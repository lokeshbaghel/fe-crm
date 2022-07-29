import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import moment from "moment";
import _ from "lodash";
import { insertActivityEmail } from "../../../../../actions/AccountDetail";
import { connect } from "react-redux";
import validateEmailForm from './EmailFormValidation';
import { images } from "../../../../../utils/helper";

class index extends Component {
  state = {
    showModal: this.props?.showModal,
    heading:this.props?.heading,
    currentDateTime: moment().format('YYYY-MM-DDTHH:mm'),
    schedule_call_start: moment().format('YYYY-MM-DDTHH:mm'),
    notes: '',
    account_id: this.props?.match?.params?.id,
    //userid: this.props?.loggedUser?.user?.user_id,
    subject:'',
    activity_type:2,
    scheduleDateErr: '',
  };

  /** method to close modal */
  closeModal(action) {
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
    
    });
    this.props.handleModalClose(action);
  
  }
  onChange = event => {
    this.setState({ [event.target.id]: event.target.value })
}

  //Handle click outside of modal
  handleClose = () => false;

  



  validateForm = () => {
    let fields = this.state;
    let response = validateEmailForm(fields);

    this.setState({errors: response.errors});
    return response.formIsValid;
}

  handleSubmit = (event) => {
      
    event.preventDefault();
    let error = false;
    if (this.validateForm()) 
    {
        let fields = {
            subject      :this.state.subject  ,
            notes        :this.state.notes ,
            activity_type:this.state.activity_type, 
            schedule_call_start:this.state.schedule_call_start
        }
        
    
        this.props.sendActivityEmail(fields)
    }
 
  };


  render() {
    const { subject, schedule_call_start, notes,  currentDateTime,errors} = this.state;
    return (
      <React.Fragment>
       

<Modal
          id="myModal"
          centered size="sm"
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
                    <h2><img src={images["pop-up-email-icon.png"]} /> Log Email</h2>
                    <h1>{this.state.heading}</h1>
                    <div className="form-group fixed-width">
                        <div className="input-wrap select-wrap">
                            <label>Subject</label>
                            <input type="text" id="subject" onChange={this.onChange} value={subject} />
                            <small className="form-text text-danger">{errors?.subject}</small>
                        </div>
                        <small className="text-danger"></small>
                    </div>
                    {/* <div className="form-group fixed-width">
                        <div className="input-wrap select-wrap">
                            <label>Schedule Next Start Call *</label>
                            <input type="datetime-local" defaultValue={schedule_call_start} id="schedule_call_start" min={currentDateTime} onChange={this.onChange} />
                            <small className="form-text text-danger">{errors?.schedule_call_start}</small>
                        </div>
                    </div> */}
                    <div className="form-group">
                        <div className="input-wrap">
                            <label>Notes *</label>
                            <textarea id="notes" onChange={this.onChange} value={notes} ></textarea>
                            <small className="form-text text-danger">{errors?.notes}</small>
                        </div>
                    </div>
                    <button className="btn btn-primary" type="submit" >Submit</button>
                    {/* <button className="btn btn-outline-primary cancle-btn"  onClick={() => this.closeModal(false)}>Cancel</button> */}
                </div>
                </form>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
            
        </Modal>

      </React.Fragment>
    );
  }
}

  
  export default index;
  

