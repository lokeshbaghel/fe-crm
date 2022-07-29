import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import {displayRecordNotFound} from '../../../../../utils/helper';

import SmallLogo from "../../../../../assets_crm/img/small-logo.jpg";
import doticon from '../../../../../assets_crm/img/dot-icons.png';
import DeleteCampaignModal from "../../../Modals/DeleteCampaign"
import SendCampaignModal from "../../../Modals/SendCampaignModal"

class ScheduledTab extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showModal: false,
      selectedCampaignIdForDelete: '',
      selectedCampaignIdForSend: ''
    }
  }
  
  handleClick = (event, index) => {
    var tabLink = document.querySelectorAll(".card-click");
    tabLink.forEach(function (item) {
        item.classList.remove("active");
    });
      
    event.target.closest('a').classList.add("active");
    this.props.previewData(index,'scheduled');
}  

  //Handle modal to show/hide
  toggleModal = (type, show, campaign_id) => {
    if(type == "delete")
        this.setState({showModal: show, selectedCampaignIdForDelete: campaign_id, selectedCampaignIdForSend: ''}) 

    if(type == "send")
      this.setState({showModal: show, selectedCampaignIdForSend: campaign_id, selectedCampaignIdForDelete: ''})
  }

  //Handle modal Actions to call API by passing data to parent component
  handleModalAction = (data) => {

      if(data.campaign_type == 'delete'){
        const type = 'deleteCampaign';
        this.props.actionModal(type, data);
        this.setState({showModal: false, selectedCampaignIdForDelete: ''});
      }
    
      if(data.campaign_type == 'email' || (data.campaign_type == 'sms')){
        const type = 'sendCampaign';
        this.props.actionModal(type, data);
        this.setState({showModal: false, selectedCampaignIdForSend: ''});
      }
      
    
  }

  campaignHtml = (campaignData, checkCondition, selectedCampaignIdForDelete, showModal, selectedCampaignIdForSend) => {
    if(!_.isEmpty(campaignData)){
    return campaignData.map((campaign,key) => {
      return (
        <div className="col-lg-4 col-md-6 col-sm-6 mb-3" key={campaign.campaign_id}>
        
          <div className="thumb-wrap">
            <div className="custom-toggle">
              <span className="custom-toggle-btn"><img src={doticon} /></span>
              <div className="cutom-toggle-content">
                  <ul>
                      {/* <li><button className="btn campaign-li-btn" onClick={() => this.toggleModal('send', true, campaign.campaign_id)}>Send Now</button></li> */}
                      <li> 
                           <Link to={`/engagement/campaign/${campaign.campaign_id}`}>Edit</Link>
                      </li>
                      <li><button className="btn campaign-li-btn" onClick={() => this.toggleModal('delete', true, campaign.campaign_id)}>Delete</button></li> 
                  </ul>
                  { (selectedCampaignIdForDelete == campaign.campaign_id && (showModal)) ? <DeleteCampaignModal campaign={campaign} canShow={showModal} handleModal={(data) => this.toggleModal('delete', data, campaign.campaign_id)} modalAction={(data) => this.handleModalAction(data)} /> : '' }
                  { (selectedCampaignIdForSend == campaign.campaign_id && (showModal)) ? <SendCampaignModal campaign={campaign} canShow={showModal} handleModal={(data) => this.toggleModal('send', data, campaign.campaign_id)} modalAction={(data) => this.handleModalAction(data)} /> : '' }
              </div>
            </div>
            <a className={`card-click ${(key === 0 && checkCondition) ? 'active' : ''}`} onClick={(event) => this.handleClick(event, key)} style={{'cursor' : 'pointer'}}>
              <div className="thumb-header">
                <span className="date">{campaign.campaignDate}</span> 
                <span className="date">{campaign.campaignTime}</span>
              </div>
              <div className="thumb-mid">
                {/* <div className="mid-logo">
                  <img src={SmallLogo} />
                </div> */}
                {/* <h2>Dear {campaign.userName}</h2> */}
                <div className="short-seperator"></div>
                {campaign.templateText}
              </div>
              <div className="thumb-footer">
                <h3>{campaign.campaignName}</h3>
                <p>{campaign.contactName}</p>
              </div>
            </a>
          </div>
       
        </div>
      );
    });
  }
  };
  render() {
    const { scheduledCampaigns, hideDefaultView, showActive } = this.props;
    const { selectedCampaignIdForDelete, showModal, selectedCampaignIdForSend } = this.state;
    return !hideDefaultView ? (
      <div
        className="tab-pane fade"
        id="scheduled-content"
        role="tabpanel"
        aria-labelledby="inprogress-content-tab"
      >
        <Scrollbars style={{ height: "547px" }}>
          <div id="testDiv6" className="scrollbar">
            <div className="row">
              <div className="col-md-12">
                <h2>Scheduled </h2>
              </div>
            </div>

            <div className="row">
              {!_.isEmpty(scheduledCampaigns)
                ? this.campaignHtml(scheduledCampaigns,true, selectedCampaignIdForDelete, showModal, selectedCampaignIdForSend)
                : <div className="col-12">
                    {displayRecordNotFound('No Scheduled Campaigns')}
                 </div>}
            </div>
          </div>
        </Scrollbars>
      </div>
    ) : !_.isEmpty(scheduledCampaigns) ? (
      this.campaignHtml(scheduledCampaigns,showActive, selectedCampaignIdForDelete, showModal, selectedCampaignIdForSend)
    ) : (
        <div className="col-12">
            {displayRecordNotFound('No Scheduled Campaigns')}
        </div>
    );
  }
}

export default ScheduledTab;
