import React, { Component } from "react";

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
    <div  class=" flex items-center justify-between flex-nowrap m-2"
    >
       <div className="text-[#444] font-semibold text-sm"  >{label}</div >
       <div className="-ml-6 hidden ellipsis">{value}</div >
    </div>
  );
};



