import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const CandidateDetailView = lazy(()=>import("./CandidateDetailView"));

class CandidateDetailCard extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <CandidateDetailView
                candidate={candidate}
                toggleViewType={toggleViewType}
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

export default CandidateDetailCard;
