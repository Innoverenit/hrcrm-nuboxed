import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getHotColdWarm,handleLeadHCWdrawer} from "../../Containers/Dashboard/DashboardAction";


function Piechart1(props) {
  useEffect(()=> {
    if (props.timeRangeType === "today") {
   props.getHotColdWarm(props.userId,props.endDate,props.startDate);
    }
    else {
      props.getHotColdWarm(props.userId,props.endDate,props.startDate);
    }
  },[props.userId,props.endDate,props.startDate]);
  const [stdudentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);


  useEffect(() => {
    setStudentsubject(["Hot", "Warm", "Cold"]);
    setStudentMarks([1, 1, 2]);
  }, []);
console.log(props.showHotColdWarm)
// if(props.gettingHotColdWarm){
//   return <BundleLoader/>
// }
  return (
    <React.Fragment>
      <div >
        {/* <h3 className="mt-3">Welcome to Piechart </h3> */}
        <Chart
          type="pie"
          width={500}
          height={170}
          series={props.showHotColdWarm} 
          options={{
            labels: stdudentSubject, 
          }}
        />
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = ({ dashboard,auth }) => ({
  showHotColdWarm:dashboard.showHotColdWarm,
  userId:auth.userDetails.userId,
  timeRangeType:dashboard.timeRangeType,
  startDate: dashboard.startDate,
  endDate: dashboard.endDate,
  gettingHotColdWarm:dashboard.gettingHotColdWarm,
  showHotColdWarm:dashboard.showHotColdWarm,
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
export default connect(mapStateToProps, mapDispatchToProps)(Piechart1);