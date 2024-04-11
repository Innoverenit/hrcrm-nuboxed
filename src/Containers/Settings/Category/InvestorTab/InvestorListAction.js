import * as types from "./InvestorListActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd"
import Swal from 'sweetalert2'

/**
 * get all the Sector
 */
 export const getInvestorList = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_LIST_REQUEST,
    });
    axios
    .get(`${base_url}/investorCategory/All/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_LIST_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addInvestorData = (sectors,orgId, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_INVESTOR_DATA_REQUEST,
    });
    axios
      .post(`${base_url}/investorCategory`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getInvestorCount(orgId));
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
            title: 'Investor Type added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        console.log(res);
        dispatch({
          type: types.ADD_INVESTOR_DATA_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_INVESTOR_DATA_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeInvestor = ( investorCategoryId,orgId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_INVESTOR_REQUEST,
    });
    axios
      .delete(`${base_url}/investorCategory/${investorCategoryId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getInvestorCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Investor Type deleted successfully!',
        })
        // message.success("Investor has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_INVESTOR_SUCCESS,
          payload:investorCategoryId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_INVESTOR_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateInvestor = (data, investorCategoryId,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_INVESTOR_REQUEST,
    });
    axios
      .put(
        `${base_url}/investorCategory/${investorCategoryId}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        
        // message.success("INVESTOR has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_INVESTOR_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Investor Type updated successfully!',
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_FAILURE,
        });
      });
  };
  
  export const searchCustomerName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/sector/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_CUSTOMER_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_CUSTOMER_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfInvestorType = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_INVESTORTYPE,
    });
  };
  export const searchInvestorTypeName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORTYPE_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/investorCategory/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_INVESTORTYPE_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_INVESTORTYPE_SEARCH_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/investorCategory/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  export const handleInvestorImportModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_IMPORT_MODAL,
      payload: modalProps,
    });
  };

  export const addInvestorImportForm =
(customer, orgId) => (dispatch, getState) => {
  const employeeId = getState().auth.userDetails.employeeId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_INVESTOR_IMPORT_FORM_REQUEST,
  });

  axios
    .post(`${base_url}/excel/import/category/?type=${"investorCategory"}`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getTaskListRangeByUserId(employeeId,"0"));
   

      dispatch({
        type: types.ADD_INVESTOR_IMPORT_FORM_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVESTOR_IMPORT_FORM_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};