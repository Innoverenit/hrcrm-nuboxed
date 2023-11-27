import * as types from "./AccountActionType";
import axios from "axios";
import { base_url2, base_url } from "../../../Config/Auth";
import { message } from "antd";

/**
 * handle Distributor modal action
 */
export const handleDistributorModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_MODAL,
    payload: modalProps,
  });
};

/**
 * SET DISTRIBUTOR VIEW TYPE
 * TABLE VIEW/CARD VIEW/MAP VIEW
 */
export const setDistributorViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_DISTRIBUTOR_VIEW_TYPE,
    payload: viewType,
  });
};

/**
 * request for adding a distributor
 */
export const addDistributor = (distributor, userId) => (dispatch) => {
  dispatch({
    type: types.ADD_DISTRIBUTOR_REQUEST,
  });
  axios
    .post(`${base_url2}/distributor`, distributor,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch(getOpportunityRecord(userId));
      dispatch(getDistributorsByUserId(userId));
      dispatch(getAccountRecords())
      dispatch({
        type: types.ADD_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};
/**
 * get all the distributor of the user
 */
export const getDistributorsByUserId = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTORS_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/user/${userId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTORS_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTORS_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get distributor details by distributorId
 */
export const getDistributorByDistributorId = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_BY_DISTRIBUTOR_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/${distributorId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_BY_DISTRIBUTOR_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * handle order modal
 */
export const handleLinkDistributorQuoteConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_QUOTE_CONFIGURE_MODAL,
    payload: modalProps,
  });
};
export const handleLinkDistributorOrderConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_ORDER_CONFIGURE_MODAL,
    payload: modalProps,
  });
};
/**
 *  link order by distributor id
 */

export const linkOrderByDistributorId = (data, distributorId) => (dispatch) => {
  dispatch({ type: types.LINK_ORDER_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    .post(`${base_url2}/distributor/product`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(fetchingNewDistributorOrder(distributorId));
      dispatch(getChoosenCurrencyId(distributorId))
      dispatch({
        type: types.LINK_ORDER_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ORDER_BY_DISTRIBUTOR_ID_FAILURE,
      });
    });
};

export const setClearbitOrderData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_ORDER_DATA,
    payload: data,
  });
};

// get product

export const fetchingNewDistributorOrder = (distributorId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_NEW_DISTRIBUTOR_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/product/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_NEW_DISTRIBUTOR_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_NEW_DISTRIBUTOR_ORDER_FAILURE,
        payload: err,
      });
    });
};

/**
 * handle Distributor subscription modal
 */
export const handleDistributorSubscriptionConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_SUBSCRIPTION_MODAL,
    payload: modalProps,
  });
};

/**
 * get activity list by distributorId
 */

export const getActivityListByDistributorId = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_ACTIVITY_LIST_BY_DISTRIBUTORID_REQUEST,
  });
  axios
    .get(`${base_url2}/activity/distributor/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_DISTRIBUTORID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_DISTRIBUTORID_FAILURE,
        payload: err,
      });
    });
};

/**
 * handle Distributor Activity modal action
 */
export const handleDistributorActivityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_ACTIVITY_MODAL,
    payload: modalProps,
  });
};

/**
 * request for adding a CALL
 */
export const addDistributorActivityCall = (call, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_DISTRIBUTOR_ACTIVITY_CALL_REQUEST,
  });
  axios
    .post(`${base_url2}/call`, call)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_DISTRIBUTOR_ACTIVITY_CALL_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISTRIBUTOR_ACTIVITY_CALL_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

/**
 * request for adding a EVENT
 */
export const addDistributorActivityEvent = (event, cb) => (dispatch) => {
  console.log("inside addEvent");
  dispatch({
    type: types.ADD_DISTRIBUTOR_ACTIVITY_EVENT_REQUEST,
  });
  axios
    .post(`${base_url2}/event`, event, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_DISTRIBUTOR_ACTIVITY_EVENT_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISTRIBUTOR_ACTIVITY_EVENT_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};
/**
 * request for adding a task
 */


export const addOrderForm = (customer, distributorId) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_ORDER_REQUEST,
  });

  axios
    .post(`${base_url2}/phoneOrder`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch(getOrderRecords(distributorId));
      dispatch({
        type: types.ADD_ORDER_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
      message.success("Order creation step-1 completed !!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ORDER_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};
export const addDistributorActivityTask = (task, cb) => (dispatch) => {
  console.log("inside addTask");
  dispatch({
    type: types.ADD_DISTRIBUTOR_ACTIVITY_TASK_REQUEST,
  });
  axios
    .post(`${base_url2}/task`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getActivityListByDistributorId(distributorId));
      dispatch({
        type: types.ADD_DISTRIBUTOR_ACTIVITY_TASK_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISTRIBUTOR_ACTIVITY_TASK_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

/**
 * get notes list by distributorId
 */
export const getNotesListByDistributorId = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_DISTRIBUTOR_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/notes/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_DISTRIBUTOR_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 *  generate order with subscription
 */

export const generateOrderByDistributorId = (data, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.GENERATE_ORDER_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    .post(`${base_url2}/order/distributor`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GENERATE_ORDER_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GENERATE_ORDER_BY_DISTRIBUTOR_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

export const getDistributorOrderByDistributorId = (distributorId, pageNo) => (
  dispatch
) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_ORDER_BY_DISTRIBUTOR_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/all-phoneOrders/${distributorId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_BY_DISTRIBUTOR_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * renewal button
 */
export const handleRenewalButtonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RENEWAL_BUTTON_MODAL,
    payload: modalProps,
  });
};

/**
 * pause button
 */
export const handleOrderDetailsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PAUSE_BUTTON_MODAL,
    payload: modalProps,
  });
};

/**
 * Link Renewal in distributor
 */
export const linkRenewalOrder = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_RENEWAL_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    .post(`${base_url2}/order/renew-order`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.LINK_RENEWAL_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RENEWAL_BY_DISTRIBUTOR_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

/**
 * Link pause in distributor
 */
export const linkPauseOrder = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_PAUSE_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    .post(`${base_url2}/order/pause-order`, data, {})
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.LINK_PAUSE_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PAUSE_BY_DISTRIBUTOR_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

/**
 * update event modal
 */
export const handleUpdateEventModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EVENT_MODAL,
    payload: modalProps,
  });
};
/**
 * update call modal
 */
export const handleUpdateCallModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CALL_MODAL,
    payload: modalProps,
  });
};

/**
 * update task modal
 */
export const handleUpdateTaskModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_TASK_MODAL,
    payload: modalProps,
  });
};

export const setEditDistributor = (name) => (dispatch) => {
  dispatch({
    type: types.SET_DISTRIBUTOR_EDIT,
    payload: name,
  });
};

/**
 * update distributor modal
 */
export const handleUpdateDistributorModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_DISTRIBUTOR_MODAL,
    payload: modalProps,
  });
};

/**
 * update a specific field using put request
 */
export const updateDistributor = (data, distributorId, userId) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_DISTRIBUTOR_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url2}/distributor/${distributorId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      // dispatch(getDistributorsByUserId(userId));
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Input data search
 */

export const inputDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/distributorName/${name}`, {})
    .then((res) => {
      // if (res.data.contactId) {
      //   console.log(res.data);
      //   dispatch();
      // }

      dispatch({
        type: types.INPUT_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};
/**
 * Get Order Details
 */
export const getOrderDetailsById = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_DETAILS_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/product/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_DETAILS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_DETAILS_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * get all the distributor
 */
export const getAllDistributorsList = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_DISTRIBUTORS_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/all-distributors/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_DISTRIBUTORS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_DISTRIBUTORS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleDistributorOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_ORDER_MODAL,
    payload: modalProps,
  });
};

export const handleDistributorActivityTableModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_ACTIVITY_TABLE_MODAL,
    payload: modalProps,
  });
};

export const setEditDistributorOrder = (name) => (dispatch) => {
  dispatch({
    type: types.SET_DISTRIBUTOR_ORDER_EDIT,
    payload: name,
  });
};

