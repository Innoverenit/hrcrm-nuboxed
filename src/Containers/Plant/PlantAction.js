import * as types from "./PlantActionTypes";
import { base_url,base_url2 } from "../../Config/Auth";
import axios from "axios";
import dayjs from "dayjs";
import { message } from "antd";

export const handlePlantModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PLANT_MODAL,
    payload: modalProps,
  });
};

export const getProductionManager = () => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_MANAGER_REQUEST,
  });
  console.log("inside team action get users");
  axios
    .get(`${base_url2}/user/production`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_MANAGER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Oops! something went wrong. Please retry.");

      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_MANAGER_FAILURE,
        payload: err,
      });
    });
};
//add plant
export const addPlant = (plant) => (dispatch) => {
  dispatch({
    type: types.ADD_PLANT_REQUEST,
  });

  axios
    .post(`${base_url2}/plant/savePlant`, plant, {})
    .then((res) => {
      console.log(res);
      dispatch(getPlant());
      dispatch({
        type: types.ADD_PLANT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PLANT_FAILURE,
        payload: err,
      });
    });
};

export const getPlant = () => (dispatch) => {
  dispatch({
    type: types.GET_PLANT_REQUEST,
  });
  axios
    .get(`${base_url2}/locationDetails/getProductionList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PLANT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PLANT_FAILURE,
        payload: err,
      });
    });
};

//Plant Details
export const getPlantById = (locationDetailsId) => (dispatch) => {
  dispatch({
    type: types.GET_PLANT_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url2}/locationDetails/${locationDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PLANT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PLANT_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const handleDeputeButtonModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DEPUTE_BUTTON_MODAL,
    payload: modalProps,
  });
};

//depute Form

export const addExecutive = (data) => (dispatch, getState) => {
  dispatch({
    type: types.ADD_EXECUTIVE_REQUEST,
  });

  axios
    .post(`${base_url}/`, data)
    .then((res) => {
      console.log(res);
      // dispatch(getShift());
      dispatch({
        type: types.ADD_EXECUTIVE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EXECUTIVE_FAILURE,
        payload: err,
      });
    });
};

//edit
export const setEditPlant = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PLANT_EDIT,
    payload: name,
  });
};

/**
 * update Plant modal
 */
export const handleUpdatePlantModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PLANT_MODAL,
    payload: modalProps,
  });
};

//edit
export const setEditPlantAllocation = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PLANT_ALLOCATION_EDIT,
    payload: name,
  });
};

export const addShiftsInPlant = (plant) => (dispatch) => {
  dispatch({
    type: types.ADD_SHIFTS_IN_PLANT_REQUEST,
  });

  axios
    .post(`${base_url}/`, { plant: plant })
    .then((res) => {
      console.log(res);
      // dispatch(getProductionExecutiveAndManager());
      dispatch({
        type: types.ADD_SHIFTS_IN_PLANT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHIFTS_IN_PLANT_FAILURE,
        payload: err,
      });
    });
};
