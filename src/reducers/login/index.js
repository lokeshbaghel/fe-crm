import {getLoggedInUserData} from '../../utils/helper'; 

let user = getLoggedInUserData();
const initialState = user ? { user } : {};

export function authenticatedUser(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                user        : {},
                blocking    : true,
            };
        
        case 'LOGIN_SUCCESS':
            return {
                user        : action.payload,
                blocking    : false,
            };
        
        case 'LOGIN_FAILURE':
            return {
                user        : {},
                blocking    : false,
            };
            
        case 'LOGOUT_REQUEST':
            return {
                blocking    : true,
            };

        case 'LOGOUT_SUCCESS':
            return [];
        
        case 'LOGOUT_FAILURE':
            return {
                blocking    : false,
            };

        // for duplicate count
        case 'DUPLICATE_ENQUIRY_SUCCESS':
            return {
                ...state,
                duplicateCount         : action.payload.duplicateCount
            };
        
        case 'DUPLICATE_ENQUIRY_FAILURE':
            return {
                ...state,
                duplicateCount         : null
            };
        
        default:
            return state
    }
}