import api from '../../axios';
import handleHttpError, {displaySuccessMessage, requestTokenHeader} from '../../utils/helper';

/* action for fetching lead dependant records */
export const fetchLeadAddFormDependantData = () => {
    return async dispatch => {
        dispatch({ type: 'FETCH_LEAD_ADD_FORM_REQUEST' });
        try {
            const response = await api.get("/lead/create",{
                headers : requestTokenHeader(),
            });
            
            if (response.data.success)
                dispatch({ type : 'FETCH_LEAD_ADD_FORM_SUCCESS', payload : response.data.data});

        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'FETCH_LEAD_ADD_FORM_FAILURE'});
        }
    }
}

/* action for submitting lead record */
export const submitLeadFormData = (postData) => {
    return async (dispatch,getState ) => {
        dispatch({ type: 'SUBMIT_LEAD_FORM_REQUEST' });
        try {
            const response = await api.post('lead', postData , {
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {
                dispatch({ type : 'SUBMIT_LEAD_FORM_SUCCESS'});
                displaySuccessMessage(response.data.data);
                dispatch(getDuplicateDataCount());                 
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'SUBMIT_LEAD_FORM_FAILURE'});
        }
    }
}

export const hideLeadModal = () => {
    return async dispatch => {
        dispatch({ type: 'HIDE_LEAD_MODAL' });
    }
}

/* action resetting lead data */
export const resetLeadData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_LEAD_DATA' });
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
                    type : 'ADD_LEAD_DUPLICATE_ENQUIRY_SUCCESS',
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
            dispatch({ type: 'ADD_LEAD_DUPLICATE_ENQUIRY_FAILURE' });
        }
    }

}