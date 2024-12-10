import * as types from "./SuppliesActionType";
import { base_url, base_url2 } from "../../../Config/Auth";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";
import Swal from 'sweetalert2'

export const setSuppliesViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_SUPPLIES_VIEW_TYPE, payload: viewType });

export const handleSuppliesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIES_MODAL,
    payload: modalProps,
  });
};


export const handleUploadSuppliesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPLOAD_SUPPLIES_MODAL,
    payload: modalProps,
  });
};


export const handleLocationuppliesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_LOCATION_SUPPLIES_MODAL,
    payload: modalProps,
  });
};

export const handleUploadMaterialModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPLOAD_MATERIAL_MODAL,
    payload: modalProps,
  });
};



export const handleSuppliesLocationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIES_LOCATION_MODAL,
    payload: modalProps,
  });
};

export const handleBrandModel = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BRAND_MODEL,
    payload: modalProps,
  });
};


export const handleSuppliesBrandModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIES_BRAND_MODAL,
    payload: modalProps,
  });
};
export const addSupplies = (purchase) => (dispatch) => {
  console.log("inside add purchase");
  dispatch({ type: types.ADD_SUPPLIES_REQUEST });
  axios
    .post(`${base_url2}/supplies`, purchase, {})
    .then((res) => {
      console.log(res);
      dispatch(getSuppliesList(0));
      dispatch({
        type: types.ADD_SUPPLIES_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIES_FAILURE,
        payload: err,
      });
      // cb();
    });
};

export const getSuppliesList = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/all-supplies/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
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

export const handleUpdateSupplieDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SUPPLIES_DRAWER,
    payload: modalProps,
  });
};

export const setEditSupplies = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_SUPPLIES,
    payload: name,
  });
};

export const updateSupplies = (data, suppliesId, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_SUPPLIES_BY_ID_REQUEST });
  axios
    .put(`${base_url2}/supplies/${suppliesId}`, { ...data })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_SUPPLIES_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SUPPLIES_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const getSuppliesHistory = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/supplier/supplierList/${suppliesId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIES_HISTORY_FAILURE,
        payload: err,
      });
    });
};


export const getBestBeforeJumpList = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_BESTBEFORE_JUMPLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/po/BestBefore/list/${orgId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BESTBEFORE_JUMPLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BESTBEFORE_JUMPLIST_FAILURE,
        payload: err,
      });
    });
};

export const getBestBeforeJumpListCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_BEST_BEFORE_JUMP_REQUEST,
  });
  axios
    .get(`${base_url2}/po/BestBefore/count/${orgId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BEST_BEFORE_JUMP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BEST_BEFORE_JUMP_FAILURE,
        payload: err,
      });
    });
};
export const getReorderCount = () => (dispatch) => {
  dispatch({
    type: types.GET_REORDER_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getReorder/all/count/material`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REORDER_FAILURE,
        payload: err,
      });
    });
};

/**
 *  delete modal
 */
export const handleDeleteFeedbackModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DELETE_FEEDBACK_MODAL,
    payload: modalProps,
  });
};

/**
 *  supplies delete url
 */

export const deletePurchaseData = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.DELETE_PURCHASE_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/supplies/${suppliesId}`)
    .then((res) => {
      console.log(res);
      // dispatch(getDeletedPurchaseById());
      dispatch({
        type: types.DELETE_PURCHASE_DATA_SUCCESS,
        payload: suppliesId,
      });
      message.success("Supplies deleted Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PURCHASE_DATA_FAILURE,
        payload: err,
      });
      message.error("Something went wrong")
    });
};

export const getDeleteHistory = () => (dispatch) => {
  dispatch({
    type: types.GET_DELETE_HISTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/deleteSuppliesHistory`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETE_HISTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETE_HISTORY_FAILURE,
        payload: err,
      });
    });
};

export const reinstateToggleForSupplies = (data, suppliesId) => (
  dispatch
) => {
  // debugger;
  dispatch({
    type: types.REINSTATE_TOGGLE_FOR_SUPPLIES_REQUEST,
  });
  axios
    .put(`${base_url2}/supplies/reinstate/deleteSuppliesHistory/${suppliesId}`, data)
    .then((res) => {
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_SUPPLIES_SUCCESS,
        payload: suppliesId,
      });
      message.success("Reinstated Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_SUPPLIES_FAILURE,
        payload: err,
      });
      message.error("Something went wrong")
    });
};

