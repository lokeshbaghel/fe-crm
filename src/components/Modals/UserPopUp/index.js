import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';

import "./index.css";
import _ from 'lodash';
import MultiSelectDropdowm from "../../../components/MultiSelectDropdowm";
class index extends Component {
    state = {
        showHide  : this.props?.canShow,
        fields    : this.props.user,
        errors    : {},
        permissionsOptionList:this.props?.permissions,
        selected :this.props?.user?.allPermission
    };

    /*lifecycle method to update state when data received from redux store */
    static getDerivedStateFromProps(props, state) {
        if(typeof props.user != "undefined") {
            if (_.size(props.user) != _.size(state.fields)) {
                return {
                    fields          : props.user,
                };
            }
        }
        return null;
    }

    /**method to hide/show modal */
    handleModal() {
          this.props.updateModal(false);
    }

    handleClose = () =>  false;

    /**method to update input values into state */
    onChange = event => {
        let fields = this.state.fields;
        fields[event.target.id] = event.target.value;
        this.setState({fields});
    }

    /**method to validate form */
    updateValidate = () => {
        let {fields} = this.state;
        let errors = {};
        let formIsValid = true;

        if (!fields["role_id"] || fields["role_id"] == '') {
          formIsValid = false;
          errors["role_id"] = "Role is required!";
        }
       // if (selected.length==0) {
       //   formIsValid = false;
       //   errors["permission_id"] = "Permissions are required!";
      //  }

        this.setState({errors: errors});
        return formIsValid;
    }

    /**method to submit form */
    updateUserHandler = (event) => {
        event.preventDefault();
        if (this.updateValidate()) {
            let {fields,selected}=this.state;
            let submitData={}
            submitData.fields=fields;
            submitData.permission=selected;
            this.props.submitUserForm(this.props.user.person_id, submitData);
        }
      
    }
    onhandleAllPermission=(data)=>{
        this.setState({selected:data})
    }

    render() {
        const {errors, fields,permissionsOptionList,selected} = this.state;
        const {roles} = this.props;

        return (
            <>
             <Fade>
                <Modal id="myModal" onHide={this.handleClose} className="user-pop-up" show={this.state?.showHide} centered>
                    <Modal.Header>
                        <h1>{this.props?.heading}</h1>
                        <button
              type="button"
              className="close"
              onClick={() => this.handleModal()}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={this.updateUserHandler} autoComplete="off">
                          <div className="form-group two-inline">
                                <div className="inputs-group">
                                <span>Users Roles</span>
                                <div className="input-wrap">
                                   
                                    <select className="select-down-second" id="role_id" value={fields.role_id ? fields.role_id : ''} onChange={this.onChange}>
                                      <option value="">Select Role</option>
                                      {(() => {
                                          if (!_.isEmpty(roles)) {
                                              return( 
                                                  roles.map((data, index) => (
                                                      <option key={index} value={data.id}>{data.role}</option>
                                                  ))
                                              )
                                          }
                                      })()}
                                    </select>
                                    </div>
                                    <small className="form-text text-danger">{errors.role_id}</small>
                                </div>
                                <div className="inputs-group multi-add">
                                    <span>User Permissions</span>
                                    <div>
                                        <MultiSelectDropdowm placeholderText="Select Permission" lableText="All Permission"  options={permissionsOptionList}  value={selected} onChangeAllAgencyList={this.onhandleAllPermission} />
                                    </div>
                                    <small className="form-text text-danger">{errors.permission_id}</small>
                                </div>
                            </div>
                            <span className="des-notes text-danger">Any additional changes required will need to be completed within CHARMS</span>
                         
                            <div className="btn-wrap">
                                <button type="submit" className="btn btn-primary">
                                  Update
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
        );
    }
}

export default index;
