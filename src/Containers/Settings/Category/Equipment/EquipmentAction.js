import * as types from "./EquipmentActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getEquipment = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_EQUIPMENT_REQUEST,
    });
    axios
    .get(`${base_url}/equipment/All`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_EQUIPMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_EQUIPMENT_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addEquipment = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_EQUIPMENT_REQUEST,
    });
    axios
      .post(`${base_url}/equipment`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
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
            title: 'Equipment added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        dispatch(getEquipmentCount());
        console.log(res);
        dispatch({
          type: types.ADD_EQUIPMENT_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_EQUIPMENT_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeEquipment = ( equipmentId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_EQUIPMENT_REQUEST,
    });
    axios
      .delete(`${base_url}/equipment/${equipmentId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getEquipmentCount());
        Swal.fire({
          icon: 'success',
          title: 'Equipment deleted Successfully!',
        })
        // message.success("EQUIPMENT has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_EQUIPMENT_SUCCESS,
          payload:equipmentId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_EQUIPMENT_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateEquipment = ( data,equipmentId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_EQUIPMENT_REQUEST,
    });
    axios
      .put(
        `${base_url}/equipment/${equipmentId}`,
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
          title: 'Equipment updated Successfully!',
        })
        // message.success("EQUIPMENT has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_EQUIPMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_EQUIPMENT_FAILURE,
        });
      });
  };
  
  export const searchEquipmentName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_EQUIPMENT_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/equipment/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_EQUIPMENT_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_EQUIPMENT_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfEquipment = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_EQUIPMENT,
    });
  };

  export const getEquipmentCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_EQUIPMENT_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/equipment/count/All`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_EQUIPMENT_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_EQUIPMENT_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  