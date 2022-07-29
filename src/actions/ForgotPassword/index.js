import axios from 'axios';

import handleHttpError, { history, API_URL, displaySuccessMessage } from '../../utils/helper';

export const sendForgetRequestEmail = (postData = {}) => {
    return async dispatch => {
        
        if (postData.passcode === undefined) {
            dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
            try {
                const res = await axios.post(API_URL + 'forgotpassword', postData);
                const response = res.data;
                if (response.success) {
                    dispatch({ type : 'FORGOT_PASSWORD_SUCCESS', payload : response.data});
                    displaySuccessMessage('OTP sent to your email');
                }
            } catch (err) {
                handleHttpError(err.response);
                dispatch({ type: 'FORGOT_PASSWORD_FAILURE' });
            }
        }else{
            dispatch({ type: 'OTP_PASSWORD_REQUEST' });
            try {
                const res = await axios.post(API_URL + 'forgotpasswordSubmit', postData);
                const response = res.data;
                if (response.success) {
                    dispatch({ type : 'OTP_PASSWORD_SUCCESS', payload : response.data});
                    displaySuccessMessage('Password updated succesfully');
                    history.push('/');
                }
            } catch (err) {
                handleHttpError(err.response);
                dispatch({ type: 'OTP_PASSWORD_FAILURE' });
            }
        }
    }
}

/* action resetting data */
export const resetForgetPasswordData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_FORGET_PASSWORD' });
    }
}