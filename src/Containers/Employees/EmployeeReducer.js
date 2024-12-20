import * as types from "./EmployeeActionType";

const initialState = {
  viewType: "tile",

  addEmployeeModal: false,

  updateEmployeeModal:false,

  setEditingEmployee:{},

  addingEmployee: false,
  addingEmployeeError: false,

  fetchingTopicsByUserId: false,
  fetchingTopicsByUserIdError: false,
  topicsByUserId: [],

  fetchingAssignedToList: false,
  fetchingAssignedToListError: false,
  assignedToList:[],

  fetchingEmployeeTreeMap: false,
  fetchingEmployeeTreeMapError: false,
  employeeTreeMap:{},

  addWorkflowEmployee: false,
  addWorkflowEmployeeError: false,

  onboardingEmployeeModal:false,

  fetchingFilterEmployee: false,
   fetchingFilterEmployeeError: false,

  fetchingEmployee: false,
  fetchingEmployeeError: false,
  employees: [],


  fetchingUserSalary:false,
  fetchingUserSalaryError:false,
  usersalary:[],

  addDrawerEmployeeDocumentModal:false,

  fetchingEmployeeData: false,
  fetchingEmployeeDataError: false,
  employeesData: [],

  updatingEmployeeExperience: false,
  updatingEmployeeExperienceError: false,

  SuspendStatus: false,
  SuspendStatusError: false,

  addingNotesByEmploeeId: false,
  addingNotesByEmployeeIdError: false,

  fetchingEmployeeById: false,
  fetchingEmployeeByIdError: false,
  singleEmployee: {},



  addOnboadingEmpl: false,
  addOnboadingEmplError: false,

  updatingActualValue: false,
   updatingActualValueError: false, 

  fetchingProcessDropdownForOnboarding: false,
  fetchingProcessDropdownForOnboardingError: false,
  onboardingDropdownProcess:[],

  fetchingCertificationByUserId: false,
  fetchingCertificationByUserIdError: false,
  certificationByUserId:[],

  deletingEmployeeData: false,
   deletingEmployeeDataError: false ,

  updatingEmployeeById: false,
  updatingEmployeeByIdError: false,

  updatingEmployeerowById: false,
  updatingEmployeerowByIdError: false,


  fetchingNotesListByEmployeeId: false,
  fetchingNotesListByEmployeeIdError: false,
  notesListByEmployeeId: [],

  fetchingDocumentsByEmployeeId: false,
  fetchingDocumentsByEmployeeIdError: false,
  documentsByEmployeeId: [],

  deleteDocument: false,
  deleteDocumentError: false,

  documentUploadModal: false,

  addingDocumentByEmployeeId: false,
  addingDocumentByEmployeeIdError: false,

  employeeDrawerVisibleForAdmin: false,

  suspendedEmployee: false,
  suspendedEmployeeError: false,

  fetchingEmployeeInputSearchData: false,
  fetchingEmployeeInputSearchDataError: false,
  employeeSerachedData: [],

  fetchingUserStageList: false, 
  fetchingUserStageListError: false,
  userStageList:[],

  fetchingAllDocumentsByEmployeeId: false,
  fetchingAllDocumentsByEmployeeIdError: false,
  allDocumentsByEmployeeId:[],

  fetchingUserKpi: false, 
  fetchingUserKpiError: false,
  userKpiList:[],

  userAdmin:false,
  userAdminError:false,

  addDrawerEmployeePulseModal:false,

  fetchingPermissionsList: false,
  fetchingPermissionsListError: false,
  permissionsDataList: [],

  MutltiorgStatus: false,
  MutltiorgStatusError: false,

  updatingEmployee: false,
  updatingEmployeeError: false,

  fetchingallCustomerEmployeeList:false,
  fetchingallCustomerEmployeeListError:false,
  allCustomerEmployeeList:[],

  updatingUserDragStage:false,

  fetchingEmployeeSkillExperince: false,
  fetchingEmployeeSkillExperinceError: false,
  employeeExperince:[],

  addSharingEmployee: false,
  addSharingEmployeeError: false,

  employeeStatus: false,
  employeeStatusError: false,

  defultStatus: false,
  defultStatusError: false,

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  employeerecordData:{},

  openNotifydrwr:false,
  updateAdminUser: false,
  updateAdminUserError:false,

  fetchingUserAdmin: false,
  fetchingUserAdminError:false,
  userAdminnoti:{},

};

