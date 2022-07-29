import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import _ from 'lodash';

import validateAccountForm from './AccountValidation';

class AccountModal extends Component{
    state = {
        fields  : this.props.accountInfo,
        errors : {}
    }

    /** */
    handleModal = () => {
        this.props.updateModal(false);
    }

    /* handle input field changes */
    handleChange = (event) => {
        //this.setState({agency_id : event.target.value});
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }

    /* validate form */
    validateForm = () => {
        let fields = this.state.fields;
        let response = validateAccountForm(fields);

        this.setState({errors: response.errors});
        return response.formIsValid;
    }

    /* submit data to parent method*/
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const {agency_id, spare_rooms, current_situation_id} = event.target;
            const data = {
                agency_id               : agency_id.value,
                spare_rooms             : spare_rooms.value,
                current_situation_id    : current_situation_id.value,
                account_id              : this.props.account_id
            }

            this.props.submitData(data)
        }
    }

    render(){
        const { showModal, agencyList, CurrentSituationData } = this.props;
        const {fields, errors} = this.state;
        return(
            <Modal className="applicant-info account-profile-page" show={showModal} centered>
                    <Modal.Header>
                        <h1>Account Information</h1>
                        <button type="button" className="close" onClick={() => this.handleModal()}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-details-content">
                            <form onSubmit={this.handleSubmit} >
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <label>Agency</label>
                                            <select name="agency_id" value={fields.agency_id} onChange={this.handleChange}>
                                            <option value="">Select Agency</option>
                                                {(() => {
                                                    if (!_.isEmpty(agencyList)) {
                                                        return( 
                                                            agencyList.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.agency_name}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                        </div>
                                        <small className="form-text text-danger">{errors.agency_id}</small>
                                    </div>
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <label>Spare Rooms</label>
                                            <select name="spare_rooms" value={fields.spare_rooms} onChange={this.handleChange}>
                                                <option value="">Select</option>
                                                <option value={1}>Yes</option>
                                                <option value={2}>No</option>
                                            </select>
                                            {/* <input type="text" name="spare_rooms" value={fields.spare_rooms} 
                                                    onChange={this.handleChange} 
                                            /> */}
                                            
                                        </div>
                                        <small className="form-text text-danger">{errors.spare_rooms}</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-2">
                                        <div className="form-group">
                                            <label>Current Situation</label>
                                            <select name="current_situation_id" value={fields.current_situation_id} onChange={this.handleChange}>
                                                <option value="">Select Current Situation</option>
                                                {(() => {
                                                    if (!_.isEmpty(CurrentSituationData)) {
                                                        return( 
                                                            CurrentSituationData.map((data, index) => (
                                                                <option key={index} value={data.id}>{data.value}</option>
                                                            ))
                                                        )
                                                    }
                                                })()}
                                            </select>
                                        </div>
                                        <small className="form-text text-danger">{errors.current_situation_id}</small>
                                    </div>
                                </div>
                                <div className="btn-wrap">
                                    <button type="submit" className="btn btn-primary text-center">Update</button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <a className="cancel-btn" data-dismiss="modal" aria-label="Close" onClick={() => this.handleModal()}>
                          Cancel
                        </a> */}
                    </Modal.Footer>
                </Modal>
        )
    }
}

export default AccountModal;