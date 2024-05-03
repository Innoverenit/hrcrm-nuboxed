import * as types from "./EmailActionTypes";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { handleIntegrationModal, handleEmailModal } from "../VoIP/VoIPAction";

/**
 * get email credentials
 */
export const getEmailCredentials = () => dispatch => {
  dispatch({
    type: types.GET_EMAIL_CREDENTIAL_REQUEST
  });
  axios
    .get(`${base_url}/getEmailCredential`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || ""
      }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: types.GET_EMAIL_CREDENTIAL_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.GET_EMAIL_CREDENTIAL_FAILURE,
        payload: err
      });
    });
};

/**
 * add email credentials
 */
export const addEmailCredentials = (credentials) => dispatch => {
  dispatch({
    type: types.ADD_EMAIL_CREDENTIAL_REQUEST
  });
  axios
    .post(`${base_url}/emailCredentialSave`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || ""
      }
    })
    .then(res => {
      console.log(res);
      dispatch(getEmailCredentials());
      dispatch({
        type: types.ADD_EMAIL_CREDENTIAL_SUCCESS,
        payload: res.data
      });
      dispatch(handleIntegrationModal(false));
      dispatch(handleEmailModal(false));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.ADD_EMAIL_CREDENTIAL_FAILURE,
        payload: err
      });
    });
};

/**
 * get email credentials
 */
export const updateEmailCredentials = (credentials, cb) => dispatch => {
  dispatch({
    type: types.UPDATE_EMAIL_CREDENTIAL_REQUEST
  });
  axios
    .put(`${base_url}/update/emailCredential`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || ""
      }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EMAIL_CREDENTIAL_SUCCESS,
        payload: res.data
      });
    })
  cb && cb()
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EMAIL_CREDENTIAL_FAILURE,
        payload: err
      });
      cb && cb()
    });
};

/**
 * send a email to a contact
 */
export const sendEmail = (email, blank, cb) => dispatch => {
  //debugger
  console.log(email);
  dispatch({
    type: types.SEND_EMAIL_REQUEST
  });
  axios
    .post(`${base_url}/email/send`, email, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        "Content-Type": "multipart/form-data",
        enctype: "multipart/form-data"
      }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: types.SEND_EMAIL_SUCCESS,
        payload: res.data
      });
      cb("success");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.SEND_EMAIL_FAILURE,
        payload: err
      });
      cb("failure");
    });
};
