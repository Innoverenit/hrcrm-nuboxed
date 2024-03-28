import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {handleSalesModal} from "../RegionalDashAction"
import { getRegions } from "../../Settings/Category/Region/RegionAction";
import { JumpStartBox } from "../../../Components/UI/Elements";
import AddSalesDrawerModal from "./AddSalesDrawerModal";

function RegionalSales(props) {
  const {
    handleSalesModal,
    addSalesModal
  } = props;

  useEffect(() => {
    props.getRegions(props.organizationId);
  }, []);

  const colors = [
    "linear-gradient(270deg,#F15753,orange)", 
    "linear-gradient(270deg,#3db8b5,#41e196)",
    "linear-gradient(270deg,#5786ea,#20dbde)",
    // "linear-gradient(270deg,#ff8f57,#ffd342)",
  ];

  return (
    <>
     
    <div className="flex flex-row w-full">
         
      <div className="flex w-full max-sm:flex-col">
        {props.regions.map((region, index) => (
          <div key={index} className="flex w-wk">
            <JumpStartBox
           bgColor={colors[index % colors.length]} 
              noProgress
              // onClick={() => handleSalesModal(true)}
              
              title={region.regions}
           sLoading={props.user.fetchingJumpstartInvestor}
            />
           
          </div>
        ))}
      </div>
    </div>
    <AddSalesDrawerModal
        addSalesModal={addSalesModal}
        handleSalesModal={handleSalesModal}
      />
    </>
  );
}

const mapStateToProps = ({ dashboard, region,dashboardRegional, auth }) => ({
  user: auth.userDetails,
  regions: region.regions,
  addSalesModal:dashboardRegional.addSalesModal,
  organizationId: auth.userDetails.organizationId,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getRegions,
      handleSalesModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegionalSales);
