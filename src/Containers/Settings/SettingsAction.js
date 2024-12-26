import * as types from "./SettingsActionTypes";
import { base_url,login_url, base_url2 } from "../../Config/Auth";
import axios from "axios";
import { UPDATE_RECRUITMENT_ADVANCE_SUCCESS } from "../Auth/AuthTypes";
import { message } from "antd";
import Swal from "sweetalert2";
/**
 * goal modal action
 */

export const handleEditProcessModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_EDIT_PROCESS_MODAL,
    payload: modalProps,
  });
};

export const handleCAndidateSequenceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_CANDIDATE_SEQUENCE_MODAL,
    payload: modalProps,
  });
};

export const LinkStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/recruitment/stages/unpublish `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};
// remove supplies

export const removeSuppliers = ( supplierCategoryId,data) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_SUPPLIERS_REQUEST,
  });
  axios
    .delete(`${base_url}/supplier/delete/${supplierCategoryId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
     
      dispatch({
        type: types.DELETE_SUPPLIERS_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,

      })
    })
    // .then((res) => {
    //   dispatch(getCategoryCount(orgId));
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Suppliers deleted Successfully!',
    //   })
    //   // message.success("CATEGORY has been deleted successfully!");
    //   console.log(res);
    //   dispatch({
    //     type: types.REMOVE_SUPPLIERS_SUCCESS,
    //     payload:supplierCategoryId,
    //   });
    // })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_SUPPLIERS_FAILURE,
      });
    });
};

// update suppliers
export const updateSuppliers = ( data,supplierCategoryId) => (dispatch) => {
    
  dispatch({
    type: types.UPDATE_SUPPLIERS_REQUEST,
  });
  axios
    .put(
      `${base_url}/supplier/update/${supplierCategoryId}`,
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
        title: 'Supplier updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("CATEGORY has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_SUPPLIERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SUPPLIERS_FAILURE,
      });
    });
};


// remove shipper

export const removeShipper = ( data,shipperCategoryId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.DELETE_SHIPPER_REQUEST,
  });
  axios
    .delete(`${base_url}/shipper/delete/${shipperCategoryId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
     
      dispatch({
        type: types.DELETE_SHIPPER_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 1500,

      })
    })
    // .then((res) => {
    //   dispatch(getCategoryCount(orgId));
    //   Swal.fire({
    //     icon: 'success',
    //     title: 'Suppliers deleted Successfully!',
    //   })
    //   // message.success("CATEGORY has been deleted successfully!");
    //   console.log(res);
    //   dispatch({
    //     type: types.REMOVE_SUPPLIERS_SUCCESS,
    //     payload:supplierCategoryId,
    //   });
    // })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SHIPPER_FAILURE,
      });
    });
};


export const LinkOpportunityStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_OPPORTUNITY_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/opportunityStages/update/publishInd `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_OPPORTUNITY_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPPORTUNITY_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const handleProcessModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCESS_MODAL,
    payload: modalProps,
  });
};




export const handledealStagesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_DEALS_STAGES_DRAWER_MODAL,
    payload: modalProps,
  });
};


export const emptyDistributionAutomation = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_DISTRIBUTION_AUTOMATION, 
  });
};

export const handleTaskDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_DRAWER,
    payload: modalProps,
  });
};
export const handleProcessHiringModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCESS_HIRING_MODAL,
    payload: modalProps,
  });
};
export const handleRulesModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RULES_MODAL,
    payload: modalProps,
  });
};
export const handleProcessTaskModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROCESS_TASK_MODAL,
    payload: modalProps,
  });
};

export const LinkProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/recruitment/process/unpublish `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const emptySkillLevel = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_SKILL_LEVEL, 
  });
};


export const addTaskForRecruiter = (data, taskTypeId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_TASK_FOR_RECRUIT_REQUEST,
  });

  axios
    .post(`${base_url}/category/task/checklist/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTaskForWorkflow(taskTypeId));
      dispatch({
        type: types.ADD_TASK_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_TASK_FOR_RECRUIT_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};


export const getTaskForRecruit = (organizationId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.GET_TASK_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/taskType/taskcheckList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new task added................", res);
      dispatch({
        type: types.GET_TASK_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const addProcess = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_PROCESS_REQUEST,
  });

  axios
    .post(`${base_url}/process`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcess());
      dispatch({
        type: types.ADD_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FAILURE,
        payload: err,
      });
    });
};
// get default process
export const getDefaultProcess = () => (dispatch) => {
  dispatch({
    type: types.GET_DEFAULT_PROCESS_REQUEST,
  });
  axios
    .get(`${base_url}/defaultprocess`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEFAULT_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEFAULT_PROCESS_FAILURE,
        payload: err,
      });
    });
};

export const getProcess = () => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_REQUEST,
  });
  axios
    .get(`${base_url}/processes`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FAILURE,
        payload: err,
      });
    });
};

export const updateStage = (stageId, stageName, probability, days, cb) => (
  dispatch
) => {
  console.log(stageId, stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_REQUEST,
  });
  axios
    .put(
      `${base_url}/stage/${stageId}`,
      { stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FAILURE,
      });
      cb && cb("error");
    });
};

export const getAllProcessStages = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PROCESS_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/allProcessStages`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_FAILURE,
        payload: err,
      });
    });
};

export const getOppoStages = () => (dispatch) => {
  dispatch({
    type: types.GET_OPPO_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/oppoStages`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPO_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPO_STAGES_FAILURE,
        payload: err,
      });
    });
};
export const getProcessStages = (processId) => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/process/${processId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FAILURE,
        payload: err,
      });
    });
};
export const removeStage = (stageId, cb) => (dispatch) => {
  console.log(stageId);
  dispatch({
    type: types.REMOVE_STAGE_REQUEST,
  });
  axios
    .delete(`${base_url}/stage/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.REMOVE_STAGE_SUCCESS,
        payload: stageId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_STAGE_FAILURE,
      });
    });
};

export const addProcessStage = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_REQUEST });

  axios
    .post(`${base_url}/process/stage`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateProcessName = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_PROCESS_NAME_REQUEST });

  axios
    .put(`${base_url}/updateProcess`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const addProcessTask = (data, cb) => (dispatch) => {
  dispatch({
    type: types.ADD_PROCESS_TASK_REQUEST,
  });

  axios
    .post(`${base_url}/stage/task`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_TASK_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_TASK_FAILURE,
        payload: err,
      });
      cb && cb("Failure");
    });
};

export const getProcessTask = (stageId) => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_TASK_REQUEST,
  });
  axios
    .get(`${base_url}/stage/task/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_TASK_FAILURE,
        payload: err,
      });
    });
};

/**
 * get department
 */
export const getDepartments = () => (dispatch) => {
  dispatch({
    type: types.GET_DEPARTMENTS_REQUEST,
  });
  axios
    .get(`${base_url}/departments`, {
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
 * get levels
 */
export const getLevels = () => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_LEVELS_REQUEST,
  });
  axios
    .get(`${base_url}/level`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEVELS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LEVELS_FAILURE,
        payload: err,
      });
    });
};
export const updateTask = (id, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_TASK_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/task/${id}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_BY_ID_FAILURE,
        payload: err,
      });
    });
};
export const deleteTask = (taskId) => (dispatch, getState) => {
  console.log("inside deleteTask", taskId);
  dispatch({
    type: types.DELETE_TASK_REQUEST,
  });

  axios
    .delete(`${base_url}/globalTask/${taskId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TASK_SUCCESS,
        payload: taskId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_FAILURE,
        payload: err,
      });
    });
};
export const updateTaskResuffel = (task) => (dispatch) => {
  console.log(task);

  const final = task.map((task, i) => {
    return { ...task, sequence: (i += 1) };
  });
  console.log(final);

  // const object1 = task[0];
  // const object2 = task[1];
  // const finalData = [
  //   { ...object1, sequence: object2.sequence },
  //   { ...object2, sequence: object1.sequence },
  // ];

  dispatch({
    type: types.UPDATE_TASK_RESUFFEL_BY_ID_REQUEST,
  });
  axios
    .post(`${base_url}/tasksuffle`, final, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_RESUFFEL_BY_ID_SUCCESS,
        payload: final,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_RESUFFEL_BY_ID_FAILURE,
        payload: err,
      });
    });
};

export const updateTaskData = (taskId, data, cb) => (dispatch) => {
  //debugger
  console.log("inside updateTaskData");
  dispatch({
    type: types.UPDATE_PROCESS_TASK_REQUEST,
  });

  axios
    .put(`${base_url}/update/globalTask/${taskId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_TASK_SUCCESS,
        payload: taskId,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};
export const handleTaskModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TASK_MODAL,
    payload: modalProps,
  });
};
export const setEditTask = (name) => (dispatch) => {
  dispatch({
    type: types.SET_TASK_EDIT,
    payload: name,
  });
};

