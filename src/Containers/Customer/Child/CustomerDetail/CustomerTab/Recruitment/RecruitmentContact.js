import React from "react";
import dayjs from "dayjs";
import { StyledSelect } from "../../../../../../Components/UI/Antd";
const Option = StyledSelect.Option;
function RecruitmentContact(props) {
  function handleChange(value) {
    props.contact(value);
  }
  return (
    <div>
      <StyledSelect
        // showArrow={false}
        disabled={props.stageInd || props.approveInd || props.rejectInd}
        value={props.name || undefined}
        showSearch
        style={{ width: 220 }}
        placeholder="Select"
        onChange={(e) => handleChange(e)}
      >
        {props.contactData.map((item) => {
          const date = item.availableDate
            ? dayjs(item.availableDate).format("MMM DD")
            : "";
          return (
            <Option value={item.contactId}>
              {`${item.firstName} ${item.lastName} ${date} ${item.billing}${item.currency}`}{" "}
            </Option>
          );
        })}
      </StyledSelect>
    </div>
  );
}
export default RecruitmentContact;
