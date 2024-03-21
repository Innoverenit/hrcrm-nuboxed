import * as types from "./SourceActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getSources = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_SOURCE_REQUEST,
    });
    axios
    .get(`${base_url}/source/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SOURCE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SOURCE_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addSources = (source,orgId, cb) => (dispatch) => {
    console.log(source);
    dispatch({
      type: types.ADD_SOURCE_REQUEST,
    });
    axios
      .post(`${base_url}/source`, source, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getSources(orgId));
        {res.data.message?  
          message.success(res.data.message):
          Swal.fire({
            icon: 'success',
            title: 'Sector added successfully!',
          })
        //  message.success("source has been added successfully!");
        }
        console.log(res);
        dispatch({
          type: types.ADD_SOURCE_SUCCESS,
          payload: { ...source, },
        });
      
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_SOURCE_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeSource = ( sourceId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_SOURCE_REQUEST,
    });
    axios
      .delete(`${base_url}/source/${sourceId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("source has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_SOURCE_SUCCESS,
          payload:sourceId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_SOURCE_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateSource = ( sourceId,name,listType,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_SOURCE_REQUEST,
    });
    axios
      .put(
        `${base_url}/source/${sourceId}`,
        { name,sourceId,listType,editInd:true },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        
        // message.success("Sector has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_SOURCE_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Sector updated successfully!',
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_SOURCE_FAILURE,
        });
      });
  };

  export const searchSourceName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_SOURCE_NAME_REQUEST,
    });
    axios
      .get(`${base_url}/source/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_SOURCE_NAME_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_SOURCE_NAME_FAILURE,
          payload: err,
        });
      });
  };

  export const ClearReducerDataOfSource = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_SOURCE,
    });
  };

  export const getSourceCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_SOURCE_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/source/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SOURCE_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SOURCE_COUNT_FAILURE,
          payload: err,
        });
      });
  };