//recruiter
export const addProcessForRecruiter = (data, organizationId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_RECRUIT_REQUEST,
  });

  axios
    .post(`${base_url}/recruitment/process`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcessForRecruit(organizationId));
      dispatch({
        type: types.ADD_PROCESS_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_RECRUIT_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};



export const getProcessForRecruit = (organizationId,type) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/publish/for_dropdown/${organizationId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const getProcessStagesForRecruit = (processId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/process/${processId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const addProcessStageForRecruit = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_RECRUIT_REQUEST });

  axios
    .post(`${base_url}/recruitment/process/stage`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_RECRUIT_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateProcessNameForRecruit = (process, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_RECRUIT_REQUEST });

  axios
    .put(`${base_url}/employee/recruitment-details`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateStageForRecruit = (
  stageId,
  responsible,
  stageName,
  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_RECRUIT_REQUEST,
  });
  axios
    .put(
      `${base_url}/employee/recriutment-stage`,
      { stageId, responsible, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("error");
    });
};

export const getAllProcessStagesForRecruit = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/all/process`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_PROCESS_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};

export const addLeaves = (data, countryId) => (dispatch) => {
  dispatch({ type: types.ADD_LEAVES_REQUEST });

  axios
    .put(`${base_url}/rule/leaves`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getLeavesDetails(countryId));
      message.success("Data has been Updated successfully!");
      dispatch({
        type: types.ADD_LEAVES_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LEAVES_FAILURE,
      });
      // cb && cb("Failure");
    });
};
//GET LEAVES DETAILS
export const getLeavesDetails = (countryId) => (dispatch) => {
  dispatch({ type: types.GET_LEAVES_DETAIL_REQUEST });

  axios
    .get(`${base_url}/rule/leaves/${countryId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEAVES_DETAIL_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LEAVES_DETAIL_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const getSignatureInd = () => (dispatch) => {
  dispatch({ type: types.GET_SIGNATURE_REQUEST });

  axios
    .get(`${base_url}/check/signature`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SIGNATURE_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SIGNATURE_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const handleEmailModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_EMAIL_MODAL,
    payload: modalProps,
  });
};

export const handleWebsiteModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_WEBSITE_MODAL,
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

export const dataClear = () => (dispatch) => {
  dispatch({ type: types.DATA_CLEAR });
};

export const enableRecruitmentAdvance = (organizationId) => (dispatch) => {
  console.log("print organization Id ...........", organizationId);
  dispatch({
    type: types.ENABLE_RECRUITMENT_ADVANCE_REQUEST,
  });
  axios
    .post(
      `${base_url}/advance/recruitment/enable/${organizationId}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log("inside then");
      dispatch({
        type: types.ENABLE_RECRUITMENT_ADVANCE_SUCCESS,
        payload: { organizationId },
      });
      dispatch({
        type: UPDATE_RECRUITMENT_ADVANCE_SUCCESS,
        payload: res.data.advanceRecruitmentInd,
      });
    })
    .catch((err) => {
      console.log("inside catch");
      console.log(err);
      dispatch({
        type: types.ENABLE_RECRUITMENT_ADVANCE_FAILURE,
        payload: err,
      });
    });
};

//GET LEAVES DETAILS
export const getMileageDetails = (orgId) => (dispatch) => {
  dispatch({ type: types.GET_MILEAGE_DETAIL_REQUEST });

  axios
    .get(`${base_url}/mileage/rate/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MILEAGE_DETAIL_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MILEAGE_DETAIL_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const updateMileage = (data, orgId) => (dispatch, getState) => {
  // const orgId = getState().auth.userDetails.orgId;
  dispatch({ type: types.UPDATE_MILEAGE_REQUEST });

  axios
    .post(`${base_url}/mileage/rate`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getMileageDetails(orgId));
      dispatch({
        type: types.UPDATE_MILEAGE_SUCCESS,
        payload: res.data,
      });
      // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_MILEAGE_FAILURE,
      });
      // cb && cb("Failure");
    });
};

export const handleApprovalModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_APPROVAL_MODAL,
    payload: modalProps,
  });
};


export const addApproval = (data,) => (dispatch) => {
  dispatch({ type: types.ADD_APPROVAL_REQUEST });
  axios
    .post(`${base_url}/approve/save/processName/subProcessName`, data, {

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getApprovalData());
      dispatch({
        type: types.ADD_APPROVAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_APPROVAL_FAILURE,
      });
    });
};

export const getApprovalData = (stageId) => (dispatch) => {
  dispatch({
    type: types.GET_APPROVAL_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/approve/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVAL_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVAL_DATA_FAILURE,
        payload: err,
      });
    });
};

export const addCommission = (data, orgId, type) => (dispatch) => {
  dispatch({ type: types.ADD_COMMISSION_REQUEST });
  axios
    .post(`${base_url}/commission`, data, {

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCommissionTable(orgId, type));
      dispatch({
        type: types.ADD_COMMISSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_COMMISSION_FAILURE,
      });
    });
};

export const getCommission = () => (dispatch) => {
  dispatch({
    type: types.GET_COMMISSION_REQUEST,
  });
  axios
    .get(`${base_url}/employee/all-sales`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMISSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMISSION_FAILURE,
        payload: err,
      });
    });
};
//GET COMMISSION TABLE
export const getCommissionTable = (orgId, type) => (dispatch) => {
  dispatch({
    type: types.GET_COMMISSION_TABLE_REQUEST,
  });
  axios
    .get(`${base_url}/commission/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COMMISSION_TABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COMMISSION_TABLE_FAILURE,
        payload: err,
      });
    });
};


export const updateCommission = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_COMMISSION_REQUEST });

  axios
    .put(`${base_url}/updateProcess`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_COMMISSION_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_COMMISSION_FAILURE,
      });
      cb && cb("Failure");
    });
};
export const setEditCommission = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_COMMISSION,
    payload: name,
  })
}

export const handleCommission = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_COMMISSION_MODAL,
    payload: modalProps,
  });
};

export const addRecruiter = (data, orgId, type) => (dispatch) => {
  dispatch({ type: types.ADD_RECRUITER_REQUEST });
  axios
    .post(`${base_url}/commission`, data, {

      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getRecruiterTable(orgId, type));
      dispatch({
        type: types.ADD_RECRUITER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_RECRUITER_FAILURE,
      });
    });
};

export const getRecruiter = () => (dispatch) => {
  dispatch({
    type: types.GET_RECRUITER_REQUEST,
  });
  axios
    .get(`${base_url}/employee/all-recruiter`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUITER_FAILURE,
        payload: err,
      });
    });
};


//GET RECRUITER TABLE
export const getRecruiterTable = (orgId, type) => (dispatch) => {
  dispatch({
    type: types.GET_RECRUITER_TABLE_REQUEST,
  });
  axios
    .get(`${base_url}/commission/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_RECRUITER_TABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_RECRUITER_TABLE_FAILURE,
        payload: err,
      });
    });
};

// add website
export const addWebsite = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_WEBSITE_REQUEST,
  });
  axios
    .post(`${base_url}/recruitment/website`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getWebsite(orgId));
      dispatch({
        type: types.ADD_WEBSITE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_WEBSITE_FAILURE,
        payload: err,
      });
    });
};
// get  website
export const getWebsite = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_WEBSITE_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/website/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WEBSITE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WEBSITE_FAILURE,
        payload: err,
      });
    });
};

// get Scheduler
export const getScheduler = (departmentId) => (dispatch) => {
  dispatch({
    type: types.GET_SCHEDULER_BY_ORG_ID_REQUEST,
  });
  axios
    .get(`${base_url}/ruleEngine/report/scheduling/${departmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_SCHEDULER_BY_ORG_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SCHEDULER_BY_ORG_ID_FAILURE,
        payload: err,
      });
    });
};
//Add Scheduler
export const addScheduler = (data, departmentId) => (dispatch) => {

  dispatch({
    type: types.ADD_SCHEDULER_BY_ORG_ID_REQUEST,
  });
  axios
    .post(`${base_url}/ruleEngine/report/scheduling`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getScheduler(departmentId));
      dispatch({
        type: types.ADD_SCHEDULER_BY_ORG_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCHEDULER_BY_ORG_ID_FAILURE,
        payload: err,
      });
    });
};
// get Scheduler customer
export const getSchedulerCustomer = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SCHEDULER_CUSTOMER_REQUEST,
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
        type: types.GET_SCHEDULER_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SCHEDULER_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};
//Add Scheduler Customer
export const addSchedulerCustomer = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_SCHEDULER_CUSTOMER_REQUEST,
  });
  axios
    .post(`${base_url}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getSchedulerCustomer(orgId));
      dispatch({
        type: types.ADD_SCHEDULER_CUSTOMER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCHEDULER_CUSTOMER_FAILURE,
        payload: err,
      });
    });
};

// get Scheduler Vendor
export const getSchedulerVendor = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SCHEDULER_VENDOR_REQUEST,
  });
  axios
    .get(`${base_url}/partner/all-partner`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      dispatch({
        type: types.GET_SCHEDULER_VENDOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SCHEDULER_VENDOR_FAILURE,
        payload: err,
      });
    });
};
//Add Scheduler Vendor
export const addSchedulerVendor = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_SCHEDULER_VENDOR_REQUEST,
  });
  axios
    .post(`${base_url}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getSchedulerVendor(orgId));
      dispatch({
        type: types.ADD_SCHEDULER_VENDOR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SCHEDULER_VENDOR_FAILURE,
        payload: err,
      });
    });
};

export const addingThirdPartyAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_THIRD_PARTY_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/engagement/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getThirdPartyAccess(orgId))

      // dispatch(getThirdPartyMonetizeAccess(orgId))
      //dispatch(getThirdPartyMonetizeAccess(orgId))
      dispatch({
        type: types.ADDING_THIRD_PARTY_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_THIRD_PARTY_ACCESS_FAILURE,
        payload: err,
      });
    })
};
export const getThirdPartyAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_THIRD_PARTY_ACCESS_REQUEST });
  axios
    .get(`${base_url}/engagement/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_THIRD_PARTY_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_THIRD_PARTY_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const addingThirdPartyVendorAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_THIRD_PARTY_VENDOR_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/third_party/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getThirdPartyVendorAccess(orgId))
      dispatch({
        type: types.ADDING_THIRD_PARTY_VENDOR_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_THIRD_PARTY_VENDOR_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const getThirdPartyVendorAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_THIRD_PARTY_VENDOR_ACCESS_REQUEST });
  axios
    .get(`${base_url}/third_party/patner/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_THIRD_PARTY_VENDOR_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_THIRD_PARTY_VENDOR_ACCESS_FAILURE,
        payload: err,
      });
    });
};



export const addDepartmentAccess = (data, roleTypeId) => (dispatch) => {
  //console.log(permissions, userId);
  dispatch({
    type: types.ADDING_DEPARTMENT_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/access/department`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getDepartmentAccess(roleTypeId))
      dispatch({
        type: types.ADDING_DEPARTMENT_ACCESS_SUCCESS,
        payload: res.data,
      });
      message.success("Privileges have been updated Successfully!!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_DEPARTMENT_ACCESS_FAILURE,
        payload: err,
      });
      message.error("Privileges have been Not updated!!")
    });
};


