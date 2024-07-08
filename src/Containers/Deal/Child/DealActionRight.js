import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip, } from "antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

class DealActionRight extends React.Component {
  render() {
    const {
      userId,
      viewType,
      user,
      handleDealModal,
    } = this.props;
    return (
      <div class=" flex items-center">
        <Tooltip placement={"left"} title={<FormattedMessage
                id="app.create"
                defaultMessage="Create"
              />}>
           {/* {user.userType !== "USER" && user.department !== "Recruiter" && (  */}
           {viewType === "table" && user.imInd === true  && user.opportunityCreateInd ===true && (
          <Button
            type="primary"
            // ghost
            onClick={() => handleDealModal(true)}
          >
              <DataSaverOnIcon/> <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          </Button>
            )}  
        </Tooltip>
         {/* {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.opportunityFullListInd===true &&( */}
  {/* <OpportunityShareForm/> */}
         {/* )} */}
         <div class="max-sm:hidden">
        <Button
        style={{lineHeight:"inherit"}}
           type="primary"
          // default
        href={`${base_url}/excel/export/user/opportunity/${userId}`}
        >
          {/* Export */}<UploadIcon className=" !text-icon"/>
          <FormattedMessage
                id="app.export"
                defaultMessage="Export"
              />
        </Button>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DealActionRight)
);
