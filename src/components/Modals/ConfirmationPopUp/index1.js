import "./index.css";
import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import _ from 'lodash';

class ConfirmationPopUp extends React.Component {
  state = {
    showModal: this.props?.canShow,
    callSuccess: true
  };

  /**method to hide/show modal */
  handleModalCloseClick = (data={}) => {
    let instance = this;
    this.setState({ showModal: false });
    $("#myModal").fadeOut(200, function () {
         instance.props.closeModalLogoutConfirm(data);
    });
  };

  render() {
    const { showModal } = this.state;
    const { heading }=this.props;
    return (
      <Modal
        className="End-Call"
        id="myModal"
        show={showModal}
        centered
        onHide={this.handleModalCloseClick}
        backdrop="static"
        size="sm"
      >
        <Modal.Header></Modal.Header>
        <form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <div className="main-content">
              <div className="call-icon-wrap">
                <span className="power-icon fa fa-power-off" />
              </div>
              <h1>{heading}</h1>
              <div className="btn-wrap-custom text-center">
                
                <button
                  type="button"
                  className={(!this.state.callSuccess) ? 'btn btn-outline-primary red active' : 'btn btn-outline-primary red'}
                  onClick={() => this.handleModalCloseClick(false)}
                >
                  No
                </button>
                <button
                  type="button"
                  className={(this.state.callSuccess) ? 'btn btn-outline-primary red active' : 'btn btn-outline-primary green'}
                  onClick={() => this.handleModalCloseClick(true)}
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
    );
  }
}

export default ConfirmationPopUp;
