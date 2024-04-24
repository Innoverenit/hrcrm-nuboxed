import React, { useEffect, } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getJumpOrderCount,
  getJumpOrderDetail
} from "../../DashboardAction";

function DashboardOrderJumpstart(props) {

  useEffect(() => {
    props.getJumpOrderDetail(props.timeRangeType, "Catalog")
  }, [props.timeRangeType]);
  console.log(props.timeRangeType)
  return (
    <>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          <div class="flex w-wk">
            <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title={<FormattedMessage
                id="app.ordersAdded"
                defaultMessage="Orders Added"
              />}
              // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
              cursorData={"pointer"}
              value={props.orderinDashboard.totalOrder}
            isLoading={props.fetchingorderDetails}
            />

            <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={<FormattedMessage
                id="app.ordersopen"
                defaultMessage="Orders Open"
              />}
              // jumpstartClick={()=>handlePitchAddedDrawer(true)}
              cursorData={"pointer"}
            // value={ props.orderinDashboard.pendingOrder}
            isLoading={props.fetchingorderDetails}
            />
          </div>
          <div class="flex w-wk">
            <JumpStartBox
bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title={<FormattedMessage
                id="app.ordersclosed"
                defaultMessage="Orders Closed"
              />}
              // jumpstartClick={()=>handleDealAddedDrawer(true)}
              cursorData={"pointer"}
            // value={props.orderinDashboard.completeOrder}
            isLoading={props.fetchingorderDetails}
            />
            <JumpStartBox
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title={<FormattedMessage
                id="app.orderscancelled"
                defaultMessage="Orders Cancelled"
              />}
              // jumpstartClick={()=>handleDealClosedDrawer(true)}
              cursorData={"pointer"}
              value={props.orderinDashboard.cancelOrder}
            isLoading={props.fetchingorderDetails}
            />


          </div>
           {/* <div class="flex w-wk">
          <JumpStartBox
                         bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title={<FormattedMessage
                id="app.financeopen"
                defaultMessage="Receivables Open"
              />}
           
            // jumpstartClick={()=>handlePitchAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.financeDetail.createdinvestorLeadsList}
            // isLoading={props.fetchingJumpstartInvestor2}
            />
               </div> */}
        </div>
      </div>
   
      {/* <PitchQualifiedDrawer
      openPitchQualified={openPitchQualified}
      handlePitchQualifiedDrawer={handlePitchQualifiedDrawer}
      />
       <PitchAddedDrawer
      openPitchAdded={openPitchAdded}
      handlePitchAddedDrawer={handlePitchAddedDrawer}
      />
      <DealsAddedDrawer 
     openDealAdded={openDealAdded}
     handleDealAddedDrawer={handleDealAddedDrawer}
    />
    <DealsClosedDrawer 
     openDealClosed={openDealClosed}
     handleDealClosedDrawer={handleDealClosedDrawer}
    /> */}
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  orderinDashboard: dashboard.orderinDashboard,
  orgId: auth.userDetails.organizationId,
  fetchingorderDetails: dashboard.fetchingorderDetails,
  userId: auth.userDetails.employeeId,
  timeRangeType: dashboard.timeRangeType,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpOrderCount,
      getJumpOrderDetail
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
)(DashboardOrderJumpstart);
