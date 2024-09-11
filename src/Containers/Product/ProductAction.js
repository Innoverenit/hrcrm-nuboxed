import * as types from "./ProductActionTypes";
import { base_url, base_url2 } from "../../Config/Auth";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";
import Swal from 'sweetalert2'

/**
 * get all the product of the user
 */

export const getProducts = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PROFESSIONALDUCTS_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/product/allProductList/pagination/${pageNo}`,
      {
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


export const emptyProductList = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_PRODUCT_LIST, 
  });
};



export const handleProductBrandModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_BRAND_MODAL,
    payload: modalProps,
  });
};
export const handleProductQuality =(modalProps)=>(dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_QUALITY_DRAWER,
    payload: modalProps,
  });
}

export const getdeleteProducts = () => (dispatch) => {
  dispatch({
    type: types.GET_DELETEPRODUCTS_REQUEST,
  });
  axios
    .get(`${base_url2}/product/deleteProductHistory`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETEPRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_DELETEPRODUCTS_FAILURE,
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
export const addProductCategory = (product) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.ADD_PRODUCT_CATEGORY_REQUEST });
  axios
    .post(`${base_url2}/product/saveProductCategory`, product, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getProducts());
      // dispatch(getProductByGroup(groupId))
      dispatch({
        type: types.ADD_PRODUCT_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PRODUCT_CATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const updateProduct = (id, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_PRODUCT_BY_ID_REQUEST });
  axios
    .put(
      `${base_url2}/product/${id}`, { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PRODUCT_BY_ID_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
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
      startDate: dayjs(startDate).toISOString(),
      endDate: dayjs(endDate).toISOString(),
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

export const handleProductBrandDetailsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_BRAND_DETAILS_MODAL,
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

export const deleteCatalogData = (data,productId) => (dispatch) => {
  dispatch({
    type: types.DELETE_CATALOG_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/product/delete/${productId}`,data,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getRecords())
      dispatch(getDeletedProductRecords())
      
      console.log(res);
      dispatch({
        type: types.DELETE_CATALOG_DATA_SUCCESS,
        payload: productId,
      });
      Swal.fire({
        icon: 'success',
        title: res.data,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CATALOG_DATA_FAILURE,
        payload: err,
      });
      Swal.fire({
        icon: 'error',
        title: err.data,
      })
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
    .post(`${base_url2}/distributor/distributorDiscount`, discount)
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
    .get(`${base_url2}/product/record/count`,
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

export const getDeletedProductRecords = () => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_PRODUCT_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/product/deleteProduct/count`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_PRODUCT_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DELETED_PRODUCT_RECORDS_FAILURE,
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
    .get(`${base_url2}/offer/distributor/offer/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
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




export const getBrandProduct = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_BRAND_PRODUCT_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/product/allProductBrand`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BRAND_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_BRAND_PRODUCT_FAILURE,
        payload: err,
      });
    });
};



export const moveProductQuality = (data,qualityCheckBuilderId) => (dispatch) => {
  dispatch({
    type: types.MOVE_PRODUCT_QUALITY_REQUEST,
  });
  axios
    .put(`${base_url2}/qualityCheckBuilder/qualityCheck/update/mandatory/${qualityCheckBuilderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.MOVE_PRODUCT_QUALITY_SUCCESS,
        payload: res.data,
      });
      message.success(res.data);
    })
    .catch((err) => {
      dispatch({
        type: types.MOVE_PRODUCT_QUALITY_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};



export const getProductDesc = (productionBuilderId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_DESC_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/productionBuilder/product/menu/${productionBuilderId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_DESC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCT_DESC_FAILURE,
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
    .put(`${base_url}/product/publish/Dummy/${productId}`, data)
    .then((res) => {
      // dispatch(getProducts())
      // dispatch(getProductByGroup(groupId));
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
    .get(`${base_url2}/product/productList/${groupId}`, {
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
export const addProduct = (data, cb) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.ADD_PROFESSIONALDUCT_REQUEST });
  axios
    .post(`${base_url2}/product`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
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

export const addCategory = (product, cb) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.ADD_CATEGORY_REQUEST });
  axios
    .post(`${base_url2}/product/productcategory`, product, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_CATEGORY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CATEGORY_FAILURE,
        payload: err,
      });
      cb();
    });
};

export const handleProductBuilderDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_BUILDER_DRAWER,
    payload: modalProps,
  });
};

