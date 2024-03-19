import * as types from "./EventActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the EVENTS
 */
 export const getEvents = () => (dispatch) => {
    dispatch({
      type: types.GET_EVENTS_REQUEST,
    });
    axios               
      .get(`${base_url}/eventType`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_EVENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_EVENTS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new EVENTS
 */
export const addEvents = (event, cb) => (dispatch) => {
    console.log(event);
    dispatch({
      type: types.ADD_EVENTS_REQUEST,
    });
    axios
      .post(`${base_url}/eventType`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        {res.data.message?  
          message.success(res.data.message):
          Swal.fire({
            icon: 'success',
            title: 'Event has been added Successfully',

          })
        // message.success("Event has been added successfully!");
        }
        // dispatch(getEvents());
        console.log(res);
        dispatch({
          type: types.ADD_EVENTS_SUCCESS,
          payload: { ...event, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_EVENTS_FAILURE,
        });
        cb();
      });
  };



  
/**
 * remove a new EVENTS
 */
export const removeEvents = (eventTypeId) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_EVENTS_REQUEST,
    });
    axios
      .delete(`${base_url}/eventType/${eventTypeId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Event has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_EVENTS_SUCCESS,
          payload: eventTypeId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_EVENTS_FAILURE,
        });
      });
  };
  


/**
 *update label of EVENTS
 */
 export const updateEvents = (eventTypeId, eventType, editInd, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_EVENTS_REQUEST,
    });
    axios
      .put(
        `${base_url}/eventType`,
        { eventTypeId, eventType, editInd:"true" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Event has been updated Successfully',
        })
        // message.success("Event has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_EVENTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_EVENTS_FAILURE,
        });
      });
  };
  export const searchEventName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_EVENT_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/eventType/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_EVENT_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_EVENT_SEARCH_FAILURE,
          payload: err,
        });
      });
  };
  
  export const ClearReducerDataOfEvent = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_EVENT,
    });
  };

  export const getEventCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_EVENT_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/department/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_EVENT_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_EVENT_COUNT_FAILURE,
          payload: err,
        });
      });
  };