import React, { Component } from "react";
import { FlexContainer } from "../../../../../Components/UI/Layout";
class OpportunityReportDetails extends Component {
  render() {
    console.log(this.props.opportunity);
    const {
      opportunity: { customer },
      
    } = this.props;
    // console.log(recruiterDetails)
    // const recruiterName=recruiterDetails&&recruiterDetails.length&&recruiterDetails[0].fullName || "";
    return (
      <>
        <FlexContainer justifyContent="flex-end">
           
        </FlexContainer>
        <OpportunityItemRow label="Customer"
         value={customer} 
        />
          {/* <MultiAvatar
                // primaryTitle={

                //    opportunity.opportunityName || opportunity.opportunityId
                // }
                primaryTitle={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].fullName||""}
                imageId={item.recruiterDetails&&item.recruiterDetails.length&&item.recruiterDetails[0].imageId||""}
                imageURL={imageURL}
              /> */}
        {/* <PartnerItemRow label= "Tax Reg. No." value={taxRegistrationNumber}/>
        <PartnerItemRow label="Bank Name" value={bankName} />
        <PartnerItemRow label="Account No." value={accountNumber}/> */}
      </>
    );
  }
}
export default OpportunityReportDetails;

const OpportunityItemRow = ({ label, value }) => {
  return (
    <FlexContainer
      alignItems="center"
      flexWrap="nowrap"
      // style={{ margin: "5px" }}
    >
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{label}</div>
     <div className=" text-xs font-poppins font-bold flex whitespace-nowrap w-wk" >{value}</div>
    </FlexContainer>
  );
};
