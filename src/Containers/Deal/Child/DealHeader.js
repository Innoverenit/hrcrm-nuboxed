import React, { Component,lazy,Suspense } from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader} from "../../../Components/Placeholder";
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
            <Suspense fallback={<BundleLoader />}>
            <DealActionLeft
            teamsAccessInd={teamsAccessInd}
              viewType={viewType}
              setDealViewType={setDealViewType}
            /></Suspense>
          }
          rightComponent={
            <Suspense fallback={<BundleLoader />}>
               <DealActionRight
              viewType={viewType}
              opencreateDealModal={opencreateDealModal}
              handleDealModal={handleDealModal}
            /></Suspense>
          }
        />
      </div>
    );
  }
}

export default DealHeader;
