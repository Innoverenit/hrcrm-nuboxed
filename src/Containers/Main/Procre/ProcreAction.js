import * as types from "./ProcreActionTypes";
import axios from "axios";
import { base_url, base_url2 } from "../../../Config/Auth";
import moment from "moment";


/**
 * SET SHIPPER VIEW TYPE
 * TABLE VIEW/CARD VIEW/MAP VIEW
 */
export const setProcreViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_PROCRE_VIEW_TYPE,
    payload: viewType,
  });
};

export const getAllProcure = (orgId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PROCURE_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/all-procure/${orgId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PROCURE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_PROCURE_FAILURE,
        payload: err,
      });
    });
};

