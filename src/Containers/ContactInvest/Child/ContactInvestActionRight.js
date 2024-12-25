import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip,} from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {handleUploadContactInvestModal} from "../ContactInvestAction";
import UploadContactInvest from "./UploadContactInvest";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

class ContactInvestActionRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      translatedMenuItems: [],
    };
  }

  componentDidMount() {
    this.fetchMenuTranslations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedLanguage !== this.props.selectedLanguage) {
      this.fetchMenuTranslations();
    }
  }

  fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        
          
         
        "85",//0 Add
      "123",//1 Import
      "294"//2 Upload
        
        
      ];

      const translations = await this.props.translateText(itemsToTranslate, this.props.selectedLanguage);
      this.setState({ translatedMenuItems: translations });
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

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
       { 
      //  role == "ADMIN"  && 
      (
        <Tooltip placement="left" title="XL">
        <a
        href={`${base_url}/excel/export/user/contact/${userId}`}>
            <InsertDriveFileIcon  className="!text-xl"   />
         </a>
         </Tooltip>
       )}
        {user.userType !== "USER" && user.department !== "Partner" && ( 
        <Button
          type="primary"
          default
          onClick={() => this.props.history.push("/import/account")}
        >
         <UploadIcon className=" !text-icon"/> 
         {this.state.translatedMenuItems[1]}
          
        </Button>
        )}
       
        <Tooltip placement="left" title="Create">
        <Button
          type="primary"
          ghost
          onClick={() => this.props.handleUploadContactInvestModal(true)}
        >
         <UploadIcon className=" !text-icon"/>
         {this.state.translatedMenuItems[2]}
         {/* Upload */}
        </Button>
      </Tooltip>
      {user.imInd === true  && user.investorContactCreateInd === true &&  (
        <Tooltip placement="left" title="Create">
          <Button 
           type="primary"
         onClick={() => handleContactInvestModal(true)}
        >
       <DataSaverOnIcon className="!text-icon"/> 
       {this.state.translatedMenuItems[0]}
          </Button>
        </Tooltip>
        )}
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactInvestActionRight)

