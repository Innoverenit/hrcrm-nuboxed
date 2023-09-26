import * as types from "./DepartmentActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
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
      message.success("Department has been added successfully!");
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
      message.success("Department has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_DEPARTMENTS_SUCCESS,
        payload: res.data,
      });
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


export const linkDepartmentDocumentToggle = ( data,departmentId,cb) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
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
      // dispatch(getThirdPartyAccess(orgId))
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
      // dispatch(getDepartments())
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

export const linkErpToggle = ( data,departmentId,cb) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
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
      // dispatch(getThirdPartyAccess(orgId))
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

