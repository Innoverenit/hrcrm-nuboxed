import * as types from "./LeadsActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,sub_url } from "../../Config/Auth";
import Swal from 'sweetalert2'

export const setLeadsViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_LEADS_VIEW_TYPE,
      payload: viewType,
    });
  };
  export const handleLeadsModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_MODAL,
      payload: modalProps,
    });
  };



  export const handleLeadsSubscriptionModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_SUBSCRIPTION_DRAWER_MODAL,
      payload: modalProps,
    });
  };


  export const handleLeadsImportModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_IMPORT_MODAL,
      payload: modalProps,
    });
  };

  export const handleLeadsConfirmationModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_CONFIRMATION_MODAL,
      payload: modalProps,
    });
  };

  export const addLeads = (leads) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;
  
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add leads");
    dispatch({
      type: types.ADD_LEADS_REQUEST,
    });
  
    axios
      .post(`${base_url}/leads`, leads, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Lead created Successfully!',
      
        })
        dispatch(getOpportunityRecord(userId));
        console.log(res);
        const startDate = dayjs()
          .startOf("month")
          .toISOString();
        const endDate = dayjs()
          .endOf("month")
          .toISOString();
        dispatch(getLeadsRecords(userId));
  
        dispatch({
          type: types.ADD_LEADS_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_FAILURE,
          payload: err,
        });
        // cb && cb();
      });
  };
 
  export const getLeads = (userId,pageNo,filter) => (dispatch) => {
 
    dispatch({
      type: types.GET_LEADS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/User/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadsHot = (userId,pageNo,filter,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_LEADS_HOT_REQUEST,
    });
    axios
      .get(`${base_url}/leads/User/${userId}/${pageNo}/${filter}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_HOT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_HOT_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadsWarm = (userId,pageNo,filter,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_LEADS_WARM_REQUEST,
    });
    axios
      .get(`${base_url}/leads/User/${userId}/${pageNo}/${filter}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_WARM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_WARM_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadsCold = (userId,pageNo,filter,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_LEADS_COLD_REQUEST,
    });
    axios
      .get(`${base_url}/leads/User/${userId}/${pageNo}/${filter}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_COLD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_COLD_FAILURE,
          payload: err,
        });
      });
  };



  export const getCrm = () => (dispatch) => {
 
    dispatch({
      type: types.GET_CRM_REQUEST,
    });
    axios
      .get(`${base_url}/employee/user-list/drop-down/crm`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CRM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CRM_FAILURE,
          payload: err,
        });
      });
  };

  export const setClearbitData = (data) => (dispatch) => {
    dispatch({
      type: types.SET_CLEARBIT_DATA,
      payload: data,
    });
  };
  export const convertCustomerStatus = (data, leadsId,assignedToId) => (
    dispatch,
    getState
  ) => {
    // debugger;
    const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.CONVERT_CUSTOMER_STATUS_REQUEST,
    });
    axios
      .put(`${base_url}/leads/convert/${leadsId}/${assignedToId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Lead converted Successfully!',
       
        })
        dispatch(getLeads(userId));
        // dispatch(getLeadsRecords(userId));
        dispatch({
          type: types.CONVERT_CUSTOMER_STATUS_SUCCESS,
          payload: leadsId,
        });
        // Swal.fire({
        //   icon: 'success',
        //   fontSize:"2rem",
        //   title: 'Lead Qualified Succefully!',
        //   showConfirmButton: false,
        //   timer: 4000
        // })
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CONVERT_CUSTOMER_STATUS_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
      });
  };
  export const deleteLeadsData = (leadsId,userId) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // console.log("inside deleteCall", callId);
    dispatch({
      type: types.DELETE_LEADS_DATA_REQUEST,
    });
    axios
      .delete(`${base_url}/leads/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Lead Deleted Successfully!',
      
        })
        console.log(res);
        dispatch(getLeadsRecords(userId));
        dispatch({
          type: types.DELETE_LEADS_DATA_SUCCESS,
          payload: leadsId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LEADS_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadDetailsById = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_LEAD_DETAILS_BY_ID_REQUEST,
    });
    axios
      .get(`${base_url}/leads/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEAD_DETAILS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LEAD_DETAILS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const setEditLeads = (name) => (dispatch) => {
    dispatch({
      type: types.SET_LEADS_EDIT,
      payload: name,
    });
  };

  export const handleUpdateLeadsModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_MODAL,
      payload: modalProps,
    });
  };

  export const updateLeads = (data, leadsId) => (dispatch) => {
    dispatch({ type: types.UPDATE_LEADS_BY_ID_REQUEST });
    axios
      .put(`${base_url}/leads/${leadsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Lead Info  updated Successfully!',
       
        })
        console.log(res);
        dispatch({
          type: types.UPDATE_LEADS_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
    
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const handleLeadsEmailDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_EMAIL_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const handleLeadsContactModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_CONTACT_MODAL,
      payload: modalProps,
    });
  };

  export const addLeadsContact = (contact) => (dispatch, getState) => {
    // const userId = getState().auth.userDetails.userId;
    const customerId = getState().customer.customer.customerId;
    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add contact");
    dispatch({
      type: types.ADD_LEADS_CONTACT_REQUEST,
    });
  
    axios
      .post(`${base_url}/leads/contact`, contact, {
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
        
  
        dispatch({
          type: types.ADD_LEADS_CONTACT_SUCCESS,
          payload: res.data,
        });
        
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_CONTACT_FAILURE,
          payload: err,
        });
       
      });
  };

  export const getContactListByLeadsId = (leadsId) => (dispatch) => {
    console.log(leadsId);
    dispatch({
      type: types.GET_LEADS_CONTACT_REQUEST,
    });
    axios
      .get(`${base_url}/leads/contacts/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_CONTACT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_CONTACT_FAILURE,
          payload: err,
        });
      });
  };
  export const handleUpdateLeadsContactModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_CONTACT_MODAL,
      payload: modalProps,
    });
  };

  export const setEditLeadsContact = (name) => (dispatch) => {
    dispatch({
      type: types.SET_EDIT_LEADS_CONTACT,
      payload: name,
    });
  };

  export const updateLeadsContact = (data, contactId) => (dispatch) => {
    dispatch({ type: types.UPDATE_LEADS_CONTACT_BY_ID_REQUEST });
    axios
      .put(`${base_url}/leads/contact/update/${contactId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LEADS_CONTACT_BY_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_CONTACT_BY_ID_FAILURE,
          payload: err,
        });
      });
  };
  export const handleLeadsOpportunityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_OPPORTUNITY_MODAL,
      payload: modalProps,
    });
  };

  export const addLeadsOpportunity = (opportunity,leadsId, cb) => (
    dispatch,
    getState
  ) => {
    // const userId = getState().auth.userDetails.userId;
    //const customerId = getState().customer.customer.customerId;
    dispatch({
      type: types.ADD_LEADS_OPPORTUNITY_REQUEST,
    });
    axios
      .post(`${base_url}/leads/opportunity`, opportunity, {
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
        dispatch(getOpportunityListByLeadsId(leadsId));
        dispatch({
          type: types.ADD_LEADS_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };

  export const getOpportunityListByLeadsId = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_OPPORTUNITY_REQUEST,
    });
    axios
      .get(`${base_url}/leads/opportunity/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };

  export const handleUpdateLeadsOpportunityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_OPPORTUNITY_MODAL,
      payload: modalProps,
    });
  };

  export const setEditLeadsOpportunity = (name) => (dispatch) => {
    dispatch({
      type: types.SET_EDIT_LEADS_OPPORTUNITY,
      payload: name,
    });
  };

  export const handleLeadsDocumentUploadModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_DOCUMENT_UPLOAD_MODAL,
      payload: modalProps,
    });
  };

  export const handleLeadsReactSpeechModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_REACT_SPEECH_MODAL,
      payload: modalProps,
    });
  };

  export const addLeadsDocument = (data, cb) => (dispatch) => {
    console.log(data);
    dispatch({ type: types.ADD_LEADS_DOCUMENT_REQUEST });
    axios
      .post(`${base_url}/leads/document`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.ADD_LEADS_DOCUMENT_SUCCESS,
          payload: res.data,
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_DOCUMENT_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadsDocument = (leadsId) => (dispatch) => {
    dispatch({ type: types.GET_LEADS_DOCUMENTS_REQUEST });
    axios
      .get(`${base_url}/leads/document/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_DOCUMENTS_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LEADS_DOCUMENTS_FAILURE,
          payload: err,
        });
      });
  };

  export const addInitiativeByLeadsId = (data,leadsId) => (dispatch) => {
    // console.log(customerId);
    dispatch({
      type: types.ADD_INITIATIVE_BY_LEADS_ID_REQUEST,
    });
    axios
      .post(`${base_url}/leads/innitiative`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getInitiativeByLeadsId(leadsId));
        dispatch({
          type: types.ADD_INITIATIVE_BY_LEADS_ID_SUCCESS,
          payload: res.data,
        });
       // cb && cb("success")
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INITIATIVE_BY_LEADS_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const getInitiativeByLeadsId = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_INITIATIVE_BY_LEADS_ID_REQUEST,
    });
    axios
      .get(`${base_url}/leads/innitiative/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INITIATIVE_BY_LEADS_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INITIATIVE_BY_LEADS_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const deleteLeadsDocument = (documentId) => (dispatch, getState) => {
    console.log("inside deleteDocument", documentId);
    // const { opportunityId } = getState("opportunity").opportunity.opportunity;
    dispatch({
      type: types.DELETE_LEADS_DOCUMENT_REQUEST,
    });
  
    axios
      .delete(`${base_url}/leads/document/${documentId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.DELETE_LEADS_DOCUMENT_SUCCESS,
          payload: documentId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LEADS_DOCUMENT_FAILURE,
          payload: err,
        });
      });
  };

  export const addLeadsNote = (note, cb) => (dispatch) => {
    dispatch({ type: types.ADD_LEADS_NOTES_REQUEST });
    axios
      .post(`${base_url}/leads/notes`, note, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_LEADS_NOTES_SUCCESS,
          payload: res.note,
        });
        console.log(res);
        cb && cb();
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_LEADS_NOTES_FAILURE,
          payload: err,
        });
        console.log(err);
        cb && cb();
      });
  };

  

  export const getNotesListByLeadsId = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_NOTES_LIST_BY_LEADS_ID_REQUEST,
    });
    axios
      .get(`${base_url}/leads/note/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_NOTES_LIST_BY_LEADS_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NOTES_LIST_BY_LEADS_ID_FAILURE,
          payload: err,
        });
      });
  };

  export const handleUpdateLeadsInitiativeModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_UPDATE_LEADS_INITIATIVE_MODAL,
      payload: modalProps,
    });
  };
  export const setEditLeadsInitiative = (name) => (dispatch) => {
    dispatch({
      type: types.SET_EDIT_LEADS_INITIATIVE,
      payload: name,
    });
  };

  export const updateLeadsOpportunity = (data, opportunityId) => (dispatch) => {
    dispatch({
      type: types.UPDATE_LEADS_OPPORTUNITY_REQUEST,
    });
    axios
      .put(`${base_url}/leads/opportunity/update/${opportunityId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getOpportunityListByLeadsId(leadsId));
        dispatch({
          type: types.UPDATE_LEADS_OPPORTUNITY_SUCCESS,
          payload: res.data,
        });
      })
  
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_OPPORTUNITY_FAILURE,
          payload: err,
        });
      });
  };
  export const updateLeadsInitiative = (data, initiativeDetailsId) => (dispatch) => {
    dispatch({ type: types.UPDATE_LEADS_INITIATIVE_REQUEST });
    axios
      .put(`${base_url}/leads/initiative/update/${initiativeDetailsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.UPDATE_LEADS_INITIATIVE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LEADS_INITIATIVE_FAILURE,
          payload: err,
        });
      });
  };

  export const addLeadsSkill = (data,leadsId) => (dispatch) => {
    // console.log(customerId);
    dispatch({
      type: types.ADD_LEADS_SKILL_REQUEST,
    });
    axios
      .post(`${base_url}/leads/skillSet`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getLeadsSkill(leadsId));
        dispatch({
          type: types.ADD_LEADS_SKILL_SUCCESS,
          payload: res.data,
        });
       // cb && cb("success")
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_SKILL_FAILURE,
          payload: err,
        });
      });
  };

  export const getLeadsSkill = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_SKILL_REQUEST,
    });
    axios
      .get(`${base_url}/leads/skillSet/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_SKILL_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LEADS_SKILL_FAILURE,
          payload: err,
        });
      });
  };

  export const deleteLeadsSkill = (leadsSkillLinkId, leadsId) => (
    dispatch
  ) => {
    dispatch({
      type: types.DELETE_LEADS_SKILL_REQUEST,
    });
    axios
      .delete(`${base_url}/leads/skillsset/${leadsSkillLinkId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.DELETE_LEADS_SKILL_SUCCESS,
          payload: res.data,
        });
        dispatch(getLeadsSkill(leadsId));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_LEADS_SKILL_FAILURE,
          payload: err,
        });
      });
  };


  export const inputLeadsDataSearch =(name,type)=>(dispatch)=>{
    dispatch({
      type: types.INPUT_LEADS_SEARCH_DATA_REQUEST,
    });
    axios.get(`${base_url}/leads/search/alltype/${name}/${type}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res)=>{
      dispatch({
        type:types.INPUT_LEADS_SEARCH_DATA_SUCCESS,
        payload:res.data,
      });
    })
    .catch((err)=>{
      dispatch({
    type:types.INPUT_LEADS_SEARCH_DATA_FAILURE,
    payload:err,
      });
    });
  };
  
  export const getLeadsPermissionsList = () => (dispath) => {
    dispath({ type: types.GET_LEADS_PERMISSIONS_LIST_REQUEST });
    axios
      .get(`${base_url}/permission/type?type=${"leads"}`, 
      // {
      //   headers: {
      //     Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      //   },
      // }
      )
      .then((res) => {
        dispath({
          type: types.GET_LEADS_PERMISSIONS_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispath({
          type: types.GET_LEADS_PERMISSIONS_LIST_FAILURE,
          payload: err,
        });
      });
  };
  export const shareLeadsPermission = (data, userId,a) => (
    dispatch,
    getState
  ) => {
    // const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.ADD_SHARE_LEADS_PERMISSION_REQUEST,
    });
  
    axios
      .post(`${base_url}/permission/details`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        if (a === "All") {
          // dispatch(getAllOpportunityListByUserId());
          // dispatch(getRecords(userId));
          // dispatch(getAllRecords(userId));
        } else {
        dispatch(getLeads(userId));
        // dispatch(getRecords(userId));
        }
        dispatch({
          type: types.ADD_SHARE_LEADS_PERMISSION_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_SHARE_LEADS_PERMISSION_FAILURE,
          payload: err,
        });
        // cb && cb("failure");
      });
  };
  export const updateTypeForLead = (leadsId,type,data) => (dispatch,getState) => {
    const { userId } = getState("auth").auth.userDetails;

    dispatch({ type: types.UPDATE_TYPE_FOR_LEAD_REQUEST });
    axios
      .put(
        `${base_url}/leads/type/update/${leadsId}/${type}`,data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
      .then((res) => {
        dispatch(getLeadsHot(userId,"0","creationdate","hot"));
        dispatch(getLeadsWarm(userId,"0","creationdate","warm"));
        dispatch(getLeadsCold(userId,"0","creationdate","cold"));
        // dispatch(getTeamLeadsHot(userId,"0","hot"));
        // dispatch(getTeamLeadsWarm(userId,"0","warm"));
        // dispatch(getTeamLeadsCold(userId,"0","cold"));
        // dispatch(getAllLeadsHot("0","creationdate","hot"));
        // dispatch(getAllLeadsWarm("0","creationdate","warm"));
        // dispatch(getAllLeadsCold("0","creationdate","cold"));

        dispatch({
          type: types.UPDATE_TYPE_FOR_LEAD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.UPDATE_TYPE_FOR_LEAD_FAILURE,
          payload:err
        });
      });
  };

  export const getJunkedLeads = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_JUNKED_LEADS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/junked/list/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_JUNKED_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_JUNKED_LEADS_FAILURE,
          payload: err,
        });
      });
  };
  export const getLeadsRecords = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/record/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const getJunkedLeadsRecords = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_JUNKED_LEADS_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/junked/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_JUNKED_LEADS_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_JUNKED_LEADS_RECORDS_FAILURE,
          payload: err,
        });
      });
  };
  
  export const reInstateJunkLeads = (leadsId,data) => (dispatch) => {
    dispatch({ type: types.REINSTATE_JUNKED_LEADS_REQUEST });
    axios
      .put(`${base_url}/leads/reinstate/${leadsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.REINSTATE_JUNKED_LEADS_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Reinstated Successfully',
      
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REINSTATE_JUNKED_LEADS_FAILURE,
          payload: err,
        });
      });
  };

  export const handleCETmodal= (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CET_MODAL,
      payload: modalProps,
    });
  }

  export const getCallListbyLeads = (leadsId,pageNo) => (dispatch) => {
    dispatch({
      type: types.GET_CALL_LIST_BY_REQUEST,
    });
    axios
      .get(`${base_url}/call/leads/${leadsId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CALL_LIST_BY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CALL_LIST_BY_FAILURE,
          payload: err,
        });
      });
  };

  export const handleLeadCallModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_CALL_MODAL,
      payload: modalProps,
    });
  };

  export const getCallTimeline = (leadsId) => (dispatch) => {
    dispatch({
        type: types.GET_CALL_TIMELINE_REQUEST,
    });
  
    axios
        .get(`${base_url}/leads/activity/list/${leadsId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_CALL_TIMELINE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_CALL_TIMELINE_FAILURE,
                payload: err,
            });
        });
  };

  export const handleLeadsNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const getAllLeads = (pageNo,filter) => (dispatch) => {
 
    dispatch({
      type: types.GET_ALL_LEADS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/all/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_LEADS_FAILURE,
          payload: err,
        });
      });
  };

  export const getAllLeadsHot = (pageNo,filter,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_ALL_LEADSHOT_REQUEST,
    });
    axios
      .get(`${base_url}/leads/all/${pageNo}/${filter}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_LEADSHOT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_LEADSHOT_FAILURE,
          payload: err,
        });
      });
  };

  export const getAllLeadsWarm = (pageNo,filter,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_ALL_LEADSWARM_REQUEST,
    });
    axios
      .get(`${base_url}/leads/all/${pageNo}/${filter}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_LEADSWARM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_LEADSWARM_FAILURE,
          payload: err,
        });
      });
  };

  export const getAllLeadsCold = (pageNo,filter,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_ALL_LEADSCOLD_REQUEST,
    });
    axios
      .get(`${base_url}/leads/all/${pageNo}/${filter}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_LEADSCOLD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_LEADSCOLD_FAILURE,
          payload: err,
        });
      });
  };

  export const convertLeads = (data,leadsId,assignedToId) => (
    dispatch,
    getState
  ) => {
    // debugger;
    const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.CONVERT_LEADS_REQUEST,
    });
    axios
      .put(`${base_url}/leads/convert/${leadsId}/${assignedToId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getLeads(userId));
        dispatch(getLeadsRecords(userId));
        dispatch({
          type: types.CONVERT_LEADS_SUCCESS,
          payload: res.data,
        });
       
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CONVERT_LEADS_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
      });
  };

  export const getTeamLeads = (userId,pageNo) => (dispatch) => {
 
    dispatch({
      type: types.GET_TEAM_LEADS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/teams/${userId}/${pageNo}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_TEAM_LEADS_FAILURE,
          payload: err,
        });
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Something went wrong , reach out to support!',
        // })
      });
  };

  export const getTeamLeadsHot = (userId,pageNo,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_TEAM_LEADSHOT_REQUEST,
    });
    axios
      .get(`${base_url}/leads/teams/${userId}/${pageNo}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_LEADSHOT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_TEAM_LEADSHOT_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong , reach out to support!',
        })
      });
  };

  export const getTeamLeadsWarm = (userId,pageNo,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_TEAM_LEADSWARM_REQUEST,
    });
    axios
      .get(`${base_url}/leads/teams/${userId}/${pageNo}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_LEADSWARM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_TEAM_LEADSWARM_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong , reach out to support!',
        })
      });
  };

  export const getTeamLeadsCold = (userId,pageNo,type) => (dispatch) => {
 
    dispatch({
      type: types.GET_TEAM_LEADSCOLD_REQUEST,
    });
    axios
      .get(`${base_url}/leads/teams/${userId}/${pageNo}/${type}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_LEADSCOLD_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_TEAM_LEADSCOLD_FAILURE,
          payload: err,
        });
        Swal.fire({
          icon: 'error',
          title: 'Something went wrong , reach out to support!',
        })
      });
  };


  export const addLeadsActivityCall = (call,leadsId) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.ADD_LEADS_ACTIVITY_CALL_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/call/save`, call, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getCallTimeline(leadsId));    
        dispatch({
          type: types.ADD_LEADS_ACTIVITY_CALL_SUCCESS,
          payload: res.data,
        });
        Swal({
          icon: 'success',
          title: 'Call has been added successfully!',
        })
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_ACTIVITY_CALL_FAILURE,
          payload: err,
        });
        // cb();
      });
  };

  export const addLeadsActivityEvent = (event,leadsId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_LEADS_ACTIVITY_EVENT_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/event/save`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getCallTimeline(leadsId));
        // dispatch(getEventListRangeByUserId(userId,0));
        dispatch({
          type: types.ADD_LEADS_ACTIVITY_EVENT_SUCCESS,
          payload: res.data,
        });
        Swal({
          icon: 'success',
          title: 'Meeting has been added successfully!',
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_ACTIVITY_EVENT_FAILURE,
          payload: err,
        });
        // cb();
      });
  };

  export const addLeadsActivityTask = (event,leadsId, cb) => (dispatch, getState) => {
    dispatch({
      type: types.ADD_LEADS_ACTIVITY_TASK_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/task/create`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getCallTimeline(leadsId));
        dispatch({
          type: types.ADD_LEADS_ACTIVITY_TASK_SUCCESS,
          payload: res.data,
        });
        Swal({
          icon: 'success',
          title: 'Task has been added successfully!',
        })
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_ACTIVITY_TASK_FAILURE,
          payload: err,
        });
        // cb();
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

  export const getLeadsTeamRecords = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_TEAM_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/teams/count/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_TEAM_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_TEAM_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const ClearReducerDataOfLead = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_LEAD,
    });
  };

  export const emptyLeads = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_LEADS_LIST, 
    });
  };

  export const getLeadsActivityRecords = (leadsId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_ACTIVITY_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/activity/record/${leadsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_ACTIVITY_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_ACTIVITY_RECORDS_FAILURE,
          payload: err,
        });
      });
  };



  export const addLeadsImportForm =
  (customer, userId) => (dispatch, getState) => {
    //const userId = getState().auth.userDetails.userId;

    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add customer");
    dispatch({
      type: types.ADD_LEADS_IMPORT_FORM_REQUEST,
    });

    axios
      .post(`${base_url}/excel/import/leads`, customer, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
      //dispatch(getLeads(userId));

       window.location.reload()
        // dispatch(getRecords(userId));
        // dispatch(getLatestCustomers(userId, startDate, endDate));
        // dispatch(getCustomerListByUserId(userId));

        dispatch({
          type: types.ADD_LEADS_IMPORT_FORM_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LEADS_IMPORT_FORM_FAILURE,
          payload: err,
        });
        // cb && cb();
      });
  };

  export const getLeadsAllRecords = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LEADS_ALL_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/leads/all/record/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_ALL_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_ALL_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const handleLeadsNoteDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_LEADS_NOTE_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const getNotesListOfLeads = (type,id) => (dispatch) => {
    dispatch({
      type: types.GET_NOTES_LIST_LEADS_REQUEST,
    });
    axios
      .get(`${base_url}/todo/activity/notes/${type}/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_NOTES_LIST_LEADS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_NOTES_LIST_LEADS_FAILURE,
          payload: err,
        });
      });
  };

  export const addNote = (note,type,id, cb) => (dispatch) => {
    dispatch({ type: types.ADD_LEAD_NOTES_REQUEST });
    axios
      .post(`${base_url}/todo/activity/notes/${type}/${id }`, note, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch({
          type: types.ADD_LEAD_NOTES_SUCCESS,
          payload: res.note,
        });
        console.log(res);
        cb && cb();
      })
      .catch((err) => {
        dispatch({
          type: types.ADD_LEAD_NOTES_FAILURE,
          payload: err,
        });
        console.log(err);
        cb && cb();
      });
  };

  export const removeLeadsNote = (data,leadsId) => (dispatch) => {
    dispatch({
      type: types.REMOVE_LEADS_NOTE_REQUEST,
    });
    axios
      .put(`${base_url}/employee/delete/notes`,data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getCallTimeline(leadsId));
        dispatch({
          type: types.REMOVE_LEADS_NOTE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
    
        dispatch({
          type: types.REMOVE_LEADS_NOTE_FAILURE,
          payload: err,
        });
      });
  };
  export const updateLeadsNote = (data,leadsId) => (dispatch) => {
    dispatch({
      type: types.UPDATE_LEADS_NOTE_REQUEST,
    });
    axios
      .put(`${base_url}/employee/notes`,data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getCallTimeline(leadsId));
        dispatch({
          type: types.UPDATE_LEADS_NOTE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
    
        dispatch({
          type: types.UPDATE_LEADS_NOTE_FAILURE,
          payload: err,
        });
      });
  };

  
  export const updateLeadsNoteDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.UPDATE_LEADS_NOTE_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const emptyClearbit = () => (dispatch) => {
    dispatch({
      type: types.EMPTY_CLEARBIT_TABLE,
      
    });
  };

  export const updateLeadsNoteDrawer = (modalProps) => (dispatch) => {
    dispatch({
      type: types.UPDATE_LEADS_NOTE_MODAL,
      payload: modalProps,
    });
  };

  export const ClearSearchedDataOfLead = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_SEARCHED_DATA_LEAD,
    });
  };



  export const getLeadSubscriptionData = (orgId) => (dispatch) => {
 
    dispatch({
      type: types.GET_LEADS_SUBSCRIPTION_DATA_REQUEST,
    });
    axios
      .get(`${sub_url}/subscription/getAll/publish/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LEADS_SUBSCRIPTION_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_LEADS_SUBSCRIPTION_DATA_FAILURE,
          payload: err,
        });
      });
  };
  

