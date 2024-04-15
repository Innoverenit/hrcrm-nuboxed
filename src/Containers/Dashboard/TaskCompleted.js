import React, { Component,lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getDashbrdCompletedTasks,
  handleCompletedTaskTypeDrawer
} from "./DashboardAction";
import { BundleLoader } from "../../Components/Placeholder";
const CompletedTaskTypeDrawer=lazy(()=>import("./CompletedTaskTypeDrawer"));

class TaskOpens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      particularTaskName:{}
    };
  }
 
  
  componentDidMount() {
    this.props.getDashbrdCompletedTasks(this.props.userId);
  }
  handleParticularTaskName=(taskNme)=>{
    this.setState({particularTaskName:taskNme})
  }

  render() {
    if (this.props.fetchingDashboardCompletedTasks) {
      return <BundleLoader/>
    }
    return (
      <>
          <div className="grid grid-cols-5 gap-4 p-4 h-[22vh] overflow-auto">
  {this.props.dashbCompletedTasks.length &&
    this.props.dashbCompletedTasks.map((item) => {
      return ( 
        <div className="col-span-2 sm:col-span-1">
          <div className="flex" >{item.name}</div>
          <div class="text-2xl cursor-pointer" onClick={()=>{
            this.handleParticularTaskName(item);
            this.props.handleCompletedTaskTypeDrawer(true)}}>{item.count}</div>
        </div>
      ); 
  })} 
</div>
        <CompletedTaskTypeDrawer 
        particularTaskName={this.state.particularTaskName}
        completedtaskDrwr={this.props.completedtaskDrwr}
        handleCompletedTaskTypeDrawer={this.props.handleCompletedTaskTypeDrawer}/>
      </>
    );
  }
}

const mapStateToProps = ({ tasks ,dashboard,auth}) => ({
  dashbCompletedTasks: dashboard.dashbCompletedTasks,
  userId:auth.userDetails.userId,
  completedtaskDrwr:dashboard.completedtaskDrwr,
  fetchingDashboardCompletedTasks:dashboard.fetchingDashboardCompletedTasks
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashbrdCompletedTasks,
      handleCompletedTaskTypeDrawer    
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskOpens);


// import React from 'react'

// function TaskNew() {
//   return (
//     <div>TaskNew</div>
//   )
// }

// export default TaskNew
