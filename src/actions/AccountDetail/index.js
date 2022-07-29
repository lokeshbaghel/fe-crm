import api from "../../axios";
import handleHttpError, {
  requestTokenHeader,
  history,
  displaySuccessMessage,
  displayErrorMessage,
} from "../../utils/helper";

/* Action for get account details */
export const getAccountDetails = (id) => {
  const params = { account_id: id };
  return async (dispatch) => {
    dispatch({ type: "GET_ACCOUNT_DETAIL_REQUEST" });
    try {
      const response = await api.get(`account-detail/${id}`, {
        //params  : params,
        headers: requestTokenHeader(),
      });
      if (response.data.success) {
        dispatch({
          type: "GET_ACCOUNT_DETAIL_SUCCESS",
          payload: response.data.data,
        });
        //      dispatch(getAccountDetailLinkData(id))
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_ACCOUNT_DETAIL_FAILURE" });
    }
  };
};

export const getAccountDetailSearch = (searchTitle = "", account_id) => {
  const params = { searchTitle: searchTitle, account_id: account_id };
  return async (dispatch) => {
    dispatch({ type: "GET_LINK_ACCOUNT_DETAIL_SEARCH_REQUEST" });
    try {
      const response = await api.get(`account-detail/search`, {
        params: params,
        headers: requestTokenHeader(),
      });
      if (response.data.success) {
        dispatch({
          type: "GET_LINK_ACCOUNT_DETAIL_SEARCH_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_LINK_ACCOUNT_DETAIL_FAILURE" });
    }
  };
};

export const getAccountDetailLinkData = (account_id) => {
  const params = { account_id: account_id };
  return async (dispatch) => {
    dispatch({ type: "GET_LINK_ACCOUNT_DETAIL_REQUEST" });
    try {
      const response = await api.get(`account-detail/getlinkedaccountdetails`, {
        params: params,
        headers: requestTokenHeader(),
      });
      if (response.data.success) {
        dispatch({
          type: "GET_LINK_ACCOUNT_DETAIL_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_LINK_ACCOUNT_DETAIL_FAILURE" });
    }
  };
};

/* Action for update call by successful or unsuccessful */
export const updateCall = (params) => {
  return async (dispatch) => {
    dispatch({ type: "CALL_UPDATE_REQUEST" });
    try {
      const response = await api.post(`updateCall`, params, {
        headers: requestTokenHeader(),
      });

      if (response.data.success) {
        dispatch({ type: "CALL_UPDATE_SUCCESS", payload: response.data.data });
        history.push(`/diary-management`);
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "CALL_UPDATE_FAILURE" });
    }
  };
};

/* Action for Add link call by successful or unsuccessful */
export const submitAddLinkData = (params) => {
  let paramssearchTitle = params.searchTitle;
  let dataaddlink = {
    account_id: params.account_id,
    account_Id2: params.account_Id2,
  };

  return async (dispatch) => {
    dispatch({ type: "CALL_UPDATE_ADDLINK_REQUEST" });
    try {
      const response = await api.post(
        `account-detail/add-link-account`,
        dataaddlink,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        //  dispatch({ type : 'CALL_UPDATE_SUCCESS', payload : response.data.data});
        history.push(`/account-details/${params.account_id}`);
        displaySuccessMessage("Account has been successfully added ");
        dispatch(getAccountDetailSearch(paramssearchTitle, params.account_id));
      }
    } catch (error) {
      handleHttpError(error.response);
      //     dispatch({ type: 'CALL_UPDATE_FAILURE'});
    }
  };
};
/* Action for delete link call by successful or unsuccessful */
export const submitDeleteLinkData = (params) => {
  return async (dispatch) => {
    dispatch({ type: "CALL_UPDATE_ADDLINK_REQUEST" });
    try {
      const response = await api.post(
        `account-detail/delete-link-account`,
        params,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        //  dispatch({ type : 'CALL_UPDATE_SUCCESS', payload : response.data.data});
        history.push(`/account-details/${params.account_id}`);
        displaySuccessMessage("Account has been successfully deleted ");
        dispatch(getAccountDetailLinkData(params.account_id));
      }
    } catch (error) {
      handleHttpError(error.response);
      //     dispatch({ type: 'CALL_UPDATE_FAILURE'});
    }
  };
};

/* action resetting data */
export const resetAccountDetailData = () => {
  return async (dispatch) => {
    dispatch({ type: "RESET_ACCOUNT_DETAIL_DATA" });
  };
};

/* Action for get data related to marketing tab of activity details */
export const getMarketingTabData = (id, params = {}) => {
  return async (dispatch) => {
    dispatch({ type: "GET_MARKETING_TAB_REQUEST" });
    try {
      const response = await api.get(`account-detail/marketing/${id}`, {
        params: params,
        headers: requestTokenHeader(),
      });

      if (response.data.success) {
        dispatch({
          type: "GET_MARKETING_TAB_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_MARKETING_TAB_FAILURE" });
    }
  };
};

/* Action for get data related to Activies tab of activity details */
export const getActivitiesTabData = (id, params = {}) => {
  return async (dispatch) => {
    dispatch({ type: "GET_Activities_TAB_REQUEST" });
    try {
      const response = await api.get(`account-detail/activityHistory/${id}`, {
        params: params,
        headers: requestTokenHeader(),
      });

      if (response.data.success) {
        dispatch({
          type: "GET_Activities_TAB_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_Activities_TAB_FAILURE" });
    }
  };
};

/* action for updating marketing email consent of account  */
export const updateMarketingEmailConsent = (params) => {
  return async (dispatch, getState) => {
    dispatch({ type: "UPDATE_MARKETING_CONSENT_REQUEST" });
    try {
      const response = await api.post(
        `account-detail/marketing/updateConsent`,
        params,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        let updatedAccountData = Object.assign(
          {},
          getState().accountDetail.accountData,
          {
            marketing_consent: params.marketing_consent_id,
          }
        );
        
        dispatch({
          type: "UPDATE_MARKETING_CONSENT_SUCCESS",
          payload: {updatedAccountData, 'marketing_consent': params.marketing_consent_id},
        });
        displaySuccessMessage(response.data.data);
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "UPDATE_MARKETING_CONSENT_FAILURE" });
    }
  };
};

/* Add Progress Item for an account */
export const addProgressItem = (params) => {
  return async (dispatch, getState) => {
    dispatch({ type: "ADD_PROGRESS_ITEM_REQUEST" });
    try {
      const response = await api.post(`addProgressItem`, params, {
        headers: requestTokenHeader(),
      });

      if (response.data.success) {
        dispatch({
          type: "ADD_PROGRESS_ITEM_SUCCESS",
          payload: response.data.data,
        });
        const reqParams = {
          account_id: params.account_id,
          search: "",
        };
        dispatch(getStageProgressItemsForAccount(reqParams));
        displaySuccessMessage(response.data.data);
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "ADD_PROGRESS_ITEM_FAILURE" });
    }
  };
};

/* Stage Progress Items related to account and use in Progress Item tab */
export const getStageProgressItemsForAccount = (params) => {
  return async (dispatch, getState) => {
    dispatch({ type: "GET_STAGE_PROGRESS_ITEMS_REQUEST" });
    try {
      const response = await api.get(
        `getStageProgressItemsForAccount/${params.account_id}?search=${params.search}`,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        dispatch({
          type: "GET_STAGE_PROGRESS_ITEMS_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_STAGE_PROGRESS_ITEMS_FAILURE" });
    }
  };
};

/**method to update person and its related information */
export const updatePersonInfo = (accountId, id, postData) => {
  return async (dispatch) => {
    dispatch({ type: "PERSON_INFO_UPDATE_REQUEST" });
    try {
      let response = "";
      if (id != "") {
        response = await api.put(`lead/${id}`, postData, {
          headers: requestTokenHeader(),
        });
      } else {
        let data = postData;
        data.account_id = parseInt(accountId);
        response = await api.post(`storeSecondaryApplicant`, data, {
          headers: requestTokenHeader(),
        });
      }
      if (response.data.success) {
        displaySuccessMessage(response.data.data);
        dispatch({ type: "PERSON_INFO_UPDATE_SUCCESS" });
        dispatch(getAccountDetails(accountId));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "PERSON_INFO_UPDATE_FAILURE" });
    }
  };
};

/* Start Call action for updating status and start time */
export const updateStartTimeandStatus = (params) => {
  return async (dispatch, getState) => {
    dispatch({ type: "ACTIVITY_UPDATE_REQUEST" });
    try {
      const response = await api.post(
        `diaryManagement/updateStatusandTime`,
        params,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        const updatedCallData = {
          ...getState().accountDetail,
          user_id: response.data.data.activity.user_id,
          status_id: response.data.data.activity.status_id,
        };

        dispatch({ type: "ACTIVITY_UPDATE_SUCCESS", payload: updatedCallData });
        displaySuccessMessage(response.data.data.msg);
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "ACTIVITY_UPDATE_FAILURE" });
    }
  };
};

/**action for updating account agency data */
export const updateAccountDetailInfo = (accountId, postData) => {
  return async (dispatch) => {
    dispatch({ type: "SUBMIT_ACCOUNT_AGENCY_REQUEST" });
    try {
      const response = await api.post(
        "account-detail/updateAccountDetail",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        displaySuccessMessage(response.data.data);
        dispatch({ type: "SUBMIT_ACCOUNT_AGENCY_SUCCESS" });
        dispatch(getAccountDetails(accountId));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "SUBMIT_ACCOUNT_AGENCY_FAILURE" });
    }
  };
};

