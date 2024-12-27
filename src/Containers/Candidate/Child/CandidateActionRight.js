import React, {lazy} from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { StyledSelect } from "../../../Components/UI/Antd";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';
const CandidateShareForm =lazy(()=>import("./CandidateShareForm"));

const Option = StyledSelect.Option;

const dataSource = ["Burns Bay Road", "Downing Street", "Wall Street"];

class CandidateActionRight extends React.Component {
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
        "85",//0
        "294",//1

        
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
      handleCandidateResumeModal,
      role,
      viewType
    } = this.props;
    return (
      <div class=" flex justify-between items-center"  >

      <div >
        {/* {user.userType !== "USER" && user.department !== "Partner" && user.employee_type !=="External" && (  */}
        {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true &&viewType === "table"&&(
      <CandidateShareForm
      viewType={viewType}
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 

      />
        )}

{viewType==="list"&&(
<CandidateShareForm 
      viewType={viewType}
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      />
)}

{viewType==="dashboard"&&(
<CandidateShareForm 
      viewType={viewType}
      handleDropChange={this.props.handleDropChange}
      currentUser={this.props.currentUser} 
      />
)}
      {user.userType !== "USER" && user.department !== "Partner" && role == "ADMIN" && ( 
       
        <Tooltip placement="left" title="XL">
        <a href={`${base_url}/excel/export/user/candidate/${userId}`}>
        <InsertDriveFileIcon className=" text-xl "/>
        {/* // icon={solid('file-excel')}
        //  style={{fontSize: "x-large",verticalAlign: "bottom"}}/> */}
        </a> 
         </Tooltip>
      )}
        {user.userType !== "USER" && user.department !== "Partner" && ( 
        <Button
          type="primary"
          default
          onClick={() => this.props.history.push("/import/account")}
        >
           <UploadIcon className=" !text-icon"/>{this.state.translatedMenuItems[1]} 
           {/* Import */}
        </Button>
        )}
        {/* {user.userType !== "USER" && user.department !== "Partner" && (  */}
        {user.talentCreateInd ===true && (
        <Tooltip placement="left" title="Create">
          <Button 
            type="primary"
            // class="animate-spin bg-indigo-500 "
            onClick={() => handleCandidateResumeModal(true)}
          >
             
             <DataSaverOnIcon className="!text-icon"/>  {this.state.translatedMenuItems[0]}
              {/* Add */}
            
          </Button>
        </Tooltip>
       )} 
       </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(CandidateActionRight)

