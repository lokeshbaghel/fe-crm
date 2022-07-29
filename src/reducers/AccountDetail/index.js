export function accountDetail(state = [], action) {
    
    switch (action.type) {
        /* Cases for get account details */
        case 'GET_ACCOUNT_DETAIL_REQUEST':
            return {
                blocking                    : true,
                activity_id                 : null,
                user_id                     : null,
                status_id                   : null,
                unsuccessful_reason         : [],
                applicantsInfo              : [],
                applicantsCount             : 0,
                accountName                 : '',
                accountHistory              : [],
                accountAgencyName           : '',
                activityHistory             : [],
                CampaigRecordsData          : [],
                agencyList                  : [],
                account_status              : null,
                account_closeReason         :null,
                is_post_to_charms           : null,
                marketing_tab               : null,
                post_hold_to_charms         : null,
                close_requestors            : null,
                close_reasons               : null,
                hold_reasons                : null,
                callTypes                   : null,
                genderTypeList              : [],
                religionList                : [],
                ethnicOriginList            : [],
                nationalityList             : [],
                marketingSourceList         : [],
                sexualOrientationList       : [],
                personTitleList             : [],
                PreferredContactTimeData    : [],
              //  personInfo                  : [],
                FosteringHistoryData        : [],
                FosteringPreferenceData     : [],
                RelationshipStatusData      : [],
                CountryData                 : [],
                CurrentSituationData        : [],
                RelationshipData            : [],
                LocalAuthorityData          : [],                
                LanguageData                : [],
                CallTypeData                : [],  
                OccupationData              : [],  
                listIEFormData              : []  
            };

            case 'GET_LINK_ACCOUNT_DETAIL_REQUEST':
                return {
                    ...state,
                    blocking                    : true,
                    personInfo                  : [],
                 
                };
                
                
                case 'GET_LINK_ACCOUNT_DETAIL_SEARCH_REQUEST':
                    return {
                        ...state,
                        blocking                    : true,
                        personInfosearch            : [],
                    };
           

                case 'GET_LINK_ACCOUNT_DETAIL_SEARCH_SUCCESS':
                    return {
                        ...state,
                        blocking                    : false,
                        personInfosearch                 : action.payload.personInfo,
                     };
                

            case 'GET_LINK_ACCOUNT_DETAIL_SUCCESS':
                return {
                    ...state,
                    blocking                    : false,
                    personInfo                 : action.payload.personInfo,
                 };
            
            case 'GET_LINK_ACCOUNT_DETAIL_FAILURE':
                return {
                    ...state,
                    blocking                    : false,
                    personInfo              :[],
                };



        case 'GET_ACCOUNT_DETAIL_SUCCESS':
            return {
                blocking                    : false,
                activity_id                 : (action.payload.activity) ? action.payload.activity.id : null,
                user_id                     : (action.payload.activity) ? action.payload.activity.user_id : null,
                status_id                   : (action.payload.activity) ? action.payload.activity.status_id : null,
                unsuccessful_reason         : action.payload.unsuccessful_reason,
                applicantsInfo              : action.payload.personInfo,
                applicantsCount             : action.payload.personInfo.length,
                accountName                 : action.payload.accountName,
                accountHistory              : action.payload.accountHistoryInfo,
                accountAgencyName           : action.payload.accountAgencyName,
                activityHistory             : action.payload.activityHistory,
                CampaigRecordsData          : action.payload.CampaigRecordsData,
                agencyList                  : action.payload.agencyData,
                account_status              : action.payload.account_status,
                account_closeReason         : action.payload.account_closeReason,
                is_post_to_charms           : action.payload.is_post_to_charms,
                marketing_tab               : action.payload.marketing_consent,
                post_hold_to_charms         : action.payload.post_hold_to_charms,
                close_requestors            : action.payload.close_requestors,
                close_reasons               : action.payload.close_reasons,
                hold_reasons                : action.payload.hold_reasons,
                callTypes                   : action.payload.callTypes,
                genderTypeList              : action.payload.genderData,
                religionList                : action.payload.religionData,
                ethnicOriginList            : action.payload.ethnicOriginData,
                nationalityList             : action.payload.nationalityData,
                marketingSourceList         : action.payload.marketingSourceData,
                sexualOrientationList       : action.payload.sexualOrientationData,
                personTitleList             : action.payload.personTitleData,
                PreferredContactTimeData    : action.payload.PreferredContactTimeData,
             //   personInfo                  : action.payload.personInfo,
                FosteringHistoryData        : action.payload.FosteringHistoryData,
                FosteringPreferenceData     : action.payload.FosteringPreferenceData,
                RelationshipStatusData      : action.payload.RelationshipStatusData,
                CountryData                 : action.payload.CountryData,
                CurrentSituationData        : action.payload.CurrentSituationData,
                RelationshipData            : action.payload.RelationshipData,
                LocalAuthorityData          : action.payload.LocalAuthorityData,
                LanguageData                : action.payload.LanguageData,
                CallTypeData                : action.payload.CallTypeData,
                OccupationData              : action.payload.OccupationData,
                listIEFormData              :action.payload.listIEFormData
            };
        
        case 'GET_ACCOUNT_DETAIL_FAILURE':
            return {
                blocking                    : false,
                activity_id                 : null,
                user_id                     : null,
                status_id                   : null,
                unsuccessful_reason         : [],
                applicantsInfo              : [],
                applicantsCount             : 0,
                accountName                 : '',
                accountHistory              : [],
                accountAgencyName           : '',
                activityHistory             : [],
                CampaigRecordsData          : [],
                agencyList                  : [],
                account_status              : null,
                account_closeReason         : null,
                is_post_to_charms           : null,
                marketing_tab               : null,
                post_hold_to_charms         : null,
                close_requestors            : null,
                close_reasons               : null,
                hold_reasons                : null,
                callTypes                   : null,
                genderTypeList              : [],
                religionList                : [],
                ethnicOriginList            : [],
                nationalityList             : [],
                marketingSourceList         : [],
                sexualOrientationList       : [],
                personTitleList             : [],
                PreferredContactTimeData    : [],
              //  personInfo             : [],
                FosteringHistoryData        : [],
                FosteringPreferenceData     : [],
                RelationshipStatusData      : [],
                CountryData                 : [],
                CurrentSituationData        : [],
                RelationshipData            : [],
                LocalAuthorityData          : [],
                LanguageData                : [],
                CallTypeData                : [],
                OccupationData              : [],
                listIEFormData              : []
            };

        /* Cases for Update Call  */
        case 'CALL_UPDATE_REQUEST':
            return {

                blocking    : true
            };


            case 'CALL_UPDATE_ADDLINK_REQUEST':
                return {
                    ...state,
                    blocking    : true
                };
        case 'CALL_UPDATE_SUCCESS':
            return {
                blocking    : false
            };

        case 'CALL_UPDATE_FAILURE':
            return {
                blocking    : false
            };
        
        /* Cases for marketing tab details */
        case 'GET_MARKETING_TAB_REQUEST':
            return {
                ...state,
                blocking                : true,
                accountMarketingData    : [],
                accountData             : {}
            };

        case 'GET_MARKETING_TAB_SUCCESS':
            return {
                ...state,
                blocking                : false,
                accountMarketingData    : action.payload.accountMarketingData,
                accountData             : action.payload.accountData
            };
        
        case 'GET_MARKETING_TAB_FAILURE':
            return {
                ...state,
                blocking                : false,
                accountMarketingData    : [],
                accountData             : {}
            };

        /* Cases for record email marketing consent  */
        case 'UPDATE_MARKETING_CONSENT_REQUEST':
            return {
                ...state,
                blocking    : true
            };

        case 'UPDATE_MARKETING_CONSENT_SUCCESS':
            return {
                ...state,
                accountData : action.payload.updatedAccountData,
                marketing_tab : action.payload.marketing_consent,
                blocking    : false
            };

        case 'UPDATE_MARKETING_CONSENT_FAILURE':
            return {
                ...state,
                blocking    : false
            };
        
        case 'ADD_PROGRESS_ITEM_REQUEST':
            return {
                ...state,
                blocking    : true
            };
        
        case 'ADD_PROGRESS_ITEM_SUCCESS':
            return {
                ...state,
                blocking    : false
            };
        
        case 'ADD_PROGRESS_ITEM_FAILURE':
            return {
                ...state,
                blocking    : false
            };
        
        case 'GET_STAGE_PROGRESS_ITEMS_REQUEST':
            return {
                ...state,
                blocking    : true,
                stageProgressItems: [],
                progressItems: []
            };
        
        case 'GET_STAGE_PROGRESS_ITEMS_SUCCESS':
            return {
                ...state,
                blocking    : false,
                stageProgressItems: action.payload.stageProgressItems,
                progressItems: action.payload.ProgressItemsList
            };

        case 'GET_STAGE_PROGRESS_ITEMS_FAILURE':
            return {
                ...state,
                blocking    : false,
                stageProgressItems: [],
                progressItems: []
            };

        /* Cases for update person and its related information  */
        case 'PERSON_INFO_UPDATE_REQUEST':
            return {
                ...state,
                blocking    : true
            };

        case 'PERSON_INFO_UPDATE_SUCCESS':
            return {
                ...state,
                blocking    : false
            };

        case 'PERSON_INFO_UPDATE_FAILURE':
            return {
                ...state,
                blocking    : false
            };
        
        case 'ACTIVITY_UPDATE_REQUEST':
            return {
                ...state,
                blocking: true
            };

        case 'ACTIVITY_UPDATE_SUCCESS':
            return {
                ...state,
                blocking: false,
                user_id: action.payload.user_id,
                status_id: action.payload.status_id
            };
        
        case 'ACTIVITY_UPDATE_FAILURE':
            return {
                ...state,
                blocking: false
            };
        
        /* Cases for account agency */
        case 'SUBMIT_ACCOUNT_AGENCY_REQUEST':
            return {
                ...state,
                blocking    : true
            };

        case 'SUBMIT_ACCOUNT_AGENCY_SUCCESS':
            return {
                ...state,
                blocking    : false
            };

        case 'SUBMIT_ACCOUNT_AGENCY_FAILURE':
            return {
                ...state,
                blocking    : false
            }

        case 'ACCOUNT_UPDATE_REQUEST':
            return {
                ...state,
                blocking: true
            };

        case 'ACCOUNT_UPDATE_SUCCESS':
            return {
                ...state,
                blocking: false,
                account_status: action.payload.account_status,
                post_hold_to_charms: action.payload.post_hold_to_charms

            };
        
        case 'ACCOUNT_UPDATE_FAILURE':
            return {
                ...state,
                blocking: false
            };
        
        /* Cases for submitting account documents */
        case 'SUBMIT_ACCOUNT_DOCUMENT_REQUEST':
            return {
                ...state,
                blocking    : true
            };

        case 'SUBMIT_ACCOUNT_DOCUMENT_SUCCESS':
            return {
                ...state,
                blocking    : false
            };

        case 'SUBMIT_ACCOUNT_DOCUMENT_FAILURE':
            return {
                ...state,
                blocking    : false
            }
        
        /* Cases for documents tab details */
        case 'GET_DOCUMENT_TAB_REQUEST':
            return {
                ...state,
                blocking            : true,
                accountDocumentData : [],
                personeEnquiryData  : {},
            };

        case 'GET_DOCUMENT_TAB_SUCCESS':
            return {
                ...state,
                blocking            : false,
                accountDocumentData : action.payload.documentData,
                personeEnquiryData  : action.payload.personeEnquiryData,
            };
        
        case 'GET_DOCUMENT_TAB_FAILURE':
            return {
                ...state,
                blocking            : false,
                accountDocumentData : [],
                personeEnquiryData  : {},
            };

        case 'RESET_ACCOUNT_DETAIL_DATA':
            return []; 
        
           /* Cases for activity tab details */
        case 'GET_Activities_TAB_REQUEST':
            return {
                ...state,
                blocking                : true,
                activityHistory    : []
            }; 
        
        case 'GET_Activities_TAB_SUCCESS':
                return {
                    ...state,
                    blocking                : false,
                    activityHistory    : action.payload.activityHistory,
                    CampaigRecordsData   : action.payload.CampaigRecordsData
                };     
        
        case 'GET_Activities_TAB_FAILURE':
                return {
                      ...state,
                       blocking             : true,
                       activityHistory    : []
                    }; 
        case 'GET_DELETE_DOCUMENT_REQUEST':
            return {
                    ...state,
                    blocking             : true,                    
                };  
        case 'GET_DELETE_DOCUMENT_SUCCESS':
            return {
                    ...state,
                    blocking             : false,                   
                };  
        case 'GET_DELETE_DOCUMENT_FAILURE':
            return {
                    ...state,
                    blocking             : false,                    
                };  
                
                  // case for get Activity user details TK10135
        case 'SET_ACTIVITY_REQUEST_DATA':
            return {
                ...state,
                blocking : true,
                isActivityRecordsFetched: false,
                activityList  : [],
            };

        case 'SET_ACTIVITY_REQUEST_DATA_SUCCESS':
            return {
                ...state,
                blocking  : false,
                isActivityRecordsFetched: true,
                activityList  : action.payload,
            };
        
        case 'SET_ACTIVITY_REQUEST_DATA_FAILURE':
            return {
                ...state,
                blocking  : false,
                isActivityRecordsFetched: false,
                activityList  : [],
            };
        
        case 'GENERAL_FORM_TAB_DATA_REQUEST':
                return {
                    ...state,
                    blocking: true,
                    generalTab:[]
                };
        case 'GENERAL_FORM_TAB_DATA_SUCCESS':
                return {
                    ...state,
                    blocking: false,
                    generalTab:action.payload
                };
        case 'GENERAL_FORM_TAB_DATA_FAILURE':
                return {
                    ...state,
                    blocking: false,
                    generalTab:[]
                };
        case 'THE_HOME_TAB_DATA_REQUEST':
                return {
                    ...state,
                    blocking: true,
                    homeTab:[]
                };
        case 'THE_HOME_TAB_DATA_SUCCESS':
                return {
                    ...state,
                    blocking: false,
                    homeTab:action.payload
                };
        case 'THE_HOME_TAB_DATA_FAILURE':
                return {
                    ...state,
                    blocking: false,
                    homeTab:[]
                };
        case 'WORK_TAB_DATA_REQUEST':
                return {
                    ...state,
                    blocking: true,
                    workTab:[]
                };
        case 'WORK_TAB_DATA_SUCCESS':
                return {
                    ...state,
                    blocking: false,
                    workTab:action.payload
                };
        case 'WORK_TAB_DATA_FAILURE':
                return {
                    ...state,
                    blocking: false,
                    workTab:[]
                };
        case 'FOSTERING_TAB_DATA_REQUEST':
                    return {
                        ...state,
                        blocking: true,
                        fosteringTab:[]
                    };
        case 'FOSTERING_TAB_DATA_SUCCESS':
                return {
                    ...state,
                    blocking: false,
                    fosteringTab:action.payload
                };
        case 'FOSTERING_TAB_DATA_FAILURE':
                return {
                    ...state,
                    blocking: false,
                    fosteringTab:[]
                };
        case 'STATUORY_TAB_DATA_REQUEST':
                return {
                    ...state,
                    blocking: true,
                    statuoryTab:[]
                };
        case 'STATUORY_TAB_DATA_SUCCESS':
                return {
                    ...state,
                    blocking: false,
                    statuoryTab:[]
                };
        case 'STATUORY_TAB_DATA_FAILURE':
            return {
                ...state,
                blocking: false,
                statuoryTab:[]
            };
        case 'HEALTH_TAB_DATA_REQUEST':
                return {
                    ...state,
                    blocking: true,
                    healthTab:[]
                };
        case 'HEALTH_TAB_DATA_SUCCESS':
                return {
                    ...state,
                    blocking: false,
                    healthTab:[]
                };
        case 'HEALTH_TAB_DATA_FAILURE':
                return {
                    ...state,
                    blocking: false,
                    healthTab:[]
                };
        case 'AGENCY_VISIT_TAB_DATA_REQUEST':
                return {
                    ...state,
                    blocking: true,
                    agencyVisitTab:[]
                };
        case 'AGENCY_VISIT_TAB_DATA_SUCCESS':
            return {
                ...state,
                blocking: false,
                agencyVisitTab:[]
            };
        case 'AGENCY_VISIT_TAB_DATA_FAILURE':
            return {
                ...state,
                blocking: false,
                agencyVisitTab:[]
            };    
            
        case 'SET_CALL_ACTIVITY_REQUEST_DATA':
            return {
                ...state,
                blocking : true,
                isActivityRecordsFetched: false,
                activityList  : [],
            };

        case 'SET_CALL_ACTIVITY_REQUEST_DATA_SUCCESS':
            return {
                ...state,
                blocking  : false,
                isActivityRecordsFetched: true,
                activityList  : action.payload,
            };
        
        case 'SET_CALL_ACTIVITY_REQUEST_DATA_FAILURE':
            return {
                ...state,
                blocking  : false,
                isActivityRecordsFetched: false,
                activityList  : [],
            }; 




            case 'SET_TASK_ACTIVITY_REQUEST_DATA':
                return {
                    ...state,
                    blocking : true,
                    isActivityRecordsFetched: false,
                    activityList  : [],
                };
    
            case 'SET_TASK_ACTIVITY_REQUEST_DATA_SUCCESS':
                return {
                    ...state,
                    blocking  : false,
                    isActivityRecordsFetched: true,
                    activityList  : action.payload,
                };
            
            case 'SET_TASK_ACTIVITY_REQUEST_DATA_FAILURE':
                return {
                    ...state,
                    blocking  : false,
                    isActivityRecordsFetched: false,
                    activityList  : [],
                }; 
            
        case 'IE_FORM_DATA_REQUEST':
            return {
                ...state,
                blocking  : true,
                responceBack:[]
            };  
        case 'IE_FORM_DATA_SUCCESS':
            return {
                ...state,
                blocking  : false,
                responceBack  : action.payload
            };   
        case 'IE_FORM_DATA_FAILURE':
            return {
                ...state,
                blocking  : false,
                responceBack:[]
            };      
        
        case 'POST_CODE_AUTHORITY_REQUEST':
            return {
                ...state,
                blocking  : true,
                authority_id  : action.payload
            }; 
        case 'POST_CODE_AUTHORITY_SUCCESS':
            
            return {
                ...state,
                blocking  : false,
                authority_id  : action.payload
            };  
        case 'POST_CODE_AUTHORITY_FAILURE':
                return {
                    ...state,
                    blocking  : false,
                    authority_id  : '',
                };                  
             
        case 'CARER_REFERRAL_FORM_DATA_REQUEST':
            return {
                ...state,
                blocking  : true,
                dataResponce:[]
            };  
        case 'CARER_REFERRAL_FORM_DATA_SUCCESS':
            return {
                ...state,
                blocking  : false,
                dataResponce  : action.payload
            };   
        case 'CARER_REFERRAL_FORM_DATA_FAILURE':
            return {
                ...state,
                blocking  : false,
                dataResponce:[]
            };        
                  
        default:
            return state;
    }
}