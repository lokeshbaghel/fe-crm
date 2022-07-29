import api from '../../axios';
import handleHttpError,{requestTokenHeader, displaySuccessMessage, history, decryptObject} from '../../utils/helper';

/* Action for get Engagement Hub Records */
export const getAllEmailCampaign = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_CAMPAIGN_LIST_REQUEST' });
        try {
            const response = await api.get('engagement/campaigns', {
                params  : params,
                headers : requestTokenHeader()
            });

            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_CAMPAIGN_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_CAMPAIGN_LIST_FAILURE'});
        }
    }
}

/* Action for get Engagement Hub InProgess Records */
export const getInProgessCampaigns = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_IN_PROGRESS_CAMPAIGN_REQUEST' });
        try {
            const response = await api.get('engagement/getInProgressCampaignTabData', {
                params  : params,
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_IN_PROGRESS_CAMPAIGN_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_IN_PROGRESS_CAMPAIGN_FAILURE'});
        }
    }
}

/* Action for get Engagement Hub Scheduled Records */
export const getScheduleCampaigns = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_SCHEDULED_CAMPAIGN_REQUEST' });
        try {
            const response = await api.get('engagement/getScheduledCampaignTabData', {
                params  : params,
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_SCHEDULED_CAMPAIGN_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_SCHEDULED_CAMPAIGN_FAILURE'});
        }
    }
}

/* Action for get Engagement Hub Completed Records */
export const getCompletedCampaigns = () => {
    return async dispatch => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_COMPLETED_CAMPAIGN_REQUEST' });
        try {
            const response = await api.get('engagement/getCompletedCampaigns', {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_COMPLETED_CAMPAIGN_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_COMPLETED_CAMPAIGN_FAILURE'});
        }
    }
}

/* Action for get Engagement Hub STOP Campaign Records */
export const stopCampaignsInProgess = (params) => {
    return async (dispatch,getState) => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_STOP_REQUEST' });
        try {
            const response = await api.post('engagement/inProgressCampaignStop',params, {
                headers : requestTokenHeader()
            });
            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_STOP_SUCCESS', payload : response.data});
                if(response.data.data){
                   dispatch(getAllEmailCampaign());
                   displaySuccessMessage("Campaign move to completed stage");
                }
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_STOP_FAILURE'});
        }
    }
}

/**
 * Action fro Delete Campaign 
 */
 export const deleteCampaign = (params) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_CAMPAIGN_REQUEST' });
        try {
            // const response = await api.post('engagement/deleteCampaign', params, {
            //     headers : requestTokenHeader()
            // });

            const id = params.campaign_id;
            const userId = params.user_id;
            const response = await api.delete(`engagement/campaigns/${id}?user_id=${userId}`, {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                const filteredScheduledCampaigns =  getState().engagementHub.scheduledCampaigns.filter(campaign => campaign.campaign_id !== params.campaign_id);
                const payloadData = {}
                payloadData.scheduledRecordsArray = filteredScheduledCampaigns

                let defaultPreview = {}
                if(filteredScheduledCampaigns.length > 0){
                    defaultPreview.userName = filteredScheduledCampaigns[0].userName
                    defaultPreview.templateHtml = filteredScheduledCampaigns[0].templateText
                }

                payloadData.defaultCampaign = defaultPreview;

                dispatch({ type : 'GET_ENGAGEMENT_HUB_SCHEDULED_SUCCESS', payload : payloadData});
                displaySuccessMessage(response.data.data);
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_CAMPAIGN_FAILURE'});
        }
    }
}

/**
 * Action for get all list
 */
 export const getEmailTemplates = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_EMAIL_TEMPLATE_REQUEST' });
        try {

            const response = await api.get('engagement/getEmailTemplates', {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_EMAIL_TEMPLATE_SUCCESS', payload : response.data.data});
            } 

        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_EMAIL_TEMPLATE_FAILURE'});
        }
    }
 }

 /**
 * Action to get sms list templates
 */
  export const getSmsTemplateList = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_SMS_TEMPLATE_REQUEST' });
        try {

            const response = await api.get('engagement/getSmsTemplates', {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_SMS_TEMPLATE_SUCCESS', payload : response.data.data});
            } 

        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_SMS_TEMPLATE_FAILURE'});
        }
    }
 }

 /**
  * Get List and Recurrance Type
  */
  export const getRecurrenceContactList = () => {

    return async dispatch => {
        dispatch({ type: 'GET_RECURRENCE_AND_LIST_REQUEST' });
        try {

            const response = await api.get('engagement/getRecurrenceContactList', {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_RECURRENCE_AND_LIST_SUCCESS', payload : response.data.data});
            } 

        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_RECURRENCE_AND_LIST_FAILURE'});
        }
    }

  }

/**
 * Create Campaign using email/sms
*/
export const createCampaign = (params) => {
    return async dispatch => {
        dispatch({ type: 'CREATE_CAMPAIGN_REQUEST' });
        try {
            const response = await api.post('engagement/campaigns',params, 
            {
                headers : requestTokenHeader()
            });
            
            if (response.data.success) {
                dispatch({ type : 'CREATE_CAMPAIGN_SUCCESS', payload : response.data.data});
                displaySuccessMessage(response.data.data);
                dispatch(getAllEmailCampaign());
                history.push(`/engagement`)
            } 

        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'CREATE_CAMPAIGN_FAILURE'});
        }
    }
}

/**
 * Get Campaign Record with related type templates for Edit Campaign
 */
