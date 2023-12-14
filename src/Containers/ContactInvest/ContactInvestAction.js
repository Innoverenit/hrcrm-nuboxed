import * as types from "./ContactInvestActionType";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";

export const setContactInvetViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_CONTACT_INVEST_VIEW_TYPE, payload: viewType });

export const handleContactInvestModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CONTACT_INVEST_MODAL,
      payload: modalProps,
    });
  }
  
 export const addContactInvest = (contact) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADD_CONTACT_INVEST_REQUEST,
    });
    axios
      .post(`${base_url}/contact`, contact, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        dispatch(getContactInvest(userId));
        dispatch(getOpportunityRecord(userId));
        dispatch({
          type: types.ADD_CONTACT_INVEST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CONTACT_INVEST_FAILURE,
          payload: err,
        });
      });
  };

  export const getContactInvestByUserId = (userId,pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_CONTACTS_INVEST_REQUEST,
    });
    axios
      .get(`${base_url}/contact/Invester/all-contact/user/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CONTACTS_INVEST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CONTACTS_INVEST_FAILURE,
          payload: err,
        });});};

        export const getContactInvestFilterData = (userId,pageNo,filter) => (dispatch) => {
          dispatch({
            type: types.GET_CONTACTS_INVEST_FILTER_DATA_REQUEST,
          });
          axios
            .get(`${base_url}/contact/Invester/all-contact/user/${userId}/${pageNo}/${filter}`, {
              headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
              },
            })
            .then((res) => {
              console.log(res);
              dispatch({
                type: types.GET_CONTACTS_INVEST_FILTER_DATA_SUCCESS,
                payload: res.data,
              });
            })
            .catch((err) => {
              console.log(err.response);
              dispatch({
                type: types.GET_CONTACTS_INVEST_FILTER_DATA_FAILURE,
                payload: err,
              });});};

export const emptyContactInvest = () => (dispatch) => {
    dispatch({ type: types.EMPTY_CONTACT_INVEST_LIST,});};

export const handleUpdateContactInvestModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_CONTACT_INVEST_MODAL,
      payload: modalProps,});};
  
export const updateContactInvest=(data,contactId)=>(dispatch)=>{
  dispatch({ type: types.UPDATE_CONTACT_INVEST_REQUEST });
  axios
    .put(`${base_url}/contact/${contactId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_CONTACT_INVEST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CONTACT_INVEST_FAILURE,
        payload: err,
      });
    });
}

export const getContactInvestByContactId = (contactId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_INVEST_BY_CONTACT_ID_REQUEST,
  });
  axios
    .get(`${base_url}/contact/${contactId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_INVEST_BY_CONTACT_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_INVEST_BY_CONTACT_ID_FAILURE,
        payload: err,
      });
    });
};

export const getContactInvest = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACTINVEST_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/investor/contact/record/count/investor/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACTINVEST_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACTINVEST_RECORDS_FAILURE,
        payload: err,
      });
    });
};
export const getTeamContactInvest = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_TEAM_CONTACTINVEST_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/investor/contact/team/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAM_CONTACTINVEST_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_TEAM_CONTACTINVEST_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const searchInvestorContactName = (name) => (dispatch) => {
  dispatch({
    type: types.GET_INVESTOR_CONTACT_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url}/contact/Invester/search/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // const actualData = res.data;
      // const filteredData = actualData.filter((item) => { return item.name !== null })
      // message.success(res.data.message);
      // message.success("Data has been updated successfully!");
  
    
    
      dispatch({
        type: types.GET_INVESTOR_CONTACT_SEARCH_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_INVESTOR_CONTACT_SEARCH_FAILURE,
        payload: err,
      });
    });
}; 

export const handleContactInvestNotesDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_INVEST_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};


export const getAllContactInvest = (pageNo,filter) => (dispatch) => {
 
  dispatch({
    type: types.GET_ALL_CONTACT_INVEST_REQUEST,
  });
  axios
    .get(`${base_url}/investor/contact/${pageNo}/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CONTACT_INVEST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_CONTACT_INVEST_FAILURE,
        payload: err,
      });
    });
};

export const handleContactInvestActivityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_INVEST_ACTIVITY_MODAL,
    payload: modalProps,
  });
};

export const getContactInvestTimeline = (contactId) => (dispatch) => {
  dispatch({
      type: types.GET_CONTACT_INVEST_TIMELINE_REQUEST,
  });

  axios
      .get(`${base_url}/contact/activity/list/${contactId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_CONTACT_INVEST_TIMELINE_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_CONTACT_INVEST_TIMELINE_FAILURE,
              payload: err,
          });
      });
};

export const getOpportunityRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_RECORD_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/record/today/${userId}`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_RECORD_FAILURE,
        payload: err,
      });
    });
};

export const addContactInvestActivityCall = (call,contactId, cb) => (dispatch, getState) => {
  ////debugger;
  console.log("inside addCall");
  const { userId } = getState("auth").auth.userDetails;
  // const { startDate, endDate } = getState("dashboard").dashboard;
  dispatch({
    type: types.ADD_CONTACT_INVEST_ACTIVITY_CALL_REQUEST,
  });

  axios
    .post(`${base_url}/activity/call/save`, call, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Call has been added successfully!");
      ////debugger;
      console.log(res);
      //  dispatch(getContactInvestTimeline(contactId));
      dispatch({
        type: types.ADD_CONTACT_INVEST_ACTIVITY_CALL_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_INVEST_ACTIVITY_CALL_FAILURE,
        payload: err,
      });
      // cb();
    });
};

export const addContactinvestActivityEvent = (event,contactId, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // const { startDate, endDate } = getState("dashboard").dashboard;
  console.log("inside addEvent");
  dispatch({
    type: types.ADD_CONTACT_INVEST_ACTIVITY_EVENT_REQUEST,
  });

  axios
    .post(`${base_url}/activity/event/save`, event, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Meeting has been added successfully!");
      console.log(res);
      // dispatch(getContactInvestTimeline(contactId));
      // dispatch(getEventListRangeByUserId(userId,0));
      dispatch({
        type: types.ADD_CONTACT_INVEST_ACTIVITY_EVENT_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_INVEST_ACTIVITY_EVENT_FAILURE,
        payload: err,
      });
      // cb();
    });
};

export const addContactinvestActivityTask = (task,contactId, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // const { startDate, endDate } = getState("dashboard").dashboard;
  console.log("inside addEvent");
  dispatch({
    type: types.ADD_CONTACT_INVEST_ACTIVITY_TASK_REQUEST,
  });

  axios
    .post(`${base_url}/activity/task/create`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Task has been added successfully!");
      console.log(res);
      // dispatch(getContactInvestTimeline(contactId));
      dispatch({
        type: types.ADD_CONTACT_INVEST_ACTIVITY_TASK_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_INVEST_ACTIVITY_TASK_FAILURE,
        payload: err,
      });
      // cb();
    });
};

export const ClearReducerDataOfContactInvest = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_CONTACT_INVEST,
  });
};
