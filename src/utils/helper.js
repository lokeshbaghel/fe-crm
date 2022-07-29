import React from 'react';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import CryptoJS from "crypto-js";

import baseUrl from '../axios/baseURL';
import Constants from './constants';

/* called when needed to redirect user to login screen*/
const loginRedirect = () => {
    localStorage.clear();
    history.push('/');
};

/* called when there is need to display success messages */
const displaySuccessMessage = (message) => {
    toastr.success(message, 
        {"showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 3000, "closeButton": false}
    );
};

/* called when there is need to display error messages */
const displayErrorMessage = (message) => {
    toastr.error(message, 
       {"showMethod": "slideDown", "hideMethod": "slideUp", timeOut: 3000, "closeButton": false }
    );
};

/* gets displayed when there is no record in listing page */
const displayRecordNotFound = (message = "No Records Found") => {
    return (
        <div className="alert alert-info m-t-20 text-center">
            <i className="fa fa-info-circle"></i> {message}
        </div>
    )    
};

/* handles error of listing HTTP requests */
const handleHttpError = (response) => {
    if(!_.isEmpty(response)) {
        if (response.data.status == '401') {
            if(response.data.unauthorized){
                history.push(Constants['home_page'])
                displayErrorMessage('You are not authorized to access this page')
            } else {
                loginRedirect();
            }
        } else if (response.data.status == '422') {
                Object.keys(response.data.data).map( (key, i) => {
                    const error = response.data.data[key].message;
                    displayErrorMessage(error);
                });
        } else {
            const errorMessage = response.data.data;
            displayErrorMessage(errorMessage);
        }
    } else {
        displayErrorMessage('Something went wrong');
    }
}

/* handles error when form submission HTTP requests */
const handleHttpWithValidationError = (response) => {
    if(!_.isEmpty(response)) {
        if (response.data.status == '401') {
            if(response.data.unauthorized){
                history.push(Constants['home_page'])
                displayErrorMessage('You are not authorized to access this page')
            } else {
                loginRedirect();
            }
        } else if (response.data.status == '422') {
            Object.keys(response.data.data).map( (key, i) => {
                const error = response.data.data[key].message;
                displayErrorMessage(error);
            });
        } else {
            const errorMessage = response.data.data;
            displayErrorMessage(errorMessage);
        }
    } else {
        displayErrorMessage('Something went wrong');
    }
}

/* returns logged in user info */
const getLoggedInUserData = () => {
    let user = {};
    let obj = localStorage.getItem('data');
    if(!_.isEmpty(obj)) {
        user = decryptObject(obj);
    }

    return user;

}

/* returns header for axios request */
const requestTokenHeader = () => {
    let accessToken = JSON.parse(localStorage.getItem('accessToken'));
    if (accessToken) {
        return {'Authorization': accessToken };
    }

    return {}; 
}

const history = createBrowserHistory();

/* returns base url */
const API_URL = baseUrl;


function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
}

const images = importAll(require.context("../assets_crm/img/", false, /\.(png|jpe?g|svg)$/));

/**check whether email is valid or not */
const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

/**return appended country code symbol */
const countryCodeHtml = (code) => {
    return code ? `+${code}` : 'N/A';
}

/**method to display preview of sms template in engagement hub */
const engagementHubSmsCampaign = (templateHtml) => {
    return(
    <div className="preview-content">
        <div className="sms-content">
            <div dangerouslySetInnerHTML={{__html: templateHtml ? stripStyleTag(templateHtml) : ''}}></div>
        </div>
      </div>
    )
}

/**method to decrypt object encrypted  in backend */
const decryptObject = (string) => {
    const bytes  = CryptoJS.AES.decrypt(string, Constants['response_cipher_key']);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

/**method to check whether logged user has permission to access module or not */
const accessAllowed = (menuItem = 0, redirect = true) => {
    const user = getLoggedInUserData();
    if(_.includes(user.permission, menuItem)){
         return true
    }
    else {
        if(redirect){
             if(!_.includes(user.permission, Constants['diary-management']))
                 {
                 displayErrorMessage('You are not authorized to access this page')
                 return history.push(Constants['user-profile'])
                }
 
              displayErrorMessage('You are not authorized to access this page')
              return history.push(Constants['home_page'])
        }
    }
}
const accessAllowedPageSection=(menuItem = 0)=>{
    const user = getLoggedInUserData();
    if(_.includes(user.permission, menuItem)){
         return true
    }else{
         return false
    }
}

/**method to remove style tag from content */
const stripStyleTag = (content) => {
    return content.replace(/(<style[\w\W]+style>)/g, "")
}

export {
    loginRedirect,
    displaySuccessMessage,
    displayErrorMessage,
    displayRecordNotFound,
    handleHttpWithValidationError,
    getLoggedInUserData,
    requestTokenHeader,
    history,
    API_URL,
    images,
    validateEmail,
    countryCodeHtml,
    engagementHubSmsCampaign,
    decryptObject,
    accessAllowed,
    accessAllowedPageSection,
    stripStyleTag
}

export default handleHttpError;
