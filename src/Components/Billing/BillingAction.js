import * as types from "./BillingActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";

export const setBillingViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_BILLING_VIEW_TYPE,
    payload: viewType,
  });
};


export const setSelectedTimeIntervalReport = (selectedTime) => (dispatch) => {
  console.log(selectedTime);
  dispatch({
    type: types.CHANGE_SELECTED_TIME_INTERVAL_REPORT,
    payload: selectedTime,
  });
};


export const getBillingTable = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_BILLING_TABLE_REQUEST,
  });
  axios
    .get(`${base_url}/hour/user/hour-details/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BILLING_TABLE_SUCCESS,
        payload: res.data,
      });
      // }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_BILLING_TABLE_FAILURE,
        payload: err,
      });
    });

};

export const setBillingByDesignation = (departmentType) => (dispatch) =>
  dispatch({ type: types.SET_BILLING_BY_DESIGNATION, payload: departmentType });

export const getDesignationWiseBilling = (userId, endDate, startDate, type) => (dispatch) => {
  dispatch({
    type: types.GET_DESIGNATION_WISE_BILLING_REQUEST,
  });
  axios
    .get(`${base_url}/hour/user/hour-details/${userId}?startDate=${endDate}&endDate=${startDate}&type=${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DESIGNATION_WISE_BILLING_SUCCESS,
        payload: res.data,
      });
      // }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DESIGNATION_WISE_BILLING_FAILURE,
        payload: err,
      });
    });

};