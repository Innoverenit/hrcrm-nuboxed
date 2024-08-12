import * as types from "./HolidayActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";

const dummydata = [
  { holidayName: "abc", date: "22-78-89", time: "optional" },
  { holidayName: "abc", date: "22-78-89", time: "optional" },
  { holidayName: "abc", date: "22-78-89", time: "optional" },
];
export const addHoliday = (data, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_HOLIDAY_REQUEST,
  });
  console.log(data);

  axios
    .post(`${base_url}/holiday`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getHolidayDetails(employeeId));
      dispatch({
        type: types.ADD_HOLIDAY_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_HOLIDAY_FAILURE,
        payload: err,
      });
      // cb && cb("Failure");
    });
};

export const getHoliday = (countryName,year) => (dispatch) => {
  dispatch({
    type: types.GET_HOLIDAY_REQUEST,
  });

  axios
    .get(`${base_url}/holidays/${countryName}/${year}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_HOLIDAY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_HOLIDAY_FAILURE,
        payload: err,
      });
    });
};

export const getHolidayyear = (countryName,year) => (dispatch) => {
  dispatch({
    type: types.GET_HOLIDAYYEAR_REQUEST,
  });

  axios
    .get(`${base_url}/holidays/user/${countryName}/${year}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_HOLIDAYYEAR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_HOLIDAYYEAR_FAILURE,
        payload: err,
      });
    });
};

export const handleHolidayModal = (modalProps) => (dispatch) => {
  console.log(modalProps);
  dispatch({
    type: types.HANDLE_HOLIDAY_MODAL,
    payload: modalProps,
  });
};
export const updateHoliday = (
  holidayId,
  holidayName,
  date,
  holidayType,
  cb
) => (dispatch) => {
  dispatch({
    type: types.UPDATE_HOLIDAY_REQUEST,
  });
  axios
    .put(
      `${base_url}/holiday `,
      { holidayId, holidayName, date, holidayType },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_HOLIDAY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_HOLIDAY_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteHoliday = (holidayId) => (dispatch, getState) => {
  console.log("inside deleteDocument", holidayId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_HOLIDAY_REQUEST,
  });

  axios
    .delete(`${base_url}/holiday/${holidayId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_HOLIDAY_SUCCESS,
        payload: holidayId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_HOLIDAY_FAILURE,
        payload: err,
      });
    });
};

export const getPlannerHoliday = (userId,year) => (dispatch) => {
  dispatch({
    type: types.GET_PLANNER_HOLIDAY_REQUEST,
  });

  axios
    .get(`${base_url}/holidays/planner/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.GET_PLANNER_HOLIDAY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PLANNER_HOLIDAY_FAILURE,
        payload: err,
      });
    });
};

// export const getHolidaysByCountryAndYear = () => (dispatch) => {
//   dispatch({
//     type: types.GET_HOLIDAY_BY_COUNTRY_AND_YEAR_REQUEST,
//   });

//   axios
//     .get(`${base_url}/holidays`, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       dispatch({
//         type: types.GET_HOLIDAY_BY_COUNTRY_AND_YEAR_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.GET_HOLIDAY_BY_COUNTRY_AND_YEAR_FAILURE,
//         payload: err,
//       });
//     });
// };


// export const addapplyOffer = (data) => (dispatch) => {
//   dispatch({
//     type: types.ADD_APPLY_OFFER_REQUEST,
//   });
//   axios
//     .post(`${base_url}/holiday/user/apply/optional/holiday`, data ,{
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
    
//     .then((res) => {
//       console.log(res);
//       //message.success('Applied Sucessfully')
//       dispatch({
//         type: types.ADD_APPLY_OFFER_SUCCESS,
//         payload: res.data,
//       });
//       // cb();
//     })
//     .catch((err) => {
//       console.log(err);
//       dispatch({
//         type: types.ADD_APPLY_OFFER_FAILURE,
//         payload: err,
//       });
//     });
// };
export const addapplyOffer = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_APPLY_OFFER_REQUEST,
  });
  console.log(data);

  axios
    .post(`${base_url}/holiday/user/apply/optional/holiday`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getHolidayDetails(employeeId));
      dispatch({
        type: types.ADD_APPLY_OFFER_SUCCESS,
        payload: res.data,
      });
     // cb && cb("Success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_APPLY_OFFER_FAILURE,
        payload: err,
      });
     // cb && cb("Failure");
    });
};