import * as types from "./AccountActionType";
import axios from "axios";
import { base_url2, base_url } from "../../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'

/**
 * handle Distributor modal action
 */
export const handleDistributorModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_MODAL,
    payload: modalProps,
  });
};
export const handleOpenNewModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPENNEW_MODAL,
    payload: modalProps,
  });
};




export const handleSupplierTicketModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIER_TICKET_MODAL,
    payload: modalProps,
  });
};


export const handleUpdateAccountUserModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_ACCOUNT_USER_MODAL,
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
export const addDistributor = (distributor) => (dispatch) => {
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
      if (res.data.message) {
        message.success(res.data.message)

      } else {
        Swal.fire({
          icon: 'success',
          title: 'Customer Created Successfully',
          showConfirmButton: false,
   timer: 1500,
        })
      }

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

export const addPi = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_PI_REQUEST,
  });
  axios
    .post(`${base_url2}/pi/piInquire`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      if (res.data.message) {
        message.success(res.data.message)

      } else {
        Swal.fire({
          icon: 'success',
          title: 'Customer Created Successfully',
          showConfirmButton: false,
   timer: 1500,
        })
      }

      dispatch({
        type: types.ADD_PI_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PI_FAILURE,
        payload: err,
      });
    });
};



export const handleAccountImportModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCOUNT_IMPORT_MODAL,
    payload: modalProps,
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


export const getCustomerOrder = (distributorId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/all-phoneOrders/procure-repair/${distributorId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_ORDER_FAILURE,
        payload: err,
      });
    });
};


export const getPibyItem = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_PI_BY_ITEM_REQUEST,
  });
  axios
    .get(`${base_url2}/pi/piRepairList/${orderPhoneId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PI_BY_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PI_BY_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const getPiFirststep = (piId,type) => (dispatch) => {
  dispatch({
    type: types.GET_PI_FIRSTSTEP_REQUEST,
  });
  axios
    .get(`${base_url2}/pi/firstStep/${piId}/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PI_FIRSTSTEP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PI_FIRSTSTEP_FAILURE,
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
export const handleLinkCustomerProcurementModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_CUSTOMER_PROCUREMENT_MODAL,
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
      Swal.fire({
        icon: 'success',
        title: 'Order Created Successfully!',
        showConfirmButton: false,
   timer: 1500,
      })
      dispatch(getOrderRecords(distributorId,"repair"));
      // dispatch(getDistributorOrderOfHigh(distributorId,"0","repair","High"));
      // dispatch(getDistributorOrderOfMedium(distributorId,"0","repair","Medium"));
      // dispatch(getDistributorOrderOfLow(distributorId,"0","repair","Low"));
      dispatch({
        type: types.ADD_ORDER_SUCCESS,
        payload: res.data,
      });

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

export const addQuotationOrderForm = (customer) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_QUOTATION_ORDER_REQUEST,
  });

  axios
    .post(`${base_url2}/quotation`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Quotation Saved',
        showConfirmButton: false,
        timer: 1500,
      })
      // dispatch(getOrderRecords(distributorId));
    
      dispatch({
        type: types.ADD_QUOTATION_ORDER_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_QUOTATION_ORDER_FAILURE,
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

export const getDistributorOrderByDistributorId = (distributorId, pageNo, type) => (
  dispatch
) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_ORDER_BY_DISTRIBUTOR_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/all-phoneOrders/${distributorId}/${pageNo}/${type}`,
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


export const getDistributorOrderOfHigh = (distributorId, pageNo, type,ptype) => (
  dispatch
) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_ORDER_OF_HIGH_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/priorityHighOrders/${distributorId}/${pageNo}/${type}/${ptype}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_OF_HIGH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_OF_HIGH_FAILURE,
        payload: err,
      });
    });
};
export const getDistributorOrderOfMedium = (distributorId, pageNo, type,ptype) => (
  dispatch
) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_ORDER_OF_MEDIUM_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/priorityLowOrders/${distributorId}/${pageNo}/${type}/${ptype} `,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_OF_MEDIUM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_OF_MEDIUM_FAILURE,
        payload: err,
      });
    });
};
export const getDistributorOrderOfLow = (distributorId, pageNo, type,ptype) => (
  dispatch
) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_ORDER_OF_LOW_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/priorityMediumOrders/${distributorId}/${pageNo}/${type}/${ptype}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_OF_LOW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_ORDER_OF_LOW_FAILURE,
        payload: err,
      });
    });
};

