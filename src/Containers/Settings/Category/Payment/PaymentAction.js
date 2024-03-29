import * as types from "./PaymentActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getPayments = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_PAYMENT_REQUEST,
    });
    axios
    .get(`${base_url}/paymentCategory/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PAYMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PAYMENT_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addPayment = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_PAYMENT_REQUEST,
    });
    axios
      .post(`${base_url}/paymentCategory/save`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getPayments(orgId));
        // {res.data.message?  
        //   message.success(res.data.message):
        message.success("PAYMENT has been added successfully!");
        // }
        console.log(res);
        dispatch({
          type: types.ADD_PAYMENT_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_PAYMENT_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removePayment = ( paymentCatagoryId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_PAYMENT_REQUEST,
    });
    axios
      .delete(`${base_url}/paymentCategory/delete/${paymentCatagoryId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("PAYMENT has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_PAYMENT_SUCCESS,
          payload:paymentCatagoryId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_PAYMENT_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updatePayment = ( paymentCatagoryId,name,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_PAYMENT_REQUEST,
    });
    axios
      .put(
        `${base_url}/paymentCategory/update/${paymentCatagoryId}`,
        { name,paymentCatagoryId,editInd:true },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        
        message.success("PAYMENT has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_PAYMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_PAYMENT_FAILURE,
        });
      });
  };
  
  export const searchPaymentName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_PAYMENT_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/paymentCategory/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_PAYMENT_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_PAYMENT_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfPayment = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_PAYMENT,
    });
  };

  