/**
 * update distributor modal
 */
export const handleUpdateOrderDetailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_DISTRIBUTOR_ORDER_MODAL,
    payload: modalProps,
  });
};

// Update Order Table

export const updateDistributorOrder = (data, productId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_DISTRIBUTOR_ORDER_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url2}/distributor/product/${productId}`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getOrderDetailsById(orderId));
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_ORDER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_ORDER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorOrderHistory = (orderId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_DISTRIBUTOR_ORDER_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/order/order-history/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_ORDER_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_ORDER_HISTORY_FAILURE,
        payload: err,
      });
    });
};

export const updateDistributorById = (distributorId, data, cb) => (
  dispatch
) => {
  console.log(data);
  dispatch({ type: types.UPDATE_DISTRIBUTOR_CARD_REQUEST });
  axios
    .put(`${base_url2}/distributor/${distributorId}`, { ...data })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_CARD_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_CARD_FAILURE,
        payload: err,
      });
    });
};

export const addCarDetails = (customer, id, cb) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_CAR_REQUEST,
  });

  axios
    .post(`${base_url2}/excel/import/phone-details`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getDistributorOrderByDistributorId(id))
      dispatch({
        type: types.ADD_CAR_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CAR_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};
/**
 * get distributor  feedback
 */
export const getFeedbackByDistributorId = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_FEEDBACK_BY_DISTRIBUTOR_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/feedback/${distributorId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FEEDBACK_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FEEDBACK_BY_DISTRIBUTOR_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 *  feedback-card modal
 */
export const handleFeedbackModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_FEEDBACK_MODAL,
    payload: modalProps,
  });
};

/**
 * get distributor order feedback
 */
export const getFeedbackByOrderId = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_FEEDBACK_BY_ORDER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/feedback/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FEEDBACK_BY_ORDER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FEEDBACK_BY_ORDER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorHistory = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/history/${distributorId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_HISTORY_FAILURE,
        payload: err,
      });
    });
};
/**
 * paid button
 */
export const handlePaidModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PAID_BUTTON_MODAL,
    payload: modalProps,
  });
};
/**
 * Link paid in distributor
 */
export const addPaidOrder = (data, orderId, distributorId) => (dispatch) => {
  dispatch({ type: types.ADD_PAID_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    .post(`${base_url2}/orderPayment/payment`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderPayment(orderId));
      dispatch(getDistributorOrderByDistributorId(distributorId))
      dispatch({
        type: types.ADD_PAID_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
      message.success("Payment successful")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PAID_BY_DISTRIBUTOR_ID_FAILURE,
      });
      message.error("Something went wrong")
    });
};

export const getDistributorOrderPayment = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_DISTRIBUTOR_PAYMENT_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/orderPayment/orderPayment/process/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_PAYMENT_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_PAYMENT_HISTORY_FAILURE,
        payload: err,
      });
    });
};

export const deleteDistributorData = (id) => (dispatch, getState) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.DELETE_DISTRIBUTOR_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/distributor/${id}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      // dispatch(getDistributorsByUserId(userId));
      dispatch({
        type: types.DELETE_DISTRIBUTOR_DATA_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DISTRIBUTOR_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateDistributorCall = (data, id, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_DISTRIBUTOR_CALL_BY_ID_REQUEST });
  axios
    .put(`${base_url2}/call/${id}`, { ...data })
    .then((res) => {
      // dispatch(getCallListRangeByUserId(userId));
      console.log(res);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_CALL_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_CALL_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateDistributorEvent = (data, id, cb) => (
  dispatch,
  getState
) => {
  dispatch({ type: types.UPDATE_DISTRIBUTOR_EVENT_BY_ID_REQUEST });
  axios
    .put(`${base_url2}/event/${id}`, { ...data })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_EVENT_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_EVENT_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateDistributorTask = (id, data, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_DISTRIBUTOR_TASK_BY_ID_REQUEST });
  axios
    .put(`${base_url2}/task/${id}`, { ...data })
    .then((res) => {
      // dispatch(getTasksListByUserId(userId));
      console.log(res);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_TASK_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_TASK_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//get all the deleted distributor of the user
export const getDeletedDistributors = () => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_DISTRIBUTORS_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/deleteDistributorHistory`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_DISTRIBUTORS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_DISTRIBUTORS_FAILURE,
        payload: err,
      });
    });
};

