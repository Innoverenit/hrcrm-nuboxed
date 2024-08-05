
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";

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
          label={<FormattedMessage
            id="app.company"
            defaultMessage="Company"
          />}
          value={tagWithCompany} />
        <ContactInvestItemRow 
          label={<FormattedMessage
            id="app.department"
            defaultMessage="Department"
          />}
          value={department} />
        <ContactInvestItemRow  
          label={<FormattedMessage
            id="app.designation"
            defaultMessage="Designation"
          />}
          value={designation} />
<ContactInvestItemRow 
          label={<FormattedMessage
            id="app.source"
            defaultMessage="Source"
          />}
          value={source} />
        <ContactInvestItemRow //label="Email" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email"
          />}
          value={emailId} />
        <ContactInvestItemRow //label="Mobile #" 
          label={<FormattedMessage
            id="app.mobileNumber"
            defaultMessage="Mobile #"
          />}
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
