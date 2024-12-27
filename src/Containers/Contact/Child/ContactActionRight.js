import React,{lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip, } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import UploadIcon from '@mui/icons-material/Upload';
const ContactSharePartnerForm = lazy(()=>import("./ContactSharePartnerForm"));
const ContactShareCustomerForm = lazy(()=>import("./ContactShareCustomerForm"));


const Option = StyledSelect.Option;

const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];
class ContactActionRight extends React.Component {

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
                     
       "85", // "Add",//0
     "123" // "Import",//1
       
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
       {this.props.viewType === "table" &&  role == "ADMIN" && (
        <Tooltip placement="left" title=" Download-XL">
        <a
        href={`${base_url}/excel/export/user/contact/${userId}`}>
            <DownloadForOfflineIcon
            style={{fontSize: "x-large"}}/>
         </a>
         </Tooltip>
       )}
       </div>     
     
         {this.props.viewType === "table" &&   (
        <div className="max-sm:hidden">
           <Tooltip placement="left" title="Import">
            {user.contactCreateInd === true &&  user.crmInd === true && (
          <Button 
           type="primary"
           onClick={() => handleContactImportModal(true)}>
            <UploadIcon className=" !text-icon"/>
            {this.state.translatedMenuItems[1]}
            {/* Import */}
          </Button>
             )}
        </Tooltip>
        </div>
         )}
     {this.props.viewType === "table" &&   (
         <Tooltip placement="left" title="Create">
            {user.contactCreateInd === true &&  user.crmInd === true && (
          <Button 
           type="primary"
           onClick={() => handleContactModal(true)}>
            
                 <DataSaverOnIcon className="!text-icon"/>
                 {this.state.translatedMenuItems[0]}
                 {/* Add */}

            
          </Button>
             )}
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
export default connect(mapStateToProps, mapDispatchToProps)(ContactActionRight)

