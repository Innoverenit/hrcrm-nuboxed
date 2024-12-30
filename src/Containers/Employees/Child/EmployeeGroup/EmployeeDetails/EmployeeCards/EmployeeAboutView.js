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
        // label={this.props.translatedMenuItems[0]}
          value={emailId} />
        <ProfileItemRow 
            // label={this.props.translatedMenuItems[1]}
           label="Emp Id"     
          value={employeeId} />   
           <ProfileItemRow 
           label="Department" 
          //  label={this.props.translatedMenuItems[1]}
           value={department} />
           <ProfileItemRow 
              //  label={this.props.translatedMenuItems[2]}
           label="Role "
           value={roleType} />
            <ProfileItemRow 
                // label={this.props.translatedMenuItems[3]}
            label="Designation"
             value={designation} />
        <ProfileItemRow
            // label={this.props.translatedMenuItems[4]}
         label="Level" 
         value={label || ""} />
        <ProfileItemRow 
          label="User type"
          // label={this.props.translatedMenuItems[6]}
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
