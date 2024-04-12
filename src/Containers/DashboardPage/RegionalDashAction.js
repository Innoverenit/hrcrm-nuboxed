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

  export const getRegionTaskList = (userId,typeName,quarter,year,) => (dispatch) => {
  
    dispatch({
      type: types.GET_REGION_TASK_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/task/all-task/list/${userId}/${typeName}/${quarter}/${year}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_REGION_TASK_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_REGION_TASK_LIST_FAILURE,
          payload: err,
        });
      });
  };



  export const updateTaskdragstage = (data,userId, typeName,quarter,year) => (dispatch) => {
    //console.log(sourceStageId, destinationStageId, opportunityId);
    // if (destinationStageId === "won") {
    //   message.success("stage is won");
    // }
    // if (destinationStageId === "loss") {
    //   message.error("stage is loss");
    // }
    dispatch({
      type: types.UPDATE_TASK_DRAG_STAGE_REQUEST,
  
    });
   
    axios
      .put(
        `${base_url}/task/drag-and-drop/weak-to-weak`,data, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(getRegionTaskList(userId, typeName,quarter,year))
       dispatch({
          type: types.UPDATE_TASK_DRAG_STAGE_SUCCESS,
          payload: res.data,
        });
        // cb && cb(res.data);
      })
      .catch((err) => {
        console.log(err);
  
        dispatch({
          type: types.UPDATE_TASK_DRAG_STAGE_FAILURE,
          payload: err,
        });
        // cb && cb("failure");
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

 