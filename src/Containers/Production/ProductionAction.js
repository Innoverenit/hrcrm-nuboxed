import * as types from "./ProductionActionType";
import axios from "axios";
import Swal from 'sweetalert2'
import { message } from "antd";
import { base_url, base_url2 } from "../../Config/Auth";

export const handleCreateProduction = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CREATE_PRODUCTION_DRAWER,
    payload: modalProps,
  });
};



export const handleProductionQuality = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCTION_QUALITY_MODAL,
    payload: modalProps,
  });
};


// export const emptyManufactureLink = () => (dispatch) => {
//   dispatch({
//     type: types.EMPTY_MANUFACTURE_LINK, 
//   });
// };


export const addCreateManufactureCardModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.ADD_CREATE_MANUFACTURE_CARD_MODAL,
    payload: modalProps,
  });
};
export const addSpareNotesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.ADD_SPARE_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const addSpareStepsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.ADD_SPARE_PARTS_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const setProductionViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_PRODUCTION_VIEW_TYPE, payload: viewType });

export const createProductionLink = (data,) => (dispatch) => {
  dispatch({ type: types.CREATE_PRODUCTION_LINK_REQUEST });
  axios
    .post(`${base_url2}/production/productionProductLink`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getProducts(0))
      dispatch({
        type: types.CREATE_PRODUCTION_LINK_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Process Started Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CREATE_PRODUCTION_LINK_FAILURE,
        payload: err,
      });
    });
};

export const getSearchedProduction = (name) => (dispatch) => {
  dispatch({
    type: types.GET_SEARCH_PRODOCTION_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productName/${name}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEARCH_PRODOCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SEARCH_PRODOCTION_FAILURE,
        payload: err,
      });
    });
};

export const getProductionsbyLocId = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_BYLOC_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/production/product/wip/${userId}/${pageNo}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_BYLOC_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_BYLOC_ID_FAILURE,
        payload: err,
      });
    });
};

export const getWorkflowList = (orgId,type) => (dispatch) => {
  dispatch({
    type: types.GET_WORKFLOW_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/publish/for_dropdown/${orgId}/${type}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WORKFLOW_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_WORKFLOW_LIST_FAILURE,
        payload: err,
      });
    });
};
export const moveProduction = (data) => (dispatch) => {
  dispatch({
    type: types.REMOVE_PRODUCTION_REQUEST,
  });
  axios
    .put(`${base_url2}/production/moveToInventory`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.REMOVE_PRODUCTION_SUCCESS,
        payload: res.data,
      });
      message.success("Item transfered for Quality Check");
    })
    .catch((err) => {
      dispatch({
        type: types.REMOVE_PRODUCTION_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};


export const handleBuilderProduction = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BUILDER_PRODUCTION_DRAWER,
    payload: modalProps,
  });
}
export const handleProductionIDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PRODUCTIONID_DRAWER,
    payload: modalProps,
  });
}

export const getProductionBuilder = (productionProductId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_BUILDER_REQUEST,
  });
  axios
    .get(`${base_url2}/production/getProductionPBuilder/${productionProductId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_BUILDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_BUILDER_FAILURE,
        payload: err,
      });
    });
};

export const getArchieveListOfProduction = (locationDetailsId, userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ARCHIEVE_PRODOCTION_LIST_REQUEST,
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
        type: types.GET_ARCHIEVE_PRODOCTION_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ARCHIEVE_PRODOCTION_LIST_FAILURE,
        payload: err,
      });
    });
};
export const updateProStatus = (data, productionProductId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PRODCUTION_STATUS_REQUEST });
  axios
    .put(
      `${base_url2}/production/updateStatus/${productionProductId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.UPDATE_PRODCUTION_STATUS_SUCCESS,
        payload: res.data,
      });
      Swal({
        icon: 'success',
        title: 'Satus has been changed successfully!',
      })
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_PRODCUTION_STATUS_FAILURE,
        payload: err
      });
    });
};

export const setInspectProdn = (data) => (dispatch) => {
  dispatch({ type: types.SET_INSPECT_PRODN_REQUEST });
  axios
    .put(
      `${base_url2}/production/inspectedUser`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.SET_INSPECT_PRODN_SUCCESS,
        payload: res.data,
      });
      Swal({
        icon: 'success',
        title: 'Done',
      })
    })
    .catch((err) => {
      dispatch({
        type: types.SET_INSPECT_PRODN_FAILURE,
        payload: err
      });
    });
};

export const getAllProductionsbyOrgId = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PRODUCTION_BYORG_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/production/productionProduct/${orgId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PRODUCTION_BYORG_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_PRODUCTION_BYORG_ID_FAILURE,
        payload: err,
      });
    });
};


export const getProductRecords = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url2}/production/product/count/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCT_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCT_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const updateRoomRackProduction = (data, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_ROOM_RACK_PRODN_REQUEST });
  axios
    .put(
      `${base_url2}/production/addRoomAndRack`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.UPDATE_ROOM_RACK_PRODN_SUCCESS,
        payload: res.data,
      });
      cb()
      Swal({
        icon: 'success',
        title: 'Done',
      })
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_ROOM_RACK_PRODN_FAILURE,
        payload: err
      });
    });
};

