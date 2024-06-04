import * as types from "./SuppliersActionType";
import { base_url, base_url2 } from "../../../Config/Auth";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import Swal from "sweetalert2";

export const setSuppliersViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_SUPPLIERS_VIEW_TYPE, payload: viewType });

export const handleSuppliersModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIERS_MODAL,
    payload: modalProps,
  });
};

// add supplier

export const addSuppliers = (data, userId) => (dispatch) => {
  dispatch({ type: types.ADD_SUPPLIERS_REQUEST });
  axios
    .post(`${base_url2}/supplier `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_SUPPLIERS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIERS_FAILURE,
        payload: err,
      });
      // cb();
    });
};

export const updateQualitySuppliers = (data, userId) => (dispatch) => {
  dispatch({ type: types.UPDATE_QUALITY_SUPPLIERS_REQUEST });
  axios
    .post(`${base_url2}/po/quality/updatePrice `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_QUALITY_SUPPLIERS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_QUALITY_SUPPLIERS_FAILURE,
        payload: err,
      });
      // cb();
    });
};

// get suppliers

export const getSuppliersList = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIERS_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/user/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIERS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIERS_LIST_FAILURE,
        payload: err,
      });
    });
};


export const getSuppliersPriceList = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIERS_PRICE_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/po/latest-poSupplierDetails/${supplierId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIERS_PRICE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIERS_PRICE_LIST_FAILURE,
        payload: err,
      });
    });
};

/**
 * get supplier details by supplierId
 */
export const getSupplierBySupplierId = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIER_BY_SUPPLIER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/${supplierId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_BY_SUPPLIER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIER_BY_SUPPLIER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * handle order modal
 */
export const handleLinkSuppliersOrderConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_ORDER_CONFIGURE_MODAL,
    payload: modalProps,
  });
};

export const handlePoLocationModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_PO_LOCATION_MODAL,
    payload: modalProps,
  });
};
export const handleLinkSuppleirCatalogueModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_SUPPLIER_CATALOGUE_MODAL,
    payload: modalProps,
  });
};


/**
 *  get supplies data
 */

export const setClearbitPurchaseData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_PURCHASE_DATA,
    payload: data,
  });
};

export const setClearbitPurchaseProductData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_PURCHASE_PRODUCT_DATA,
    payload: data,
  });
};

/**
 *  add supplies to supplier
 */

export const linkPurchaseToSuppliers = (data, supplierId) => (dispatch) => {
  console.log("inside add purchase");
  dispatch({ type: types.LINK_PURCHASE_SUPPLIERS_REQUEST });
  axios
    .post(`${base_url2}/po/createPo`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Item added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(getGeneratorSuppliersList(res.data));
      dispatch(getPurchaseSuppliersList(supplierId))
      dispatch({
        type: types.LINK_PURCHASE_SUPPLIERS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PURCHASE_SUPPLIERS_FAILURE,
        payload: err,
      });
      // cb();
    });
};

//get purchase to cart table

export const getGeneratorSuppliersList = (poSupplierDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_GENERATOR_SUPPLIERS_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/po/poSupplierDetails/${poSupplierDetailsId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_GENERATOR_SUPPLIERS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_GENERATOR_SUPPLIERS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const movePoToInventory = (data, supplierId) => (dispatch) => {
  dispatch({
    type: types.MOVE_TO_INVENTORY_REQUEST,
  });
  axios
    .post(`${base_url2}/poInventoryLocationLink/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'PO released ',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(getPurchaseSuppliersList(supplierId))
      dispatch({
        type: types.MOVE_TO_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.MOVE_TO_INVENTORY_FAILURE,
        payload: err,
      });
    });
};

//get catalogue in cart

export const getGeneratorCatalogueSuppliersList = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_GENERATOR_CATALOGUE_SUPPLIERS_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/purchase/product/supplier/${supplierId}/catalogue`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_GENERATOR_CATALOGUE_SUPPLIERS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_GENERATOR_CATALOGUE_SUPPLIERS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleSupplierSubscriptionModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIERS_SUBSCRIPTION_MODAL,
    payload: modalProps,
  });
};

// generate purchase supplier list

export const generateOrderBySupplierId = (data, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.GENERATE_ORDER_BY_SUPPLIER_ID_REQUEST });
  axios
    .post(`${base_url}/purchase/supplier`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GENERATE_ORDER_BY_SUPPLIER_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GENERATE_ORDER_BY_SUPPLIER_ID_FAILURE,
      });
      cb && cb("failure");
    });
};

