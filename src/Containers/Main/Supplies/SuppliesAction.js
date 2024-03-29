import * as types from "./SuppliesActionType";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import moment from "moment";
import { message } from "antd";

export const setSuppliesViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_SUPPLIES_VIEW_TYPE, payload: viewType });

export const handleSuppliesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SUPPLIES_MODAL,
    payload: modalProps,
  });
};

export const handleBrandModel = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BRAND_MODEL,
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
      dispatch(getSuppliesList());
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

export const getSuppliesList = () => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIES_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/supplies`, {
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

export const updateSupplies = (data, suppliesId,cb) => (dispatch) => {
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
        payload: res.data,
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
      dispatch(getSuppliesList())
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

export const handleMaterialBuilderDrawer=(modalProps)=>(dispatch)=>{
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
export const removeMaterialBuilder = (data,supplySupplyLinkId) => (dispatch) => {
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