const ValidateTaskForm = (fields) => {
    let errors = {};
    let formIsValid = true;
    
 
    if (!fields["title"] || fields["title"].trim() == '') {
        formIsValid = false;
        errors["title"] = "*Please enter title.";
    }
    
    if (!fields["notes"] || fields["notes"].trim() == '') {
        formIsValid = false;
        errors["notes"] = "*Please enter notes.";
    }
    
  return {
        errors : errors,
        formIsValid : formIsValid
    };
}

export default ValidateTaskForm;