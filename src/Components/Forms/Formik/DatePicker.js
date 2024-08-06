import React from "react";
import { get } from "lodash";
import { StyledDatePicker } from "../../UI/Antd";
import { ValidationError, StyledLabel } from "../../UI/Elements";
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
          <StyledLabel style={{ flexBasis: label || "20%" }}>
            {label}
          </StyledLabel>
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
          <ValidationError style={{ marginTop: "5px" }}>
            {get(errors, field.name)}
          </ValidationError>
        )}
      </>
    );
  }
  return (
    <>
      <FlexContainer>
        <FlexContainer alignItems="center" flexWrap={inlineLabel && "nowrap"}>
          {!noLabel && (
            <StyledLabel style={{ flexBasis: "20%" }}>{label}</StyledLabel>
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
        <ValidationError>{get(errors, field.name)}</ValidationError>
      )}
    </>
  );
};

// import React from "react";
// import { get } from "lodash";
// import dayjs from "dayjs";

// import { StyledDatePicker } from "../../UI/Antd";
// import { ValidationError, StyledLabel } from "../../UI/Elements";
// import { FlexContainer } from "../../UI/Layout";
// export const DatePicker = ({
//   value,
//   field,
//   label,
//   isRequired,
//   noLabel,
//   inlineLabel,
//   form: { setFieldValue, setFieldTouched, touched, errors, height, width },
//   ...props
// }) => {
//   return (
//     <>
//       <FlexContainer>
//         <FlexContainer alignItems="center" flexWrap={inlineLabel && "nowrap"}>
//           {!noLabel && (
//             <StyledLabel style={{ flexBasis: "20%" }}>{label}</StyledLabel>
//           )}
//           <StyledDatePicker
//             allowClear={false}
//             {...field}
//             {...props}
//             isRequired={isRequired}
//             onChange={(date, dateString) =>
//               setFieldValue(field.name, dayjs(dateString))
//             }
//             value={value}
//             // height={height}
//             width={width}
//             onBlur={() => setFieldTouched(field.name, true)}
//           />
//         </FlexContainer>
//       </FlexContainer>
//       {get(touched, field.name) && get(errors, field.name) && (
//         <ValidationError>{get(errors, field.name)}</ValidationError>
//       )}
//     </>
//   );
// };
