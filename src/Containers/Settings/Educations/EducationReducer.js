import * as types from "./EducationActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingEducations: false,
    fetchingEducationsError: false,
    educations: [],

    fetchingEducationCount: false,
    fetchingEducationCountError: false,
    educationCount:{},

    addingEducations: false,
    addingEducationsError: false,

    

    updatingEducations: false,
    updatingEducationsError: false,

    removingEducation: false,
    removingEducationError: false,
};

export const educationsReducer = (state = initialState, action) => {
    switch (action.type) {



case types.GET_EDUCATION_REQUEST:
    return { ...state, fetchingEducations: true };
  case types.GET_EDUCATION_SUCCESS:
    return {
      ...state,
      fetchingEducations: false,
      educations: action.payload,
    };
  case types.GET_EDUCATION_FAILURE:
    return {
      ...state,
      fetchingEducations: false,
      fetchingEducationsError: true,
    };

    case types.ADD_EDUCATION_REQUEST:
    return { ...state, addingEducations: true };
  case types.ADD_EDUCATION_SUCCESS:
    return {
      ...state,
      addingEducations: false,
      educations: [...state.educations, action.payload],
      
    };
  case types.ADD_EDUCATION_FAILURE:
    return {
      ...state,
      addingEducations: false,
      addingEducationsError: true,
    };

    case types.UPDATE_EDUCATION_REQUEST:
      return { ...state, updatingEducations: true };
    case types.UPDATE_EDUCATION_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingEducations: false,
        educations: state.educations.map((education) =>
          education.educationTypeId === action.payload.educationTypeId
            ? action.payload
            : education
        ),
      };
    case types.UPDATE_EDUCATION_FAILURE:
      return {
        ...state,
        updatingEducations: false,
        updatingEducationsError: true,
      };

      case types.GET_EDUCATION_SEARCH_REQUEST:
        return { ...state, fetchingEducationSearchData: true };
      case types.GET_EDUCATION_SEARCH_SUCCESS:
        return {
          ...state,
          fetchingEducationSearchData: false,
          educations: action.payload,  
        };
      case types.GET_EDUCATION_SEARCH_FAILURE:
        return { ...state, fetchingEducationSearchDataError: true };
        case types.REMOVE_EDUCATION_REQUEST:
          return { ...state, removingEducation: true };
        case types.REMOVE_EDUCATION_SUCCESS:
          return {
            ...state,
            removingEducation: false,
            educations: state.educations.filter(
              (item) => item.educationTypeId !== action.payload
          ),
          };
        case types.REMOVE_EDUCATION_FAILURE:
          return {
            ...state,
            removingEducation: false,
            removingEducationError: true,
          };

          case types.HANDLE_CLAER_REDUCER_DATA_EDUCATION:
            return { ...state, 
              educations: [], 
              // deletedTruck: [] 
            };



            case types.GET_EDUCATION_COUNT_REQUEST:
              return { ...state, fetchingEducationCount: true };
            case types.GET_EDUCATION_COUNT_SUCCESS:
              return { ...state, fetchingEducationCount: false, 
                educationCount: action.payload };
            case types.GET_EDUCATION_COUNT_FAILURE:
              return {
                ...state,
                fetchingEducationCount: false,
                fetchingEducationCountError: true,
              };


    default:
        return state;
    }
  };