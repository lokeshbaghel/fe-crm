import api from '../../axios';
import handleHttpError from '../../utils/helper';

/* action for fetching records */
export const fetchDashboardData = (params) => {
    return async dispatch => {
        dispatch({ type: 'DASHBOARD_REQUEST' });
        try {
            const response = await api.get('dashboard',{
                params  : params,
            });
            
            if (response.data.success) {
                dispatch({ type : 'DASHBOARD_SUCCESS', payload : response.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'DASHBOARD_FAILURE'});
        }
    }
}


/* action resetting dashboard list data */
export const resetDashboardData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_DASHBOARD_DATA' });
    }
}
