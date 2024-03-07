import React, {useEffect,lazy} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox, } from "../../../../Components/UI/Elements";
import {getJumpBulblist,getJumpBulblist2,
getJumpCustomerlist,getJumpCustomerlist2,handleLeadQualifiedDrawer,handleLeadAddedDrawer,
handleOppoAddedDrawer,handleOppoClosedDrawer
} from "../../DashboardAction";
const LeadQualifiedDrawer=lazy(()=>import("./CustomerDrawer/LeadQualifiedDrawer"));
const LeadAddedDrawer=lazy(()=>import("./CustomerDrawer/LeadAddedDrawer"));
const OppoAddedDrawer=lazy(()=>import("./CustomerDrawer/OppoAddedDrawer")); 
const OppoClosedDrawer=lazy(()=>import("./CustomerDrawer/OppoClosedDrawer")); 

function DashboardCustomerOrgJumpstart (props){

  useEffect(()=>{
  if (props.timeRangeType === "today") {
  props.getJumpBulblist(props.userId,props.startDate, props.endDate)
  props.getJumpBulblist2(props.userId,props.startDate,props.endDate)
   props.getJumpCustomerlist(props.userId, props.startDate, props.endDate);
   props.getJumpCustomerlist2(props.userId, props.startDate, props.endDate);
  }
  else {
    props.getJumpBulblist(props.userId,props.startDate,props.endDate)
    props.getJumpBulblist2(props.userId,props.startDate,props.endDate)
     props.getJumpCustomerlist(props.userId, props.startDate,props.endDate);
     props.getJumpCustomerlist2(props.userId, props.startDate,props.endDate);
  }
},[props.userId, props.startDate,props.endDate]);
  
  const {handleLeadQualifiedDrawer,openLeadQualified,handleLeadAddedDrawer,
    openLeadAdded,handleOppoAddedDrawer,openOppoAdded,handleOppoClosedDrawer,clickOppoClosed
   } = props;
 

  return(
    <>
      <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
        <div class="flex w-wk">
          <JumpStartBox
            bgColor="linear-gradient(270deg,#F15753,orange)"
            noProgress
            title={<FormattedMessage
              id="app.leadsQualified"
              defaultMessage="Leads Qualified"
            />}
           
            jumpstartClick={()=>handleLeadQualifiedDrawer(true)}
            cursorData={"pointer"}
            value={props.jumpstartBulbCount.qualifiedLeadsList}
            isLoading={props.user.fetchingJumpstartBulb}
          />
       
          <JumpStartBox
                      bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            noProgress
            title={<FormattedMessage
              id="app.leadsAdded"
              defaultMessage="Leads Added"
            />}
          
            jumpstartClick={()=>handleLeadAddedDrawer(true)}
            cursorData={"pointer"}
            value={props.jumpstartBulb2Count.createdLeadsList }
           isLoading={props.fetchingJumpstartBulb2}
    
          />
</div>
<div class="flex w-wk">
          <JumpStartBox
 bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            noProgress
            title={<FormattedMessage
              id="app.opportunitiesAdded"
              defaultMessage="Opportunities Added"
            />}
            jumpstartClick={()=>handleOppoAddedDrawer(true)}
            cursorData={"pointer"}
            value={props.jumpstrtCUSTOCount.opportunityAdded}
             isLoading={props.fetchingJumpstartCustolist}
            
          />
          <JumpStartBox
            bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            noProgress
            title={<FormattedMessage
              id="app.opportunitiesClosed"
              defaultMessage="Opportunities Closed"
            />}
            // title="Opportunities Closed"
            jumpstartClick={()=>handleOppoClosedDrawer(true)}
            cursorData={"pointer"}
            value={
                props.jumpstrtCUSTO2Count.closedOpportunity
            }
            
            isLoading={props.fetchingJumpstartCusto2list}
          />
          </div>
        </div>
    
      </div>

      <LeadQualifiedDrawer
      openLeadQualified={openLeadQualified}
      handleLeadQualifiedDrawer={handleLeadQualifiedDrawer}
      />
      <LeadAddedDrawer
      openLeadAdded={openLeadAdded}
      handleLeadAddedDrawer={handleLeadAddedDrawer}
      />
      <OppoAddedDrawer
      openOppoAdded={openOppoAdded}
      handleOppoAddedDrawer={handleOppoAddedDrawer}
      />
      <OppoClosedDrawer
            clickOppoClosed={clickOppoClosed}
            handleOppoClosedDrawer={handleOppoClosedDrawer}
      />

      </>
  ); 
}
const mapStateToProps = ({ dashboard,auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  showDatelist:dashboard.showDatelist,
  orgId:auth.userDetails.organizationId,
  showSalesDatelist:dashboard.showSalesDatelist,
  fetchingSalesDatewiseReport:dashboard.fetchingSalesDatewiseReport,
  fetchingSalesDatewiseReportError:dashboard.fetchingSalesDatewiseReportError,
  fetchingDatewiseReport:dashboard.fetchingDatewiseReport,
  fetchingDatewiseReportError:dashboard.fetchingDatewiseReportError,
  recruiterId:auth.userDetails.userId,
  fetchingTaskper:dashboard.fetchingTaskper,
  userId: auth.userDetails.employeeId,
  jumpstartBulbCount:dashboard.jumpstartBulbCount,
  jumpstartBulb2Count:dashboard.jumpstartBulb2Count,
  fetchingJumpstartBulb:dashboard.fetchingJumpstartBulb,
  fetchingJumpstartBulb2:dashboard.fetchingJumpstartBulb2,
  jumpstrtCUSTOCount:dashboard.jumpstrtCUSTOCount,
  fetchingJumpstartCustolist:dashboard.fetchingJumpstartCustolist,
  jumpstrtCUSTO2Count:dashboard.jumpstrtCUSTO2Count,
  fetchingJumpstartCusto2list:dashboard.fetchingJumpstartCusto2list,
  openLeadQualified:dashboard.openLeadQualified,
  openLeadAdded:dashboard.openLeadAdded,
  openOppoAdded:dashboard.openOppoAdded,
  clickOppoClosed:dashboard.clickOppoClosed,
  timeRangeType:dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getJumpBulblist,
  getJumpCustomerlist,
  getJumpBulblist2,
  getJumpCustomerlist2,
  handleLeadQualifiedDrawer,
  handleLeadAddedDrawer,
  handleOppoAddedDrawer,
  handleOppoClosedDrawer
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardCustomerOrgJumpstart);
