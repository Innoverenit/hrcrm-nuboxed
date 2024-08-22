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


  useEffect(() => {
    if(props.buttonName==="My View"){
      props.getFinaceOrderDetails(props.userId,props.timeRangeType)

    } else if(props.buttonName==="Enterprise"){
    props.getFinaceOrderDetails(props.orgId,props.timeRangeType)
    }
 }, [props.buttonName,props.orgId,props.userId,props.timeRangeType]);
  return (
    <>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
          
          <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                     
                     <div class="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                         <div class="flex flex-row items-center">
                             <div class="flex-shrink pr-3">
                                 <div class="rounded-full p-2 bg-green-600"><i class="fa fa-wallet fa-2x fa-inverse"></i></div>
                             </div>
                             <JumpStartBox
              bgColor="linear-gradient(270deg,#F15753,orange)"
              noProgress
              title="Orders Added"
              jumpstartClick={()=>props.handleDasboardRepairOrderDrawer(true)}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.totalOrder}
             isLoading={props.fetchingFinaceorderDetails}
            />
                         </div>
                     </div>
                 
                
                 <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-pink-600"><i class="fas fa-users fa-2x fa-inverse"></i></div>
                               </div>
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
                       </div>
                    
                   </div>  
            

          
          </div>
          
                <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                       
                       <div class="bg-gradient-to-b from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                           <div class="flex flex-row items-center">
                               <div class="flex-shrink pr-3">
                                   <div class="rounded-full p-2 bg-yellow-600"><i class="fas fa-user-plus fa-2x fa-inverse"></i></div>
                               </div>
                               <JumpStartBox
           bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
              noProgress
              title="Orders Closed"
             
              jumpstartClick={()=>props.handleDasboardRepairOrderCloseDrawer(true)}
              cursorData={"pointer"}
              value={props.finaceOrderinDashboard.completeOrder}
              isLoading={props.fetchingFinaceorderDetails}
            />
                           </div>
                       </div>
                     
                   </div>  
                   <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                      
                      <div class="bg-gradient-to-b from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl p-1 h-[5rem] w-wk flex items-center">
                          <div class="flex flex-row items-center">
                              <div class="flex-shrink pr-3">
                                  <div class="rounded-full p-2 bg-blue-600"><i class="fas fa-server fa-2x fa-inverse"></i></div>
                              </div>
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
                      </div>
                     
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
