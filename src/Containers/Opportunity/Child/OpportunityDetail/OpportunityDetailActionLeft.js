import React, { } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OpportunityStatsCard from "./OpportunityCards/OpportunityStatsCard";
import { Spin, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const OpportunityDetailActionLeft = (props) => {
  const { opportunity, fetchingOpportunityById } = props;
   const navigate = useNavigate();
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
      <div  className="w-[21vw]">
        <Tooltip title="Back">
          <KeyboardReturnIcon 
           className=" cursor-pointer ml-1 text-2xl text-[#1890ff]"
            //iconType="rollback"
            tooltipTitle="Back"
         
            onClick={() => {
              navigate(-1)
              
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

