import * as types from "./LeavesActionType";
import axios from "axios";
import { base_url } from "../../Config/Auth";
import { getLeavesByUserId } from "../Auth/AuthAction";
export const handleLeavesModal = (modalProps) => (dispatch) => {
    dispatch({
        type: types.HANDLE_LEAVES_MODAL,
        payload: modalProps,
    });
};

export const addLeaves = (data) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    dispatch({ type: types.ADD_LEAVES_REQUEST });

    axios
        .post(`${base_url}/employee/leave`, data, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch(getLeavesByUserId(userId));
            dispatch(getLeaveListRangeByUserId(userId));
            // dispatch(getLeavesDetails(userId));
            dispatch({
                type: types.ADD_LEAVES_SUCCESS,
                payload: res.data,
            });
            // cb && cb("Success");
        }) 
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.ADD_LEAVES_FAILURE,
            });
            // cb && cb("Failure");
        });
};



export const getLeaveListRangeByUserId = (employeeId, startDate, endDate) => (
    dispatch
) => {
    let api_url = "";
    if (startDate === undefined || endDate === undefined) {
        api_url = `/employee/leaves/${employeeId}`;
    } else {
        api_url = `/employee/leaves/${employeeId}?startDate=${startDate}&endDate=${endDate}`;
    }
    dispatch({
        type: types.GET_LEAVE_LIST_RANGE_BY_USER_ID_REQUEST,
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
                type: types.GET_LEAVE_LIST_RANGE_BY_USER_ID_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_LEAVE_LIST_RANGE_BY_USER_ID_FAILURE,
                payload: err,
            });
        });
};

export const getleaveLeftSideDetails = (employeeId) => (dispatch) => {
    dispatch({
        type: types.GET_LEAVE_LEFT_SIDE_DETAILS_REQUEST,
    });

    axios
        .get(`${base_url}/employee/leave/leave-balance/${employeeId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_LEAVE_LEFT_SIDE_DETAILS_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_LEAVE_LEFT_SIDE_DETAILS_FAILURE,
                payload: err,
            });
        });
};

export const handleUpdateLeaveModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEAVE_MODAL,
      payload: modalProps,
    });
  };

  export const handleStatusLeaveModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_STATUS_LEAVE_MODAL,
      payload: modalProps,
    });
  };
  
  export const setEditLeave = (name) => (dispatch) => {
    dispatch({
      type: types.SET_LEAVE_EDIT,
      payload: name,
    });
  };
  
  export const updateLeaves = (data,) => (dispatch) => {
    dispatch({ type: types.UPDATE_LEAVE_REQUEST });
    axios
      .put(`${base_url}/employee/leave`,data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LEAVE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEAVE_FAILURE,
          payload: err,
        });
      });
  };
  

  
  export const DeleteLeaves = (expensdeId) => (dispatch, getState) => {

    dispatch({
      type: types.DELETE_LEAVES_REQUEST,
    });
  
    axios
      .delete(`${base_url}/leave/${expensdeId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.DELETE_LEAVES_SUCCESS,
          payload: expensdeId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LEAVES_FAILURE,
          payload: err,
        });
      });
  };

  export const setLeavesViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_LEAVES_VIEW_TYPE,
      payload: viewType,
    });
  };

  export const getLeaveStatusByLeaveId = (leaveId) => (dispatch) => {
    dispatch({
        type: types.GET_LEAVE_STATUS_BY_LEAVEID_REQUEST,
    });

    axios
        .get(`${base_url}/task/leave/status/${leaveId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_LEAVE_STATUS_BY_LEAVEID_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_LEAVE_STATUS_BY_LEAVEID_FAILURE,
                payload: err,
            });
        });
};

export const handleLeaveNoteDrawer=(modalProps)=>(dispatch)=>{
dispatch({
  type:types.HANDLE_LEAVE_NOTE_DRAWER,
  payload:modalProps,
})
};

export const addLeaveNote = (data,leaveId) => (dispatch, getState) => {
  dispatch({ type: types.ADD_LEAVE_NOTE_REQUEST });

  axios
      .post(`${base_url}/leave/notes`, data, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
        dispatch(getLeaveNotes(leaveId))
          console.log(res);
          dispatch({
              type: types.ADD_LEAVE_NOTE_SUCCESS,
              payload: res.data,
          });
      }) 
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.ADD_LEAVE_NOTE_FAILURE,
          });
      });
};
export const getLeaveNotes = (leaveId) => (dispatch) => {
  dispatch({
    type: types.GET_LEAVE_NOTES_REQUEST,
  });
  axios
    .get(`${base_url}/leave/note/${leaveId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEAVE_NOTES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LEAVE_NOTES_FAILURE,
        payload: err,
      });
    });
};