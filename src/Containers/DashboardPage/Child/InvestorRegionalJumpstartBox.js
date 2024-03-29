import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRegions } from "../../Settings/Category/Region/RegionAction";
import { JumpStartBox } from "../../../Components/UI/Elements";

function InvestorRegionalJumpstartBox(props) {
  const {
    openPitchQualified,
    handlePitchQualifiedDrawer,
    openPitchAdded,
    handlePitchAddedDrawer,
    openDealAdded,
    handleDealAddedDrawer,
    openDealClosed,
    handleDealClosedDrawer
  } = props;

  useEffect(() => {
    props.getRegions(props.organizationId);
  }, []);
  const colors = [
    // "linear-gradient(270deg,#F15753,orange)", 
    "linear-gradient(270deg,#7630f0,#ad82f7)",
    "linear-gradient(270deg,#ad82f7,#3dcec7)",
    "linear-gradient(270deg,#3062d8,#94a4b2)",
   
  ];
  return (
    <>
      {/* <div className="font-bold flex-col justify-center flex text-lg">Investment</div> */}
      <div className="flex flex-row w-full">
        <div className="flex w-full max-sm:flex-col">
          {props.regions.map((region, index) => (
            <div key={index} className="flex w-wk">
              <JumpStartBox
                // bgColor="linear-gradient(270deg,#F15753,orange)"
                noProgress
                bgColor={colors[index % colors.length]} 
                title={region.regions}
                isLoading={props.user.fetchingJumpstartInvestor}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = ({ dashboard, region, auth }) => ({
  user: auth.userDetails,
  regions: region.regions,
  organizationId: auth.userDetails.organizationId,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRegions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorRegionalJumpstartBox);

