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