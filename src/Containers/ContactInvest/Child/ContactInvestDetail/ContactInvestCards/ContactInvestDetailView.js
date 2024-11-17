
import React, { Component } from "react";


class ContactInvestDetailView extends Component {
  render() {
    const {
        contactInVestDetail: {
        tagWithCompany,
        designation,
        department,
        source,
        mobileNumber,
        emailId,
      },
    } = this.props;
    return (
      <>
        <ContactInvestItemRow 
          label="Company"
     
          value={tagWithCompany} />
        <ContactInvestItemRow 
          label="Department"
        
          value={department} />
        <ContactInvestItemRow  
          label="Designation"
       
          value={designation} />
<ContactInvestItemRow 
          label="Source"
        
          value={source} />
        <ContactInvestItemRow
        label="Email" 
        
          value={emailId} />
        <ContactInvestItemRow 
        label="Mobile #" 
         
          value={mobileNumber} />
      </>
    );
  }
}
export default ContactInvestDetailView;

const ContactInvestItemRow = ({ label, value }) => {
  return (
    <div class=" flex items-center w-[95%] justify-between flex-no-wrap m-2">
    <div class=" text-[#444] font-semibold" >{label}</div>
    <div className="overflow-hidden truncate ml-8">{value}</div>
  </div>

  );
};
