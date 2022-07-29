import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Calendar from "react-calendar";
import moment from "moment";
import _ from "lodash";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { NavLink } from "react-router-dom";

import  CalenderConfirmPopUp  from "../Modals/CalenderConfirmPopUp";

const SideCalender = (props) => {
  const day = new Date();
  var nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);
  const [calenderShowModal,setcalenderShowModal]=useState(false);
  const [dateState, setdateState] = useState(new Date());
  const [ showModal,setshowModel]= useState('false');
  const changeDate = (e) => {
    setdateState(e);
  };
  
  const dateStatedata = moment(dateState).format("DD-MM-YYYY");
  
  const getCalenderData=(activity_id)=>{
    if(typeof activity_id == 'boolean'){
      setcalenderShowModal(activity_id);
     }else{
      setcalenderShowModal(false);
      props.handleClick(activity_id);
     }
    
  }
  const confirmNoDelete=(status)=>{
    if(typeof status == 'boolean'){
         setcalenderShowModal(false);
    }
  }
  const setPopUpCalender=(event)=>{
    setcalenderShowModal(true);
  }
  return (
    
    <div className="calender_full">
      <Calendar onChange={changeDate} value={dateState} />

      <Tabs defaultActiveKey="Scheduled" id="uncontrolled-tab-example">
        <Tab eventKey="Scheduled" title="Scheduled">
          <div className="entry">
            {!_.isEmpty(props.calenderlist)
              ? props.calenderlist.map(function (entry, i) {
                  var entryFromThisDate =
                    moment(entry.booked_start).format("DD-MM-YYYY") === dateStatedata
                      ? true
                      : false;
                  if (entryFromThisDate) {
                    return (
                      <div
                        className="borderbox"
                        style={{ backgroundColor: "#EB81A9" }}
                        key={i}
                      >
                      <NavLink to={`/account-details/${entry.account_id}`} id="calender_listid">
                        <div className="entry_row">
                          <span className="entry_time">
                            {moment(entry.booked_start).format("H:m")}{" "}
                            {moment(entry.booked_end).format("H:m")}{" "}
                          </span>
                          <div className="cutom-right-content">
                            <span className="entry_event">
                              Enquirer name: {entry.account_name} | User: {entry.user_name}
                            </span>
                            <span className="expirytime">
                              {moment(entry.booked_start).format("DD-MM-YYYY H:m:s A")}
                            </span>
                          </div>
                          { calenderShowModal ?
                          <CalenderConfirmPopUp  canShow={calenderShowModal} 
                          calenderDeleteConfirm={(data) => getCalenderData(entry.activity_id)}
                          calenderDeleteCancel={(status_responce)=>confirmNoDelete(status_responce)}
                          />
                          : ''
                         }
                         </div>
                         </NavLink>
                         <a className="rightCloseCalender" onClick={(event)=>setPopUpCalender(event)}>
                            <i className="fa fa-close"></i>
                          </a>
                        </div>
                      
                    );
                  }
                })
              : ""}
          </div>
        </Tab>
     </Tabs>
    </div>
  );
};
export default SideCalender;
