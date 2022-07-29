import React from "react";

import { images } from "../../../../utils/helper";
import _ from 'lodash'

const EnquiryTarget = (props) => {
    const {enquiryTarget} = props;
    
    return (
        <div className="col-md-4">
            <a target="1" id="showall" className="card showSingle active" onClick={()=> props.handleTabChange()}>
                <div className="card-body">
                    <h5 className="card-title">Enquiries Vs Target</h5>
                    <div className="tab-content half">
                        <div className="tab-left">
                            <h3 className="total">Total:</h3>
                            <span className={"value-big "+ (enquiryTarget?.totalEnquiries >= enquiryTarget?.totalTarget ? 'green-text' : 'red-text') }>{enquiryTarget?.totalEnquiries}</span>
                            <span className="value-small"> /{enquiryTarget?.totalTarget}</span>
                            <p className="percentage">{enquiryTarget?.enquiryTargetpercentage}% of target</p>
                        </div>
                        {/* <div className="tab-right">
                            <img src={images["graph.jpg"]} />
                        </div> */}
                        <div className="tab-right left-border">
                            <h3 className="total">Previous months:</h3>
                            <ul className="tab-list">
                                {(() => {
                                    if (!_.isEmpty(enquiryTarget)) {
                                        return (
                                            enquiryTarget.month_wise_records.map((key, index) => (
                                                <li key={index}>
                                                    <span>{key.month}</span> <strong>- {key.value}</strong>
                                                </li>
                                            ))
                                        )
                                    }
                                })()} 
                            </ul>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default EnquiryTarget;
