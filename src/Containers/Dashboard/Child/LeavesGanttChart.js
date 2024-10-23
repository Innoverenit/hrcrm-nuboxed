import React,{useEffect,useState} from 'react';
import { Gantt,ViewMode } from 'gantt-task-react';
import { ViewSwitcher } from "../../../Components/ViewSwitcher";
import "gantt-task-react/dist/index.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getLeavesGantt} from "../DashboardAction"
import { BundleLoader } from '../../../Components/Placeholder';

function LeavesGanttChart(props){

    // const startDate = dayjs().startOf("month"); 
    // const endDate = dayjs();
    // var today = new Date(),
    // date =
    //   today.getFullYear() +
    //   "-" +
    //   (today.getMonth() + 1) +
    //   "-" +
    //   today.getDate();
  
    //   const [dateD,setdateD]=useState(date);
      const [startDatestart,setstartDate]=useState("2023-09-01");
      const [endDateend,setendDate]=useState("2023-10-12");
      const [view, setView] = React.useState(ViewMode.Day);
      const [isChecked, setIsChecked] = React.useState(true);
    useEffect(()=>{
        const startDate = `${startDatestart}T20:00:00Z`
    const endDate = `${endDateend}T20:00:00Z`
        props.getLeavesGantt(props.orgId,endDate,startDate);
    },[props.orgId])
    // useEffect(()=>{
  
    // },[props.leavesGantt])
   
    let columnWidth = 30;
    if (view === ViewMode.Month) {
      columnWidth = 300;
    } else if (view === ViewMode.Week) {
      columnWidth = 250;
    }


  
 
 
   // const data1 = props.leavesGantt.map((item) => item.leaveList);
//   console.log(data1)

  // const tasks = data1.map(item => ({
  //   id: item.leaveId,
  //   name: item.coverDetails,
  //   start: new Date(item.startDate),
  //   end: new Date(item.endDate),
  // }));

  const customHeaderGenerator = (columnType) => {
    if (columnType === 'start') {
      return ''; // Hide the "From" column
    } else if (columnType === 'end') {
      return ''; // Hide the "To" column
    }
    // Return null or undefined for other columns
    return null;
  };

  const tasks = [];

props.leavesGantt.forEach((item) => {
  if (item.leaveList.length > 0) {
    const leaveList = item.leaveList;
    leaveList.forEach((leave) => {
      const leaveId = leave.leaveId;
      const cover=leave.coverDetails;
      // const startDate = dayjs(leave.startDate).toDate();
      // const endDate = dayjs(leave.endDate).toDate();

      const task = {
        id: leaveId,
         name: `${item.employeeName}-${leave.coverDetails}`,
        // name: cover,
        // start: startDate,
        // end: endDate,
           start: new Date(leave.startDate),
    end: new Date(leave.endDate),
      };

      tasks.push(task);
    });
  }
});









  if (props.fetchingLeavesGantt) {
    return <BundleLoader />;
  }

  return (
    <div>
      {/* <h2>Gantt Chart</h2>
      <Gantt tasks={tasks} /> */}
       <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />

      {props.leavesGantt.length?
      <Gantt
        tasks={tasks}
        // viewMode={view}
        viewMode={ViewMode.Day}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={50}
        barBackgroundColor="blue"
        rowHeight={40}
        fontSize={12}
       
      />
      :null}
    </div>
  );
};


const mapStateToProps = ({ task,auth,dashboard }) => ({
    leavesGantt:dashboard.leavesGantt,
     orgId: auth.userDetails.organizationId,
     fetchingLeavesGantt:dashboard.fetchingLeavesGantt,
    // viewType: task.viewType,
    // grantTask:task.grantTask,
    // fetchingGrantTask:task.fetchingGrantTask
  });
  
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getLeavesGantt
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(LeavesGanttChart);

