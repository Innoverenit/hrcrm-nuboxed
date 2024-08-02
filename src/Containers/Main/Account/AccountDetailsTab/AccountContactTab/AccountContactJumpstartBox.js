import React, {useEffect,lazy} from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { JumpStartBox, } from "../../../../../Components/UI/Elements";

function AccountContactJumpstartBox (props) {
 
//   useEffect(()=>{
//     if (props.timeRangeType === "today") {
//     props.getJumpInvestorlist(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor2list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor3list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor4list(props.userId, props.startDate, props.endDate);
//   }
//   else {
//     props.getJumpInvestorlist(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor2list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor3list(props.userId, props.startDate, props.endDate);
//     props.getJumpInvestor4list(props.userId, props.startDate, props.endDate);
//   }
//   },[props.userId,props.startDate,props.endDate]);


    const { openPitchQualified,handlePitchQualifiedDrawer,openPitchAdded,handlePitchAddedDrawer,
      openDealAdded,handleDealAddedDrawer,openDealClosed,handleDealClosedDrawer
    } = props;

    return (
      <>
       <div class=" flex flex-row w-full" >
        <div class=" flex w-full max-sm:flex-col" >
        <div class="flex w-wk">
          <JumpStartBox
            noProgress
            bgColor="linear-gradient(270deg,#F15753,orange)"
            title={<FormattedMessage
              id="app.pitchQualified"
              defaultMessage="Pitch Qualified"
            />}
            // jumpstartClick={()=>handlePitchQualifiedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestorCount.qualifiedInvestorLeadsList}
            // isLoading={props.user.fetchingJumpstartInvestor}
          />

          <JumpStartBox
                       bgColor="linear-gradient(270deg,#ff8f57,#ffd342)"
            noProgress
            title={<FormattedMessage
              id="app.pitchAdded"
              defaultMessage="Pitch Added"
            />}
            // jumpstartClick={()=>handlePitchAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestor2Count.createdinvestorLeadsList}
            // isLoading={props.fetchingJumpstartInvestor2}
          />
</div>
<div class="flex w-wk">
          <JumpStartBox
  bgColor="linear-gradient(270deg,#3db8b5,#41e196)"
            noProgress
            title={<FormattedMessage
              id="app.dealsAdded"
              defaultMessage="Deals Added"
            />}
            // jumpstartClick={()=>handleDealAddedDrawer(true)}
            // cursorData={"pointer"}
            // value={props.jumpstartInvestor3Count.opportunityAdded}
            // isLoading={props.fetchingJumpstartInvestor3}
          />
          <JumpStartBox
                       bgColor="linear-gradient(270deg,#5786ea,#20dbde)"
            noProgress
            title={<FormattedMessage
              id="app.dealsClosed"
              defaultMessage="Deals Closed"
            />}
            // jumpstartClick={()=>handleDealClosedDrawer(true)}
            // cursorData={"pointer"}
            // value={ props.jumpstartInvestor4Count.closedOpportunity}
            // isLoading={props.fetchingJumpstartInvestor4}
          />
          </div>
        </div>
      </div>


      </>
     
    );
  }
const mapStateToProps = ({  auth }) => ({
  user: auth.userDetails,
  role: auth.userDetails.role,
  orgId: auth.userDetails.organizationId,
  recruiterId: auth.userDetails.userId,
  userId: auth.userDetails.employeeId,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
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
)(AccountContactJumpstartBox);
