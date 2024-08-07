import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddTaskImportModal from "../Child/AddTaskImportModal"
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { handleTaskModal, handleTaskImportModal,getTaskListRangeByUserId } from "../TaskAction";
// const TaskSharedForm = lazy(() => import("./TaskSharedForm"));

const TaskActionRight = (props) => {
  function handleTaskRefresh() {
    const {
     
      getTaskListRangeByUserId,
      userDetails: { userId },
    } = props;
    getTaskListRangeByUserId(userId);
  }
  const {
    userId,
    user,
    role,
    handleCustomerModal,
  } = props;
  return (
    <>
    <div class=" flex items-center" >
        {/* {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.taskFullListInd === true &&(
         <TaskSharedForm/>
         )}  */}
       {props.viewType === "table"  ? 
      <Tooltip placement="left" title="Create" >
       <Button type="primary"
                              style={{ width: "-webkit-fill-available" }}
           onClick={() => props.handleTaskModal(true)}>
        
          <DataSaverOnIcon className="!text-icon" />Add
        </Button>
      </Tooltip>
:null}
<Button
          type="primary"
       
        onClick={() => props.handleTaskImportModal(true)}
        >
          Import
        </Button>
     
    </div>
    <AddTaskImportModal
    handleTaskImportModal={props.handleTaskImportModal}
    addTaskImportModal={props.addTaskImportModal}

    />
    </>
  );
};

const mapStateToProps = ({ task, auth }) => ({
  userDetails: auth.userDetails,
  user: auth.userDetails,
  addTaskImportModal:task.addTaskImportModal,
  taskListRangeByUserId: task.taskListRangeByUserId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleTaskModal,
      getTaskListRangeByUserId,
      handleTaskImportModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(TaskActionRight);
