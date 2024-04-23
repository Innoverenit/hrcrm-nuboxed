import React,{useEffect,useState} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import {getDevelopChart} from "../../Containers/Dashboard/DashboardAction";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



const BiaxialBarChart = (props) => {
  const [weekendStart, setWeekendStart] = useState('');
  const [weekendEnd, setWeekendEnd] = useState('');
    useEffect(()=> {
       props.getDevelopChart(props.userId,weekendStart,weekendEnd)
      },[props.userId,weekendStart,weekendEnd]);
      
useEffect(() => {
  // Check if data is available
  if (props.developChart.length > 0) {
    // Update activeTab when data is available
    //setActiveTab(props.organizationDetailsList[0]?.organizationId);
  }
}, [props.developChart]);

      useEffect(() => {
        calculateCurrentWeekend();
      }, []);
      const calculateCurrentWeekend = () => {
        const today = new Date();
        const currentDay = today.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
        const daysUntilPreviousMonday = currentDay === 0 ? 6 : currentDay - 1; // Days until previous Monday
        const weekendStartDate = new Date(today);
        weekendStartDate.setDate(today.getDate() - daysUntilPreviousMonday);
        const weekendEndDate = new Date(weekendStartDate);
        weekendEndDate.setDate(weekendStartDate.getDate() + 6);
    
        // setWeekendStart(weekendStartDate.toDateString());
        // setWeekendEnd(weekendEndDate.toDateString());
    
        setWeekendStart(formatDate(weekendStartDate));
        setWeekendEnd(formatDate(weekendEndDate));
    
      };
    
      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
      };
    const jsonData = [
        {
          "definedHour": 8,
          "typeName": "Hiring",
          "ActualHour": 7
        },
        {
          "definedHour": 6,
          "typeName": "Research",
          "ActualHour": 4,
        },
        {
          "definedHour": 5,
          "typeName": "Customer order",
          "ActualHour": 3,
        },
        {
          "definedHour": 8,
          "typeName": "Travel",
          "ActualHour": 12,
        },
        {
          "definedHour": 10,
          "typeName": "test1",
          "ActualHour": 8
        },
        {
          "definedHour": 9,
          "typeName": "test2",
          "ActualHour": 4
        }
      ];
      
      const data = props.developChart.map(item => ({
        name: item.typeName,
        Requirement: item.definedHour,
        Actual: item.calculateHour
      }));
  return (
    <>
    <div style={{marginTop:"-14px",textAlign:"center",fontWeight:"bold"}}>{moment.utc(weekendStart).format("DD-MM-YYYY")}-{moment.utc(weekendEnd).format("DD-MM-YYYY")}</div>
    {/* {`  ${moment.utc(weekendStart).format("DD-MM-YYYY")-moment.utc(weekendEnd
  ).format("DD-MM-YYYY")}`} */}
    <BarChart width={600} height={162} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="left" />
      <YAxis yAxisId="right" orientation="right" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Actual" fill="#82ca9d" yAxisId="right" name="Actual" />
      <Bar dataKey="Requirement" fill="tomato" yAxisId="left" name="Requirement" />
      
    </BarChart>
    </>
  );
}
const mapStateToProps = ({ dashboard,auth }) => ({
    userId:auth.userDetails.userId,
    developChart:dashboard.developChart
  });
  const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        getDevelopChart
    },
    dispatch
  );
  export default connect(mapStateToProps, mapDispatchToProps)(BiaxialBarChart);
