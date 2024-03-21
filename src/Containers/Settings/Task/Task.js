
import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { Button,Input} from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import { MainWrapper } from "../../../Components/UI/Layout";
import { TextInput, } from "../../../Components/UI/Elements";
import dayjs from "dayjs";
import {
  getTasks,
  getTaskCount,
  addTasks,
  removeTask,
  updateTasks,
  searchTaskName,
  ClearReducerDataOfTask
} from "./TaskAction";
const SingleTasks = lazy(() =>
  import("./SingleTasks")
);

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkedTasks: [],
      isTextInputOpen: false,
      addingTask: false,
      taskType: "",
      type: "",
      singleTask: "",
      editInd:true,
      currentData: ""
    };
  }
  handleChangeDes = (e) => {
    this.setState({ currentData: e.target.value });
  
    if (e.target.value.trim() === "") {
      this.setState((prevState) => ({ pageNo: prevState.pageNo + 1 }));
      this.props.getTasks();
      this.props.ClearReducerDataOfTask();
    }
  };
  handleSearch = () => {
    if (this.state.currentData.trim() !== "") {
      // Perform the search
      this.props.searchTaskName(this.state.currentData);
    } else {
      console.error("Input is empty. Please provide a value.");
    }
  };
  handleClear = () => {
    this.setState({ currentData: "" });
    this.props.getTasks();
  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  handleSearchChange = (e) => {
    // console.log(e.target.value)
    // this.setState({ text: e.target.value });
    this.setState({ currentData: e.target.value })
   
  };
  toggleInput = () =>
    this.setState((prevState) => ({
      isTextInputOpen: !prevState.isTextInputOpen,
    }));
  handleChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value });
  handleAddTasks = () => {
    const { addTasks, tasks } = this.props;
    const { taskType, addingTasks, isTextInputOpen,editInd
    } = this.state;
    let task = { taskType,editInd
    };

    let exist =
    tasks &&
    tasks.some((element) => element.taskType == taskType);

    // if (exist) {
    //   message.error(
    //     "Can't create as another task type exists with same name!"
    //   );
    // } else {
      addTasks(task, () => console.log("add task callback"));
    // }

    this.setState({
      taskType: "",
      singleTask: "",
      isTextInputOpen: false,
      editInd:true,
    });
  };
  handleDeleteTask = (taskTypeId={taskTypeId}) => {
    this.props.removeTask(taskTypeId);
    this.setState({ taskType: "", singleTask: "" });
  };
  handleUpdateTask = (taskType, taskTypeId,editInd, cb) => {
    this.props.updateTasks(taskType, taskTypeId,editInd, cb);
    this.setState({ taskType: "", singleTask: "",editInd: true });
  };
  // getLinkedDocuments = () => {
  //   axios
  //     .get(`${base_url}/opportunity/source/linkedSources`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({ linkedSources: res.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  componentDidMount() {
    const { getTasks,getTaskCount,orgId } = this.props;
    console.log();
    getTasks();
    getTaskCount(orgId);
    // this.getLinkedSources();
  }
  render() {
    const {
      fetchingTasks,
      fetchingTasksError,
      tasks,
      addingTasks,
      updatingTasks,
    } = this.props;
    const {
      isTextInputOpen,
      type,
      taskType,
      singleTask,
      linkedTasks,
    } = this.state;
    if (fetchingTasks) return <BundleLoader/>;
    if (fetchingTasksError) return <p>We are unable to load data</p>;
    return (
      <>
        <div class="flex flex-nowrap" >
          <MainWrapper
            style={{
              flexBasis: "100%",
              // height: "30.625em",
              overflow: "auto",
              color: "#FFFAFA",
            }}
          >
              <div class=" flex flex-row justify-between">
         <div class=" flex w-[18vw]" >
            <Input
         placeholder="Search by Name"
        style={{width:"100%",marginLeft:"0.5rem"}}
            // suffix={suffix}
            onPressEnter={this.handleSearch}  
            onChange={this.handleChangeDes}
            // value={currentData}
          />
            </div>
            {isTextInputOpen ? (
               <div class=" flex items-center ml-[0.3125em] mt-[0.3125em]"
            
               >
             
                <TextInput
                  placeholder="Add Task"
                  name="taskType"
                  value={taskType}
                  onChange={this.handleChange}
                  width="55%"
                  style={{ marginRight: "0.125em" }}
                />
                &nbsp;
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!taskType}
                  loading={addingTasks}
                  onClick={this.handleAddTasks}
                  style={{ marginRight: "0.125em" }}
                >
                  {/* Save */}
                  <FormattedMessage id="app.save" defaultMessage="Save" />
                </Button>
                &nbsp;
                <Button type="cancel"  onClick={this.toggleInput}>
                  {/* Cancel */}
                  <FormattedMessage id="app.cancel" defaultMessage="Cancel" />
                </Button>
              </div>
            ) : (
              <>
              
                <div class=" flex justify-end" >
                  <Button
                    type="primary"
                    htmlType="button"
                    loading={addingTasks}
                    onClick={this.toggleInput}
                  >
                    {/* Add More */}
                    <FormattedMessage
                      id="app.addmore"
                      defaultMessage="Add More"
                    />
                  </Button>
                </div>
               
              </>
            )}
             </div>
            <div class=" flex flex-col" >
            <MainWrapper className="!h-[69vh] !mt-2" >
              {tasks.length ? (
  tasks
    .slice() 
    .sort((a, b) => a.taskType.localeCompare(b.taskType)) 
    .map((task, i) => (
                    <SingleTasks
                      key={i}
                      value={singleTask}
                      name="singleTask"
                      task={task}
                      linkedTasks={linkedTasks}
                      updatingTasks={updatingTasks}
                      handleChange={this.handleChange}
                      handleUpdateTask={this.handleUpdateTask}
                         handleDeleteTask={this.handleDeleteTask}
                    />
                  ))
                  ) : (
                    <p>No Data Available</p>
                  )}
              </MainWrapper>
            </div>
          
          </MainWrapper>
     
        </div>
        <div class=" font-bold">Updated on {dayjs(this.props.tasks && this.props.tasks.length && this.props.tasks[0].updationDate).format('YYYY-MM-DD')} by {this.props.tasks && this.props.tasks.length && this.props.tasks[0].name}</div>
      </>
    );
  }
}

const mapStateToProps = ({ tasks,auth }) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  tasks: tasks.tasks,
  taskCount:tasks.taskCount,
  orgId: auth.userDetails.organizationId,
  // removingTasks: tasks.removingTasks,
  // removingTasksError: tasks.removingTasksError,
  
  fetchingTasks:tasks.fetchingTasks,
  fetchingTasksError: tasks.fetchingTasksError,

  updatingTasks: tasks.updatingTasks,
  updatingTasksError: tasks.updatingTasksError,
  
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTasks,
      getTaskCount,
      addTasks,
      removeTask,
      updateTasks,
      searchTaskName,
      ClearReducerDataOfTask
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Task);
