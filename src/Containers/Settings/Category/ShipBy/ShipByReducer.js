import * as types from "./ShipByActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingShipBy: false,
    fetchingShipByError: false,
    ShipByData: [],

    fetchingShipByCount: false,
    fetchingShipByCountError: false,
    shipByCount:{},

    addingShipBy: false,
    addingShipByError: false,

     removingShipBy: false,
     removingShipByError: false,

     updatingShipBy: false,
     updatingShipByError: false,

    fetchingShipBySearchData:false,
    fetchingShipBySearchDataError:false,
   
};

export const shipByReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_SHIPBY_REQUEST:
    return { ...state, fetchingShipBy: true };
  case types.GET_SHIPBY_SUCCESS:
    return {
      ...state,
      fetchingShipBy: false,
      ShipByData: action.payload,
    };
  case types.GET_SHIPBY_FAILURE:
    return {
      ...state,
      fetchingShipBy: false,
      fetchingShipByError: true,
    };

 // add sector

 case types.ADD_SHIPBY_REQUEST:
    return { ...state, addingShipBy: true };
  case types.ADD_SHIPBY_SUCCESS:
    return {
      ...state,
      addingShipBy: false,
      ShipByData:[action.payload,...state.ShipByData]
      // ShipByData: [...state.ShipByData, action.payload],
      
    };
  case types.ADD_SHIPBY_FAILURE:
    return {
      ...state,
      addingShipBy: false,
      addingShipByError: true,
    };

     // remove sector

     case types.REMOVE_SHIPBY_REQUEST:
        return { ...state,  removingShipBy: true };
      case types.REMOVE_SHIPBY_SUCCESS:
        return {
          ...state,
           removingShipBy: false,
           ShipByData: state.ShipByData.filter(
            (item) => item.shipById !== action.payload
        ), 
        };
      case types.REMOVE_SHIPBY_FAILURE:
        return {
          ...state,
           removingShipBy: false,
           removingShipByError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_SHIPBY_REQUEST:
        return { ...state,  updatingShipBy: true };
      case types.UPDATE_SHIPBY_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
           updatingShipBy: false,
           ShipByData: state.ShipByData.map((sector) =>
            sector.shipById === action.payload.shipById
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_SHIPBY_FAILURE:
        return {
          ...state,
           updatingShipBy: false,
           updatingShipByError: true,
        };

        case types.GET_SHIPBY_SEARCH_REQUEST:
          return { ...state, fetchingShipBySearchData: true };
        case types.GET_SHIPBY_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingShipBySearchData: false,
            ShipByData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_SHIPBY_SEARCH_FAILURE:
          return { ...state, fetchingShipBySearchDataError: true };

          case types.HANDLE_CLAER_REDUCER_DATA_SHIPBY:
            return { ...state, 
              ShipByData: [], 
              // deletedTruck: [] 
            };  


            case types.GET_SHIPBY_COUNT_REQUEST:
              return { ...state, fetchingShipByCount: true };
            case types.GET_SHIPBY_COUNT_SUCCESS:
              return { ...state, fetchingShipByCount: false, 
                shipByCount: action.payload };
            case types.GET_SHIPBY_COUNT_FAILURE:
              return {
                ...state,
                fetchingShipByCount: false,
                fetchingShipByCountError: true,
              };
    
    default:
        return state;
    }
  };