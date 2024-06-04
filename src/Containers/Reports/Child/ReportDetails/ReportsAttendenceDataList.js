import React,{ useEffect, useState, lazy }  from 'react'
import { connect } from "react-redux";
import {getReportsAttendenceDataList} from "../../ReportAction"
import { bindActionCreators } from "redux";

function ReportsAttendenceDataList(props) {
    useEffect(() => {
       props.getReportsAttendenceDataList(props.userId,props.startDateData)
      }, []);
  return (
    <div>ReportsProductuvityData</div>
  )
}

const mapStateToProps = ({
    auth,
    customer,
    sector,
    opportunity,
    employee,
    report
  }) => ({
 
    // viewType: customer.viewType,
    reportsAttendenceDataList:report.reportsAttendenceDataList,
    //userId: auth.userDetails.userId,
  });
  const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
      {
        getReportsAttendenceDataList
      },
      dispatch
    );
  export default connect(mapStateToProps, mapDispatchToProps)(ReportsAttendenceDataList);