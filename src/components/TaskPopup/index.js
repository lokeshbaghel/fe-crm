import React from "react";
import { Modal } from "react-bootstrap";
import $ from "jquery";
import "./index.css";

class TaskPopup extends React.Component {
  state = {
    showHide: this.props?.canShow,
    fields: [],
  };
 
   handleAdd() {
    const values = [...this.state.fields];
    values.push({ value: null });
    this.setState({fields:values});
  }
  handleModal() {
    let instance = this;
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
      instance.props.updateModal(false);
    });
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          className="add-lead"
          show={this.state?.showHide}
          centered
        >
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
            <p>Target</p>
            <div className="row">
            <div className="col-md-12">
             <div className="col-md-6 float-left">
                <ul><li>
                Jennifer Robinson
                </li>
                <li>+ 7775665676546</li>
                <li>jrobinson@hotmail.com</li>
                </ul>
              </div>
              <div className="col-md-6 float-left">44 Nixon Lane</div>
            
            </div>
         
            </div>
            <p>Task</p>
            <div className="row">
            <div className="col-md-12">
                {this.state.fields.map((field, idx) => {
            return (
             <div key={`${field}-${idx}`}>
                  <input type="text" placeholder="Reminder to chase up email from last week" />
             </div>
              );
            })}
            </div>
            <button type="button" onClick={() => this.handleAdd()}>
            Add Task
      </button>
      
           </div>
         </Modal.Body>
          <Modal.Footer>
          <a
              className="submit-btn"
              data-dismiss="modal"
              aria-label="Close"
            >
              Submit Task
            </a>
            {/* <a
              className="cancel-btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => this.handleModal()}
            >
              Cancel
            </a> */}
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default TaskPopup;
