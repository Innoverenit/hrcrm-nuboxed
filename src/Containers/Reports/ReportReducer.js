import * as types from "./ReportActionType";
import dayjs from "dayjs";

const initialState = {
    fetchingOrganisationReport: false,
    fetchingOrganisationReportError: false,
    organisationReportData: [],



    fetchingReportsAttendence:false,
    fetchingReportsAttendenceError:false,
    reportsAttendence:[],

    fetchingAllReportInvestors: false,
     fetchingAllReportInvestorsError: false,
     allReportInvestors:[],



     fetchingReportsProductivity:false,
     fetchingReportsProductivityError:false,
     reportsProductivity:[],

     fetchingTaskdata:false,
     fetchingTaskdataError:false,
     taskData:[],

    fetchingMyViewReport: false,
    fetchingMyViewReportError: false,
    myViewReportData: [],

    fetchingSalesReports: false,
    fetchingSalesReportsError: false,
    reportsSales: [],

    gettingReportTask:false,
    gettingReportTaskError:false,
    reportTask:[],

    gettingReportProspect:false,
    gettingReportProspectError:false,
    reportProspect:[],

    addReportsProductivityModal:false,

    reportViewType: "ME",
    dateRangeList: [
        {
            id: 1,
            type: "Today",
            value: "Today",
            starter: false,
            isSelected: false,
            startDate: dayjs()
                // .subtract(1, "days")
                .toISOString(),
            endDate: dayjs().toISOString(),
        },
        {
            id: 2,
            type: "Lastmonth",
            value: "MTD",
            starter: false,
            isSelected: false,
            startDate: dayjs().startOf("month").toISOString(),
            endDate: dayjs().toISOString(),
        },
        {
            id: 3,
            type: "Thismonth",
            value: "QTD",
            starter: false,
            isSelected: false,
            startDate: dayjs().startOf("week").toISOString(),
            endDate: dayjs().toISOString(),
        },
    
        {
            id: 4,
            type: "Yesterday",
            value: "YTD",
            starter: false,
            isSelected: false,
            startDate: dayjs()
                .subtract(1, "days")

                .toISOString(),
            endDate: dayjs().toISOString(),
        },
     
        // {
        //     id: 3,
        //     type: "Last7days",
        //     value: "1W",
        //     starter: false,
        //     isSelected: false,
        //     startDate: dayjs()
        //         .subtract(7, "days")

        //         .toISOString(),
        //     endDate: dayjs().toISOString(),
        // },

      
     
        // {
        //     id: 6,
        //     type: "Lastmonth",
        //     value: "MTD",
        //     starter: false,
        //     isSelected: false,
        //     startDate: dayjs().startOf("month").toISOString(),
        //     endDate: dayjs().toISOString(),
        // },
    ],
    isCustomSelected: false,
    // timeRangeType: "today",
    // startDate: dayjs()
    //     .startOf("year")
    //     .toISOString(),
    // endDate: dayjs()
    //     .endOf("year")
    //     .toISOString(),

    investorTypes: ["Investor List","Investor all contacts","All Deals","Open Deals","Closed Deals","Pitch"],
    prospect: ["Prospect List","Prospect all contacts","All Opportunities","Open Opportunities","Closed Opportunities","Pitch"],
    recruitProType: ["Requirement", "Selected"],
    hr: ["Employee","Suspended Employee","All Attendedance","Expenses","Mileages","Leaves"],
    reportType: ["Requirement", "Selected"],
    reportTypes: ["Requirement", "Selected"],
    selectedReportType: "Select Report",

    selectedSubReportType: "Select",
    // reportRequirementSubTypes: ["All-Recruiters","Recruiters"],

};