//get all supplier purchase list

export const getPurchaseSuppliersList = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_PURCHASE_SUPPLIERS_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/po/poSupplierList/${supplierId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PURCHASE_SUPPLIERS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PURCHASE_SUPPLIERS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getSuppliesListBySupplier = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_LIST_BY_SUPPLIER_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/supplies/${supplierId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_LIST_BY_SUPPLIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIES_LIST_BY_SUPPLIER_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateSupplierModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SUPPLIERS_MODAL,
    payload: modalProps,
  });
};

export const setEditSupplier = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SUPPLIER_EDIT,
    payload: name,
  });
};

export const handleLinkSupplierSuppliesConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_SUPPLIES_CONFIGURE_MODAL,
    payload: modalProps,
  });
};

export const handleLinkSupplierCatalogueConfigureModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_LINK_CATALOGUE_CONFIGURE_MODAL,
    payload: modalProps,
  });
};

//link supplies to supplier

export const addSuppliesToSupplier = (data, supplierId) => (dispatch) => {
  console.log("inside add purchase");
  dispatch({ type: types.ADD_SUPPLIES_TO_SUPPLIER_REQUEST });
  axios
    .post(`${base_url}/supplier/supplies`, data,)
    .then((res) => {
      console.log(res);
      dispatch(getSuppliesList(supplierId));
      dispatch(getProductList(supplierId))
      dispatch({
        type: types.ADD_SUPPLIES_TO_SUPPLIER_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIES_TO_SUPPLIER_FAILURE,
        payload: err,
      });
      // cb();
    });
};

// get all supplier list

export const getSuppliesList = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/supplies/${supplierId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIES_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getProductList = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/product/supplies/${supplierId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleFeedbackModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_FEEDBACK_MODAL,
    payload: modalProps,
  });
};

export const getFeedbackBySupplierId = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_FEEDBACK_BY_SUPPLIER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/feedback/${supplierId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FEEDBACK_BY_SUPPLIER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FEEDBACK_BY_SUPPLIER_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * handle Distributor Activity modal action
 */
export const handleSuppliersActivityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIERS_ACTIVITY_MODAL,
    payload: modalProps,
  });
};

/**
 * request for adding a CALL
 */
