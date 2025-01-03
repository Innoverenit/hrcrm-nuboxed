import * as types from "./RoleActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../../Config/Auth";
import { message } from "antd";

export const getRoles = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_ROLES_REQUEST,
    });
    axios
      .get(`${base_url}/roleType/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_ROLES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_ROLES_FAILURE,
          payload: err,
        });
      });
  };

  export const addRoles = (roleType,orgId,cb) => (dispatch,getState) => {
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.ADD_ROLES_REQUEST,
    });
    axios
      .post(`${base_url}/roleType`, roleType, 
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // message.error(roleType.message)
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
            title: 'Role added Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        dispatch(getRoles(orgId));
        dispatch(getRoleCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_ROLES_SUCCESS,
          payload: { 
            ...roleType, 
            // leadDocumentId: res.data 
            // userId: res.data ,
            // orgId:res.data 
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ROLES_FAILURE,
        });
        // if (err.response && err.response.status === 400) {
        //   // Handle the error message sent by the backend
        //   message.error(err.response.data.message);
        // } else {
        //   message.error("An error occurred while adding the role.");
        // }
        cb();
      });
  };


  export const updateRoles = (data,roleTypeId,  cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_ROLES_REQUEST,
    });
    axios
      .put(
        `${base_url}/roleType`,
       data,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Role updated Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("Role updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_ROLES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_ROLES_FAILURE,
        });
      });
  };
  export const searchRoleName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_ROLE_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/roleType/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_ROLE_SEARCH_SUCCESS,
          payload: res.data,
        });
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_ROLE_SEARCH_FAILURE,
          payload: err,
        });
      });
  };
  export const removeRole = (roleTypeId,orgId, cb) => (dispatch) => {    
    dispatch({
        type: types.REMOVE_ROLE_REQUEST,
    });
    axios
        .delete(`${base_url}/roleType/${roleTypeId}`,{
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        })
        .then((res) => {
          dispatch(getRoleCount(orgId));
          Swal.fire({
            icon: 'success',
            title: 'Role deleted Successfully!',
            showConfirmButton: false,
            timer: 1500,
          
          })
          // message.success("Role deleted successfully!");
            console.log(res);
            dispatch({
                type: types.REMOVE_ROLE_SUCCESS,
                payload: roleTypeId,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REMOVE_ROLE_FAILURE,
            });
        });
};

export const getTalentRoles = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_TALENT_ROLES_REQUEST,
  });
  axios
    .get(`${base_url}/roleTypeExternal/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TALENT_ROLES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TALENT_ROLES_FAILURE,
        payload: err,
      });
    });
};

export const addTalentRoles = (roleType,orgId,cb) => (dispatch) => {
  // console.log(departments);
  dispatch({
    type: types.ADD_TALENT_ROLES_REQUEST,
  });
  axios
    .post(`${base_url}/roleTypeExternal`, roleType, 
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getExternalRoleCount(orgId));
      
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
          title: 'Role added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res);
      dispatch({
        type: types.ADD_TALENT_ROLES_SUCCESS,
        payload: { 
          ...roleType, 
          // leadDocumentId: res.data 
          // userId: res.data ,
          // orgId:res.data 
        },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TALENT_ROLES_FAILURE,
      });
      cb();
    });
};


export const updateTalentRoles = (data,roleTypeExternalId, cb) => (dispatch) => {
  // console.log(leadDocumentsId, DocumentsName);
  dispatch({
    type: types.UPDATE_TALENT_ROLES_REQUEST,
  });
  axios
    .put(
      `${base_url}/roleTypeExternal`,
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Role updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("Role updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_TALENT_ROLES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TALENT_ROLES_FAILURE,
      });
    });
};


export const removeTalentRole = (roleTypeExternalId,orgId, cb) => (dispatch) => {    
  dispatch({
      type: types.REMOVE_TALENT_ROLE_REQUEST,
  });
  axios
      .delete(`${base_url}/roleTypeExternal/${roleTypeExternalId}`,{
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        dispatch(getExternalRoleCount(orgId));
        Swal.fire({
          icon: 'success',
          title: 'Role deleted Successfully!',
          showConfirmButton: false,
          timer: 1500,
        })
        // message.success("Role deleted successfully!");
          console.log(res);
          dispatch({
              type: types.REMOVE_TALENT_ROLE_SUCCESS,
              payload: roleTypeExternalId,
          });
      })
      .catch((err) => {
          console.log(err);
          dispatch({
              type: types.REMOVE_TALENT_ROLE_FAILURE,
          });
      });
};

export const ClearReducerDataOfRole = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_ROLE,
  });
};


export const ClearReducerDataOfRoleTalent = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_ROLE_TALENT,
  });
};
export const searchRoleTalentName = (name) => (dispatch) => {
  dispatch({
    type: types.GET_ROLE_SEARCH_TALENT_REQUEST,
  });
  axios
    .get(`${base_url}/roleTypeExternal/search/${name}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data.message);
      dispatch({
        type: types.GET_ROLE_SEARCH_TALENT_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_ROLE_SEARCH_TALENT_FAILURE,
        payload: err,
      });
    });
};

export const getRoleCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ROLE_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/category/roleType/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ROLE_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ROLE_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getExternalRoleCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_EXTERNAL_ROLE_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/roleTypeExternal/count/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EXTERNAL_ROLE_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EXTERNAL_ROLE_COUNT_FAILURE,
        payload: err,
      });
    });
};



