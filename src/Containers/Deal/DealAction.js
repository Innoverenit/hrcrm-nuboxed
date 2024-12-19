import * as types from "./DealActionType";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url } from "../../Config/Auth";
import { message } from "antd";

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
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, reach out to support!',
          showConfirmButton: false,
        timer: 1500,
        })
      });
  };

  export const createDeals = (deal, cb) => (dispatch,getState) => {
    const userId = getState().auth.userDetails.userId;
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
        dispatch(getdealsRecord(userId));
        dispatch(getOpportunityRecord(userId));
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

  export const getInvestorDeals = (investorId) => (dispatch) => {
 
    dispatch({
      type: types.GET_INVESTOR_DEALS_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunity/details/investor/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DEALS_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_DEALS_DATA_FAILURE,
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
   
      .put(`${base_url}/investorOpportunity/rowEdit/${invOpportunityId}`, data, {
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

export const getdealsTeamRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DEALS_TEAM_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunit/teams/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEALS_TEAM_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DEALS_TEAM_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getdealsAllRecord = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DEALS_ALL_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/all/record/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEALS_ALL_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DEALS_ALL_RECORDS_FAILURE,
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

export const handleDealContactsDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DEALS_CONTACTS_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const LinkStageDeal = (data,userId, cb) => (dispatch) => {
  dispatch({ type: types.LINK_DEAL_REQUEST });

  axios
    .put(`${base_url}/investorOpportunity/update/stage`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
    
      console.log(res);
     
      if (res.data.message) {
        Swal.fire({
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }

      dispatch({
        type: types.LINK_DEAL_SUCCESS,
        payload: res.data,
      });

      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
message.error("Something went wrong")
   

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
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, reach out to support!',
        showConfirmButton: false,
        timer: 1500,
      })
    });
};

export const getlostRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_LOST_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/InvestorOpportunity/LostInd/record/count/${userId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOST_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_LOST_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const sendToWonCard = (data, invOpportunityId,userId ) => (dispatch) => {
  dispatch({ type: types.SEND_WON_CARD_REQUEST });

  axios
    .put(`${base_url}/investorOpportunities/update/wonInd/${invOpportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      dispatch(getAllDealsbyUserId(userId));
      message.success("Congratulations on this Win.Wish you success!");
      console.log(res);
      dispatch({
        type: types.SEND_WON_CARD_SUCCESS,
        payload: res.data,
      //  payload: invOpportunityId,
      });
    })
    .catch((err) => {
     
      console.log(err);
      dispatch({
        type: types.SEND_WON_CARD_FAILURE,
      });
    });
};



export const sendToWon = ( invOpportunityId,data,userId ) => (dispatch) => {
  dispatch({ type: types.SEND_WON_TO_REQUEST });

  axios
    .put(`${base_url}/investorOpportunities/update/wonInd/${invOpportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      dispatch(getAllDealsbyUserId(userId));
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

export const lostRecruit = ( invOpportunityId,data,userId ) => (dispatch) => {
  dispatch({ type: types.SEND_LOST_TO_REQUEST });

  axios
    .put(`${base_url}/investorOpportunity/update/lostInd/${invOpportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      dispatch(getAllDealsbyUserId(userId));
     // message.success("Congratulations on this Win.Wish you success!");
      console.log(res);
      dispatch({
        type: types.SEND_LOST_TO_SUCCESS,
        payload: invOpportunityId,
      });
      //window.location.reload();
    })
    .catch((err) => {
     
      console.log(err);
      dispatch({
        type: types.SEND_LOST_TO_FAILURE,
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
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, reach out to support!',
        showConfirmButton: false,
        timer: 1500,
      })
    });
};

export const getTeamsDeals = (userId,pageNo) => (dispatch) => {
 
  dispatch({
    type: types.GET_TEAMS_DEALS_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunit/teams/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAMS_DEALS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_TEAMS_DEALS_DATA_FAILURE,
        payload: err,
      });
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, reach out to support!',
        showConfirmButton: false,
        timer: 1500,
      })
    });
};

export const updateDealdragstage = (
  data,
    
  sourceStageId,
  destinationStageId,
  invOpportunityId,
  userId,
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
      `${base_url}/investorOpportunity/update/stage`,data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      dispatch(getAllDealsbyUserId(userId));
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

export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

export const addDealDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_DEAL_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/investorOpportunity/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_DEAL_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // dispatch(getCandidateDocument(candidateId));
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DEAL_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

export const getDealDocument = (invOpportunityId) => (dispatch) => {
  dispatch({ type: types.GET_DEAL_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/investorOpportunity/document/${invOpportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEAL_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEAL_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const getOpportunityRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_RECORD_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/record/today/${userId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_FAILURE,
        payload: err,
      });
    });
};

export const deleteDealsData = (invOpportunityId,userId) => (dispatch) => {
  dispatch({
    type: types.DELETE_DEAL_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/investorOpportunity/delete/${invOpportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getdealsRecord(userId));
      Swal.fire({
        icon: 'success',
        title: 'Deal Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.DELETE_DEAL_DATA_SUCCESS,
        payload: invOpportunityId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DEAL_DATA_FAILURE,
        payload: err,
      });
    });
};

export const removeDealDocuments = ( documentId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_DEAL_DOCUMENT_REQUEST,
  });
  axios
    .delete(`${base_url}/investorOpportunity/document/${documentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Document has been deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_DEAL_DOCUMENT_SUCCESS,
        payload:documentId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_DEAL_DOCUMENT_FAILURE,
      });
    });
};


export const setContactRoleForDeals = (
  data,
  contactId,
  
 
) => (dispatch) => {
  //console.log(opportunityId, contactId, role);
  console.log(sessionStorage.getItem("token"));
  axios
    .put(
      `${base_url}/opportunity/update/contact/Role/${contactId}`,data,
      {
      
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      
      })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_CONTACT_ROLE_BY_DEAL_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};


export const getLostDeals = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_LOST_DEALS_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/lostInd/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOST_DEALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOST_DEALS_FAILURE,
        payload: err,
      });
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, reach out to support!',
        showConfirmButton: false,
        timer: 1500,
      })
    });
};

