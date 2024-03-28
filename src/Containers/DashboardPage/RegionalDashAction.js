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

 