import React, {useEffect,useState} from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "../../../Components/ViewSwitcher";
import { BundleLoader } from "../../../Components/Placeholder";
import {getGrantTask} from "../TaskAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import dayjs from "dayjs";

function GanttChart (props) {
  useEffect(()=>{
    props.getGrantTask(props.employeeId);
},[])

useEffect(()=>{
  
},[props.grantTask])

  const [view, setView] = React.useState(ViewMode.Day);
  const [isChecked, setIsChecked] = React.useState(true);
  let columnWidth = 30;
  if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }



  const tasks = props.grantTask.map(item => ({
    id: item.taskId,
    // name: item.taskName,
    name: `${item.taskName} `,
    start: new Date(item.startDate),
    end: new Date(item.endDate),
    // type:item.taskType,
  }));

  if (props.fetchingGrantTask) {
    return <BundleLoader />;
  }
  return (
    <div>
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />

      {props.grantTask.length?
      <Gantt
        tasks={tasks}
        // viewMode={view}
          viewMode={ViewMode.Day}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={50}
        // barBackgroundColor="blue"
        rowHeight={40}
        fontSize={12}
      />
      :null}
      
    </div>
  );
};
const mapStateToProps = ({ task,auth }) => ({
  employeeId: auth.userDetails.employeeId,
  viewType: task.viewType,
  grantTask:task.grantTask,
  fetchingGrantTask:task.fetchingGrantTask
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     getGrantTask
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(GanttChart);
