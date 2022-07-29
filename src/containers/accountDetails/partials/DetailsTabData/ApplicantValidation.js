import { isValid } from "postcode";
import { validateEmail } from "../../../../utils/helper";

const validateApplicantForm = (fields) => {
    let errors = {};
    let formIsValid = true;
    
    if (!fields["first_name"] || fields["first_name"].trim() == '') {
        formIsValid = false;
        errors["first_name"] = "*Please enter your name.";
    }
    
    if (!fields["last_name"] || fields["last_name"].trim() == '') {
        formIsValid = false;
        errors["last_name"] = "*Please enter your surname.";
    }
    
    if (!fields["date_of_birth"] || fields["date_of_birth"].trim() == '') {
        formIsValid = false;
        errors["date_of_birth"] = "*Please select date of birth.";
    }

    if (!fields["address1"] || fields["address1"].trim() == '') {
        formIsValid = false;
        errors["address1"] = "*Please enter address.";
    }

    if (!fields["post_code"] || fields["post_code"].trim() == '') {
        formIsValid = false;
        errors["post_code"] = "*Please enter your post code.";
    }

    if (typeof fields["post_code"] !== "undefined") {

        if(isValid(fields["post_code"])){
            formIsValid = true;
        }else{
            formIsValid = false;
            errors["post_code"] = "*Please enter valid Postcode"
        }

        // if (!fields["post_code"].match(/^([A-Za-z][a-zA-Z0-9 ]{5,20})$/)) {   //^[a-zA-Z][a-zA-Z0-9.,$;]+$
        // //if (!fields["quote_number"].match(/^(INQ[0-9]{1,6})$/)) {
        //     formIsValid = false;
        //     errors["post_code"] = "*Please enter alphanumeric postcode starting with alphabet with minimum 5 and maximum 20 characters";
        // }
    }

    if (!fields["email"] || fields["email"].trim() == '') {
        formIsValid = false;
        errors["email"] = "*Please enter your email.";
    }

    if (typeof fields["email"] !== "undefined") {
        if (!validateEmail(fields["email"])) {
            formIsValid = false;
            errors["email"] = "*Please enter valid email.";
        }
    }

    // if (!fields["telephone_country_code"] || fields["telephone_country_code"].trim() == '') {
    //     formIsValid = false;
    //     errors["telephone_country_code"] = "*Please enter country code.";
    // }

    // if (typeof fields["telephone_country_code"] !== "undefined") {
    //     if (!fields["telephone_country_code"].match(/^([0-9]{2})$/)) {
    //         formIsValid = false;
    //         errors["telephone_country_code"] = "*Please enter numbers with 2 characters only.";
    //     }
    // }

    // if (!fields["mobile_country_code"] || fields["mobile_country_code"].trim() == '') {
    //     formIsValid = false;
    //     errors["mobile_country_code"] = "*Please enter country code.";
    // }

    // if (typeof fields["mobile_country_code"] !== "undefined") {
    //     if (!fields["mobile_country_code"].match(/^([0-9]{2})$/)) {
    //         formIsValid = false;
    //         errors["mobile_country_code"] = "*Please enter numbers with 2 characters only.";
    //     }
    // }

    if (!fields["telephone"] || fields["telephone"].trim() == '') {
        formIsValid = false;
        errors["telephone"] = "*Please enter phone number.";
    }

    if (typeof fields["telephone"] !== "undefined") {
        if (!fields["telephone"].match(/^([0-9]{11})$/)) {
            formIsValid = false;
            errors["telephone"] = "*Please enter a 11 digit number";
        }
    }

    // if (!fields["mobile"] || fields["mobile"].trim() == '') {
    //     formIsValid = false;
    //     errors["mobile"] = "*Please enter mobile number.";
    // }

    if (typeof fields["mobile"] !== "undefined") {
        if (!fields["mobile"].match(/^([0-9]{11})$/)) {
            formIsValid = false;
            errors["mobile"] = "*Please enter a 11 digit number";
        }
    }
    //console.log('validation',fields["primary_language"]);
    // if (!fields["primary_language"] || fields["primary_language"] === '') {
    //     formIsValid = false;
    //     errors["primary_language"] = "*Please enter your primary language.";
    // }

    // if (!fields["secondary_language"] || fields["secondary_language"] === '') {
    //     formIsValid = false;
    //     errors["secondary_language"] = "*Please enter your secondary language.";
    // }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateApplicantForm;