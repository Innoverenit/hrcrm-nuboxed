import * as types from "./ProcreActionTypes";
import moment from "moment";

const initialState = {


  viewType: "card",

  fetchingAllProcure: false,
  fetchingAllProcureError: false,
  allProcure:[],

  fetchingRecords: false,
  fetchingRecordsError: false,
  recordData:{},
 
 



  
  
};

export const procreReducer = (state = initialState, action) => {
  switch (action.type) {
    //set view type
    case types.SET_PROCRE_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
        
      };

      case types.GET_ALL_PROCURE_REQUEST:
        return { ...state, fetchingAllProcure: true };
      case types.GET_ALL_PROCURE_SUCCESS:
        return {
          ...state,
          fetchingAllProcure: false,
          allProcure: action.payload,
        };
      case types.GET_ALL_PROCURE_FAILURE:
        return {
          ...state,
          fetchingAllProcure: false,
          fetchingAllProcureError: true,
        };


        case types.EMPTY_PROCURE_LIST:
          return { ...state, allProcure: [] };


          case types.GET_RECORDS_REQUEST:
            return { ...state, fetchingRecords: true };
          case types.GET_RECORDS_SUCCESS:
            return {
              ...state,
              fetchingRecords: false,
              recordData: action.payload,
            };
          case types.GET_RECORDS_FAILURE:
            return {
              ...state,
              fetchingRecords: false,
              fetchingRecordsError: true,
            };

    


    default:
      return state;
  }
};