/* Update Account Status (Active/Hold/Close) Action */
export const updateAccountStatus = (params) => {
  return async (dispatch, getState) => {
    dispatch({ type: "ACCOUNT_UPDATE_REQUEST" });
    try {
      const response = await api.post(`updateAccount`, params, {
        headers: requestTokenHeader(),
      });

      if (response.data.success) {
        const updatedAccountStatus = {
          ...getState().accountDetail,
          account_status: response.data.data.account.status_id,
          post_hold_to_charms:
            response.data.data.account.post_hold_to_charms == null ||
            response.data.data.account.post_hold_to_charms == 0
              ? 0
              : 1,
        };
        dispatch({
          type: "ACCOUNT_UPDATE_SUCCESS",
          payload: updatedAccountStatus,
        });
     await   dispatch(getAccountDetails(params.account_id));
        displaySuccessMessage(response.data.data.msg);
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "ACCOUNT_UPDATE_FAILURE" });
    }
  };
};

/**action for updating account document data */
export const updateAccountDocument = (accountId, postData) => {
  return async (dispatch) => {
    dispatch({ type: "SUBMIT_ACCOUNT_DOCUMENT_REQUEST" });
    try {
      const response = await api.post(
        "account-detail/updateDocument",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        displaySuccessMessage(response.data.data);
        dispatch({ type: "SUBMIT_ACCOUNT_DOCUMENT_SUCCESS" });
        dispatch(getDocumentTabData(accountId));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "SUBMIT_ACCOUNT_DOCUMENT_FAILURE" });
    }
  };
};

