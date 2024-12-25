import React, {useEffect,useState, lazy, Suspense  } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import {handleUploadInvestorModal} from "../InvestorAction";
import { base_url } from "../../../Config/Auth";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const UploadInvestor=lazy(()=> import("./UploadInvestor"));

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
        // "1351",//Download Xl 2
      ];

      const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
      setTranslatedMenuItems(translations);
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };

  
    const {
      user,
      userId,
      role,
      handleInvestorModal
    } = props;
    return (
      <div class=" flex  items-center">
     {props.viewType === "list"  && (
        <Tooltip placement="left" title=" Download-XL">
        <a
        href={`${base_url}/excel/export/investor/User/${props.userId}`}>
            <DownloadForOfflineIcon
            style={{fontSize: "x-large"}}/>
         </a>
         </Tooltip>
       )}

{props.viewType === "teams"  && (
        <Tooltip placement="left" title=" Download-XL">
        <a
        href={`${base_url}/excel/export/investor/team/${props.userId}`}>
            <DownloadForOfflineIcon
            style={{fontSize: "x-large"}}/>
         </a>
         </Tooltip>
       )}
         {props.viewType === "all"  && (
        <Tooltip placement="left" title=" Download-XL">
        <a
        href={`${base_url}/excel/export/investor/All/${props.orgId}`}>
            <DownloadForOfflineIcon
            style={{fontSize: "x-large"}}/>
         </a>
         </Tooltip>
    )} 
        {props.viewType === "list"  &&  user.imInd === true  &&  user.investorCreateInd === true &&  (
          <div>
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
   <Tooltip placement="left" title="Create">
          <Button
            type="primary"
            onClick={() => handleInvestorModal(true)}
          >
       <DataSaverOnIcon className="!text-icon"/>
       {translatedMenuItems[0]}
    
          </Button>
     </Tooltip>
   </div>
        )}
         < Suspense fallback={"Loading..."}>
         <UploadInvestor
          handleUploadInvestorModal={props.handleUploadInvestorModal}
          uploadInvestorList={props.uploadInvestorList}
        /></Suspense>
      </div>
    );
}

const mapStateToProps = ({ auth,investor}) => ({
  userId: auth.userDetails.userId,
  role: auth.userDetails.role,
  user: auth.userDetails,
  uploadInvestorList: investor.uploadInvestorList,
  orgId: auth.userDetails.organizationId,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleUploadInvestorModal
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(InvestorActionRight)

