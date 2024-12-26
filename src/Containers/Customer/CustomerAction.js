import * as types from "./CustomerActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url,base_url2 } from "../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'

/**
 * Customer modal action
 */
export const handleCustomerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_MODAL,
    payload: modalProps,
  });
};



export const emptyClearbit = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_CLEARBIT_TABLE,
    
  });
};

export const handleCustomerProjectModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_PROJECT_MODAL,
    payload: modalProps,
  });
};

export const emptyCustomer = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_CUSTOMER_TABLE,
    
  });
};


export const handleCustomerReactSpeechModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_REACT_SPEECH_MODAL,
    payload: modalProps,
  });
};

export const setCustomerViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_CUSTOMER_VIEW_TYPE,
    payload: viewType,
  });
};
/**
 * Customer Contact modal action
 */
export const handleCustomerContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_CONTACT_MODAL,
    payload: modalProps,
  });
};

/**
 * request for adding a contact
 */
export const addCustomer = (customer) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_CUSTOMER_REQUEST,
  });

  axios
    .post(`${base_url}/customer`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Prospect created Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect created Successfully!',
      //   showConfirmButton: false,
      //   // timer: 1500
      // })
      console.log(res);
      // dispatch(
      //   linkCustomersToOpportunity(opportunityId, { CustomerIds: [res.data] }, cb)
      // );
      // message.success(res.data.message)
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      dispatch(getRecords(userId));
      dispatch(getOpportunityRecord(userId));
      // dispatch(getLatestCustomers(userId, startDate, endDate));
      // dispatch(getCustomerListByUserId(userId));

      dispatch({
        type: types.ADD_CUSTOMER_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_FAILURE,
        payload: err,
      });
      message.error(err.data.message)
      // cb && cb();
    });
};

/**
 * get all the customer of the user
 */
export const getCustomerListByUserId = (userId,pageNo,filter) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_CUSTOMERS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/user/${userId}/${pageNo}/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMERS_FAILURE,
        payload: err,
      });
    });
};



export const getCustomerData = (userId,page) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMERS_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/customer/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMERS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMERS_DATA_FAILURE,
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

export const getAllCustomerListByUserId = () => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_ALL_CUSTOMERS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/all-customer`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_CUSTOMERS_FAILURE,
        payload: err,
      });
    });
};

/**
 * get a specific Customer of the user with the CustomerId
 */
export const getCustomerById = (customerId) => (dispatch) => {
  console.log("inside add Customer");
  dispatch({
    type: types.GET_CUSTOMER_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_BY_ID_FAILURE,
        payload: err,
      });
    });
};


export const getCustomerPagination = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_PAGINATION_REQUEST,
  });
  axios
    .get(`${base_url}/permission/customer/details/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_PAGINATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_PAGINATION_FAILURE,
        payload: err,
      });
    });
};

//Customer Details
export const getCustomerDetailsById = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_DETAILS_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_DETAILS_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_DETAILS_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//Document

export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

export const handleInvoiceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_INVOICE_MODAL,
    payload: modalProps,
  });
};

export const handleCallActivityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CALL_ACTIVITY_MODAL,
    payload: modalProps,
  });
};

export const deleteDocument = (documentId,type) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/document/delete/${documentId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.DELETE_DOCUMENT_SUCCESS,
        payload: documentId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * add a note
 */
export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_CUSTOMER_NOTES_REQUEST });
  axios
    .post(`${base_url}/customer/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_CUSTOMER_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CUSTOMER_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};
/**
 * get Customer Notes
 */
export const getNotesListByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/note/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * Update Customer Modal
 */
export const handleUpdateCustomerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_MODAL,
    payload: modalProps,
  });
};
export const handleUpdateCustomerInitiativeModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_INITIATIVE_MODAL,
    payload: modalProps,
  });
};

export const setEditCustomer = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CUSTOMER_EDIT,
    payload: name,
  });
};


export const setEditCustomerCard = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CUSTOMER_CARD_EDIT,
    payload: name,
  });
};

/**
 * update a customer using put request
 */
export const updateCustomer = (data, customerId) => (dispatch) => {
  dispatch({ type: types.UPDATE_CUSTOMER_BY_ID_REQUEST });
  axios
    .put(`${base_url}/customer/row-edit/${customerId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Prospect Info updated Successfully!',
        // showConfirmButton: false,
        // timer: 1500
      })
      console.log(res);
      dispatch({
        type: types.UPDATE_CUSTOMER_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_BY_ID_FAILURE,
        payload: err,
      });
    });
};


