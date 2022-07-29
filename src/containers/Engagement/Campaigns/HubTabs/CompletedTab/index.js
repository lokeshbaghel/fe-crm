import React from "react";
import _ from "lodash";
import $ from 'jquery'

import { Scrollbars } from 'react-custom-scrollbars';
import SmallLogo from '../../../../../assets_crm/img/small-logo.jpg';
import {displayRecordNotFound, stripStyleTag} from '../../../../../utils/helper';


class CompletedTab extends React.Component {
    /**method to render all the completed campaigns */
    campaignHtml = (completedCampaigns, checkCondition) => {
        if(!_.isEmpty(completedCampaigns)){
            return(
                completedCampaigns.map((campaign,index) => {
                    return(
                        <div className="col-lg-4 col-md-6 col-sm-6 mb-3" key={index}>
                            <div className="thumb-wrap">
                                <a className={`card-click ${(index === 0 && checkCondition) ? 'active' : ''}`} onClick={(event) => this.handleClick(event,index)} style={{'cursor' : 'pointer'}}>
                                    <div className="thumb-header">
                                        <span className="date">{campaign.campaignDate || ''}</span>
                                        <span className="date">{campaign.campaignTime || ''}</span>
                                    </div>
                                    <div className="thumb-mid">
                                        {/* <div className="mid-logo"><img src={SmallLogo} /></div> */}
                                        {/* <h2>Dear {campaign.userName || ''}</h2> */}
                                        <div className="short-seperator"></div>
                                        <div dangerouslySetInnerHTML={{__html: stripStyleTag(campaign.templateText) || ''}}></div>
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
                <div className="col-12">
                    {displayRecordNotFound('No Completed Campaigns')}
                </div>
            )
        }
    }

    /**method to pass selected data for preview and append active class to clicked card */
    handleClick = (event, index) => {
        var tabLink = document.querySelectorAll(".card-click");
        tabLink.forEach(function (item) {
            item.classList.remove("active");
        });
        
        event.target.closest('a').classList.add("active");
        this.props.previewData(index, 'completed');
    }

    render() {
        const {completedCampaigns, combinedData, showActive} = this.props;
        
        return (
            <React.Fragment>
                {!combinedData ? 
                    <div className="tab-pane fade" id="completed-content" role="tabpanel" aria-labelledby="completed-content-tab">
                        <Scrollbars style={{ height: "547px" }}>
                            <div className="scrollbar">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Completed </h2>
                                    </div>
                                </div>

                                <div className="row">
                                    {this.campaignHtml(completedCampaigns, true)}
                                </div>
                            </div>
                        </Scrollbars>
                    </div>
                : this.campaignHtml(completedCampaigns, showActive)}
            </React.Fragment>
        )
    }
}

export default CompletedTab;