import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const DealActionLeft = lazy(()=>import("./DealActionLeft"));
const DealActionRight = lazy(()=>import("./DealActionRight"));

class DealHeader extends Component {
  render() {
    const {
      handleDealModal,
      viewType,
      setDealViewType,
      teamsAccessInd,
      opencreateDealModal
    } = this.props;
    return (
      <div style={{position: "sticky",
        top: "3.35rem",
        zIndex: "998"}}>
        <ActionHeader
          leftComponent={
            <DealActionLeft
            teamsAccessInd={teamsAccessInd}
              viewType={viewType}
              setDealViewType={setDealViewType}
            />
          }
          rightComponent={
            <DealActionRight
              viewType={viewType}
              opencreateDealModal={opencreateDealModal}
              handleDealModal={handleDealModal}
            />
          }
        />
      </div>
    );
  }
}

export default DealHeader;
