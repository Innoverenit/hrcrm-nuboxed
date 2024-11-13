import React, { useEffect,lazy } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getHotColdWarm,handleLeadHCWdrawer} from "./DashboardAction";
const LeadHCWdrawer = lazy(()=>import("./LeadHCWDrawer/LeadHCWdrawer"));

function LeadsHotColdWarm (props) {
     
  useEffect(()=> {
    if (props.timeRangeType === "today") {
   props.getHotColdWarm(props.userId,props.endDate,props.startDate);
    }
    else {
      props.getHotColdWarm(props.userId,props.endDate,props.startDate);
    }
  },[props.userId,props.endDate,props.startDate]);

  const {showHotColdWarm,handleLeadHCWdrawer,openLeadHCWdrawer}=props;
    return (
      <>
   
          <div className="grid grid-cols-5 gap-4 p-4">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex">        <FormattedMessage
          id="app.hot"
          defaultMessage="Hot"
        /></div>
          <div class="text-2xl cursor-pointer" onClick={()=>{handleLeadHCWdrawer(true)}}>{showHotColdWarm.hotList}</div></div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">
          <FormattedMessage
          id="app.hot"
          defaultMessage="Cold"
        />
            </div>
          <div class="text-2xl cursor-pointer" onClick={()=>{handleLeadHCWdrawer(true)}}>{showHotColdWarm.coldList}</div>
          </div>
          <div className="col-span-2 sm:col-span-1">
          <div className="flex">
          <FormattedMessage
          id="app.warm"
          defaultMessage="Warm"
        />
            </div>
          <div class="text-2xl cursor-pointer" onClick={()=>{handleLeadHCWdrawer(true)}}>{showHotColdWarm.warmList}</div>
        </div>
</div>
        

<LeadHCWdrawer
openLeadHCWdrawer={openLeadHCWdrawer}
handleLeadHCWdrawer={handleLeadHCWdrawer}
/>


      </>

    );
  
}

const mapStateToProps = ({ dashboard,auth }) => ({
    showHotColdWarm:dashboard.showHotColdWarm,
    userId:auth.userDetails.userId,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
    openLeadHCWdrawer:dashboard.openLeadHCWdrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getHotColdWarm,
      handleLeadHCWdrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(LeadsHotColdWarm);


