import * as types from "./PaymentActionTypes";

const initialState = {

    fetchingPayment: false,
    fetchingPaymentError: false,
    paymentsListData: [],


    fetchingPaymentCount: false,
    fetchingPaymentCountError: false,
    paymentCount:{},

     addingPayment: false,
     addingPaymentError: false,

     removingPayment: false,
     removingPaymentError: false,

      updatingPayment: false,
      updatingPaymentError: false,

     fetchingPaymentSearchData:false,
     fetchingPaymentSearchDataError:false,
   
};

export const catgPaymentReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_PAYMENT_REQUEST:
    return { ...state,  fetchingPayment: true };
  case types.GET_PAYMENT_SUCCESS:
    return {
      ...state,
      fetchingPayment: false,
       paymentsListData: action.payload,
    };
  case types.GET_PAYMENT_FAILURE:
    return {
      ...state,
      fetchingPayment: false,
      fetchingPaymentError: true,
    };

 // add sector

 case types.ADD_PAYMENT_REQUEST:
    return { ...state,  addingPayment: true };
  case types.ADD_PAYMENT_SUCCESS:
    return {
      ...state,
      addingPayment: false,
      paymentsListData:[action.payload,...state.paymentsListData],
      // paymentsListData: [...state.paymentsListData, action.payload],
      
    };
  case types.ADD_PAYMENT_FAILURE:
    return {
      ...state,
      addingPayment: false,
      addingPaymentError: true,
    };

     // remove sector

     case types.REMOVE_PAYMENT_REQUEST:
        return { ...state,  removingPayment: true };
      case types.REMOVE_PAYMENT_SUCCESS:
        return {
          ...state,
          removingPayment: false,
          paymentsListData: state.paymentsListData.filter(
            (item) => item.paymentCatagoryId !== action.payload
        ), 
        };
      case types.REMOVE_PAYMENT_FAILURE:
        return {
          ...state,
          removingPayment: false,
          removingPaymentError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_PAYMENT_REQUEST:
        return { ...state,   updatingPayment: true };
      case types.UPDATE_PAYMENT_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingPayment: false,
          paymentsListData: state.paymentsListData.map((sector) =>
            sector.paymentCatagoryId === action.payload.paymentCatagoryId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_PAYMENT_FAILURE:
        return {
          ...state,
          updatingPayment: false,
          updatingPaymentError: true,
        };

        case types.GET_PAYMENT_SEARCH_REQUEST:
          return { ...state,  fetchingPaymentSearchData: true };
        case types.GET_PAYMENT_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingPaymentSearchData: false,
            paymentsListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_PAYMENT_SEARCH_FAILURE:
          return { ...state,  fetchingPaymentSearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_PAYMENT:
            return { ...state, 
                paymentsListData: [], 
              // deletedTruck: [] 
            };   
            
            
            case types.GET_PAYMENT_COUNT_REQUEST:
              return { ...state, fetchingPaymentCount: true };
            case types.GET_PAYMENT_COUNT_SUCCESS:
              return { ...state, fetchingPaymentCount: false, 
                paymentCount: action.payload };
            case types.GET_PAYMENT_COUNT_FAILURE:
              return {
                ...state,
                fetchingPaymentCount: false,
                fetchingPaymentCountError: true,
              };
    
    default:
        return state;
    }
  };