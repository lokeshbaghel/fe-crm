import "./index.css";
import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import { images } from "../../utils/helper";
import CallModal from "../../components/Modals/CallModal";
import {
  resetAccountDetailData,
  getFormSaveData,
  IEFormSumitData,
  updateCarerReferralMarketingTab,
  getAccountDetails,
  getAccountDetailLinkData,
  updateCall,
  getMarketingTabData,
  getActivitiesTabData,
  updateMarketingEmailConsent,
  addProgressItem,
  getStageProgressItemsForAccount,
  updatePersonInfo,
  updateStartTimeandStatus,
  updateAccountDetailInfo,
  updateAccountStatus,
  submitAddLinkData,
  submitDeleteLinkData,
  updateAccountDocument,
  getDocumentTabData,
  deleteEnquiryDocument,
  insertActivityEmail,
  insertScheduleActivityCall,
  insertActivityCall,
  getAccountDetailSearch,
  insertActivityTask,
  getPostCodeAuthority,
  updateRecordCallData
} from "../../actions/AccountDetail";
import Constants from "../../utils/constants";
import BlockUI from "../../components/BlockUI";
import MarketingTabData from "./partials/MarketingTabData";
import ProgressItemsTabData from "./partials/ProgressItemsTabData";
import ApplicantsInfo from "./partials/ApplicantsInfo";
import ActivitiesTabData from "./partials/ActivitiesTabData";
import DetailsTabData from "./partials/DetailsTabData";
import NotesTabData from "./partials/NotesTabData";
import DocumentsTabData from "./partials/DocumentsTabData";
import { event } from "jquery";

class AccountDetails extends React.Component {
  state = {
    endCallModal: false,
    account_id: this.props.match.params.id,
    loggedInUser: this.props?.loggedUser?.user?.user_id,
    checkCall: true,
  };

  getActivity = async () => {
    await this.props.getAccountDetails(this.state.account_id);
  };

  getAccountDetailsSearch = async (searchTitle) => {
    if (searchTitle.length >= 3) {
      await this.props.getAccountDetailSearch(
        searchTitle,
        this.state.account_id
      );
    } else {
      await this.props.getAccountDetailLinkData(this.state.account_id);
    }
  };

  componentDidMount() {
    if (this.state.account_id) {
      this.getActivity();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.match.params.id !== state.account_id && state.checkCall) {
      props.getAccountDetails(props.match.params.id);
      props.getAccountDetailLinkData(props.match.params.id);
      return { account_id: props.match.params.id, checkCall: true };
    }
    return null;
  }

  componentWillUnmount() {
    this.props.resetAccountDetailData();
  }

  toggleEndCallModal = (value) => {
    if (typeof value == "boolean") {
      this.setState({ endCallModal: value });
    } else {
      value.activity_id = parseInt(this.props?.getActivity?.activity_id);
      value.user_id = parseInt(this.state.loggedInUser);
      this.props.updateCall(value);
      this.setState({ endCallModal: false });
    }
  };

  /**method is called when marketing tab is clicked */
  handleTabChange = (tabName) => {
    if (tabName == "marketing")
      this.props.getMarketingTabData(this.props.match.params.id);

    if (tabName == "activities")
      this.props.getActivitiesTabData(this.props.match.params.id);

    if (tabName == "progess-items") {
      const requestParams = {
        account_id: this.props.match.params.id,
        search: "",
      };
      this.props.getStageProgressItemsForAccount(requestParams);
    }

    if (tabName == "document")
      this.props.getDocumentTabData(this.props.match.params.id);
  };

  /**method is called when marketing tab filter is applied */
  handleMarketingData = (params) => {
    this.props.getMarketingTabData(this.props.match.params.id, params);
  };

  /**method is called when marketing tab filter is applied */
  handleMarketingEmailConsent = (params) => {
    this.props.updateMarketingEmailConsent(params);
    this.setState({marketing_tab_id : params.marketing_consent_id})
  };