export const addToCatalogue = (data, suppliesId, groupId) => (dispatch) => {
  dispatch({
    type: types.ADD_TO_CATALOGUE_REQUEST,
  });
  axios
    .put(`${base_url2}/supplies/transferToCatalog/${suppliesId}`, data)
    .then((res) => {
      console.log(res);
      dispatch(getSuppliesByGroupId(groupId));
      dispatch({
        type: types.ADD_TO_CATALOGUE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TO_CATALOGUE_FAILURE,
        payload: err,
      });
    });
};
export const handleCurrencyPriceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CURENCY_PRICE_MODAL,
    payload: modalProps,
  });
};

export const addPriceRate = (data, suppliesId) => (dispatch) => {
  console.log("inside add data");
  dispatch({ type: types.ADD_PRICE_RATE_REQUEST });
  axios
    .post(`${base_url2}/supplies/suppliesPrice`, data, {})
    .then((res) => {
      dispatch(getMaterialPriceById(suppliesId))
      dispatch({
        type: types.ADD_PRICE_RATE_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PRICE_RATE_FAILURE,
        payload: err,
      });
      // cb();
    });
};

export const getSuppliesByGroupId = (groupId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_BY_GROUP_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/suppliesList/${groupId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_BY_GROUP_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIES_BY_GROUP_ID_FAILURE,
        payload: err,
      });
    });
};

export const getMaterialPriceById = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_PRICE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/suppliesPrice/${suppliesId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATERIAL_PRICE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_PRICE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const addMasterList = (data) => (dispatch) => {
  dispatch({ type: types.ADD_MASTER_LIST_REQUEST });
  axios
    .post(`${base_url2}/supplies/suppliesMasterLink`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getSuppliesList(0))
      dispatch({
        type: types.ADD_MASTER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MASTER_LIST_FAILURE,
        payload: err,
      });
    });
};
export const getTaggedBrandById = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_TAGGED_BRAND_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/optional/suppliesMasterLink/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TAGGED_BRAND_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TAGGED_BRAND_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const getBrandModel = () => (dispatch) => {
  dispatch({
    type: types.GET_BRAND_MODEL_REQUEST,
  });
  axios
    .get(`${base_url2}/masterlist/masterList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BRAND_MODEL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BRAND_MODEL_FAILURE,
        payload: err,
      });
    });
};
export const getSuppliesCount = () => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/count`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SUPPLIES_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getSuppliesDeletedCount = () => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_DELETED_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/delete/count`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_DELETED_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SUPPLIES_DELETED_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const handleMaterialBuilderDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_MATERIAL_BUILDER_DRAWER,
    payload: modalProps,
  });
};


export const AddMaterialBuilder = (data) => (dispatch) => {
  dispatch({ type: types.ADD_MATERIAL_BUILDER_REQUEST });
  axios
    .post(`${base_url2}/suppliesBuilder/supplies`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_MATERIAL_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MATERIAL_BUILDER_FAILURE,
        payload: err,
      });
    });
};
export const getMaterialBuilderById = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_BUILDER_BYID_REQUEST,
  });
  axios
    .get(`${base_url2}/suppliesBuilder/supplies/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MATERIAL_BUILDER_BYID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_MATERIAL_BUILDER_BYID_FAILURE,
        payload: err,
      });
    });
};

