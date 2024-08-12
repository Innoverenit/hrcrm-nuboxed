import * as types from "./BillingActionTypes";
import dayjs from "dayjs";
const initialState = {
  viewType: "table",

  departmentType: "Management",

  fetchingBillingTable: false,
  fetchingBillingTableError: false,
  billingData: [],

  fetchingDesignationWiseBilling: false,
  fetchingDesignationWiseBillingError: false,
  billingByDesignation: [],

  isCustomSelected: false,
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),

  type: "All",
  dateRangeList: [
    // {
    //   id: 8,
    //   type: "All",
    //   value: "All",
    //   starter: true,
    //   isSelected: true,
    //   startDate: dayjs().toISOString(),
    //   endDate: dayjs().toISOString(),
    // },

    {
      id: 1,
      type: "Today",
      value: "Today",
      starter: true,
      isSelected: false,
      startDate: dayjs().toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 2,
      type: "Yesterday",
      value: "Yesterday",
      starter: false,
      isSelected: false,
      startDate: dayjs()
        .subtract(1, "days")
        .toISOString(),
      endDate: dayjs().subtract(1, "days").toISOString(),
    },
    // {
    //   id: 3,
    //   type: "Last7days",
    //   value: "Last 7 days",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs()
    //     .subtract(7, "days")
    //     .toISOString(),
    //   endDate: dayjs()
    //     .toISOString(),
    // },

    // {
    //   id: 4,
    //   type: "Last30days",
    //   value: "Last 30 days",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs()
    //     .subtract(30, "days")
    //     .toISOString(),
    //   endDate: dayjs()
    //     .toISOString(),
    // },
    {
      id: 5,
      type: "MTD",
      value: "MTD",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 6,
      type: "Lastmonth",
      value: "Last month",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").subtract(1, "month").toISOString(),
      endDate: dayjs().endOf('month').subtract(1, "month").toISOString(),
    }
  ],


};
export const billingReducer = (state = initialState, action) => {
  switch (action.type) {


    case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
      return {
        ...state,
        dateRangeList: newDateRange(state.dateRangeList, action.payload),
        isCustomSelected: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        type: action.payload.type
      };



    case types.GET_BILLING_TABLE_REQUEST:
      return { ...state, fetchingBillingTable: true };
    case types.GET_BILLING_TABLE_SUCCESS:
      return {
        ...state,
        fetchingBillingTable: false,
        billingData: action.payload,
        //   tableRequirement: [
        //     ...state.tableRequirement,
        //     ...action.payload],
      };
    case types.GET_BILLING_TABLE_FAILURE:
      return {
        ...state,
        fetchingBillingTable: false,
        fetchingBillingTableError: true,
      };



    case types.SET_BILLING_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };

    case types.SET_BILLING_BY_DESIGNATION:
      return {
        ...state,
        departmentType: action.payload,
      };

    case types.GET_DESIGNATION_WISE_BILLING_REQUEST:
      return { ...state, fetchingDesignationWiseBilling: true };
    case types.GET_DESIGNATION_WISE_BILLING_SUCCESS:
      return {
        ...state,
        fetchingDesignationWiseBilling: false,
        billingByDesignation: action.payload,
      };
    case types.GET_DESIGNATION_WISE_BILLING_FAILURE:
      return {
        ...state,
        fetchingDesignationWiseBilling: false,
        fetchingDesignationWiseBillingError: true,
      };

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
