import api from '../../axios';
import handleHttpError,{displaySuccessMessage, requestTokenHeader} from '../../utils/helper';

/* Action for get account details */
export const getAccountSearchLists = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_ACCOUNT_SEARCH_DETAIL_REQUEST' });
        try {
            const response = await api.get('fetchGlobalSearch', {
                params  : params,
                headers : requestTokenHeader()
            });
            if (response.data.success) {
                dispatch({ type : 'GET_ACCOUNT_SEARCH_DETAIL_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ACCOUNT_SEARCH_DETAIL_FAILURE'});
        }
    }
}

//Actions for account wise user details
export const getAccountUserLists = () => {
    return async dispatch => {
        dispatch({ type: 'GET_ACCOUNT_USER_DETAIL_REQUEST' });
        try {
            const response = await api.get('reports', {
                headers : requestTokenHeader()
            });
            if (response.data.success) {
                dispatch({ type : 'GET_ACCOUNT_USER_DETAIL_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ACCOUNT_USER_DETAIL_FAILURE'});
        }
    }
}

//Actions for store column list
export const storeColumnList = (postData) => {
    return async dispatch => {
        dispatch({ type: 'GET_ACCOUNT_COLUMN_LIST_REQUEST' });
        try {
            const response = await api.post('store/columnList', postData , {
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'STORE_COLUMN_LIST_DETAIL_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
          
            debugger
            handleHttpError(error.response);
            dispatch({ type: 'STORE_ACCOUNT_COLUMN_LIST_FAILURE'});
        }
    } 
}

//Actions for store column list
export const getColumnList = (postData) => {
    return async dispatch => {
        dispatch({ type: 'GET_ACCOUNT_COLUMN_LIST_REQUEST' });
        try {
            const response = await api.post('get/columnList', postData , {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'GET_COLUMN_LIST_DETAIL_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ACCOUNT_COLUMN_LIST_FAILURE'});
        }
    } 
}

//Actions for get column list
export const getColumnDropdownList = (postData) => {
    return async dispatch => {
        dispatch({ type: 'GET_ACCOUNT_COLUMN_DROPDOWN_LIST_REQUEST' });
        try {
            const response = await api.post('get/agGrid/columnDropdownList', postData , {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'GET_COLUMN_DROPDOWN_LIST_DETAIL_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ACCOUNT_COLUMN_DROPDOWN_LIST_FAILURE'});
        }
    } 
}

//Actions for delete column list record
export const deleteColumnListRecord = (postData) => {
    return async dispatch => {
        dispatch({ type: 'DELETE_ACCOUNT_COLUMN_DROPDOWN_LIST_REQUEST' });
        try {
            const response = await api.post('delete/agGrid/deleteColumnList', postData , {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'DELETE_COLUMN_DROPDOWN_LIST_DETAIL_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'DELETE_ACCOUNT_COLUMN_DROPDOWN_LIST_FAILURE'});
        }
    } 
}