export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/user/record/count/${userId}`,
      {
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

export const getDeletedOrderTableData = (distributorId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_DISTRIBUTOR_DELETED_ORDER_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/orderDeleteDistributor/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_DELETED_ORDER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_DELETED_ORDER_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const getDeletedQuoteTableData = (distributorId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_DISTRIBUTOR_DELETED_QUOTE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/orderDeleteDistributor/${distributorId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_DELETED_QUOTE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_DISTRIBUTOR_DELETED_QUOTE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * delete modal
 */
export const handleDeleteOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DELETE_ORDER_MODAL,
    payload: modalProps,
  });
};

export const deleteDistributorOrderData = (data, id) => (dispatch) => {
  dispatch({
    type: types.DELETE_DISTRIBUTOR_ORDER_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/order/${id}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_DISTRIBUTOR_ORDER_DATA_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DISTRIBUTOR_ORDER_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getAllRecords = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/user/record/count`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_RECORDS_FAILURE,
        payload: err,
      });
    });
};

/**
 * update Product Detail modal
 */
export const handleUpdateProductDetailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PRODUCT_DETAIL_MODAL,
    payload: modalProps,
  });
};

export const setEditOrderDetail = (name) => (dispatch) => {
  dispatch({
    type: types.SET_ORDER_DETAIL_EDIT,
    payload: name,
  });
};

//Document

export const handleDistributorDocumentUploadModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

//add distributor document