export const getCampaign = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_CAMPAIGN_REQUEST' });
        try {
            const response = await api.post(`engagement/getCampaign`, params, {
                headers : requestTokenHeader()
            });

            if (response.data.success) {
                dispatch({ type : 'GET_CAMPAIGN_SUCCESS', payload : response.data.data});
            }

        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_CAMPAIGN_FAILURE'});
        }
    }
}

/**
 * Update Campaign Action
 */
export const updateCampaign = (data) => {
    return async dispatch => {
        dispatch({ type: 'UPDATE_CAMPAIGN_REQUEST' });
        try {
            // const response = await api.post('engagement/updateCampaign', data, 
            // {
            //     headers : requestTokenHeader()
            // });
            const id = data.id;
            const response = await api.put(`engagement/campaigns/${id}`, data, 
            {
                headers : requestTokenHeader()
            });

            if (response.data.success) {
                dispatch({ type : 'UPDATE_CAMPAIGN_SUCCESS', payload : response.data.data});
                displaySuccessMessage(response.data.data);
                history.push(`/engagement`)
            } 

        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'UPDATE_CAMPAIGN_FAILURE'});
        }
    }
}

/**
  * Send Instant Email Campaign Action
*/
export const sendInstantEmailAndSmsCampaign = (data) => {
    return async dispatch => {
        dispatch({ type: 'SEND_INSTANT_EMAIL_CAMPAIGN_REQUEST' });
        try {

            let url = `engagement/campaign/sendInstantEmailCampaign/${data.campaign_id}`;
            if(data.campaign_type == 'sms')
                url = `engagement/campaign/sendMessage/${data.campaign_id}`;

            const response = await api.get(url , 
            {
                headers : requestTokenHeader()
            });

            if (response.data.success) {
                dispatch({ type : 'SEND_INSTANT_EMAIL_CAMPAIGN_SUCCESS', payload : response.data.data});
                displaySuccessMessage(response.data.data);
            } 

        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'SEND_INSTANT_EMAIL_CAMPAIGN_FAILURE'});
        }
    }
}

/******************* ACTIONS RELATED TO ENGAGEMENT HUB LISTS TAB *************************/
/* action for getting engagement hub list tab records */
export const getContactListsTabData = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_CONTACT_LIST_REQUEST' });
        try {
            const response = await api.get('engagement/lists', {
                params  : params,
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_CONTACT_LIST_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_CONTACT_LIST_FAILURE'});
        }
    }
}

/* action for getting engagement hub list tab create form enquirers record */
export const getContactListsCreateFormData = () => {
    return async dispatch => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_CONTACT_LIST_CREATE_REQUEST' });
        try {
            const response = await api.get('engagement/lists/create', {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_CONTACT_LIST_CREATE_SUCCESS', payload : decryptObject(response.data.data)});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_CONTACT_LIST_CREATE_FAILURE'});
        }
    }
}

/* action for getting engagement hub list tab edit form record */
export const getContactListsEditFormData = (id) => {
    return async dispatch => {
        dispatch({ type: 'GET_ENGAGEMENT_HUB_CONTACT_LIST_EDIT_REQUEST' });
        try {
            const response = await api.get(`engagement/lists/${id}`, {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                dispatch({ type : 'GET_ENGAGEMENT_HUB_CONTACT_LIST_EDIT_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ENGAGEMENT_HUB_CONTACT_LIST_EDIT_FAILURE'});
        }
    }
}

/* action for submitting engagement hub list tab create form data */
export const submitContactListsFormData = (id, params) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_ENGAGEMENT_HUB_CONTACT_LIST_FORM_REQUEST' });
        try {
            let response;
            if(id) {
                response = await api.put(`engagement/lists/${id}`, params, {
                    headers : requestTokenHeader()
                });
            } else {
                response = await api.post('engagement/lists', params, {
                    headers : requestTokenHeader()
                });
            }    
           
            if (response.data.success) {
                displaySuccessMessage(response.data.data);
                dispatch({ type : 'SUBMIT_ENGAGEMENT_HUB_CONTACT_LIST_FORM_SUCCESS'});
               
                /**below should execute based on id i.e. when called for adding or updating */
                if(id)
                    history.push('/engagement', { from: 'editList' })
                else
                    dispatch(getContactListsTabData());
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_ENGAGEMENT_HUB_CONTACT_LIST_FORM_FAILURE'});
        }
    }
}

/** action to Delete List Records */
export const deleteContactList = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'DELETE_CONTACT_LIST_REQUEST' });
        try {
            const response = await api.delete(`engagement/lists/${id}`, {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                const updatedContactList =  getState().engagementHub.contactLists.filter(list => list.contactId !== id);
                dispatch({ type : 'DELETE_CONTACT_LIST_SUCCESS', payload : updatedContactList});
                displaySuccessMessage(response.data.data);
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_CONTACT_LIST_FAILURE'});
        }
    }
}

/** action to Delete List Records */
export const deleteContactPerson = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'DELETE_PERSON_FROM_CONTACT_LIST_REQUEST' });
        try {
            const response = await api.get(`engagement/lists/deletePerson/${id}`, {
                headers : requestTokenHeader()
            });
           
            if (response.data.success) {
                displaySuccessMessage(response.data.data)
                dispatch({ type : 'DELETE_PERSON_FROM_CONTACT_LIST_SUCCESS'})
                dispatch(getContactListsTabData());
            }
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_CONTACT_LIST_FAILURE'});
        }
    }
}

/* action resetting data */
export const resetEngagementHubData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_ENGAGEMENT_HUB_DATA' });
    }
}