import React, { Component } from "react";
import _ from "lodash";
import { Scrollbars } from "react-custom-scrollbars";

import campaignIcon from "../../../assets_crm/img/campaign-icon.png";
import AllStatusTab from "./HubTabs/AllStatusTab";
import ScheduledTab from "./HubTabs/ScheduledTab";
import InProgressTab from "./HubTabs/InProgressTab";
import CompletedTab from "./HubTabs/CompletedTab";
import CampaignForm from "./CampaignForm";
import CampaignTemplate from '../PreviewTemplates';
import SearchBox from '../../../components/Search';

class CampaignList extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            showCampaignForm    : false,
            activeCampaignIndex : 0,
            activeTabType       : 'campaigns',
            showCreateModal     : true,
            searchTitle         : '',
            resetManual         :false
        }
        this.searchBox = React.createRef();
      }

    /**method to set preview of card */
    previewCard = (index, type) => {
        this.setState({activeCampaignIndex : index, activeTabType : type})
    }
   
    /**method when tab is clicked on load data */
    handleTabClick = (type) => {
        this.props.actionCalled(type)
        this.setState({ activeTabType : type, activeCampaignIndex : 0})
        this.searchBox.current.resetData();
    }

    /**method to hide/show campaign form */
    handleCampaignForm = (data) => {
        const element = document.getElementById("lists-content-tab");
        if(data === true){
            element.removeAttribute("href");
            element.classList.add('disabled-tab');
            this.props.getEmailTemplates(true)
        } else {
            if(!element.hasAttribute("href")){
                element.setAttribute("href","#lists-content");
                element.classList.remove("disabled-tab");
            }
        }

        this.setState({ showCampaignForm: data });
    }

    handleModalAction = (type, data) => {
        this.props.actionModal(type, data);
    }
    handlecallTemplates=(tabName)=>{
        if(tabName=='email')
           this.props.getEmailTemplates(tabName);
        if(tabName=='sms') 
           this.props.getSmsTemplateList(tabName);
    }

    showCampaignPreview = () => {
        const { scheduledCampaigns, completedCampaigns, inProgessCampaigns } = this.props;
        const {activeCampaignIndex, activeTabType} = this.state;

        let data = [];
        if(activeTabType === 'scheduled'){
            data = scheduledCampaigns[activeCampaignIndex];
        } else if(activeTabType === 'inprogress'){
            data = inProgessCampaigns[activeCampaignIndex];
        } else if(activeTabType === 'completed'){
            data = completedCampaigns[activeCampaignIndex];
        } else {
            if(_.size(scheduledCampaigns) > 0)
                data = scheduledCampaigns[activeCampaignIndex];
            else if(_.size(inProgessCampaigns) > 0)
                data = inProgessCampaigns[activeCampaignIndex];
            else if(_.size(completedCampaigns) > 0)
                data = completedCampaigns[activeCampaignIndex];
        }

        if(!_.isEmpty(data)) {
            const result = CampaignTemplate(data);
            return result;
        } else {
            return 'No Data to Preview'
        }
    }

    openContactListForm = () => {
        this.setState({showCampaignForm :false});
        const element = document.getElementById("lists-content-tab");
        if(!element.hasAttribute("href")){
            element.setAttribute("href","#lists-content");
            element.classList.remove("disabled-tab");
            element.click();
        }
        this.props.actionCalled('contacts');
    }
        
    handleGetRecurrence = () => {
        this.props.getRequestForRecurrence('getRecurrenceData')
    }

    //Handle to get create campaign data from campaign form and send to parent 
    getCampaignData = (data) => {
        //this.setState({showCampaignForm:false})
        this.handleCampaignForm(false)
        this.props.createCampaign(data)
    }

    /*method called to when search is performed and called parent method*/
    handleSearchInputChange(value) {         
        this.setState({ searchTitle : value }, () => {
            this.props.searchTitle(value);
        });
    }


    render() {
        const { showCampaignForm,searchTitle } = this.state;
        const { scheduledCampaigns, completedCampaigns, inProgessCampaigns, campaignContactList, 
                smsTemplates, emailTemplates, recurrenceTypes } = this.props;
        return (
            <React.Fragment>
                {!showCampaignForm ? (
                    <div className="tab-pane fade show active" id="campaigns-content" role="tabpanel" 
                        aria-labelledby="campaigns-content-tab">

                    <div className="row">
                        <div className="col-lg-7 col-md-12">
                            <div className="search-sort-container">
                                        <div className="custom-sort-tabs">
                                            <ul className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                <li>
                                                    <a onClick={() => this.handleTabClick("campaigns")} className="nav-item nav-link active" 
                                                    id="all-content-tab" data-toggle="tab" href="#all-content" 
                                                    role="tab" aria-controls="all-content" aria-selected="true"
                                                    >
                                                    All
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => this.handleTabClick("scheduled")} className="nav-item nav-link"
                                                    id="scheduled-content-tab" data-toggle="tab" href="#scheduled-content"
                                                    role="tab" aria-controls="scheduled-content" aria-selected="true"
                                                    >
                                                    Scheduled
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => this.handleTabClick("inprogress")} className="nav-item nav-link" 
                                                    id="inprogress-content-tab" data-toggle="tab" href="#inprogress-content"
                                                    role="tab" aria-controls="inprogress-content" aria-selected="true"
                                                    >
                                                    In Progress
                                                    </a>
                                                </li>
                                                <li>
                                                    <a onClick={() => this.handleTabClick("completed")} className="nav-item nav-link"
                                                    id="#completed-content-tab" data-toggle="tab" href="#completed-content"
                                                    role="tab" aria-controls="completed-content" aria-selected="true"
                                                    >
                                                    Completed
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* <div className="search-campaign">
                                            <input type="text" className="form-control search-user" />
                                            <button type="submit" className="campaign-btn">search</button>
                                        </div> */}
                                        <div className="filter-wrap">
                                        <SearchBox searchParentClass="search-campaign customfilter"
                                                            searchButtonClass="campaign-btn"
                                                            resetButtonClass="btn white filter-btn btn-outline-primary"
                                                            searchInputChangeValue={(val) => this.handleSearchInputChange(val)}
                                                            searchValue={searchTitle} 
                                                            ref={this.searchBox}
                                        />
                                        </div>
                                    </div>
                            </div>
                            <div className="campaign-form-input-section col-lg-5 col-md-12">
                                    <div className="new-campaign-btn">
                                        <button className="btn btn-primary" onClick={() => this.handleCampaignForm(true)}>
                                            <img src={campaignIcon} />New Campaign
                                        </button>
                                    </div>
                            </div>

                        </div>
                        <div className="row">


                            <div className="col-lg-7 col-md-12">
                                
                                
                                <div className="tab-content" id="nav-tabContent">
                                    <AllStatusTab completedCampaigns={completedCampaigns} 
                                        scheduledCampaigns={scheduledCampaigns}
                                        inProgessCampaigns={inProgessCampaigns}
                                        previewCardData={(data, type) => this.previewCard(data, type)}
                                        actionModal={this.handleModalAction}
                                    />
                                    <ScheduledTab scheduledCampaigns={scheduledCampaigns}
                                        previewData={(data, type) => this.previewCard(data, type)}
                                        actionModal={this.handleModalAction}
                                    />
                                    <InProgressTab inProgessCampaigns={inProgessCampaigns}
                                        previewData={(data, type) => this.previewCard(data, type)}
                                        actionModal={this.handleModalAction}
                                    />
                                    <CompletedTab completedCampaigns={completedCampaigns}
                                        previewData={(data, type) => this.previewCard(data, type)}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-5 col-md-12">
                                <div className="campaign-previewer">
                                    <Scrollbars style={{ height: "500px" }}>
                                        <div id="testDiv2" className="scrollbar">
                                            {this.showCampaignPreview()}
                                        </div>
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                 <div className="tab-pane fade show active" id="campaigns-content" role="tabpanel" 
                        aria-labelledby="campaigns-content-tab">
                            <CampaignForm 
                            showCampaignForm={this.handleCampaignForm}
                            campaignContactList={campaignContactList}
                            callTemplates={this.handlecallTemplates}
                            smsTemplates={smsTemplates}
                            emailTemplates={emailTemplates}
                            openContactList={this.openContactListForm}
                            getRequestForRecurrence={this.handleGetRecurrence}
                            recurrenceTypes={recurrenceTypes}
                            getCampaignData={(data) => this.getCampaignData(data)}
                            >
                            </CampaignForm>
                 </div> 
                )}
            </React.Fragment>
        )
    }
}

export default CampaignList;
