import * as types from "./CustomerActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getCustomer = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_REQUEST,
    });
    axios
    .get(`${base_url}/customerType/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CUSTOMER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CUSTOMER_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addCustomer = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_CUSTOMER_REQUEST,
    });
    axios
      .post(`${base_url}/customerType`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getCustomerCount(orgId));
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
            title: 'Type added Successfully!',
            showConfirmButton: false,
   timer: 1500,
          });
        }
        console.log(res);
        dispatch({
          type: types.ADD_CUSTOMER_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_CUSTOMER_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeCustomer = ( customerTypeId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_CUSTOMER_REQUEST,
    });
    axios
      .delete(`${base_url}/customerType/${customerTypeId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getCustomerCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Type deleted Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("CUSTOMER has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_CUSTOMER_SUCCESS,
          payload:customerTypeId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_CUSTOMER_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateCustomer = ( data,customerTypeId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_CUSTOMER_REQUEST,
    });
    axios
      .put(
        `${base_url}/customerType/${customerTypeId}`,
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
          title: 'Type updated Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("CUSTOMER has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_CUSTOMER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_CUSTOMER_FAILURE,
        });
      });
  };
  
  export const searchCustomerName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/customerType/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_CUSTOMER_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_CUSTOMER_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfCustomer = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_CUSTOMER,
    });
  };


  export const getCustomerCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/customerType/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CUSTOMER_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CUSTOMER_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  


  