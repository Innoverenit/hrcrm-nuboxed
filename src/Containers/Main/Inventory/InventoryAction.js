import * as types from "./InventoryActionType";
import { base_url } from "../../../Config/Auth";
import { base_url2 } from "../../../Config/Auth";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";

export const setInventoryViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_INVENTORY_VIEW_TYPE, payload: viewType });



export const handleReceiveScanModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVE_SCAN_MODAL,
    payload: modalProps,
  });
};


export const handleQualityManufactureModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_QUALITY_MANUFACTURE_DRAWER_MODAL,
    payload: modalProps,
  });
};



export const handleScanModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SCAN_MODAL,
    payload: modalProps,
  });
};

export const handleStockUpload = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_STOCK_MODAL,
    payload: modalProps,
  });
};

export const emptyQualityManufactureData = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_QUALITY_MANUFACTURE_DATA, 
  });
};

export const handleInventoryModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_MODAL,
    payload: modalProps,
  });
};
export const handleInventoryDispatchModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_DISPATCH_MODAL,
    payload: modalProps,
  });
};
export const handleAddDispatchModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_DISPATCH_MODAL,
    payload: modalProps,
  });
};
//add Inventory
export const addInventory = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_INVENTORY_REQUEST,
  });

  axios
    .post(`${base_url}/`, data, {})
    .then((res) => {
      console.log(res);
      // dispatch(getINVENTORY());
      dispatch({
        type: types.ADD_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVENTORY_FAILURE,
        payload: err,
      });
    });
};


//get inventory data

export const getInventory = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_REQUEST,
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
        type: types.GET_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORY_FAILURE,
        payload: err,
      });
    });
};

//INVENTORY Details
export const getInventoryById = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/locationDetails/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORY_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORY_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * request for adding a inventory output
 */
export const addInventoryOutput = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_INVENTORY_OUTPUT_REQUEST,
  });

  axios
    .post(`${base_url}/inventory/production/productLink`, data)
    .then((res) => {
      console.log(res);
      dispatch(getInventoryOutputList(locationDetailsId));
      console.log(locationDetailsId);
      dispatch({
        type: types.ADD_INVENTORY_OUTPUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVENTORY_OUTPUT_FAILURE,
        payload: err,
      });
    });
};

//OUTPUT TABLE
export const getInventoryOutputList = (locationDetailsId) => (dispatch) => {
  console.log(locationDetailsId);
  dispatch({
    type: types.GET_ALL_INVENTORY_OUTPUT_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/production/product/${locationDetailsId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_INVENTORY_OUTPUT_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_INVENTORY_OUTPUT_LIST_FAILURE,
        payload: err,
      });
    });
};

//add inventory Consumption

export const addInventoryConsumption = (data, locationDetailsId) => (
  dispatch,
  getState
) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_INVENTORY_CONSUMPTION_REQUEST,
  });

  axios
    .post(`${base_url2}/inventory/inventorySuppliesLink`, data)
    .then((res) => {
      console.log(res);

      dispatch(getInventoryConsumptionList(locationDetailsId));

      dispatch({
        type: types.ADD_INVENTORY_CONSUMPTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVENTORY_CONSUMPTION_FAILURE,
        payload: err,
      });
    });
};

//Consumption TABLE
export const getInventoryConsumptionList = (locationDetailsId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_ALL_INVENTORY_CONSUMPTION_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/inventory/supplies/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_INVENTORY_CONSUMPTION_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_INVENTORY_CONSUMPTION_LIST_FAILURE,
        payload: err,
      });
    });
};
//particularRow edit or update
export const setEditInventory = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_INVENTORY,
    payload: name,
  });
};

export const handleReceivedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVED_MODAL,
    payload: modalProps,
  });
};

export const handleRejectReasonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REJECTED_REASON_MODAL,
    payload: modalProps,
  });
};

export const handleCreateAWB = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CREATE_AWB_MODAL,
    payload: modalProps,
  });
};

export const handleCreateAddPack = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CREATE_PACK_MODAL,
    payload: modalProps,
  });
};

export const handlepackId = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CREATE_PACK_ID,
    payload: modalProps,
  });
};

export const setInventoryDetailViewType = (viewType1) => (dispatch) => {
  dispatch({
    type: types.SET_INVENTORY_DETAIL_VIEW_TYPE,
    payload: viewType1,
  });
};
export const handleAddAWB = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_AWB_MODAL,
    payload: modalProps,
  });
};
//add received
export const createAwbNo = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_RECEIVED_REQUEST,
  });

  axios
    .post(`${base_url2}/orderAwb/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(id,0))
      dispatch({
        type: types.ADD_RECEIVED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch(getDispatchList(id,0))
      dispatch({
        type: types.ADD_RECEIVED_FAILURE,
        payload: err,
      });
    });
};

export const sentItemToStock = (data, id) => (dispatch) => {
  dispatch({
    type: types.SENT_ITEM_TO_STOCK_REQUEST,
  });

  axios
    .put(`${base_url2}/po/unitUpdate`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.SENT_ITEM_TO_STOCK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SENT_ITEM_TO_STOCK_FAILURE,
        payload: err,
      });
    });
};
//get received user list
export const getReceivedUserList = (locationDetailsId, page) => (dispatch) => {
  dispatch({
    type: types.GET_RECEIVED_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/get-all/${locationDetailsId}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECEIVED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECEIVED_FAILURE,
        payload: err,
      });
    });
};

export const getCellById = (suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_CELL_NUMBER_REQUEST,
  });
  axios
    .get(`${base_url2}/cell/cellchamber/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CELL_NUMBER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CELL_NUMBER_FAILURE,
        payload: err,
      });
    });
};
export const handleFileDamagedModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_FILE_DAMAGED_MODAL,
    payload: modalProps,
  });
};