  addProgressItem = (value) => {
    value.account_id = parseInt(this.state.account_id);
    value.user_id = parseInt(this.state.loggedInUser);
    this.props.addProgressItem(value);
  };

  searchProgressItems = (value) => {
    this.props.getStageProgressItemsForAccount(value);
  };

  /**method to submit applicant detail info or add secondary applicant */
  submitApplicantData = (id, data) => {
    this.props.updatePersonInfo(this.props.match.params.id, id, data);
  };

  handleStartCall = () => {
    const params = {
      activity_id: this.props.getActivity.activity_id,
      account_id: this.props.match.params.id,
      user_id: this.state.loggedInUser,
    };
    this.props.updateStartTimeandStatus(params);
  };

  /**method to submit account agency info */
  submitAccountDetailInfoData = (data) => {
    this.props.updateAccountDetailInfo(this.props.match.params.id, data);
  };

  updateAccount = (data) => {
    this.props.updateAccountStatus(data);
  };

  /**method to submit document info */
  submitDocumentData = (data) => {
    this.props.updateAccountDocument(this.props.match.params.id, data);
  };

  /**method to submit document info */
  searchDocumentData = (data) => {
    this.props.getDocumentTabData(this.props.match.params.id, data);
  };

  // method to delete documents
  deleteDocumentData = (document_id) => {
    const params = {
      account_id: this.props.match.params.id,
      document_id: document_id,
    };
    this.props.deleteEnquiryDocument(params);
  };

  submitScheduleActivity = (data) => {
    data.account_id = this.props.match.params.id;
    data.user_id = parseInt(this.state.loggedInUser);

    this.props.insertScheduleActivityCall(this.props.match.params.id, data);
  };

  submitActivity = (data) => {
    data.account_id = this.props.match.params.id;
    data.user_id = parseInt(this.state.loggedInUser);
    if (data.activity_type === 1) {
      this.props.insertActivityCall(this.props.match.params.id, data);
    } else {
      this.props.insertActivityEmail(data);
    }
  };

  submittaskActivity = (data) => {
    data.account_id = this.props.match.params.id;
    data.user_id = parseInt(this.state.loggedInUser);
    data.activity_type = 4;
    //console.log(data);
    this.props.insertActivityTask(data);
  };
  saveGeneralIeForm = (data) => {
    let outputResponce = {};
    outputResponce.payload = data;
    outputResponce.account_id = this.props.match.params.id;
    this.props.getFormSaveData(outputResponce);
  };
  submitIEForm = (data) => {
    let outputResponce = {};
    outputResponce.payload = data;
    outputResponce.account_id = this.props.match.params.id;
    outputResponce.user_id = parseInt(this.state.loggedInUser);
    //console.log("Responce Output",outputResponce)
    this.props.IEFormSumitData(outputResponce);
  };
  handleAddLinkSubmit = async (postData) => {
    const data = {
      account_id: this.props.match.params.id,
      account_Id2: postData.account_Id2,
      searchTitle: postData.searchTitle,
    };
    await this.props.submitAddLinkData(data);
  };
  handleDeleteLinkSubmit = async (postData) => {
    const data = {
      account_id: this.props.match.params.id,
      account_Id2: postData,
    };
    await this.props.submitDeleteLinkData(data);
  };
  addCarerRef= (param) => {
    const data = {
      account_id: this.props.match.params.id,
      carer_referral_details:param
    };
     this.props.updateCarerReferralMarketingTab(data); 
  }

  submitPostCode = (postData) => {
    const data = { };
    data.post_code = postData;
    this.props.getPostCodeAuthority(data);
  };

