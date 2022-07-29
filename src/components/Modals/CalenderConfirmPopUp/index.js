import React from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';
import callIcon from "../../../assets_crm/img/call-icon.jpg";
import _ from 'lodash';
import "./index.css";

class CalenderConfirmPopUp extends React.Component {
  state = {
    showModal: this.props?.canShow,
    callSuccess: true
  };

  /**method to hide/show modal */
  handleModalCloseClick = () => {
    this.setState({ showModal: false });
    this.props.calenderDeleteCancel(false);
  };

  /**method to submit form data of modal */
  handlePopUp = (event,action) => {
    event.preventDefault();
    this.setState({ showModal: false });
    if(action)
      this.props.calenderDeleteConfirm(false);
    else
      this.props.calenderDeleteCancel(false);
  
    
  };

  render() {
    const { showModal } = this.state;
    return (
      <Fade>
      <Modal
        className="End-Call"
        id="myModal"
        show={showModal}
        centered
        onHide={this.handleModalCloseClick}
        backdrop="static"
        size="sm"
      >
        {/* <Modal.Header closeButton></Modal.Header> */}
        <form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <div className="main-content">
              <div className="call-icon-wrap">
                <img src={callIcon} />
              </div>
              <h1>Do You Want to Delete Scheduled Calender Call ?</h1>
              <div className="btn-wrap-custom text-center">
                
                <button
                  type="button"
                  className={(!this.state.callSuccess) ? 'btn btn-outline-primary red active' : 'btn btn-outline-primary red'}
                  onClick={(e) => this.handlePopUp(e,false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className={(this.state.callSuccess) ? 'btn btn-outline-primary green active' : 'btn btn-outline-primary green'}
                  onClick={(e) => this.handlePopUp(e,true)}
                >
                  Yes
                </button>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
           
          </Modal.Footer>
        </form>
      </Modal>
      </Fade>
    );
  }
}

export default CalenderConfirmPopUp;
