import React from "react";
import { get } from "lodash";
import dayjs from "dayjs";

import { StyledTimePicker } from "../../UI/Antd";
import { ValidationError, StyledLabel } from "../../UI/Elements";
import { FlexContainer } from "../../UI/Layout";
export const TimePicker = ({
  value,
  field,
  label,
  noLabel,
  isColumn,
  inlineLabel,

  form: { setFieldValue, setFieldTouched, touched, errors },
  ...props
}) => {
  if (isColumn) {
    return (
      <>
        {!noLabel && (
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: "20%" }}>{label}</div>
        )}
        <StyledTimePicker
          allowClear={false}
          {...field}
          {...props}
          format="HH:mm"
          onChange={(time, timeString) =>
            setFieldValue(field.name, dayjs(timeString, "HH:mm"))
          }
          value={value}
          onBlur={() => setFieldTouched(field.name, true)}
        />

        {get(touched, field.name) && get(errors, field.name) && (
          <ValidationError>{get(errors, field.name)}</ValidationError>
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
          <StyledTimePicker
            allowClear={false}
            {...field}
            {...props}
            format="HH:mm"
            onChange={(time, timeString) =>
              setFieldValue(field.name, dayjs(timeString, "HH:mm"))
            }
            value={value}
            onBlur={() => setFieldTouched(field.name, true)}
          />
        </FlexContainer>
      </FlexContainer>
      {get(touched, field.name) && get(errors, field.name) && (
        <ValidationError>{get(errors, field.name)}</ValidationError>
      )}
    </>
  );
};
