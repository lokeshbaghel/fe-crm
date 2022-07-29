import "./index.css";
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";


import BlockUI from "../../components/BlockUI";
import Banner from "../../components/Banner";
import BannerImage from "../../assets_crm/img/login-bg.jpg";
import {getAllEmailCampaign, getScheduleCampaigns, getCompletedCampaigns, getInProgessCampaigns, stopCampaignsInProgess, 
        getContactListsTabData, deleteCampaign, getEmailTemplates, getSmsTemplateList, getContactListsCreateFormData, 
        submitContactListsFormData, deleteContactList, getRecurrenceContactList, resetEngagementHubData, createCampaign, 
        getContactListsEditFormData, sendInstantEmailAndSmsCampaign, deleteContactPerson} from "../../actions/EngagementHub";
import { displayErrorMessage,accessAllowed, history } from "../../utils/helper";
import CampaignList from "./Campaigns/CampaignList";
import ContactList from "./Lists/ContactList";
import ConfirmationPopUp from '../../components/Modals/ConfirmationPopUp/index';
import Constants from "../../utils/constants";

class Engagement extends React.Component {
    state = {
        loggedInUser                : this.props?.loggedUser?.user?.user_id,
        showListForm                : false,
        showListDeleteConfirmation  : false,
        selectedListId              : '',
        selectedListPersonId        : '',
        contactPersonId             : '',
        showContactPersonDeleteModal: false
    };

    /*lifecycle method to load default data */
    componentDidMount() {
        accessAllowed(Constants['engagement-hub']);
        /**below case is executed ONLY when list is edited */
        const {state} = history.location;
        if(state && state.from === 'editList'){
            const element = document.getElementById("lists-content-tab");
            element.setAttribute("href","#lists-content");
            element.classList.remove("disabled-tab");
            element.click();
            this.props.history.location.state.from = ''
        } else {
            this.props.getAllEmailCampaign();
        }
    }

    /*lifecycle method to reset redux store data of engagement */
    componentWillUnmount(){
        this.props.resetEngagementHubData()
    }
  
    /**method when tab is clicked on load data */
    handleActions = async (type, data={}) => {
        /**called when completed tab in campaigns is clicked */
        if(type === 'completed')
            this.props.getCompletedCampaigns();
        
        //Get schedule campaigns
        if(type === 'scheduled')
           this.props.getScheduleCampaigns();   
        
        //Get in progress campaigns
        if(type === 'inprogress')
           this.props.getInProgessCampaigns();
           
        //Get all email or search filter text campaigns
        if(type === 'campaigns' || type==='searchTitle'){
            let param={}
            if(!_.isEmpty(data))
                param.searchTitle=data;
            
            if(document.getElementById("campaigns-content-tab").hasAttribute("href"))
                this.props.getAllEmailCampaign(param)
            else{
                displayErrorMessage('Please cancel the form first before switching the tab')
                document.getElementById("campaigns-content-tab").classList.remove('active')
                document.getElementById("lists-content-tab").classList.add('active')
            }
        }

        /**called when lists tab is clicked */
        if(type === 'contacts'){
            if(document.getElementById("lists-content-tab").hasAttribute("href"))
                this.props.getContactListsTabData(data)
            else{
                displayErrorMessage('Please cancel the form first before switching the tab')
                document.getElementById("lists-content-tab").classList.remove('active')
                document.getElementById("campaigns-content-tab").classList.add('active')
            }
        }

        //For Delete Campaign Pop up
        if(type === 'deleteCampaign'){
            data.user_id = this.state.loggedInUser
          await  this.props.deleteCampaign(data)
          await this.props.getAllEmailCampaign();
        }    
        
        //For Stop campaign pop up
        if(type === 'stopCampaign'){
            data.user_id = this.state.loggedInUser;
            this.props.stopCampaignsInProgess(data);
        }

        //Get Email templates for new campaign form
        if(type === 'email')
            this.props.getEmailTemplates();

        //Get SMS templates for new campaign form
        if(type === 'sms')
            this.props.getSmsTemplateList(); 
            
        if(type === 'getRecurrenceData')
            this.props.getRecurrenceContactList()

        if(type === 'createCampaign'){
            data.user_id = this.state.loggedInUser
            this.props.createCampaign(data)
        }

        //Send Email Campaign
        if(type === 'sendCampaign')
            this.props.sendInstantEmailAndSmsCampaign(data)
        
        /**called when lists is deleted */
        if(type === 'deleteLists'){
            this.props.deleteContactList(this.state.selectedListId);
            this.handleListsDeletePopUp(false);  //modal is closed
        }

        /**called when a single person from the list is removed */
        if(type === 'deleteListPerson'){
            this.props.deleteContactPerson(this.state.selectedListPersonId);
            this.handleListPersonDeleteModal(false);  //modal is closed
        }
    }

