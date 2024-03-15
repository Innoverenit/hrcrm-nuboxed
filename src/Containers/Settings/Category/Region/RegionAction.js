import * as types from "./RegionActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd";



export const getRegions = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_REGIONS_REQUEST,
    });
    axios
      .get(`${base_url}/regions/All/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REGIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_REGIONS_FAILURE,
          payload: err,
        });
      });
  };



  export const addRegions = (documents, cb) => (dispatch) => {
    console.log(documents);
    dispatch({
      type: types.ADD_REGIONS_REQUEST,
    });
    axios
      .post(`${base_url}/regions/save`, documents, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
      
        
        // dispatch(getDocuments());
        console.log(res);
        dispatch({
          type: types.ADD_REGIONS_SUCCESS,
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
          type: types.ADD_REGIONS_FAILURE,
        });
        cb();
      });
  };

  export const getDropDownRegions = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_DROPDOWN_REGIONS_REQUEST,
    });
    axios
      .get(`${base_url}/regions/drop-down/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DROPDOWN_REGIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DROPDOWN_REGIONS_FAILURE,
          payload: err,
        });
      });
  };



  export const updateRegions = (data, regionsId, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_REGIONS_REQUEST,
    });
    axios
      .put(
        `${base_url}/regions/update/${regionsId}`,
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
          type: types.UPDATE_REGIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_REGIONS_FAILURE,
        });
      });
  };




  export const removeRegions = (regionsId) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_REGIONS_REQUEST,
    });
    axios
      .delete(`${base_url}/regions/delete/${regionsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        //message.success("Document has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_REGIONS_SUCCESS,
          payload: regionsId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_REGIONS_FAILURE,
        });
      });
  };




  export const searchRegionName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_REGION_SEARCH_REQUEST,
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
          type: types.GET_REGION_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_REGION_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 


  export const getRegionCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_REGION_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/regions/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REGION_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_REGION_COUNT_FAILURE,
          payload: err,
        });
      });
  };