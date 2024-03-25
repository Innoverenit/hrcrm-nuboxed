import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRegions } from "../Settings/Category/Region/RegionAction";
import { JumpStartBox } from "../../Components/UI/Elements";

function FullFillMentJumpstartBox(props) {
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

  return (
    <>

    <div className="flex flex-row w-full">
         
      <div className="flex w-full max-sm:flex-col">
        {props.regions.map((region, index) => (
          <div key={index} className="flex w-wk">
            <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={region.regions}
           sLoading={props.user.fetchingJumpstartInvestor}
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

export default connect(mapStateToProps, mapDispatchToProps)(FullFillMentJumpstartBox);
