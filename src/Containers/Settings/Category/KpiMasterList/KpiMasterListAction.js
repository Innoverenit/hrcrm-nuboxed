import * as types from "./KpiMasterListActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getMasterKpi = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_MASTER_KPI_REQUEST,
    });
    axios
    .get(`${base_url}/performanceManagement/All/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_MASTER_KPI_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_MASTER_KPI_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addMasterKpi = (sectors,orgId,cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_MASTER_KPI_REQUEST,
    });
    axios
      .post(`${base_url}/performanceManagement`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getMasterKpiCount(orgId));
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
            title: 'Master KPI added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        console.log(res);
        dispatch({
          type: types.ADD_MASTER_KPI_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_MASTER_KPI_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };


  export const removeMasterKpi = ( performanceManagementId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_MASTER_KPI_REQUEST,
    });
    axios
      .delete(`${base_url}/performanceManagement/${performanceManagementId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getMasterKpiCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Master KPI deleted Successfully!',
        })
        console.log(res);
        dispatch({
          type: types.REMOVE_MASTER_KPI_SUCCESS,
          payload:performanceManagementId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_MASTER_KPI_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateMasterKpi = (data, performanceManagementId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_MASTER_KPI_REQUEST,
    });
    axios
      .put(
        `${base_url}/performanceManagement/${performanceManagementId}`,
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
          title: 'Master KPI updated Successfully!',
        })
        // message.success("Sector has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_MASTER_KPI_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_MASTER_KPI_FAILURE,
        });
      });
  };
  
  export const searchMasterKpiName = (kpi) => (dispatch) => {
    dispatch({
      type: types.GET_MASTER_KPI_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/PerformanceManagement/search/${kpi}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_MASTER_KPI_SEARCH_SUCCESS,
          payload: res.data,
        });
  
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_MASTER_KPI_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfMasterKpi = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_MASTER_KPI,
    });
  };

  export const getMasterKpiCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_MASTER_KPI_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/performanceManagement/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_MASTER_KPI_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_MASTER_KPI_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  export const linkMasterCurrencyToggle = ( data,performanceManagementId,cb) => (dispatch, getState) => {
    //console.log(permissions, userId);
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.LINK_MASTER_CURRENCY_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/performanceManagement/currency-ind/update/${performanceManagementId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        // dispatch(getThirdPartyAccess(orgId))
        dispatch({
          type: types.LINK_MASTER_CURRENCY_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_MASTER_CURRENCY_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };



 