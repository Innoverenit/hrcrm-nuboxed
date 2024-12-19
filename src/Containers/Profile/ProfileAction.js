import * as types from "./ProfileActionTypes";
import axios from "axios";
import { base_url } from "../../Config/Auth";
import Swal from "sweetalert2";

export const handleEducationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EDUCATION_MODAL,
    payload: modalProps,
  });
};

export const handleVisaModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_VISA_MODAL,
    payload: modalProps,
  });
};

export const handleTrainingModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TRAINING_MODAL,
    payload: modalProps,
  });
};

export const handleEmploymentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMPLOYMENT_MODAL,
    payload: modalProps,
  });
};

export const handlePersonalModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PERSONAL_MODAL,
    payload: modalProps,
  });
};

export const handleBankModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_BANK_MODAL,
    payload: modalProps,
  });
};

export const handlePersonalDetailsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PERSONAL_DETAILS_MODAL,
    payload: modalProps,
  });
};

export const handleSalaryModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SALARY_MODAL,
    payload: modalProps,
  });
};

export const handleUpdateEducationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EDUCATION_MODAL,
    payload: modalProps,
  });
};

export const handleUpdateEmploymentModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EMPLOYMENT_MODAL,
    payload: modalProps,
  });
};

export const handleUpdatePersonalModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PERSONAL_MODAL,
    payload: modalProps,
  });
};

export const handleUpdateTrainingModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_TRAINING_MODAL,
    payload: modalProps,
  });
};

export const handleUpdateBankModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_BANK_MODAL,
    payload: modalProps,
  });
};

export const handleUpdatePersonalDetailsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_PERSONAL_DETAILS_MODAL,
    payload: modalProps,
  });
};

export const handleUpdateSalaryModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_SALARY_MODAL,
    payload: modalProps,
  });
};
export const handleEmailProfileModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMAIL_PROFILE_MODAL,
    payload: modalProps,
  });
};

export const handleUpdateEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EMAIL_MODAL,
    payload: modalProps,
  });
};
export const setEditEmail = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EMAIL_EDIT,
    payload: name,
  });
};
//add educational details
export const addEducationDetails = (employee,userType, employeeId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_EDUCATIONAL_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee/education-details/${userType}`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getEducationDetails("employee",employeeId));
      dispatch({
        type: types.ADD_EDUCATIONAL_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb&&cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EDUCATIONAL_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

export const updateEducationDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_EDUCATIONAL_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/education-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getEducationDetails(employeeId));
      dispatch({
        type: types.UPDATE_EDUCATIONAL_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EDUCATIONAL_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//add Employment details
export const addEmploymentDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_EMPLOYMENT_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee/employment-history`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getEmploymentDetails(employeeId));
      dispatch({
        type: types.ADD_EMPLOYMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EMPLOYMENT_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

//update Employment details
export const updateEmploymentDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_EMPLOYMENT_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/employment-history/`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getEmploymentDetails(employeeId));
      dispatch({
        type: types.UPDATE_EMPLOYMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EMPLOYMENT_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//add Training Details

export const addTrainingDetails = (employee, employeeId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_TRAINING_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee/training-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getTrainingDetails(employeeId));
      dispatch({
        type: types.ADD_TRAINING_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TRAINING_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

//update Training Details

export const updateTrainingDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_TRAINING_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/training-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getTrainingDetails(employeeId));
      dispatch({
        type: types.UPDATE_TRAINING_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TRAINING_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//Add Personal Details
export const addPersonalDetails = (employee, employeeId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_PERSONAL_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee/personal-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getPersonalDetails(employeeId));
      dispatch({
        type: types.ADD_PERSONAL_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PERSONAL_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//UPDATE Personal Details
export const updatePersonalDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_PERSONAL_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/personal-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getPersonalDetails(employeeId));
      dispatch({
        type: types.UPDATE_PERSONAL_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PERSONAL_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};
//Add Bank Details
export const addBankDetails = (employee, userType, employeeId) => (dispatch) => {
  dispatch({
    type: types.ADD_BANK_DETAILS_REQUEST,
  });
  console.log(employee);

  axios 
    .post(`${base_url}/employee/bank-details/${userType}`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getBankDetails("employee",employeeId));
      dispatch({
        type: types.ADD_BANK_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_BANK_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//update bank details
export const updateBankDetails = (employee, employeeId, cb) => (dispatch) => {
  dispatch({
    type: types.UPDATE_BANK_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/bank-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getBankDetails(employeeId));
      dispatch({
        type: types.UPDATE_BANK_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_BANK_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//Add Document Details
export const addDocumentDetails = (employee, employeeId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_DOCUMENT_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee/employee-id-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getDocumentDetails(employeeId));
      dispatch({
        type: types.ADD_DOCUMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DOCUMENT_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

//UPDATE Document Details
export const updateDocumentDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_DOCUMENT_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/employee-id-details`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getDocumentDetails(employeeId));
      dispatch({
        type: types.UPDATE_DOCUMENT_DETAILS_SUCCESS,
        payload: res.data,
      });

      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DOCUMENT_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

/**
//  * fetch education details of an employee
//  */
export const getEducationDetails = (userType,employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_EDUCATION_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/education-details/${userType}/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_EDUCATION_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_EDUCATION_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//fetch Training details
export const getTrainingDetails = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_TRAINING_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/training-details/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_TRAINING_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_TRAINING_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//fetch Employment details
export const getEmploymentDetails = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_EMPLOYMENT_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/employment-history/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_EMPLOYMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_EMPLOYMENT_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//fetch Bank details
export const getBankDetails = (userType,employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_BANK_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/bank-details/${userType}/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_BANK_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_BANK_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//fetch Personal details
export const getPersonalDetails = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_PERSONAL_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/personal-details/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PERSONAL_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PERSONAL_DETAILS_FAILURE,
        payload: err,
      });
    });
};

