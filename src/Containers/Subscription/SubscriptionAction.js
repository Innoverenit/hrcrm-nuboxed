import * as types from "./SubscriptionActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url,base_url2, login_url,sub_url } from "../../Config/Auth";

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
  export const getNewSubscription = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_NEW_SUBSCRIPTION_REQUEST,
    });
    axios
      .get(`${base_url2}/subscription/getByOrg/${orgId}`, {
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
  
  export const handleSuscrptionModal = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_SUSCRIPTION_MODAL, payload: modalProps });
  };

  export const addSuscrptions = (data,subscriptionId) => (dispatch) => {
    dispatch({
      type: types.ADD_SUSCRIPTIONS_REQUEST,
    });
    axios
      .put(`${sub_url}/subscription/create`, data,
        {
          // headers: {
          //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          // },
        }
      )
      .then((res) => {
        console.log(res);
       // dispatch(getDispatchList(id,0))
        dispatch({
          type: types.ADD_SUSCRIPTIONS_SUCCESS,
          payload: subscriptionId,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_SUSCRIPTIONS_FAILURE,
        });
      });
  };


  export const getSubscrptions = (orgId) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/Customers/user/${userId}`;
    // } else {
    //   api_url = `/Customers`;
    // }
    dispatch({
      type: types.GET_SUBSCRIPTIONS_REQUEST,
    });
    axios
      .get(`${sub_url}/subscription/getByOrg/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SUBSCRIPTIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_SUBSCRIPTIONS_FAILURE,
          payload: err,
        });
      });
  };