export const getCompleteOrders = (distributorId, pageNo) => (
  dispatch
) => {
  dispatch({
    type: types.GET_COMPLETE_ORDERS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/complete-phoneOrders/${distributorId}/${pageNo}`,
      {
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

export const getHighCompleteOrders = (distributorId,type, pageNo,ptype) => (
  dispatch
) => {
  dispatch({
    type: types.GET_HIGH_COMPLETE_ORDERS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/completeHighPriorityWiseOrders/${distributorId}/${type}/${pageNo}/${ptype}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_HIGH_COMPLETE_ORDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_HIGH_COMPLETE_ORDERS_FAILURE,
        payload: err,
      });
    });
};


export const getMediumCompleteOrders = (distributorId,type, pageNo,ptype) => (
  dispatch
) => {
  dispatch({
    type: types.GET_MEDIUM_COMPLETE_ORDERS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/completeMediumPriorityWiseOrders/${distributorId}/${type}/${pageNo}/${ptype}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MEDIUM_COMPLETE_ORDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MEDIUM_COMPLETE_ORDERS_FAILURE,
        payload: err,
      });
    });
};

export const getLowCompleteOrders = (distributorId,type, pageNo,ptype) => (
  dispatch
) => {
  dispatch({
    type: types.GET_LOW_COMPLETE_ORDERS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/completeLowPriorityWiseOrders/${distributorId}/${type}/${pageNo}/${ptype}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOW_COMPLETE_ORDERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOW_COMPLETE_ORDERS_FAILURE,
        payload: err,
      });
    });
};


export const getUserByLocationDepartment = (locationId, departmentId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_USERS_BY_DEPARTMENT_LOCATION_REQUEST,
  });
  axios
    .get(`${base_url}/employee/user/list/drop-down/${locationId}/${departmentId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_USERS_BY_DEPARTMENT_LOCATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_USERS_BY_DEPARTMENT_LOCATION_FAILURE,
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

export const handleProductOrderDetailsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_ORDER_DETAIL_MODAL,
    payload: modalProps,
  });
};

export const handleSearchItem = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SEARCH_ITEMS_MODAL,
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

export const setEditOrder = (name) => (dispatch) => {
  dispatch({
    type: types.SET_ORDER_EDIT,
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
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
   timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const deleteDistributor = (data, distributorId, userId) => (
  dispatch
) => {
  dispatch({
    type: types.DELETE_DISTRIBUTOR_REQUEST,
  });
  axios
    .put(`${base_url2}/distributor/deleteDistributor/${distributorId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch(getRecords(userId));
      dispatch({
        type: types.DELETE_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,

      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};
/**
 * Input data search
 */

export const inputDataSearch = (name,type) => (dispatch) => {
  dispatch({
    type: types.INPUT_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/api/v1/distributor/search/alltype/${name}/${type}`,  {
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

export const searchInoice = (distributorId,invoiceId) => (dispatch) => {
  dispatch({
    type: types.INPUT_SEARCH_INVOICE_REQUEST,
  });
  axios
    .get(`${base_url2}/invoice/searchInvoiceList/${distributorId}/${invoiceId}`,  {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.INPUT_SEARCH_INVOICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_SEARCH_INVOICE_FAILURE,
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
export const emptyDistributor = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_DISTRIBUTOR_LIST,
  });
};
// get customer by user

export const getCustomerByUser = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/user/${userId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_BY_USER_FAILURE,
        payload: err,
      });
    });
};
/**
 * get all the distributor
 */
export const getAllDistributorsList = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_DISTRIBUTORS_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/all-distributors/${orgId}/${pageNo}`,
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

export const updateSuscription = (data) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SUSCRIPTION_REQUEST,
  });
  axios
    .put(`${base_url2}/organization/subscription`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_SUSCRIPTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SUSCRIPTION_FAILURE,
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
    .post(`${base_url2}/excel/import/phone-details/tst`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Item list added',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.ADD_CAR_SUCCESS,
        payload: res.data,
      });
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


export const addProcureDetails = (customer, orderPhoneId, cb) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_PROCURE_DETAILS_REQUEST,
  });

  axios
    .post(`${base_url2}/phoneOrder/procure/order`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getProcureDetails(orderPhoneId))
      Swal.fire({
        icon: 'success',
        title: 'Items added to cart',
      })
      dispatch({
        type: types.ADD_PROCURE_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCURE_DETAILS_FAILURE,
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
export const handlePIModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PI_MODAL,
    payload: modalProps,
  });
};
export const handleOrderPickupModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_PICKUP_MODAL,
    payload: modalProps,
  });
};

export const handleOrderPaymentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCTION_PAYMENT_MODAL,
    payload: modalProps,
  });
};
/**
 * Link paid in distributor
 */
export const addPaidOrder = (data,procureOrderInvoiceId, orderId) => (dispatch) => {
  dispatch({ type: types.ADD_PAID_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    // .post(`${base_url2}/orderPayment/payment`,
    .put(`${base_url2}/invoice/procure/${procureOrderInvoiceId}`,
       data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderPayment(orderId))
      dispatch({
        type: types.ADD_PAID_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        // showConfirmButton: false,
        // timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PAID_BY_DISTRIBUTOR_ID_FAILURE,
      });
    });
};

export const getDistributorOrderPayment = (orderId) => (dispatch) => {
  dispatch({
    type: types.FETCHING_DISTRIBUTOR_PAYMENT_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/orderPayment/process/${orderId}`, {
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
    .get(`${base_url2}/distributor/record/count/${userId}`,
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
      // dispatch(getContactDistributorList(distributorId));
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


export const getLobList = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_LOB_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/lob/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOB_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOB_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getPulseList = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_PULSE_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/orderData/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PULSE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PULSE_LIST_FAILURE,
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

export const deleteOrderPaymentData = (data, paymentId) => (dispatch) => {
  dispatch({
    type: types.DELETE_ORDER_PAYMENT_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/orderPayment/deletePayment/${paymentId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Order Payment Deleted Successfully !',
        showConfirmButton: false,
        timer: 1500,
      })
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
      dispatch(getDistributorOrderByDistributorId(distributorId, 0));
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




export const addTicket = (customer) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_TICKET_REQUEST,
  });

  axios
    .post(`${base_url}/ticket/save`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     
     
      console.log(res);
      // dispatch(
      //   linkCustomersToOpportunity(opportunityId, { CustomerIds: [res.data] }, cb)
      // );
     
     

      dispatch({
        type: types.ADD_TICKET_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TICKET_FAILURE,
        payload: err,
      });
      message.error(err.data.message)
      // cb && cb();
    });
};
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



export const addLocationInOrder = (data, cb) => (dispatch) => {
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
      Swal.fire({
        icon: 'success',
        title: 'Repair facility selected',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.ADD_LOCATION_IN_ORDER_SUCCESS,
        payload: res.data,
      });
      cb()
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LOCATION_IN_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const addLead = (data, orderPhoneId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_LEAD_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/teamLeadAssign/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Lead Tagged',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.ADD_LEAD_SUCCESS,
        payload: res.data,
      });
      cb()
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LEAD_FAILURE,
        payload: err,
      });
    });
};

