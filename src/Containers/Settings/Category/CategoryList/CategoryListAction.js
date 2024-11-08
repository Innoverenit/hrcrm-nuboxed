import * as types from "./CategoryListActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getCategory = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CATEGORY_REQUEST,
    });
    axios
    .get(`${base_url}/category/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CATEGORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CATEGORY_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addCategory = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_CATEGORY_REQUEST,
    });
    axios
      .post(`${base_url}/category/save`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        if (res.data.message) {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
         
          Swal.fire({
            icon: 'success',
            title: 'Category added Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        dispatch(getCategoryCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_CATEGORY_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_CATEGORY_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeCategory = ( categoryId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_CATEGORY_REQUEST,
    });
    axios
      .delete(`${base_url}/category/delete/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getCategoryCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Category deleted Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("CATEGORY has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_CATEGORY_SUCCESS,
          payload:categoryId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_CATEGORY_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateCategory = ( data,categoryId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_CATEGORY_REQUEST,
    });
    axios
      .put(
        `${base_url}/category/update/${categoryId}`,
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
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("CATEGORY has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_CATEGORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_CATEGORY_FAILURE,
        });
      });
  };
  
  export const searchCategoryName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_CATEGORY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/category/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_CATEGORY_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_CATEGORY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfCategory = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_CATEGORY,
    });
  };

  export const getCategoryCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CATEGORY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/category/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CATEGORY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CATEGORY_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  