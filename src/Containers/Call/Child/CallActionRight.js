import React, {  lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { handleCallModal } from "../CallAction";
const CallSharedForm = lazy(() => import("./CallSharedForm"));



const CallActionRight = (props) => {
  const {
    userId,
    user,
    role,
    handleCustomerModal,
  } = props;
  return (
    <div class=" flex  items-center">
       {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.callFullListInd === true &&(
         <CallSharedForm/>
         )} 
      <Tooltip placement="left" title={props.translatedMenuItems[0]}>
        <Button
          type="primary"
          onClick={() => props.handleCallModal(true)}
        >
          <DataSaverOnIcon className="!text-icon"/> {props.translatedMenuItems[1]}
          {/* Add */}
        </Button>
      </Tooltip>
    </div>
  );
};

const mapStateToProps = ({auth}) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleCallModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(CallActionRight);