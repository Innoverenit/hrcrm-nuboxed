import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const CandidateOverView = lazy(()=>import("./CandidateOverView"));

class CandidateOverViewCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateOverView candidate={candidate}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}
              />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default CandidateOverViewCard;
