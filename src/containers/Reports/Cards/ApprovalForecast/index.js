import React from "react";
import _ from "lodash";

import { images } from "../../../../utils/helper";

const ApprovalForeCast = (props) => {
    let approved_stages='';
    let total_enquiry_stages='';
    let forecast_approved='';
    let forecast_total='';
    let percentage_forcast='';
    let percentage_approved='';
    if(!_.isEmpty(props.approvalForecastCardData)){
        approved_stages=props.approvalForecastCardData.approved_stages;
        total_enquiry_stages=props.approvalForecastCardData.total_enquiry_stages
        forecast_approved=props.approvalForecastCardData.forecast_approved;
        forecast_total=props.approvalForecastCardData.forecast_total;
        percentage_forcast=props.approvalForecastCardData.percentage_forcast;
        percentage_approved=props.approvalForecastCardData.percentage_approved;
    }
    return (
        <div className="col-md-12">
            <a target="4" className="card showSingle" onClick={()=> props.handleTabChange()}>
                                      {/* onClick={()=>props.callReportClickTab('approvalForecastCard')} */}
                <div className="card-body">
                    <h5 className="card-title">Approvals vs Forecast</h5>
                    <div className="tab-content half">
                        <div className="tab-left">
                            <h3 className="total">Total Approvals:</h3>
                            <span className={"value-big " + (approved_stages >= total_enquiry_stages ? 'green-text' : 'red-text') }>{approved_stages}</span>
                            <span className="value-small"> /{ total_enquiry_stages }</span>
                            <p className="percentage">{percentage_approved} % of target</p>
                        </div>
                        <div className="tab-right left-border">
                            <h3 className="total">Forecast Approvals:</h3>
                            <span className={"value-big "+ (forecast_approved >= forecast_total ? 'green-text' : 'red-text') }>{forecast_approved}</span>
                            <span className="value-small"> /{forecast_total}</span>
                            <p className="percentage">{percentage_forcast} % of target</p>
                        </div>
                    </div>
                    <div className="tab-content">
                        <img src={images["graph-third.jpg"]} />
                    </div>
                </div>
            </a>
        </div>
    )
}

export default ApprovalForeCast;
