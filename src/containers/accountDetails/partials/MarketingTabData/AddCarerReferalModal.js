import React, { Component } from "react";
import "./index.css";
import { Modal } from "react-bootstrap";
import _ from 'lodash';

class AddCarerReferalModal extends Component{
    state = {
        carer_details : '',
        errors        : ''
    }

    /** */
    handleModal = () => {
        this.props.updateModal(false);
    }

    /* handle input field changes */
    handleChange = (event) => {
        let carer_details = event.target.value;
        this.setState({carer_details});
    }


    /* submit data to parent method*/
    handleSubmit = (event) => {
        event.preventDefault();
        let errors={}
        let carer_details=this.state.carer_details
        if(carer_details.length>=1){
            this.props.submitData(carer_details)
        }else{
            errors.carer_details='Carer details field is mandatory'
            this.setState({errors})
        }
    }

    render(){
        const { showModal } = this.props;
        let { carer_details , errors }=this.state;
        return(
            <Modal className="applicant-info referral-modal" show={showModal} centered>
                    <Modal.Header>
                        <h1>Add Carer Referral</h1>
                        <button type="button" className="close" onClick={() => this.handleModal()}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-details-content">
                            <form onSubmit={this.handleSubmit} >
                                <div className="row">
                                    <div className="col-12 mb-2">
                                        <div className="form-group">
                                            <label>Carer Details</label>
                                            <textarea name="carer_details" value={carer_details ? carer_details :''} onChange={this.handleChange}></textarea>
                
                                        </div>
                                        { errors.carer_details ? <small className="form-text text-danger">{errors.carer_details}</small> : ''} 
                                    </div>
                                </div>
                                <div className="btn-wrap">
                                    <button type="submit" className="btn btn-primary text-center">Save</button>
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

export default AddCarerReferalModal;