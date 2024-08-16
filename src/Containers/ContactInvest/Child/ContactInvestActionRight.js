import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip,} from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { FormattedMessage } from "react-intl";
import {handleUploadContactInvestModal} from "../ContactInvestAction";
import UploadContactInvest from "./UploadContactInvest";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

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
      <>
       {this.props.viewType === "card"  && (
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
       )} {user.imInd === true  && user.investorContactCreateInd === true &&  (
        <Tooltip placement="left" title="Create">
          <Button 
           type="primary"
         onClick={() => handleContactInvestModal(true)}
        >
       <DataSaverOnIcon className="!text-icon"/> <FormattedMessage
                        id="app.add"
                        defaultMessage="Add"
                      />
          </Button>
        </Tooltip>
        )}
        {user.userType !== "USER" && user.department !== "Partner" && ( 
        <Button
          type="primary"
          default
          onClick={() => this.props.history.push("/import/account")}
        >
         <UploadIcon className=" !text-icon"/>  <FormattedMessage
                        id="app.import"
                        defaultMessage="Import"
                      />
          
        </Button>
        )}
       
        <Tooltip placement="left" title="Create">
        <Button
          type="primary"
          ghost
          onClick={() => this.props.handleUploadContactInvestModal(true)}
        >
         <UploadIcon className=" !text-icon"/> Upload
        </Button>
      </Tooltip>
      </div>
      )}
       <UploadContactInvest
          handleUploadContactInvestModal={this.props.handleUploadContactInvestModal}
          uploadContactInvestList={this.props.uploadContactInvestList}
        />
      </>
    );
  }
}

const mapStateToProps = ({ auth,contactinvest }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  role: auth.userDetails.role,
  uploadContactInvestList:contactinvest.uploadContactInvestList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
     handleUploadContactInvestModal
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContactInvestActionRight)
);
