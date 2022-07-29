import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import Fade from 'react-reveal';

import './index.css';

class index extends Component {

    state = {
        showHide: this.props?.canShow,
    };

  handleModal(){
    this.props.updateModal(false);
  }


  render() {
    return (
      <>
      <Fade>
        <Modal
          id="myModal"
          className="filter-pop-up"
          show={this.state?.showHide}
          centered
          size="sm"
        >
          <Modal.Header>
            <h1>Filter</h1>
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
              <div class="form-group">
                <label>Markeing Source</label>
                    <select name="cars" id="cars">
                        <option value="Facebook">Facebook</option>
                        <option value="Google">Google</option>
                        <option value="Twitter">Twitter</option>
                        <option value="WhatsApp">WhatsApp</option>
                    </select>
                </div>
              </div>
              <div className="col-md-6">
              <div class="form-group">
                <label>Agency</label>
                    <select name="cars" id="cars">
                        <option value="NFAM">NFAM</option>
                        <option value="NFAM">NFAM</option>
                        <option value="NFAM">NFAM</option>
                        <option value="NFAM">NFAM</option>
                    </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
              <div class="form-group">
                <label>Campaign</label>
                    <select name="cars" id="cars">
                        <option value="volvo">CAM-104</option>
                        <option value="saab">CAM-105</option>
                        <option value="mercedes">CAM-106</option>
                        <option value="audi">CAM-107</option>
                    </select>
                </div>
              </div>
              <div className="col-md-6">
              <div class="form-group">
                <label>Sub Campaign</label>
                    <select name="cars" id="cars">
                        <option value="volvo">CAM-104</option>
                        <option value="saab">CAM-104</option>
                        <option value="mercedes">CAM-104</option>
                        <option value="audi">CAM-104</option>
                    </select>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
                <button type="submit" className="btn btn-primary">
                  Set Filter
                </button>
          </Modal.Footer>
        </Modal>
        </Fade>
      </>
    );
  }
}

export default index;
