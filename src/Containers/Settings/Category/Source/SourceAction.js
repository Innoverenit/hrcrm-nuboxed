import * as types from "./SourceActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

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
        dispatch(getSourceCount(orgId));
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
            title: 'Source added Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
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
export const removeSource = ( sourceId,orgId) => (dispatch) => {
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
        dispatch(getSourceCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Source deleted successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        // message.success("source has been deleted successfully!");
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
export const updateSource = (data, sourceId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_SOURCE_REQUEST,
    });
    axios
      .put(
        `${base_url}/source/${sourceId}`,
    data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        
        // message.success(" has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_SOURCE_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Source updated successfully!',
          showConfirmButton: false,
          timer: 1500
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