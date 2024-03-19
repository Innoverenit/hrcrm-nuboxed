import * as types from "./ExpenseActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getExpenses = () => (dispatch) => {
  dispatch({
    type: types.GET_EXPENSE_REQUEST,
  });
  axios
    .get(`${base_url}/expenseType`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPENSE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPENSE_FAILURE,
        payload: err,
      });
    });
};

export const addExpenses = (expense, cb) => (dispatch) => {
  console.log(expense);
  dispatch({
    type: types.ADD_EXPENSE_REQUEST,
  });
  axios
    .post(`${base_url}/expenseType`, expense, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      {res.data.message?  
        message.success(res.data.message):
        Swal.fire({
          icon: 'success',
          title: 'Expense has been added Successfully',
        })
      // message.success("Expense has been added successfully!");
      }
      // dispatch(getExpenses());
      console.log(res);
      dispatch({
        type: types.ADD_EXPENSE_SUCCESS,
        payload: { ...expense },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EXPENSE_FAILURE,
      });
    });
};

export const updateExpenses = (expenseTypeId, expenseType, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_EXPENSE_REQUEST,
  });
  axios
    .put(
      `${base_url}/expenseType`,
      { expenseType, expenseTypeId ,editInd:"true"},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Expense has been updated Successfully',
      })
      // message.success("Expense has been updated successfully!");
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
      });
    });
};

export const searchExpenseName = (name) => (dispatch) => {
  dispatch({
    type: types.GET_EXPENSE_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url}/expenseType/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data.message);
      dispatch({
        type: types.GET_EXPENSE_SEARCH_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_EXPENSE_SEARCH_FAILURE,
        payload: err,
      });
    });
};
export const removeExpense = ( expenseTypeId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_EXPENSE_REQUEST,
  });
  axios
    .delete(`${base_url}/expenseType/${expenseTypeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Expense has been deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_EXPENSE_SUCCESS,
        payload:expenseTypeId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_EXPENSE_FAILURE,
      });
    });
};

export const ClearReducerDataOfExpense = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_EXPENSE,
  });
};

export const getExpenseCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_EXPENSE_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/expenseType/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPENSE_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPENSE_COUNT_FAILURE,
        payload: err,
      });
    });
};