import * as types from "./CollectionActionTypes";
import { base_url, base_url2 } from "../../Config/Auth";
import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

export const setCollectionViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_VENDOR_VIEW_TYPE, payload: viewType });

export const setCustomerSubViewType = (subViewCustomer) => (dispatch) =>
  dispatch({
    type: types.SET_CUSTOMER_SUB_VIEW_TYPE,
    payload: subViewCustomer,
  });

export const setDistributorViewType = (subViewDistributor) => (dispatch) =>
  dispatch({
    type: types.SET_DISTRIBUTOR_SUB_VIEW_TYPE,
    payload: subViewDistributor,
  });

export const getTodayCustomer = () => (dispatch) => {
  dispatch({
    type: types.GET_TODAY_CUSTOMER_REQUEST,
  });
  axios
    .get(`${base_url}/order/payment/contact`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TODAY_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TODAY_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};

export const getAllCustomer = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CUSTOMER_REQUEST,
  });
  axios
    .get(`${base_url}/order/payment/contact`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};

export const getTodayDistributor = () => (dispatch) => {
  dispatch({
    type: types.GET_TODAY_DISTRIBUTOR_REQUEST,
  });
  axios
    .get(`${base_url2}/orderPayment/payment/distributor`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TODAY_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TODAY_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};

export const getAllDistributor = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_DISTRIBUTOR_REQUEST,
  });
  axios
    .get(`${base_url}/order/payment/distributor`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};

export const paymentToggleCustomerToday = (paymentId, payment) => (
  dispatch
) => {
  dispatch({
    type: types.PAYMENT_TOGGLE_CUSTOMER_TODAY_REQUEST,
  });
  axios
    .post(`${base_url}/order/payment/${paymentId}`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.PAYMENT_TOGGLE_CUSTOMER_TODAY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PAYMENT_TOGGLE_CUSTOMER_TODAY_FAILURE,
        payload: err,
      });
    });
};

export const paymentToggleCustomerAll = (vendor) => (dispatch) => {
  dispatch({
    type: types.PAYMENT_TOGGLE_CUSTOMER_ALL_REQUEST,
  });
  axios
    // .post(`${base_url}/vendor/checkCOBT`, vendor)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.PAYMENT_TOGGLE_CUSTOMER_ALL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PAYMENT_TOGGLE_CUSTOMER_ALL_FAILURE,
        payload: err,
      });
    });
};

export const paymentToggleDistributorToday = (vendor) => (dispatch) => {
  dispatch({
    type: types.PAYMENT_TOGGLE_DISTRIBUTOR_TODAY_REQUEST,
  });
  axios
    // .post(`${base_url}/vendor/checkCOBT`, vendor)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.PAYMENT_TOGGLE_DISTRIBUTOR_TODAY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PAYMENT_TOGGLE_DISTRIBUTOR_TODAY_FAILURE,
        payload: err,
      });
    });
};

export const paymentToggleDistributorAll = (vendor) => (dispatch) => {
  dispatch({
    type: types.PAYMENT_TOGGLE_DISTRIBUTOR_ALL_REQUEST,
  });
  axios
    // .post(`${base_url}/vendor/checkCOBT`, vendor)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.PAYMENT_TOGGLE_DISTRIBUTOR_ALL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PAYMENT_TOGGLE_DISTRIBUTOR_ALL_FAILURE,
        payload: err,
      });
    });
};
/**
 * Payment in customer
 */
export const linkPaymentByFinance = (data, paymentId, userId, cb) => (
  dispatch
) => {
  // debugger;
  dispatch({
    type: types.LINK_PAYMENT_BY_FINANCE_REQUEST,
  });
  axios
    .put(`${base_url}/order/payment/${paymentId}/${userId}`, data)
    .then((res) => {
      dispatch({
        type: types.LINK_PAYMENT_BY_FINANCE_SUCCESS,
        payload: res.data,
      });
      message.success("Confirmation Successfull");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PAYMENT_BY_FINANCE_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
    });
};
/**
 * Payment in distributor
 */
