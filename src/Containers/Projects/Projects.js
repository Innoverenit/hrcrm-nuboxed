import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {setProjectsViewType,
    handleProjectsModal
} from "../Projects/ProjectsAction"
import { BundleLoader } from "../../Components/Placeholder";
const ProjectsAllTable =lazy(()=> import('./ProjectsAllTable'));
const AddProjectsModal =lazy(()=> import('./Child/AddProjectsModal'));
const ProjectsHeader =lazy(()=> import('./Child/ProjectsHeader'));
const ProjectsTable =lazy(()=> import('./Child/ProjectsTable'));

class Projects extends Component {

  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };
  render() {
    const {
        setProjectsViewType,
        addProjectsModal,
        handleProjectsModal,
      viewType,
    } = this.props;
    return (
      <React.Fragment>
        <ProjectsHeader        
         setProjectsViewType={setProjectsViewType}
          viewType={viewType}
          handleProjectsModal={handleProjectsModal}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <AddProjectsModal
        addProjectsModal={addProjectsModal}
        handleProjectsModal={handleProjectsModal}
        />
          <Suspense fallback={<BundleLoader/>}>
      {this.props.viewType === "list" ? (
        <ProjectsTable
        translateText={this.props.translateText}
        translatedMenuItems={this.translatedMenuItems}
        selectedLanguage={this.props.selectedLanguage}/>
      ) : this.props.viewType === "all" ?
        (
          <ProjectsAllTable 
          translateText={this.props.translateText}
          translatedMenuItems={this.translatedMenuItems}
          selectedLanguage={this.props.selectedLanguage}
          />
        ) : null}
</Suspense>
      
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ projects }) => ({
    viewType: projects.viewType,
    addProjectsModal:projects.addProjectsModal

});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        handleProjectsModal,
    setProjectsViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Projects);
