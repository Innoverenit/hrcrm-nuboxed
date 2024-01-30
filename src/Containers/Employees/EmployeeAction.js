import * as types from "./EmployeeActionType";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../Config/Auth";
import { message } from "antd";

export const setEmployeeViewType = (viewType) => (dispatch) =>
  dispatch({ type: types.SET_EMPLOYEE_VIEW_TYPE, payload: viewType });

export const updateEmployeeAddress = (employeeId, address) => (dispatch) => {
  debugger;
  console.log(employeeId, address);
  dispatch({
    type: types.UPDATE_EMPLOYEE_ADDRESS,
    payload: {
      employeeId,
      address,
    },
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

/**
 * request for adding an employee
 */

export const addEmployee = (employee,cretiondate) => (dispatch) => {
  dispatch({
    type: types.ADD_EMPLOYEE_REQUEST,
  });
  console.log(employee);

  axios
    .post(`${base_url}/employee`, employee, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getEmployeelist("cretiondate"));
      dispatch({
        type: types.ADD_EMPLOYEE_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EMPLOYEE_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

/**
 * Fetching all employees of org
 */
export const getEmployeelist = (filter) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_LIST_REQUEST,
  });

  axios
  .get(`${base_url}/employee/employees/filter/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_LIST_FAILURE,
        payload: err,
      });
    });
};


export const getEmployeeFilterlist = (filter) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_FILTER_LIST_REQUEST,
  });

  axios
  .get(`${base_url}/employee/employees/filter/${filter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_FILTER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_FILTER_LIST_FAILURE,
        payload: err,
      });
    });
};
/**
 * set company name, domain and logo from clearbit
 */
export const setClearbitData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_CLEARBIT_DATA,
    payload: data,
  });
};

//get specific employeeDetails by emp Id
export const getEmployeeById = (employeeId) => (dispatch) => {
  // console.log("inside getAccountById");
  dispatch({
    type: types.GET_EMPLOYEE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateEmployeeById = (data,employeeId,cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_EMPLOYEE_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/employee/${employeeId}`,data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EMPLOYEE_BY_ID_SUCCESS,
        payload: res.data
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      // if (id === userId) {
      // }
      dispatch({
        type: types.UPDATE_EMPLOYEE_BY_ID_FAILURE,
        payload: err,
      });
    });
};

//employee Modal
export const handleEmployeeModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMPLOYEE_MODAL,
    payload: modalProps,
  });
};

/**
 * get Employees Notes
 */
export const getNotesListByEmployeeId = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_NOTES_LIST_BY_EMPLOYEE_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/notes/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTES_LIST_BY_EMPLOYEE_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTES_LIST_BY_EMPLOYEE_ID_FAILURE,
        payload: err,
      });
    });
};

export const addNote = (note, cb) => (dispatch) => {
  dispatch({ type: types.ADD_TASK_NOTES_REQUEST });
  axios
    .post(`${base_url}/employee/notes`, note, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.ADD_TASK_NOTES_SUCCESS,
        payload: res.note,
      });
      console.log(res);
      cb && cb();
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_TASK_NOTES_FAILURE,
        payload: err,
      });
      console.log(err);
      cb && cb();
    });
};

/**
 * get documents of an employee
 */
export const getEmployeeDocument = (employeeId) => (dispatch) => {
  dispatch({ type: types.GET_EMPLOYEE_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/employee/document/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const deleteDocument = (documentId) => (dispatch, getState) => {
  console.log("inside deleteDocument", documentId);
  // const { opportunityId } = getState("opportunity").opportunity.opportunity;
  dispatch({
    type: types.DELETE_DOCUMENT_REQUEST,
  });

  // axios
  //   .delete(`${base_url}/opportunity/${opportunityId}/document/${documentId}`, {
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("token") || "",
  //     },
  //   })
  //   .then((res) => {
  //     dispatch({
  //       type: types.DELETE_DOCUMENT_SUCCESS,
  //       payload: employeeId,
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: types.DELETE_DOCUMENT_FAILURE,
  //       payload: err,
  //     });
  //   });
};

/**
 * document upload modal in opportunity
 */
export const handleDocumentUploadModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DOCUMENT_UPLOAD_MODAL,
    payload: modalProps,
  });
};

/**
 * link document to a employee
 */
export const addEmployeeDocument = (documentId, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.ADD_EMPLOYEE_DOCUMENT_REQUEST });
  axios
    // .put(`${base_url}/opportunity/document/${documentId}`, data, {
    //   headers: {
    //     Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    //   },
    // })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_EMPLOYEE_DOCUMENT_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_EMPLOYEE_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

export const handleEmployeeDrawerForAdmin = (isVisible) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMPLOYEE_DRAWER_FOR_ADMIN,
    payload: { isVisible: isVisible },
  });
};

//suspend
export const suspendEmployee = ( cb,employeeId,suspendInd) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.SUSPEND_EMPLOYEE_REQUEST,
  });
  axios
    .put(`${base_url}/suspend/employee/${employeeId}/${suspendInd}`,{},{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          
        },
      })
    .then((res) => {
      dispatch({
        type: types.SUSPEND_EMPLOYEE_SUCCESS,
        payload: res.data,
      });
      cb && cb("success", res.data.message, res.data.assignInd);
    })
    .catch((err) => {
      // debugger;
      console.log(err);
      dispatch({
        type: types.SUSPEND_EMPLOYEE_FAILURE,
        payload: err,
      });
      cb && cb("failuer", null, null);
    });
};


//SEARCH
export const inputEmployeeDataSearch = (name) => (dispatch) => {
  dispatch({
    type: types.INPUT_EMPLOYEE_SEARCH_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/employee/details/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.employeeId) {
        console.log(res.data);
        // dispatch(getAllLatestContactsForLazyLoading(res.data));
      }

      dispatch({
        type: types.INPUT_EMPLOYEE_SEARCH_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.INPUT_EMPLOYEE_SEARCH_DATA_FAILURE,
        payload: err,
      });
    });
};

export const shareEmployeePermission = (data, userId) => (
  dispatch,
  getState
) => {
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.ADD_SHARE_EMPLOYEE_PERMISSION_REQUEST,
  });

  axios
    .post(`${base_url}/permission/details`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getEmployeeListByUserId(userId));
      // dispatch(getRecords(userId));
      dispatch({
        type: types.ADD_SHARE_EMPLOYEE_PERMISSION_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SHARE_EMPLOYEE_PERMISSION_FAILURE,
        payload: err,
      });
      // cb && cb("failure");
    });
};
export const getEmployeePermissionsList = () => (dispath) => {
  dispath({ type: types.GET_PERMISSIONS_LIST_REQUEST });
  axios
    .get(`${base_url}/permission/type?type=${"employee"}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSIONS_LIST_FAILURE,
        payload: err,
      });
    });
};


