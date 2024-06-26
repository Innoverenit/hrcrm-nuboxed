import React, {lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledSelect } from "../../../Components/UI/Antd";
import { FormattedMessage } from "react-intl";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
const CustomerShareForm=lazy(()=> import("./CustomerShareForm"));

const Option = StyledSelect.Option;

class CustomerActionRight extends React.Component {
 
  render() {
    const {
      userId,
      user,
      role,
      handleCustomerModal,
    } = this.props;
    return (
      <div class=" flex  items-center">
        <div class="max-sm:hidden">
          {/* {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.customerFullListInd === true &&(
      <CustomerShareForm
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      />
         )}  */}
      {role == "ADMIN" && ( 
        <Tooltip placement="left" title="XL">

            <a href={`${base_url}/excel/export/user/customer/${userId}`}>
            <InsertDriveFileIcon 
             style={{fontSize: "x-large"}}/>
            </a>
    
         </Tooltip>
      )}
      </div>
        <Tooltip placement="left" title="Create">
          {this.props.user.customerCreateInd ===true && user.crmInd === true &&(
          <Button
            type="primary"
            onClick={() => handleCustomerModal(true)}
          >
                          <DataSaverOnIcon/>   <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          
          </Button>
           )} 
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CustomerActionRight)
);
