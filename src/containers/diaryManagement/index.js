import "./index.css";
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";

import Banner from "../../components/Banner";
import SideCalender from "../../components/Calender/SideCalender";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import {fetchDiaryMgtData, updateStartTimeandStatus, resetDiaryMgtdData ,deleteCalenderRecord,getAttemptApiFilterData} from "../../actions/DiaryManagement";
import { displayRecordNotFound } from "../../utils/helper";
import BlockUI from "../../components/BlockUI";
import { images,accessAllowed } from "../../utils/helper";
import Constants from "../../utils/constants";
import DiaryMgtFilterPopUp from "../../components/Modals/DiaryMgtFilterPopUp";

class DiaryManagement extends React.Component {

    state = {
      filterAttemptModal: false
    };
    /*lifecycle method to get data */
    componentDidMount() {
      accessAllowed(Constants['diary-management']);
      this.props.fetchDiaryMgtData();
    }

    /*lifecycle method to reset data */
    componentWillUnmount(){
        this.props.resetDiaryMgtdData();
    }

    /**method called when start button is clicked */
    handleStartCall = (id) => {
        const loggedUser = this.props.loggedUser.user;  //fetched from redux store
        const params = {
            account_id : id,
            user_id : loggedUser.user_id
        }
        this.props.updateStartTimeandStatus(id, params);
    };

    calcualateTimeDiff = dueDate => {
        var dueFormat = moment(dueDate); 
        var nowFormat = moment().format('YYYY-MM-DD HH:mm:ss'); 
        
        var ms = moment(dueFormat,"YYYY-MM-DD HH:mm:ss").diff(moment(nowFormat,"YYYY-MM-DD HH:mm:ss"));
        var d = moment.duration(ms);
      
        var getHoursWithMinutes = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
     
        return (
          <>
            <span className="time">
              { //(moment().isBefore(moment(dueDate),'hours') || moment().isBefore(moment(dueDate).subtract(1,'hours'), 'hours'))  ? 
              //:  
              }
                { <b className={d.asHours() > 1?"text-dark":"text-danger"}>{getHoursWithMinutes} hours</b> }
            </span>
          </>
        )
    }

    delete_calender_record = (id) => {
      const loggedUser = this.props.loggedUser.user;  //fetched from redux store
      const params = {
          activity_id : id,
          user_id : loggedUser.user_id
      }
      
      this.props.deleteCalenderRecord(id,params);
    };
   

    callAttemptPopup=(event)=>{
       this.setState({filterAttemptModal: true });
    }

   /**method called when click on filter popup */
   getAttemptFilterData = (data) => {
     if(typeof data == 'boolean'){
      this.setState({filterAttemptModal: data });
     }else{
      this.setState({filterAttemptModal:false });
      if(data)
        this.props.getAttemptApiFilterData({data})
      else
        this.props.getAttemptApiFilterData()
     }
    }

    /**method called to display activities list*/
    renderListHtml = (activities) => {
      
      if (!_.isEmpty(activities)) {
        return activities.map((activity, index) => (
          <div className="task-list call" key={index}>
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <h2 className="call-condition">Call</h2>
                <span className="date-time">
                  {moment(activity.due_ts).format("DD MMMM hh:mmA")}
                </span>
                { this.calcualateTimeDiff(activity.due_ts) }
              </div>

              <div className="col-lg-6 col-md-12 d-flex justify-content-end">
                  <button className="btn pink btn-outline-primary" onClick={() => this.handleStartCall(activity.account_id)}>
                    <img src={images["icon-feather-phone-call.svg"]} />
                    Start Call
                  </button>
              </div>

              <div className="col-md-12">
                <span className="border-space"></span>
              </div>
            </div>

            <div className="row">
              <div className="list-content-main">
              <div className="list-content">
                <div className="stack">
                  <span>Enquirer</span>
                  <p>{ activity.first_name+ ' ' + activity.last_name }</p>
                </div>
              </div>
              <div className="list-content">
                <div className="stack">
                  <span>Stage</span><p>{ activity.stage_name }</p>
                </div>
              </div>
              <div className="list-content">
                <div className="stack">
                  <span>Last Call</span>
                  
                  <p>{activity.last_call ? moment(activity.last_call).format("DD MMMM hh:mm A") : 'N/A'}</p>
                </div>
              </div>
              <div className="list-content small-list">
                <div className="stack">
                  <span>Attempts</span><p>{activity.attempts}</p>
                </div>
              </div>
              <div className="list-content small-list">
                <div className="stack ">
                  <span>CRM ID</span><p>{activity.account_id}</p>
                </div>
              </div>
              <div className="list-content">
                <div className="stack">
                  <span>Agency</span><p>{activity.agency_name}</p>
                </div>
              </div>
              <div className="list-content">
                <div className="stack">
                  <span>Source</span> <p>{activity.marketing_source}</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        ));
      } else {
        return displayRecordNotFound("No Record Found");
      }
    };

  render() {
    const { blocking, activities, calenderList,agencyfilterResult, dueCallCount } = this.props.diarydata;
    let {filterAttemptModal} = this.state;
    
    return (
      <React.Fragment>
        <Banner img={BannerImage} />
        <BlockUI blocking={blocking}></BlockUI>

        <div className="page-content-wrapper diary-management" data-aos="fade-up">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="row">
                  <div className="col-lg-8 col-md-12">
                    <h1 className="dash-title">Diary Management</h1>
                  </div>

                  <div className="col-lg-4 col-md-12 d-flex justify-content-lg-end">
                  {/* {dueCallCount} */}
                    {/* <div className="overdue-calls">Overdue Calls <span>{dueCallCount}</span></div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-8 col-md-12 left-content">
              
             

                <div className="row task-heading">
                  <div className="col-lg-8 d-flex col-md-12">
                  <div className="overdue-calls green-call">Total Calls <span>{ activities?.length }</span></div>
                  <div className="overdue-calls">Overdue Calls <span>{dueCallCount}</span></div>
                  
                    <select name="Add/schedule event" id="Addscheduleevent" style={{display:'none'}}>
                      <option value="addscheduleevent">
                        Add/schedule event
                      </option>
                      <option value="call">Call</option>
                      <option value="meeting">Meeting</option>
                      <option value="email">Email</option>
                      <option value="task">Task</option>
                    </select>
                  </div>
                  <div className="col-lg-4 col-md-12 diary-right-content">
                    <div className="search-div" style={{display:'none'}}>
                      <input
                        type="text"
                        className="form-control search-user"
                        id=""
                        placeholder=""
                      />
                      <button type="submit" className="search-btn">
                        search
                      </button>
                    </div>
                    <a
                      className="btn white filter-btn btn-outline-primary"
                      onClick={(event)=>this.callAttemptPopup(event)}
                    >
                      Filter  <img src={images["filter-icon.png"]} />
                    </a>
                    { (filterAttemptModal) ? <DiaryMgtFilterPopUp
                                          canShow={filterAttemptModal}
                                          listOptionData={agencyfilterResult}
                                          filterAttempts={(data) => this.getAttemptFilterData(data)}
                    /> : ''
                    }
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12"> {this.renderListHtml(activities)}</div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 right-content">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <SideCalender calenderlist={ calenderList } handleClick={this.delete_calender_record }  />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => {
    return {
        loggedUser  : state.authenticatedUser,
        diarydata   : state.diaryManagement,
    };
};

export default connect(
              mapsStateToProps, 
              { fetchDiaryMgtData,updateStartTimeandStatus,resetDiaryMgtdData,deleteCalenderRecord,getAttemptApiFilterData}
            )(DiaryManagement);
