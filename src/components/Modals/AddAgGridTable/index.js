import "./index.css";
import React from "react";
import { Modal } from "react-bootstrap";
import _ from 'lodash';
import Fade from 'react-reveal';

//import imageGallery from "../../../assets_crm/img/image-gallery.png";
import validateAgGridTableForm from './validateAgGridTableForm';

class AddLead extends React.Component {
    state = {
        showHide: this.props?.canShow,
        fields : {},
        errors : {}
    };

    handleModal() {
        let instance = this;
        this.props.updateModal(false);
       
    }

    /* validate login form */
    validateForm = () => {
        let fields = this.state.fields;
        let response = validateAgGridTableForm(fields);

        this.setState({errors: response.errors});
        return response.formIsValid;
    }

    /* handle input field changes */
    handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value;
        this.setState({fields});
    }

    /* submit lead form to parent method*/
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            this.props.submitData(this.state.fields);
            this.setState({ fields : {} })
        }
    }

    render() {
        const {errors} = this.state;
        const { canShow } = this.props;
        
        return (
            <>
             <Fade>
                <Modal id="myModal" className="add-table-popup" show={canShow} centered>
                    <Modal.Header>
                        <h1>{this.props?.heading}</h1>
                        <button type="button" className="close" onClick={() => this.handleModal()}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Table Details</p>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group two-inline first">
                                <div className="inputs-group">
                                    <input type="text" placeholder="Table Name" name="table_name" onChange={this.handleChange}   autoComplete="off"/>
                                    <small className="form-text text-danger">{errors.table_name}</small>
                                </div>
                            </div>
                            <div className="btn-wrap">
                                <button type="submit" className="btn btn-primary">
                                    Save Table
                                </button>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <a className="cancel-btn" data-dismiss="modal" aria-label="Close" onClick={() => this.handleModal()}>
                          Cancel
                        </a> */}
                    </Modal.Footer>
                </Modal>
                </Fade>
            </>
        )
    }
}

export default AddLead;