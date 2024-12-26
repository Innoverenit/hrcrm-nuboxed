
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
      
          label={this.props.translatedMenuItems[0]}
          value={tagWithCompany} />
        <ContactInvestItemRow 
        
          label={this.props.translatedMenuItems[1]}
          value={department} />
        <ContactInvestItemRow  
    
          label={this.props.translatedMenuItems[2]}
          value={designation} />
<ContactInvestItemRow 
      
          label={this.props.translatedMenuItems[3]}
          value={source} />
        <ContactInvestItemRow
     
        label={this.props.translatedMenuItems[4]}
          value={emailId} />
        <ContactInvestItemRow 
   
        label={this.props.translatedMenuItems[5]}
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