export const addSupervisor = (data, orderPhoneId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_SUPERVISOR_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/supervisor/assign/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Supervisor Tagged',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.ADD_SUPERVISOR_SUCCESS,
        payload: res.data,
      });
      cb()
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPERVISOR_FAILURE,
        payload: err,
      });
    });
};

export const getOrderById = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/phoneOrders/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateSubOrderAwb = (data, orderPhoneAwbId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SUBORDER_AWB_REQUEST,
  });
  axios
    .put(`${base_url2}/phone/updateAwbNo/${orderPhoneAwbId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_SUBORDER_AWB_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_SUBORDER_AWB_FAILURE,
        payload: err,
      });
    });
};
export const getPhonelistById = (orderPhoneId, page) => (dispatch) => {
  dispatch({
    type: types.GET_PHONE_LIST_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/phoneDetail/${orderPhoneId}/${page}`, {
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

export const handleLeadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_LEAD_MODAL,
    payload: modalProps,
  });
};
export const handleNotesModalInOrder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_NOTES_MODAL_IN_ORDER,
    payload: modalProps,
  });
};

export const handleAccountPulse = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCOUNT_PULSE,
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
export const getPhoneTasklist = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_PHONE_TASK_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/itemTask/all/${orgId}`, {
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
export const addSpareList = (data, phoneTaskId, orderId, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.ADD_SPARE_LIST_REQUEST });
  axios
    .post(`${base_url2}/phoneSpare`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Spares Added SucessFully',
        showConfirmButton: false,
        timer: 1500,
      })
      console.log(res);
      dispatch(getSpareListByPhoneTaskId(phoneTaskId))
     // dispatch(getPhonelistById(orderId))
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
export const deleteSpareList = (data, phoneSpareId,phoneTaskId, orderPhoneId, userId) => (dispatch) => {
  dispatch({
    type: types.DELETE_SPARE_LIST_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneSpare/deleteSpare/${phoneSpareId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      //dispatch(getSpareListByPhoneTaskId(phoneTaskId))
      dispatch({
        type: types.DELETE_SPARE_LIST_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Spare Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SPARE_LIST_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
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

export const getSpareListByPhoneTaskId = (phoneTaskId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_SPARE_LIST_BY_PHONETASKID_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneSpare/task/spareList/${phoneTaskId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SPARE_LIST_BY_PHONETASKID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SPARE_LIST_BY_PHONETASKID_FAILURE,
        payload: err,
      });
    });
};

export const getSubOrderData = (orderId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_SUBORDER_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/awbPhoneList/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUBORDER_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUBORDER_DATA_FAILURE,
        payload: err,
      });
    });
};
export const startQCStatus = (data) => (dispatch) => {
  // debugger;
  dispatch({ type: types.START_QC_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/qcUpdateInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'QC Started',
        showConfirmButton: false,
        timer: 1500,
      })

      dispatch({
        type: types.START_QC_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.START_QC_STATUS_FAILURE,
      });
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
      Swal.fire({
        icon: 'success',
        title: 'Repair Started',
        showConfirmButton: false,
        timer: 1500,
      })

      // dispatch(getDistributorOrderByDistributorId(id, 0));
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

export const setClearbitData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_DATA,
    payload: data,
  });
};




export const updateTicketStage = (
  data,
    
  sourceStageId,
  destinationStageId,
  opportunityId,
  cb
) => (dispatch) => {
  console.log(sourceStageId, destinationStageId, opportunityId);
  if (destinationStageId === "won") {
    message.success("stage is won");
  }
  if (destinationStageId === "loss") {
    message.error("stage is loss");
  }
  dispatch({
    type: types.UPDATE_TICKET_STAGE_REQUEST,
    payload: {
      sourceStageId,
      destinationStageId,
      opportunityId,
    },
  });
  axios
    .put(
      `${base_url}/ticket/update/stage`,data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      // if (res.data.stageName === "Won") {
      //   message.error("Won");
      // } else {
      //   message.error("Loss");
      // }

      dispatch({
        type: types.UPDATE_TICKET_STAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb(res.data);
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: types.UPDATE_TICKET_STAGE_FAILURE,
        payload: err,
      });
      cb && cb("failure");
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
export const getOrderRecords = (distributorId, type) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/record/count/${distributorId}/${type} `, {
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

export const getProcureRecords = (distributorId, type) => (dispatch) => {
  dispatch({
    type: types.GET_PROCURE_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/record/count/${distributorId}/${type} `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCURE_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PROCURE_RECORDS_FAILURE,
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
export const handleAccountProduction = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCOUNT_PRODUCTION_MODAL,
    payload: modalProps,
  });
};
export const getAllProductList = (category,brand,model) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PRODUCT_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/all-attribute`, 
    // .get(`${base_url2}/product/attributeName/${category}/${brand}/${model}`, 
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PRODUCT_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getProductListByDistributor = (distributorId, orderId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_BY_DISTRIBUTOR_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/product/${distributorId}/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_BY_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_BY_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};
export const saveUnitForCatalogueItem = (data, id, orderId) => (dispatch) => {
  // debugger;
  dispatch({ type: types.SAVE_UNIT_FOR_CATALOGUE_ITEM_REQUEST });
  axios
    .post(`${base_url2}/distributor/product`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Items added successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch(getProductListByDistributor(id, orderId));
      dispatch({
        type: types.SAVE_UNIT_FOR_CATALOGUE_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SAVE_UNIT_FOR_CATALOGUE_ITEM_FAILURE,
      });
    });
};

export const addAllProductInOrder = (data, id, orderId) => (dispatch) => {
  // debugger;
  dispatch({ type: types.ADD_ALL_PRODUCT_FOR_ORDER_REQUEST });
  axios
    .post(`${base_url2}/order/distributor`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Items added to the order',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch(getProductListByDistributor(id, orderId));
      dispatch(getProductionOrder(id, 0))
      dispatch({
        type: types.ADD_ALL_PRODUCT_FOR_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ALL_PRODUCT_FOR_ORDER_FAILURE,
      });
    });
};

export const addProductionLocationInOrder = (data, id, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_PRODUCTION_LOCATION_IN_ORDER_REQUEST,
  });
  axios
    .post(`${base_url2}/orderProductionLocationLink/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderByDistributorId(id, 0))

      dispatch({
        type: types.ADD_PRODUCTION_LOCATION_IN_ORDER_SUCCESS,
        payload: res.data,
      });
      cb && cb()
      message.success("This order has been moved to production !")
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PRODUCTION_LOCATION_IN_ORDER_FAILURE,
      });
    });
};

export const getCatalogueListById = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_LIST_BY_ID_REQUEST,
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
        type: types.GET_PRODUCT_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateOrder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_ORDER_MODAL,
    payload: modalProps,
  });
};

export const getPaymentMode = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_PAYMENT_MODE_REQUEST,
  });
  axios
    .get(`${base_url}/paymentCategory/all/${orgId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PAYMENT_MODE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PAYMENT_MODE_FAILURE,
        payload: err,
      });
    });
};