export const addDistributorDocument = (data, cb, distributorId) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_DISTRIBUTOR_DOCUMENT_REQUEST });
  axios
    .post(`${base_url2}/distributor/distributor/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_DISTRIBUTOR_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      //dispatch(getDistributorTable(distributorId));
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISTRIBUTOR_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};
//get DISTRIBUTOR documnet
export const getDistributorDocument = (distributorId) => (dispatch) => {
  dispatch({ type: types.GET_DISTRIBUTOR_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url2}/documemt`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorTable = (distributorId) => (dispatch) => {
  dispatch({ type: types.GET_DISTRIBUTOR_TABLE_REQUEST });
  axios
    .get(`${base_url2}/distributor/distributor/document/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_TABLE_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_TABLE_FAILURE,
        payload: err,
      });
    });
};



export const getRenewOrder = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_RENEW_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/renew/renewlist/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RENEW_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RENEW_ORDER_FAILURE,
        payload: err,
      });
    });
};

//Contact

export const handleDistributorContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_CONTACT_MODAL,
    payload: modalProps,
  });
};

/**
 *  adding a Contact for distributor
 */
export const addContactDistributor = (contact, distributorId) => (dispatch) => {
  dispatch({
    type: types.ADD_CONTACT_DISTRIBUTOR_REQUEST,
  });
  axios
    .post(`${base_url2}/contactPerson`, contact,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch(getContactDistributorList(distributorId));
      dispatch({
        type: types.ADD_CONTACT_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};
/**
 * get all contact distributor list
 */
export const getContactDistributorList = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_DISTRIBUTORS_LIST_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/contactPerson/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_DISTRIBUTORS_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_DISTRIBUTORS_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const setEditDistributorContact = (name) => (dispatch) => {
  dispatch({
    type: types.SET_DISTRIBUTOR_CONTACT_EDIT,
    payload: name,
  });
};

export const handleUpdateDistributorContactModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_UPDATE_DISTRIBUTOR_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const updateDistributorContact = (data, contactPersonId) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_DISTRIBUTOR_CONTACT_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url2}/contactPerson/${contactPersonId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getDistributorsByUserId(userId));
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_CONTACT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_CONTACT_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const setEditPaymentData = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_PAYMENT_DATA,
    payload: name,
  });
};

export const handlePaymentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_PAYMENT_MODAL,
    payload: modalProps,
  });
};

export const updatePaymentData = (data, paymentId, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_ORDER_PAYMENT_REQUEST });
  axios
    .put(`${base_url2}/order/payment/${paymentId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.UPDATE_ORDER_PAYMENT_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ORDER_PAYMENT_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

export const deleteOrderPaymentData = (paymentId, distributorId) => (dispatch) => {
  dispatch({
    type: types.DELETE_ORDER_PAYMENT_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/order/deletePayment/${paymentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getDistributorOrderByDistributorId(distributorId))
      console.log(res);
      dispatch({
        type: types.DELETE_ORDER_PAYMENT_DATA_SUCCESS,
        payload: paymentId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_ORDER_PAYMENT_DATA_FAILURE,
        payload: err,
      });
    });
};
export const getRealTimeDistributorPayment = (data) => (dispatch) => {
  console.log(data);
  dispatch({
    type: types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_REQUEST,
  });

  dispatch({
    type: types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_SUCCESS,
    payload: data,
  });
  // }

  dispatch({
    type: types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_FAILURE,
    // payload: err,
  });
  // });
};

export const updateOrderDetails = (data, orderId, distributorId) => (
  dispatch
) => {
  dispatch({ type: types.UPDATE_ORDER_DETAILS_REQUEST });
  axios
    .put(`${base_url2}/order/product-quantity/increase/${orderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderByDistributorId(distributorId));
      dispatch({
        type: types.UPDATE_ORDER_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ORDER_DETAILS_FAILURE,
        payload: err,
      });
    });
};

export const reinstateToggleForOrder = (data, orderId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.REINSTATE_TOGGLE_FOR_ORDER_REQUEST,
  });
  axios
    .put(`${base_url2}/order/orderReInState/${orderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_ORDER_SUCCESS,
        payload: res.data,
      });
      // message.success("Confirmation Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_ORDER_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};

export const handleBillingAddressModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BILLING_ADDRESS_MODAL,
    payload: modalProps,
  });
};

// add billing address to client

export const addBillingAddress = (data, distributorId) => (dispatch) => {
  dispatch({
    type: types.ADD_BILLING_ADDRESS_DISTRIBUTOR_REQUEST,
  });
  axios
    .post(`${base_url2}/distributor/shipToAddress`, data)
    .then((res) => {
      console.log(res);
      dispatch(getBillingAddress(distributorId));
      dispatch({
        type: types.ADD_BILLING_ADDRESS_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_BILLING_ADDRESS_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};
/**
 * get all contact distributor list
 */
export const getBillingAddress = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_BILLING_ADDRESS_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/distributorShipAddressesList/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BILLING_ADDRESS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BILLING_ADDRESS_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const addCurrencyForOrder = (data, distributorId) => (dispatch) => {
  dispatch({
    type: types.ADD_CURRENCY_FOR_ORDER_REQUEST,
  });
  axios
    .post(`${base_url2}/order/order-currency`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getChoosenCurrencyId(distributorId));
      dispatch({
        type: types.ADD_CURRENCY_FOR_ORDER_SUCCESS,
        payload: res.data,
      });
      message.success("Currency is choosen successfully")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CURRENCY_FOR_ORDER_FAILURE,
        payload: err,
      });
    });
};
/**
 * get all the CURRENCY_FOR_ORDER of the user
 */
export const addCurrencyForQuote = (data, distributorId) => (dispatch) => {
  dispatch({
    type: types.ADD_CURRENCY_FOR_QUOTE_REQUEST,
  });
  axios
    .post(`${base_url2}/order/order-currency`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getChoosenCurrencyId(distributorId));
      dispatch({
        type: types.ADD_CURRENCY_FOR_QUOTE_SUCCESS,
        payload: res.data,
      });
      message.success("Currency is choosen successfully")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CURRENCY_FOR_QUOTE_FAILURE,
        payload: err,
      });
    });
};
export const getChoosenCurrencyId = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_CHOOSEN_CURRENCYID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/order-currency-list/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CHOOSEN_CURRENCYID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CHOOSEN_CURRENCYID_FAILURE,
        payload: err,
      });
    });
};