//add dispatch
export const addDispatch = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_DISPATCH_REQUEST,
  });

  axios
    .post(`${base_url}/dispatch/dispatchSuppliesLink`, data)
    .then((res) => {
      console.log(res);
      dispatch(getDispatch(res.data));
      // dispatch(getDispatchList(locationDetailsId));
      dispatch({
        type: types.ADD_DISPATCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DISPATCH_FAILURE,
        payload: err,
      });
    });
};

//get Dispatch first table

export const getDispatch = (dispatchId) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_REQUEST,
  });
  axios
    .get(`${base_url}/dispatch/dispatchSuppliesLink/${dispatchId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_FAILURE,
        payload: err,
      });
    });
};

//shipper contact checkbox
export const completeShipperContact = (data, dispatchId) => (dispatch) => {
  dispatch({
    type: types.COMPLETE_SHIPPER_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url}/dispatch/saveDispatchShipperDetails`, data)
    .then((res) => {
      dispatch(getDispatchShipperListInUpdate(dispatchId));
      dispatch({
        type: types.COMPLETE_SHIPPER_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.COMPLETE_SHIPPER_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};

//store one row data in seconsteptable
// export const setEditShipperContactData = (contact) => (dispatch) => {
//   dispatch({
//     type: types.SET_EDIT_SHIPPER_CONTACT_DATA,
//     payload: contact,
//   });
// };

//get dispatch list
export const getDispatchList = (locationId,pageNo,type) => (dispatch) => {
  // const dispatchId = getState().inventory.dispatch.dispatchId;
  dispatch({
    type: types.GET_DISPATCH_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/get-newDispatchData/${locationId}/${pageNo}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getCompleteDispatchList = (locationId,pageNo,type) => (dispatch) => {
  dispatch({
    type: types.GET_COMPLETE_DISPATCH_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/get-completeDispatchData/${locationId}/${pageNo}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMPLETE_DISPATCH_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMPLETE_DISPATCH_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getCompleteDispatchSearch = (locationId,type,newOrderNo) => (dispatch) => {
  dispatch({
    type: types.GET_COMPLETE_DISPATCH_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/searchNewDispatchData/${locationId}/${type}/${newOrderNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMPLETE_DISPATCH_SEARCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMPLETE_DISPATCH_SEARCH_FAILURE,
        payload: err,
      });
    });
};



export const getCommerceList = (orgId,pageNo) => (dispatch) => {
  // const dispatchId = getState().inventory.dispatch.dispatchId;
  dispatch({
    type: types.GET_COMMERCE_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/all-procure-dispatch/${orgId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMERCE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMERCE_LIST_FAILURE,
        payload: err,
      });
    });
};

//get received details list
export const getReceivedDetailsList = (dispatchId) => (dispatch, getState) => {
  // const dispatchId = getState().inventory.allDispatchList
  //   .dispatchId;
  console.log(dispatchId);
  dispatch({
    type: types.GET_RECEIVED_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/plant/dispatchSupplies/${dispatchId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECEIVED_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECEIVED_DETAILS_FAILURE,
        payload: err,
      });
    });
};
//dispatch Update
export const setEditDispatch = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_DISPATCH,
    payload: name,
  });
};

export const getDispatchUpdateList = (orderPhoneId) => (dispatch, getState) => {

  dispatch({
    type: types.GET_DISPATCH_UPDATE_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/dispatchPhoneDetail/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_UPDATE_FAILURE,
        payload: err,
      });
    });
};

export const handleDispatchModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISPTCH_MODAL,
    payload: modalProps,
  });
};

export const addReceivedItem = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_TOTAL_RECEIVED_ITEM_REQUEST,
  });
  axios
    .post(`${base_url2}/recieved`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_TOTAL_RECEIVED_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOTAL_RECEIVED_ITEM_FAILURE,
        payload: err,
      });
    });
};


export const getProductionQualityData = (locationDetailsId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_QUALITY_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/production/product/transferList/${locationDetailsId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_QUALITY_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_QUALITY_DATA_FAILURE,
        payload: err,
      });
    });
};
export const addDamagedItem = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_TOTAL_DAMAGED_ITEM_REQUEST,
  });
  axios
    .post(`${base_url}/damaged`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_TOTAL_DAMAGED_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOTAL_DAMAGED_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const handlePickupDateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PICKUP_DATE_MODAL,
    payload: modalProps,
  });
};

