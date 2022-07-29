import  React  from "react";
import { Component } from "react";
import _ from "lodash"; 

class index extends Component {
  renderListHtml = (dropOffData) => {
    if (!_.isEmpty(dropOffData)) {
      return dropOffData.month_wise_records.map((key, index) => (
            <li key={index}>
               <span>{key.month}</span> <strong>- {key.value}</strong>
            </li>
        ));
      }
  }
  render(){
     const dropOffData = this.props.dropOff;
    return (<>
      <div className="col-md-4">
                    <a target="3" className="card showSingle" onClick={()=>this.props.callReportClickTab('dropoff')}  >
                      <div className="card-body">
                        <h5 className="card-title">Drop Offs</h5>
                        <div className="tab-content half">
                          <div className="tab-left">
                            <h3 className="total">Total:</h3>
                            <span className="value-big red-text">{ !_.isEmpty(dropOffData) ? dropOffData.count : '' }</span>
                            <p className="percentage">{ !_.isEmpty(dropOffData) ? ((Object.keys(dropOffData).indexOf("percentage")) ? `${dropOffData.percentage} % of Enquirers`:'') : '' } </p>
                          </div>
                          <div className="tab-right left-border">
                            <h3 className="total">Previous months:</h3>
                            <ul className="tab-list">
                              { !_.isEmpty(dropOffData) ? this.renderListHtml(dropOffData) :'' }
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
