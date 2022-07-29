const validateLeadForm = (fields) => {
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
    
  //  if (!fields["town"]) {
   //     formIsValid = false;
  //      errors["town"] = "*Please select date of birth.";
  //  }

   // if (!fields["spare_rooms"] || fields["spare_rooms"].trim() == '') {
  //      formIsValid = false;
    //    errors["spare_rooms"] = "*Please enter spare rooms.";
  //  }

    // if (typeof fields["spare_rooms"] !== "undefined") {
    //     if (!fields["spare_rooms"].match(/^([0-9]{1,2})$/)) {
    //         formIsValid = false;
    //         errors["spare_rooms"] = "*Please enter numbers only with minimum 1 and maximum 2 characters.";
    //     }
    // }

    // if (!fields["mobile_country_code"] || fields["mobile_country_code"].trim() == '') {
    //     formIsValid = false;
    //     errors["mobile_country_code"] = "*Please enter country code.";
    // }

    // if (typeof fields["mobile_country_code"] !== "undefined") {
    //     if (!fields["mobile_country_code"].match(/^([0-9]{2})$/)) {
    //         formIsValid = false;
    //         errors["mobile_country_code"] = "*Please enter numbers with 2 numerals.";
    //     }
    // }

    if (!fields["mobile"] || fields["mobile"].trim() == '') {
        formIsValid = false;
        errors["mobile"] = "*Please enter Mobile number.";
    }

    if (typeof fields["mobile"] !== "undefined") {
        if (!fields["mobile"].match(/^([0-9]{11})$/)) {
            formIsValid = false;
            errors["mobile"] = "*Please enter numbers with 11 numerals";
        }
    }

    // if (typeof fields["telephone"] !== "undefined") {
    //     if (!fields["telephone"].match(/^([0-9 ]{5,12})$/)) {
    //         formIsValid = false;
    //         errors["telephone"] = "*Please enter numbers only between 5 and 12 numerals.";
    //     }
    // }
    
   // if (!fields["address"]) {
  //      formIsValid = false;
   //     errors["address"] = "*Please enter address.";
  //  }

    if (!fields["email"] || fields["email"].trim() == '') {
        formIsValid = false;
        errors["email"] = "*Please enter an email address.";
    }

    if(fields["email"]){
        var filter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
        if (!filter.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "*Please provide a valid email address";
        }else{
            formIsValid = true;
            errors["email"] = "";
        }
    }

   // if (!fields["notes"]) {
   //     formIsValid = false;
  //      errors["notes"] = "*Please enter notes.";
 //   }

   if (typeof fields["agency_id"] == 'undefined' || fields["agency_id"] == '') {
       formIsValid = false;
       errors["agency_id"] = "*Please select an agency.";
   }

   if (typeof fields["marketing_source_id"] == 'undefined' || fields["marketing_source_id"] == '') {
       formIsValid = false;
      errors["marketing_source_id"] = "*Please marketing source.";
  }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateLeadForm;