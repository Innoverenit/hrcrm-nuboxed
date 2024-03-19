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

export const addEducations = (education, cb) => (dispatch) => {
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
      Swal.fire({
        icon: 'success',
        title: 'Education has been added Successfully',
      })
      // message.success("Education has been added successfully!");
      // dispatch(getEducations());
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

export const updateEducations = (educationTypeId, educationType, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_EDUCATION_REQUEST,
  });
  axios
    .put(
      `${base_url}/educationType/update`,
      { educationType, educationTypeId, editInd: "true" },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Education has been updated Successfully',
      })
      // message.success("Education has been updated successfully!");
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
export const removeEducation = (educationTypeId) => (dispatch) => {
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
      message.success("Education has been deleted successfully!");
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
