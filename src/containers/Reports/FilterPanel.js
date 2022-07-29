import React, {Component} from 'react';
import OffCanvas from 'react-aria-offcanvas'
import _ from 'lodash'
import moment from 'moment'

import { images, displayErrorMessage } from "../../utils/helper";
import MultiSelectDropdowm from "../../components/MultiSelectDropdowm";

const initialState = {
    startDate       : '',
    endDate         : '',
    agencyId        : '',
    region          : '',
    sourceId        : '',
    campaignId      : '',
    enquiryType     : '',
    localAuthority  : '',
    buttonStatus    : true
}

class FilterPanel extends Component{
   
    constructor(props) {
        super(props);
        this.focusBtnRef = React.createRef();
        this.state = {
            selectedSource   : [],
            selectedAgencies : [],
            selectedAuthority : [],
            isOpenFilter     : false,
            maxDate          : moment().format("YYYY-MM-DD"),
            ...initialState
        }
      }

    /**method to toggle the filter panel */
    toggleFilterPopUp = (action) => {
        this.setState({ isOpenFilter: action })
    }

    /*method called when data is changed in filter*/
    handleChange = (event) => {
        event.preventDefault();

        this.setState({buttonStatus : false})
        const type = event.target.name;
        if(type === 'startDate')
            this.setState({startDate : event.target.value})

        if(type === 'endDate')
            this.setState({endDate : event.target.value})

        if(type === 'agencyId')
            this.setState({agencyId : this.state.agencyId})

        if(type === 'region')
            this.setState({region : event.target.value})

        if(type === 'sourceId')
            this.setState({sourceId : event.target.value})

        if(type === 'campaignId')
            this.setState({campaignId : event.target.value})

        if(type === 'enquiryType')
            this.setState({enquiryType : event.target.value})
         
        if(type === 'localAuthority')
            this.setState({localAuthority : event.target.value})    
    }

    /*method called when reset button is clicked*/
    resetFilter = () => {
        this.setState(initialState)
        this.state.selectedSource =[]
        this.state.selectedAgencies = []
        this.state.selectedAuthority = []
        this.props.resetFilter();
    }

    /*method called when data is submitted*/
    submitFilter = () => {
        this.focusBtnRef.current.blur()
        let isEmpty = false;
        const {startDate, endDate, agencyId, region, sourceId, campaignId, enquiryType, localAuthority } = this.state;
        if(startDate){
            isEmpty = true
            if(!endDate){
                displayErrorMessage('Please select end date also')
                return false;
            }}

        if(endDate){
            isEmpty = true
            if(!startDate){
                displayErrorMessage('Please select start date also')
                return false;
            }}

        if(agencyId.length > 0)
            isEmpty = true

        if(sourceId.length > 0)
            isEmpty = true   
             
        if(enquiryType)
            isEmpty = true        
        
        if(localAuthority.length > 0)
            isEmpty = true     
        
        if(!isEmpty){ 
            displayErrorMessage('Please select atleast one filter.')
            return false; 
        }

        this.props.submitFilterData('report', {startDate, endDate, agencyId, region, sourceId, campaignId, enquiryType, localAuthority})
    }

    onhandleAllAgency=(data)=>{
        this.setState({
          selectedAgencies:data
        });
        let agencyArray=[];
        
        if(!_.isEmpty(data)){
        data.map((data, index) => (
                agencyArray.push(parseInt(data.value))
        ));
        
        this.setState({
            agencyId:agencyArray
        });
        this.setState({buttonStatus : false})
        }else{
            this.setState({
                agencyId:agencyArray
            });
        }
    }

    onhandleAllSource=(data)=>{
        this.setState({
        selectedSource:data
        });
        let sourceArray=[];
        if(!_.isEmpty(data)){
        data.map((data, index) => (
            sourceArray.push(parseInt(data.value))
            ));
        this.setState({
            sourceId:sourceArray
        });
        this.setState({buttonStatus : false})
        }else{
            this.setState({
                sourceId:sourceArray
            }); 
        }
    }

