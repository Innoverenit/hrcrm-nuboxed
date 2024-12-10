import * as types from "./RequirementActionTypes";
import dayjs from "dayjs";

const initialState = {

    type : null,
    viewType: "card",

    fetchingRequirementRecord: false,
  fetchingRequirementRecordError: false,
  requirementRecord:{},

  addNwRecruitModal:false,

  fetchingAllRequirementTable:false,
  fetchingAllRequirementTableError:false,
  requirementTable:[]
};
export const requirementReducer = (state = initialState, action) => {
  switch (action.type) {
    
 case types.SET_REQUIREMENT_VIEW_TYPE:
    return { ...state, viewType: action.payload };

   
   
      case types.GET_REQUIREMENT_RECORD_REQUEST:
        return { ...state, fetchingRequirementRecord: true };
      case types.GET_REQUIREMENT_RECORD_SUCCESS:
        return { ...state, fetchingRequirementRecord: false,
           requirementRecord: action.payload };
      case types.GET_REQUIREMENT_RECORD_FAILURE:
        return {
          ...state,
          fetchingRequirementRecord: false,
          fetchingRequirementRecordError: true,
        }; 



        case types. GET_ALL_REQUIREMENT_TABLE_REQUEST:
          return {
            ...state,
            fetchingAllRequirementTable: true,
          };
        case types. GET_ALL_REQUIREMENT_TABLE_SUCCESS:
          return {
            ...state,
            fetchingAllRequirementTable: false,
            // requirementTable: action.payload,
            requirementTable: [...state.requirementTable, ...action.payload],
          };
        case types. GET_ALL_REQUIREMENT_TABLE_FAILURE:
          return {
            ...state,
            fetchingAllRequirementTable: false,
            fetchingAllRequirementTableError: true,
          };
        
          case types.HANDLE_CLAER_REDUCER_DATA_REQUIREMENT:
            return { ...state, 
              requirementTable: [], 
              // deletedTruck: [] 
            };

            case types.HANDLE_NWRECRUIT_MODAL:
              return { ...state, addNwRecruitModal: action.payload };

      default:
        return state;
    }
  };
     