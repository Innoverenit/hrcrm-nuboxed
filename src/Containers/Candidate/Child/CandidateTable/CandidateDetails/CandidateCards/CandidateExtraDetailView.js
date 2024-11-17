import React, { Component } from "react";
import { SubTitle } from "../../../../../../Components/UI/Elements";


class CandidateExtraDetailView extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { roleType,emailId,mobileNumber,linkedin,nationality },
    } = this.props;
   
    return (
      <>
      <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.emailId"
            defaultMessage="Email ID"
          />}
          
          value={emailId} 
          />

<CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.mobileNo"
            defaultMessage="Mobile #"
          />}
          value={mobileNumber} />

        <CandidateItemRow 
          label={<FormattedMessage
            id="app.linkedin"
            defaultMessage="Linkedin"
          />}
           value={linkedin} />
             <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.nationality"
            defaultMessage="Nationality"
          />}
           value={nationality} />
             <CandidateItemRow //label="Mobile Number" 
          label={<FormattedMessage
            id="app.role"
            defaultMessage="Role"
          />}
           value={roleType} />
       
      </>
    );
  }
}
export default CandidateExtraDetailView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-nowrap m-2"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em",overflow:"hidden",textOverflow:"ellipsis" }}>{value}</SubTitle>
    </div>
  );
};