export const getSearchedMaterialBuilder = (hsn) => (dispatch) => {
  dispatch({
    type: types.GET_SEARCH_MATERIAL_BUILDER_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/suppliesList/${hsn}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEARCH_MATERIAL_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SEARCH_MATERIAL_BUILDER_FAILURE,
        payload: err,
      });
    });
};
export const removeMaterialBuilder = (data, supplySupplyLinkId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_MATERIAL_BUILDER_REQUEST,
  });
  axios
    .put(`${base_url2}/suppliesBuilder/supplies/${supplySupplyLinkId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.REMOVE_MATERIAL_BUILDER_SUCCESS,
        payload: res.data,
      });
      message.success("Confirmation Successfull");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_MATERIAL_BUILDER_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
    });
};

export const updateMaterialBuilder = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_MATERIAL_BUILDER_REQUEST });
  axios
    .post(`${base_url2}/suppliesBuilder/supplies`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_MATERIAL_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_MATERIAL_BUILDER_FAILURE,
        payload: err,
      });
    });
};

export const deleteSupplies = (data, suppliesId) => (
  dispatch
) => {
  // debugger;
  dispatch({
    type: types.DELETE_SUPPLIES_REQUEST,
  });
  axios
    .put(`${base_url2}/supplies/${suppliesId}`, data)
    .then((res) => {
      dispatch({
        type: types.DELETE_SUPPLIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SUPPLIES_FAILURE,
        payload: err,
      });
    });
};

export const handleSuppliersListDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIERSLIST_DRAWER,
    payload: modalProps,
  });
};
export const getSupplieSupplierList = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_SUPPLIERS_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/supplies-supplier-link/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_SUPPLIERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SUPPLIES_SUPPLIERS_FAILURE,
        payload: err,
      });
    });
};

export const setSuppliesSupplierType = (data) => (dispatch) => {
  dispatch({ type: types.SET_SUPPLIES_SUPPLIER_REQUEST });
  axios
    .post(
      `${base_url2}/supplies/supplies-supplier-link`,data,
      {
    
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      
      })
    .then((res) => {
      console.log(res);
     
      dispatch({
        type: types.SET_SUPPLIES_SUPPLIER_SUCCESS,
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
        type: types.SET_SUPPLIES_SUPPLIER_FAILURE,
        payload: err,
      });
    });
};

export const linkMaterialToggle = ( data,suppliesId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  //const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.LINK_MATERIAL_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/supplies/update/publishInd/${suppliesId}`,data,  {
    // headers: {
    //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    // },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_MATERIAL_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_MATERIAL_TOGGLE_FAILURE,
        payload: err,
      });
    })
};


export const linkMaterialFifoToggle = ( data,id) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.LINK_MATERIAL_FIFO_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/supplies/update/fifiInd/${id}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_MATERIAL_FIFO_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_MATERIAL_FIFO_TOGGLE_FAILURE,
        payload: err,
      });
    })
};


export const inputSuppliesDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_SUPPLIES_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/search/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // message.success(res.data.message);

      dispatch({
        type: types.INPUT_SUPPLIES_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Material list is empty");
      dispatch({
        type: types.INPUT_SUPPLIES_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
}; 

export const ClearReducerDataOfMaterial = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_MATERIAL,
  });
};

export const clearPriceFactor = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_FACTOR,
  });
};
export const handleMaterialInventory = (modalProps) => (dispatch)=> {
  dispatch({
    type:types.HANDLE_MATERIAL_INVENTORY,
    payload: modalProps,
  });
};

export const getMaterialInventory = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_INVENTORY_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/getInventory/locations/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // message.success(res.data.message);

      dispatch({
        type: types.GET_MATERIAL_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {

      dispatch({
        type: types.GET_MATERIAL_INVENTORY_FAILURE,
        payload: err,
      });
    });
}; 

export const handlePriceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRICE_MODAL,
    payload: modalProps,
  });
};

export const createMaterialCurrency = (data,) => (dispatch) => {
  dispatch({ type: types.CREATE_MATERIAL_CURRENCY_REQUEST });
  axios
    .post(`${base_url2}/supplies/suppliesPrice`, data, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
      dispatch({
        type: types.CREATE_MATERIAL_CURRENCY_SUCCESS,
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
        type: types.CREATE_MATERIAL_CURRENCY_FAILURE,
        payload: err,
      });
    });
};

export const getMaterialCurrency = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/suppliesPrice/${suppliesId}`, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATERIAL_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_CURRENCY_FAILURE,
        payload: err,
      });
    });
};

export const createMaterialDiscount = (data,) => (dispatch) => {
  dispatch({ type: types.CREATE_MATERIAL_DISCOUNT_REQUEST });
  axios
    .post(`${base_url2}/Discount`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.CREATE_MATERIAL_DISCOUNT_SUCCESS,
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
        type: types.CREATE_MATERIAL_DISCOUNT_FAILURE,
        payload: err,
      });
    });
};

export const getMaterialDiscount = (suppliesId,type) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_DISCOUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/Discount/discount/supplies/discount-history/${suppliesId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATERIAL_DISCOUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_DISCOUNT_FAILURE,
        payload: err,
      });
    });
};

export const createMaterialDiscountB2C = (data,) => (dispatch) => {
  dispatch({ type: types.CREATE_MATERIAL_DISCOUNTB2C_REQUEST });
  axios
    .post(`${base_url2}/Discount`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.CREATE_MATERIAL_DISCOUNTB2C_SUCCESS,
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
        type: types.CREATE_MATERIAL_DISCOUNTB2C_FAILURE,
        payload: err,
      });
    });
};

export const getMaterialDiscountB2C = (suppliesId,type) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_DISCOUNTB2C_REQUEST,
  });
  axios
    .get(`${base_url2}/Discount/discount/supplies/discount-history/${suppliesId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATERIAL_DISCOUNTB2C_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_DISCOUNTB2C_FAILURE,
        payload: err,
      });
    });
};

