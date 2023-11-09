import * as types from "./RefurbishActionTypes";
import { base_url2 } from "../../../Config/Auth";
import axios from "axios";
import { message } from "antd";

export const setProductionViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_PRODUCTION_VIEW_TYPE, payload: viewType });

export const getTodayProduction = (date) => (dispatch) => {
  dispatch({
    type: types.GET_TODAY_PRODUCTION_REQUEST,
  });
  axios
    .get(`${base_url2}/report/today-orderList/${date}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TODAY_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TODAY_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};

export const getTomorrowProduction = () => (dispatch) => {
  dispatch({
    type: types.GET_TOMORROW_PRODUCTION_REQUEST,
  });
  axios
    .get(`${base_url2}/report/tomorrow-orderList`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TOMORROW_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TOMORROW_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};

export const linkDateToProduction = (data) => (dispatch) => {
  dispatch({
    type: types.LINK_DATE_TO_PRODUCTION_REQUEST,
  });
  axios
    .post(`${base_url2}/report/today-orderList`, { data })
    .then((res) => {
      console.log(res);
      // dispatch(getTaskListRangeByUserId(userId));
      dispatch({
        type: types.LINK_DATE_TO_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DATE_TO_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};
//add production
/**
 * request for adding a production consumption
 */
export const addProductionConsumption = (data, locationDetailsId) => (
  dispatch,
  getState
) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_PRODUCTION_REQUEST,
  });

  axios
    .post(`${base_url2}/production/productionSuppliesLink`, data)
    .then((res) => {
      console.log(res);

      dispatch(getConsumptionList(locationDetailsId));

      dispatch({
        type: types.ADD_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};
/**
 * request for adding a production output
 */
export const addProductionOutput = (data, locationDetailsId) => (
  dispatch,
  getState
) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_PRODUCTION_OUTPUT_REQUEST,
  });

  axios
    .post(`${base_url2}/production/inventoryProductLink`, data)
    .then((res) => {
      console.log(res);

      dispatch(getProductionOutputList(locationDetailsId));

      dispatch({
        type: types.ADD_PRODUCTION_OUTPUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PRODUCTION_OUTPUT_FAILURE,
        payload: err,
      });
    });
};

//Consumption TABLE
export const getConsumptionList = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/production/supplies/${locationDetailsId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_FAILURE,
        payload: err,
      });
    });
};
//OUTPUT TABLE
export const getProductionOutputList = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PRODUCTION_OUTPUT_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/production/product/${locationDetailsId}`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PRODUCTION_OUTPUT_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_PRODUCTION_OUTPUT_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getShifts = (userId) => (dispatch) => {
  console.log(userId);
  dispatch({
    type: types.GET_SHIFTS_REQUEST,
  });
  axios
    .get(`${base_url2}/shift/getShiftList/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIFTS_SUCCESS,
        payload: [res.data],
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_SHIFTS_FAILURE,
        payload: err,
      });
    });
};
//transfer Output
export const transferOutput = (data, locationDetailsId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_REQUEST,
  });
  axios
    .put(`${base_url2}/production/moveToInventory`, data)
    .then((res) => {
      dispatch(getProductionOutputList(locationDetailsId));
      dispatch({
        type: types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success", res.data.message, res.data.assignInd);
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_FAILURE,
        payload: err,
      });
      // cb && cb("failuer", null, null);
    });
};
export const addSplit = (data, locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.ADD_SPLIT_PRODUCTION_OUTPUT_REQUEST,
  });
  axios
    .post(`${base_url2}/production/split`, data)
    .then((res) => {
      console.log(res);
      dispatch(getProductionOutputList(locationDetailsId));
      dispatch({
        type: types.ADD_SPLIT_PRODUCTION_OUTPUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SPLIT_PRODUCTION_OUTPUT_FAILURE,
        payload: err,
      });
    });
};

//delete output
export const deleteProductionOutput = (productionProductId) => (dispatch) => {
  dispatch({
    type: types.DELETE_PRODUCTION_OUTPUT_REQUEST,
  });
  axios
    .delete(`${base_url2}/production/${productionProductId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_PRODUCTION_OUTPUT_SUCCESS,
        payload: productionProductId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PRODUCTION_OUTPUT_FAILURE,
        payload: err,
      });
    });
};

export const handleSplitOutputModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SPLIT_OUTPUT_MODAL,
    payload: modalProps,
  });
};

export const setEditOutputProduction = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_OUTPUT_PRODUCTION,
    payload: name,
  });
};

export const getProductionOrderId = (locationId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_ORDER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/orderProductionLocationLink/get-all/${locationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_ORDER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_ORDER_ID_FAILURE,
        payload: err,
      });
    });
};
export const handleProductionNotesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCTION_NOTES_MODAL,
    payload: modalProps,
  });
};

export const getProductionUsersById = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_USER_BYID_REQUEST,
  });
  axios
    .get(`${base_url2}/locationDetails/getUserList/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_USER_BYID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_USER_BYID_FAILURE,
        payload: err,
      });
    });
};

export const handleAssignOrderById = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ASSIGN_ORDER_BY_ID_MODAL,
    payload: modalProps,
  });
};
export const handleProductionOrderIdModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCTION_ORDERID_MODAL,
    payload: modalProps,
  })
}
export const handlePhoneNotesProductionModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PHONE_NOTE_PRODUCTION_MODAL,
    payload: modalProps,
  })
}

export const UpdateTechnicianByPhone = (data, id, locationDetailsId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_TECHNICIAN_BY_PHONE_REQUEST,
  });
  axios
    .post(`${base_url2}/orderProductionLocationLink/productionDispatch`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getNoOfPhoneById(id));
      dispatch(getProductionOrderId(locationDetailsId))
      dispatch({
        type: types.UPDATE_TECHNICIAN_BY_PHONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_TECHNICIAN_BY_PHONE_FAILURE,
        payload: err,
      });
    });
};

export const UpdateTechnicianForRepairPhone = (data, id, locationDetailsId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_REQUEST,
  });
  axios
    .post(`${base_url2}/orderProductionLocationLink/Repair/productionDispatch`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getRepairPhoneById(id))
      dispatch(getProductionOrderId(locationDetailsId))
      dispatch({
        type: types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_FAILURE,
        payload: err,
      });
    });
};

export const getNoOfPhoneById = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_NO_OF_PHONE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/phone/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NO_OF_PHONE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NO_OF_PHONE_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const getRepairPhoneById = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_PHONE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneOrder/phonesss/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPAIR_PHONE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REPAIR_PHONE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const handleTechnicianModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TECHNICIAN_MODAL_MODAL,
    payload: modalProps,
  })
}

export const getNoOfTechnicianById = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_NO_OF_TECHNICIAN_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/AllPhoneList/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NO_OF_TECHNICIAN_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NO_OF_TECHNICIAN_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const handlePhoneByTechnician = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PHONE_BY_TECHNICIAN_MODAL,
    payload: modalProps,
  })
}

export const getphoneListByUser = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_PHONE_LIST_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/TechnicianPhoneList/${orderPhoneId}/${technicianId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PHONE_LIST_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PHONE_LIST_BY_USER_FAILURE,
        payload: err,
      });
    });
};

export const handleOrderPhone = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_PHONE,
    payload: modalProps,
  })
}

export const updateFinalPrice = (data, orderPhoneId, locationDetailsId, cb) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_FINAL_PRICE_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneOrder/updatePrice/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getProductionOrderId(locationDetailsId));
      dispatch({
        type: types.UPDATE_FINAL_PRICE_SUCCESS,
        payload: res.data,
      });
      cb && cb();
      message.success("Offer price has been updated!")
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_FINAL_PRICE_FAILURE,
        payload: err,
      });
      // cb && cb("failuer", null, null);
    });
};
export const getProductionNotesInOrder = (id) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_REQUEST,
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
        type: types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_FAILURE,
        payload: err,
      });
    });
};

export const handleAssignRepairModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ASSIGN_REPAIR_MODAL,
    payload: modalProps,
  })
}

export const getOrderByUser = (locationId, userId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/orderProductionLocationLink/get-allOrder/${locationId}/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_BY_USER_FAILURE,
        payload: err,
      });
    });
};

export const getRepairOrderByUser = (locationId, userId) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_ORDER_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/get-allRepairPhoneOrder/${locationId}/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPAIR_ORDER_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REPAIR_ORDER_BY_USER_FAILURE,
        payload: err,
      });
    });
};

export const handleOrderPhoneModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORDER_PHONE_MODAL,
    payload: modalProps,
  })
}

export const handleRepairPhone = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REPAIR_PHONE_MODAL,
    payload: modalProps,
  })
}

export const getPhoneOrderIdByUser = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDERID_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/TechnicianPhoneList/${orderPhoneId}/${technicianId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDERID_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDERID_BY_USER_FAILURE,
        payload: err,
      });
    });
};
export const getRepairPhoneByUser = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_PHONE_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/RepairPhoneList/${orderPhoneId}/${technicianId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPAIR_PHONE_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REPAIR_PHONE_BY_USER_FAILURE,
        payload: err,
      });
    });
};
export const updaterepairStatus = (data, phoneId, orderPhoneId, locationDetailsId, userId, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.UPDATE_REPAIR_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phone/repairStatus/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getRepairPhoneByUser(orderPhoneId, userId))
      dispatch(getRepairOrderByUser(locationDetailsId, userId))
      dispatch({
        type: types.UPDATE_REPAIR_STATUS_SUCCESS,
        payload: res.data,
      });
      cb && cb();
      message.success("Repair status updated!!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_REPAIR_STATUS_FAILURE,
      });
      cb && cb();
    });
};
export const handleRepairPhoneNotesOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REPAIR_PHONE_NOTES_ORDER_MODAL,
    payload: modalProps,
  });
};
export const handleQCPhoneNotesOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_QC_PHONE_NOTES_ORDER_MODAL,
    payload: modalProps,
  });
};

export const qcInspectionButton = (data, orderPhoneId, locationDetailsId, userId, cb) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_QC_INSPECTION_BUTTON_REQUEST,
  });
  axios
    .put(`${base_url2}/qcInspectionInd/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getOrderByUser(locationDetailsId, userId))
      dispatch({
        type: types.UPDATE_QC_INSPECTION_BUTTON_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_QC_INSPECTION_BUTTON_FAILURE,
        payload: err,
      });
      // cb && cb("failuer", null, null);
    });
};

export const repairInspectionButton = (data, orderPhoneId, locationDetailsId, userId, cb) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_REPAIR_INSPECTION_BUTTON_REQUEST,
  });
  axios
    .put(`${base_url2}/repairInspectionInd/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getRepairOrderByUser(locationDetailsId, userId))
      dispatch({
        type: types.UPDATE_REPAIR_INSPECTION_BUTTON_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_REPAIR_INSPECTION_BUTTON_FAILURE,
        payload: err,
      });
      // cb && cb("failuer", null, null);
    });
};

export const getOpenQcByUser = (locationId, userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPEN_QC_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/orderProduction/get-allInCompleteQcOrder/${locationId}/${userId} `, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPEN_QC_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPEN_QC_BY_USER_FAILURE,
        payload: err,
      });
    });
};

export const getOpenRepair = (locationId, userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPEN_USER_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/get-allRepairIncompletePhoneOrder/${locationId}/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPEN_USER_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPEN_USER_BY_USER_FAILURE,
        payload: err,
      });
    });
};