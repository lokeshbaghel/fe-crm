import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import Constant from '../../../utils/constants';
import _ from "lodash";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: this.props?.canShow,
    };
  }

  //Close modal
  handleModal(action) {
  
    this.setState({showHide: false});
    
  }

  //Handle outside click of modal
  handleClose = () => false;

  handleSubmit = (action) => {
    this.handleModal(false);
    this.props.handleModal(action);
  };

  render() {
    
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="active-account"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            {/* <h1>Active Account</h1> */}
            <button type="button" className="close" onClick={(data) => this.handleModal(false)}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
          </Modal.Header>
          <Modal.Body>
            <p>{this.props?.message}</p>
            <div className="btn-wrap">
            <button
                className="btn custom-green"
                onClick={() => this.handleSubmit(true)}
              >
                 Yes
              </button>
              <button
                className="btn btn-primary custom-red"
                onClick={() => this.handleSubmit(false)}
              >
                 Cancel
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default index;
