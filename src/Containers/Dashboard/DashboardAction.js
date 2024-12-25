import * as types from "./DashboardActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url, base_url2 } from "../../Config/Auth";

export const getSkillsCloud = () => (dispatch) => {
  dispatch({
    type: types.GET_SKILLS_CLOUD_REQUEST,
  });
  axios
    .get(`${base_url}/skill/word/cloud`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SKILLS_CLOUD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SKILLS_CLOUD_FAILURE,
        payload: err,
      });
    });
};

export const handleAddJobDetailtModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_JOB_DETAIL_MODAL,
    payload: modalProps,
  });
};

export const handleOrderAddedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_ADDED_MODAL,
    payload: modalProps,
  });
};

export const setDashboardViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_DASHBOARD_VIEW_TYPE, payload: viewType });

/**
 * set selected time range from time interval report
 */
export const setSelectedTimeIntervalReport = (selectedTime) => (dispatch) => {
  console.log(selectedTime);
  dispatch({
    type: types.CHANGE_SELECTED_TIME_INTERVAL_REPORT,
    payload: selectedTime,
  });
};

export const handleActionDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACTION_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const handleOrderClosedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_CLOSED_MODAL,
    payload: modalProps,
  });
};

export const setTimeRangeReport = (startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.SET_TIME_INTERVAL_REPORT,
    payload: {
      startDate: dayjs(startDate).toISOString(),
      endDate: dayjs(endDate).toISOString(),
    },
  });
};

export const getListByOrderId = () => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/order/all-order`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getDateWiseList =
  (recruiterId, endDate, startDate) => (dispatch) => {
    dispatch({
      type: types.GET_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(
        `${base_url}/recruit/dashbord/record/${recruiterId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.GET_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

export const setSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SELECTED_REPORT_TYPE,
    payload: type,
  });

export const setSubSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SUB_SELECTED_REPORT_TYPE,
    payload: type,
  });

export const getDashboardTable = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_TABLE_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/dashboard/open-recruitment/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_TABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DASHBOARD_TABLE_FAILURE,
        payload: err,
      });
    });
};

export const getRecruiterDashboardList = (recruiterId) => (dispatch) => {
  dispatch({
    type: types.GET_RECRUITER_DASHBOARD_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/dashboard/open/${recruiterId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_DASHBOARD_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECRUITER_DASHBOARD_LIST_FAILURE,
        payload: err,
      });
    });
};
export const getDashboardTable2 = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_TABLE_PROGRESS_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/dashboard/open/org/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_TABLE_PROGRESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DASHBOARD_TABLE_PROGRESS_FAILURE,
        payload: err,
      });
    });
};

export const getDashBoardCommissionTable = (recruiterId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_COMMISSION_TABLE_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/dashboard/open/${recruiterId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_COMMISSION_TABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DASHBOARD_COMMISSION_TABLE_FAILURE,
        payload: err,
      });
    });
};

export const getDashBoardCustomerChart = (organizationId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_CUSTOMER_CHART_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/customer/org/${organizationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_CUSTOMER_CHART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DASHBOARD_CUSTOMER_CHART_FAILURE,
        payload: err,
      });
    });
};

export const getDashBoardClosureRatio =
  (userId, endDate, startDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_CLOSURE_RATIO_REQUEST,
    });
    axios
      .get(
        `${base_url}/attendance/getWorkingHour/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_CLOSURE_RATIO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_CLOSURE_RATIO_FAILURE,
          payload: err,
        });
      });
  };

export const getDashBoardSummaryChart =
  (organizationId, endDate, startDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_SUMMARY_CHART_REQUEST,
    });
    axios
      .get(
        `${base_url}/recruitment/customer/sort/${organizationId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASHBOARD_SUMMARY_CHART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASHBOARD_SUMMARY_CHART_FAILURE,
          payload: err,
        });
      });
  };

export const getTodos = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_TODOS_REQUEST });

  axios
    .get(
      `${base_url}/todo/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_TODOS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TODOS_FAILURE,
        payload: err,
      });
    });
};

export const getTodosCount = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_TODOS_COUNT_REQUEST });

  axios
    .get(
      `${base_url}/todoCount/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_TODOS_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TODOS_COUNT_FAILURE,
        payload: err,
      });
    });
};


export const handleProspectDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROSPECT_DRAWER,
    payload: modalProps,
  });
};

