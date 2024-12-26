import React, { Component } from "react";


class CandidateExtraDetailView extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { roleType,emailId,mobileNumber,linkedin,nationality },
    } = this.props;
   
    return (
      <>
      <CandidateItemRow     // label="Email ID"  
          label={this.props.translatedMenuItems[0]}        
          value={emailId} 
          />
          <CandidateItemRow   // label="Mobile #"    
          label={this.props.translatedMenuItems[1]}
          value={mobileNumber} />

          <CandidateItemRow    // label="Linkedin"    
          label={this.props.translatedMenuItems[2]}
           value={linkedin} />
            
          <CandidateItemRow       
           label="Nationality" 
           value={nationality} />

          <CandidateItemRow  // label="Role"    
          label={this.props.translatedMenuItems[3]}
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
       <div className="text-[#444] font-semibold text-sm"  >{label}</div >
       <div className="-ml-6 hidden ellipsis">{value}</div >
    </div>
  );
};



