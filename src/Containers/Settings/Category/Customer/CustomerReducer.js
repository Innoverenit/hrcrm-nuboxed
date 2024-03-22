import * as types from "./CustomerActionTypes";
import dayjs from "dayjs";

const initialState = {

     fetchingCustomer: false,
     fetchingCustomerError: false,
    customerListData: [],

    fetchingCustomerCount: false,
    fetchingCustomerCountError: false,
    customerCount:{},

     addingCustomer: false,
     addingCustomerError: false,

     removingCustomer: false,
     removingCustomerError: false,

      updatingCustomer: false,
      updatingCustomerError: false,

     fetchingCustomerearchData:false,
     fetchingCustomerearchDataError:false,
   
};

export const catgCustomerReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_CUSTOMER_REQUEST:
    return { ...state,  fetchingCustomer: true };
  case types.GET_CUSTOMER_SUCCESS:
    return {
      ...state,
       fetchingCustomer: false,
       customerListData: action.payload,
    };
  case types.GET_CUSTOMER_FAILURE:
    return {
      ...state,
       fetchingCustomer: false,
       fetchingCustomerError: true,
    };

 // add sector

 case types.ADD_CUSTOMER_REQUEST:
    return { ...state,  addingCustomer: true };
  case types.ADD_CUSTOMER_SUCCESS:
    return {
      ...state,
       addingCustomer: false,
       customerListData:[action.payload,...state.customerListData],
      //  customerListData: [...state.customerListData, action.payload],
      
    };
  case types.ADD_CUSTOMER_FAILURE:
    return {
      ...state,
       addingCustomer: false,
       addingCustomerError: true,
    };

     // remove sector

     case types.REMOVE_CUSTOMER_REQUEST:
        return { ...state,  removingCustomer: true };
      case types.REMOVE_CUSTOMER_SUCCESS:
        return {
          ...state,
           removingCustomer: false,
           customerListData: state.customerListData.filter(
            (item) => item.customerTypeId !== action.payload
        ), 
        };
      case types.REMOVE_CUSTOMER_FAILURE:
        return {
          ...state,
           removingCustomer: false,
           removingCustomerError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_CUSTOMER_REQUEST:
        return { ...state,   updatingCustomer: true };
      case types.UPDATE_CUSTOMER_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
            updatingCustomer: false,
            customerListData: state.customerListData.map((sector) =>
            sector.customerTypeId === action.payload.customerTypeId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_CUSTOMER_FAILURE:
        return {
          ...state,
            updatingCustomer: false,
            updatingCustomerError: true,
        };

        case types.GET_CUSTOMER_SEARCH_REQUEST:
          return { ...state,  fetchingCustomerearchData: true };
        case types.GET_CUSTOMER_SEARCH_SUCCESS:
          return {
            ...state,
             fetchingCustomerearchData: false,
             customerListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_CUSTOMER_SEARCH_FAILURE:
          return { ...state,  fetchingCustomerearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_CUSTOMER:
            return { ...state, 
              customerListData: [], 
              // deletedTruck: [] 
            };    


            case types.GET_CUSTOMER_COUNT_REQUEST:
              return { ...state, fetchingCustomerCount: true };
            case types.GET_CUSTOMER_COUNT_SUCCESS:
              return { ...state, fetchingCustomerCount: false, 
                customerCount: action.payload };
            case types.GET_CUSTOMER_COUNT_FAILURE:
              return {
                ...state,
                fetchingCustomerCount: false,
                fetchingCustomerCountError: true,
              };
    
    default:
        return state;
    }
  };