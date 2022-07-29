import React from "react";
import _ from "lodash";

import { Scrollbars } from "react-custom-scrollbars";
import SmallLogo from "../../../../../assets_crm/img/small-logo.jpg";
import {displayRecordNotFound} from '../../../../../utils/helper';
import doticon from '../../../../../assets_crm/img/dot-icons.png';
import StopCampaignModal from '../../../Modals/StopCampaign';

class index extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        showStopCampaingModal: false,
        campaign_id:'',
      };
   }
    handleClick = (event, index) => {
        var tabLink = document.querySelectorAll(".card-click");
        tabLink.forEach(function (item) {
            item.classList.remove("active");
        });
        
        event.target.closest('a').classList.add("active");
        this.props.previewData(index, 'inprogress');
    }
    toggleStopCampaingModal = (value,param) => {
      if(typeof value == "boolean"){
            this.setState({ showStopCampaingModal:value, campaign_id:param });
      }else{
         const params={}; 
         if(param){
         params.campaignId = parseInt(value);
         const type = 'stopCampaign';
         this.props.actionModal(type,params);
         }
         this.setState({ showStopCampaingModal:false ,campaign_id:''});
      }
    }
       
  campaignHtml = (inProgessCampaigns, checkCondition,campaign_id,showStopCampaingModal) => {
    if(!_.isEmpty(inProgessCampaigns)){
        return(
            inProgessCampaigns.map((campaign, index) => {
                return(
                    <div className="col-lg-4 col-md-6 col-sm-6 mb-3" key={campaign.campaign_id}>
                            <div className="thumb-wrap">
                              <div className="custom-toggle">
                                          <span className="custom-toggle-btn"><img src={doticon} /></span>
                                          <div className="cutom-toggle-content">
                                              <ul>

                                              <li onClick={() => this.toggleStopCampaingModal(true,campaign.campaign_id)} >
                                                Stop
                                              </li>
                                              {
                                                (campaign_id==campaign.campaign_id && showStopCampaingModal) ? <StopCampaignModal camp_id={campaign_id}  canShow={showStopCampaingModal} updateModal={(data) => this.toggleStopCampaingModal(campaign_id,data) } /> :''
                                              }    
                                              </ul>
                                          </div>
                                </div>
                                <a className={`card-click ${(index === 0 && checkCondition) ? 'active' : ''}`} onClick={(event) => this.handleClick(event,index)}>
                                <div className="thumb-header">
                                    <span className="date">{campaign.campaignDate || ''}</span>
                                    <span className="date">{campaign.campaignTime || ''}</span>
                                </div>
                                <div className="thumb-mid">
                                    {/* <div className="mid-logo"><img src={SmallLogo} /></div> */}
                                    {/* <h2>Dear {campaign.userName || ''}</h2> */}
                                    <div className="short-seperator"></div>
                                    {campaign.templateText || ''}
                                </div>
                                <div className="thumb-footer">
                                    <h3>{campaign.campaignName || ''}</h3>
                                    <p>{campaign.contactName || ''}</p>
                                </div>
                                </a>
                            </div>
                         
                        </div>
                )
            })
        )
    } else{
        return (
            <div className="col-12 mb-3">
                {displayRecordNotFound('No In Progress Campaigns')}
            </div>
        )
    }
  };
  render() {
    const {inProgessCampaigns, allView, showActive} = this.props;
    const {showStopCampaingModal,campaign_id}=this.state;
    return (
      <React.Fragment>
          {!allView ? 
        <div
          className="tab-pane fade"
          id="inprogress-content"
          role="tabpanel"
          aria-labelledby="inprogress-content-tab"
        >
          <Scrollbars style={{ height: "547px" }}>
            <div id="testDiv6" className="scrollbar">
              <div className="row">
                <div className="col-md-12">
                  <h2>In Progress</h2>
                </div>
              </div>

              <div className="row">
                  {this.campaignHtml(inProgessCampaigns, true,campaign_id,showStopCampaingModal)}
              </div>
            </div>
          </Scrollbars>
        </div>
        : this.campaignHtml(inProgessCampaigns, showActive, campaign_id, showStopCampaingModal)}
      </React.Fragment>
    );
  }
}

export default index;