export const linkDistributorPaymentByFinance = (
  data,
  paymentId,
  userId,
  type,

) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.LINK_DISTRIBUTOR_PAYMENT_BY_FINANCE_REQUEST,
  });
  axios
    .put(`${base_url2}/orderPayment/payment/${paymentId}/${userId}/${type}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.LINK_DISTRIBUTOR_PAYMENT_BY_FINANCE_SUCCESS,
        payload: res.data,
      });
      message.success("Confirmation Successfull");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DISTRIBUTOR_PAYMENT_BY_FINANCE_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
    });
};

export const getAllCustomersList = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CUSTOMER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/contact/all-contacts`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_CUSTOMER_LIST_FAILURE,
        payload: err,
      });
    });
};
export const inputCustomerAllDataSearch = (customerName) => (dispatch) => {
  dispatch({
    type: types.INPUT_CUSTOMER_ALL_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/contact/contactName/${customerName}`)
    .then((res) => {
      dispatch({
        type: types.INPUT_CUSTOMER_ALL_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_CUSTOMER_ALL_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

// real time Collection Payment data

export const getRealTimeCollectionData = (data, a) => (dispatch) => {
  console.log(data);
  dispatch({
    type: types.GET_REAL_TIME_COLLECTION_DATA_REQUEST,
  });
  if (a === "customer") {
    dispatch({
      type: types.GET_REAL_TIME_COLLECTION_CUSTOMER_DATA_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: types.GET_REAL_TIME_COLLECTION_DATA_SUCCESS,
      payload: data,
    });
  }

  dispatch({
    type: types.GET_REAL_TIME_COLLECTION_DATA_FAILURE,
    // payload: err,
  });
  // });
};

export const inputCustomerReceivableDataSearch = (customerName) => (
  dispatch
) => {
  dispatch({
    type: types.INPUT_CUSTOMER_RECEIVABLE_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/order/orderPayment/contactName/${customerName}`)
    .then((res) => {
      dispatch({
        type: types.INPUT_CUSTOMER_RECEIVABLE_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_CUSTOMER_RECEIVABLE_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const CustomerCollectionArchiveToday = (payment) => (dispatch) => {
  dispatch({
    type: types.CUSTOMER_COLLECTION_ARCHIVE_REQUEST,
  });
  axios
    .post(`${base_url}/report/today-orderPaymentList`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.CUSTOMER_COLLECTION_ARCHIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CUSTOMER_COLLECTION_ARCHIVE_FAILURE,
        payload: err,
      });
    });
};

//Distributor-Collection

export const DistributorCollectionArchiveToday = (payment) => (dispatch) => {
  dispatch({
    type: types.DISTRIBUTOR_COLLECTION_ARCHIVE_REQUEST,
  });
  axios
    .post(`${base_url2}/orderPayment/today-orderPaymentList`, payment, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DISTRIBUTOR_COLLECTION_ARCHIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DISTRIBUTOR_COLLECTION_ARCHIVE_FAILURE,
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

export const inputDistributorAllDataSearch = (distributorName) => (
  dispatch
) => {
  dispatch({
    type: types.INPUT_DISTRIBUTOR_ALL_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/distributor/distributorName/${distributorName}`)
    .then((res) => {
      dispatch({
        type: types.INPUT_DISTRIBUTOR_ALL_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_DISTRIBUTOR_ALL_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const inputDistributorReceivableDataSearch = (distributorName) => (
  dispatch
) => {
  dispatch({
    type: types.INPUT_DISTRIBUTOR_RECEIVABLE_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/order/orderPayment/contactName/${distributorName}`)
    .then((res) => {
      dispatch({
        type: types.INPUT_DISTRIBUTOR_RECEIVABLE_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_DISTRIBUTOR_RECEIVABLE_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getRealTimeCollectionToggle = (data, a) => (dispatch) => {
  console.log(data);
  dispatch({
    type: types.GET_REAL_TIME_COLLECTION_TOGGLE_DATA_REQUEST,
  });
  if (a === "customer") {
    dispatch({
      type: types.GET_REAL_TIME_COLLECTION_TOGGLE_CUSTOMER_DATA_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: types.GET_REAL_TIME_COLLECTION_TOGGLE_DATA_SUCCESS,
      payload: data,
    });
  }

  dispatch({
    type: types.GET_REAL_TIME_COLLECTION_TOGGLE_DATA_FAILURE,
    // payload: err,
  });
  // });
};

export const CustomerCollectionReceivableToday = (payment) => (dispatch) => {
  dispatch({
    type: types.CUSTOMER_COLLECTION_RECEIVABLE_REQUEST,
  });
  axios
    .post(`${base_url}/report/orderPaymentList/notApperovedByFinance`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.CUSTOMER_COLLECTION_RECEIVABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CUSTOMER_COLLECTION_RECEIVABLE_FAILURE,
        payload: err,
      });
    });
};

export const DistributorCollectionReceivableToday = (payment) => (dispatch) => {
  dispatch({
    type: types.DISTRIBUTOR_COLLECTION_RECEIVABLE_REQUEST,
  });
  axios
    .post(`${base_url2}/report/orderPaymentList/notApperovedByFinance`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DISTRIBUTOR_COLLECTION_RECEIVABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DISTRIBUTOR_COLLECTION_RECEIVABLE_FAILURE,
        payload: err,
      });
    });
};

export const getCustomerCreditMemo = () => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_CREDIT_MEMO_REQUEST,
  });
  axios
    .get(`${base_url}/orderReturn`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_CREDIT_MEMO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_CREDIT_MEMO_FAILURE,
        payload: err,
      });
    });
};

