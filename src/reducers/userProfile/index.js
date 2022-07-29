export function userProfile(state = [], action) {
    switch (action.type) {
        /* cases for user profile */
        case 'USER_PROFILE_REQUEST':
            return {
                userProfile     : null,
                blocking        : true
        };
        case 'USER_PROFILE_SUCCESS':
            return {
                userProfile     : action.payload,
                blocking        : false
        };
        case 'USER_PROFILE_FAILURE':
            return {
                userProfile     : null,
                blocking        : false
        };

         /* cases for listing of dashboard starts */
        case 'USER_UPDATE_PASSWORD_REQUEST':
            return {
                ...state,
                changePassoword     : null,
                blocking        : true
        };
        case 'USER_UPDATE_PASSWORD_SUCCESS':
            return {
                ...state,
                changePassoword     : action.payload,
                blocking        : false
        };
        case 'USER_UPDATE_PASSWORD_FAILURE':
            return {
                ...state,
                changePassoword     : null,
                blocking        : false
        };

        case 'RESET_PASSWORD_CHANGE':
            return {
                ...state,
                changePassoword : null,
                blocking        : false
            }

        default:
            return state;
    }
}