import React from "react";
import { get } from "lodash";
import { FlexContainer } from "../../UI/Layout";
import { SelectInput } from "../../UI/Elements";
const Option = SelectInput.Option;
export const SelectComponent = ({
  field,
  options,
  mode,
  label,
  placeholder,
  isRequired,
  isShadow,
  isColumn,
  defaultValue,

  noLabel,
  width,
  inlineLabel,
  form: { touched, errors, setFieldTouched, setFieldValue },
  ...props
}) => {
  function handleChange(value) {
    console.log(`selected ${value}`);
    setFieldValue(field.name, value);
  }

  function handleBlur() {
    console.log("blur");
   // setFieldTouched(field.name, true);
  }

  function handleFocus() {
    console.log("focus");
  }

  if (isColumn) {
    return (
      <>
        {!noLabel && (
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
        )}
        <SelectInput
          {...field}
          {...props}
          width={width}
          isShadow={isShadow}
          onChange={handleChange}
          placeholder={placeholder || "Select"}
          defaultValue={defaultValue}
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

        {get(touched, field.name) && get(errors, field.name) && (
          <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
        )}
      </>
    );
  }
  if (mode) {
    return (
      <>
        {!noLabel && (
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
        )}
        <SelectInput
          {...field}
          {...props}
          width={width}
          isShadow={isShadow}
          onChange={handleChange}
          mode="multiple"
          placeholder={placeholder || "Select"}
          defaultValue={defaultValue}
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

        {get(touched, field.name) && get(errors, field.name) && (
          <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
        )}
      </>
    );
  }
  return (
    <>
      <FlexContainer>
        <FlexContainer alignItems="center" flexWrap={inlineLabel && "nowrap"}>
          {!noLabel && (
            <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
          )}
          <SelectInput
            {...field}
            {...props}
            width={width}
            isShadow={isShadow}
            onChange={handleChange}
            placeholder={placeholder || "Select"}
            defaultValue={defaultValue}
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
        </FlexContainer>
      </FlexContainer>
      {get(touched, field.name) && get(errors, field.name) && (
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
      )}
    </>
  );
};
