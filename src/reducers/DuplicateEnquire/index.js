export function duplicateEnquire(state = [], action) {
    
    switch(action.type){
        /* cases for listing of dashboard starts */
        case 'DUPLICATE_ENQUIRE_REQUEST':
            return {
                ...state,
                duplicateEnquire  : [],
                blocking          : true
            };
        
        case 'DUPLICATE_ENQUIRE_SUCCESS':
            return {
                ...state,
                duplicateEnquire  : action.payload,
                blocking          : false
            };
        
        case 'DUPLICATE_ENQUIRE_FAILURE':
            return {
                ...state,
                blocking          : false,
                duplicateEnquire  : [],
                
            };
        
        case 'DUPLICATE_RECORD_ACTION_REQUEST':
            return {
                ...state,
                blocking          : true
            };

        case 'DUPLICATE_RECORD_ACTION_SUCCESS':
            return {
                ...state,
                blocking          : false
            };

        case 'DUPLICATE_RECORD_ACTION_FAILURE':
            return {
                ...state,
                blocking          : false
            };

        case 'DUPLICATE_ENQUIRY_COUNT_SUCCESS':
            return {
                ...state,
                duplicateCount         : action.payload.duplicateCount
            };
        case 'DUPLICATE_ENQUIRY_COUNT_FAILURE':
            return {
                ...state,
                duplicateCount         : null
            };

        default:
            return state;    
    }

}