//fetch Document details
export const getDocumentDetails = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_DOCUMENT_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/employee-id-details/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DOCUMENT_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DOCUMENT_DETAILS_FAILURE,
        payload: err,
      });
    });
};

/**
 * add skills of a userId
 */


//get skills by id


export const setEditEducation = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDUCATION_EDIT,
    payload: name,
  });
};

export const setEditDocument = (name) => (dispatch) => {
  dispatch({
    type: types.SET_DOCUMENT_EDIT,
    payload: name,
  });
};

export const setEditEmployment = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EMPLOYMENT_EDIT,
    payload: name,
  });
};

export const setEditBank = (name) => (dispatch) => {
  dispatch({
    type: types.SET_BANK_EDIT,
    payload: name,
  });
};

export const setEditTraining = (name) => (dispatch) => {
  dispatch({
    type: types.SET_TRAINING_EDIT,
    payload: name,
  });
};

export const setEditPersonal = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PERSONAL_EDIT,
    payload: name,
  });
};

export const setCurrentPersonal = (name) => (dispatch) => {
  dispatch({
    type: types.SET_PERSONAL_CURRENT,
    payload: name,
  });
};

export const setEditSalary = (name) => (dispatch) => {
  dispatch({
    type: types.SET_SALARY_EDIT,
    payload: name,
  });
};
export const handleMapModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_MAP_MODAL,
    payload: modalProps,
  });
};

export const addEmployeeAddress = (address) => (dispatch) => {
  ////debugger;
  // console.log(accountId);
  dispatch({
    type: types.ADD_EMPLOYEE_ADDRESS,
    payload: {
      address,
    },
  });
};

export const updateEmergencyAddress = (emergencyId, address) => (dispatch) => {
  console.log(emergencyId, address);
  // dispatch(getUserDetails(token));
  dispatch({
    type: types.UPDATE_EMERGENCY_ADDRESS,
    payload: {
      emergencyId,
      address,
    },
  });
};

export const getOpportunityDocument = (opportunityId) => (dispatch) => {
  dispatch({ type: types.GET_OPPORTUNITY_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/document/opportunity/${opportunityId}`, {
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

export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/opportunity/${opportunityId}/document/${documentId}`, {
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

export const deleteBankTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_BANK_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/bank-details/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getBankDetails(userId));
      dispatch({
        type: types.DELETE_BANK_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_BANK_FAILURE,
        payload: err,
      });
    });
};

export const deleteEducationTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_EDUCATION_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/education-details/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getEducationDetails(userId));
      dispatch({
        type: types.DELETE_EDUCATION_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EDUCATION_FAILURE,
        payload: err,
      });
    });
};

