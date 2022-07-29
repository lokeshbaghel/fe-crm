const initialState = {
    forgetPasswordChange: {} 
}
export function forgotPassword(state = initialState, action) {
    switch (action.type) {
        case 'FORGOT_PASSWORD_REQUEST':
            return {
                forgetPasswordChange        : {},
                blocking                    : true,
                isOtpScreen                 : false
            };
        
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                forgetPasswordChange        : action.payload,
                blocking                    : false,
                isOtpScreen                 : true
            };
        
        case 'FORGOT_PASSWORD_FAILURE':
            return {
                forgetPasswordChange        : {},
                blocking                    : false,
                isOtpScreen                 : false
            };

        case 'OTP_PASSWORD_REQUEST':
            return {
                forgetPasswordChange        : {},
                blocking                    : false,
                isOtpScreen                 : true
            };
            
        case 'OTP_PASSWORD_SUCCESS':
            return {
                forgetPasswordChange        : action.payload,
                blocking                    : false,
                isOtpScreen                 : false
            };

        case 'OTP_PASSWORD_FAILURE':
            return {
                forgetPasswordChange        : {},
                blocking                    : false,
                isOtpScreen                 : true
            };

        case 'RESET_FORGET_PASSWORD':
            return [];

        default:
            return state
    }
}