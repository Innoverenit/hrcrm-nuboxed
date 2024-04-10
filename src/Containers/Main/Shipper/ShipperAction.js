import * as types from "./ShipperActionType";
import axios from "axios";
import { base_url, base_url2 } from "../../../Config/Auth";
import moment from "moment";
/**
 * handle Shipper modal action
 */
export const handleShipperModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SHIPPER_MODAL,
    payload: modalProps,
  });
};

/**
 * SET SHIPPER VIEW TYPE
 * TABLE VIEW/CARD VIEW/MAP VIEW
 */
export const setShipperViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_SHIPPER_VIEW_TYPE,
    payload: viewType,
  });
};

/**
 * request for adding a Shipper
 */
export const addShipper = (shipper, userId) => (dispatch) => {
  dispatch({
    type: types.ADD_SHIPPER_REQUEST,
  });
  axios
    .post(`${base_url2}/shipper`, shipper, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getShipperByUserId(userId));
      dispatch({
        type: types.ADD_SHIPPER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHIPPER_FAILURE,
        payload: err,
      });
    });
};
/**
 * get all the SHIPPER of the user
 */
export const getShipperByUserId = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/user/${userId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get Shipper details by shipperId
 */
export const getShipperByShipperId = (id) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_BY_SHIPPER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_BY_SHIPPER_ID_FAILURE,
        payload: err,
      });
    });
};

export const setEditShipper = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SHIPPER_EDIT,
    payload: name,
  });
};
export const updateShipperById = (shipperId, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_SHIPPER_CARD_REQUEST });
  axios
    .put(`${base_url}/shipper/${shipperId}`, { ...data })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_SHIPPER_CARD_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_CARD_FAILURE,
        payload: err,
      });
    });
};

export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/user/record/count/${userId}`, {
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

export const getAllRecords = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/user/record/count`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
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
 * get Shipper feedback
 */
