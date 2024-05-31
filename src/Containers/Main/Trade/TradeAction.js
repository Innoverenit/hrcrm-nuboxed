import * as types from "./TradeActionType";
import { base_url, base_url2 } from "../../../Config/Auth";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import Swal from "sweetalert2";

export const setTradeViewType = (viewType) => (dispatch) =>
    dispatch({ type: types.SET_TRADE_VIEW_TYPE, payload: viewType });

export const inputTradeSearch = (imei) => (dispatch) => {
    dispatch({
      type: types.GET_SEARCH_TRADE_REQUEST,
    });
    axios
      .get(`${base_url2}/phone/search/${imei}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_SEARCH_TRADE_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_SEARCH_TRADE_FAILURE,
          payload: err,
        });
      });
  };
  
  export const ClearReducerDataOfTrade = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_TRADE,
    });
  };
  