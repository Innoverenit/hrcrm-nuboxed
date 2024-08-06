import React from "react";
import { SelectInput, ValidationError, StyledLabel } from "../../UI/Elements";
const Option = SelectInput.Option;
const EditableSelect = ({
  field,
  options,
  label,
  name,
  isRequired,
  defaultValue,
  value,
  handleChange,
  placeholder,
  ...props
}) => {

  return (
    <SelectInput
      {...props}
      onChange={(value) => handleChange(name, value)}
      // onBlur={handleBlur}

      placeholder={placeholder}
      // defaultValue={defaultValue}
      value={value || defaultValue}
      isRequired={isRequired}
    >
      {options.map((option, i) => {
        if (typeof option === "string") {
          return (
            <Option key={i} value={option}>
              {option}
            </Option>
          );
        } else {
          return (
            <Option key={i} value={option.value}>
              {option.label}
            </Option>
          );
        }
      })}
    </SelectInput>
  );
};
export default EditableSelect;
