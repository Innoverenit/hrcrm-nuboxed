import * as types from "./CountryActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

  export const getCountry = () => (dispatch) => {
    dispatch({
      type: types.GET_COUNTRY_REQUEST,
    });
    axios
    .get(`${base_url}/countries/list`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_COUNTRY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_COUNTRY_FAILURE,
          payload: err,
        });
      });
  };

  export const linkCountryToggle = ( data,countryId,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_COUNTRY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/mandatory/${countryId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_COUNTRY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_COUNTRY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const linkCountrySalesToggle = ( data,countryId,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_COUNTRY_SALES_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/countries/salesInd/${countryId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_COUNTRY_SALES_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_COUNTRY_SALES_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const allCountryMandatory = (mandatoryInd,cb) => (dispatch) => {

    dispatch({
      type: types.ALL_COUNTRY_MANDATORY_REQUEST,
    });
    axios
    .put(`${base_url}/countries/mandatory/all/${mandatoryInd}`,{}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ALL_COUNTRY_MANDATORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ALL_COUNTRY_MANDATORY_FAILURE,
          payload: err,
        });
      })
  };

  export const searchCountryName = (countryName) => (dispatch) => {
    dispatch({
      type: types.GET_COUNTRY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/countries/search/${countryName}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_COUNTRY_SEARCH_SUCCESS,
          payload: res.data,
        });
  
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_COUNTRY_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfCountry = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_COUNTRY,
    });
  };

  export const getCountryCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_COUNTRY_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/countries/country/count`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_COUNTRY_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_COUNTRY_COUNT_FAILURE,
          payload: err,
        });
      });
  };


