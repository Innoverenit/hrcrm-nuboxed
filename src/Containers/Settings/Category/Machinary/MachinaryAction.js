import * as types from "./MachinaryActionType";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getMachinary = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_MACHINARY_REQUEST,
    });
    axios
    .get(`${base_url}/machinary/All`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_MACHINARY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_MACHINARY_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addMachinary = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_MACHINARY_REQUEST,
    });
    axios
      .post(`${base_url}/machinary`, sectors, {
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
            title: 'Machinary added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        dispatch(getMachinaryCount());
        console.log(res);
        dispatch({
          type: types.ADD_MACHINARY_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_MACHINARY_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeMachinary = ( machinaryId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_MACHINARY_REQUEST,
    });
    axios
      .delete(`${base_url}/machinary/${machinaryId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getMachinaryCount());
        Swal.fire({
          icon: 'success',
          title: 'Machinary deleted Successfully!',
        })
        // message.success("MACHINARY has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_MACHINARY_SUCCESS,
          payload:machinaryId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_MACHINARY_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateMachinary = ( data,machinaryId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_MACHINARY_REQUEST,
    });
    axios
      .put(
        `${base_url}/machinary/${machinaryId}`,
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
          title: 'Machinary updated Successfully!',
        })
        // message.success("MACHINARY has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_MACHINARY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_MACHINARY_FAILURE,
        });
      });
  };
  
  export const searchMachinaryName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_MACHINARY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/machinary/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_MACHINARY_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_MACHINARY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfMachinary = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_MACHINARY,
    });
  };

  export const getMachinaryCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_MACHINARY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/machinary/count/All`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_MACHINARY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_MACHINARY_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  