export const updateOrderStep1 = (data, orderPhoneId) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_ORDER_STEP1_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/orderUpdate/${orderPhoneId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Order Details Updated',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.UPDATE_ORDER_STEP1_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ORDER_STEP1_FAILURE,
        payload: err,
      });
    });
};

export const updateOrderPayment = (data, paymentId) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_ORDER_PAYMENT_AMOUNT_REQUEST,
  });
  axios
    .put(`${base_url2}/orderPayment/paymentUpdate/${paymentId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.UPDATE_ORDER_PAYMENT_AMOUNT_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Order Payment Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ORDER_PAYMENT_AMOUNT_FAILURE,
        payload: err,
      });
    });
};


export const removeOrderAcc = (data,orderPhoneId,distributorId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_ORDER_ACC_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/reinstate/${orderPhoneId}`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    //  window.location.reload()
     dispatch(getDistributorOrderOfHigh(distributorId, 0, "repair","High"))
    // dispatch(getDistributorOrderOfHigh(distributorId, 0, "repair","Low"))
    .then((res) => {
      dispatch({
        type: types.REMOVE_ORDER_ACC_SUCCESS,
        payload: res.data,
      });
      message.success("Confirmation Successfull");
    })
    .catch((err) => {
      dispatch({
        type: types.REMOVE_ORDER_ACC_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
    });
};

export const createOrderForProduction = (data) => (dispatch) => {
  dispatch({
    type: types.CREATE_ORDER_FOR_PRODUCTION_REQUEST,
  });
  axios
    .post(`${base_url2}/order/catalogOrder`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.CREATE_ORDER_FOR_PRODUCTION_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Order Created Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      dispatch({
        type: types.CREATE_ORDER_FOR_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};

export const getProductionOrder = (distributorId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/order/all-phoneOrders/${distributorId}/${pageNo}`,
      {
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
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_ORDER_FAILURE,
        payload: err,
      });
    });
};
export const getProductionOrderDetails = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_ORDER_DETAIL_REQUEST,
  });
  axios
    .get(`${base_url2}/order/product/${orderId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_ORDER_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_ORDER_DETAIL_FAILURE,
        payload: err,
      });
    });
};

export const searchItemInLocation = (data, productId, locationId, orderId) => (dispatch) => {
  dispatch({ type: types.SEARCH_ITEM_IN_LOCATION_REQUEST });
  axios
    .post(`${base_url2}/order/productionProductData`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getDispatchItemList(productId, locationId, orderId))
      dispatch({
        type: types.SEARCH_ITEM_IN_LOCATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SEARCH_ITEM_IN_LOCATION_FAILURE,
      });
    });
};

export const getDispatchItemList = (productId, locationId, orderId) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_ITEM_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/order/productionProductDispatchData/${productId}/${locationId}/${orderId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_ITEM_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DISPATCH_ITEM_LIST_FAILURE,
        payload: err,
      });
    });
};

export const movetoProductionArchieve = (data, productionProductId, orderId) => (
  dispatch
) => {
  dispatch({ type: types.MOVE_TO_PRODUCTION_ARCHIEVE_REQUEST });
  axios
    .put(`${base_url2}/production/updateDispatch/${productionProductId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getProductionOrderDetails(orderId))
      dispatch({
        type: types.MOVE_TO_PRODUCTION_ARCHIEVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.MOVE_TO_PRODUCTION_ARCHIEVE_FAILURE,
        payload: err,
      });
    });
};

export const getLocationByProductId = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_LOCATION_BY_PRODUCTID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/locationData/${productId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.GET_LOCATION_BY_PRODUCTID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_LOCATION_BY_PRODUCTID_FAILURE,
        payload: err,
      });
    });
};

export const updateSpareItem = (data, phoneSpareId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SPARELIST_ITEM_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneSpare/spareUseInd/${phoneSpareId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_SPARELIST_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SPARELIST_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const handleSuborderPhone = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUBORDER_PHONE,
    payload: modalProps,
  });
};

export const getSubOrderPhone = (orderPhoneAwbId) => (dispatch) => {
  dispatch({
    type: types.GET_SUB_ORDER_PHONE_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/phoneDetailsByAwb/${orderPhoneAwbId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.GET_SUB_ORDER_PHONE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_SUB_ORDER_PHONE_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getOrderStatus = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_STATUS_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/orderStatus/${orderId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.GET_ORDER_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_ORDER_STATUS_FAILURE,
        payload: err,
      });
    });
};

export const setContactRoleForAccount = (data, contactId,) => (dispatch) => {
  //console.log(opportunityId, contactId, role);
  console.log(sessionStorage.getItem("token"));
  axios
    .put(
      `${base_url}/distributor/distributor/${contactId}`, data,
      {

        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },

      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_CONTACT_ROLE_BY_ACCOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addOrderProcurementForm = (customer) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_ORDER_PROCUREMENT_REQUEST,
  });

  axios
    .post(`${base_url2}/phoneOrder`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Order Created',
        showConfirmButton: false,
   timer: 1500,
      })
      // dispatch(getOrderRecords(distributorId));
      dispatch({
        type: types.ADD_ORDER_PROCUREMENT_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ORDER_PROCUREMENT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const getOrderProcurement = (distributorId, pageNo, type) => (
  dispatch
) => {
  dispatch({
    type: types.GET_ORDER_PROCUREMENT_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/all-phoneOrders/${distributorId}/${pageNo}/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_PROCUREMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_PROCUREMENT_FAILURE,
        payload: err,
      });
    });
};

export const getChatgpt = (distributorId, pageNo, type) => (
  dispatch
) => {
  dispatch({
    type: types.GET_CHATGPT_REQUEST,
  });
  axios
    .get(`${base_url2}/`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CHATGPT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CHATGPT_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateProcureDetailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PROCURE_ORDER_MODAL,
    payload: modalProps,
  });
};

export const setEditProcure = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PROCURE_EDIT,
    payload: name,
  });
};

export const updateProcureStep1 = (data, orderPhoneId) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_PROCURE_STEP1_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/orderUpdate/${orderPhoneId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Order Details Updated',
        showConfirmButton: false,
   timer: 1500,
      })
      dispatch({
        type: types.UPDATE_PROCURE_STEP1_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
   timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCURE_STEP1_FAILURE,
        payload: err,
      });
    });
};


export const emptyClearbit = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_CLEARBIT_TABLE,

  });
};

export const handleAccountModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCOUNT_MODAL,
    payload: modalProps,
  });
};
export const handleAccountOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCOUNT_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};

export const getBrand = (category) => (dispatch) => {
  dispatch({
      type: types.GET_BRAND_REQUEST,
  });
  axios
      // .get(`${base_url2}/masterlist/brand/drop-down`,
      // .get(`${base_url2}/product/brandName/${category}`, 
      .get(`${base_url2}/supplies/allSuppliesBrand`, 
      {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_BRAND_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_BRAND_FAILURE,
              payload: err,
          });
      });
};

export const getModel = (category,brand) => (dispatch) => {
  dispatch({
      type: types.GET_MODEL_REQUEST,
  });
  axios
      // .get(`${base_url2}/masterlist/model/drop-down/${brandName}`,
      .get(`${base_url2}/masterlist/masterList`,
      // .get(`${base_url2}/product/modelName/${category}/${brand}`,
       {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_MODEL_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_MODEL_FAILURE,
              payload: err,
          });
      });
};

export const getProcureDetails = (orderPhoneId) => (dispatch) => {
  dispatch({
      type: types.GET_PROCURE_DETAILS_REQUEST,
  });
  axios
      .get(`${base_url2}/phoneOrder/procure/order/${orderPhoneId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_PROCURE_DETAILS_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_PROCURE_DETAILS_FAILURE,
              payload: err,
          });
      });
};


