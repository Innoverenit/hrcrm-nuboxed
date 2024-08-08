import React from "react";
import { get } from "lodash";
import { TextInput,ValidationError, StyledLabel } from "../../UI/Elements";
import { FlexContainer } from "../../UI/Layout";
export const InputComponent = ({
  field,
  form,
  label,
  layout,
  Left,
  isColumn,
  labelWidth,
  isRequired,
  isShadow,
  isDisabled,
  form: { touched, errors, validateOnChange },
  noLabel,
  inlineLabel,
  ...props
}) => {
  if (isColumn) {
    return (
      <>
        {!noLabel && (
          <div class=" text-xs font-bold font-poppins" style={{ flexBasis: labelWidth || "20%" }}>
            {label}
          </div>
        )}
        <TextInput
        //style={{ height: "1.89em" }}
          layout={"vertical"}
          {...field}
          {...props}
          Left={Left}
          validateOnChange={false}
          isRequired={isRequired}
          isShadow={isShadow}
          isDisabled={isDisabled}
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
            <div class=" text-xs font-bold font-poppins"
            //  style={{ flexBasis: labelWidth || "20%" }}
             >
              {label}
            </div>
          )}

          <TextInput
         // style={{ height: "1.89em" }}
            layout={"vertical"}
            {...field}
            {...props}
            Left={Left}
            isShadow={isShadow}
            validateOnChange={false}
            isRequired={isRequired}
            isDisabled={isDisabled}
          />
        </FlexContainer>
      </FlexContainer>
      {get(touched, field.name) && get(errors, field.name) && (
        <ValidationError >{get(errors, field.name)}</ValidationError>
      )}
    </>
  );
};