export const addSuppliersActivityCall = (call, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_SUPPLIERS_ACTIVITY_CALL_REQUEST,
  });
  axios
    .post(`${base_url2}/call`, call, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SUPPLIERS_ACTIVITY_CALL_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIERS_ACTIVITY_CALL_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

/**
 * request for adding a EVENT
 */
export const addSuppliersActivityEvent = (event, cb) => (dispatch) => {
  console.log("inside addEvent");
  dispatch({
    type: types.ADD_SUPPLIERS_ACTIVITY_EVENT_REQUEST,
  });
  axios
    .post(`${base_url2}/event`, event, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SUPPLIERS_ACTIVITY_EVENT_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIERS_ACTIVITY_EVENT_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};
/**
 * request for adding a task
 */
export const addSuppliersActivityTask = (task, cb) => (dispatch) => {
  console.log("inside addTask");
  dispatch({
    type: types.ADD_SUPPLIERS_ACTIVITY_TASK_REQUEST,
  });
  axios
    .post(`${base_url2}/task`, task, {})
    .then((res) => {
      console.log(res);
      // dispatch(getActivityListByDistributorId(distributorId));
      dispatch({
        type: types.ADD_SUPPLIERS_ACTIVITY_TASK_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIERS_ACTIVITY_TASK_FAILURE,
        payload: err,
      });
      cb && cb();
    });
};

export const getAllSuppliersList = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_SUPPLIERS_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/all-suppliers/${orgId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_ALL_SUPPLIERS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_ALL_SUPPLIERS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const inputDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/supplierName/${name}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
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

export const updateSupplier = (data, supplierId, userId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SUPPLIER_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url}/supplier/${supplierId}`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getDistributorsByUserId(userId));
      dispatch({
        type: types.UPDATE_SUPPLIER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SUPPLIER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * get notes list by supplierId
 */
export const getNotesListBySupplierId = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_SUPPLIER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/notes/${supplierId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_SUPPLIER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_SUPPLIER_ID_FAILURE,
        payload: err,
      });
    });
};

export const setClearbitPurchaseSupplierData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_PURCHASE_SUPPLIER_DATA,
    payload: data,
  });
};

//Document

export const handleSupplierDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIER_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

export const handleSupplierExcleUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIER_EXCLE_UPLOAD_MODAL,
    payload: modalProps,
  });
};

//add supplier document

export const addSupplierDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_SUPPLIER_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/supplier/suppliers/document/`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SUPPLIER_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // dispatch(getCandidateDocument(candidateId));
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIER_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * supplies delete modal
 */
export const handleSuppliesDeleteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIES_DELETE_MODAL,
    payload: modalProps,
  });
};

/**
 *  supplies delete url
 */

export const deleteSuppliesData = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.DELETE_SUPLLIES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/supplies/${suppliesId}`,)
    .then((res) => {
      console.log(res);
      // dispatch(getOrderTableData(customerId));
      dispatch({
        type: types.DELETE_SUPLLIES_DATA_SUCCESS,
        payload: suppliesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SUPLLIES_DATA_FAILURE,
        payload: err,
      });
    });
};

/**
 * get deleted supplies list
 */
export const getDeletedSuppliesBySuppliesId = () => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_SUPPLIES_BY_SUPPLIES_ID_REQUEST,
  });
  axios
    .get(`${base_url}/supplies/supplier/deletedSuppliesHistory`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_SUPPLIES_BY_SUPPLIES_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_SUPPLIES_BY_SUPPLIES_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Purchase delete modal
 */
export const handlePurchaseDeleteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PURCHASE_DELETE_MODAL,
    payload: modalProps,
  });
};

/**
 *  supplies delete url
 */

export const deletePurchaseData = (data, purchaseId) => (dispatch) => {
  dispatch({
    type: types.DELETE_PURCHASE_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/purchase/${purchaseId}`, data)
    .then((res) => {
      console.log(res);
      dispatch(getDeletedPurchaseById());
      dispatch({
        type: types.DELETE_PURCHASE_DATA_SUCCESS,
        payload: purchaseId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PURCHASE_DATA_FAILURE,
        payload: err,
      });
    });
};

/**
 * get deleted supplies list
 */
export const getDeletedPurchaseById = () => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_PURCHASE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/purchase/deletePurchaseHistory`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_PURCHASE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_PURCHASE_BY_ID_FAILURE,
        payload: err,
      });
    });
};
//get customer documnet
export const getSupplierDocument = (supplierId) => (dispatch) => {
  dispatch({ type: types.GET_SUPPLIER_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url2}/supplier/suppliers/document/${supplierId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIER_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const handleSupplierContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIER_CONTACT_MODAL,
    payload: modalProps,
  });
};

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
/**
 *  adding a Contact for distributor
 */
export const addSupplierContact = (supplier, id, type) => (dispatch) => {
  dispatch({
    type: types.ADD_SUPPLIER_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url2}/contactPerson`, supplier,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      // if (type === "distributor") {
      //   dispatch(getContactDistributorList(id));
      // } else {
      //   dispatch(getSupplierContactList(id));
      // }
      dispatch({
        type: types.ADD_SUPPLIER_CONTACT_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Contact created Successfully!',
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIER_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const applyForLoginInContact = (data, contactPersonId, userId, id) => (dispatch) => {
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
      Swal.fire({
        icon: 'success',
        title: 'Applied for login',
        showConfirmButton: true,
      })
      dispatch(getContactDistributorList(id))
      dispatch({
        type: types.APPLY_FOR_LOGIN_IN_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.APPLY_FOR_LOGIN_IN_CONTACT_FAILURE,
        payload: err,
      });
    });
};

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
/**
 * get all contact Supplier list
 */
