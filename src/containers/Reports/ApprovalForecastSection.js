import React, {Component, Fragment} from 'react';
import _ from 'lodash'
import moment from 'moment'

import ApprovalForeCastGraph from "./Graphs/ApprovalForeCastGraph";
import ComparisionGraph from './Graphs/ComparisionGraph';
import MultiSelectDropdowm from "../../components/MultiSelectDropdowm";

class ApprovalForeCastSection extends Component{
    state = {
        maxDate         : moment().format("YYYY-MM-DD"),
        sourcesSelected : [],
    }

    /**method called when any tab is clicked or filter is applied */
    getApprovalComparisionData=(keyname)=>{
        this.props.setApprovalTab(keyname)
    }

    /*method called when data is changed in filter*/
    handleChange = (event) => {
        this.props.filterChange(event)
    }

    /*method called when data is submitted*/
    submitFilter = () => {
        this.props.submitComparision('approvalForecastComparisionGraph')
    }

    onhandleAllSource=(data)=>{
        this.setState({sourcesSelected:data});
        this.props.handleSource(data)
    }

    /*method called when reset button is clicked*/
    resetFilter = () => {
        this.props.submitComparision('resetApprovalForecastGraph');
    }

    render() {
        const {approvalForecastGraphData, marketingSources, approvalForecastTabName, approvalForecastStartDate, approvalForecastEndDate} = this.props;
        const { maxDate, sourcesSelected } = this.state;
        
        return (
            <div className="approval-inner">
                <h3>Approvals vs Forecast</h3>
                {/* <h5>Current values for this month</h5> */}
               
                <div className="">
                    <ul className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                        <li>
                            <a className={`nav-item nav-link ${approvalForecastTabName == 'approval' ? 'active' : ''}`} data-toggle="tab" href="#approval-content"
                                role="tab" aria-controls="inprogress-content" aria-selected={`${approvalForecastTabName == 'approval' ? true : false}`}
                                onClick={() => this.getApprovalComparisionData('approval')}
                            >
                            Approval vs ForeCast
                            </a>
                        </li>
                        <li>
                            <a className={`nav-item nav-link ${approvalForecastTabName == 'comparision' ? 'active' : ''}`} data-toggle="tab" href="#comparision-content"
                                role="tab" aria-controls="completed-content" aria-selected={`${approvalForecastTabName == 'comparision' ? true : false}`}
                                onClick={() => this.getApprovalComparisionData('comparision')}
                            >
                            Comparision
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content" id="nav-tabContent">
                    <div className={`tab-pane fade show ${approvalForecastTabName == 'approval' ? 'active' : ''}`} id="approval-content" role="tabpanel" aria-labelledby="all-content-tab">
                        {!_.isEmpty(approvalForecastGraphData) ? 
                            <ApprovalForeCastGraph graphData={approvalForecastGraphData} /> 
                        : ''}
                    </div>

                    <div className={`tab-pane fade show ${approvalForecastTabName == 'comparision' ? 'active' : ''}`} id="comparision-content" role="tabpanel" aria-labelledby="all-content-tab">
                        <div className="main-content-wrap">
                            
                                <div className="inputs-group">
                                    <div className="input-wrap">
                                        <label>Start Date</label>
                                        <input type="date" placeholder="Start Date" name="approvalForecastStartDate" 
                                                value={approvalForecastStartDate} max={maxDate}
                                                onChange={this.handleChange}
                                        />
                                    </div>
                                    <small className="form-text text-danger"></small>
                                </div>
                            

                            
                                <div className="inputs-group">
                                    <div className="input-wrap">
                                        <label>End Date</label>
                                        <input type="date" placeholder="End Date" name="approvalForecastEndDate" 
                                                value={approvalForecastEndDate} max={maxDate}
                                                onChange={this.handleChange}
                                        />
                                    </div>
                                    <small className="form-text text-danger"></small>
                                </div>
                            

                            
                                <div className="inputs-group">
                                    <div className="input-wrap">
                                        <label>Source</label>
                                        { (_.size(marketingSources) > 0) ? 
                                            <MultiSelectDropdowm placeholderText="Select Source" lableText="All Source"  
                                                options={marketingSources}  value={sourcesSelected} 
                                                onChangeAllAgencyList={this.onhandleAllSource} /> 
                                        : null }
                                    </div>
                                    <small className="form-text text-danger"></small>
                                </div>
                            
                                <div className="filter-submit-btn-wrap">
                                    <button className="btn btn-primary" onClick={this.submitFilter}>Apply Filter</button>
                                    <button className="btn btn-primary" onClick={this.resetFilter}>Reset</button>
                                </div>
                                
                        </div>

                        {!_.isEmpty(approvalForecastGraphData) ? 
                            <ComparisionGraph graphData={approvalForecastGraphData} />
                        : ''}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default ApprovalForeCastSection;