//thirdStep url
export const addFinalDispatchData = (data, orderId, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_FINAL_DATA_IN_THIRDSTEP_REQUEST,
  });
  axios
    .put(`${base_url2}/dispatchData/${orderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(locationDetailsId));
      dispatch({
        type: types.ADD_FINAL_DATA_IN_THIRDSTEP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_FINAL_DATA_IN_THIRDSTEP_FAILURE,
        payload: err,
      });
    });
};

export const handleOutputReasonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OUTPUT_REASON_MODAL,
    payload: modalProps,
  });
};
export const setEditInventoryOutput = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_INVENTORY_OUTPUT,
    payload: name,
  });
};
//post reason

export const addOutputReason = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_REASON_REQUEST,
  });
  axios
    .post(`${base_url}/inventory/saveInventoryOutputSale`, data)
    .then((res) => {
      dispatch(getInventoryOutputList(locationDetailsId));
      dispatch({
        type: types.ADD_REASON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_REASON_FAILURE,
        payload: err,
      });
    });
};

//get reason list
export const getOutputReasonList = () => (dispatch) => {
  dispatch({
    type: types.GET_OUTPUT_REASON_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/inventoryReason`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OUTPUT_REASON_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OUTPUT_REASON_LIST_FAILURE,
        payload: err,
      });
    });
};

///CONSUMPTION
export const handleConsumptionReasonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONSUMPTION_REASON_MODAL,
    payload: modalProps,
  });
};
export const setEditInventoryConsumption = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_INVENTORY_CONSUMPTION,
    payload: name,
  });
};
//post reason

export const addConsumptionReason = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_CONSUMPTION_REASON_REQUEST,
  });
  axios
    .post(`${base_url2}/inventory/saveConsumptionSale`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_CONSUMPTION_REASON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CONSUMPTION_REASON_FAILURE,
        payload: err,
      });
    });
};

//get reason list
export const getConsumptionReasonList = () => (dispatch) => {
  dispatch({
    type: types.GET_CONSUMPTION_REASON_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/inventory/consumptionReason`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONSUMPTION_REASON_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONSUMPTION_REASON_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleAddOutputReasonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_OUTPUT_REASON_MODAL,
    payload: modalProps,
  });
};
//output tab reason
export const addOutputPlusReason = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_OUTPUT_PLUS_REASON_REQUEST,
  });
  axios
    .post(`${base_url}/`, data)
    .then((res) => {
      dispatch({
        type: types.ADD_OUTPUT_PLUS_REASON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_OUTPUT_PLUS_REASON_FAILURE,
        payload: err,
      });
    });
};

//get reason list
export const getOutputPlusReasonList = () => (dispatch) => {
  dispatch({
    type: types.GET_OUTPUT_PLUS_REASON_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OUTPUT_PLUS_REASON_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OUTPUT_PLUS_REASON_LIST_FAILURE,
        payload: err,
      });
    });
};

//pickup date

export const addPickupDate = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_PICKUP_DATE_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/dispatch/confirm/receive`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(id,0))
      dispatch({
        type: types.ADD_PICKUP_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PICKUP_DATE_FAILURE,
      });
    });
};

//received Delivery Date

export const setEditReceivedDetails = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_RECEIVED_DETAILS,
    payload: name,
  });
};

export const addDeliveryDate = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_DELIVERY_DATE_REQUEST,
  });
  axios
    .post(`${base_url2}/orderProductionLocationLink/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getReceivedUserList(locationDetailsId))
      dispatch({
        type: types.ADD_DELIVERY_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_DELIVERY_DATE_FAILURE,
      });
    });
};
export const getShipperDetailsList = (shipperId) => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPER_DETAILS_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/shipper/dispatch/${shipperId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPER_DETAILS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPER_DETAILS_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleDeliveryDateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DELIVERY_DATE_MODAL,
    payload: modalProps,
  });
};

export const setEditReceiveInventory = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_RECEIVE_INVENTORY,
    payload: name,
  });
};

export const getInventoryReports = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_REPORTS_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/getInventoryOutputSale/${locationDetailsId}`)
    .then((res) => {
      dispatch({
        type: types.GET_INVENTORY_REPORTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_INVENTORY_REPORTS_FAILURE,
        payload: err,
      });
    });
};

export const deleteDispatchProduct = (dispatchSuppliesDetailsId, dispatchId) => (dispatch) => {
  dispatch({
    type: types.DELETE_DISPATCH_PRODUCT_LIST_REQUEST,
  });
  axios
    .delete(`${base_url}/dispatch/deleteDispatchProduct/${dispatchSuppliesDetailsId}`)
    .then((res) => {
      console.log(res);
      dispatch(getDispatch(dispatchId));
      dispatch({
        type: types.DELETE_DISPATCH_PRODUCT_LIST_SUCCESS,
        payload: dispatchSuppliesDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DISPATCH_PRODUCT_LIST_FAILURE,
        payload: err,
      });
    });
};


export const updateDipatchshipping = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_DISPATCH_SHIPPING_REQUEST,
  });
  axios
    .post(`${base_url}/dispatch/updateDispatchShippingLocation`, data)
    .then((res) => {
      console.log(res);
      dispatch(getDispatchList(locationDetailsId))
      dispatch({
        type: types.UPDATE_DISPATCH_SHIPPING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_DISPATCH_SHIPPING_FAILURE,
      });
    });
};

export const getDispatchShipperList = (dispatchId) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_SHIPPER_REQUEST,
  });
  axios
    .get(`${base_url2}/dispatch/dispatchShipper/${dispatchId} `)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_FAILURE,
        payload: err,
      });
    });
};

