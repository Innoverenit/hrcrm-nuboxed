import * as types from "./LOBActionType";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getLob = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOB_REQUEST,
    });
    axios
    .get(`${base_url}/lob/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LOB_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LOB_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addLob = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_LOB_REQUEST,
    });
    axios
      .post(`${base_url}/lob/save`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getLobCount(orgId));
        if (res.data.message) {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
            // showConfirmButton: false,
            // timer: 1500
          });
        } else {
         
          Swal.fire({
            icon: 'success',
            title: 'LOB added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        // message.success("LOB has been added successfully!");
        // }
        console.log(res);
        dispatch({
          type: types.ADD_LOB_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_LOB_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeLob = ( lobDetailsId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_LOB_REQUEST,
    });
    axios
      .delete(`${base_url}/lob/delete/${lobDetailsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getLobCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'LOB deleted Successfully!',
        })
        // message.success("LOB has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_LOB_SUCCESS,
          payload:lobDetailsId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_LOB_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateLob = (data, lobDetailsId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_LOB_REQUEST,
    });
    axios
      .put(
        `${base_url}/lob/update/${lobDetailsId}`,
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
          title: 'LOB updated Successfully!',
        })
        // message.success("LOB has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_LOB_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LOB_FAILURE,
        });
      });
  };
  
  export const searchLobName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_LOB_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/lob/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_LOB_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_LOB_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfLob = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_LOB,
    });
  };

  export const getLobCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOB_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/lob/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LOB_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LOB_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  