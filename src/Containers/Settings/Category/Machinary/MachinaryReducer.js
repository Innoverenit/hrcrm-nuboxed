import * as types from "./MachinaryActionType";

const initialState = {

    fetchingMachinary: false,
    fetchingMachinaryError: false,
    machinaryListData: [],

    fetchingMachinaryCount: false,
    fetchingMachinaryCountError: false,
    machinaryCount:{},

     addingMachinary: false,
     addingMachinaryError: false,

     removingMachinary: false,
     removingMachinaryError: false,

      updatingMachinary: false,
      updatingMachinaryError: false,

     fetchingMachinarySearchData:false,
     fetchingMachinarySearchDataError:false,
   
};

export const machinaryReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_MACHINARY_REQUEST:
    return { ...state,  fetchingMachinary: true };
  case types.GET_MACHINARY_SUCCESS:
    return {
      ...state,
      fetchingMachinary: false,
      machinaryListData: action.payload,
    };
  case types.GET_MACHINARY_FAILURE:
    return {
      ...state,
      fetchingMachinary: false,
      fetchingMachinaryError: true,
    };

 // add sector

 case types.ADD_MACHINARY_REQUEST:
    return { ...state,  addingMachinary: true };
  case types.ADD_MACHINARY_SUCCESS:
    return {
      ...state,
      addingMachinary: false,
      machinaryListData:[action.payload,...state.machinaryListData],
      
      // machinaryListData: [...state.machinaryListData, action.payload],
      
    };
  case types.ADD_MACHINARY_FAILURE:
    return {
      ...state,
      addingMachinary: false,
      addingMachinaryError: true,
    };

     // remove sector

     case types.REMOVE_MACHINARY_REQUEST:
        return { ...state,  removingMachinary: true };
      case types.REMOVE_MACHINARY_SUCCESS:
        return {
          ...state,
          removingMachinary: false,
          machinaryListData: state.machinaryListData.filter(
            (item) => item.machinaryId !== action.payload
        ), 
        };
      case types.REMOVE_MACHINARY_FAILURE:
        return {
          ...state,
          removingMachinary: false,
          removingMachinaryError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_MACHINARY_REQUEST:
        return { ...state,   updatingMachinary: true };
      case types.UPDATE_MACHINARY_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingMachinary: false,
          machinaryListData: state.machinaryListData.map((sector) =>
            sector.machinaryId === action.payload.machinaryId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_MACHINARY_FAILURE:
        return {
          ...state,
          updatingMachinary: false,
          updatingMachinaryError: true,
        };

        case types.GET_MACHINARY_SEARCH_REQUEST:
          return { ...state,  fetchingMachinarySearchData: true };
        case types.GET_MACHINARY_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingMachinarySearchData: false,
            machinaryListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_MACHINARY_SEARCH_FAILURE:
          return { ...state,  fetchingMachinarySearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_MACHINARY:
            return { ...state, 
                machinaryListData: [], 
              // deletedTruck: [] 
            }; 
            
            
            case types.GET_MACHINARY_COUNT_REQUEST:
              return { ...state, fetchingMachinaryCount: true };
            case types.GET_MACHINARY_COUNT_SUCCESS:
              return { ...state, fetchingMachinaryCount: false, 
                machinaryCount: action.payload };
            case types.GET_MACHINARY_COUNT_FAILURE:
              return {
                ...state,
                fetchingMachinaryCount: false,
                fetchingMachinaryCountError: true,
              };
    
    default:
        return state;
    }
  };