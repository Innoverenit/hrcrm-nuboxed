import * as types from "./TaskActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingTasks: false,
    fetchingTasksError: false,
    tasks: [],

    fetchingTaskCount: false,
    fetchingTaskCountError: false,
    taskCount:{},

    addingTasks: false,
    addingTasksError: false,

    fetchingTaskInputSearchData:false,
    fetchingTaskInputSearchDataError:false,


    removingTasks: false,
    removingTasksError: false,

    updatingTasks: false,
    updatingTasksError: false,

    addingTaskWorkflowToggle: false,
    addingTaskWorkflowToggleError: false,

   
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {



case types.GET_TASK_REQUEST:
    return { ...state, fetchingTasks: true };
  case types.GET_TASK_SUCCESS:
    return {
      ...state,
      fetchingTasks: false,
      tasks: action.payload,
    };
  case types.GET_TASK_FAILURE:
    return {
      ...state,
      fetchingTasks: false,
      fetchingTasksError: true,
    };

    case types.ADD_TASK_REQUEST:
    return { ...state, addingTasks: true };
  case types.ADD_TASK_SUCCESS:
    return {
      ...state,
      addingTasks: false,
      tasks: [...state.tasks, action.payload],
      
    };
  case types.ADD_TASK_FAILURE:
    return {
      ...state,
      addingTasks: false,
      addingTasksError: true,
    };

    case types.UPDATE_TASK_REQUEST:
      return { ...state, updatingTasks: true };
    case types.UPDATE_TASK_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingTasks: false,
        tasks: state.tasks.map((task) =>
        task.taskTypeId === action.payload.taskTypeId
            ? action.payload
            : task
        ),
      };
    case types.UPDATE_TASK_FAILURE:
      return {
        ...state,
        updatingTasks: false,
        updatingTasksError: true,
      };


      case types.GET_TASK_SEARCH_REQUEST:
        return { ...state, fetchingTaskInputSearchData: true };
      case types.GET_TASK_SEARCH_SUCCESS:
        return {
          ...state,
          fetchingTaskInputSearchData: false,
          tasks: action.payload,
          // serachedData: action.payload,
        };
      case types.GET_TASK_SEARCH_FAILURE:
        return { ...state, fetchingTaskInputSearchDataError: true };

        case types.REMOVE_TASK_REQUEST:
          return { ...state, removingTasks: true };
        case types.REMOVE_TASK_SUCCESS:
          return {
            ...state,
            removingTasks: false,
            tasks: state.tasks.filter(
              (item) => item.taskTypeId !== action.payload
          ),
          };
        case types.REMOVE_TASK_FAILURE:
          return {
            ...state,
            removingTasks: false,
            removingTasksError: true,
          };


          case types.LINK_TASK_WORKFLOW_TOGGLE_REQUEST:
            return { ...state, addingTaskWorkflowToggle: true };
          case types.LINK_TASK_WORKFLOW_TOGGLE_SUCCESS:
            return {
              ...state,
              addingTaskWorkflowToggle: false,
              tasks: state.tasks.map((item) => {
                if (item.taskTypeId === action.payload.taskTypeId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.LINK_TASK_WORKFLOW_TOGGLE_FAILURE:
            return {
              ...state,
              addingTaskWorkflowToggle: false,
              addingTaskWorkflowToggleError: true,
            };

            
            case types.HANDLE_CLAER_REDUCER_DATA_TASK:
              return { ...state, 
                tasks: [], 
                // deletedTruck: [] 
              };


              case types.GET_TASK_COUNT_REQUEST:
                return { ...state, fetchingTaskCount: true };
              case types.GET_TASK_COUNT_SUCCESS:
                return { ...state, fetchingTaskCount: false, 
                  taskCount: action.payload };
              case types.GET_TASK_COUNT_FAILURE:
                return {
                  ...state,
                  fetchingTaskCount: false,
                  fetchingTaskCountError: true,
                };

    default:
        return state;
    }
  };