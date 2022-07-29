const validateCallForm = (fields) => {
  let errors = {};
  let formIsValid = true;

  if (
    !fields["schedule_call_start"] ||
    fields["schedule_call_start"].trim() === ""
  ) {
    formIsValid = false;
    errors["schedule_call_start"] = "PleaseSchedule Next Start Call .";
  }

  if (!fields["notes"] || fields["notes"].trim() === "") {
    formIsValid = false;
    errors["notes"] = "*Please enter notes.";
  }

  return {
    errors: errors,
    formIsValid: formIsValid,
  };
};

export default validateCallForm;