export const getProductByCurrency = (groupId, currencyId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_BY_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productSearch/${groupId}/${currencyId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_BY_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_BY_CURRENCY_FAILURE,
        payload: err,
      });
    });
};

//distributor by groupId

export const getDistributorByGroup = (groupId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_BY_GROUP_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/distributor/${groupId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_BY_GROUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_BY_GROUP_FAILURE,
        payload: err,
      });
    });
};

export const handleDistributorGenerateQuote = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_GENERATE_QUOTE_MODAL,
    payload: modalProps,
  });
};

// generate Quote

export const generateQuoteByDistributorId = (data, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.GENERATE_QUOTE_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    .post(`${base_url2}/quote/distributor`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GENERATE_QUOTE_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GENERATE_QUOTE_BY_DISTRIBUTOR_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

export const getDistributorQuoteByDistributorId = (distributorId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_QUOTE_BY_DISTRIBUTOR_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/quote/distributor/${distributorId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_QUOTE_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_QUOTE_BY_DISTRIBUTOR_ID_FAILURE,
        payload: err,
      });
    });
};

export const applyForLoginInContact = (data, contactPersonId, id, userId) => (dispatch) => {
  dispatch({
    type: types.APPLY_FOR_LOGIN_IN_CONTACT_REQUEST,
  });
  axios
    .put(`${base_url2}/distributor/convert/contactToUser/${contactPersonId}/${userId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch(getContactDistributorList(id))
      dispatch({
        type: types.APPLY_FOR_LOGIN_IN_CONTACT_SUCCESS,
        payload: res.data,
      });
      message.success("Apply for login is updated successfully !!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.APPLY_FOR_LOGIN_IN_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const addLocationInOrder = (data, distributorId) => (dispatch) => {
  dispatch({
    type: types.ADD_LOCATION_IN_ORDER_REQUEST,
  });
  axios
    .post(`${base_url2}/orderInventoryLocationLink/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderByDistributorId(distributorId));
      dispatch({
        type: types.ADD_LOCATION_IN_ORDER_SUCCESS,
        payload: res.data,
      });
      message.success("Order has moved to inventory !!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LOCATION_IN_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const getPhonelistById = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_PHONE_LIST_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/phoneDetail/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getChoosenCurrencyId(contactPersonId));
      dispatch({
        type: types.GET_PHONE_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PHONE_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const handleInventoryLocationInOrder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_LOCATION_IN_ORDER_MODAL,
    payload: modalProps,
  });
};
export const handleNotesModalInOrder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_NOTES_MODAL_IN_ORDER,
    payload: modalProps,
  });
};
export const getNotesInOrder = (id) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_IN_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/notes/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_IN_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_IN_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const handleStatusOfOrder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_STATUS_OF_ORDER_MODAL,
    payload: modalProps,
  });
};
export const getOrderPhoneNote = (phoneId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_PHONE_NOTE_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/notes/${phoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_PHONE_NOTE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_PHONE_NOTE_FAILURE,
        payload: err,
      });
    });
};
export const handlePhoneNotesOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PHONE_NOTES_ORDER_MODAL,
    payload: modalProps,
  });
};
export const getPhoneTasklist = (phoneId) => (dispatch) => {
  dispatch({
    type: types.GET_PHONE_TASK_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/phoneTask/${phoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PHONE_TASK_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PHONE_TASK_LIST_FAILURE,
        payload: err,
      });
    });
};
export const checkTaskComplition = (data, phoneId) => (dispatch) => {
  // debugger;
  dispatch({ type: types.CHECK_TASK_COMPLETION_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/phone/task/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPhoneTasklist(phoneId))
      dispatch({
        type: types.CHECK_TASK_COMPLETION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CHECK_TASK_COMPLETION_FAILURE,
      });
    });
};
export const addSpareList = (data, phoneId, orderId, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.ADD_SPARE_LIST_REQUEST });
  axios
    .post(`${base_url2}/phoneSpare`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getSpareListByPhoneId(phoneId))
      dispatch(getPhonelistById(orderId))
      dispatch({
        type: types.ADD_SPARE_LIST_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SPARE_LIST_FAILURE,
      });
      cb && cb();
    });
};

