import React, { useEffect, lazy } from "react";
import {handleFullFillmentModal} from "../DashboardPage/RegionalDashAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRegions } from "../Settings/Category/Region/RegionAction";
import { JumpStartBox } from "../../Components/UI/Elements";

const  AddFullFillmentDrawerModal=lazy(()=>import("./AddFullFillmentDrawerModal"));

function FullFillMentJumpstartBox(props) {
  const {
    handleFullFillmentModal,
    addFullFillmentModal
  } = props;

  useEffect(() => {
    props.getRegions(props.organizationId);
  }, []);
  const colors = [
    "linear-gradient(270deg,#F15753,orange)", 
    "linear-gradient(270deg,#3db8b5,#41e196)",
    "linear-gradient(270deg,#5786ea,#20dbde)",
   
  ];
  return (
    <>

    <div className="flex flex-row w-full">
         
      <div className="flex w-full max-sm:flex-col">
        {props.regionRecords.map((region, index) => (
           <React.Fragment key={index}>
             {region.fulfilment !== 0 && (
          <div  className="flex w-wk">
          
            <JumpStartBox
              // bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              jumpstartClick={()=>handleFullFillmentModal(true)}
              cursorData={"pointer"}
              value={region.fulfilment}
              bgColor={colors[index % colors.length]} 
              title={region.regions}
           sLoading={props.user.fetchingJumpstartInvestor}
            />
          
          </div>
            )}
                </React.Fragment>
        ))}
      
          
      </div>
    </div>
    <AddFullFillmentDrawerModal
        addFullFillmentModal={addFullFillmentModal}
        handleFullFillmentModal={handleFullFillmentModal}
      />
    </>
  );
}

const mapStateToProps = ({ dashboard, region,dashboardRegional, auth }) => ({
  user: auth.userDetails,
  regions: region.regions,
  addFullFillmentModal:dashboardRegional.addFullFillmentModal,
  regionRecords:dashboard.regionRecords,
  organizationId: auth.userDetails.organizationId,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRegions,
      handleFullFillmentModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(FullFillMentJumpstartBox);
