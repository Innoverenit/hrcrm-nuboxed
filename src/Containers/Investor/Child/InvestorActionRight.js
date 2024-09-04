import React, {useEffect,useState  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import {handleUploadInvestorModal} from "../InvestorAction";
import UploadInvestor from "./UploadInvestor";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';

const Option = StyledSelect.Option;

function InvestorActionRight (props) {
 
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);

  useEffect(() => {
    fetchMenuTranslations();
  }, [props.selectedLanguage]); // Re-run when selectedLanguage changes

  const fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "85", //0    Add
        "294", //1 Upload
      ];

      const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
      setTranslatedMenuItems(translations);
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

  
    const {
      user,
      handleInvestorModal
    } = props;
    return (
      <div class=" flex  items-center">
        
        {props.viewType === "list"  &&  user.imInd === true  &&  user.investorCreateInd === true &&  (
          <div>
        <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => handleInvestorModal(true)}
          >
       <DataSaverOnIcon className="!text-icon"/>
       {translatedMenuItems[0]}
    
          </Button>
     </Tooltip>

     <Tooltip placement="left" title="Create">
     <Button
       type="primary"
       ghost
       onClick={() => props.handleUploadInvestorModal(true)}
     >
      <UploadIcon className=" !text-icon"/> 
      {translatedMenuItems[1]}
      {/* Upload */}
     </Button>
   </Tooltip>
   </div>
        )}
         <UploadInvestor
          handleUploadInvestorModal={props.handleUploadInvestorModal}
          uploadInvestorList={props.uploadInvestorList}
        />
      </div>
    );
}

const mapStateToProps = ({ auth,investor}) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
  uploadInvestorList: investor.uploadInvestorList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUploadInvestorModal
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InvestorActionRight)
);
