import React from "react";
import _ from "lodash";

import { images } from "../../../../utils/helper";

const CostConversion = (props) => {
    let percentage='';
    //let targetDataPercentage='';
    if(!_.isEmpty(props.costPerConversionCardData)){
          percentage=props.costPerConversionCardData.percentage;
          //targetDataPercentage=props.costPerConversionCardData.targetDataPercentage
    }

    return (
        <div className="col-md-12">
            <a target="6" className="card showSingle" onClick={()=>props.callReportClickTab('costPerConversion')}>
                <div className="card-body">
                    <h5 className="card-title">Cost per Conversion</h5>
                    <div className="tab-content">
                        <div className="tab-left">
                            <h3 className="total">Total:</h3>
                            <span className="value-big green-text">£{percentage}</span>
                            {/* <p className="percentage">Target: £{targetDataPercentage}</p> */}
                        </div>
                        <div className="tab-right">
                            <img src={images["graph-second.jpg"]} alt="Graph" />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default CostConversion;