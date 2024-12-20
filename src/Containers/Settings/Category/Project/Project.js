import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, message ,Input} from "antd";
import { MainWrapper  } from "../../../../Components/UI/Layout";
import { TextInput } from "../../../../Components/UI/Elements";

import {addProjectsData,
  getProjectsData,
  updateProjectsData,
  removeProjectData} from "../Project/ProjectAction"
import dayjs from "dayjs";
import SingleProject from "./SingleProject";



class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingUnit: false,
      projectName: "",
      type: "",
      singleProject: "",
      editInd:true,
      currentData: ""
    };
  }
  handleClear = () => {
    this.setState({ currentData: "" });
     this.props.getProjectsData(this.props.organizationId);
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
    handleAddProject = () => {
    const { addProjectsData, projectsData } = this.props;
    const { projectName, addingProjectsData, isTextInputOpen,editInd
    } = this.state;
    let project = { projectName,editInd
    };

    let exist =
    projectsData &&
    projectsData.some((element) => element.projectName == projectName);

    if (exist) {
      message.error(
        "Can't create as another unit type exists with same name!"
      );
    } else {
      addProjectsData(project, () => console.log("add unit callback"));
    }

    this.setState({
      projectName: "",
      singleProject: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleDeleteProject = (projectId={projectId}) => {
    this.props.removeProjectData(projectId);
    this.setState({ projectName: "", projectId: "" });
  };
  handleUpdateProject = (projectName,projectId ,editInd, cb) => {
    this.props.updateProjectsData(projectName, projectId,editInd, cb);
    this.setState({ projectName: "", singleProject: "",editInd: true });
  };

  componentDidMount() {
    const { getProjectsData ,organizationId} = this.props;
    console.log();
    getProjectsData(organizationId);
  }
  render() {
    const {
      fetchingProjectsData,
      fetchingProjectsDataError,
      projectsData,
      addingProjectsData,
      updatingProjectsData,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      projectName,
      singleProject,
      linkedTasks,
    } = this.state;
    if (fetchingProjectsData) return <p>Loading ...</p>;

    return (
      <>
    <div class=" flex flex-row flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
                     <div class=" flex w-[18vw]" >
          <Input
            placeholder="Search by Name"
            width={"100%"}
           
            onChange={(e) => this.handleSearchChange(e)}
            value={this.props.currentData}
          />
           <Button
          type={this.props.currentData ? "primary" : "danger"}
       
        >
          Submit
        </Button>
        &nbsp;
        <Button
          type={this.props.currentData ? "primary" : "danger"}
          onClick={() => {
            this.handleClear();
          }}
        >
         Clear
      
        </Button>
        </div>
        <div class=" flex flex-col flex-wrap items-start self-start justify-start grow shrink h-auto mr-auto ">
              <MainWrapper style={{ height: "30em", marginTop: "0.625em" }}>
                {projectsData.length &&
                  projectsData.map((project, i) => (
                    <SingleProject
                      //  key={i}
                      value={singleProject}
                      name="singleProject"
                        project={project}
                      linkedTasks={linkedTasks}
                      updatingProjectsData={updatingProjectsData}
                      handleUpdateProject={this.handleUpdateProject}
                      handleChange={this.handleChange}
  
                      handleDeleteProject={this.handleDeleteProject}
                    />
                   ))} 
              </MainWrapper>
            </div>
            {isTextInputOpen ? (
               <div class=" flex flex-row flex-wrap items-center ml-1 mt-1 self-start justify-start grow shrink h-auto mr-auto ">
             
                <br />
                <br />
                <TextInput
                  placeholder="Add More"
                  name="projectName"
                  value={projectName}
                   onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!projectName}
                  Loading={addingProjectsData}
                  onClick={this.handleAddProject}
                  style={{ marginRight: "0.125em" }}
                >
                  Save
                </Button>
                &nbsp;
                <Button type="primary" ghost onClick={this.toggleInput}>
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <br />
                <div class=" flex flex-row flex-wrap items-start self-start justify-end grow shrink h-auto mr-auto ">
                  <Button
                    type="primary"
                    ghost
                    htmlType="button"
                     Loading={addingProjectsData}
                    onClick={this.toggleInput}
                  >
                    Add More
                  </Button>
                </div>
                <div>Updated on {dayjs(this.props.projectsData && this.props.projectsData.length && this.props.projectsData[0].updationDate).format("ll")} by {this.props.projectsData && this.props.projectsData.length && this.props.projectsData[0].name}</div>
              </>
            )}
          </MainWrapper>
         
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ projects,auth }) => ({
  addingProjectsData: projects.addingProjectsData,
  addingProjectsDataError: projects.addingProjectsDataError,
  projectsData: projects.projectsData,

  removingProjectsData: projects.removingProjectsData,
  removingProjectsDataError: projects.removingProjectsDataError,

  organizationId: auth.userDetails.organizationId,
  fetchingProjectsData:projects.fetchingProjectsData,
  fetchingProjectsDataError: projects.fetchingProjectsDataError,

  updatingProjectsData: projects.updatingProjectsData,
  updatingProjectsDataError: projects.updatingProjectsDataError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
       getProjectsData,
    addProjectsData,
     removeProjectData,
     updateProjectsData,
   
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Project);
