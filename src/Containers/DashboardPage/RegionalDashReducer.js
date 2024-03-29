import * as types from "./RegionalDashActionTypes";
import dayjs from "dayjs";

const initialState = {
  viewType: "card",

  addSalesModal:false,

  addInvestmentModal:false,

  addFullFillmentModal:false,

//   fetchingCo2: false,
//   fetchingCo2Error: false,
//   co2List:[],
dateRangeList: [
    // {
    //   id: 1,
    //   type: "today",
    //   value: "Today",
    //   starter: false,
    //   isSelected: true,
    //   startDate: dayjs()
    //     // .subtract(1, "days")
    //     .toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 2,
    //   type: "week",
    //   value: "1W",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs().startOf("week").toISOString(),
    //   endDate: dayjs().endOf("week").toISOString(),
    // },
    {
      id: 1,
      type: "month",
      value: "MTD",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").toISOString(),
      endDate: dayjs().endOf("month").toISOString(),
    },
    {
      id: 2,
      type: "quarter",
      value: "QTD",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("quarter").toISOString(),
      endDate: dayjs().endOf("quarter").toISOString(),
    },
    {
      id: 3,
      type: "year",
      value: "YTD",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("year").toISOString(),
      endDate: dayjs().endOf("year").toISOString(),
    },


  ],

  timeRangeType: "month",


};
export const regionalDashReducer = (state = initialState, action) => {
    switch (action.type) {


case types.SET_REGIONAL_DASH_VIEW_TYPE:
return { ...state, viewType: action.payload };


case types.CHANGE_SELECTED_REGIONAL_TIME_INTERVAL_REPORT:
    return {
      ...state,
      dateRangeList: newDateRange(state.dateRangeList, action.payload),
      isCustomSelected: false,
      startDate: action.payload.startDate,
      endDate: action.payload.endDate,
      timeRangeType: action.payload.type,
    };


    case types.HANDLE_SALES_MODAL:
      return { ...state, addSalesModal: action.payload };

      case types.HANDLE_FULLFILLMENT_MODAL:
        return { ...state, addFullFillmentModal: action.payload };


      case types.HANDLE_INVESTMENT_MODAL:
        return { ...state, addInvestmentModal: action.payload };

// case types.GET_CO2_TABLE_VIEW_REQUEST:
//       return { ...state, fetchingCo2: true };
//     case types.GET_CO2_TABLE_VIEW_SUCCESS:
//       return {
//         ...state,
//         fetchingCo2: false,
//         co2List: action.payload,
//         // customerList: [
//         //   ...state.customerList,
//         //   ...action.payload],
//       };
//     case types.GET_CO2_TABLE_VIEW_FAILURE:
//       return {
//         ...state,
//         fetchingCo2: false,
//         fetchingCo2Error: true,
//       };


default:
return state;
}
};

const newDateRange = (dateRange, newDate) =>
  dateRange.map((range) => {
    console.log(newDate);
    if (range.id === newDate.id) {
      return { ...range, isSelected: true };
    } else {
      return { ...range, isSelected: false };
    }
  });

