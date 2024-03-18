import * as types from "./DepartmentActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingDepartments: false,
    fetchingDepartmentsError: false,
    departments: [],

    addingHrToggle: false,
    addingHrToggleError: false,

    addingRecruitToggle: false,
    addingRecruitToggleError: false,

    addingElearningToggle: false,
    addingElearningToggleError: false,

    addingDepartments: false,
    addingDepartmentsError: false,

    fetchingDepartmentInputSearchData:false,
    fetchingDepartmentInputSearchData:false,

    removingDepartments: false,
    removingDepartmentsError: false,

    updatingDepartments: false,
    updatingDepartmentsError: false,

    fetchingDepartmentCount: false,
    fetchingDepartmentCountError: false,
    departmentCount:{},

    addingCrmToggle: false,
    addingCrmToggleError: false,

    addingImToggle: false,
    addingImToggleError: false,

    addingAccountingToggle: false,
    addingAccountingToggleError: false,

    addingErpToggle: false,
    addingErpToggleError: false,


    addingDepartmentDocumentToggle: false,
              addingDepartmentDocumentToggleError: false,
   
};

export const departmentsReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Designation
     */
    case types.GET_DEPARTMENTS_REQUEST:
        return { ...state, fetchingDepartments: true };
      case types.GET_DEPARTMENTS_SUCCESS:
        return { ...state, fetchingDepartments: false, departments: action.payload };
      case types.GET_DEPARTMENTS_FAILURE:
        return { ...state, fetchingDepartments: false, fetchingDepartmentsError: true };


         /**
     * add a new document 
     */
    case types.ADD_DEPARTMENTS_REQUEST:
        return { ...state, addingDepartments: true };
      case types.ADD_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          addingDepartments: false,
          departments:[action.payload,...state.departments]
          // departments: [...state.departments, action.payload],
        };
      case types.ADD_DEPARTMENTS_FAILURE:
        return { ...state, addingDepartments: false, addingDepartmentsError: true };


         /**
     * remove an existing DEPARTMENTS
     */
    case types.REMOVE_DEPARTMENTS_REQUEST:
        return { ...state, removingDepartments: true };
      case types.REMOVE_DEPARTMENTS_SUCCESS:
        return {
          ...state,
          removingDepartments: false,
          departments: state.departments.filter(
            (item) => item.departmentId !== action.payload
        ),
        };
      case types.REMOVE_DEPARTMENTS_FAILURE:
        return { ...state, removingDepartments: false, removingDepartmentsError: true };



         /**
     * update an existing DEPARTMENTS
     */
    case types.UPDATE_DEPARTMENTS_REQUEST:
        return { ...state, updatingDepartments: true };
      case types.UPDATE_DEPARTMENTS_SUCCESS:
        // return { ...state, updatingDepartments: false, Departments: [...state.Departments, action.payload] };
        return {
          ...state,
          updatingDepartments: false,
          departments: state.departments.map((department) =>
            department.departmentId === action.payload.departmentId
              ? action.payload
              : department
          ),
        };
      case types.UPDATE_DEPARTMENTS_FAILURE:
        return { ...state, updatingDepartments: false, updatingDepartmentsError: true };

        case types.GET_DEPARTMENT_SEARCH_REQUEST:
          return { ...state, fetchingDepartmentInputSearchData: true };
        case types.GET_DEPARTMENT_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingDepartmentInputSearchData: false,
            departments: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_DEPARTMENT_SEARCH_FAILURE:
          return { ...state, fetchingDepartmentInputSearchDataError: true };


          case types.LINK_DEPARTMENT_DOCUMENT_TOGGLE_REQUEST:
            return { ...state, addingDepartmentDocumentToggle: true };
          case types.LINK_DEPARTMENT_DOCUMENT_TOGGLE_SUCCESS:
            return {
              ...state,
              addingDepartmentDocumentToggle: false,
              departments:action.payload,
              // departments: state.departments.map((item) => {
              //   if (item.departmentId === action.payload.departmentId) {
              //     return action.payload;
              //   } else {
              //     return item;
              //   }
              // }),
            };
          case types.LINK_DEPARTMENT_DOCUMENT_TOGGLE_FAILURE:
            return {
              ...state,
              addingDepartmentDocumentToggle: false,
              addingDepartmentDocumentToggleError: true,
            };


            case types.LINK_CRM_TOGGLE_REQUEST:
              return { ...state, addingCrmToggle: true };
            case types.LINK_CRM_TOGGLE_SUCCESS:
              return {
                ...state,
                addingCrmToggle: false,
                departments:action.payload,
              //   departments: state.departments.map((sector) =>
              //   sector.departmentId === action.payload.departmentId
              //     ? action.payload
              //     : sector
              // ),
               
              };
            case types.LINK_CRM_TOGGLE_FAILURE:
              return {
                ...state,
                addingCrmToggle: false,
                addingCrmToggleError: true,
              };


              case types.LINK_IM_TOGGLE_REQUEST:
                return { ...state, addingImToggle: true };
              case types.LINK_IM_TOGGLE_SUCCESS:
                return {
                  ...state,
                  addingImToggle: false,
                      departments:action.payload,
                  // departments: state.departments.map((item) => {
                  //   if (item.departmentId === action.payload.departmentId) {
                  //     return action.payload;
                  //   } else {
                  //     return item;
                  //   }
                  // }),
                };
              case types.LINK_IM_TOGGLE_FAILURE:
                return {
                  ...state,
                  addingImToggle: false,
                  addingImToggleError: true,
                };

                case types.LINK_HR_TOGGLE_REQUEST:
                  return { ...state, addingHrToggle: true };
                case types.LINK_HR_TOGGLE_SUCCESS:
                  return {
                    ...state,
                    addingHrToggle: false,
                        departments:action.payload,
                   
                  };
                case types.LINK_HR_TOGGLE_FAILURE:
                  return {
                    ...state,
                    addingHrToggle: false,
                    addingHrToggleError: true,
                  };

                case types.LINK_ACCOUNTING_TOGGLE_REQUEST:
                  return { ...state, addingAccountingToggle: true };
                case types.LINK_ACCOUNTING_TOGGLE_SUCCESS:
                  return {
                    ...state,
                    addingAccountingToggle: false,
                        departments:action.payload,
                    // departments: state.departments.map((item) => {
                    //   if (item.departmentId === action.payload.departmentId) {
                    //     return action.payload;
                    //   } else {
                    //     return item;
                    //   }
                    // }),
                  };
                case types.LINK_ACCOUNTING_TOGGLE_FAILURE:
                  return {
                    ...state,
                    addingAccountingToggle: false,
                    addingAccountingToggleError: true,
                  };

              case types.LINK_ERP_TOGGLE_REQUEST:
                return { ...state, addingErpToggle: true };
              case types.LINK_ERP_TOGGLE_SUCCESS:
                return {
                  ...state,
                  addingErpToggle: false,
                  departments:action.payload,
                  // departments: state.departments.map((item) => {
                  //   if (item.departmentId === action.payload.departmentId) {
                  //     return action.payload;
                  //   } else {
                  //     return item;
                  //   }
                  // }),
                };
              case types.LINK_ERP_TOGGLE_FAILURE:
                return {
                  ...state,
                  addingErpToggle: false,
                  addingErpToggleError: true,
                };

                
              case types.LINK_RECRUIT_TOGGLE_REQUEST:
                return { ...state, addingRecruitToggle: true };
              case types.LINK_RECRUIT_TOGGLE_SUCCESS:
                return {
                  ...state,
                  addingRecruitToggle: false,
                  departments:action.payload,
                  // departments: state.departments.map((item) => {
                  //   if (item.departmentId === action.payload.departmentId) {
                  //     return action.payload;
                  //   } else {
                  //     return item;
                  //   }
                  // }),
                };
              case types.LINK_RECRUIT_TOGGLE_FAILURE:
                return {
                  ...state,
                  addingRecruitToggle: false,
                  addingRecruitToggleError: true,
                };

                case types.LINK_ELEARNING_TOGGLE_REQUEST:
                  return { ...state, addingElearningToggle: true };
                case types.LINK_ELEARNING_TOGGLE_SUCCESS:
                  return {
                    ...state,
                    addingElearningToggle: false,
                    departments:action.payload,
                    // departments: state.departments.map((item) => {
                    //   if (item.departmentId === action.payload.departmentId) {
                    //     return action.payload;
                    //   } else {
                    //     return item;
                    //   }
                    // }),
                  };
                case types.LINK_ELEARNING_TOGGLE_FAILURE:
                  return {
                    ...state,
                    addingElearningToggle: false,
                    addingElearningToggleError: true,
                  };

                
              case types.HANDLE_CLAER_REDUCER_DATA_DEPARTMENT:
                return { ...state, 
                  departments: [], 
                  // deletedTruck: [] 
                };

                
        case types.ADDING_MODULE_REQUEST:
          return { ...state, addingModules: true };
        case types.ADDING_MODULE_SUCCESS:
          return {
            ...state,
            addingModules: false,
            departments:[action.payload,...state.departments]
            // departments: state.departments.map((item) => {
            //   if (item.departmentId
            //     === action.payload.departmentId
            //   ) {
            //     return action.payload;
            //   } else {
            //     return item;
            //   }
            // }),
          };
        case types.ADDING_MODULE_FAILURE:
          return {
            ...state,
            addingModules: false,
            addingModulesError: true,
          };

          case types.GET_DEPARTMENT_COUNT_REQUEST:
            return { ...state, fetchingDepartmentCount: true };
          case types.GET_DEPARTMENT_COUNT_SUCCESS:
            return { ...state, fetchingDepartmentCount: false, 
              departmentCount: action.payload };
          case types.GET_DEPARTMENT_COUNT_FAILURE:
            return {
              ...state,
              fetchingDepartmentCount: false,
              fetchingDepartmentCountError: true,
            };
    

        default:
            return state;
        }
      };