/* Action for get data related to document tab of activity details */
export const getDocumentTabData = (id, params = {}) => {
  return async (dispatch) => {
    dispatch({ type: "GET_DOCUMENT_TAB_REQUEST" });
    try {
      const response = await api.get(`account-detail/documents/${id}`, {
        params: params,
        headers: requestTokenHeader(),
      });

      if (response.data.success) {
        dispatch({
          type: "GET_DOCUMENT_TAB_SUCCESS",
          payload: response.data.data,
        });
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_DOCUMENT_TAB_FAILURE" });
    }
  };
};

/* Action for delete account documents */

export const deleteEnquiryDocument = (params) => {
  return async (dispatch) => {
    dispatch({ type: "GET_DELETE_DOCUMENT_REQUEST" });
    try {
      const response = await api.post(`deleteenquirydocument`, params, {
        headers: requestTokenHeader(),
      });
      if (response.data.success) {
        dispatch({
          type: "GET_DELETE_DOCUMENT_SUCCESS",
          payload: response.data.data,
        });
        displaySuccessMessage(response.data.data);
        dispatch(getDocumentTabData(params.account_id));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_DELETE_DOCUMENT_FAILURE" });
    }
  };
};

export const insertActivityEmail = (postData) => {
  return async (dispatch) => {
    dispatch({ type: "SET_ACTIVITY_REQUEST_DATA" });
    try {
      const response = await api.post(
        "account-detail/add-email-activity",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        dispatch({
          type: "SET_ACTIVITY_REQUEST_DATA_SUCCESS",
          payload: response.data.data,
        });
        dispatch(getAccountDetails(postData.account_id));
        
        displaySuccessMessage(response.data.data);
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "SET_ACTIVITY_REQUEST_DATA_FAILURE" });
    }
  };
};

/* Action for get account details */
export const getFormSaveData = (params) => {
  return async (dispatch) => {
    dispatch({ type: "GENERAL_FORM_TAB_DATA_REQUEST" });
    try {
      const response = await api.post(`saveIEForm`, params, {
        headers: requestTokenHeader(),
      });
      if (response.data.success) {
        dispatch({
          type: "GENERAL_FORM_TAB_DATA_SUCCESS",
          payload: response.data.data,
        });
        dispatch(getAccountDetails(params.account_id));
        displaySuccessMessage("IE Form data save sucessfully");
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GENERAL_FORM_TAB_DATA_FAILURE" });
    }
  };
};

/* Action for get account details */
export const IEFormSumitData = (params) => {
  return async (dispatch) => {
    dispatch({ type: "IE_FORM_DATA_REQUEST" });
    try {
      const response = await api.post(`submitIEForm`, params, {
        headers: requestTokenHeader(),
      });
      if (response.data.success) {
        if (response.data.data.errors) {
          dispatch({
            type: "IE_FORM_DATA_SUCCESS",
            payload: response.data.data,
          });
          displayErrorMessage("Please fill highlighted tab data");
        } else {
          dispatch({
            type: "IE_FORM_DATA_SUCCESS",
            payload: response.data.data.success_res,
          });
          dispatch(getAccountDetails(params.account_id));
          displaySuccessMessage(response.data.data.message);
          history.push(`/account-details/${params.account_id}`);
        }
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "IE_FORM_DATA_FAILURE" });
    }
  };
};

export const insertActivityCall = (accountId, postData) => {
  return async (dispatch) => {
    dispatch({ type: "SET_CALL_ACTIVITY_REQUEST_DATA" });
    try {
      const response = await api.post(
        "account-detail/add-call-activity",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        dispatch({
          type: "SET_CALL_ACTIVITY_REQUEST_DATA_SUCCESS",
          payload: response.data.data,
        });
        displaySuccessMessage(response.data.data);
        dispatch(getAccountDetails(accountId));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "SET_CALL_ACTIVITY_REQUEST_DATA_FAILURE" });
    }
  };
};

