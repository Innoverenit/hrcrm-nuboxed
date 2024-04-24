import React, { useEffect, } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getJumpFinanceDetail
} from "../../DashboardAction";

function DashOrderJumpstart(props) {

  useEffect(() => {
    props.getJumpFinanceDetail(props.orgId,props.timeRangeType, "Catalog")
  }, [props.timeRangeType]);

  return (
    <>
   
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          <div class="flex w-wk">
            <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={<FormattedMessage
                id="app.financeadded"
                defaultMessage="Receivables Added"
              />}
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            cursorData={"pointer"}
            value={props.financeDetail.totalPayableAmount}
            isLoading={props.fetchingJumpstartFinanceDetail}
            />

           
          </div>
          <div class="flex w-wk">
            <JumpStartBox
 bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={<FormattedMessage
                id="app.financeclosed"
                defaultMessage="Receivables Closed"
              />}
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            cursorData={"pointer"}
            value={props.financeDetail.outstanding}
            isLoading={props.fetchingJumpstartFinanceDetail}
            />
            <JumpStartBox
                         bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={<FormattedMessage
                id="app.financecancelled"
                defaultMessage="Receivables Cancelled"
              />}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            cursorData={"pointer"}
            value={ props.financeDetail.orderValue}
            isLoading={props.fetchingJumpstartFinanceDetail}
            />
          </div>
        </div>
      </div>
      
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  financeDetail: dashboard.financeDetail,
  orgId: auth.userDetails.organizationId,
  fetchingJumpstartFinanceDetail: dashboard.fetchingJumpstartFinanceDetail,
  userId: auth.userDetails.employeeId,
  timeRangeType: dashboard.timeRangeType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpFinanceDetail
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
)(DashOrderJumpstart);
