import * as types from "./ModuleActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const addingModules = (data, orgId) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADDING_MODULE_REQUEST,
    });
    axios
      .put(`${base_url}/category/module/save`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
       // dispatch(getModules(orgId))
        dispatch({
          type: types.ADDING_MODULE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADDING_MODULE_FAILURE,
          payload: err,
        });
      });
  };

  export const getModules = (orgId) => (dispath) => {
    dispath({ type: types.GET_MODULE_REQUEST });
    axios
      .get(`${base_url}/category/module/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispath({
          type: types.GET_MODULE_SUCCESS,
          payload: res.data,
        });
  
      })
      .catch((err) => {
        dispath({
          type: types.GET_MODULE_FAILURE,
          payload: err,
        });
      });
  };

  export const handleStripeModal = (modalProps) => dispatch => {
    dispatch({
        type: types.HANDLE_STRIPE_MODAL,
        payload: modalProps
    })
  }

 


 

  