import * as types from "./DepartmentActionTypes";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'
/**
 * get all the Department
 */
export const getDepartments = () => (dispatch) => {
  dispatch({
    type: types.GET_DEPARTMENTS_REQUEST,
  });
  axios
    .get(`${base_url}/department`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEPARTMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEPARTMENTS_FAILURE,
        payload: err,
      });
    });
};


/**
* add a new DEPARTMENTS
*/
export const addDepartments = (departments, cb) => (dispatch) => {
  console.log(departments);
  dispatch({
    type: types.ADD_DEPARTMENTS_REQUEST,
  });
  axios
    .post(`${base_url}/department`, departments, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      {res.data.message?  
        message.success(res.data.message):
        Swal.fire({
          icon: 'success',
          title: 'Department has been added Succefully',
          showConfirmButton: false,
          // timer: 1500
        })
      // message.success("Department has been added successfully!");
      }
      dispatch(getDepartments());
      console.log(res);
      dispatch({
        type: types.ADD_DEPARTMENTS_SUCCESS,
        payload: {
          ...departments,
          // leadDocumentId: res.data 
        },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_DEPARTMENTS_FAILURE,
      });
      cb();
    });
};




/**
 * remove a new DEPARTMENT
 */
export const removeDepartments = (departmentId) => (dispatch) => {
    // console.log(leadDocumentsId);
    dispatch({
      type: types.REMOVE_DEPARTMENTS_REQUEST,
    });
    axios
      .delete(`${base_url}/department/${departmentId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Department has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_DEPARTMENTS_SUCCESS,
          payload: departmentId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_DEPARTMENTS_FAILURE,
        });
      });
  };



/**
 *update label of DEPARTMENT
 */
export const updateDepartments = (departmentId, departmentName, sectorId, sectorName, cb) => (dispatch) => {
  // console.log(leadDocumentsId, DocumentsName);
  dispatch({
    type: types.UPDATE_DEPARTMENTS_REQUEST,
  });
  axios
    .put(
      `${base_url}/department`,
      { departmentId, departmentName, sectorId, sectorName, editInd: "true" },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      // message.success("Department has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_DEPARTMENTS_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Department has been updated Successfully',
        showConfirmButton: false,
        // timer: 1500
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_DEPARTMENTS_FAILURE,
      });
    });

};
export const searchDepartmentName = (name) => (dispatch) => {
  dispatch({
    type: types.GET_DEPARTMENT_SEARCH_REQUEST,
  });
  axios
    .get(`${base_url}/department/search/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // const actualData = res.data;
      // const filteredData = actualData.filter((item) => { return item.name !== null })
      message.success(res.data.message);
      dispatch({
        type: types.GET_DEPARTMENT_SEARCH_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_DEPARTMENT_SEARCH_FAILURE,
        payload: err,
        
      });
      
    
    });
}; 


export const linkDepartmentDocumentToggle = ( data,departmentId,cb) => (dispatch) => {
  dispatch({
    type: types.LINK_DEPARTMENT_DOCUMENT_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/mandatoryInd/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch(getDepartments())
      dispatch({
        type: types.LINK_DEPARTMENT_DOCUMENT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DEPARTMENT_DOCUMENT_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const linkCrmToggle = ( data,departmentId,cb) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.LINK_CRM_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/crmInd/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
       dispatch(getDepartments())
      dispatch({
        type: types.LINK_CRM_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_CRM_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const linkImToggle = ( data,departmentId,cb) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.LINK_IM_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/imInd/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
       dispatch(getDepartments())
      dispatch({
        type: types.LINK_IM_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_IM_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const linkAccountingToggle = ( data,departmentId,cb) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.LINK_ACCOUNTING_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/accountInd/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
       dispatch(getDepartments())
      dispatch({
        type: types.LINK_ACCOUNTING_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ACCOUNTING_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const linkErpToggle = ( data,departmentId,cb) => (dispatch) => {
  dispatch({
    type: types.LINK_ERP_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/erpInd/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch(getDepartments())
      dispatch({
        type: types.LINK_ERP_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ERP_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const linkRecuitToggle = ( data,departmentId,cb) => (dispatch) => {
  dispatch({
    type: types.LINK_RECRUIT_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/recruitOppsInd/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch(getDepartments())
      dispatch({
        type: types.LINK_RECRUIT_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_RECRUIT_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const linkHrToggle = ( data,departmentId,cb) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.LINK_HR_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/hrInd/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
       dispatch(getDepartments())
      dispatch({
        type: types.LINK_HR_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_HR_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const ClearReducerDataOfDepartment = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_DEPARTMENT,
  });
};

export const linkElearningToggle = ( data,departmentId,cb) => (dispatch) => {
  dispatch({
    type: types.LINK_ELEARNING_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/department/all/indicator/${departmentId}`, data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch(getDepartments())
      dispatch({
        type: types.LINK_ELEARNING_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ELEARNING_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const addingDeptModules = (data, departmentId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADDING_MODULE_REQUEST,
  });
  axios
    .put(`${base_url}/department/all/indicator/${departmentId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      // dispatch(getDepartments())
      dispatch({
        type: types.ADDING_MODULE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_MODULE_FAILURE,
        payload: err,
      });
    });
};

export const getDepartmentCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DEPARTMENT_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/department/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEPARTMENT_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEPARTMENT_COUNT_FAILURE,
        payload: err,
      });
    });
};
