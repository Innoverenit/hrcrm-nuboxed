import * as types from "./DevelopmentActionType";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd";

export const getDevelopment = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_DEVELOPMENT_REQUEST,
    });
    axios
      .get(`${base_url}/development/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DEVELOPMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DEVELOPMENT_FAILURE,
          payload: err,
        });
      });
  };

  export const addDevelopment = (roleType,orgId,cb) => (dispatch,getState) => {
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.ADD_DEVELOPMENT_REQUEST,
    });
    axios
      .post(`${base_url}/development`, roleType, 
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // message.error(roleType.message)
        if (res.data.message) {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
            // showConfirmButton: false,
            // timer: 1500
          });
        } else {
         
          Swal.fire({
            icon: 'success',
            title: 'Development added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        
        dispatch(getDevelopment(orgId));
        dispatch(getDevelopmentCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_DEVELOPMENT_SUCCESS,
          payload: { 
            ...roleType, 
            // leadDocumentId: res.data 
            // userId: res.data ,
            // orgId:res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_DEVELOPMENT_FAILURE,
        });
        // if (err.response && err.response.status === 400) {
        //   // Handle the error message sent by the backend
        //   message.error(err.response.data.message);
        // } else {
        //   message.error("An error occurred while adding the role.");
        // }
        cb();
      });
  };


  export const updateDevelopment = (data,developmentId,  cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_DEVELOPMENT_REQUEST,
    });
    axios
      .put(
        `${base_url}/development/${developmentId}`,
       data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Development updated Successfully!',
        
        })
        // message.success("Development updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_DEVELOPMENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_DEVELOPMENT_FAILURE,
        });
      });
  };
  export const searchDevelopmentName = (taskTypeId,value) => (dispatch) => {
    dispatch({
      type: types.GET_DEVELOPMENT_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/development/${taskTypeId}/${value}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_DEVELOPMENT_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_DEVELOPMENT_SEARCH_FAILURE,
          payload: err,
        });
      });
  };
  export const removeDevelopment = (developmentId,orgId, cb) => (dispatch) => {    
    dispatch({
        type: types.REMOVE_DEVELOPMENT_REQUEST,
    });
    axios
        .delete(`${base_url}/development/${developmentId}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          dispatch(getDevelopmentCount(orgId));
          Swal.fire({
            icon: 'success',
            title: 'Development deleted Successfully!',
          
          })
          // message.success("Development deleted successfully!");
            console.log(res);
            dispatch({
                type: types.REMOVE_DEVELOPMENT_SUCCESS,
                payload: developmentId,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REMOVE_DEVELOPMENT_FAILURE,
            });
        });
};


export const ClearReducerDataOfDevelopment = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_DEVELOPMENT,
  });
};


export const getDevelopmentCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DEVELOPMENT_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/development/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEVELOPMENT_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEVELOPMENT_COUNT_FAILURE,
        payload: err,
      });
    });
};





