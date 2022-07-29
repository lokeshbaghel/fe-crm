export function dashboard(state = [], action) {
    switch (action.type) {
        /* cases for listing of dashboard starts */
        case 'DASHBOARD_REQUEST':
            return {
                data            : [],
                paginationData  : {},
                totalRecords    : 0,
                per_page        : 0,
                blocking        : true
            };
        
        case 'DASHBOARD_SUCCESS':
            return {
                data            : action.payload.data,
                paginationData  : action.payload,
                totalRecords    : action.payload.total,
                per_page        : action.payload.per_page,
                blocking        : false
            };
        
        case 'DASHBOARD_FAILURE':
            return {
                blocking : false,
            };

        case 'RESET_DASHBOARD_DATA':
            return [];        

        default:
            return state;
    }
}