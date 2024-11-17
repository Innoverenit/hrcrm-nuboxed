import React, { Component } from "react";
import { Tooltip } from "antd";

import BorderColorIcon from "@mui/icons-material/BorderColor";
import dayjs from "dayjs";
class EmployeeStatusView extends Component {
  render() {
    const {
      singleEmployee: {
        emailId,
        label,
        currency,
        workplace,
        reportingManagerName,
        employeeId,
        phoneNo,
        mobileNo,
        linkedinPublicUrl,
        twitter,
        dateOfJoining,
        countryDialCode,
        countryDialCode1,
        timeZone,
        // mataData: { firstName, lastName, email },
      },

      toggleViewType,
    } = this.props;
    const mobile = `${countryDialCode1 || ""} ${mobileNo || ""}`;
    const phone = `${countryDialCode || ""} ${phoneNo || ""}`;
    return (
      <>
        <div class=" flex justify-end" >
        <Tooltip title="Edit">
          <BorderColorIcon
          
            onClick={toggleViewType}
            style={{
              color: "grey",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          />
               </Tooltip>
        </div>
  
        <ProfileItemRow //label="Phone #" 
          label={<FormattedMessage
            id="app.phone"
            defaultMessage="Phone #"
          />}
          value={phone} />
        <ProfileItemRow label="Mobile #" value={mobile} />
        <ProfileItemRow label="Linkedin" value={linkedinPublicUrl || ""} />
        <ProfileItemRow label="Level" value={label || "Data Not Available"} /> 
        <ProfileItemRow label="Date of Joining" value={dayjs(dateOfJoining).format("DD/MM/YYYY")} />
        <ProfileItemRow label="Currency" value={currency} />
        <ProfileItemRow label="Reporting Manager" value={reportingManagerName}  />
        <ProfileItemRow label="Workplace" value={workplace}  />
        <ProfileItemRow label="Time Zone" value={timeZone} />
        {/* <ProfileItemRow label="Reporting Manager" value={mataData.firstName} /> */}
      </>
    );
  }
}

export default EmployeeStatusView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-no-wrap m-2">
      <div class=" text-[#444] font-semibold" >{label}</div>
      <div className="overflow-hidden truncate ml-8">
       
          {/* {elipsize(value, 27)} */}
          {value}
       
      </div>
    </div>
  );
};
