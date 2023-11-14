import * as types from "./ProductActionTypes";
import { base_url, base_url2 } from "../../Config/Auth";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

/**
 * get all the product of the user
 */

export const getProducts = () => (dispatch) => {
  dispatch({
    type: types.GET_PROFESSIONALDUCTS_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productSuppliesList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROFESSIONALDUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PROFESSIONALDUCTS_FAILURE,
        payload: err,
      });
    });
};
export const getService = () => (dispatch) => {
  dispatch({
    type: types.GET_SERVICE_REQUEST,
  });
  axios
    .get(`${base_url}/services`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SERVICE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SERVICE_FAILURE,
        payload: err,
      });
    });
};

export const getProductsById = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/fetch/product/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCT_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const getServiceById = (serviceId) => (dispatch) => {
  dispatch({
    type: types.GET_SERVICE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/service/${serviceId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SERVICE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SERVICE_BY_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * request for adding a product
 */
export const addProduct = (product, cb, groupId) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.ADD_PROFESSIONALDUCT_REQUEST });
  axios
    .post(`${base_url}/product`, product, {
    })
    .then((res) => {
      console.log(res);
      dispatch(getProducts());
      dispatch(getProductByGroup(groupId))
      dispatch({
        type: types.ADD_PROFESSIONALDUCT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROFESSIONALDUCT_FAILURE,
        payload: err,
      });
      cb();
    });
};

export const updateProduct = (id, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_PRODUCT_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/product/${id}`,
      { ...data }
      // {
      //   headers: {
      //     Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      //   },
      // }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PRODUCT_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PRODUCT_BY_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get all the latest products of the organization
 */
export const getLatestProductsByOrganizationId = (
  organizationId,
  startDate,
  endDate
) => (dispatch) => {
  let api_url = "";
  if (startDate === undefined || endDate === undefined) {
    api_url = `/sort/product/organization/${organizationId}?`;
  } else {
    api_url = `/sort/product/organization/${organizationId}?&startDate=${startDate}&endDate=${endDate}`;
  }
  dispatch({
    type: types.GET_LATEST_PRODUCTS_BY_ORGANIZATION_ID_REQUEST,
  });
  axios
    .get(`${base_url}${api_url}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LATEST_PRODUCTS_BY_ORGANIZATION_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LATEST_PRODUCTS_BY_ORGANIZATION_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * product modal action
 */
export const handleProductModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROFESSIONALDUCT_MODAL,
    payload: modalProps,
  });
};
export const handleServiceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SERVICE_MODAL,
    payload: modalProps,
  });
};

export const handleConfigureModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONFIGURE_MODAL,
    payload: modalProps,
  });
};

export const handleUploadProductModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPLOAD_PRODUCT_MODAL,
    payload: modalProps,
  });
};

export const handleDetailsProductModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DETAILSFORM_MODAL,
    payload: modalProps,
  });
};

/**
 * SET PROFESSIONALDUCT VIEW TYPE
 * TABLE VIEW/CARD VIEW
 */
export const setProductViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_PROFESSIONALDUCT_VIEW_TYPE, payload: viewType });

export const setSelectedTimeIntervalCatalogue = (selectedTime) => (
  dispatch
) => {
  dispatch({
    type: types.CHANGE_SELECTED_TIME_INTERVAL_CATALOGUE,
    payload: selectedTime,
  });
};

export const setTimeRangeCatalogue = (startDate, endDate) => (dispatch) => {
  dispatch({
    type: types.SET_TIME_INTERVAL_CATALOGUE,
    payload: {
      startDate: moment(startDate).toISOString(),
      endDate: moment(endDate).toISOString(),
    },
  });
};

export const handleWeightedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_WEIGHTED_MODAL,
    payload: modalProps,
  });
};

export const handleAbsoluteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ABSOLUTE_MODAL,
    payload: modalProps,
  });
};

export const handleWinModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_WIN_MODAL,
    payload: modalProps,
  });
};

export const handleWonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_WON_MODAL,
    payload: modalProps,
  });
};

export const handleCustomerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_MODAL,
    payload: modalProps,
  });
};

export const setEditProducts = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_PRODUCTS,
    payload: name,
  });
};

/**
 * update Product modal
 */
export const handleUpdateProductModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PRODUCT_MODAL,
    payload: modalProps,
  });
};
/**
 * Discount Modal
 */
export const handleDiscountModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISCOUNT_BUTTON_MODAL,
    payload: modalProps,
  });
};
// get customer discount history
export const getDiscountHistory = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_DISCOUNT_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url}/Discount/discount/discountHistory/${productId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISCOUNT_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISCOUNT_HISTORY_FAILURE,
        payload: err,
      });
    });
};

/**
 * request for adding a product
 */
