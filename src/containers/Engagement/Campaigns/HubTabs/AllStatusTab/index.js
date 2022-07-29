import React from "react";
import _ from "lodash";
import { Scrollbars } from 'react-custom-scrollbars';

import CompletedTab from "../CompletedTab";
import ScheduledTab from "../ScheduledTab";
import InProgressTab from "../InProgressTab";

class AllStatus extends React.Component {
    /**method to pass data for preview of card */
    handlePreview = (data, type) => {
        this.props.previewCardData(data, type);
    }

    handleModalAction = (type, data) => {
        this.props.actionModal(type, data)
    }

    render() {
        const {completedCampaigns, scheduledCampaigns, inProgessCampaigns,stopCampaigns} = this.props;
       
        let showInProgressActive, showScheduledActive, showCompletedActive = false;
        if(_.size(scheduledCampaigns) > 0)
            showScheduledActive = true;
        else if(_.size(inProgessCampaigns) > 0)
            showInProgressActive = true;
        else if(_.size(completedCampaigns) > 0)
            showCompletedActive = true;
        
        return (
            <div className="tab-pane fade show active" id="all-content" role="tabpanel" aria-labelledby="all-content-tab">
                <Scrollbars style={{ height: "547px" }}>
                    <div id="testDiv5" className="scrollbar">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="black-text">Scheduled </h2>
                            </div>
                        </div>

                        <div className="row">
                               <ScheduledTab 
                                    scheduledCampaigns={scheduledCampaigns} 
                                    hideDefaultView={true}
                                    previewData={(data, type) => this.handlePreview(data, type)}
                                    actionModal={this.handleModalAction}
                                    showActive={showScheduledActive}
                                />
                        </div>

                        <div className="in-progress">	
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="black-text">In Progress</h2>
                                </div>
                            </div>

                            <div className="row">
                                <InProgressTab 
                                    inProgessCampaigns={inProgessCampaigns} 
                                    allView={true} 
                                    previewData={(data, type) => this.handlePreview(data, type)} 
                                    actionModal={this.handleModalAction}
                                    showActive={showInProgressActive}
                                />
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="black-text">Completed </h2>
                            </div>
                        </div>

                        <div className="row">
                            <CompletedTab completedCampaigns={completedCampaigns} combinedData={true} 
                                        previewData={(data, type) => this.handlePreview(data, type)}
                                        showActive={showCompletedActive}
                            />
                        </div>
                    </div>
                </Scrollbars>
            </div>
        )
    }
}

export default AllStatus;