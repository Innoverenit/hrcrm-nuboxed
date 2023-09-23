import React, { Component } from "react";
import { ViewEditCard } from "../../../../../Components/UI/Elements";
import OpportunityReportDetails from "./OpportunityReportDetails";
 import OpportunityRecruiterDetailsEdit from "./OpportunityRecruiterDetailsEdit";

class OpportunityReportCard extends Component {
  render() {
    const { opportunity } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <OpportunityReportDetails
              opportunity={opportunity}
                toggleViewType={toggleViewType}
              />
            ) : (
              <OpportunityRecruiterDetailsEdit
                toggleViewType={toggleViewType}
                opportunity={opportunity}
              />
            )
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default OpportunityReportCard;
