import * as types from "./EducationActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd";

export const getEducations = () => (dispatch) => {
  dispatch({
    type: types.GET_EDUCATION_REQUEST,
  });
  axios
    .get(`${base_url}/educationType`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EDUCATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EDUCATION_FAILURE,
        payload: err,
      });
    });
};

export const addEducations = (education,orgId, cb) => (dispatch) => {
  console.log(education);
  dispatch({
    type: types.ADD_EDUCATION_REQUEST,
  });
  axios
    .post(`${base_url}/educationType`, education, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
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
          title: 'Education added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // message.success("Education added successfully!");
      dispatch(getEducationCount(orgId));
      console.log(res);
      dispatch({
        type: types.ADD_EDUCATION_SUCCESS,
        payload: { ...education },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EDUCATION_FAILURE,
      });
    });
};

export const updateEducations = (data,educationTypeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_EDUCATION_REQUEST,
  });
  axios
    .put(
      `${base_url}/educationType/update`,
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
        title: 'Education updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("Education updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_EDUCATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EDUCATION_FAILURE,
      });
    });
};

export const searchEducationsName = (name) => (dispatch) => {
  dispatch({
    type: types.GET_EDUCATION_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url}/educationType${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data.message);
      dispatch({
        type: types.GET_EDUCATION_SEARCH_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_EDUCATION_SEARCH_FAILURE,
        payload: err,
      });
    });
};
export const removeEducation = (educationTypeId,orgId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_EDUCATION_REQUEST,
  });
  axios
    .delete(`${base_url}/educationType/${educationTypeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getEducationCount(orgId));
      Swal.fire({
        icon: 'success',
        title: 'Education deleted Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("Education deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_EDUCATION_SUCCESS,
        payload: educationTypeId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_EDUCATION_FAILURE,
      });
    });
};

export const ClearReducerDataOfEducation = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_EDUCATION,
  });
};

export const getEducationCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_EDUCATION_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/educationType/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EDUCATION_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EDUCATION_COUNT_FAILURE,
        payload: err,
      });
    });
};
