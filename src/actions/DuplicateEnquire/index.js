import api from '../../axios';
import handleHttpError, { requestTokenHeader, displaySuccessMessage } from '../../utils/helper';


/* action for fetching records */
export const getDuplicateEnqData = (params) => {
    return async (dispatch)=> {
        dispatch({ type: 'DUPLICATE_ENQUIRE_REQUEST' });
        try {
            const response = await api.get(`account/duplicate?search=${params.search}`,{
                headers : requestTokenHeader()
            });
            if (response.data.success) {
                dispatch({ type : 'DUPLICATE_ENQUIRE_SUCCESS', payload : response.data.data});
                dispatch(getDuplicateDataCount());
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DUPLICATE_ENQUIRE_FAILURE'});
        }
    }
}

/**
 * Action for all cases for Duplicate Records
 */
 export const actionForDuplicate = (params) => {
    return async dispatch => {
        dispatch({ type: 'DUPLICATE_RECORD_ACTION_REQUEST' });
        try {
            const response = await api.post('account/actionForDuplicate',
                params ,
                {headers : requestTokenHeader()}
                );
            if (response.data.success) {
                dispatch(getDuplicateEnqData());
                dispatch({ type : 'DUPLICATE_RECORD_ACTION_SUCCESS' });
                displaySuccessMessage(response.data.data);
            }
        } catch (error){
            handleHttpError(error.response);
            dispatch({ type: 'DUPLICATE_RECORD_ACTION_FAILURE'});
        }
    }

 }

 
export const getDuplicateDataCount = () => {
    return async (dispatch,getState ) => {
        try {
            const response = await api.get(`account/duplicateCount`, {
                headers : requestTokenHeader()
            });
            if (response.data.success) {                
                dispatch({ 
                    type : 'DUPLICATE_ENQUIRY_COUNT_SUCCESS',
                    payload: response.data.data,
                });     
                let duplicateCount = Object.assign(
                        {},
                        getState().authenticatedUser,
                        {
                            duplicateCount: response.data.data.duplicateCount
                        }
                    );
                    dispatch({ type : 'DUPLICATE_ENQUIRY_SUCCESS', payload : duplicateCount }); 
            }
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DUPLICATE_ENQUIRY_COUNT_FAILURE' });
        }
    }

}