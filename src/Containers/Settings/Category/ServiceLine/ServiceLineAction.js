import * as types from "./ServiceLineActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd";



export const getServiceLine = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_SERVICELINE_REQUEST,
    });
    axios
      .get(`${base_url}/serviceLine/All/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SERVICELINE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SERVICELINE_FAILURE,
          payload: err,
        });
      });
  };



  export const addServiceLine = (documents,orgId, cb) => (dispatch) => {
    console.log(documents);
    dispatch({
      type: types.ADD_SERVICELINE_REQUEST,
    });
    axios
      .post(`${base_url}/serviceLine`, documents, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
      
        
        dispatch(getServiceLineCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_SERVICELINE_SUCCESS,
          payload: res.data
         
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_SERVICELINE_FAILURE,
        });
        cb();
      });
  };




  export const updateServiceLine = (data, serviceLineId, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_SERVICELINK_REQUEST,
    });
    axios
      .put(
        `${base_url}/serviceLine/${serviceLineId}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
      
        // message.success("Document has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_SERVICELINK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_SERVICELINK_FAILURE,
        });
      });
  };




  export const removeServiceLine = (serviceLineId) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_SERVICELINE_REQUEST,
    });
    axios
      .delete(`${base_url}/serviceLine/${serviceLineId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        //message.success("Document has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_SERVICELINE_SUCCESS,
          payload: serviceLineId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_SERVICELINE_FAILURE,
        });
      });
  };





  export const getServiceLineCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_SERVICE_LINE_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/serviceLine/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SERVICE_LINE_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SERVICE_LINE_COUNT_FAILURE,
          payload: err,
        });
      });
  };




  export const updateDepartmentService = (departmentId, liveInd, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DEPARTMENT_SERVICE_REQUEST,
    });
    axios
      .put(
        `${base_url}/serviceLine/department/update/${departmentId}/${liveInd}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
      
        // message.success("Document has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_DEPARTMENT_SERVICE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DEPARTMENT_SERVICE_FAILURE,
        });
      });
  };



  export const searchServiceName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_SERVICE_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/regions/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_SERVICE_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_SERVICE_SEARCH_FAILURE,
          payload: err,
        });
      });
  };