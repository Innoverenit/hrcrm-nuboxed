import React, { Component } from "react";
import { Tooltip } from "antd";
import { SubTitle } from "../../../../../../Components/UI/Elements";



class CandidateOverViewDetail extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { address },
    } = this.props;
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
     
        <CandidateItemRow //label="Company" 
        
          label="Address"
           
          value={addressdata||""}        
          />
                  <CandidateItemRow label="Street" value={addressdata1||""} />
        <CandidateItemRow label="City" value={addressdata2||""} />
        <CandidateItemRow label="State" value={addressdata3||""} />
        <CandidateItemRow label="Postal Code" value={addressdata4||""} />
       
      </>
    );
  }
}
export default CandidateOverViewDetail;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem]
 ">
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em" }}>
        <Tooltip title={value}>
        {value}
        </Tooltip>
        </SubTitle>
    </div>
  );
};
