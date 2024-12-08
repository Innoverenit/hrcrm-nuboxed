import React, { Component,lazy,Suspense} from "react";
import { ActionHeader } from "../../../Components/Utils";
import { BundleLoader, } from "../../../Components/Placeholder";
const PitchActionRight=lazy(()=> import("./PitchActionRight"));
const PitchActionLeft=lazy(()=> import("./PitchActionLeft"));

class PitchHeader extends Component {
  render() {
    const {
      handleLeadsModal,
      viewType,
      setPitchViewType,
      teamsAccessInd,
      currentUser,
      setLeadsViewType,
      handleChange,
      currentData,
      handleClear,
      handleCurrentData
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <Suspense fallback={<BundleLoader />}>
            <PitchActionLeft
            isTransferMode={this.props.isTransferMode}
            handleUserSelect={this.props.handleUserSelect}
            selectedDeals={this.props.selectedDeals}
            handleTransferClick={this.props.handleTransferClick}
            showCheckboxes={this.props.showCheckboxes}
            setPitchViewType={setPitchViewType}
            viewType={viewType}
            teamsAccessInd={teamsAccessInd}
            currentUser={currentUser}
            currentData={currentData}
            handleClear={handleClear}
            handleFilterChange={this.props.handleFilterChange}
            filter={this.props.filter}
            handleChange={handleChange}
            handleCurrentData={handleCurrentData}
             
            /></Suspense>
          }
          rightComponent={
            <Suspense fallback={<BundleLoader />}>
            <PitchActionRight
            viewType={viewType}
            // currentUser={this.props.currentUser} 
            // handleDropChange={this.props.handleDropChange}
            handlePitchModal={this.props.handlePitchModal} 
            />
            </Suspense>
          }
        />
      </div>
    );
  }
}

export default PitchHeader;