export const getProductbuilder = () => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_BUILDER_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_BUILDER_FAILURE,
        payload: err,
      });
    });
};
export const addProductBuilder = (data,productId) => (dispatch) => {
  dispatch({ type: types.ADD_PRODUCT_BUILDER_REQUEST });
  axios
    .post(`${base_url2}/productionBuilder/supplies`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getBuilderByProId(productId))
      console.log(res);
      dispatch({
        type: types.ADD_PRODUCT_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PRODUCT_BUILDER_FAILURE,
        payload: err,
      });
    });
};

export const getBuilderByProId = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_BUILDER_BY_PRODUCT_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/productionBuilder/supplies/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BUILDER_BY_PRODUCT_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BUILDER_BY_PRODUCT_ID_FAILURE,
        payload: err,
      });
    });
};

export const handlePriceDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRICE_DRAWER,
    payload: modalProps,
  });
};

export const uploadCatalogueList = (data) => (dispatch) => {
  dispatch({ type: types.UPLOAD_CATALOGUE_LIST_REQUEST });
  axios
    .post(`${base_url2}/excel/product-details`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getProducts(0))
      dispatch({
        type: types.UPLOAD_CATALOGUE_LIST_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPLOAD_CATALOGUE_LIST_FAILURE,
        payload: err,
      });
    });
};

export const removeProductBuilder = (productionBuilderId,productId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_PRODUCT_BUILDER_REQUEST,
  });
  axios
    .delete(`${base_url2}/productionBuilder/supplies/delete/${productionBuilderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getBuilderByProId(productId));
      dispatch({
        type: types.REMOVE_PRODUCT_BUILDER_SUCCESS,
        payload:productionBuilderId,
      });
      Swal.fire({
        icon: 'success',
        title: 'Items Deleted Successfully',
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_PRODUCT_BUILDER_FAILURE,
        payload: err,
      });
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
      })
    })
};

export const updateProSupplBuilder = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_PRO_SUPPL_BUILDER_REQUEST });
  axios
    // .put(`${base_url2}/productionBuilder/suppliesUpdate/${productSupplyLinkId}`, data, {productionBuilder/supplies/update
    .post(`${base_url2}/productionBuilder/supplies`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_PRO_SUPPL_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_PRO_SUPPL_BUILDER_FAILURE,
        payload: err,
      });
    });
};

export const getProductCurrency = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productCurrency/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_CURRENCY_FAILURE,
        payload: err,
      });
    });
};
export const createProductCurrency = (data,) => (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCT_CURRENCY_REQUEST });
  axios
    .post(`${base_url2}/product/saveProductCurrency`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.CREATE_PRODUCT_CURRENCY_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Created Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CREATE_PRODUCT_CURRENCY_FAILURE,
        payload: err,
      });
    });
};


export const getSearchBuilder = (hsn) => (dispatch) => {
  dispatch({
    type: types.GET_SEARCH_BUILDER_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/suppliesList/${hsn}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEARCH_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SEARCH_BUILDER_FAILURE,
        payload: err,
      });
    });
};

export const getAllProductList = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PRODUCT_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productNew`, {
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

export const PstoProductionBuilder = (data) => (dispatch) => {
  dispatch({ type: types.POST_PRODUCTION_BUILDER_REQUEST });
  axios
    .post(`${base_url2}/production/productionProductBuilder`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.POST_PRODUCTION_BUILDER_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        // showConfirmButton: false,
        // timer: 1500
      })
    })
    .catch((err) => {
      dispatch({
        type: types.POST_PRODUCTION_BUILDER_FAILURE,
        payload: err,
      });
    });
};

