import axios from 'axios';

import api from '../../axios';
import handleHttpError, { history, API_URL, loginRedirect, requestTokenHeader, decryptObject } from '../../utils/helper';
import Constants from '../../utils/constants';

export const login = (postData = {}, props) => {
    return async dispatch => {
        dispatch({ type: 'LOGIN_REQUEST' });
        try {
            const response = await axios.post(API_URL + 'login', postData);

            if (response.data.success) {
                const userData = decryptObject(response.data.data.user)
                dispatch({ type : 'LOGIN_SUCCESS', payload : userData});
                localStorage.setItem('data', response.data.data.user);
                localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken));
                const { from } = props?.location?.state || { from: { pathname: Constants['home_page'] } }
                history.push(from);
            }
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    }
}

/* action resetting logged user data */
export const resetLoggedUserData = (id) => {
    return async dispatch => {
        dispatch({ type: 'LOGOUT_REQUEST' });
        try {
            const response = await api.get(API_URL + `logout/${id}`, {
                headers : requestTokenHeader()
            });            
            if (response.data.success) {                
                dispatch({ type : 'LOGOUT_SUCCESS'});
                loginRedirect();
            }
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'LOGOUT_FAILURE' });
        }
    }
}

// function for getting duplicate enquiries data
export const getDuplicateEnquiryData = () => {
    return async dispatch => {
        try {
            const response = await api.get(API_URL + `account/duplicateCount`, {
                headers : requestTokenHeader()
            });
            if (response.data.success) {                
                dispatch({ 
                    type : 'DUPLICATE_ENQUIRY_SUCCESS',
                    payload: response.data.data,
                });                
            }
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DUPLICATE_ENQUIRY_FAILURE' });
        }
    }
}
