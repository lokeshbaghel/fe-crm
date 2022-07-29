export function users(state = [], action) {
    switch (action.type) {
        /* cases for listing of dashboard starts */
        case 'USER_REQUEST':
            return {
                userList         : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                blocking        : true,
                genderType      : [],
                csvUsers        : [], 
            };
        
        case 'USER_SUCCESS':
            return {
                userList        : action.payload.user,
                totalRecords    : action.payload.paginationData.total,
                per_page        : action.payload.paginationData.per_page,
                currentPage     : action.payload.paginationData.current_page,
                blocking        : false,
                genderType      : action.payload.genderOptions,
                csvUsers        : action.payload.csvUsers, 
            };
        
        case 'USER_FAILURE':
            return {
                userList        : [],
                totalRecords    : 0,
                per_page        : 0,
                currentPage     : 1,
                blocking        : false,
                genderType      : [],
                csvUsers        : [], 
            };

        case 'RESET_USER_DATA':
            return [];        
        
        /* cases for edit form starts */
        case 'FETCH_USER_EDIT_FORM_REQUEST':
            return {
                ...state,
                roles       : [],
                user        : [],
                permissions : [],
                blocking    : true
            };
        
        case 'FETCH_USER_EDIT_FORM_SUCCESS':
            return {
                ...state,
                roles       : action.payload.roleData,
                permissions : action.payload.permissionData,
                user        : action.payload.user,
                blocking    : false
            };
        
        case 'FETCH_USER_EDIT_FORM_FAILURE':
            return {
                ...state,
                roles       : [],
                user        : [],
                permissions : [],
                blocking : false,
            };
        
        
        /* cases for submit form starts */
        case 'SUBMIT_USER_FORM_REQUEST':
            return {
                blocking : true
            };
        
        case 'SUBMIT_USER_FORM_SUCCESS':
            return {
                blocking : false
            };
        
        case 'SUBMIT_USER_FORM_FAILURE':
            return {
                blocking : false,
            };

        default:
            return state;
    }
}