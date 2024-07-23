import * as types from "./SubscriptionActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url,base_url2 } from "../../Config/Auth";

export const handleCreateSubscriptionDrawer = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CREATE_SUBSCRIPTION_DRAWER,
      payload: modalProps,
    });
  };

  export const updateSuscription = (data,orgId) => (dispatch) => {
    dispatch({ type: types.UPDATE_SUSCRIPTION_REQUEST });
    axios
      .put(`${base_url}/organization/subscription`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getSuscrption(orgId))
        console.log(res);
        dispatch({
          type: types.UPDATE_SUSCRIPTION_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Info Updated Succefully',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_SUSCRIPTION_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Cannot downgrade before the current subscription period',
          showConfirmButton: false,
          timer: 1500,
        })
      });
  };

  export const getSuscrption = (orgId) => (dispatch) => {
    dispatch({ type: types.GET_SUSCRIPTION_REQUEST });
    axios
      .get(`${base_url}/organization/subscription/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SUSCRIPTION_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SUSCRIPTION_FAILURE,
          payload: err,
        });
      });
  };

  export const addNewSubscription = (subs) => (dispatch) => {
    dispatch({
      type: types.ADD_NEW_SUBSCRIPTION_REQUEST,
    });
    axios
      .post(`${base_url}/subscription`, subs,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_NEW_SUBSCRIPTION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_NEW_SUBSCRIPTION_FAILURE,
          payload: err,
        });
      });
  };
  export const getNewSubscription = () => (dispatch) => {
    dispatch({
      type: types.GET_NEW_SUBSCRIPTION_REQUEST,
    });
    axios
      .get(`${base_url}/subscription`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_NEW_SUBSCRIPTION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NEW_SUBSCRIPTION_FAILURE,
          payload: err,
        });
      });
  };
  