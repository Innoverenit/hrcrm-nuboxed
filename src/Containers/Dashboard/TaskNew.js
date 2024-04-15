
import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDashboardTasks,
  handleTaskNameDrawer
} from "../Dashboard/DashboardAction";
import { BundleLoader } from "../../Components/Placeholder";
const TaskNameDrawer=lazy(()=>import("./TaskNameDrawer"));

class TaskNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particularTaskName:{}
    };
  }
 
  
  componentDidMount() {
    this.props.getDashboardTasks(this.props.userId);
  }
  handleParticularTaskName=(taskNme)=>{
    this.setState({particularTaskName:taskNme})
  }

  render() {
    if (this.props.fetchingDashboardTasks) {
      return <BundleLoader/>
    }
    return (
      <>
          <div className="grid grid-cols-5 gap-4 p-4 h-[22vh] overflow-auto">
  {this.props.dashboardTasks.length &&
    this.props.dashboardTasks.map((item) => {
      // const randomNumber = Math.floor(Math.random() * 100) + 1;
      return (
        <div className="col-span-2 sm:col-span-1">
          <div className="flex" >{item.name}</div>
          <div class="text-2xl cursor-pointer" onClick={()=>{
            this.handleParticularTaskName(item);
            this.props.handleTaskNameDrawer(true)}}>{item.count}</div>
        </div>
      );
    })}
</div>
        <TaskNameDrawer 
        particularTaskName={this.state.particularTaskName}
        taskNameDrwr={this.props.taskNameDrwr}
        handleTaskNameDrawer={this.props.handleTaskNameDrawer}/>
      </>
    );
  }
}

const mapStateToProps = ({ tasks ,dashboard,auth}) => ({
  addingTasks: tasks.addingTasks,
  addingTasksError: tasks.addingTasksError,
  dashboardTasks: dashboard.dashboardTasks,
  userId:auth.userDetails.userId,
  fetchingDashboardTasks:dashboard.fetchingDashboardTasks,
  fetchingDashboardTasksError: dashboard.fetchingDashboardTasksError,
  updatingTasks: tasks.updatingTasks,
  updatingTasksError: tasks.updatingTasksError,
  taskNameDrwr:dashboard.taskNameDrwr,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashboardTasks,
  handleTaskNameDrawer    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskNew);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
