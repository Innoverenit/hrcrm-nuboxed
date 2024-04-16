import * as types from "./TeamsActionType";
import axios from "axios";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
import Swal from 'sweetalert2'

/**
 * teams modal action
 */
export const handleTeamsModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TEAMS_MODAL,
    payload: modalProps,
  });
};

export const handleTeamTransferModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TEAMS_TRANSFER_MODAL,
    payload: modalProps,
  });
};

/**
 * SET TEAMS VIEW TYPE
 * TABLE VIEW/CARD VIEW
 */
export const setTeamsViewType = (viewType) => (dispatch) => {
  // debugger;

  dispatch({ type: types.SET_TEAMS_VIEW_TYPE, payload: viewType });
};

/**
 * ADD TEAM MEMBER MODAL
 */
export const handleAddTeamMemberModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ADD_TEAMS_MEMBER_MODAL,
    payload: modalProps,
  });
};
/**
 *  function name=
 */
export const getOnlyManagementUser = () => (dispatch) => {
  dispatch({
    type: types.GET_ONLY_MANAGEMENT_USERS_REQUEST,
  });
  console.log("inside team action get users");
  axios
    .get(`${base_url}/user/management`, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ONLY_MANAGEMENT_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Oops! something went wrong. Please retry.");

      console.log(err);
      dispatch({
        type: types.GET_ONLY_MANAGEMENT_USERS_FAILURE,
        payload: err,
      });
    });
};

export const getOnlySalesUser = () => (dispatch) => {
  dispatch({
    type: types.GET_ONLY_SALES_USERS_REQUEST,
  });
  console.log("inside team action get users");
  axios
    .get(`${base_url}/user/area-manager`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ONLY_SALES_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Oops! something went wrong. Please retry.");

      console.log(err);
      dispatch({
        type: types.GET_ONLY_SALES_USERS_FAILURE,
        payload: err,
      });
    });
};

export const addTeamsContact = (team) => (dispatch) => {
  dispatch({
    type: types.ADD_TEAMS_CONTACT_REQUEST,
  });

  axios
    .post(`${base_url}/team`, team, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTeamList());
      dispatch({
        type: types.ADD_TEAMS_CONTACT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TEAMS_CONTACT_FAILURE,
        payload: err,
      });
    });
};

//get list of team
export const getTeamList = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_TEAM_REQUEST,
  });
  axios
    .get(`${base_url}/team/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TEAM_FAILURE,
        payload: err,
      });
    });
};

export const getTeamteamsList = (teamLead) => (dispatch) => {
  dispatch({
    type: types.GET_TEAMTEAM_REQUEST,
  });
  axios
    .get(`${base_url}/team/teamLead/${teamLead}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAMTEAM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TEAMTEAM_FAILURE,
        payload: err,
      });
    });
};



export const getTeamByTeamId = (teamId) => (dispatch) => {
  dispatch({
    type: types.GET_TEAM_BY_TEAM_ID_REQUEST,
  });
  axios
    .get(`${base_url}/team/${teamId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAM_BY_TEAM_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TEAM_BY_TEAM_ID_FAILURE,
        payload: err,
      });
    });
};

// linking user to team
export const linkUserToTeam = (team, teamId) => (dispatch) => {
  dispatch({
    type: types.LINK_USER_TO_TEAM_REQUEST,
  });
  axios
    .post(`${base_url}/team/user`, team, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      message.success("Executive added to Team successfully!!");
      dispatch(getUserByTeamId(teamId));
      dispatch({
        type: types.LINK_USER_TO_TEAM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_USER_TO_TEAM_FAILURE,
        payload: err,
      });
    });
};

//get all the user by using teamId
export const getUserByTeamId = (teamId) => (dispatch) => {
  console.log(teamId);
  dispatch({
    type: types.GET_USER_BY_TEAMID_REQUEST,
  });
  axios
    .get(`${base_url}/team/users/${teamId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_USER_BY_TEAMID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_USER_BY_TEAMID_FAILURE,
        payload: err,
      });
    });
};

export const linkSalesUserToTeam = (team, teamId, cb) => (dispatch) => {
  dispatch({
    type: types.LINK_SALES_USER_TO_TEAM_REQUEST,
  });
  axios
    .post(`${base_url}/team/transfer-resource`, team, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      message.success("Data transferred to sales executive successfully!!");
      dispatch(getUserByTeamId(teamId));
      dispatch({
        type: types.LINK_SALES_USER_TO_TEAM_SUCCESS,
        payload: res.data,
      });
      // cb && cb("success", res.data.message);
    })
    .catch((err) => {
      message.error("Something went wrong! occoured");
      console.log(err);
      dispatch({
        type: types.LINK_SALES_USER_TO_TEAM_FAILURE,
        payload: err,
      });
      // cb && cb("failuer", null, null);
    });
};

export const getSalesManagerUser = () => (dispatch) => {
  dispatch({
    type: types.GET_SALES_MANAGER_USERS_REQUEST,
  });
  console.log("inside team action get users");
  axios
    .get(`${base_url}/user/admin-management`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SALES_MANAGER_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Oops! something went wrong. Please retry.");

      console.log(err);
      dispatch({
        type: types.GET_SALES_MANAGER_USERS_FAILURE,
        payload: err,
      });
    });
};

export const addOrderView = (data) => (dispatch) => {
  dispatch({ type: types.ADD_ORDER_VIEW_REQUEST });
  axios
    .post(`${base_url}/report/teams/order`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_ORDER_VIEW_SUCCESS,
        payload: res.data,
      });
      // cb&&cb("success")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ORDER_VIEW_FAILURE,
        payload: err,
      });
      // cb&&cb("failure")
    });
};

export const getOrderViewList = () => (dispatch) => {
  dispatch({
    type: types.GET_ORDER_VIEW_REQUEST,
  });
  axios
    .get(`${base_url}/Order-View`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORDER_VIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORDER_VIEW_FAILURE,
        payload: err,
      });
    });
};

export const updateTeam = (teamId, data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.UPDATE_TEAMS_CARD_REQUEST });
  axios
    .put(`${base_url}/team/${teamId}`, { ...data }, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getTeamByTeamId(teamId));
      dispatch({
        type: types.UPDATE_TEAMS_CARD_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TEAMS_CARD_FAILURE,
        payload: err,
      });
    });
};

//get productionEcxecutive and productionManager
export const getProductionExecutiveAndManager = () => (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTION_EXECUTIVE_AND_MANAGER_REQUEST,
  });
  console.log("inside team action get users");
  axios
    .get(`${base_url}/user/getAllProductionList`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PRODUCTION_EXECUTIVE_AND_MANAGER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      message.error("Oops! something went wrong. Please retry.");

      console.log(err);
      dispatch({
        type: types.GET_PRODUCTION_EXECUTIVE_AND_MANAGER_FAILURE,
        payload: err,
      });
    });
};

export const addLocationsInTeams = (userId, name) => (dispatch) => {
  dispatch({
    type: types.UPDATE_LOCATIONS_IN_TEAMS_REQUEST,
  });

  axios
    .patch(`${base_url}/locationDetails/${userId}`, name, {
      // headers: {
      //   Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      // },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.UPDATE_LOCATIONS_IN_TEAMS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.UPDATE_LOCATIONS_IN_TEAMS_FAILURE,
      });
    });
  // .patch(`${base_url}/locationDetails/${userId}`, name)
  // .then((res) => {
  //   console.log(res);
  //   // dispatch(getProductionExecutiveAndManager());
  //   dispatch({
  //     type: types.UPDATE_LOCATIONS_IN_TEAMS_SUCCESS,
  //     payload: res.data,
  //   });
  // })
  // .catch((err) => {
  //   console.log(err);
  //   dispatch({
  //     type: types.UPDATE_LOCATIONS_IN_TEAMS_FAILURE,
  //     payload: err,
  //   });
  // });
};

export const setEditTeamsAllocation = (name) => (dispatch) => {
  dispatch({
    type: types.SET_EDIT_TEAMS,
    payload: name,
  });
};

export const handleUpdateTeamsAllocationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_TEAMS_ALLOCATION_MODAL,
    payload: modalProps,
  });
};

export const updateTeamsAllocation = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_TEAMS_ALLOCATION_REQUEST });
  axios
    .post(`${base_url}/locationDetails/locationUserLink`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getProductionExecutiveAndManager());
      dispatch(getClientsInTeam());
      dispatch(getInventoryInTeam());
      dispatch({
        type: types.UPDATE_TEAMS_ALLOCATION_SUCCESS,
        payload: res.data,
      });
      // cb&&cb("success")
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_TEAMS_ALLOCATION_FAILURE,
        payload: err,
      });
      // cb&&cb("failure")
    });
};


export const getClientsInTeam = () => (dispatch) => {
  dispatch({
    type: types.GET_CLIENT_IN_TEAM_REQUEST,
  });
  axios
    .get(`${base_url}/user/getAllSalesListData`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CLIENT_IN_TEAM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CLIENT_IN_TEAM_FAILURE,
        payload: err,
      });
    });
};

export const getInventoryInTeam = () => (dispatch) => {
  dispatch({
    type: types.GET_INVENTORY_IN_TEAM_REQUEST,
  });
  axios
    .get(`${base_url}/user/getAllInventoryList`, {})
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVENTORY_IN_TEAM_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVENTORY_IN_TEAM_FAILURE,
        payload: err,
      });
    });
};

export const getTeamMemberlist = (filter) => (dispatch) => {
  dispatch({
    type: types.GET_TEAM_MEMBER_LIST_REQUEST,
  });

  axios
  .get(`${base_url}/employee/user-list/drop-down/crm`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TEAM_MEMBER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TEAM_MEMBER_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getreportingManager = (reptMngrId) => (dispatch) => {
  dispatch({
    type: types.GET_REPORTING_MANAGER_REQUEST,
  });

  axios
  .get(`${base_url}/employee/user-list/reptMngr/${reptMngrId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPORTING_MANAGER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REPORTING_MANAGER_FAILURE,
        payload: err,
      });
    });
};

export const addTeams = (customer) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add customer");
  dispatch({
    type: types.ADD_TEAMS_REQUEST,
  });

  axios
    .post(`${base_url}/team`, customer, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      
    
      dispatch({
        type: types.ADD_TEAMS_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TEAMS_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const handleperformanceDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PERFORMANE_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const getKpilist = (departmentId) => (dispatch) => {
  dispatch({
    type: types.GET_KPILIST_REQUEST,
  });
  axios
    .get(`${base_url}/performanceManagement/department/${departmentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_KPILIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_KPILIST_FAILURE,
        payload: err,
      });
    });
};

export const addKpi = (data,employeeId,year,quarter) => (dispatch) => {
  dispatch({
    type: types.ADD_KPI_REQUEST,
  });
  axios
    .post(`${base_url}/employee/kpi-with-user/save`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      if (res.data.message) {
        Swal.fire({
          icon: 'error',
          title: res.data.message,
          // showConfirmButton: false,
          // timer: 1500
        });
      } else {
       
        Swal.fire({
          icon: 'success',
          title: 'KPI added Successfully!',
          // showConfirmButton: false,
          // timer: 1500
        });
      }
      dispatch({
        type: types.ADD_KPI_SUCCESS,
        payload: res.data,
      });
      
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_KPI_FAILURE,
        payload: err,
      });
     
    });
};

export const getEmployeeKpiList = (employeeId,year,quarter) => (dispatch) => {
  dispatch({
    type: types.GET_EMPLOYEE_KPI_LIST_REQUEST,
  });
    axios
  .get(`${base_url}/employee/kpi-list/${employeeId}/${year}/${quarter}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EMPLOYEE_KPI_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EMPLOYEE_KPI_LIST_FAILURE,
        payload: err,
      });
    });
};

export const getperformanceRecord = (reptMngrId) => (dispatch) => {
  dispatch({
    type: types.GET_PERFORMANCE_RECORDS_REQUEST,
  });
  axios
    .get(`${base_url}/employee/user-count/reptMngr/${reptMngrId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PERFORMANCE_RECORDS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_PERFORMANCE_RECORDS_FAILURE,
        payload: err,
      });
    });
};

export const deleteKpiData = (employeeKpiLinkId,orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_KPI_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/employee/delete/kpi/${employeeKpiLinkId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'KPI deleted Successfully!',
      })
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_KPI_DATA_SUCCESS,
        payload: employeeKpiLinkId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_KPI_DATA_FAILURE,
        payload: err,
      });
    });
};

export const updateCompletedValue= (data,employeeId, cb) => (dispatch) => {
  // console.log(leadDocumentsId, DocumentsName);
  dispatch({
    type: types.UPDATE_COMPLETED_VALUE_REQUEST,
  });
  axios
    .put(
      `${base_url}/employee/kpi-completed-value/save`,data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'KPI Value updated Successfully!',
      })
      // message.success("Value has been updated successfully!");
      console.log(res);
      //  dispatch(getEmployeeKpiList(employeeId));
      dispatch({
        type: types.UPDATE_COMPLETED_VALUE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_COMPLETED_VALUE_FAILURE,
      });
    });
};

export const updateAssignedValue= (data,employeeId, cb) => (dispatch) => {
  // console.log(leadDocumentsId, DocumentsName);
  dispatch({
    type: types.UPDATE_ASSIGNED_VALUE_REQUEST,
  });
  axios
    .put(
      `${base_url}/employee/kpi-assigned-value/save`,data,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'KPI Value updated Successfully!',
      })
      // message.success("Value has been updated successfully!");
      console.log(res);
      //  dispatch(getEmployeeKpiList(employeeId));
      dispatch({
        type: types.UPDATE_ASSIGNED_VALUE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ASSIGNED_VALUE_FAILURE,
      });
    });
};

export const handleTeamsPulseDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_TEAMS_PULSE_DRAWER_MODAL,
    payload: modalProps,
  });
};