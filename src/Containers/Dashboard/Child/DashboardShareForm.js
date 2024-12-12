import React, { useState, useEffect, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashUserlist,getJumpBulblist2,
  getJumpBulblist,getTasklist,getJumpTasklist,getJumpCustomerlist,getJumpCustomerlist2,
  getQuotationDashboard,
  getQuotationDashboardCount,
  getTaskDashboard,
 getDealDashboard,
 getOrderDashboard,
 getOrderDashboardCount,
} from "../DashboardAction";
import {
  getTasks
} from "../../Settings/Task/TaskAction";
import { StyledSelect } from "../../../Components/UI/Antd";
import dayjs from "dayjs";
const Option =StyledSelect;

function DashboardShareForm(props) {
  const startDate = dayjs().startOf("month"); 
  const endDate = dayjs();
  var today = new Date(),
  date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate();

    const [dateD,setdateD]=useState(date);
    const [startDatestart,setstartDate]=useState(startDate);
    const [endDateend,setendDate]=useState(endDate);
    

  useEffect(() => {
    props.getDashUserlist(props.orgId);

  }, [props.orgId]);

  const [selectedUser,setselectedUser]=useState(props.userId);

  function handleSelect(usr){
    const userIdToUse = usr === "all" ? props.userId : usr;

    const startDate = `${startDatestart.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${endDateend.format("YYYY-MM-DD")}T20:00:00Z`

setselectedUser(userIdToUse);

 if(props.activeButton==="task") {
    props.getJumpBulblist(userIdToUse,startDate,endDate);
   props.getJumpBulblist2(userIdToUse,startDate,endDate);
  props.getTasklist(userIdToUse);
   props.getJumpTasklist(userIdToUse,startDate,endDate);
   props.getTasks(userIdToUse);
   props.getJumpTasklist(userIdToUse,startDate,endDate);
 props.getJumpCustomerlist(userIdToUse, startDate, endDate);
props.getJumpCustomerlist2(userIdToUse, startDate, endDate);}
 else if(props.activeButton==="Summary"){
     props.getQuotationDashboard(userIdToUse);
     props.getQuotationDashboardCount(userIdToUse);
     props.getTaskDashboard(userIdToUse, "0");
    props.getTasklist(userIdToUse);
    props.getDealDashboard(userIdToUse);
    props.getOrderDashboard(userIdToUse, "procure");
    props.getOrderDashboardCount(userIdToUse, "procure");
 }

  }

console.log("usrrr",selectedUser)
  return (
    <>
     <StyledSelect
        defaultValue={props.fullName}
        style={{ width: "10rem",margin:"auto",paddingRight:"5px"}}
        placeholder="Select to View"
        onChange={(e) => handleSelect(e)}
      >
        <Option value={"all"}>{"All"} </Option>
        {props.dashboardUserlist.map((item) => {
          return <Option value={item.employeeId}>{item.empName} </Option>;
        })}
      </StyledSelect>
    </>
  );
}

const mapStateToProps = ({ dashboard ,auth}) => ({
  userId:auth.userDetails.userId,
  orgId:auth.userDetails.organizationId,
  fullName:auth.userDetails.fullName,
  dashboardUserlist: dashboard.dashboardUserlist,
  
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDashUserlist,
      getJumpBulblist,
      getTasklist,
      getJumpTasklist,
      getTasks,
      getJumpTasklist,
      getJumpBulblist2,
      getJumpCustomerlist2,
      getJumpCustomerlist,
      getQuotationDashboard,
      getQuotationDashboardCount,
      getTaskDashboard,
     getDealDashboard,
     getOrderDashboard,
     getOrderDashboardCount,

    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardShareForm);
