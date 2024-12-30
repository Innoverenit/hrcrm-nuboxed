import * as types from "./ProjectActionTypes";
import axios from "axios";
import { base_url } from "../../../../Config/Auth";
import { message } from "antd";

export const getProjectsData = (customerId) => (dispatch) => {
  dispatch({
    type: types.GET_PROJECTS_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/ProjectDetails/project-list/${customerId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROJECTS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROJECTS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const addProjectsData = (project, cb) => (dispatch,getState) => {
  const orgId = getState().auth.userDetails.organizationId;
  console.log(project);
  dispatch({
    type: types.ADD_PROJECTS_DATA_REQUEST,
  });
  axios
    .post(`${base_url}/project/save`, project, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Project has been added successfully!");
       dispatch(getProjectsData(orgId));
      console.log(res);
      dispatch({
        type: types.ADD_PROJECTS_DATA_SUCCESS,
        payload: { ...project },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROJECTS_DATA_FAILURE,
      });
    });
};

export const updateProjectsData = (projectId, projectName, cb) => (
  dispatch
) => {
  dispatch({
    type: types.UPDATE_PROJECTS_DATA_REQUEST,
  });
  axios
    .put(
      `${base_url}/project/update`,
      { projectName, projectId ,editInd:"true" 
    },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      message.success("Project has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_PROJECTS_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROJECTS_DATA_FAILURE,
      });
    });
};


export const removeProjectData = ( projectId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_PROJECTS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/project/${projectId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success("Project has been deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_PROJECTS_DATA_SUCCESS,
        payload:projectId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_PROJECTS_DATA_FAILURE,
      });
    });
};
// export const searchProjectName = (name) => (dispatch) => {
//   dispatch({
//     type: types.GET_PROJECT_SEARCH_REQUEST,
//   });
//   axios
//     .get(`${base_url}/taskType/${name}`, {
//       headers: {
//         Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//       },
//     })
//     .then((res) => {
//       message.success(res.data.message);
//       dispatch({
//         type: types.GET_PROJECT_SEARCH_SUCCESS,
//         payload: res.data,
//       });
//     }
//     )
//     .catch((err) => {
//       dispatch({
//         type: types.GET_PROJECT_SEARCH_FAILURE,
//         payload: err,
//       });
//     });
// }; 