export const getSupplierContactList = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIER_CONTACT_LIST_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/contactPerson/${supplierId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_CONTACT_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIER_CONTACT_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};
//GET_all SUPPLIER
export const getAllSupplier = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_SUPPLIER_REQUEST,
  });
  axios
    .get(`${base_url}/abcds`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_SUPPLIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_SUPPLIER_FAILURE,
        payload: err,
      });
    });
};

//SEARCH CONTACTS OF SUPPLIER
export const searchDispatchItem = (data) => (dispatch) => {
  dispatch({ type: types.SEARCH_DISPATCH_ITEM_REQUEST });
  axios
    // .post(`${base_url}/shipper/shipper-list-report`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.SEARCH_DISPATCH_ITEM_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SEARCH_DISPATCH_ITEM_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

//get contacts of Supplier
export const getContactsOfSupplier = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACTS_OF_SUPPLIER_REQUEST,
  });
  axios
    .get(`${base_url}/shipper/contactPerson/${supplierId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACTS_OF_SUPPLIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACTS_OF_SUPPLIER_FAILURE,
        payload: err,
      });
    });
};

/*get all the contact of the Supplier */
export const getContactSupplierList = (supplierId) => (dispatch, getState) => {
  const supplierId = getState().supplier.allSupplier.supplierId;
  dispatch({
    type: types.GET_CONTACT_SUPPLIER_LIST_BY_ID_REQUEST,
  });
  axios
    // .get(`${base_url}/shipper/contactPerson/${supplierId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_SUPPLIER_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_SUPPLIER_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * set Shipper dashboard type to individual or all
 */
export const setSuppliersDashboardType = (type) => (dispatch) =>
  dispatch({
    type: types.SET_SUPPLIER_DASHBOARD_TYPE,
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

//SupplierHistory
export const getSupplierHistory = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIER_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/history/${supplierId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIER_HISTORY_FAILURE,
        payload: err,
      });
    });
};

/**
 * get activity list by SuppliersId
 */

export const getActivityListBySupplierId = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_ACTIVITY_LIST_BY_SUPPLIERID_REQUEST,
  });
  axios
    .get(`${base_url2}/activity/supplier/${supplierId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_SUPPLIERID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_SUPPLIERID_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateSupplierContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SUPPLIERS_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const setEditSupplierContact = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SUPPLIER_CONTACT_EDIT,
    payload: name,
  });
};

export const updateSupplierContact = (data, contactPersonId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SUPPLIER_CONTACT_REQUEST,
  });
  axios
    .put(`${base_url}/contactPerson/${contactPersonId}`, data)
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch({
        type: types.UPDATE_SUPPLIER_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SUPPLIER_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateSupplierSuppliesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SUPPLIERS_SUPPLIES_MODAL,
    payload: modalProps,
  });
};

export const setEditSupplierSupplies = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SUPPLIER_SUPPLIES_EDIT,
    payload: name,
  });
};

export const updatePriceOfPoItem = (data) => (dispatch) => {
  dispatch({
    type: types.UPDATE_PRICE_OF_PO_ITEM_REQUEST,
  });
  axios
    .put(`${base_url2}/po/updatePrice`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Price updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch({
        type: types.UPDATE_PRICE_OF_PO_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PRICE_OF_PO_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const addTermsnCondition = (data, poSupplierDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_TERMS_N_CONDITION_REQUEST,
  });
  axios
    .post(`${base_url2}/po/termAndCondition`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Added Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch(getTermsnConditionOfPo(poSupplierDetailsId))
      dispatch({
        type: types.ADD_TERMS_N_CONDITION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TERMS_N_CONDITION_FAILURE,
        payload: err,
      });
    });
};

export const getTermsnConditionOfPo = (poSupplierDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_TERMS_AND_CONDITION_OF_PO_REQUEST,
  });
  axios
    .get(`${base_url2}/po/termAndCondition/${poSupplierDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TERMS_AND_CONDITION_OF_PO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TERMS_AND_CONDITION_OF_PO_FAILURE,
        payload: err,
      });
    });
};