export const addDiscount = (discount) => (dispatch) => {
  console.log("inside add discount");
  dispatch({ type: types.ADD_DISCOUNT_REQUEST });
  axios
    .post(`${base_url}/Discount`, discount)
    .then((res) => {
      console.log(res);
      // dispatch(getProducts());
      dispatch({
        type: types.ADD_DISCOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISCOUNT_FAILURE,
        payload: err,
      });
    });
};
export const handleHistoryModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_HISTORY_MODAL,
    payload: modalProps,
  });
};

export const getProductHistory = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url}/product/history/product/${productId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_HISTORY_FAILURE,
        payload: err,
      });
    });
};

//SUSPEND PRODUCT
export const suspendProduct = (data, productId, cb) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.SUSPEND_PRODUCT_REQUEST,
  });
  axios
    .put(`${base_url}/product/updateProduct/deleteHistory/${productId}`, data)
    .then((res) => {
      dispatch({
        type: types.SUSPEND_PRODUCT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success", res.data.message, res.data.assignInd);
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.SUSPEND_PRODUCT_FAILURE,
        payload: err,
      });
      cb && cb("failure", null, null);
    });
};

export const deleteProductData = (id) => (dispatch) => {
  dispatch({
    type: types.DELETE_PRODUCT_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/product/${id}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_PRODUCT_DATA_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PRODUCT_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getSuspendProducts = () => (dispatch) => {
  dispatch({
    type: types.GET_SUSPEND_PRODUCT_REQUEST,
  });
  axios
    .get(`${base_url}/product/deleteProductHistory`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUSPEND_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SUSPEND_PRODUCT_FAILURE,
        payload: err,
      });
    });
};

export const handleCatalogueConfigureModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CATALOGUE_CONFIGURE_MODAL,
    payload: modalProps,
  });
};

//add configure
export const addCatalogueConfigure = () => (dispatch, getState) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_CATALOGUE_CONFIGURE_REQUEST,
  });

  axios
    .post(`${base_url}/`)
    .then((res) => {
      console.log(res);

      dispatch(getCatalogueConfigureList());

      dispatch({
        type: types.ADD_CATALOGUE_CONFIGURE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CATALOGUE_CONFIGURE_FAILURE,
        payload: err,
      });
    });
};

//Configure TABLE
export const getCatalogueConfigureList = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CATALOGUE_CONFIGURE_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATALOGUE_CONFIGURE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CATALOGUE_CONFIGURE_LIST_FAILURE,
        payload: err,
      });
    });
};

// for distributor

export const addDiscountDistributor = (discount) => (dispatch) => {
  console.log("inside add discount");
  dispatch({ type: types.ADD_DISCOUNT_DISTRIBUTOR_REQUEST });
  axios
    .post(`${base_url}/distributor/distributorDiscount`, discount)
    .then((res) => {
      console.log(res);
      // dispatch(getProducts());
      dispatch({
        type: types.ADD_DISCOUNT_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISCOUNT_DISTRIBUTOR_FAILURE,
        payload: err,
      });
    });
};

// get distributor discount history

export const getDistributorDiscountHistory = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_DISCOUNT_HISTORY_REQUEST,
  });
  axios
    .get(
      `${base_url}/distributor/distributorDiscount/discountHistory/${productId}`
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_DISCOUNT_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_DISCOUNT_HISTORY_FAILURE,
        payload: err,
      });
    });
};

