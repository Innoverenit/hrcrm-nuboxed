import * as types from "./RequirementActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,} from "../../Config/Auth";
import { message } from "antd";


export const setRequirementViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_REQUIREMENT_VIEW_TYPE,
      payload: viewType,
    });
  };


  export const handleRecruiterModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_RECRUITER_MODAL,
      payload: modalProps,
    });
  };

 

  export const getRequirementRecord = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_REQUIREMENT_RECORD_REQUEST,
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
          type: types.GET_REQUIREMENT_RECORD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_REQUIREMENT_RECORD_FAILURE,
          payload: err,
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


  export const getRequirementOrg = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_REQUIREMENT_ORG_REQUEST,
    });
    axios
      .get(`${base_url}/employee/getRequitproUser-dropDown/${orgId}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },   
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REQUIREMENT_ORG_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_REQUIREMENT_ORG_FAILURE,
          payload: err,
        });
      });
  };


  export const getAllRequirementTable = (userId,pageNo) => (dispatch) => {
    dispatch({ type: types.GET_ALL_REQUIREMENT_TABLE_REQUEST });
  
    axios
      .get(`${base_url}/link/recruitment/all/recruitment/${userId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        // dispatch(getDeliveryUser());
        console.log(res);
        dispatch({
          type: types.GET_ALL_REQUIREMENT_TABLE_SUCCESS ,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_REQUIREMENT_TABLE_FAILURE ,
        });
      });
  };

  export const ClearReducerDataOfRequirement = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_REQUIREMENT,
    });
  };

  export const handleNwRecruitModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_NWRECRUIT_MODAL,
      payload: modalProps,
    });
  };

  export const addNwRecruit = (data) => (dispatch) => {
    dispatch({ type: types.LINK_NW_RECRUIT_TO_OPPORTUNITY_REQUEST });
  
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
            type: types.LINK_NW_RECRUIT_TO_OPPORTUNITY_FAILURE,
          });
        } else {
          message.success("Requirement added successfully!");
        console.log(res);
        dispatch({
          type: types.LINK_NW_RECRUIT_TO_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_NW_RECRUIT_TO_OPPORTUNITY_FAILURE,
        });
        // cb && cb();
      });
  };



  export const updateRecruiterData = (data) => (
    dispatch,
  ) => {
    
    dispatch({ type: types.UPDATE_RECRUITER_DATA_REQUEST });
    axios
    .put(`${base_url}/recruitment/recriuter-update`, data, {
   
      // .put(`${base_url}/opportunity/${opportunityId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Recruiter updated Successfully!',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
        console.log(res);
        //  dispatch(getOpportunityListByUserId(userId,0));
        dispatch({
          type: types.UPDATE_RECRUITER_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_RECRUITER_DATA_FAILURE,
          payload: err,
        });
      });
  };