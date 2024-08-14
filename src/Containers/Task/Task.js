import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import { handleTaskModal ,setTaskViewType} from "./TaskAction";
const AddTaskModal = lazy(() => import("./Child/AddTaskModal"));
const TaskDeletedTable = lazy(() => import("../Task/Child/TaskDeletedTable"));
const TaskHeader = lazy(() => import("./Child/TaskHeader"));
const TaskApproveTable = lazy(() => import("./Child/TaskApproveTable"));
const GanttChart = lazy(() => import("./Child/GanttChart"));
const TaskCardList = lazy(() => import("./Child/TaskCardList"));

    function Task (props) {

      const {
        addTaskModal, handleTaskModal
      } = props;
    return (
      <React.Fragment>
         <Suspense fallback={<BundleLoader />}>
        <TaskHeader 
         translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
          viewType={props.viewType}
          setTaskViewType={props.setTaskViewType}
        handleTaskModal={handleTaskModal} 
        />
        <AddTaskModal
          selectedLanguage={props.selectedLanguage}
          translateText={props.translateText}
          addTaskModal={addTaskModal}
          handleTaskModal={handleTaskModal}
        />
       
        {props.viewType === "table" ?
          <TaskCardList
          
          translateText={props.translateText}
          //translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}/> :
          
          props.viewType === "gantt" ?
          <GanttChart
          translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
          /> :
          props.viewType === "dashboard" ?
          <TaskDeletedTable
          translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
          /> :
          props.viewType === "approve" ?
          <TaskApproveTable
          translateText={props.translateText}
         selectedLanguage={props.selectedLanguage}
          /> :
          null}
        </Suspense>
      </React.Fragment>
    );
  }


const mapStateToProps = ({ task }) => ({
  addTaskModal: task.addTaskModal,
  viewType: task.viewType,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskModal,
      setTaskViewType
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Task);
