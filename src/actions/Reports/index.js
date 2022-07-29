import api from '../../axios';
import handleHttpError,{requestTokenHeader, decryptObject} from '../../utils/helper';

/* Action for get account details */
export const getAllReportsLists = (params) => {
    return async dispatch => {
        dispatch({ type: 'GET_REPORT_LIST_REQUEST' });
        try {
            const response = await api.get('report', {
                params  : params,
                headers : requestTokenHeader()
            });
          
            if (response.data.success) {
                dispatch({ type : 'GET_REPORT_LIST_SUCCESS', payload : decryptObject(response.data.data)});
            } 
        } catch (error) {
            handleHttpError(error.response);
            dispatch({ type: 'GET_REPORT_LIST_FAILURE'});
        }
    }
}

/* action resetting data */
export const resetReportData = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_REPORTS_DATA' });
    }
}