import React, { Component } from 'react';
import _ from 'lodash';

import CommonAgGrid from '../../../components/CommonAgGrid';
import CustomCheckbox from "../../../components/CommonAgGrid/CustomCheckbox";
import { displayErrorMessage } from '../../../utils/helper';

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

class ContactForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedRows    : [],
            fields          : {},
            errors          : {},
            passApiUrlPath : { passPathName: 'engagement/lists/enquirer'}
        }       
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
        if(_.size(this.state.selectedRows) > 0){
            if (this.validateForm()) {
                const data = {
                    list_name   : this.state.fields.list_name,
                    person_ids  : (this.state.selectedRows)
                }

                this.props.submitForm('',data);
            }
        } else {
            displayErrorMessage('No Enquirer Selected')
        }
    }

    /**method to capture click on cancel button */
    handleCancel = () => {
        this.props.cancelListForm(false)
    }

    render(){
        const { fields, errors, passApiUrlPath } = this.state;

        return(
            <div className="engagemet-hub-contact-list">
                <div className="row custom-btn-wrap">
                    <div className="col-lg-12 col-md-12 d-flex justify-content-md-end">	
                        <button className="btn delete-btn btn-outline-primary" onClick={this.handleCancel}>Cancel</button>
                        <button className="btn white btn-outline-primary" onClick={this.handleSubmit}>Create List</button>	
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6">	
                        {/* <div className="custom-sort-tabs create-list">
                            <ul className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <li>
                                    <a className="nav-item nav-link active" id="all-content-tab" data-toggle="tab" 
                                        href="#all-content" role="tab" aria-controls="all-content" aria-selected="true"
                                    >
                                        <span>22552</span>
                                    All</a>
                                </li>
                                <li>
                                    <a className="nav-item nav-link" id="all-content-tab" data-toggle="tab" 
                                        href="#all-content" role="tab" aria-controls="all-content" aria-selected="true"
                                        // style={{"borderColor":"#dee2e6 #dee2e6 #fff"}}
                                    >
                                        <span>22552</span>
                                    Added Contacts</a>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    <div className="col-lg-6 d-flex justify-content-end">	
                        <div className="input-wrap">
                            <div className="form-group">
                                <label>List name</label>
                                <input type="text" placeholder="" name="list_name" value={fields.list_name || ''} 
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
                    /> 
                </div>
            </div>
        )
    }
}

export default ContactForm;