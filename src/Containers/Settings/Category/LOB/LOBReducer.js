import * as types from "./LOBActionType";

const initialState = {

    fetchingLob: false,
    fetchingLobError: false,
    lobListData: [],


    fetchingLobCount: false,
    fetchingLobCountError: false,
    lobCount:{},

     addingLob: false,
     addingLobError: false,

     removingLob: false,
     removingLobError: false,

      updatingLob: false,
      updatingLobError: false,

     fetchingLobSearchData:false,
     fetchingLobSearchDataError:false,
   
};

export const lobReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_LOB_REQUEST:
    return { ...state,  fetchingLob: true };
  case types.GET_LOB_SUCCESS:
    return {
      ...state,
      fetchingLob: false,
       lobListData: action.payload,
    };
  case types.GET_LOB_FAILURE:
    return {
      ...state,
      fetchingLob: false,
      fetchingLobError: true,
    };

 // add sector

 case types.ADD_LOB_REQUEST:
    return { ...state,  addingLob: true };
  case types.ADD_LOB_SUCCESS:
    return {
      ...state,
      addingLob: false,
      lobListData:[action.payload,...state.lobListData],
      // paymentsListData: [...state.paymentsListData, action.payload],
      
    };
  case types.ADD_LOB_FAILURE:
    return {
      ...state,
      addingLob: false,
      addingLobError: true,
    };

     // remove sector

     case types.REMOVE_LOB_REQUEST:
        return { ...state,  removingLob: true };
      case types.REMOVE_LOB_SUCCESS:
        return {
          ...state,
          removingLob: false,
          lobListData: state.lobListData.filter(
            (item) => item.lobId !== action.payload
        ), 
        };
      case types.REMOVE_LOB_FAILURE:
        return {
          ...state,
          removingLob: false,
          removingLobError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_LOB_REQUEST:
        return { ...state,   updatingLob: true };
      case types.UPDATE_LOB_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingLob: false,
          lobListData: state.lobListData.map((sector) =>
            sector.lobId === action.payload.lobId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_LOB_FAILURE:
        return {
          ...state,
          updatingLob: false,
          updatingLobError: true,
        };

        case types.GET_LOB_SEARCH_REQUEST:
          return { ...state,  fetchingLobSearchData: true };
        case types.GET_LOB_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingLobSearchData: false,
            lobListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_LOB_SEARCH_FAILURE:
          return { ...state,  fetchingLobSearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_LOB:
            return { ...state, 
                lobListData: [], 
              // deletedTruck: [] 
            };   
            
            
            case types.GET_LOB_COUNT_REQUEST:
              return { ...state, fetchingLobCount: true };
            case types.GET_LOB_COUNT_SUCCESS:
              return { ...state, fetchingLobCount: false, 
                lobCount: action.payload };
            case types.GET_LOB_COUNT_FAILURE:
              return {
                ...state,
                fetchingLobCount: false,
                fetchingLobCountError: true,
              };
    
    default:
        return state;
    }
  };