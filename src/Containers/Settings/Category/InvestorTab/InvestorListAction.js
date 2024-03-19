import * as types from "./InvestorListActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getInvestorList = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_LIST_REQUEST,
    });
    axios
    .get(`${base_url}/investorCategory/All/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_LIST_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addInvestorData = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_INVESTOR_DATA_REQUEST,
    });
    axios
      .post(`${base_url}/investorCategory`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getInvestorList(orgId));
        {res.data.message?  
          message.success(res.data.message):
          Swal.fire({
            icon: 'success',
            title: 'Investor Type has been added successfully!',

          })
        // message.success("INVESTOR_ has been added successfully!");
        }
        console.log(res);
        dispatch({
          type: types.ADD_INVESTOR_DATA_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_INVESTOR_DATA_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeInvestor = ( investorCategoryId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_INVESTOR_REQUEST,
    });
    axios
      .delete(`${base_url}/investorCategory/${investorCategoryId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Investor has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_INVESTOR_SUCCESS,
          payload:investorCategoryId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_INVESTOR_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateInvestor = ( investorCategoryId,name,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_INVESTOR_REQUEST,
    });
    axios
      .put(
        `${base_url}/investorCategory/${investorCategoryId}`,
        {investorCategoryId, name,editInd:true },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        
        // message.success("INVESTOR has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_INVESTOR_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Investor Type has been updated successfully!',
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_FAILURE,
        });
      });
  };
  
  export const searchCustomerName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/sector/search/${name}`, {
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

  export const ClearReducerDataOfInvestorType = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_INVESTORTYPE,
    });
  };
  export const searchInvestorTypeName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORTYPE_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/investorCategory/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_INVESTORTYPE_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_INVESTORTYPE_SEARCH_FAILURE,
          payload: err,
        });
      });
  };