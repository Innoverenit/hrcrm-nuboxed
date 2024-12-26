import React, { Component,lazy } from "react";
import { ViewEditCard } from "../../../../Components/UI/Elements";
import ProjectDetailsView from "./ProjectDetailsView";
import ProjectOverView from "./ProjectOverView";



class ProjectDetailsCard extends Component {
  render() {
    console.log("tim",this.props.projectsById)
    const { projectsById } = this.props;
    return (
      <div>
        <ViewEditCard>
          {({ viewType }, toggleViewType) =>
            viewType === "view" ? (
              <ProjectDetailsView projectsById={projectsById}
              translateText={this.props.translateText}
              selectedLanguage={this.props.selectedLanguage}
              translatedMenuItems={this.props.translatedMenuItems} />
            ) : null
          }
        </ViewEditCard>
      </div>
    );
  }
}

export default ProjectDetailsCard;
