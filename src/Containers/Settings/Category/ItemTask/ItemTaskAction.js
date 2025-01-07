import * as types from "./ItemTaskActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getItemTask = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_ITEM_TASK_REQUEST,
    });
    axios
    .get(`${base_url}/itemTask/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ITEM_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ITEM_TASK_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addItemTask = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_ITEM_TASK_REQUEST,
    });
    axios
      .post(`${base_url}/itemTask/save`, sectors, {
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
            title: 'Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        dispatch(getItemTaskCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_ITEM_TASK_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_ITEM_TASK_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeItemTask = ( itemTaskId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_ITEM_TASK_REQUEST,
    });
    axios
      .delete(`${base_url}/C/delete/${itemTaskId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getItemTaskCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Type deleted Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("ITEM_TASK has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_ITEM_TASK_SUCCESS,
          payload:itemTaskId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_ITEM_TASK_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateItemTask = ( data,itemTaskId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_ITEM_TASK_REQUEST,
    });
    axios
      .put(
        `${base_url}/itemTask/update/${itemTaskId}`,
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
          title: 'Type updated Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("ITEM_TASK has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_ITEM_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ITEM_TASK_FAILURE,
        });
      });
  };
  
  export const searchItemTaskName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_ITEM_TASK_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/itemTask/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_ITEM_TASK_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_ITEM_TASK_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfItemTask = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_ITEM_TASK,
    });
  };

  export const getItemTaskCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_ITEM_TASK_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/itemTask/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ITEM_TASK_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ITEM_TASK_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  