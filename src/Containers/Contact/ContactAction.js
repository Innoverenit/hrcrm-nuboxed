import * as types from "./ContactActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url, base_url2 } from "../../Config/Auth";
import Swal from "sweetalert2";
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


export const handleContactAddressDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_ADDRESS_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const handleContactImportModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_IMPORT_MODAL,
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
      Swal.fire({
        icon: 'success',
        title: 'Contact created Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
      dispatch(getOpportunityRecord(userId));
      dispatch(getContactRecord(userId));
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      dispatch(getRecords(userId,0));
      dispatch({
        type: types.ADD_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_FAILURE,
        payload: err,
      });

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

export const getContactDistributor = (userId,page) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_DISTRIBUTOR_REQUEST,
  });
  axios
    .get(`${base_url2}/contactPerson/distributorContactPersonsList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_DISTRIBUTOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_DISTRIBUTOR_FAILURE,
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

export const handleHospitalUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_HOSPITAL_UPLOAD_MODAL,
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
    .post(`${base_url}/document/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Created Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      dispatch({
        type: types.ADD_CONTACT_DOCUMENT_SUCCESS,
        payload: res.data,
      });
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
    .get(`${base_url}/opportunity/contact/${contactId}`, {
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
      Swal.fire({
        icon: 'success',
        title: 'Created Successfully',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
      const startDate = dayjs()
        .startOf("month")
        .toISOString();
      const endDate = dayjs()
        .endOf("month")
        .toISOString();
      dispatch(getOpportunityListByContactId(contactId));
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
    .put(`${base_url}/contact/row-edit/${contactId}`, data, {
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
      Swal.fire({
        icon: 'success',
        title: 'Contact Info Updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
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
export const inputContactDataSearch = (name,type,contactType) => (dispatch) => {
  dispatch({
    type: types.INPUT_CONTACT_SEARCH_DATA_REQUEST,
  });
  axios
    // .get(`${base_url}/contact/Name/${name}`, 
    .get(`${base_url}/contact/search/alltype/${name}/${type}/${contactType}`,
      {

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
      Swal.fire({
        icon: 'error',
        title: 'Contact list is empty',
        showConfirmButton: false,
        timer: 1500,
      })
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
        type: types.ADD_LINK_CONTACT_BY_OPPORTUNITY_ID_FAILURE,
        payload: err,
      });
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
        type: types.ADD_SHARE_CONTACT_PARTNER_PERMISSION_FAILURE,
        payload: err,
      });

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
      dispatch({
        type: types.ADD_SHARE_CONTACT_CUSTOMER_PERMISSION_SUCCESS,
        payload: res.data,
      });
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

export const getRecords = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/teams/count/${userId}`, {
                    
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
    .get(`${base_url}/contact/teams/count/${userId}`, {
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

export const getAllContact = (pageNo,type) => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/contact/all/${pageNo}/${type}`, {
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

export const getTeamContact = (userId,pageNo) => (dispatch) => {
 
  dispatch({
    type: types.GET_TEAM_CONTACT_REQUEST,
  });
  axios
    .get(`${base_url}/contact/teams/${userId}/${pageNo}`, {
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
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong, reach out to support!',
        showConfirmButton: false,
        timer: 1500,
      })
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

export const handleContactCETdrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTACT_CET_DRAWER,
    payload: modalProps,
  });
};
export const handleCETactivityContactModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CET_ACTIVITY_CONTACT_MODAL,
    payload: modalProps,
  });
};

export const addContactActivityCall = (call,contactId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_CONTACT_ACTIVITY_CALL_REQUEST,
  });

  axios
    .post(`${base_url}/activity/call/save`, call, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal({
        icon: 'success',
        title: 'Call has been added successfully!',
      })
      // dispatch(getCallTimeline(contactId));
      dispatch({
        type: types.ADD_CONTACT_ACTIVITY_CALL_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_ACTIVITY_CALL_FAILURE,
        payload: err,
      });
      cb();
    });
};
export const addContactActivityEvent = (event,contactId, cb) => (dispatch, getState) => {
  dispatch({
    type: types.ADD_CONTACT_ACTIVITY_EVENT_REQUEST,
  });

  axios
    .post(`${base_url}/activity/event/save`, event, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal({
        icon: 'success',
        title: 'Meeting has been added successfully!',
      })
      console.log(res);
      // dispatch(getCallTimeline(CONTACTId));
      dispatch({
        type: types.ADD_CONTACT_ACTIVITY_EVENT_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_ACTIVITY_EVENT_FAILURE,
        payload: err,
      });
      // cb();
    });
};

