import { base_url } from "../../Config/Auth";
import * as types from "./DataRoomActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'

export const setDataRoomViewType = (viewType) => (dispatch) =>
    dispatch({ type: types.SET_DATAROOM_VIEW_TYPE, payload: viewType });
  
export const handleDataroomModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DATAROOM_MODAL,
      payload: modalProps,
    });
  };

  export const handleDataroomNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DATAROOM_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const getDataRoom = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_DATAROOM_REQUEST,
    });
    axios
      .get(`${base_url}/data-room/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DATAROOM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DATAROOM_FAILURE,
          payload: err,
        });
      });
  };

  export const getuserList = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_USERLIST_REQUEST,
    });
    axios
      .get(`${base_url}/employee/active/user/drop-down/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_USERLIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_USERLIST_FAILURE,
          payload: err,
        });
      });
  };

  export const addDataroom = (data, cb) => (dispatch) => {
    console.log(data);
    dispatch({ type: types.ADD_DATAROOM_REQUEST });
    axios
      .post(`${base_url}/data-room/save`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_DATAROOM_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DATAROOM_FAILURE,
          payload: err,
        });
      });
  };
