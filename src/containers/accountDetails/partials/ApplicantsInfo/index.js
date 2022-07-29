import React, {Component} from 'react';
import _ from 'lodash';

import CloseAccountModal from "./CloseAccountModal";
import AccountModal from './AccountModal';
import HoldAccountModal from './HoldAccountModal';
import ActiveAccountModal from './ActiveAccountModal';
import MessagePopup from './MessagePopup';
import Constant from "../../../../utils/constants";
import {countryCodeHtml} from "../../../../utils/helper";

class ApplicantsInfo extends Component{
    state = {
        closeAccountModal: false,
        holdAccountModal: false,
        showAccountInfoModal : false,
        showActiveAccountModal: false,
        showMessagePopup:false
    };

    /**method to create tab */
    applicantTab = (data) => {
        if(data > 0) {
            return(
                _.times(data, (index) => {
                    return(
                        <li key={index}>
                            <a className={`nav-item nav-link ${index == 0 ? "active" : ""}`} data-toggle="tab" 
                                href={`#applicant${index}`} role="tab" aria-controls="all-content" aria-selected="true">
                                Applicant{index+1}
                            </a>
                        </li>
                    )
                })
            )
        }
    }

    /**method to display tab data */
    applicantTabContent = (tabData) => {
        if(!_.isEmpty(tabData)) {
            return(
                tabData.map((person,index) => {
                    
                    return(
                        <div className={`tab-pane fade show ${index == 0 ? "active" : ""}`} id={`applicant${index}`} role="tabpanel" aria-labelledby="activities-tab" key={index}>
                            <div className="row applicant">
                                <div className="col-md-8 full-small mt-2">
                                    <p>Name</p>
                                    <h5>{person.full_name}</h5>
                                </div>
                                <div className="col-md-4 full-small d-flex flex-column justify-content-md-end">
                                    <p>Age</p>
                                    <h5>{person.age}</h5>
                                </div>
                            </div>
                            <div className="row applicant mt-3">
                                <div className="col-md-8 full-small">
                                    <p>Address</p>
                                    <h5>{person.address}</h5>
                                </div>
                                <div className="col-md-4 full-small d-flex flex-column justify-content-md-end"></div>
                            </div>
                            <div className="row applicant mt-3">
                                <div className="col-md-8">
                                    <p>Town</p>
                                    <h5>{person.city}</h5>
                                </div>
                                <div className="col-md-4 full-small d-flex flex-column justify-content-md-end">
                                    <p>Post Code</p>
                                    <h5>{person.post_code}</h5>
                                </div>
                            </div>
                            
                            <div className="seperator"></div>

                            <div className="row applicant mt-3">
                                <div className="col-md-8 full-small">
                                    <p>Email Address</p>
                                    <h5>{person.email}</h5>
                                </div>
                                <div className="col-md-4 d-flex flex-column justify-content-md-end"></div>
                            </div>

                            <div className="row applicant mt-3">
                                <div className="col-md-4 full-small">
                                    <p>Telephone number</p>
                                    {/* <h5>{countryCodeHtml(person.telephone_country_code)} {person.telephone}</h5> */}
                                    <h5>{person.telephone}</h5>
                                </div>
                                <div className="col-md-4 full-small d-flex flex-column justify-content-md-end">
                                    <p>Mobile number</p>
                                    {/* <h5>{countryCodeHtml(person.mobile_country_code)} {person.mobile || 'N/A'}</h5> */}
                                    <h5>{person.mobile || 'N/A'}</h5>
                                </div>
                            </div>

                            <div className="seperator"></div>

                            <div className="row applicant mt-3">
                                {/* <div className="col-md-6 full-small">
                                    <p>Placement type</p>
                                    <h5>Lorem Ipsum</h5>
                                </div> */}
                                {/* <div className="col-md-6 full-small">
                                    <p>Social worker</p>
                                    <h5>Lorem ipsum</h5>
                                </div> */}
                                {/* <div className="col-md-4 full-small">
                                    <p>Spare room</p>
                                    <h5>1</h5>
                                </div> */}
                            </div>

                            <div className="row applicant mt-3">
                                {/* <div className="col-md-6 full-small">
                                    <p>Local Authority</p>
                                    <h5>{person.authority || 'N/A'}</h5>
                                </div> */}
                                {/* <div className="col-md-6 full-small">
                                    <p>Link family</p>
                                    <h5>Lorem ipsum</h5>
                                </div> */}
                            </div>

                            <div className="row applicant mt-3">
                                <div className="col-md-12">
                                    <p>Nurturing journey</p>
                                    <h5>{person?.nurturing_journey || ''}</h5>
                                </div>
                            </div>

                            <div className="row applicant mt-3">
                                <div className="col-md-12">
                                    <p>Call or information pack requested?</p>
                                    <h5>{person?.follow_option || ''}</h5>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    toggleCloseAccountModal = (value) => {
        if(typeof value == "boolean"){
            this.setState({ closeAccountModal: value });
        }else{
            value.account_id = parseInt(this.props.account_id)
            this.props.updateAccount(value)
            this.setState({ closeAccountModal: false });
        }
    }

    toggleHoldAccountModal = (value) => {
        if(typeof value == "boolean"){
            this.setState({ holdAccountModal: value });
        }else{
            value.account_id = parseInt(this.props.account_id)
            this.props.updateAccount(value)
            this.setState({ holdAccountModal: false });
        }
    }

    toggleActiveAccountModal = (value) => {
        if(typeof value == "boolean"){
            this.setState({ showActiveAccountModal: value });
        }else{
            value.account_id = parseInt(this.props.account_id)
            this.props.updateAccount(value)
            this.setState({ showActiveAccountModal: false });
        }
    }
    toggleMessagePopupModal = (value) => {
        if(typeof value == "boolean"){
            this.setState({ showMessagePopup: value });
        }else{
            value.account_id = parseInt(this.props.account_id)
            this.props.updateAccount(value)
            this.setState({ showMessagePopup: false });
        }
    }
    
    /**method to display account general information */
    accountGeneralInfo = (account_id, accountHistory) => {
        if(!_.isEmpty(accountHistory)) {
            return(
                <React.Fragment>
                    <div className="seperator"></div>

                    <div className="row">
                        <div className="col-md-6 mb-6">
                            <span><strong>General Information</strong></span>
                        </div>
                        {(this.props.is_post_to_charms == Constant["is_post_to_charms_no"]) && (this.props.post_hold_to_charms != Constant["post_hold_to_charms_yes"]) ?
                        <div className="offset-md-3 offset-lg-3 col-md-3 col-lg-3">
                            <a className="btn btn-outline-primary float-right edit-btn" onClick={() => this.toggleAccountInfoModal(true)}>Edit</a>
                        </div>
                        : ''}
                    </div>

                    <div className="row applicant mt-3">
                        <div className="col-md-6 full-small">
                            <p>CRM ID</p>
                            <h5>{account_id || ''}</h5>
                        </div>
                        <div className="col-md-6 full-small d-flex flex-column">
                            <p>Charms ID</p>
                            <h5>{accountHistory?.charmsId || ''}</h5>
                        </div>
                    </div>

                    <div className="row applicant mt-3">
                        <div className="col-md-6 full-small">
                            <p>Enquiry stage</p>
                            <h5>{accountHistory?.stageName || ''}</h5>
                        </div>
                        <div className="col-md-6 full-small d-flex flex-column justify-content-md-end">
                            <p>Last call date and time</p>
                            <h5>{accountHistory?.lastCallTime || ''}</h5>
                        </div>
                    </div>

                    <div className="row applicant mt-3">
                        <div className="col-md-6 full-small">
                            <p>Contact made</p>
                            <h5>{accountHistory?.callAttempts} Attempt</h5>
                        </div>
                        <div className="col-md-6 full-small d-flex flex-column justify-content-md-end">
                            <p>Agency</p>
                            <h5>{accountHistory?.accountAgencyName || 'N/A'}</h5>
                        </div>
                    </div>

                    <div className="row applicant mt-3">
                        <div className="col-md-6 full-small">
                            <p>Spare room</p>
                            <h5>{accountHistory?.spare_rooms == Constant['Yes'] ? 'Yes' : 'No' || 'N/A'}</h5>
                        </div>
                        <div className="col-md-6 full-small d-flex flex-column">
                            <p>Date Approved</p>
                            <h5>{accountHistory?.DateApproved || ''}</h5>
                        </div>
                    </div>
                    <div className="row applicant mt-3">
                        <div className="col-md-6 full-small">
                            <p>Current situation</p>
                            <h5>{accountHistory?.currentSituation || ''}</h5>
                        </div>
                        <div className="col-md-6 full-small">
                            <p>Local Authority</p>
                            <h5>{accountHistory?.authority || 'N/A'}</h5>
                        </div>
                    </div>
                    
                </React.Fragment>
            )
                
        }
    }

    /**method to hide/show modal related to account general info */
    toggleAccountInfoModal = (value) => {
        this.setState({showAccountInfoModal : value})
    }

    /* submit agency form to parent method*/
    handleAgencySubmit = (data) => {
        this.props.submitAccountAgency(data);
        this.toggleAccountInfoModal(false);
    }

    accountStatusInfo = () => {
        return (
            <React.Fragment>
            <div className="seperator"></div>
            <div className="row applicant">
                <div className="col-md-12 account-status">
                    <p>Account Status</p>
                    
                    <button className={this.props.account_status == Constant["AccountActiveStatus"] ? 'btn btn-active' : 'btn'} disabled={(this.props.account_status == Constant["AccountActiveStatus"]) || (this.props.is_post_to_charms == Constant['is_post_to_charms_yes']) || (this.props.post_hold_to_charms == Constant["post_hold_to_charms_yes"]) ? true : false} onClick={() => this.toggleActiveAccountModal(true)}>Active</button>
                    {
                      this.state.showActiveAccountModal ?
                      ( <ActiveAccountModal canShow={this.state.showActiveAccountModal} updateModal={this.toggleActiveAccountModal} />)
                      : null  
                    }
                    

                    <button className={this.props.account_status == Constant["AccountHoldStatus"] ? 'btn btn-active' : 'btn'} 
                    disabled={(this.props.account_status == Constant["AccountHoldStatus"]) ? true : false}
                     onClick={() =>(this.props.is_post_to_charms == Constant['is_post_to_charms_yes']) ?  this.toggleMessagePopupModal(true) : this.toggleHoldAccountModal(true)}>On Hold</button>
                   
                   {
                      this.state.showMessagePopup ?
                      ( <MessagePopup canShow={this.state.showMessagePopup} message='Once passed to CHARMS, the account will no longer be editable' updateModal={this.toggleMessagePopupModal} />)
                      : null  
                    }
                   
                    {
                        this.state.holdAccountModal ?
                        (<HoldAccountModal user_id={this.props.loggedInUser} canShow={this.state.holdAccountModal} hold_reasons={this.props.hold_reasons} updateModal={this.toggleHoldAccountModal} />)
                        : null
                    }

                    <button className={this.props.account_status == Constant["AccountCloseStatus"] ? 'btn btn-active' : 'btn'} disabled={(this.props.account_status == Constant["AccountCloseStatus"]) || (this.props.is_post_to_charms == Constant['is_post_to_charms_yes']) || (this.props.post_hold_to_charms == Constant["post_hold_to_charms_yes"]) ? true : false} onClick={() => this.toggleCloseAccountModal(true)}>Closed</button>
                    {this.state.closeAccountModal ? (
                            <CloseAccountModal canShow={this.state.closeAccountModal} updateModal={this.toggleCloseAccountModal} close_requestors={this.props.close_requestors} close_reasons={this.props.close_reasons}/>
                        ) : null
                    }
                </div>
            </div>
            </React.Fragment>
        )
    }

    render(){
        const { showAccountInfoModal } = this.state;
        const { applicantsCount, applicantsInfo, accountHistory, accountAgencyName, agencyList, account_id, account_status, is_post_to_charms, CurrentSituationData } = this.props;
        return(
            <div className="col-md-4">
                <div className="left-content">
                    <h2>Key Information</h2>
                    <div className="curve-box-content">
                        <div className="grey-overlay"></div>
                        <ul className="nav nav-tabs nav-item items" id="nav-tab" role="tablist">
                            {this.applicantTab(applicantsCount)}
                        </ul>

                        <div className="tab-content" id="nav-tabContent">
                            {this.applicantTabContent(applicantsInfo, accountHistory, accountAgencyName)}
                        </div>
                        
                        {this.accountGeneralInfo(account_id, accountHistory)}

                        {showAccountInfoModal ? 
                                <AccountModal showModal={showAccountInfoModal} agencyList={agencyList}
                                    updateModal={(value) => this.toggleAccountInfoModal(value)}
                                    submitData={(data) => this.handleAgencySubmit(data)}
                                    account_id={account_id}
                                    accountInfo={{...accountHistory}}
                                    CurrentSituationData={CurrentSituationData}
                                /> 
                        : null}
                        
                        {account_status ? this.accountStatusInfo() : null}

                    </div>
                </div>
            </div>   
        )
    }
}

export default ApplicantsInfo;