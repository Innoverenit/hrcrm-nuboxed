import React, { Component } from "react";


class CandidateExtraDetailView extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { roleType,emailId,mobileNumber,linkedin,nationality },
    } = this.props;
   
    return (
      <>
      <CandidateItemRow //label="Mobile Number" 
          label="Email ID"
          
          
          value={emailId} 
          />

<CandidateItemRow //label="Mobile Number" 
          label="Mobile #"
        
          value={mobileNumber} />

        <CandidateItemRow 
          label="Linkedin"
       
           value={linkedin} />
             <CandidateItemRow //label="Mobile Number" 
          label="Nationality"
         
           value={nationality} />
             <CandidateItemRow //label="Mobile Number" 
          label="Role"
         
           value={roleType} />
       
      </>
    );
  }
}
export default CandidateExtraDetailView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center justify-between flex-nowrap m-2"
    >
      <div  style={{ color: "#444", fontWeight: 600 }}>{label}</div >
      <div  style={{ marginLeft: "-1.875em",overflow:"hidden",textOverflow:"ellipsis" }}>{value}</div >
    </div>
  );
};



