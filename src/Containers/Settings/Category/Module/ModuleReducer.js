import * as types from "./ModuleActionTypes";

const initialState = {

    fetchingModules: false,
    fetchingModulesError: false,
    moduleList: [],

    addingModules: false,
    addingModulesError: false,

   
};

export const moduleReducer = (state = initialState, action) => {
    switch (action.type) {



        case types.ADDING_MODULE_REQUEST:
            return { ...state, addingModules: true };
          case types.ADDING_MODULE_SUCCESS:
            return {
              ...state,
              addingModules: false,
              // moduleList:[action.payload,...state.moduleList]
              moduleList: state.moduleList.map((item) => {
                if (item.orgId
                  === action.payload.orgId
                ) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.ADDING_MODULE_FAILURE:
            return {
              ...state,
              addingModules: false,
              addingModulesError: true,
            };

            case types.GET_MODULE_REQUEST:
                return { ...state, fetchingModules: true };
              case types.GET_MODULE_SUCCESS:
                return {
                  ...state,
                  fetchingModules: false,
                  moduleList: action.payload,
                };
              case types.GET_MODULE_FAILURE:
                return {
                  ...state,
                  fetchingModules: false,
                  fetchingModulesError: false,
                };

    
  

      
    
    default:
        return state;
    }
  };