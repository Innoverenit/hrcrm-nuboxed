import * as types from "./TaskActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getTasks = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_REQUEST,
  });
  axios
    .get(`${base_url}/taskType`, {
     
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FAILURE,
        payload: err,
      });
    });
};

export const addTasks = (task,orgId, cb) => (dispatch) => {
  console.log(task);
  dispatch({
    type: types.ADD_TASK_REQUEST,
  });
  axios
    .post(`${base_url}/taskType`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.message) {
        Swal.fire({
          icon: 'error',
          title: res.data.message,
          showConfirmButton: false,
   timer: 1500,
        });
      } else {
       
        Swal.fire({
          icon: 'success',
          title: 'Task added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch(getTaskCount(orgId));
      console.log(res);
      dispatch({
        type: types.ADD_TASK_SUCCESS,
        payload: { ...task },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TASK_FAILURE,
      });
    });
};

export const updateTasks = (data,taskTypeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_TASK_REQUEST,
  });
  axios
    .put(
      `${base_url}/taskType`,
    data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Task updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("Task has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_FAILURE,
      });
    });
};
export const searchTaskName = (name) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url}/taskType/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data.message);
      dispatch({
        type: types.GET_TASK_SEARCH_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_TASK_SEARCH_FAILURE,
        payload: err,
      });
    });
}; 
export const removeTask = ( taskTypeId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_TASK_REQUEST,
  });
  axios
    .delete(`${base_url}/taskType/${taskTypeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Task deleted Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("Task has been deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_TASK_SUCCESS,
        payload:taskTypeId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_TASK_FAILURE,
      });
    });
};

export const linkTaskWorkflowToggle = ( data,cb) => (dispatch) => {
  dispatch({
    type: types.LINK_TASK_WORKFLOW_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/taskType/activeTaskCheckList`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_TASK_WORKFLOW_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_TASK_WORKFLOW_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const ClearReducerDataOfTask = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_TASK,
  });
};

export const getTaskCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/taskType/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_COUNT_FAILURE,
        payload: err,
      });
    });
};