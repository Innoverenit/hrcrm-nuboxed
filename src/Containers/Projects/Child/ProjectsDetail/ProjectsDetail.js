import React, { useEffect,Suspense,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProjectDetailById } from "../../ProjectsAction";
import { MainWrapper } from "../../../../Components/UI/Layout";
import { useParams } from "react-router-dom";
import { BundleLoader } from "../../../../Components/Placeholder";
import ProjectsDetailHeader from "./ProjectsDetailHeader";
import ProjectsDetailLeft from "./ProjectsDetailLeft";
import ProjectDetailsRight from "./ProjectDetailsRight";

function ProjectsDetail  (props){
  const { ProjectId, data } = useParams();
  // componentDidMount() {
  
  //     this.props.getProjectDetailById(this.props.match.params.ProjectId);
  // }
  // render() {
     useEffect(() => {
        props.getProjectDetailById(ProjectId);
      }, [ProjectId]);
    // console.log(projectsById)
    const { projectsById, fetchingProjectsDetailById } = props;
    return (
      <>
        <>
          <ProjectsDetailHeader />
          {fetchingProjectsDetailById ? (
            <MainWrapper>
              <BundleLoader />
            </MainWrapper>
          ) : 
          (
              <div>
                <Suspense >
                <div class=" flex flex-nowrap w-full"
                >
                    <div class=" w-1/4">
                      <ProjectsDetailLeft projectsById={projectsById} />
                    </div>
                    <div class=" w-3/4">
                      <ProjectDetailsRight projectsById={projectsById} />
                    </div> 
                  </div>
                </Suspense>
              </div>
            )}
        </>
      </>
    );
  }

const mapStateToProps = ({ projects }) => ({
     fetchingProjectsDetailById: projects.fetchingProjectsDetailById,
     projectsById: projects.projectsById,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getProjectDetailById,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsDetail)

