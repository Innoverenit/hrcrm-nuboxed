import React, { Component } from "react";
class OpportunityRecruiterDetailsDetails extends Component {
  render() {
    console.log(this.props.opportunity);
    const {
      opportunity: { recruiterDetails,assignedTo },
      
    } = this.props;
    console.log(recruiterDetails)
    const recruiterName=recruiterDetails&&recruiterDetails.length&&recruiterDetails[0].fullName || "";
    return (
      <>
      <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
           
        </div>
        <OpportunityItemRow label="Assigned"
        value={assignedTo} 
        />
       
      </>
    );
  }
}
export default OpportunityRecruiterDetailsDetails;

const OpportunityItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
   
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk">{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{value}</div>
    </div>
  );
};
