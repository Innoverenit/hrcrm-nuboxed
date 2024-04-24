import * as types from "./RoleActionTypes";
import dayjs from "dayjs";

const initialState = {
  fetchingRoles: false,
  fetchingRolesError: false,
  roles: [],

  addingRoles: false,
  addingRolesError: false,

  removingTalentRole: false,
  removingTalentRoleError: false,

  addingTalentRoles: false,
  addingTalentRolesError: false ,

  fetchingTalentRoles: false, 
  fetchingTalentRolesError: false,
  talentRoles:[],

  fetchingExternalRoleCount: false,
  fetchingExternalRoleCountError: false,
  externalRoleCount:{},

  fetchingRoleCount: false,
  fetchingRoleCountError: false,
  roleCount:{},


  updatingTalentRoles: false, 
  updatingTalentRolesError: false ,


  fetchingRoleInputSearchData: false,
  fetchingRoleInputSearchDataError: false,

  removingRole: false,
  removingRoleError: false,

  updatingRoles: false,
  updatingRolesError: false,
};
export const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ROLES_REQUEST:
      return { ...state, fetchingRoles: true };
    case types.GET_ROLES_SUCCESS:
      return { ...state, fetchingRoles: false, roles: action.payload };
    case types.GET_ROLES_FAILURE:
      return { ...state, fetchingRoles: false, fetchingRolesError: true };

    case types.ADD_ROLES_REQUEST:
      return { ...state, addingRoles: true };
    case types.ADD_ROLES_SUCCESS:
      return {
        ...state,
        addingRoles: false,
        roles: [...state.roles, action.payload],
      };
    case types.ADD_ROLES_FAILURE:
      return { ...state, addingRoles: false, addingRolesError: true };

    case types.UPDATE_ROLES_REQUEST:
      return { ...state, updatingRoles: true };
    case types.UPDATE_ROLES_SUCCESS:
      // return { ...state, updatingDepartments: false, Departments: [...state.Departments, action.payload] };
      return {
        ...state,
        updatingRoles: false,
        roles: state.roles.map((role) =>
          role.roleTypeId === action.payload.roleTypeId ? action.payload : role
        ),
      };
    case types.UPDATE_ROLES_FAILURE:
      return { ...state, updatingRoles: false, updatingRolesError: true };

    case types.GET_ROLE_SEARCH_REQUEST:
      return { ...state, fetchingRoleInputSearchData: true };
    case types.GET_ROLE_SEARCH_SUCCESS:
      return {
        ...state,
        fetchingRoleInputSearchData: false,
        roles: action.payload,
        // serachedData: action.payload,
      };
    case types.GET_ROLE_SEARCH_FAILURE:
      return { ...state, fetchingRoleInputSearchDataError: true };

    case types.REMOVE_ROLE_REQUEST:
      return { ...state, removingRole: true };
    case types.REMOVE_ROLE_SUCCESS:
      return {
        ...state,
        removingRole: false,
        roles: state.roles.filter((item) => item.roleTypeId !== action.payload),
      };
    case types.REMOVE_ROLE_FAILURE:
      return {
        ...state,
        removingRole: false,
        removingRoleError: true,
      };

      case types.GET_TALENT_ROLES_REQUEST:
        return { ...state, fetchingTalentRoles: true };
      case types.GET_TALENT_ROLES_SUCCESS:
        return { ...state, fetchingTalentRoles: false, talentRoles: action.payload };
      case types.GET_TALENT_ROLES_FAILURE:
        return { ...state, fetchingTalentRoles: false, fetchingTalentRolesError: true };

        case types.ADD_TALENT_ROLES_REQUEST:
          return { ...state, addingTalentRoles: true };
        case types.ADD_TALENT_ROLES_SUCCESS:
          return {
            ...state,
            addingTalentRoles: false,
            talentRoles: [...state.talentRoles, action.payload],
          };
        case types.ADD_TALENT_ROLES_FAILURE:
          return { ...state, addingTalentRoles: false,addingTalentRolesError: true };


          case types.UPDATE_TALENT_ROLES_REQUEST:
            return { ...state, updatingTalentRoles: true };
          case types.UPDATE_TALENT_ROLES_SUCCESS:
            // return { ...state, updatingDepartments: false, Departments: [...state.Departments, action.payload] };
            return {
              ...state,
              updatingTalentRoles: false,
              talentRoles: state.talentRoles.map((role) =>
                role.roleTypeExternalId === action.payload.roleTypeExternalId ? action.payload : role
              ),
            };
          case types.UPDATE_TALENT_ROLES_FAILURE:
            return { ...state, updatingTalentRoles: false, updatingTalentRolesError: true };
      

            case types.REMOVE_TALENT_ROLE_REQUEST:
              return { ...state, removingTalentRole: true };
            case types.REMOVE_TALENT_ROLE_SUCCESS:
              return {
                ...state,
                removingTalentRole: false,
                talentRoles: state.talentRoles.filter(
                  (item) => item.roleTypeExternalId !== action.payload
              ),
              };
            case types.REMOVE_TALENT_ROLE_FAILURE:
              return {
                ...state,
                removingTalentRole: false,
                removingTalentRoleError: true,
              };


              case types.HANDLE_CLAER_REDUCER_DATA_ROLE:
                return { ...state, 
                  roles: [], 
                  // deletedTruck: [] 
                };

                case types.GET_ROLE_SEARCH_TALENT_REQUEST:
                  return { ...state, fetchingRoleTalentInputSearchData: true };
                case types.GET_ROLE_SEARCH_TALENT_SUCCESS:
                  return {
                    ...state,
                    fetchingRoleTalentInputSearchData: false,
                    talentRoles: action.payload,
                    // serachedData: action.payload,
                  };
                case types.GET_ROLE_SEARCH_TALENT_FAILURE:
                  return { ...state, fetchingRoleTalentInputSearchDataError: true };
                  case types.HANDLE_CLAER_REDUCER_DATA_ROLE_TALENT:
                    return { ...state, 
                      talentRoles: [], 
                      // deletedTruck: [] 
                    };   
                    
                    
                    case types.GET_ROLE_COUNT_REQUEST:
                      return { ...state, fetchingRoleCount: true };
                    case types.GET_ROLE_COUNT_SUCCESS:
                      return { ...state, fetchingRoleCount: false, 
                        roleCount: action.payload };
                    case types.GET_ROLE_COUNT_FAILURE:
                      return {
                        ...state,
                        fetchingRoleCount: false,
                        fetchingRoleCountError: true,
                      };

                      case types.GET_EXTERNAL_ROLE_COUNT_REQUEST:
                        return { ...state, fetchingExternalRoleCount: true };
                      case types.GET_EXTERNAL_ROLE_COUNT_SUCCESS:
                        return { ...state, fetchingExternalRoleCount: false, 
                          externalRoleCount: action.payload };
                      case types.GET_EXTERNAL_ROLE_COUNT_FAILURE:
                        return {
                          ...state,
                          fetchingExternalRoleCount: false,
                          fetchingExternalRoleCountError: true,
                        };
   

    default:
      return state;
  }
};
