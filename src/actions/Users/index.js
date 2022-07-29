import api from '../../axios';
import handleHttpError,{displaySuccessMessage, requestTokenHeader} from '../../utils/helper';

/* action for fetching records */
export const fetchUsersData = (params) => {
    return async dispatch => {
        dispatch({ type: 'USER_REQUEST' });
        try {
            const response = await api.get('user',{
                params  : params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'USER_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'USER_FAILURE'});
        }
    }
}


/* action resetting dashboard list data */
export const resetUserData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_USER_DATA' });
    }
}

/* action for fetching user dependant records */
export const fetchUserEditFormDependantData = (id) => {
    return async dispatch => {
        dispatch({ type: 'FETCH_USER_EDIT_FORM_REQUEST' });
        try {
            const response = await api.get("user/"+id, {
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'FETCH_USER_EDIT_FORM_SUCCESS', payload : response.data.data});
            }

        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'FETCH_USER_EDIT_FORM_FAILURE'});
        }
    }
}


/* action for submitting user record */
export const submitUserFormData = (id, postData) => {
    return async dispatch => {
        dispatch({ type: 'SUBMIT_USER_FORM_REQUEST' });
        try {
            const response = await api.put(`user/${id}`, postData , {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_USER_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data);
                dispatch(fetchUsersData())
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_USER_FORM_FAILURE'});
        }
    }
}

export const csvUsersData = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_ALL_USERS_REQUEST' });
        try {
            const response = await api.get('getAllUsers', {
                params  : params,
                headers : requestTokenHeader(),
            });
            if (response.data.success) {
                dispatch({ type : 'GET_ALL_USERS_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ALL_USERS_FAILURE'});
        }
    }
}
