import React, { Component,lazy } from "react";
import { ActionHeader } from "../../Components/Utils";
const RequirementActionLeft =lazy(()=>import("./RequirementActionLeft"));
// const CandidateActionRight = lazy(()=>import("./CandidateActionRight"));

class RequirementHeader extends Component {
  render() {
    const {viewType, setRequirementViewType } = this.props;
    return (
      <div>
        <ActionHeader
          leftComponent={
            <RequirementActionLeft
              viewType={viewType}
              handleChange={this.props.handleChange}
            //   text={this.props.text}
              setRequirementViewType={setRequirementViewType}
              currentData={this.props.currentData}
              handleClear={this.props.handleClear}
            //   setCurrentData={this.props.setCurrentData}
              // currentSkillData={this.props.currentSkillData}
              // handleSkillClear={this.props.handleSkillClear}
              // setCurrentSkillData={this.props.setCurrentSkillData}
            />
          }
        //   rightComponent={
        //     <CandidateActionRight 
        //     handleCandidateModal={handleCandidateModal}
        //     handleCandidateResumeModal={handleCandidateResumeModal}
            
        //     />
        //   }
        />
      </div>
    );
  }
}

export default RequirementHeader;