export const getDistributorCreditMemo = () => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_CREDIT_MEMO_REQUEST,
  });
  axios
    .get(`${base_url}/`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_CREDIT_MEMO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_CREDIT_MEMO_FAILURE,
        payload: err,
      });
    });
};

export const getCollection = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_COLLECTION_REQUEST,
  });
  axios
    .get(`${base_url2}/creditMemo/all-creditMemo/${orgId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COLLECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COLLECTION_FAILURE,
        payload: err,
      });
    });
};

export const getCloseCollection = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_CLOSE_COLLECTION_REQUEST,
  });
  axios
    .get(`${base_url}/creditMemo/closed/all-creditMemo/${orgId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    }  )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CLOSE_COLLECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CLOSE_COLLECTION_FAILURE,
        payload: err,
      });
    });
};

export const getRealTimePaymentDelete = (data, a) => (dispatch) => {
  console.log(data);
  dispatch({
    type: types.GET_REAL_TIME_CUSTOMER_PAYMENT_DELETE_REQUEST,
  });
  if (a === "customer") {
    dispatch({
      type: types.GET_REAL_TIME_CUSTOMER_PAYMENT_DELETE_SUCCESS,
      payload: data,
    });
  } else {
    dispatch({
      type: types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_DELETE_SUCCESS,
      payload: data,
    });
  }

  dispatch({
    type: types.GET_REAL_TIME_CUSTOMER_PAYMENT_DELETE_FAILURE,
    // payload: err,
  });
  // });
};

export const CustomerCollectionReturn = (payment) => (dispatch) => {
  dispatch({
    type: types.CUSTOMER_COLLECTION_RETURN_REQUEST,
  });
  axios
    .post(`${base_url}/report/RETURN`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.CUSTOMER_COLLECTION_RETURN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CUSTOMER_COLLECTION_RETURN_FAILURE,
        payload: err,
      });
    });
};

export const distributorCollectionReturn = (payment) => (dispatch) => {
  dispatch({
    type: types.DISTRIBUTOR_COLLECTION_RETURN_REQUEST,
  });
  axios
    .post(`${base_url}/report/RETURN`, payment)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DISTRIBUTOR_COLLECTION_RETURN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DISTRIBUTOR_COLLECTION_RETURN_FAILURE,
        payload: err,
      });
    });
};

export const handleDistributorProductModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISTRIBUTOR_PRODUCT_MODAL,
    payload: modalProps,
  });
};

// export const handleCustomerProductModal = (modalProps) => (dispatch) => {
//   dispatch({
//     type: types.HANDLE_CUSTOMER_PRODUCT_MODAL,
//     payload: modalProps,
//   });
// };