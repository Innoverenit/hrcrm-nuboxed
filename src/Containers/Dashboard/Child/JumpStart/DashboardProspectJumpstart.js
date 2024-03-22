import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AddProspectQuotationLifeTime from "../JumpStart/AddProspectQuotationLifeTime"
import AddProspectQuotationYear from "../JumpStart/AddProspectQuotationYear"
import AddProspectDrawerModal from "../JumpStart/AddProspectDrawerModal"
import { getJumpFinanceDetail ,handleQuotationLife,handleQuotationYear,handleProspectDrawer} from "../../DashboardAction"
import { JumpStartBox,  } from "../../../../Components/UI/Elements";

function DashboardProspectJumpstart(props) {

  const { openPitchQualified, handlePitchQualifiedDrawer, openPitchAdded, handlePitchAddedDrawer,
    openDealAdded, handleDealAddedDrawer, openDealClosed, handleDealClosedDrawer
  } = props;

//   useEffect(() => {
//     props.getJumpFinanceDetail(props.orgId, props.timeRangeType)
//   }, [props.timeRangeType])
console.log(props.prospectChart)
console.log(props.prospectLifeTime.customerCountByCountry)
  return (
    <>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          <div class="flex w-wk">
            <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={<FormattedMessage
                id="app.prospects"
                defaultMessage="Prospects"
              />}
            jumpstartClick={()=>props.handleProspectDrawer(true)}
            cursorData={"pointer"}
             value={props.prospectChart.customerCountByCountry}
            isLoading={props.fetchingProspectData}
            />

            <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={<FormattedMessage
                id="app.opertunitiesThisYear"
                defaultMessage="Quotations this Year"
              />}
            jumpstartClick={()=>props.handleQuotationYear(true)}
             cursorData={"pointer"}
            value={props.openQuotationYear.yearlyOpportunityCountByCountry}
          isLoading={props.fetchingOpenQuotationYear}
            />
          </div>
          <div class="flex w-wk">
            <JumpStartBox
   bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={<FormattedMessage
                id="app.financeclosed"
                defaultMessage="Quotations Life Time"
              />}
              value={props.prospectLifeTime.opportunityCountByCountry}
            jumpstartClick={()=>props.handleQuotationLife(true)}
            cursorData={"pointer"}
            // value={props.financeDetail.opportunityAdded}
            isLoading={props.fetchingProspectLifetime}
            />
            <JumpStartBox
                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={<FormattedMessage
                id="app.financecancelled"
                defaultMessage="Open Quotations"
              />}
              value={props.prospectQuotation.openOpportunityCountByCountry}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            // value={ props.financeDetail.closedOpportunity}
          isLoading={props.fetchingProspectQuotation}
            />
          </div>
        </div>
      </div>
<AddProspectDrawerModal
selectedCountry={props.selectedCountry}
prospectDrawerModal={props.prospectDrawerModal}
handleProspectDrawer={props.handleProspectDrawer}
/>


<AddProspectQuotationYear
handleQuotationYear={props.handleQuotationYear}
prospectQuotationYearModal={props.prospectQuotationYearModal}
// prospectDrawerModal={props.prospectDrawerModal}
// handleProspectDrawer={props.handleProspectDrawer}
/>


<AddProspectQuotationLifeTime
handleQuotationLife={props.handleQuotationLife}
prospectQuotationLifeModal={props.prospectQuotationLifeModal}
// handleQuotationYear={props.handleQuotationYear}
// prospectQuotationYearModal={props.prospectQuotationYearModal}
// prospectDrawerModal={props.prospectDrawerModal}
// handleProspectDrawer={props.handleProspectDrawer}
/>

    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  financeDetail: dashboard.financeDetail,
  orgId: auth.userDetails.organizationId,
  prospectDrawerModal:dashboard.prospectDrawerModal,
  showSalesDatelist: dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport: dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError: dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport: dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError: dashboard.fetchingDatewiseReportError,
  recruiterId: auth.userDetails.userId,
  userId: auth.userDetails.employeeId,
  timeRangeType: dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
  prospectQuotationLifeModal:dashboard.prospectQuotationLifeModal,
  prospectQuotationYearModal:dashboard.prospectQuotationYearModal
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail,
      handleProspectDrawer,
      handleQuotationYear,
      handleQuotationLife
      //   getJumpInvestorlist,
      //   getJumpInvestor2list,
      //   getJumpInvestor3list,
      //   getJumpInvestor4list,
      //   handlePitchQualifiedDrawer,
      //   handlePitchAddedDrawer,
      //   handleDealAddedDrawer,
      //   handleDealClosedDrawer

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardProspectJumpstart);
