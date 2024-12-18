import * as types from "./OpportunityActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url,base_url2 } from "../../Config/Auth";
import { message } from "antd";


/**
 * SET OPPORTUNITY VIEW TYPE
 */
export const setOpportunityViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_OPPORTUNITY_VIEW_TYPE,
    payload: viewType,
  });
};

export const handleRecruitmentEmailDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUITMENT_EMAIL_DRAWER_MODAL,
    payload: modalProps,
  });
};


export const setSelectedClosureTimeIntervalReport = (selectedTime) => (dispatch) => {
  console.log(selectedTime);
  dispatch({
    type: types.CHANGE_SELECTED_CLOSURE_TIME_INTERVAL_REPORT,
    payload: selectedTime,
  });
};

export const handleOpportunityDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPPORTUNITY_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const handleSentimentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SENTIMENT_MODAL,
    payload: modalProps,
  });
};


export const handleOpportunityPulseModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPPORTUNITY_PULSE_MODAL,
    payload: modalProps,
  });
};

export const handleBarChartOrderModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BAR_CHART_ORDER_MODAL,
    payload: modalProps,
  });
};

export const setEditRemark = (name) => (dispatch) => {
  dispatch({
    type: types.SET_REMARK_EDIT,
    payload: name,
  });
};

export const handleUpdateRemarkModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_REMARK_MODAL,
    payload: modalProps,
  });
};

export const handleCandidateDateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_DATE_MODAL,
    payload: modalProps,
  });
};
export const handleAddRequiremenDetailtModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_REQUIREMENT_DETAIL_MODAL,
    payload: modalProps,
  });
};


export const addCandidateDate = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_CANDIDATE_DATE_REQUEST,
  });
  axios
    .put(`${base_url}/recruitment/candidate/onboarding`,data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_CANDIDATE_DATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_DATE_FAILURE,
        payload: err,
      });
    });
};


export const updateRemark = (data, recruitmentStageNoteId) => (dispatch, getState) => {
  console.log(data);
  // const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.UPDATE_REMARK_REQUEST });
  axios
    .put(`${base_url}/note/feedback/${recruitmentStageNoteId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.UPDATE_REMARK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_REMARK_FAILURE,
        payload: err,
      });
    });
};




export const addWebsite = (publish,opportunityId) => (dispatch,getState) => {
  // const userId = getState().auth.userDetails.userId;

   const opportunityId = getState().opportunity.opportunity.opportunityId;
 
  dispatch({
    type: types.ADD_WEBSITE_REQUEST,
  });

  axios
    .post(`${base_url}/recruitment/publish`, publish,  {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getAllRecruitmentDetailsByOppId(opportunityId));
      dispatch({
        type: types.ADD_WEBSITE_SUCCESS,
        payload: res.data,
      });
     
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_WEBSITE_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};






export const updateRecruitment = (data, opportunityId, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_RECRUITMENT_REQUEST });

  axios
    .put(`${base_url}/recriutment/update/recruitment`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      //debugger;
      dispatch(getRecruitByOpportunityId(opportunityId));
      console.log("data...............", res);
      cb && cb("success", res.data.sponserId);

      // message.success("Update successfully!");
      dispatch({
        type: types.UPDATE_RECRUITMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      //debugger;
      console.log(err);
      dispatch({
        type: types.UPDATE_RECRUITMENT_FAILURE,
      });
      cb && cb("failure");
    });
};

export const setAddRequirement = (name) => (dispatch) => {
  dispatch({
    type: types.SET_ADD_REQUIREMENT,
    payload: name,
  });
};

export const handleAddRequirementModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_REQUIREMENT_MODAL,
    payload: modalProps,
  });
};

export const getSkillsCount = (recruitmentId,orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SKILLS_COUNT_REQUEST,
  });
  axios
     .get(`${base_url}/count/defination/${recruitmentId}/${orgId}`, {
     headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SKILLS_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SKILLS_COUNT_FAILURE,
        payload: err,
      });
    });
};
export const clearReducerState = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_REDUCER_STATE,
   
  });
};


export const getAllRecruitmentDetailsByOppId = (oppId) => (dispatch) => {
  dispatch({ type: types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_REQUEST });

  axios
    .get(`${base_url}/recruitment/summary/${oppId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_FAILURE,
      });
    });
};

export const handleRemarksModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REMARKS_MODAL,
    payload: modalProps,
  });
};

export const setCurrentRecruiterData = (data) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_RECRUITER_DATA, payload: data });
};
export const handleRecruiterModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUITER_MODAL,
    payload: modalProps,
  });
};

