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