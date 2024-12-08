import React, { useEffect,useState,lazy } from "react";
import { connect } from "react-redux";
import Chart from "react-apexcharts";
import { bindActionCreators } from "redux";
import {getInvHotColdWarm,handlePitchHCWdrawer} from "./DashboardAction";
const PitchHCWdrawer = lazy(()=>import("./PitchHCWdrawer/PitchHCWdrawer"));

function PitchHotColdWarm (props) {
    
  const [stdudentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);
  
  useEffect(()=> {
    if (props.timeRangeType === "today") {
   props.getInvHotColdWarm(props.userId,props.endDate,props.startDate);
    }else{
      props.getInvHotColdWarm(props.userId,props.endDate,props.startDate);
    }
  },[props.userId,props.endDate,props.startDate]);

  const {investorHotColdWarm,openPitchHCWdrawer,handlePitchHCWdrawer}=props;

  useEffect(() => {
    setStudentsubject(["Hot", "Warm", "Cold"]);
    setStudentMarks([1, 3, 2]);
  }, []);

    return (
      <>
   
       
     <div >
        <Chart
          type="pie"
          width={500}
          height={170}
          series={props.investorHotColdWarm} 
          options={{
            labels: stdudentSubject, 
          }}
        />
      </div>   
<PitchHCWdrawer
openPitchHCWdrawer={openPitchHCWdrawer}
handlePitchHCWdrawer={handlePitchHCWdrawer}
/>
      </>
    );
  
}

const mapStateToProps = ({ dashboard,auth }) => ({
    investorHotColdWarm:dashboard.investorHotColdWarm,
    userId:auth.userDetails.userId,
    timeRangeType:dashboard.timeRangeType,
    startDate: dashboard.startDate,
    endDate: dashboard.endDate,
    openPitchHCWdrawer:dashboard.openPitchHCWdrawer
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getInvHotColdWarm,
      handlePitchHCWdrawer
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(PitchHotColdWarm);

