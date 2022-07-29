import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from "lodash";
import moment from "moment";

import AddProgressItem from "../../../../components/Modals/AddProgressItem";
import { displayRecordNotFound, displayErrorMessage } from "../../../../utils/helper";
import Constant from "../../../../utils/constants";

class ProgressItemsTabData extends Component {
  state = {
    showModal: false,
    search: ''
  };

  toggleModal = (value) => {
    if (typeof value == "boolean") {
      this.setState({ showModal: value });
    } else {
      //If Account is not passed to Charms
      if(this.props.is_post_to_charms == Constant["is_post_to_charms_no"]){
        this.setState({ showModal: false, search: '' });
        this.props.addProgressItemsRequest(value);
      }
    }
  };

  renderStageProgressItems = (stageProgressItems) => {
    if (!_.isEmpty(stageProgressItems)) {
      return stageProgressItems.map((data, index) => {
        return (
          <div className="col-md-12" key={index}>
            {/* <h1>Stage {data.name}</h1> */}
            {/* <div className="inner-content">
                {
                    data.progress_items_array.map((item, index1) => {
                        return (
                            <h2 key={index1}>
                             <span>{item.id}</span> {item.name}
                            </h2>
                        );
                    })
                }
            </div> */}
            <div className="inner-content">
                <div className="row no-gutters">
                  <div className="col-md-7">
                    <h2>
                      <span>{data?.id}</span> {data?.name}
                    </h2>
                  </div>
                
                   <div className="col-md-5 d-flex flex-column align-items-md-end"> 
                   { data?.user_person_name ? <h2>Added By: {data.user_person_name}</h2> : ''} 
                   { data?.created_date ? <h2>{moment(data.created_date).format("DD.MM.YYYY hh:mm A")}</h2> : ''}
                   </div>
                </div>
                <div className="seperator-line"></div>
            </div>
            
          </div>
        );
      });
    } else {
      return ( <div className="col-md-12"> { displayRecordNotFound("No Records Found") }</div> )
    }
  };

  handleChange = (event) => {
    this.setState({search: event.target.value})
  }

  _handleKeyDown = (event) => {
    let code = event.keyCode;
    if(code === 13){

      if(event.target.value.trim() == '') {
        this.resetProgressItems()
        //displayErrorMessage('Please type some keywords to search');
        //event.target.value = '';
        //return false; 
      }

      let fields = {
        account_id: this.props.account_id,
        search: this.state.search
      }

      this.props.progressItemsSearchRequest(fields)

    }
}

  /**
   * Reset Search functionality when user press enter key for blank input of search
   */
  resetProgressItems = (event) => {
    if(this.state.search){
      this.setState({search: ''})

      let fields = {
        account_id: this.props.account_id,
        search: ''
      }

      this.props.progressItemsSearchRequest(fields)
    }
  }

  render() {
    let { showModal, search } = this.state;
    let { progressItems, stageProgressItems, is_post_to_charms,accountName } = this.props;
    return (
      <div
        className="tab-pane fade show"
        id="progress-items"
        role="tabpanel"
        aria-labelledby="progress-items-tab"
      >
        <div className="curve-box-content progress-items">
          <Scrollbars style={{ height: "660px" }}>
            <div id="testDiv6" className="scrollbar">
              <div className="filter-container">
                <div className="row d-flex align-items-center">
                  <div className="col-sm-6">
                   { accountName ? <button
                      className="btn add-progress btn-outline-primary"
                      onClick={() => this.toggleModal(true)}
                      disabled={is_post_to_charms == Constant["is_post_to_charms_yes"]}
                    >
                      Add progress item
                    </button>:''}
                    {showModal ? (
                      <AddProgressItem
                        canShow={showModal}
                        progressItems={progressItems}
                        updateModal={this.toggleModal}
                      />
                    ) : null}
                  </div>
                  <div className="col-sm-6 d-flex d-flex justify-content-sm-end">
                    <div className="search-div">
                      <input
                        type="text"
                        className="form-control search-user2"
                        placeholder="Search"
                        ref='reference'
                        value={search}
                        onChange={this.handleChange}
                        onKeyDown={this._handleKeyDown}
                      />
                      <button type="submit" className="search-btn">
                        search
                      </button>
                    </div>
                    {/* <button
                      className="btn filter-button btn-outline-primary"
                      onClick={this.resetProgressItems}
                    >
                      Reset
                    </button> */}
                  </div>
                </div>
              </div>

              <div className="program-items-content">
                <div className="row">{this.renderStageProgressItems(stageProgressItems)}</div>
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default ProgressItemsTabData;
