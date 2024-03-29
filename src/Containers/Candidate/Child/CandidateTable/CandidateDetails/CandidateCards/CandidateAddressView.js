import React, { Component } from "react";
import { SubTitle } from "../../../../../../Components/UI/Elements";

class CandidateAddressView extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { noticePeriod,noticeDetail,experience,address,location },
    } = this.props;
    const addressdata=address&&address.length&&address[0].address1;
    const addressdata1=address&&address.length&&address[0].street;
    const addressdata2=address&&address.length&&address[0].city;
    const addressdata3=address&&address.length&&address[0].state;
    const addressdata4=address&&address.length&&address[0].postalCode;
    return (
      <>
       <CandidateItemRow label="Address" value={addressdata||""} />
        <CandidateItemRow label="Street" value={addressdata1||""} />
        <CandidateItemRow label="City" value={addressdata2||""} />
        <CandidateItemRow label="State" value={addressdata3||""} />
        <CandidateItemRow label="Pin Code" value={addressdata4||""} />
       
      </>
    );
  }
}
export default CandidateAddressView;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center flex-nowrap m-2"
    >
      <SubTitle style={{ color: "#444", fontWeight: 600 }}>{label}</SubTitle>
      <SubTitle style={{ marginLeft: "-1.875em",overflow:"hidden",textOverflow:"ellipsis" }}>{value}</SubTitle>
    </div>
  );
};



