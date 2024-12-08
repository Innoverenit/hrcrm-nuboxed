import React ,{Suspense ,lazy, useState, useEffect}from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { handleTaskModal, handleTaskImportModal,getTaskListRangeByUserId } from "../TaskAction";
 const AddTaskImportModal = lazy(() => import("../Child/AddTaskImportModal"));

const TaskActionRight = (props) => {
  function handleTaskRefresh() {
   
    const {
     
      getTaskListRangeByUserId,
      userDetails: { userId },
    } = props;
    getTaskListRangeByUserId(userId);
  }
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMenuTranslations = async () => {
      try {
        setLoading(true); 
        const itemsToTranslate = [
        "85",  // Add
          "123",// Import
         "104", // create

       

        ];

        const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
        setTranslatedMenuItems(translations);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error translating menu items:', error);
      }
    };

    fetchMenuTranslations();
  }, [props.selectedLanguage]);
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
       
<Button
          type="primary"
          style={{ width: "-webkit-fill-available" }}
        onClick={() => props.handleTaskImportModal(true)}
        >
          {/* Import*/} {translatedMenuItems[1]}
        </Button>
        {props.viewType === "table"  ? 
      <Tooltip placement="left" title={translatedMenuItems[2]} >
       <Button type="primary"
                              style={{ width: "-webkit-fill-available" }}
           onClick={() => props.handleTaskModal(true)}>
        
          <DataSaverOnIcon className="!text-icon" />{translatedMenuItems[0]}
        </Button>
      </Tooltip>
:null}
     
    </div>
    <Suspense fallback={<BundleLoader />}>
    <AddTaskImportModal
    handleTaskImportModal={props.handleTaskImportModal}
    addTaskImportModal={props.addTaskImportModal}


    /></Suspense>
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
