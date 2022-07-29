import React, { useRef } from "react";
import ReactSelect, { NonceProvider } from "react-select";

import "./index.css";

const MultiSelectDropdowm = props => {
  // isOptionSelected sees previous props.value after onChange
  const valueRef = useRef(props.value);
  valueRef.current = props.value;
  const selectAllOption = {
    value:"<SELECT_ALL>",
    label: props.lableText
  };

  const colourStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius:"10px",
    })
  }
  
  const isSelectAllSelected = () =>
    valueRef.current.length === props.options.length;

  const isOptionSelected = option =>
    valueRef.current.some(({ value }) => value === option.value) ||
    isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...props.options];

  const getValue = () =>
    isSelectAllSelected() ? [selectAllOption] : props.value;

  const onChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      props.onChangeAllAgencyList(props.options, actionMeta);
    } else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      props.onChangeAllAgencyList([], actionMeta);
    } else if (
      actionMeta.action === "deselect-option" &&
      isSelectAllSelected()
    ) {
      props.onChangeAllAgencyList(
        props.options.filter(({ value }) => value !== option.value),
        actionMeta
      );
    } else {
      props.onChangeAllAgencyList(newValue || [], actionMeta);
      
    }
  };

  return (
    <ReactSelect
      isOptionSelected={isOptionSelected}
      options={getOptions()}
      value={getValue()}
      onChange={onChange}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      styles={colourStyles}
      placeholder={props.placeholderText}
      isMulti
    />
  );
};
export default MultiSelectDropdowm;