export const getavgHour = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_AVG_HOUR_REQUEST });

  axios
    .get(
      `${base_url}/attendance/getAverageHour/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_AVG_HOUR__SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_AVG_HOUR__FAILURE,
        payload: err,
      });
    });
};

export const getDashboardFunnelRecord = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_FUNNEL_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/dashbord/funel/record/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_FUNNEL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DASHBOARD_FUNNEL_FAILURE,
        payload: err,
      });
    });
};

export const getDashboardIndicatorRecord = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_INDICATOR_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/dashbord/speedo/record/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_INDICATOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DASHBOARD_INDICATOR_FAILURE,
        payload: err,
      });
    });
};

export const getSalesDateWiseList =
  (orgId, endDate, startDate) => (dispatch) => {
    dispatch({
      type: types.GET_SALES_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(
        `${base_url}/recruit/dashbord/record/organisation/${orgId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.GET_SALES_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SALES_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

export const updateTodoCall = (data, callId, type) => (dispatch, getState) => {
  dispatch({ type: types.UPDATE_TODO_CALL_BY_ID_REQUEST });
  axios
    .put(`${base_url}/todo/update/${callId}?type=${type}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_TODO_CALL_BY_ID_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TODO_CALL_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateTodoEvent =
  (data, eventId, type) => (dispatch, getState) => {
    console.log(data);
    dispatch({ type: types.UPDATE_TODO_EVENT_BY_ID_REQUEST });
    axios
      .put(`${base_url}/todo/update/${eventId}?type=${type}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.UPDATE_TODO_EVENT_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        ////debugger
        console.log(err);
        dispatch({
          type: types.UPDATE_TODO_EVENT_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

export const updateTodoTask = (data, taskId, type) => (dispatch, getState) => {
  // const { userId } = getState("auth").auth.userDetails;
  // console.log(data);
  dispatch({ type: types.UPDATE_TODO_TASK_BY_ID_REQUEST });
  axios
    .put(`${base_url}/todo/update/${taskId}?type=${type}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_TODO_TASK_BY_ID_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TODO_TASK_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const getAllSalesDateWiseList =
  (userId, endDate, startDate, type) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_SALES_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(
        `${base_url}/recruit/dashbord/record/${userId}?endDate=${endDate}&startDate=${startDate}&type=${type}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.GET_ALL_SALES_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_SALES_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

export const getAllDateWiseList =
  (recruiterId, endDate, startDate) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DATE_WISE_REPORT_REQUEST,
    });
    axios
      .get(
        `${base_url}/recruit/dashbord/record/${recruiterId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.GET_ALL_DATE_WISE_REPORT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_DATE_WISE_REPORT_FAILURE,
        });
      });
  };

export const getAllDashBoardClosureRatio =
  (userId, endDate, startDate, type) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DASHBOARD_CLOSURE_RATIO_REQUEST,
    });
    axios
      .get(
        `${base_url}/recruitment/user/closer/${userId}?endDate=${endDate}&startDate=${startDate}&type=${type}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DASHBOARD_CLOSURE_RATIO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_DASHBOARD_CLOSURE_RATIO_FAILURE,
          payload: err,
        });
      });
  };

export const getAllDashBoardCustomerChart = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_DASHBOARD_CUSTOMER_CHART_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/customer/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_DASHBOARD_CUSTOMER_CHART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_DASHBOARD_CUSTOMER_CHART_FAILURE,
        payload: err,
      });
    });
};

export const getAllDashboardTable2 = (userId, type) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_ALL_DASHBOARD_TABLE_PROGRESS_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/dashboard/open/${userId}?type=${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_DASHBOARD_TABLE_PROGRESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_DASHBOARD_TABLE_PROGRESS_FAILURE,
        payload: err,
      });
    });
};

export const getThisMonthTaskGantt =
  (userId, endDate, startDate) => (dispath) => {
    dispath({ type: types.GET_THIS_MONTH_TASK_GANTT_REQUEST });
    axios
      .get(
        `${base_url}/task/dateRange/myTask/${userId}?endDate=${endDate}&startDate=${startDate} `,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispath({
          type: types.GET_THIS_MONTH_TASK_GANTT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispath({
          type: types.GET_THIS_MONTH_TASK_GANTT_FAILURE,
          payload: err,
        });
      });
  };

export const getAllDashboardFunnelRecord = (userId, type) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_DASHBOARD_FUNNEL_REQUEST,
  });
  axios
    .get(
      `${base_url}/recruit/dashbord/funnel/user/record/${userId}?type=${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_DASHBOARD_FUNNEL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_DASHBOARD_FUNNEL_FAILURE,
        payload: err,
      });
    });
};

export const addActionNotification = (profileId, data) => (dispatch) => {
  console.log("inside getPastNotifications()");
  dispatch({
    type: types.ADD_ACTION_NOTIFICATIONS_REQUEST,
  });
  axios
    .put(`${base_url}/recruit/approve/action/${profileId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_ACTION_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ACTION_NOTIFICATIONS_FAILURE,
        payload: err,
      });
    });
};

