
import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Tooltip, Input, Popconfirm, Space, Button, Badge } from "antd";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import OnlyWrapCard from "../../../../Components/UI/Layout/OnlyWrapCard"
import moment from "moment";

import InfiniteScroll from "react-infinite-scroll-component";

import PaidIcon from '@mui/icons-material/Paid';
// import {getOrderCancelList} from "../../DashboardAction"
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { dashboardReducer } from "../../DashboardReducer";
import { MultiAvatar2 } from "../../../../Components/UI/Elements";
import NodataFoundPage from "../../../../Helpers/ErrorBoundary/NodataFoundPage";


function OrderClosedList(props) {
 
//   useEffect(() => {
//     props.getAllOrderList(props.orgId, page);
//     setPage(page + 1);
//   }, []);
// useEffect(()=>{
//     if (props.timeRangeType === "today") {
//     props.getOrderCancelList(props.orgId,props.startDate,props.endDate)
//     }else {
//         props.getOrderCancelList(props.orgId,props.startDate,props.endDate)
//       }
//    }, [props.orgId,props.startDate,props.endDate]);




  return (
    <>
   
   <h1>Hello</h1>
    </>
  );

}

const mapStateToProps = ({ order, auth,dashboard, distributor }) => ({
//   allCompleteOrder: order.allCompleteOrder,
//   addPaidButtonModal: order.addPaidButtonModal,
// orderCancelList:dashboard.orderCancelList,
// fetchingOrderCancelList:dashboard.fetchingOrderCancelList,
//   addStatusOfOrder: order.addStatusOfOrder,
//   addNotesInOrder: order.addNotesInOrder,
//   fetchingAllOrderList: order.fetchingAllOrderList,
//   userId: auth.userDetails.userId,
//   addOrderDetailsModal: distributor.addOrderDetailsModal,
// orgId: auth.userDetails.organizationId,
// timeRangeType:dashboard.timeRangeType,
// startDate: dashboard.startDate,
// endDate: dashboard.endDate,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
        // getOrderCancelList
    //   getAllOrderList,
    //   handleNotesModalInOrder,
    //   handleStatusOfOrder,
    //   handlePaidModal,
    //   emptyOrders,
    //   handleOrderDetailsModal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderClosedList);