export const handleCategoryModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CATEGORY_MODAL,
    payload: modalProps,
  });
};

export const getCategory = () => (dispatch) => {
  dispatch({
    type: types.GET_CATEGORY_REQUEST,
  });
  axios
    .get(`${base_url2}/product/allProductCatagory`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CATEGORY_FAILURE,
        payload: err,
      });
    });
};
export const handleProdCellDrawer =(modalProps)=>(dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_CELL_DRAWER,
    payload: modalProps,
  });
}

export const updateProductSuplrBuilder = (data,productionBuilderId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PROD_SUPPLR_BILDR_REQUEST });
  axios
    .put(`${base_url2}/productionBuilder/supplies/update/${productionBuilderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_PROD_SUPPLR_BILDR_SUCCESS,
        payload: res.data,
      });
      if(res.data.message!==res.data){
      Swal.fire({
        icon:'error',
        title:res.data.message,
      })
    }
    if(res.data ===res.data){
    Swal.fire({
      icon:'success',
      title:'Updated Successfully',
    })
  }
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_PROD_SUPPLR_BILDR_FAILURE,
        payload: err,
      });
    });
};

export const removeProductPrice = (productCurrencyId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_PRODUCT_PRICE_REQUEST,
  });
  axios
    .delete(`${base_url2}/product/productCurrency/delete/${productCurrencyId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getBuilderByProId(productId));
      dispatch({
        type: types.REMOVE_PRODUCT_PRICE_SUCCESS,
        payload:productCurrencyId,
      });
      Swal.fire({
        icon: 'success',
        title: 'Items Deleted Successfully',
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_PRODUCT_PRICE_FAILURE,
        payload: err,
      });
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
      })
    })
};

export const handleProductNotesDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};
// export const reInstateProducts = (data,productId) => (dispatch) => {
//   dispatch({ type: types.REINSTATE_DELETED_PRODUCTS_REQUEST });
//   axios
//     .put(`${base_url2}/leads/reinstate/${productId}`, data, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       console.log(res);
//       dispatch({
//         type: types.REINSTATE_DELETED_PRODUCTS_SUCCESS,
//         payload: res.data,
//       });
//       Swal.fire({
//         icon: 'success',
//         title: 'Reinstated Successfully',
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.REINSTATE_DELETED_PRODUCTS_FAILURE,
//         payload: err,
//       });
//     });
// };

export const getNotesofPRoduct = (type,id) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_OF_PRODUCT_REQUEST,
  });
  axios
    .get(`${base_url2}/notes/get/all/${type}/${id}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_OF_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_NOTES_OF_PRODUCT_FAILURE,
        payload: err,
      });
    });
};


export const addNoteOfProduct = (note,id) => (dispatch) => {
  dispatch({ type: types.ADD_NOTES_OF_PRODUCT_REQUEST });
  axios
    .post(`${base_url2}/notes/save`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getNotesofPRoduct("productBuilder",id));
      dispatch({
        type: types.ADD_NOTES_OF_PRODUCT_SUCCESS,
        payload: res.note,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_NOTES_OF_PRODUCT_FAILURE,
        payload: err,
      });
    });
};

export const updateNoteOfProduct = (note,id) => (dispatch) => {
  dispatch({ type: types.UPDATE_NOTES_OF_PRODUCT_REQUEST });
  axios
    .put(`${base_url2}/notes/update/${id}`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_NOTES_OF_PRODUCT_SUCCESS,
        payload: res.note,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_NOTES_OF_PRODUCT_FAILURE,
        payload: err,
      });
    });
};

export const removeNotesOfProduct = (data,notesId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_NOTES_OF_PRODUCT_REQUEST,
  });
  axios
    .put(`${base_url2}/notes/delete`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getCallTimeline(leadsId));
      dispatch({
        type: types.REMOVE_NOTES_OF_PRODUCT_SUCCESS,
        payload:{ notesId },
      });
    })
    .catch((err) => {
  
      dispatch({
        type: types.REMOVE_NOTES_OF_PRODUCT_FAILURE,
        payload: err,
      });
    });
};





export const addProductDesc = (product, cb) => (dispatch) => {
  // console.log("inside add product");
  dispatch({ type: types.ADD_PRODUCT_DESC_REQUEST });
  axios
    .post(`${base_url2}/productionBuilder/product/menu/save`, product, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PRODUCT_DESC_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PRODUCT_DESC_FAILURE,
        payload: err,
      });
      cb();
    });
};




export const getProductionSpareData = (suppliesId,productionProductId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_SPARE_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/po/cellStockPart/${suppliesId}/${productionProductId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_PRODUCTION_SPARE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_SPARE_DATA_FAILURE,
        payload: err,
      });
    });
};


export const getProductHsn = () => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_HSN_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/hsnSupplies `,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_HSN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_HSN_FAILURE,
        payload: err,
      });
    });
};