export const getActionNotifications = (userId, type) => (dispatch) => {
  console.log("inside getPastNotifications()");
  dispatch({
    type: types.GET_ACTION_NOTIFICATIONS_REQUEST,
  });
  axios
    .get(`${base_url}/recruit/action/${userId}?type=${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACTION_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACTION_NOTIFICATIONS_FAILURE,
        payload: err,
      });
    });
};

export const getActionSteps = (userId, type) => (dispatch) => {
  console.log("inside getPastNotifications()");
  dispatch({
    type: types.GET_ACTION_STEPS_REQUEST,
  });
  axios
    .get(`${base_url}/action/history/${userId}?type=${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACTION_STEPS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACTION_STEPS_FAILURE,
        payload: err,
      });
    });
};
export const getStageActionNotifications = (orgId) => (dispatch) => {
  console.log("inside getPastNotifications()");
  dispatch({
    type: types.GET_STAGE_ACTION_NOTIFICATIONS_REQUEST,
  });
  axios
    .get(`${base_url}/action/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_STAGE_ACTION_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_STAGE_ACTION_NOTIFICATIONS_FAILURE,
        payload: err,
      });
    });
};

// export const updateRequirementStage = (

//   sourceStageId,
//   destinationStageId,
//   opportunityId,
//   cb
// ) => (dispatch) => {
//   console.log(sourceStageId, destinationStageId, opportunityId);
//   if (destinationStageId === "won") {
//     message.success("stage is won");
//   }
//   if (destinationStageId === "loss") {
//     message.error("stage is loss");
//   }
//   dispatch({
//     type: types.UPDATE_REQUIREMENT_STAGE_REQUEST,
//     payload: {
//       sourceStageId,
//       destinationStageId,
//       opportunityId,
//     },
//   });
//   axios
//     .put(
//       `${base_url}/recriutment/canban/${opportunityId}/${destinationStageId}`,{}, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       }
//     )
//     .then((res) => {
//       console.log(res);
//       // if (res.data.stageName === "Won") {
//       //   message.error("Won");
//       // } else {
//       //   message.error("Loss");
//       // }

//       dispatch({
//         type: types.UPDATE_REQUIREMENT_STAGE_SUCCESS,
//         payload: res.data,
//       });
//       cb && cb(res.data);
//     })
//     .catch((err) => {
//       console.log(err);

//       dispatch({
//         type: types.UPDATE_REQUIREMENT_STAGE_FAILURE,
//         payload: err,
//       });
//       cb && cb("failure");
//     });
// };

export const getDetailsList = (recruitmentId) => (dispatch) => {
  dispatch({
    type: types.GET_DETAILS_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/recriutment/details/dashboard/${recruitmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DETAILS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DETAILS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleBillableCandidateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BILLABLE_CANDIDATE_MODAL,
    payload: modalProps,
  });
};

export const getCandidatesBillableAmount =
  (userId, pageNo, month, year) => (dispatch) => {
    console.log("inside add candidate");
    dispatch({
      type: types.GET_CANDIDATES_BILLABLE_AMOUNT_REQUEST,
    });
    axios
      .get(
        `${base_url}/candidate/billable/${userId}/${pageNo}/${month}/${year}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATES_BILLABLE_AMOUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CANDIDATES_BILLABLE_AMOUNT_FAILURE,
          payload: err,
        });
      });
  };

export const getUpcomingEvents = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_UPCOMING_EVENTS_REQUEST });

  axios
    .get(`${base_url}/todo/upcomingBirthdayAndAniversary`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_UPCOMING_EVENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_UPCOMING_EVENTS_FAILURE,
        payload: err,
      });
    });
};

export const getTasklist = (userId) => (dispatch) => {
  dispatch({ type: types.GET_TASK_PER_REQUEST });

  axios
    .get(`${base_url}/task/count/opentask/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_TASK_PER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_PER_FAILURE,
        payload: err,
      });
    });
};

export const getJumpBulblist = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_BULB_REQUEST });
  axios
    .get(
      `${base_url}/leads/qualified-leads/count/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_JUMPSTART_BULB_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_BULB_FAILURE,
        payload: err,
      });
    });
};
export const getJumpBulblist2 = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_BULB2_REQUEST });
  axios
    .get(
      `${base_url}/leads/createded-leads/count/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_JUMPSTART_BULB2_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_BULB2_FAILURE,
        payload: err,
      });
    });
};
export const getJumpBulblist3 = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_BULB3_REQUEST });
  axios
    .get(
      `${base_url}/leads/junked-leads/count/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_JUMPSTART_BULB3_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_BULB3_FAILURE,
        payload: err,
      });
    });
};

export const getDashUserlist = (orgId) => (dispath) => {
  dispath({ type: types.GET_DASHBOARD_USER_LIST_REQUEST });
  axios
    .get(`${base_url}/employee/active/user/drop-down/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_DASHBOARD_USER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_DASHBOARD_USER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getHotColdWarm = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_HOT_COLD_WARM_REQUEST,
  });
  axios
    .get(
      `${base_url}/leads/type/hot-warm-cold/count/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_HOT_COLD_WARM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_HOT_COLD_WARM_FAILURE,
        payload: err,
      });
    });
};

export const getLeavesGantt = (orgId, endDate, startDate) => (dispath) => {
  dispath({ type: types.GET_LEAVES_GANTT_REQUEST });
  axios
    .get(
      `${base_url}/leaves/employee/leave-list/date-wise/${orgId}?endDate=${endDate}&startDate=${startDate} `,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispath({
        type: types.GET_LEAVES_GANTT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_LEAVES_GANTT_FAILURE,
        payload: err,
      });
    });
};
export const getJumpCustomerlist =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_JUMPSTART_CUSTOMER_LIST_REQUEST });
    axios
      .get(
        `${base_url}/opportunity/added/record/count/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_JUMPSTART_CUSTOMER_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_JUMPSTART_CUSTOMER_LIST_FAILURE,
          payload: err,
        });
      });
  };
export const getJumpCustomerlist2 =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_JUMPSTART_CUSTOMER2_LIST_REQUEST });
    axios
      .get(
        `${base_url}/opportunity/Close/record/count/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_JUMPSTART_CUSTOMER2_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_JUMPSTART_CUSTOMER2_LIST_FAILURE,
          payload: err,
        });
      });
  };
