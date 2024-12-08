import React ,{useEffect,useState}from 'react';
import { Gantt } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import {getThisMonthTaskGantt} from "../DashboardAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from 'dayjs';
import { BundleLoader } from '../../../Components/Placeholder';

const TaskThisMonthGanttChart = (props) => {
    const startDate = dayjs().startOf("month"); 
    const endDate = dayjs();
    var today = new Date(),
    date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();

    const [dateD,setdateD]=useState(date);
    const [startDatestart,setstartDate]=useState(startDate);
    const [endDateend,setendDate]=useState(endDate);
  const data = [
    {
      taskId: "TIF86786106513252023",
      taskType: "Whatsapp",
      taskName: "whats",
      startDate: "2023-09-26T20:00:00Z",
      endDate: "2023-09-26T20:00:00Z",
    },
    
  ];

  useEffect(()=>{
    const startDate = `${startDatestart.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${endDateend.format("YYYY-MM-DD")}T20:00:00Z`
    props.getThisMonthTaskGantt(props.userId,endDate,startDate);
},[props.userId])

useEffect(()=>{
  
},[props.thisMonthTaskGant])

  
  const tasks = props.thisMonthTaskGant.map(item => ({
    id: item.taskId,
    name: item.taskName,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
  }));
  console.log(props.thisMonthTaskGant)
// const tasks = (props.thisMonthTaskGant || []).map(item => ({
//     id: item.taskId,
//     name: item.taskName,
//     start: item.startDate ? new Date(item.startDate) : null,
//     end: item.endDate ? new Date(item.endDate) : null,
//   }));
  
  if (props.fetchingThisMonthTaskGantt) {
    return <BundleLoader />;
  }

  return (
    <div >
     
      {props.thisMonthTaskGant.length?
      <Gantt tasks={tasks} />:null}
    </div>
  );
};




const mapStateToProps = ({ task,auth,dashboard }) => ({
    // leavesGantt:dashboard.leavesGantt,
     orgId: auth.userDetails.organizationId,
     userId: auth.userDetails.userId,
     thisMonthTaskGant:dashboard.thisMonthTaskGant,
     fetchingThisMonthTaskGantt:dashboard.fetchingThisMonthTaskGantt,
    //  fetchingLeavesGantt:dashboard.fetchingLeavesGantt,
    // viewType: task.viewType,
    // grantTask:task.grantTask,
    // fetchingGrantTask:task.fetchingGrantTask
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getThisMonthTaskGantt
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(TaskThisMonthGanttChart);