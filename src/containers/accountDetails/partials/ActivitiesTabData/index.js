import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";

import { displayRecordNotFound } from "../../../../utils/helper";
import { Scrollbars } from "react-custom-scrollbars";
import ActivityModal from "./Modals/ActivityModal";
import CallModal from "./Modals/CallModal";
import Schedulecall from "./Modals/ScheduleCallModal";
import EmailModal from "./Modals/EmailModal";
import TaskModal from "./Modals/TaskModal";
import RecordCallModal from "./Modals/RecordCallModal";
import Constant from "../../../../utils/constants";

class ActivitiesTabData extends Component {
  state = {
    showActivityModal: false,
    callModal: false,
    schedulecall: false,
    emailModal: false,
    meetingModal: false,
    taskModal: false,
  };

  handleModal = (type, flag) => {
    if (type === "parent") this.setState({ showActivityModal: flag });
    else if (type === "call")
      this.setState({
        callModal: flag,
        showActivityModal: false,
        emailModal: false,
        meetingModal: false,
        taskModal: false,
      });
    else if (type === "schedulecall")
      this.setState({
        schedulecall: flag,
        callModal: false,
        showActivityModal: false,
        emailModal: false,
        meetingModal: false,
        taskModal: false,
      });
    else if (type === "email")
      this.setState({
        emailModal: flag,
        showActivityModal: false,
        callModal: false,
        meetingModal: false,
        taskModal: false,
      });
    else if (type === "meeting")
      this.setState({
        meetingModal: flag,
        showActivityModal: false,
        emailModal: false,
        callModal: false,
        taskModal: false,
      });
    else if (type === "task")
      this.setState({
        taskModal: flag,
        meetingModal: false,
        showActivityModal: false,
        emailModal: false,
        callModal: false,
        showRecordCallModal: false,
        selectedActivityId : ''
      });
  };

  handleActions = (type) => {
    this.handleModal("email", false);
    this.props.submit(type);
  };

  handleTaskActions = (type) => {
    this.handleModal("task", false);
    this.props.submittaskActivity(type);
  };

  handleCallActions = (type) => {
    this.handleModal("call", false);
    this.props.submit(type);
  };
  handleSchduleCallActions = (type) => {
    this.handleModal("schedulecall", false);
    this.props.submitScheduleCall(type);
  };

  recordCallOutcome = (value,id) =>{    
    this.setState({ showRecordCallModal: value,selectedActivityId:id });
  }

  recordCallAction = (id)=>{
    if(id){
      this.props.recordCallData(id);
    }
    this.setState({showRecordCallModal:false})
  }

  render() {
    const {
      showActivityModal,
      callModal,
      emailModal,
      meetingModal,
      taskModal,
      schedulecall,
      selectedActivityId
    } = this.state;
    const {
      activityHistory,
      CampaigRecordsData,
      CallTypeData,
      is_post_to_charms,
      post_hold_to_charms,
    } = this.props;

    return (
      <div
        className="tab-pane fade show active"
        id="activities"
        role="tabpanel"
        aria-labelledby="activities-tab"
      >
        <div className="curve-box-content">
          {is_post_to_charms == Constant["is_post_to_charms_no"] &&
          post_hold_to_charms != Constant["post_hold_to_charms_yes"] ? (
            <button
              className="btn btn-primary add-activities"
              onClick={() => this.handleModal("parent", true)}
            >
              Log an activity
            </button>
          ) : (
            ""
          )}
          {is_post_to_charms == Constant["is_post_to_charms_no"] &&
          post_hold_to_charms != Constant["post_hold_to_charms_yes"] ? (
            <button
              className="btn btn-primary add-activities"
              onClick={() => this.handleModal("schedulecall", true)}
            >
              Schedule a call
            </button>
          ) : (
            ""
          )}
          <Scrollbars style={{ height: "660px" }}>
            <div className="scrollbar">
              {(() => {
                if (!_.isEmpty(activityHistory)) {
                  return activityHistory.map((data, index) => (
                    <div key={index} className="right-list">
                      <div className="head-title">
                        {data.activity_type_name == "Logged Email" ? (
                          <React.Fragment>
                            <span className="head-left campaign-icon">
                              {data.activity_type_name.charAt(0).toUpperCase() +
                                data.activity_type_name.slice(1)}
                            </span>
                            {/* { data.booked_start ? <span className="head-right">{ moment(data.booked_start).format("DD.MM.YYYY hh:mmA") }</span> :'' } */}
                          </React.Fragment>
                        ) : (                          
                          <span className="head-left call-icon">
                            {data.activity_type_name.charAt(0).toUpperCase() +
                              data.activity_type_name.slice(1)}
                          </span>
                        )}

                        {data.end_ts && data.activity_type_name != "Scheduled Call" ? (
                          
                          <span className="head-right">
                            {moment(data.end_ts).format("DD.MM.YYYY hh:mm A")}
                          </span>
                        ) : (
                          <React.Fragment>
                          <div className="record-call-wrapper">
                            <span className="head-right">
                              {moment(data.create_date).format("DD.MM.YYYY hh:mm A")}
                            </span>
                            {
                              (data.activity_status==="Planned") ? (
                                <React.Fragment>
                                  <button className="btn btn-primary btn-xs add-activities" onClick={()=>this.recordCallOutcome(true, data.id)}>Record call outcome</button>
                                  {
                                    this.state.showRecordCallModal && (selectedActivityId ==data.id)  ?
                                    ( <RecordCallModal canShow={this.state.showRecordCallModal} updateModal={()=>this.recordCallOutcome(false, data.id)} actionModal={()=>this.recordCallAction(data.id)} id={data.id} />)
                                    : null  
                                  }
                                </React.Fragment>
                              ) : null
                            }
                          </div>
                          </React.Fragment>
                        )}                        
                        
                      </div>
                      <h3>{data.user_name}</h3>
                      <h3 className="green-text">{data.activity_status}</h3>
                      {data.booked_start && data.activity_status == 'Planned' && data.activity_type_name != "Logged Email"? (
                        <p>
                          Scheduled for{" "}
                          {moment(data.booked_start).format(
                            "DD.MM.YYYY hh:mm A"
                          )}
                        </p>
                      ) : (
                        ""
                      )}
                      {data.call_summary ? <p>Notes: {data.call_summary}</p> : ""}
                      {data.mail_subject ? <p>{data.mail_subject}</p> : ""}
                      {data.successfull_flag_id ? <p>Outcome: {Constant[data.successfull_flag_id]}</p> : ""}
                      
                      {data.callType ? <p>Call Type: {data.callType}</p> : ""}
                      {data.end_ts && data.activity_type_name != "Logged Email" ? (
                          <span className="head-right">
                            End Time: {moment(data.end_ts).format("DD.MM.YYYY hh:mm A")}
                          </span>
                        ) : (
                          ""
                        )}

                      {data.task_title ? <p>{data.task_title}</p> : ""}
                      {data.task_notes ? <p>Notes: {data.task_notes}</p> : ""}

                      {data.mail_subject ? <p>Subject: {data.mail_subject}</p> : ""}
                      {data.mail_text ? <p>Notes: {data.mail_text}</p> : ""}
                      {data.description ? <p>{data.description}</p> : ""}
                    </div>
                  ));
                } else {
                  return displayRecordNotFound("No Activity History");
                }
              })()}
            </div>

            <div className="scrollbar">
              {(() => {
                if (!_.isEmpty(CampaigRecordsData)) {
                  return CampaigRecordsData.map((data, index) => (
                    <div key={index} className="right-list">
                      <div className="head-title">
                        {data.templateType ? (
                          <span className="head-left campaign-icon">
                            {data.templateType.charAt(0).toUpperCase() +
                              data.templateType.slice(1)}
                          </span>
                        ) : (
                          ""
                        )}
                        {data.created_date ? (
                          <span className="head-right">
                            {moment(data.created_date).format(
                              "DD.MM.YYYY hh:mm A"
                            )}
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <h3>{data.campaign}</h3>
                    </div>
                  ));
                } else {
                  return displayRecordNotFound("No Campaign History");
                }
              })()}
            </div>
          </Scrollbars>
        </div>

        {showActivityModal ? (
          <ActivityModal
            heading={"Please Choose The Activity You Wish to Log"}
            showModal={showActivityModal}
            CallTypeData={CallTypeData}
            handleModalClose={() => this.handleModal("parent", false)}
            handleModalSuccess={(type) => this.handleModal(type, true)}
          />
        ) : null}

        {callModal ? (
          <CallModal
            heading={"Lets get more Information"}
            type={"Call"}
            showModal={callModal}
            CallTypeData={CallTypeData}
            handleModalClose={() => this.handleModal("call", false)}
            handleModalSuccess={(type) => this.handleActions(type)}
            sendActivityCall={(type) => this.handleCallActions(type)}
          />
        ) : null}

        {schedulecall ? (
          <Schedulecall
            heading={"Lets get more Information"}
            type={"schedulecall"}
            showModal={schedulecall}
            CallTypeData={CallTypeData}
            handleModalClose={() => this.handleModal("schedulecall", false)}
            handleModalSuccess={(type) => this.handleActions(type)}
            sendActivityCall={(type) => this.handleSchduleCallActions(type)}
          />
        ) : null}

        {emailModal ? (
          <EmailModal
            heading={"Lets get more Information"}
            showModal={emailModal}
            handleModalClose={() => this.handleModal("email", false)}
            handleModalSuccess={(type) => this.handleActions(type)}
            sendActivityEmail={(type) => this.handleActions(type)}
          />
        ) : null}

        {meetingModal ? (
          <CallModal
            heading={"Lets get more Information"}
            type={"Meeting"}
            showModal={meetingModal}
            handleModalClose={() => this.handleModal("meeting", false)}
            handleModalSuccess={(type) => this.handleActions(type)}
          />
        ) : null}

        {taskModal ? (
          <TaskModal
            heading={"Lets get more Information"}
            showModal={taskModal}
            handleModalClose={() => this.handleModal("task", false)}
            submittaskActivity={(type) => this.handleTaskActions(type)}
          />
        ) : null}
      </div>
    );
  }
}

export default ActivitiesTabData;
