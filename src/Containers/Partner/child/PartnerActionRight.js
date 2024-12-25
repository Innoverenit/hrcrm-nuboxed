import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip, } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledSelect } from "../../../Components/UI/Antd";
const PartnerShareForm=lazy(()=>import("./PartnerShareForm"));

const Option = StyledSelect.Option;

class PartnerActionRight extends React.Component {
  render() {
    const { handlePartnerModal,userId,user,role } = this.props;
    return (
      <div class=" flex  items-center">
        {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true &&(
      <PartnerShareForm
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      />
)}
      {user.userType !== "USER" && user.department !== "Recruiter" && role == "ADMIN" && ( 
        // <Button
        //   type="primary"
        //   default
        // href={`${base_url}/excel/export/user/partner/${userId}`}
        // >
        //   Export
        // </Button>
        <Tooltip placement="left" title="XL">
        <a
        href={`${base_url}/excel/export/user/partner/${userId}`}>
           <InsertDriveFileIcon 
             style={{fontSize: "x-large"}}/>
         </a>
         </Tooltip>
      )}
        {user.userType !== "USER" && user.department !== "Partner" && ( 
        <Button
          type="primary"
          default
          onClick={() => this.props.history.push("/import/account")}
        >
          Import
        </Button>
        )}
        <Tooltip placement="left" title="Create">
        {/* {user.userType !== "USER" && user.department !== "Recruiter" && ( 
           */}
            {this.props.user.vendorCreateInd ===true && (
          <Button type="primary"
           ghost 
          onClick={() => handlePartnerModal(true)}>
            Add
          </Button>
        )}
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth}) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PartnerActionRight)