export const updateDocument = (data, documentId) => (dispatch) => {
  dispatch({ type: types.UPDATE_DOCUMENT_BY_ID_REQUEST });
  axios
    .put(`${base_url}/document/update/${documentId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Prospect Info updated Successfully!',
        // showConfirmButton: false,
        // timer: 1500
      })
      console.log(res);
      dispatch({
        type: types.UPDATE_DOCUMENT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DOCUMENT_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * add document to a customer
 */
export const addCustomerDocument = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_CUSTOMER_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/document/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_CUSTOMER_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

export const documentUpload = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_HOSPITAL_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/document/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_HOSPITAL_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_HOSPITAL_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

/**
 * get documents of an customer
 */
export const getCustomerDocument = (id,type) => (dispatch) => {
  dispatch({ type: types.GET_CUSTOMER_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/document/get/${id}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const getDocumentCount = (id,type) => (dispatch) => {
  dispatch({ type: types.GET_DOCUMENTS_COUNT_REQUEST });
  axios
    .get(`${base_url}/document/count/${id}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DOCUMENTS_COUNT_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DOCUMENTS_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getselectdrop = (orgId) => (dispatch) => {
  dispatch({ type: types.GET_SELECT_DROP_REQUEST });
  axios
    .get(`${base_url}/employee/active/user/drop-down/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SELECT_DROP_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SELECT_DROP_FAILURE,
        payload: err,
      });
    });
};

/*request for adding a customer  opportunity */
export const addCustomerOpportunity = (opportunity,userId, cb) => (
  dispatch,
  getState
) => {
  // const userId = getState().auth.userDetails.userId;
  const customerId = getState().customer.customer.customerId;
  dispatch({
    type: types.ADD_CUSTOMER_OPPORTUNITY_REQUEST,
  });
  axios
    .post(`${base_url}/customer/opportunity`, opportunity, {
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
      // dispatch(getOpportunityListByCustomerId(customerId));
      // dispatch(getOpportunityRecord(userId));
      // dispatch(getLatestOpportunities(userId, startDate, endDate));
      // dispatch(getOpportunitiesByPrice(userId));
      dispatch({
        type: types.ADD_CUSTOMER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};
/*get all the opportunity of the customer */
export const getOpportunityListByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/customer/opportunity/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

//updateCustomerOpportunity
export const updateCustomerOpportunity = (data, opportunityId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_CUSTOMER_OPPORTUNITY_REQUEST,
  });
  axios
    .put(`${base_url}/customer/opportunity/${opportunityId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getOpportunityListByCustomerId(customerId));
      dispatch({
        type: types.UPDATE_CUSTOMER_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })

    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

/**
 * request for adding a contact
 */
export const addCustomerContact = (contact,userId) => (dispatch, getState) => {
  // const userId = getState().auth.userDetails.userId;
  const customerId = getState().customer.customer.customerId;
  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add contact");
  dispatch({
    type: types.ADD_CUSTOMER_CONTACT_REQUEST,
  });

  axios
    .post(`${base_url}/contact`, contact, {
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
          timer: 1500
        });
      } else {
       
        Swal.fire({
          icon: 'success',
          title: 'Contact created Successfully',
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(res);
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
 
      dispatch({
        type: types.ADD_CUSTOMER_CONTACT_SUCCESS,
        payload: res.data,
      });
    
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

/*get all the contact of the customer */
export const getContactListByCustomerId = (id,type) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/contact/get/${id}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_CONTACT_FAILURE,
        payload: err,
      });
    });
};
/**
 * Customer Opportunity modal action
 */
export const handleCustomerOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};

export const handleCustomerProjectDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_PROJECT_DRAWER,
    payload: modalProps,
  });
};
export const handleUpdateCustomerOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};
export const handleUpdateCustomerContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const setSelectedTodoTimeIntervalReport = (selectedTodoTime) => (dispatch) => {
  //console.log(selectedTime);
  dispatch({
    type: types.CHANGE_SELECTED_TODO_TIME_INTERVAL_REPORT,
    payload: selectedTodoTime,
  });
};

//SEARCH
export const inputCustomerDataSearch = (name,type) => (dispatch) => {
  dispatch({
    type: types.INPUT_CUSTOMER_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/customer/search/alltype/${name}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.customerId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_CUSTOMER_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Customer list is empty");
      dispatch({
        type: types.INPUT_CUSTOMER_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
}; 

//CONTACT PERMISSION SHARE Of Partner
export const shareCustomerPermission = (data, userId, a) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_CUSTOMER_PERMISSION_REQUEST,
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
        dispatch(getAllCustomerListByUserId());
        dispatch(getRecords(userId));
      } else {
        dispatch(getCustomerListByUserId(userId));
        dispatch(getRecords(userId));
      }
      dispatch({
        type: types.ADD_SHARE_CUSTOMER_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_CUSTOMER_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

export const getPermissionsListCustomer = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_CUSTOMER_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"customer"}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};

export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getCustomerTeamRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_TEAM_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/teams/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_TEAM_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_TEAM_RECORDS_FAILURE,
        payload: err,
      });
    });
};

// Add Recruit Modal
export const handleRecruitModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUIT_MODAL,
    payload: modalProps,
  });
};

// Add File Recruitment Modal
export const handlefileRecruitModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_FILE_RECRUIT_MODAL,
    payload: modalProps,
  });
};
// Add Profile Modal
export const handleTagProfileModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TAGPROFILE_MODAL,
    payload: modalProps,
  });
};

