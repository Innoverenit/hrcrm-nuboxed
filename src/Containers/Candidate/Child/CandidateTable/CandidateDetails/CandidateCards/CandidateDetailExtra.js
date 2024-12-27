import React, { Component } from "react";

class CandidateDetailExtra extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { noticePeriod,noticeDetail,experience,location },
    } = this.props;
 
    return (
      <>
        <CandidateItemRow 
        // label="Notice Period" 
        label={this.props.translatedMenuItems[6]}
         value={`${noticePeriod } months ${noticeDetail}`}/> 

        <CandidateItemRow 
        label={this.props.translatedMenuItems[6]}
        value= {`${experience } years `}/> 
    
       
      </>
    );
  }
}
export default CandidateDetailExtra;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center justify-between flex-nowrap m-2"
    >
         <div className="text-[#444] font-semibold text-sm"  >{label}</div >
         <div className="-ml-6 hidden ellipsis">{value}</div >
    </div>
  );
};



