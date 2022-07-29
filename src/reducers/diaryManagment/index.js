export function diaryManagement(state = [], action) {
    switch (action.type) {
        /* cases for listing of dashboard starts */
        case 'DIARY_MGT_REQUEST':
            return {
                activities          : [],
                calenderList        : [],
                agencyfilterResult  : [],
                dueCallCount        : 0,
                blocking            : true
            };
        
        case 'DIARY_MGT_SUCCESS':
            return {
                activities          : action.payload.activityList,
                calenderList        : action.payload.calenderList,
                agencyfilterResult  : action.payload.agencyfilterResult,
                dueCallCount        : action.payload.dueCallCount,
                blocking            : false
            };
        
        case 'DIARY_MGT_FAILURE':
            return {
                blocking            : false,
                calenderList        : [],
                activities          : [],
                agencyfilterResult  : [],
                dueCallCount        : 0,
            };

        /* cases for updating start time and status */
        case 'DIARY_MGT_ACTIVITY_UPDATE_REQUEST':
            return {
                ...state,
                blocking    : true
            };
        
        case 'DIARY_MGT_ACTIVITY_UPDATE_SUCCESS':
            return {
                ...state,
                blocking    : false
            };
        
        case 'DIARY_MGT_ACTIVITY_UPDATE_FAILURE':
            return {
                ...state,
                blocking    : false,
            };

        case 'RESET_DIARY_MGT_DATA':
            return []; 
        
        /* Cases for get activity details */
        case 'GET_ACTIVITY_REQUEST':
            return {
                blocking    : true,
                activity_id: null,
                user_id: null,
                status_id: null,
                unsuccessful_reason: []
            };

        case 'GET_ACTIVITY_SUCCESS':
            return {
                blocking    : false,
                activity_id: action.payload.activity.id,
                user_id: action.payload.activity.user_id,
                status_id: action.payload.activity.status_id,
                unsuccessful_reason: action.payload.unsuccessful_reason
            };
        
        case 'GET_ACTIVITY_FAILURE':
            return {
                blocking    : false,
                activity_id: null,
                user_id: null,
                status_id: null,
                unsuccessful_reason: []
            };

        /* Cases for Update Call  */
        case 'CALL_UPDATE_REQUEST':
            return {
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

        case 'CALENDER_LIST_REQUEST':
                return {
                    ...state,
                    calenderList:[],
                    blocking    : true,
                };
            
        case 'CALENDER_LIST_SUCCESS':
                return {
                    ...state,
                    calenderList  : action.payload,
                    blocking    : false
                };

        case 'CALENDER_LIST_FAILURE':
                return {
                    calenderList:[],
                    blocking    : false
                };
        
        /* Cases for marketing tab details */
        case 'GET_MARKETING_TAB_REQUEST':
            return {
                blocking                : true,
                accountMarketingData    : [],
                marketingSourceData     : [],
                enquiryResponseData     : []
            };

        case 'GET_MARKETING_TAB_SUCCESS':
            return {
                blocking                : false,
                accountMarketingData    : action.payload.accountMarketingData,
                marketingSourceData     : action.payload.marketingSourceData,
                enquiryResponseData     : action.payload.enquiryResponseData,
            };
        
        case 'GET_MARKETING_TAB_FAILURE':
            return {
                blocking                : false,
                accountMarketingData    : [],
                marketingSourceData     : [],
                enquiryResponseData     : []
            };

        /* Cases for Progess Items List */
        case 'GET_PROGRESS_ITEMS_REQUEST':
            return {
                blocking: true,
                progressItems: []
            };

        case 'GET_PROGRESS_ITEMS_SUCCESS':
            return {
                blocking: false,
                progressItems: action.payload
            };

        case 'GET_PROGRESS_ITEMS_FAILURE':
            return {
                blocking: false,
                progressItems: []
            };

         /* cases for Filter for Attempts */
         case 'DIARY_MGT_FILTER_ATTEMPT_REQUEST':
            return {
                activities          : [],
                calenderList        : [],
                agencyfilterResult  : [],
                blocking            : true,
                dueCallCount        : 0
            };
        
        case 'DIARY_MGT_FILTER_ATTEMPT_SUCCESS':
            return {
                blocking            : false,
                activities          : action.payload.activityList,
                calenderList        : action.payload.calenderList,
                agencyfilterResult  : action.payload.agencyfilterResult,
                dueCallCount        : action.payload.dueCallCount,
            };
        
        case 'DIARY_MGT_FILTER_ATTEMPT_FAILURE':
            return {
                blocking            : false,
                calenderList        : [],
                agencyfilterResult  : [],
                activities          : [],
                dueCallCount        : 0
            };

        default:
            return state;
    }
}