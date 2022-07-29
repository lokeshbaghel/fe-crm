import React, { Component } from 'react';
import _ from "lodash";

import campaignIcon from "../../../assets_crm/img/campaign-icon.png";
import EmailTemplates from "./TemplateTabs/EmailTemplates";
import SmsTemplates from "./TemplateTabs/SmsTemplates";
import CreateCampaignModal from "./CreateCampaign/CreateCampaignModal/CreateCampaignModal";


let selectedTemplate = null;
class CampaignForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            templateType: 'email'
        };
     }

    cancelForm = () => {
        this.props.showCampaignForm(false);
    }
    
    callTemplate=(tabName)=>{
          this.props.callTemplates(tabName);
          this.setState({templateType: tabName})
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
      
    }

    //Handle Create Campaign modal
    submitCampaignModal = (value) => {
            value.crm_template_id = selectedTemplate;
            this.setState({showModal: false})
            this.props.getCampaignData(value);
      
    }

    //For redirect to List page
    openList = () =>{
        this.props.openContactList()
    }

    render(){
        const { campaignContactList, smsTemplates, emailTemplates, recurrenceTypes } = this.props;
        const { showModal, templateType } = this.state;
        return(
            <>
           <div className="row">
                <div className="col-lg-7 col-md-12">
                        <div className="search-sort-container">
                        <div className="custom-sort-tabs">
                            <ul className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                <li><a onClick={() => this.callTemplate('email')} className="nav-item nav-link active" id="email-content-tab" data-toggle="tab" href="#email-content" role="tab" aria-controls="email-content" aria-selected="true">Email</a></li>
                                <li><a onClick={() => this.callTemplate('sms')}  className="nav-item nav-link" id="sms-content-tab" data-toggle="tab" href="#sms-content" role="tab" aria-controls="sms-content" aria-selected="true">SMS</a></li>
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
                            Create Campaign
                        </button>
                        {(showModal) ? <CreateCampaignModal canShow={showModal} recurrenceTypes={recurrenceTypes} 
                                        campaignContactList={campaignContactList} 
                                        updateModal={(data)=> this.createCampaignModal(data)}
                                        updateCampaign={(data)=> this.submitCampaignModal(data)}
                                        openListForm={this.openList}
                                        templateType={templateType}
                                        /> 
                        : ''}
					</div>
				</div>
                
            </div>

            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane active show fade" id="email-content" role="tabpanel" aria-labelledby="email-content-tab">
                     <EmailTemplates getTemplate={this.handleSelectedTemplate} tempName={templateType} emailTemplates={emailTemplates} />
                </div>

                 <div className="tab-pane fade" id="sms-content" role="tabpanel" aria-labelledby="sms-content-tab">
                      <SmsTemplates  getTemplateSms={this.handleSelectedTemplate} tempName={templateType} smsTemplateList={smsTemplates} />
                 </div>
            </div>
        </>
        )
    }
}

export default CampaignForm;