export const getFeedbackByShipperId = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_FEEDBACK_BY_SHIPPER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/shipper/feedback/${shipperId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FEEDBACK_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FEEDBACK_BY_SHIPPER_ID_FAILURE,
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
 * get activity list by ShipperId
 */

export const getActivityListByShipperId = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_ACTIVITY_LIST_BY_SHIPPERID_REQUEST,
  });
  axios
    .get(`${base_url2}/activity/shipper/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_SHIPPERID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_SHIPPERID_FAILURE,
        payload: err,
      });
    });
};
/**
 * handle Shipper Activity modal action
 */
export const handleShipperActivityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SHIPPER_ACTIVITY_MODAL,
    payload: modalProps,
  });
};

/**
 * request for adding a CALL
 */
export const addShipperActivityCall = (call, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_SHIPPER_ACTIVITY_CALL_REQUEST,
  });
  axios
    .post(`${base_url}/call`, call)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SHIPPER_ACTIVITY_CALL_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHIPPER_ACTIVITY_CALL_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

/**
 * request for adding a EVENT
 */
export const addShipperActivityEvent = (event, cb) => (dispatch) => {
  console.log("inside addEvent");
  dispatch({
    type: types.ADD_SHIPPER_ACTIVITY_EVENT_REQUEST,
  });
  axios
    .post(`${base_url}/event`, event, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SHIPPER_ACTIVITY_EVENT_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHIPPER_ACTIVITY_EVENT_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

export const updateShipperEvent = (data, id, cb) => (dispatch, getState) => {
  dispatch({ type: types.UPDATE_SHIPPER_EVENT_BY_ID_REQUEST });
  axios
    .put(`${base_url}/event/${id}`, { ...data })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_SHIPPER_EVENT_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_EVENT_BY_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * request for adding a task
 */
export const addShipperActivityTask = (task, cb) => (dispatch) => {
  console.log("inside addTask");
  dispatch({
    type: types.ADD_SHIPPER_ACTIVITY_TASK_REQUEST,
  });
  axios
    .post(`${base_url}/task`, task, {})
    .then((res) => {
      console.log(res);
      // dispatch(getActivityListByShipperId(shipperId));
      dispatch({
        type: types.ADD_SHIPPER_ACTIVITY_TASK_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHIPPER_ACTIVITY_TASK_FAILURE,
        payload: err,
      });
      cb && cb();
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

export const updateShipperCall = (data, id, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_SHIPPER_CALL_BY_ID_REQUEST });
  axios
    .put(`${base_url}/call/${id}`, { ...data })
    .then((res) => {
      // dispatch(getCallListRangeByUserId(userId));
      console.log(res);
      dispatch({
        type: types.UPDATE_SHIPPER_CALL_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_CALL_BY_ID_FAILURE,
        payload: err,
      });
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

/**
 *  generate order with subscription
 */

export const generateOrderByShipperId = (data, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.GENERATE_ORDER_BY_SHIPPER_ID_REQUEST });
  axios
    .post(`${base_url}/order/distributor`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GENERATE_ORDER_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GENERATE_ORDER_BY_SHIPPER_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

export const updateShipperTask = (id, data, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  console.log(data);
  dispatch({ type: types.UPDATE_SHIPPER_TASK_BY_ID_REQUEST });
  axios
    .put(`${base_url}/task/${id}`, { ...data })
    .then((res) => {
      // dispatch(getTasksListByUserId(userId));
      console.log(res);
      dispatch({
        type: types.UPDATE_SHIPPER_TASK_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_TASK_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * get notes list by ShipperId
 */
export const getNotesListByShipperId = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_SHIPPER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/notes/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_SHIPPER_ID_FAILURE,
        payload: err,
      });
    });
};

//ShipperHistory
export const getShipperHistory = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/history/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_HISTORY_FAILURE,
        payload: err,
      });
    });
};

//ShipperDocument
export const handleShipperDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SHIPPER_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

//add Shipper document

export const addShipperDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_SHIPPER_DOCUMENT_REQUEST });
  axios
    .post(`${base_url2}/document/submit`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SHIPPER_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // dispatch(getCandidateDocument(candidateId));
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHIPPER_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

//get Shipper documnet
export const getShipperDocument = (shipperId) => (dispatch) => {
  dispatch({ type: types.GET_SHIPPER_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url2}/shipper/documentList/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};
export const setClearbitOrderData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_ORDER_DATA,
    payload: data,
  });
};
//ShipperOrder
export const getShipperOrderByShipperId = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_ORDER_BY_SHIPPER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/shipper/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_ORDER_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_ORDER_BY_SHIPPER_ID_FAILURE,
        payload: err,
      });
    });
};

// get product

export const fetchingNewShipperOrder = (shipperId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_NEW_SHIPPER_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/dispatch/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_NEW_SHIPPER_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_NEW_SHIPPER_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const handleShipperOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SHIPPER_ORDER_MODAL,
    payload: modalProps,
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
 * Link Renewal in Shipper
 */
export const linkRenewalOrder = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_RENEWAL_BY_SHIPPER_ID_REQUEST });
  axios
    .post(`${base_url}/order/renew-order`, data, {})
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.LINK_RENEWAL_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RENEWAL_BY_SHIPPER_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

export const handleShipperActivityTableModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SHIPPER_ACTIVITY_TABLE_MODAL,
    payload: modalProps,
  });
};

/**
 * update a specific field using put request
 */
export const updateShipper = (data, shipperId, userId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SHIPPER_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url2}/shipper/updateShipper/${shipperId} `, data)
    .then((res) => {
      console.log(res);
      // dispatch(getShipperByUserId(userId));
      dispatch({
        type: types.UPDATE_SHIPPER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * handle order modal
 */
export const handleLinkShipperOrderConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_ORDER_CONFIGURE_MODAL,
    payload: modalProps,
  });
};

/**
 *  link order by Shipper id
 */

export const linkOrderByShipperId = (data, shipperId) => (dispatch) => {
  debugger;
  dispatch({ type: types.LINK_ORDER_BY_SHIPPER_ID_REQUEST });
  axios
    .post(`${base_url}/distributor/product`, data, {})
    .then((res) => {
      console.log(res);
      // dispatch(fetchingNewShipperOrder(shipperId));
      dispatch({
        type: types.LINK_ORDER_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ORDER_BY_SHIPPER_ID_FAILURE,
      });
    });
};

/**
 * get Shipper order feedback
 */
export const getFeedbackByOrderId = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_FEEDBACK_BY_ORDER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/order/feedback/${orderId}`)
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
/**
 * Get Order Details
 */
export const getOrderDetailsById = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_DETAILS_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/order/product/${orderId}`, {})
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
 * get all the Shipper
 */
