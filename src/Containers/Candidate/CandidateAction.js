import * as types from "./CandidateActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url, } from "../../Config/Auth";
import { message } from "antd";
import { ActionHeader } from "../../Components/Utils";
import Swal from 'sweetalert2'
/**
 * candidate modal action
 */
export const handleCandidateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_MODAL,
    payload: modalProps,
  });
};


export const handlePlacementPulseModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PLACEMENT_PULSE_MODAL,
    payload: modalProps,
  });
};



export const handleCandidatesTasksDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATES_TASKS_DRAWER_MODAL,
    payload: modalProps,
  });
};



export const emptyWhiteCandidate = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_WHITE_CANDIDATE_TABLE,
    
  });
};

export const emptyCandidate = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_CANDIDATE_TABLE,
    
  });
};

export const handlePlayerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PLAYER_MODAL,
    payload: modalProps,
  });
};

export const handleemaildrawermodal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMAIL_DRAWER_MODAL,
    payload: modalProps,
  });
};
export const handleRecruiterDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUITER_DRAWER_MODAL,
    payload: modalProps,
  });
};
export const handleCandidateRowEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_ROW_EMAIL_MODAL,
    payload: modalProps,
  });
};
export const handleCandidateDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const handleDonotCallModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DONOT_CALL_MODAL,
    payload: modalProps,
  });
};

export const handleChoiceCandidateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CHOICE_CANDIDATE_MODAL,
    payload: modalProps,
  });
};


export const handleCandidateEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_EMAIL_MODAL,
    payload: modalProps,
  });
};

export const handleupdateCandidateResumeModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CANDIDATE_RESUME_MODAL,
    payload: modalProps,
  });
};

export const handleCandidateFilterModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_FILTER_MODAL,
    payload: modalProps,
  });
};

export const handleCandidateResumeModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_RESUME_MODAL,
    payload: modalProps,
  });
};

export const handleUpdateCandidateModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CANDIDATE_MODAL,
    payload: modalProps,
  });
};

export const handleCandidateEducationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_EDUCATION_MODAL,
    payload: modalProps,
  });
};

export const setEditCandidate = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CANDIDATE_EDIT,
    payload: name,
  });
};
/**
 * request for adding a candidate
 */
export const addCandidate = (candidate) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;
  console.log("inside add candidate");
  dispatch({
    type: types.ADD_CANDIDATE_REQUEST,
  });

  axios
    .post(`${base_url}/candidate`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.candidateInd === true) {

        message.error(res.data.message);
        dispatch({
          type: types.ADD_CANDIDATE_FAILURE,
        });
      } else {
        message.success("New candidate added successfully");
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getCandidateListByUserId(userId));
        dispatch(getRecords(userId));
        dispatch({
          type: types.ADD_CANDIDATE_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_FAILURE,
        payload: err,
      });
    });
};

/**
 * get all the candidate of the user
 */
export const getCandidateListByUserId = (userId,page) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATES_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/user/${userId}/${page}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CANDIDATES_FAILURE,
        payload: err,
      });
    });
};

/**
 * get all the candidate of the user
 */
export const getAllCandidateListByUserId = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CANDIDATES_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/all-candidate`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CANDIDATES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_CANDIDATES_FAILURE,
        payload: err,
      });
    });
};

/**
 * get a specific candidate of the user with the candidateId
 */
export const getCandidateById = (candidateId) => (dispatch) => {
  console.log("inside add candidate");
  dispatch({
    type: types.GET_CANDIDATE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * update aspecific field using put request
 */
export const updateCandidate = (data, candidateId) => (dispatch, getState) => {
  console.log(data);
  const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.UPDATE_CANDIDATE_BY_ID_REQUEST });
  axios
    .put(`${base_url}/candidate/${candidateId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.UPDATE_CANDIDATE_BY_ID_SUCCESS,
        payload: res.data,
      });
      message.error(res.data.message)
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CANDIDATE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//Document

export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

/**
 * add a note
 */
