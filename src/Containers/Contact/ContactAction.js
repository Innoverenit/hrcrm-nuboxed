import * as types from "./ContactActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../Config/Auth";
import { message } from "antd";
import { getContactListByOpportunityId } from "../Opportunity/OpportunityAction";
/**
 * contact modal action
 */
export const handleContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const emptyContact = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_CONTACT_TABLE,
    
  });
};
export const handleDonotCallModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DONOT_CALL_MODAL,
    payload: modalProps,
  });
};
export const handleContactReactSpeechModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_REACT_SPEECH_MODAL,
    payload: modalProps,
  });
};

export const setSelectedStackedTimeIntervalReport = (selectedTime) => (dispatch) => {
  console.log(selectedTime);
  dispatch({
    type: types.CHANGE_SELECTED_STACKED_TIME_INTERVAL_REPORT,
    payload: selectedTime,
  });
};



export const handleLinkContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_LINK_CONTACT_MODAL,
    payload: modalProps,
  });
}
export const handleContactOpportunityModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_OPPORTUNITY_MODAL,
    payload: modalProps,
  });
};

/**
 * request for adding a contact
 */
export const addContact = (contact) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add contact");
  dispatch({
    type: types.ADD_CONTACT_REQUEST,
  });

  axios
    .post(`${base_url}/contact`, contact, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getOpportunityRecord(userId));
      dispatch(getContactRecord(userId));
      
      // dispatch(
      //   linkContactsToOpportunity(opportunityId, { contactIds: [res.data] }, cb)
      // );
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      // dispatch(getContactById(contactId));
      // dispatch(getLatestContacts(userId, startDate, endDate));
      // dispatch(getContactListByUserId(userId));
      dispatch(getRecords(userId,0));
      dispatch({
        type: types.ADD_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

/**
 * get all the contact of the user
 */
export const getContactListByUserId = (userId,pageNo,filter) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_CONTACTS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/user/${userId}/${pageNo}/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACTS_FAILURE,
        payload: err,
      });
    });
};




export const getContactData = (userId,page) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_CONTACT_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/contact/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getdealsContactdata = (userId,page) => (dispatch) => {

  dispatch({
    type: types.GET_DEALS_CONTACT_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/contact/investor/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEALS_CONTACT_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DEALS_CONTACT_DATA_FAILURE,
        payload: err,
      });
    });
};



export const getVendorContactData = (userId,page) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/Customers/user/${userId}`;
  // } else {
  //   api_url = `/Customers`;
  // }
  dispatch({
    type: types.GET_VENDOR_CONTACT_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/partner/all/partner/contact`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_VENDOR_CONTACT_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_VENDOR_CONTACT_DATA_FAILURE,
        payload: err,
      });
    });
};

/**
 * get all the contact of the user
 */
