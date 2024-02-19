import * as types from "./ProductionActionType";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url,base_url2 } from "../../Config/Auth";

export const handleCreateProduction = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CREATE_PRODUCTION_DRAWER,
      payload: modalProps,
    });
  };

  export const setProductionViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_PRODUCTION_VIEW_TYPE, payload: viewType });

  export const createProductionLink = (data,) => (dispatch) => {
    dispatch({ type: types.CREATE_PRODUCTION_LINK_REQUEST });
    axios
      .post(`${base_url2}/production/productionProductLink`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getProducts(0))
        dispatch({
          type: types.CREATE_PRODUCTION_LINK_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_PRODUCTION_LINK_FAILURE,
          payload: err,
        });
      });
  };

  export const getSearchedProduction = (name) => (dispatch) => {
    dispatch({
      type: types.GET_SEARCH_PRODOCTION_REQUEST,
    });
    axios
      .get(`${base_url2}/product/productName/${name}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SEARCH_PRODOCTION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SEARCH_PRODOCTION_FAILURE,
          payload: err,
        });
      });
  };

  export const getProductionsbyLocId = (locationDetailsId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_PRODUCTION_BYLOC_ID_REQUEST,
    });
    axios
      // .get(`${base_url2}/product`,
      .get(`${base_url2}/production/product/${locationDetailsId}/${pageNo}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PRODUCTION_BYLOC_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PRODUCTION_BYLOC_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const moveProduction = () => (dispatch) => {
    dispatch({
      type: types.REMOVE_PRODUCTION_REQUEST,
    });
    axios
      .put(`${base_url2}/production/moveToInventory`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.REMOVE_PRODUCTION_SUCCESS,
          payload: res.data,
        });
        // message.success("Confirmation Successfull");
      })
      .catch((err) => {
        dispatch({
          type: types.REMOVE_PRODUCTION_FAILURE,
          payload: err,
        });
        // message.error("Something went wrong");
      });
  };