import React, { Component } from "react";
import { SubTitle } from "../../../../../Components/UI/Elements";
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
   
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ textAlign: "end" }}>{value}</SubTitle>
    </div>
  );
};
