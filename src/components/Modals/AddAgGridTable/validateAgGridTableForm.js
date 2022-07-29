const validateAgGridTableForm = (fields) => {
    let errors = {};
    let formIsValid = true;
    
    if (!fields["table_name"] || fields["table_name"].trim() == '') {
        formIsValid = false;
        errors["table_name"] = "*Please enter table name.";
    }

    return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default validateAgGridTableForm;