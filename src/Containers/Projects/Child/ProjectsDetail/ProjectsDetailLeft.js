import React, { Component,lazy} from "react";
import ProjectDetailsCard from "./ProjectDetailsCard";
import ProjectOverViewCard from "./ProjectOverViewCard";

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
         </div>
      </>
    );
  }
}
export default ProjectsDetailLeft;
