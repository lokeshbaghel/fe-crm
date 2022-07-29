
import React from "react";
import _ from 'lodash';
import $ from 'jquery';
import { Scrollbars } from "react-custom-scrollbars";

import { displayErrorMessage, displayRecordNotFound, stripStyleTag, history } from '../../utils/helper';

const CampaignTemplate = (data) => {
    return (
        <div className="preview-content">
            {/* <div className="small-logo"><img src={SmallLogo} /></div> */}
            {/* <h2>Dear {data.userName}</h2> */}
            <div className="short-seperator"></div>
            <div dangerouslySetInnerHTML={{__html: stripStyleTag(data.templateText)}}></div>
        </div>
    )
}

const ContactPreview = (props, data) => {
    /**method to toggle campaign */
    function handleTableToggle(){
        $(".contact-list-table tr:nth-child(n+2)").toggle();
        $(".collapse-table").toggleClass("active");     
    }

    /**method to call parent delete method */
    function handleDeleteCampaign(props, data){
        if(data.campaignExists){
            displayErrorMessage('This list cannot be deleted as campaigns are associated with it')
            return false;
        } else {
            props.deleteContact(data.contactId);
        }
    }

    /**method to call parent edit method */
    function handleEditCampaign(props, data){
        if(data.campaignExists){
            displayErrorMessage('This list cannot be edited as campaigns are associated with it')
            return false;
        } else {
            history.push(`/engagement/lists/edit/${data.contactId}`)
        }
    }

    /**method to call parent delete method to remove person from list */
    function handleDeletePerson(props, personId){
        props.deleteContactPerson(personId)
    }

    return (
        <>
            <div className="row">
                <div className="col-lg-4 col-md-12">
                    <h3>{data.contactName}</h3>
                </div>
                <div className="col-lg-8 col-md-12 d-flex justify-content-end">
                    <div className="del-edit-container">
                        <a className="btn btn-primary red-border-btn" onClick={() => handleDeleteCampaign(props, data)}>Delete</a>
                        <a className="btn btn-primary black-border-btn" onClick={() => handleEditCampaign(props, data)}>Add More Contacts</a>
                    </div>
                </div>
            </div>
  
            {(() => {
                if (!_.isEmpty(data.campaignData)) {
                    return(
                        <>
                            <h2 className="table-heading">Latest campaigns on this list</h2>
                            <table className="table contact-list-table" id="collapseExample">
                                <thead>
                                    <tr>
                                        <th>Campaign name</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                        <th>Creation date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.campaignData.map((campaign, index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{campaign.campaignName}</td>
                                                <td>{campaign.campaignType}</td>
                                                <td>{campaign.campaignStatus}</td>
                                                <td>{campaign.campaignCreation}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <div className="table-collapse-btn mb-3">
                                <button className="collapse-table" onClick={handleTableToggle}>Enlarge Campaign History 
                                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                                </button>
                            </div> 
                        </>    
                    )
                } else {
                    return displayRecordNotFound('No campaigns added to this contact list');
                }
            })()}
  
                 
            {(() => {
                if (!_.isEmpty(data.personData)) {
                    return(
                        <>
                            <h2 className="table-heading">List total contacts ({data.contactCount})</h2>
                            <Scrollbars style={{ height: "300px" }}>
                                <div id="testDiv7" className="scrollbar">
                                    <table className="table contact-list-table-second">
                                        <thead>
                                            <tr>
                                                <th>Enquirer name</th>
                                                <th>Agency</th>
                                                <th>Stage</th>
                                                <th>Contact Attempts</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.personData.map((person, index) => (
                                                <tr key={index}>
                                                    <td>{person.personName}</td>
                                                    <td>{person.agencyName}</td>
                                                    <td>{person.stageName}</td>
                                                    <td>{person.contactAttempts}</td>
                                                    <td>
                                                        <i className="fa fa-trash" 
                                                            style={{"cursor" : "pointer"}}
                                                            onClick={() => handleDeletePerson(props, person.contactPersonId)}
                                                        ></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Scrollbars>
                        </>    
                    )
                } else {
                    return displayRecordNotFound('No persons added to this contact list');
                }
            })()}
        </>
    )
}

export default CampaignTemplate;

export {
    ContactPreview
}