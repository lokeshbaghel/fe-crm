import React from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';
import SideCalender from "../../Calender/SideCalender";

import "./index.css";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: this.props?.canShow,
      call_details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc lacinia arcu elit, nec dignissim mi facilisis sit amet. In id erat vitae felis faucibus tempor. Sed sit amet scelerisque dui, ac lacinia sem.'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleModal() {
    this.props.updateModal(false);
    this.setState({showHide: false});
  }

  handleChange(event) {
    this.setState({call_details: event.target.value});
  }

  render() {
    return (
      <>
      <Fade>
        <Modal id="myModal" show={this.state?.showHide} centered>
          <Modal.Header>
            <h1>{this.props?.title}</h1>
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
            <div className="row">
              <div className="col-md-6">
                <span className="heading">Target</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row info">
                  <div className="col-md-7">
                    <ul>
                      <li>
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                        <span>Jennifer Robinson</span>
                      </li>
                      <li>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        <span>+447872 49024</span>
                      </li>
                      <li>
                        <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        <span>jrobinson@hotmail.com</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-5">
                    <ul>
                      <li>
                        <i className="fa fa-home" aria-hidden="true"></i>
                        <span>
                          44 Nixons Lane South Port <br /> PR9 7TH <br /> 2
                          Rooms
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <span className="heading">Call Details</span>
                  </div>
                  <div className="col-md-12">
                    <div className="call-details-box">
                      <small>Purpose of call</small>
                      <textarea value={this.state.call_details} onChange={this.handleChange} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
              <SideCalender />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <div className="btn-wrap">
              <button className="btn btn-primary">Schedule this call</button>
            </div>

            {/* <div className="btn-wrap ml-2">
              <a
                className="cancel-btn"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.handleModal()}
              >
                Cancel
              </a>
            </div> */}
          </Modal.Footer>
        </Modal>
        </Fade>
      </>
    );
  }
}

export default index;
