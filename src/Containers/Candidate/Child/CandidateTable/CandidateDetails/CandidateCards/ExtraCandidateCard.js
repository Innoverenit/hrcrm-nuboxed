import React, { Component } from "react";
import { CurrencySymbol } from "../../../../../../Components/Common";

class ExtraCandidateCard extends Component {
  render() {
    console.log(this.props.candidate);
    const {
      candidate: { costType,roleType
        ,experience,billing,benifit,currency },
    } = this.props;
    return (
      <>
        <CandidateItemRow
          label={this.props.translatedMenuItems[4]}
          value={benifit} />
        <CandidateItemRow 
          label={this.props.translatedMenuItems[5]}
          value={
            <span>
          <CurrencySymbol currencyType={currency} />
          {billing}
          </span>
          }
        />
        
        <CandidateItemRow 
        label="Cost Type"
        // label={this.props.translatedMenuItems[6]}
         value={costType} />
       
      </> 
    );
  }
}
export default ExtraCandidateCard;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center justify-between flex-nowrap m-2"
    >
      <div className="text-[#444] font-semibold text-sm"  >{label}</div >
      <div className="-ml-6 hidden ellipsis">{value}</div >
    </div>
  );
};



