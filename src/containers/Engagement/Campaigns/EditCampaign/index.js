import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Constants from "../../../../utils/constants";
import BlockUI from "../../../../components/BlockUI";
import Banner from "../../../../components/Banner";
import BannerImage from "../../../../assets_crm/img/login-bg.jpg";
import { getEmailTemplates, getSmsTemplateList, getRecurrenceContactList, 
        resetEngagementHubData, updateCampaign, getCampaign} from "../../../../actions/EngagementHub";
import EditCampaignForm from "./EditTemplateTabs/EditCampaignForm";
import { accessAllowed } from "../../../../utils/helper";
class Engagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewCampaignCardHtml : "Please select template to Preview",
            previewContactCardHtml  : '',
            loggedInUser: this.props?.loggedUser?.user?.user_id,
            campaign_id: this.props.match.params.id,
            forLoadPage:false
        };
      }
    

    /*lifecycle method to load default data */
    componentDidMount() {
        accessAllowed(Constants['engagement-hub']);
        const fields = {
            campaign_id: this.state.campaign_id
        }
        this.props.getCampaign(fields)
        this.setState({forLoadPage:true});
    }

    /*lifecycle method to reset redux store data of engagement */
    componentWillUnmount(){
       // this.props.resetEngagementHubData()
    }

    /**method when tab is clicked on load data */
    handleActions = (type, data={}) => {

        //Get Email templates/SMS templates for edit campaign form
        if(type == 'email' || type == 'sms'){
            const fields = {
                campaign_id: this.state.campaign_id,
                campaign_type: type
            }
            this.props.getCampaign(fields)
        }
            
        if(type == 'getRecurrenceData')
            this.props.getRecurrenceContactList()

        if(type == 'updateCampaign'){
            data.user_id = this.state.loggedInUser
            this.props.updateCampaign(data)
        }
    }

    /**method to submit contact list form */
    submitContactListForm = (data) => {
        const loggedUser = this.props.loggedUser.user;  //fetched from redux store
        data.user_id = loggedUser.user_id;
        this.props.submitContactListsFormData(data)
    }

    render() {
        const { blocking, campaignContactList, smsTemplates,
             emailTemplates, recurrenceTypes, campaign } = this.props.engagement;
         const {forLoadPage}=this.state;
        return (
            <>
                <Banner img={BannerImage} />
                <BlockUI blocking={blocking}></BlockUI>
                <div className="page-content-wrapper engagemet-hub" data-aos="fade-up">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h1 className="dash-title">Engagement Hub</h1>
                             </div>
                        </div>

                        <div className="tab-content" id="nav-tabContent">
                        { forLoadPage? <EditCampaignForm 
                                      callTemplates={(type) => this.handleActions(type)}
                                      smsTemplates={smsTemplates}
                                      emailTemplates={emailTemplates}
                                      getRequestForRecurrence={(data) => this.handleActions(data)}
                                      recurrenceTypes={recurrenceTypes}
                                      updateCampaign={(data) => this.handleActions('updateCampaign', data)}
                                      campaign={campaign}
                                      campaignContactList={campaignContactList}
                            ></EditCampaignForm>
                              :''}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapsStateToProps = (state) => {
    return {
        loggedUser: state.authenticatedUser,
        engagement: state.engagementHub,
    }
}

export default connect(
                  mapsStateToProps, 
                  { getEmailTemplates, getSmsTemplateList, 
                    getRecurrenceContactList,
                    resetEngagementHubData, updateCampaign, getCampaign}
              )(Engagement);