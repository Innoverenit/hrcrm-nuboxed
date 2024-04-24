import * as types from "./LocationActionType";
import axios from "axios";
import { base_url,base_url2 } from "../../../../Config/Auth";
import Swal from 'sweetalert2';

export const handleLocationModal = (modalProps) => (dispatch) => {
  dispatch({ type: types.HANDLE_LOCATION_MODAL, payload: modalProps });
};

export const setLocationViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_LOCATION_VIEW_TYPE,
      payload: viewType,
    });
  };

  export const getlocation = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOCATION_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/locationDetails/getLocationDetailsList/${orgId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       
        dispatch({
          type: types.GET_LOCATION_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_LOCATION_DATA_FAILURE,
          payload: err,
        });
      });
  };
  
  export const addLocation = (save,orgId) => (dispatch) => {
    dispatch({
      type: types.ADD_LOCATION_REQUEST,
    });
  
    axios
      .post(`${base_url}/locationDetails/save`,save,  {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getlocation(orgId));
        dispatch({
          type: types.ADD_LOCATION_SUCCESS,
          payload: res.data,
        });
       // cb && cb("Success");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LOCATION_FAILURE,
          payload: err,
        });
        //cb && cb("error");
      });
  };

  export const handleLocationShiftDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_LOCATION_SHIFT_DRAWER, payload: modalProps });
  };
  
  export const handleUpdateLocationDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_UPDATE_LOCATION_DRAWER, payload: modalProps });
  };

  
  export const updateLocation = (data,locationDetailsId, cb) => (dispatch) => {
    dispatch({ type: types.UPDATE_LOCATIONS_REQUEST });
    axios
      .put(
        `${base_url}/locationDetails/${locationDetailsId}`,data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LOCATIONS_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Info Updated Succefully',
        })
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LOCATIONS_FAILURE,
          payload: err,
        });
      });
  };
  export const deleteLocation = (locationDetailsId) => (dispatch) => {
    dispatch({
      type: types.DELETE_LOCATIONS_REQUEST,
    });
    axios
      .delete(`${base_url}/locationDetails/deleteLocationDetails/${locationDetailsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.DELETE_LOCATIONS_SUCCESS,
          payload: locationDetailsId,
        });
        Swal.fire({
          icon: 'success',
          title: 'Deleted Successfully',
          showConfirmButton: false,
          timer: 4000
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LOCATIONS_FAILURE,
          payload: err,
        });
      });
  };

  export const getShiftlocs = (locationDetailsId) => (dispatch) => {
    dispatch({
      type: types.GET_SHIFT_LOCATION_REQUEST,
    });
    axios
      .get(`${base_url2}/shift/shiftList/${locationDetailsId}`,
      {
        // headers: {
        //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        // },
      })
      .then((res) => {
       
        dispatch({
          type: types.GET_SHIFT_LOCATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_SHIFT_LOCATION_FAILURE,
          payload: err,
        });
      });
  };
  
  
  export const handleCreateShiftDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_CREATE_SHIFT_DRAWER, payload: modalProps });
  };

  export const createShitLocation = (save) => (dispatch,getState) => {
    // const locationDetailsId = getState().storedLoc.locationDetailsId;
  
    dispatch({
      type: types.CREATE_SHIFT_LOCATION_REQUEST,
    });
    axios
      .post(`${base_url2}/shift`,save,  {
        // headers: {
        //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        // },
      })
      .then((res) => {
        // dispatch(getShiftlocs(locationDetailsId));
        dispatch({
          type: types.CREATE_SHIFT_LOCATION_SUCCESS,
          payload: res.data,
        });
       // cb && cb("Success");
  window.reload()
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_SHIFT_LOCATION_FAILURE,
          payload: err,
        });
        //cb && cb("error");
      });
  };
  export const getAlLocshift = (locationDetailsId) => (dispatch) => {
    dispatch({
      type: types.GET_ALLOCTION_SHIFT_REQUEST,
    });
    axios
      .get(`${base_url}/employee/user-list/${locationDetailsId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       
        dispatch({
          type: types.GET_ALLOCTION_SHIFT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_ALLOCTION_SHIFT_FAILURE,
          payload: err,
        });
      });
  };

  export const handleLocationCustomerDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_LOCATION_CUSTOMER_DRAWER, payload: modalProps });
  };

  
  export const handleLocationSupplierDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_LOCATION_SUPPLER_DRAWER, payload: modalProps });
  };

  export const getLocationRecords = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOCATION_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/locationCount/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LOCATION_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LOCATION_RECORDS_FAILURE,
          payload: err,
        });
      });
  }; 

  export const addingLocationToggle = (data,orgId) => (dispatch) => {
    //console.log(permissions, userId);
   // const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADDING_LOCATION_TOGGLE_REQUEST,
    });
    axios
      .put(`${base_url}/locationDetails/update/all-indicators`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
       dispatch(getlocation(orgId))
        dispatch({
          type: types.ADDING_LOCATION_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADDING_LOCATION_TOGGLE_FAILURE,
          payload: err,
        });
      });
  };
  
  export const handleLocnCellDrawer =(modalProps)=>(dispatch) => {
    dispatch({
      type: types.HANDLE_LOCATION_CELL_DRAWER,
      payload: modalProps,
    });
  }

  export const createLoCell = (data) => (dispatch) => {
    // const { locationId,organizationId } = getState().auth.userDetails;
    
    dispatch({ type: types.CREATE_LOCATION_CELL_REQUEST });
    axios
      .post(`${base_url2}/cell/createCell`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getRoomRackByLocId(locationId,organizationId))
        dispatch({
          type: types.CREATE_LOCATION_CELL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_LOCATION_CELL_FAILURE,
          payload: err,
        });
      });
  };
  export const getLoCell = (ID) => (dispatch) => {
    dispatch({
      type: types.GET_LOCATION_CELL_REQUEST,
    });
    axios
      .get(`${base_url2}/LOCAL/${ID}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_LOCATION_CELL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LOCATION_CELL_FAILURE,
          payload: err,
        });
      });
  };