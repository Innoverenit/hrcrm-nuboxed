import React, { Component } from "react";
import { TextInput, ValidationError } from "../../UI/Elements";
import { StyledTextarea } from "../../UI/Elements";
import { get } from "lodash";

// class EditableInput extends Component {
const EditableInput = props => {
  const {
    handleChange,
    defaultValue,
    value,
    name,
    placeholder,
    isRequired,
    width,
    height,
    disabled
  } = props;
  return (
    <>
      <StyledTextarea
        onChange={({ target: { name, value } }) => handleChange(name, value)}
        defaultValue={defaultValue}
        value={value}
        name={name}
        // isRequired={isRequired}
        placeholder={placeholder}
        width={width}
        height={height}
        disabled={disabled}
      />
      {/* {get(touched, field.name) && get(errors, field.name) && (
        <ValidationError>{get(errors, field.name)}</ValidationError>
      )} */}
    </>
  );
};
// }
export default EditableInput;
