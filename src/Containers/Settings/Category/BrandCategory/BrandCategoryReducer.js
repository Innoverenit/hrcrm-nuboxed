import * as types from "./BrandCategoryActionType";
import dayjs from "dayjs";

const initialState = {

    fetchingBrandCategory: false,
    fetchingBrandCategoryError: false,
    BrandCategoryData: [],

    fetchingBrandCategoryCount: false,
    fetchingBrandCategoryCountError: false,
    brandCategoryCount:{},

    addingBrandCategory: false,
    addingBrandCategoryError: false,

     removingBrandCategory: false,
     removingBrandCategoryError: false,

     updatingBrandCategory: false,
     updatingBrandCategoryError: false,

    fetchingBrandCategorySearchData:false,
    fetchingBrandCategorySearchDataError:false,
   
};

export const brandCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_BRAND_CATEGORY_REQUEST:
    return { ...state, fetchingBrandCategory: true };
  case types.GET_BRAND_CATEGORY_SUCCESS:
    return {
      ...state,
      fetchingBrandCategory: false,
      BrandCategoryData: action.payload,
    };
  case types.GET_BRAND_CATEGORY_FAILURE:
    return {
      ...state,
      fetchingBrandCategory: false,
      fetchingBrandCategoryError: true,
    };

 // add sector

 case types.ADD_BRAND_CATEGORY_REQUEST:
    return { ...state, addingBrandCategory: true };
  case types.ADD_BRAND_CATEGORY_SUCCESS:
    return {
      ...state,
      addingBrandCategory: false,
      BrandCategoryData:[action.payload,...state.BrandCategoryData]
      // BrandCategoryData: [...state.BrandCategoryData, action.payload],
      
    };
  case types.ADD_BRAND_CATEGORY_FAILURE:
    return {
      ...state,
      addingBrandCategory: false,
      addingBrandCategoryError: true,
    };

     // remove sector

     case types.REMOVE_BRAND_CATEGORY_REQUEST:
        return { ...state,  removingBrandCategory: true };
      case types.REMOVE_BRAND_CATEGORY_SUCCESS:
        return {
          ...state,
           removingBrandCategory: false,
           BrandCategoryData: state.BrandCategoryData.filter(
            (item) => item.shipById !== action.payload
        ), 
        };
      case types.REMOVE_BRAND_CATEGORY_FAILURE:
        return {
          ...state,
           removingBrandCategory: false,
           removingBrandCategoryError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_BRAND_CATEGORY_REQUEST:
        return { ...state,  updatingBrandCategory: true };
      case types.UPDATE_BRAND_CATEGORY_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
           updatingBrandCategory: false,
           BrandCategoryData: state.BrandCategoryData.map((sector) =>
            sector.shipById === action.payload.shipById
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_BRAND_CATEGORY_FAILURE:
        return {
          ...state,
           updatingBrandCategory: false,
           updatingBrandCategoryError: true,
        };

        case types.GET_BRAND_CATEGORY_SEARCH_REQUEST:
          return { ...state, fetchingBrandCategorySearchData: true };
        case types.GET_BRAND_CATEGORY_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingBrandCategorySearchData: false,
            BrandCategoryData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_BRAND_CATEGORY_SEARCH_FAILURE:
          return { ...state, fetchingBrandCategorySearchDataError: true };

          case types.HANDLE_CLAER_REDUCER_DATA_BRAND_CATEGORY:
            return { ...state, 
              BrandCategoryData: [], 
              // deletedTruck: [] 
            };  


            case types.GET_BRAND_CATEGORY_COUNT_REQUEST:
              return { ...state, fetchingBrandCategoryCount: true };
            case types.GET_BRAND_CATEGORY_COUNT_SUCCESS:
              return { ...state, fetchingBrandCategoryCount: false, 
                brandCategoryCount: action.payload };
            case types.GET_BRAND_CATEGORY_COUNT_FAILURE:
              return {
                ...state,
                fetchingBrandCategoryCount: false,
                fetchingBrandCategoryCountError: true,
              };
    
    default:
        return state;
    }
  };