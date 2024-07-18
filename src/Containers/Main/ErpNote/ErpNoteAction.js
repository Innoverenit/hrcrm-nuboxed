import * as types from "./ErpNoteActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,base_url2 } from "../../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'



export const getNotesListByNotes = (type,id) => (dispatch) => {
    dispatch({
      type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_REQUEST,
    });
    axios
      .get(`${base_url2}/notes/get/all/${type}/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_FAILURE,
          payload: err,
        });
      });
  };


  export const addNote = (note, cb) => (dispatch) => {
    dispatch({ type: types.ADD_CUSTOMER_NOTES_REQUEST });
    axios
      .post(`${base_url2}/notes/save`, note, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_CUSTOMER_NOTES_SUCCESS,
          payload: res.note,
        });
        console.log(res);
        cb && cb();
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_CUSTOMER_NOTES_FAILURE,
          payload: err,
        });
        console.log(err);
        cb && cb();
      });
  };