export const getDepartmentAccess = (roleTypeId) => (dispath) => {
  dispath({ type: types.GET_DEPARTMENT_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/access/department/${roleTypeId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispath({
        type: types.GET_DEPARTMENT_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_DEPARTMENT_ACCESS_FAILURE,
        payload: err,
      });
    });
};



export const getDepartmentList = (orgId) => (dispath) => {
  dispath({ type: types.GET_DEPARTMENT_LIST_REQUEST });
  axios
    .get(`${base_url}/department/accesss/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_DEPARTMENT_LIST_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_DEPARTMENT_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getThirdPartyMonetizeAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_THIRD_PARTY_MONETIZE_REQUEST });
  axios
    .get(`${base_url}/third_party/monitize/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_THIRD_PARTY_MONETIZE_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_THIRD_PARTY_MONETIZE_FAILURE,
        payload: err,
      });
    });
};
export const addingComplianceGdpr = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_COMPLIANCE_GDPR_REQUEST,
  });
  axios
    .post(`${base_url}/permission/candidate/access/compliance`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getComplianceGdpr(orgId))
      dispatch({
        type: types.ADDING_THIRD_PARTY_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_COMPLIANCE_GDPR_FAILURE,
        payload: err,
      });
    });
};

export const getComplianceGdpr = (orgId) => (dispath) => {
  dispath({ type: types.GET_COMPLIANCE_GDPR_REQUEST });
  axios
    .get(`${base_url}/compliance/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_COMPLIANCE_GDPR_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_COMPLIANCE_GDPR_FAILURE,
        payload: err,
      });
    });
};

export const addingUpWorkAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_UP_WORK_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/recruitment/upwork`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getUpWorkAccess(orgId))
      dispatch({
        type: types.ADDING_UP_WORK_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_UP_WORK_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const getUpWorkAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_UP_WORK_ACCESS_REQUEST });
  axios
    .get(`${base_url}/recruitment/upwork/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_UP_WORK_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_UP_WORK_ACCESS_FAILURE,
        payload: err,
      });
    });
};


export const addingCommunicationAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_COMMUNICATION_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/communication/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getCommunicationAccess(orgId))
      dispatch({
        type: types.ADDING_COMMUNICATION_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_COMMUNICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const getCommunicationAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_COMMUNICATION_ACCESS_REQUEST });
  axios
    .get(`${base_url}/communication/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_COMMUNICATION_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_COMMUNICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const addingSourcingAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_SOURCING_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/sourcing/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getSourcingAccess(orgId))
      dispatch({
        type: types.ADDING_SOURCING_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_SOURCING_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const getSourcingAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_SOURCING_ACCESS_REQUEST });
  axios
    .get(`${base_url}/sourcing/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_SOURCING_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_SOURCING_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const handleSequenceModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SEQUENCE_MODAL,
    payload: modalProps,
  });
};
export const addingPermissionAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_PERMISSION_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/candidate`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getPermissionAccess(orgId))
      dispatch({
        type: types.ADDING_PERMISSION_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_PERMISSION_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const getPermissionAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_PERMISSION_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/candidate/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_PERMISSION_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_PERMISSION_ACCESS_FAILURE,
        payload: err,
      });
    });
};

// add website
export const addPartner = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_PARTNER_REQUEST,
  });
  axios
    .post(`${base_url}/recruitment/partner/website`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPartner(orgId));
      dispatch({
        type: types.ADD_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PARTNER_FAILURE,
        payload: err,
      });
    });
};
export const getPartner = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_PARTNER_REQUEST,
  });
  axios
    .get(`${base_url}/recruitment/partner/website/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PARTNER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PARTNER_FAILURE,
        payload: err,
      });
    });
};
export const addSequence = (sequence, orgId) => (dispatch) => {


  console.log("inside addSequence");
  dispatch({
    type: types.ADD_SEQUENCE_REQUEST,
  });

  axios
    .post(`${base_url}/sequence`, sequence, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getSequence(orgId));
      dispatch({
        type: types.ADD_SEQUENCE_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SEQUENCE_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};
export const getSequence = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_SEQUENCE_REQUEST,
  });
  axios
    .get(`${base_url}/sequence/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEQUENCE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SEQUENCE_FAILURE,
        payload: err,
      });
    });
};
export const addMonster = (data, orgId) => (dispatch) => {

  dispatch({
    type: types.ADD_MONSTER_REQUEST,
  });
  axios
    .post(`${base_url}/monster/credentials`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getMonster(orgId));
      dispatch({
        type: types.ADD_MONSTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_MONSTER_FAILURE,
        payload: err,
      });
    });
};
export const getMonster = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_MONSTER_REQUEST,
  });
  axios
    .get(`${base_url}/monster/credentials/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MONSTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MONSTER_FAILURE,
        payload: err,
      });
    });
};

export const getSequenceDetail = (SequenceId) => (dispatch) => {
  dispatch({
    type: types.GET_SEQUENCE_DETAIL_REQUEST,
  });
  axios
    .get(`${base_url}/sequence/rule/${SequenceId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SEQUENCE_DETAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SEQUENCE_DETAIL_FAILURE,
        payload: err,
      });
    });
};
export const getNotifications = (orgId) => (dispath) => {
  dispath({ type: types.GET_NOTIFICATIONS_REQUEST });
  axios
    .get(`${base_url}/notification/rule/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_NOTIFICATIONS_FAILURE,
        payload: err,
      });
    });
};
export const addingNotifications = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADDING_NOTIFICATIONS_REQUEST,
  });
  axios
    .put(`${base_url}/notification/rule/update`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getNotifications(orgId))
      dispatch({
        type: types.ADDING_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_NOTIFICATIONS_FAILURE,
        payload: err,
      });
    });
};

export const getIdentifier = (orgId) => (dispath) => {
  dispath({ type: types.GET_IDENTIFIER_REQUEST });
  axios
    .get(`${base_url}/recruit/code/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_IDENTIFIER_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_IDENTIFIER_FAILURE,
        payload: err,
      });
    });
};
export const addingIdentifier = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADDING_IDENTIFIER_REQUEST,
  });
  axios
    .put(`${base_url}/recruit/code`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getIdentifier(orgId))
      dispatch({
        type: types.ADDING_IDENTIFIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_IDENTIFIER_FAILURE,
        payload: err,
      });
    });
};


export const getRequirementsDuration = (orgId) => (dispath) => {
  dispath({ type: types.GET_REQUIREMENTS_DURATION_REQUEST });
  axios
    .get(`${base_url}/recruit/close/rule/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_REQUIREMENTS_DURATION_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_REQUIREMENTS_DURATION_FAILURE,
        payload: err,
      });
    });
};
export const updateRequirement = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_REQUIREMENT_REQUEST });

  axios
    .put(`${base_url}/recruit/close/rule`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_REQUIREMENT_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_REQUIREMENT_FAILURE,
      });

    });
};

export const updateOpportunity = (process, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_OPPORTUNITIES_REQUEST });

  axios
    .put(`${base_url}/opportunity/close/rule`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_OPPORTUNITIES_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_OPPORTUNITIES_FAILURE,
      });

    });
};


export const getOpportunitiesDuration = (orgId) => (dispath) => {
  dispath({ type: types.GET_OPPORTUNITIES_DURATION_REQUEST });
  axios
    .get(`${base_url}/opportunity/close/rule/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_OPPORTUNITIES_DURATION_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_OPPORTUNITIES_DURATION_FAILURE,
        payload: err,
      });
    });
};
export const addNotificationAccess = (data, userId) => (dispatch) => {
  //console.log(permissions, userId);
  dispatch({
    type: types.ADDING_NOTIFICATION_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/access/notification`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getNotificationAccess(userId))
      dispatch({
        type: types.ADDING_NOTIFICATION_ACCESS_SUCCESS,
        payload: res.data,
      });
      message.success("Privileges have been updated Successfully!!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_NOTIFICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};


export const getNotificationAccess = (userId) => (dispath) => {
  dispath({ type: types.GET_NOTIFICATION_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/access/notification/${userId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispath({
        type: types.GET_NOTIFICATION_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_NOTIFICATION_ACCESS_FAILURE,
        payload: err,
      });
    });
};
export const deleteReportSchedulerInternalData = (reportSchedulingId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/ruleEngine/report-scheduling/${reportSchedulingId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_SUCCESS,
        payload: reportSchedulingId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_REPORT_SCHEDULER_INTERNAL_DATA_FAILURE,
        payload: err,
      });
    });
};

export const deleteSequenceData = (sequenceId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_SEQUENCE_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/sequence/${sequenceId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_SEQUENCE_DATA_SUCCESS,
        payload: sequenceId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SEQUENCE_DATA_FAILURE,
        payload: err,
      });
    });
};
export const addProcessForOpportunity = (data, orgId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_OPPORTUNITY_REQUEST,
  });

  axios
    .post(`${base_url}/workflow/opportunityWorkflow`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcessForOpportunity(orgId));
      dispatch({
        type: types.ADD_PROCESS_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_OPPORTUNITY_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};

export const getProcessForOpportunity = (orgId,navType) => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_FOR_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/publish/for_dropdown/${orgId}/${navType}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const deleteWorkflowData = (processId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_WORKFLOW_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/recruit/delete/workFlow/${processId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_WORKFLOW_DATA_SUCCESS,
        payload: processId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_WORKFLOW_DATA_FAILURE,
        payload: err,
      });
    });
};


export const deleteTaskData = (taskChecklistId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_TASK_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/category/task/checklist/delete/${taskChecklistId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_TASK_DATA_SUCCESS,
        payload: taskChecklistId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_DATA_FAILURE,
        payload: err,
      });
    });
};


export const deleteOpportunityProcessData = (opportunityWorkflowDetailsId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_OPPORTUNITY_PROCESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/opportunityWorkflow/${opportunityWorkflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getProcessForOpportunity(orgId));
      dispatch({
        type: types.DELETE_OPPORTUNITY_PROCESS_DATA_SUCCESS,
        payload: opportunityWorkflowDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_OPPORTUNITY_PROCESS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateSequenceTableData = (data, sequenceId) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SEQUENCE_TABLE_DATA_REQUEST,
  });


  axios
    .put(`${base_url}/sequence/${sequenceId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      //  dispatch(getExperienceByCandidateId(candidateId));
      dispatch({
        type: types.UPDATE_SEQUENCE_TABLE_DATA_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success");
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SEQUENCE_TABLE_DATA_FAILURE,
        payload: err,
      });
      // cb && cb("error");
    });
};
export const updateProcessNameForOpportunity = (process, opportunityWorkflowDetailsId, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_REQUEST });

  axios
    .put(`${base_url}/opportunityWorkflow/${opportunityWorkflowDetailsId}`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_OPPORTUNITY_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const addProcessStageForOpportunity = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_REQUEST });

  axios
    .post(`${base_url}/workflow/opportunityStages`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_OPPORTUNITY_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getProcessStagesForOpportunity = (orgId,workflowId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/stages/for_dropdown/${orgId}/${workflowId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const addingAssessmentAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_ASSESSMENT_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/permission/assessment`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getAssessmentAccess(orgId))
      dispatch({
        type: types.ADDING_ASSESSMENT_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_ASSESSMENT_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const getAssessmentAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_ASSESSMENT_ACCESS_REQUEST });
  axios
    .get(`${base_url}/permission/assessment/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_ASSESSMENT_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_ASSESSMENT_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const addingRemoteAccess = (data, orgId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_REMOTE_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/engagement/access`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getRemoteAccess(orgId))
      dispatch({
        type: types.ADDING_REMOTE_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_REMOTE_ACCESS_FAILURE,
        payload: err,
      });
    })
};

export const getRemoteAccess = (orgId) => (dispath) => {
  dispath({ type: types.GET_REMOTE_ACCESS_REQUEST });
  axios
    .get(`${base_url}/engagement/access/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_REMOTE_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_REMOTE_ACCESS_FAILURE,
        payload: err,
      });
    });
};