export const featureMaterialToggle = ( data,suppliesId) => (dispatch) => {
  dispatch({
    type: types.FEATURED_MATERIAL_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/supplies/update/featuredInd/${suppliesId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FEATURED_MATERIAL_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FEATURED_MATERIAL_TOGGLE_FAILURE,
        payload: err,
      });
    })
};
export const getMaterialCategory = () => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_CATEGORY_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/allSuppliesCatagory`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATERIAL_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_MATERIAL_CATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const addMaterialCategory = (product, cb) => (dispatch) => {
  dispatch({ type: types.ADD_MATERIAL_CATEGORY_REQUEST });
  axios
    .post(`${base_url2}/supplies/suppliescategory`, product, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_MATERIAL_CATEGORY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MATERIAL_CATEGORY_FAILURE,
        payload: err,
      });
      cb();
    });
};

export const materialCategorySearch = (categoryName) => (dispatch) => {
  dispatch({
    type: types.MATERIAL_CATEGORY_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/category/${categoryName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data.message);

      dispatch({
        type: types.MATERIAL_CATEGORY_SEARCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Material list is empty");
      dispatch({
        type: types.MATERIAL_CATEGORY_SEARCH_FAILURE,
        payload: err,
      });
    });
}; 




export const uploadMaterialList = (data) => (dispatch) => {
  dispatch({ type: types.UPLOAD_MATERIAL_LIST_REQUEST });
  axios
    .post(`${base_url2}/excel/supplies-details`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getProducts(0))
      window.location.reload()
      dispatch({
        type: types.UPLOAD_MATERIAL_LIST_SUCCESS,
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
        type: types.UPLOAD_MATERIAL_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getMaterialsBySuppliesId = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIALS_BY_SUPPLIES_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/product/bothSuppliesAndProduct/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATERIALS_BY_SUPPLIES_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_MATERIALS_BY_SUPPLIES_ID_FAILURE,
        payload: err,
      });
    });
};

export const getComplementaryList = (pageNo,suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_COMPLEMENTARY_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies/all-supplies/complementaryind/${pageNo}/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMPLEMENTARY_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_COMPLEMENTARY_LIST_FAILURE,
        payload: err,
      });
    });
};

export const suppliesPUnpblishToggle = ( data,categoryId) => (dispatch) => {
  dispatch({
    type: types.SUPPLIES_PUNBLISH_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/supplies/updateCategory/publishInd/${categoryId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.SUPPLIES_PUNBLISH_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SUPPLIES_PUNBLISH_TOGGLE_FAILURE,
        payload: err,
      });
    })
};
export const materialRecommendToggle = ( data,suppliesId) => (dispatch, getState) => {
  dispatch({
    type: types.MATERIAL_RECOMMEND_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url2}/supplies/update/recomendInd/${suppliesId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MATERIAL_RECOMMEND_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.MATERIAL_RECOMMEND_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const materialPricetype = ( data,suppliesId) => (dispatch, getState) => {
  dispatch({
    type: types.MATERIAL_PRICE_TYPE_REQUEST,
  });
  axios
  .post(`${base_url2}/supplies/suppliesPrice`,data,  {
    // headerss: {
    //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    // },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MATERIAL_PRICE_TYPE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.MATERIAL_PRICE_TYPE_FAILURE,
        payload: err,
      });
    })
};

export const linkComplementryToggle = ( data) => (dispatch) => {
  dispatch({
    type: types.MATERIAL_COMPLEMENTARY_REQUEST,
  });
  axios
  .post(`${base_url2}/supplies/complementary`,data,  {
    headerss: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.MATERIAL_COMPLEMENTARY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.MATERIAL_COMPLEMENTARY_FAILURE,
        payload: err,
      });
    })
};


export const addSuppliesBrand = (data, cb) => (dispatch) => {
  console.log("inside add product");
  dispatch({ type: types.ADD_SUPPLIES_BRAND_REQUEST });
  axios
    .post(`${base_url2}/supplies/saveSuppliesBrand`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SUPPLIES_BRAND_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SUPPLIES_BRAND_FAILURE,
        payload: err,
      });
      cb();
    });
};



export const getBrandSupplies = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_BRAND_SUPPLIES_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/supplies/allSuppliesBrand`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BRAND_SUPPLIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_BRAND_SUPPLIES_FAILURE,
        payload: err,
      });
    });
};



