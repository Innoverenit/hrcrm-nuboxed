import React, { Component } from "react";
import { Switch } from "antd";


export const SwitchComponent = ({
  field,
  data,
  width,
  disabled,
  label,
  marginLeft,
  marginTop,
  checkedChildren,
  unCheckedChildren,
  form: { setFieldValue },
  ...props
}) => {
  function handleChange(checked) {
    console.log(`selected ${checked}`);
    setFieldValue(field.name, checked);
  }

  return (
    <>
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
        <Switch
          disabled={disabled}
          label={label}
          checked={data}
          onChange={handleChange}
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          style={{
            width: width,
            marginLeft: marginLeft,
            marginTop: marginTop,
          }}
        />
      </div>
    </>
  );
};
