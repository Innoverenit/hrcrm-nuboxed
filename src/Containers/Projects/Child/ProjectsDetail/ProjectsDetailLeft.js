import React, { Component,lazy} from "react";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectOverViewCard from "./ProjectOverViewCard";
import CandidateTopicOfInterest from "../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateCards/CandidateTopicOfInterest";
import CertificationLibrary from "../../../Candidate/Child/CandidateTable/CandidateDetails/CandidateCards/CertificationLibrary";

class ProjectsDetailLeft extends Component {
  render() {
    console.log("name",this.props.projectsById)
    const { projectsById } = this.props;
    return (
      <>
        <div class=" flex flex-col" >
         <ProjectOverViewCard projectsById={projectsById}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems} />
         <ProjectDetailsCard projectsById={projectsById}
           translateText={this.props.translateText}
           selectedLanguage={this.props.selectedLanguage}
           translatedMenuItems={this.props.translatedMenuItems}
         />
         <CandidateTopicOfInterest
      //    userType={"employee"}
      //    uniqueId={this.props.singleEmployee.employeeId}
      //    employeeId={this.props.singleEmployee.employeeId}
      //   translateText={this.props.translateText}
      //   selectedLanguage={this.props.selectedLanguage}
      // translatedMenuItems={this.props.translatedMenuItems}
      />
         <CertificationLibrary/>
         </div>
      </>
    );
  }
}
export default ProjectsDetailLeft;
