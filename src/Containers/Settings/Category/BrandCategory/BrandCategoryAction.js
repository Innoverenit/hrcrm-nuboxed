import * as types from "./BrandCategoryActionType";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getBrandCategoryData = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_BRAND_CATEGORY_REQUEST,
    });
    axios
    .get(`${base_url}/shipBy/All/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_BRAND_CATEGORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_BRAND_CATEGORY_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addBrandCategory = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_BRAND_CATEGORY_REQUEST,
    });
    axios
      .post(`${base_url}/shipBy`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getBrandCategoryData(orgId));
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
            title: 'Category added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        dispatch(getBrandCategoryCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_BRAND_CATEGORY_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_BRAND_CATEGORY_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeBrandCategory = ( shipById,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_BRAND_CATEGORY_REQUEST,
    });
    axios
      .delete(`${base_url}/shipBy/${shipById}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getBrandCategoryCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Category deleted Successfully!',
        })
        // message.success("Sector has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_BRAND_CATEGORY_SUCCESS,
          payload:shipById,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_BRAND_CATEGORY_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateBrandCategory = ( data,shipById,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_BRAND_CATEGORY_REQUEST,
    });
    axios
      .put(
        `${base_url}/shipBy/${shipById}`,
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
          title: 'Category updated Successfully!',
        })
        // message.success("BRAND_CATEGORY has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_BRAND_CATEGORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_BRAND_CATEGORY_FAILURE,
        });
      });
  };
  
  export const searchBrandCategoryName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_BRAND_CATEGORY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/shipBy/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_BRAND_CATEGORY_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_BRAND_CATEGORY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfBrandCategory = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_BRAND_CATEGORY,
    });
  };

  export const getBrandCategoryCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_BRAND_CATEGORY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/shipBy/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_BRAND_CATEGORY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_BRAND_CATEGORY_COUNT_FAILURE,
          payload: err,
        });
      });
  };