import React, { useEffect, } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import OrdersAddedModal from "./OrdersAddedModal"
import OrdersCancelModal from "./OrdersCancelModal"
import OrdersOpenModal from "./OrdersOpenModal"
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getJumpOrderCount,
  getJumpOrderDetail,
handleOrderAddedModal,
handleOrderCancelModal,
handleOrderClosedModal,
handleOrderOpenModal
} from "../../DashboardAction";
import OrdersClosedModal from "./OrdersClosedModal"

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
              jumpstartClick={()=>props.handleOrderAddedModal(true)}
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
            jumpstartClick={()=>props.handleOrderOpenModal(true)}
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
              jumpstartClick={()=>props.handleOrderClosedModal(true)}
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
              jumpstartClick={()=>props.handleOrderCancelModal(true)}
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
   
     <OrdersAddedModal
       orderAddedModal={props.orderAddedModal}
       handleOrderAddedModal={props.handleOrderAddedModal}
      />
        <OrdersCancelModal
       orderCancelModal={props.orderCancelModal}
       handleOrderCancelModal={props.handleOrderCancelModal}
      />
       <OrdersClosedModal
       orderClosedModal={props.orderClosedModal}
       handleOrderClosedModal={props.handleOrderClosedModal}
      />

<OrdersOpenModal
       orderOpenModal={props.orderOpenModal}
       handleOrderOpenModal={props.handleOrderOpenModal}
      />
       {/* <PitchAddedDrawer
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
    />  */}
    </>

  );
}
const mapStateToProps = ({ dashboard, auth }) => ({
  user: auth.userDetails,
  orderinDashboard: dashboard.orderinDashboard,
  orgId: auth.userDetails.organizationId,
  fetchingorderDetails: dashboard.fetchingorderDetails,
  userId: auth.userDetails.employeeId,
  orderAddedModal:dashboard.orderAddedModal,
  orderCancelModal:dashboard.orderCancelModal,
  orderClosedModal:dashboard.orderClosedModal,
  timeRangeType: dashboard.timeRangeType,
  orderOpenModal:dashboard.orderOpenModal

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getJumpOrderCount,
      getJumpOrderDetail,
      handleOrderAddedModal,
      handleOrderCancelModal,
      handleOrderClosedModal,
      handleOrderOpenModal
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