export const getAllstageProductions = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_STAGE_PRODUCTION_REQUEST,
  });
  axios
    .get(`${base_url2}/production/all/product/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_STAGE_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_STAGE_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};
export const updateProductiondragstage = (
  data,

  sourceStageId,
  destinationStageId,
  manufactureId,
  cb
) => (dispatch) => {

  dispatch({
    type: types.UPDATE_PRODUCTION_DRAG_STAGE_REQUEST,
    payload: {
      sourceStageId,
      destinationStageId,
      manufactureId,
    },
  });
  axios
    .put(
      `${base_url}/production/production/update/stage`, data, {
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
        type: types.UPDATE_PRODUCTION_DRAG_STAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb(res.data);
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: types.UPDATE_PRODUCTION_DRAG_STAGE_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};
export const getStageList = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_STAGE_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/production/stages/for_dropdown/${orgId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_STAGE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_STAGE_LIST_FAILURE,
        payload: err,
      });
    });
};
export const updateRoomRackWip = (data, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_ROOM_RACK_WIP_REQUEST });
  axios
    .put(
      `${base_url2}/production/wipAdRoomAndRack `, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispatch({
        type: types.UPDATE_ROOM_RACK_WIP_SUCCESS,
        payload: res.data,
      });
      cb()
      Swal({
        icon: 'success',
        title: 'Done',
      })
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_ROOM_RACK_WIP_FAILURE,
        payload: err
      });
    });
};




export const getProductionTable = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_TABLE_REQUEST,
  });
  axios
    .get(`${base_url2}/production/productionProductLink/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_TABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_TABLE_FAILURE,
        payload: err,
      });
    });
};




export const updateProductionstage = (
  
  productionProductId,
  stageId,
  userId,

  cb
) => (dispatch) => {
  //console.log(sourceStageId, destinationStageId, opportunityId);
  // if (destinationStageId === "won") {
  //   message.success("stage is won");
  // }
  // if (destinationStageId === "loss") {
  //   message.error("stage is loss");
  // }
  // getUserStageList
  dispatch({
    type: types.UPDATE_PRODUCTION_STAGE_REQUEST,
    payload: {
    
    },
    
  });
  axios
    .put(
      `${base_url2}/production/productionProductLink/update/stage/${productionProductId}/${stageId}`,{}, {
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
dispatch(getProductionStage(userId));
dispatch(getProductionTable(userId));
      dispatch({
        type: types.UPDATE_PRODUCTION_STAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb(res.data);
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: types.UPDATE_PRODUCTION_STAGE_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};




export const getProductionSteps = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_STEPS_REQUEST,
  });
  axios
    .get(`${base_url2}/productionBuilder/steps/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_STEPS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_STEPS_FAILURE,
        payload: err,
      });
    });
};




export const getProductionStage = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_STAGE_REQUEST,
  });
  axios
    .get(`${base_url2}/production/stageList/productionProductLink/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_STAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_STAGE_FAILURE,
        payload: err,
      });
    });
};



export const getProductionCellList = (orgId, startDate,endDate) => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_CELL_LIST_REQUEST,
  });
  axios
    .get(`${base_url2}/production/cell/productionProductLink/${orgId}?endDate=${endDate}&startDate=${startDate}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_CELL_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PRODUCTION_CELL_LIST_FAILURE,
        payload: err,
      });
    });
};




export const updateProductionPauseStatus = (data) => (dispatch) => {
  // debugger;
  dispatch({ type: types.UPDATE_PRODUCTION_PAUSE_STATUS_REQUEST });
  axios
    .put(`${base_url2}/production/start-pause/production/manufacture/by-user`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_PRODUCTION_PAUSE_STATUS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PRODUCTION_PAUSE_STATUS_FAILURE,
      });
    });
};




export const getManufactureLinkData  = (productionProductId,pageNo) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_MANUFACTURE_LINK_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/production/manufature/getProductionProductBuilder/${productionProductId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MANUFACTURE_LINK_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_MANUFACTURE_LINK_DATA_FAILURE,
        payload: err,
      });
    });
};



export const getReaasignProduct = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_REASSIGN_PRODUCT_REQUEST,
  });
  axios
    .get(`${base_url2}/production/product/reject/count/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REASSIGN_PRODUCT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REASSIGN_PRODUCT_FAILURE,
        payload: err,
      });
    });
};


export const getManufactureDetailsData  = (supplierSuppliesUniqueNumberId,) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_MANUFACTURE_DETAILS_DATA_REQUEST,
  });
  axios
    .get(`${base_url2}/po/SupplierBypartNum/${supplierSuppliesUniqueNumberId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MANUFACTURE_DETAILS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_MANUFACTURE_DETAILS_DATA_FAILURE,
        payload: err,
      });
    });
};