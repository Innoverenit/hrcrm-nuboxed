import React, { Component } from "react";


class EmployeeAboutView extends Component {
  render() {
    const {
      singleEmployee: {
        emailId,
        employeeId,
        dateOfJoining,
        timeZone,
        tradeCurrency,
        designation,
        department,
        userType,
        level,
        departmentDetails,
        email,
        metaData,
        label,employee_type,
        roleType
      },

      toggleViewType,
    } = this.props;
    console.log("***************", this.props);
    return (
      <>
        <div class=" flex justify-end" >
          {/* <ActionIcon
            //tooltipTitle="Edit"
            tooltiptitle={<FormattedMessage
              id="app.edit"
              defaultMessage="Edit"
            />}
            iconType="edit"
            handleIconClick={toggleViewType}
            size="1em"
          /> */}
        </div>
        <ProfileItemRow //label="Email" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ProfileItemRow //label="Emp Id" 
          label={<FormattedMessage
            id="app.employeeId"
            defaultMessage="Emp ID"
          />}
          value={employeeId} />
        {/* <ProfileItemRow
          //label="Date of Joining"
          label={<FormattedMessage
            id="app.dateOfJoining"
            defaultMessage="Date of Joining"
          />}
          value={dayjs(dateOfJoining).format("YYYY-MM-DD")}
        /> */}
        {/* <ProfileItemRow //label="Currency" 
          label={<FormattedMessage
            id="app.tradeCurrency"
            defaultMessage="Currency"
          />}
          value={tradeCurrency}
        /> */}
        {/* <ProfileItemRow //label="Designation" 
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation} /> */}
        {/* <ProfileItemRow //label="Function" 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Function"
          />}
          value={department} /> */}
        {/* <ProfileItemRow // label="Level"
          label={<FormattedMessage
            id="app.level"
            defaultMessage="Level"
          />}
          value={level || ""} /> */}
        {/* <ProfileItemRow //label="Details" 
          label={<FormattedMessage
            id="app.details"
            defaultMessage="Details"
          />}
          value={departmentDetails} /> */}
           <ProfileItemRow label="Department" value={department} />
           <ProfileItemRow label="Role " value={roleType} />
            <ProfileItemRow label="Designation" value={designation} />
        <ProfileItemRow label="Level" value={label || ""} />
        <ProfileItemRow 
          label={<FormattedMessage
            id="app.userType"
            defaultMessage="User type"
          />}
          value={employee_type
          } />
{/* 
        <ProfileItemRow
          // label="Reporting Manager"
          label={<FormattedMessage
            id="app.reportingmanager"
            defaultMessage="Reporting Manager"
          />}
          // value={metaData.email || ""}
          // value={`${metaData.firstName} ${metaData.lastName || ""}`}
        /> */}
        {/* <ProfileItemRow label="TimeZone" value={timeZone} /> */}
        {/* <ProfileItemRow label="Role" value={role} /> */}
      </>
    );
  }
}

export default EmployeeAboutView;

const ProfileItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center flex-no-wrap m-2"
    >
     <div class=" text-[#444] font-semibold" >{label}</div>
     <div className="overflow-hidden truncate ml-8">{value}</div>
    </div>
  );
};