export const getDashCustomerAddedLeads =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASH_CUSTOMER_ADDED_LEADS_REQUEST,
    });
    axios
      .get(
        `${base_url}/leads/added/count/date-wise/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASH_CUSTOMER_ADDED_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASH_CUSTOMER_ADDED_LEADS_FAILURE,
          payload: err,
        });
      });
  };
export const getJumpTasklist = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_TASK_LIST_REQUEST });
  axios
    .get(
      `${base_url}/task/count/highPriority/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_JUMPSTART_TASK_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_TASK_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getDashCustomerAddedContacts =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASH_CUSTOMER_ADDED_CONTACTS_REQUEST,
    });
    axios
      .get(
        `${base_url}/contact/added/count/date-wise/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASH_CUSTOMER_ADDED_CONTACTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);

        dispatch({
          type: types.GET_DASH_CUSTOMER_ADDED_CONTACTS_FAILURE,
          payload: err,
        });
      });
  };
export const getJumpTask2list = (userId, startDate, endDate) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_TASK_2_LIST_REQUEST });
  axios
    .get(
      `${base_url}/task/count/deadlineTask/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_JUMPSTART_TASK_2_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_TASK_2_LIST_FAILURE,
        payload: err,
      });
    });
};
export const getDashboardTasks = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_TASK_REQUEST,
  });
  axios
    .get(`${base_url}/task/type/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DASHBOARD_TASK_FAILURE,
        payload: err,
      });
    });
};

export const getTakskdashboardGantt = (userId) => (dispath) => {
  dispath({ type: types.GET_TASKS_DASHBOARD_GANTT_REQUEST });
  axios
    .get(`${base_url}/task/openTask/list/${userId} `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_TASKS_DASHBOARD_GANTT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_TASKS_DASHBOARD_GANTT_FAILURE,
        payload: err,
      });
    });
};

export const getJumpInvestorlist =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_JUMPSTART_INVESTOR_REQUEST });
    axios
      .get(
        `${base_url}/investorLeads/qualified-investorLeads/count/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_FAILURE,
          payload: err,
        });
      });
  };
export const getJumpInvestor2list =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_JUMPSTART_INVESTOR_2_REQUEST });
    axios
      .get(
        `${base_url}/investorLeads/createded-investorLeads/count/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_2_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_2_FAILURE,
          payload: err,
        });
      });
  };
export const getJumpInvestor3list =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_JUMPSTART_INVESTOR_3_REQUEST });
    axios
      .get(
        `${base_url}/InvestorOpportunity/added/record/count/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_3_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_3_FAILURE,
          payload: err,
        });
      });
  };
export const getJumpInvestor4list =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_JUMPSTART_INVESTOR_4_REQUEST });
    axios
      .get(
        `${base_url}/InvestorOpportunity/Close/record/count/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_4_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_JUMPSTART_INVESTOR_4_FAILURE,
          payload: err,
        });
      });
  };

export const getInvHotColdWarm = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_INVSTR_HOT_COLD_WARM_REQUEST,
  });
  axios
    .get(
      `${base_url}/investorLeads/type/hot-warm-cold/count/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_INVSTR_HOT_COLD_WARM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_INVSTR_HOT_COLD_WARM_FAILURE,
        payload: err,
      });
    });
};

export const getDashInvestorAddedPitch =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASH_INVESTOR_ADDED_PITCH_REQUEST,
    });
    axios
      .get(
        `${base_url}/investorLeads/added/count/date-wise/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASH_INVESTOR_ADDED_PITCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASH_INVESTOR_ADDED_PITCH_FAILURE,
          payload: err,
        });
      });
  };
export const getDashInvestorAddedContactInvest =
  (userId, startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.GET_DASH_INVESTOR_ADDED_CONTACTINVEST_REQUEST,
    });
    axios
      .get(
        `${base_url}/contact/added/investor/count/date-wise/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DASH_INVESTOR_ADDED_CONTACTINVEST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DASH_INVESTOR_ADDED_CONTACTINVEST_FAILURE,
          payload: err,
        });
      });
  };

export const handleLeadQualifiedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_LEAD_QUALIFIED_DRAWER,
    payload: modalProps,
  });
};
export const getLeadQualified = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_LEADS_QUALIFIED_REQUEST,
  });
  axios
    .get(
      `${base_url}/leads/qualified-leads/list/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_LEADS_QUALIFIED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_LEADS_QUALIFIED_FAILURE,
        payload: err,
      });
    });
};

export const handleLeadAddedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_LEAD_ADDED_DRAWER,
    payload: modalProps,
  });
};
export const getLeadAdded = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_LEADS_ADDED_REQUEST,
  });
  axios
    .get(
      `${base_url}/leads/createded-leads/list/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_LEADS_ADDED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_LEADS_ADDED_FAILURE,
        payload: err,
      });
    });
};