export const getQuotationExcelDetails = (orderPhoneId) => (dispatch) => {
  dispatch({
      type: types.GET_QUOTATION_EXCEL_DETAILS_REQUEST,
  });
  axios
      .get(`${base_url2}/quotation/procure/order/${orderPhoneId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_QUOTATION_EXCEL_DETAILS_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_QUOTATION_EXCEL_DETAILS_FAILURE,
              payload: err,
          });
      });
};



export const deleteProcureData = (id,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_PROCURE_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/phoneOrder/procure/order/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Item deleted Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_PROCURE_DATA_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PROCURE_DATA_FAILURE,
        payload: err,
      });
    });
};


export const updateProcureDetails = (data, id,cb) => (dispatch) => {
    
  dispatch({
    type: types.UPDATE_PROCURE_DETAILS_REQUEST,
  });
  axios
    .put(
      `${base_url2}/quotation/procure/order/update/${id}`,
     data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Item updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("Sector has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCURE_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCURE_DETAILS_FAILURE,
      });
    });
};

export const handleProcureDetailsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCURE_DETAILS_MODAL,
    payload: modalProps,
  });
};


export const getQuotationRepairOrder = (distributorId, pageNo, type) => (
  dispatch
) => {
  dispatch({
    type: types.GET_QUOTATION_REPAIR_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/quotation/order/${distributorId}/${pageNo}/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUOTATION_REPAIR_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_QUOTATION_REPAIR_ORDER_FAILURE,
        payload: err,
      });
    });
};


export const getQuotationProcureOrder = (distributorId, pageNo, type) => (
  dispatch
) => {
  dispatch({
    type: types.GET_QUOTATION_PROCURE_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/quotation/order/${distributorId}/${pageNo}/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUOTATION_PROCURE_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_QUOTATION_PROCURE_ORDER_FAILURE,
        payload: err,
      });
    });
};


export const addQuotationCarDetails = (customer, id, cb) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_QUOTATION_CAR_REQUEST,
  });

  axios
    .post(`${base_url2}/DUMMY`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Item list added',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.ADD_QUOTATION_CAR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_QUOTATION_CAR_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

export const addQuotationPhoneDetails = (customer, orderPhoneId, cb) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_QUOTATION_PHONE_DETAILS_REQUEST,
  });

  axios
    .post(`${base_url2}/quotation/procure/order`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getQuotationExcelDetails(orderPhoneId))
      Swal.fire({
        icon: 'success',
        title: 'list added',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.ADD_QUOTATION_PHONE_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_QUOTATION_PHONE_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};


export const ClearSearchedDataOfAccount = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_SEARCHED_DATA_ACCOUNT,
  });
};

export const ClearSearchedInvoice = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_SEARCHED_INVOICE,
  });
};


export const quotationToOrder = ( quotationId,userId ) => (dispatch) => {
  dispatch({ type: types.QUOTATION_TO_ORDER_CONVERT_REQUEST });

  axios
    .put(`${base_url2}/quotation/convert/${quotationId}/${userId} `, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
     
      // message.success("Customer move to Account");
      console.log(res);
      dispatch({
        type: types.QUOTATION_TO_ORDER_CONVERT_SUCCESS,
        payload: quotationId,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.QUOTATION_TO_ORDER_CONVERT_FAILURE,
      });
      // cb && cb("failure");
    });
};




export const addAccountImportForm =
(customer, userId) => (dispatch, getState) => {
  //const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_ACCOUNT_IMPORT_FORM_REQUEST,
  });

  axios
    .post(`${base_url}/excel/import/distributor`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
    //dispatch(getLeads(userId));

     window.location.reload()
      // dispatch(getRecords(userId));
      // dispatch(getLatestCustomers(userId, startDate, endDate));
      // dispatch(getCustomerListByUserId(userId));

      dispatch({
        type: types.ADD_ACCOUNT_IMPORT_FORM_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ACCOUNT_IMPORT_FORM_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const updateAccountPrice = (data, distributorId,  cb) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_ACCOUNT_PRICE_REQUEST,
  });
  axios
    .put(`${base_url2}/distributor/dispatchPayment/${distributorId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_ACCOUNT_PRICE_SUCCESS,
        payload: res.data,
      });
      cb && cb();
      message.success("ACCOUNT price has been updated!")
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_ACCOUNT_PRICE_FAILURE,
        payload: err,
      });
      // cb && cb("failuer", null, null);
    });
};

export const handleStatuShowDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_STATUS_SHOW_DRAWER,
    payload: modalProps
  })
};
export const handlenvoiceOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVOICE_ORDER_DRAWER,
    payload: modalProps
  })
};

export const handleInvoiceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVOICE_DRAWER,
    payload: modalProps
  })
};

