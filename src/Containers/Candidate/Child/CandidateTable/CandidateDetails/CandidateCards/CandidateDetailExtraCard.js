import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const CandidateDetailExtra = lazy(()=>import("./CandidateDetailExtra"));

class CandidateDetailExtraCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateDetailExtra candidate={candidate}
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

export default CandidateDetailExtraCard;
