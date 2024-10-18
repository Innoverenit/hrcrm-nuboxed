import * as types from "./HolidayActionTypes";
const initialState = {
  addingHoliday: false,
  addingHolidayError: false,

  fetchingHoliday: false,
  fetchingHolidayError: false,
  holidays: [],

  fetchingHolidayYear: false,
  fetchingHolidayYearError: false,
  holidaysYear:[],

  addingapplyoffer: false,
  addingapplyofferError: false,

  updatingHoliday: false,
  updatingHolidayError: false,

  addHolidayModal: false,

  fetchingPlannerHoliday: false,
  fetchingPlannerHolidayError: false,
  plannerHolidays: [],

  // fetchingHolidayByCountryYear: false,
  // fetchingHolidayByCountryYearError: false,
  // holidaysByCountryYear:[],

  deleteHoliday: false,
  deleteHolidayError: false,
};
export const holidayReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_HOLIDAY_REQUEST:
      return { ...state, addingHoliday: true };
    case types.ADD_HOLIDAY_SUCCESS:
      return { ...state, 
        addingHoliday: false ,
        holidays:[action.payload, ...state.holidays],
      };
    case types.ADD_HOLIDAY_FAILURE:
      return {
        ...state,
        addingHoliday: false,
        addingHolidayError: true,
      };

    case types.GET_HOLIDAY_REQUEST:
      return { ...state, fetchingHoliday: true };
    case types.GET_HOLIDAY_SUCCESS:
      return { ...state, fetchingHoliday: false, holidays: action.payload };
    case types.GET_HOLIDAY_FAILURE:
      return {
        ...state,
        fetchingHoliday: false,
        fetchingHolidayError: true,
      };

      case types.GET_HOLIDAYYEAR_REQUEST:
        return { ...state, fetchingHolidayYear: true };
      case types.GET_HOLIDAYYEAR_SUCCESS:
        return { ...state, fetchingHolidayYear: false, holidaysYear: action.payload };
      case types.GET_HOLIDAYYEAR_FAILURE:
        return {
          ...state,
          fetchingHolidayYear: false,
          fetchingHolidayYearError: true,
        };
      
    case types.GET_PLANNER_HOLIDAY_REQUEST:
      return { ...state, fetchingPlannerHoliday: true };
    case types.GET_PLANNER_HOLIDAY_SUCCESS:
      return { ...state, fetchingPlannerHoliday: false, plannerHolidays: action.payload };
    case types.GET_PLANNER_HOLIDAY_FAILURE:
      return {
        ...state,
        fetchingPlannerHoliday: false,
        fetchingPlannerHolidayError: true,
      };

    case types.UPDATE_HOLIDAY_REQUEST:
      return { ...state, updatingHoliday: true };
    case types.UPDATE_HOLIDAY_SUCCESS:
      // return { ...state, updatingStages: false, states: [...state.states, action.payload] };
      return {
        ...state,
        updatingHoliday: false,
        holidays: state.holidays.map((state) =>
          state.holidayId === action.payload.holidayId ? action.payload : state
        ),
      };
    case types.UPDATE_HOLIDAY_FAILURE:
      return { ...state, updatingHoliday: false, updatingHolidayError: true };
    case types.HANDLE_HOLIDAY_MODAL:
      return { ...state, addHolidayModal: action.payload };

      case types.DELETE_HOLIDAY_REQUEST:
        return { ...state, deleteHoliday: true };
      case types.DELETE_HOLIDAY_SUCCESS:
        return {
          ...state,
          deleteHoliday: false,
          holidays: state.holidays.filter(
            (holiday) => holiday.holidayId !== action.payload
          ),
        };
      case types.DELETE_HOLIDAY_FAILURE:
        return { ...state, deleteHoliday: false, deleteHolidayError: false };


        // case types.GET_HOLIDAY_BY_COUNTRY_AND_YEAR_REQUEST:
        //   return { ...state, fetchingHolidayByCountryYear: true };
        // case types.GET_HOLIDAY_BY_COUNTRY_AND_YEAR_SUCCESS:
        //   return { ...state, fetchingHolidayByCountryYear: false, holidaysByCountryYear: action.payload };
        // case types.GET_HOLIDAY_BY_COUNTRY_AND_YEAR_FAILURE:
        //   return {
        //     ...state,
        //     fetchingHolidayByCountryYear: false,
        //     fetchingHolidayByCountryYearError: true,
        //   };

        case types.ADD_APPLY_OFFER_REQUEST:
          return { ...state, addingapplyoffer: true };
        case types.ADD_APPLY_OFFER_SUCCESS:
          return {
            ...state,
            addingapplyoffer: false,
            // clickTaskDrawerModal:false
          };
        case types.ADD_APPLY_OFFER_FAILURE:
          return {
            ...state,
            addingapplyoffer: false,
            addingapplyofferError: true,
          };


    default:
      return state;
  }
};
