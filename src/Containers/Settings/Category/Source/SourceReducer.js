import * as types from "./SourceActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingSources: false,
    fetchingSourcesError: false,
    sources: [],

    fetchingSourceCount: false,
    fetchingSourceCountError: false,
    sourceCount:{},

    addingSources: false,
    addingSourcesError: false,

    removingSources: false,
    removingSourcesError: false,

    updatingSources: false,
    updatingSourcesError: false,


   
};

export const sourceReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_SOURCE_REQUEST:
    return { ...state, fetchingSources: true };
  case types.GET_SOURCE_SUCCESS:
    return {
      ...state,
      fetchingSources: false,
      sources: action.payload,
    };
  case types.GET_SOURCE_FAILURE:
    return {
      ...state,
      fetchingSources: false,
      fetchingSourcesError: true,
    };

 // add sector

 case types.ADD_SOURCE_REQUEST:
    return { ...state, addingSources: true };
  case types.ADD_SOURCE_SUCCESS:
    return {
      ...state,
      addingSources: false,
      sources:[action.payload,...state.sources]
      // sources: [...state.sources, action.payload],
      
    };
  case types.ADD_SOURCE_FAILURE:
    return {
      ...state,
      addingSources: false,
      addingSourcesError: true,
    };

     // remove sector

     case types.REMOVE_SOURCE_REQUEST:
        return { ...state, removingSources: true };
      case types.REMOVE_SOURCE_SUCCESS:
        return {
          ...state,
          removingSources: false,
          sources: state.sources.filter(
            (item) => item.sourceId !== action.payload
        ), 
        };
      case types.REMOVE_SOURCE_FAILURE:
        return {
          ...state,
          removingSources: false,
          removingSourcesError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_SOURCE_REQUEST:
        return { ...state, updatingSources: true };
      case types.UPDATE_SOURCE_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingSources: false,
          sources: state.sources.map((sector) =>
            sector.sourceId === action.payload.sourceId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_SOURCE_FAILURE:
        return {
          ...state,
          updatingSources: false,
          updatingSourcesError: true,
        };

        case types.GET_SOURCE_NAME_REQUEST:
          return { ...state, fetchingSourceInputSearchData: true };
        case types.GET_SOURCE_NAME_SUCCESS:
          return {
            ...state,
            fetchingSourceInputSearchData: false,
            sources: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_SOURCE_NAME_FAILURE:
          return { ...state, fetchingRoleTalentInputSearchDataError: true };

          case types.HANDLE_CLAER_REDUCER_DATA_SOURCE:
            return { ...state, 
              sources: [], 
              // deletedTruck: [] 
            }; 
            
            
            case types.GET_SOURCE_COUNT_REQUEST:
              return { ...state, fetchingSourceCount: true };
            case types.GET_SOURCE_COUNT_SUCCESS:
              return { ...state, fetchingSourceCount: false, 
                sourceCount: action.payload };
            case types.GET_SOURCE_COUNT_FAILURE:
              return {
                ...state,
                fetchingSourceCount: false,
                fetchingSourceCountError: true,
              };

    
    default:
        return state;
    }
  };