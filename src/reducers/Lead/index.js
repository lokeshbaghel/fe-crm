export function lead(state = [], action) {
    switch (action.type) {
        /* cases for add form starts */
        case 'FETCH_LEAD_ADD_FORM_REQUEST':
            return {
                marketingSources    : [],
                genderTypes         : [],
                agencies            : [],
                currentSituations   : [],
                leadBlocking        : true,
                showLeadForm        : false
            };
        
        case 'FETCH_LEAD_ADD_FORM_SUCCESS':
            return {
                marketingSources    : action.payload.marketSourceData,
                genderTypes         : action.payload.genderData,
                agencies            : action.payload.agencyData,
                currentSituations   : action.payload.currentSituationData,
                leadBlocking        : false,
                showLeadForm        : true
            };
        
        case 'FETCH_LEAD_ADD_FORM_FAILURE':
            return {
                marketingSources    : [],
                genderTypes         : [],
                agencies            : [],
                currentSituations   : [],
                leadBlocking        : false,
                showLeadForm        : false
            };

        /* cases for submit form starts */
        case 'SUBMIT_LEAD_FORM_REQUEST':
            return {
                ...state,
                leadBlocking : true,
                showLeadForm : true
            };
        
        case 'SUBMIT_LEAD_FORM_SUCCESS':
            return {
                leadBlocking : false,
                showLeadForm : false
            };
        
        case 'SUBMIT_LEAD_FORM_FAILURE':
            return {
                ...state,
                leadBlocking : false,
                showLeadForm : true
            };
        
        case 'HIDE_LEAD_MODAL':
            return {
                showLeadForm : false
            };
        
        case 'ADD_LEAD_DUPLICATE_ENQUIRY_SUCCESS':
            return {
                ...state,
                duplicateCount         : action.payload.duplicateCount
            };
        case 'ADD_LEAD_DUPLICATE_ENQUIRY_FAILURE':
            return {
                ...state,
                duplicateCount         : null
            };
        case 'RESET_LEAD_DATA':
            return []; 

        default:
            return state;
    }
}