import * as types from "./QualityActionTypes";

const initialState = {

    fetchingQuality: false,
    fetchingQualityError: false,
    qualityList: [],

    fetchingQualityCount: false,
    fetchingQualityCountError: false,
    qualityCount:{},

     addingQuality: false,
     addingQualityError: false,

     removingQuality: false,
     removingQualityError: false,

      updatingQuality: false,
      updatingQualityError: false,

     fetchingQualitySearchData:false,
     fetchingQualitySearchDataError:false,
   
};

export const qualityReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_QUALITY_REQUEST:
    return { ...state,  fetchingQuality: true };
  case types.GET_QUALITY_SUCCESS:
    return {
      ...state,
      fetchingQuality: false,
       qualityList: action.payload,
    };
  case types.GET_QUALITY_FAILURE:
    return {
      ...state,
      fetchingQuality: false,
      fetchingQualityError: true,
    };

 // add sector

 case types.ADD_QUALITY_REQUEST:
    return { ...state,  addingQuality: true };
  case types.ADD_QUALITY_SUCCESS:
    return {
      ...state,
      addingQuality: false,
      qualityList:[action.payload,...state.qualityList],
      // qualityCount:[action.payload,...state.qualityCount],
      
      // qualityList: [...state.qualityList, action.payload],
      
    };
  case types.ADD_QUALITY_FAILURE:
    return {
      ...state,
      addingQuality: false,
      addingQualityError: true,
    };

     // remove sector

     case types.REMOVE_QUALITY_REQUEST:
        return { ...state,  removingQuality: true };
      case types.REMOVE_QUALITY_SUCCESS:
        return {
          ...state,
          removingQuality: false,
          qualityList: state.qualityList.filter(
            (item) => item.qualityId !== action.payload
        ), 
        };
      case types.REMOVE_QUALITY_FAILURE:
        return {
          ...state,
          removingQuality: false,
          removingQualityError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_QUALITY_REQUEST:
        return { ...state,   updatingQuality: true };
      case types.UPDATE_QUALITY_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingQuality: false,
          qualityList: state.qualityList.map((sector) =>
            sector.qualityId === action.payload.qualityId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_QUALITY_FAILURE:
        return {
          ...state,
          updatingQuality: false,
          updatingQualityError: true,
        };

        case types.GET_QUALITY_SEARCH_REQUEST:
          return { ...state,  fetchingQualitySearchData: true };
        case types.GET_QUALITY_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingQualitySearchData: false,
            qualityList: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_QUALITY_SEARCH_FAILURE:
          return { ...state,  fetchingQualitySearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_QUALITY:
            return { ...state, 
                qualityList: [], 
              // deletedTruck: [] 
            }; 
            
            
            case types.GET_QUALITY_COUNT_REQUEST:
              return { ...state, fetchingQualityCount: true };
            case types.GET_QUALITY_COUNT_SUCCESS:
              return { ...state, fetchingQualityCount: false, 
                qualityCount: action.payload };
            case types.GET_QUALITY_COUNT_FAILURE:
              return {
                ...state,
                fetchingQualityCount: false,
                fetchingQualityCountError: true,
              };
    
    default:
        return state;
    }
  };