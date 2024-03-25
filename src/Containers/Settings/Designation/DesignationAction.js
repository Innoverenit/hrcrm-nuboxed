import * as types from "./DesignationActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the DESIGNATIONS
 */
 export const getDesignations = () => (dispatch) => {
    dispatch({
      type: types.GET_DESIGNATIONS_REQUEST,
    });
    axios               
      .get(`${base_url}/designation`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DESIGNATIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DESIGNATIONS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new DESIGNATIONS
 */
export const addDesignations = (designation,orgId, cb) => (dispatch) => {
    console.log(designation);
    dispatch({
      type: types.ADD_DESIGNATIONS_REQUEST,
    });
    axios
      .post(`${base_url}/designation`, designation, {
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
            title: 'Designation added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
     
        dispatch(getDesignationCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_DESIGNATIONS_SUCCESS,
          payload: { ...designation, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DESIGNATIONS_FAILURE,
        });
        cb();
      });
  };



  
/**
 * remove a new DESIGNATIONS
 */
export const removeDesignations = (designationTypeId) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_DESIGNATIONS_REQUEST,
    });
    axios
      .delete(`${base_url}/designation/${designationTypeId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Designation deleted Successfully!',
       
        })
        // message.success("Designation has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_DESIGNATIONS_SUCCESS,
          payload: designationTypeId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_DESIGNATIONS_FAILURE,
        });
      });
  };
  


/**
 *update label of DESIGNATIONS
 */
 export const updateDesignations = (data,designationTypeId, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DESIGNATIONS_REQUEST,
    });
    axios
      .put(
        `${base_url}/designation`,
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
          title: 'Designation updated Successfully!',
       
        })
        // message.success("Designation has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_DESIGNATIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DESIGNATIONS_FAILURE,
        });
      });
  };
  export const searchDesignationName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_DESIGNATION_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/designation/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: res.data.message,
       
        })
        // message.success(res.data.message);
        dispatch({
          type: types.GET_DESIGNATION_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_DESIGNATION_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfDesignation = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_DESIGNATION,
    });
  };

  export const getDesignationCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_DESIGNATION_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/designation/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DESIGNATION_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DESIGNATION_COUNT_FAILURE,
          payload: err,
        });
      });
  };