export const getInventoryDispatchProduct = (locationDetailsId) => (dispatch) => {
  console.log(locationDetailsId);
  dispatch({
    type: types.GET_INVENTORY_DISPATCH_PRODUCT_REQUEST,
  });
  axios
    .get(`${base_url}/inventory/dispatchProductItem/${locationDetailsId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORY_DISPATCH_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORY_DISPATCH_PRODUCT_FAILURE,
        payload: err,
      });
    });
};

export const updateShipperContact = (data, dispatchId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SHIPPER_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url}/dispatch/updateDispatchShipper `, data)
    .then((res) => {
      dispatch(getDispatchShipperListInUpdate(dispatchId));
      dispatch({
        type: types.UPDATE_SHIPPER_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SHIPPER_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};
export const searchDispatchItem = (data) => (dispatch) => {
  dispatch({ type: types.SEARCH_DISPATCH_ITEM_REQUEST });
  axios
    .post(`${base_url}/shipper/contact-person-list-report`, data)
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

export const getDispatchShipperListInUpdate = (dispatchId) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_SHIPPER_UPDATE_REQUEST,
  });
  axios
    .get(`${base_url2}/dispatch/dispatchShipper/${dispatchId} `)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISPATCH_SHIPPER_UPDATE_FAILURE,
        payload: err,
      });
    });
};

export const addAirwayBillInShipper = (data, dispatchShipperId) => (dispatch) => {
  dispatch({ type: types.ADD_AIR_WAY_BILL_IN_SHIPPER_REQUEST });
  axios
    .put(`${base_url}/dispatch/updateAirwayBill/${dispatchShipperId}`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_AIR_WAY_BILL_IN_SHIPPER_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_AIR_WAY_BILL_IN_SHIPPER_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

export const handleReceivedOrderIdModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVED_ORDERID_MODAL,
    payload: modalProps,
  });
};

export const handleMismatchPhoneModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_MISMATCH_PHONE_MODAL,
    payload: modalProps,
  });
};
export const handleInventoryReceivedNoteOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_RECEIVED_NOTE_ORDER_MODAL,
    payload: modalProps,
  })
};
export const handleReceivedOrderIdPhoneNoteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVED_ORDERID_PHONE_NOTE_MODAL,
    payload: modalProps,
  })
};

export const handleInventoryRoomRackModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_ROOM_RACK_MODAL,
    payload: modalProps,
  });
};

export const addRoomAndRackInInventory = (data, locationId, organizationId) => (dispatch) => {

  dispatch({ type: types.ADD_ROOM_AND_RACK_IN_INVENTORY_REQUEST });
  axios
    .post(`${base_url2}/roomrack/add`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getRoomRackByLocId(locationId, organizationId))
      dispatch({
        type: types.ADD_ROOM_AND_RACK_IN_INVENTORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ROOM_AND_RACK_IN_INVENTORY_FAILURE,
        payload: err,
      });
    });
};

export const updateValidationInReceive = (data, phoneId, id) => (dispatch) => {
  dispatch({ type: types.UPDATE_VALIDATION_IN_RECEIVE_REQUEST });
  axios
    .put(`${base_url2}/phone/receivePhoneToggle/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_VALIDATION_IN_RECEIVE_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_VALIDATION_IN_RECEIVE_FAILURE,
        payload: err,
      });
    });
};

export const handlereceivePhoneModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVE_PHONE_MODAL,
    payload: modalProps,
  });
};

export const handleDispatchreceivePhoneModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DISPATCH_RECEIVE_PHONE_MODAL,
    payload: modalProps,
  });
};
export const updateInspection = (data, orderPhoneId) => (dispatch) => {
  dispatch({ type: types.UPDATE_INSPECTION_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/inspectionIndStatus/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Inspection Status Updated',
        showConfirmButton: true,
        showConfirmButton: false,
        timer: 1500,
      })
      // dispatch(getReceivedUserList(locationId))
      dispatch({
        type: types.UPDATE_INSPECTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_INSPECTION_FAILURE,
        payload: err,
      });
    });
};

export const getPhonelistByOrderId = (orderPhoneId, page) => (dispatch) => {
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

export const setEditPhoneData = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PHONELIST_EDIT,
    payload: name,
  });
};
export const setEditDispacthPhoneData = (name) => (dispatch) => {
  dispatch({
    type: types.SET_DISPATCH_PHONELIST_EDIT,
    payload: name,
  });
};
export const updateDispatchInspectionButton = (data, orderPhoneId) => (dispatch) => {
  dispatch({ type: types.UPDATE_DISPATCH_INSPECTION_BUTTON_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/dispatchInspectionIndStatus/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_DISPATCH_INSPECTION_BUTTON_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISPATCH_INSPECTION_BUTTON_FAILURE,
        payload: err,
      });
    });
};

export const updateDispatchReceivePhone = (data, phoneId, orderPhoneId) => (dispatch) => {
  dispatch({ type: types.UPDATE_DISPATCH_RECEIVE_PHONE_REQUEST });
  axios
    .put(`${base_url2}/phone/dispatchPhoneToggle/${phoneId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getDispatchUpdateList(orderPhoneId))
      dispatch({
        type: types.UPDATE_DISPATCH_RECEIVE_PHONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DISPATCH_RECEIVE_PHONE_FAILURE,
        payload: err,
      });
    });
};

