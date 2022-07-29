import React, { Component } from 'react';
import { connect } from "react-redux";
import _ from 'lodash';

import BlockUI from "../../../components/BlockUI";
import Banner from "../../../components/Banner";
import BannerImage from "../../../assets_crm/img/login-bg.jpg";
import CommonAgGrid from '../../../components/CommonAgGrid';
import CustomCheckbox from "../../../components/CommonAgGrid/CustomCheckbox";
import { displayErrorMessage, history } from '../../../utils/helper';
import {getContactListsEditFormData, submitContactListsFormData} from "../../../actions/EngagementHub";

const enquirerLabelsRecords=[
    { checkboxSelection: true, headerComponentFramework: CustomCheckbox, minWidth: 30, maxWidth: 30 },
    { headerName: 'Enquirer Name', field: 'enquirer_name', sortable : true, filter : true },
    { headerName: 'Stage', field: 'stage', sortable : true, filter : true },
    { headerName: 'Source', field: 'marketing_source', sortable : true, filter : true},
    { headerName: 'Last Contacted', field: 'last_contacted', sortable : true, filter : true},
    { headerName: 'Nurturing Journey', field: 'nurturing_journey', sortable : true, filter : true},
    { headerName: 'Agency', field: 'agency', sortable : true, filter : true },
    { headerName: 'Date Enquired', field: 'date_enquired', sortable : true, filter : true },
    { headerName: 'Call Attempts', field: 'call_attempts', sortable : true, filter : true },
];

class ContactEditForm extends Component{
    state = {
        selectedRows    : [],
        fields          : {},
        errors          : {},
        passApiUrlPath : { passPathName: `engagement/lists/enquirer`}
    }

    /*lifecycle method to fetch data when page loads */
    componentDidMount(){
        this.props.getContactListsEditFormData(this.props.match.params.id)
    }

    /*lifecycle method to update state when data received from redux store */
    static getDerivedStateFromProps(props, state) {
        if(typeof props.engagement.editContactListRecord != 'undefined')
            if(props.engagement.editContactListRecord !== state.fields) {
                return { 
                    fields: props.engagement.editContactListRecord
                }
            }

        return null;
    }

    /**method to set the selected rows */
    handleSelectedRows = (data) => {
        this.setState({selectedRows : data});
    }

    /**method to update input values into state */
    handleChange = event => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }

    /**method to validate form */
    validateForm = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        if (!fields["list_name"] || fields["list_name"] == '') {
            formIsValid = false;
            errors["list_name"] = "Name is required";
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    /**method to submit form */
    handleSubmit = (event) => {
        event.preventDefault();
        //if(_.size(this.state.selectedRows) > 0){
            if (this.validateForm()) {
                const data = {
                    list_name   : this.state.fields.list_name,
                    person_ids  : this.state.selectedRows,
                    user_id     : this.props?.loggedUser?.user?.user_id
                }

                this.props.submitContactListsFormData(this.props.match.params.id,data);
            }
        // } else {
        //     displayErrorMessage('No Enquirer Selected')
        // }
    }

    /**method to capture click on cancel button */
    handleCancel = () => {
        history.push('/engagement', { from: 'editList' })
    }

    render(){
        const { blocking } = this.props.engagement;
        const { fields, errors, passApiUrlPath } = this.state;
        
        return(
            <>
                <Banner img={BannerImage} />
                <BlockUI blocking={blocking}></BlockUI>
                <div className="page-content-wrapper engagemet-hub" data-aos="fade-up">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h1 className="dash-title">Engagement Hub</h1>
                            </div>
                        </div>

                        <div className="tab-content" id="nav-tabContent">
                            <div className="engagemet-hub-contact-list">
                                <div className="row custom-btn-wrap">
                                    <div className="col-lg-12 col-md-12 d-flex justify-content-md-end">	
                                        <button className="btn delete-btn btn-outline-primary" onClick={this.handleCancel}>Cancel</button>
                                        <button className="btn white btn-outline-primary" onClick={this.handleSubmit}>Update List</button>	
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6 d-flex justify-content-end">	
                                        <div className="input-wrap">
                                            <div className="form-group">
                                                <label>List name</label>
                                                <input type="text" name="list_name" value={fields.list_name || ''} 
                                                        onChange={this.handleChange}
                                                />
                                            </div>
                                            <small className="form-text text-danger">{errors.list_name}</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row filter-select-wrap">
                                    <div className="col-lg-5 col-md-6 d-flex align-items-center select-btn-wrap"></div>
                                    <div className="col-lg-7 col-md-6 d-flex justify-content-end align-items-end"></div>
                                </div>

                                <div className="curve-box">
                                    <CommonAgGrid 
                                        filterLabelsRecords={ enquirerLabelsRecords } //list of table headers
                                        paramsAgGridRecords={ passApiUrlPath }
                                        paginationPageSize={500} //no of records in single page
                                        selectedRows={(data) => this.handleSelectedRows(data)} //method to hold the selected rows data
                                        showCheckbox={true} //setting variable to show button on top of table
                                        listId={this.props.match.params.id}
                                    /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            
        )
    }
}

const mapsStateToProps = (state) => {
    return {
        loggedUser: state.authenticatedUser,
        engagement: state.engagementHub,
    }
}

export default connect(
                  mapsStateToProps, 
                  { getContactListsEditFormData, submitContactListsFormData }
              )(ContactEditForm);