export const addContactActivityTask = (task,contactId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_CONTACT_ACTIVITY_TASK_REQUEST,
  });
  axios
    .post(`${base_url}/activity/task/create`, task, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal({
        icon: 'success',
        title: 'Task has been added successfully!',
      })
      // dispatch(getCallTimeline(leadsId));
      dispatch({
        type: types.ADD_CONTACT_ACTIVITY_TASK_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTACT_ACTIVITY_TASK_FAILURE,
        payload: err,
      });
      // cb();
    });
};
export const getContactCETimeline = (contactId) => (dispatch) => {
  dispatch({
      type: types.GET_CONTACT_CET_TIMELINE_REQUEST,
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
              type: types.GET_CONTACT_CET_TIMELINE_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_CONTACT_CET_TIMELINE_FAILURE,
              payload: err,
          });
      });
};
export const getContactCETrecord = (contactId) => (dispatch) => {
  dispatch({
      type: types.GET_CONTACT_CET_RECORD_REQUEST,
  });

  axios
      .get(`${base_url}/contact/activity/record/${contactId}`, {
          headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
      })
      .then((res) => {
          console.log(res);
          dispatch({
              type: types.GET_CONTACT_CET_RECORD_SUCCESS,
              payload: res.data,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.GET_CONTACT_CET_RECORD_FAILURE,
              payload: err,
          });
      });
};

export const getContactActivityRecords = (contactId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_ACTIVITY_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/activity/record/${contactId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_ACTIVITY_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_ACTIVITY_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const getContactAllRecord = (orgId,type) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_ALL_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/contact/all/record/count/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_ALL_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_CONTACT_ALL_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const uploadContctList = (data,type) => (dispatch) => {
  dispatch({ type: types.UPLOAD_CONTACT_LIST_REQUEST });
  axios
    .post(`${base_url}/excel/import/Contact/${type}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      window.location.reload();
      dispatch({
        type: types.UPLOAD_CONTACT_LIST_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
     
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPLOAD_CONTACT_LIST_FAILURE,
        payload: err,
      });
    });
};


export const addContactAddress = (data,type,id) => (dispatch) => {
  // console.log(sectors);
  dispatch({
    type: types.ADD_CONTACT_ADDRESS_REQUEST,
  });
  axios
    .post(`${base_url}/saveAddressByType/${type}/${id}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      //dispatch(getSectorCount(orgId));
      
      console.log(res);
      dispatch({
        type: types.ADD_CONTACT_ADDRESS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_CONTACT_ADDRESS_FAILURE,
      });
      // message.success(res.data.message);
      // cb();
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



export const getContactAddressData = (id,type) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_ADDRESS_DATA_REQUEST,
  });
  axios
  .get(`${base_url}/address/type/${id}/${type}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CONTACT_ADDRESS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_ADDRESS_DATA_FAILURE,
        payload: err,
      });
    });
};



export const updateContactAddress = (data) => (dispatch) => {
  // console.log(sectors);
  dispatch({
    type: types.UPDATE_CONTACT_ADDRESS_REQUEST,
  });
  axios
    .put(`${base_url}/address/update`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      //dispatch(getSectorCount(orgId));
      
      console.log(res);
      dispatch({
        type: types.UPDATE_CONTACT_ADDRESS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.UPDATE_CONTACT_ADDRESS_FAILURE,
      });
      // message.success(res.data.message);
      // cb();
    });
};



export const removeAddressData = (addressId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_ADDRESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/delete/address/${addressId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Address Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,
      })
      // if (res.data) {
      //   Swal.fire({
      //     icon: 'success',
      //     title: res.data,
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // } else {
       
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Not Deleted',
      //     showConfirmButton: false,
      //     // timer: 1500
      //   });
      // }
      console.log(res);
      dispatch({
        type: types.REMOVE_ADDRESS_DATA_SUCCESS,
        payload: addressId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_ADDRESS_DATA_FAILURE,
        payload: err,
      });
    });
};






export const addContactMand = (addressId,primaryInd) => (dispatch) => {
  // console.log(sectors);
  dispatch({
    type: types.ADD_CONTACT_MAND_REQUEST,
  });
  axios
    .put(`${base_url}/address/makePrimary/${addressId}/${primaryInd}`, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      //dispatch(getSectorCount(orgId));
      
      console.log(res);
      dispatch({
        type: types.ADD_CONTACT_MAND_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_CONTACT_MAND_FAILURE,
      });
      // message.success(res.data.message);
      // cb();
    });
};

export const getContactRecruit = (contactId) => (dispatch) => {
  dispatch({
    type: types.GET_CONTACT_RECRUIT_REQUEST,
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
        type: types.GET_CONTACT_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CONTACT_RECRUIT_FAILURE,
        payload: err,
      });
    });
};