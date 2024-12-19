import React from "react";
import { get } from "lodash";
import { StyledTextarea } from "../../UI/Elements";
export const TextareaComponent = ({
  field,
  form,
  noLabel,
  inlineLabel,
  label,
  labelWidth,
  form: { touched, errors, validateOnChange },
  ...props
}) => {
  return (
    <div>
      {!noLabel && (
        <div class=" text-xs font-bold font-poppins" style={{ flexBasis: labelWidth || "20%" }}>
          {label}
        </div>
      )}
      <StyledTextarea {...field} {...props} validateOnChange={false} />
      {get(touched, field.name) && get(errors, field.name) && (
        <div className=" flex text-[tomato] font-bold !text-lm px-1">{get(errors, field.name)}</div>
      )}
    </div>
  );
};
