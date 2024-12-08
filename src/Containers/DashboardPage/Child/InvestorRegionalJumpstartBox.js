import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleInvestmentModal} from "../RegionalDashAction"
import { getRegions } from "../../Settings/Category/Region/RegionAction";
import { JumpStartBox } from "../../../Components/UI/Elements";
import AddInvestmentDrawerModal from "./AddInvestmentDrawerModal";

function InvestorRegionalJumpstartBox(props) {
  const {
    handleInvestmentModal,
    addInvestmentModal
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
      {/* <div className="font-bold flex-col justify-center flex text-lg">Investment</div> */}
      <div className="flex flex-row w-full">
  <div className="flex w-full max-sm:flex-col">
    {props.regionRecords.map((region, index) => (
      <React.Fragment key={index}>
        {region.investment !== 0 && (
          <div className="flex w-wk">
            <JumpStartBox
              // bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              value={region.investment}
              jumpstartClick={() => handleInvestmentModal(true)}
              cursorData={"pointer"}
              bgColor={colors[index % colors.length]}
              title={region.regions}
              isLoading={props.user.fetchingJumpstartInvestor}
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

      <AddInvestmentDrawerModal
        addInvestmentModal={addInvestmentModal}
        handleInvestmentModal={handleInvestmentModal}
      />
    </>
  );
}

const mapStateToProps = ({ dashboard, region,dashboardRegional, auth }) => ({
  user: auth.userDetails,
  regions: region.regions,
  addInvestmentModal:dashboardRegional.addInvestmentModal,
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
      handleInvestmentModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InvestorRegionalJumpstartBox);

