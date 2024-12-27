import React, {lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledSelect } from "../../../Components/UI/Antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

const CustomerShareForm=lazy(()=> import("./CustomerShareForm"));

const Option = StyledSelect.Option;

class CustomerActionRight extends React.Component {
 
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
        "123" ,   // "Import",//1
         "104"    // "Create"
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
    
        
        <div className="max-sm:hidden">
          <Button type="primary"  
        onClick={() => this.props.handleCustomerImportModal(true)}
        >
          <UploadIcon className=" !text-icon"/>
          {this.state.translatedMenuItems[1]}
            {/* Import */}
          </Button>
          </div>
          {this.props.viewType==="table"&&( 
        <Tooltip placement="left" title={this.state.translatedMenuItems[2]}>
          {this.props.user.customerCreateInd ===true && user.crmInd === true &&(
          <Button
            type="primary"
            onClick={() => handleCustomerModal(true)}
          >
                          <DataSaverOnIcon className="!text-icon"/> 
                          {this.state.translatedMenuItems[0]}
          
          </Button>
           )} 
        </Tooltip>
       )}
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerActionRight)

