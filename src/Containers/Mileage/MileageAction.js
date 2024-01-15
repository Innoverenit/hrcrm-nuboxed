import * as types from "./MileageActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";

export const handleMileageModal = (modalProps) => (dispatch) => {
  dispatch({ type: types.HANDLE_MILEAGE_MODAL, payload: modalProps });
};

/**
 * Adding Mileage
 */

export const addMileage = (mileage, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_MILEAGE_REQUEST,
  });

  axios
    .post(`${base_url}/mileage`, mileage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_MILEAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MILEAGE_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

/**Fetch an mileage voucher by userId
 */
export const getMileageByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_MILEAGE_BY_USER_ID_REQUEST,
  });

  axios
    .get(`${base_url}/voucher/mileage/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MILEAGE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MILEAGE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
export const getMileageByVoucherId = (voucherId) => (dispatch) => {
  dispatch({
    type: types.GET_MILEAGE_BY_VOUCHER_ID_REQUEST,
  });

  axios
    .get(`${base_url}/mileage/voucher/${voucherId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MILEAGE_BY_VOUCHER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MILEAGE_BY_VOUCHER_ID_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateMileageModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_MILEAGE_MODAL,
    payload: modalProps,
  });
};

export const setEditMileage = (name) => (dispatch) => {
  dispatch({
    type: types.SET_MILEAGE_EDIT,
    payload: name,
  });
};

export const updateMileage = (data, expenseId) => (dispatch) => {
  dispatch({ type: types.UPDATE_MILEAGE_REQUEST });
  axios
    .put(`${base_url}/mileage`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_MILEAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_MILEAGE_FAILURE,
        payload: err,
      });
    });
};
export const deleteMileage = (mileageId) => (dispatch) => {
  dispatch({
    type: types.DELETE_MILEAGE_REQUEST,
  });

  axios
    .delete(`${base_url}/mileage/delete/${mileageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_MILEAGE_SUCCESS,
        payload: mileageId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_MILEAGE_FAILURE,
        payload: err,
      });
    });
};
export const deleteMileageVoucher = (voucherId) => (dispatch) => {
  dispatch({
    type: types.DELETE_MILEAGE_VOUCHER_REQUEST,
  });

  axios
    .delete(`${base_url}/mileage/voucher/delete/${voucherId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_MILEAGE_VOUCHER_SUCCESS,
        payload: voucherId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_MILEAGE_VOUCHER_FAILURE,
        payload: err,
      });
    });
};
export const handleMileageVoucherIdDrwer = (modalProps) => (dispatch) => {
  dispatch({ type: types.HANDLE_MILEAGE_VOUCHERID_DRAWER, payload: modalProps });
};
export const setMileageViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_MILEAGE_VIEW_TYPE,
    payload: viewType,
  });
};

export const getPendingMileage = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PENDING_MILEAGE_REQUEST,
  });

  axios
    .get(`${base_url}/api/v1/mileage/status/${userId}/${"Pending"}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PENDING_MILEAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PENDING_MILEAGE_FAILURE,
        payload: err,
      });
    });
};

export const getApprovedMileage = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_APPROVED_MILEAGE_REQUEST,
  });

  axios
    .get(`${base_url}/api/v1/mileage/status/${userId}/${"Approved"}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVED_MILEAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVED_MILEAGE_FAILURE,
        payload: err,
      });
    });
};
export const getRejectdMileage = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_REJECTED_MILEAGE_REQUEST,
  });

  axios
    .get(`${base_url}/api/v1/mileage/status/${userId}/${"Rejected"}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REJECTED_MILEAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REJECTED_MILEAGE_FAILURE,
        payload: err,
      });
    });
};

export const handleStatusMileageModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_STATUS_MILEAGE_MODAL,
    payload: modalProps,
  });
};

export const getMileageStatusByMileageId = (voucherId) => (dispatch) => {
  dispatch({
      type: types.GET_MILEAGE_STATUS_BY_MILEAGEID_REQUEST,
  });

  axios
      .get(`${base_url}/task/mileage/status/${voucherId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_MILEAGE_STATUS_BY_MILEAGEID_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_MILEAGE_STATUS_BY_MILEAGEID_FAILURE,
              payload: err,
          });
      });
};
export const handleMileageNoteDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_MILEAGE_NOTE_DRAWER,
    payload: modalProps,
  });
};
export const addMileageNote = (data,cb) => (dispatch) => {
  dispatch({ type: types.ADD_MILEAGE_NOTE_REQUEST });

  axios
      .post(`${base_url}/api/v1/mileage/notes`, data, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.ADD_MILEAGE_NOTE_SUCCESS,
              payload: res.data,
          });
          cb && cb();
      }) 
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.ADD_MILEAGE_NOTE_FAILURE,
          });
          cb && cb();
      });
};
export const getMileageNotes = (mileageId) => (dispatch) => {
  dispatch({
    type: types.GET_MILEAGE_NOTE_REQUEST,
  });
  axios
    .get(`${base_url}/api/v1/mileage/note/${mileageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
    })
    .then((res) => {
  
      console.log(res);
      dispatch({
        type: types.GET_MILEAGE_NOTE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MILEAGE_NOTE_FAILURE,
        payload: err,
      });
    });
};