export const handleOppoAddedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPPO_ADDED_DRAWER,
    payload: modalProps,
  });
};
export const getOppoAdded = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_OPPO_ADDED_REQUEST,
  });
  axios
    .get(
      `${base_url}/opportunity/added/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_OPPO_ADDED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_OPPO_ADDED_FAILURE,
        payload: err,
      });
    });
};

export const handleOppoClosedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPPO_CLOSED_DRAWER,
    payload: modalProps,
  });
};
export const getOppocLOSED = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_OPPO_CLOSED_REQUEST,
  });
  axios
    .get(
      `${base_url}/opportunity/ClosedList/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_OPPO_CLOSED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_OPPO_CLOSED_FAILURE,
        payload: err,
      });
    });
};

export const handlePitchQualifiedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PITCH_QUALIFIED_DRAWER,
    payload: modalProps,
  });
};
export const getPitchQualified = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_PITCH_QUALIFIED_REQUEST,
  });
  axios
    .get(
      `${base_url}/investorLeads/qualified-investorLeads/list/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_PITCH_QUALIFIED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PITCH_QUALIFIED_FAILURE,
        payload: err,
      });
    });
};

export const handlePitchAddedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PITCH_ADDED_DRAWER,
    payload: modalProps,
  });
};
export const getPitchAdded = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_PITCH_ADDED_REQUEST,
  });
  axios
    .get(
      `${base_url}/investorLeads/createded-investorLeads/list/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_PITCH_ADDED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PITCH_ADDED_FAILURE,
        payload: err,
      });
    });
};

export const handleDealAddedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DEAL_ADDED_DRAWER,
    payload: modalProps,
  });
};

export const getDealAdded = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_DEAL_ADDED_REQUEST,
  });
  axios
    .get(
      `${base_url}/InvestorOpportunity/added/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_DEAL_ADDED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_DEAL_ADDED_FAILURE,
        payload: err,
      });
    });
};

export const handleDealClosedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DEAL_CLOSED_DRAWER,
    payload: modalProps,
  });
};

export const getDealClosed = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_DEAL_CLOSED_REQUEST,
  });
  axios
    .get(
      `${base_url}/InvestorOpportunity/ClosedList/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_DEAL_CLOSED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_DEAL_CLOSED_FAILURE,
        payload: err,
      });
    });
};

export const handleLeadHCWdrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_LEAD_HCW_DRAWER,
    payload: modalProps,
  });
};

export const getLeadHotList = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_LEAD_HOTLIST_REQUEST,
  });
  axios
    .get(
      `${base_url}/leads/hot/list/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_LEAD_HOTLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_LEAD_HOTLIST_FAILURE,
        payload: err,
      });
    });
};

export const getLeadColdList = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_LEAD_COLDLIST_REQUEST,
  });
  axios
    .get(
      `${base_url}/leads/cold/list/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_LEAD_COLDLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_LEAD_COLDLIST_FAILURE,
        payload: err,
      });
    });
};

export const getLeadWarmList = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_LEAD_WARMLIST_REQUEST,
  });
  axios
    .get(
      `${base_url}/leads/warm/list/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_LEAD_WARMLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_LEAD_WARMLIST_FAILURE,
        payload: err,
      });
    });
};

export const handlePitchHCWdrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PITCH_HCW_DRAWER,
    payload: modalProps,
  });
};

export const getPitchHotList = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_PITCH_HOTLIST_REQUEST,
  });
  axios
    .get(
      `${base_url}/investorLeads/type-hot/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_PITCH_HOTLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PITCH_HOTLIST_FAILURE,
        payload: err,
      });
    });
};

export const getPitchColdList = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_PITCH_COLDLIST_REQUEST,
  });
  axios
    .get(
      `${base_url}/investorLeads/type-cold/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_PITCH_COLDLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PITCH_COLDLIST_FAILURE,
        payload: err,
      });
    });
};

export const getPitchWarmList = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_PITCH_WARMLIST_REQUEST,
  });
  axios
    .get(
      `${base_url}/investorLeads/type-warm/date-range/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_PITCH_WARMLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PITCH_WARMLIST_FAILURE,
        payload: err,
      });
    });
};

export const handleTaskNameDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_NAME_DRAWER,
    payload: modalProps,
  });
};
export const getTaskNameDetails = (userId, Typeame,) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_NAME_REQUEST,
  });
  axios
    .get(
      `${base_url}/task/open/type/list/${userId}/${Typeame}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_TASK_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_TASK_NAME_FAILURE,
        payload: err,
      });
    });
};

export const getDashbrdCompletedTasks = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DASHBOARD_COMPLETED_TASK_REQUEST,
  });
  axios
    .get(`${base_url}/task/type/completed/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DASHBOARD_COMPLETED_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DASHBOARD_COMPLETED_TASK_FAILURE,
        payload: err,
      });
    });
};

export const handleCompletedTaskTypeDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_COMPLETED_TASK_TYPE_DRAWER,
    payload: modalProps,
  });
};
export const getCompletedTaskTypeDetails = (userId, name) => (dispatch) => {
  dispatch({
    type: types.GET_COMPLETED_TASK_TYPE_REQUEST,
  });
  axios
    .get(
      `${base_url}/task/type/completed/Lists/${userId}/${name}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_COMPLETED_TASK_TYPE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_COMPLETED_TASK_TYPE_FAILURE,
        payload: err,
      });
    });
};

export const getJumpOrderCount = (type) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_ORDER_COUNT_REQUEST });
  axios
    .get(
      `${base_url2}/order/orderCount/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_JUMPSTART_ORDER_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_ORDER_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getJumpOrderDetail = (type, orderType) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_ORDER_DETAIL_REQUEST });
  axios
    .get(
      `${base_url2}/order/orderCount/${type}/${orderType}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_JUMPSTART_ORDER_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_ORDER_DETAIL_FAILURE,
        payload: err,
      });
    });
};


export const getFinaceOrderDetails = (userId,type,ptype) => (dispatch) => {
  dispatch({ type: types.GET_FINACE_ORDER_DETAIL_REQUEST });
  axios
    .get(
      `${base_url2}/dashboard/repairCount/${userId}/${type}/${ptype}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_FINACE_ORDER_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FINACE_ORDER_DETAIL_FAILURE,
        payload: err,
      });
    });
};

export const getEnterpriseOrderDetails = (type) => (dispatch) => {
  dispatch({ type: types.GET_ENTERPRISE_ORDER_DETAIL_REQUEST });
  axios
    .get(
      `${base_url2}/dashboard/org/orderCount/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_ENTERPRISE_ORDER_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ENTERPRISE_ORDER_DETAIL_FAILURE,
        payload: err,
      });
    });
};

export const getJumpDistributorDetail = (type) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_DISTRIBUTOR_DETAIL_REQUEST });
  axios
    .get(
      `${base_url2}/distributor/count/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_JUMPSTART_DISTRIBUTOR_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_DISTRIBUTOR_DETAIL_FAILURE,
        payload: err,
      });
    });
};

export const getJumpFinanceDetail = (orgId, type,orderType) => (dispatch) => {
  dispatch({ type: types.GET_JUMPSTART_FINANCE_DETAIL_REQUEST });
  axios
    .get(
      `${base_url2}/order/finance/${orgId}/${type}/${orderType}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_JUMPSTART_FINANCE_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JUMPSTART_FINANCE_DETAIL_FAILURE,
        payload: err,
      });
    });
};


export const getProspectsData = (country) => (dispatch) => {
  dispatch({
    type: types.GET_PROSPECT_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/customer/count/${country}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROSPECT_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PROSPECT_DATA_FAILURE,
        payload: err,
      });
    });
};



export const getProspectLifeTime = (country) => (dispatch) => {
  dispatch({
    type: types.GET_PROSPECT_LIFETIME_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/count/${country}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROSPECT_LIFETIME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PROSPECT_LIFETIME_FAILURE,
        payload: err,
      });
    });
};

export const getOpenQuotation = (country) => (dispatch) => {
  dispatch({
    type: types.GET_PROSPECT_QUOTATION_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/open/count/${country}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROSPECT_QUOTATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PROSPECT_QUOTATION_FAILURE,
        payload: err,
      });
    });
};



export const getOpenQuotationThisYear = (country) => (dispatch) => {
  dispatch({
    type: types.GET_OPEN_QUOTATION_YEAR_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/year/count/${country}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPEN_QUOTATION_YEAR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_OPEN_QUOTATION_YEAR_FAILURE,
        payload: err,
      });
    });
};

export const getProspectTableData = (country) => (dispatch) => {
  dispatch({
    type: types.GET_PROSPECT_TABLE_DATA_REQUEST,
  });
  axios
    .get(
      `${base_url}/customer/country/list/${country}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_PROSPECT_TABLE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PROSPECT_TABLE_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getRegionRecords = (year,quarter) => (dispatch) => {
  dispatch({
    type: types.GET_REGION_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/regions/target/dash-board/${year}/${quarter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REGION_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REGION_RECORDS_FAILURE,
        payload: err,
      });
    });
};
export const getMultiOrgRegionRecords = (emailId,year,quarter) => (dispatch) => {
  dispatch({
    type: types.GET_MULTI_ORG_REGION_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/multi-org/dash-board/${emailId}/${year}/${quarter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MULTI_ORG_REGION_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MULTI_ORG_REGION_RECORDS_FAILURE,
        payload: err,
      });
    });
};


export const getDevelopChart = (userId, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_DEVELOP_CHART_REQUEST,
  });
  axios
    .get(
      `${base_url}/task/dev/${userId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_DEVELOP_CHART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_DEVELOP_CHART_FAILURE,
        payload: err,
      });
    });
};



export const getQuotationTableData = (country) => (dispatch) => {
  dispatch({
    type: types.GET_QUOTATION_TABLE_DATA_REQUEST,
  });
  axios
    .get(
      `${base_url}/opportunity/open/list/${country}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_QUOTATION_TABLE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_QUOTATION_TABLE_DATA_FAILURE,
        payload: err,
      });
    });
};





