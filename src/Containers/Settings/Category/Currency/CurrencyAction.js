import * as types from "./CurrencyActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

  export const getCurrencyList = () => (dispatch) => {
    dispatch({
      type: types.GET_CURRENCY_LIST_REQUEST,
    });
    axios
    .get(`${base_url}/countries/currency/list`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CURRENCY_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CURRENCY_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const linkCurrencyToggle = ( data,currencyId) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_CURRENCY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/currency/mandatory/${currencyId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_CURRENCY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_CURRENCY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

 

  export const allCurrencyMandatory = (mandatoryInd) => (dispatch) => {

    dispatch({
      type: types.ALL_CURRENCY_MANDATORY_REQUEST,
    });
    axios
    .put(`${base_url}/countries/currency/mandatory/all/${mandatoryInd}`,{}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ALL_CURRENCY_MANDATORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ALL_CURRENCY_MANDATORY_FAILURE,
          payload: err,
        });
      })
  };

  export const searchCurrencyName = (currencyName) => (dispatch) => {
    dispatch({
      type: types.GET_CURRENCY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/countries/currency/search/${currencyName}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_CURRENCY_SEARCH_SUCCESS,
          payload: res.data,
        });
  
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_CURRENCY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfCurrency = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_CURRENCY,
    });
  };


  export const linkSalesCurrencyToggle = ( data,currencyId) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_SALES_CURRENCY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/currency/sale/${currencyId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_SALES_CURRENCY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_SALES_CURRENCY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  
  export const linkInvestorCurrencyToggle = ( data,currencyId) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_INVESTOR_CURRENCY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/currency/investor/${currencyId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_INVESTOR_CURRENCY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_INVESTOR_CURRENCY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const getCurrencyCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CURRENCY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/countries/currency/count`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CURRENCY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CURRENCY_COUNT_FAILURE,
          payload: err,
        });
      });
  };