export const getProcureStatusItem = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_PROCURE_STATUS_ITEM_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/orders/status/${orderId}`, 
      {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_PROCURE_STATUS_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_PROCURE_STATUS_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const updateOrdrSuplrItems = (data,orderId) => (dispatch) => {
  dispatch({ type: types.UPDATE_ORDR_SUPLR_ITEMS_REQUEST });

  axios
    .put(`${base_url2}/phoneOrder/order/customer/shipping`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      dispatch(getProcureStatusItem(orderId));
      dispatch({
        type: types.UPDATE_ORDR_SUPLR_ITEMS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
  
      dispatch({
        type: types.UPDATE_ORDR_SUPLR_ITEMS_FAILURE,
      });
    });
};

export const getLocationNamesByProductId = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_LOCATION_NAMES_BY_PRODUCTID_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getPoStock/locationList/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOCATION_NAMES_BY_PRODUCTID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOCATION_NAMES_BY_PRODUCTID_FAILURE,
        payload: err,
      });
    });
}

export const getAccountInvoiveList = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_ACCOUNT_INVOICE_REQUEST,
  });
  axios
    .get(`${base_url2}/invoice/noInvoice/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACCOUNT_INVOICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACCOUNT_INVOICE_FAILURE,
        payload: err,
      });
    });
}

export const getGeneratedInvoiveList = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_GENERATED_INVOICE_REQUEST,
  });
  axios
    .get(`${base_url2}/invoice/invoiceList/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_GENERATED_INVOICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_GENERATED_INVOICE_FAILURE,
        payload: err,
      });
    });
}

export const upadtePayment = (data,paymentId,distributorId) => (dispatch) => {
  dispatch({
    type: types.ORDER_INVOICE_REQUEST,
  });
  axios
    .put(`${base_url2}/orderPayment/invoiceUpdate/${paymentId}`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getAccountInvoiveList(distributorId));
      dispatch(getGeneratedInvoiveList(distributorId));
      
      dispatch({
        type: types.ORDER_INVOICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ORDER_INVOICE_FAILURE,
        payload: err,
      });
    });
}

export const getInvoiveL = (procureOrderInvoiceId) => (dispatch) => {
  dispatch({
    type: types.GET_INVOICEL_REQUEST,
  });
  axios
    .get(`${base_url2}/invoice/procureInvoice/${procureOrderInvoiceId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVOICEL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVOICEL_FAILURE,
        payload: err,
      });
    });
}

export const getPaymentClik = (contactUserId,startDate,endDate) => (dispatch) => {
  dispatch({
    type: types.GET_PAYMENTCLICK_REQUEST,
  });
  axios
    .get(`${base_url2}/payment/clicks/${contactUserId}?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PAYMENTCLICK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PAYMENTCLICK_FAILURE,
        payload: err,
      });
    });
}

export const getQuationClik = (contactUserId,startDate,endDate) => (dispatch) => {
  dispatch({
    type: types.GET_QUATATIONCLICK_REQUEST,
  });
  axios
    .get(`${base_url2}/quotation/cart/clicks/${contactUserId}?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUATATIONCLICK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_QUATATIONCLICK_FAILURE,
        payload: err,
      });
    });
}

export const getQuationCheckout = (contactUserId,startDate,endDate) => (dispatch) => {
  dispatch({
    type: types.GET_QUATATIONCHECKOUT_REQUEST,
  });
  axios
    .get(`${base_url2}/quotation/checkout/clicks/${contactUserId}?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUATATIONCHECKOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_QUATATIONCHECKOUT_FAILURE,
        payload: err,
      });
    });
}

export const getQuationShipping = (contactUserId,startDate,endDate) => (dispatch) => {
  dispatch({
    type: types.GET_QUATATIONSHIPPING_REQUEST,
  });
  axios
    .get(`${base_url2}/quotation/quotation/toShipping/clicks/${contactUserId}?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUATATIONSHIPPING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_QUATATIONSHIPPING_FAILURE,
        payload: err,
      });
    });
}

export const getLoginCount = (contactUserId,startDate,endDate) => (dispatch) => {
  dispatch({
    type: types.GET_LOGINCOUNT_REQUEST,
  });
  axios
    .get(`${base_url}/employee/getLoginCount/${contactUserId}?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOGINCOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOGINCOUNT_FAILURE,
        payload: err,
      });
    });
}

export const getInvoiceCount = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_INVOICECOUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/orderPayment/invoiceList/count/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVOICECOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVOICECOUNT_FAILURE,
        payload: err,
      });
    });
}

export const getPiListByDistributor = (distributorId) => (dispatch) => {
  dispatch({
    type: types.GET_PILISTBY_DISTRIBUTOR_REQUEST,
  });
  axios
    .get(`${base_url2}/pi/piListByDistriubutor/${distributorId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PILISTBY_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PILISTBY_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
}

export const getPiListByOrder = (phoneOrderId) => (dispatch) => {
  dispatch({
    type: types.GET_PILISTBY_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/pi/piListByOrder/${phoneOrderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PILISTBY_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PILISTBY_ORDER_FAILURE,
        payload: err,
      });
    });
}

export const addNewList = (customer) => (dispatch) => {

  dispatch({
    type: types.ADD_NEWLIST_REQUEST,
  });

  axios
    .post(`${base_url2}/phone/row-add`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     // dispatch(getInventorylist(userId,"0"))
      Swal.fire({
        icon: 'success',
        title: 'list added',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.ADD_NEWLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_NEWLIST_FAILURE,
        payload: err,
      });
      //cb && cb();
    });
};

