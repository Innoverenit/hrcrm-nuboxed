import { base_url } from "../../Config/Auth";
import * as types from "./DataRoomActionTypes";
import axios from "axios";

import {message} from "antd"

export const setDataRoomViewType = (viewType) => (dispatch) =>
    dispatch({ type: types.SET_DATAROOM_VIEW_TYPE, payload: viewType });
  
export const handleDataroomModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DATAROOM_MODAL,
      payload: modalProps,
    });
  };
  export const handleDataroomNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DATAROOM_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const getDataRoom = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_DATAROOM_REQUEST,
    });
    axios
      .get(`${base_url}/data-room/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DATAROOM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DATAROOM_FAILURE,
          payload: err,
        });
      });
  };

  export const getuserList = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_USERLIST_REQUEST,
    });
    axios
      .get(`${base_url}/employee/active/user/drop-down/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_USERLIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_USERLIST_FAILURE,
          payload: err,
        });
      });
  };

  export const addDataroom = (data, cb) => (dispatch) => {
    console.log(data);
    dispatch({ type: types.ADD_DATAROOM_REQUEST });
    axios
      .post(`${base_url}/data-room/save`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_DATAROOM_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DATAROOM_FAILURE,
          payload: err,
        });
      });
  };





  export const getProspectOpenTask = (customerId) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_OPEN_TASK_REQUEST,
    });
    axios
      .get(`${base_url}/task/customer/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_OPEN_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_OPEN_TASK_FAILURE,
          payload: err,
        });
      });
  };





  export const getProspectOppOpenTask = (customerId) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_OPP_OPEN_TASK_REQUEST,
    });
    axios
      .get(`${base_url}/opportunity/open/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_OPP_OPEN_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_OPP_OPEN_TASK_FAILURE,
          payload: err,
        });
      });
  };




  export const getProspectOppCloseTask = (customerId) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_OPP_CLOSE_TASK_REQUEST,
    });
    axios
      .get(`${base_url}/opportunity/lost/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_OPP_CLOSE_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_OPP_CLOSE_TASK_FAILURE,
          payload: err,
        });
      });
  };



  export const updateOpportunitydragstage = (
    data,
      
    sourceStageId,
    destinationStageId,
    opportunityId,
    cb
  ) => (dispatch) => {
    console.log(sourceStageId, destinationStageId, opportunityId);
    if (destinationStageId === "won") {
      message.success("stage is won");
    }
    if (destinationStageId === "loss") {
      message.error("stage is loss");
    }
    dispatch({
      type: types.UPDATE_OPPORTUNITY_DRAG_STAGE_REQUEST,
      payload: {
        sourceStageId,
        destinationStageId,
        opportunityId,
      },
    });
    axios
      .put(
        `${base_url}/opportunity/update/stage`,data, {
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
          type: types.UPDATE_OPPORTUNITY_DRAG_STAGE_SUCCESS,
          payload: res.data,
        });
        cb && cb(res.data);
      })
      .catch((err) => {
        console.log(err);
  
        dispatch({
          type: types.UPDATE_OPPORTUNITY_DRAG_STAGE_FAILURE,
          payload: err,
        });
        cb && cb("failure");
      });
  };





  export const getProspectOppWonData = (customerId) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_OPP_WON_REQUEST,
    });
    axios
      .get(`${base_url}/opportunity/won/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_OPP_WON_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_OPP_WON_FAILURE,
          payload: err,
        });
      });
  };




  export const getProspectSectorOpenData = (sectorId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_SECTOR_OPEN_REQUEST,
    });
    axios
      .get(`${base_url}/customer/open/opp/sector/${sectorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_SECTOR_OPEN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_SECTOR_OPEN_FAILURE,
          payload: err,
        });
      });
  };



  export const getProspectSourceOpenData = (sourceId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_SOURCE_OPEN_REQUEST,
    });
    axios
      .get(`${base_url}/customer/open/opp/source/${sourceId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_SOURCE_OPEN_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_SOURCE_OPEN_FAILURE,
          payload: err,
        });
      });
  };




  export const getProspectSectorOppWonData = (sectorId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_SECTOR_OPP_WON_REQUEST,
    });
    axios
      .get(`${base_url}/customer/won/opp/sector/${sectorId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_SECTOR_OPP_WON_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_SECTOR_OPP_WON_FAILURE,
          payload: err,
        });
      });
  };






  
  export const getProspectSectorOppLostData = (sectorId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_PROSPECT_SECTOR_OPP_LOST_REQUEST,
    });
    axios
      .get(`${base_url}/customer/lost/opp/sector/${sectorId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_PROSPECT_SECTOR_OPP_LOST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_PROSPECT_SECTOR_OPP_LOST_FAILURE,
          payload: err,
        });
      });
  };
