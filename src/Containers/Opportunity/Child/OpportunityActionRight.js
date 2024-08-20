
import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { base_url } from "../../../Config/Auth";
import { Button, Tooltip } from "antd";
import { StyledSelect } from "../../../Components/UI/Antd";
import OpportunityShareForm from "./OpportunityShareForm";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';

import UploadIcon from '@mui/icons-material/Upload';

const Option = StyledSelect.Option;

const OpportunityActionRight = (props) => {

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
          <Tooltip placement={"left"} title={<FormattedMessage
              id="app.create"
              defaultMessage="Create"
            />}>
         {user.opportunityCreateInd ===true && user.crmInd === true && (
        <Button
          type="primary"
          // ghost
          onClick={() => handleOpportunityModal(true)}
        >
          <DataSaverOnIcon className="!text-icon"/>Add
        </Button>
          )}  
      </Tooltip>
      <Button
      style={{lineHeight:"inherit"}}
         type="primary"
        // default
      href={`${base_url}/excel/export/user/opportunity/${userId}`}
      >
        {/* Export */}
        <UploadIcon className=" !text-icon"/>
        <FormattedMessage
              id="app.export"
              defaultMessage="Export"
            />
      </Button>
      
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OpportunityActionRight)
);
