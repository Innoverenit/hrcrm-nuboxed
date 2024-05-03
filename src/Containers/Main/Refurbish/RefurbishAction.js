import * as types from "./RefurbishActionTypes";
import { base_url2, base_url } from "../../../Config/Auth";
import axios from "axios";
import { message } from "antd";
import Swal from 'sweetalert2'

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
export const updateQCStatus = (data, phoneId, userId) => (dispatch) => {
  // debugger;
  dispatch({ type: types.UPDATE_QC_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phone/qcstatus/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getOrderByUser(userId))
      dispatch({
        type: types.UPDATE_QC_STATUS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_QC_STATUS_FAILURE,
      });
    });
};
export const updatePauseStatus = (data) => (dispatch) => {
  // debugger;
  dispatch({ type: types.UPDATE_PAUSE_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phone/start-pause/repairTime`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_PAUSE_STATUS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PAUSE_STATUS_FAILURE,
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

export const updateSparePacket = (data) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SPARE_PACKET_REQUEST,
  });
  axios
    .post(`${base_url2}/phoneSpare/spare-packet-link`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getTaskListRangeByUserId(userId));
      dispatch({
        type: types.UPDATE_SPARE_PACKET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SPARE_PACKET_FAILURE,
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

export const getPhoneDetails = (phoneId) => (dispatch) => {
  dispatch({
    type: types.GET_PHONE_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/phoneData/${phoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PHONE_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PHONE_DETAILS_FAILURE,
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

export const handlePhoneDetails = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PHONE_DETAILS_MODAL,
    payload: modalProps,
  });
};

export const handleRefurbishLead = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REFURBISH_LEAD,
    payload: modalProps,
  });
};

export const setEditOutputProduction = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_OUTPUT_PRODUCTION,
    payload: name,
  });
};

export const getProductionOrderId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_ORDER_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/orderProductionLocationLink/get-all/${userId}`, {
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

export const getProductionUsersById = (departmentId, locationId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_USER_BYID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/user-list/drop-down/${departmentId}/${locationId}`, {
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

export const emptyRefurbish = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_REFURBISH_LIST,
  });
};

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
      // dispatch(getProductionOrderId(locationDetailsId))
      Swal.fire({
        icon: 'success',
        title: 'Items Assigned To Technician',
        showConfirmButton: true,
      })
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
      // dispatch(getProductionOrderId(locationDetailsId))
      Swal.fire({
        icon: 'success',
        title: 'Items Assigned For Repair',
        showConfirmButton: true,
      })
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
export const getNoOfPhoneInQCById = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_NO_OF_PHONE_IN_QC_BYID_REQUEST,
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
        type: types.GET_NO_OF_PHONE_IN_QC_BYID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NO_OF_PHONE_IN_QC_BYID_FAILURE,
        payload: err,
      });
    });
};

export const getNoOfRepairTechnicianById = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_NO_OF_REPAIR_TECHNICIAN_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/AllRepairPhoneList/${orderPhoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NO_OF_REPAIR_TECHNICIAN_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NO_OF_REPAIR_TECHNICIAN_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const getNoOfphoneInRepair = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_NO_OF_PHONE_IN_REPAIR_REQUEST,
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
        type: types.GET_NO_OF_PHONE_IN_REPAIR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NO_OF_PHONE_IN_REPAIR_FAILURE,
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

export const handleAllSpareList = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ALL_SPARE_MODAL,
    payload: modalProps,
  })
}

export const getOrderByUser = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/orderProductionLocationLink/get-allOrder/${userId}`, {
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

export const getRepairOrderByUser = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_REPAIR_ORDER_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/get-allRepairPhoneOrder/${userId}`, {
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
export const updateCantRepairQC = (data, phoneId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CANT_REPAIR_QC_REQUEST,
  });
  axios
    .put(`${base_url2}/phone/canNotRepair/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_CANT_REPAIR_QC_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CANT_REPAIR_QC_FAILURE,
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
export const updaterepairStatus = (data, phoneId, userId, cb) => (dispatch) => {
  // debugger;
  dispatch({ type: types.UPDATE_REPAIR_STATUS_REQUEST });
  axios
    .put(`${base_url2}/phone/repairStatus/${phoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getRepairPhoneByUser(orderPhoneId, userId))
      dispatch(getRepairOrderByUser(userId))
      dispatch({
        type: types.UPDATE_REPAIR_STATUS_SUCCESS,
        payload: res.data,
      });
      cb && cb();
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

export const repairInspectionButton = (data, orderPhoneId, cb) => (dispatch) => {
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

export const getOpenQcByUser = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPEN_QC_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/orderProduction/get-allInCompleteQcOrder/${userId} `, {
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

export const getOpenRepair = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPEN_USER_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/get-allRepairIncompletePhoneOrder/${userId}`, {
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
export const getAllSpareList = (orderId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_SPARE_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phoneSpare/allSpareDetails/${orderId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_SPARE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_SPARE_LIST_FAILURE,
        payload: err,
      });
    });
};

export const handleProductBuilder = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_BUILDER_MODAL,
    payload: modalProps,
  })
}
export const handleProductBuilderInProcess = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCT_BUILDER_IN_PROCESS_MODAL,
    payload: modalProps,
  })
}
// get url in assign modal table
export const getCatalogueListInRefurbish = (orderId, productId) => (dispatch) => {
  dispatch({
    type: types.GET_CATALOGUE_LIST_IN_REFURBISH_REQUEST,
  });
  axios
    .get(`${base_url2}/order/product/${orderId}/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATALOGUE_LIST_IN_REFURBISH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CATALOGUE_LIST_IN_REFURBISH_FAILURE,
        payload: err,
      });
    });
};
// final submit in assign modal
export const updateCatalogueInRefurbish = (data, orderPhoneId, productId, cb) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CATALOGUE_IN_REFURBISH_REQUEST,
  });
  axios
    .post(`${base_url2}/order/productAssign`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCatalogueListInRefurbish(orderPhoneId, productId))
      dispatch({
        type: types.UPDATE_CATALOGUE_IN_REFURBISH_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CATALOGUE_IN_REFURBISH_FAILURE,
        payload: err,
      });
    });
};

//  choose product in dropdown can use for time start and end

export const chooseCatalogueItem = (data, orderId, productId) => (dispatch) => {
  dispatch({
    type: types.CHOOSE_CATALOGUE_ITEM_REQUEST,
  });
  axios
    .put(`${base_url2}/chooseCatalogue/${orderId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCatalogueListInRefurbish(orderId, productId))
      dispatch({
        type: types.CHOOSE_CATALOGUE_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.CHOOSE_CATALOGUE_ITEM_FAILURE,
        payload: err,
      });
    });
};
// get order id in process tab
export const getOrderIdForCatalogueItem = (technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_CHOOSEN_CATALOGUE_ITEM_REQUEST,
  });
  axios
    .get(`${base_url2}/order/assignOrder/${technicianId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CHOOSEN_CATALOGUE_ITEM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CHOOSEN_CATALOGUE_ITEM_FAILURE,
        payload: err,
      });
    });
};

//in process tab after order id click
export const getCatalogueByUser = (orderId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_CATALOGUE_BY_USER_REQUEST,
  });
  axios
    .get(`${base_url2}/order/assignProduct/${orderId}/${technicianId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATALOGUE_BY_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CATALOGUE_BY_USER_FAILURE,
        payload: err,
      });
    });
};
//add product builder by id
export const addProductBuilderInProcess = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_PRODUCT_BUILDER_BYID_REQUEST,
  });
  axios
    .post(`${base_url2}/order/assignBuilderProduct`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getProductBuilderById(id))
      dispatch({
        type: types.ADD_PRODUCT_BUILDER_BYID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PRODUCT_BUILDER_BYID_FAILURE,
        payload: err,
      });
    });
};
// get builder list and part no
export const getProductBuilderById = (productManufacturingId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_BUILDER_BYID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/getAssignBuilder/${productManufacturingId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_BUILDER_BYID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCT_BUILDER_BYID_FAILURE,
        payload: err,
      });
    });
};
// get all manufatureid by product and order id
export const getAllManufatureIdById = (orderId, productId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_MANUFATUREID_REQUEST,
  });
  axios
    .get(`${base_url2}/order/orderProductList/${orderId}/${productId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_MANUFATUREID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_MANUFATUREID_FAILURE,
        payload: err,
      });
    });
};

//add catalogue in production
export const addCatalogueByTechnician = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_CATALOGUE_BY_TECHNICIAN_REQUEST,
  });
  axios
    .post(`${base_url2}/inventory/productRepurbish`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCatalogueByTechnician(id))
      dispatch({
        type: types.ADD_CATALOGUE_BY_TECHNICIAN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CATALOGUE_BY_TECHNICIAN_FAILURE,
        payload: err,
      });
    });
};
// get catalogue in production
export const getCatalogueByTechnician = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_CATALOGUE_BY_TECHNICIAN_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productList/pagewise/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATALOGUE_BY_TECHNICIAN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CATALOGUE_BY_TECHNICIAN_FAILURE,
        payload: err,
      });
    });
};

export const updateFarGlassInProduction = (data, productRepurbishId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.UPDATE_FAR_GLASS_IN_PRODUCTION_REQUEST,
  });
  axios
    .put(`${base_url2}/inventory/${productRepurbishId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_FAR_GLASS_IN_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_FAR_GLASS_IN_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};

export const handleInTagDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INTAG_MODAL,
    payload: modalProps,
  })
}
export const addTagInProcess = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_TAGIN_PROCESS_REQUEST,
  });
  axios
    .post(`${base_url2}/inventory/partBuilder `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getTagInProcess(id))
      dispatch({
        type: types.ADD_TAGIN_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_TAGIN_PROCESS_FAILURE,
        payload: err,
      });
    });
};
export const getTagInProcess = (productRepurbishId) => (dispatch) => {
  dispatch({
    type: types.GET_TAGIN_PROCESS_REQUEST,
  });
  axios
    .get(`${base_url2}/inventory/getPartBuilder/${productRepurbishId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TAGIN_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TAGIN_PROCESS_FAILURE,
        payload: err,
      });
    });
};

export const addTaskByPhoneId = (data, id) => (dispatch) => {
  dispatch({
    type: types.ADD_TASK_BY_PHONE_ID_REQUEST,
  });
  axios
    .post(`${base_url2}/itemTask`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getTaskByPhoneId(id))
      dispatch({
        type: types.ADD_TASK_BY_PHONE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_TASK_BY_PHONE_ID_FAILURE,
        payload: err,
      });
    });
};
export const getTaskByPhoneId = (phoneId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_BY_PHONEID_REQUEST,
  });
  axios
    .get(`${base_url2}/itemTask/itemTaskDetail/${phoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_BY_PHONEID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_BY_PHONEID_FAILURE,
        payload: err,
      });
    });
};

export const getTaskListByPhone = (phoneId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_LIST_BY_PHONE_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/repairTask/${phoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_LIST_BY_PHONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_LIST_BY_PHONE_FAILURE,
        payload: err,
      });
    });
};
export const approveSpare = (data, phoneSpareId) => (dispatch) => {
  dispatch({
    type: types.APPROVE_SPARE_REQUEST,
  });
  axios
    .put(`${base_url2}/phoneSpare/approveSpare/${phoneSpareId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.APPROVE_SPARE_SUCCESS,
        payload: res.data,
      });
      message.success("Confirmation Successfull");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.APPROVE_SPARE_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
    });
};
export const updateProcessTask = (data, phoneTaskId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_PROCESS_TASK_REQUEST,
  });
  axios
    .put(`${base_url2}/itemTask/updateTaskInd/${phoneTaskId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_PROCESS_TASK_SUCCESS,
        payload: res.data,
      });
      message.success("Confirmation Successfull");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_TASK_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
    });
};
export const gettASKItemCounts = (phoneId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_ITEM_COUNT_REQUEST,
  });
  axios
    .get(`${base_url2}/itemTask/remainingTaskCount/${phoneId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_ITEM_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_TASK_ITEM_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const closeRepairModal = (close) => (dispatch) =>
  dispatch({ type: types.SET_CLOSE_REPAIR_MODAL, payload: close });

export const refurbishRejectPhone = (close) => (dispatch) =>
  dispatch({ type: types.REFURBISH_REJECT_PHONE, payload: close });


export const deleteTaskList = (data, phoneTaskId) => (dispatch) => {
  dispatch({
    type: types.DELETE_TASK_LIST_REQUEST,
  });
  axios
    .put(`${base_url2}/itemTask/deleteTaskInd/${phoneTaskId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_TASK_LIST_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Task Deleted Successfully',
        showConfirmButton: true,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_LIST_FAILURE,
        payload: err,
      });
      message.error("Something went wrong");
    });
};

export const getCompletedPhones = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_COMPLETED_PHONES_REQUEST,
  });
  axios
    .get(`${base_url2}/completeRepairPhone/${orderPhoneId}/${technicianId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMPLETED_PHONES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMPLETED_PHONES_FAILURE,
        payload: err,
      });
    });
};

export const getRejectedPhoneList = (orderPhoneId) => (dispatch) => {
  dispatch({
    type: types.GET_REJECTED_PHONE_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/phone/rejectPhoneDetails/${orderPhoneId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REJECTED_PHONE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REJECTED_PHONE_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getRemainingPhonesList = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_REMAINING_PHONES_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}//${orderPhoneId}/${technicianId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REMAINING_PHONES_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REMAINING_PHONES_LIST_FAILURE,
        payload: err,
      });
    });
};
export const reassignPhonesToTechnician = (data, orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.REASSIGN_PHONES_REQUEST,
  });
  axios
    .post(`${base_url2}/orderProduction/reAssignRepair/productionDispatch`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch(getRemainingPhones(orderPhoneId, technicianId));
      dispatch(getNoOfRepairTechnicianById(orderPhoneId))
      dispatch({
        type: types.REASSIGN_PHONES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REASSIGN_PHONES_FAILURE,
        payload: err,
      });
    });
};

export const getRemainingPhones = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_REMAINING_PHONES_REQUEST,
  });
  axios
    .get(`${base_url2}/notStart/RepairPhone/${orderPhoneId}/${technicianId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REMAINING_PHONES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REMAINING_PHONES_FAILURE,
        payload: err,
      });
    });
};

export const addLeadInRefurbish = (data, orderPhoneId, cb) => (dispatch) => {
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
        showConfirmButton: true,
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

export const getRejectedPhonesByTechnician = (orderPhoneId, technicianId) => (dispatch) => {
  dispatch({
    type: types.GET_REJECTED_PHONES_REQUEST,
  });
  axios
    .get(`${base_url2}/rejected/RepairPhone/${orderPhoneId}/${technicianId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REJECTED_PHONES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REJECTED_PHONES_FAILURE,
        payload: err,
      });
    });
};

export const assignRejectedPhones = (data, orderPhoneId, cb) => (dispatch) => {
  dispatch({
    type: types.ASSIGN_REJECTED_PHONES_REQUEST,
  });
  axios
    .put(`${base_url2}/rejected/teamLeadAssign/${orderPhoneId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Lead Tagged',
        showConfirmButton: true,
      })
      dispatch({
        type: types.ASSIGN_REJECTED_PHONES_SUCCESS,
        payload: res.data,
      });
      cb()
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ASSIGN_REJECTED_PHONES_FAILURE,
        payload: err,
      });
    });
};