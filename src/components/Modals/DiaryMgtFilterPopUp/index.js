import React from "react";
import { Modal } from "react-bootstrap";
import _ from "lodash";
import Fade from 'react-reveal';

import MultiSelectDropdowm from "../../../components/MultiSelectDropdowm";
import "./index.css";

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: this.props?.canShow,
      activity_attempt:'',
      activity_agency:[],
      selected :[],
      optionAgency:this.props.listOptionData
    };
  }
  
  handleChange = (event) => {
    this.setState({ activity_attempt: event.target.value });
  };

  handleSubmit = () => {
    let fields = {
      activity_attempt: parseInt(this.state.activity_attempt),
      activity_agency:this.state.activity_agency
    };
    this.handleModal(false);
    this.props.filterAttempts(fields);
  };

  handleModal(action) {
    this.props.filterAttempts(false);
  }

  handleClose = () => false;
  
  onhandleAllAgency=(data)=>{
    this.setState({
      selected:data
    });
    let agencyArray=[];
    if(!_.isEmpty(data)){
      data.map((data, index) => (
            agencyArray.push(parseInt(data.value))
        ));
       this.setState({
           activity_agency:agencyArray
      });
    }
  }
  render() {
    return (
      <>
       <Fade>
        <Modal
         onHide={this.handleClose}
          id="myModal"
          className="close-account custom-close filter-div"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            <h1>Filters</h1>
            <button type="button" className="close" onClick={(data) => this.handleModal(false)}>
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Close</span>
                        </button>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
                <div className="col-md-12 row">
                    <div className="form-group col-md-6">
                     <MultiSelectDropdowm placeholderText="Select Agency" lableText="All Agency"  options={this.state.optionAgency}  value={this.state.selected} onChangeAllAgencyList={this.onhandleAllAgency} />
                  </div>
                    <div className="form-group col-md-6">
                        <div className="input-wrap customAttemptClass">
                            <label>All Attempts</label>
                            <select 
                            name="attempt_requestor"
                            value={this.state.activity_attempt}
                            onChange={this.handleChange}
                            >
                            <option value="">Show All</option> 
                            <option value="1">Attempt 1</option>
                            <option value="2">Attempt 2</option>
                            <option value="3">Attempt 3</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
          <Modal.Footer>
            <div className="btn-wrap">
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Set Filter
              </button>
            </div>

            <div className="btn-wrap">
              {/* <a
                className="cancel-btn"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.handleModal(false)}
              >
                Cancel
              </a> */}
            </div>
          </Modal.Footer>
        </Modal>
        </Fade>
      </>
    );
  }
}

export default index;
