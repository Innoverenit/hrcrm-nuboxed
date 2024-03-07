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
        // dispatch(getItemTask(orgId));
        // {res.data.message?  
        //   message.success(res.data.message):
        Swal.fire({
          icon: 'success',
          title: 'Type has been added Successfully',
          showConfirmButton: false,
          // timer: 1500
        })
        // message.success("ITEM_TASK has been added successfully!");
        // }
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
export const removeItemTask = ( itemTaskId) => (dispatch) => {
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
        message.success("ITEM_TASK has been deleted successfully!");
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
export const updateItemTask = ( itemTaskId,name,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_ITEM_TASK_REQUEST,
    });
    axios
      .put(
        `${base_url}/itemTask/update/${itemTaskId}`,
        { name,itemTaskId,editInd:true },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Type has been updated Successfully',
          showConfirmButton: false,
          // timer: 1500
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

  