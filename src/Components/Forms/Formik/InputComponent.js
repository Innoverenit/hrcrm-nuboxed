import React from "react";
import { get } from "lodash";
import { TextInput } from "../../UI/Elements";
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
            <div class=" text-xs font-bold font-poppins"
             >
              {label}
            </div>
          )}

          <TextInput
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
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
      )}
    </>
  );
};
