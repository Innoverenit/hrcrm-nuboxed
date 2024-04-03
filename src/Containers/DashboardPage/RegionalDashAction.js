import * as types from "./RegionalDashActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";


export const setReionalDashViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_REGIONAL_DASH_VIEW_TYPE,
      payload: viewType,
    });
  };

  export const setSelectedRegionalTimeIntervalReport = (selectedTime) => (dispatch) => {
    console.log(selectedTime);
    dispatch({
      type: types.CHANGE_SELECTED_REGIONAL_TIME_INTERVAL_REPORT,
      payload: selectedTime,
    });
  };

  export const handleSalesModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_SALES_MODAL,
      payload: modalProps,
    });
  };
  export const handleSalesPlanDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_SALES_PLAN_DRAWER_MODAL,
      payload: modalProps,
    });
  };
  

  export const handleFullFillmentModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_FULLFILLMENT_MODAL,
      payload: modalProps,
    });
  };

  export const handleInvestmentModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTMENT_MODAL,
      payload: modalProps,
    });
  };

  export const getRegionSalesList = (year,quarter,regionsId,type) => (dispatch) => {
  
    dispatch({
      type: types.GET_REGION_SALES_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/regions/target/dash-board/${year}/${quarter}/${regionsId}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REGION_SALES_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_REGION_SALES_LIST_FAILURE,
          payload: err,
        });
      });
  };

//   export const getCo2 = (pageNo) => (dispatch) => {
//     dispatch({
//       type: types.GET_CO2_TABLE_VIEW_REQUEST,
//     });
//     axios
//       .get(`${base_url}/Co2/all`, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: types.GET_CO2_TABLE_VIEW_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err.response);
//         dispatch({
//           type: types.GET_CO2_TABLE_VIEW_FAILURE,
//           payload: err,
//         });
//       });
//   };

 