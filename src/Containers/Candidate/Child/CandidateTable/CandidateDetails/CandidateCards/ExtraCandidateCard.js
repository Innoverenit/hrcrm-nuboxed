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
        <CandidateItemRow label="Benefits"  value={benifit} />
        <CandidateItemRow label="Billing"
          value={
            <span>
          <CurrencySymbol currencyType={currency} />
          {billing}
          </span>
          }
        />
        
        <CandidateItemRow label="Cost Type" value={costType} />
       
      </> 
    );
  }
}
export default ExtraCandidateCard;

const CandidateItemRow = ({ label, value }) => {
  return (
    <div  class=" flex items-center justify-between flex-nowrap m-2"
    >
      <div  style={{ color: "#444", fontWeight: 600 }}>{label}</div >
      <div  style={{ marginLeft: "-1.875em",overflow:"hidden",textOverflow:"ellipsis" }}>{value}</div >
    </div>
  );
};



