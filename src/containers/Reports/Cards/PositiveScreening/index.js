import  React  from "react";
import { Component } from "react";
import _ from "lodash";

class index extends Component {
  renderListHtml = (report_positive_screening) => {
    if (!_.isEmpty(report_positive_screening)) {
      return report_positive_screening.month_wise_records.map((key, index) => (
            <li key={index}>
               <span>{key.month}</span> <strong>- {key.value}</strong>
            </li>
        ));
      }
  }

  render(){
    const report_positive_screening = this.props.positiveScreening;
    return (<>   
    <div className="col-md-4">
    <a target="2" className="card showSingle" onClick={()=>this.props.callReportClickTab('positiveScreening')}>
      <div className="card-body">
        <h5 className="card-title">Positive Screenings</h5>
        <div className="tab-content half">
          <div className="tab-left">
            <h3 className="total">Total:</h3>
            <span className="value-big green-text"> { !_.isEmpty(report_positive_screening) ? report_positive_screening.count : '' }</span>
            <p className="percentage">{ !_.isEmpty(report_positive_screening) ? report_positive_screening.percentage : '' } % of enquirers</p>
          </div>
          <div className="tab-right left-border">
            <h3 className="total">Previous months:</h3>
            <ul className="tab-list">
             { !_.isEmpty(report_positive_screening) ? this.renderListHtml(report_positive_screening) :'' }
              
            </ul>
          </div>
        </div>
      </div>
    </a>
  </div>
</>);
  }
}

export default index;
