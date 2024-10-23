import React, { Component,lazy } from "react";
import { ActionHeader } from "../../../Components/Utils";
const ProjectsActionRight =lazy(()=> import('./ProjectsActionRight'));
const ProjectsActionLeft =lazy(()=> import('./ProjectsActionLeft'));
class ProjectsHeader extends Component {
  render() {
    const { handleProjectsModal, viewType, setCourseViewType } = this.props;
    return (
      <>
         <div className="sticky mt-1 z-50"> 
          <ActionHeader
            leftComponent={
              <ProjectsActionLeft
              setProjectsViewType={this.props.setProjectsViewType}
                viewType={this.props.viewType}
              />
            }
            rightComponent={
              <ProjectsActionRight
                viewType={viewType}
                handleProjectsModal={handleProjectsModal}
              />
            }
          />
        </div>

        <div></div>
      </>
    );
  }
}

export default ProjectsHeader;
