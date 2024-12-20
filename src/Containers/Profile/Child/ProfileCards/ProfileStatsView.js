import React, { Component } from "react";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
class ProfileStatsView extends Component {
  render() {
    const {
      user: {
        emailId,
        employeeId,
        phoneNo,
        mobileNo,
        linkedinPublicUrl,
        twitter,
        dateOfJoining,
        countryDialCode,
        countryDialCode1,
        timeZone,
      },
      toggleViewType,
    } = this.props;
    const mobile = `${countryDialCode1 || ""} ${mobileNo || ""}`;
    const phon = `${countryDialCode || ""} ${phoneNo || ""}`;
    return (
      <>
        <div class=" flex justify-end" >
          <BorderColorIcon
            tooltipTitle="Edit"
            iconType="edit"
            handleIconClick={toggleViewType}
            className=" !text-red-600 cursor-pointer !text-icon "
          />
        </div>
        <ProfileItemRow label="Email" value={emailId} />
        <ProfileItemRow label="Emp Id" value={employeeId} />
        <ProfileItemRow
          label="Joining Date"
          value={
            dateOfJoining ? dayjs(dateOfJoining).format("YYYY-MM-DD") : ""
          }
        />
        <ProfileItemRow label="Phone #" value={phon} />
        {/* <ProfileItemRow label="Phone No" value={phoneNo} /> */}
        {/* <ProfileItemRow label="Mobile No" value={mobileNo} /> */}
        <ProfileItemRow label="Mobile #" value={mobile} />
        <ProfileItemRow label="Linkedin" value={linkedinPublicUrl || ""} />
        <ProfileItemRow label="Twitter" value={twitter || ""} />
        {/* <ProfileItemRow label="Level" value={level || ""} /> */}
        <ProfileItemRow label="Time Zone" value={timeZone} />
      </>
    );
  }
}

export default ProfileStatsView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-no-wrap m-2"
    >
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk"
        overflow="hidden"
        textOverflow="ellipsis"
        style={{ marginLeft: "-4rem" }}
      >
        <Tooltip title={value} placement="topLeft">
          {/* {elipsize(value, 27)} */}
          {value}
        </Tooltip>
      </div>
    </div>
  );
};
