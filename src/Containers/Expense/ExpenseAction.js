import * as types from "./ExpenseActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";

export const handleExpenseModal = (modalProps) => (dispatch) => {
  dispatch({ type: types.HANDLE_EXPENSE_MODAL, payload: modalProps });
};

/**
 * request for saving the expense
 */

export const addExpense = (expense, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_EXPENSE_REQUEST,
  });
  console.log(expense);

  axios
    .post(`${base_url}/expense`, expense, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_EXPENSE_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EXPENSE_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

/**
 * Fetch an expense voucher by userId
 */

export const getExpenseById = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_EXPENSE_BY_USER_ID_REQUEST,
  });

  axios
    .get(`${base_url}/voucher/expense/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPENSE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPENSE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Fetching an expense voucher by  orgid
 */

export const getExpenseByOrgId = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_EXPENSE_BY_ORGID_REQUEST,
  });

  axios
    .get(`${base_url}/voucher/expense/organization/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPENSE_BY_ORGID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPENSE_BY_ORGID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Fetching an expense list  by  voucherId
 */

export const getExpenseByVoucherId = (voucherId) => (dispatch) => {
  dispatch({
    type: types.GET_EXPENSE_BY_VOUCHER_ID_REQUEST,
  });

  axios
    .get(`${base_url}/expense/voucher/${voucherId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPENSE_BY_VOUCHER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPENSE_BY_VOUCHER_ID_FAILURE,
        payload: err,
      });
    });
};

export const setEditExpense = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EXPENSE_EDIT,
    payload: name,
  });
};

export const handleUpdateExpenseModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EXPENSE_MODAL,
    payload: modalProps,
  });
};

export const updateExpense = (data, expenseId) => (dispatch) => {
  dispatch({ type: types.UPDATE_EXPENSE_REQUEST });
  axios
    .put(`${base_url}/expense`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EXPENSE_FAILURE,
        payload: err,
      });
    });
};

export const deleteExpense = (voucherId) => (dispatch, getState) => {
  console.log("inside deleteExpense", voucherId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_EXPENSE_REQUEST,
  });

  axios
    .delete(`${base_url}/voucher/delete/${voucherId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_EXPENSE_SUCCESS,
        payload: voucherId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EXPENSE_FAILURE,
        payload: err,
      });
    });
};

export const deleteExpenseDrawer = (expenseId) => (dispatch, getState) => {
  console.log("inside deleteExpense", expenseId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_EXPENSE_DRAWER_REQUEST,
  });

  axios
    .delete(`${base_url}/delete/${expenseId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_EXPENSE_DRAWER_SUCCESS,
        payload: expenseId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EXPENSE_DRAWER_FAILURE,
        payload: err,
      });
    });
};


//Document

export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

//add Expense document

export const addExpenseDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_EXPENSE_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/expense/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_EXPENSE_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // dispatch(getCandidateDocument(candidateId));
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EXPENSE_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};
//get customer documnet
export const getExpenseDocument = (expenseId) => (dispatch) => {
  dispatch({ type: types.GET_EXPENSE_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/contact/document/${expenseId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPENSE_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPENSE_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};
export const handleExpenseVoucherIdDrawer = (modalProps) => (dispatch) => {
  dispatch({ type: types.HANDLE_EXPENSE_VOUCHERID_DRAWER, payload: modalProps });
};

export const setExpenseViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_EXPENSE_VIEW_TYPE,
    payload: viewType,
  });
};

export const getPendingExpense = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PENDING_EXPENSE_REQUEST,
  });

  axios
    .get(`${base_url}/api/v1/expense/status/${userId}/${"Pending"}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PENDING_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PENDING_EXPENSE_FAILURE,
        payload: err,
      });
    });
};

export const getApprovedExpense = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_APPROVED_EXPENSE_REQUEST,
  });

  axios
    .get(`${base_url}/api/v1/expense/status/${userId}/${"Approved"}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVED_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVED_EXPENSE_FAILURE,
        payload: err,
      });
    });
};
export const getRejectdExpense = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_REJECTED_EXPENSE_REQUEST,
  });

  axios
    .get(`${base_url}/api/v1/expense/status/${userId}/${"Rejected"}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REJECTED_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REJECTED_EXPENSE_FAILURE,
        payload: err,
      });
    });
};