export const getRecords = () => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/user/record/count`, {})
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

export const getAllProductCatagory = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PRODUCT_REQUEST,
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
        type: types.GET_ALL_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_PRODUCT_FAILURE,
        payload: err,
      });
    });
};

/**
 * Offer Modal
 */
export const handleOfferModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OFFER_BUTTON_MODAL,
    payload: modalProps,
  });
};

export const addCustomerOffer = (discount) => (dispatch) => {
  console.log("inside add discount");
  dispatch({ type: types.ADD_CUSTOMER_OFFER_REQUEST });
  axios
    .post(`${base_url}/offer/contactOffer`, discount)
    .then((res) => {
      console.log(res);
      // dispatch(getProducts());
      dispatch({
        type: types.ADD_CUSTOMER_OFFER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_OFFER_FAILURE,
        payload: err,
      });
    });
};

export const addDistributorOffer = (discount) => (dispatch) => {
  console.log("inside add discount");
  dispatch({ type: types.ADD_DISTRIBUTOR_OFFER_REQUEST });
  axios
    .post(`${base_url}/offer/distributorOffer`, discount)
    .then((res) => {
      console.log(res);
      // dispatch(getProducts());
      dispatch({
        type: types.ADD_DISTRIBUTOR_OFFER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISTRIBUTOR_OFFER_FAILURE,
        payload: err,
      });
    });
};

// get customer offer history

export const getCustomerOfferHistory = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_OFFER_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url}/offer/contact/offer/${productId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_OFFER_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_OFFER_HISTORY_FAILURE,
        payload: err,
      });
    });
};

// get distributor offer history

export const getDistributorOfferHistory = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_DISTRIBUTOR_OFFER_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url}/offer/distributor/offer/${productId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISTRIBUTOR_OFFER_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISTRIBUTOR_OFFER_HISTORY_FAILURE,
        payload: err,
      });
    });
};

export const setClearbitProductData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_PRODUCT_DATA,
    payload: data,
  });
};

/**
 * update Customer Offer modal
 */
export const handleUpdateCustomerOfferModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_OFFER_MODAL,
    payload: modalProps,
  });
};

export const setEditCustomerOffer = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_CUSTOMER_OFFER,
    payload: name,
  });
};

export const updateCustomerOffer = (data, contactOfferId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CUSTOMER_OFFER_REQUEST,
  });
  axios
    .put(`${base_url}/offer/contact/Offer/${contactOfferId}`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getDistributorsByUserId(userId));
      dispatch({
        type: types.UPDATE_CUSTOMER_OFFER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_OFFER_FAILURE,
        payload: err,
      });
    });
};
/**
 * update Customer offer modal
 */
export const handleUpdateDistributorOfferModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_DISTRIBUTOR_OFFER_MODAL,
    payload: modalProps,
  });
};

export const setEditDistributorOffer = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_DISTRIBUTOR_OFFER,
    payload: name,
  });
};

export const setClearbitProductDistributorData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_PRODUCT_DISTRIBUTOR_DATA,
    payload: data,
  });
};

export const updateDistributorOffer = (data, distributorOfferId) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_DISTRIBUTOR_OFFER_REQUEST,
  });
  axios
    .put(`${base_url}/offer/distributorOffer/${distributorOfferId}`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getDistributorsByUserId(userId));
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_OFFER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISTRIBUTOR_OFFER_FAILURE,
        payload: err,
      });
    });
};

export const handleCatalogueWipModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CATALOGUE_WIP_MODAL,
    payload: modalProps,
  });
};

export const handleCategoryImageModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CATEGORYIMAGE_MODAL,
    payload: modalProps,
  });
};

export const addCategoryImage = (product, cb) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.ADD_CATEGORY_IMAGE_REQUEST });
  axios
    .post(`${base_url}/product`, product, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCategoryImage());
      dispatch({
        type: types.ADD_CATEGORY_IMAGE_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CATEGORY_IMAGE_FAILURE,
        payload: err,
      });
      cb();
    });
};

export const getCategoryImage = () => (dispatch) => {
  dispatch({
    type: types.GET_CATEGORY_IMAGE_REQUEST,
  });
  axios
    .get(`${base_url}/product`, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATEGORY_IMAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CATEGORY_IMAGE_FAILURE,
        payload: err,
      });
    });
};

export const productPublishToggle = (data, productId, groupId) => (
  dispatch
) => {
  dispatch({
    type: types.PRODUCT_PUBLISH_TOGGLE_REQUEST,
  });
  axios
    .put(`${base_url}/product/publish/${productId}`, data)
    .then((res) => {
      dispatch(getProducts())
      dispatch(getProductByGroup(groupId));
      dispatch({
        type: types.PRODUCT_PUBLISH_TOGGLE_SUCCESS,
        payload: res.data,
      });
      // message.success("Confirmation Successfull");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PRODUCT_PUBLISH_TOGGLE_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};

export const getProductByGroup = (groupId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_BY_GROUP_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productList/${groupId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_BY_GROUP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_BY_GROUP_FAILURE,
        payload: err,
      });
    });
};

export const addToMaterial = (data, productId, groupId) => (dispatch) => {
  dispatch({
    type: types.ADD_TO_MATERIAL_REQUEST,
  });
  axios
    .put(`${base_url}/product/transferToMaterials/${productId}`, data)
    .then((res) => {
      console.log(res);
      dispatch(getProductByGroup(groupId));
      dispatch({
        type: types.ADD_TO_MATERIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TO_MATERIAL_FAILURE,
        payload: err,
      });
    });
};

export const uploadproductlist = (product, groupId) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.UPLOAD_PRODUCT_LISTS_REQUEST });
  axios
    .post(`${base_url}/excel/import/product-details`, product, {
    })
    .then((res) => {
      console.log(res);
      dispatch(getProducts());
      dispatch(getProductByGroup(groupId))
      dispatch({
        type: types.UPLOAD_PRODUCT_LISTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPLOAD_PRODUCT_LISTS_FAILURE,
        payload: err,
      });
    });
};