export const getBrandProductList = (brandId) => (dispatch) => {
  dispatch({
    type: types.GET_BRAND_PRODUCT_LIST_REQUEST,
  });
  axios
    // .get(`${base_url2}/product`,
    .get(`${base_url2}/supplies/supplies/brand/${brandId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BRAND_PRODUCT_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_BRAND_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    });
};


export const UpdateMaterialIamge = (data, itemId) => (dispatch) => {
  dispatch({ type: types.UPDATE_MATERIAL_IMAGE_REQUEST });
  axios
    .put(`${base_url2}/supplies/leadImage/${itemId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getMaterialsBySuppliesId(itemId));
      dispatch({
        type: types.UPDATE_MATERIAL_IMAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_MATERIAL_IMAGE_FAILURE,
        payload: err,
      });
    });
};



export const deleteSuppliesBrandData = (data,suppliesBrandId) => (dispatch) => {
  dispatch({
    type: types.DELETE_SUPPLIES_BRAND_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/supplies/deleteBrand/${suppliesBrandId}`,data, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
      dispatch(getBrandSupplies());
      
      console.log(res);
      dispatch({
        type: types.DELETE_SUPPLIES_BRAND_DATA_SUCCESS,
        payload: suppliesBrandId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SUPPLIES_BRAND_DATA_FAILURE,
        payload: err,
      });
    });
};




export const updateBrandMaterial = (data, suppliesBrandId, cb) => (dispatch) => {
  // console.log(leadDocumentsId, DocumentsName);
  dispatch({
    type: types.UPDATE_BRAND_MATERIAL_REQUEST,
  });
  axios
    .put(
      `${base_url2}/supplies/brandUpdate/${suppliesBrandId}`,
      data,
      {
        // headers: {
        //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        // },
      }
    )
    .then((res) => {
    
      // message.success("Document has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_BRAND_MATERIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_BRAND_MATERIAL_FAILURE,
      });
    });
};

export const handleImageSuppliesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_IMAGE_SUPPLIES_MODAL,
    payload: modalProps,
  });
};

export const handleNewAriival = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_NEWARRIVAL_MODAL,
    payload: modalProps,
  });
};
export const handleBestbefore = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BESTBEFORE_MODAL,
    payload: modalProps,
  });
};

export const getLocationSupplies = (orgId,suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_LOCATION_SUPPLIES_REQUEST,
  });
  axios
    .get(`${base_url}/locationDetails/getLocationDetailsList/${orgId}/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOCATION_SUPPLIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOCATION_SUPPLIES_FAILURE,
        payload: err,
      });
    });
};

export const getSuppliesDocument = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_DOCUMENTS_REQUEST,
  });
  axios
    .get(`${base_url}/supplies/document/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIES_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIES_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const deleteSuppliesData = (documentId) => (dispatch) => {
  dispatch({
    type: types.DELETE_SUPPLIES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url2}/supplies/document/${documentId}`)
    .then((res) => {
      console.log(res);
      // dispatch(getDeletedPurchaseById());
      dispatch({
        type: types.DELETE_SUPPLIES_DATA_SUCCESS,
        payload: documentId,
      });
      message.success("Supplies deleted Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SUPPLIES_DATA_FAILURE,
        payload: err,
      });
      message.error("Something went wrong")
    });
};

export const handleErpDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ERP_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};




export const getSuppliesLocationItem = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_LOCATION_ITEM_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getReorder/material/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_SUPPLIES_LOCATION_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIES_LOCATION_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const getItemData = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ITEM_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/newArrivals/material/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_ITEM_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ITEM_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getBestBefore = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_BEST_BEFORE_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getBestBeforeItemList/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_BEST_BEFORE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BEST_BEFORE_FAILURE,
        payload: err,
      });
    });
};

export const addLocationSuppliesValue = (documents,suppliesId, cb) => (dispatch) => {
  console.log(documents);
  dispatch({
    type: types.ADD_LOCATION_SUPPLIES_VALUE_REQUEST,
  });
  axios
    .put(`${base_url2}/supplies/location/reOrderLevel/${suppliesId}`, documents, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
    
      
      // dispatch(getDocuments());
      //dispatch(getRegionCount(orgId));
      console.log(res);
      dispatch({
        type: types.ADD_LOCATION_SUPPLIES_VALUE_SUCCESS,
        payload: res.data
        
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LOCATION_SUPPLIES_VALUE_FAILURE,
      });
      cb();
    });

     

};

