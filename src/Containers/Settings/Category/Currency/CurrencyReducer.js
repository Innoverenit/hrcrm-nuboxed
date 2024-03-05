import * as types from "./CurrencyActionTypes";

const initialState = {


    fetchingCurrencyList: false,
    fetchingCurrencyListError: false,
    currencyList: [],
    fetchingCurrencySearchData:false,
    fetchingCurrencySearchDataError:false,

    addingCurrencyToggle: false,
              addingCurrencyToggleError: false,

  

    addingMandatoryCurrency: false,
    addingMandatoryCurrencyError: false,

   
};

export const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
     
    case types.GET_CURRENCY_LIST_REQUEST:
        return { ...state, fetchingCurrencyList: true };
      case types.GET_CURRENCY_LIST_SUCCESS:
        return {
          ...state,
          fetchingCurrencyList: false,
          currencyList: action.payload,
        };
      case types.GET_CURRENCY_LIST_FAILURE:
        return {
          ...state,
          fetchingCurrencyList: false,
          fetchingCurrencyListError: true,
        };
     

        case types.LINK_CURRENCY_TOGGLE_REQUEST:
            return { ...state, addingCurrencyToggle: true };
          case types.LINK_CURRENCY_TOGGLE_SUCCESS:
            return {
              ...state,
              addingCurrencyToggle: false,
              currencyList: state.currencyList.map((item) => {
                if (item.currency_id === action.payload.currency_id) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.LINK_CURRENCY_TOGGLE_FAILURE:
            return {
              ...state,
              addingCurrencyToggle: false,
              addingCurrencyToggleError: true,
            };

        
            case types.ALL_CURRENCY_MANDATORY_REQUEST:
              return { ...state, addingMandatoryCurrency: true };
            case types.ALL_CURRENCY_MANDATORY_SUCCESS:
              return {
                ...state,
                addingMandatoryCurrency: false,
                currencyList:action.payload
                // country: state.country.map((item) => {
                //   if (item.country_id === action.payload.country_id
                //     ) {
                //     return action.payload;
                //   } else {
                //     return item;
                //   }
                // }),
              };
            case types.ALL_CURRENCY_MANDATORY_FAILURE:
              return {
                ...state,
                addingMandatoryCurrency: false,
                addingMandatoryCurrencyError: true,
              };

              case types.GET_CURRENCY_SEARCH_REQUEST:
                return { ...state, fetchingCurrencySearchData: true };
              case types.GET_CURRENCY_SEARCH_SUCCESS:
                return {
                  ...state,
                  fetchingCurrencySearchData: false,
                  currencyList: action.payload,
                  // serachedData: action.payload,
                };
              case types.GET_CURRENCY_SEARCH_FAILURE:
                return { ...state, fetchingCurrencySearchDataError: true };
      
                case types.HANDLE_CLAER_REDUCER_DATA_CURRENCY:
                  return { ...state, 
                    currencyList: [], 
                    // deletedTruck: [] 
                  };

     
    default:
        return state;
    }
  };