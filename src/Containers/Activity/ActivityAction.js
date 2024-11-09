import * as types from "./ActivityActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,base_url2 } from "../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'
import { uniqueId } from "lodash";




export const addActivityCall = (call,customerId, cb) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.ADD_ACTIVITY_CALL_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/call/save`, call, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Call has been added successfully!");
        ////debugger;
        console.log(res);
        //  dispatch(getCustomerActivityTimeline(customerId));
        dispatch({
          type: types.ADD_ACTIVITY_CALL_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ACTIVITY_CALL_FAILURE,
          payload: err,
        });
        // cb();
      });
  };

  export const handleCallActivityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CALL_ACTIVITY_MODAL,
      payload: modalProps,
    });
  };


  export const addActivityEvent = (event,customerId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_ACTIVITY_EVENT_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/event/save`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Meeting has been added successfully!");
        console.log(res);
        // dispatch(getCustomerActivityTimeline(customerId));
        // dispatch(getEventListRangeByUserId(userId,0));
        dispatch({
          type: types.ADD_ACTIVITY_EVENT_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ACTIVITY_EVENT_FAILURE,
          payload: err,
        });
        // cb();
      });
  };





  export const addActivityTask = (event,customerId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_ACTIVITY_TASK_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/task/create`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Task has been added successfully!");
        console.log(res);
        // dispatch(getCustomerActivityTimeline(customerId));
        dispatch({
          type: types.ADD_ACTIVITY_TASK_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ACTIVITY_TASK_FAILURE,
          payload: err,
        });
        // cb();
      });
  };





  export const getActivityTimeline = (uniqueId,type) => (dispatch) => {
    dispatch({
        type: types.GET_ACTIVITY_TIMELINE_REQUEST,
    });
  
    axios
        .get(`${base_url}/todo/universal/activity/${uniqueId}/${type}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_ACTIVITY_TIMELINE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_ACTIVITY_TIMELINE_FAILURE,
                payload: err,
            });
        });
  };