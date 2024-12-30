import * as types from "./ReportActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,base_url2,base_url3,login_url } from "../../Config/Auth";
/**
 * set report viewType to me or organization
 */
export const setReportViewType = (viewType) => (dispatch) => {
  console.log(viewType);
  dispatch({
    type: types.SET_REPORT_VIEW_TYPE,
    payload: viewType,
  });
};

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

/**
 * set current Time  report
 */
export const setTimeRangeReport = (startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.SET_TIME_INTERVAL_REPORT,
    payload: {
      startDate: dayjs(startDate).toISOString(),
      endDate: dayjs(endDate).toISOString(),
    },
  });
};

/**
 * set which report type to be displayed eg: report/ account / opportunity
 */
export const setSelectedReportType = (type) => (dispatch) => {
  console.log(type);
  dispatch({
    type: types.SET_SELECTED_REPORT_TYPE,
    payload: type,
  });
};

export const OrganizationReport = (orgId, type, startDate, endDate) => (
  dispatch
) => {
  dispatch({ type: types.GET_MY_VIEW_REPORT_REQUEST });
  axios
    .get(`${base_url}/recruitment/org/reports/${orgId}?type=${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MY_VIEW_REPORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MY_VIEW_REPORT_FAILURE,
        payload: err,
      });
    });
};
export const getSalesReports = (userId, type, startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.GET_SALES_REPORTS_REQUEST,
  });
  axios
    .get(`${base_url}/reports/user/sales/${userId}?endDate=${endDate}&startDate=${startDate}&type=${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SALES_REPORTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SALES_REPORTS_FAILURE,
        payload: err,
      });
    });

};

export const organisationReport = (
  organizationId,
  type,
  startDate,
  endDate
) => (dispatch) => {
  dispatch({ type: types.GET_ORGANISATION_REPORT_REQUEST });
  axios
    .get(
      `${base_url}/reports/organization/${organizationId}?type=${type}&startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORGANISATION_REPORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORGANISATION_REPORT_FAILURE,
        payload: err,
      });
    });
};
export const setSubSelectedReportType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SUB_SELECTED_REPORT_TYPE,
    payload: type,
  });

  export const getAllReportInvestors = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_REPORT_INVESTORS_REQUEST,
    });
    axios               
      .get(`${base_url}/investor/report/all-investor/enterprise/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_REPORT_INVESTORS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_REPORT_INVESTORS_FAILURE,
          payload: err,
        });
      });
  };





  export const getReportProspect = (userId, startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.GET_REPORT_PROSPECT_REQUEST,
    });
    axios
      .get(
        `${base_url}/customer/report/all-customer/self/${userId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.GET_REPORT_PROSPECT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_REPORT_PROSPECT_FAILURE,
          payload: err,
        });
      });
  };

  export const getReportLeads = (userId, startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.GET_REPORT_LEAD_REQUEST,
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
          type: types.GET_REPORT_LEAD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_REPORT_LEAD_FAILURE,
          payload: err,
        });
      });
  };
  export const getReportLeadsOrg = (orgId, startDate, endDate) => (dispatch) => {
    dispatch({
      type: types.GET_REPORT_LEAD_ORG_REQUEST,
    });
    axios
      .get(
        `${base_url}/leads/createded-leads/list/for-org/${orgId}?endDate=${endDate}&startDate=${startDate}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.GET_REPORT_LEAD_ORG_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_REPORT_LEAD_ORG_FAILURE,
          payload: err,
        });
      });
  };

  export const getReportTask = (userId, startDate, endDate,type) => (dispatch) => {
    dispatch({
      type: types.GET_REPORT_TASK_REQUEST,
    });
    axios
      .get(
        `${base_url}/task/report/self/${userId}?endDate=${endDate}&startDate=${startDate}/${type}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        dispatch({
          type: types.GET_REPORT_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_REPORT_TASK_FAILURE,
          payload: err,
        });
      });
  };




  export const getTaskData = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_TASK_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/taskType/drop-down/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TASK_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_TASK_DATA_FAILURE,
          payload: err,
        });
      });
  };




  export const getReportsProductivity = (locationId,monday,sunday) => (dispatch) => {
    dispatch({
      type: types.GET_REPORTS_PRODUCTIVITY_REQUEST,
    });
    axios
      .get(`${base_url2}/production/manufacture/avgTime/date-wise/all-user/${locationId}?endDate=${sunday}&startDate=${monday}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       
        dispatch({
          type: types.GET_REPORTS_PRODUCTIVITY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_REPORTS_PRODUCTIVITY_FAILURE,
          payload: err,
        });
      });
  };





  export const getReportsAttendence = (locationId,monday,sunday) => (dispatch) => {
    dispatch({
      type: types.GET_REPORTS_ATTENDENCE_REQUEST,
    });
    axios
      .get(`${base_url}/attendance/avgTime/date-wise/all-user/${locationId}?endDate=${sunday}&startDate=${monday}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       
        dispatch({
          type: types.GET_REPORTS_ATTENDENCE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_REPORTS_ATTENDENCE_FAILURE,
          payload: err,
        });
      });
  };


  export const addReportsProductivity = (modalProps) => (dispatch) => {
    dispatch({
      type: types.ADD_REPORTS_PRODUCTIVITY_MODAL,
      payload: modalProps,
    });
  };



  
  export const getReportsProductivityData  = (userId,startDate) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/Customers/user/${userId}`;
    // } else {
    //   api_url = `/Customers`;
    // }
    dispatch({
      type: types.GET_REPORTS_PRODUCTIVITY_DATA_REQUEST,
    });
    axios
      .get(`${base_url2}/production/manufacture/Working-status/${userId}?date=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REPORTS_PRODUCTIVITY_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_REPORTS_PRODUCTIVITY_DATA_FAILURE,
          payload: err,
        });
      });
  };



  export const addReportsAttendenceModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.ADD_REPORTS_ATTENDENCE_MODAL,
      payload: modalProps,
    });
  };



  export const getReportsAttendenceDataList  = (userId,startDate) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/Customers/user/${userId}`;
    // } else {
    //   api_url = `/Customers`;
    // }
    dispatch({
      type: types.GET_REPORTS_ATTENDENCE_DATA_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/attendance/date-range/working/all-data/status/${userId}?endDate=${startDate}&startDate=${startDate}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REPORTS_ATTENDENCE_DATA_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_REPORTS_ATTENDENCE_DATA_LIST_FAILURE,
          payload: err,
        });
      });
  };
  