export const updateStageForOpportunity = (
  opportunityStagesId,
  stageName,
  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_OPPORTUNITY_REQUEST,
  });
  axios
    .put(
      `${base_url}/opportunityStages/${opportunityStagesId}`,
      { opportunityStagesId, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_OPPORTUNITY_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteHiringStagesData = (stageId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_HIRING_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/recuitment/delete/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_HIRING_STAGES_DATA_SUCCESS,
        payload: stageId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_HIRING_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};

export const deleteOpportunityStagesData = (opportunityStagesId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_OPPORTUNITY_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/opportunityStages/${opportunityStagesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_OPPORTUNITY_STAGES_DATA_SUCCESS,
        payload: opportunityStagesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_OPPORTUNITY_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};
export const handleRecruitmentDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_RECRUITMENT_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const LinkOpportunityProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_OPPORTUNITY_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/opportunityWorkflow/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_OPPORTUNITY_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_OPPORTUNITY_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateSequence = (data, cb) => (dispatch) => {
  dispatch({
    type: types.UPDATE_SEQUENCE_REQUEST,
  });

  axios
    .put(`${base_url}/sequence/rule`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getNotificationTemplate());

      dispatch({
        type: types.UPDATE_SEQUENCE_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_SEQUENCE_FAILURE,
        payload: err,
      });
    });
};


export const addingWeekendAccess = (data, countryName) => (dispatch, getState) => {
  //console.log(permissions, userId);
  const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.ADDING_WEEKEND_ACCESS_REQUEST,
  });
  axios
    .post(`${base_url}/holiday/weekends/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch(getWeekendAccess(countryName))
      dispatch({
        type: types.ADDING_WEEKEND_ACCESS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADDING_WEEKEND_ACCESS_FAILURE,
        payload: err,
      });
    })
};


export const getWeekendAccess = (countryName) => (dispath) => {
  dispath({ type: types.GET_WEEKEND_ACCESS_REQUEST });
  axios
    .get(`${base_url}/holiday/weekends/${countryName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_WEEKEND_ACCESS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_WEEKEND_ACCESS_FAILURE,
        payload: err,
      });
    });
};


export const updateTaskNameForRecruit = (process, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_TASK_NAME_FOR_RECRUIT_REQUEST });

  axios
    .put(`${base_url}/category/task/checklist/update`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_NAME_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_NAME_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const addTaskStageForRecruit = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_TASK_STAGE_FOR_RECRUIT_REQUEST });

  axios
    .post(`${base_url}/category/task/checklist/stage/save`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_TASK_STAGE_FOR_RECRUIT_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TASK_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getTaskStagesForRecruit = (taskChecklistId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_TASK_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/category/task/checklist/stage/link/all/${taskChecklistId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};


export const deleteTaskStagesData = (taskChecklistStagelinkId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_TASK_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/category/task/checklist/stage/delete/${taskChecklistStagelinkId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_TASK_STAGES_DATA_SUCCESS,
        payload: taskChecklistStagelinkId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};


export const updateTaskStageForRecruit = (
  taskChecklistStagelinkId,
  taskChecklistStageName,
  probability,
  days,
  cb
) => (dispatch) => {
  console.log(taskChecklistStagelinkId);
  dispatch({
    type: types.UPDATE_TASK_STAGE_FOR_RECRUIT_REQUEST,
  });
  axios
    .put(
      `${base_url}/category/task/checklist/stage/update`,
      { taskChecklistStagelinkId, taskChecklistStageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_TASK_STAGE_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TASK_STAGE_FOR_RECRUIT_FAILURE,
      });
      cb && cb("error");
    });
};


export const addApprove = (data, subProcessName) => (dispatch) => {
  dispatch({ type: types.ADD_APPROVE_REQUEST });
  axios
    .post(`${base_url}/approve/save/processName/subProcessName`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      
      console.log(res);
      // dispatch(getIndentApprovalData("Indent", "IndentApproval"))
      // dispatch(getApproveData("Leave"))
      // dispatch(getApproveData("Mileage"))
      // dispatch(getApproveData("Expense"))
      // dispatch(getApproveData("ContactUser"))
      // dispatch(getApproveData("PhonePair"))
      // dispatch(getApproveData("ProspectToCustomer"))
      dispatch({
        type: types.ADD_APPROVE_SUCCESS,
        payload: res.data,
      });
      message.success("Level For Approval Added Successfully !!")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_APPROVE_FAILURE,
      });
    });
};


export const addCustomerConfigure = (opportunity, cb) => (dispatch, getState) => {
  //const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_CUSTOMER_CONFIGURE_REQUEST,
  });
  axios
    .put(`${base_url}/baseForm/update/form`, opportunity, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
      // const startDate = dayjs()
      //   .startOf("month")
      //   .toISOString();
      // const endDate = dayjs()
      //   .endOf("month")
      //   .toISOString();
    
      dispatch({
        type: types.ADD_CUSTOMER_CONFIGURE_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CUSTOMER_CONFIGURE_FAILURE,
        payload: err,
      });
    });
};

export const getApproveData = (subProcessName, IndentApproval) => (dispatch) => {
  dispatch({
    type: types.GET_APPROVE_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/approve/${subProcessName}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_APPROVE_DATA_SUCCESS,
        payload: res.data,
      });
      // message.success("Level For Approval Added Successfully !!")

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_APPROVE_DATA_FAILURE,
        payload: err,
      });
    });
};


export const getDepartmentRoleData = (departmentId, page) => (dispatch) => {

  dispatch({
    type: types.GET_DEPARTMENT_ROLE_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/roleType/department/${departmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEPARTMENT_ROLE_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_DEPARTMENT_ROLE_DATA_FAILURE,
        payload: err,
      });
    });
};

export const getTaskForStages = (orgId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.GET_TASK_FOR_STAGES_REQUEST,
  });
  axios
    .get(`${base_url}/taskType/taskcheckList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new task added................", res);
      dispatch({
        type: types.GET_TASK_FOR_STAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FOR_STAGES_FAILURE,
        payload: err,
      });
    });
};


export const getTaskWorkflowStagesForRecruit = (taskId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_REQUEST,
  });
  axios
    .get(`${base_url}/task/subTask/${taskId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WORKFLOW_TASK_STAGES_FOR_RECRUIT_FAILURE,
        payload: err,
      });
    });
};


export const getTaskForWorkflow = (taskTypeId) => (dispatch) => {
  // debugger;
  dispatch({
    type: types.GET_TASK_FOR_WORKFLOW_REQUEST,
  });
  axios
    .get(`${base_url}/category/task/allChecklist/${taskTypeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new task added................", res);
      dispatch({
        type: types.GET_TASK_FOR_WORKFLOW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_FOR_WORKFLOW_FAILURE,
        payload: err,
      });
    });
};

export const addTaskWorkflow = (included, startDate, endDate, taskId, taskChecklistStagelinkId, cb) => (dispatch) => {
  console.log(taskId);
  dispatch({
    type: types.ADD_TASK_WORKFLOW_REQUEST,
  });
  axios
    .post(`${base_url}/task/subTask`, { included, startDate, endDate, taskId, taskChecklistStagelinkId }, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getTaskWorkflowStagesForRecruit(taskId));
      message.success("data has been added successfully!");
      console.log(res);
      dispatch({
        type: types.ADD_TASK_WORKFLOW_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);

      dispatch({
        type: types.ADD_TASK_WORKFLOW_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};

export const getTaskTeamList = (taskId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_TEAM_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/task/teamList/${taskId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_TEAM_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_TEAM_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getLeadAging = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_LEAD_AGING_REQUEST,
  });

  axios
    .get(`${base_url}/leadsCategory/organisation/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEAD_AGING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.GET_LEAD_AGING_FAILURE,
        payload: err,
      });
    });
};
export const addLeadsaging = (data) => (dispatch) => {
  dispatch({
    type: types.ADD_LEAD_AGING_REQUEST,
  });

  axios
    .post(`${base_url}/leadsCategory`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_LEAD_AGING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_LEAD_AGING_FAILURE,
        payload: err,
      });
    });
};

