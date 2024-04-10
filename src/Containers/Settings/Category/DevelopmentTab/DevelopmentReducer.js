import * as types from "./DevelopmentActionType";
import dayjs from "dayjs";

const initialState = {
  fetchingDevelopment: false,
  fetchingDevelopmentError: false,
  developmentList: [],

  addingDevelopment: false,
  addingDevelopmentError: false,

  fetchingDevelopmentCount: false,
  fetchingDevelopmentCountError: false,
  developeCount:{},

  fetchingDevelopmentInputSearchData: false,
  fetchingDevelopmentInputSearchDataError: false,

  removingDevelopment: false,
  removingDevelopmentError: false,

  updatingDevelopment: false,
  updatingDevelopmentError: false,
};
export const developmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DEVELOPMENT_REQUEST:
      return { ...state, fetchingDevelopment: true };
    case types.GET_DEVELOPMENT_SUCCESS:
      return { ...state, fetchingDevelopment: false, developmentList: action.payload };
    case types.GET_DEVELOPMENT_FAILURE:
      return { ...state, fetchingDevelopment: false, fetchingDevelopmentError: true };

    case types.ADD_DEVELOPMENT_REQUEST:
      return { ...state, addingDevelopment: true };
    case types.ADD_DEVELOPMENT_SUCCESS:
      return {
        ...state,
        addingDevelopment: false,
        developmentList: [...state.developmentList, action.payload],
      };
    case types.ADD_DEVELOPMENT_FAILURE:
      return { ...state, addingDevelopment: false, addingDevelopmentError: true };

    case types.UPDATE_DEVELOPMENT_REQUEST:
      return { ...state, updatingDevelopment: true };
    case types.UPDATE_DEVELOPMENT_SUCCESS:
      // return { ...state, updatingDepartments: false, Departments: [...state.Departments, action.payload] };
      return {
        ...state,
        updatingDevelopment: false,
        developmentList: state.developmentList.map((role) =>
          role.developmentId === action.payload.developmentId ? action.payload : role
        ),
      };
    case types.UPDATE_DEVELOPMENT_FAILURE:
      return { ...state, updatingDevelopment: false, updatingDevelopmentError: true };

    case types.GET_DEVELOPMENT_SEARCH_REQUEST:
      return { ...state, fetchingDevelopmentInputSearchData: true };
    case types.GET_DEVELOPMENT_SEARCH_SUCCESS:
      return {
        ...state,
        fetchingDevelopmentInputSearchData: false,
        developmentList: action.payload,
        // serachedData: action.payload,
      };
    case types.GET_DEVELOPMENT_SEARCH_FAILURE:
      return { ...state, fetchingDevelopmentInputSearchDataError: true };

    case types.REMOVE_DEVELOPMENT_REQUEST:
      return { ...state, removingDevelopment: true };
    case types.REMOVE_DEVELOPMENT_SUCCESS:
      return {
        ...state,
        removingDevelopment: false,
        developmentList: state.developmentList.filter((item) => item.developmentId !== action.payload),
      };
    case types.REMOVE_DEVELOPMENT_FAILURE:
      return {
        ...state,
        removingDevelopment: false,
        removingDevelopmentError: true,
      };

   


              case types.HANDLE_CLAER_REDUCER_DATA_DEVELOPMENT:
                return { ...state, 
                    developmentList: [], 
                  // deletedTruck: [] 
                };

           
                    
                    
                    case types.GET_DEVELOPMENT_COUNT_REQUEST:
                      return { ...state, fetchingDevelopmentCount: true };
                    case types.GET_DEVELOPMENT_COUNT_SUCCESS:
                      return { ...state, fetchingDevelopmentCount: false, 
                        developeCount: action.payload };
                    case types.GET_DEVELOPMENT_COUNT_FAILURE:
                      return {
                        ...state,
                        fetchingDevelopmentCount: false,
                        fetchingDevelopmentCountError: true,
                      };


   

    default:
      return state;
  }
};
