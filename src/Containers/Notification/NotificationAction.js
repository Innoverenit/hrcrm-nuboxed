import * as types from "./NotificationActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";
const notificationURL =
  "https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo";
// const notificationURL = 'https://api.myjson.com/bins/qwboy';

export const getPastNotifications = (userId) => dispatch => {
  console.log("inside getPastNotifications()");
  dispatch({
    type: types.GET_PAST_NOTIFICATIONS_REQUEST
  });
  return axios
    .get(`${base_url}/previous/notifications/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || ""
      }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: types.GET_PAST_NOTIFICATIONS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.GET_PAST_NOTIFICATIONS_FAILURE,
        payload: err
      });
    });
};

export const handlenotificationdrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_NOTIFICATION_DRAWER_MODAL,
    payload: modalProps,
  });
};
export const getPresentNotifications = (userId) => dispatch => {
  console.log("inside notification action");
  dispatch({
    type: types.GET_PRESENT_NOTIFICATIONS_REQUEST
  });
  return axios
    .get(`${base_url}/present/notifications/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || ""
      }
    })
    .then(res => {
      console.log(res);
      dispatch({
        type: types.GET_PRESENT_NOTIFICATIONS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.GET_PRESENT_NOTIFICATIONS_FAILURE,
        payload: err
      });
    });
};
export const updateNotifcation = (notificationId, data, cb) => dispatch => {
  console.log(data);
  dispatch({ type: types.UPDATE_NOTIFICATION_BY_ID_REQUEST });
  axios
    .patch(
      `${base_url}/notification/${notificationId}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || ""
        }
      }
    )
    .then(res => {
      console.log(res);
      dispatch({
        type: types.UPDATE_NOTIFICATION_BY_ID_SUCCESS,
        payload: res.data
      });
      cb && cb("success", res.data);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.UPDATE_NOTIFICATION_BY_ID_FAILURE,
        payload: err
      });
      cb && cb("error");
    });
};
export const getFutureNotifications = () => dispatch => {
  dispatch({
    type: types.GET_FUTURE_NOTIFICATIONS_REQUEST
  });
  return axios
    .get(`${notificationURL}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: types.GET_FUTURE_NOTIFICATIONS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.GET_FUTURE_NOTIFICATIONS_FAILURE,
        payload: err
      });
    });
};