export const getCurrency = () => (dispatch) => {
  dispatch({
    type: types.GET_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url}/currencies/sales`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CURRENCY_FAILURE,
        payload: err,
      });
    });
};

export const setCurrentOpportunityRecruitMentData = (data) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_OPPORTUNITY_RECRUITMENT_DATA, payload: data });
};

/* Opportunity modal action */
export const handleOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};

/*request for adding a opportunity */
export const addOpportunity = (opportunity, cb) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_OPPORTUNITY_REQUEST,
  });
  axios
    .post(`${base_url}/opportunity`, opportunity, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Opportunity created Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
        dispatch(getOpportunityRecord(userId));
      // dispatch(getLatestOpportunities(userId, startDate, endDate));
      dispatch(getRecords(userId));
      dispatch({
        type: types.ADD_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

/*get all the opportunity of the user */
export const getOpportunityListByUserId = (userId,page) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/user/${userId}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};
//Opportunitys
export const getOpportunityById = (opportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_DETAILS_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_DETAILS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_DETAILS_BY_ID_FAILURE,
        payload: err,
      });
    });
};

// Add Document Modal
export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/opportunity/document/${documentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_DOCUMENT_SUCCESS,
        payload: documentId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/* add a note */
export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_OPPORTUNITY_NOTES_REQUEST });
  axios
    .post(`${base_url}/opportunity/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_OPPORTUNITY_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_OPPORTUNITY_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};

/* get Opportunity Notes */
export const getNotesListByOpportunityId = (opportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/notes/opportunity/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_FAILURE,
        payload: err,
      });
    });
};

// Add Recruit Modal
export const handleRecruitModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUIT_MODAL,
    payload: modalProps,
  });
};

export const handleCustomerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_MODAL,
    payload: modalProps,
  });
};

// Add Profile Modal
export const handleTagProfileModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TAGPROFILE_MODAL,
    payload: modalProps,
  });
};

/**
 * Update Opportunity Modal
 */
export const handleUpdateOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};

export const setEditOpportunity = (name) => (dispatch) => {
  dispatch({
    type: types.SET_OPPORTUNITY_EDIT,
    payload: name,
  });
};

/**
 * update a opportunity using put request
 */


 export const updateOpportunity = (data, invOpportunityId) => (
  dispatch,
) => {
  
  dispatch({ type: types.UPDATE_OPPORTUNITY_BY_ID_REQUEST });
  axios
  .put(`${base_url}/investorOpportunity/rowEdit/${invOpportunityId}`, data, {
 
    // .put(`${base_url}/opportunity/${opportunityId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Opportunity Info updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
      //  dispatch(getOpportunityListByUserId(userId,0));
      dispatch({
        type: types.UPDATE_OPPORTUNITY_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_OPPORTUNITY_BY_ID_FAILURE,
        payload: err,
      });
    });
};


/**
 * add document to a opportunity
 */
export const addOpportunityDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_OPPORTUNITY_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/opportunity/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_OPPORTUNITY_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_OPPORTUNITY_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * get documents of an opportunity
 */
export const getOpportunityDocument = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_OPPORTUNITY_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/opportunity/document/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

//SEARCH
export const inputOpportunityDataSearch = (name,type) => (dispatch) => {
  dispatch({
    type: types.INPUT_OPPORTUNITY_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/search/type/${name}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.opportunityId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_OPPORTUNITY_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_OPPORTUNITY_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

/**
 * get opportunity list by opportunityId
 */
export const getContactListByOpportunityId = (opportunityId) => (dispatch) => {
  console.log(opportunityId);
  dispatch({
    type: types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/contact/details/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_FAILURE,
        payload: err,
      });
    });
};
// recruit add
export const addRecruit = (data, opportunityId) => (dispatch) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.LINK_RECRUIT_TO_OPPORTUNITY_REQUEST });

  axios
    .post(`${base_url}/link/recruitment/opportunity`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      if (res.data.jobOrderInd === true) {

        message.error(res.data.message);
        dispatch({
          type: types.LINK_RECRUIT_TO_OPPORTUNITY_FAILURE,
        });
      } else {
        message.success("Requirement added successfully!");
      // message.success("Requirement added successfully!");
      // dispatch(getRecruitByOpportunityId(opportunityId));
      console.log(res);
      // dispatch(getRecruitByOpportunityId(opportunityId));
      dispatch({
        type: types.LINK_RECRUIT_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_TO_OPPORTUNITY_FAILURE,
      });
      // cb && cb();
    });
};

// recruit get
export const getRecruitByOpportunityId = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_RECRUIT_TO_OPPORTUNITY_REQUEST });

  axios
    .get(`${base_url}/link/recruitment/opportunity/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_RECRUIT_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUIT_TO_OPPORTUNITY_FAILURE,
      });
    });
};

export const deleteOpportunityData = (id) => (dispatch) => {
  dispatch({
    type: types.DELETE_OPPORTUNITY_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/opportunity/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Opportunity Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      // if (res.data) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: res.data,
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // } else {
       
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Not Deleted',
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // }
      console.log(res);
      dispatch({
        type: types.DELETE_OPPORTUNITY_DATA_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_OPPORTUNITY_DATA_FAILURE,
        payload: err,
      });
    });
};

//get all the deleted Opportunity of the user
export const getDeletedOpportunity = (page) => (dispatch) => {
  dispatch({
    type: types.GET_DELETED_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/deleteHistory/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DELETED_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DELETED_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const getOpportunityPermissionsList = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"opportunity"}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_FAILURE,
        payload: err,
      });
    });
};
export const getAllOpportunityListByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_OPPORTUNITIES_REQUEST,
  });
  axios
    .get(`${base_url}/opportunityList/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_OPPORTUNITIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_OPPORTUNITIES_FAILURE,
        payload: err,
      });
    });
};





