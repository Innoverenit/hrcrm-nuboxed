import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip, } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
const ContactSharePartnerForm = lazy(()=>import("./ContactSharePartnerForm"));
const ContactShareCustomerForm = lazy(()=>import("./ContactShareCustomerForm"));


const Option = StyledSelect.Option;

const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];
class ContactActionRight extends React.Component {

  render() {
    const {
      userId,
      users,
      user,
      role,
      handleContactModal,
      handleContactImportModal,
    } = this.props;
    return (
      <div class=" flex  items-center">
         <div class="max-sm:hidden">
        {this.props.viewType === "table" && user.contactFullListInd===true && user.employee_type !=="external" ? (
          
          <ContactSharePartnerForm 
          currentPartnerUser={this.props.currentPartnerUser}
          handlePartnerDropChange={this.props.handlePartnerDropChange}
          />
        
        ) : null}
       
        {this.props.viewType === "dashboard"&& user.contactFullListInd===true && user.employee_type !=="external" ? (
          <ContactShareCustomerForm 
          handleDropChange={this.props.handleDropChange}
          currentUser={this.props.currentUser} 
          />
        ) : null}
        </div>
        <div class="max-sm:hidden">
       { role == "ADMIN" && (
        <Tooltip placement="left" title="XL">
        <a
        href={`${base_url}/excel/export/user/contact/${userId}`}>
            <InsertDriveFileIcon 
            style={{fontSize: "x-large"}}/>
         </a>
         </Tooltip>
       )}
       </div>
        {/* {user.userType !== "USER" && user.department !== "Partner" && ( 
        <Button
          type="primary"
          default
          onClick={() => this.props.history.push("/import/account")}
        >
          Import
        </Button>
        )} */}
           <Tooltip placement="left" title="Import">
            {user.contactCreateInd === true &&  user.crmInd === true && (
          <Button 
           type="primary"
           onClick={() => handleContactImportModal(true)}>
            Import
          </Button>
             )}
        </Tooltip>
        {/* {this.props.viewType === "table" ? ( */}
          
        <Tooltip placement="left" title="Create">
            {user.contactCreateInd === true &&  user.crmInd === true && (
          <Button 
           type="primary"
           onClick={() => handleContactModal(true)}>
            Add
          </Button>
             )}
        </Tooltip>
         
        {/* ): null} */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactActionRight)
);