    onhandleAllAuhtority=(data)=>{
        this.setState({
            selectedAuthority:data
        });
        let localAuthorityArray=[];
        if(!_.isEmpty(data)){
        data.map((data, index) => (
            localAuthorityArray.push(parseInt(data.value))
            ));
        this.setState({
            localAuthority:localAuthorityArray
        });
        this.setState({buttonStatus : false})
        }else{
            this.setState({
                localAuthority:localAuthorityArray
            }); 
        }
    }    
    render(){
        const {isOpenFilter, startDate, endDate, agencyId, region, sourceId, campaignId, buttonStatus, maxDate, enquiryType, localAuthority } = this.state;
        const { agencies,marketingSources, campaigns, enquiryTypes, localAuthorityList } = this.props;
    
        return(
            <React.Fragment>
                <button className="btn white filter-btn btn-outline-primary" onClick={() => this.toggleFilterPopUp(true)}>
                    Filter <img src={images["filter-icon.png"]} alt="Filter" />
                </button>
                <OffCanvas isOpen={isOpenFilter} onClose={() => this.toggleFilterPopUp(false)}
                    labelledby="menu-button" position={'right'} height="100%" width={"273px"}
                    style={{ overlay: {background: 'none'}, content: {background: '#fff', top: '72px'} }}
                >
                    <button className="reset-filter-button" onClick={this.resetFilter}><img src={images["reset.svg"]} alt="Reset" />
                    </button>
                    <button className="btn close-filter" onClick={() => this.toggleFilterPopUp(false)}>Close Filter</button>
                    
                    <div className="right-content-wrap">
                        <div className="inputs-group">
                            <div className="input-wrap">
                                <label>Start Date</label>
                                <input type="date" placeholder="Start Date" name="startDate" value={startDate} 
                                        onChange={this.handleChange} 
                                />
                            </div>
                            <small className="form-text text-danger"></small>
                        </div>

                        <div className="inputs-group">
                            <div className="input-wrap">
                                <label>End Date</label>
                                <input type="date" placeholder="End Date" name="endDate" value={endDate} max={maxDate}
                                        onChange={this.handleChange}
                                />
                            </div>
                            <small className="form-text text-danger"></small>
                        </div>

                        <div className="inputs-group">
                            <div >
                                {/* <label>Agency</label> */}
                                { (_.size(agencies) > 0) ? <MultiSelectDropdowm name="agencyId" placeholderText="Select Agency" lableText="All Agency"  options={agencies}  value={this.state.selectedAgencies} onChangeAllAgencyList={this.onhandleAllAgency} /> : null }
                                
                                {/* <select name="agencyId" value={agencyId} onChange={this.handleChange} >
                                    <option value="">Select Agency</option>
                                    {(() => {
                                        if (!_.isEmpty(agencies)) {
                                            return( 
                                                agencies.map((data, index) => (
                                                    <option key={index} value={data.value}>{data.label}</option>
                                                ))
                                            )
                                        }
                                    })()}
                                </select> */}
                            </div>
                            <small className="form-text text-danger"></small>
                        </div>
                        {/* <div className="inputs-group">
                            <div className="input-wrap no-label">
                                <select name="region" value={region} onChange={this.handleChange} >
                                    <option value="">Region</option>
                                    <option value="1">Demo1</option>
                                    <option value="2">Demo2</option>
                                    <option value="3">Demo3</option>
                                </select>
                            </div>
                            <small className="form-text text-danger"></small>
                        </div> */}
                        
                        <div className="inputs-group">
                            <div >
                            { (_.size(marketingSources) > 0) ? <MultiSelectDropdowm placeholderText="Select Source" lableText="All Source"  options={marketingSources}  value={this.state.selectedSource} onChangeAllAgencyList={this.onhandleAllSource} /> : null }
                                {/* <select name="sourceId" value={sourceId} onChange={this.handleChange} >
                                    <option value="">Select Source</option>
                                    {(() => {
                                        if (!_.isEmpty(marketingSources)) {
                                            return( 
                                                marketingSources.map((data, index) => (
                                                    <option key={index} value={data.id}>{data.name}</option>
                                                ))
                                            )
                                        }
                                    })()}
                                </select> */}
                            </div>
                            <small className="form-text text-danger"></small>
                        </div>

                        {/* <div className="inputs-group">
                            <div className="input-wrap no-label">
                                <select name="campaignId" value={campaignId} onChange={this.handleChange} >
                                    <option value="">Select Campaign</option>
                                    {(() => {
                                        if (!_.isEmpty(campaigns)) {
                                            return( 
                                                campaigns.map((data, index) => (
                                                    <option key={index} value={data.id}>{data.campaign_name}</option>
                                                ))
                                            )
                                        }
                                    })()}
                                </select>
                            </div>
                            <small className="form-text text-danger"></small>
                        </div> */}

                        <div className="inputs-group">
                            <div className="input-wrap">
                                <label>Enquiry Type</label>
                                <select name="enquiryType" value={enquiryType} onChange={this.handleChange} >
                                    <option value="">Select Enquiry Type</option>
                                    {(() => {
                                        if (!_.isEmpty(enquiryTypes)) {
                                            return( 
                                                enquiryTypes.map((data, index) => (
                                                    <option key={index} value={data.id}>{data.enquiry_type}</option>
                                                ))
                                            )
                                        }
                                    })()}
                                </select>
                            </div>
                            <small className="form-text text-danger"></small>
                        </div>
                        <div className="inputs-group">
                            <div>
                                <label>Local Authority</label>
                                { (_.size(localAuthorityList) > 0) ? <MultiSelectDropdowm placeholderText="Select Local Authority" lableText="All Local Authority"  options={localAuthorityList}  value={this.state.selectedAuthority} onChangeAllAgencyList={this.onhandleAllAuhtority} /> : null }
                            </div>
                            <small className="form-text text-danger"></small>
                        </div>
                    </div> 
                    <div className="filter-submit-btn-wrap">
                        <button ref={this.focusBtnRef} className="btn btn-primary" onClick={this.submitFilter} disabled={buttonStatus}>Apply Filter</button>
                    </div>
                </OffCanvas>
            </React.Fragment>
        )
    }
}

export default FilterPanel;