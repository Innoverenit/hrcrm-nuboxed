import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../../../Components/UI/Elements";
const ExtraCandidateCard = lazy(()=>import("./ExtraCandidateCard"));

class ExtraCandidateCardView extends Component {
  render() {
    const { candidate } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ExtraCandidateCard
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

export default ExtraCandidateCardView;
