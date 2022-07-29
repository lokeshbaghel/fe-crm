const validateAccountForm = (fields) => {
    let errors = {};
    let formIsValid = true;
    
    if (!fields["agency_id"]) {
        formIsValid = false;
        errors["agency_id"] = "*Please select agency.";
    }

    if (!fields["spare_rooms"] || fields["spare_rooms"] == '') {
        formIsValid = false;
        errors["spare_rooms"] = "*Please select Spare Rooms";
    }

    if (!fields["current_situation_id"] || fields["current_situation_id"] == '') {
        formIsValid = false;
        errors["current_situation_id"] = "*Please select Current Situation";
    }

    // if (typeof fields["spare_rooms"] !== "undefined") {
    //     if (!fields["spare_rooms"].match(/^([0-9]{1,2})$/)) {
    //         formIsValid = false;
    //         errors["spare_rooms"] = "*Please enter numbers only with minimum 1 and maximum 2 characters.";
    //     }
    // }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateAccountForm;