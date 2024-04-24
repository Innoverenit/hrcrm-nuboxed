import * as types from "./IndustryActionTypes";

const initialState = {

    fetchingIndustry: false,
    fetchingIndustryError: false,
    industryListData: [],

    fetchingIndustryCount: false,
    fetchingIndustryCountError: false,
    industryCount:{},

     addingIndustry: false,
     addingIndustryError: false,

     removingIndustry: false,
     removingIndustryError: false,

      updatingIndustry: false,
      updatingIndustryError: false,

     fetchingIndustrySearchData:false,
     fetchingIndustrySearchDataError:false,
   
};

export const industryReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_INDUSTRY_REQUEST:
    return { ...state,  fetchingIndustry: true };
  case types.GET_INDUSTRY_SUCCESS:
    return {
      ...state,
      fetchingIndustry: false,
      industryListData: action.payload,
    };
  case types.GET_INDUSTRY_FAILURE:
    return {
      ...state,
      fetchingIndustry: false,
      fetchingIndustryError: true,
    };

 // add sector

 case types.ADD_INDUSTRY_REQUEST:
    return { ...state,  addingIndustry: true };
  case types.ADD_INDUSTRY_SUCCESS:
    return {
      ...state,
      addingIndustry: false,
      industryListData:[action.payload,...state.industryListData],
      
      // equipmentListData: [...state.equipmentListData, action.payload],
      
    };
  case types.ADD_INDUSTRY_FAILURE:
    return {
      ...state,
      addingIndustry: false,
      addingIndustryError: true,
    };

     // remove sector

     case types.REMOVE_INDUSTRY_REQUEST:
        return { ...state,  removingIndustry: true };
      case types.REMOVE_INDUSTRY_SUCCESS:
        return {
          ...state,
          removingIndustry: false,
          industryListData: state.industryListData.filter(
            (item) => item.industryId !== action.payload
        ), 
        };
      case types.REMOVE_INDUSTRY_FAILURE:
        return {
          ...state,
          removingIndustry: false,
          removingIndustryError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_INDUSTRY_REQUEST:
        return { ...state,   updatingIndustry: true };
      case types.UPDATE_INDUSTRY_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingIndustry: false,
          industryListData: state.industryListData.map((sector) =>
            sector.industryId === action.payload.industryId
              ? action.payload
              : sector
          ),
        }
      case types.UPDATE_INDUSTRY_FAILURE:
        return {
          ...state,
          updatingIndustry: false,
          updatingIndustryError: true,
        };

        case types.GET_INDUSTRY_SEARCH_REQUEST:
          return { ...state,  fetchingIndustrySearchData: true };
        case types.GET_INDUSTRY_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingIndustrySearchData: false,
            industryListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_INDUSTRY_SEARCH_FAILURE:
          return { ...state,  fetchingIndustrySearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_INDUSTRY:
            return { ...state, 
                industryListData: [], 
              // deletedTruck: [] 
            }; 
            
            
            case types.GET_INDUSTRY_COUNT_REQUEST:
              return { ...state, fetchingIndustryCount: true };
            case types.GET_INDUSTRY_COUNT_SUCCESS:
              return { ...state, fetchingIndustryCount: false, 
                industryCount: action.payload };
            case types.GET_INDUSTRY_COUNT_FAILURE:
              return {
                ...state,
                fetchingIndustryCount: false,
                fetchingIndustryCountError: true,
              };
    
    default:
        return state;
    }
  };