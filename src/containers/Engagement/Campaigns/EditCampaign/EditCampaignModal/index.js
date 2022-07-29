import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import Calendar from "react-calendar";
import _ from 'lodash';
import "../../CreateCampaign/CreateCampaignModal/index.css";
import Constant from "../../../../../utils/constants";

const moment = require("moment");
class CreateCampaignModal extends Component {

  constructor(props){
    super(props);
    this.state = {
      showHide      : this.props?.canShow,
      selectedDate  : moment(this.props.campaign.schedule_date).format("YYYY-MM-DD HH:mm"),
      fields        : this.props.campaign,
      errors        : {},
      min_end_date  : null
    };
  }

  /** method to close modal */
  closeModal(action) {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.updateModal(action);
    });
    this.setState({ showHide: action });
  }

  //Handle modal when outside click of modal
  handleClose = () => false;

  handleListOpen = () => {
    this.props.openListForm()
  }
   
    //change calender data
  changeDate=(e)=>{

      let fields = this.state.fields;
      fields['end_date'] = '';
      this.setState({fields});

      let dateChange=moment(e).format("YYYY-MM-DD HH:mm")
      this.setState({selectedDate:dateChange})

      if(this.state.fields.recurrent_type_id == Constant['crm_recurrence_type_only_once'])
        this.setState({min_end_date: ''})

      if(this.state.fields.recurrent_type_id == Constant['crm_recurrence_type_daily'])
        this.setState({min_end_date: moment(dateChange).add(1, 'days').format('YYYY-MM-DD')})
      
      if(this.state.fields.recurrent_type_id == Constant['crm_recurrence_type_weekly'])
        this.setState({min_end_date: moment(dateChange).add(7, 'days').format('YYYY-MM-DD')})
  
      if(this.state.fields.recurrent_type_id == Constant['crm_recurrence_type_monthly'])
        this.setState({min_end_date: moment(dateChange).add(1, 'month').format('YYYY-MM-DD')})
  
      if(this.state.fields.recurrent_type_id == Constant['crm_recurrence_type_quarterly'])
        this.setState({min_end_date: moment(dateChange).add(3, 'month').format('YYYY-MM-DD')})
  
      if(this.state.fields.recurrent_type_id == Constant['crm_recurrence_type_yearly'])
        this.setState({min_end_date: moment(dateChange).add(12, 'month').format('YYYY-MM-DD')})
    }

  callDrop = (date,minDiff) => {
    var quarterHours = minDiff;
    let diffLoopTime=60/minDiff;
    var currentdate = new Date(date);
    var times = [];
    for (var i = 0; i < 24; i++) {
      for (var j = 0; j < diffLoopTime; j++) {
        if(j==0 || j==1){
          var time = i + ":0" + j*quarterHours+":00";
        }else{
         var time = i + ":" + j*quarterHours+":00";
        }
        if ( currentdate.getHours() <= i) {
          if(currentdate.getHours() == i){
                  if(currentdate.getMinutes() <= j*quarterHours){
                    if (i < 10) {
                      time = "0" + time;
                    }
                    if (i >= 12) {
                      times.push(
                        <option value={time} key={time}>
                          {time + " PM"}
                        </option>
                      );
                    } else {
                      times.push(
                        <option value={time} key={time}>
                          {time + " AM"}
                        </option>
                      );
                    }
              }
          }else{
              if (i < 10) {
                time = "0" + time;
              }
              if (i >= 12) {
                times.push(
                  <option value={time} key={time}>
                    {time + " PM"}
                  </option>
                );
              } else {
                times.push(
                  <option value={time} key={time}>
                    {time + " AM"}
                  </option>
                );
              }
          }
        }
      }
    }
    return times;
  };

  onChange = event => {
    let fields = this.state.fields;
    fields['end_date'] = '';
    fields[event.target.id] = event.target.value;
    this.setState({fields});

    if(fields['recurrent_type_id'] == Constant['crm_recurrence_type_only_once'])
      this.setState({min_end_date: ''})

    if(fields['recurrent_type_id'] == Constant['crm_recurrence_type_daily'])
      this.setState({min_end_date: moment(this.state.selectedDate).add(1, 'days').format('YYYY-MM-DD')})

    if(fields['recurrent_type_id'] == Constant['crm_recurrence_type_weekly'])
      this.setState({min_end_date: moment(this.state.selectedDate).add(7, 'days').format('YYYY-MM-DD')})

    if(fields['recurrent_type_id'] == Constant['crm_recurrence_type_monthly'])
      this.setState({min_end_date: moment(this.state.selectedDate).add(1, 'month').format('YYYY-MM-DD')})

    if(fields['recurrent_type_id'] == Constant['crm_recurrence_type_quarterly'])
      this.setState({min_end_date: moment(this.state.selectedDate).add(3, 'month').format('YYYY-MM-DD')})

    if(fields['recurrent_type_id'] == Constant['crm_recurrence_type_yearly'])
      this.setState({min_end_date: moment(this.state.selectedDate).add(12, 'month').format('YYYY-MM-DD')})
}

  validateForm = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["campaign_name"] || fields["campaign_name"].trim() == '') {
      formIsValid = false;
      fields["campaign_name"] = '';
      this.setState({fields});
      errors["campaign_name"] = "Campaign Name is required";
    }

    if(!fields["contact_list_id"] || fields["contact_list_id"] == ''){
      formIsValid = false;
      errors["contact_list_id"] = "Please select list";
    }

    if(!fields["recurrent_type_id"] || fields["recurrent_type_id"] == ''){
      formIsValid = false;
      errors["recurrence_type"] = "Please select Occurance";
    }

    if(!fields["schedule_time"] || fields["schedule_time"] == ''){
      formIsValid = false;
      errors["schedule_time"] = "Please select schedule time";
    }

    this.setState({errors: errors});
    return formIsValid;

  }

  //Submit form for create campaign
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      let data = this.state.fields;
      data.schedule_date = moment(this.state.selectedDate).format('YYYY-MM-DD');

      if(data.recurrent_type_id != Constant['crm_recurrence_type_only_once']){
        if(!data['end_date']){
          data['end_date'] = this.state.min_end_date
        }
      }
      this.props.updateModal(data);
      this.closeModal(false);

    }
  }

  render() {
    const { campaignContactList, recurrenceTypes, templateType } = this.props;
    const { fields, errors, selectedDate, min_end_date } = this.state;
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="new-campaign"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            <h1>Before creating the Campaign</h1>
          </Modal.Header>
          <button
            type="button"
            className="close"
            onClick={() => this.closeModal(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close</span>
          </button>
          <Modal.Body>
            <form onSubmit={this.handleSubmit} autoComplete="off">
              {/* <div className="content-wrap">
                <p>Campaign types</p>
                <div className="switch-btn-wrap">
                  <div className="switch-btn">
                    <h2>Email</h2>
                    <label className="switch">
                      <input type="checkbox" checked={(templateType == 'email') ? true : false} disabled={true} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                  <div className="switch-btn">
                    <h2>SMS</h2>
                    <label className="switch">
                      <input type="checkbox" checked={(templateType == 'sms') ? true : false} disabled={true} />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div> */}

              <div className="content-wrap">
                <p>Be sure to check twice the name and Contact list</p>
                <div className="input-wrap-second">
                  <div className="group-wrap">
                    <div className="form-group">
                      <label>Campaign Name</label>
                      <input type="text" id="campaign_name" value={fields.campaign_name || ''} placeholder="Campaign 0025" onChange={this.onChange} />
                    </div>
                    <small className="text-danger">{errors.campaign_name}</small>
                  </div>
                  <div className="group-wrap last">
                    <div className="form-group select-down">
                      <label>Contact List</label>
                      <select id="contact_list_id" value={fields.contact_list_id || ''} onChange={this.onChange}>
                        <option value="">Select List</option>
                        {(() => {
                            if (!_.isEmpty(campaignContactList)) {
                                return( 
                                  campaignContactList.map((data, index) => (
                                        <option key={index} value={data.id}>{data.list_name}</option>
                                    ))
                                )
                            }
                        })()}
                      </select>
                    </div>
                    <small className="text-danger">{errors.contact_list_id}</small>
                  </div>
                  <a className="create-list-link" onClick={this.handleListOpen}>
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                  </a>
                </div>
              </div>

              <div className="select-main">
                <div className="content-wrap">
                  <p>Schedule this Campaign</p>
                  <div className="select-custom-wrap">
                    <select
                      id="schedule_time"
                      className="select-down-second"
                      value={fields.schedule_time || ''}
                      onChange={this.onChange}
                    >
                      <option value="">Select Schedule Time</option>
                       {this.callDrop((moment(selectedDate).format("YYYY-MM-DD HH:mm")),5)}
                    </select>
                  </div>
                  <small className="text-danger">{errors.schedule_time}</small>
                </div>
                <div className="content-wrap">
                  <p>Schedule a Campaign Occurrence</p>
                  <div className="select-custom-wrap">
                    <select
                      id="recurrent_type_id"
                      className="select-down-second"
                      value={fields.recurrent_type_id}
                      onChange={this.onChange}
                    >
                      <option value="">Select Occurance</option>
                      {(() => {
                            if (!_.isEmpty(recurrenceTypes)) {
                                return( 
                                  recurrenceTypes.map((data, index) => (
                                        <option key={index} value={data.id}>{data.text}</option>
                                    ))
                                )
                            }
                        })()}
                    </select>
                  </div>
                  <small className="text-danger">{errors.recurrence_type}</small>
                </div>
              </div>

              {
                fields.recurrent_type_id != Constant['crm_recurrence_type_only_once'] && fields.recurrent_type_id ?
              <div className="select-main">
                <div className="content-wrap">
                  <p>End Date</p>
                  <div className="select-custom-wrap">
                    <input type="date" id="end_date" min={min_end_date} value={fields.end_date ? fields.end_date : min_end_date} onChange={this.onChange} />
                  </div>
                  <small className="text-danger">{errors.end_date}</small>
                </div>
              </div>
              : null }

              <div className="calendar-wrap">
                <Calendar onChange={this.changeDate} value={new Date(selectedDate)} minDate={new Date()} />
              </div>
              <div className="btn-wrap">
                <button type="submit" className="btn btn-primary">
                  Update Campaign
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreateCampaignModal;