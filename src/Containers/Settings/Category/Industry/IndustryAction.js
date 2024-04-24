import * as types from "./IndustryActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getIndustry = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_INDUSTRY_REQUEST,
    });
    axios
    .get(`${base_url}/industry/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INDUSTRY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INDUSTRY_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addIndustry = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_INDUSTRY_REQUEST,
    });
    axios
      .post(`${base_url}/industry/save`, sectors, {
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
            title: 'Industry added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        dispatch(getIndustryCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_INDUSTRY_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_INDUSTRY_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeIndustry = ( industryId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_INDUSTRY_REQUEST,
    });
    axios
      .delete(`${base_url}/industry/delete/${industryId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getIndustryCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Industry deleted Successfully!',
        })
        // message.success("INDUSTRY has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_INDUSTRY_SUCCESS,
          payload:industryId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_INDUSTRY_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateIndustry = ( data,industryId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_INDUSTRY_REQUEST,
    });
    axios
      .put(
        `${base_url}/industry/update/${industryId}`,
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
          title: 'Industry updated Successfully!',
        })
        // message.success("INDUSTRY has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_INDUSTRY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INDUSTRY_FAILURE,
        });
      });
  };
  
  export const searchIndustryName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_INDUSTRY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/industry/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_INDUSTRY_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_INDUSTRY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfIndustry = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_INDUSTRY,
    });
  };

  export const getIndustryCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_INDUSTRY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/industry/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INDUSTRY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INDUSTRY_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  