import React, {  useEffect,useState,Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BundleLoader, GridLoader } from "../../Components/Placeholder";
import { handleTaskModal ,setTaskViewType} from "./TaskAction";
const AddTaskModal = lazy(() => import("./Child/AddTaskModal"));
const TaskDeletedTable = lazy(() => import("../Task/Child/TaskDeletedTable"));
const TaskHeader = lazy(() => import("./Child/TaskHeader"));
const TaskApproveTable = lazy(() => import("./Child/TaskApproveTable"));
const GanttChart = lazy(() => import("./Child/GanttChart"));
const TaskTable = lazy(() => import("./Child/TaskTable"));
const TaskCardList = lazy(() => import("./Child/TaskCardList"));

    function Task (props) {

      const {
        addTaskModal, handleTaskModal
      } = props;
    const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
    useEffect(() => {
      const fetchMenuTranslations = async () => {
        try {
          const itemsToTranslate = [
           "Type",//0
            "Name",//1
            "End",//2
            "Ageing",//3
            "Info",//5
            "Assignedto",//5
            "Owner"//6
          ];
  
          const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
          setTranslatedMenuItems(translations);
        } catch (error) {
          console.error('Error translating menu items:', error);
        }
      };
  
      fetchMenuTranslations();
    }, [props.selectedLanguage]);
    return (
      <React.Fragment>
        <TaskHeader 
          viewType={props.viewType}
          setTaskViewType={props.setTaskViewType}
        handleTaskModal={handleTaskModal} 
        />
        <AddTaskModal
          addTaskModal={addTaskModal}
          handleTaskModal={handleTaskModal}
        />
        <Suspense fallback={<BundleLoader />}>
        {props.viewType === "table" ?
          <TaskCardList
          
          translateText={props.translateText}
          translatedMenuItems={translatedMenuItems}
          selectedLanguage={props.selectedLanguage}/> :
          
      props.viewType === "gantt" ?
          <GanttChart/> :
          props.viewType === "dashboard" ?
          <TaskDeletedTable/> :
         props.viewType === "approve" ?
          <TaskApproveTable/> :
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
