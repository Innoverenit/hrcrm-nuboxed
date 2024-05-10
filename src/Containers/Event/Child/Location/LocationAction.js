import * as types from "./LocationActionType";
import axios from "axios";
import { message } from "antd";
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
  export const deleteLocation = (locationDetailsId,orgId) => (dispatch) => {
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
        dispatch(getLocationRecords(orgId))
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



  export const deleteLocationCell = (cellId) => (dispatch) => {
    dispatch({
      type: types.DELETE_LOCATION_CELL_REQUEST,
    });
    axios
      .delete(`${base_url2}/cell/cellDetails/delete/${cellId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        //dispatch(getProducts(0))
        console.log(res);
        dispatch({
          type: types.DELETE_LOCATION_CELL_SUCCESS,
          payload: cellId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LOCATION_CELL_FAILURE,
          payload: err,
        });
      });
  };




  export const getCellCode = (locationDetailsId) => (dispatch) => {
    dispatch({
      type: types.GET_CELL_CODE_REQUEST,
    });
    axios
      .get(`${base_url2}/cell/chamber/link/drop-down/${locationDetailsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_CELL_CODE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CELL_CODE_FAILURE,
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
  export const getLoCell = (locationDetailsId,orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOCATION_CELL_REQUEST,
    });
    axios
      .get(`${base_url2}/cell/cellDetails/${locationDetailsId}/${orgId}`, {
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
  export const getAlLoCell = () => (dispatch) => {
    dispatch({
      type: types.GET_ALL_LOCATION_CELL_REQUEST,
    });
    axios
      .get(`${base_url2}/cell/allCellChamber`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_ALL_LOCATION_CELL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_LOCATION_CELL_FAILURE,
          payload: err,
        });
      });
  };

  export const linkCellwithProduct = (data) => (dispatch) => {
    dispatch({ type: types.LINK_CELL_WITH_PRODUCT_REQUEST });
    axios
      .post(
        `${base_url2}/cell/link/chamber-production`,data,
        {
      
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        
        })
      .then((res) => {
        dispatch({
          type: types.LINK_CELL_WITH_PRODUCT_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Satus has been changed successfully!',
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_CELL_WITH_PRODUCT_FAILURE,
          payload: err,
        });
      });
  };


  export const getUserListLocation = (locationId,departmentId) => (dispatch) => {
    dispatch({
      type: types.GET_USER_LIST_LOCATION_REQUEST,
    });
    axios
      .get(`${base_url}/employee/user/list/drop-down/${locationId}/${departmentId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_USER_LIST_LOCATION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_USER_LIST_LOCATION_FAILURE,
          payload: err,
        });
      });
  };


  export const createUserCell = (data) => (dispatch) => {
    // const { locationId,organizationId } = getState().auth.userDetails;
    
    dispatch({ type: types.CREATE_USER_CELL_REQUEST });
    axios
      .post(`${base_url2}/cell/chamber/link/user/save`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getRoomRackByLocId(locationId,organizationId))
        dispatch({
          type: types.CREATE_USER_CELL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_USER_CELL_FAILURE,
          payload: err,
        });
      });
  };



  export const getCatalogueCell = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CATALOGUE_CELL_REQUEST,
    });
    axios
      .get(`${base_url}/locationDetails/getLocationDetailsList/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_CATALOGUE_CELL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);

        dispatch({
          type: types.GET_CATALOGUE_CELL_FAILURE,
          payload: err,
        });
      });
  };



  export const getUserCell = (locationDetailsId) => (dispatch) => {
    dispatch({
      type: types.GET_USER_CELL_REQUEST,
    });
    axios
      .get(`${base_url2}/cell/chamber/link/user/get-all/${locationDetailsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_USER_CELL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_USER_CELL_FAILURE,
          payload: err,
        });
      });
  };




  export const deleteUserCell = (cellChamberUserLinkId) => (dispatch) => {
    dispatch({
      type: types.DELETE_USER_CELL_REQUEST,
    });
    axios
      .delete(`${base_url2}/cell/chamber/link/user/delete/${cellChamberUserLinkId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        //dispatch(getProducts(0))
        console.log(res);
        dispatch({
          type: types.DELETE_USER_CELL_SUCCESS,
          payload: cellChamberUserLinkId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_USER_CELL_FAILURE,
          payload: err,
        });
      });
  };



  export const getcellCardList = (locationDetailsId,productId) => (dispatch) => {
    dispatch({
      type: types.GET_CELL_CARD_LIST_REQUEST,
    });
    axios
      .get(`${base_url2}/cell/product/cell-chamber/link-list/${locationDetailsId}/${productId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.GET_CELL_CARD_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CELL_CARD_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const getLocationDeleteHistory = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOCATION_DELETE_HISTORY_REQUEST,
    });
    axios
      .get(`${base_url}/locationDetails/deleteLocationHistory/${orgId}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LOCATION_DELETE_HISTORY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LOCATION_DELETE_HISTORY_FAILURE,
          payload: err,
        });
      });
  };


  export const getLocationDeletedCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LOCATION_DELETED_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/locationDetails/delete/location/record/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LOCATION_DELETED_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LOCATION_DELETED_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  export const reinstateToggleForLocation = (data, locationDetailsId,orgId) => (
    dispatch
  ) => {
    // debugger;
    dispatch({
      type: types.REINSTATE_TOGGLE_FOR_LOCATION_REQUEST,
    });
    axios
      .put(`${base_url}/locationDetails/locationReInState/${locationDetailsId}`, data,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getLocationDeletedCount(orgId))
        dispatch({
          type: types.REINSTATE_TOGGLE_FOR_LOCATION_SUCCESS,
          payload: locationDetailsId,
        });
        Swal.fire({
          icon: 'success',
          title: 'Reinstated Successfully',
        })
        // message.success("Reinstated Successfully");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REINSTATE_TOGGLE_FOR_LOCATION_FAILURE,
          payload: err,
        });
        message.error("Something went wrong")
      });
  };