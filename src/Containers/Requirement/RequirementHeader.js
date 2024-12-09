import React, { Component,lazy } from "react";
import { ActionHeader } from "../../Components/Utils";
const RequirementActionRight =lazy(()=>import("./RequirementActionRight"));
const RequirementActionLeft =lazy(()=>import("./RequirementActionLeft"));

class RequirementHeader extends Component {
  render() {
    const {viewType, setRequirementViewType, handleNwRecruitModal } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <RequirementActionLeft
              viewType={viewType}
              handleChange={this.props.handleChange}
              setRequirementViewType={setRequirementViewType}
              currentData={this.props.currentData}
              handleClear={this.props.handleClear}
              selectedLanguage={this.props.selectedLanguage}
              translateText={this.props.translateText}
          
            />
          }
          rightComponent={
            <RequirementActionRight         
            translateText={this.props.translateText}
            selectedLanguage={this.props.selectedLanguage}
            handleNwRecruitModal={handleNwRecruitModal}
            
            />
          }
        />
      </div>
    );
  }
}

export default RequirementHeader;