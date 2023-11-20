import * as types from "./DealActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";
import { ActionHeader } from "../../Components/Utils";

export const setDealViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_DEAL_VIEW_TYPE,
      payload: viewType,
    });
  };
  
  export const getDealListbyUserId = (userId,page) => (dispatch) => {
    dispatch({
      type: types.GET_DEAL_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunity/user/${userId}/${page}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DEAL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DEAL_FAILURE,
          payload: err,
        });
      });
  };

  export const createDeals = (deal, cb) => (dispatch) => {
    dispatch({
      type: types.CREATE_DEAL_REQUEST,
    });
    axios
      .post(`${base_url}/investorOpportunity`, deal, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getOpportunityListByUserId(userId));
        // dispatch(getLatestOpportunities(userId, startDate, endDate));
        // dispatch(getOpportunitiesByPrice(userId));
        dispatch({
          type: types.CREATE_DEAL_SUCCESS,
          payload: res.data,
        });
      
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_DEAL_FAILURE,
          payload: err,
        });
      });
  };

  export const handleDealModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DEAL_MODAL,
      payload: modalProps,
    });
  };

  export const getDealDetailById = (invOpportunityId) => (dispatch) => {
    dispatch({
      type: types.GET_DEAL_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunity/${invOpportunityId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
        .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DEAL_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DEAL_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  
  export const updateDeal = (data, invOpportunityId) => (dispatch) => {

    dispatch({ type: types.UPDATE_DEAL_BY_ID_REQUEST });
    axios
      .put(`${base_url}/investorOpportunity/${invOpportunityId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res); 
        dispatch({
          type: types.UPDATE_DEAL_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DEAL_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const handleUpdateDealModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_DEAL_MODAL,
      payload: modalProps,
    });
  };
  
  export const getAllDealsbyUserId = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DEALS_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunities/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DEALS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_DEALS_FAILURE,
          payload: err,
        });
      });
  };
  export const emptyDeals = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_DEALS_LIST, 
    });
  };

  export const getAllDealStages = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_DEAL_STAGES_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunityWorkflow/opportunityStage/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_DEAL_STAGES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_DEAL_STAGES_FAILURE,
          payload: err,
        });
      });
  };
  export const handleDealContactModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DEAL_CONTACT_MODAL,
      payload: modalProps,
});};

export const getDealContactList = (invOpportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_DEALS_CONTACT_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/contact/details/${invOpportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEALS_CONTACT_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEALS_CONTACT_LIST_FAILURE,
        payload: err,
      });
    });
};

export const addDealContact = (contact) => (dispatch, getState) => {
  dispatch({
    type: types.ADD_DEAL_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url}/investorOpportunity/contact`, contact, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      dispatch({
        type: types.ADD_DEAL_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DEAL_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const getDealLinkedStages = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DEAL_LINKED_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunityWorkflow/opportunityStage/for-dropdown/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEAL_LINKED_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEAL_LINKED_STAGES_FAILURE,
        payload: err,
      });
    });
};

export const getDealLinkedWorkflow = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DEAL_LINKED_WORKFLOW_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/investorOpportunityWorkflow/for-dropdown/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEAL_LINKED_WORKFLOW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEAL_LINKED_WORKFLOW_FAILURE,
        payload: err,
      });
    });
};


export const getdealsRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DEALS_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEALS_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DEALS_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const handleDealsNotesDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DEALS_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const LinkStageDeal = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_DEAL_REQUEST });

  axios
    .put(`${base_url}/investorOpportunity/update/stage`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);

      dispatch({
        type: types.LINK_DEAL_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DEAL_FAILURE,
      });
      cb && cb("failure");
    });
};

export const addDealsNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_DEALS_NOTES_REQUEST });
  axios
    .post(`${base_url}/investorOpportunity/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_DEALS_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_DEALS_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
    
};

export const getNotesListByDealId = (invOpportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_DEAL_ID_REQUEST,
  });
  axios
    .get(`${base_url}/notes/investorOpportunity/${invOpportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_DEAL_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_DEAL_ID_FAILURE,
        payload: err,
      });
    });
};

export const getWonDeals = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_WON_DEALS_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/WonInd/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WON_DEALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WON_DEALS_FAILURE,
        payload: err,
      });
    });
};
export const sendToWon = ( invOpportunityId,data ) => (dispatch) => {
  dispatch({ type: types.SEND_WON_TO_REQUEST });

  axios
    .put(`${base_url}/investorOpportunities/update/wonInd/${invOpportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      message.success("Congratulations on this Win.Wish you success!");
      console.log(res);
      dispatch({
        type: types.SEND_WON_TO_SUCCESS,
        payload: invOpportunityId,
      });
    })
    .catch((err) => {
     
      console.log(err);
      dispatch({
        type: types.SEND_WON_TO_FAILURE,
      });
    });
};

export const updateDealName = (data, invOpportunityId) => (
  dispatch,
  getState
) => {
   const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.UPDATE_DEAL_NAME_REQUEST });
  axios
    .put(`${base_url}/investorOpportunity/${invOpportunityId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getOpportunityListByUserId(userId,0));
      dispatch({
        type: types.UPDATE_DEAL_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DEAL_NAME_FAILURE,
        payload: err,
      });
    });
};


export const getAllDeals = (userId,pageNo) => (dispatch) => {
 
  dispatch({
    type: types.GET_ALL_DEALS_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/user/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_DEALS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_DEALS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateDealdragstage = (
  data,
    
  sourceStageId,
  destinationStageId,
  invOpportunityId,
  cb
) => (dispatch) => {
  console.log(sourceStageId, destinationStageId, invOpportunityId);
  if (destinationStageId === "won") {
    message.success("stage is won");
  }
  if (destinationStageId === "loss") {
    message.error("stage is loss");
  }
  dispatch({
    type: types.UPDATE_DEAL_DRAG_STAGE_REQUEST,
    payload: {
      sourceStageId,
      destinationStageId,
      invOpportunityId,
    },
  });
  axios
    .put(
      `${base_url}/investorOpportunity/${invOpportunityId}`,data, {
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
        type: types.UPDATE_DEAL_DRAG_STAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb(res.data);
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: types.UPDATE_DEAL_DRAG_STAGE_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};