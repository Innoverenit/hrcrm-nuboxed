import * as types from "./ProductionActionType";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url, base_url2 } from "../../Config/Auth";

export const handleCreateProduction = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CREATE_PRODUCTION_DRAWER,
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
        title: 'Manufacturing Items Added Successfully',
        showConfirmButton: true,
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
    .get(`${base_url2}/production/product/${userId}/${pageNo}`,
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

export const getWorkflowList = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_WORKFLOW_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/productionWorkflow/for_dropdown/${orgId}`,
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
      // message.success("Confirmation Successfull");
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
export const updateProStatus = (data,productionProductId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PRODCUTION_STATUS_REQUEST });
  axios
    .put(
      `${base_url2}/production/updateStatus/${productionProductId}`,data,
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
        payload:err
      });
    });
};

export const setInspectProdn = (data) => (dispatch) => {
  dispatch({ type: types.SET_INSPECT_PRODN_REQUEST });
  axios
    .put(
      `${base_url2}/production/inspectedUser`,data,
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
        payload:err
      });
    });
};

export const getAllProductionsbyOrgId = (orgId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PRODUCTION_BYORG_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/production/productByOrgId/${orgId}/${pageNo}`,
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
    .get(`${base_url}/production/product/count/${locationDetailsId}`, {
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

export const updateRoomRackProduction = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_ROOM_RACK_PRODN_REQUEST });
  axios
    .put(
      `${base_url2}/production/addRoomAndRack`,data,
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
      Swal({
        icon: 'success',
        title: 'Done',
      })
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_ROOM_RACK_PRODN_FAILURE,
        payload:err
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
      `${base_url}/production/production/update/stage`,data, {
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