//Opportunity PERMISSION SHARE
export const shareOpportunityPermission = (data, userId,a) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_OPPORTUNITY_PERMISSION_REQUEST,
  });

  axios
    .post(`${base_url}/permission/details`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      if (a === "All") {
        dispatch(getAllOpportunityListByUserId());
        dispatch(getRecords(userId));
        // dispatch(getAllRecords(userId));
      } else {
      dispatch(getOpportunityListByUserId(userId));
      dispatch(getRecords(userId));
      }
      dispatch({
        type: types.ADD_SHARE_OPPORTUNITY_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_OPPORTUNITY_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

export const getProfile = (opportunityId) => (dispatch) => {
  dispatch({ type: types.LINK_PROFILE_TO_OPPORTUNITY_REQUEST });

  axios
    .get(`${base_url}/recriutment/jobOrder/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getProfileByOpportunityId(opportunityId));
      console.log(res);
      dispatch({
        type: types.LINK_PROFILE_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PROFILE_TO_OPPORTUNITY_FAILURE,
      });
    });
};

export const addRecruitProProfile = (data, cb) => (dispatch) => {
  dispatch({ type: types.ADD_RECRUITMENT_PROFILE_REQUEST });

  axios
    .post(`${base_url}/link/profile/recruit `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);

      dispatch({
        type: types.ADD_RECRUITMENT_PROFILE_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_RECRUITMENT_PROFILE_FAILURE,
      });
      cb && cb();
    });
};

export const addRemark = (data, profileId) => (dispatch) => {
  dispatch({ type: types.ADD_REMARK_REQUEST });

  axios
    .post(`${base_url}/note/stage`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      dispatch(getRemark(profileId));
      console.log(res);
      dispatch({
        type: types.ADD_REMARK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_REMARK_FAILURE,
      });
    });
};

export const getRemark = (profileId) => (dispatch) => {
  dispatch({ type: types.GET_REMARK_REQUEST });

  axios
    .get(`${base_url}/note/${profileId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REMARK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REMARK_FAILURE,
      });
    });
};

export const LinkSkillsRecruit = (data) => (dispatch) => {
  dispatch({ type: types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/link/recriutment/skill `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_FAILURE,
      });
    });
};

export const handleSponsorModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SELECT_SPONSOR_MODAL,
    payload: modalProps,
  });
};

export const LinkCandidateRecruit = (data,opportunityId,) => (dispatch,getState) => {
  const recruiterId = getState().auth.userDetails.userId;
  const role = getState().auth.userDetails.role;
  const user = getState().auth.userDetails;
  dispatch({ type: types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/link/recriutment/contcat `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
    //   if(role==="USER"&&user.department==="Recruiter"){
    
    //    dispatch(getRecruitByRecruiterId(recruiterId));
    // }else{
      //dispatch(getRecruitByOpportunityId(opportunityId));
    // } 
      dispatch({
        type: types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_FAILURE,
      });
    });
};

export const LinkRecruitCandidate = (data,opportunityId,) => (dispatch,getState) => {
  const recruiterId = getState().auth.userDetails.userId;
  const role = getState().auth.userDetails.role;
  const user = getState().auth.userDetails;
  dispatch({ type: types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/link/recriutment/contcat `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      //dispatch(getRecruitByRecruiterId(recruiterId));
  
      dispatch({
        type: types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_FAILURE,
      });
    });
};

export const LinkStageRecruit = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/recriutment/update/stage `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);

      dispatch({
        type: types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_FAILURE,
      });
      cb && cb("failure");
    });
};

export const LinkStatusRecruit = (data,opportunityId, cb) => (dispatch) => {
  dispatch({ type: types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/update/recriutment/status `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_FAILURE,
      });
      cb && cb("failure");
    });
};

export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getOpportunityTeamRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_TEAM_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/oppertunity/teams/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_TEAM_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_OPPORTUNITY_TEAM_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getskillsetList = () => (dispatch) => {
  dispatch({
    type: types.SKILL_SET_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/skillSet`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     

      dispatch({
        type: types.SKILL_SET_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.SKILL_SET_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getRecruiterName = () => (dispatch) => {
  dispatch({
    type: types.GET_RECRUITER_NAME_REQUEST,
  });
  axios
     .get(`${base_url}/employee/all-recruiter`, {
     headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUITER_NAME_FAILURE,
        payload: err,
      });
    });
};

export const getRecruiter = (skill,recruitmentId) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_RECRUITER_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/${skill}/${recruitmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECRUITER_FAILURE,
        payload: err,
      });
    });
};



