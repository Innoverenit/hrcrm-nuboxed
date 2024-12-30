import React, { Component } from "react";

class ProjectDetailsView extends Component {
  render() {
    console.log("name",this.props.projectsById.projectName)
    const {
      projectsById: { creatorName,customerName },
      toggleViewType,
       projectsById,
    } = this.props;

    return (
      <>
        <ProjectItemRow 
        label={this.props.translatedMenuItems[0]}     
          value={creatorName}
        />
        <ProjectItemRow 
        label={this.props.translatedMenuItems[1]}     
          
          value={customerName}
        />
      </>
    );
  }
}
export default ProjectDetailsView;

const ProjectItemRow = ({ label, value }) => {
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto m-[0.4rem] ">
  
      <div style={{ color: "#444", fontWeight: 600 }}>{label}</div>
      <div>{value}</div>
    </div>
  );
};
