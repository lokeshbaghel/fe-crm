import axios from 'axios';
import api from '../../axios';
import handleHttpError, { API_URL, displaySuccessMessage, loginRedirect } from '../../utils/helper';
import Constant from '../../utils/constants';

/**
 * Check user is unsubscribe, to make unsubscribe
 */
export const unsubscribeUser = (postData = {}) => {

    return async dispatch => {

        dispatch({ type: 'UNSUBSCRIBE_REQUEST' });

        try {

            const response = await api.post(API_URL + `isUnsubscribed`, postData, {
                headers : {'Authorization': Constant['UNSUBSCRIBE_ACCESS_API_KEY'] }
            });
            
            if (response.data.success) { 
                dispatch({ type : 'UNSUBSCRIBE_SUCCESS', payload: response.data.data});
                if((postData.is_unsubscribe) && response.data.data.is_unsubscribe == postData.is_unsubscribe)
                    displaySuccessMessage(response.data.data.message);
            }
        
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'UNSUBSCRIBE_FAILURE' });
        }
    }
}