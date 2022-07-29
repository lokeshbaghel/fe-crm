import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import _ from 'lodash';
import moment from "moment";

import {displayRecordNotFound} from '../../../../utils/helper';
import Constant from '../../../../utils/constants';
import CarerReferalModal from './AddCarerReferalModal'

class MarketingTabData extends Component{
    state = {
        email_consent : '',
        showModal     : false,
    }

    /*lifecycle method to update state when data received from redux store */
    static getDerivedStateFromProps(props, state) {
        if(typeof props.accountMarketingConsent != "undefined") {
            return {
                email_consent  : props.accountMarketingConsent,
            };
        }
        return null;
    }

    /**method to record email consent */
    handleToggle = (event) => {
        //If Account is not passed to Charms
        if(this.props.is_post_to_charms == Constant["is_post_to_charms_no"]){
            let value = 2;
            if(document.getElementById('email_consent').checked == true)
                value = 1;

            this.setState({ email_consent : value }, () => {
                const params = {
                    account_id : parseInt (this.props.account_id),
                    marketing_consent_id : parseInt (value)
                }

                this.props.updateEmailConsent(params);
            });
        }
    }

    /**method to display enquiry text */
    renderHtml = (marketingData) => {
        if(!_.isEmpty(marketingData)){
            return(
                marketingData.map((data,index) => {
                    return(
                        <div className="select-wrap-list" key={index}>
                            <div className="form-group select-option">
                                {/* { (data.enquiry_text) ? <div className="enquiry-text"><p>{data.enquiry_text}</p></div> : '' } */}
                                <div className="enquiry-list-section">
                                    <ul>
                                        <li><strong>Campaign Source :</strong> {data.marketing_source_link}</li>
                                        <li><strong>Pack:</strong> {data.follow_option_link}</li>
                                        <li><strong>Date:</strong> { moment(data.enquiry_ts).format("DD-MM-YYYY")  }</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )
                })
                    
            )
        } else{
            return (displayRecordNotFound('No Records Found'))
        }
    }

    /**method to add Carer Referral */
    addCarerReferral = (data) => {
             this.props.addCarerRef(data);
             this.toggleModal(false);
    }
     /**method to open/close modal */
    toggleModal = (value) => {
        this.setState({showModal: value})
    }
    render(){
        const {accountMarketingData, is_post_to_charms, post_hold_to_charms,accountName} = this.props;
        const {email_consent,showModal} = this.state;
        return(
            <div className="tab-pane fade show" id="marketing" role="tabpanel" aria-labelledby="notes-tab">
                <div className="curve-box-content marketing-content">
                    <Scrollbars style={{ height: "660px" }}>
                        <div className="scrollbar">
                            <div className="switch-btn">
                                <h2>Marketing consent</h2>
                                
                                <label className="switch">
                                    <input type="checkbox" name="email_consent" id="email_consent" 
                                            onChange={this.handleToggle} value={email_consent}
                                            checked={email_consent == 1 ? true : false}
                                            disabled={(is_post_to_charms == Constant["is_post_to_charms_yes"]) || (this.props.post_hold_to_charms == Constant["post_hold_to_charms_yes"])}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                { (accountName && !is_post_to_charms) ? <button onClick={()=>this.toggleModal(true)} >Add carer referral</button> :''}
                            </div>
                            { showModal ? <CarerReferalModal showModal={showModal} 
                                                             updateModal={this.toggleModal}
                                                             submitData={(data)=>this.addCarerReferral(data)}
                                          /> : null }
                            {this.renderHtml(accountMarketingData)}
                            
                        </div>
                    </Scrollbars>
                </div>
            </div>
        )
    }
}

export default MarketingTabData;