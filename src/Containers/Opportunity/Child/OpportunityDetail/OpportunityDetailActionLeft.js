import React, { } from "react";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import OpportunityStatsCard from "./OpportunityCards/OpportunityStatsCard";
import { Spin, Tooltip, Icon } from "antd";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const OpportunityDetailActionLeft = (props) => {
  const { opportunity, fetchingOpportunityById } = props;
  console.log(opportunity);
  const {
    opportunity: { stageMapper },
  } = props;
  // useEffect(() => {
  //   props.getStageCheckByStageId(
  //     opportunity.stageId,
  //     opportunity.opportunityId
  //   );
  // }, [opportunity.stageId, opportunity.opportunityId]);
  console.log(stageMapper);
  return (
    <div class=" flex flex-row flex-wrap items-center self-start justify-start grow shrink h-auto mr-auto ">
      <div style={{ width: "21vw" }}>
        <Tooltip title="Back">
          <KeyboardReturnIcon
            style={{ marginRight: "0.3rem", color: "#1890ff", fontSize: "1.5625em" }}
            //iconType="rollback"
            tooltipTitle="Back"
         
            onClick={() => {
              props.history.goBack();
              
            }}
          />
        </Tooltip>
      </div>
      {fetchingOpportunityById ? (
        <div style={{ marginLeft: "18.125em" }}>
          <Spin />
        </div>
      ) : (
          // <BundleLoader />
          <OpportunityStatsCard opportunity={opportunity}
          translateText={props.translateText}
          selectedLanguage={props.selectedLanguage}
          translatedMenuItems={props.translatedMenuItems}
          />
        )}
   

     
    </div>
  );
};
const mapStateToProps = ({ opportunity, account, auth }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // getStageCheckByStageId,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(OpportunityDetailActionLeft)

