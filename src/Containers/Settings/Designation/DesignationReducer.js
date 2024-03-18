import * as types from "./DesignationActionTypes";
import dayjs from "dayjs";


const initialState = {

    fetchingDesignations: false,
    fetchingDesignationsError: false,
    designations: [],

    fetchingDesignationCount: false,
    fetchingDesignationCountError: false,
    designationCount:{},

    addingDesignations: false,
    addingDesignationsError: false,

    removingDesignations: false,
    removingDesignationsError: false,

    updatingDesignations: false,
    updatingDesignationsError: false,

   
};

export const designationsReducer = (state = initialState, action) => {
    switch (action.type) {

          /**
     * get the list of all Designation
     */
    case types.GET_DESIGNATIONS_REQUEST:
        return { ...state, fetchingDesignations: true };
      case types.GET_DESIGNATIONS_SUCCESS:
        return { ...state, fetchingDesignations: false, designations: action.payload };
      case types.GET_DESIGNATIONS_FAILURE:
        return { ...state, fetchingDesignations: false, fetchingDesignationsError: true };


         /**
     * add a new document 
     */
    case types.ADD_DESIGNATIONS_REQUEST:
        return { ...state, addingDesignations: true };
      case types.ADD_DESIGNATIONS_SUCCESS:
        return {
          ...state,
          addingDesignations: false,
          designations: [...state.designations, action.payload],
        };
      case types.ADD_DESIGNATIONS_FAILURE:
        return { ...state, addingDesignations: false, addingDesignationsError: true };


         /**
     * remove an existing DESIGNATIONS
     */
    case types.REMOVE_DESIGNATIONS_REQUEST:
        return { ...state, removingDesignations: true };
      case types.REMOVE_DESIGNATIONS_SUCCESS:
        return {
          ...state,
          removingDesignations: false,
          designations: state.designations.filter(
            (item) => item.designationTypeId !== action.payload
        ),
        };
      case types.REMOVE_DESIGNATIONS_FAILURE:
        return { ...state, removingDesignations: false, removingDesignationsError: true };



         /**
     * update an existing DESIGNATIONS
     */
    case types.UPDATE_DESIGNATIONS_REQUEST:
        return { ...state, updatingDesignations: true };
      case types.UPDATE_DESIGNATIONS_SUCCESS:
        // return { ...state, updatingDesignations: false, Designations: [...state.Designations, action.payload] };
        return {
          ...state,
          updatingDesignations: false,
          designations: state.designations.map((designation) =>
            designation.designationTypeId === action.payload.designationTypeId
              ? action.payload
              : designation
          ),
        };
      case types.UPDATE_DESIGNATIONS_FAILURE:
        return { ...state, updatingDesignations: false, updatingDesignationsError: true };

        case types.GET_DESIGNATION_SEARCH_REQUEST:
          return { ...state, fetchingDesignationInputSearchData: true };
        case types.GET_DESIGNATION_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingDesignationInputSearchData: false,
            designations: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_DESIGNATION_SEARCH_FAILURE:
          return { ...state, fetchingDesignationInputSearchDataError: true };

          case types.HANDLE_CLAER_REDUCER_DATA_DESIGNATION:
            return { ...state, 
              designations: [], 
              // deletedTruck: [] 
            };


            case types.GET_DESIGNATION_COUNT_REQUEST:
              return { ...state, fetchingDesignationCount: true };
            case types.GET_DESIGNATION_COUNT_SUCCESS:
              return { ...state, fetchingDesignationCount: false, 
                designationCount: action.payload };
            case types.GET_DESIGNATION_COUNT_FAILURE:
              return {
                ...state,
                fetchingDesignationCount: false,
                fetchingDesignationCountError: true,
              };

        default:
            return state;
        }
      };