export const deleteEmploymentTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_EMPLOYMENT_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/employment-history/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getEmploymentDetails(userId));
      dispatch({
        type: types.DELETE_EMPLOYMENT_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EMPLOYMENT_FAILURE,
        payload: err,
      });
    });
};
//Personal
export const deleteEmergencyTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_EMERGENCY_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/personal-details/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getPersonalDetails(userId));
      dispatch({
        type: types.DELETE_EMERGENCY_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EMERGENCY_FAILURE,
        payload: err,
      });
    });
};
//Personal-details table
export const deletePersonalTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_PERSONAL_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/employee-id-details/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getDocumentDetails(userId));
      dispatch({
        type: types.DELETE_PERSONAL_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PERSONAL_FAILURE,
        payload: err,
      });
    });
};

//Personal-details table
export const deleteTrainingTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_TRAINING_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/training-details/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getTrainingDetails(userId));
      dispatch({
        type: types.DELETE_TRAINING_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TRAINING_FAILURE,
        payload: err,
      });
    });
};

//add Salary details
export const addSalaryDetails = (employee, employeeId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_SALARY_DETAILS_REQUEST,
  });
  // console.log(employee);
  axios
    .post(`${base_url}/employee/salaryDetails`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getSalaryDetails(employeeId));
      dispatch({
        type: types.ADD_SALARY_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SALARY_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//fetch Salary details
export const getSalaryDetails = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_SALARY_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/salaryDetails/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_SALARY_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_SALARY_DETAILS_FAILURE,
        payload: err,
      });
    });
};

/**
 * document upload modal in employess tab
 */
export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

//UPDATE EMPLOYEE SALARY DETAILS
export const updateEmployeeSalaryDetails = (employee, cb) => (dispatch) => {
  dispatch({
    type: types.UPDATE_EMPLOYEE_SALARY_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/salaryDetails`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getEducationDetails(employeeId));
      dispatch({
        type: types.UPDATE_EMPLOYEE_SALARY_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EMPLOYEE_SALARY_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

//DELETE SALARY TABLE

export const deleteSalaryTable = (id) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_EMPLOYEE_SALARY_REQUEST,
  });

  axios
    .delete(`${base_url}//${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getSalaryDetails(userId));
      dispatch({
        type: types.DELETE_EMPLOYEE_SALARY_SUCCESS,
        payload: id,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_EMPLOYEE_SALARY_FAILURE,
        payload: err,
      });
    });
};

export const handleContractModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CONTRACT_MODAL,
    payload: modalProps,
  });
};



//add Contract details
export const addContractDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_CONTRACT_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee/employee-contract`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getContractDetails(employeeId));
      dispatch({
        type: types.ADD_CONTRACT_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CONTRACT_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};


//fetch Contract details
export const getContractDetails = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_CONTRACT_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/employee-contract/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_CONTRACT_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_CONTRACT_DETAILS_FAILURE,
        payload: err,
      });
    });
};
// edit contract
export const setEditContract = (name) => (dispatch) => {
  dispatch({
    type: types.SET_CONTRACT_EDIT,
    payload: name,
  });
};

// update contract modal
export const handleUpdateContractModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_CONTRACT_MODAL,
    payload: modalProps,
  });
};

//update Contract details
export const updateContractDetails = (employee, employeeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_CONTRACT_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/employee-contract`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getContractDetails(employeeId));
      dispatch({
        type: types.UPDATE_CONTRACT_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CONTRACT_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

export const addEmailProfileCredentials = (credentials) => (dispatch) => {
  dispatch({
    type: types.ADD_EMAIL_PROFILE_CREDENTIAL_REQUEST,
  });
  axios
    .post(`${base_url}/employee/user/email-credentials`, credentials, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getEmailCredentials());
      console.log(res);
     dispatch(getEmailProfileCredentials());
      dispatch({
        type: types.ADD_EMAIL_PROFILE_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
      //   dispatch(handleIntegrationModal(false));
      dispatch(handleEmailProfileModal(false));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EMAIL_PROFILE_CREDENTIAL_FAILURE,
        payload: err,
      });
    });
};

export const getEmailProfileCredentials = () => (dispatch) => {
  dispatch({
    type: types.GET_EMAIL_PROFILE_CREDENTIAL_REQUEST,
  });
  axios
    .get(`${base_url}/employee/email-credentials/user`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMAIL_PROFILE_CREDENTIAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMAIL_PROFILE_CREDENTIAL_FAILURE,
        payload: err,
      });
    });
};

export const linkEmailStatus = (data, candidateId) => (
  dispatch,
  getState
) => {
  // debugger;
  //const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.LINK_EMAIL_STATUS_REQUEST,
  });
  axios
    .put(`${base_url}/employee/email-credentials/user/default`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getEmailProfileCredentials());
      dispatch({
        type: types.LINK_EMAIL_STATUS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_EMAIL_STATUS_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};

export const getLinkedUsersDocument = (OrgId) => (dispatch) => {
  dispatch({
    type: types.GET_LINKED_USERS_DOCUMENT_REQUEST,
  });
  axios
    .get(`${base_url}/document/user-type/user/list/${OrgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LINKED_USERS_DOCUMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LINKED_USERS_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

export const addVisaDetails = (employee, userId, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_VISA_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee/visa`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
       dispatch(getVisaDetails(userId));
      dispatch({
        type: types.ADD_VISA_DETAILS_SUCCESS,
        payload: res.data,
      });
      // cb&&cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_VISA_DETAILS_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

export const getVisaDetails = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_VISA_DETAILS_REQUEST,
  });

  axios
    .get(`${base_url}/employee/visa/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_VISA_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_VISA_DETAILS_FAILURE,
        payload: err,
      });
    });
};

export const deleteVisa = (visaId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_VISA_REQUEST,
  });

  axios
    .delete(`${base_url}/employee/visa/delete/${visaId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getEducationDetails(userId));
      dispatch({
        type: types.DELETE_VISA_SUCCESS,
        payload: visaId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_VISA_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateVisaModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_VISA_MODAL,
    payload: modalProps,
  });
};

export const setEditVisa = (name) => (dispatch) => {
  dispatch({
    type: types.SET_VISA_EDIT,
    payload: name,
  });
};

export const updateVisaDetails = (employee, visaId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_VISA_DETAILS_REQUEST,
  });
  console.log(employee);

  axios
    .put(`${base_url}/employee/visa/update/${visaId}`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getEducationDetails(employeeId));
      dispatch({
        type: types.UPDATE_VISA_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_VISA_DETAILS_FAILURE,
        payload: err,
      });
      cb && cb("error");
    });
};

export const getPerformanceList = () => (dispatch) => {
  dispatch({
    type: types.GET_PERFORMANCE_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PERFORMANCE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PERFORMANCE_LIST_FAILURE,
        payload: err,
      });
    });
};


export const updateProfileEquipment = (data,employeeId, liveInd, cb) => (dispatch) => {
  // console.log(leadDocumentsId, DocumentsName);
  dispatch({
    type: types.UPDATE_PROFILE_EQUIPMENT_REQUEST,
  });
  axios
    .put(
      `${base_url}/employee/equipment`,data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
    dispatch(getEmployeeEquipmentByUserId(employeeId));
      // message.success("Document has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_PROFILE_EQUIPMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROFILE_EQUIPMENT_FAILURE,
      });
    });
};

export const getEmployeeEquipmentByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_EQUIPMENT_REQUEST,
  });
  axios
  .get(`${base_url}/employee/equipment/${userId}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_EQUIPMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_EQUIPMENT_FAILURE,
        payload: err,
      });
    });
};


export const verifyUserEmailurL = (data) => (dispatch) => {
  dispatch({
    type: types.VERIFY_USER_EMAIL_REQUEST,
  });
  axios
    .post(`${base_url}/otp/user/link/one-to-another/generateOTP`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.VERIFY_USER_EMAIL_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      dispatch({
        type: types.VERIFY_USER_EMAIL_FAILURE,
        payload: err,
      });
    });
};




export const validateEmailOtpurL = (data, cb) => (dispatch) => {
  dispatch({
    type: types.VALIDATE_EMAIL_OTP_REQUEST,
  });
  axios
    .post(`${base_url}/otp/user/validateOtp`, data)
    .then((res) => {
      dispatch({
        type: types.VALIDATE_EMAIL_OTP_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      Swal.fire({
        icon: 'success',
        title: 'OTP validiated successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      dispatch({
        type: types.VALIDATE_EMAIL_OTP_FAILURE,
        payload: err,
      });
      cb && cb("failure");
      // Swal.fire({
      //   icon: 'error',
      //   title: 'OTP is not matching with input!',
      // })
    });
};




export const addEmailLinkSave = (data, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_EMAIL_LINK_REQUEST,
  });
  axios
    .post(`${base_url}/employee/email/link/save`, data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_EMAIL_LINK_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      Swal.fire({
        icon: 'success',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_EMAIL_LINK_FAILURE,
        payload: err,
      });
      cb && cb("failure");
      // Swal.fire({
      //   icon: 'error',
      //   title: 'OTP is not matching with input!',
      // })
    });
};