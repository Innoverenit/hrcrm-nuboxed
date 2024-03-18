import React, { useState, useEffect, } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDashUserlist,getJumpBulblist2,
  getJumpBulblist,getTasklist,getJumpTasklist,getJumpCustomerlist,getJumpCustomerlist2
} from "../DashboardAction";
import {
  getTasks
} from "../../Settings/Task/TaskAction";
import { StyledSelect } from "../../../Components/UI/Antd";
import moment from "moment";
const Option =StyledSelect;

function DashboardShareForm(props) {
  const startDate = moment().startOf("month"); 
  const endDate = moment();
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

  }, []);

  const [selectedUser,setselectedUser]=useState("");
  function handleSelect(usr){
    const startDate = `${startDatestart.format("YYYY-MM-DD")}T20:00:00Z`
    const endDate = `${endDateend.format("YYYY-MM-DD")}T20:00:00Z`
    setselectedUser(usr)
    props.getJumpBulblist(usr,startDate,endDate)
   props.getJumpBulblist2(usr,startDate,endDate)
  props.getTasklist(usr)
   props.getJumpTasklist(usr,startDate,endDate)
   props.getTasks(usr)
   props.getJumpTasklist(usr,startDate,endDate)
 props.getJumpCustomerlist(usr, startDate, endDate)
props.getJumpCustomerlist2(usr, startDate, endDate)

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
      getJumpCustomerlist


    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DashboardShareForm);
