import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import $, { data } from "jquery";
import { Scrollbars } from "react-custom-scrollbars";

import General from "./Tabs/General";
import TheHome from "./Tabs/TheHome";
import Work from "./Tabs/Work";
import Fostering from "./Tabs/Fostering";
import StatuoryChecks from "./Tabs/StatuoryChecks";
import Health from "./Tabs/Health";
import AgencyVisit from "./Tabs/AgencyVisit";
import { images } from "../../../../../utils/helper";

class InitialEnquiryFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHide: this.props?.canShow,
      exitLoop:true
    };
  }

  //Close modal
  handleModal(action) {
    $("#myModal").fadeOut(200, function () {
      $("#myModal").modal("hide");
    });
    this.props.closeModal(action);
    this.setState({ showHide: action });
  }

  

  static getDerivedStateFromProps(props, state) {
    if(props.responceBack===true){
        props.closeModal(false);
        return ({showHide:false})
    }
    return null;
  }

  //Handle outside click of modal
  handleClose = () => false;

  //Handle Scroll to top
  scrollToTop = () => {
    this.refs.scrollbars.scrollToTop();
  };
  saveGeneralForm=(data)=>{
    this.props.saveGeneralIeForm(data)
  }
  finalSubmitIEForm=(data)=>{
    this.props.submitIEForm(data)
  }
  submitPostCode=(data)=>{
    this.props.submitPostCode(data)
  }

  render() {
    const { applicantsInfo,marketingList ,agencyList,RelationshipStatusData,CountryData,CurrentSituationData,responceBack,
            RelationshipData,marketing_tab,blocking,listIEFormData,LocalAuthorityData,personeEnquiryList,ethnicOriginList,personTitleList,FosteringHistoryData,OccupationData
          ,authority_id } = this.props;
            ;
 
    return (
      <React.Fragment>
        <Modal
          id="myModal"
          onHide={this.handleClose}
          className="initial-enquiry-form"
          show={this.state?.showHide}
          centered
        >
          <Modal.Header>
            <h1>Initial Enquiry Form</h1>
            <button
              type="button"
              className="close"
              onClick={() => this.handleModal(false)}
            >
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <Scrollbars ref="scrollbars" style={{ height: "100%" }}>
              <div className="modal-body-inner">
                <ul
                  className="nav top-nav nav-tabs nav-item"
                  id="nav-tab"
                  role="tablist"
                >
                  <li>
                    <a
                      className="nav-item nav-link active"
                      data-toggle="tab"
                      href="#general-content"
                      role="tab"
                      aria-controls="inprogress-content"
                      aria-selected="true"
                    >
                      General
                    </a>
                  </li>

                  <li>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#the-home-content"
                      role="tab"
                      aria-controls="the-home-content"
                      aria-selected="true"
                    >
                      The Home
                    </a>
                  </li>

                  <li>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#work-content"
                      role="tab"
                      aria-controls="work-content"
                      aria-selected="true"
                    >
                      Work
                    </a>
                  </li>

                  <li>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#finances-content"
                      role="tab"
                      aria-controls="finances-content"
                      aria-selected="true"
                    >
                      Type of Fostering
                    </a>
                  </li>

                  <li>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#statuory-check-content"
                      role="tab"
                      aria-controls="statuory-check-content"
                      aria-selected="true"
                    >
                      Statuory Checks
                    </a>
                  </li>

                  <li>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#health-content"
                      role="tab"
                      aria-controls="health-content"
                      aria-selected="true"
                    >
                      Health
                    </a>
                  </li>

                  <li>
                    <a
                      className="nav-item nav-link"
                      data-toggle="tab"
                      href="#summary-content"
                      role="tab"
                      aria-controls="summary-content"
                      aria-selected="true"
                    >
                      Agency visit
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane active show fade"
                    id="general-content"
                    role="tabpanel"
                    aria-labelledby="general-content-tab"
                  >
                    <General CountryData={CountryData} CurrentSituationData ={CurrentSituationData}
                              RelationshipData={RelationshipData} LocalAuthorityData={LocalAuthorityData} 
                              RelationshipStatusData={RelationshipStatusData} agencyList={agencyList} 
                              applicantsInfo={applicantsInfo}  ethnicOriginList={ethnicOriginList}  
                              personTitleList={personTitleList} marketingList={marketingList}
                              FosteringHistoryData={FosteringHistoryData} 
                              personeEnquiryData={personeEnquiryList}
                              listIEFormData={listIEFormData}
                              blocking={blocking}
                              marketing_tab={marketing_tab}  
                              submitIeFormData={(data)=>this.saveGeneralForm(data)}
                              submitPostCode={(data) => this.submitPostCode(data)}
                              authority_id={authority_id}
                              />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="the-home-content"
                    role="tabpanel"
                    aria-labelledby="the-home-content-tab"
                  >
                    <TheHome theHomeData={(data)=>this.saveGeneralForm(data)}
                             listIEFormData={listIEFormData} blocking={blocking}

                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="work-content"
                    role="tabpanel"
                    aria-labelledby="work-content-tab"
                  >
                    <Work workData={(data)=>this.saveGeneralForm(data)}
                           listIEFormData={listIEFormData}  blocking={blocking}
                           OccupationData={OccupationData}  
                           applicantsInfo={applicantsInfo} 
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="finances-content"
                    role="tabpanel"
                    aria-labelledby="finances-content-tab"
                  >
                    <Fostering fosteringData={(data)=>this.saveGeneralForm(data)} 
                               listIEFormData={listIEFormData}  blocking={blocking}
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="statuory-check-content"
                    role="tabpanel"
                    aria-labelledby="statuory-check-content-tab"
                  >
                    <StatuoryChecks statuoryChecksData={(data)=>this.saveGeneralForm(data)}  
                                    listIEFormData={listIEFormData}  blocking={blocking}
                                    applicantsInfo={applicantsInfo}             
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="health-content"
                    role="tabpanel"
                    aria-labelledby="health-content-tab"
                  >
                    <Health healthData={(data)=>this.saveGeneralForm(data)}  
                            listIEFormData={listIEFormData}  blocking={blocking}   />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="summary-content"
                    role="tabpanel"
                    aria-labelledby="summary-content-tab"
                  >
                    <AgencyVisit agencyVisitData={(data)=>this.saveGeneralForm(data)}  
                                 listIEFormData={listIEFormData}
                                 finalSubmitIEForm={(data)=>this.finalSubmitIEForm(data)}
                                 responceBack={responceBack}
                                 blocking={blocking}
                                 />
                  </div>
                </div>
                <div className="back-to-top-btn-wrap">
                  <button
                    className="back-to-top"
                    onClick={() => this.scrollToTop(0)}
                  >
                    <img src={images["back-to-top.png"]} />
                    Back to top
                  </button>
                </div>
              </div>
            </Scrollbars>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default InitialEnquiryFormModal;
