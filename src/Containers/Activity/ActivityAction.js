import * as types from "./ActivityActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,base_url2 } from "../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'
import { uniqueId } from "lodash";




export const handleActivityNoteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACTIVITY_NOTES_MODAL,
    payload: modalProps,
  });
};


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


  export const handleActivityUpdateModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ACTIVITY_UPDATE_MODAL,
      payload: modalProps,
    });
  };

  export const linkTaskStatus = (taskId,taskStatus ) => (
    dispatch,
    getState
  ) => {
    // debugger;
    dispatch({
      type: types.LINK_TASK_STATUS_REQUEST,
    });
    axios
      .put(`${base_url}/task/universal/activity/completion/${taskId}/${taskStatus}`, 
       {}, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        //  dispatch(getTaskListRangeByUserId(employeeId));
        dispatch({
          type: types.LINK_TASK_STATUS_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_TASK_STATUS_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
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



  export const addeventLocation = (data,uniqueId, type,cb) => (dispatch, getState) => {
    //debugger
    // const { userId } = getState("auth").auth.userDetails;
    // console.log(data);
    dispatch({ type: types.ADD_EVENT_LOCATION_REQUEST });
    axios
      .put(
        `${base_url}/todo/universal/activity/completion/${uniqueId}/${type}`,data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Completed Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        //debugger
  
        //   dispatch(getEventsListByUserId(userId));
        console.log(res);
  
        dispatch({
          type: types.ADD_EVENT_LOCATION_SUCCESS,
          payload: res.data,
        });
        // dispatch({
        //   type: UPDATE_TODOEVENT_SUCCESS,
        //   payload: res.data
        // })
        // dispatch({type:UPDATE_EVENTS_LIST_BY_USER_ID_SUCCESS,
        // payload:res.data})
        cb();
      })
      .catch((err) => {
        //debugger
        console.log(err);
        dispatch({
          type: types.ADD_EVENT_LOCATION_FAILURE,
          payload: err,
        });
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




  export const updateActivityCall = (call,customerId, cb) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.UPDATE_ACTIVITY_CALL_REQUEST,
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
          type: types.UPDATE_ACTIVITY_CALL_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ACTIVITY_CALL_FAILURE,
          payload: err,
        });
        // cb();
      });
  };






  export const updateActivityEvent = (call,customerId, cb) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.UPDATE_ACTIVITY_EVENT_REQUEST,
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
          type: types.UPDATE_ACTIVITY_EVENT_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ACTIVITY_EVENT_FAILURE,
          payload: err,
        });
        // cb();
      });
  };





  
  export const updateActivityTask = (call,customerId, cb) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.UPDATE_ACTIVITY_TASK_REQUEST,
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
          type: types.UPDATE_ACTIVITY_TASK_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ACTIVITY_TASK_FAILURE,
          payload: err,
        });
        // cb();
      });
  };