  // update schedule call data
  recordCallData = (activity_id)=>{
    if(activity_id){
      const params = {
        account_id: this.props.match.params.id,
        activity_id : activity_id
      }
      this.props.updateRecordCallData(params)
    }
  }
  render() {
    let {
      blocking,
      user_id,
      status_id,
      unsuccessful_reason,
      applicantsInfo,
      applicantsCount,
      accountName,
      accountMarketingData,
      progressItems,
      accountData,
      stageProgressItems,
      accountHistory,
      activityHistory,
      CampaigRecordsData,
      accountAgencyName,
      agencyList,
      close_requestors,
      close_reasons,
      account_status,
      account_closeReason,
      is_post_to_charms,
      hold_reasons,
      accountDocumentData,
      callTypes,
      genderTypeList,
      religionList,
      ethnicOriginList,
      nationalityList,
      marketingSourceList,
      CountryData,
      CurrentSituationData,
      RelationshipData,
      LocalAuthorityData,
      sexualOrientationList,
      personTitleList,
      personeEnquiryData,
      PreferredContactTimeData,
      listIEFormData,
      FosteringHistoryData,
      FosteringPreferenceData,
      RelationshipStatusData,
      LanguageData,
      responceBack,
      OccupationData,
      CallTypeData,
      personInfo,
      personInfosearch,
      marketing_tab,
      post_hold_to_charms,
      authority_id
    } = this.props.getActivity;
    let { endCallModal, loggedInUser, account_id } = this.state;
    return (
      <React.Fragment>
        <Banner img={BannerImage} />
        <BlockUI blocking={blocking} />
        <div
          className="page-content-wrapper account-profile-page sub-page"
          data-aos="fade-up"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-3">
                {/* <NavLink
                  variant="secondary"
                  className="back-link"
                  to="/accounts"
                  id="accounts"
                >
                  <img src={images["back-icon.png"]} alt="Back to Accounts" />
                  Back to Accounts
                </NavLink> */}
              </div>
              <div className="col-md-9 d-flex justify-content-md-end">
                <div className="progressbar"></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="dash-title">{accountName}</h1>
                {is_post_to_charms == Constants["is_post_to_charms_yes"] ? (
                  <h3 className="passed-over-charms-title">
                    The account has been passed over to CHARMS
                  </h3>
                ) : null}
                {is_post_to_charms == Constants["is_post_to_charms_yes"] ? (
                  <h3 className="passed-over-charms-title">
                    Please make any amendments to this record in CHARMS
                  </h3>
                ) : null}
                {account_status == Constants['AccountCloseStatus'] ? 
                  <h3 className="passed-over-charms-title">
                    Please be aware, this account is currently closed for the following reason: {account_closeReason}
                  </h3>
                  : null}
                  {account_status == Constants['AccountHoldStatus'] ? 
                  <h3 className="passed-over-charms-title">
                    Please be aware, this account is on-hold
                  </h3>
                  : null}
                {user_id == null &&
                status_id == Constants["ActivityStatusPlanned"] ? (
                  <button
                    className="btn green btn-outline-primary start-call-btn"
                    onClick={this.handleStartCall}
                  >
                    <img src={images["phone-call-white.png"]} />
                    Start Call
                  </button>
                ) : (
                  ""
                )}

                {user_id !== null ? (
                  user_id == loggedInUser &&
                  status_id == Constants["ActivityStatusStarted"] ? (
                    <button
                      className="btn red btn-outline-primary end-call-btn"
                      onClick={() => this.toggleEndCallModal(true)}
                    >
                      <img src={images["phone-end-white.png"]} />
                      End Call
                    </button>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {endCallModal ? (
                  <CallModal
                    canShow={endCallModal}
                    updateModal={this.toggleEndCallModal}
                    unsuccessful_reason={unsuccessful_reason}
                    callTypes={callTypes}
                  />
                ) : null}
              </div>
            </div>

            <div className="mid-content">
              <div className="row">
                {/**applicants info on left side */}
                <ApplicantsInfo
                  applicantsInfo={applicantsInfo}
                  applicantsCount={applicantsCount}
                  accountHistory={accountHistory}
                  accountAgencyName={accountAgencyName}
                  account_id={account_id}
                  agencyList={agencyList}
                  submitAccountAgency={(data) =>
                    this.submitAccountDetailInfoData(data)
                  }
                  updateAccount={(data) => this.updateAccount(data)}
                  close_requestors={close_requestors}
                  close_reasons={close_reasons}
                  account_status={account_status}
                  is_post_to_charms={is_post_to_charms}
                  post_hold_to_charms={post_hold_to_charms}
                  hold_reasons={hold_reasons}
                  loggedInUser={loggedInUser}
                  CurrentSituationData={CurrentSituationData}
                ></ApplicantsInfo>

                <div className="col-md-8 d-flex justify-content-md-end">
                  <div className="right-content">
                    <ul
                      className="nav top-nav nav-tabs nav-item"
                      id="nav-tab"
                      role="tablist"
                    >
                      <li>
                        <a
                          className="nav-item nav-link active"
                          data-toggle="tab"
                          href="#activities"
                          role="tab"
                          aria-controls="all-content"
                          aria-selected="true"
                          onClick={() => this.handleTabChange("activities")}
                        >
                          Activities
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-item nav-link"
                          data-toggle="tab"
                          href="#details"
                          role="tab"
                          aria-controls="inprogress-content"
                          aria-selected="true"
                        >
                          Details
                        </a>
                      </li>
                      {/* <li>
                                                    <a className="nav-item nav-link" data-toggle="tab" href="#notes" 
                                                      role="tab" aria-controls="inprogress-content" aria-selected="true">
                                                      Notes
                                                    </a>
                                                </li> */}
                      <li>
                        <a
                          className="nav-item nav-link"
                          data-toggle="tab"
                          href="#marketing"
                          role="tab"
                          aria-controls="inprogress-content"
                          aria-selected="true"
                          onClick={() => this.handleTabChange("marketing")}
                        >
                          Marketing
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-item nav-link"
                          data-toggle="tab"
                          href="#documents"
                          role="tab"
                          aria-controls="inprogress-content"
                          aria-selected="true"
                          onClick={() => this.handleTabChange("document")}
                        >
                          Documents
                        </a>
                      </li>
                      <li>
                          <a className="nav-item nav-link" data-toggle="tab" href="#progress-items" 
                            role="tab" aria-controls="inprogress-content" aria-selected="true"
                            onClick={()=>this.handleTabChange('progess-items')}
                          >
                            Progress items
                          </a>
                      </li>
                    </ul>

                    <div className="tab-content" id="nav-tabContent">
                      <ActivitiesTabData
                        post_hold_to_charms={post_hold_to_charms}
                        is_post_to_charms={is_post_to_charms}
                        activityHistory={activityHistory}
                        CampaigRecordsData={CampaigRecordsData}
                        CallTypeData={CallTypeData}
                        submit={(type) => this.submitActivity(type)}
                        submitScheduleCall={(type) =>
                          this.submitScheduleActivity(type)
                        }
                        submittaskActivity={(type) =>
                          this.submittaskActivity(type)
                        }
                        recordCallData={(id)=>this.recordCallData(id)}
                      ></ActivitiesTabData>

                      {/**Details tab data */}
                      <DetailsTabData
                        applicantsInfo={applicantsInfo}
                        applicantsCount={applicantsCount}
                        submitApplicant={(id, data) =>
                          this.submitApplicantData(id, data)
                        }
                        getAccountDetails={(data) =>
                          this.getAccountDetailsSearch(data)
                        }
                        submitAddLinkData={(data) =>
                          this.handleAddLinkSubmit(data)
                        }
                        submitDeleteLinkData={(data) =>
                          this.handleDeleteLinkSubmit(data)
                        }
                        genderTypes={genderTypeList}
                        religionList={religionList}
                        ethnicOriginList={ethnicOriginList}
                        nationalityList={nationalityList}
                        sexualOrientationList={sexualOrientationList}
                        is_post_to_charms={is_post_to_charms}
                        post_hold_to_charms={post_hold_to_charms}
                        personTitleList={personTitleList}
                        PreferredContactTimeData={PreferredContactTimeData}
                        personInfo={personInfo}
                        accountName={accountName}
                        personInfosearch={personInfosearch}
                        FosteringHistoryData={FosteringHistoryData}
                        FosteringPreferenceData={FosteringPreferenceData}
                        RelationshipStatusData={RelationshipStatusData}
                        LanguageData={LanguageData}
                        CountryData={CountryData}
                      />

                      {/* <NotesTabData></NotesTabData> */}

                      {/**Marketing tab data */}
                      <MarketingTabData
                        accountMarketingData={accountMarketingData}
                        fetchTabData={(data) => this.handleMarketingData(data)}
                        updateEmailConsent={(data) =>
                          this.handleMarketingEmailConsent(data)
                        }
                        accountName={accountName}
                        account_id={account_id}
                        accountMarketingConsent={
                          accountData ? accountData.marketing_consent : ""
                        }
                        is_post_to_charms={is_post_to_charms}
                        post_hold_to_charms={post_hold_to_charms}
                        addCarerRef={(data)=>this.addCarerRef(data)}
                      ></MarketingTabData>

                      <DocumentsTabData
                        account_id={account_id}
                        documentTabData={accountDocumentData}
                        submitDocument={(data) => this.submitDocumentData(data)}
                        searchDocumentData={(data) =>
                          this.searchDocumentData(data)
                        }
                        is_post_to_charms={is_post_to_charms}
                        post_hold_to_charms={post_hold_to_charms}
                        listIEFormData={listIEFormData}
                        applicantsInfo={{ ...applicantsInfo }}
                        agencyList={agencyList}
                        RelationshipStatusData={RelationshipStatusData}
                        marketingList={marketingSourceList}
                        personeEnquiryList={personeEnquiryData}
                        personTitleList={personTitleList}
                        ethnicOriginList={ethnicOriginList}
                        deleteDocumentData={(data) =>
                          this.deleteDocumentData(data)
                        }
                        CountryData={CountryData}
                        CurrentSituationData={CurrentSituationData}
                        RelationshipData={RelationshipData}
                        LocalAuthorityData={LocalAuthorityData}
                        FosteringHistoryData={FosteringHistoryData}
                        saveGeneralIeForm={(data) =>
                          this.saveGeneralIeForm(data)
                        }
                        OccupationData={OccupationData}
                        responceBack={responceBack}
                        blocking={blocking}
                        stageId={accountHistory?.stageId}
                        marketing_tab={marketing_tab}
                        submitIEForm={(data) => this.submitIEForm(data)}
                        submitPostCode={(data) => this.submitPostCode(data)}
                        authority_id={authority_id}
                      />

                      <ProgressItemsTabData
                        addProgressItemsRequest={this.addProgressItem}
                        progressItems={progressItems}
                        stageProgressItems={stageProgressItems}
                        progressItemsSearchRequest={this.searchProgressItems}
                        account_id={account_id}
                        is_post_to_charms={is_post_to_charms}
                        accountName={accountName}
                      ></ProgressItemsTabData>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    loggedUser: state.authenticatedUser,
    getActivity: state.accountDetail,
    // isActivityRecordsFetched:  state.isActivityRecordsFetched,
    // activityList  : state.activityList,
  };
};
export default connect(mapsStateToProps, {
  insertActivityEmail,
  insertActivityCall,
  insertScheduleActivityCall,
  insertActivityTask,
  resetAccountDetailData,
  submitAddLinkData,
  submitDeleteLinkData,
  getAccountDetailLinkData,
  getAccountDetails,
  getAccountDetailSearch,
  updateCall,
  getMarketingTabData,
  updateMarketingEmailConsent,
  addProgressItem,
  getStageProgressItemsForAccount,
  updatePersonInfo,
  updateStartTimeandStatus,
  updateAccountDetailInfo,
  updateAccountStatus,
  getActivitiesTabData,
  updateAccountDocument,
  getDocumentTabData,
  deleteEnquiryDocument,
  getFormSaveData,
  updateCarerReferralMarketingTab,
  IEFormSumitData,
  getPostCodeAuthority,
  updateRecordCallData
})(AccountDetails);