export const getBestBeforeEmailList = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_BEST_BEFORE_EMAILLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getBestBeforeEmailList/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_BEST_BEFORE_EMAILLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BEST_BEFORE_EMAILLIST_FAILURE,
        payload: err,
      });
    });
};

export const getNewArrivalList = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_NEW_ARRIVALLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/getNewArrivals/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_NEW_ARRIVALLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NEW_ARRIVALLIST_FAILURE,
        payload: err,
      });
    });
};

export const getBestBeforeContactList = (bstBfrUseId) => (dispatch) => {
  dispatch({
    type: types.GET_BEST_BEFORE_CONTACTLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getBestBeforeSuppliesDetails/${bstBfrUseId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_BEST_BEFORE_CONTACTLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BEST_BEFORE_CONTACTLIST_FAILURE,
        payload: err,
      });
    });
};

export const getNewArrivalContactList = (newArrId) => (dispatch) => {
  dispatch({
    type: types.GET_NEW_ARRIVAL_CONTACTLIST_REQUEST,
  });
  axios
    .get(`${base_url2}/getNewArrivalsSuppliesDetails/${newArrId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_NEW_ARRIVAL_CONTACTLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NEW_ARRIVAL_CONTACTLIST_FAILURE,
        payload: err,
      });
    });
};

export const getArrivalContact = (newArrId) => (dispatch) => {
  dispatch({
    type: types.GET_ARRIVAL_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url2}/getNewArrivalsContactDetails/${newArrId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_ARRIVAL_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ARRIVAL_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const getEmailContact = (bstBfrUseId) => (dispatch) => {
  dispatch({
    type: types.GET_EMAIL_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getBestBfrContactDetails/${bstBfrUseId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_EMAIL_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMAIL_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const deleteEmailList = (orgId) => (dispatch) => {
  dispatch({
    type: types.DELETE_EMAILLIST_REQUEST,
  });
  axios
    .delete(`${base_url2}/po/bestBfrUseHistory/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getDeletedPurchaseById());
      dispatch({
        type: types.DELETE_EMAILLIST_SUCCESS,
        payload: orgId,
      });
      message.success("Supplies deleted Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EMAILLIST_FAILURE,
        payload: err,
      });
      message.error("Something went wrong")
    });
};

export const deleteNewArrival = (orgId) => (dispatch) => {
  dispatch({
    type: types.DELETE_NEWARRIVAL_REQUEST,
  });
  axios
    .delete(`${base_url2}/newArrivalHistory/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getDeletedPurchaseById());
      dispatch({
        type: types.DELETE_NEWARRIVAL_SUCCESS,
        payload: orgId,
      });
      message.success("Supplies deleted Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_NEWARRIVAL_FAILURE,
        payload: err,
      });
      message.error("Something went wrong")
    });
};





export const addQualityCategory = (product, categoryId,cb) => (dispatch) => {
  dispatch({ type: types.ADD_QUALITY_CATEGORY_REQUEST });
  axios
    .put(`${base_url2}/supplies/suppliescatagory/qualitySpecs/${categoryId}`, product, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_QUALITY_CATEGORY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_QUALITY_CATEGORY_FAILURE,
        payload: err,
      });
      cb();
    });
};

export const getPriceFactor = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_PRICE_FACTOR_REQUEST,
  });
  axios
  .get(`${base_url2}/supplies/suppliesFactor/${suppliesId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRICE_FACTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRICE_FACTOR_FAILURE,
        payload: err,
      });
    });
};

export const getBarcodeViewer = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_BAR_CODE_VIEWER_REQUEST,
  });
  axios
  .get(`${base_url2}/supplies/multiBarCode/${suppliesId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BAR_CODE_VIEWER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_BAR_CODE_VIEWER_FAILURE,
        payload: err,
      });
    });
};

export const getPriceUpdated = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_PRICE_UPDATED_REQUEST,
  });
  axios
  .get(`${base_url2}/po/getPrices/pomaterial/${locationId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRICE_UPDATED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRICE_UPDATED_FAILURE,
        payload: err,
      });
    });
};

export const getPriceUpdatedCount = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_PRICE_UPDATED_COUNT_REQUEST,
  });
  axios
  .get(`${base_url2}/po/getprice/count/pomaterial/${locationId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRICE_UPDATED_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRICE_UPDATED_COUNT_FAILURE,
        payload: err,
      });
    });
};