const updatedDragUser = (item, newProps) => {
  console.log("Author8",item);
  return item.map((opp, index) => {
    console.log("Author7",opp);
    console.log("Author8",newProps);
    // const newData=newProps.stageList.map((item)=>{
    //       return item.unboardingStagesId;
    // })
    if (opp.unboardingWorkflowDetailsId === newProps.unboardingWorkflowDetailsId) {
      console.log("inside opp");
      opp.unboardingStagesId = newProps.unboardingStagesId;
    }
    return opp;
  });
};




































export const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EMPLOYEE_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.ADD_EMPLOYEE_ADDRESS:
      return {
        ...state,
        singleEmployee: {
          ...state.singleEmployee,
          address: action.payload.address,
        },
      };

    case types.UPDATE_EMPLOYEE_ADDRESS:
      return {
        ...state,
        singleEmployee: {
          ...state.singleEmployee,
          address: state.singleEmployee.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };
    case types.ADD_EMPLOYEE_REQUEST:
      return { ...state, addingEmployee: true };
    case types.ADD_EMPLOYEE_SUCCESS:
      return { ...state, addingEmployee: false, addEmployeeModal: false,
        employees:[action.payload,...state.employees]
       };
    case types.ADD_EMPLOYEE_FAILURE:
      return { ...state, addingEmployee: false, addingEmployeeError: true };

    case types.GET_EMPLOYEE_LIST_REQUEST:
      return { ...state, fetchingEmployee: true };
    case types.GET_EMPLOYEE_LIST_SUCCESS:
      return { ...state, fetchingEmployee: false,
         employees: action.payload 
        // employees: [
        //   ...state.employees,
        //   ...action.payload],
        };
    case types.GET_EMPLOYEE_LIST_FAILURE:
      return { ...state, fetchingEmployee: false, fetchingEmployeeError: true };


      case types.GET_EMPLOYEE_FILTER_LIST_REQUEST:
        return { ...state, fetchingFilterEmployee: true };
      case types.GET_EMPLOYEE_FILTER_LIST_SUCCESS:
        return { ...state, fetchingFilterEmployee: false, employees: action.payload };
      case types.GET_EMPLOYEE_FILTER_LIST_FAILURE:
        return { ...state, fetchingFilterEmployee: false, fetchingFilterEmployeeError: true };
  


      case types.GET_EMPLOYEE_DATA_REQUEST:
      return { ...state, fetchingEmployeeData: true };
    case types.GET_EMPLOYEE_DATA_SUCCESS:
      return { ...state, fetchingEmployeeData: false, employeesData: action.payload };
    case types.GET_EMPLOYEE_DATA_FAILURE:
      return { ...state, fetchingEmployeeData: false, fetchingEmployeeDataError: true };

    case types.SET_CLEARBIT_DATA:
      return { ...state, clearbit: action.payload };

    //updating employee by Id
    case types.UPDATE_EMPLOYEE_BY_ID_REQUEST:
      return { ...state, updatingEmployeeById: true };
    case types.UPDATE_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        updatingEmployeeById: false,
        singleEmployee: action.payload,
      };
    case types.UPDATE_EMPLOYEE_BY_ID_FAILURE:
      return {
        ...state,
        updatingEmployeeById: false,
        updatingEmployeeByIdError: true,
      };


      case types.UPDATE_EMPLOYEE_ROW_REQUEST:
        return { ...state, updatingEmployeerowById: true };
      case types.UPDATE_EMPLOYEE_ROW_SUCCESS:
        return {
          ...state,
          updatingEmployeerowById: false,
          singleEmployee: action.payload,
        };
      case types.UPDATE_EMPLOYEE_ROW_FAILURE:
        return {
          ...state,
          updatingEmployeerowById: false,
          updatingEmployeerowByIdError: true,
        };
  
    //get single account by ID
    case types.GET_EMPLOYEE_BY_ID_REQUEST:
      return { ...state, fetchingEmployeeById: true };
    case types.GET_EMPLOYEE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingEmployeeById: false,
        singleEmployee: action.payload,
      };
    case types.GET_EMPLOYEE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingEmployeeById: false,
        fetchingEmployeeByIdError: true,
      };

    case types.HANDLE_EMPLOYEE_MODAL:
      return { ...state, addEmployeeModal: action.payload };

    /**
     * Employee Notes
     */

    case types.GET_NOTES_LIST_BY_EMPLOYEE_ID_REQUEST:
      return { ...state, fetchingNotesListByEmployeeId: true };
    case types.GET_NOTES_LIST_BY_EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByEmployeeId: false,
        notesListByEmployeeId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_EMPLOYEE_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByEmployeeId: false,
        fetchingNotesListByEmployeeIdError: true,
      };

    /**
     * get list of documents of an employee
     */
    case types.GET_EMPLOYEE_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByEmployeeId: true,
        fetchingDocumentsByEmployeeIdError: false,
      };
    case types.GET_EMPLOYEE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByEmployeeId: false,
        fetchingDocumentsByEmployeeIdError: false,
        documentsByEmployeeId: action.payload,
      };
    case types.GET_EMPLOYEE_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByEmployeeId: false,
        fetchingDocumentsByEmployeeIdError: true,
      };

    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByEmployeeId: state.documentsByEmployeeId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    /**
     * handle upload document  modal
     */
    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

    /**
     * add/link employee
     */
    case types.ADD_EMPLOYEE_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByEmployeeId: true,
        addingDocumentByEmployeeIdError: false,
      };
    case types.ADD_EMPLOYEE_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByEmployeeId: false,
        addingDocumentByEmployeeIdError: false,
      };
    case types.ADD_EMPLOYEE_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByEmployeeId: false,
        addingDocumentByEmployeeIdError: true,
      };

    case types.HANDLE_EMPLOYEE_DRAWER_FOR_ADMIN:
      return {
        ...state,
        employeeDrawerVisibleForAdmin: action.payload.isVisible,
      };

    //suspend
    case types.SUSPEND_EMPLOYEE_REQUEST:
      return { ...state, suspendedEmployee: true };
    case types.SUSPEND_EMPLOYEE_SUCCESS:
      return {
        ...state,
        suspendedEmployee: false,
        // addTeamTransferModal: false,
        employees: state.employees.map((item) => {
          if (item.employeeId === action.payload.employeeId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.SUSPEND_EMPLOYEE_FAILURE:
      return {
        ...state,
        suspendedEmployee: false,
        suspendedEmployeeError: true,
      };

    //SEARCH
    case types.INPUT_EMPLOYEE_SEARCH_DATA_REQUEST:
      return { ...state, fetchingEmployeeInputSearchData: true };
    case types.INPUT_EMPLOYEE_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingEmployeeInputSearchData: false,
        //employees: action.payload,
         employeeSerachedData: action.payload,
      };
    case types.INPUT_EMPLOYEE_SEARCH_DATA_FAILURE:
      return { ...state, fetchingEmployeeInputSearchDataError: true };

    case types.GET_PERMISSIONS_LIST_REQUEST:
      return { ...state, fetchingPermissionsList: true };
    case types.GET_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        fetchingPermissionsList: false,
        permissionsDataList: action.payload,
      };
    case types.GET_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        fetchingPermissionsList: false,
        fetchingPermissionsListError: false,
      };

    //SHARE Opportunity Permissiom
    case types.ADD_SHARE_EMPLOYEE_PERMISSION_REQUEST:
      return { ...state, addSharingEmployee: true };

    case types.ADD_SHARE_EMPLOYEE_PERMISSION_SUCCESS:
      return {
        ...state,
        addSharingEmployee: false,
        shareEmployee: action.payload,
      };

    case types.ADD_SHARE_EMPLOYEE_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingEmployee: false,
        addSharingEmployeeError: true,
      };



      case types.UPDATE_USER_DRAG_STAGE_REQUEST:
                                                return {
                                                  ...state,
                                                  updatingUserDragStage: true,
                                                
                                                  // candidateRequirement: action.payload,
                                                };
                                              case types.UPDATE_USER_DRAG_STAGE_SUCCESS:
                                                return { ...state, 
                                                  updatingUserDragStage: false ,
                                                  //userStageList: updatedDragUser(state.userStageList, action.payload),
                                                 // candidateRequirement: [action.payload]

                                                };
                                              case types.UPDATE_USER_DRAG_STAGE_FAILURE:
                                                return { ...state };  

    case types.SUSPEND_STATUS_REQUEST:
      return { ...state, SuspendStatus: true };
    case types.SUSPEND_STATUS_SUCCESS:
      return {
        ...state,
        SuspendStatus: false,
        // addTeamTransferModal: false,
      };
    case types.SUSPEND_STATUS_FAILURE:
      return {
        ...state,
        SuspendStatus: false,
        SuspendStatusError: true,
      };

    case types.EMPLOYEE_STATUS_REQUEST:
      return {
        ...state,
        employeeStatus: true,
      };
    case types.EMPLOYEE_STATUS_SUCCESS:
      return {
        ...state,
        employeeStatus: false,
        employees: state.employees.map((item) => {
          if (item.employeeId === action.payload.employeeId) {
            return { ...item, type: action.payload.type };
          } else {
            return item;
          }
        }),
      };
    case types.EMPLOYEE_STATUS_FAILURE:
      return {
        ...state,
        employeeStatus: false,
        employeeStatusError: true,
      };



      case types.GET_USER_SALARY_REQUEST:
    return { ...state,  fetchingUserSalary: true };
  case types.GET_USER_SALARY_SUCCESS:
    return {
      ...state,
      fetchingUserSalary: false,
       usersalary: action.payload,
    };
  case types.GET_USER_SALARY_FAILURE:
    return {
      ...state,
      fetchingUserSalary: false,
      fetchingUserSalaryError: true,
    };


    case types.LINK_EMPLOYEE_STATUS_REQUEST:
      return { ...state, defultStatus: true };
    case types.LINK_EMPLOYEE_STATUS_SUCCESS:
      return {
        ...state,
        defultStatus: false,
        // addTeamTransferModal: false,
      };
    case types.LINK_EMPLOYEE_STATUS_FAILURE:
      return {
        ...state,
        defultStatus: false,
        defultStatusError: true,
      };


      case types.ADD_USER_ADMIN_REQUEST:
        return {
          ...state,
          userAdmin: true,
        };
      case types.ADD_USER_ADMIN_SUCCESS:
        return {
          ...state,
          userAdmin: false,
          // addCandidateDateModal:false,
          // candidateRequirement: state.candidateRequirement.map(
          //   (recruit, i) => {
          //     if (recruit.profileId === action.payload.profileId) {
          //       return action.payload;
          //     } else {
          //       return recruit;
          //     }
          //   }
          // ),
          // todayCustomer: action.payload,
        };
      case types.ADD_USER_ADMIN_FAILURE:
        return {
          ...state,
          userAdmin: false,
          userAdminError: true,
        };

        case types.GET_ALL_CUSTOMER_EMPLOYEE_LIST_REQUEST:
          return { ...state, fetchingallCustomerEmployeeList: true };
        case types.GET_ALL_CUSTOMER_EMPLOYEE_LIST_SUCCESS:
          return {
            ...state,
            fetchingallCustomerEmployeeList: false,
            allCustomerEmployeeList: action.payload,
          };
        case types.GET_ALL_CUSTOMER_EMPLOYEE_LIST_FAILURE:
          return {
            ...state,
            fetchingallCustomerEmployeeList: false,
            fetchingallCustomerEmployeeListError: true,
          };

          case types.GET_RECORDS_REQUEST:
            return { ...state, fetchingRecordsByUserId: true };
          case types.GET_RECORDS_SUCCESS:
            return {
              ...state,
              fetchingRecordsByUserId: false,
              employeerecordData: action.payload,
            };
          case types.GET_RECORDS_FAILURE:
            return {
              ...state,
              fetchingRecordsByUserId: false,
              fetchingRecordsByUserIdError: true,
            };
      
            case types.ADD_TASK_NOTES_REQUEST:
              return {
                ...state,
                addingNotesByEmployeeId: true,          
              };
            case types.ADD_TASK_NOTES_SUCCESS:
              return {
                ...state,
               
                addingNotesByEmployeeId: false,
    
              };
            case types.ADD_TASK_NOTES_FAILURE:
              return {
                ...state,
                addingNotesByEmployeeId: false,
                addingNotesByEmployeeIdError: true,
              };
              
              
              case types.ADD_CERTIFICATION_BY_USER_ID_REQUEST:
                return { ...state, addingCertificationByUserId: true };
              case types.ADD_CERTIFICATION_BY_USER_ID_SUCCESS:
                // console.clear()
                // console.log(action.payload)
                return {
                  ...state,
                  addingCertificationByUserId: false,
                  certificationByUserId: [...state.certificationByUserId, action.payload],
                };
              case types.ADD_CERTIFICATION_BY_USER_ID_FAILURE:
                return {
                  ...state,
                  addingCertificationByUserId: false,
                  addingCertificationByUserIdError: true,
                };


                case types.GET_CERTIFICATION_BY_USER_ID_REQUEST:
                  return { ...state, fetchingCertificationByUserId: true };
                case types.GET_CERTIFICATION_BY_USER_ID_SUCCESS:
                  return {
                    ...state,
                    fetchingCertificationByUserId: false,
                    certificationByUserId: action.payload,
                  };
                case types.GET_CERTIFICATION_BY_USER_ID_FAILURE:
                  return {
                    ...state,
                    fetchingCertificationByUserId: false,
                    fetchingCertificationByUserIdError: true,
                  };

                  case types.DELETE_CERTIFICATION_BY_USER_ID_REQUEST:
                    return { ...state, deletingCertificationByUserId: true };
                  case types.DELETE_CERTIFICATION_BY_USER_ID_SUCCESS:
                    return { ...state, deletingCertificationByUserId: false };
                  case types.DELETE_CERTIFICATION_BY_USER_ID_FAILURE:
                    return {
                      ...state,
                      deletingCertificationByUserId: false,
                      deletingCertificationByUserIdError: true,
                    };


                    case types.UPDATE_EXPERIENCE_BY_EMPLOYEE_ID_REQUEST:
                      return { ...state, updatingEmployeeExperience: true };
                    case types.UPDATE_EXPERIENCE_BY_EMPLOYEE_ID_SUCCESS:
                      return {
                        ...state,
                        updatingEmployeeExperience: false,
                        // updateCandidateEmploymentModal: false,
                        // topicsByUserId:action.payload,
                        // skillExperince: state.skillExperince.map((item) => {
                        //   if (item.skillSetDetailsId === action.payload.skillSetDetailsId) {
                        //     return action.payload;
                        //   } else {
                        //     return item;
                        //   }
                        // }),
                      };
                    case types.UPDATE_EXPERIENCE_BY_EMPLOYEE_ID_FAILURE:
                      return {
                        ...state,
                        updatingEmployeeExperience: false,
                        updatingEmployeeExperienceError: true,
                      };

                      case types.GET_EMPLOYEE_EXPERIENCE_BY_ID_REQUEST:
                        return { ...state, fetchingEmployeeSkillExperince: true };
                      case types.GET_EMPLOYEE_EXPERIENCE_BY_ID_SUCCESS:
                        return {
                          ...state,
                          fetchingEmployeeSkillExperince: false,
                          employeeExperince: action.payload, 
                        };
                      case types.GET_EMPLOYEE_EXPERIENCE_BY_ID_FAILURE:
                        return {
                          ...state,
                          fetchingEmployeeSkillExperince: false,
                          fetchingEmployeeSkillExperinceError: true,
                        };

                        case types.GET_TOPICS_BY_USER_ID_REQUEST:
                          return { ...state, fetchingTopicsByUserId: true };
                        case types.GET_TOPICS_BY_USER_ID_SUCCESS:
                          return {
                            ...state,
                            fetchingTopicsByUserId: false,
                            topicsByUserId: action.payload,
                          };
                        case types.GET_TOPICS_BY_USER_ID_FAILURE:
                          return {
                            ...state,
                            fetchingTopicsByUserId: false,
                            fetchingTopicsByUserIdError: true,
                          };
                    
                        case types.ADD_TOPIC_BY_USER_ID_REQUEST:
                          return { ...state, addingTopicByUserId: true };
                        case types.ADD_TOPIC_BY_USER_ID_SUCCESS:
                          // console.clear()
                          // console.log(action.payload)
                          return {
                            ...state,
                            addingTopicByUserId: false,
                            topicsByUserId: [...state.topicsByUserId, action.payload],
                          };
                        case types.ADD_TOPIC_BY_USER_ID_FAILURE:
                          return {
                            ...state,
                            addingTopicByUserId: false,
                            addingTopicByUserIdError: true,
                          };

                          case types.DELETE_TOPIC_BY_USER_ID_REQUEST:
                            return { ...state, deletingTopicByUserId: true };
                          case types.DELETE_TOPIC_BY_USER_ID_SUCCESS:
                            return { ...state, deletingTopicByUserId: false };
                          case types.DELETE_TOPIC_BY_USER_ID_FAILURE:
                            return {
                              ...state,
                              deletingTopicByUserId: false,
                              deletingTopicByUserIdError: true,
                            };

                            case types.HANDLE_EMPLOYEE_PULSE_DRAWER_MODAL:
                              return { ...state, addDrawerEmployeePulseModal: action.payload };

                              case types.HANDLE_EMPLOYEE_DOCUMENT_DRAWER_MODAL:
                              return { ...state, addDrawerEmployeeDocumentModal: action.payload };



                              case types.GET_EMPLOYEE_TREE_MAP_REQUEST:
                                return { ...state, fetchingEmployeeTreeMap: true };
                              case types.GET_EMPLOYEE_TREE_MAP_SUCCESS:
                                return {
                                  ...state,
                                  fetchingEmployeeTreeMap: false,
                                  employeeTreeMap: action.payload,
                                };
                              case types.GET_EMPLOYEE_TREE_MAP_FAILURE:
                                return {
                                  ...state,
                                  fetchingEmployeeTreeMap: false,
                                  fetchingEmployeeTreeMapError: true,
                                };


                                case types.GET_EMPLOYEE_ALL_DOCUMENTS_REQUEST:
                                  return {
                                    ...state,
                                    fetchingAllDocumentsByEmployeeId: true,
                                    fetchingAllDocumentsByEmployeeIdError: false,
                                  };
                                case types.GET_EMPLOYEE_ALL_DOCUMENTS_SUCCESS:
                                  return {
                                    ...state,
                                    fetchingAllDocumentsByEmployeeId: false,
                                    fetchingAllDocumentsByEmployeeIdError: false,
                                    allDocumentsByEmployeeId: action.payload,
                                  };
                                case types.GET_EMPLOYEE_ALL_DOCUMENTS_FAILURE:
                                  return {
                                    ...state,
                                    fetchingAllDocumentsByEmployeeId: false,
                                    fetchingAllDocumentsByEmployeeIdError: true,
                                  };

                                  case types.HANDLE_UPDATE_EMPLOYEE_MODAL:
                                    return { ...state, updateEmployeeModal: action.payload };

                                    case types.HANDLE_ONBOARDING_EMPLOYEE_MODAL:
                                      return { ...state, onboardingEmployeeModal: action.payload };


                                    case types.SET_EMPLOYEE_EDIT:
      return { ...state, setEditingEmployee: action.payload };
                            

      case types.UPDATE_EMPLOYEE_REQUEST:
        return { ...state, updatingEmployee: true };
      case types.UPDATE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          updatingEmployee: false,
          updateEmployeeModal: false,
          employees: state.employees.map((item) => {
            if (item.employeeId === action.payload.employeeId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };
      case types.UPDATE_EMPLOYEE_FAILURE:
        return {
          ...state,
          updatingEmployee: false,
          updatingEmployeeError: true,
        };

        case types.HANDLE_CLAER_REDUCER_DATA_EMPLOYEE:
          return { ...state, 
            employeeSerachedData: [], 
            // deletedTruck: [] 
          };

          case types.HANDLE_NOTIFY_DRAWER:
            return { ...state, openNotifydrwr: action.payload };

            case types.UPDATE_ADMIN_USER_REQUEST:
              return { ...state, updateAdminUser: true };
            case types.UPDATE_ADMIN_USER_SUCCESS:
              return {
                ...state,
                updateAdminUser: false,
                openNotifydrwr: false,
                employees: state.employees.map((item) => {
                  if (item.employeeId === action.payload.employeeId) {
                    return action.payload;
                  } else {
                    return item;
                  }
                }),
              };
            case types.UPDATE_ADMIN_USER_FAILURE:
              return {
                ...state,
                updateAdminUser: false,
                updateAdminUserError: true,
              };
      
case types.GET_ADMIN_USER_REQUEST:
  return { ...state, fetchingUserAdmin: true };
case types.GET_ADMIN_USER_SUCCESS:
  return {
    ...state,
    fetchingUserAdmin: false,
    userAdminnoti: action.payload,
  };
case types.GET_ADMIN_USER_FAILURE:
  return {
    ...state,
    fetchingUserAdmin: false,
    fetchingUserAdminError: true,
  };

  case types.GET_ASSIGENED_TO_REQUEST:
    return { ...state, fetchingAssignedToList: true };
  case types.GET_ASSIGENED_TO_SUCCESS:
    return {
      ...state,
      fetchingAssignedToList: false,
      assignedToList: action.payload,           
    };
  case types.GET_ASSIGENED_TO_FAILURE:
    return {
      ...state,
      fetchingAssignedToList: false,
      fetchingAssignedToListError: true,
    };


    case types.GET_PROCESS_DROPDOWN_FOR_ONBOARDING_REQUEST:
      return {
        ...state,
        fetchingProcessDropdownForOnboarding: true,
        fetchingProcessDropdownForOnboardingError: false,
      };
    case types.GET_PROCESS_DROPDOWN_FOR_ONBOARDING_SUCCESS:
      return {
        ...state,
        fetchingProcessDropdownForOnboarding: false,
        fetchingProcessDropdownForOnboardingError: false,
        onboardingDropdownProcess: action.payload,
      };
    case types.GET_PROCESS_DROPDOWN_FOR_ONBOARDING_FAILURE:
      return {
        ...state,
        fetchingProcessDropdownForOnboarding: false,
        fetchingProcessDropdownForOnboardingError: true,
      };

      case types.ADD_ONBOARDING_EMPLOYEE_REQUEST:
        return { ...state, addOnboadingEmpl: true };
      case types.ADD_ONBOARDING_EMPLOYEE_SUCCESS:
        return {
          ...state,
          addOnboadingEmpl: false,
          onboardingEmployeeModal: false,
          // employees: state.employees.map((item) => {
          //   if (item.employeeId === action.payload.employeeId) {
          //     return action.payload;
          //   } else {
          //     return item;
          //   }
          // }),
        };
      case types.ADD_ONBOARDING_EMPLOYEE_FAILURE:
        return {
          ...state,
          onboardingEmployeeModal:false,
          addOnboadingEmpl: false,
          addOnboadingEmplError: true,
        };

        case types.DELETE_EMPLOYEE_DATA_REQUEST:
          return { ...state, deletingEmployeeData: true };
        case types.DELETE_EMPLOYEE_DATA_SUCCESS:
          return {
            ...state,
            deletingEmployeeData: false,
            employees: state.employees.filter(
              (item) => item.userId !== action.payload
            ),
          };
        case types.DELETE_EMPLOYEE_DATA_FAILURE:
          return { ...state, deletingEmployeeData: false, deletingEmployeeDataError: false };



          case types.GET_USER_KPI_LIST_REQUEST:
            return { ...state, fetchingUserKpi: true };
          case types.GET_USER_KPI_LIST_SUCCESS:
            return { ...state, fetchingUserKpi: false, 
              userKpiList: action.payload };
          case types.GET_USER_KPI_LIST_FAILURE:
            return { ...state, 
              fetchingUserKpi: false, 
              fetchingUserKpiError: true };


              case types.GET_USER_STAGE_LIST_REQUEST:
                return { ...state, fetchingUserStageList: true };
              case types.GET_USER_STAGE_LIST_SUCCESS:
                return { ...state, fetchingUserStageList: false, 
                  userStageList: action.payload };
              case types.GET_USER_STAGE_LIST_FAILURE:
                return { ...state, 
                  fetchingUserStageList: false, 
                  fetchingUserStageListError: true };



                  case types.ADD_WORKFLOW_EMPLOYEE_REQUEST:
                    return { ...state, addWorkflowEmployee: true };
                  case types.ADD_WORKFLOW_EMPLOYEE_SUCCESS:
                    return {
                      ...state,
                      addWorkflowEmployee: false,
                      userStageList:action.payload
                      // onboardingEmployeeModal: false,
                      // employees: state.employees.map((item) => {
                      //   if (item.employeeId === action.payload.employeeId) {
                      //     return action.payload;
                      //   } else {
                      //     return item;
                      //   }
                      // }),
                    };
                  case types.ADD_WORKFLOW_EMPLOYEE_FAILURE:
                    return {
                      ...state,
                      // onboardingEmployeeModal:false,
                      addWorkflowEmployee: false,
                      addWorkflowEmployeeError: true,
                    };


                    case types.UPDATE_ACTUAL_VALUE_REQUEST:
                      return { ...state, updatingActualValue: true };
                    case types.UPDATE_ACTUAL_VALUE_SUCCESS:
                      // return { ...state, updatingDepartments: false, Departments: [...state.Departments, action.payload] };
                      return {
                        ...state,
                        updatingActualValue: false,
                        userKpiList: state.userKpiList.map((equipment) =>
                        equipment.userKpiLinkId === action.payload.userKpiLinkId ? action.payload : equipment
                        ),
                      };
                    case types.UPDATE_ACTUAL_VALUE_FAILURE:
                      return { ...state, updatingActualValue: false, updatingActualValueError: true };


                     
                      case types.MULTI_ORG_STATUS_REQUEST:
                        return { ...state, MutltiorgStatus: true };
                      case types.MULTI_ORG_STATUS_SUCCESS:
                        return {
                          ...state,
                          MutltiorgStatus: false,
                          // addTeamTransferModal: false,
                        };
                      case types.MULTI_ORG_STATUS_FAILURE:
                        return {
                          ...state,
                          MutltiorgStatus: false,
                          MutltiorgStatusError: true,
                        };           
              


    default:
      return state;
  }
};
