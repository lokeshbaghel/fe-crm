import React from "react";
import { Modal } from "react-bootstrap";
import _ from 'lodash';
import Fade from 'react-reveal';
import "./index.css";

class LogoutConfirmPopUp extends React.Component {
  state = {
    showModal: this.props?.canShow,
    callSuccess: true
  };

  /**method to hide/show modal */
  handleModalCloseClick = (data={}) => {
    this.setState({ showModal: false });
    this.props.closeModalLogoutConfirm(data);
  };

  render() {
    const { showModal } = this.state;
    const { heading }=this.props;
    return (
      <Fade>
      <Modal
        className="logout-popup"
        id="myModal"
        show={showModal}
        centered
        backdrop="static"
        size="sm"
      >
        <Modal.Header>   
          
          {/* <button type="button" className="close" onClick={(data) => this.handleModalCloseClick(false)}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
            </button> */}
                        </Modal.Header>
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
                  className={(this.state.callSuccess) ? 'btn btn-outline-primary red active' : 'btn btn-outline-primary green'}
                  onClick={() => this.handleModalCloseClick(true)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={(!this.state.callSuccess) ? 'btn btn-outline-primary red active' : 'btn btn-outline-primary red'}
                  onClick={() => this.handleModalCloseClick(false)}
                >
                  No
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

export default LogoutConfirmPopUp;