export const createQualityProduct = (data) => (dispatch) => {
  // const { locationId,organizationId } = getState().auth.userDetails;
  
  dispatch({ type: types.CREATE_QUALITY_PRODUCT_REQUEST });
  axios
    .post(`${base_url2}/qualityCheckBuilder/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getRoomRackByLocId(locationId,organizationId))
      dispatch({
        type: types.CREATE_QUALITY_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CREATE_QUALITY_PRODUCT_FAILURE,
        payload: err,
      });
    });
};




export const getQualityProducts = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_QUALITY_PRODUCTS_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/qualityCheckBuilder/get/${productId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUALITY_PRODUCTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_QUALITY_PRODUCTS_FAILURE,
        payload: err,
      });
    });
};





export const addDragQuality = (data) => (dispatch) => {
  // const { locationId,organizationId } = getState().auth.userDetails;
  
  dispatch({ type: types.ADD_DRAG_QUALITY_REQUEST });
  axios
    .put(`${base_url2}/qualityCheckBuilder/qualityCheck/update/drag-drop`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getRoomRackByLocId(locationId,organizationId))
      dispatch({
        type: types.ADD_DRAG_QUALITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DRAG_QUALITY_FAILURE,
        payload: err,
      });
    });
};


export const deleteQualityProductData = (qualityCheckBuilderId,productId) => (dispatch) => {
  dispatch({
    type: types.DELETE_QUALITY_PRODUCT_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/qualityCheckBuilder/delete/${qualityCheckBuilderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: res.data,
        // showConfirmButton: false,
        // timer: 1500
      })
      // if (res.data) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: res.data,
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // } else {
       
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Not Deleted',
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // }
      console.log(res);
      dispatch(getQualityProducts(productId));
      dispatch({
        type: types.DELETE_QUALITY_PRODUCT_DATA_SUCCESS,
        payload:qualityCheckBuilderId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_QUALITY_PRODUCT_DATA_FAILURE,
        payload: err,
      });
    });
};



export const updateQualityProduct = (data,qualityCheckBuilderId) => (dispatch) => {
  // const { locationId,organizationId } = getState().auth.userDetails;
  
  dispatch({ type: types.UPDATE_QUALITY_PRODUCT_REQUEST });
  axios
    .put(`${base_url2}/qualityCheckBuilder/update/${qualityCheckBuilderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getRoomRackByLocId(locationId,organizationId))
      dispatch({
        type: types.UPDATE_QUALITY_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_QUALITY_PRODUCT_FAILURE,
        payload: err,
      });
    });
};
export const featureProductToggle = ( data,productId) => (dispatch) => {
  dispatch({
    type: types.FEATURED_PRODUCT_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/product/feature/${productId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FEATURED_PRODUCT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FEATURED_PRODUCT_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const catalogueCategorySearch = (categoryName) => (dispatch) => {
  dispatch({
    type: types.CATALOGUE_CATEGORY_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url2}/product/category/${categoryName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data.message);

      dispatch({
        type: types.CATALOGUE_CATEGORY_SEARCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Material list is empty");
      dispatch({
        type: types.CATALOGUE_CATEGORY_SEARCH_FAILURE,
        payload: err,
      });
    });
};

export const getProductsByProductId = (productId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTS_BY_PRODUCTID_REQUEST,
  });
  axios
    .get(`${base_url2}/product/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTS_BY_PRODUCTID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTS_BY_PRODUCTID_FAILURE,
        payload: err,
      });
    });
};
export const productPUnpblishToggle = ( data,categoryId) => (dispatch) => {
  dispatch({
    type: types.PRODUCT_PUNBLISH_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/product/publish/productCategory/${categoryId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.PRODUCT_PUNBLISH_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PRODUCT_PUNBLISH_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const OnOffwarrentyProduct = ( data,productId) => (dispatch) => {
  dispatch({
    type: types.WARRENTY_PRODUCT_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/product/warrenty/${productId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.WARRENTY_PRODUCT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.WARRENTY_PRODUCT_TOGGLE_FAILURE,
        payload: err,
      });
    })
};
export const updateDateYearProduct = ( data,productId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_DATE_YEAR_PRODUCT_REQUEST,
  });
  axios
  .put(`${base_url2}/product/year/${productId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_DATE_YEAR_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DATE_YEAR_PRODUCT_FAILURE,
        payload: err,
      });
    })
};




export const addProductBrand = (data, cb) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.ADD_PRODUCT_BRAND_REQUEST });
  axios
    .post(`${base_url2}/product/saveProductBrand`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PRODUCT_BRAND_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PRODUCT_BRAND_FAILURE,
        payload: err,
      });
      cb();
    });
};



