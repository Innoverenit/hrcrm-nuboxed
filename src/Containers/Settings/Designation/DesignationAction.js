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
export const addDesignations = (designation, cb) => (dispatch) => {
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
        {res.data.message?  
          message.success(res.data.message):
          Swal.fire({
            icon: 'success',
            title: 'Designation has been added Successfully',
            showConfirmButton: false,
            // timer: 1500
          })
        //  message.success("Designation has been added successfully!");
        }
        // dispatch(getDesignations());
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
        message.success("Designation has been deleted successfully!");
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
 export const updateDesignations = (designationTypeId, designationType, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DESIGNATIONS_REQUEST,
    });
    axios
      .put(
        `${base_url}/designation`,
        { designationTypeId, designationType,editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Designation has been updated Successfully',
          showConfirmButton: false,
          // timer: 1500
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
        message.success(res.data.message);
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