export const getAllContactListByUserId = () => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_ALL_CONTACTS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/all-contact`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CONTACTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_CONTACTS_FAILURE,
        payload: err,
      });
    });
};

/**
 * get a specific contact of the user with the contactId
 */
export const getContactById = (contactId) => (dispatch) => {
  console.log("inside add contact");
  dispatch({
    type: types.GET_CONTACT_BY_ID_REQUEST,
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
        type: types.GET_CONTACT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_BY_ID_FAILURE,
        payload: err,
      });
    });
};
//Contact Details.
export const getContactByContactId = (contactId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_BY_CONTACT_ID_REQUEST,
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
        type: types.GET_CONTACT_BY_CONTACT_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_BY_CONTACT_ID_FAILURE,
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

export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/contact/document/${documentId}`, {
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
 * add document to a contact
 */
export const addContactDocument = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_CONTACT_DOCUMENT_REQUEST });
  axios
    .post(`${base_url}/contact/document`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_CONTACT_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      // dispatch(getCandidateDocument(candidateId));
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_DOCUMENT_FAILURE,
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

/**
 * add a note
 */
export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_CONTACT_NOTES_REQUEST });
  axios
    .post(`${base_url}/contact/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_CONTACT_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CONTACT_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};
/**
 * get Customer Notes
 */
export const getNotesListByContactId = (contactId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_CONTACT_ID_REQUEST,
  });
  axios
    .get(`${base_url}/contact/notes/${contactId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CONTACT_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_CONTACT_ID_FAILURE,
        payload: err,
      });
    });
};
//get list of opportunities
export const getOpportunityListByContactId = (contactId) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_CONTACT_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/recuitment/contact/open/recuitment/${contactId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};
/*request for adding a contact  opportunity */
export const addContactOpportunity = (opportunity, cb) => (
  dispatch,
  getState
) => {
  const contactId = getState().contact.contact.contactId;
  dispatch({
    type: types.ADD_CONTACT_OPPORTUNITY_REQUEST,
  });
  axios
    .post(`${base_url}/opportunity`, opportunity, {
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
      dispatch(getOpportunityListByContactId(contactId));
      // dispatch(getLatestOpportunities(userId, startDate, endDate));
      // dispatch(getOpportunitiesByPrice(userId));
      dispatch({
        type: types.ADD_CONTACT_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};
/**
 * Update Contact Modal
 */
export const handleUpdateContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const setEditContact = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CONTACT_EDIT,
    payload: name,
  });
};

/**
 * update a contact using put request
 */
export const updateContact = (data, contactId) => (dispatch) => {
  dispatch({ type: types.UPDATE_CONTACT_BY_ID_REQUEST });
  axios
    .put(`${base_url}/contact/${contactId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_CONTACT_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CONTACT_BY_ID_FAILURE,
        payload: err,
      });
    });
};
//SEARCH
export const inputContactDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_CONTACT_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/contact/Name/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.contactId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_CONTACT_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_CONTACT_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

//SEARCH
export const inputPartnerDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_CONTACT_PARTNER_SEARCH_DATA_REQUEST,
  });
  axios
    // .get(`${base_url}/contact/Name/${name}`, {
    //   headers: {
    //     Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    //   },
    // })
    .then((res) => {
      if (res.data.contactId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_CONTACT_PARTNER_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_CONTACT_PARTNER_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};
//Header Icons
export const setContactsViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_CUSTOMER_VIEW_TYPE, payload: viewType });

/**
 * get all the contact of the user
 */
export const getContactPartnerListByUserId = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACTS_PARTNER_REQUEST,
  });
  axios
    .get(`${base_url}/partner/all-contacts/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACTS_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACTS_PARTNER_FAILURE,
        payload: err,
      });
    });
};

export const getAllContactPartnerListByUserId = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CONTACTS_PARTNER_REQUEST,
  });
  axios
    .get(`${base_url}/contact/all-Partnercontacts`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CONTACTS_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_CONTACTS_PARTNER_FAILURE,
        payload: err,
      });
    });
};

export const addLinkContactByOpportunityId = (contact, opportunityId) => (
  dispatch,
  getState
) => {
  // const userId = getState().auth.userDetails.userId;
  console.log("inside addLinkContactByOpportunityId contact");
  dispatch({
    type: types.ADD_LINK_CONTACT_BY_OPPORTUNITY_ID_REQUEST,
  });
  axios
    .post(`${base_url}/opportunity/contact`, contact, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getContactListByOpportunityId(opportunityId));
      dispatch({
        type: types.ADD_LINK_CONTACT_BY_OPPORTUNITY_ID_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LINK_CONTACT_BY_OPPORTUNITY_ID_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const getPermissionsListPartner = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_PARTNER_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"partnerContact"}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_PARTNER_FAILURE,
        payload: err,
      });
    });
};

