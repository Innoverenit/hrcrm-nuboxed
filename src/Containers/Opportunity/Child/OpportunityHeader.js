import React, { Component } from "react";
import { ActionHeader } from "../../../Components/Utils";
import OpportunityActionLeft from "./OpportunityActionLeft";
import OpportunityActionRight from "./OpportunityActionRight";
class OpportunityHeader extends Component {
  render() {
    const {
      handleOpportunityModal,
      viewType,
      setOpportunityViewType,
      teamsAccessInd,
      handleChange,
      currentData,
      handleClear,
    } = this.props;
    return (
      <div className="sticky mt-1 z-50"> 
        <ActionHeader
          leftComponent={
            <OpportunityActionLeft
              viewType={viewType}
              teamsAccessInd={teamsAccessInd}
              setOpportunityViewType={setOpportunityViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}
            />
          }
          rightComponent={
            <OpportunityActionRight
              viewType={viewType}
              handleOpportunityModal={handleOpportunityModal}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems}
            />
          }
        />
      </div>
    );
  }
}

export default OpportunityHeader;