export const addProcessForDeals = (data,  cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_DEALS_REQUEST,
  });

  axios
    .post(`${base_url}/workflow`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //dispatch(getProcessForDeals(orgId));
      dispatch({
        type: types.ADD_PROCESS_FOR_DEALS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_DEALS_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};

export const getProcessForDeals = (orgId,navType) => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_FOR_DEALS_REQUEST,
  });
  axios
  .get(`${base_url}/workflow/publish/for_dropdown/${orgId}/${navType}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_DEALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_DEALS_FAILURE,
        payload: err,
      });
    });
};


export const addProcessStageForDeals = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_DEALS_REQUEST });

  axios
    .post(`${base_url}/workflow/stages`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_DEALS_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_DEALS_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const getProcessStagesForDeals = (workflowDetailsId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_DEALS_REQUEST,
  });
  axios
  .get(`${base_url}/workflow/Stages/${workflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_DEALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_DEALS_FAILURE,
        payload: err,
      });
    });
};
export const LinkDealsProcessPublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_DEALS_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/workflow/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_DEALS_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
    cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DEALS_PROCESS_PUBLISH_FAILURE,
      });
     cb && cb("Failure");
    });
};

export const LinkDealsStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_DEALS_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/Stages/update/publishInd `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_DEALS_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DEALS_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const deleteDealsProcessData = (workflowDetailsId, cb) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_DEALS_PROCESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/${workflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_DEALS_PROCESS_DATA_SUCCESS,
        payload: workflowDetailsId,
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DEALS_PROCESS_DATA_FAILURE,
        payload: err,
      });
      cb && cb("Failure");
    });
};

export const deleteDealsStagesData = (stagesId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_DEALS_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/Stages/${stagesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_DEALS_STAGES_DATA_SUCCESS,
        payload:stagesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_DEALS_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateProcessNameForDeals = (process, workflowDetailsId,cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_DEALS_REQUEST });

  axios
    .put(`${base_url}/workflow/${workflowDetailsId}`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_DEALS_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_DEALS_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const updateStageForDeals = (
  data,
  stagesId,
  
  cb
) => (dispatch) => {
  // console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_DEALS_REQUEST,
  });
  axios
    .put(
      `${base_url}/workflow/stages/${stagesId}`,
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_DEALS_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_DEALS_FAILURE,
      });
      cb && cb("error");
    });
};

export const getAllVat = () => (
  dispatch
) => {
  dispatch({
    type: types.GET_ALL_VAT_REQUEST,
  });
  axios
    .get(`${base_url2}/vat/all-vat`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_VAT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ALL_VAT_FAILURE,
        payload: err,
      });
    });
};

export const websiteSingleMultiple = (process,orgId,activeKey,type, cb) => (dispatch) => {
  dispatch({ type: types.UPDATE_WEBSITE_SINGLE_REQUEST });

  axios
    .put(`${base_url}/distributionAutomation/save`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getDistributionAutomation(orgId,activeKey));
      console.log(res);
      dispatch({
        type: types.UPDATE_WEBSITE_SINGLE_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_WEBSITE_SINGLE_FAILURE,
      });

    });
};


export const getDistributionAutomation = (orgId,type) => (dispath) => {
  dispath({ type: types.GET_DISTRIBUTION_AUTOMATION_REQUEST });
  axios
    .get(`${base_url}/distributionAutomation/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_DISTRIBUTION_AUTOMATION_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_DISTRIBUTION_AUTOMATION_FAILURE,
        payload: err,
      });
    });
};

export const getDepartmentwiserUser = (departmentId) => (dispatch) => {
  dispatch({
    type: types.GET_DEPARTMENTWISE_USER_REQUEST,
  });
  axios
    .get(`${base_url}/employee/list/${departmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEPARTMENTWISE_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEPARTMENTWISE_USER_FAILURE,
        payload: err,
      });
    });
};

export const addNotificationConfig = (data) => (dispatch) => {
  dispatch({ type: types.ADD_NOTIFICATION_CONFIG_REQUEST });

  axios
    .put(`${base_url}/notification/config`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_NOTIFICATION_CONFIG_SUCCESS,
        payload: res.data ,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_NOTIFICATION_CONFIG_FAILURE,
      });
    });
};
export const getNotificationConfig = () => (dispatch) => {
  dispatch({
    type: types.GET_NOTIFICATION_CONFIG_REQUEST,
  });
  axios
    .get(`${base_url}/notification/config/get-all`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_NOTIFICATION_CONFIG_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_NOTIFICATION_CONFIG_FAILURE,
        payload: err,
      });
    });
};

export const addProcessForOnboarding = (data, orgId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_ONBOARDING_REQUEST,
  });

  axios
    .post(`${base_url}/unboardingWorkflow`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcessForOnboarding(orgId));
      dispatch({
        type: types.ADD_PROCESS_FOR_ONBOARDING_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_ONBOARDING_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};

export const getProcessForOnboarding = (orgId) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_FOR_ONBOARDING_REQUEST,
  });
  axios
    .get(`${base_url}/unboardingWorkflow/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_ONBOARDING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_ONBOARDING_FAILURE,
        payload: err,
      });
    });
};


export const updateProcessNameForOnboarding = (process, unboardingWorkflowDetailsId, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_ONBOARDING_REQUEST });

  axios
    .put(`${base_url}/unboardingWorkflow/${unboardingWorkflowDetailsId}`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_ONBOARDING_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_ONBOARDING_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const deleteOnboardingProcessData = (unboardingWorkflowDetailsId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_ONBOARDING_PROCESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/unboardingWorkflow/${unboardingWorkflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_ONBOARDING_PROCESS_DATA_SUCCESS,
        payload: unboardingWorkflowDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_ONBOARDING_PROCESS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const addProcessStageForOnboarding = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_ONBOARDING_REQUEST });

  axios
    .post(`${base_url}/unboardingWorkflow/unboardingStages`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_ONBOARDING_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_ONBOARDING_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getProcessStagesForOnboarding = (unboardingWorkflowId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_ONBOARDING_REQUEST,
  });
  axios
    .get(`${base_url}/unboardingWorkflow/unboardingStages/details/${unboardingWorkflowId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_ONBOARDING_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_ONBOARDING_FAILURE,
        payload: err,
      });
    });
};

export const updateStageForOnboarding = (
  unboardingStagesId,
  // responsible,
  stageName,

  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_ONBOARDING_REQUEST,
  });
  axios
    .put(
      `${base_url}/unboardingWorkflow/unboardingStages/${unboardingStagesId}`,
      { unboardingStagesId, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_ONBOARDING_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_ONBOARDING_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteOnboardingStagesData = (unboardingStagesId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_ONBOARDING_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}unboardingWorkflow/unboardingStages/${unboardingStagesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_ONBOARDING_STAGES_DATA_SUCCESS,
        payload: unboardingStagesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_ONBOARDING_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};




export const addSkillLevel = (customer) => (dispatch, getState) => {
 

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
 
  dispatch({
    type: types.ADD_SKILL_LEVEL_REQUEST,
  });

  axios
    .post(`${base_url}/skillLevel`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(
      //   linkCustomersToOpportunity(opportunityId, { CustomerIds: [res.data] }, cb)
      // );
     

      dispatch({
        type: types.ADD_SKILL_LEVEL_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SKILL_LEVEL_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};



export const getMatrixdata = (activeTab,organizationId) => (dispatch) => {
  dispatch({
    type: types.GET_MATRIX_DATA_REQUEST,
  });
  axios               
    .get(`${base_url}/skillLevel/${activeTab}/${organizationId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_MATRIX_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_MATRIX_DATA_FAILURE,
        payload: err,
      });
    });
};

export const LinkOnboardingProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_ONBOARDING_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/unboardingWorkflow/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_ONBOARDING_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ONBOARDING_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const LinkOnboardingStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_ONBOARDING_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/unboardingStages/update/publishInd `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_ONBOARDING_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ONBOARDING_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const createCurrencyConversion = (data,orgId,cb) => (dispatch) => {
    
  dispatch({
    type: types.CREATE_CURRENCY_CONVERSION_REQUEST,
  });
  axios
    .post(`${base_url}/currencyConversion/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getCurrencyConversion(orgId))
      dispatch({
        type: types.CREATE_CURRENCY_CONVERSION_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CREATE_CURRENCY_CONVERSION_FAILURE,
        payload: err,
      });
      cb && cb("Failure");
    });
};

export const creatVat = (data,orgId,cb) => (dispatch) => {
    
  dispatch({
    type: types.CREATE_VAT_REQUEST,
  });
  axios
    .post(`${base_url2}/vat`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getAllVat())
      dispatch({
        type: types.CREATE_VAT_SUCCESS,
        payload: res.data,
      });
     // cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.CREATE_VAT_FAILURE,
        payload: err,
      });
     // cb && cb("Failure");
    });
};

export const getCurrencyConversion = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_CURRENCY_CONVERSION_REQUEST,
  });
  axios
    .get(`${base_url}/currencyConversion/All/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CURRENCY_CONVERSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CURRENCY_CONVERSION_FAILURE,
        payload: err,
      });
    });
};

export const addProcessForSuppOnboarding = (data, orgId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_SUPPLIER_REQUEST,
  });

  axios
    .post(`${base_url}/supplier/unboardingWorkflow`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcessForSupplier(orgId));
      dispatch({
        type: types.ADD_PROCESS_FOR_SUPPLIER_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_SUPPLIER_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};

export const getProcessForSupplier = (orgId) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_FOR_SUPPLIER_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/unboardingWorkflow/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_SUPPLIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_SUPPLIER_FAILURE,
        payload: err,
      });
    });
};

export const updateProcessNameForSupplier = (process, supplierUnboardingWorkflowDetailsId, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_SUPPLIER_REQUEST });

  axios
    .put(`${base_url}/supplier/unboardingWorkflow/${supplierUnboardingWorkflowDetailsId}`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_SUPPLIER_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_SUPPLIER_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const deleteSupplierProcessData = (supplierUnboardingWorkflowDetailsId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_SUPPLIER_PROCESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/supplier/unboardingWorkflow/${supplierUnboardingWorkflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_SUPPLIER_PROCESS_DATA_SUCCESS,
        payload: supplierUnboardingWorkflowDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SUPPLIER_PROCESS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const addProcessStageForSupplier = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_SUPPLIER_REQUEST });

  axios
    .post(`${base_url}/supplier/unboardingWorkflow/supplierUnboardingStages`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_SUPPLIER_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_SUPPLIER_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getProcessStagesForSupplier = (supplierUnboardingWorkflowId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_SUPPLIER_REQUEST,
  });
  axios
    .get(`${base_url}/supplier/unboardingWorkflow/supplierUnboardingStages/details/${supplierUnboardingWorkflowId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_SUPPLIER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_SUPPLIER_FAILURE,
        payload: err,
      });
    });
};

export const updateStageForSupplier = (
  supplierUnboardingStagesId,
  // responsible,
  stageName,

  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_SUPPLIER_REQUEST,
  });
  axios
    .put(
      `${base_url}/supplier/unboardingWorkflow/supplierUnboardingStages/${supplierUnboardingStagesId}`,
      { supplierUnboardingStagesId, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_SUPPLIER_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_SUPPLIER_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteSupplierStagesData = (supplierUnboardingStagesId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_SUPPLIER_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/supplier/unboardingWorkflow/supplierUnboardingStages/${supplierUnboardingStagesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_SUPPLIER_STAGES_DATA_SUCCESS,
        payload: supplierUnboardingStagesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SUPPLIER_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};

export const LinkSupplierProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_SUPPLIER_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/supplier/unboardingWorkflow/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_SUPPLIER_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_SUPPLIER_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const LinkSupplierStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_SUPPLIER_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/supplier/unboardingStages/update/publishInd `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_SUPPLIER_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_SUPPLIER_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const addProcessForProductionOnboarding = (data, orgId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_PRODUCTION_REQUEST,
  });

  axios
    .post(`${base_url}/productionWorkflow`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProcessForProduction(orgId));
      dispatch({
        type: types.ADD_PROCESS_FOR_PRODUCTION_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_PRODUCTION_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};

export const getProcessForProduction = (orgId,type) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_FOR_PRODUCTION_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/publish/for_dropdown/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};

export const updateProcessNameForProduction = (process, productionWorkflowDetailsId, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_PRODUCTION_REQUEST });

  axios
    .put(`${base_url}/productionWorkflow/workflow/${productionWorkflowDetailsId}`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_PRODUCTION_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_PRODUCTION_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const deleteProductionProcessData = (productionWorkflowDetailsId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_PRODUCTION_PROCESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/productionWorkflow/${productionWorkflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_PRODUCTION_PROCESS_DATA_SUCCESS,
        payload: productionWorkflowDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PRODUCTION_PROCESS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const addProcessStageForProduction = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_PRODUCTION_REQUEST });

  axios
    .post(`${base_url}/productionWorkflow/stages`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_PRODUCTION_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_PRODUCTION_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getProcessStagesForProduction = (orgId,workflowId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_PRODUCTION_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/stages/for_dropdown/${orgId}/${workflowId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_PRODUCTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_PRODUCTION_FAILURE,
        payload: err,
      });
    });
};

export const updateStageForProduction = (
  productionStagesId,
  // responsible,
  stageName,

  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_PRODUCTION_REQUEST,
  });
  axios
    .put(
      `${base_url}/productionWorkflow/stage/${productionStagesId}`,
      { productionStagesId, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_PRODUCTION_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_PRODUCTION_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteProductionStagesData = (productionStagesId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_PRODUCTION_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/productionStages/${productionStagesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_PRODUCTION_STAGES_DATA_SUCCESS,
        payload: productionStagesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_PRODUCTION_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};

export const LinkProductionProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_PRODUCTION_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/productionWorkflow/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_PRODUCTION_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PRODUCTION_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const LinkProductionStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_PRODUCTION_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/productionStages/update/publishInd `, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_PRODUCTION_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_PRODUCTION_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};


export const addProcessForRepair = (data, orgId, cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_PROCESS_FOR_REPAIR_REQUEST,
  });

  axios
    .post(`${base_url}/repairWorkflow`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
       //dispatch(getProcessForRepair(orgId));
      dispatch({
        type: types.ADD_PROCESS_FOR_REPAIR_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_PROCESS_FOR_REPAIR_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};

export const getProcessForWorkFlowData = (orgId,type) => (dispatch) => {
  debugger;
  dispatch({
    type: types.GET_PROCESS_FOR_WORKFLOW_DATA_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/${orgId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log("print when new process added................", res);
      dispatch({
        type: types.GET_PROCESS_FOR_WORKFLOW_DATA_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_FOR_WORKFLOW_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateProcessNameForRepair = (process, repairWorkflowDetailsId, cb) => (dispatch) => {
  debugger;
  dispatch({ type: types.UPDATE_PROCESS_NAME_FOR_REPAIR_REQUEST });

  axios
    .put(`${base_url}/repairWorkflow/workflow/${repairWorkflowDetailsId}`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_REPAIR_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_NAME_FOR_REPAIR_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const deleteRepairProcessData = (repairWorkflowDetailsId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_REPAIR_PROCESS_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/repairWorkflow/${repairWorkflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_REPAIR_PROCESS_DATA_SUCCESS,
        payload: repairWorkflowDetailsId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_REPAIR_PROCESS_DATA_FAILURE,
        payload: err,
      });
    });
};

export const addProcessStageForRepair = (stage, cb) => (dispatch) => {
  dispatch({ type: types.ADD_PROCESS_STAGE_FOR_REPAIR_REQUEST });

  axios
    .post(`${base_url}/repairWorkflow/stages`, stage, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_REPAIR_SUCCESS,
        payload: { ...stage, stageId: res.data },
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_STAGE_FOR_REPAIR_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const getProcessStagesForRepair = (repairWorkflowDetailsId) => (
  dispatch
) => {
  dispatch({
    type: types.GET_PROCESS_STAGES_FOR_REPAIR_REQUEST,
  });
  axios
    .get(`${base_url}/repairWorkflow/Stages/${repairWorkflowDetailsId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_REPAIR_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PROCESS_STAGES_FOR_REPAIR_FAILURE,
        payload: err,
      });
    });
};

export const updateStageForRepair = (
  repairStagesId,
  stageName,
  probability,
  days,
  cb
) => (dispatch) => {
  console.log(stageName, probability);
  dispatch({
    type: types.UPDATE_STAGE_FOR_REPAIR_REQUEST,
  });
  axios
    .put(
      `${base_url}/repairWorkflow/stages/${repairStagesId}`,
      { repairStagesId, stageName, probability, days },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_STAGE_FOR_REPAIR_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_STAGE_FOR_REPAIR_FAILURE,
      });
      cb && cb("error");
    });
};

export const deleteRepairStagesData = (repairStagesId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_REPAIR_STAGES_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/repairStages/${repairStagesId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_REPAIR_STAGES_DATA_SUCCESS,
        payload: repairStagesId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_REPAIR_STAGES_DATA_FAILURE,
        payload: err,
      });
    });
};

export const LinkRepairProcessPublish = (data, cb,) => (dispatch) => {
  dispatch({ type: types.LINK_REPAIR_PROCESS_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/repairWorkflow/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_REPAIR_PROCESS_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_REPAIR_PROCESS_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const LinkRepairStagePublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_REPAIR_STAGES_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/repairStages/update/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_REPAIR_STAGES_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_REPAIR_STAGES_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const handleSalaryModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_SALARY_MODAL,
    payload: modalProps,
  });
};

export const getSalary = (roleTypeId) => (dispath) => {
  dispath({ type: types.GET_SALARY_REQUEST });
  axios
    .get(`${base_url}/userSalaryBreakout/list/${roleTypeId}`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
    .then((res) => {
      dispath({
        type: types.GET_SALARY_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_SALARY_FAILURE,
        payload: err,
      });
    });
};


export const addSalary = (process, cb) => (dispatch) => {
  dispatch({ type: types.ADD_SALARY_REQUEST });

  axios
    .post(`${base_url}/userSalaryBreakout`, process, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SALARY_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SALARY_FAILURE,
      });

    });
};

export const getLangWords = (word) => (dispath) => {
  dispath({ type: types.GET_LANG_WORDS_REQUEST });
  axios
    .get(`${login_url}/words/allWords`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_LANG_WORDS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_LANG_WORDS_FAILURE,
        payload: err,
      });
    });
};

export const AddLangWords = (word) => (dispatch) => {
  dispatch({ type: types.ADD_LANG_WORDS_REQUEST });

  axios
    .post(`${login_url}/words `, word, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getLangWords())
      dispatch({
        type: types.ADD_LANG_WORDS_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_LANG_WORDS_FAILURE,
      });

    });
};
export const updateOrganizationType = (data, customerId) => (dispatch) => {
  dispatch({ type: types.UPDATE_ORGANIZATION_TYPE_REQUEST });
  axios
    .post(`${base_url}/organization/industry`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect Info updated Successfully!',
      //   // showConfirmButton: false,
      //   // timer: 1500
      // })
      console.log(res);
      dispatch({
        type: types.UPDATE_ORGANIZATION_TYPE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ORGANIZATION_TYPE_FAILURE,
        payload: err,
      });
    });
};
export const getOrgType = (orgId) => (dispath) => {
  dispath({ type: types.GET_ORG_TYPE_REQUEST });
  axios
    .get(`${base_url}/organization/industry/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispath({
        type: types.GET_ORG_TYPE_SUCCESS,
        payload: res.data,
      });

    })
    .catch((err) => {
      dispath({
        type: types.GET_ORG_TYPE_FAILURE,
        payload: err,
      });
    });
};
export const updateSkillLevel = (data,activeTab,organizationId) => (dispatch, getState) => {
  dispatch({
    type: types.UPDATE_SKILL_LEVEL_REQUEST,
  });
  axios
    .post(`${base_url}/skillLevel`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getMatrixdata(activeTab,organizationId,))
      console.log(res);
      dispatch({
        type: types.UPDATE_SKILL_LEVEL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_SKILL_LEVEL_FAILURE,
        payload: err,
      });
    });
};

export const clubShare = (data,) => (dispatch) => {
  dispatch({ type: types.CLUB_SHARE_REQUEST });
  axios
    .post(`${base_url}/club`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.CLUB_SHARE_SUCCESS,
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
        type: types.CLUB_SHARE_FAILURE,
        payload: err,
      });
    });
};

export const getclubShare = (investorId) => (dispatch) => {
  dispatch({
    type: types.GET_CLUB_SHARE_REQUEST,
  });
  axios
    .get(`${base_url}/club/All`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CLUB_SHARE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CLUB_SHARE_FAILURE,
        payload: err,
      });
    });
};
export const clearSettingData = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_SETTING_DATA,
  });
};

export const updateClub = (data,clubId) => (dispatch) => {
  dispatch({ type: types.UPDATE_CLUB_REQUEST });
  axios
    .put(`${base_url}/club/update/${clubId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.UPDATE_CLUB_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_CLUB_FAILURE,
        payload: err,
      });
    });
};


export const getFeedback = () => (dispatch) => {
  dispatch({
    type: types.GET_FEEBACK_REQUEST,
  });
  axios
  .get(`${base_url}/feedback/All`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FEEBACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FEEBACK_FAILURE,
        payload: err,
      });
    });
};

// /**
//  * add a new sector 
//  */
export const addFeedBack = (sectors,orgId, cb) => (dispatch) => {
  console.log(sectors);
  dispatch({
    type: types.ADD_FEEBACK_REQUEST,
  });
  axios
    .post(`${base_url}/feedback`, sectors, {
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
          timer: 1500,
        });
      } else {
       
        Swal.fire({
          icon: 'success',
          title: 'Feedback added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch(getFeedBackCount());
      console.log(res);
      dispatch({
        type: types.ADD_FEEBACK_SUCCESS,
        payload: { ...sectors, },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_FEEBACK_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};

/**
* remove a new sector
*/
export const removeFeedBack = ( feedbackId,orgId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_FEEBACK_REQUEST,
  });
  axios
    .delete(`${base_url}/feedback/${feedbackId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getFeedBackCount());
      Swal.fire({
        icon: 'success',
        title: 'Feedback deleted Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("QUALITY has been deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_FEEBACK_SUCCESS,
        payload:feedbackId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_FEEBACK_FAILURE,
      });
    });
};

/**
*update label of sector
*/
export const updateFeedBack = ( data,feedbackId,cb) => (dispatch) => {
  
  dispatch({
    type: types.UPDATE_FEEBACK_REQUEST,
  });
  axios
    .put(
      `${base_url}/feedback/${feedbackId}`,
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
        title: 'Feedback updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
    
      console.log(res);
      dispatch({
        type: types.UPDATE_FEEBACK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_FEEBACK_FAILURE,
      });
    });
};




export const getFeedBackCount = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_FEEBACK_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/feedback/count/All`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_FEEBACK_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_FEEBACK_COUNT_FAILURE,
        payload: err,
      });
    });
};




export const getCustomerConfigure = (orgId,formType,baseFormType) => (dispatch) => {
  dispatch({
    type: types.GET_CUSTOMER_CONFIGURE_REQUEST,
  });
  axios
  .get(`${base_url}/baseForm/get/${orgId}/${formType}/${baseFormType}`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CUSTOMER_CONFIGURE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CUSTOMER_CONFIGURE_FAILURE,
        payload: err,
      });
    });
};


export const getSupplierCategory = () => (dispatch) => {
  dispatch({
    type: types.GET_SUPPLIERCATEGORY_REQUEST,
  });
  axios
  .get(`${base_url}/supplierCategory/All`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SUPPLIERCATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SUPPLIERCATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const addSupplierCategory = (sectors,cb) => (dispatch) => {
  console.log(sectors);
  dispatch({
    type: types.ADD_SUPPLIERCATEGORY_REQUEST,
  });
  axios
    .post(`${base_url}/supplierCategory`, sectors, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     // dispatch(getSectorCount(orgId));
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
          title: 'SUPPLIERCATEGORY added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res);
      dispatch({
        type: types.ADD_SUPPLIERCATEGORY_SUCCESS,
        payload: { ...sectors, },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_SUPPLIERCATEGORY_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};

export const ClearReducerDataOfSupplierCategory = () => (dispatch) => {
  dispatch({
    type: types.HANDLE_CLAER_REDUCER_DATA_SUPPLIERCATEGORY,
  });
};

export const getShipperCategory = () => (dispatch) => {
  dispatch({
    type: types.GET_SHIPPERCATEGORY_REQUEST,
  });
  axios
  .get(`${base_url}/shipperCategory/All`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SHIPPERCATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SHIPPERCATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const addShipperCategory = (sectors,cb) => (dispatch) => {
  console.log(sectors);
  dispatch({
    type: types.ADD_SHIPPERCATEGORY_REQUEST,
  });
  axios
    .post(`${base_url}/shipperCategory`, sectors, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     // dispatch(getSectorCount(orgId));
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
          title: 'SUPPLIERCATEGORY added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res);
      dispatch({
        type: types.ADD_SHIPPERCATEGORY_SUCCESS,
        payload: { ...sectors, },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_SHIPPERCATEGORY_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};


export const getWorkFlowCategory = () => (dispatch) => {
  dispatch({
    type: types.GET_WORKFLOWCATEGORY_REQUEST,
  });
  axios
  .get(`${base_url}/workflowCategory/All`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_WORKFLOWCATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_WORKFLOWCATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const addWorkFlowCategory = (sectors,cb) => (dispatch) => {
  console.log(sectors);
  dispatch({
    type: types.ADD_WORKFLOWCATEGORY_REQUEST,
  });
  axios
    .post(`${base_url}/workflowCategory`, sectors, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     // dispatch(getSectorCount(orgId));
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
          title: 'Workflow added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      console.log(res);
      dispatch({
        type: types.ADD_WORKFLOWCATEGORY_SUCCESS,
        payload: { ...sectors, },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_SWORKFLOWCATEGORY_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};





export const LinkDealsProcessGlobal = (globalInd, workflowId,cb) => (dispatch) => {
  dispatch({ type: types.LINK_DEALS_PROCESS_GLOBAL_REQUEST });

  axios
    .put(`${base_url}/workflow/stages/${globalInd}/${workflowId} `, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_DEALS_PROCESS_GLOBAL_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_DEALS_PROCESS_GLOBAL_FAILURE,
      });
      cb && cb("Failure");
    });
};





export const addProcessTaskStage = (customer) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_PROCESS_TASK_STAGE_REQUEST,
  });

  axios
    .post(`${base_url}/workflow/stage-task/save`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect Updated Successfully!',
      // })
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Prospect Updated Successfully!',
      //   showConfirmButton: false,
      //   // timer: 1500
      // })
      console.log(res);
      // dispatch(
      //   linkCustomersToOpportunity(opportunityId, { CustomerIds: [res.data] }, cb)
      // );
      // message.success(res.data.message)
     

      dispatch({
        type: types.ADD_PROCESS_TASK_STAGE_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PROCESS_TASK_STAGE_FAILURE,
        payload: err,
      });
      message.error(err.data.message)
      // cb && cb();
    });
};





export const getProcessTaskStage = (orgId,stageId) => (dispatch) => {
  dispatch({
    type: types.GET_PROCESS_TASK_STAGE_REQUEST,
  });
  axios
    .get(`${base_url}/workflow/stage-task/${orgId}/${stageId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PROCESS_TASK_STAGE_SUCCESS,
        payload: res.data,
      });
      // }
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PROCESS_TASK_STAGE_FAILURE,
        payload: err,
      });
    });

};





export const deleteTaskStageData = (stagesTaskId,liveInd) => (dispatch) => {
  dispatch({
    type: types.DELETE_TASK_STAGE_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/stage-task/delete/${stagesTaskId}/${liveInd}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     
     
      console.log(res);
      dispatch({
        type: types.DELETE_TASK_STAGE_DATA_SUCCESS,
        payload: stagesTaskId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TASK_STAGE_DATA_FAILURE,
        payload: err,
      });
    });
};



export const updateGlobalWorkflow = (data, workflowCategoryId) => (dispatch) => {
  dispatch({ type: types.UPDATE_GLOBAL_WORKFLOW_REQUEST });
  axios
    .put(`${base_url}/workflowCategory/update/globalInd/${workflowCategoryId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_GLOBAL_WORKFLOW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_GLOBAL_WORKFLOW_FAILURE,
        payload: err,
      });
    });
};





export const moveRejectToggleTask = (stageTaskId,mandatoryInd) => (dispatch) => {
  dispatch({
    type: types.MOVE_REJECT_TOGGLE_TASK_REQUEST,
  });
  axios
    .put(`${base_url}/workflow/stage-task/${stageTaskId}/${mandatoryInd}`, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.MOVE_REJECT_TOGGLE_TASK_SUCCESS,
        payload: res.data,
      });
      message.success("Item transfered for Quality Check");
    })
    .catch((err) => {
      dispatch({
        type: types.MOVE_REJECT_TOGGLE_TASK_FAILURE,
        payload: err,
      });
      // message.error("Something went wrong");
    });
};




export const updateProcessTaskStage = (data, stagesTaskId) => (dispatch) => {
  dispatch({ type: types.UPDATE_PROCESS_TASK_STAGE_REQUEST });
  axios
    .put(`${base_url}/workflow/stage-task/${stagesTaskId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Prospect Info updated Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
      dispatch({
        type: types.UPDATE_PROCESS_TASK_STAGE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_PROCESS_TASK_STAGE_FAILURE,
        payload: err,
      });
    });
};





export const addGloalType = (sectors,cb) => (dispatch) => {
  console.log(sectors);
  dispatch({
    type: types.ADD_GLOBAL_TYPE_REQUEST,
  });
  axios
    .post(`${base_url}/workflowCategory`, sectors, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
     // dispatch(getSectorCount(orgId));
     
     if (res.data.message === "WorkflowCategory can not be Updated as same name already exists!!!") {
      Swal.fire({
        icon: 'error',
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({
        type: types.ADD_GLOBAL_TYPE_DUPLICATE,
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Type added Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });

      dispatch({
        type: types.ADD_GLOBAL_TYPE_SUCCESS,
        payload: res.data,
      });
    }
     
     
      // cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_GLOBAL_TYPE_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};




export const addConfigureGlobalType = (orgId,workflowId,workflowType,  cb) => (
  dispatch
) => {
  dispatch({
    type: types.ADD_CONFIGURE_GLOBAL_TYPE_REQUEST,
  });

  axios
    .post(`${base_url}/workflow/createNew/${orgId}/${workflowId}/${workflowType}`, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //dispatch(getProcessForDeals(orgId));
      if (res.data.message === "200 OK") {
        Swal.fire({
          icon: 'error',
          title: res.data.message,
          showConfirmButton: false,
        timer: 1500,
        });
  
        dispatch({
          type: types.ADD_CONFIGURE_GLOBAL_TYPE_DUPLICATE,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: 'Type added Successfully!',
          showConfirmButton: false,
        timer: 1500,
        });
  
        dispatch({
          type: types.ADD_CONFIGURE_GLOBAL_TYPE_SUCCESS,
          payload: res.data,
        });
      }
      cb && cb("success");
    })
    .catch((err) => {
      dispatch({
        type: types.ADD_CONFIGURE_GLOBAL_TYPE_FAILURE,
        payload: err,
      });
      cb && cb("failure");
    });
};



export const getPaymentFinance = () => (dispatch) => {
  dispatch({
    type: types.GET_PAYMENT_FINANCE_REQUEST,
  });
  axios
    .get(`${base_url}/paymentMode`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PAYMENT_FINANCE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PAYMENT_FINANCE_FAILURE,
        payload: err,
      });
    });
};




export const addPaymentData = (data,cb) => (dispatch) => {
    
  dispatch({
    type: types.ADD_PAYMENT_DATA_REQUEST,
  });
  axios
    .post(`${base_url}/paymentMode`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPaymentFinance())
      dispatch({
        type: types.ADD_PAYMENT_DATA_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PAYMENT_DATA_FAILURE,
        payload: err,
      });
      cb && cb("Failure");
    });
};




export const removeSkillData = (skillLevelLinkId) => (dispatch) => {
  dispatch({
    type: types.REMOVE_SKILL_DATA_REQUEST,
  });
  axios
    .put(`${base_url}/category/skillLevel/delete/${skillLevelLinkId}`,{}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Skill Deleted Successfully',
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
        type: types.REMOVE_SKILL_DATA_SUCCESS,
        payload: skillLevelLinkId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_SKILL_DATA_FAILURE,
        payload: err,
      });
    });
};






export const updateWords = (data,id) => (dispatch) => {
  dispatch({ type: types.UPDATE_WORDS_REQUEST });
  axios
    .put(`${login_url}/words/${id}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_WORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_WORDS_FAILURE,
        payload: err,
      });
    });
};



export const searchWordsName = (word) => (dispatch) => {
  dispatch({
    type: types.GET_WORDS_SEARCH_REQUEST,
  });
  axios
    .get(`${login_url}/words/navLangSearch/${word}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      message.success(res.data.message);
      dispatch({
        type: types.GET_WORDS_SEARCH_SUCCESS,
        payload: res.data,
      });
    }
    )
    .catch((err) => {
      dispatch({
        type: types.GET_WORDS_SEARCH_FAILURE,
        payload: err,
      });
    });
}; 



export const addPaymentApi = (data,cb) => (dispatch) => {
    
  dispatch({
    type: types.ADD_PAYMENT_API_REQUEST,
  });
  axios
    .post(`${base_url2}/ApiKey`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      // dispatch(getPaymentFinance())
      dispatch({
        type: types.ADD_PAYMENT_API_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PAYMENT_API_FAILURE,
        payload: err,
      });
      cb && cb("Failure");
    });
};




export const linkClubToggle = ( data,clubId) => (dispatch, getState) => {
  //console.log(permissions, userId);
  //const orgId = getState().auth.userDetails.organizationId;
  dispatch({
    type: types.LINK_CLUB_TOGGLE_REQUEST,
  });
  axios
  .put(`${base_url}/club/update/invToCusInd/${clubId}`,data,  {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_CLUB_TOGGLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_CLUB_TOGGLE_FAILURE,
        payload: err,
      });
    })
};

export const getUOM = () => (dispatch) => {
  dispatch({
    type: types.GET_UOM_REQUEST,
  });
  axios
  .get(`${login_url}/uom/all`, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token") || "",
    },
  })
    
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_UOM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_UOM_FAILURE,
        payload: err,
      });
    });
};

// /**
//  * add a new sector 
//  */
export const addUOM = (sectors,cb) => (dispatch) => {
  console.log(sectors);
  dispatch({
    type: types.ADD_UOM_REQUEST,
  });
  axios
    .post(`${login_url}/uom/saveUOM`, sectors, {
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
          timer: 1500,
        });
      } else {
       
        Swal.fire({
          icon: 'success',
          title: 'Machinary added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      dispatch(getUOMCount());
      console.log(res);
      dispatch({
        type: types.ADD_UOM_SUCCESS,
        payload: { ...sectors, },
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
   
      dispatch({
        type: types.ADD_UOM_FAILURE,
      });
      // message.success(res.data.message);
      cb();
    });
};

/**
* remove a new sector
*/
export const removeUOM = ( uomId,orgId) => (dispatch) => {
  // console.log(typeId);
  dispatch({
    type: types.REMOVE_UOM_REQUEST,
  });
  axios
    .delete(`${base_url}/uom/deleteUom/${uomId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch(getUOMCount());
      Swal.fire({
        icon: 'success',
        title: 'Machinary deleted Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("MACHINARY has been deleted successfully!");
      console.log(res);
      dispatch({
        type: types.REMOVE_UOM_SUCCESS,
        payload:uomId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.REMOVE_UOM_FAILURE,
      });
    });
};

/**
*update label of sector
*/
export const updateUOM = ( data,uomId,cb) => (dispatch) => {
  
  dispatch({
    type: types.UPDATE_UOM_REQUEST,
  });
  axios
    .put(
      `${base_url}/uom/uomId/${uomId}`,
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
        title: 'Machinary updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
      // message.success("MACHINARY has been updated successfully!");
      console.log(res);
      dispatch({
        type: types.UPDATE_UOM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_UOM_FAILURE,
      });
    });
};



export const getUOMCount = () => (dispatch) => {
  dispatch({
    type: types.GET_UOM_COUNT_REQUEST,
  });
  axios
    .get(`${login_url}/uom/all/count`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_UOM_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_UOM_COUNT_FAILURE,
        payload: err,
      });
    });
};






export const addSequenceFlow = (
  data,
  stagesId,
  
  cb
) => (dispatch) => {
  // console.log(stageName, probability);
  dispatch({
    type: types.ADD_SEQUENCE_FLOW_REQUEST,
  });
  axios
    .put(
      `${base_url}/workflow/stage/sequence/rule`,
      data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_SEQUENCE_FLOW_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_SEQUENCE_FLOW_FAILURE,
      });
      cb && cb("error");
    });
};





export const getApikey = (orgId,type) => (dispatch) => {
  dispatch({
    type: types.GET_API_KEY_REQUEST,
  });
  axios
    .get(`${base_url}/thirdPartyApi/get/${orgId}/${type}` ,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_API_KEY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_API_KEY_FAILURE,
        payload: err,
      });
    });
};

export const getDiscountCat = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_DISCOUNT_CAT_REQUEST,
  });
  axios
    .get(`${base_url}/category/dropdown/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    } )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISCOUNT_CAT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISCOUNT_CAT_FAILURE,
        payload: err,
      });
    });
};

export const getDiscountCatVol = (categoryId) => (dispatch) => {
  dispatch({
    type: types.GET_DISCOUNT_CATVOL_REQUEST,
  });
  axios
    .get(`${base_url}/category/vol-price/${categoryId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    } )
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DISCOUNT_CATVOL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DISCOUNT_CATVOL_FAILURE,
        payload: err,
      });
    });
};



export const addHideFlow = (thirdPartyApiId,hideInd, cb) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_HIDE_FLOW_REQUEST,
  });
  axios
    .put(`${base_url}/thirdPartyApi/update/hideInd/${thirdPartyApiId}/${hideInd}`, {}, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Api added Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
     
      dispatch({
        type: types.ADD_HIDE_FLOW_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_HIDE_FLOW_FAILURE,
        payload: err,
      });
    });
};

export const categoryVolUpdate = (opportunity, cb) => (dispatch, getState) => {
  dispatch({
    type: types.ADD_CATEGORY_VOLUME_REQUEST,
  });
  axios
    .post(`${base_url}/category/vol-price/save`, opportunity, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Volume added Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
     
      dispatch({
        type: types.ADD_CATEGORY_VOLUME_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_CATEGORY_VOLUME_FAILURE,
        payload: err,
      });
    });
};



export const addApi = (opportunity, cb) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_API_REQUEST,
  });
  axios
    .put(`${base_url}/thirdPartyApi/update/api`, opportunity, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Api added Successfully!',
        showConfirmButton: false,
        timer: 1500
      })
      console.log(res);
     
      dispatch({
        type: types.ADD_API_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_API_FAILURE,
        payload: err,
      });
    });
};



export const deleteSequencedatalist = (stageId,type) => (dispatch) => {
  dispatch({
    type: types.DELETE_SEQUENCE_DATA_LIST_REQUEST,
  });
  axios
    .delete(`${base_url}/workflow/stage/sequence/delete/${stageId}/${type}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Sequence Deleted Successfully',
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
        type: types.DELETE_SEQUENCE_DATA_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_SEQUENCE_DATA_LIST_FAILURE,
        payload: err,
      });
    });
};