export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_CANDIDATE_NOTES_REQUEST });
  axios
    .post(`${base_url}/candidate/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_CANDIDATE_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CANDIDATE_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};

/**
 * get Candidate Notes
 */
export const getNotesListByCandidateId = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_CANDIDATE_ID_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/notes/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CANDIDATE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CANDIDATE_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * add document to a candidate
 */
export const addCandidateDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_CANDIDATE_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/candidate/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_CANDIDATE_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // dispatch(getCandidateDocument(candidateId));
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * get documents of an candidate
 */
export const getCandidateDocument = (candidateId) => (dispatch) => {
  dispatch({ type: types.GET_CANDIDATE_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/candidate/document/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATE_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};
//
export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/candidate/document/${documentId}`, {
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

/**
 * add skills of a candidateId
 */
export const addTopicByCandidateId = (data,userType,id) => (dispatch) => {
  dispatch({
    type: types.ADD_TOPIC_BY_CANDIDATE_ID_REQUEST,
  });
  axios
    .post(`${base_url}/employee/employeeCertificationLink/save/skill/${userType}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data.message) {
        Swal.fire({
          icon: 'error',
          title: res.data.message,
          showConfirmButton: false,
   timer: 1500,
        });
      } else {
       
        Swal.fire({
          icon: 'success',
          title: 'Added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
       dispatch(getTopicsByCandidateId(userType,id));
      dispatch({
        type: types.ADD_TOPIC_BY_CANDIDATE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOPIC_BY_CANDIDATE_ID_FAILURE,
        payload: err,
      });
    });
};

//get skills by candidateId
export const getTopicsByCandidateId = (userType,id) => (dispatch) => {
  dispatch({
    type: types.GET_TOPICS_BY_CANDIDATE_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/employeeCertificationLink/get-all/skill/${userType}/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TOPICS_BY_CANDIDATE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TOPICS_BY_CANDIDATE_ID_FAILURE,
        payload: err,
      });
    });
};

export const getCandidateFilter = (candidate) => (dispatch,getState) => {
  const userId = getState().auth.userDetails.userId;
  dispatch({ type: types.GET_CANDIDATE_FILTER_REQUEST });

  axios
    .post(`${base_url}/candidate/filter`,candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.GET_CANDIDATE_FILTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_FILTER_FAILURE,
      });
    });
};
//delete candidate skill
export const deleteTopicByCandidateId = (userType,id, candidateId) => (
  dispatch
) => {
  dispatch({
    type: types.DELETE_TOPIC_BY_CANDIDATE_ID_REQUEST,
  });
  axios
    .delete(`${base_url}/employee/employeeCertificationLink/delete/skill/${userType}/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TOPIC_BY_CANDIDATE_ID_SUCCESS,
        payload: res.data,
      });
     // dispatch(getTopicsByCandidateId(candidateId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TOPIC_BY_CANDIDATE_ID_FAILURE,
        payload: err,
      });
    });
};
//add education

//add educational details
export const addCandidateEducationDetails = (candidate, candidateId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_CANDIDATE_EDUCATIONAL_DETAILS_REQUEST,
  });
  console.log(candidate);

  axios
    .post(`${base_url}/candidate/education-details`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCandidateEducationDetails(candidateId));
      dispatch({
        type: types.ADD_CANDIDATE_EDUCATIONAL_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_EDUCATIONAL_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

/**
//  * fetch education details of an candidate
//  */
export const getCandidateEducationDetails = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATE_EDUCATION_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/candidate/education-details/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      console.log(candidateId);
      dispatch({
        type: types.GET_CANDIDATE_EDUCATION_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_EDUCATION_DETAILS_FAILURE,
        payload: err,
      });
    });
};
export const setEditCandidateEducation = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_CANDIDATE_EDUCATION,
    payload: name,
  });
};

export const deleteCandidateEducationTable = (id) => (dispatch, getState) => {
  const { candidateId } = getState().candidate.candidate;
  console.log("inside deleteid", id);
  dispatch({
    type: types.DELETE_CANDIDATE_EDUCATION_REQUEST,
  });

  axios
    .delete(`${base_url}/candidate/education-details/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCandidateEducationDetails(candidateId));
      dispatch({
        type: types.DELETE_CANDIDATE_EDUCATION_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CANDIDATE_EDUCATION_FAILURE,
        payload: err,
      });
    });
};

//update edu
export const updateCandidateEducationDetails = (candidate, candidateId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_CANDIDATE_EDUCATIONAL_DETAILS_REQUEST,
  });
  console.log(candidate);

  axios
    .put(`${base_url}/candidate/education-details`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCandidateEducationDetails(candidateId));
      dispatch({
        type: types.UPDATE_CANDIDATE_EDUCATIONAL_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CANDIDATE_EDUCATIONAL_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

export const handleUpdateCandidateEducationModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_UPDATE_CANDIDATE_EDUCATION_MODAL,
    payload: modalProps,
  });
};

export const handleCandidateTrainingModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_TRAINING_MODAL,
    payload: modalProps,
  });
};

//add Training Details

export const addCandidateTrainingDetails = (candidate, candidateId) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_CANDIDATE_TRAINING_DETAILS_REQUEST,
  });
  console.log(candidate);

  axios
    .post(`${base_url}/candidate/candidate-training`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCandidateTrainingDetails(candidateId));
      dispatch({
        type: types.ADD_CANDIDATE_TRAINING_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_TRAINING_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

//fetch Training details
export const getCandidateTrainingDetails = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATE_TRAINING_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/candidate/candidate-training/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATE_TRAINING_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_TRAINING_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//update Training Details

export const updateCandidateTrainingDetails = (candidate, candidateId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_CANDIDATE_TRAINING_DETAILS_REQUEST,
  });
  console.log(candidate);

  axios
    .put(`${base_url}/candidate/candidate-training`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCandidateTrainingDetails(candidateId));
      dispatch({
        type: types.UPDATE_CANDIDATE_TRAINING_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CANDIDATE_TRAINING_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};
export const setCandidateEditingTraining = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CANDIDATE_TRAINING_EDIT,
    payload: name,
  });
};

export const handleUpdateCandidateTrainingModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_UPDATE_CANDIDATE_TRAINING_MODAL,
    payload: modalProps,
  });
};

//Candidate-details table
export const deleteCandidateTrainingTable = (id) => (dispatch, getState) => {
  const { candidateId } = getState().candidate.candidateId;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_CANDIDATE_TRAINING_REQUEST,
  });

  axios
    .delete(`${base_url}//${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCandidateTrainingDetails(candidateId));
      dispatch({
        type: types.DELETE_CANDIDATE_TRAINING_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CANDIDATE_TRAINING_FAILURE,
        payload: err,
      });
    });
};

export const handleCandidateEmploymentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_EMPLOYMENT_MODAL,
    payload: modalProps,
  });
};

//Employment

//add Employment details
export const addCandidateEmploymentDetails = (candidate, candidateId) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_CANDIDATE_EMPLOYMENT_DETAILS_REQUEST,
  });
  console.log(candidate);

  axios
    .post(`${base_url}/candidate/employment-history`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCandidateEmploymentDetails(candidateId));
      dispatch({
        type: types.ADD_CANDIDATE_EMPLOYMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_EMPLOYMENT_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

//fetch Employment details
export const getCandidateEmploymentDetails = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATE_EMPLOYMENT_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/candidate/employment-history/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATE_EMPLOYMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_EMPLOYMENT_DETAILS_FAILURE,
        payload: err,
      });
    });
};

export const setCandidateEditEmployment = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CANDIDATE_EMPLOYMENT_EDIT,
    payload: name,
  });
};
//delete
export const deleteCandidateEmploymentTable = (id) => (dispatch, getState) => {
  const { candidateId } = getState().candidate.candidateId;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_CANDIDATE_EMPLOYMENT_REQUEST,
  });

  axios
    .delete(`${base_url}//${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCandidateEmploymentDetails(candidateId));
      dispatch({
        type: types.DELETE_CANDIDATE_EMPLOYMENT_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CANDIDATE_EMPLOYMENT_FAILURE,
        payload: err,
      });
    });
};
export const handleCandidateUpdateEmploymentModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_UPDATE_EMPLOYMENT_MODAL,
    payload: modalProps,
  });
};

//update Candidate Employment details
export const updateCandidateEmploymentDetails = (
  candidate,
  candidateId,
  cb
) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_REQUEST,
  });
  console.log(candidate);

  axios
    .put(`${base_url}/candidate/employment-history`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCandidateEmploymentDetails(candidateId));
      dispatch({
        type: types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//SEARCH
export const inputCandidateDataSearch = (skill) => (dispatch) => {
  dispatch({
    type: types.INPUT_CANDIDATE_SEARCH_DATA_REQUSET,
  });
  axios
    .get(`${base_url}/candidate/search/${skill}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.candidateId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

   
        dispatch({
          type: types.INPUT_CANDIDATE_SEARCH_DATA_SUCCESS,
          payload: res.data,
        });
      })
    // })

    .catch((err) => {
      dispatch({
        type: types.INPUT_CANDIDATE_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getCandidateCountSearch = (skill) => (dispatch) => {
  dispatch({
    type: types.CANDIDATE_COUNT_SEARCH_DATA_REQUSET,
  });
  axios
    .get(`${base_url}/candidate/skill/record/${skill}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // if (res.data.candidateId) {
      //   console.log(res.data);
      //   // dispatch(getAllLatestContactsForLazyLoading(res.data));
      // }
      // const actualData = res.data;
      // const filteredData = actualData.filter((item) => { return item.candidateId !== null })

      // if (filteredData.length) {
        dispatch({
          type: types.CANDIDATE_COUNT_SEARCH_DATA_SUCCESS,
          payload: res.data
        })
      
     })

    .catch((err) => {
      dispatch({
        type: types.CANDIDATE_COUNT_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

//SEARCH
export const inputCandidateSkillDataSearch = (skill) => (dispatch) => {
  dispatch({
    type: types.INPUT_CANDIDATE_SKILL_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/details-skill/${skill}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.candidateId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_CANDIDATE_SKILL_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_CANDIDATE_SKILL_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const handleCandidateBankModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_BANK_MODAL,
    payload: modalProps,
  });
};

//Add Bank Details
export const addBankDetails = (candidate, candidateId) => (dispatch) => {
  dispatch({
    type: types.ADD_BANK_DETAILS_REQUEST,
  });
  // console.log(candidate);

  axios
    .post(`${base_url}/candidate/bank-details`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getBankDetails(candidateId));
      dispatch({
        type: types.ADD_BANK_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_BANK_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//fetch Bank details
export const getBankDetails = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATE_BANK_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/bank-details/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATE_BANK_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_BANK_DETAILS_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateBankModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_BANK_MODAL,
    payload: modalProps,
  });
};

//update bank details
export const updateBankDetails = (candidate, candidateId, cb) => (dispatch) => {
  dispatch({
    type: types.UPDATE_BANK_DETAILS_REQUEST,
  });
  console.log(candidate);

  axios
    .put(`${base_url}/candidate/bank-details`, candidate, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getBankDetails(candidateId));
      dispatch({
        type: types.UPDATE_BANK_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_BANK_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

export const deleteBankTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_BANK_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/bank-details/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getBankDetails(userId));
      dispatch({
        type: types.DELETE_BANK_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_BANK_FAILURE,
        payload: err,
      });
    });
};

export const setEditBank = (name) => (dispatch) => {
  dispatch({
    type: types.SET_BANK_EDIT,
    payload: name,
  });
};

export const getPermissionsList = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"candidate"}`, {
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

//CANDIDATE PERMISSION SHARE
export const shareCandidatePermission = (data, userId, a) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_CANDIDATE_PERMISSION_REQUEST,
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
        dispatch(getAllCandidateListByUserId());
        dispatch(getRecords(userId));
        // dispatch(getAllRecords(userId));
      } else {
        dispatch(getCandidateListByUserId(userId));
        dispatch(getRecords(userId));
      }
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.ADD_SHARE_CANDIDATE_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_CANDIDATE_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

/**
 * Status in Candidate
 */
export const linkCandidateStatus = (data, candidateId) => (
  dispatch,
  getState
) => {
  // debugger;
  const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.LINK_CANDIDATE_STATUS_REQUEST,
  });
  axios
    .put(`${base_url}/candidate/${candidateId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.LINK_CANDIDATE_STATUS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_CANDIDATE_STATUS_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};
export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/record/count/${userId}`, {
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

export const getAllRecords = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_RECORDS_REQUEST,
  });
  axios
    .get(
      `${base_url}/customer/allRecord/count`,
      {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
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

export const setCandidateViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_CANDIDATE_VIEW_TYPE,
    payload: viewType,
  });
};

/**
 * Activity modal
 */
export const handleCandidateActivityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_ACTIVITY_MODAL,
    payload: modalProps,
  });
};

//add call
export const addCall = (call, cb, candidateId) => (dispatch) => {
  dispatch({
    type: types.ADD_CANDIDATE_CALL_REQUEST,
  });
  axios
    .post(`${base_url}/call`, call, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {

      ////debugger;
      console.log(res);
      dispatch(getActivityListByCandidateId(candidateId))

      dispatch({
        type: types.ADD_CANDIDATE_CALL_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_CALL_FAILURE,
        payload: err,
      });
    });
};

/**
 * request for adding a EVENT
 */
export const addCandidateEvent = (event, cb, candidateId) => (dispatch) => {
  console.log("inside addEvent");
  dispatch({
    type: types.ADD_CANDIDATE_EVENT_REQUEST,
  });
  axios
    .post(`${base_url}/event`, event, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getActivityListByCandidateId(candidateId))
      dispatch({
        type: types.ADD_CANDIDATE_EVENT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_EVENT_FAILURE,
        payload: err,
      });
    });
};
/**
 * request for adding a task
 */
export const addCandidateTask = (task, cb, candidateId) => (dispatch) => {
  console.log("inside addTask");
  dispatch({
    type: types.ADD_CANDIDATE_TASK_REQUEST,
  });
  axios
    .post(`${base_url}/task`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getActivityListByCandidateId(candidateId))
      dispatch({
        type: types.ADD_CANDIDATE_TASK_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_TASK_FAILURE,
        payload: err,
      });
    });
};

//get activity list by candidateId
export const getActivityListByCandidateId = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_ACTIVITY_LIST_BY_CANDIDATEID_REQUEST,
  });
  axios
    .get(`${base_url}/activity/candidate/${candidateId}`,

      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
      console.log(candidateId);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_CANDIDATEID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACTIVITY_LIST_BY_CANDIDATEID_FAILURE,
        payload: err,
      });
    });
};

export const setChoosedtypeCandidate = (type) => (dispatch) => {
  dispatch({
    type: types.SET_TYPE_CHOOSE_CANDIDATE_REQUEST,
  });
  dispatch({
    type: types.SET_TYPE_CHOOSE_CANDIDATE_SUCCESS,
    payload: type
  });
}

export const getPlacement = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_PLACEMENT_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/recruitment/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PLACEMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PLACEMENT_FAILURE,
        payload: err,
      });
    });
};

export const handleCandidateActivityTableModal = (modalProps) => (
  dispatch
) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_ACTIVITY_TABLE_MODAL,
    payload: modalProps,
  });
};


export const addResumeForm = (formData, cb) => (dispatch) => {
  // const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_RESUME_FORM_REQUEST,
  });
  axios
    .post(`${base_url}/document/upload`, formData, {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // this.props.handleResponseData(res.data);


      dispatch({
        type: types.ADD_RESUME_FORM_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_RESUME_FORM_FAILURE,
        payload: err,
      });
    });
};


export const setClearbitCandidateData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_CANDIDATE_DATA,
    payload: data,
  });
};

export const getCandidateBlackList = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATES_BLACKLIST_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/blackList/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATES_BLACKLIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CANDIDATES_BLACKLIST_FAILURE,
        payload: err,
      });
    });
};


export const getCandidateCategoryRecords = (category) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATE_CATEGORY_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/record/count/categoryName/${category}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (category === "White") {

        dispatch({
          type: types.GET_CANDIDATE_CATEGORY_RECORDS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: types.GET_CANDIDATE_CATEGORY_RECORDS_BLUE_SUCCESS,
          payload: res.data,
        });
      }
    })


    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CANDIDATE_CATEGORY_RECORDS_FAILURE,
        payload: err,
      });
    });
};
/**
 * add experience of a candidateId
 */
export const addExperienceByCandidateId = (data, candidateId) => (dispatch) => {
  console.log(candidateId);
  dispatch({
    type: types.ADD_EXPERIENCE_BY_CANDIDATE_ID_REQUEST,
  });
  axios
    .post(`${base_url}/candidate/skillSet`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
     // dispatch(getExperienceByCandidateId(candidateId));
      dispatch({
        type: types.ADD_EXPERIENCE_BY_CANDIDATE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EXPERIENCE_BY_CANDIDATE_ID_FAILURE,
        payload: err,
      });
    });
};
//get Experience by candidateId
export const getExperienceByCandidateId = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_EXPERIENCE_BY_CANDIDATE_ID_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/skill-set/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXPERIENCE_BY_CANDIDATE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXPERIENCE_BY_CANDIDATE_ID_FAILURE,
        payload: err,
      });
    });
};
//delete candidate Experience
export const deleteExperienceByCandidateId = (skillSetDetailsId, candidateId) => (
  dispatch
) => {
  dispatch({
    type: types.DELETE_EXPERIENCE_BY_CANDIDATE_ID_REQUEST,
  });
  axios
    .delete(`${base_url}}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_EXPERIENCE_BY_CANDIDATE_ID_SUCCESS,
        payload: res.data,
      });
      dispatch(getTopicsByCandidateId(candidateId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EXPERIENCE_BY_CANDIDATE_ID_FAILURE,
        payload: err,
      });
    });
};

//update Candidate Employment details
export const updateExperienceByCandidateId= (data,skillId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_REQUEST,
  });


  axios
    .put(`${base_url}/candidate/skill/${skillId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
    //  dispatch(getExperienceByCandidateId(candidateId));
      dispatch({
        type: types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

export const updateOwnershipById= (userId,data) => (dispatch,getState) => {
    const userId1 = getState().auth.userDetails.userId;
  dispatch({
    type: types.UPDATE_CANDIDATE_OWNERSHIP_REQUEST,
  });
  axios
    .put(`${base_url}/candidate/transfer/${userId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
       //dispatch(getCandidateListByUserId(userId1));
     // dispatch(getExperienceByCandidateId(candidateId));
      dispatch({
        type: types.UPDATE_CANDIDATE_OWNERSHIP_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CANDIDATE_OWNERSHIP_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
}; 
export const handleCandidateReactSpeechModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_REACT_SPEECH_MODAL,
    payload: modalProps,
  });
};
export const tableDynamicColumn = (data) => (dispatch) => {
  dispatch({
    type: types.TABLE_DYNAMIC_VALUE_DATA,
    payload: data
  });
};

export const chooseCandididate= (choose) => (dispatch,getState) => {
  const userId1 = getState().auth.userDetails.userId;
  const arrayOfObj = Object.entries(choose).map((e) => ( { [e[0]]: e[1] } ));
let newArray=[]
  arrayOfObj.forEach((item)=>{
    console.log(item)
  if(item.email === 'true'){
      return newArray.push('Email')
  }
     if(item.mobileNoInd === 'true'){
      return newArray.push('Mobile')
  }
      if(item.nameInd === 'true'){
      return newArray.push('Name')
  }
      if(item.roleInd === 'true'){
      return newArray.push('Role')
  }
 if(item.skillInd === 'true'){
      return newArray.push('Skill')
  }
 if(item.availableDateInd === 'true'){
      return newArray.push('Available')
  }
})
console.log(newArray)
dispatch({
  type: types.CHOOSE_CANDIDATE_REQUEST,
});

newArray.length&&dispatch(tableDynamicColumn(newArray))
axios
  .post(`${base_url}/candidate/Email`,choose,{
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
  .then((res) => {
    
  
    dispatch({
      type: types.CHOOSE_CANDIDATE_SUCCESS,
      payload: res.data,
    });
    // cb && cb("success");
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
    dispatch({
      type: types.CHOOSE_CANDIDATE_FAILURE,
      payload: err,
    });
    // cb && cb("error");
  });
}; 


export const getBlackListCandidate = (candidateId,candidate) => (dispatch,getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_BLACKLIST_CANDIDATE_REQUEST,
  });
  axios
  .put(`${base_url}/candidate/blackList/${candidateId}`, candidate, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_BLACKLIST_CANDIDATE_SUCCESS,
        payload: candidateId,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_BLACKLIST_CANDIDATE_FAILURE,
        payload: err,
      });
    });
};

export const addDonotcall = (data,candidateId) => (dispatch) => {
  dispatch({
    type: types.ADD_DONOT_CALL_REQUEST,
  });
  axios
    .put(`${base_url}/candidate/doNotCall/${candidateId}`,data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_DONOT_CALL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DONOT_CALL_FAILURE,
        payload: err,
      });
    });
};

export const getCandidateListByCategory = (category,pageNo,userId) => (dispatch) => {
  dispatch({
    type: types.GET_CANDIDATES_BY_CATEGORY_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/categoryName/${category}/${pageNo}/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATES_BY_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CANDIDATES_BLACKLIST_FAILURE,
        payload: err,
      });
    });
};

export const addCandidateEmail = (task) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;
  console.log("inside add candidate");
  dispatch({
    type: types.ADD_CANDIDATE_EMAIL_REQUEST,
  });

  axios
    .post(`${base_url}/task/save/email-details`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
    
        dispatch({
          type: types.ADD_CANDIDATE_EMAIL_SUCCESS,
          payload: res.data,
        });
      })
   
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CANDIDATE_EMAIL_FAILURE,
        payload: err,
      });
    });
};
export const Candidatesorttype = ( userId,type) => (dispatch) => {
  dispatch({ type: types.GET_CANDIDATE_SORT_REQUEST });
  axios
    .get(
      `${base_url}/candidate/sort/${userId}?type=${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CANDIDATE_SORT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CANDIDATE_SORT_FAILURE,
        payload: err,
      });
    });
};



export const getFilteredEmailContact = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_FILTERED_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/contact/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FILTERED_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_FILTERED_CONTACT_FAILURE,
        payload: err,
      });
    });
  };


  export const getCandidateTreeMap = (candidateId) => (dispatch) => {
    dispatch({
      type: types.GET_CANDIDATES_TREE_MAP_REQUEST,
    });
    axios
      .get(`${base_url}/candidate/tree/${candidateId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATES_TREE_MAP_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CANDIDATES_TREE_MAP_FAILURE,
          payload: err,
        });
      });
  };
  export const linkCandidateDefult = (data, candidateId) => (
    dispatch,
    getState
  ) => {
    // debugger;
    const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.LINK_EMPLOYEE_STATUS_REQUEST,
    });
    axios
      .put(`${base_url}/candidate/bank-details`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getBankDetails(candidateId));
        dispatch({
          type: types.LINK_EMPLOYEE_STATUS_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_EMPLOYEE_STATUS_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
      });
  };
  
  export const setSkillRoleExperience = (data,skillSetDetailsId) => (dispatch) => {
    dispatch({ type: types.UPDATE_EXPERIENCE_ROLE_REQUEST });
    axios
      .put(
        `${base_url}/candidate/skill/role/${skillSetDetailsId}`,data,
        {
      
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        
        })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_EXPERIENCE_ROLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_EXPERIENCE_ROLE_FAILURE,
          payload: err,
        });
      });
  };

  export const addCertificationByCandidateId = (data, userType,id) => (dispatch) => {
    
    dispatch({
      type: types.ADD_CERTIFICATION_BY_CANDIDATE_ID_REQUEST,
    });
    axios
      .post(`${base_url}/employee/employeeCertificationLink/save/certification/${userType}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
          if (res.data.message) {
                Swal.fire({
                  icon: 'error',
                  title: res.data.message,
                  showConfirmButton: false,
           timer: 1500,
                });
              } else {
               
                Swal.fire({
                  icon: 'success',
                  title: 'Added Successfully!',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
         dispatch(getCertificationByCandidateId(userType,id));
        dispatch({
          type: types.ADD_CERTIFICATION_BY_CANDIDATE_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CERTIFICATION_BY_CANDIDATE_ID_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getCertificationByCandidateId = (userType,id) => (dispatch) => {
    dispatch({
      type: types.GET_CERTIFICATION_BY_CANDIDATE_ID_REQUEST,
    });
    axios
      .get(`${base_url}/employee/employeeCertificationLink/get-all/certification/${userType}/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CERTIFICATION_BY_CANDIDATE_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CERTIFICATION_BY_CANDIDATE_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const deleteCertificationByCandidateId = (userType,id,candidateId) => (
    dispatch
  ) => {
    dispatch({
      type: types.DELETE_CERTIFICATION_BY_CANDIDATE_ID_REQUEST,
    });
    axios
      .delete(`${base_url}/employee/employeeCertificationLink/delete/certification/${userType}/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.DELETE_CERTIFICATION_BY_CANDIDATE_ID_SUCCESS,
          payload: res.data,
        });
       // dispatch(getCertificationByCandidateId(candidateId));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_CERTIFICATION_BY_CANDIDATE_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const getCandidatePagination = (userId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_CANDIDATES_PAGINATION_REQUEST,
    });
    axios
      .get(`${base_url}/permission/candidate/details/${userId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATES_PAGINATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CANDIDATES_PAGINATION_FAILURE,
          payload: err,
        });
      });
  };



  export const getCandidateWhitePagination = (category,userId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_CANDIDATES_WHITE_PAGINATION_REQUEST,
    });
    axios
      .get(`${base_url}/permission/candidate/details/${category}/${userId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATES_WHITE_PAGINATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CANDIDATES_WHITE_PAGINATION_FAILURE,
          payload: err,
        });
      });
  };


  export const getCandidateTasksInfo = (candidateId) => (dispatch) => {
    dispatch({
      type: types.GET_CANDIDATE_TASKS_INFO_REQUEST,
    });
  
    axios
      .get(`${base_url}/task/un-completed/task-list/${candidateId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATE_TASKS_INFO_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CANDIDATE_TASKS_INFO_FAILURE,
          payload: err,
        });
      });
  };

  export const getCandidateBluePagination = (category,userId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_CANDIDATES_BLUE_PAGINATION_REQUEST,
    });
    axios
      .get(`${base_url}/permission/candidate/details/${category}/${userId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATES_BLUE_PAGINATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CANDIDATES_BLUE_PAGINATION_FAILURE,
          payload: err,
        });
      });
  };


  export const getCandidateDollarTable = (userId,page) => (dispatch) => {
    dispatch({
      type: types.GET_CANDIDATES_DOLLAR_TABLE_REQUEST,
    });
    axios
      .get(`${base_url}/candidate/onboarded/candidate/list/${userId}/${page}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CANDIDATES_DOLLAR_TABLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CANDIDATES_DOLLAR_TABLE_FAILURE,
          payload: err,
        });
      });
  };



  export const addParsingForm = (formData, cb) => (dispatch) => {
    // const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADD_PARSING_FORM_REQUEST,
    });
    axios
    .post(`https://develop.tekorero.com/HrAnalytics/pdf/read`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        // this.props.handleResponseData(res.data);
  
  
        dispatch({
          type: types.ADD_PARSING_FORM_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_PARSING_FORM_FAILURE,
          payload: err,
        });
      });
  };

  export const ClearReducerDataOfCandidate = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_CANDIDATE,
    });
  };

  export const ClearReducerCertification = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_CERTIFICATION,
    });
  };




 