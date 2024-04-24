import * as types from "./CategoryListActionTypes";

const initialState = {

    fetchingCategory: false,
    fetchingCategoryError: false,
    categoryListData: [],

    fetchingCategoryCount: false,
    fetchingCategoryCountError: false,
    categoryCount:{},

     addingCategory: false,
     addingCategoryError: false,

     removingCategory: false,
     removingCategoryError: false,

      updatingCategory: false,
      updatingCategoryError: false,

     fetchingCategorySearchData:false,
     fetchingCategorySearchDataError:false,
   
};

export const categoryListReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_CATEGORY_REQUEST:
    return { ...state,  fetchingCategory: true };
  case types.GET_CATEGORY_SUCCESS:
    return {
      ...state,
      fetchingCategory: false,
      categoryListData: action.payload,
    };
  case types.GET_CATEGORY_FAILURE:
    return {
      ...state,
      fetchingCategory: false,
      fetchingCategoryError: true,
    };

 // add sector

 case types.ADD_CATEGORY_REQUEST:
    return { ...state,  addingCategory: true };
  case types.ADD_CATEGORY_SUCCESS:
    return {
      ...state,
      addingCategory: false,
      categoryListData:[action.payload,...state.categoryListData],
      
      // equipmentListData: [...state.equipmentListData, action.payload],
      
    };
  case types.ADD_CATEGORY_FAILURE:
    return {
      ...state,
      addingCategory: false,
      addingCategoryError: true,
    };

     // remove sector

     case types.REMOVE_CATEGORY_REQUEST:
        return { ...state,  removingCategory: true };
      case types.REMOVE_CATEGORY_SUCCESS:
        return {
          ...state,
          removingCategory: false,
          categoryListData: state.categoryListData.filter(
            (item) => item.categoryId !== action.payload
        ), 
        };
      case types.REMOVE_CATEGORY_FAILURE:
        return {
          ...state,
          removingCategory: false,
          removingCategoryError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_CATEGORY_REQUEST:
        return { ...state,   updatingCategory: true };
      case types.UPDATE_CATEGORY_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingCategory: false,
          categoryListData: state.categoryListData.map((sector) =>
            sector.categoryId === action.payload.categoryId
              ? action.payload
              : sector
          ),
        }
      case types.UPDATE_CATEGORY_FAILURE:
        return {
          ...state,
          updatingCategory: false,
          updatingCategoryError: true,
        };

        case types.GET_CATEGORY_SEARCH_REQUEST:
          return { ...state,  fetchingCategorySearchData: true };
        case types.GET_CATEGORY_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingCategorySearchData: false,
            categoryListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_CATEGORY_SEARCH_FAILURE:
          return { ...state,  fetchingCategorySearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_CATEGORY:
            return { ...state, 
                categoryListData: [], 
              // deletedTruck: [] 
            }; 
            
            
            case types.GET_CATEGORY_COUNT_REQUEST:
              return { ...state, fetchingCategoryCount: true };
            case types.GET_CATEGORY_COUNT_SUCCESS:
              return { ...state, fetchingCategoryCount: false, 
                categoryCount: action.payload };
            case types.GET_CATEGORY_COUNT_FAILURE:
              return {
                ...state,
                fetchingCategoryCount: false,
                fetchingCategoryCountError: true,
              };
    
    default:
        return state;
    }
  };