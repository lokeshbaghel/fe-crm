import api from '../../axios';
import handleHttpError, { displaySuccessMessage, requestTokenHeader, history } from '../../utils/helper';
import qs from 'qs';

/* action for fetching records */
export const fetchDiaryMgtData = (params) => {
    return async dispatch => {
        dispatch({ type: 'DIARY_MGT_REQUEST' });
        try {
            const response = await api.post('diaryManagementList',params,{
                headers : requestTokenHeader()
            });
            if (response.data.success) {
                dispatch({ type : 'DIARY_MGT_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DIARY_MGT_FAILURE'});
        }
    }
}


/* action resetting diary mgmt data */
export const resetDiaryMgtdData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_DIARY_MGT_DATA' });
    }
}


/* action for updating status and start time */
export const updateStartTimeandStatus = (id, params) => {
    return async dispatch => {
        dispatch({ type: 'DIARY_MGT_ACTIVITY_UPDATE_REQUEST' });
        try {
            const response = await api.post(`diaryManagement/updateStatusandTime`, params, {
                headers : requestTokenHeader()
            });
            
            if (response.data.success) {
                dispatch({ type : 'DIARY_MGT_ACTIVITY_UPDATE_SUCCESS', payload : response.data.data});
                history.push(`/account-details/${id}`)
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DIARY_MGT_ACTIVITY_UPDATE_FAILURE'});
        }
    }
}

/* action for Getting Attempt Based Filter Data */
export const getAttemptApiFilterData = (params={}) => {
    return async dispatch => {
        dispatch({ type: 'DIARY_MGT_FILTER_ATTEMPT_REQUEST' });
        try {
                const response = await api.post(`diaryManagementList`,params, {
                    headers : requestTokenHeader()
                });
                // const response = await api.get(`diaryManagementList-get`,  {
                //     params: {
                //       agency: params.data.activity_agency,
                //       attempt: params.data.activity_attempt
                //     },
                //     paramsSerializer: params => {
                //       return qs.stringify(params)
                //     },
                //     headers : requestTokenHeader()
                // }
                // );
            if (response.data.success) {
                dispatch({ type : 'DIARY_MGT_FILTER_ATTEMPT_SUCCESS', payload : response.data.data});
               // history.push(`/account-details/${id}`)
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DIARY_MGT_FILTER_ATTEMPT_FAILURE'});
        }
    }
}


/* action for delete calender records */
export const deleteCalenderRecord = (id,params,props) => {
    return async (dispatch,getState) => {
       // dispatch({ type: 'CALENDER_LIST_REQUEST' });
        try {
            const response = await api.post('deletecalenderlist/'+id,params,
            {
                headers : requestTokenHeader()
            });
          
            if (response.data.success) {
                    const updatedJobsList =  getState().diaryManagement.calenderList.filter(activity => activity.activity_id !== params.activity_id);
                    dispatch({ type : 'CALENDER_LIST_SUCCESS', payload : updatedJobsList});  
                    displaySuccessMessage("Schedule call sucessfully deleted")
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'CALENDER_LIST_FAILURE'});
        }
    }
}

/* Action for update call by successful or unsuccessful */
export const updateCall = (params) => {
    return async dispatch => {
        dispatch({ type: 'CALL_UPDATE_REQUEST' });
        try {
            const response = await api.post(`updateCall`, params, {
                headers : requestTokenHeader()
            });
            
            if (response.data.success) {
                dispatch({ type : 'CALL_UPDATE_SUCCESS', payload : response.data.data});
                history.push(`/diary-management`)
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'CALL_UPDATE_FAILURE'});
        }
    }
}

/* Action for get activity details */
export const getActvityDetails = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_ACTIVITY_REQUEST' });
        try {
            const response = await api.get(`getActivity/`+params, {
                headers : requestTokenHeader()
            });
            if (response.data.success) {
                dispatch({ type : 'GET_ACTIVITY_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_ACTIVITY_FAILURE'});
        }
    }
}

/* Action for get data related to marketing tab of activity details */
export const getMarketingTabData = (id, params={}) => {
    return async dispatch => {
        dispatch({ type: 'GET_MARKETING_TAB_REQUEST' });
        try {
            const response = await api.get(`account-detail/marketing/${id}`, {
                params  : params,
                headers : requestTokenHeader()
            });

            if (response.data.success) {
                dispatch({ type : 'GET_MARKETING_TAB_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_MARKETING_TAB_FAILURE'});
        }
    }
}

/**
 * Get Progress Items data for Add Progress Item popup
 */ 
 export const getProgressItems = () => {
    return async dispatch => {
        dispatch({ type: 'GET_PROGRESS_ITEMS_REQUEST' });
        try {
            const response = await api.get(`getProgressItemsData`, {
                headers : requestTokenHeader()
            });

            if (response.data.success) {
                dispatch({ type : 'GET_PROGRESS_ITEMS_SUCCESS', payload : response.data.data});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_PROGRESS_ITEMS_FAILURE'});
        }
    }
 }
