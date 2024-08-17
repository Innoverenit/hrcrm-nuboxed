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
      <div className="sticky mt-1 z-50">    
        <ActionHeader
          leftComponent={
            <Suspense fallback={<BundleLoader />}>
            <DealActionLeft
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
            teamsAccessInd={teamsAccessInd}
              viewType={viewType}
              setDealViewType={setDealViewType}
            /></Suspense>
          }
          rightComponent={
            <Suspense fallback={<BundleLoader />}>
               <DealActionRight
                 selectedLanguage={this.props.selectedLanguage}
                 translateText={this.props.translateText}
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