export const reportReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_REPORT_VIEW_TYPE:
            return {
                ...state,
                reportViewType: action.payload,
                selectedSubReportType: "Select",
                selectedReportType: "Choose report type",
            };

        case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
            return {
                ...state,
                dateRangeList: newDateRange(state.dateRangeList, action.payload),
                isCustomSelected: false,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                timeRangeType:action.payload.type
            };
        case types.SET_TIME_INTERVAL_REPORT:
            return {
                ...state,
                isCustomSelected: true,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            };
        case types.SET_FISCAL_TIME_INTERVAL_REPORT:
            return {
                ...state,
                dateRangeList: mergeFiscalAndQuarter(
                    state.dateRangeList,
                    action.payload
                ),
                startDate: action.payload.fiscalMapper.fiscalStartDate,
                endDate: action.payload.fiscalMapper.fiscalEndDate,
            };

        //get report by organisation
        case types.GET_ORGANISATION_REPORT_REQUEST:
            return { ...state, fetchingOrganisationReport: true };
        case types.GET_ORGANISATION_REPORT_SUCCESS:
            return {
                ...state,
                fetchingOrganisationReport: false,
                organisationReport: action.payload,
            };
        case types.GET_ORGANISATION_REPORT_FAILURE:
            return {
                ...state,
                fetchingOrganisationReport: false,
                fetchingOrganisationReportError: true,
            };





            case types.GET_REPORTS_ATTENDENCE_REQUEST:
                return { ...state, fetchingReportsAttendence: true };
              // case types.GET_LOCATION_DATA_SUCCESS:
              //   return {
              //     ...state,
              //     fetchingLocationData: false,
              //     showLocation: [...state.showLocation,...action.payload]
              //   };
              case types.GET_REPORTS_ATTENDENCE_SUCCESS:
                return { ...state, fetchingReportsAttendence: false,reportsAttendence : action.payload };
              case types.GET_REPORTS_ATTENDENCE_FAILURE:
                return {
                  ...state,
                  fetchingReportsAttendence: false,
                  fetchingReportsAttendenceError: true,
                };

        //get report by myView
        case types.GET_MY_VIEW_REPORT_REQUEST:
            return { ...state, fetchingMyViewReport: true };
        case types.GET_MY_VIEW_REPORT_SUCCESS:
            return {
                ...state,
                fetchingMyViewReport: false,
                myViewReportData: action.payload,
            };
        case types.GET_MY_VIEW_REPORT_FAILURE:
            return {
                ...state,
                fetchingMyViewReport: false,
                fetchingMyViewReportError: true,
                selectedReportType: "Select Report",
            };

            case types.ADD_REPORTS_PRODUCTIVITY_MODAL:
                return { ...state, addReportsProductivityModal: action.payload };




            case types.GET_REPORT_PROSPECT_REQUEST:
      return { ...state, gettingReportProspect: true };

    case types.GET_REPORT_PROSPECT_SUCCESS:
      return {
        ...state,
        gettingReportProspect: false,
        reportProspect: action.payload,
      };

    case types.GET_REPORT_PROSPECT_FAILURE:
      return {
        ...state,
        gettingReportProspect: false,
        gettingReportProspectError: true,
      };


        case types.SET_SELECTED_REPORT_TYPE:
            return {
                ...state, selectedReportType: action.payload,
                selectedSubReportType: "Select",
            };

        case types.SET_SUB_SELECTED_REPORT_TYPE:
            return {
                ...state,
                selectedSubReportType: action.payload,
            };





            case types.GET_REPORT_TASK_REQUEST:
                return { ...state, gettingReportTask: true };
          
              case types.GET_REPORT_TASK_SUCCESS:
                return {
                  ...state,
                  gettingReportTask: false,
                  reportTask: action.payload,
                };
          
              case types.GET_REPORT_TASK_FAILURE:
                return {
                  ...state,
                  gettingReportTask: false,
                  gettingReportTaskError: true,
                };



                case types.GET_REPORTS_PRODUCTIVITY_REQUEST:
                    return { ...state, fetchingReportsProductivity: true };
                  // case types.GET_LOCATION_DATA_SUCCESS:
                  //   return {
                  //     ...state,
                  //     fetchingLocationData: false,
                  //     showLocation: [...state.showLocation,...action.payload]
                  //   };
                  case types.GET_REPORTS_PRODUCTIVITY_SUCCESS:
                    return { ...state, fetchingReportsProductivity: false, reportsProductivity: action.payload };
                  case types.GET_REPORTS_PRODUCTIVITY_FAILURE:
                    return {
                      ...state,
                      fetchingReportsProductivity: false,
                      fetchingReportsProductivityError: true,
                    };

        case types.GET_SALES_REPORTS_REQUEST:
            return { ...state, fetchingSalesReports: true };
        case types.GET_SALES_REPORTS_SUCCESS:
            return {
                ...state,
                fetchingSalesReports: false,
                reportsSales: action.payload,
            };
        case types.GET_SALES_REPORTS_FAILURE:
            return {
                ...state,
                fetchingSalesReports: false,
                fetchingSalesReportsError: true,
            };


            case types.GET_ALL_REPORT_INVESTORS_REQUEST:
                return { ...state, fetchingAllReportInvestors: true };
              case types.GET_ALL_REPORT_INVESTORS_SUCCESS:
                return { ...state, fetchingAllReportInvestors: false, allReportInvestors: action.payload };
              case types.GET_ALL_REPORT_INVESTORS_FAILURE:
                return { ...state, fetchingAllReportInvestors: false, fetchingAllReportInvestorsError: true };




                case types.GET_TASK_DATA_REQUEST:
                return { ...state, fetchingTaskdata: true };
              case types.GET_TASK_DATA_SUCCESS:
                return { ...state, fetchingTaskdata: false, 
                  taskData: action.payload };
              case types.GET_TASK_DATA_FAILURE:
                return {
                  ...state,
                  fetchingTaskdata: false,
                  fetchingTaskdataError: true,
                };
          
        default:
            return state;
    }
};

const newDateRange = (dateRange, newDate) =>
    dateRange.map((range) => {
        if (range.id === newDate.id) {
            return { ...range, isSelected: true };
        } else {
            return { ...range, isSelected: false };
        }
    });

const mergeFiscalAndQuarter = (dateRange, newDate) =>
    dateRange.map((date) => {
        console.log(newDate);
        if (date.value === "FY") {
            return {
                ...date,
                startDate: newDate.fiscalMapper.fiscalStartDate,
                endDate: newDate.fiscalMapper.fiscalEndDate,
            };
        } else {
            return date;
        }
    });