export const suspendStatus = (data,cb,employeeId ) => (
  dispatch,
  getState
) => {
  // debugger;
  // const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.SUSPEND_STATUS_REQUEST,
  });
  axios
    .put(`${base_url}/active/employee/${employeeId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // dispatch(getCandidateListByUserId(userId));
      dispatch({
        type: types.SUSPEND_STATUS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success", res.data.message, res.data.suspendInd);
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.SUSPEND_STATUS_FAILURE,
        payload: err,
      });
       cb && cb("failuer");
    });
};
export const employeeStatus = ( data,employeeId,userId,cb) => (dispatch, getState) => {
  //console.log(permissions, userId);
  // const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.EMPLOYEE_STATUS_REQUEST,
  });
  axios
  .put(`${base_url}/employee/update/UserType/${employeeId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      // dispatch(getEmployeelist(userId));
      dispatch({
        type: types.EMPLOYEE_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.EMPLOYEE_STATUS_FAILURE,
        payload: err,
      });
    })
};

export const linkEmployeeDefult = (data, employeeId) => (
  dispatch,
  getState
) => {
  // debugger;
  const { userId } = getState("auth").auth.userDetails;
  dispatch({
    type: types.LINK_EMPLOYEE_STATUS_REQUEST,
  });
  axios
    .put(`${base_url}/employee/bank-details`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getEmployeelist());
      dispatch({
        type: types.LINK_EMPLOYEE_STATUS_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_EMPLOYEE_STATUS_FAILURE,
        payload: err,
      });
      // cb && cb("failuer");
    });
};

export const addUserAdmin = (data,employeeId) => (dispatch) => {
  dispatch({
    type: types.ADD_USER_ADMIN_REQUEST,
  });
  axios
    .put(`${base_url}/employee/update/role/user-admin/${employeeId}`,data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_USER_ADMIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_USER_ADMIN_FAILURE,
        payload: err,
      });
    });
};


export const getAllCustomerEmployeelist = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_CUSTOMER_EMPLOYEE_LIST_REQUEST,
  });
  axios
     .get(`${base_url}/customer/employee/create/all-employees`, {
     headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_CUSTOMER_EMPLOYEE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_CUSTOMER_EMPLOYEE_LIST_FAILURE,
        payload: err,
      });
    });
};
export const getEmployeeData = (employeeType) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_DATA_REQUEST,
  });

  axios
  .get(`${base_url}/employee/employees/${employeeType}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getRecords = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/employee/count/${orgId}`, {
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

export const addCertificationByUserId = (data, employeeId) => (dispatch) => {
    
  dispatch({
    type: types.ADD_CERTIFICATION_BY_USER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/employee/certification`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCertificationByUserId(employeeId));
      dispatch({
        type: types.ADD_CERTIFICATION_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CERTIFICATION_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getCertificationByUserId = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_CERTIFICATION_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/certification/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CERTIFICATION_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CERTIFICATION_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
export const deleteCertificationByUserId = (employeeCertificationLinkId,employeeId) => (
  dispatch
) => {
  dispatch({
    type: types.DELETE_CERTIFICATION_BY_USER_ID_REQUEST,
  });
  axios
    .delete(`${base_url}/employee/certification/${employeeCertificationLinkId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_CERTIFICATION_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
      dispatch(getCertificationByUserId(employeeId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_CERTIFICATION_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateExperienceByEmployeeId= (data,keySkillId,employeeId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_EXPERIENCE_BY_EMPLOYEE_ID_REQUEST,
  });


  axios
    .put(`${base_url}/employee/keySkill/${keySkillId}`,data,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     dispatch(getTopicsByUserId(employeeId));
      dispatch({
        type: types.UPDATE_EXPERIENCE_BY_EMPLOYEE_ID_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EXPERIENCE_BY_EMPLOYEE_ID_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};

export const getTopicsByUserId = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_TOPICS_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/key-skills/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TOPICS_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TOPICS_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};


export const getEmployeeExperienceById = (candidateId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_EXPERIENCE_BY_ID_REQUEST,
  });
  axios
    .get(`${base_url}/candidate/skill-set/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_EXPERIENCE_BY_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_EXPERIENCE_BY_ID_FAILURE,
        payload: err,
      });
    });
};



export const deleteTopicByUserId = (keySkillsId, employeeId) => (dispatch) => {
  dispatch({
    type: types.DELETE_TOPIC_BY_USER_ID_REQUEST,
  });
  axios
    .delete(`${base_url}/employee/${employeeId}/key-skills/${keySkillsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TOPIC_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
      dispatch(getTopicsByUserId(employeeId));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TOPIC_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
export const addTopicByUserId = (data, employeeId) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.ADD_TOPIC_BY_USER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/employee/key-skills`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTopicsByUserId(employeeId));
      dispatch({
        type: types.ADD_TOPIC_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOPIC_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
export const handleEmployeePulseDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMPLOYEE_PULSE_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const handleEmployeeDocumentDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMPLOYEE_DOCUMENT_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const getEmployeeTreeMap = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_TREE_MAP_REQUEST,
  });
  axios
    .get(`${base_url}/employee/tree/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_TREE_MAP_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_EMPLOYEE_TREE_MAP_FAILURE,
        payload: err,
      });
    });
};

export const getEmployeeAllDocument = (candidateId) => (dispatch) => {
  dispatch({ type: types.GET_EMPLOYEE_ALL_DOCUMENTS_REQUEST });
  axios
    .get(`${base_url}/candidate/document/${candidateId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_ALL_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
      // cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_ALL_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateEmployeeModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_EMPLOYEE_MODAL,
    payload: modalProps,
  });
};

export const handleOnboardingEmployeeModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ONBOARDING_EMPLOYEE_MODAL,
    payload: modalProps,
  });
};

export const setEditEmployee = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EMPLOYEE_EDIT,
    payload: name,
  });
};

export const updateEmployee = (data, employeeId) => (dispatch) => {
  dispatch({ type: types.UPDATE_EMPLOYEE_REQUEST });
  axios
    .put(`${base_url}/employee/update/${employeeId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_EMPLOYEE_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Info Updated Succefully',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_EMPLOYEE_FAILURE,
        payload: err,
      });
    });
};

export const ClearReducerDataOfEmployee = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_EMPLOYEE,
  });
};

export const handleNotifyDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_NOTIFY_DRAWER,
    payload: modalProps,
  });
};

export const UpdateAdminUser = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_ADMIN_USER_REQUEST });
  axios
    .put(`${base_url}/employee/update/admin-user/user-admin`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_ADMIN_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ADMIN_USER_FAILURE,
        payload: err,
      });
    });
};

export const getAdminUser = (employeeId) => (dispatch) => {
  dispatch({
    type: types.GET_ADMIN_USER_REQUEST,
  });
    axios
  .get(`${base_url}/employee/adminUpdate/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ADMIN_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ADMIN_USER_FAILURE,
        payload: err,
      });
    });
};

export const getAssignedToList = (orgId) => (dispatch) => {
 
  dispatch({
    type: types.GET_ASSIGENED_TO_REQUEST,
  });
  axios
    .get(`${base_url}/employee/active/user/drop-down/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ASSIGENED_TO_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ASSIGENED_TO_FAILURE,
        payload: err,
      });
    });
};

export const getProcessDropdownForOnboarding = (orgId) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_DROPDOWN_FOR_ONBOARDING_REQUEST,
  });
  axios
    .get(`${base_url}/unboardingWorkflow/for_dropdown/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_DROPDOWN_FOR_ONBOARDING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_DROPDOWN_FOR_ONBOARDING_FAILURE,
        payload: err,
      });
    });
};

export const addOnboardingEmployee = (employeeId,data) => (dispatch) => {
  dispatch({ type: types.ADD_ONBOARDING_EMPLOYEE_REQUEST });
  axios
    .put(`${base_url}/employee/onboarding/${employeeId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data);
      console.log(res);
      dispatch({
        type: types.ADD_ONBOARDING_EMPLOYEE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ONBOARDING_EMPLOYEE_FAILURE,
        payload: err,
      });
    });
};

