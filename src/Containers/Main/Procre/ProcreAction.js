import * as types from "./ProcreActionTypes";
import axios from "axios";
import { base_url, base_url2 } from "../../../Config/Auth";
import moment from "moment";
import { message } from "antd";
import Swal from "sweetalert2";

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

export const getAllProcure = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PROCURE_REQUEST,
  });
  axios
    .get(
      // `${base_url2}/phoneOrder/all-procure/${orgId}/${pageNo}`,
      `${base_url2}/phoneOrder/procure-order/${orgId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
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
export const emptyProcre = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_PROCURE_LIST,
  });
};

export const getRecords = (orgId, type) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/record/count/all/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const handleProcureOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCURE_ORDER_MODAL,
    payload: modalProps,
  });
};
export const updateProcures = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_PROCURES_REQUEST });
  axios
    .post(`${base_url2}/phoneOrder/link/procure-trade/order`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_PROCURES_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_PROCURES_FAILURE,
        payload: err,
      });
    });
};

export const handleProcureNotesDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRCURE_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const addProcureNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCURE_NOTES_REQUEST });
  axios
    .post(`${base_url2}/notes/save`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_PROCURE_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCURE_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};

export const getNotesListByProcure = (type,id) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_PROCURE_ID_REQUEST,
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
        type: types.GET_NOTES_LIST_BY_PROCURE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_PROCURE_ID_FAILURE,
        payload: err,
      });
    });
};

export const procureToAccept = ( tradeId,data,orgId ) => (dispatch) => {
  dispatch({ type: types.PROCURE_TO_ACCEPTED_REQUEST });

  axios
    .post(`${base_url2}/phoneOrder/link/procure-trade/accept/${tradeId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
     dispatch( getAllProcure(orgId,"0"))
      message.success("Procure Accepted");
      console.log(res);
      dispatch({
        type: types.PROCURE_TO_ACCEPTED_SUCCESS,
       // payload: customerId,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PROCURE_TO_ACCEPTED_FAILURE,
      });
      // cb && cb("failure");
    });
};