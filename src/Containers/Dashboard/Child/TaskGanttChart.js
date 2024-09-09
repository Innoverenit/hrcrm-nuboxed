import React,{useEffect} from 'react';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import {getTakskdashboardGantt} from "../DashboardAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from '../../../Components/Placeholder';

const TaskGanttChart = (props) => {


  useEffect(()=>{
 
    props.getTakskdashboardGantt(props.userId);
},[props.userId])
useEffect(()=>{
  
},[props.tasksdashboardGantt])


  
const tasks = props.tasksdashboardGantt.map(item => {
  const start = item.startDate ? new Date(item.startDate) : new Date();
  const end = item.endDate ? new Date(item.endDate) : new Date();

  if (isNaN(start.getTime())) {
    console.error(`Invalid startDate for task ${item.taskId}: ${item.startDate}`);
  }
  if (isNaN(end.getTime())) {
    console.error(`Invalid endDate for task ${item.taskId}: ${item.endDate}`);
  }

  return {
    id: item.taskId,
    name: item.taskName,
    start,
    end,
  };
});

  if (props.fetchingTaskDashboardGantt) {
    return <BundleLoader />;
  }

  return (
    <div>
      {props.tasksdashboardGantt.length?
      <Gantt tasks={tasks} />:null}
    </div>
  );
};



const mapStateToProps = ({ task,auth,dashboard }) => ({
   userId: auth.userDetails.userId,
   tasksdashboardGantt:dashboard.tasksdashboardGantt,
   fetchingTaskDashboardGantt:dashboard.fetchingTaskDashboardGantt,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getTakskdashboardGantt
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskGanttChart);