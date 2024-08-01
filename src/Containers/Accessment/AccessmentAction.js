import * as types from "./AccessmentActionTypes";
import axios from "axios";
import { asses_url,base_url } from "../../Config/Auth";


export const handleQuestionrModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_QUESTION_MODAL,
    payload: modalProps,
  });
};
export const setEditAssessmernt = (name) => (dispatch) => {
  dispatch({
    type: types.SET_ASSESSMENT_EDIT,
    payload: name,
  });
};
export const handleUpdateAssessmentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_ASSESSMENT_MODAL,
    payload: modalProps,
  });
};

export const setAccessmentViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_ACCESSMENT_VIEW_TYPE,
    payload: viewType,
  });
};
export const handleAccessmentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACCESSMENT_MODAL,
    payload: modalProps,
  });
};
export const addAssessment = (data, userId, orgId) => (dispatch) => {
  dispatch({
    type: types.ADD_ASSESSMENT_DETAILS_REQUEST,
  });
  axios
    .post(`${asses_url}/assessment/createAssessment`, data)
    .then((res) => {
      console.log(res);
      //dispatch(getAssessment(userId, orgId));
      dispatch({
        type: types.ADD_ASSESSMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ASSESSMENT_DETAILS_FAILURE,
        payload: err,
      });
    });
};



export const createAccessMentQues = (data) => (dispatch) => {
  // const { locationId,organizationId } = getState().auth.userDetails;
  
  dispatch({ type: types.CREATE_ACCESSMENT_QUES_REQUEST });
  axios
    .post(`${base_url}/assessmentQuestion`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getRoomRackByLocId(locationId,organizationId))
      dispatch({
        type: types.CREATE_ACCESSMENT_QUES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CREATE_ACCESSMENT_QUES_FAILURE,
        payload: err,
      });
    });
};

export const getAssessment = (userId, orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ASSESSMENT_DETAILS_REQUEST,
  });
  axios
    .get(`${asses_url}/assessment/allAssessmentList/${userId}/${orgId}`)
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_ASSESSMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ASSESSMENT_DETAILS_FAILURE,
        payload: err,
      });
    });
};
export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${asses_url}/assessment/record/count`, {
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
//SEARCH
export const inputAssessmentDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_ASSESSMENT_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${asses_url}/assessment/search/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.assessmentId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_ASSESSMENT_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_ASSESSMENT_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

/**
 * get a specific Assessment of the user with the AssessmentId
 */
export const getAssessmentById = (assessmentId) => (dispatch) => {
  dispatch({
    type: types.GET_ASSESSMENT_BY_ID_REQUEST,
  });
  axios
    .get(`${asses_url}/assessment/${assessmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ASSESSMENT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ASSESSMENT_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const publishIndicatorAssessment = (data, assessmentId, cb) => (
  dispatch,
  getState
) => {
  const { userId, organizationId } = getState().auth.userDetails;
  dispatch({ type: types.UPDATE_PUBLISH_IND_REQUEST });

  axios
    .put(`${asses_url}/assessment/publishInd/${assessmentId}`, data, {})

    .then((res) => {
      console.log(res);
      dispatch(getAssessment(userId, organizationId));
      dispatch({
        type: types.UPDATE_PUBLISH_IND_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PUBLISH_IND_FAILURE,
      });
      cb && cb("Failure");
    });
};
export const publishIndicatorAssessmentId = (data, assessmentId, cb) => (
  dispatch,
  getState
) => {
  // const {userId,organizationId} = getState().auth.userDetails;
  dispatch({ type: types.UPDATE_PUBLISH_IND_REQUEST });

  axios
    .put(`${asses_url}/assessment/publishInd/${assessmentId}`, data, {})

    .then((res) => {
      console.log(res);
      dispatch(getAssessmentById(assessmentId));
      dispatch({
        type: types.UPDATE_PUBLISH_IND_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PUBLISH_IND_FAILURE,
      });
      cb && cb("Failure");
    });
};

//Add question
export const addQuestion = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_QUESTION_DETAILS_REQUEST,
  });
  axios
    .post(`${asses_url}/question/save`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getQuestionsListByAssId(assessmentId));
      dispatch({
        type: types.ADD_QUESTION_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_QUESTION_DETAILS_FAILURE,
        payload: err,
      });
    });
};
export const getQuestionsListByAssId = (assessmentId) => (dispatch) => {
  dispatch({
    type: types.GET_QUESTION_LIST_BY_ID_REQUEST,
  });
  axios
    .get(`${asses_url}/question/questionList/${assessmentId}`)
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_QUESTION_LIST_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_QUESTION_LIST_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateAssessmentById = (data, assessmentId, cb) => (
  dispatch,
  getState
) => {
  // const {userId,organizationId} = getState().auth.userDetails;
  dispatch({ type: types.UPDATE_ASSESSMENT_BY_ID_REQUEST });

  axios
    .put(`${asses_url}/assessment/update/${assessmentId}`, data, {})

    .then((res) => {
      console.log(res);
      // dispatch(getAssessmentById(assessmentId));
      dispatch({
        type: types.UPDATE_ASSESSMENT_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ASSESSMENT_BY_ID_FAILURE,
      });
      cb && cb("Failure");
    });
};
export const deleteQuestionsById = (questionId,assessmentId,id) => (
  dispatch
) => {
  dispatch({
    type: types.DELETE_ASSESSMENT_ID_REQUEST,
  });
  axios
    .delete(`${asses_url}/question/${questionId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_ASSESSMENT_ID_SUCCESS,
        payload: id,
      });
      dispatch(getQuestionsListByAssId(assessmentId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_ASSESSMENT_ID_FAILURE,
        payload: err,
      });
    });
};
export const updateQuestionByQuestionId = (data, questionId,assessmentId, cb) => (
  dispatch,
) => {
  dispatch({ type: types.UPDATE_QUESTION_BY_ID_REQUEST });

  axios
    .put(`${asses_url}/question/updateQuestions/${questionId}`, data, {})

    .then((res) => {
      console.log(res);
       dispatch(getQuestionsListByAssId(assessmentId));
      dispatch({
        type: types.UPDATE_QUESTION_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_QUESTION_BY_ID_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const FinalizeQuestion = (assessmentId) => (dispatch) => {
  dispatch({
    type: types.FINALIZE_QUESTION_REQUEST,
  });
  axios
    .post(`${asses_url}/assessment/finalize/${assessmentId}`,)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.FINALIZE_QUESTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.FINALIZE_QUESTION_FAILURE,
        payload: err,
      });
    });
};

export const getFinalQuestions = (assessmentId) => (dispatch) => {
  dispatch({
    type: types.GET_FINAL_QUESTIONS_REQUEST,
  });
  axios
    .get(`${asses_url}/question/questionList/${assessmentId}`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FINAL_QUESTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FINAL_QUESTIONS_FAILURE,
        payload: err,
      });
    });
};



export const getAccessmentQues = (departmentId,roleTypeId) => (dispath) => {
  dispath({ type: types.GET_ACCESSMENT_QUES_REQUEST });
  axios
    .get(`${base_url}/assessmentQuestion/${departmentId}/${roleTypeId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispath({
        type: types.GET_ACCESSMENT_QUES_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_ACCESSMENT_QUES_FAILURE,
        payload: err,
      });
    });
};