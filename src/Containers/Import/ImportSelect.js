import React from "react";
import { get } from "lodash";
import { SelectInput,  } from "../../Components/UI/Elements";
const Option = SelectInput.Option;
export const SelectComponent = ({
  field,
  options,
  label,
  form: { touched, errors, setFieldTouched, setFieldValue },
  ...props
}) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
    setFieldValue(field.name, value);
  }

  function handleBlur() {
    console.log("blur");
    setFieldTouched(field.name, true);
  }

  function handleFocus() {
    console.log("focus");
  }

  return (
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto m-[0.6rem] ">
      <span style={{ width: "28.75em" }}>{label}</span> &nbsp;
      <SelectInput
        {...field}
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        {options.map((option, i) => (
          <Option key={i} value={option.fieldKey}>
            {option.fieldViewName}
          </Option>
        ))}
      </SelectInput>
      {get(touched, field.name) && get(errors, field.name) && (
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
      
      )}
    </div>
  );
};
