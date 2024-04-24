
import * as types from "./QualityActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getQuality = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_QUALITY_REQUEST,
    });
    axios
    .get(`${base_url}/quality/All`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_QUALITY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_QUALITY_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addQuality = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_QUALITY_REQUEST,
    });
    axios
      .post(`${base_url}/quality`, sectors, {
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
            title: 'Quality added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        dispatch(getQualityCount());
        console.log(res);
        dispatch({
          type: types.ADD_QUALITY_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_QUALITY_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeQuality = ( qualityId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_QUALITY_REQUEST,
    });
    axios
      .delete(`${base_url}/quality/${qualityId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getQualityCount());
        Swal.fire({
          icon: 'success',
          title: 'Quality deleted Successfully!',
        })
        // message.success("QUALITY has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_QUALITY_SUCCESS,
          payload:qualityId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_QUALITY_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateQuality = ( data,qualityId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_QUALITY_REQUEST,
    });
    axios
      .put(
        `${base_url}/quality/${qualityId}`,
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
          title: 'Quality updated Successfully!',
        })
        // message.success("QUALITY has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_QUALITY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_QUALITY_FAILURE,
        });
      });
  };
  
  export const searchQualityName = (qualityName) => (dispatch) => {
    dispatch({
      type: types.GET_QUALITY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/quality/search/${qualityName}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_QUALITY_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_QUALITY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfQuality = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_QUALITY,
    });
  };

  export const getQualityCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_QUALITY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/quality/count/All`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_QUALITY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_QUALITY_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  