export const getPermissionsListCustomer = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_CUSTOMER_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"contact"}`, {
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

//CONTACT PERMISSION SHARE Of Partner
export const shareContactPartnerPermission = (data, userId, a) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_CONTACT_PARTNER_PERMISSION_REQUEST,
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
        dispatch(getAllContactPartnerListByUserId());
        dispatch(getRecords(userId));
      } else {
        dispatch(getContactPartnerListByUserId(userId));
        dispatch(getRecords(userId));
      }
      // dispatch(getContactPartnerListByUserId(userId));
      dispatch({
        type: types.ADD_SHARE_CONTACT_PARTNER_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_CONTACT_PARTNER_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

//CONTACT PERMISSION SHARE Of Customer
export const shareContactCustomerPermission = (data, userId, a) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_CONTACT_CUSTOMER_PERMISSION_REQUEST,
  });

  axios
    .post(`${base_url}/permission/details`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      console.log(res);
      if (a === "All") {
        dispatch(getAllContactListByUserId());
      } else {
        dispatch(getContactListByUserId(userId));
      }
      // dispatch(getContactListByUserId(userId));
      dispatch({
        type: types.ADD_SHARE_CONTACT_CUSTOMER_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_CONTACT_CUSTOMER_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};

export const getRecords = (userId,type) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/record/count/${userId}/${type}`, {
                    
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

export const getCustomerRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/record/count/customer/${userId}`, {
                    
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CUSTOMER_RECORDS_FAILURE,
        payload: err,
      });
    });
};


export const linkOpportunityContact = (contact,opportunityId) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  // console.log("inside add customer");
  dispatch({
    type: types.LINK_OPPORTUNITY_CONTACT_REQUEST,
  });

  axios
    .post(`${base_url}/opportunity/tag/contact`, contact, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getContactListByOpportunityId(opportunityId));

      dispatch({
        type: types.LINK_OPPORTUNITY_CONTACT_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPPORTUNITY_CONTACT_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const updateOwnercontactById= (userId,data) => (dispatch,getState) => {
  const userId1 = getState().auth.userDetails.userId;
  dispatch({
    type: types.UPDATE_CONTACT_OWNERSHIP_REQUEST,
  });
  axios
    .put(`${base_url}/contact/transfer/${userId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     dispatch(getContactListByUserId(userId1));
      dispatch({
        type: types.UPDATE_CONTACT_OWNERSHIP_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CONTACT_OWNERSHIP_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
}; 

export const handleContactDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_DRAWER_MODAL,
    payload: modalProps,
  });
};
export const handleContactEmailDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_EMAIL_DRAWER_MODAL,
    payload: modalProps,
  });
};


export const getContactPagination = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_PAGINATION_REQUEST,
  });
  axios
    .get(`${base_url}/permission/customer/contact/details/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_PAGINATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_PAGINATION_FAILURE,
        payload: err,
      });
    });
};


export const getPArtnerContactPagination = (userId,pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_PARTNER_CONTACT_PAGINATION_REQUEST,
  });
  axios
    .get(`${base_url}/permission/customer/contact/details/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_CONTACT_PAGINATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PARTNER_CONTACT_PAGINATION_FAILURE,
        payload: err,
      });
    });
};

export const getContactRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/customer/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getContactTeamRecord = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_TEAM_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/team/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_TEAM_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_TEAM_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getFilterContactList = (userId,pageNo,filter) => (dispatch) => {
  // let api_url = "";
  // if (userId) {
  //   api_url = `/sort/all/contacts/user/${userId}`;
  // } else {
  //   api_url = `/contacts`;
  // }
  dispatch({
    type: types.GET_FILTER_CONTACTS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/user/${userId}/${pageNo}/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FILTER_CONTACTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_FILTER_CONTACTS_FAILURE,
        payload: err,
      });
    });
};


export const handleContactNotesDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_NOTES_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const handleContactPulseDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_PULSE_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const getAllContact = (pageNo,filter) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/contact/${pageNo}/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_CONTACT_FAILURE,
        payload: err,
      });
    });
};

export const getTeamContact = (userId,pageNo,filter) => (dispatch) => {
 
  dispatch({
    type: types.GET_TEAM_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/contact/team/${userId}/${pageNo}/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAM_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_TEAM_CONTACT_FAILURE,
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

export const ClearReducerDataOfContact = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_CONTACT,
  });
};