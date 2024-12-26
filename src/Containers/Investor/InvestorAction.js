import * as types from "./InvestorActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url, base_url2, login_url } from "../../Config/Auth";
import { message } from "antd";
import Swal from "sweetalert2";

export const setInvestorViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_INVESTOR_VIEW_TYPE,
      payload: viewType,
    });
};

export const getInvestorsbyId = (userId,pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTORS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTORS_BY_ID_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, reach out to support!',
          showConfirmButton: false,
        timer: 1500,
        })
      });
  };

  export const getInvestorDeletelist = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORS_DELETELIST_REQUEST,
    });
    axios
      .get(`${base_url}/all/deleted/investor/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTORS_DELETELIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTORS_DELETELIST_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, reach out to support!',
          showConfirmButton: false,
        timer: 1500,
        })
      });
  };

  export const getInvestorsFilterData = (userId,pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTORS_FILTER_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTORS_FILTER_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTORS_FILTER_DATA_FAILURE,
          payload: err,
        });
      });
  };


  export const emptyInvestor = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_INVESTOR_LIST, 
    });
  };

  export const AddInvestor = (investor) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.ADD_INVESTOR_REQUEST,
    });
    axios
      .post(`${base_url}/investor`, investor, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getInvestor(userId));
        dispatch(getOpportunityRecord(userId));
        dispatch({
          type: types.ADD_INVESTOR_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVESTOR_FAILURE,
          payload: err,
        });
      });
  };
  export const getTeamUserList = (reptMngrId) => (dispatch) => {
    dispatch({ type: types.GET_TEAM_USERLIST_REQUEST });
    axios
      .get(`${base_url}/employee/user-list/reptMngr/${reptMngrId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_USERLIST_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_TEAM_USERLIST_FAILURE,
          payload: err,
        });
      });
  };
  export const handleInvestorModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_MODAL,
      payload: modalProps,
    });
  };

  export const handleInvestorAddressDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_ADDRESS_MODAL,
      payload: modalProps,
    });
  };
  export const handleUpdateInvestorModal=(modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_UPDATE_MODAL,
      payload: modalProps,
    });
  };
  export const UpdateInvestor = (data, investorId) => (dispatch) => {
    dispatch({ type: types.UPDATE_INVESTOR_BY_ID_REQUEST });
    axios
      .put(`${base_url}/investor/rowEdit/${investorId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_INVESTOR_BY_ID_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
          showConfirmButton: false,
        timer: 1500,
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
export const getInvestorDetailsById = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  
  export const getContactListByInvestorId = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_CONTACT_REQUEST,
    });
    axios
      .get(`${base_url}/investor/contacts/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_CONTACT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_CONTACT_FAILURE,
          payload: err,
        });
      });
  };
  export const getInvestorDocument = (investorId) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_DOCUMENTS_REQUEST });
    axios
      .get(`${base_url}/investor/document/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_DOCUMENTS_FAILURE,
          payload: err,
        });
      });
  };
  export const getNotesListByInvestorId = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_NOTES_LIST_BY_INVESTOR_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/note/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_NOTES_LIST_BY_INVESTOR_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NOTES_LIST_BY_INVESTOR_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const addNote = (note, cb) => (dispatch) => {
    dispatch({ type: types.ADD_INVESTOR_NOTES_REQUEST });
    axios
      .post(`${base_url}/investor/notes`, note, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_INVESTOR_NOTES_SUCCESS,
          payload: res.note,
        });
        console.log(res);
        cb && cb();
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_INVESTOR_NOTES_FAILURE,
          payload: err,
        });
        console.log(err);
        cb && cb();
      });
  };
  
  export const getInvoiceListByInvestorId = (investorId) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_INVOICE_REQUEST });
    axios
      .get(`${base_url}/investor/invoice/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_INVOICE_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_INVOICE_FAILURE,
          payload: err,
        });
      });
  };
  export const handleInvestorContactModal =(modalProps)=> (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_CONTACT_MODAL,
      payload: modalProps,
    });
  };

  export const createInvestorContact = (contact) => (dispatch) => {
    dispatch({
      type: types.ADD_INVESTOR_CONTACT_REQUEST,
    });
  
    axios
      .post(`${base_url}/investor/contact`, contact, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        if (res.data.message) {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
         
          Swal.fire({
            icon: 'success',
            title: 'Contact created Successfully',
            showConfirmButton: false,
        timer: 1500,
          });
        }
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        dispatch({
          type: types.ADD_INVESTOR_CONTACT_SUCCESS,
          payload: res.data,
        });
       
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVESTOR_CONTACT_FAILURE,
          payload: err,
        });
      });
  };



  export const createDeals = (deal, cb) => (dispatch,getState) => {
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.CREATE_DEAL_REQUEST,
    });
    axios
      .post(`${base_url}/investorOpportunity`, deal, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        // dispatch(getdealsRecord(userId));
        // dispatch(getOpportunityRecord(userId));
        // dispatch(getLatestOpportunities(userId, startDate, endDate));
        // dispatch(getOpportunitiesByPrice(userId));
        dispatch({
          type: types.CREATE_DEAL_SUCCESS,
          payload: res.data,
        });
      
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_DEAL_FAILURE,
          payload: err,
        });
      });
  };
  
  export const handleInvestorDocumentUploadModal =(modalProps)=> (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_DOCUMENT_UPLOAD_MODAL,
      payload: modalProps,
    });
  };
  export const createInvestorDocument = (data, cb) => (dispatch) => {
    dispatch({ type: types.CREATE_INVESTOR_DOCUMENT_REQUEST });
    axios
      .post(`${base_url}/investor/document`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.CREATE_INVESTOR_DOCUMENT_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_INVESTOR_DOCUMENT_FAILURE,
          payload: err,
        });
      });
  };
    export const handleUpdateInvestorContactModal =(modalProps)=> (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_INVESTOR_CONTACT_MODAL,
      payload: modalProps,
    });
  };
  export const updateInvestorContact = (data, contactId) => (dispatch) => {
    dispatch({ type: types.UPDATE_INVESTOR_CONTACT_BY_ID_REQUEST });
    axios
      .put(`${base_url}/contact/${contactId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_INVESTOR_CONTACT_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_CONTACT_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const getInvestorData = (userId,page) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/investor/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestor = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/investor/record/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorAll = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_ALL_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/investor/all/record/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_ALL_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_ALL_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorTeam = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_TEAM_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/investor/teams/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_TEAM_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_TEAM_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const searchInvestorName = (name,type) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/investor/search/alltype/${name}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
      
        dispatch({
          type: types.GET_INVESTOR_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_INVESTOR_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const handleInvestorNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const getAllEmployeelist = () => (dispatch) => {
    dispatch({
      type: types.GET_ALL_EMPLOYEE_LIST_REQUEST,
    });
    axios
       .get(`${base_url}/employee/user-list/drop-down/im`, {
       headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_EMPLOYEE_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ALL_EMPLOYEE_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const handleActivityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ACTIVITY_MODAL,
      payload: modalProps,
    });
  };

  export const getAllInvestorsbyId = (pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_INVESTORS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/investor/list/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_INVESTORS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_INVESTORS_BY_ID_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, reach out to support!',
          showConfirmButton: false,
          timer: 1500,
        })
      });
  };

  export const getInvestorTimeline = (investorId) => (dispatch) => {
    dispatch({
        type: types.GET_INVEST_TIMELINE_REQUEST,
    });
  
    axios
        .get(`${base_url}/investor/activity/list/${investorId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_INVEST_TIMELINE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_INVEST_TIMELINE_FAILURE,
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

  export const addInvestActivityCall = (call,contactId, cb) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.ADD_INVEST_ACTIVITY_CALL_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/call/save`, call, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Call has been added successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        console.log(res);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_CALL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_CALL_FAILURE,
          payload: err,
        });
        // cb();
      });
  };
  
  export const addinvestActivityEvent = (event,contactId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_INVEST_ACTIVITY_EVENT_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/event/save`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Meeting has been added successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        console.log(res);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_EVENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_EVENT_FAILURE,
          payload: err,
        });
      });
  };
  
  export const addinvestActivityTask = (task,) => (dispatch, getState) => {

    dispatch({
      type: types.ADD_INVEST_ACTIVITY_TASK_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/task/create`, task, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Task has been added successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        console.log(res);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INVEST_ACTIVITY_TASK_FAILURE,
          payload: err,
        });
      });
  };

  export const getTeamInvestor = (userId,pageNo) => (dispatch) => {
 
    dispatch({
      type: types.GET_TEAM_INVESTOR_REQUEST,
    });
    axios
      .get(`${base_url}/investor/teams/${userId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_INVESTOR_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_TEAM_INVESTOR_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong, reach out to support!',
          showConfirmButton: false,
        timer: 1500,
        })
      });
  };
  export const ClearReducerDataOfInvestor = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_INVESTOR,
    });
  };

  export const handleInvestorContModal=(modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_CONT_MODAL,
      payload: modalProps,
    });
  };
  

  export const getInvestorDeals = (investorId) => (dispatch) => {
 
    dispatch({
      type: types.GET_INVESTOR_DEALS_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/investorOpportunity/details/investor/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_DEALS_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_DEALS_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const getDialCode = (investorId) => (dispatch) => {
 
    dispatch({
      type: types.GET_DIAL_CODE_REQUEST,
    });
    axios
      .get(`${base_url}/countries/all/dail-code/list`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DIAL_CODE_SUCCESS,
          payload: res.data,
        })
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_DIAL_CODE_FAILURE,
          payload: err,
        });
      });
  };

  export const handleInvestorPulseDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_PULSE_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const handleInvestorDocumentModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_DOCUMENT_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const getInvestorOppValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_OPP_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/opportunity/count/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_INVESTOR_OPP_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_OPP_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getWonInvestorOppValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_WON_INVESTOR_OPP_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/opportunity/won/count/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_WON_INVESTOR_OPP_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_WON_INVESTOR_OPP_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorPipeLineValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_PIPELINE_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/opportunity/proposal/value/count/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_INVESTOR_PIPELINE_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_PIPELINE_VALUE_FAILURE,
          payload: err,
        });
      });
  };


  export const getWonInvestorPipeLineValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_WON_INVESTOR_PIPELINE_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/opportunity/won/proposal/value/count/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_WON_INVESTOR_PIPELINE_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_WON_INVESTOR_PIPELINE_VALUE_FAILURE,
          payload: err,
        });
      });
  };
  export const getInvestorWeightedValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_WEIGHTED_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/opportunity/weighted/value/count/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_INVESTOR_WEIGHTED_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_WEIGHTED_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getWonInvestorWeightedValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_WON_INVESTOR_WEIGHTED_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/opportunity/won/weighted/value/count/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_WON_INVESTOR_WEIGHTED_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_WON_INVESTOR_WEIGHTED_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorContactValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_CONTACT_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/contact/count/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_INVESTOR_CONTACT_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_CONTACT_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorActivityRecords = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_ACTIVITY_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/investor/activity/record/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_ACTIVITY_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_INVESTOR_ACTIVITY_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const handleDealModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DEAL_MODAL,
      payload: modalProps,
    });
  };

  export const InvestorcreateDeals = (deal, cb) => (dispatch,getState) => {
    const userId = getState().auth.userDetails.userId;
    dispatch({
      type: types.CREATE_INVESTOR_DEAL_REQUEST,
    });
    axios
      .post(`${base_url}/investor/opportunity/save`, deal, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
    
        // dispatch(getLatestOpportunities(userId, startDate, endDate));
        // dispatch(getOpportunitiesByPrice(userId));
        dispatch({
          type: types.CREATE_INVESTOR_DEAL_SUCCESS,
          payload: res.data,
        });
      
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CREATE_INVESTOR_DEAL_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorActivityValue = (investorId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_INVESTOR_ACTIVITY_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/investor/activity/record/${investorId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_INVESTOR_ACTIVITY_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_ACTIVITY_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const handleInvestorActivityJumpstartModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTOR_ACTIVITY_JUMPSTART_MODAL,
      payload: modalProps,
    });
  };

  export const deleteInvestorData = (investorId,userId) => (dispatch) => {
    dispatch({
      type: types.DELETE_INVESTOR_DATA_REQUEST,
    });
    axios
      .delete(`${base_url}/investor/delete/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getInvestor(userId));
        Swal.fire({
          icon: 'success',
          title: 'Investor Deleted Successfully',
          showConfirmButton: false,
          timer: 1500,
        })
        dispatch({
          type: types.DELETE_INVESTOR_DATA_SUCCESS,
          payload: investorId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_INVESTOR_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const handleInvestorPriceDrawer = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_INVESTORPRICE_DRAWER,
      payload: modalProps,
    });
  };

  export const investorShare = (data,) => (dispatch) => {
    dispatch({ type: types.INVESTOR_SHARE_REQUEST });
    axios
      .post(`${base_url}/investor/share/save`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.INVESTOR_SHARE_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully',
          showConfirmButton: false,
          timer: 1500,
          
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.INVESTOR_SHARE_FAILURE,
          payload: err,
        });
      });
  };

  export const investorShareUpdate = (data,investorId) => (dispatch) => {
    dispatch({ type: types.INVESTOR_SHARE_UPDATE_REQUEST });
    axios
      .put(`${base_url}/investor/share/update`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getInvestorShare(investorId));
        dispatch({
          type: types.INVESTOR_SHARE_UPDATE_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Created Successfully',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.INVESTOR_SHARE_UPDATE_FAILURE,
          payload: err,
        });
      });
  };

  export const getInvestorShare = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_INVESTOR_SHARE_REQUEST,
    });
    axios
      .get(`${base_url}/investor/get/all/share-list/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INVESTOR_SHARE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INVESTOR_SHARE_FAILURE,
          payload: err,
        });
      });
  };

  export const getDocumentAlllist = (investorId) => (dispatch) => {
    dispatch({
      type: types.GET_DOCUMENT_ALLLIST_REQUEST,
    });
    axios
      .get(`${base_url}/investor/getDocTypes/${investorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_DOCUMENT_ALLLIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_DOCUMENT_ALLLIST_FAILURE,
          payload: err,
        });
      });
  };

  export const linkInvestorToggle = ( data) => (dispatch) => {
    dispatch({
      type: types.LINK_INVESTOR_TOGGLE_REQUEST,
    });
    axios
    .put(`${base_url}/investor/docType/update`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINK_INVESTOR_TOGGLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_INVESTOR_TOGGLE_FAILURE,
          payload: err,
        });
      })
  };

  export const handleUploadInvestorModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPLOAD_INVESTOR_MODAL,
      payload: modalProps,
    });
  };
  
  export const uploadInvestorList = (data,userId) => (dispatch) => {
    dispatch({ type: types.UPLOAD_INVESTOR_LIST_REQUEST });
    axios
      .post(`${base_url}/excel/import/investor`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {

        //dispatch(getInvestorsbyId(userId, "0","creationdate"))
        dispatch({
          type: types.UPLOAD_INVESTOR_LIST_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Uploaded Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPLOAD_INVESTOR_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const reinstateToggleForInvestor = (data, investorId) => (
    dispatch
  ) => {
    // debugger;
    dispatch({
      type: types.REINSTATE_TOGGLE_FOR_INVESTOR_REQUEST,
    });
    axios
      .put(`${base_url}/reinitiate/investor/${investorId}`, data,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       // dispatch(getSupplierDeletedCount(orgId))
        dispatch({
          type: types.REINSTATE_TOGGLE_FOR_INVESTOR_SUCCESS,
          payload: investorId,
        });
        Swal.fire({
          icon: 'success',
          title: 'Reinstated Successfully!',
          showConfirmButton: false,
        timer: 1500,
        })
        // message.success("Reinstated Successfully");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REINSTATE_TOGGLE_FOR_INVESTOR_FAILURE,
          payload: err,
        });    
        message.error("Something went wrong")
      });
  };




  export const updateOwnerinvestorById = (data,userId, ) => (dispatch, getState) => {
    const userId1 = getState().auth.userDetails.userId;
    dispatch({
      type: types.UPDATE_INVESTOR_OWNERSHIP_REQUEST,
    });
    axios
      .put(`${base_url}/investor/transfer/${userId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getCustomerListByUserId(userId1,0,"creationdate"));
        // dispatch(getTeamCustomer(userId1,0,));
        dispatch({
          type: types.UPDATE_INVESTOR_OWNERSHIP_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_INVESTOR_OWNERSHIP_FAILURE,
          payload: err,
        });
        // cb && cb("error");
      });
  }