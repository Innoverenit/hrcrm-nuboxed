import React, { useEffect ,useState} from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleInvestmentModal} from "../RegionalDashAction"
import { getRegions } from "../../Settings/Category/Region/RegionAction";
import { JumpStartBox } from "../../../Components/UI/Elements";
// import AddInvestmentDrawerModal from "./AddInvestmentDrawerModal";

function MultiOrgInvestorRegionalJumpstartBox(props) {
  const [totalOrgValue, setTotalOrgValue] = useState(0);

  const {
    handleInvestmentModal,
    addInvestmentModal
  } = props;
  useEffect(() => {
    const totalValue = props.multiOrgRecords.reduce(
      (accumulator, region) => accumulator + region.orgValue,
      0
    );
    setTotalOrgValue(totalValue);
  }, [props.multiOrgRecords]);

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
        {region.investment !== 0 && (
          <div className="flex w-wk">
            <JumpStartBox
              // bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              cursorData={"pointer"}
              bgColor={colors[index % colors.length]}
              value={region.orgValue}
              title={region.orgName}
              isLoading={props.user.fetchingJumpstartInvestor}
            />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

      {/* <AddInvestmentDrawerModal
        addInvestmentModal={addInvestmentModal}
        handleInvestmentModal={handleInvestmentModal}
      /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MultiOrgInvestorRegionalJumpstartBox);