// recruit add
export const addRecruit = (data, customerId, cb) => (dispatch) => {
  dispatch({ type: types.LINK_RECRUIT_TO_CUSTOMER_REQUEST });

  axios
    .post(`${base_url}/link/recruitment/customer`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      message.success("Requirement added successfully!");
      // dispatch(getRecruitByOpportunityId(opportunityId));
      console.log(res);
      dispatch({
        type: types.LINK_RECRUIT_TO_CUSTOMER_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_TO_CUSTOMER_FAILURE,
      });
      cb && cb();
    });
};

// recruit get
export const getRecruitByCustomerId = (customerId) => (dispatch) => {
  dispatch({ type: types.GET_RECRUIT_TO_CUSTOMER_REQUEST });

  axios
    .get(`${base_url}/link/recruitment/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_RECRUIT_TO_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUIT_TO_CUSTOMER_FAILURE,
      });
    });
};

export const getProfile = (customerId) => (dispatch) => {
  dispatch({ type: types.LINK_PROFILE_TO_CUSTOMER_REQUEST });

  axios
    .get(`${base_url}/link/recruitment/customer/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getProfileByCustomerId(customerId));
      console.log(res);
      dispatch({
        type: types.LINK_PROFILE_TO_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PROFILE_TO_CUSTOMER_FAILURE,
      });
    });
};

export const addRecruitProProfile = (data, cb) => (dispatch) => {
  dispatch({ type: types.ADD_RECRUITMENT_PROFILE_REQUEST });

  axios
    .post(`${base_url}/create/profile `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);

      dispatch({
        type: types.ADD_RECRUITMENT_PROFILE_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_RECRUITMENT_PROFILE_FAILURE,
      });
      cb && cb();
    });
};

export const setCurrentRecruitMentData = (data) => (dispatch) => {
  dispatch({ type: types.SET_CURRENT_RECRUITMENT_DATA, payload: data });
};

export const handleSponsorModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SELECT_SPONSOR_MODAL,
    payload: modalProps,
  });
};

//setEditCustomerOpportunity
export const setEditCustomerOpportunity = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_CUSTOMER_OPPORTUNITY,
    payload: name,
  });
};

export const addAttendence = (attendance,userId) => (dispatch) => {


  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  // console.log("inside add customer");
  dispatch({
    type: types.ADD_ATTENDENCE_REQUEST,
  });

  axios
    .post(`${base_url}/attendance`, attendance, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
         dispatch(getAttendanceList(userId));
      console.log(res);


      dispatch({
        type: types.ADD_ATTENDENCE_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ATTENDENCE_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const putCustomerContactToggle = (contactId,userId,type) => (dispatch) => {
  dispatch({ type: types.PUT_CUSTO_CONTACT_TOGGLE_REQUEST });

  axios
    .put(`${base_url2}/distributor/convert/contactToUser/${contactId}/${userId}/${type}`, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.PUT_CUSTO_CONTACT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.PUT_CUSTO_CONTACT_TOGGLE_FAILURE,
      });
    });
};


export const addLocationDetails = (attendance,userId) => (dispatch) => {


  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  // console.log("inside add customer");
  dispatch({
    type: types.ADD_LOCATION_DETAILS_REQUEST,
  });

  axios
    .put(`${base_url}/attendance/add/location`, attendance, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
         //dispatch(getAttendanceList(userId));
      console.log(res);


      dispatch({
        type: types.ADD_LOCATION_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LOCATION_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};


export const getCustomerListByCategory = (category) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMERS_BY_CATEGORY_REQUEST,
  });
  axios
    .get(`${base_url}/customer/categoryName/${category}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMERS_BY_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMERS_BY_CATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const getCategoryRecords = (category) => (dispatch) => {
  dispatch({
    type: types.GET_CATEGORY_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/customer/record/count/categoryName/${category}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      if (category === "White") {

        dispatch({
          type: types.GET_CATEGORY_RECORDS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: types.GET_CATEGORY_RECORDS_BLUE_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CATEGORY_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const addCommercialsByCustomerId = (data,customerId) => (dispatch) => {
  dispatch({
    type: types.ADD_COMMERCIALS_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/customer/commission`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCommercialsByCustomerId(customerId));
      dispatch({
        type: types.ADD_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_COMMERCIALS_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};
//get Commercials by customerId
export const getCommercialsByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_COMMERCIALS_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/commission/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMERCIALS_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};
//ADD INVOICE
export const addInvoiceByCustomerId = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_INVOICE_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/invoice/customer}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_INVOICE_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INVOICE_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};
//GET INVOICE
export const getInvoiceByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_INVOICE_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .get(`${base_url}customer/invoice/{customerId}/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVOICE_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVOICE_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateOwnercustomerById = (data,userId, ) => (dispatch, getState) => {
  const userId1 = getState().auth.userDetails.userId;
  dispatch({
    type: types.UPDATE_CUSTOMER_OWNERSHIP_REQUEST,
  });
  axios
    .put(`${base_url}/customer/transfer/${userId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getCustomerListByUserId(userId1,0,"creationdate"));
      // dispatch(getTeamCustomer(userId1,0,));
      dispatch({
        type: types.UPDATE_CUSTOMER_OWNERSHIP_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_OWNERSHIP_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};
export const handleCustomerDrawerModal = (drawerProps, isVisible) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_DRAWER_MODAL,
    payload: { props: drawerProps, isVisible: isVisible },
  });
};