export const getBrandCatalogueList = (brandId) => (dispatch) => {
  dispatch({
    type: types.GET_BRAND_CATALOGUE_LIST_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/product/activeBrand/${brandId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BRAND_CATALOGUE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_BRAND_CATALOGUE_LIST_FAILURE,
        payload: err,
      });
    });
};



export const deleteProductBrandData = (data,productBrandId) => (dispatch) => {
  dispatch({
    type: types.DELETE_PRODUCT_BRAND_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/product/deleteBrand/${productBrandId}`,data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Brand Deleted Successfully',
        // showConfirmButton: false,
        // timer: 1500
      })
      // if (res.data) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: res.data,
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // } else {
       
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Not Deleted',
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // }
      console.log(res);
      dispatch(getBrandProduct());
      
      dispatch({
        type: types.DELETE_PRODUCT_BRAND_DATA_SUCCESS,
        payload: productBrandId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PRODUCT_BRAND_DATA_FAILURE,
        payload: err,
      });
    });
};




export const updateBrandProduct = (data, productBrandId, cb) => (dispatch) => {
  // console.log(leadDocumentsId, DocumentsName);
  dispatch({
    type: types.UPDATE_BRAND_PRODUCT_REQUEST,
  });
  axios
    .put(
      `${base_url2}/product/brandUpdate/${productBrandId}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
    
      // message.success("Document has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_BRAND_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_BRAND_PRODUCT_FAILURE,
      });
    });
};



export const getBrandDeleteProduct = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_BRAND_DELETE_PRODUCT_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/product/allInActiveProductBrand`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BRAND_DELETE_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_BRAND_DELETE_PRODUCT_FAILURE,
        payload: err,
      });
    });
};




export const getProductBrandDetails = (brandId,) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_BRAND_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url2}/product/inActiveBrand/${brandId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_BRAND_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCT_BRAND_DETAILS_FAILURE,
        payload: err,
      });
    });
};