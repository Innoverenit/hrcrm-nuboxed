import * as types from "./OrderActionTypes";
import { base_url, base_url2 } from "../../../Config/Auth";
import axios from "axios";
import moment from "moment";

export const setOrderViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_ORDER_VIEW_TYPE, payload: viewType });

export const handleOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_MODAL,
    payload: modalProps,
  });
};

export const getOrderList = () => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/order/allContactOrderListBy`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorList = () => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/order/allDistributorOrderListBy`,)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getCustomerList = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/contact/orderList/${userId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorOrderList = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_ORDER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/distributor/orderList/${userId}`,)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const DistributorDeliveryDate = (payment) => (dispatch) => {
  dispatch({
    type: types.DISTRIBUTOR_DELIVERY_DATE_REQUEST,
  });
  axios
    .post(`${base_url}/report/today-dateWise-orderList`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DISTRIBUTOR_DELIVERY_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DISTRIBUTOR_DELIVERY_DATE_FAILURE,
        payload: err,
      });
    });
};

export const CustomerDeliveryDate = (payment) => (dispatch) => {
  dispatch({
    type: types.CUSTOMER_DELIVERY_DATE_REQUEST,
  });
  axios
    .post(`${base_url}/report/today-dateWise-orderList`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.CUSTOMER_DELIVERY_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CUSTOMER_DELIVERY_DATE_FAILURE,
        payload: err,
      });
    });
};

export const handleOrderProductModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_PRODUCT_MODAL,
    payload: modalProps,
  });
};

export const SubmitCustomerOrderId = (payment) => (dispatch) => {
  dispatch({
    type: types.SUBMIT_CUSTOMER_ORDER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/order/productSummary`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.SUBMIT_CUSTOMER_ORDER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SUBMIT_CUSTOMER_ORDER_ID_FAILURE,
        payload: err,
      });
    });
};
export const emptyOrders = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_ORDERS_LIST,
  });
};
export const getAllOrderList = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_ORDER_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/allphoneOrders/${orgId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_ORDER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_ORDER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getAllComepleteOrderList = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_COMPLETE_ORDER_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/completeOrders/${orgId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_COMPLETE_ORDER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_COMPLETE_ORDER_LIST_FAILURE,
        payload: err,
      });
    });
};


export const getCompleteOrders = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_COMPLETE_ORDERS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/completePhoneOrders/${userId}/${pageNo} `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMPLETE_ORDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMPLETE_ORDERS_FAILURE,
        payload: err,
      });
    });
};
export const getOrderCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/record/countOfOrder/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ORDER_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getAllOrderCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_ORDER_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/record/count/allOrder`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_ORDER_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_ORDER_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const handleNotesModalInOrder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_NOTES_MODAL_IN_ORDER,
    payload: modalProps,
  });
};

export const handleStatusOfOrder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_STATUS_OF_ORDER_MODAL,
    payload: modalProps,
  });
};
export const handlePaidModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PAID_BUTTON_MODAL,
    payload: modalProps,
  });
};

export const getProductionOrder = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/order/inCompleteOrders/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const getProductionHistoryOrder = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_HISTORY_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/order/completeOrders/${userId}/${pageNo}  `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_HISTORY_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_HISTORY_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const getProductionAllOrder = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_ALL_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/order/ProductionOrders/${orgId}/${pageNo} `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_ALL_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_ALL_ORDER_FAILURE,
        payload: err,
      });
    });
};


export const deleteOrderRepairData = (orderId) => (dispatch, getState) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.DELETE_ORDER_REPAIR_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/phoneOrder/delete/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getShipperByUserId(userId));
      dispatch({
        type: types.DELETE_ORDER_REPAIR_DATA_SUCCESS,
        payload: orderId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_ORDER_REPAIR_DATA_FAILURE,
        payload: err,
      });
    });
};