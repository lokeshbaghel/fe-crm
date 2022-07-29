import { getEmailTemplates } from "../../actions/EngagementHub";

export function engagementHub(state = [], action) {
    switch (action.type) {

        /* Cases for getting engagement hub default data */
        case 'GET_ENGAGEMENT_HUB_CAMPAIGN_LIST_REQUEST':
            return {
                ...state,
                blocking            : true,
                inProgessCampaigns  : [],
                scheduledCampaigns  : [],
                completedCampaigns  : [],
            };

        case 'GET_ENGAGEMENT_HUB_CAMPAIGN_LIST_SUCCESS':
            return {
                ...state,
                blocking            : false,
                inProgessCampaigns  : action.payload.inProgressCampaigns.inProgressRecordsArray,
                scheduledCampaigns  : action.payload.scheduledCampaigns.scheduledRecordsArray,
                completedCampaigns  : action.payload.completedCampaigns.campaignData,
            };
        
        case 'GET_ENGAGEMENT_HUB_CAMPAIGN_LIST_FAILURE':
            return {
                ...state,
                blocking            : false,
                inProgessCampaigns  : [],
                scheduledCampaigns  : [],
                completedCampaigns  : [],
            };
        
         /* Cases for getting engagement hub In Progress data */
        case 'GET_ENGAGEMENT_HUB_IN_PROGRESS_CAMPAIGN_REQUEST':
            return {
                ...state,
                blocking                : true,
                inProgessCampaigns      : []
            };
    
        case 'GET_ENGAGEMENT_HUB_IN_PROGRESS_CAMPAIGN_SUCCESS':
            return {
                ...state,
                blocking                : false,
                inProgessCampaigns      : action.payload.inProgressRecordsArray,
                scheduledCampaigns      : [],
                completedCampaigns      : [],
            };
            
        case 'GET_ENGAGEMENT_HUB_IN_PROGRESS_CAMPAIGN_FAILURE':
            return {
                ...state,
                blocking                : false,
                inProgessCampaigns      : []
            };
        
         /* Cases for getting engagement hub Scheduled data */
         case 'GET_ENGAGEMENT_HUB_SCHEDULED_CAMPAIGN_REQUEST':
            return {
                ...state,
                blocking            : true,
                scheduledCampaigns  : []
            };

        case 'GET_ENGAGEMENT_HUB_SCHEDULED_CAMPAIGN_SUCCESS':
            return {
                ...state,
                blocking            : false,
                scheduledCampaigns  : action.payload.scheduledRecordsArray,
                inProgessCampaigns  : [],
                completedCampaigns  : [],
            };
        
        case 'GET_ENGAGEMENT_HUB_SCHEDULED_CAMPAIGN_FAILURE':
            return {
                ...state,
                blocking            : false,
                scheduledCampaigns  : []
            };
        
        /* Cases for getting engagement hub COMPLETED data */
         case 'GET_ENGAGEMENT_HUB_COMPLETED_CAMPAIGN_REQUEST':
            return {
                ...state,
                blocking            : true,
                completedCampaigns  : []
            };

        case 'GET_ENGAGEMENT_HUB_COMPLETED_CAMPAIGN_SUCCESS':
            return {
                ...state,
                blocking            : false,
                completedCampaigns  : action.payload.campaignData,
                inProgessCampaigns  : [],
                scheduledCampaigns  : [],
            };
        
        case 'GET_ENGAGEMENT_HUB_COMPLETED_CAMPAIGN_FAILURE':
            return {
                ...state,
                blocking            : false,
                completedCampaigns  : []
            };
            
        /* cases for getting engagement hub contact list tab data */
        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_REQUEST':
            return {
                ...state,
                blocking                : true,
                contactLists            : [],
            };

        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_SUCCESS':
            return {
                ...state,
                blocking                : false,
                contactLists            : action.payload.contactList,
            };
        
        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_FAILURE':
            return {
                ...state,
                blocking                : false,
                contactLists            : [],
            }; 
        
        /* cases for getting engagement hub contact list tab create form data */
        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_CREATE_REQUEST':
            return {
                ...state,
                blocking                : true,
                enquirerLists           : [],
            };

        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_CREATE_SUCCESS':
            return {
                ...state,
                blocking                : false,
                enquirerLists           : action.payload,
            };
        
        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_CREATE_FAILURE':
            return {
                ...state,
                blocking                : false,
                enquirerLists           : [],
            };
        
        /* cases for getting engagement hub contact list tab edit form data */
        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_EDIT_REQUEST':
            return {
                ...state,
                blocking                : true,
                editContactListRecord   : {}
            };

        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_EDIT_SUCCESS':
            return {
                ...state,
                blocking                : false,
                editContactListRecord   : action.payload.contactList
            };
        
        case 'GET_ENGAGEMENT_HUB_CONTACT_LIST_EDIT_FAILURE':
            return {
                ...state,
                blocking                : false,
                editContactListRecord   : {}
            };
        
        /* cases for submitting engagement hub contact list form data */
        case 'SUBMIT_ENGAGEMENT_HUB_CONTACT_LIST_FORM_REQUEST':
            return {
                blocking    : true,
            };

        case 'SUBMIT_ENGAGEMENT_HUB_CONTACT_LIST_FORM_SUCCESS':
            return {
                blocking    : false,
            };
        
        case 'SUBMIT_ENGAGEMENT_HUB_CONTACT_LIST_FORM_FAILURE':
            return {
                blocking    : false,
            };

        /* Delete Contact List RECORDS FROM engagement hub   */
        case 'DELETE_CONTACT_LIST_REQUEST':
            return {
                ...state,
                blocking    : true
            };

        case 'DELETE_CONTACT_LIST_SUCCESS':
          return {
                ...state,
                blocking        : false,
                contactLists    : action.payload
            };
        
        case 'DELETE_CONTACT_LIST_FAILURE':
            return {
                ...state,
                blocking    : false
            }; 
        
        /* Cases for stop engagement hub campaign  */
        case 'GET_ENGAGEMENT_HUB_STOP_REQUEST':
            return {
                ...state,
                blocking            : true
            };

        case 'GET_ENGAGEMENT_HUB_STOP_SUCCESS':
          return {
                ...state,
                blocking  : false
            };
        
        case 'GET_ENGAGEMENT_HUB_STOP_FAILURE':
            return {
                ...state,
                blocking            : false
            }; 
        
        /* Cases for Delet Campaign */
        case 'DELETE_CAMPAIGN_REQUEST':
            return {
                ...state,
                blocking                    : true,
            };

        case 'DELETE_CAMPAIGN_SUCCESS':
            return {
                ...state,
                blocking                    : false,
            };

        case 'DELETE_CAMPAIGN_FAILURE':
            return {
                ...state,
                blocking                    : false,
            };
        
              /* Cases for get Email Templates and contact list */
        case 'GET_ENGAGEMENT_HUB_SCHEDULED_SUCCESS':
            return {
                ...state,
                blocking                    : false,
              //  emailTemplates              : []
            }; 


        /* Cases for get Email Templates and contact list */
        case 'GET_EMAIL_TEMPLATE_REQUEST':
            return {
                ...state,
                blocking                    : true,
                emailTemplates              : []
            }; 

        case 'GET_EMAIL_TEMPLATE_SUCCESS':
            return {
                ...state,
                blocking                    : false,
                emailTemplates              : action.payload.emailTemplates
            }; 

        case 'GET_EMAIL_TEMPLATE_FAILURE':
            return {
                ...state,
                blocking                    : false,
                emailTemplates              : []
            }; 
        
        /* Cases for get SMS Templates */
        case 'GET_SMS_TEMPLATE_REQUEST':
                return {
                    ...state,
                    blocking                : true,
                    smsTemplates            : []
                }; 
    
        case 'GET_SMS_TEMPLATE_SUCCESS':
                return {
                    ...state,
                    blocking                : false,
                    smsTemplates            : action.payload.smsTemplates,
                }; 
    
        case 'GET_SMS_TEMPLATE_FAILURE':
                return {
                    ...state,
                    blocking                : false,
                    smsTemplates            : []
                };     
        
        case 'GET_RECURRENCE_AND_LIST_REQUEST':
            return {
                ...state,
                blocking                    : true,
                campaignContactList         : [],
                recurrenceTypes             : []
            }; 

        case 'GET_RECURRENCE_AND_LIST_REQUEST':
            return {
                ...state,
                blocking                    : true,
                campaignContactList         : [],
                recurrenceTypes             : []
            }; 

        case 'GET_RECURRENCE_AND_LIST_SUCCESS':
            return {
                ...state,
                blocking                    : false,
                campaignContactList         : action.payload.CotactListData,
                recurrenceTypes             : action.payload.recurrenceTypeData
            }; 
        case 'GET_RECURRENCE_AND_LIST_FAILURE':
            return {
                ...state,
                blocking                    : false,
                campaignContactList         : [],
                recurrenceTypes             : []
            };
        
         /* Cases for Create Campaign */
        case 'CREATE_CAMPAIGN_REQUEST':
            return {
                ...state,
                blocking                    : true,
            };

        case 'CREATE_CAMPAIGN_SUCCESS':
            return {
                ...state,
                blocking                    : false,
            };

        case 'CREATE_CAMPAIGN_FAILURE':
            return {
                ...state,
                blocking                    : false,
            };
        
        /* Cases for Get Campaign Record */
        case 'GET_CAMPAIGN_REQUEST':
            return {
                blocking                    : true,
                campaign                    : {},
                emailTemplates              : [],
                smsTemplates                : [],
                campaignContactList         : [],
                recurrenceTypes             : []

            }; 
        
        case 'GET_CAMPAIGN_SUCCESS':
            return {
                blocking                    : false,
                campaign                    : action.payload.campaign,
                emailTemplates              : action.payload.emailTemplates,
                smsTemplates                : action.payload.smsTemplates,
                campaignContactList         : action.payload.CotactListData,
                recurrenceTypes             : action.payload.recurrenceTypeData

            };

        case 'GET_CAMPAIGN_SUCCESS':
            return {
                blocking                    : true,
                campaign                    : {},
                emailTemplates              : [],
                smsTemplates                : [],
                campaignContactList         : [],
                recurrenceTypes             : []


            };

        case 'UPDATE_CAMPAIGN_REQUEST':
            return {
                ...state,
                blocking                    : true,
            };

        case 'UPDATE_CAMPAIGN_SUCCESS':
            return {
                ...state,
                blocking                    : false,
            };

        case 'UPDATE_CAMPAIGN_FAILURE':
            return {
                ...state,
                blocking                    : false,
            };

        case 'SEND_INSTANT_EMAIL_CAMPAIGN_REQUEST':
            return {
                ...state,
                blocking                    : true,
            };

        case 'SEND_INSTANT_EMAIL_CAMPAIGN_SUCCESS':
            return {
                ...state,
                blocking                    : false,
            };
        
        case 'SEND_INSTANT_EMAIL_CAMPAIGN_FAILURE':
            return {
                ...state,
                blocking                    : false,
            };

        /**case for resetting engagement store data */
        case 'RESET_ENGAGEMENT_HUB_DATA':
            return []; 

        /**Delete Person from Contact List*/
        case 'DELETE_PERSON_FROM_CONTACT_LIST_REQUEST':
            return {
                ...state,
                blocking    : true
            };

        case 'DELETE_PERSON_FROM_CONTACT_LIST_SUCCESS':
          return {
                ...state,
                blocking        : false,
            };
        
        case 'DELETE_PERSON_FROM_CONTACT_LIST_FAILURE':
            return {
                ...state,
                blocking    : false
            }; 
        
        default:
            return state;
    }
}