import * as types from "./QualityActionTypes";

const initialState = {

    fetchingItemTask: false,
    fetchingItemTaskError: false,
    itemTaskListData: [],

    fetchingItemTaskCount: false,
    fetchingItemTaskCountError: false,
    itemTaskCount:{},

     addingItemTask: false,
     addingItemTaskError: false,

     removingItemTask: false,
     removingItemTaskError: false,

      updatingItemTask: false,
      updatingItemTaskError: false,

     fetchingItemTaskSearchData:false,
     fetchingItemTaskSearchDataError:false,
   
};

export const qualityReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_ITEM_TASK_REQUEST:
    return { ...state,  fetchingItemTask: true };
  case types.GET_ITEM_TASK_SUCCESS:
    return {
      ...state,
      fetchingItemTask: false,
       itemTaskListData: action.payload,
    };
  case types.GET_ITEM_TASK_FAILURE:
    return {
      ...state,
      fetchingItemTask: false,
      fetchingItemTaskError: true,
    };

 // add sector

 case types.ADD_ITEM_TASK_REQUEST:
    return { ...state,  addingItemTask: true };
  case types.ADD_ITEM_TASK_SUCCESS:
    return {
      ...state,
      addingItemTask: false,
      itemTaskListData:[action.payload,...state.itemTaskListData],
      // itemTaskCount:[action.payload,...state.itemTaskCount],
      
      // itemTaskListData: [...state.itemTaskListData, action.payload],
      
    };
  case types.ADD_ITEM_TASK_FAILURE:
    return {
      ...state,
      addingItemTask: false,
      addingItemTaskError: true,
    };

     // remove sector

     case types.REMOVE_ITEM_TASK_REQUEST:
        return { ...state,  removingItemTask: true };
      case types.REMOVE_ITEM_TASK_SUCCESS:
        return {
          ...state,
          removingItemTask: false,
          itemTaskListData: state.itemTaskListData.filter(
            (item) => item.itemTaskId !== action.payload
        ), 
        };
      case types.REMOVE_ITEM_TASK_FAILURE:
        return {
          ...state,
          removingItemTask: false,
          removingItemTaskError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_ITEM_TASK_REQUEST:
        return { ...state,   updatingItemTask: true };
      case types.UPDATE_ITEM_TASK_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingItemTask: false,
          itemTaskListData: state.itemTaskListData.map((sector) =>
            sector.itemTaskId === action.payload.itemTaskId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_ITEM_TASK_FAILURE:
        return {
          ...state,
          updatingItemTask: false,
          updatingItemTaskError: true,
        };

        case types.GET_ITEM_TASK_SEARCH_REQUEST:
          return { ...state,  fetchingItemTaskSearchData: true };
        case types.GET_ITEM_TASK_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingItemTaskSearchData: false,
            itemTaskListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_ITEM_TASK_SEARCH_FAILURE:
          return { ...state,  fetchingItemTaskSearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_ITEM_TASK:
            return { ...state, 
                itemTaskListData: [], 
              // deletedTruck: [] 
            }; 
            
            
            case types.GET_ITEM_TASK_COUNT_REQUEST:
              return { ...state, fetchingItemTaskCount: true };
            case types.GET_ITEM_TASK_COUNT_SUCCESS:
              return { ...state, fetchingItemTaskCount: false, 
                itemTaskCount: action.payload };
            case types.GET_ITEM_TASK_COUNT_FAILURE:
              return {
                ...state,
                fetchingItemTaskCount: false,
                fetchingItemTaskCountError: true,
              };
    
    default:
        return state;
    }
  };