export const handlePickupModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PICKUP_MODAL,
    payload: modalProps,
  });
};


export const getQualityManufactureData = (productId, manufactureId) => (dispatch) => {
  dispatch({
    type: types.GET_QUALITY_MANUFACTURE_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/qualityCheckBuilder/qualityCheck/get/${productId}/${manufactureId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUALITY_MANUFACTURE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_QUALITY_MANUFACTURE_DATA_FAILURE,
        payload: err,
      });
    });
};


export const getProductRepurbish = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_REFURBISH_REQUEST,
  });
  axios
    .get(`${base_url2}/inventory/getProductRepurbish/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getChoosenCurrencyId(contactPersonId));
      dispatch({
        type: types.GET_PRODUCT_REFURBISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_REFURBISH_FAILURE,
        payload: err,
      });
    });
};

export const getMaterialReceiveData = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_RECEIVE_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/orderInventoryLocationLink/getPolist/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MATERIAL_RECEIVE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_RECEIVE_DATA_FAILURE,
        payload: err,
      });
    });
};

export const handleMaterialReceived = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_MATERIAL_RECEIVED_MODAL,
    payload: modalProps,
  });
};

export const getMaterialReceivedDetailData = (pOSupplierDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_RECEIVE_DETAIL_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/po/inventory/poSupplierDetails/${pOSupplierDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MATERIAL_RECEIVE_DETAIL_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_RECEIVE_DETAIL_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getCellData = (locationDetailsId, orgId) => (dispatch) => {
  dispatch({
    type: types.GET_CELL_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/po/cellChamber/material/${locationDetailsId}/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_CELL_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CELL_DATA_FAILURE,
        payload: err,
      });
    });
};
export const updateReceivedDamagedUnit = (data, poSupplierDetailsId, suppliesId) => (dispatch) => {
  dispatch({ type: types.UPDATE_RECEIVED_DAMAGED_UNIT_REQUEST });
  axios
    .put(`${base_url2}/po/updateUnitAndInd/${poSupplierDetailsId}/${suppliesId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: true,
        showConfirmButton: false,
        timer: 1500,
      })
      console.log(res);
      dispatch({
        type: types.UPDATE_RECEIVED_DAMAGED_UNIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_RECEIVED_DAMAGED_UNIT_FAILURE,
        payload: err,
      });
    });
};


export const getDispatchProductionsbyLocId = (locationDetailsId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_DISPATCH_PRODUCTION_BYLOC_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/production/dispatch/transferList/${locationDetailsId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISPATCH_PRODUCTION_BYLOC_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DISPATCH_PRODUCTION_BYLOC_ID_FAILURE,
        payload: err,
      });
    });
};

export const getArchieveProductionbyLocId = (locationDetailsId, userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ARCHIEVE_PRODUCTION_BYLOC_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/production/archieve/${locationDetailsId}/${userId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ARCHIEVE_PRODUCTION_BYLOC_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ARCHIEVE_PRODUCTION_BYLOC_ID_FAILURE,
        payload: err,
      });
    });
};

export const generateGrnForPo = (data) => (dispatch) => {
  dispatch({
    type: types.GENERATE_GRN_FOR_PO_REQUEST,
  });
  axios
    .post(`${base_url2}/po/createGrn`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Grn Created Successfully',
        showConfirmButton: true,
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.GENERATE_GRN_FOR_PO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GENERATE_GRN_FOR_PO_FAILURE,
        payload: err,
      });
    });
};

export const handlegrnlistmodal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_GRN_LIST_MODAL,
    payload: modalProps,
  });
};

export const getGrnListOfaPoInStock = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_GRN_LIST_OF_A_PO_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getPoStockItemlist/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_GRN_LIST_OF_A_PO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_GRN_LIST_OF_A_PO_FAILURE,
        payload: err,
      });
    });
};

export const getItemInCellStock = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_ITEM_IN_CELL_STOCK_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getPoCellItemlist/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_ITEM_IN_CELL_STOCK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ITEM_IN_CELL_STOCK_FAILURE,
        payload: err,
      });
    });
};
export const trnasferGrnItemToStock = (data, poSupplierSuppliesId, cb) => (dispatch) => {
  dispatch({
    type: types.TRANSFER_PO_GRN_TO_STOCK_REQUEST,
  });
  axios
    .put(`${base_url2}/po/updateStock/${poSupplierSuppliesId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: true,
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.TRANSFER_PO_GRN_TO_STOCK_SUCCESS,
        payload: res.data,
      });
      cb()
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.TRANSFER_PO_GRN_TO_STOCK_FAILURE,
        payload: err,
      });
    });
};

export const handleReceivedUnit = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECEIVED_UNIT_MODAL,
    payload: modalProps,
  });
};

export const handleSTockItemModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_STOCK_ITEM_MODAL,
    payload: modalProps,
  });
};

export const getReceivedUnitOfAnItem = (poSupplierSuppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_RECEIVED_UNIT_OF_AN_ITEM_REQUEST,
  });
  axios
    .get(`${base_url2}/po/uniqueItemList/${poSupplierSuppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_RECEIVED_UNIT_OF_AN_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECEIVED_UNIT_OF_AN_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const updatePartIdOfAnItem = (data, supplierSuppliesUniqueNumberId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_PART_ID_OF_AN_ITEM_REQUEST,
  });
  axios
    .put(`${base_url2}/po/updatePartNumber/${supplierSuppliesUniqueNumberId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Part no updated successfully',
        showConfirmButton: true,
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.UPDATE_PART_ID_OF_AN_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PART_ID_OF_AN_ITEM_FAILURE,
        payload: err,
      });
    });
};
export const updateRepairStatus = (data, phoneId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_REPAIR_STATUS_REQUEST,
  });
  axios
    .put(`${base_url2}/phone/canNotRepair/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_REPAIR_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_REPAIR_STATUS_FAILURE,
        payload: err,
      });
    });
};
export const getGrnNoByPoId = (pOSupplierDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_GRN_NO_BY_PO_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/po/grnList/${pOSupplierDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_GRN_NO_BY_PO_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_GRN_NO_BY_PO_ID_FAILURE,
        payload: err,
      });
    });
};

export const getPartNoByItem = (poSupplierSuppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_PART_NO_BY_ITEM_REQUEST,
  });
  axios
    .get(`${base_url2}/po/stock/uniqueItemList/${poSupplierSuppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_PART_NO_BY_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PART_NO_BY_ITEM_FAILURE,
        payload: err,
      });
    });
};

export const updateOrderReceiveToggle = (data, orderId, locationId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_ORDER_RECEIVE_REQUEST,
  });
  axios
    .put(`${base_url2}/inventoryReceived/${orderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getReceivedUserList(locationId))
      dispatch({
        type: types.UPDATE_ORDER_RECEIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_ORDER_RECEIVE_FAILURE,
        payload: err,
      });
    });
};

export const emptyInventory = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_INVENTORY_LIST,
  });
};

export const handleStockUsedDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_STOCK_USED_DRAWER,
    payload: modalProps,
  });
};

export const getRoomRackByLocId = (locationDetailsId, orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ROOM_RACK_BY_LOCID_REQUEST,
  });
  axios
    .get(`${base_url2}/roomrack/allChamberDetails/${locationDetailsId}/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_ROOM_RACK_BY_LOCID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ROOM_RACK_BY_LOCID_FAILURE,
        payload: err,
      });
    });
};
export const updateRoomRackId = (data, roomRackChamberLinkId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_ROOM_RACK_ID_REQUEST,
  });
  axios
    .put(`${base_url2}/roomrack/update/roomRackChamberLink/${roomRackChamberLinkId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getReceivedUserList(locationId))
      dispatch({
        type: types.UPDATE_ROOM_RACK_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_ROOM_RACK_ID_FAILURE,
        payload: err,
      });
    });
};
export const getRackList = (roomRackId) => (dispatch) => {
  dispatch({
    type: types.GET_RACK_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/roomrack/${roomRackId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: types.GET_RACK_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RACK_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getItemHistoryInstock = (pOSupplierSuppliesDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_ITEM_HISTORY_IN_STOCK_REQUEST,
  });
  axios
    .get(`${base_url2}/po/unitList/${pOSupplierSuppliesDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_ITEM_HISTORY_IN_STOCK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ITEM_HISTORY_IN_STOCK_FAILURE,
        payload: err,
      });
    });
};

export const rejectPhoneData = (data, phoneId) => (dispatch) => {
  dispatch({
    type: types.REJECT_PHONE_REQUEST,
  });
  axios
    .put(`${base_url2}/phone/reject/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.REJECT_PHONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.REJECT_PHONE_FAILURE,
        payload: err,
      });
    });
};




export const getMaterialUnitsData = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_UNITS_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getPoStock/material/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MATERIAL_UNITS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_UNITS_DATA_FAILURE,
        payload: err,
      });
    });
};


export const getInventoryLocationRecords = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_LOCATION_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/locationCount/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORY_LOCATION_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_INVENTORY_LOCATION_RECORDS_FAILURE,
        payload: err,
      });
    });
};




export const getItemHistoryDataInstock = (locationId,suppliesId) => (dispatch) => {
  dispatch({
    type: types.GET_ITEM_HISTORY_DATA_IN_STOCK_REQUEST,
  });
  axios
    .get(`${base_url2}/po/stockMaterialData/${locationId}/${suppliesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_ITEM_HISTORY_DATA_IN_STOCK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ITEM_HISTORY_DATA_IN_STOCK_FAILURE,
        payload: err,
      });
    });
};


export const handleCustomModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOM_MODAL,
    payload: modalProps,
  });
};



export const moveProductionQuality = (data,productionProductId,userId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_PRODUCTION_QUALITY_REQUEST,
  });
  axios
    .put(`${base_url2}/production/update/dispatch/${productionProductId}/${userId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.REMOVE_PRODUCTION_QUALITY_SUCCESS,
        payload: productionProductId,
      });
      message.success(res.data);
    })
    .catch((err) => {
      dispatch({
        type: types.REMOVE_PRODUCTION_QUALITY_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};




export const updateQualityStatus = (productionProductId,status) => (dispatch) => {
  dispatch({ type: types.UPDATE_QUALITY_STATUS_REQUEST });
  axios
    .put(
      `${base_url2}/production/quality/updateStatus/${productionProductId}/${status}`, {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.UPDATE_QUALITY_STATUS_SUCCESS,
        payload: res.data,
      });
      Swal({
        icon: 'success',
        title: 'Satus has been changed successfully!',
      })
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_QUALITY_STATUS_FAILURE,
        payload: err
      });
    });
};








export const linkManufactureToggle = (data) => (
  dispatch) => {
  // debugger;
  dispatch({
    type: types.LINK_MANUFACTURE_STATUS_REQUEST,
  });
  axios
  .put(
    `${base_url2}/qualityCheckBuilder/qualityCheck/update`,data, 
    {
    
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
    })
    .then((res) => {
      dispatch({
        type: types.LINK_MANUFACTURE_STATUS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_MANUFACTURE_STATUS_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};





export const getQualityManufactureUserData = (cellChamberLinkId) => (dispatch) => {
  dispatch({
    type: types.GET_QUALITY_MANUFACTURE_USER_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/cell/chamber/link/get-all/user/${cellChamberLinkId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_QUALITY_MANUFACTURE_USER_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_QUALITY_MANUFACTURE_USER_DATA_FAILURE,
        payload: err,
      });
    });
};



export const getRejectManufactureData = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_REJECT_MANUFACTURE_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/production/quality/cell-chamber/${locationId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REJECT_MANUFACTURE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REJECT_MANUFACTURE_DATA_FAILURE,
        payload: err,
      });
    });
};



export const moveRejectToggle = (productionProductId,cellChamberLinkId) => (dispatch) => {
  dispatch({
    type: types.MOVE_REJECT_TOGGLE_REQUEST,
  });
  axios
    .put(`${base_url2}/production/quality/reject/${productionProductId}/${cellChamberLinkId}`, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.MOVE_REJECT_TOGGLE_SUCCESS,
        payload: cellChamberLinkId,
      });
      message.success("Item transfered for Quality Check");
    })
    .catch((err) => {
      dispatch({
        type: types.MOVE_REJECT_TOGGLE_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};

export const handleInventoryexpand = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_EXPAND,
    payload: modalProps,
  });
};

export const handleInventoryTask = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVENTORY_TASK,
    payload: modalProps,
  });
};

export const searchOpenOrdeReceived = (imei,orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.SEARCH_OPEN_ORDER_RECEIVED_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/search/${imei}/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // message.success(res.data.message);

      dispatch({
        type: types.SEARCH_OPEN_ORDER_RECEIVED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
     
      dispatch({
        type: types.SEARCH_OPEN_ORDER_RECEIVED_FAILURE,
        payload: err,
      });
    });
}; 
export const ClearReducerData= () => (dispatch) => {
  dispatch({
    type: types.CLAER_REDUCERS_DATA,
  });
}

export const clearDispatch= () => (dispatch) => {
  dispatch({
    type: types.CLAER_DISPATCH_DATA,
  });
}

export const clearCompleteDispatch= () => (dispatch) => {
  dispatch({
    type: types.CLAER_COMPLETE_DISPATCH_DATA,
  });
}

export const getMaterialBestBefore = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_BEST_BEFORE_REQUEST,
  });
  axios
    .get(`${base_url2}/po/getBestBeforeItemlist/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MATERIAL_BEST_BEFORE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_BEST_BEFORE_FAILURE,
        payload: err,
      });
    });
};

export const getWasteMaterial = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_WASTE_MATERIAL_REQUEST,
  });
  axios
    .get(`${base_url2}/waste/Org/wasteItemList/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_WASTE_MATERIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WASTE_MATERIAL_FAILURE,
        payload: err,
      });
    });
};
export const getWasteMaterialLocation = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_WASTE_MATERIAL_LOCATION_REQUEST,
  });
  axios
    .get(`${base_url2}/waste/wasteItemList/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_WASTE_MATERIAL_LOCATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WASTE_MATERIAL_LOCATION_FAILURE,
        payload: err,
      });
    });
};

export const getMaterialDamagedData = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_MATERIAL_DAMAGE_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/po/dameged/supplies/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_MATERIAL_DAMAGE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATERIAL_DAMAGE_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getPackData = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_PACK_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/dispatchPacking/dispatch-packing/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_PACK_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PACK_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getPackNo = (dispachPackingId) => (dispatch) => {
  dispatch({
    type: types.GET_PACK_NO_REQUEST,
  });
  axios
    .get(`${base_url2}/dispatchPacking/dispatch-packing-data/${dispachPackingId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_PACK_NO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PACK_NO_FAILURE,
        payload: err,
      });
    });
};

