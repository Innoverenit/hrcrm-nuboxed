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
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <OpportunityActionLeft
              viewType={viewType}
              teamsAccessInd={teamsAccessInd}
              setOpportunityViewType={setOpportunityViewType}
              currentData={currentData}
              handleClear={handleClear}
              setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <OpportunityActionRight
              viewType={viewType}
              handleOpportunityModal={handleOpportunityModal}
            />
          }
        />
      </div>
    );
  }
}

export default OpportunityHeader;
