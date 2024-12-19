import * as types from "./CallActionTypes";
import axios from "axios";
import { message } from "antd";
import { base_url } from "../../Config/Auth";

/**
 * handle call modal opening and close
 */
export const handleCallModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CALL_MODAL,
    payload: modalProps,
  });
};

export const handleNoteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_NOTE_MODAL,
    payload: modalProps,
  });
};

export const handleTimeZoneModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TIME_ZONE_MODAL,
    payload: modalProps,
  });
};
/**
 * request for adding a CALL
 */
export const addCall = (call, cb) => (dispatch, getState) => {
  ////debugger;
  console.log("inside addCall");
  const { userId } = getState("auth").auth.userDetails;
  // const { startDate, endDate } = getState("dashboard").dashboard;
  dispatch({
    type: types.ADD_CALL_REQUEST,
  });

  axios
    .post(`${base_url}/call`, call, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Call has been added successfully!");
      ////debugger;
      console.log(res);
      dispatch(getOpportunityRecord(userId));
      // dispatch(getCallsListByUserId(userId));
      dispatch(getCallListRangeByUserId(userId,0));
      dispatch({
        type: types.ADD_CALL_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CALL_FAILURE,
        payload: err,
      });
      // cb();
    });
};

/**
 * update aspecific field using put request
 */
export const updateCall = (employeeId, data, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_CALL_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/call/employee/${employeeId}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // dispatch(getCallsListByUserId(userId));
      console.log(res);
      dispatch({
        type: types.UPDATE_CALL_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CALL_BY_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * request for deleting a CALL
 */
export const deleteCall = (callId, employeeId) => (dispatch, getState) => {
  const { employeeId } = getState("auth").auth.userDetails;
  console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_CALL_REQUEST,
  });

  axios
    .delete(`${base_url}/call/${callId}/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getCallsListByUserId(employeeId));
      dispatch({
        type: types.DELETE_CALL_SUCCESS,
        payload: callId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CALL_FAILURE,
        payload: err,
      });
    });
};
/**
 * get list of calls added by an user on aspecific range of date
 */
export const getCallListRangeByUserId = (employeeId, page,startDate, endDate) => (
  dispatch
) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/call/employee/${employeeId}/${page}`;
  } else {
    api_url = `/call/employee/${employeeId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({
    type: types.GET_CALL_LIST_RANGE_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Connection: 'keep-alive', 
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CALL_LIST_RANGE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CALL_LIST_RANGE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get list of calls added by an user on aspecific range of date
 */
export const getCallListRangeOfAllUsers = (startDate, endDate) => (
  dispatch
) => {
  //////////debugger
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/calls`;
  } else {
    api_url = `/calls?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({
    type: types.GET_CALL_LIST_RANGE_OF_ALL_USERS_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      //////////debugger
      console.log(res);
      dispatch({
        type: types.GET_CALL_LIST_RANGE_OF_ALL_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CALL_LIST_RANGE_OF_ALL_USERS_FAILURE,
        payload: err,
      });
    });
};
/**
 * get notes list by callId
 */
export const getNotesListByCallId = (callId) => (dispatch) => {
  console.log(callId);
  dispatch({
    type: types.GET_NOTES_LIST_BY_CALL_ID_REQUEST,
  });
  axios
    .get(`${base_url}/call/note/${callId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CALL_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CALL_ID_FAILURE,
        payload: err,
      });
    });
};

export const setEditNote = (name) => (dispatch) => {
  dispatch({
    type: types.SET_NOTE_EDIT,
    payload: name,
  });
};

export const getCallListRangeByUserIdForReport = (
  userId,
  startDate,
  endDate
) => (dispatch) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/report/call/${userId}`;
  } else {
    api_url = `/report/call/${userId}?startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({
    type: types.GET_CALL_LIST_RANGE_BY_USER_ID_FOR_REPORT_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CALL_LIST_RANGE_BY_USER_ID_FOR_REPORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CALL_LIST_RANGE_BY_USER_ID_FOR_REPORT_FAILURE,
        payload: err,
      });
    });
};

export const getAllUsersByOrganizationId = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_USER_LIST_BY_ORGANIZATION_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/employee/create/all-employees`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_USER_LIST_BY_ORGANIZATION_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_USER_LIST_BY_ORGANIZATION_ID_FAILURE,
        payload: err,
      });
    });
};
export const handleCallNotesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CALL_NOTES_MODAL,
    payload: modalProps,
  });
};


export const handleCallNotesDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CALL_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};
export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_CALL_NOTES_REQUEST });
  axios
    .post(`${base_url}/call/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_CALL_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CALL_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};

export const getOpportunityRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_RECORD_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/record/today/${userId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_FAILURE,
        payload: err,
      });
    });
};

export const addcallLocation = (completionInd,callId, cb) => (dispatch, getState) => {
  //debugger
  // const { userId } = getState("auth").auth.userDetails;
  // console.log(data);
  dispatch({ type: types.ADD_CALL_LOCATION_REQUEST });
  axios
    .put(
      `${base_url}/call/completion/${completionInd}/${callId}`,{},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      //debugger

      //   dispatch(getEventsListByUserId(userId));
      console.log(res);

      dispatch({
        type: types.ADD_CALL_LOCATION_SUCCESS,
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
        type: types.ADD_CALL_LOCATION_FAILURE,
        payload: err,
      });
    });
};
export const emptyCall = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_CALL_LIST, 
  });
};