export const handleUpdateCustomerDrawerModal = (drawerProps, isVisible) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CUSTOMER_DRAWER_MODAL,
    payload: { props: drawerProps, isVisible: isVisible },
  });
};

export const getCustomerKeySkill = (customerId) => (dispatch) => {
  dispatch({ type: types.GET_CUSTOMER_KEY_SKILL_REQUEST });
  axios
    .get(`${base_url}/customer/KeySkil/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_KEY_SKILL_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_KEY_SKILL_FAILURE,
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
export const setEditCustomerContact = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_CUSTOMER_CONTACT,
    payload: name,
  });
};
export const updateCustomerContact = (data, customerId) => (dispatch) => {
  dispatch({ type: types.UPDATE_CUSTOMER_CONTACT_BY_ID_REQUEST });
  axios
    .put(`${base_url}/customer/{customerId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_CUSTOMER_CONTACT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CUSTOMER_CONTACT_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const addInitiativeByCustomerId = (data,customerId) => (dispatch) => {
  // console.log(customerId);
  dispatch({
    type: types.ADD_INITIATIVE_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/customer/skillSet`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getInitiativeByCustomerId(customerId));
      dispatch({
        type: types.ADD_INITIATIVE_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
     // cb && cb("success")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_INITIATIVE_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};
export const getInitiativeByCustomerId = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_INITIATIVE_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/customer/skillSet/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INITIATIVE_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INITIATIVE_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};

export const deleteTopicByCustomerId = (customerSkillLinkId, customerId) => (
  dispatch
) => {
  dispatch({
    type: types.DELETE_TOPIC_BY_CUSTOMER_ID_REQUEST,
  });
  axios
    .delete(`${base_url}/customer/skillsset/${customerSkillLinkId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TOPIC_BY_CUSTOMER_ID_SUCCESS,
        payload: res.data,
      });
      dispatch(getInitiativeByCustomerId(customerId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TOPIC_BY_CUSTOMER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getCustomerRecruit = (customerId) => (dispatch) => {
  dispatch({ type: types.GET_CUSTOMER_RECRUIT_REQUEST });

  axios
    .get(`${base_url}/customer/open/recuitment/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      // dispatch(getDeliveryUser());
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_RECRUIT_FAILURE,
      });
    });
};

export const getLatestCustomer = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_LATEST_CUSTOMER_REQUEST,
  });
  axios
    .get(`${base_url}/customer/sort/alphabet/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LATEST_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_LATEST_CUSTOMER_FAILURE,
        payload: err,
      });
    });
    
};

export const getCustomerRequirement = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_REQUIREMENT_REQUEST,
  });
  axios
    .get(`${base_url}/customer/sort/position/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_REQUIREMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_REQUIREMENT_FAILURE,
        payload: err,
      });
    });
    
};

export const getCustomerCloser = (userId,startDate,endDate) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_CLOSER_REQUEST,
  });
  axios
    .get(`${base_url}/customer/sort/closer/${userId}?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_CLOSER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_CLOSER_FAILURE,
        payload: err,
      });
    });
    
};

export const setEditCustomerInitiative = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_CUSTOMER_INITIATIVE,
    payload: name,
  });
};

export const getAllCustomerByAlphabet = (userId, startDate, endDate) => (
  dispatch
) => {
 
  dispatch({
    type: types.GET_ALL_CUSTOMER_BY_ALPHABET_REQUEST,
  });
  axios
  .get(`${base_url}/customer/all/sort/${userId}?sort=alphabet`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMER_BY_ALPHABET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_CUSTOMER_BY_ALPHABET_FAILURE,
        payload: err,
      });
    });
};

export const getAllCustomerByPosition = (userId, startDate, endDate) => (
  dispatch
) => {
 
  dispatch({
    type: types.GET_ALL_CUSTOMER_BY_POSITION_REQUEST,
  });
  axios
  .get(`${base_url}/customer/all/sort/${userId}?sort=position`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMER_BY_POSITION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_CUSTOMER_BY_POSITION_FAILURE,
        payload: err,
      });
    });
};

export const getAllCustomerByCloser = (userId, startDate, endDate) => (
  dispatch
) => {
 
  dispatch({
    type: types.GET_ALL_CUSTOMER_BY_CLOSER_REQUEST,
  });
  axios
  .get(`${base_url}/customer/all/sort/${userId}?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMER_BY_CLOSER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_CUSTOMER_BY_CLOSER_FAILURE,
        payload: err,
      });
    });
};
  
  export const updateCustomerInitiative = (data, initiativeDetailsId,customerId) => (dispatch) => {
    dispatch({ type: types.UPDATE_CUSTOMER_INITIATIVE_REQUEST });
    axios
      .put(`${base_url}/customer/initiative/${initiativeDetailsId}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
      // dispatch(getInitiatives(customerId));
        dispatch({
          type: types.UPDATE_CUSTOMER_INITIATIVE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_CUSTOMER_INITIATIVE_FAILURE,
          payload: err,
        });
      });
  };

  export const handleCustomerEmailDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_EMAIL_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const addInitiatives = (data,customerId) => (dispatch) => {
    // console.log(customerId);
    dispatch({
      type: types.ADD_INITIATIVES_REQUEST,
    });
    axios
      .post(`${base_url}/customer/initiative`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
         dispatch(getInitiatives(customerId));
        dispatch({
          type: types.ADD_INITIATIVES_SUCCESS,
          payload: res.data,
        });
       // cb && cb("success")
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_INITIATIVES_FAILURE,
          payload: err,
        });
      });
  };

  export const getInitiatives = (customerId) => (dispatch) => {
    dispatch({
      type: types.GET_INITIATIVES_REQUEST,
    });
    axios
      .get(`${base_url}/customer/initiative/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_INITIATIVES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_INITIATIVES_FAILURE,
          payload: err,
        });
      });
  };
  
  export const deleteInitiativeData = (initiativeDetailsId,customerId) => (dispatch,getState) => {
    dispatch({
      type: types.DELETE_INITIATIVE_DATA_REQUEST,
    });
    axios
      .delete(`${base_url}/customer/initiative/${initiativeDetailsId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        // dispatch(getInitiatives(customerId));
        dispatch({
          type: types.DELETE_INITIATIVE_DATA_SUCCESS,
          payload:initiativeDetailsId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.DELETE_INITIATIVE_DATA_FAILURE,
          payload: err,
        });
      });
  };


  // export const getCustomerList = (userId) => (dispatch) => {
  //   // let api_url = "";
  //   // if (userId) {
  //   //   api_url = `/sort/all/Customers/user/${userId}`;
  //   // } else {
  //   //   api_url = `/Customers`;
  //   // }
  //   dispatch({
  //     type: types.GET_CUSTOMERS_LIST_REQUEST,
  //   });
  //   axios
  //     .get(`${base_url}/customer/user/${userId}`, {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       dispatch({
  //         type: types.GET_CUSTOMERS_LIST_SUCCESS,
  //         payload: res.data,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       dispatch({
  //         type: types.GET_CUSTOMERS_LIST_FAILURE,
  //         payload: err,
  //       });
  //     });
  // };


  export const getCustomerProject = (customerId,) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/Customers/user/${userId}`;
    // } else {
    //   api_url = `/Customers`;
    // }
    dispatch({
      type: types.GET_CUSTOMER_PROJECT_REQUEST,
    });
    axios
      .get(`${base_url}/recriutment/projectList/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CUSTOMER_PROJECT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CUSTOMER_PROJECT_FAILURE,
          payload: err,
        });
      });
  };


  export const LinkedProjectTask = (ProjectId,) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/Customers/user/${userId}`;
    // } else {
    //   api_url = `/Customers`;
    // }
    dispatch({
      type: types.LINKED_PROJECT_TASK_REQUEST,
    });
    axios
      .get(`${base_url}/task/task-list/${ProjectId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.LINKED_PROJECT_TASK_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.LINKED_PROJECT_TASK_FAILURE,
          payload: err,
        });
      });
  };

  export const getAttendanceList = (userId) => (dispatch) => {
    dispatch({
      type: types.GET_ATTENDANCE_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/attendance/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ATTENDANCE_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ATTENDANCE_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const getCustomerFilterData = (userId,pageNo,filter) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/Customers/user/${userId}`;
    // } else {
    //   api_url = `/Customers`;
    // }
    dispatch({
      type: types.GET_CUSTOMERS_FILTER_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/customer/user/${userId}/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CUSTOMERS_FILTER_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CUSTOMERS_FILTER_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const getAllCustomerData = (userId,page) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_CUSTOMERS_DATA_REQUEST,
    });
    axios
      .get(`${base_url}/customer/drop/customer-list/${userId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_CUSTOMERS_DATA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_CUSTOMERS_DATA_FAILURE,
          payload: err,
        });
      });
  };

  export const handleCustomerNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const handleCustomerPulseDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_PULSE_DRAWER_MODAL,
      payload: modalProps,
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

  export const getCustomerActivityTimeline = (customerId) => (dispatch) => {
    dispatch({
        type: types.GET_CUSTOMER_ACTIVITY_TIMELINE_REQUEST,
    });
  
    axios
        .get(`${base_url}/customer/activity/list/${customerId}`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_CUSTOMER_ACTIVITY_TIMELINE_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_CUSTOMER_ACTIVITY_TIMELINE_FAILURE,
                payload: err,
            });
        });
  };

  export const customerToAccount = ( customerId,data,userId ) => (dispatch) => {
    dispatch({ type: types.CUSTOMER_TO_ACCOUNT_CONVERT_REQUEST });
  
    axios
      .put(`${base_url2}/api/v1/customer/convert/account/${customerId} `, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
  
      .then((res) => {
       
        message.success("Customer move to Account");
        console.log(res);
        dispatch({
          type: types.CUSTOMER_TO_ACCOUNT_CONVERT_SUCCESS,
          payload: customerId,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.CUSTOMER_TO_ACCOUNT_CONVERT_FAILURE,
        });
        // cb && cb("failure");
      });
  };

  export const getAllCustomerlIST = (pageNo,filter) => (dispatch) => {
    dispatch({
      type: types.GET_ALL_CUSTOMERS_LIST_REQUEST,
    });
    axios
      .get(`${base_url}/customer/all/${pageNo}/${filter}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ALL_CUSTOMERS_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_ALL_CUSTOMERS_LIST_FAILURE,
          payload: err,
        });
      });
  };

  export const addCustomerActivityCall = (call,customerId, cb) => (dispatch, getState) => {
    ////debugger;
    console.log("inside addCall");
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    dispatch({
      type: types.ADD_CUSTOMER_ACTIVITY_CALL_REQUEST,
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
        //  dispatch(getCustomerActivityTimeline(customerId));
        dispatch({
          type: types.ADD_CUSTOMER_ACTIVITY_CALL_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CUSTOMER_ACTIVITY_CALL_FAILURE,
          payload: err,
        });
        // cb();
      });
  };



  export const getCustomerNoteList = (type,id) => (dispatch) => {
    dispatch({
        type: types.GET_CUSTOMER_NOTE_LIST_REQUEST,
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
                type: types.GET_CUSTOMER_NOTE_LIST_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_CUSTOMER_NOTE_LIST_FAILURE,
                payload: err,
            });
        });
  };

  export const addCustomerActivityEvent = (event,customerId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_CUSTOMER_ACTIVITY_EVENT_REQUEST,
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
        // dispatch(getCustomerActivityTimeline(customerId));
        // dispatch(getEventListRangeByUserId(userId,0));
        dispatch({
          type: types.ADD_CUSTOMER_ACTIVITY_EVENT_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CUSTOMER_ACTIVITY_EVENT_FAILURE,
          payload: err,
        });
        // cb();
      });
  };

  export const addCustomerActivityTask = (event,customerId, cb) => (dispatch, getState) => {
    const { userId } = getState("auth").auth.userDetails;
    // const { startDate, endDate } = getState("dashboard").dashboard;
    console.log("inside addEvent");
    dispatch({
      type: types.ADD_CUSTOMER_ACTIVITY_TASK_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/task/create`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Task has been added successfully!");
        console.log(res);
        // dispatch(getCustomerActivityTimeline(customerId));
        dispatch({
          type: types.ADD_CUSTOMER_ACTIVITY_TASK_SUCCESS,
          payload: res.data,
        });
        // cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CUSTOMER_ACTIVITY_TASK_FAILURE,
          payload: err,
        });
        // cb();
      });
  };

  export const getTeamCustomer = (userId,pageNo) => (dispatch) => {
 
    dispatch({
      type: types.GET_TEAM_CUSTOMER_REQUEST,
    });
    axios
      .get(`${base_url}/customer/teams/${userId}/${pageNo}`, {
        headers: {
          Connection: 'keep-alive', 
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_TEAM_CUSTOMER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_TEAM_CUSTOMER_FAILURE,
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

  export const ClearReducerDataOfCustomer = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_CUSTOMER,
    });
  };

  export const linkCustomerContract = (data, documentId,contractInd) => (
    dispatch,
    getState
  ) => {
    // debugger;
    const { userId } = getState("auth").auth.userDetails;
    dispatch({
      type: types.LINK_CUSTOMER_CONTRACT_REQUEST,
    });
    axios
      .put(`${base_url}/document/update/contract/${documentId}/${contractInd}`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
       // dispatch(getCustomerDocument(customerId));
        dispatch({
          type: types.LINK_CUSTOMER_CONTRACT_SUCCESS,
          payload: res.data,
        });
        // cb && cb("success");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.LINK_CUSTOMER_CONTRACT_FAILURE,
          payload: err,
        });
        // cb && cb("failuer");
      });
  };

  export const handleCustomerContactDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_CONTACT_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const handleCustomerOpportunityDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_OPPORTUNITY_DRAWER_MODAL,
      payload: modalProps,
    });
  };

  export const handleAddressCutomerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_ADDRESS_CUSTOMER_MODAL,
      payload: modalProps,
    });
  };

  export const getProspectWeightedValue = (customerId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_PROSPECT_WEIGHTED_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/oppertunity/weighted-value/count/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_PROSPECT_WEIGHTED_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROSPECT_WEIGHTED_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getProspectOppValue = (customerId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_PROSPECT_OPP_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/oppertunity/count/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_PROSPECT_OPP_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROSPECT_OPP_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getProspectPipeLineValue = (customerId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_PROSPECT_PIPELINE_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/oppertunity/proposal-value/count/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_PROSPECT_PIPELINE_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROSPECT_PIPELINE_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getProspectContactValue = (customerId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_PROSPECT_CONTACT_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/contact/count/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_PROSPECT_CONTACT_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROSPECT_CONTACT_VALUE_FAILURE,
          payload: err,
        });
      });
  };


  export const getProspectContactCount = (id, type) => (dispatch) => {
    dispatch({ type: types.GET_PROSPECT_CONTACT_COUNT_REQUEST });
  
    axios
      .get(
        `${base_url}/contact/count/${id}/${type}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_PROSPECT_CONTACT_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_PROSPECT_CONTACT_COUNT_FAILURE,
          payload: err,
        });
      });
  };

  export const getCustomerActivityRecords = (customerId) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_ACTIVITY_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/customer/activity/record/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CUSTOMER_ACTIVITY_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CUSTOMER_ACTIVITY_RECORDS_FAILURE,
          payload: err,
        });
      });
  };

  export const getWonCustomerOppValue = (customerId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_WON_CUSTOMER_OPP_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/won-oppertunity/count/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_WON_CUSTOMER_OPP_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_WON_CUSTOMER_OPP_VALUE_FAILURE,
          payload: err,
        });
      });
      
  };

  export const getWonCustomerPipeLineValue = (customerId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_WON_CUSTOMER_PIPELINE_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/won-oppertunity/proposal-value/count/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_WON_CUSTOMER_PIPELINE_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_WON_CUSTOMER_PIPELINE_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const getWonCustomerWeightedValue = (customerId, startDate, endDate) => (dispatch) => {
    dispatch({ type: types.GET_WON_CUSTOMER_WEIGHTED_VALUE_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/won-oppertunity/weighted-value/count/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_WON_CUSTOMER_WEIGHTED_VALUE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_WON_CUSTOMER_WEIGHTED_VALUE_FAILURE,
          payload: err,
        });
      });
  };

  export const handleCampaignDrawer = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CAMPAIGN_DRAWER,
      payload: modalProps,
    });
  };
  export const addCustomerEvent = (event,customerId) => (dispatch) => {
    dispatch({
      type: types.ADD_CUSTOMER_EVENT_REQUEST,
    });
  
    axios
      .post(`${base_url}/activity/event/save`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(geCustomerCampaignEvent(customerId));
        console.log(res);
        dispatch({
          type: types.ADD_CUSTOMER_EVENT_SUCCESS,
          payload: res.data,
        });
        Swal.fire({
          icon: 'success',
          title: 'Event has been created successfully!',
          showConfirmButton: false,
        timer: 1500,
        })
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CUSTOMER_EVENT_FAILURE,
          payload: err,
        });;
      });
  };
  export const addCustomerCampaignEvent = (event) => (dispatch, getState) => {
    dispatch({
      type: types.ADD_CUSTOMER_CAMPAIGN_EVENT_REQUEST,
    });
  
    axios
      .post(`${base_url}/customer/campaign/save`, event, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Campaign has been created successfully!',
          showConfirmButton: false,
        timer: 1500,
        })
        console.log(res);
        dispatch({
          type: types.ADD_CUSTOMER_CAMPAIGN_EVENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_CUSTOMER_CAMPAIGN_EVENT_FAILURE,
          payload: err,
        });;
      });
  };
  export const geCustomerCampaignEvent = (customerId) => (dispatch) => {
    dispatch({ type: types.GET_CUSTOMER_CAMPAIGN_EVENT_REQUEST });
  
    axios
      .get(
        `${base_url}/customer/campaign/${customerId}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        // console.log(res)
        dispatch({
          type: types.GET_CUSTOMER_CAMPAIGN_EVENT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_CUSTOMER_CAMPAIGN_EVENT_FAILURE,
          payload: err,
        });
      });
  };

  export const getCustomerAllRecords = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_ALL_RECORDS_REQUEST,
    });
    axios
      .get(`${base_url}/customer/all/record/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CUSTOMER_ALL_RECORDS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CUSTOMER_ALL_RECORDS_FAILURE,
          payload: err,
        });
      });
  };



  export const handleCustomerNoteDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_NOTE_DRAWER_MODAL,
      payload: modalProps,
    });
  };
  export const handleCustomerActivityModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_ACTIVITY_MODAL,
      payload: modalProps,
    });
  };
  


  export const handleCustomerContactJumpstartModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_CONTACT_JUMPSTART_MODAL,
      payload: modalProps,
    });
  };




  export const updateProspectUser = ( customerId,userId) => (dispatch) => {
    dispatch({ type: types.UPDATE_PROSPECT_USER_REQUEST });
    axios
      .put(`${base_url}/customer/changesAssignTo/${customerId}/${userId}`, {}, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Prospect User updated Successfully!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(res);
        dispatch({
          type: types.UPDATE_PROSPECT_USER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_PROSPECT_USER_FAILURE,
          payload: err,
        });
      });
  };
  export const handleCustomerActivityJumpstartModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_ACTIVITY_JUMPSTART_MODAL,
      payload: modalProps,
    });
  };

  export const handleCustomerOpenOpportunityJumpstartModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_OPEN_OPPORTUNITY_JUMPSTART_MODAL,
      payload: modalProps,
    });
  };
  export const handleCustomerWonOpportunityJumpstartModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_CUSTOMER_WON_OPPORTUNITY_JUMPSTART_MODAL,
      payload: modalProps,
    });
  };
  
  

  export const getContactListOfJumpstart = (customerId,pageNo,filter) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/contacts/user/${userId}`;
    // } else {
    //   api_url = `/contacts`;
    // }
    dispatch({
      type: types.GET_CONTACTS_OF_JUMPSTART_REQUEST,
    });
    axios
      .get(`${base_url}/customer/contacts/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CONTACTS_OF_JUMPSTART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CONTACTS_OF_JUMPSTART_FAILURE,
          payload: err,
        });
      });
  };




  export const getCustomerDonut = (customerId) => (dispatch) => {
    dispatch({
      type: types.GET_CUSTOMER_DONUT_REQUEST,
    });
    axios
      .get(`${base_url}/opportunity/customer/record/count/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_CUSTOMER_DONUT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_CUSTOMER_DONUT_FAILURE,
          payload: err,
        });
      });
  };

  export const getOpenOppListOfJumpstart = (customerId,pageNo,filter) => (dispatch) => {
    // let api_url = "";
    // if (userId) {
    //   api_url = `/sort/all/contacts/user/${userId}`;
    // } else {
    //   api_url = `/contacts`;
    // }
    dispatch({
      type: types.GET_OPEN_OPP_OF_JUMPSTART_REQUEST,
    });
    axios
      .get(`${base_url}/customer/opportunity/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_OPEN_OPP_OF_JUMPSTART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_OPEN_OPP_OF_JUMPSTART_FAILURE,
          payload: err,
        });
      });
  };

  export const getWonOppListOfJumpstart = (customerId,pageNo,filter) => (dispatch) => {
 
    dispatch({
      type: types.GET_WON_OPP_OF_JUMPSTART_REQUEST,
    });
    axios
      .get(`${base_url}/customer/won/opportunity/${customerId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_WON_OPP_OF_JUMPSTART_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({
          type: types.GET_WON_OPP_OF_JUMPSTART_FAILURE,
          payload: err,
        });
      });
  };


 
