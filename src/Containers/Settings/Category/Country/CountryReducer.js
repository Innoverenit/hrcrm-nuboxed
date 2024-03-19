import * as types from "./CountryActionTypes";

const initialState = {


    fetchingCountry: false,
    fetchingCountryError: false,
    country: [],

    fetchingCountryCount: false,
    fetchingCountryCountError: false,
    countryCount:{},

    fetchingCountrySearchData: false,
    fetchingCountrySearchDataError: false,

    addingCountryToggle: false,
    addingCountryToggleError: false,

    addingCountrySalesToggle: false,
    addingCountrySalesToggleError: false,

    addingMandatoryCountry: false,
    addingMandatoryCountryError: false,

   
};

export const countryReducer = (state = initialState, action) => {
    switch (action.type) {
     
    case types.GET_COUNTRY_REQUEST:
        return { ...state, fetchingCountry: true };
      case types.GET_COUNTRY_SUCCESS:
        return {
          ...state,
          fetchingCountry: false,
          country: action.payload,
        };
      case types.GET_COUNTRY_FAILURE:
        return {
          ...state,
          fetchingCountry: false,
          fetchingCountryError: true,
        };
     

        case types.LINK_COUNTRY_TOGGLE_REQUEST:
            return { ...state, addingCountryToggle: true };
          case types.LINK_COUNTRY_TOGGLE_SUCCESS:
            return {
              ...state,
              addingCountryToggle: false,
              country: state.country.map((item) => {
                if (item.country_id === action.payload.country_id) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.LINK_COUNTRY_TOGGLE_FAILURE:
            return {
              ...state,
              addingCountryToggle: false,
              addingCountryToggleError: true,
            };

            case types.LINK_COUNTRY_SALES_TOGGLE_REQUEST:
              return { ...state, addingCountrySalesToggle: true };
            case types.LINK_COUNTRY_SALES_TOGGLE_SUCCESS:
              return {
                ...state,
                addingCountrySalesToggle: false,
                country: state.country.map((item) => {
                  if (item.country_id === action.payload.country_id) {
                    return action.payload;
                  } else {
                    return item;
                  }
                }),
              };
            case types.LINK_COUNTRY_SALES_TOGGLE_FAILURE:
              return {
                ...state,
                addingCountrySalesToggle: false,
                addingCountrySalesToggleError: true,
              };


            case types.ALL_COUNTRY_MANDATORY_REQUEST:
              return { ...state, addingMandatoryCountry: true };
            case types.ALL_COUNTRY_MANDATORY_SUCCESS:
              return {
                ...state,
                addingMandatoryCountry: false,
                country:action.payload
                // country: state.country.map((item) => {
                //   if (item.country_id === action.payload.country_id
                //     ) {
                //     return action.payload;
                //   } else {
                //     return item;
                //   }
                // }),
              };
            case types.ALL_COUNTRY_MANDATORY_FAILURE:
              return {
                ...state,
                addingMandatoryCountry: false,
                addingMandatoryCountryError: true,
              };

              case types.GET_COUNTRY_SEARCH_REQUEST:
                return { ...state, fetchingCountrySearchData: true };
              case types.GET_COUNTRY_SEARCH_SUCCESS:
                return {
                  ...state,
                  fetchingCountrySearchData: false,
                  country: action.payload,
                  // serachedData: action.payload,
                };
              case types.GET_COUNTRY_SEARCH_FAILURE:
                return { ...state, fetchingCountrySearchDataError: true };
      
                case types.HANDLE_CLAER_REDUCER_DATA_COUNTRY:
                  return { ...state, 
                    country: [], 
                    // deletedTruck: [] 
                  };


                  case types.GET_COUNTRY_COUNT_REQUEST:
                    return { ...state, fetchingCountryCount: true };
                  case types.GET_COUNTRY_COUNT_SUCCESS:
                    return { ...state, fetchingCountryCount: false, 
                      countryCount: action.payload };
                  case types.GET_COUNTRY_COUNT_FAILURE:
                    return {
                      ...state,
                      fetchingCountryCount: false,
                      fetchingCountryCountError: true,
                    };

     
    default:
        return state;
    }
  };