export const distributorAccountCredit = ( data,distributorId) => (dispatch, getState) => {
  dispatch({
    type: types.DISTRIBUTOR_ACCOUNT_CREDIT_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/distributor/distributoCreditInd/update/${distributorId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DISTRIBUTOR_ACCOUNT_CREDIT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DISTRIBUTOR_ACCOUNT_CREDIT_TOGGLE_FAILURE,
        payload: err,
      });
    })
}

export const paidUnpaidInvoice = ( data,procureOrderInvoiceId) => (dispatch, getState) => {
  dispatch({
    type: types.PAID_UNPAID_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/invoice/procure/${procureOrderInvoiceId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.PAID_UNPAID_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PAID_UNPAID_TOGGLE_FAILURE,
        payload: err,
      });
    })
}

export const getStatusTimeline = (orderPhoneId) => (dispatch) => {
  dispatch({
      type: types.GET_STATUS_TIMELINE_REQUEST,
  });
  axios
      .get(`${base_url2}/orderPayment/process/${orderPhoneId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_STATUS_TIMELINE_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_STATUS_TIMELINE_FAILURE,
              payload: err,
          });
      });
};

export const handleAccountAddress = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCOUNT_ADDRESS_MODAL,
    payload: modalProps,
  });
};

export const searchimeiNamePhone = (imei,orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_SEARCH_IMEIPHONE_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/search/${imei}/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_SEARCH_IMEIPHONE_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_SEARCH_IMEIPHONE_FAILURE,
        payload: err,
      });
    });
};

export const ClearPhoneDataOfrefurbish = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_PHONEREDUCER_DATA_REFURBISH,
  });
};

export const ClearReducerData= () => (dispatch) => {
  dispatch({
    type: types.CLAER_REDUCERS_DATA,
  });
};

export const searchCustomerOrderNoData = (imei) => (dispatch) => {
  dispatch({
    type: types.SEARCH_CUSTOMER_ORDERNO_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/ORDER/DUMMY/${imei}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.SEARCH_CUSTOMER_ORDERNO_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
     
      dispatch({
        type: types.SEARCH_CUSTOMER_ORDERNO_DATA_FAILURE,
        payload: err,
      });
    });
};






export const getDistibutorBarChart = (distributorId,productId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTION_BAR_CHART_REQUEST,
  });
  axios
    .get(`${base_url}/phoneOrder/monthlyUnits/${distributorId}/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTION_BAR_CHART_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DISTRIBUTION_BAR_CHART_FAILURE,
        payload: err,
      });
    });
};

export const getSearchDistributor = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_SEARCH_DISTRIBUTIOR_REQUEST,
  });
  axios
    .get(`${base_url2}/distributor/drop-down/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEARCH_DISTRIBUTIOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SEARCH_DISTRIBUTIOR_FAILURE,
        payload: err,
      });
    });
};

export const codInventoryOrder = (data,cb) => (dispatch) => {
  dispatch({ type: types.ADD_COD_INVENTORY_REQUEST });

  axios
    .post(`${base_url2}/payment/protal/prosess `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
  console.log(res);
Swal.fire({
  icon: 'success',
  title: `${res.data.orderId} - Quotation converted successfully`,
  showConfirmButton: false,
  timer: 1500,
})

      console.log("resp",res)
  // if(res.data){
  //   const orderPhoneId = localStorage.getItem("orderPhoneId");
  //   localStorage.removeItem('orderPhoneId') 
  // }      
  dispatch({
        type: types.ADD_COD_INVENTORY_SUCCESS,
        payload: res.data,
      });
      //cb && cb ("success")
    })
    .catch((err) => {
      console.log("errr",err,err && err.response && err.response.data.error)
      dispatch({
        type: types.ADD_COD_INVENTORY_FAILURE,
      });
    //  cb && cb ("error",err && err.response && err.response.data.error)
    });
};       
export const updateAccountUser = ( id,userId) => (dispatch) => {
  dispatch({ type: types.UPDATE_ACCOUNT_USER_REQUEST });
  axios
    .put(`${base_url2}/distributor/changesAssignTo/${id}/${userId}`, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Account User updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      console.log(res);
      dispatch({
        type: types.UPDATE_ACCOUNT_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ACCOUNT_USER_FAILURE,
        payload: err,
      });
    });
};




export const getTicket = (orgId) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_TICKET_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/ticket/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TICKET_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_TICKET_LIST_FAILURE,
        payload: err,
      });
    });
};
export const addPaidRepairOrder = (data,orderId) => (dispatch) => {
  dispatch({ type: types.ADD_PAID_BY_DISTRIBUTOR_ID_REQUEST });
  axios
    .post(`${base_url2}/orderPayment/payment`,
    // .put(`${base_url2}/invoice/procure/${procureOrderInvoiceId}`,
       data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDistributorOrderPayment(orderId))
      dispatch({
        type: types.ADD_PAID_BY_DISTRIBUTOR_ID_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Payment Successful!',
        // showConfirmButton: false,
        // timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PAID_BY_DISTRIBUTOR_ID_FAILURE,
      });
    });
};