export const insertScheduleActivityCall = (accountId, postData) => {
  return async (dispatch) => {
    dispatch({ type: "SET_CALL_ACTIVITY_REQUEST_DATA" });
    try {
      const response = await api.post(
        "account-detail/add-schedule-call-activity",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        dispatch({
          type: "SET_CALL_ACTIVITY_REQUEST_DATA_SUCCESS",
          payload: response.data.data,
        });
        displaySuccessMessage(response.data.data);
        dispatch(getAccountDetails(accountId));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "SET_CALL_ACTIVITY_REQUEST_DATA_FAILURE" });
    }
  };
};

export const insertActivityTask = (postData) => {
  return async (dispatch) => {
    dispatch({ type: "SET_TASK_ACTIVITY_REQUEST_DATA" });
    try {
      const response = await api.post(
        "account-detail/add-task-activity",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );

      if (response.data.success) {
        dispatch({
          type: "SET_TASK_ACTIVITY_REQUEST_DATA_SUCCESS",
          payload: response.data.data,
        });
        displaySuccessMessage(response.data.data.msg);
        dispatch(getAccountDetails(postData.account_id));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "SET_TASK_ACTIVITY_REQUEST_DATA_FAILURE" });
    }
  };
};

export const getPostCodeAuthority = ( postData) => {
  return async (dispatch) => {
    dispatch({ type: "POST_CODE_AUTHORITY_REQUEST" });
    try {
      const response = await api.post(
        "account-detail/post-code-local-authority",
        postData,
        {
          headers: requestTokenHeader(),
        }
      );
        if (response.data.success) {
          dispatch({
            type: "POST_CODE_AUTHORITY_SUCCESS",
            payload: response.data.data.authority_id,
          });
        }
      } catch (error) {
        handleHttpError(error.response);
        dispatch({ type: "POST_CODE_AUTHORITY_FAILURE" });
      }
    };
  };
  
/**action for updating account agency data */
export const updateCarerReferralMarketingTab = (params) => {
  return async (dispatch) => {
    dispatch({ type: "CARER_REFERRAL_FORM_DATA_REQUEST" });
    try {

      const response = await api.post(`account-detail/marketing/updateCarerReferral`, params, {
        headers: requestTokenHeader(),
      });


      if (response.data.success){
        displaySuccessMessage(response.data.data.message);
        dispatch({ type: "CARER_REFERRAL_FORM_DATA_SUCCESS" });
        dispatch(getMarketingTabData(params.account_id));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "CARER_REFERRAL_FORM_DATA_FAILURE" });
    }
  };
};

/* action for updating scheduled call data */
export const updateRecordCallData = (params) => {
  return async (dispatch) => {
    dispatch({ type: "GET_RECORD_CALL_REQUEST" });
    try {
      const response = await api.post(`updateRecordCallData`, params, {
        headers: requestTokenHeader(),
      });
      if (response.data.success) {
        dispatch({
          type: "GET_RECORD_CALL_SUCCESS",
          payload: response.data.data,
        });
        displaySuccessMessage(response.data.data);
        dispatch(getActivitiesTabData(params.account_id));
      }
    } catch (error) {
      handleHttpError(error.response);
      dispatch({ type: "GET_RECORD_CALL_FAILURE" });
    }
  };
};