    /**method to submit contact list form */
    submitContactListForm = (id, data) => {
        const loggedUser = this.props.loggedUser.user;  //fetched from redux store
        data.user_id = loggedUser.user_id;
        this.props.submitContactListsFormData(id, data)
    }

    
    /**method to update the status of edit button click of lists tab */
    updateEditFormStatus = (data) => {
        const element = document.getElementById("campaigns-content-tab");
        if(!element.hasAttribute("href")){
            element.setAttribute("href","#campaigns-content");
            element.classList.remove("disabled-tab");
        }
        this.setState({showListForm : data})
    }
    
    /**method to show confirmation box to delete contact list */
    deleteContactList = (id) => {
        this.setState({selectedListId : id});
        this.handleListsDeletePopUp(true);
    }
    
    /**method to show confirmation box to delete contact list */
    handleListsDeletePopUp = (data) => {
        this.setState({showListDeleteConfirmation : data})
    }

    /**method to show confirmation box to delete person attached to contact list */
    deleteContactListPerson = (id) => {
        this.setState({selectedListPersonId : id});
        this.handleListPersonDeleteModal(true);
    }
    
    /**method to show/hide confirmation box used for deleting person attached to contact list */
    handleListPersonDeleteModal = (data) => {
        this.setState({showContactPersonDeleteModal : data})
    }

    render() {
        const { showListForm, showListDeleteConfirmation, showContactPersonDeleteModal } = this.state;
        const { blocking, scheduledCampaigns, completedCampaigns, inProgessCampaigns, contactLists, campaignContactList, 
                smsTemplates, emailTemplates, enquirerLists, recurrenceTypes } = this.props.engagement;

        return (
            <>
                <Banner img={BannerImage} />
                <BlockUI blocking={blocking}></BlockUI>
                <div className="page-content-wrapper engagemet-hub" data-aos="fade-up">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <h1 className="dash-title">Engagement Hub</h1>

                                <div className="nav nav-tabs nav-fill tab-btn" role="tablist">
                                    <a className="nav-item nav-link active" id="campaigns-content-tab" data-toggle="tab"
                                        role="tab" aria-controls="campaigns-content" href="#campaigns-content" 
                                        aria-selected="true" onClick={() => this.handleActions('campaigns')}
                                    >
                                        Campaigns
                                    </a>
                                    <a className="nav-item nav-link" id="lists-content-tab" data-toggle="tab"
                                        role="tab" aria-controls="lists-content" aria-selected="true" href="#lists-content" 
                                        onClick={() => this.handleActions('contacts')}
                                    >
                                        List of Enquiries
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="tab-content" id="nav-tabContent">
                            <CampaignList scheduledCampaigns={scheduledCampaigns}
                                      completedCampaigns={completedCampaigns}
                                      inProgessCampaigns={inProgessCampaigns}
                                      actionCalled={(data) => this.handleActions(data)}
                                      actionModal={this.handleActions}
                                      getEmailTemplates={(data) => this.handleActions('email', data)}
                                      campaignContactList={campaignContactList}
                                      getSmsTemplateList={(data) => this.handleActions('sms', data)}
                                      smsTemplates={smsTemplates}
                                      emailTemplates={emailTemplates}
                                      getRequestForRecurrence={(data) => this.handleActions(data)}
                                      recurrenceTypes={recurrenceTypes}
                                      searchTitle={(data) => this.handleActions('searchTitle', data)}
                                      createCampaign={(data) => this.handleActions('createCampaign', data)}
                                    
                            ></CampaignList>
                            <ContactList contactLists={contactLists}
                                        enquirerLists={enquirerLists}
                                        showListForm={showListForm}
                                        callListAction={(type, data) => this.handleActions(type, data)}
                                        submitListForm={(id, data) => this.submitContactListForm(id, data)}
                                        deleteContact={(id) => this.deleteContactList(id)}
                                        cancelEditForm={(data) => this.updateEditFormStatus(data)}
                                        deleteContactPerson={(id) => this.deleteContactListPerson(id)}
                            ></ContactList>

                            {showListDeleteConfirmation ? 
                                <ConfirmationPopUp heading={'Are you sure you want to delete? This action is irreversible'} 
                                                    showModal={showListDeleteConfirmation} 
                                                    handleModalClose={()=> this.handleListsDeletePopUp(false)} 
                                                    handleModalSuccess={() => this.handleActions('deleteLists')}
                                /> 
                            : null}

                            {showContactPersonDeleteModal ? 
                                <ConfirmationPopUp heading={'Are you sure you want to delete this person from the contact list? This action is irreversible'} 
                                                    showModal={showContactPersonDeleteModal} 
                                                    handleModalClose={()=> this.handleListPersonDeleteModal(false)} 
                                                    handleModalSuccess={() => this.handleActions('deleteListPerson')}
                                /> 
                            : null}
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
                  { getScheduleCampaigns, getAllEmailCampaign, getCompletedCampaigns,getInProgessCampaigns, 
                    stopCampaignsInProgess, getContactListsTabData, deleteCampaign, getEmailTemplates, getSmsTemplateList, 
                    getContactListsCreateFormData, submitContactListsFormData, deleteContactList, getRecurrenceContactList,
                    resetEngagementHubData, createCampaign, getContactListsEditFormData, sendInstantEmailAndSmsCampaign,
                    deleteContactPerson}
              )(Engagement);