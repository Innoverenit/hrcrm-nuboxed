import React, { Component } from "react";
import PartnerOverviewCard from "./PartnerCards/PartnerOverViewCard";
import PartnerDetailCard from "./PartnerCards/PartnerDetailCard";
import PartnerTopicOfIntrest from "./PartnerCards/PartnerTopicOfInterest";
import PartnerBankDetailsViewCard from "./PartnerCards/PartnerBankDetailsViewCard";
class PartnerDetailLeft extends Component {
  render() {
    const { partner } = this.props;
    return (
      <>
     <div class=" block flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          <PartnerOverviewCard partner={partner} />
          <PartnerTopicOfIntrest partner={partner} />
          <PartnerDetailCard partner={partner} />
          <PartnerBankDetailsViewCard partner={partner}/>
        </div>
      </>
    );
  }
}
export default PartnerDetailLeft;