export const getSpareListByPhoneId = (phoneId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_SPARE_LIST_BY_PHONEID_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneSpare/spareDetails/${phoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SPARE_LIST_BY_PHONEID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SPARE_LIST_BY_PHONEID_FAILURE,
        payload: err,
      });
    });
};

export const updateQCStatus = (data, phoneId, orderPhoneId, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.UPDATE_QC_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phone/qcstatus/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPhonelistById(orderPhoneId))

      dispatch({
        type: types.UPDATE_QC_STATUS_SUCCESS,
        payload: res.data,
      });
      cb && cb();
      message.success("QC status updated!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_QC_STATUS_FAILURE,
      });
      cb && cb();
    });
};

export const startQCStatus = (data, distributorId, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.START_QC_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/qcUpdateInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderByDistributorId(distributorId))

      dispatch({
        type: types.START_QC_STATUS_SUCCESS,
        payload: res.data,
      });
      cb && cb();
      message.success("QC started !")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.START_QC_STATUS_FAILURE,
      });
      cb && cb();
    });
};
export const startRepairInStatus = (data, id) => (dispatch) => {
  // debugger;
  dispatch({ type: types.START_REPAIR_IN_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/qcRepair`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderByDistributorId(id));
      dispatch({
        type: types.START_REPAIR_IN_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.START_REPAIR_IN_STATUS_FAILURE,
      });
    });
};

export const updateOfferPrice = (data, orderPhoneId, id, cb) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_OFFER_PRICE_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/updatePrice/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getDistributorOrderByDistributorId(id));
      dispatch({
        type: types.UPDATE_OFFER_PRICE_SUCCESS,
        payload: res.data,
      });
      cb && cb();
      message.success("Offer price has been updated!")
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_OFFER_PRICE_FAILURE,
        payload: err,
      });
      // cb && cb("failuer", null, null);
    });
};

export const getTaggedSuppliesByBrand = (brand, model) => (dispatch) => {
  dispatch({
    type: types.GET_TAGGED_SUPPLIES_BYBRAND_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/masterName/${brand}/${model}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TAGGED_SUPPLIES_BYBRAND_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TAGGED_SUPPLIES_BYBRAND_FAILURE,
        payload: err,
      });
    });
};

export const receiveTaskByDispatch = (data, phoneId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.RECEIVE_TASK_BY_DISPATCH_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/update/phone/task/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getPhoneTasklist(phoneId));
      dispatch({
        type: types.RECEIVE_TASK_BY_DISPATCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.RECEIVE_TASK_BY_DISPATCH_FAILURE,
        payload: err,
      });
    });
};
export const handleOrderCartDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_CART_MODAL,
    payload: modalProps,
  });
};
export const getLocationList = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_LOCATION_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/locationDetails/getLocationDetailsList/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOCATION_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOCATION_LIST_FAILURE,
        payload: err,
      });
    });
};

export const setClearbitData1 = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_DATA1,
    payload: data,
  });
};

export const getAccountRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ACCOUNT_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/record/count`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACCOUNT_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ACCOUNT_RECORDS_FAILURE,
        payload: err,
      });
    });
};
export const getOrderRecords = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/record/count/${distributorId} `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ORDER_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const handleRepairReason = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REPAIR_REASON_MODAL,
    payload: modalProps,
  });
};

export const handlePaymentHistory = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PAYMENT_HISTORY_MODAL,
    payload: modalProps,
  });
};

export const getDistributorCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DISTRIBUTOR_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateAccountModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCOUNT_UPDATE_MODAL,
    payload: modalProps,
  });
};

export const getOpportunityRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_RECORD_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/record/today/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_FAILURE,
        payload: err,
      });
    });
};

export const handleOrderGenerateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_GENERATE_MODAL,
    payload: modalProps,
  });
};

export const handleAddOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_ORDER_MODAL,
    payload: modalProps,
  });
};