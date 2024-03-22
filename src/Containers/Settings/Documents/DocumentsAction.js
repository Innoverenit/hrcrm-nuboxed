import * as types from "./DocumentsActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the documents
 */
 export const getDocuments = () => (dispatch) => {
    dispatch({
      type: types.GET_DOCUMENTS_REQUEST,
    });
    axios
      .get(`${base_url}/document`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DOCUMENTS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new document
 */
export const addDocuments = (documents, orgId,cb) => (dispatch) => {
    console.log(documents);
    dispatch({
      type: types.ADD_DOCUMENTS_REQUEST,
    });
    axios
      .post(`${base_url}/document`, documents, {
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
            title: 'Document Type added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        dispatch(getDocumentCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_DOCUMENTS_SUCCESS,
          payload: { 
            ...documents, 
            // leadDocumentId: res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DOCUMENTS_FAILURE,
        });
        cb();
      });
  };



  
/**
 * remove a new document
 */
export const removeDocuments = (documentTypeId) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_DOCUMENTS_REQUEST,
    });
    axios
      .delete(`${base_url}/documentType/${documentTypeId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Document Type deleted Successfully!',
        })
        // message.success("Document  deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_DOCUMENTS_SUCCESS,
          payload: documentTypeId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_DOCUMENTS_FAILURE,
        });
      });
  };
  


/**
 *update label of document
 */
 export const updateDocuments = (documentTypeId, documentTypeName, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DOCUMENTS_REQUEST,
    });
    axios
      .put(
        `${base_url}/document`,
        { documentTypeName,documentTypeId,editInd:"true"
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Document Type updated Successfully!',
        })
        // message.success("Document  updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DOCUMENTS_FAILURE,
        });
      });
  };

  export const searchDocumentsName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_DOCUMENT_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/document/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_DOCUMENT_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_DOCUMENT_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 
  export const linkDocumentToggle = ( data,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_DOCUMENT_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/document/update/document-type`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        // dispatch(getThirdPartyAccess(orgId))
        dispatch({
          type: types.LINK_DOCUMENT_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_DOCUMENT_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const getAllDocumentsType = (processId) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DOCUMENTS_TYPE_REQUEST,
    });
    axios
      .get(`${base_url}/document/get/documentType/${processId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DOCUMENTS_TYPE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_DOCUMENTS_TYPE_FAILURE,
          payload: err,
        });
      });
  };


  export const workflowDocumentToggle = ( data,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_WORKFLOW_DOCUMENT_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/recriutment/process/document/link/mandatory`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        // dispatch(getThirdPartyAccess(orgId))
        dispatch({
          type: types.LINK_WORKFLOW_DOCUMENT_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_WORKFLOW_DOCUMENT_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const linkTypeToggle = ( data,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_TYPE_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/document/update/user-type`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        // dispatch(getThirdPartyAccess(orgId))
        dispatch({
          type: types.LINK_TYPE_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_TYPE_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const ClearReducerDataOfDocument = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_DOCUMENT,
    });
  };


  export const getDocumentCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_DOCUMENT_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/documentType/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DOCUMENT_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DOCUMENT_COUNT_FAILURE,
          payload: err,
        });
      });
  };


 