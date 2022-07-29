import api from '../../axios';
import handleHttpError,{displaySuccessMessage, requestTokenHeader} from '../../utils/helper';

// fetch user profile data and show it in user profile page
export const getUserProfileData = (id) => {
    return async dispatch => {
        dispatch({ type: 'USER_PROFILE_REQUEST' });
        try {
            const response = await api.get(`user-detail/${id}`,{
                headers : requestTokenHeader(),
            });
            
            if (response.data.success) {      
                dispatch({ type : 'USER_PROFILE_SUCCESS', payload : response.data.data});
            } 
        } catch(error) {
            handleHttpError(error.response);
            dispatch({ type: 'USER_PROFILE_FAILURE'});
        }
    }
}

// update password in user profile page
export const passwordChange = (params) => {
    return async dispatch => {
        dispatch({ type: 'USER_UPDATE_PASSWORD_REQUEST' });
        try {
            const response = await api.post('updatepasswordSubmit',params,{
                headers : requestTokenHeader()
            });
            let responceUpdate={};
            if (response.data.success) {     
                if(response.data.data=='SUCCESS'){
                    responceUpdate.name="Password Change sucessfully";
                    responceUpdate.type="Sucessfully";
                    displaySuccessMessage(responceUpdate.name);
                }else{
                    responceUpdate=response.data.data;
                }
                dispatch({ type : 'USER_UPDATE_PASSWORD_SUCCESS', payload : responceUpdate});
            } 
        } catch(error) {
              handleHttpError(error.response);
              dispatch({ type: 'USER_UPDATE_PASSWORD_FAILURE'});
            
        }
    }
}

/* action resetting data */
export const resetPasswordChange = () => {
    return async dispatch => {
        dispatch({ type: 'RESET_PASSWORD_CHANGE' });
    }
}