export const getOrderAddedList = (orgId,endDate,startDate) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_ADDED_LIST_REQUEST,
  });
  axios
    .get(
      `${base_url2}/order/all-active-catalogOrders/${orgId}/${startDate}/${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_ORDER_ADDED_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_ORDER_ADDED_LIST_FAILURE,
        payload: err,
      });
    });
};




export const getOrderCancelList = (orgId,endDate,startDate,) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_CANCEL_LIST_REQUEST,
  });
  axios
    .get(
      `${base_url2 }/order/all-delete-catalogOrders/${orgId}/${startDate}/${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_ORDER_CANCEL_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_ORDER_CANCEL_LIST_FAILURE,
        payload: err,
      });
    });
};






export const getCustomerChart = (orgId,type) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_CHART_REQUEST,
  });
  axios
    .get(
      `${base_url2}/distributor/typeWiseData/${orgId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_CUSTOMER_CHART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_CUSTOMER_CHART_FAILURE,
        payload: err,
      });
    });
};




export const getOrderClosedList = (orgId,endDate,startDate,) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_CLOSED_LIST_REQUEST,
  });
  axios
    .get(
      `${base_url2 }/order/completeOrders/${orgId}/${startDate}/${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_ORDER_CLOSED_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_ORDER_CLOSED_LIST_FAILURE,
        payload: err,
      });
    });
};




export const getOrderOpenList = (orgId,endDate,startDate,) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_OPEN_LIST_REQUEST,
  });
  axios
    .get(
      `${base_url2 }/order/completeOrders/${orgId}/${startDate}/${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_ORDER_OPEN_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_ORDER_OPEN_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleCustomerAddedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_ADDED_MODAL,
    payload: modalProps,
  });
};

export const handleContactAddedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_ADDED_MODAL,
    payload: modalProps,
  });
};

export const getCustomerAddedList = (orgId,endDate,startDate,) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_ADDED_LIST_REQUEST,
  });
  axios
    .get(
      `${base_url2 }/distributor/all-distributors/${orgId}/${startDate}/${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_CUSTOMER_ADDED_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_CUSTOMER_ADDED_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getContactAddedList = (orgId,endDate,startDate,) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_ADDED_LIST_REQUEST,
  });
  axios
    .get(
      `${base_url2 }/contactPerson/all-contactPerson/${orgId}/${startDate}/${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_CONTACT_ADDED_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_CONTACT_ADDED_LIST_FAILURE,
        payload: err,
      });
    });
};





export const getRepairDashboardOrderClose = (userId, endDate,startDate,page) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_DASHBOARD_ORDER_CLOSE_REQUEST,
  });
  axios
    .get(`${base_url2}/dashboard/completeOrderList/${userId}/${startDate}/${endDate}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_CLOSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_CLOSE_FAILURE,
        payload: err,
      });
    });
};



export const getRepairDashboardOrderAdded = (userId,endDate,startDate,page) => (dispatch) => {
    dispatch({
    type: types.GET_REPAIR_DASHBOARD_ORDER_ADDED_REQUEST,
  });
  axios
    .get(`${base_url2}/dashboard/allOrderList/${userId}/${startDate}/${endDate}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_ADDED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_ADDED_FAILURE,
        payload: err,
      });
    });
};




export const getRepairDashboardOrderOpen = (userId,endDate,startDate,page) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_DASHBOARD_ORDER_OPEN_REQUEST,
  });
  axios
    .get(`${base_url2}/dashboard/inCompleteOrderList/${userId}/${startDate}/${endDate}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_OPEN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_OPEN_FAILURE,
        payload: err,
      });
    });
};

export const getRepairDashboardOrderCancelled = (userId, endDate,startDate,page) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_DASHBOARD_ORDER_CANCELLED_REQUEST,
  });
  axios
    .get(`${base_url2}/dashboard/allDeletelOrder/${userId}/${startDate}/${endDate}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_CANCELLED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REPAIR_DASHBOARD_ORDER_CANCELLED_FAILURE,
        payload: err,
      });
    });
};

export const getCountbyUserID = (userId,type) => (dispatch) => {
  dispatch({
    type: types.GET_COUNT_BY_USERID_REQUEST,
  });
  axios
    .get(
      `${base_url2}/distributor/distributorCount/${userId}/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_COUNT_BY_USERID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_COUNT_BY_USERID_FAILURE,
        payload: err,
      });
    });
};
export const getDistributorbyUserID = (userId,endDate,startDate,page) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_BY_USERID_REQUEST,
  });
  axios
    .get(
      `${base_url2}/distributor/${userId}/${startDate}/${endDate}/${page}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_DISTRIBUTOR_BY_USERID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_DISTRIBUTOR_BY_USERID_FAILURE,
        payload: err,
      });
    });
};

export const getSourceCountAcc = (userId,type,countryName) => (dispatch) => {
  dispatch({
    type: types.GET_SOURCE_COUNT_ACC_REQUEST,
  });
  axios
    .get(`${base_url}/dashboard/sourceCount/${userId}/${type}/${countryName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SOURCE_COUNT_ACC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SOURCE_COUNT_ACC_FAILURE,
        payload: err,
      });
    });
};
export const getCategoryCountAcc = (userId,type,countryName) => (dispatch) => {
  dispatch({
    type: types.GET_CATEGORY_COUNT_ACC_REQUEST,
  });
  axios
    .get(`${base_url}/dashboard/categoryCount/${userId}/${type}/${countryName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATEGORY_COUNT_ACC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CATEGORY_COUNT_ACC_FAILURE,
        payload: err,
      });
    });
};





export const getQuotationDashboard = (userId) => (dispatch) => {
  dispatch({
      type: types.GET_QUOTATION_DASHBOARD_REQUEST,
  });

  axios
      .get(`${base_url2}/quotation/notConverted/toOrder/user/${userId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_QUOTATION_DASHBOARD_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_QUOTATION_DASHBOARD_FAILURE,
              payload: err,
          });
      });
};