export const getPurchaseOrderDetailsList = (pOSupplierDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_PURCHASE_ORDER_DETAILS_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/po/poSupplierDetails/${pOSupplierDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PURCHASE_ORDER_DETAILS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PURCHASE_ORDER_DETAILS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const emptysUPPLIERS = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_SUPPLIER_LIST,
  });
};

export const emptysUPPLIERSPrice = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_SUPPLIER_PRICE_LIST,
  });
};


export const handlePoListModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PO_LIST_MODAL,
    payload: modalProps,
  });
};

export const handleTermsnConditionModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TERMS_CONDITION_MODAL,
    payload: modalProps,
  });
};

export const addCurrencyInPo = (data, poSupplierDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_CURRENCY_IN_PO_REQUEST,
  });
  axios
    .put(`${base_url2}/po/updateCurrency/${poSupplierDetailsId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Currency updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })// dispatch(getTermsnConditionOfPo(poSupplierDetailsId))
      dispatch({
        type: types.ADD_CURRENCY_IN_PO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CURRENCY_IN_PO_FAILURE,
        payload: err,
      });
    });
};

export const getTodayPurchaseOrder = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_PURCHASE_ORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/po/today/count/${supplierId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PURCHASE_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PURCHASE_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const handleSuppleirSuppliesDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIERS_SUPPLIES_DRAWER,
    payload: modalProps,
  });
};

export const getSupplierSupplies = (supplierId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIER_SUPPLIES_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/link-with-supplier/${supplierId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_SUPPLIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SUPPLIER_SUPPLIES_FAILURE,
        payload: err,
      });
    });
};
export const setSupplierSuppliesType = (data) => (dispatch) => {
  dispatch({ type: types.SET_SUPPLIER_SUPPLIES_REQUEST });
  axios
    .post(
      `${base_url2}/supplies/link-with-supplier`, data,
      {

        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },

      })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.SET_SUPPLIER_SUPPLIES_SUCCESS,
        payload: res.data,
      });
      Swal({
        icon: 'success',
        title: 'Satus has been changed successfully!',
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SET_SUPPLIER_SUPPLIES_FAILURE,
        payload: err,
      });
    });
};
export const getSupplierCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIER_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/user/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIER_COUNT_FAILURE,
        payload: err,
      });
    });
};
export const getSupplierAllCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_SUPPLIER_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/all-suppliers/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_SUPPLIER_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_SUPPLIER_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getSupplierDeletedCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_SUPPLIER_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/deleted/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_SUPPLIER_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_SUPPLIER_COUNT_FAILURE,
        payload: err,
      });
    });
};
export const getSupplierSuppliesQuality = () => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIER_SUPPLIES_QUALITY_REQUEST,
  });
  axios
    .get(`${base_url}/quality/All`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_SUPPLIES_QUALITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SUPPLIER_SUPPLIES_QUALITY_FAILURE,
        payload: err,
      });
    });
};

export const deleteSupplierData = (supplierId,userId) => (dispatch, getState) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.DELETE_SUPPLIER_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/supplier/deleteSupplier/${supplierId}`, {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch(getSupplierCount(userId))
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Supplier deleted Successfully!',
      })
      dispatch({
        type: types.DELETE_SUPPLIER_DATA_SUCCESS,
        payload: supplierId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SUPPLIER_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateSupplierById = (data, id, userId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SUPPLIERS_BY_ID_REQUEST,
  });
  axios
    .put(`${base_url2}/supplier/${id} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Supplier updated Successfully!',
      })
      dispatch({
        type: types.UPDATE_SUPPLIERS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SUPPLIERS_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const setEditSuppliers = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SUPPLIERS_EDIT,
    payload: name,
  });
};

export const getSuppliersDeletedList = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIERS_DELETED_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/deleteSupplierHistory`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIERS_DELETED_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIERS_DELETED_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleSuppliersPriceDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIERS_PRICE_DRAWER,
    payload: modalProps,
  });
};

