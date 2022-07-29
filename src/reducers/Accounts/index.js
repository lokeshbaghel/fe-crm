import { data } from "jquery";

export function accounts(state = [], action) {
    switch (action.type) {

        /* Cases for get account Search */
        case 'GET_ACCOUNT_SEARCH_DETAIL_REQUEST':
            return {
                blocking : true,
                accountSearchList  : [],
            };

        case 'GET_ACCOUNT_SEARCH_DETAIL_SUCCESS':
            return {
                blocking  : false,
                accountSearchList  :action.payload.searchResult,
            };
        
        case 'GET_ACCOUNT_SEARCH_DETAIL_FAILURE':
            return {
                blocking  : false,
                accountSearchList  : [],
            };

        // case for get account user details 
        case 'GET_ACCOUNT_USER_DETAIL_REQUEST':
            return {
                blocking : true,
                isAccountUserRecordsFetched: false,
                accountsUserList  : [],
            };

        case 'GET_ACCOUNT_USER_DETAIL_SUCCESS':
            return {
                blocking  : false,
                isAccountUserRecordsFetched: true,
                accountsUserList  : action.payload,
            };
        
        case 'GET_ACCOUNT_USER_DETAIL_FAILURE':
            return {
                blocking  : false,
                isAccountUserRecordsFetched: false,
                accountsUserList  : [],
            };

        case 'STORE_ACCOUNT_COLUMN_LIST_REQUEST':
        case 'STORE_ACCOUNT_COLUMN_LIST_FAILURE':
            return {
                blocking  : false,
                getDataWithNewColumnList  : false,
                getUpdateColumnDropdownList: false
            };
        case 'STORE_COLUMN_LIST_DETAIL_SUCCESS':
            return {
                blocking  : false,
                getDataWithNewColumnList  : action.payload,
                getUpdateColumnDropdownList: true
            };  
            
        
        case 'GET_COLUMN_LIST_DETAIL_SUCCESS':
            return {
                blocking  : false,
                isDynamicListValue: true,
                getColumnList  : action.payload,
            };
        case 'GET_ACCOUNT_COLUMN_LIST_REQUEST':
        case 'GET_ACCOUNT_COLUMN_LIST_FAILURE':
            return {
                blocking  : false,
                isDynamicListValue: false,
                getColumnList  : [],
            };
        case 'GET_COLUMN_DROPDOWN_LIST_DETAIL_SUCCESS':
            return {
                blocking  : false,
                isColumnDropdownList: true,
                getColumnDropdownList  : action.payload,
            };
        case 'GET_ACCOUNT_COLUMN_DROPDOWN_LIST_REQUEST':
        case 'GET_ACCOUNT_COLUMN_DROPDOWN_LIST_FAILURE':
            return {
                blocking  : false,
                isColumnDropdownList: false,
                getColumnDropdownList  : [],
            };
        case 'DELETE_COLUMN_DROPDOWN_LIST_DETAIL_SUCCESS':
            return {
                blocking  : false,
                isDeleteColumnListRecord: true,
                getUpdatedColumnDropdownList  : action.payload,
            };
        case 'DELETE_ACCOUNT_COLUMN_DROPDOWN_LIST_REQUEST':
        case 'DELETE_ACCOUNT_COLUMN_DROPDOWN_LIST_FAILURE':
            return {
                blocking  : false,
                isDeleteColumnListRecord: false,
                getUpdatedColumnDropdownList  : [],
            };


          
            

        default:
            return state;
    }
}