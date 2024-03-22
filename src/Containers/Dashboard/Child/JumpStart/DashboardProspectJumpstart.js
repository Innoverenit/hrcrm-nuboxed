import React, { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getJumpFinanceDetail } from "../../DashboardAction"
import { JumpStartBox,  } from "../../../../Components/UI/Elements";

function DashboardProspectJumpstart(props) {

  const { openPitchQualified, handlePitchQualifiedDrawer, openPitchAdded, handlePitchAddedDrawer,
    openDealAdded, handleDealAddedDrawer, openDealClosed, handleDealClosedDrawer
  } = props;

//   useEffect(() => {
//     props.getJumpFinanceDetail(props.orgId, props.timeRangeType)
//   }, [props.timeRangeType])
console.log(props.prospectChart)
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
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            // cursorData={"pointer"}
             value={props.prospectChart.opportunityCountByCountry}
            // isLoading={props.user.fetchingJumpstartInvestor}
            />

            <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={<FormattedMessage
                id="app.opertunitiesThisYear"
                defaultMessage="Quotations this Year"
              />}
            // jumpstartClick={()=>handlePitchAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.financeDetail.createdinvestorLeadsList}
            // isLoading={props.fetchingJumpstartInvestor2}
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
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.financeDetail.opportunityAdded}
            // isLoading={props.fetchingJumpstartInvestor3}
            />
            <JumpStartBox
                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={<FormattedMessage
                id="app.financecancelled"
                defaultMessage="Open Quotations"
              />}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            // value={ props.financeDetail.closedOpportunity}
            // isLoading={props.fetchingJumpstartInvestor4}
            />
          </div>
        </div>
      </div>


    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  financeDetail: dashboard.financeDetail,
  orgId: auth.userDetails.organizationId,
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
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail
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