export const getPackAndTrack = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_PACK_TRACK_REQUEST,
  });
  axios
    .get(`${base_url2}/dispatchPacking/dispatch-packing-track/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_PACK_TRACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PACK_TRACK_FAILURE,
        payload: err,
      });
    });
};


export const getSubList = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_SUB_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/dispatchProcure/item/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_SUB_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUB_LIST_FAILURE,
        payload: err,
      });
    });
};
export const getRepairSubList = (orderPhoneId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_SUB_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/remainingDispatchItemDetail/${orderPhoneId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_REPAIR_SUB_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REPAIR_SUB_LIST_FAILURE,
        payload: err,
      });
    });
};

export const addToWaste = (customer,poSupplierSuppliesId) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_TO_WASTE_REQUEST,
  });

  axios
    .post(`${base_url2}/waste/moveToWaste`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect created Successfully!',
      // })
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect created Successfully!',
      //   showConfirmButton: false,
      //   // timer: 1500
      // })
      console.log(res);
      // dispatch(
      //   linkCustomersToOpportunity(opportunityId, { CustomerIds: [res.data] }, cb)
      // );
      // message.success(res.data.message)
   

      dispatch({
        type: types.ADD_TO_WASTE_SUCCESS,
        payload: poSupplierSuppliesId,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TO_WASTE_FAILURE,
        payload: err,
      });
      message.error(err.data.message)
      // cb && cb();
    });
};




export const linkDispatchStatus = (data) => (dispatch) => {
  dispatch({ type: types.LINK_DISPATCH_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phoneOrder/moveToHistory`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_DISPATCH_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DISPATCH_STATUS_FAILURE,
        payload: err,
      });
    });
};




export const addRepairData = (documents,poSupplierSuppliesId, cb) => (dispatch) => {
  console.log(documents);
  dispatch({
    type: types.ADD_REPAIR_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/po/rePacked/damagedItem/${poSupplierSuppliesId}`, documents, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
    
      
      // dispatch(getDocuments());
      //dispatch(getRegionCount(orgId));
      console.log(res);
      dispatch({
        type: types.ADD_REPAIR_DATA_SUCCESS,
        payload: res.data
        
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_REPAIR_DATA_FAILURE,
      });
      cb();
    });
};



export const addDamagedCredit = (documents,poSupplierSuppliesId, cb) => (dispatch) => {
  console.log(documents);
  dispatch({
    type: types.ADD_DAMAGED_CREDIT_REQUEST,
  });
  axios
    .put(`${base_url2}/po/creditNote/${poSupplierSuppliesId}`, documents, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
    
      
      // dispatch(getDocuments());
      //dispatch(getRegionCount(orgId));
      console.log(res);
      dispatch({
        type: types.ADD_DAMAGED_CREDIT_SUCCESS,
        payload: res.data
        
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DAMAGED_CREDIT_FAILURE,
      });
      cb();
    });
};




export const addAsileInbest = (customer,poSupplierS7ppliesId) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_ASILE_IN_BEST_REQUEST,
  });

  axios
    .put(`${base_url2}/po/updateBestBefore/roomRack/${poSupplierS7ppliesId}`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect created Successfully!',
      // })
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect created Successfully!',
      //   showConfirmButton: false,
      //   // timer: 1500
      // })
      console.log(res);
      // dispatch(
      //   linkCustomersToOpportunity(opportunityId, { CustomerIds: [res.data] }, cb)
      // );
      // message.success(res.data.message)
   

      dispatch({
        type: types.ADD_ASILE_IN_BEST_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ASILE_IN_BEST_FAILURE,
        payload: err,
      });
      message.error(err.data.message)
      // cb && cb();
    });
};



export const addScandata = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_SCAN_DATA_REQUEST,
  });
  axios
    .post(`${base_url2}/dispatchPacking/dispatch-packing-item-link`, data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_SCAN_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCAN_DATA_FAILURE,
        payload: err,
      });
    });
};


export const uploadStockList =(customer, userId) => (dispatch, getState) => {
  dispatch({
    type: types.ADD_STOCK_IMPORT_FORM_REQUEST,
  });

  axios
    .post(`${base_url2}/excel/posupplier-supplies-details`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

    //  window.location.reload()
      // dispatch(getRecords(userId));
      dispatch({
        type: types.ADD_STOCK_IMPORT_FORM_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_STOCK_IMPORT_FORM_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};




export const addScanReceivedata = (data,poSupplierDetailsId,qrCodeNo) => (dispatch) => {
  dispatch({
    type: types.ADD_SCAN_RECEIVED_DATA_REQUEST,
  });
  axios
    .put(`${base_url2}/po/scannedUnitAndInd/${poSupplierDetailsId}/${qrCodeNo}`, data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_SCAN_RECEIVED_DATA_SUCCESS,
        payload: res.data,
      });
      message.success(res.data.message);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCAN_RECEIVED_DATA_FAILURE,
        payload: err,
      });
    });
};

export const setPackedUnpacked = (data,orderId) => (dispatch) => {
  dispatch({ type: types.INVENTORY_PACKED_UNPACKED_TOGGLE_REQUEST });
  axios
    .post(
      `${base_url2}/dispatchPacking/dispatch-packing`,data,
      {
    
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      
      })
    .then((res) => {
      console.log(res);
     dispatch(getPackData(orderId));
      dispatch({
        type: types.INVENTORY_PACKED_UNPACKED_TOGGLE_SUCCESS,
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
        type: types.INVENTORY_PACKED_UNPACKED_TOGGLE_FAILURE,
        payload: err,
      });
    });
};

export const linkMaterialStockToggle = ( data,suppliesId) => (dispatch, getState) => {
  dispatch({
    type: types.LINK_MATERIAL_STOCK_TOGGLE_REQUEST,
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
        type: types.LINK_MATERIAL_STOCK_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_MATERIAL_STOCK_TOGGLE_FAILURE,
        payload: err,
      });
    })
};