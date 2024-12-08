import React, { useEffect,useState } from "react";
import {handleFullFillmentModal} from "../../DashboardPage/RegionalDashAction"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRegions } from "../../Settings/Category/Region/RegionAction";
import { JumpStartBox } from "../../../Components/UI/Elements";


function MultiOrgFullFillMentJumpstartBox(props) {
  const [totalOrgValue, setTotalOrgValue] = useState(0);
  const {
    handleFullFillmentModal,
    addFullFillmentModal
  } = props;

  useEffect(() => {
    props.getRegions(props.organizationId);
  }, []);
  useEffect(() => {
    const totalValue = props.multiOrgRecords.reduce(
      (accumulator, region) => accumulator + region.orgValue,
      0
    );
    setTotalOrgValue(totalValue);
  }, [props.multiOrgRecords]);
  const colors = [
    "linear-gradient(270deg,#F15753,orange)", 
    "linear-gradient(270deg,#3db8b5,#41e196)",
    "linear-gradient(270deg,#5786ea,#20dbde)",
   
  ];
  return (
    <>

    <div className="flex flex-col w-full">
    <div>
  <JumpStartBox
    noProgress
    cursorData={"pointer"}
    value={totalOrgValue}
    title="Total"
  />
  </div>
      <div className="flex w-full mt-8 max-sm:flex-col">
        {props.multiOrgRecords.map((region, index) => (
           <React.Fragment key={index}>
             {region.fulfilment !== 0 && (
          <div  className="flex w-wk">
          
            <JumpStartBox
              // bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
            //   jumpstartClick={()=>handleFullFillmentModal(true)}
              cursorData={"pointer"}
            
              bgColor={colors[index % colors.length]} 
              value={region.orgValue}
              title={region.orgName}
           sLoading={props.user.fetchingJumpstartInvestor}
            />
          
          </div>
            )}
                </React.Fragment>
        ))}
      
          
      </div>
    </div>
    {/* <AddFullFillmentDrawerModal
        addFullFillmentModal={addFullFillmentModal}
        handleFullFillmentModal={handleFullFillmentModal}
      /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiOrgFullFillMentJumpstartBox);
