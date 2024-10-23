import * as types from "./ProjectsActionTypes";
import dayjs from "dayjs"; 
const initialState = {
  viewType: "list",

  type: "All",
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),
  dateRangeList: [
    // {
    //   id: 8,
    //   type: "All",
    //   value: "All",
    //   starter: true,
    //   isSelected: true,
    //   startDate: dayjs().toISOString(),
    //   endDate: dayjs().toISOString(),
    // },

    {
      id: 1,
      type: "Today",
      value: "Today",
      starter: true,
      isSelected: false,
      startDate: dayjs().toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 2,
      type: "Yesterday",
      value: "Yesterday",
      starter: false,
      isSelected: false,
      startDate: dayjs()
        .subtract(1, "days")
        .toISOString(),
      endDate: dayjs().subtract(1, "days").toISOString(),
    },
    {
      id: 3,
      type: "Last7days",
      value: "Last 7 days",
      starter: false,
      isSelected: false,
      startDate: dayjs()
        .subtract(7, "days")
        .toISOString(),
      endDate: dayjs()
        .toISOString(),
    },

    {
      id: 4,
      type: "Last30days",
      value: "Last 30 days",
      starter: false,
      isSelected: false,
      startDate: dayjs()
        .subtract(30, "days")
        .toISOString(),
      endDate: dayjs()
        .toISOString(),
    },
    {
      id: 5,
      type: "Thismonth",
      value: "This month",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 6,
      type: "Lastmonth",
      value: "Last month",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").subtract(1, "month").toISOString(),
      endDate: dayjs().endOf('month').subtract(1, "month").toISOString(),
    }
  ],

  addProjectsModal:false,

  updateProjectsModal:false,

  updatingProjects: false,
  updatingProjectsError: false,

  addCreateInvoiceDrawer:false,

  fetchingCandidateTotalBilling: false,
  fetchingCandidateTotalBillingError: false,
  candidateTotalBilling:{},

  invoiceProjectModal:false,

  fetchingTaskProject: false,
  fetchingTaskProjectError: false,
  taskProject:[],


  fetchingTeamProject: false,
  fetchingTeamProjectError: false,
  teamProject:[],


  setEditingProject:{},

  removingProjectsData: false,
  removingProjectsDataError: false,

  addingProjectsData: false,
  addingProjectsDataError: false,

  fetchingProjectsDetailById: false,
  fetchingProjectsDetailByIdError: false,
  projectsById:{},


  fetchingProjectsData: false,
  fetchingProjectsDataError: false,
  projectsData: [],
 

};
export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {

case types.SET_PROJECTS_VIEW_TYPE:
  return {
      ...state,
      viewType: action.payload,
    
  };

  case types.HANDLE_CREATE_INVOICE_DRAWER:
    return { ...state, addCreateInvoiceDrawer: action.payload };

  case types.HANDLE_PROJECTS_MODAL:
    return { ...state, addProjectsModal: action.payload };

              

    case types.ADD_PROJECTS_DATA_REQUEST:
      return { ...state, addingProjectsData: true };
    case types.ADD_PROJECTS_DATA_SUCCESS:
      return {
        ...state,
        addingProjectsData: false,
        addProjectsModal: false ,
        // projectsData:[action.payload,...state.projectsData]
        
      };
    case types.ADD_PROJECTS_DATA_FAILURE:
      return {
        ...state,
        addingProjectsData: false,
        addProjectsModal: false ,
      };

      case types.GET_PROJECTS_DATA_REQUEST:
    return { ...state, fetchingProjectsData: true };
  case types.GET_PROJECTS_DATA_SUCCESS:
    return {
      ...state,
      fetchingProjectsData: false,
      projectsData: action.payload,
    };
  case types.GET_PROJECTS_DATA_FAILURE:
    return {
      ...state,
      fetchingProjectsData: false,
      fetchingProjectsDataError: true,
    };

    case types.REMOVE_PROJECTS_DATA_REQUEST:
      return { ...state, removingProjectsData: true };
    case types.REMOVE_PROJECTS_DATA_SUCCESS:
      return {
        ...state,
        removingProjectsData: false,
        projectsData: state.projectsData.filter(
          (item) => item.projectId !== action.payload
      ), 
      };
    case types.REMOVE_PROJECTS_DATA_FAILURE:
      return {
        ...state,
        removingProjectsData: false,
        removingProjectsDataError: true,
      };
                   
      case types.GET_PROJECTS_DETAIL_BY_ID_REQUEST:
        return { ...state, fetchingProjectsDetailById: true };
      case types.GET_PROJECTS_DETAIL_BY_ID_SUCCESS:
        return {
          ...state,
          fetchingProjectsDetailById: false,
          projectsById: action.payload,
        };
      case types.GET_PROJECTS_DETAIL_BY_ID_FAILURE:
        return {
          ...state,
          fetchingProjectsDetailById: false,
          fetchingProjectsDetailByIdError: true,
        };


        case types.GET_PROJECTS_TASK_ID_REQUEST:
          return { ...state, fetchingTaskProject: true }
        case types.GET_PROJECTS_TASK_ID_SUCCESS:
          return {
            ...state,
            fetchingTaskProject: false,
             taskProject: action.payload,
          };
        case types.GET_PROJECTS_TASK_ID_FAILURE:
          return {
            ...state,
            fetchingTaskProject: false,
            fetchingTaskProjectError: true,
          };


          case types.HANDLE_UPDATE_PROJECTS_MODAL:
            return { ...state, updateProjectsModal: action.payload };

            case types.SET_PROJECT_EDIT:
              return { ...state, setEditingProject: action.payload };


              case types.UPDATE_PROJECTS_REQUEST:
                return { ...state, updatingProjects: true };
              case types.UPDATE_PROJECTS_SUCCESS:
                return {
                  ...state,
                  updatingProjects: false,
                  updateProjectsModal: false,
                  projectsData: state.projectsData.map((item) => {
                    if (item.projectId === action.payload.projectId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.UPDATE_PROJECTS_FAILURE:
                return {
                  ...state,
                  updatingProjects: false,
                  updatingProjectsError: true,
                };

                case types.GET_PROJECTS_TEAM_ID_REQUEST:
                  return { ...state, fetchingTeamProject: true }
                case types.GET_PROJECTS_TEAM_ID_SUCCESS:
                  return {
                    ...state,
                    fetchingTeamProject: false,
                     teamProject: action.payload,
                  };
                case types.GET_PROJECTS_TEAM_ID_FAILURE:
                  return {
                    ...state,
                    fetchingTeamProject: false,
                    fetchingTeamProjectError: true,
                  };

                  case types.GET_CANDIDATE_TOTAL_BILLING_REQUEST:
                    return { ...state, fetchingCandidateTotalBilling: true };
                  case types.GET_CANDIDATE_TOTAL_BILLING_SUCCESS:
                    return {
                      ...state,
                      fetchingCandidateTotalBilling: false,
                      candidateTotalBilling: action.payload,
                    };
                  case types.GET_CANDIDATE_TOTAL_BILLING_FAILURE:
                    return {
                      ...state,
                      fetchingCandidateTotalBilling: false,
                      fetchingCandidateTotalBillingError: true,
                    };

                    case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
                      return {
                        ...state,
                        dateRangeList: newDateRange(state.dateRangeList, action.payload),
                        isCustomSelected: false,
                        startDate: action.payload.startDate,
                        endDate: action.payload.endDate,
                        type: action.payload.type
                      };



                      case types.HANDLE_INVOICE_PROJECT_MODAL:
                        return { ...state, invoiceProjectModal: action.payload };


default:
return state;
}
};
const newDateRange = (dateRange, newDate) =>
  dateRange.map((range) => {
    console.log(newDate);
    if (range.id === newDate.id) {
      return { ...range, isSelected: true };
    } else {
      return { ...range, isSelected: false };
    }
  });
