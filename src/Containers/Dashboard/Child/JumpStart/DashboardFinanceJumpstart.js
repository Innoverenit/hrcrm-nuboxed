import React, { useEffect, } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
        import AddDashboardRepairOrdersCloseModal from "../../Child/JumpStart/AddDashboardRepairOrdersCloseModal"
import AddDashboardRepairOrdersOpenModal from "../../Child/JumpStart/AddDashboardRepairOrdersOpenModal"
import AddDashboardRepairOrdersAddedModal from "../../Child/JumpStart/AddDashboardRepairOrdersAddedModal"
import { bindActionCreators } from "redux";
import { JumpStartBox,  } from "../../../../Components/UI/Elements";
import {
  getFinaceOrderDetails,
  handleDasboardRepairOrderDrawer,
  handleDasboardRepairOrderOpenDrawer,
  handleDasboardRepairOrderCloseDrawer,
} from "../../DashboardAction";

function DashboardFinanceJumpstart(props) {

  useEffect(() => {
     props.getFinaceOrderDetails(props.userId,props.timeRangeType)
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
              title="Orders Added"
              jumpstartClick={()=>props.handleDasboardRepairOrderDrawer(true)}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.totalOrder}
             isLoading={props.fetchingFinaceorderDetails}
            />

            <JumpStartBox
            bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
              noProgress
              title="Orders Open"
          jumpstartClick={()=>props.handleDasboardRepairOrderOpenDrawer(true)}
              cursorData={"pointer"}
            value={ props.finaceOrderinDashboard.pendingOrder}
            isLoading={props.fetchingFinaceorderDetails}
            />
          </div>
          <div class="flex w-wk">
            <JumpStartBox
bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title="Orders Closed"
             
              jumpstartClick={()=>props.handleDasboardRepairOrderCloseDrawer(true)}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.completeOrder}
              isLoading={props.fetchingFinaceorderDetails}
            />
            <JumpStartBox
                        bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
              noProgress
              title="Orders  Cancelled"
              
              // jumpstartClick={()=>handleDealClosedDrawer(true)}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.cancelOrder}
              isLoading={props.fetchingFinaceorderDetails}
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

      <AddDashboardRepairOrdersAddedModal
      addDashboardRepairOrderModal={props.addDashboardRepairOrderModal}
       handleDasboardRepairOrderDrawer={props.handleDasboardRepairOrderDrawer}
      />
        <AddDashboardRepairOrdersOpenModal
        addDashboardRepairOrderOpenModal={props.addDashboardRepairOrderOpenModal}
      // addDashboardRepairOrderModal={props.addDashboardRepairOrderModal}
       handleDasboardRepairOrderOpenDrawer={props.handleDasboardRepairOrderOpenDrawer}
      />
       <AddDashboardRepairOrdersCloseModal
        addDashboardRepairOrderCloseModal={props.addDashboardRepairOrderCloseModal}
      // addDashboardRepairOrderModal={props.addDashboardRepairOrderModal}
       handleDasboardRepairOrderCloseDrawer={props.handleDasboardRepairOrderCloseDrawer}
      />
   
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
  fetchingJumpOrderCount: dashboard.fetchingJumpOrderCount,
  userId: auth.userDetails.userId,
  addDashboardRepairOrderModal:dashboard.addDashboardRepairOrderModal,
  finaceOrderinDashboard: dashboard.finaceOrderinDashboard,
  fetchingFinaceorderDetails: dashboard.fetchingFinaceorderDetails,
  timeRangeType: dashboard.timeRangeType,
  addDashboardRepairOrderCloseModal:dashboard.addDashboardRepairOrderCloseModal,
  addDashboardRepairOrderOpenModal:dashboard.addDashboardRepairOrderOpenModal

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getFinaceOrderDetails,
      handleDasboardRepairOrderDrawer,
      handleDasboardRepairOrderOpenDrawer,
      handleDasboardRepairOrderCloseDrawer,
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
)(DashboardFinanceJumpstart);