export const getContactDocument = (contactId) => (dispatch) => {
  dispatch({ type: types.GET_CONTACT_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/contact/document/${contactId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
}; 
  

export const getOpportunityDocument = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_OPPORTUNITY_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/opportunity/document/${opportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const getDealDocument = (invOpportunityId) => (dispatch) => {
  dispatch({ type: types.GET_DEAL_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/investorOpportunity/document/${invOpportunityId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEAL_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEAL_DOCUMENTS_FAILURE,
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

export const updateActivityCallForm = (data, callId, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_ACTIVITY_CALL_FORM_REQUEST });
  axios
    .put(`${base_url}/call/activity/update/${callId}`, { ...data },{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_ACTIVITY_CALL_FORM_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ACTIVITY_CALL_FORM_FAILURE,
        payload: err,
      });
    });
};


export const getHeader = (type) => (dispatch) => {
  console.log("inside add candidate");
  dispatch({
    type: types.GET_HEADER_REQUEST,
  });
  axios
    .get(`${base_url}/getEntityFields/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_HEADER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_HEADER_FAILURE,
        payload: err,
      });
    });
};

export const updateActivityTaskForm = (data, taskId, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_ACTIVITY_TASK_FORM_REQUEST });
  axios
    .put(`${base_url}/task/activity/update/${taskId}`, { ...data },
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_ACTIVITY_TASK_FORM_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ACTIVITY_TASK_FORM_FAILURE,
        payload: err,
      });
    });
};
export const updateActivityEventForm = (data, eventId, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_ACTIVITY_EVENT_FORM_REQUEST });
  axios
    .put(`${base_url}/event/activity/update/${eventId}`, { ...data }, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_ACTIVITY_EVENT_FORM_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ACTIVITY_EVENT_FORM_FAILURE,
        payload: err,
      });
    });
};

export const setEditActivityEvents = (name) => (dispatch) => {
  dispatch({
    type: types.SET_ACTIVITY_EVENTS_EDIT,
    payload: name,
  });
};




export const handleCustomerImportModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CUSTOMER_IMPORT_MODAL,
    payload: modalProps,
  });
};



export const deleteCustomer = (data, customerId) => (
  dispatch
) => {
  dispatch({
    type: types.DELETE_CUSTOMER_REQUEST,
  });
  axios
    .put(`${base_url2}/customer/deleteCustomer/${customerId}`, data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      console.log(res);
     
      dispatch({
        type: types.DELETE_CUSTOMER_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,

      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};




export const addCustomerImportForm =
(customer, userId) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_CUSTOMER_IMPORT_FORM_REQUEST,
  });

  axios
    .post(`${base_url}/excel/import/customer`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
    dispatch(getCustomerListByUserId(userId,'0',"creationdate"));
      const startDate = dayjs().startOf("month").toISOString();
      const endDate = dayjs().endOf("month").toISOString();
      // dispatch(getRecords(userId));
      // dispatch(getLatestCustomers(userId, startDate, endDate));
      // dispatch(getCustomerListByUserId(userId));

      dispatch({
        type: types.ADD_CUSTOMER_IMPORT_FORM_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_IMPORT_FORM_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};