export const handleSuppliersListDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIERS_LIST_DRAWER,
    payload: modalProps,
  });
};


export const updatePriceSuppliers = (data) => (dispatch) => {
  dispatch({
    type: types.UPDATE_PRICE_OF_SUPPLIER_REQUEST,
  });
  axios
    .put(`${base_url2}/po/quality/updatePrice`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Price updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch({
        type: types.UPDATE_PRICE_OF_SUPPLIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PRICE_OF_SUPPLIER_FAILURE,
        payload: err,
      });
    });
};

export const getSupplierwiseQuality = (supplierId,suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIER_WISE_QUALITY_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/quality/drop-down/${supplierId}/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIER_WISE_QUALITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIER_WISE_QUALITY_FAILURE,
        payload: err,
      });
    });
};


export const reinstateToggleForSupplier = (data, supplierId,orgId) => (
  dispatch
) => {
  // debugger;
  dispatch({
    type: types.REINSTATE_TOGGLE_FOR_SUPPLIER_REQUEST,
  });
  axios
    .put(`${base_url2}/supplier/reinitiate/suppliers/${supplierId}`, data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getSupplierDeletedCount(orgId))
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_SUPPLIER_SUCCESS,
        payload: supplierId,
      });
      Swal.fire({
        icon: 'success',
        title: 'Reinstated Successfully!',
      })
      // message.success("Reinstated Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_SUPPLIER_FAILURE,
        payload: err,
      });
      message.error("Something went wrong")
    });
};

export const addManual = (customer,userId) => (dispatch, getState) => {

  dispatch({
    type: types.ADD_MANUAL_REQUEST,
  });

  axios
    .post(`${base_url2}/supplier/inventory/supplier`, customer, {
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
        type: types.ADD_MANUAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MANUAL_FAILURE,
        payload: err,
      });
      //cb && cb();
    });
};


export const getInventorylist = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORYLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/inventory/supplier/user/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORYLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORYLIST_FAILURE,
        payload: err,
      });
    });
};

export const getInventoryAlllist = (orgId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORYALLLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/inventory/supplier/all/${orgId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORYALLLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORYALLLIST_FAILURE,
        payload: err,
      });
    });
};

export const getCategorylist = () => (dispatch) => {
  dispatch({
    type: types.GET_CATEGORYLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/product/allProductCatagory`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATEGORYLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CATEGORYLIST_FAILURE,
        payload: err,
      });
    });
};

export const updatePOContact = (data,poSupplierDetailsId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PO_CONTACT_REQUEST });
  axios
    .put(`${base_url2}/po/updateContactPerson/${poSupplierDetailsId}`,data,
      {
    
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      
      })
    .then((res) => {
    
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully!',
      })
      dispatch({
        type: types.UPDATE_PO_CONTACT_SUCCESS,
        payload: res.data,
      });
   
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PO_CONTACT_FAILURE,
        payload: err,
      });
    });
};