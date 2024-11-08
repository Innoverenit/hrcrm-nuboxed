import * as types from "./ShipByActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getShipByData = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_SHIPBY_REQUEST,
    });
    axios
    .get(`${base_url}/shipBy/All/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SHIPBY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SHIPBY_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addShipBy = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_SHIPBY_REQUEST,
    });
    axios
      .post(`${base_url}/shipBy`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getShipByData(orgId));
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
            title: 'ShipBy added Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        dispatch(getShipByCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_SHIPBY_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_SHIPBY_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeShipBy = ( shipById,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_SHIPBY_REQUEST,
    });
    axios
      .delete(`${base_url}/shipBy/${shipById}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getShipByCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'ShipBy deleted Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("Sector has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_SHIPBY_SUCCESS,
          payload:shipById,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_SHIPBY_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateShipBy = ( data,shipById,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_SHIPBY_REQUEST,
    });
    axios
      .put(
        `${base_url}/shipBy/${shipById}`,
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
          title: 'ShipBy updated Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("SHIPBY has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_SHIPBY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_SHIPBY_FAILURE,
        });
      });
  };
  
  export const searchShipByName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_SHIPBY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/shipBy/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_SHIPBY_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_SHIPBY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfShipBy = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_SHIPBY,
    });
  };

  export const getShipByCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_SHIPBY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/shipBy/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SHIPBY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SHIPBY_COUNT_FAILURE,
          payload: err,
        });
      });
  };