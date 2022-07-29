import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';
import _ from "lodash";

import "./index.css";

class index extends Component {
  state = {
    showHide: this.props?.canShow,
    fields: { oldpassword:"", newpassword:"", confirmpassword:"" }, 
    oldpasswordErr:"", 
    newpasswordErr:"", 
    confirmpasswordErr:"",
    responceError:{}
    };

  /*lifecycle method to update state when data received from redux store */
  static getDerivedStateFromProps(props, state) {
    if (typeof props.responceError != "undefined" && _.isEmpty(state.confirmpasswordErr) && _.isEmpty(state.oldpasswordErr) &&
      _.isEmpty(state.newpasswordErr)) 
      {
        if (_.size(props.responceError) != _.size(state.responceError)) {
          return { responceError: props.responceError };
        }
      }
    return null;
  }
  //Handle to close modal
  closeModal = () => {
     this.props.close(false);
  };

  onHide = () =>{
    return false
   }
  /*submit fields validation*/
  validateFields() {
    let err = false;
    if (!this.state.fields.oldpassword) {
      this.setState({ oldpasswordErr: "Old password is required" });
      err = true;
    } else 
      this.setState({ oldpasswordErr: "" });
    
    if (!this.state.fields.newpassword) {
      this.setState({ newpasswordErr: "New password is required" });
      err = true;
    } else 
      this.setState({ newpasswordErr: "" });
    
    if (!this.state.fields.confirmpassword) {
      this.setState({ confirmpasswordErr: "Confirm password is required" });
      err = true;
    }else if ((this.state.fields.confirmpassword && this.state.fields.newpassword) && this.state.fields.newpassword !== this.state.fields.confirmpassword){
      this.setState({ confirmpasswordErr: "New Password and Confirm Password are not same" });
      err = true;
    }
    else 
      this.setState({ confirmpasswordErr: "" });

    return err;
  }

  /**method to submit field data */
  changePassword = (event) => {
    event.preventDefault();
    let userData = {};
    const isValid = this.validateFields();
    if (!isValid) {
      let { oldpassword, newpassword, confirmpassword } = this.state.fields;
      userData.oldpassword = oldpassword;
      userData.newpassword = newpassword;
      userData.confirmpassword = confirmpassword;
      this.props.sendChangePassword(userData);
    }
  };

  /**method to update input values into state */
  onChange = (event) => {
    let fields = this.state.fields;
    fields[event.target.id] = event.target.value;
    this.setState({ fields });
  };

  render() {
    const { showHide, fields, responceError } = this.state;
    return (
      <>
        <Fade>
        <Modal  id="myModal" className="change-password" show={showHide} centered 
        onHide={this.onHide}>
          <Modal.Header>
            <h3>Change Password</h3>
            <button  type="button" className="close" onClick={() => this.closeModal()}>
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            {responceError?.name ?  
            <div className="alert alert-danger">
               {responceError?.name}
            </div>: ''
            }
            <div className="form-group">
              <label>Old Password</label>
              <input type="password" placeholder="Old Password" id="oldpassword" value={fields["oldpassword"]}
                onChange={this.onChange}
              />
              <small className="text-danger">{this.state.oldpasswordErr}</small>
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input type="password" placeholder="New Password" id="newpassword" value={fields["newpassword"]}
                onChange={this.onChange}
              />
              <small className="text-danger">{this.state.newpasswordErr}</small>
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm Password" id="confirmpassword" value={fields["confirmpassword"]}
                onChange={this.onChange}
              />
              <small className="text-danger">{this.state.confirmpasswordErr}</small>
            </div>
            <div className="change-pass-btn-wrap">
              <button type="submit" className="btn btn-primary" onClick={(e) => this.changePassword(e)} >
                Update
              </button>
              <a className="cancel-btn" data-dismiss="modal" aria-label="Close" onClick={() => this.closeModal()}>
                Cancel
              </a>
            </div>
          </Modal.Body>
        </Modal>
        </Fade>
      </>
    );
  }
}

export default index;
