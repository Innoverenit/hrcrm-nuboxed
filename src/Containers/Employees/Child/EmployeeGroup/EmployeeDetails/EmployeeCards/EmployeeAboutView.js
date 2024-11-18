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
        
        </div>
        <ProfileItemRow 
        label="Email" 
        
          value={emailId} />
        <ProfileItemRow 
        label="Emp Id" 
         
          value={employeeId} />
       
           <ProfileItemRow label="Department" value={department} />
           <ProfileItemRow label="Role " value={roleType} />
            <ProfileItemRow label="Designation" value={designation} />
        <ProfileItemRow label="Level" value={label || ""} />
        <ProfileItemRow 
          label="User type"
       
          value={employee_type
          } />
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
