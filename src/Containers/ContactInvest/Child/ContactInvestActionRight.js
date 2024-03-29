import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip,} from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { FormattedMessage } from "react-intl";

class ContactInvestActionRight extends React.Component {

  render() {
    const {
      userId,
      users,
      user,
      role,
        handleContactInvestModal
    } = this.props;
    return (
      <div class=" flex  items-center">
        
        {/* {this.props.viewType === "table" && user.contactFullListInd===true && user.employee_type !=="external" ? (
          
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
        ) : null} */}
       { role == "ADMIN" && (
        <Tooltip placement="left" title="XL">
        <a
        href={`${base_url}/excel/export/user/contact/${userId}`}>
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
           <FormattedMessage
                        id="app.import"
                        defaultMessage="Import"
                      />
          
        </Button>
        )}
        {user.imInd === true  && user.investorContactCreateInd === true &&  (
        <Tooltip placement="left" title="Create">
          <Button 
           type="primary"
         onClick={() => handleContactInvestModal(true)}
        >
         <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          </Button>
        </Tooltip>
        )}
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
  connect(mapStateToProps, mapDispatchToProps)(ContactInvestActionRight)
);
