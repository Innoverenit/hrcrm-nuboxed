import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {getHotColdWarm,handleLeadHCWdrawer} from "../../Containers/Dashboard/DashboardAction";

function Piechart1(props) {
  useEffect(()=> {
    if (props.timeRangeType === "today") {
   props.getHotColdWarm(props.userId,props.startDate,props.endDate);
    }
    else {
      props.getHotColdWarm(props.userId,props.startDate,props.endDate);
    }
  },[props.userId,props.startDate,props.endDate]);
  const [stdudentSubject, setStudentsubject] = useState([]);
  const [studentMarks, setStudentMarks] = useState([]);


  useEffect(() => {
    setStudentsubject(["Math", "Science", "English"]);
    setStudentMarks([80, 90, 75]);
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid mb-3">
        {/* <h3 className="mt-3">Welcome to Piechart </h3> */}
        <Chart
          type="pie"
          width={500}
          height={170}
          series={studentMarks} 
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








// import React ,{ useState, useEffect} from "react";
// import  Chart  from "react-apexcharts";
// function Piechart1()
// {
//    const [stdudentSubject, setStudentsubject]= useState([]);
//    const [studentMarks, setStudentMarks]= useState([]);

//    useEffect( ()=>{
//        const sSubject=[];
//        const sMarks=[];
//        const getStudentdata= async()=>{
//        const reqData= await fetch("http://localhost/reactgraphtutorial/marks");
//        const resData= await reqData.json();       
//        for(let i=0; i< resData.length; i++)
//        {
//         sSubject.push(resData[i].subject);
//         sMarks.push(parseInt(resData[i].marks));
//        }
//        setStudentsubject(sSubject);
//        setStudentMarks(sMarks);
//         //console.log(resData); 
//        }

//     getStudentdata();

//    },[]);

//     return(
//         <React.Fragment>
//             <div className="container-fluid mb-3">
//                 <h3 className="mt-3">Welcome to Piechart </h3>
//                 <Chart 
//                 type="pie"
//                 width={1349}
//                 height={550}

//                 // series={ studentMarks }                

//                 options={{
//                     //     title:{ text:"Student PieChart"
//                     //     } , 
//                     //    noData:{text:"Empty Data"},                        
//                       // colors:["#f90000","#f0f"],
//                       labels:["adfs","hghg"]                     

//                  }}
//                 >
//                 </Chart>
//             </div>
//         </React.Fragment>
//     );
// }
// export default Piechart1;