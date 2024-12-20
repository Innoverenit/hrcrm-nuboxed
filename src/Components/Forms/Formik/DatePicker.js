import React from "react";
import { get } from "lodash";
import { StyledDatePicker } from "../../UI/Antd";
import { FlexContainer } from "../../UI/Layout";
import dayjs from "dayjs";
export const DatePicker = ({
  value,
  defaultValue,
  field,
  label,
  isRequired,
  width,
  height,
  disabledDate,
  isColumn,
  noLabel,
  inlineLabel,
  form: { setFieldValue, setFieldTouched, touched, errors },
  ...props
}) => {
  const deadline = "2018-12-20T07:37:50.886Z";

  if (isColumn) {
    return (
      <>
        {!noLabel && (
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: label || "20%" }}>
            {label}
          </div>
        )}
        <StyledDatePicker
          allowClear={false}
          {...field}
          {...props}
          width={width}
          disabledDate={disabledDate}
          isRequired={isRequired}
          onChange={(date, dateString) =>
            setFieldValue(field.name, dayjs(dateString))
          }
          defaultValue={defaultValue}
          value={value}
          // height="38px"
          onBlur={() => setFieldTouched(field.name, false)}
        />

        {get(touched, field.name) && get(errors, field.name) && (
          <div className=" flex text-[tomato] font-bold !text-lm px-1 mt-1" >
            {get(errors, field.name)}
          </div>
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
          <StyledDatePicker
            allowClear={false}
            {...field}
            {...props}
            width={width}
            isRequired={isRequired}
            defaultValue={defaultValue}
            disabledDate={disabledDate}
            onChange={(date, dateString) =>
              setFieldValue(field.name, dayjs(dateString))
            }
            value={value}
            // height="38px"
            onBlur={() => setFieldTouched(field.name, true)}
          />
        </FlexContainer>
      </FlexContainer>

      {get(touched, field.name) && get(errors, field.name) && (
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
      )}
    </>
  );
};
