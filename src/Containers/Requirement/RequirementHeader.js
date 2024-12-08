import React, { Component,lazy } from "react";
import { ActionHeader } from "../../Components/Utils";
import RequirementActionRight from "./RequirementActionRight";
const RequirementActionLeft =lazy(()=>import("./RequirementActionLeft"));

class RequirementHeader extends Component {
  render() {
    const {viewType, setRequirementViewType, handleRecruitModal } = this.props;
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
            handleRecruitModal={handleRecruitModal}
            
            />
          }
        />
      </div>
    );
  }
}

export default RequirementHeader;