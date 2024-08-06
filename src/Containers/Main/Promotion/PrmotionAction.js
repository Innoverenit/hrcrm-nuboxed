import * as types from "./PrmotionActionType";
import axios from "axios";
import { message } from "antd";
import Swal from 'sweetalert2';
import { base_url, login_url } from "../../../Config/Auth";

export const handlePromotionsDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_PROMOTIOND_MODAL, payload: modalProps });
  };
  

  export const setPromotionViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_PROMOTION_VIEW_TYPE,
      payload: viewType,
    });
  };

  export const addPromotions = (data) => (dispatch) => {
    dispatch({
      type: types.ADD_PROMOTIONS_REQUEST,
    });
    axios
      .post(`${login_url}/promocode/save`, data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
       // dispatch(getDispatchList(id,0))
        dispatch({
          type: types.ADD_PROMOTIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_PROMOTIONS_FAILURE,
        });
      });
  };
  

  export const getPrmotionData = () => (dispatch) => {
 
    dispatch({
      type: types.GET_PRMOTION_DATA_REQUEST,
    });
    axios
      .get(`${login_url}/promocode/getAll`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PRMOTION_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PRMOTION_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const addingProductToggle = (data,promocodeId,productInd) => (dispatch) => {
    dispatch({
      type: types.ADDING_PRODUCT_TOGGLE_REQUEST,
    });
    axios
      .put(`${login_url}/promocode/updateProductInd/${promocodeId}/${productInd}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
      // dispatch(getPrmotionData)
        dispatch({
          type: types.ADDING_PRODUCT_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADDING_PRODUCT_TOGGLE_FAILURE,
          payload: err,
        });
      });
  };

  export const addingMaterialToggle = (data,promocodeId,materialInd) => (dispatch) => {
    dispatch({
      type: types.ADDING_MATERIAL_TOGGLE_REQUEST,
    });
    axios
      .put(`${login_url}/promocode/updateMaterialInd/${promocodeId}/${materialInd}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
      // dispatch(getPrmotionData)
        dispatch({
          type: types.ADDING_MATERIAL_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADDING_MATERIAL_TOGGLE_FAILURE,
          payload: err,
        });
      });
  };