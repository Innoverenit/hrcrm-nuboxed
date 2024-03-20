import * as types from "./TaskActionTypes";

const initialState = {

  viewType: "table",
  addTaskModal: false,
  addingTask: false,
  addingTaskError: false,
  deleteTask: false,
  deleteTaskError: false,
  updatingTask: false,
  updatingTaskError: false,
  patchingTask: false,
  patchingTaskError: false,

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord:[],

  rejectApprove: false,
  rejectApproveError: false,

  addTaskDetailModal:false,

  updateProjectTaskModal:false,

  projectTask:false,
  projectTaskError:false,


  fetchingCandidateTaskList:false,
  fetchingCandidateTaskListError:false,
  candidateTaskList:[],

  addDrawerTaskFeedbackModal:false,

  addSharingTask: false,
  addSharingTaskError: false,

  approvedTask: false,
  approvedTaskError: false,

  fetchingPermissionsListTask: false,
  fetchingPermissionsListTaskError: false,
  permissionsDataListTask:[],


  addDrawerTaskProjectModal:false,

  approvedPartner: false,
  approvedPartnerError: false,
  rejectPartner: false,
  rejectPartnerError: false,
  statusChecking: false,
  statusCheckingError: false,

  deleteDocumentTask: false, 
  deleteDocumentTaskError: false,

  fetchingTaskListRangeByUserId: false,
  fetchingTaskListRangeByUserIdError: false,
  taskListRangeByUserId: [],

  fetchingProjectTaskTable:false,
  fetchingProjectTaskTableError:false,
  projectTaskTable:[],

  fetchingTaskListRangeByUserIdForReport: false,
  fetchingTaskListRangeByUserIdForReportError: false,
  taskListRangeByUserIdForReport: [],

  fetchingTasksCompleted: false,
  fetchingTasksCompletedError: false,
  taskCompleted: "",

  fetchingTasksInProgress: false,
  fetchingTasksInProgressError: false,
  taskInProgress: false,

  fetchingApproveTaskTable: false,
  fetchingApproveTaskTableError: false,
  approvalTaskTable:[],


  fetchingProjectTaskList:false,
  fetchingProjectTaskListError:false,
  projectTaskList:[],

  fetchingHighPriorityTaskCompleted: false,
  fetchingHighPriorityTaskCompletedError: false,
  highPriorityTaskCompleted: false,

  fetchingCandidateFilterTaskList:false,
  fetchingCandidateFilterTaskList:false,
  candidateFilterTaskList:[],

  fetchingTasksVelocity: false,
  fetchingTasksVelocityError: false,
  taskVelocity: 0,

  addingNotesByTaskId: false,
  addingNotesByTaskIdError: false,

  fetchingTasksToStart: false,
  fetchingTasksToStartError: false,
  taskToStart: "",

  fetchingTasksAssigned: false,
  fetchingTasksAssignedError: false,
  taskAssigned: "",


  addTaskImportModal:false,

   linkingTaskStatus: false,
   linkingTaskStatusError:false,

   addDrawerTaskNotesModal:false,

  fetchingTasksApprovalClosed: false,
  fetchingTasksApprovalClosedError: false,
  taskApprovalClosed: "",


  fetchingNotesListByTaskId: false,
  fetchingNotesListByTaskIdError: false,
  notesListByTaskId: [],

  fetchingDocumentsByTaskId: false,
  fetchingDocumentsByTaskIdError: false,
  documentsByTaskId: [],

  fetchingCustomersTaskList:false,
  fetchingCustomersTaskListError:false,
  customerTaskList:[],

  fetchingTasksApprovalCompleted: false,
  fetchingTasksApprovalCompletedError: false,
  taskApprovalCompleted: "",

  fetchingtimeZone: false,
  fetchingTimeZoneError: false,
  timeZone: [],

  fetchingTaskDelete:false,
  fetchingTaskDeleteError:false,
  taskDeleteList:[],

  fetchingTaskListRangeOfAllUsers: false,
  fetchingTaskListRangeOfAllUsersError: false,
  taskListRangeOfAllUsers: [],

  setEditingTask:{},
  updateTaskModal:false,

  downloadTaskModal:false,

  taskById:[],
  fetchingGrantTask: false,
  fetchingGrantTaskError:false,
  grantTask:[],
};
export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REJECT_APPROVE_REQUEST:
      return { ...state, rejectApprove: true };
    case types.REJECT_APPROVE_SUCCESS:
      return {
        ...state,
        rejectApprove: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((task, i) => {
          if (
            task.taskId === action.payload.taskId &&
            task.opportunityId === action.payload.opportunityId
          ) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };

      case types.SET_TASK_VIEW_TYPE:
        return { ...state, viewType: action.payload };
    case types.REJECT_APPROVE_FAILURE:
      return { ...state, rejectApprove: false, rejectApproveError: true };

    case types.PARTNER_REJECT_REQUEST:
      return { ...state, rejectPartner: true };
    case types.PARTNER_REJECT_SUCCESS:
      return {
        ...state,
        rejectPartner: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((task, i) => {
          if (
            task.taskId === action.payload.taskId &&
            task.opportunityId === action.payload.opportunityId
          ) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };

    case types.PARTNER_REJECT_FAILURE:
      return { ...state, rejectPartner: false, rejectPartnerError: true };

    case types.TASK_APPROVED_REQUEST:
      return { ...state, approvedTask: true };
    case types.TASK_APPROVED_SUCCESS:
      return {
        ...state,
        approvedTask: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((task, i) => {
          if (
            task.taskId === action.payload.taskId &&
            task.opportunityId === action.payload.opportunityId
          ) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };
    case types.TASK_APPROVED_FAILURE:
      return { ...state, approvedTask: false, approvedTaskError: true };

    case types.PARTNER_APPROVED_REQUEST:
      return { ...state, approvedPartner: true };
    case types.PARTNER_APPROVED_SUCCESS:
      return {
        ...state,
        approvedPartner: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((task, i) => {
          if (
            task.taskId === action.payload.taskId &&
            task.opportunityId === action.payload.opportunityId
          ) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };
    case types.PARTNER_APPROVED_FAILURE:
      return { ...state, approvedPartner: false, approvedPartnerError: true };
    //status checking
    case types.TASK_CHECK_REQUEST:
      return { ...state, statusChecking: true };
    case types.TASK_CHECK_SUCCESS:
      return { ...state, statusChecking: false };
    case types.TASK_CHECK_FAILURE:
      return { ...state, statusChecking: false, statusCheckingError: true };
    //status checking done
    case types.GET_TASKS_COMPLETED_REQUEST:
      return { ...state, fetchingTasksCompleted: true };
    case types.GET_TASKS_COMPLETED_SUCCESS:
      return {
        ...state,
        fetchingTasksCompleted: false,
        taskCompleted: action.payload,
      };
    case types.GET_TASKS_COMPLETED_FAILURE:
      return {
        ...state,
        fetchingTasksCompleted: false,
        fetchingTasksCompletedError: true,
      };

    case types.GET_TASKS_INPROGRESS_REQUEST:
      return { ...state, fetchingTasksInProgress: true };
    case types.GET_TASKS_INPROGRESS_SUCCESS:
      return {
        ...state,
        fetchingTasksInProgress: false,
        taskInProgress: action.payload,
      };
    case types.GET_TASKS_INPROGRESS_FAILURE:
      return {
        ...state,
        fetchingTasksInProgress: false,
        fetchingTasksInProgressError: true,
      };

    case types.GET_HIGH_PRIORITY_TASKS_COMPLETE_REQUEST:
      return { ...state, fetchingHighPriorityTaskCompleted: true };
    case types.GET_HIGH_PRIORITY_TASKS_COMPLETE_SUCCESS:
      return {
        ...state,
        fetchingHighPriorityTaskCompleted: false,
        highPriorityTaskCompleted: action.payload,
      };
    case types.GET_HIGH_PRIORITY_TASKS_COMPLETE_FAILURE:
      return {
        ...state,
        fetchingHighPriorityTaskCompleted: false,
        fetchingHighPriorityTaskCompletedError: true,
      };
      case types.HANDLE_TASK_IMPORT_MODAL:
      return { ...state, addTaskImportModal: action.payload };

    case types.GET_TASK_VELOCITY_REQUEST:
      return { ...state, fetchingTasksVelocity: true };
    case types.GET_TASK_VELOCITY_SUCCESS:
      return {
        ...state,
        fetchingTasksVelocity: false,
        taskVelocity: action.payload,
      };
    case types.GET_TASK_VELOCITY_FAILURE:
      return {
        ...state,
        fetchingTasksVelocity: false,
        fetchingTasksVelocityError: true,
      };

    case types.GET_TASKS_TOSTART_REQUEST:
      return { ...state, fetchingTasksToStart: true };
    case types.GET_TASKS_TOSTART_SUCCESS:
      return {
        ...state,
        fetchingTasksToStart: false,
        taskToStart: action.payload,
      };
    case types.GET_TASKS_TOSTART_FAILURE:
      return {
        ...state,
        fetchingTasksToStart: false,
        fetchingTasksToStartError: true,
      };

    case types.GET_TASKS_ASSIGNED_REQUEST:
      return { ...state, fetchingTasksAssigned: true };
    case types.GET_TASKS_ASSIGNED_SUCCESS:
      return {
        ...state,
        fetchingTasksAssigned: false,
        taskAssigned: action.payload,
      };
    case types.GET_TASKS_ASSIGNED_FAILURE:
      return {
        ...state,
        fetchingTasksAssigned: false,
        fetchingTasksAssignedError: true,
      };

    case types.GET_APPROVALS_CLOSED_REQUEST:
      return { ...state, fetchingTasksApprovalClosed: true };
    case types.GET_APPROVALS_CLOSED_SUCCESS:
      return {
        ...state,
        fetchingTasksApprovalClosed: false,
        taskApprovalClosed: action.payload,
      };
    case types.GET_APPROVALS_CLOSED_FAILURE:
      return {
        ...state,
        fetchingTasksApprovalClosed: false,
        fetchingTasksApprovalClosedError: true,
      };

    case types.GET_APPROVALS_PENDING_REQUEST:
      return { ...state, fetchingTasksApprovalCompleted: true };
    case types.GET_APPROVALS_PENDING_SUCCESS:
      return {
        ...state,
        fetchingTasksApprovalCompleted: false,
        taskApprovalCompleted: action.payload,
      };
    case types.GET_APPROVALS_PENDING_FAILURE:
      return {
        ...state,
        fetchingTasksApprovalCompleted: false,
        fetchingTasksApprovalCompletedError: true,
      };

    case types.HANDLE_TASK_MODAL:
      return { ...state, addTaskModal: action.payload };
    case types.ADD_TASK_REQUEST:
      return { ...state, addingTask: true };
    case types.ADD_TASK_SUCCESS:
      return { ...state, addingTask: false,
         addTaskModal: false,
         callActivityModal:false,
         addPitchactivityModal:false, };
    case types.ADD_TASK_FAILURE:
      return {
        ...state,
        addingTask: false,
        addingTaskError: false,
        addTaskModal: false,
      };

    case types.GET_TIMEZONE_REQUEST:
      return { ...state, fetchingtimeZone: true };
    case types.GET_TIMEZONE_SUCCESS:
      return { ...state, fetchingtimeZone: false, timeZone: action.payload };
    case types.GET_TIMEZONE_FAILURE:
      return {
        ...state,
        fetchingtimeZone: false,
        fetchingtimeZoneError: true,
      };


      case types.HANDLE_TASK_PROJECT_DRAWER_MODAL:
        return { ...state, addDrawerTaskProjectModal: action.payload };

    /**
     * delete a task permanently
     */
    case types.DELETE_TASK_REQUEST:
      return { ...state, deleteTask: true };
    case types.DELETE_TASK_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        taskListRangeByUserId: state.taskListRangeByUserId.filter(
          (item) => item.taskId !== action.payload
        ),
      };
    case types.DELETE_TASK_FAILURE:
      return { ...state, deleteTask: false, deleteTaskError: false };
    /**
     * update a task
     */
    case types.UPDATE_TASK_BY_ID_REQUEST:
      return { ...state, updatingTask: true };
    case types.UPDATE_TASK_BY_ID_SUCCESS:
      return { ...state, updatingTask: false,
      updateTaskModal:false,
      taskListRangeByUserId: state.taskListRangeByUserId.map((item) => {
        if (item.taskId == action.payload.taskId) {
          return action.payload;
        } else {
          return item;
        }
      }),
    
    };
    case types.UPDATE_TASK_BY_ID_FAILURE:
      return { ...state, updatingTask: false, updatingTaskError: false,
      };
    /**
     * update a task
     */
    case types.PATCH_TASK_BY_ID_REQUEST:
      return { ...state, patchingTask: true };
    case types.PATCH_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        patchingTask: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((task, i) => {
          ////debugger;
          if (
            task.taskId === action.payload.taskId &&
            task.opportunityId === action.payload.opportunityId
          ) {
            ////debugger;
            return action.payload;
          } else {
            ////debugger;
            return task;
          }
        }),
      };
    case types.PATCH_TASK_BY_ID_FAILURE:
      return { ...state, patchingTask: false, patchingTaskError: true };
    /**
     * get tasks list by userId
     */
    case types.GET_TASK_LIST_RANGE_BY_USER_ID_REQUEST:
      return { ...state, fetchingTaskListRangeByUserId: true };
    case types.GET_TASK_LIST_RANGE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingTaskListRangeByUserId: false,
        taskListRangeByUserId: action.payload,
      };
    case types.GET_TASK_LIST_RANGE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingTaskListRangeByUserId: false,
        fetchingTaskListRangeByUserIdError: true,
      };

    case types.GET_TASK_LIST_RANGE_BY_USER_ID_FOR_REPORT_REQUEST:
      return { ...state, fetchingTaskListRangeByUserIdForReport: true };
    case types.GET_TASK_LIST_RANGE_BY_USER_ID_FOR_REPORT_SUCCESS:
      return {
        ...state,
        fetchingTaskListRangeByUserIdForReport: false,
        taskListRangeByUserIdForReport: action.payload,
      };
    case types.GET_TASK_LIST_RANGE_BY_USER_ID_FOR_REPORT_FAILURE:
      return {
        ...state,
        fetchingTaskListRangeByUserIdForReport: false,
        fetchingTaskListRangeByUserIdForReportError: true,
      };



      case types.GET_CUSTOMERS_TASK_LIST_REQUEST:
        return { ...state, fetchingCustomersTaskList: true };
      case types.GET_CUSTOMERS_TASK_LIST_SUCCESS:
        return {
          ...state,
          fetchingCustomersTaskList: false,
           customerTaskList: action.payload,
  
         
        
        };
      case types.GET_CUSTOMERS_TASK_LIST_FAILURE:
        return {
          ...state,
          fetchingCustomersTaskList: false,
          fetchingCustomersTaskListError: true,
        };

    /**
     * get tasks list by userId
     */
    case types.GET_TASK_LIST_RANGE_OF_ALL_USERS_REQUEST:
      return { ...state, fetchingTaskListRangeOfAllUsers: true };
    case types.GET_TASK_LIST_RANGE_OF_ALL_USERS_SUCCESS:
      return {
        ...state,
        fetchingTaskListRangeOfAllUsers: false,
        taskListRangeOfAllUsers: action.payload,
      };
    case types.GET_TASK_LIST_RANGE_OF_ALL_USERS_FAILURE:
      return {
        ...state,
        fetchingTaskListRangeOfAllUsers: false,
        fetchingTaskListRangeOfAllUsersError: true,
      };

    case types.UPDATE_TASK_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        rejectApprove: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((task, i) => {
          if (task.taskId === action.payload.taskId) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };

    case types.APPROVE_TASK_BY_TASK_ID_REQUEST:
      return { ...state, fetchingTaskById: true };
    case types.APPROVE_TASK_BY_TASK_ID_SUCCESS:
      return {
        ...state,
        fetchingTaskById: false,
        approvalTaskTable: state.approvalTaskTable.map((task, i) => {
          if (task.taskId === action.payload.taskId) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };
    case types.APPROVE_TASK_BY_TASK_ID_FAILURE:
      return {
        ...state,
        fetchingTaskById: false,
        fetchingTaskByIdError: true,
      };

    case types.REJECT_TASK_BY_TASK_ID_REQUEST:
      return { ...state, fetchingTaskById: true };
    case types.REJECT_TASK_BY_TASK_ID_SUCCESS:
      return {
        ...state,
        fetchingTaskById: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((task, i) => {
          if (task.taskId === action.payload.taskId) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };
    case types.REJECT_TASK_BY_TASK_ID_FAILURE:
      return {
        ...state,
        fetchingTaskById: false,
        fetchingTaskByIdError: true,
      };


      case types.GET_TASK_DELETE_REQUEST:
        return { ...state, fetchingTaskDelete: true };
      case types.GET_TASK_LIST_RANGE_BY_USER_ID_SUCCESS:
        return {
          ...state,
          fetchingTaskDelete: false,
          taskDeleteList: action.payload,
        };
      case types.GET_TASK_LIST_RANGE_BY_USER_ID_FAILURE:
        return {
          ...state,
          fetchingTaskDelete: false,
          fetchingTaskDeleteError: true,
        };

      case types.HANDLE_UPDATE_PROJECT_TASK_MODAL:
        return { ...state, updateProjectTaskModal: action.payload };


      case types.GET_PROJECT_TASK_LIST_REQUEST:
        return { ...state, fetchingProjectTaskList: true };
      case types.GET_PROJECT_TASK_LIST_SUCCESS:
        return {
          ...state,
          fetchingProjectTaskList: false,
           projectTaskList: action.payload,
  
         
        
        };
      case types.GET_PROJECT_TASK_LIST_FAILURE:
        return {
          ...state,
          fetchingProjectTaskList: false,
          fetchingProjectTaskListError: true,
        };


        case types.GET_CANDIDATE_TASK_FILTER_LIST_REQUEST:
          return { ...state, fetchingCandidateFilterTaskList: true };
        case types.GET_CANDIDATE_TASK_FILTER_LIST_SUCCESS:
          return {
            ...state,
            fetchingCandidateFilterTaskList: false,
             candidateFilterTaskList: action.payload,
    
           
          
          };
        case types.GET_CANDIDATE_TASK_FILTER_LIST_FAILURE:
          return {
            ...state,
            fetchingCandidateFilterTaskList: false,
            fetchingCandidateFilterTaskListError: true,
          };



        case types.GET_CANDIDATE_TASK_LIST_REQUEST:
          return { ...state, fetchingCandidateTaskList: true };
        case types.GET_CANDIDATE_TASK_LIST_SUCCESS:
          return {
            ...state,
            fetchingCandidateTaskList: false,
             candidateTaskList: action.payload,
    
           
          
          };
        case types.GET_CANDIDATE_TASK_LIST_FAILURE:
          return {
            ...state,
            fetchingCandidateTaskList: false,
            fetchingCandidateTaskListError: true,
          };

      
      case types.SET_TASK_EDIT:
        return { ...state, setEditingTask: action.payload };
    
        case types.HANDLE_UPDATE_TASK_MODAL:
          return { ...state, updateTaskModal: action.payload };

          case types.HANDLE_DOWNLOAD_TASK_MODAL:
            return { ...state, downloadTaskModal: action.payload };
  


          case types.GET_PROJECT_TASK_TABLE_REQUEST:
        return { ...state, fetchingProjectTaskTable: true };
      case types.GET_PROJECT_TASK_TABLE_SUCCESS:
        return {
          ...state,
          fetchingProjectTaskTable: false,
           projectTaskTable: action.payload,
  
         
        
        };
      case types.GET_PROJECT_TASK_TABLE_FAILURE:
        return {
          ...state,
          fetchingProjectTaskTable: false,
          fetchingProjectTaskTableError: true,
        };



        case types.ADD_PROJECT_TASK_REQUEST:
        return {
          ...state,
          projectTask: true,
        };
      case types.ADD_PROJECT_TASK_SUCCESS:
        return {
          ...state,
          projectTask: false,
          updateProjectTaskModal:false,
        
          // todayCustomer: action.payload,
        };
      case types.ADD_PROJECT_TASK_FAILURE:
        return {
          ...state,
          projectTask: false,
          projectTaskError: true,
        };




        case types.LINK_TASK_STATUS_REQUEST:
      return { ...state, linkingTaskStatus: true };
    case types.LINK_TASK_STATUS_SUCCESS:
      return {
        ...state,
        linkingTaskStatus: false,
        taskListRangeByUserId: state.taskListRangeByUserId.map((item) => {
          if (item.taskId === action.payload.taskId) {
            // return { ...item, active: action.payload.active };
            return action.payload;
          } else {
            return item;
          }
        }),

        
        // cancelOrder: action.payload,
        // candidateByUserId: action.payload,
        // addTeamTransferModal: false,
      };
    case types.LINK_TASK_STATUS_FAILURE:
      return {
        ...state,
        linkingTaskStatus: false,
        linkingTaskStatusError: true,
      };

      case types.HANDLE_TASK_NOTES_DRAWER_MODAL:
        return { ...state, addDrawerTaskNotesModal: action.payload };

        case types.HANDLE_TASK_FEEDBACK_DRAWER_MODAL:
          return { ...state, addDrawerTaskFeedbackModal: action.payload };
    

        case types.ADD_TASK_NOTES_REQUEST:
          return {
            ...state,
            addingNotesByTaskId: true,          
          };
        case types.ADD_TASK_NOTES_SUCCESS:
          return {
            ...state,
            addDrawerTaskNotesModal:false,
            addingNotesByTaskId: false,

          };
        case types.ADD_TASK_NOTES_FAILURE:
          return {
            ...state,
            addingNotesByTaskId: false,
            addingNotesByTaskIdError: true,
          };  

          case types.GET_NOTES_LIST_BY_TASK_ID_REQUEST:
            return { ...state, fetchingNotesListByTaskId: true };
          case types.GET_NOTES_LIST_BY_TASK_ID_SUCCESS:
            return {
              ...state,
              fetchingNotesListByTaskId: false,
              notesListByTaskId: action.payload,
            };
          case types.GET_NOTES_LIST_BY_TASK_ID_FAILURE:
            return {
              ...state,
              fetchingNotesListByTaskId: false,
              fetchingNotesListByTaskIdError: true,
            };

            case types.GET_APPROVAL_TASK_TABLE_REQUEST:
              return { ...state, fetchingApproveTaskTable: true };
            case types.GET_APPROVAL_TASK_TABLE_SUCCESS:
              return {
                ...state,
                fetchingApproveTaskTable: false,
                // tableProvider: action.payload,
                approvalTaskTable: [...state.approvalTaskTable,...action.payload],
              };
              case types.GET_APPROVAL_TASK_TABLE_FAILURE:
                return {
                  ...state,
                  fetchingApproveTaskTable: false,
                  fetchingApproveTaskTableError: true,
                };

                case types.HANDLE_TASK_OPEN_MODAL:
                  return { ...state, addTaskDetailModal: action.payload };



                  case types.GET_PERMISSIONS_LIST_TASK_REQUEST:
                    return { ...state, fetchingPermissionsListTask: true };
                  case types.GET_PERMISSIONS_LIST_TASK_SUCCESS:
                    return {
                      ...state,
                      fetchingPermissionsListTask: false,
                      permissionsDataListTask: action.payload,
                    };
                  case types.GET_PERMISSIONS_LIST_TASK_FAILURE:
                    return {
                      ...state,
                      fetchingPermissionsListTask: false,
                      fetchingPermissionsListTaskError: false,
                    };
                    case types.ADD_SHARE_TASK_PERMISSION_REQUEST:
                      return { ...state, addSharingTask: true };
                
                    case types.ADD_SHARE_TASK_PERMISSION_SUCCESS:
                      return { ...state, addSharingTask: false, taskListRangeByUserId: action.payload };
                
                    case types.ADD_SHARE_TASK_PERMISSION_FAILURE:
                      return {
                        ...state,
                        addSharingTask: false,
                        addSharingTaskError: true,
                      };

                      case types.GET_GRANTT_TASK_REQUEST:
                        return { ...state, fetchingGrantTask: true };
                      case types.GET_GRANTT_TASK_SUCCESS:
                        return {
                          ...state,
                          fetchingGrantTask: false,
                           grantTask: action.payload,
                        };
                      case types.GET_GRANTT_TASK_FAILURE:
                        return {
                          ...state,
                          fetchingGrantTask: false,
                          fetchingGrantTaskError: true,
                        };

                        case types.GET_TASK_DOCUMENTS_REQUEST:
                          return {
                            ...state,
                            fetchingDocumentsByTaskId: true,
                            fetchingDocumentsByTaskIdError: false,
                          };
                        case types.GET_TASK_DOCUMENTS_SUCCESS:
                          return {
                            ...state,
                            fetchingDocumentsByTaskId: false,
                            fetchingDocumentsByTaskIdError: false,
                            documentsByTaskId: action.payload,
                          };
                        case types.GET_TASK_DOCUMENTS_FAILURE:
                          return {
                            ...state,
                            fetchingDocumentsByTaskId: false,
                            fetchingDocumentsByTaskIdError: true,
                          };

                          case types.DELETE_DOCUMENT_TASK_REQUEST:
                            return { ...state, deleteDocumentTask: true };
                          case types.DELETE_DOCUMENT_TASK_SUCCESS:
                            return {
                              ...state,
                              deleteDocumentTask: false,
                              documentsByTaskId: state.documentsByTaskId.filter(
                                (item) => item.documentId !== action.payload
                              ),
                            };
                          case types.DELETE_DOCUMENT_TASK_FAILURE:
                            return { ...state, deleteDocumentTask: false, deleteDocumentTaskError: false };

                            
                            case types.GET_OPPORTUNITY_RECORD_REQUEST:
                              return { ...state, fetchingOpportunityRecord: true };
                            case types.GET_OPPORTUNITY_RECORD_SUCCESS:
                              return { ...state, fetchingOpportunityRecord: false, 
                                opportunityRecord: action.payload };
                            case types.GET_OPPORTUNITY_RECORD_FAILURE:
                              return {
                                ...state,
                                fetchingOpportunityRecord: false,
                                fetchingOpportunityRecordError: true,
                              };            

        default:
      return state;
  }
  return state;
};
