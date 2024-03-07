import * as types from "./IdProofActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the DESIGNATIONS
 */
 export const getIdProofs = () => (dispatch) => {
    dispatch({
      type: types.GET_ID_PROOF_REQUEST,
    });
    axios               
      .get(`${base_url}/idProofType/all-list`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ID_PROOF_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ID_PROOF_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new DESIGNATIONS
 */
export const addIdProofs = (idProofs, cb) => (dispatch) => {
    console.log(idProofs);
    dispatch({
      type: types.ADD_ID_PROOF_REQUEST,
    });
    axios
      .post(`${base_url}/idProofType`, idProofs, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        {res.data.message?  
          message.success(res.data.message):
          Swal.fire({
            icon: 'success',
            title: 'Identity has been added Successfully',
            showConfirmButton: false,
            // timer: 1500
          })
        // message.success("Identity has been added successfully!");
        }
        // dispatch(getIdProofs());
        console.log(res);
        dispatch({
          type: types.ADD_ID_PROOF_SUCCESS,
          payload: { ...idProofs, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ID_PROOF_FAILURE,
        });  
        cb();      
      });
  };


 export const updateIdProofs = (IdProofTypeId, IdProofType, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_ID_PROOF_REQUEST,
    });
    axios
      .put(
        `${base_url}/idProofType/update`,
        { IdProofType,IdProofTypeId,editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Identity has been updated Successfully',
          showConfirmButton: false,
          // timer: 1500
        })
        // message.success("Identity has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_ID_PROOF_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ID_PROOF_FAILURE,
        });
      });
  };

  export const searchIdProofName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_IDPROOF_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/idProofType/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_IDPROOF_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_IDPROOF_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const removeIdProof= ( idProofTypeId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_ID_PROOF_REQUEST,
    });
    axios
      .delete(`${base_url}/idProofType/${idProofTypeId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Identity has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_ID_PROOF_SUCCESS,
          payload:idProofTypeId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_ID_PROOF_FAILURE,
        });
      });
  };

  export const ClearReducerDataOfIdproof = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_ID_PROOF,
    });
  };