export const getAllShipperList = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_SHIPPER_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/all-shipper/${orgId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_SHIPPER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_SHIPPER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getAllShipper = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_SHIPPER_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/all/shipper/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_SHIPPER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_SHIPPER_FAILURE,
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
export const setEditShipperOrder = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SHIPPER_ORDER_EDIT,
    payload: name,
  });
};

export const getRenewOrder = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_RENEW_ORDER_REQUEST,
  });
  axios
    .get(`${base_url}/renew/renewlist/${orderId}`)
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

/**
 * handle Shipper subscription modal
 */
export const handleShipperSubscriptionConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_SHIPPER_SUBSCRIPTION_MODAL,
    payload: modalProps,
  });
};

/**
 * Link paid in SHIPPER
 */
export const addPaidOrder = (data, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PAID_BY_SHIPPER_ID_REQUEST });
  axios
    .post(`${base_url}/order/payment`, data)
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.ADD_PAID_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PAID_BY_SHIPPER_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

/**
 * Link pause in Shipper
 */
export const linkPauseOrder = (data, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.LINK_PAUSE_BY_SHIPPER_ID_REQUEST });
  axios
    .post(`${base_url}/order/pause-order`, data, {})
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.LINK_PAUSE_BY_SHIPPER_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PAUSE_BY_SHIPPER_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

// Update Order Table

export const updateShipperOrder = (data, productId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SHIPPER_ORDER_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url}/distributor/product/${productId}`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getOrderDetailsById(orderId));
      dispatch({
        type: types.UPDATE_SHIPPER_ORDER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_ORDER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * update Shipper modal
 */
export const handleUpdateOrderDetailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SHIPPER_ORDER_MODAL,
    payload: modalProps,
  });
};

export const getShipperOrderPayment = (orderId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_SHIPPER_PAYMENT_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/order/order-payment/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_SHIPPER_PAYMENT_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_SHIPPER_PAYMENT_HISTORY_FAILURE,
        payload: err,
      });
    });
};

//get all the deleted Shipper of the user
export const getDeletedShipper = (id) => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_SHIPPER_REQUEST,
  });
  axios
    .get(`${base_url}/distributor/${id}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_SHIPPER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_SHIPPER_FAILURE,
        payload: err,
      });
    });
};

export const getDeletedOrderTableData = () => (dispatch) => {
  dispatch({
    type: types.FETCHING_SHIPPER_DELETED_ORDER_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/order/deleteOrderHistory`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_SHIPPER_DELETED_ORDER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_SHIPPER_DELETED_ORDER_BY_ID_FAILURE,
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
export const deleteShipperOrderData = (data, id) => (dispatch) => {
  dispatch({
    type: types.DELETE_SHIPPER_ORDER_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/order/${id}`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_SHIPPER_ORDER_DATA_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SHIPPER_ORDER_DATA_FAILURE,
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
 * pause button
 */
export const handlePauseButtonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PAUSE_BUTTON_MODAL,
    payload: modalProps,
  });
};

/**
 * update distributor modal
 */
export const handleUpdateShipperModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SHIPPER_MODAL,
    payload: modalProps,
  });
};

