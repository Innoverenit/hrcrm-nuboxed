import React, {  lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { BundleLoader } from "../../../Components/Placeholder";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import { handleCallModal } from "../CallAction";




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
          <Suspense fallback={<BundleLoader />}>
                    <div
                     selectedLanguage={props.selectedLanguage}
                     translateText={props.translateText}
                    />
          </Suspense>
         )} 
      <Tooltip placement="left" title={props.translatedMenuItems[0]}>
        <Button
          type="primary"
          onClick={() => props.handleCallModal(true)}
        >
          <DataSaverOnIcon className="!text-icon"/> {props.translatedMenuItems[16]}
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