export const getReorderDashboardCount = () => (dispatch) => {
  dispatch({
      type: types.GET_REORDER_DASHBOARD_COUNT_REQUEST,
  });

  axios
      .get(`${base_url2}/po/getReorder/all/count/material`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_REORDER_DASHBOARD_COUNT_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_REORDER_DASHBOARD_COUNT_FAILURE,
              payload: err,
          });
      });
};

export const getQuotationDashboardCount = (userId) => (dispatch) => {
  dispatch({
      type: types.GET_QUOTATION_DASHBOARD_COUNT_REQUEST,
  });

  axios
      .get(`${base_url2}/quotation/notConverted/toOrder/count/user/${userId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_QUOTATION_DASHBOARD_COUNT_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_QUOTATION_DASHBOARD_COUNT_FAILURE,
              payload: err,
          });
      });
};



export const getRepairVolumeChart = (userId,type,dtype) => (dispatch) => {
  dispatch({ type: types.GET_REPAIR_VOLUME_CHART_REQUEST });
  axios
    .get(
      `${base_url2}/dashboard/piecht/${userId}/${type}/${dtype}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch({
        type: types.GET_REPAIR_VOLUME_CHART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REPAIR_VOLUME_CHART_FAILURE,
        payload: err,
      });
    });
};




export const getReorderdata = (userType) => (dispatch) => {
  dispatch({ type: types.GET_REORDER_DATA_REQUEST });

  axios
    .get(`${base_url2}/po/getReorder/all/material/${userType}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_REORDER_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REORDER_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getDealDashboard = (userId) => (dispatch) => {
  dispatch({ type: types.GET_DEAL_DASHBOARD_REQUEST });

  axios
    .get(`${base_url}/investorOpportunity/notWon/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_DEAL_DASHBOARD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEAL_DASHBOARD_FAILURE,
        payload: err,
      });
    });
};

export const getDealDashboardCount = (userId) => (dispatch) => {
  dispatch({ type: types.GET_DEAL_DASHBOARD_COUNT_REQUEST });

  axios
    .get(`${base_url}/investorOpportunity/notWon/count/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_DEAL_DASHBOARD_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEAL_DASHBOARD_COUNT_FAILURE,
        payload: err,
      });
    });
};


export const getOrderDashboard = (userId,orderType) => (dispatch) => {
  dispatch({ type: types.GET_ORDER_DASHBOARD_REQUEST });

  axios
    .get(`${base_url2}/phoneOrder/orderNotCompleted/user/${userId}/${orderType}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_ORDER_DASHBOARD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_DASHBOARD_FAILURE,
        payload: err,
      });
    });
};

export const getOrderDashboardCount = (userId,orderType) => (dispatch) => {
  dispatch({ type: types.GET_ORDER_DASHBOARD_COUNT_REQUEST });

  axios
    .get(`${base_url2}/phoneOrder/orderNotCompleted/user/count/${userId}/${orderType}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_ORDER_DASHBOARD_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_DASHBOARD_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getBestDashboardCount = (locationId) => (dispatch) => {
  dispatch({ type: types.GET_BEST_DASHBOARD_COUNT_REQUEST });

  axios
    .get(`${base_url2}/po/countBestBefore/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_BEST_DASHBOARD_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BEST_DASHBOARD_COUNT_FAILURE,
        payload: err,
      });
    });
};


export const getTaskDashboard = (userId,pageNo) => (dispatch) => {
  dispatch({ type: types.GET_TASK_DASHBOARD_REQUEST });

  axios
    .get(`${base_url}/task/openTask/list/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // console.log(res)
      dispatch({
        type: types.GET_TASK_DASHBOARD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_DASHBOARD_FAILURE,
        payload: err,
      });
    });
};

export const linkTaskStatusDashboard = (taskId,data ) => (
  dispatch,
  getState
) => {
  // debugger;
  dispatch({
    type: types.LINK_TASK_STATUS_DASHBOARD_REQUEST,
  });
  axios
    .put(`${base_url}/task/completionstatus/${taskId}`, 
     { ...data }, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      //  dispatch(getTaskListRangeByUserId(employeeId));
      dispatch({
        type: types.LINK_TASK_STATUS_DASHBOARD_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_TASK_STATUS_DASHBOARD_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};