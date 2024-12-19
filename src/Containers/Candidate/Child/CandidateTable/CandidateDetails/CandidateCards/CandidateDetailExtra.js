import React, { Component } from "react";

class CandidateDetailExtra extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { noticePeriod,noticeDetail,experience,location },
    } = this.props;
    // const extraData=;
    // const extraData1=address&&address.length&&address[0].street;
    // const extraData2=address&&address.length&&address[0].city;
    // const extraData3=address&&address.length&&address[0].state;
    // const extraData4=address&&address.length&&address[0].postalCode;
    return (
      <>
        <CandidateItemRow label="Notice Period"  value={`${noticePeriod } months ${noticeDetail}`}/> 
        {/* <CandidateItemRow label="Notice Remarks" value={noticeDetail} /> */}
        <CandidateItemRow label="Experience" value= {`${experience } years `}/> 
        {/* <CandidateItemRow label="Location" value={location} /> */}
        {/* <CandidateItemRow label="Postal Code" value={extraData4||""} /> */}
       
      </>
    );
  }
}
export default CandidateDetailExtra;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center justify-between flex-nowrap m-2"
    >
      <div  style={{ color: "#444", fontWeight: 600 }}>{label}</div >
      <div  style={{ marginLeft: "-1.875em",overflow:"hidden",textOverflow:"ellipsis" }}>{value}</div >
    </div>
  );
};