export const getRecruiterList = (recruiterId) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_RECRUITER_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/recruiter/opportunity/${recruiterId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECRUITER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getAllSalesList = () => (dispatch) => {
  dispatch({
    type: types.GET_SALES_LIST_REQUEST,
  });
  axios
     .get(`${base_url}/opportunity/employee/create/all-employees`, {
     headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SALES_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SALES_LIST_FAILURE,
        payload: err,
      });
    });
};





/**
 * link contacts to an opportunity
 */
 export const linkContactsCheckToOpportunity = (
  opportunityId,
  associations,
  cb
) => (dispatch) => {
  console.log(opportunityId, associations);
  dispatch({
    type: types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_REQUEST,
  });
  axios
    // .post(
    //   `${base_url}/check/opportunity/contact/${opportunityId}`,
    //   associations,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    //     },
    //   }
    // )
    .then((res) => {
      if (res.data === true) {
        message.error("This contact is already taggged with this Opportunity");
      } else {
        // dispatch(linkContactsToOpportunity(opportunityId, associations, cb));
      }
      console.log(res);
      dispatch({
        type: types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_FAILURE,
      });
      cb();
    });
};

export const getAllRecruitmentByOppId = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_ALL_RECRUITMENT_BY_OPP_ID_REQUEST });

  axios
    .get(`${base_url}/recruitments/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_RECRUITMENT_BY_OPP_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_RECRUITMENT_BY_OPP_ID_FAILURE,
      });
    });
};

export const getAllRecruitmentPositionByOppId = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_RECRUITMENT_POSITION_BY_OPP_ID_REQUEST });

  axios
    .get(`${base_url}/recruitment/position/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITMENT_POSITION_BY_OPP_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUITMENT_POSITION_BY_OPP_ID_FAILURE,
      });
    });
};

export const getAllRecruitmentPositionFilledByOppId = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_REQUEST });

  axios
    .get(`${base_url}/filled/position/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_FAILURE,
      });
    });
};

export const deleteRequirementData = (recruitmentId,opportunityId) => (dispatch, getState) => {
  // const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_REQUIREMENT_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/delete/profile/${recruitmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
        // dispatch(getRecruitByOpportunityId(opportunityId));
      dispatch({
        type: types.DELETE_REQUIREMENT_DATA_SUCCESS,
        payload: recruitmentId,
      });
     
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_REQUIREMENT_DATA_FAILURE,
        payload: err,
      });
    
    });
};


export const handleReactSpeechModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REACT_SPEECH_MODAL,
    payload: modalProps,
  });
};

export const reinstateToggleForOppo = (data, opportunityId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_REQUEST,
  });
  axios
    .put(`${base_url}/opportunity/reinstate/${opportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
    .then((res) => {
      console.log(res);
      // dispatch(getDeletedOpportunity(0));
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_SUCCESS,
        payload: opportunityId,
      });
      // message.success("Confirmation Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};

export const emailSendStage = (data) => (dispatch) => {
  dispatch({ type: types.SEND_EMAIL_STAGE_UPDATE_REQUEST });

  axios
    .post(`${base_url}/sendMail/stage`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.SEND_EMAIL_STAGE_UPDATE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SEND_EMAIL_STAGE_UPDATE_FAILURE,
      });
    });
};

export const getTeamUserList = (reptMngrId) => (dispatch) => {
  dispatch({ type: types.GET_TEAM_USERLIST_REQUEST });
  axios
    .get(`${base_url}/employee/user-list/reptMngr/${reptMngrId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAM_USERLIST_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TEAM_USERLIST_FAILURE,
        payload: err,
      });
    });
};
// export const linkSummaryStatus = (publish ) => (
//   dispatch,
//   getState
// ) => {
//   // debugger;
//   // const { userId } = getState("auth").auth.userDetails;
//   dispatch({
//     type: types.PUBLISH_SUMMARY_REQUEST,
//   });
//   axios
//     .post(`${base_url}/recruitment/publish`, publish, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       // dispatch(getCandidateListByUserId(userId));
//       dispatch({
//         type: types.PUBLISH_SUMMARY_SUCCESS,
//         payload: res.data,
//       });
//       // cb && cb("success", res.data.message, res.data.suspendInd);
//       // cb && cb("success");
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.PUBLISH_SUMMARY_FAILURE,
//         payload: err,
//       });
//       //  cb && cb("failuer");
//     });
// };

//suspend
// export const publishSummaryStatus = (ubpublish) => (dispatch) => {
//   // debugger;
//   dispatch({
//     type: types.UNPUBLISH_SUMMARY_REQUEST,
//   });
//   axios
//     .post(`${base_url}/recruitment/ubpublish`, ubpublish,{
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       })
//     .then((res) => {
//       dispatch({
//         type: types.UNPUBLISH_SUMMARY_SUCCESS,
//         payload: res.data,
//       });
//       // cb && cb("success", res.data.message, res.data.assignInd);
//     })
//     .catch((err) => {
//       // debugger;
//       console.log(err);
//       dispatch({
//         type: types.UNPUBLISH_SUMMARY_FAILURE,
//         payload: err,
//       });
//       // cb && cb("failuer", null, null);
//     });
// };
export const getRecruitByRecruiterId = (recruiterId) => (dispatch) => {
  dispatch({ type: types.GET_RECRUIT_TO_REQUIREMENT_REQUEST });

  axios
    .get(`${base_url}/recruiter/recruitment/${recruiterId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_RECRUIT_TO_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUIT_TO_REQUIREMENT_FAILURE,
      });
    });
};

export const getRecruiterRequiremnt = (recruiterId) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_RECRUITER_REQUIREMENT_REQUEST,
  });
  axios
    .get(`${base_url}/recruiter/recruitment/${recruiterId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECRUITER_REQUIREMENT_FAILURE,
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

export const getCandidateRequirement = (recruitmentId) => (dispatch) => {
 
  dispatch({
    type: types.GET_CANDIDATE_REQUIREMENT_REQUEST,
  });
  axios
    .get(`${base_url}/recriutment/candidate/${recruitmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATE_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CANDIDATE_REQUIREMENT_FAILURE,
        payload: err,
      });
    });
};

export const updateOwneroppById= (userId,data) => (dispatch,getState) => {
  const userId1 = getState().auth.userDetails.userId;
  dispatch({
    type: types.UPDATE_OPPORTUNITY_OWNERSHIP_REQUEST,
  });
  axios
    .put(`${base_url}/opportunity/transfer/${userId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     dispatch(getOpportunityListByUserId(userId1));
      dispatch({
        type: types.UPDATE_OPPORTUNITY_OWNERSHIP_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_OPPORTUNITY_OWNERSHIP_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};
export const getAllRecruitmentAvgTimeByOppId = (oppId) => (dispatch) => {
 
  dispatch({
    type: types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/onboarding/count/${oppId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_FAILURE,
        payload: err,
      });
    });
};

export const inputJobOrderSearch = (jobOrder) => (dispatch,getState) => {
  const recruiterId = getState().auth.userDetails.userId; 
  dispatch({
    type: types.INPUT_JOB_ORDER_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/jobOrderName/${jobOrder}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
        //dispatch(getRecruiterRequiremnt(recruiterId));
      dispatch({
        type: types.INPUT_JOB_ORDER_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_JOB_ORDER_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const LinkClosedRequirement = (recruitmentId,recruitment,) => (dispatch,getState) => {
  const opportunityId = getState().opportunity.opportunity.opportunityId;
  dispatch({
    type: types.LINK_CLOSE_REQUIREMENT_REQUEST,
  });
  axios
    .put(`${base_url}/recruitment/close/${recruitmentId}`, recruitment,{
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch(getRecruitByOpportunityId(opportunityId));
      dispatch({
        type: types.LINK_CLOSE_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_CLOSE_REQUIREMENT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const getClosedRequirement = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_CLOSED_REQUIREMENT_REQUEST });

  axios
    .get(`${base_url}/link/recruitment/close/opportunity/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_CLOSED_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CLOSED_REQUIREMENT_FAILURE,
      });
    });
};

export const addSentiment = (data, profileId) => (dispatch) => {
  dispatch({ type: types.ADD_SENTIMENT_REQUEST });

  axios
  .post(`https://develop.tekorero.com/HrAnalytics/sentiment/score`, data, {
    // headers: {
    //   "Content-Type": "Application/json",
     
    // }
  })

    .then((res) => {
      
      console.log(res);
      dispatch({
        type: types.ADD_SENTIMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SENTIMENT_FAILURE,
      });
    });
};

export const LinkOpenedRequirement = (recruitmentId,recruitment,) => (dispatch,getState) => {
  const opportunityId = getState().opportunity.opportunity.opportunityId;
  dispatch({
    type: types.LINK_OPENED_REQUIREMENT_REQUEST,
  });
  axios
    .put(`${base_url}/recruitment/open/${recruitmentId}`, recruitment,{
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch(getClosedRequirement(opportunityId));
      dispatch({
        type: types.LINK_OPENED_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPENED_REQUIREMENT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};
export const handleMonsterModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_MONSTER_MODAL,
    payload: modalProps,
  });
};

export const getJobCategory = () => (dispatch) => {
  dispatch({ type: types.GET_JOB_CATEGORY_REQUEST });

  axios
    .get(`${base_url}/job/category`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_JOB_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JOB_CATEGORY_FAILURE,
      });
    });
};
export const getJobBoardName = () => (dispatch) => {
  dispatch({ type: types.GET_JOB_BOARD_NAME_REQUEST });

  axios
    .get(`${base_url}/job/board`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_JOB_BOARD_NAME_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JOB_BOARD_NAME_FAILURE,
      });
    });
};