export const getDealsContactList = (invOpportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_DEALS_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunit/fund/${invOpportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEALS_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DEALS_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const setDealsContactType = (data) => (dispatch) => {
  dispatch({ type: types.SET_DEALS_CONTACT_REQUEST });
  axios
    .post(
  
      `${base_url}/investorOpportunit/fund/toggle/update`,data,
      {
    
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      
      })
    .then((res) => {
      console.log(res);
     
      dispatch({
        type: types.SET_DEALS_CONTACT_SUCCESS,
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
        type: types.SET_DEALS_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const setDealsContactValue = (data,invOpportunityId) => (dispatch) => {
  dispatch({ type: types.SET_DEALS_CONTACT_VALUE_REQUEST });
  axios
    .post(`${base_url}/investorOpportunit/fund/update`,data,
      {
    
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      
      })
    .then((res) => {
      dispatch(getDealsContactList(invOpportunityId))
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      dispatch({
        type: types.SET_DEALS_CONTACT_VALUE_SUCCESS,
        payload: res.data,
      });
   
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SET_DEALS_CONTACT_VALUE_FAILURE,
        payload: err,
      });
    });
};

export const getActiveAssignedToList = (orgId,type) => (dispatch) => {
 
  dispatch({
    type: types.GET_ACTIVE_ASSIGENED_TO_REQUEST,
  });
  axios
    .get(`${base_url}/employee/active/user/type/drop-down/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACTIVE_ASSIGENED_TO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ACTIVE_ASSIGENED_TO_FAILURE,
        payload: err,
      });
    });
};

export const getDeleteRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DELETE_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/deleteHistory/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETE_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DELETE_RECORDS_FAILURE,
        payload: err,
      });
    });
};


export const getDeletedDeal = (pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_DEAL_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/deleteHistory/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_DEAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_DEAL_FAILURE,
        payload: err,
      });
    });
};

export const handleOwnModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OWN_MODAL,
    payload: modalProps,
  });
};


export const inputDealDataSearch = (name,type) => (dispatch) => {
  dispatch({
    type: types.INPUT_DEAL_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/search/alltype/${name}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.opportunityId) {
        console.log(res.data);      
      }

      dispatch({
        type: types.INPUT_DEAL_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_DEAL_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const ClearSearchedDataOfDeal = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_SEARCHED_DATA_DEAL,
  });
};