export const getShipperOrderHistory = (orderId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_SHIPPER_ORDER_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url}/order/order-history/${orderId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FETCHING_SHIPPER_ORDER_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FETCHING_SHIPPER_ORDER_HISTORY_FAILURE,
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
    .get(`${base_url}/shipper/shipperList/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
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

export const deleteShipperData = (id) => (dispatch, getState) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.DELETE_SHIPPER_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/shipper/${id}`)
    .then((res) => {
      console.log(res);
      // dispatch(getShipperByUserId(userId));
      dispatch({
        type: types.DELETE_SHIPPER_DATA_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SHIPPER_DATA_FAILURE,
        payload: err,
      });
    });
};
//get all shipper

//Contact

export const handleShipperContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SHIPPER_CONTACT_MODAL,
    payload: modalProps,
  });
};

/**
 * request for adding a contact
 */
export const addContactShipper = (contact, shipperId) => (dispatch) => {
  dispatch({
    type: types.ADD_CONTACT_SHIPPER_REQUEST,
  });

  axios
    .post(`${base_url2}/contactPerson`, contact, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getContactShipperList(shipperId));
      dispatch({
        type: types.ADD_CONTACT_SHIPPER_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_SHIPPER_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

/*get all the contact of the Shipper */
export const getContactShipperList = (shipperId) => (dispatch) => {
  // const shipperId = getState().shipper.allShipper.shipperId;
  dispatch({
    type: types.GET_CONTACT_SHIPPER_LIST_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/contactPerson/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_SHIPPER_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_SHIPPER_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//SEARCH CONTACTS OF SHIPPER

export const setEditShipperContact = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SHIPPER_CONTACT_EDIT,
    payload: name,
  });
};

export const handleUpdateShipperContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SHIPPER_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const updateShipperContact = (data, id) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SHIPPER_CONTACT_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url}/contactPerson/${id}`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getDistributorsByUserId(userId));
      dispatch({
        type: types.UPDATE_SHIPPER_CONTACT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_CONTACT_BY_ID_FAILURE,
        payload: err,
      });
    });
};

// export const getModeOfShip = () => (dispatch) => {
//   dispatch({
//     type: types.GET_MODE_OF_SHIP_REQUEST,
//   });
//   axios
//     .get(`${base_url}/`, {})
//     .then((res) => {
//       console.log(res);
//       dispatch({
//         type: types.GET_MODE_OF_SHIP_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.GET_MODE_OF_SHIP_FAILURE,
//         payload: err,
//       });
//     });
// };

/**
 * set Shipper dashboard type to individual or all
 */
export const setShipperDashboardType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SHIPPER_DASHBOARD_TYPE,
    payload: type,
  });

/**
 * set selected time range from time interval
 */
export const setSelectedTimeInterval = (selectedTime) => (dispatch) => {
  console.log(selectedTime);
  dispatch({
    type: types.CHANGE_SELECTED_TIME_INTERVAL,
    payload: selectedTime,
  });
};
/**
 * set current Time Range
 */
export const setTimeRange = (startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.SET_TIME_INTERVAL,
    payload: {
      startDate: moment(startDate).toISOString(),
      endDate: moment(endDate).toISOString(),
    },
  });
};

//shipperDispatch
export const getShipperDispatch = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_DISPATCH_REQUEST,
  });
  axios
    .get(`${base_url2}/shipper/dispatch/${shipperId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_DISPATCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_DISPATCH_FAILURE,
        payload: err,
      });
    });
};


export const getShipperRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_RECORDS_REQUEST,
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
        type: types.GET_SHIPPER_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SHIPPER_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getEmployeelistAsErp = () => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_LIST_AS_ERP_REQUEST,
  });
  axios
    .get(`${base_url}/employee/user-list/drop-down/erp`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_LIST_AS_ERP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_LIST_AS_ERP_FAILURE,
        payload: err,
      });
    });
};