export const addMoreContact = (opportunity, cb) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_MORE_CONTACT_REQUEST,
  });
  axios
    .post(`${base_url}/contact`, opportunity, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     
      
      dispatch({
        type: types.ADD_MORE_CONTACT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MORE_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const getJobBoardOccupation = () => (dispatch) => {
  dispatch({ type: types.GET_JOB_OCCUPATION_REQUEST });

  axios
    .get(`${base_url}/job/occupation`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_JOB_OCCUPATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JOB_OCCUPATION_FAILURE,
      });
    });
};


export const getJobBoardIndustry = () => (dispatch) => {
  dispatch({ type: types.GET_JOB_BOARD_INDUSTRY_REQUEST });

  axios
    .get(`${base_url}/job/industry`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_JOB_BOARD_INDUSTRY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_JOB_BOARD_INDUSTRY_FAILURE,
      });
    });
};

export const addMonster = (publish) => (dispatch) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.LINK_MONSTER_REQUEST });

  axios
    .post(`${base_url}/monster/publish`, publish, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
   
       
      console.log(res);
      //dispatch(getRecruitByOpportunityId(opportunityId));
      dispatch({
        type: types.LINK_MONSTER_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_MONSTER_FAILURE,
      });
      // cb && cb();
    });
};


export const getRequirementOwner = (recruitmentId) => (dispatch) => {
 
  dispatch({
    type: types.GET_REQUIREMENT_OWNER_REQUEST,
  });
  axios
    .get(`${base_url}/recriutment/candidate/RecruitOwner/${recruitmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REQUIREMENT_OWNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REQUIREMENT_OWNER_FAILURE,
        payload: err,
      });
    });
};

export const setContactRoleForOpportunity = (
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
        type: types.UPDATE_CONTACT_ROLE_BY_OPPORTUNITY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const updateOpportunityName= (data, opportunityId) => (dispatch, getState) => {
  console.log(data);
  const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.UPDATE_OPPORTUNITY_NAME_REQUEST });
  axios
    .put(`${base_url}/opportunity/${opportunityId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.UPDATE_OPPORTUNITY_NAME_SUCCESS,
        payload: res.data,
      });
      message.error(res.data.message)
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_OPPORTUNITY_NAME_FAILURE,
        payload: err,
      });
    });
};


export const getRecruitmentDelete = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_RECRUIT_DELETE_REQUEST });

  axios
    .get(`${base_url}/deleted/recruitment/opportunity/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_RECRUIT_DELETE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUIT_DELETE_FAILURE,
      });
    });
};
export const getInititativeSkills = (initiativeDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_INITITATIVE_SKILLS_REQUEST,
  });
  axios               
    .get(`${base_url}/customer/initiative/skill/${initiativeDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INITITATIVE_SKILLS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INITITATIVE_SKILLS_FAILURE,
        payload: err,
      });
    });
};


export const getInitiative = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_INITIATIVE_REQUEST,
  });
  axios
    .get(`${base_url}/customer/initiative/name/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INITIATIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INITIATIVE_FAILURE,
        payload: err,
      });
    });
};

export const getOpportunitySKill = (initiativeDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_SKILLS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/initiative/skill/${initiativeDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_SKILLS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_SKILLS_FAILURE,
        payload: err,
      });
    });
};

export const handleMessageModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_MESSAGE_MODAL,
    payload: modalProps,
  });
};


export const addOpportunitySkills = (data, ) => (dispatch) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.ADD_OPPORTUNITY_SKILLS_REQUEST });

  axios
    .post(`${base_url}/opportunity/Innitiative/skill/number`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
   
     
      dispatch({
        type: types.ADD_OPPORTUNITY_SKILLS_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_OPPORTUNITY_SKILLS_FAILURE,
      });
      // cb && cb();
    });
};

export const getDeleteRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DELETE_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/deleteHistory/record/count/${userId}`, {
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

// export const getDeleteRecords = () => (dispatch) => {
//   dispatch({
//     type: types.GET_DELETE_RECORDS_REQUEST,
//   });
//   axios
//     .get(`${base_url}/opportunity/deleteHistory/record/count `, {})
    
//     .then((res) => {
//       console.log(res);
//       dispatch({
//         type: types.GET_DELETE_RECORDS_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err.response);
//       dispatch({
//         type: types.GET_DELETE_RECORDS_FAILURE,
//         payload: err,
//       });
//     });
// };

export const getcloseRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CLOSE_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/CloseInd/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CLOSE_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CLOSE_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getAllRecords = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/all/record/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getlostRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_LOST_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/LostInd/record/count/${userId}`, {
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


export const StatusRecruit = ( opportunityId,data ) => (dispatch) => {
  dispatch({ type: types.RECRUIT_STATUS_TO_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/opportunity/update/wonInd/${opportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      message.success("Congratulations on this Win.Wish you success!");
      console.log(res);
      dispatch({
        type: types.RECRUIT_STATUS_TO_OPPORTUNITY_SUCCESS,
        payload: opportunityId,
      });
      // cb && cb("success");
    })
    .catch((err) => {
     
      console.log(err);
      dispatch({
        type: types.RECRUIT_STATUS_TO_OPPORTUNITY_FAILURE,
      });
      // cb && cb("failure");
    });
};
export const lostStatusRecruit = ( opportunityId,data,userId ) => (dispatch) => {
  dispatch({ type: types.RECRUIT_LOST_STATUS_TO_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/opportunity/update/lostInd/${opportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      if (res.data.message) {
        Swal.fire({
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Not updated',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // message.success("Opportunity move to lost category.Better luck next time!");
      console.log(res);
      dispatch({
        type: types.RECRUIT_LOST_STATUS_TO_OPPORTUNITY_SUCCESS,
        payload: opportunityId,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.RECRUIT_LOST_STATUS_TO_OPPORTUNITY_FAILURE,
      });
      // cb && cb("failure");
    });
};

export const LinkClosedOpportunity = (opportunityId,opportunity,userId) => (dispatch,getState) => {
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.LINK_CLOSE_OPPORTUNITY_REQUEST,
  });
  axios
    .put(`${base_url}/opportunity/update/closeInd/${opportunityId}`, opportunity,{
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      // dispatch(getCloseOpportunity(userId,0));
      dispatch({
        type: types.LINK_CLOSE_OPPORTUNITY_SUCCESS,
        payload: opportunityId,
    
      });
    //  message.success("Confirmation Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_CLOSE_OPPORTUNITY_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const linktagCustomer = (opportunityId,opportunity,) => (dispatch,getState) => {
  //const opportunityId = getState().opportunity.opportunity.opportunityId;
  dispatch({
    type: types.LINK_TAG_CUSTOMER_OPPORTUNITY_REQUEST,
  });
  axios
    .put(`${base_url}/opportunity/update/tagCustomer/${opportunityId}`, opportunity,{
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
     // dispatch(getRecruitByOpportunityId(opportunityId));
      dispatch({
        type: types.LINK_TAG_CUSTOMER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_TAG_CUSTOMER_OPPORTUNITY_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const getlostOpportunity = (userId,page) => (dispatch) => {
  dispatch({
    type: types.GET_LOST_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/lostInd/${userId}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LOST_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LOST_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const getCloseOpportunity = (userId,page) => (dispatch) => {
  dispatch({
    type: types.GET_CLOSE_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/closeInd/${userId}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CLOSE_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CLOSE_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const getWorkflow = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_WORKFLOW_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/opportunityWorkflow/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WORKFLOW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WORKFLOW_FAILURE,
        payload: err,
      });
    });
};

export const getStages = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/opportunity/stages/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_STAGES_FAILURE,
        payload: err,
      });
    });
};

export const deleteCloseOpportunity = (opportunityId) => (dispatch, getState) => {
  dispatch({
    type: types.DELETE_OPPORTUNITY_REQUEST,
  });
  axios
    .delete(`${base_url}/opportunity/update/ReinstateInd/True/only/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
       console.log(res);
      dispatch({
        type: types.DELETE_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const getOpportunityForecast = (opportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_FORECAST_REQUEST,
  });
  axios
    .get(`${base_url}/opportunities/forecast/skill/number/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_FORECAST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_FORECAST_FAILURE,
        payload: err,
      });
    });
};

export const addOpportunityForecast = (opportunity) => (dispatch, getState) => {
  dispatch({
    type: types.SELECT_OPPORTUNITY_REQUEST,
  });
  axios
    .post(`${base_url}/opportunity/forecast`,opportunity,  {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.SELECT_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SELECT_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const LinklostdOpportunity = (opportunityId,opportunity,) => (dispatch,getState) => {
  dispatch({
    type: types.LINK_LOST_OPPORTUNITY_REQUEST,
  });
  axios
    .put(`${base_url}/opportunity/update/closeInd/True/only/${opportunityId}`, opportunity,{
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);  
      dispatch({
        type: types.LINK_LOST_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_LOST_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const deleteLostOpportunity = (opportunityId) => (dispatch,getState) => {
  dispatch({
    type: types.DELETE_LOST_OPPORTUNITY_REQUEST,
  });
  axios
    .delete(`${base_url}/opportunity/update/ReinstateInd/True/only/${opportunityId}`,{
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);  
      dispatch({
        type: types.DELETE_LOST_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_LOST_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const getOpportunityInitiativeSKillDetails = (opportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_INITIATIVES_SKILLS_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunities/Innitiative/skill/number/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_INITIATIVES_SKILLS_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_INITIATIVES_SKILLS_DETAILS_FAILURE,
        payload: err,
      });
    });
};

export const reinstateToggleForLost = (data, opportunityId,userId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.REINSTATE_TOGGLE_FOR_LOST_REQUEST,
  });
  axios
    .put(`${base_url}/opportunity/update/lostInd/${opportunityId} `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
    .then((res) => {
      if (res.data.message) {
        Swal.fire({
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
       
        Swal.fire({
          icon: 'error',
          title: 'Not updated',
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(res);
      // dispatch(getlostOpportunity(userId));
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_LOST_SUCCESS,
        payload: opportunityId,
      });
      // message.success("Confirmation Successfully");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REINSTATE_TOGGLE_FOR_LOST_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};

export const LinkStageOpportunity = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/opportunity/update/stage `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);

      dispatch({
        type: types.LINK_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPPORTUNITY_FAILURE,
      });
      cb && cb("failure");
    });
};


export const updateRequirementStage = (
    
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
    type: types.UPDATE_REQUIREMENT_STAGE_REQUEST,
    payload: {
      sourceStageId,
      destinationStageId,
      opportunityId,
    },
  });
  axios
    .put(
      `${base_url}/recriutment/canban/${opportunityId}/${destinationStageId}`,{}, {
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
        type: types.UPDATE_REQUIREMENT_STAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb(res.data);
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: types.UPDATE_REQUIREMENT_STAGE_FAILURE,
        payload: err,
      });
      cb && cb("failure");
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

export const getWonOpportunity = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_WON_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/wonInd/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WON_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WON_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};


export const getWonRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_WON_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/wonInd/record/count/${userId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WON_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_WON_RECORDS_FAILURE,
        payload: err,
      });
    });
};


export const getOppLinkedStages = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_OPP_LINKED_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/opportunity/stages/for_dropdown/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPP_LINKED_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPP_LINKED_STAGES_FAILURE,
        payload: err,
      });
    });
};

export const getOppLinkedWorkflow = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_OPP_LINKED_WORKFLOW_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/opportunityWorkflow/for_dropdown/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPP_LINKED_WORKFLOW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPP_LINKED_WORKFLOW_FAILURE,
        payload: err,
      });
    });
};

export const getAllOpportunityData = (userId,page) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_OPPORTUNITY_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/drop-opportunityList/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_OPPORTUNITY_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_OPPORTUNITY_DATA_FAILURE,
        payload: err,
      });
    });
};

export const handleOpportunityNotesDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPPORTUNITY_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const getFullOpportunity = (pageNo) => (dispatch) => {
 
  dispatch({
    type: types.GET_ALL_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/all/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const getTeamOpportunity = (userId,pageNo) => (dispatch) => {
 
  dispatch({
    type: types.GET_TEAM_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunit/teams/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAM_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_TEAM_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const emptyOpportunity = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_OPPORTUNITY_LIST, 
  });
};

export const linkOpportunityContract = (data, opportunityId) => (
  dispatch,
  getState
) => {
  // debugger;
  const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.LINK_OPPORTUNITY_CONTRACT_REQUEST,
  });
  axios
    .put(`${base_url}/oppertunity/document/contract/update`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getOpportunityDocument(opportunityId));
      dispatch({
        type: types.LINK_OPPORTUNITY_CONTRACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPPORTUNITY_CONTRACT_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};




export const getRegionSalesQuotationList = (userId,quarter,year) => (dispatch) => {
  
  dispatch({
    type: types.GET_REGION_SALES_QUOTATION_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/opportunityList/${userId}/${quarter}/${year}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REGION_SALES_QUOTATION_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_REGION_SALES_QUOTATION_LIST_FAILURE,
        payload: err,
      });
    });
};


export const handleOpportunityRowEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_OPPOORTUNITY_ROW_EMAIL_MODAL,
    payload: modalProps,
  });
};

export const linkProductWithOpportunity= (data,opportunityId) => (dispatch) => {
  dispatch({
    type: types.LINK_PRODUCT_WITH_OPPORTUNITY_REQUEST,
  });
  axios
    .post(`${base_url}/opportunity/link-product`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.LINK_PRODUCT_WITH_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PRODUCT_WITH_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};
export const getlinkedProductWithOpportunity= (opportunityId) => (dispatch) => {
  dispatch({
    type: types.GET_LINK_PRODUCT_WITH_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/link-product/${opportunityId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_LINK_PRODUCT_WITH_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LINK_PRODUCT_WITH_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const getAllCatalogueSearch=(name)=>(dispatch)=>{
  dispatch({
    type: types.GET_ALL_CATALOGUE_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url2}/product/productName/${name}`,{     headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },})
    .then((res) => {
      dispatch({
        type: types.GET_ALL_CATALOGUE_SEARCH_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_ALL_CATALOGUE_SEARCH_FAILURE,
        payload: err,
      });
    });
};

export const ClearSearchedDataOfOpportunity = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_SEARCHED_DATA_OPPORTUNITY,
  });
};





export const getOppPulseData = (oppId,workflowId) => (dispatch) => {
  
  dispatch({
    type: types.GET_OPP_PULSE_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/stage/record/details/${oppId}/${workflowId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPP_PULSE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_OPP_PULSE_DATA_FAILURE,
        payload: err,
      });
    });
};