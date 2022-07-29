import React, { Component } from 'react';
import campaignIcon from "../../../../../assets_crm/img/campaign-icon.png";
import _ from "lodash";

import EmailEditTemplates from "../EditTemplateTabs/EmailEditTemplates";
import SmsEditTemplates from "../EditTemplateTabs/SmsEditTemplates";
import EditCampaignModal from "../EditCampaignModal";

import { history } from '../../../../../utils/helper';


let selectedTemplate = null;
class CampaignEdit extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            templateType: ''
        };
    }
    
     //Cancel Edit Campaign
    cancelForm = () => {
        history.push("/engagement");
    }
    
    callTemplate=(tabName)=>{
        this.setState({templateType: tabName})
        this.props.callTemplates(tabName);
    }

    // Get selected template id
    handleSelectedTemplate = (id) => {
        selectedTemplate = id;
    }

    //Handle Create Campaign modal
    createCampaignModal = (value) => {
        if(typeof value === "boolean"){
            this.setState({showModal: value}) 
            if(value == true){
                this.props.getRequestForRecurrence()
            }
        }    
        else{
            value.crm_template_id = selectedTemplate;
            this.props.updateCampaign(value);
            this.setState({showModal: false})
        }
    }

    //For redirect to List page
    openList = () =>{
        this.props.openContactList()
    }

    render(){
        const { campaignContactList, smsTemplates, emailTemplates, recurrenceTypes, campaign } = this.props;
        let { showModal, templateType } = this.state;

        if(templateType === '')
            templateType = (campaign != 'undefined' && campaign) ? campaign.campaign_type : '';         

        return(
            <>
           <div className="row">
                <div className="col-lg-7 col-md-12">
                        <div className="search-sort-container">
                        <div className="custom-sort-tabs">
                            <ul className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <li><a onClick={() => this.callTemplate('email')} className={` nav-item nav-link ${ !_.isEmpty(emailTemplates) ? 'active' :'' }  `} id="email-content-tab" data-toggle="tab" href="#email-content" role="tab" aria-controls="email-content" aria-selected="true">Email</a></li>
                                <li><a onClick={() => this.callTemplate('sms')}  className={` nav-item nav-link ${ !_.isEmpty(smsTemplates) ? 'active' :'' }  `} id="sms-content-tab" data-toggle="tab" href="#sms-content" role="tab" aria-controls="sms-content" aria-selected="true">SMS</a></li>
                            </ul>
                        </div>
                        
                        <div className="search-campaign">
                            <input type="text" className="form-control search-user" id="" placeholder="" />
                            <button type="submit" className="campaign-btn">search</button>
                        </div>
                        
                    </div>
                </div>
                <div className="campaign-form-input-section col-lg-5 col-md-12">
					<div className="new-campaign-btn">
                        <button className="btn btn-primary cancel" onClick={this.cancelForm}>Cancel</button>
						<button
                            className="btn btn-primary"
                            onClick={() => this.createCampaignModal(true)}
                        >
                            <img src={campaignIcon} />
                            Edit Campaign
                        </button>
                        {(showModal) ? <EditCampaignModal 
                                        canShow={showModal} 
                                        recurrenceTypes={recurrenceTypes} 
                                        campaignContactList={campaignContactList} 
                                        updateModal={(data)=> this.createCampaignModal(data)}
                                        openListForm={this.openList}
                                        templateType={templateType}
                                        campaign={campaign}
                                        /> 
                        : ''}
					</div>
				</div>
                
            </div>
           
            <div className="tab-content" id="nav-tabContent">
                <div className={`tab-pane ${ !_.isEmpty(emailTemplates) ? 'active' :''} show fade`} id="email-content" role="tabpanel" aria-labelledby="email-content-tab">
               { !_.isEmpty(emailTemplates) ? <EmailEditTemplates getTemplate={this.handleSelectedTemplate} tempName={templateType} emailTemplates={emailTemplates} campaign={campaign} /> :''}
                </div>

                 <div className={`tab-pane ${ !_.isEmpty(smsTemplates) ? 'active' :''} show fade`} id="sms-content" role="tabpanel" aria-labelledby="sms-content-tab">
                { !_.isEmpty(smsTemplates) ? <SmsEditTemplates  getTemplateSms={this.handleSelectedTemplate} tempName={templateType} smsTemplates={smsTemplates} campaign={campaign} />: "" }
                 </div>
            </div>
        </>
        )
    }
}

export default CampaignEdit;