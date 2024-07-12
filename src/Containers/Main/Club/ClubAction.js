import * as types from "./ClubActionType";
import { base_url, base_url2 } from "../../../Config/Auth";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import Swal from "sweetalert2";

export const setClubViewType = (viewType) => (dispatch) =>
    dispatch({ type: types.SET_CLUB_VIEW_TYPE, payload: viewType });

export const getClubAlllist = (userId,pageNo,clubType) => (dispatch) => {
 
    dispatch({
      type: types.GET_CLUB_ALLLIST_REQUEST,
    });
    axios
      .get(`${base_url}/investor/club/${userId}/${pageNo}/${clubType}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CLUB_ALLLIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CLUB_ALLLIST_FAILURE,
          payload: err,
        });
      });
  };
