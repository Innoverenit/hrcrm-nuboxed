import React, { Component,lazy} from "react";
import { ActionHeader } from "../../../Components/Utils";
const LeadsActionRight=lazy(()=> import("./LeadsActionRight"));
const LeadsActionLeft=lazy(()=> import("./LeadsActionLeft"));

class LeadsHeader extends Component {
  render() {
    const {
      handleLeadsModal,
      viewType,
      setLeadsViewType,
      handleChange,
      currentData,
      handleClear,
      teamsAccessInd
    } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <LeadsActionLeft
            viewType={viewType}
            teamsAccessInd={teamsAccessInd}
            handleChange={handleChange}
            setLeadsViewType={setLeadsViewType}
              // currentData={currentData}
              handleClear={handleClear}
              handleFilterChange={this.props.handleFilterChange}
              filter={this.props.filter}
              setCurrentData={this.props.setCurrentData}
            />
          }
          rightComponent={
            <LeadsActionRight
            viewType={viewType}
            handleLeadsImportModal={this.props.handleLeadsImportModal}
            currentUser={this.props.currentUser} 
            handleDropChange={this.props.handleDropChange}
            handleLeadsModal={handleLeadsModal} />
          }
        />
      </div>
    );
  }
}

export default LeadsHeader;
