
import React, {useEffect,useState  } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import OpportunityShareForm from "./OpportunityShareForm";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

import UploadIcon from '@mui/icons-material/Upload';

const Option = StyledSelect.Option;

const OpportunityActionRight = (props) => {
  const [translatedMenuItems, setTranslatedMenuItems] = useState([]);
  useEffect(() => {
    fetchMenuTranslations();
  }, [props.selectedLanguage]); // Re-run when selectedLanguage changes

  const fetchMenuTranslations = async () => {
    try {
      const itemsToTranslate = [
        "85", //0    Add
        "294", //1 Export
      ];

      const translations = await props.translateText(itemsToTranslate, props.selectedLanguage);
      setTranslatedMenuItems(translations);
    } catch (error) {
      console.error('Error translating menu items:', error);
    }
  };
  const {
    userId,
          subscriptionType,
          users,
          user,
          department,
          accountFilterText,
          handleOpportunityModal,
          setAccountFilterText,
          setAccountFilterUser,
  } = props;
  return (
    <div class=" flex items-center">
       {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.opportunityFullListInd===true &&(
    <OpportunityShareForm/>
       )}
          
      <Button
      style={{lineHeight:"inherit"}}
         type="primary"
        // default
      href={`${base_url}/excel/export/user/opportunity/${userId}`}
      >
        {/* Export */}
        <UploadIcon className=" !text-icon"/>
        {translatedMenuItems[1]}
        {/* Export */}
      </Button>
      <Tooltip placement={"left"} title="Create"
      >
         {user.opportunityCreateInd ===true && user.crmInd === true && (
        <Button
          type="primary"
          // ghost
          onClick={() => handleOpportunityModal(true)}
        >
          <DataSaverOnIcon className="!text-icon"/>{translatedMenuItems[0]}
          {/* Add */}
        </Button>
          )}  
      </Tooltip>
    </div>
  );
};

const mapStateToProps = ({ auth, team, account }) => ({
  userId: auth.userDetails.userId,
  user: auth.userDetails,
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityActionRight)

