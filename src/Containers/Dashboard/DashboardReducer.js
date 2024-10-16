import * as types from "./DashboardActionTypes";
import dayjs from "dayjs";


const initialState = {
  fetchingSkillsCloud: false,
  fetchingSkillsCloudError: false,
  skillsCloud: [],

  fetchingRepairDashboardOrderClose:false,
  fetchingRepairDashboardOrderCloseError:false,
  repairDashboardOrderClose:[],

  fetchingRepairDashboardOrderOpenError:false,
  fetchingRepairDashboardOrderOpenErrorError:false,
  repairDashboardOrderOpen:[],

  fetchingContactAddedList: false,
  fetchingContactAddedListError: false,
  contactAddedList:[],

  fetchingFinaceorderDetails: false,
  fetchingFinaceorderDetailsError: false,
  finaceOrderinDashboard:[],

  fetchingQuotationDashboardCount:false,
  fetchingQuotationDashboardCountError:false,

  quotationDashboardCount:{},

  fetchingEnterPriseorderDetails: false,
  fetchingEnterPriseorderDetailsError: false,
  enterpriseOrderinDashboard:[],

  fetchingOrderClosedList:false,
  fetchingOrderClosedListError:false,
  orderClosedList:[],



  fetchingOrderAddedList:false,
  fetchingOrderAddedListError:false,
  orderAddedList:[],



  orderAddedModal:false,

  customerAddedModal:false,

  contactAddedModal:false,

  fetchingRegionRecordsCount: false,
  fetchingRegionRecordsCountError: false,
  regionRecords:[],

  fetchingProspectTableData:false,
  fetchingProspectTableDataError:false,
  prospectTableData:[],

  fetchingThisMonthTaskGantt: false,
  fetchingThisMonthTaskGanttError: false,

  thisMonthTaskGant: [],

  fetchingDashboardTasks: false,
  fetchingDashboardTasksError: false,
  dashboardTasks: [],

  fetchingdashboardTable: false,
  fetchingdashboardTableError: false,
  tableDashboard: [],

  updatingCall: false,
  updatingCallError: false,

  fetchingDashBoardIndicator: false,
  fetchingDashBoardIndicatorError: false,
  dashboardIndicator: [],

  fetchingalldashBoardClosureRatio: false,
  fetchingalldashBoardClosureRatioError: false,
  dashBoardallClosureRatio: [],

  addjobDetailModal: false,

  fetchingRecruiterDashboardList: false,
  fetchingRecruiterDashboardListError: false,
  listRecruiterDashboard: [],

  fetchingOrderOpenList:false,
  fetchingOrderOpenListError:false,
  orderOpenList:[],

  fetchingTodos: false,
  fetchingTodosError: false,
  todos: [],

  fetchingTodosCount: false,
  fetchingTodosCountError: false,
  todosCount: {},

  fetchingAvgHour: false,
  fetchingAvgHourError: false,
  avgHour: {},

  fetchingdashBoardCommissionTable: false,
  fetchingdashBoardCommissionTableError: false,
  tableDashBoardCommission: [],

  fetchingActionSteps: false,
  fetchingActionStepsError: false,
  actionSteps: [],
  fetchingOrderCancelList:false,
  fetchingOrderCancelListError:false,
  orderCancelList:[],


  gettingCustomerChart:false,
  gettingCustomerChartError:false,
  customerDashboardChart:[],

  fetchingalldashboardTable2: false,
  fetchingalldashboardTable2Error: false,
  tableallDashboard2: [],

  fetchingdashboardTable2: false,
  fetchingdashboardTable2Error: false,
  tableDashboard2: [],

  fetchingDashBoardFunnel: false,
  fetchingDashBoardFunnelError: false,
  dashboardFunnel: [],

  fetchingQuotationTableData:false,
  fetchingQuotationTableDataError:false,
  quotationTableData:[],

  fetchingUpcomingEvents: false,
  fetchingUpcomingEventsError: false,
  upcomingEvents: [],

  fetchingdashBoardCustomerChart: false,
  fetchingdashBoardCustomerChartError: false,
  dashBoardCustomerChart: [],

  fetchingCandidateTotalBillableAmount: false,
  fetchingCandidateTotalBillableAmountError: false,
  candidatesBillableAmount: [],

  fetchingAllSalesDatewiseReport: false,
  fetchingAllSalesDatewiseReportError: false,
  showAllSalesDatelist: [],

  fetchingdashBoardClosureRatio: false,
  fetchingdashBoardClosureRatioError: false,
  dashBoardClosureRatio: [],

  fetchingalldashBoardCustomerChart: false,
  fetchingalldashBoardCustomerChartError: false,
  dashBoardallCustomerChart: [],

  addDrawerActionModal: false,

  fetchingActionNotifications: false,
  fetchingActionNotificationsError: false,
  actionNotifications: [],

  fetchingTaskDashboardGantt: false,
  fetchingTaskDashboardGanttError: false,
  tasksdashboardGantt: [],


  orderClosedModal:false,

  fetchingCustomerAddedList: false,
  fetchingCustomerAddedListError: false,
  customerAddedList:[],



  fetchingOpenQuotationYear:false,
  fetchingOpenQuotationYearError:false,
  openQuotationYear:{},

  fetchingTaskper: false,
  fetchingTaskperError: false,
  taskperCount: {},

  addingActionNotifications: false,
  addingActionNotificationsError: false,

  fetchingProspectLifetime:false,
  fetchingProspectLifetimeError:false,

  prospectLifeTime:{},

  updatingTodoTask: false,
  updatingTodoTaskError: false,

  fetchingallDashBoardFunnel: false,
  fetchingallDashBoardFunnelError: false,
  alldashboardFunnel: [],

  fetchingLeavesGantt: false,
  fetchingLeavesGanttError: false,

  leavesGantt: [],

  // updatingReqStage:false,
  fetchingDetails: false,
  fetchingDetailsError: false,
  detail: [],

  fetchingdashBoardSummaryChart: false,
  fetchingdashBoardSummaryChartError: false,
  dashBoardSummaryChart: [],

  fetchingSalesDatewiseReport: false,
  fetchingSalesDatewiseReportError: false,
  showSalesDatelist: [],

  viewType: "ME",
  isCustomSelected: false,
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),

  fetchingOrderListByOrderId: false,
  fetchingOrderListByOrderIdError: false,
  showDatelist: [],

  fetchingStageActionNotifications: false,
  fetchingStageActionNotificationsError: false,
  stageactionNotifications: [],

  billableCandidateModal: false,

  fetchingAllDatewiseReport: false,
  fetchingAllDatewiseReportError: false,
  showAllDatelist: [],

  updatingTodoEvent: false,
  updatingTodoEventError: false,

  selectedReportType: "dashboard",
  selectedSubReportType: "dashboard",

  fetchingDatewiseReport: false,
  fetchingDatewiseReportError: false,
  dateDashboardReport: [],

  fetchingJumpstartBulb: false,
  fetchingJumpstartBulbError: false,
  jumpstartBulbCount: [],
  fetchingJumpstartBulb2: false,
  fetchingJumpstartBulb2Error: false,
  jumpstartBulb2Count: [],
  fetchingJumpstartBulb3: false,
  fetchingJumpstartBulb3Error: false,
  jumpstartBulb3Count: [],
  gettingDevelopChart:false,
  gettingDevelopChartError:false,
  developChart:[],

  fetchingRepairDashboardOrderAdded:false,
  fetchingRepairDashboardOrderAddedError:false,
  repairDashboardOrderAdded:[],

  dateRangeList: [
    {
      id: 1,
      type: "today",
      value: "Today",
      starter: false,
      isSelected: true,
      startDate: dayjs()
        // .subtract(1, "days")
        .toISOString(),
      endDate: dayjs().toISOString(),
    },
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
      id: 2,
      type: "month",
      value: "MTD",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("month").toISOString(),
      endDate: dayjs().endOf("month").toISOString(),
    },
    {
      id: 3,
      type: "quarter",
      value: "QTD",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("quarter").toISOString(),
      endDate: dayjs().endOf("quarter").toISOString(),
    },
    {
      id: 4,
      type: "year",
      value: "YTD",
      starter: false,
      isSelected: false,
      startDate: dayjs().startOf("year").toISOString(),
      endDate: dayjs().endOf("year").toISOString(),
    },
  ],

  timeRangeType: "today",
  isCustomSelected: false,

  selectedReportType: "Select Report",

  selectedSubReportType: "Select",

  fetchingDashboardUserList: false,
  fetchingDashboardUserListError: false,
  dashboardUserlist: [],

  gettingHotColdWarm: false,
  gettingHotColdWarmError: false,
  showHotColdWarm: {},

  fetchingJumpstartCustolist: false,
  fetchingJumpstartCustolistError: false,
  jumpstrtCUSTOCount: {},
  fetchingJumpstartCusto2list: false,
  fetchingJumpstartCusto2listError: false,
  jumpstrtCUSTO2Count: {},

  fetchingdashCustoLeadsAdded: false,
  fetchingdashCustoLeadsAddedError: false,
  dashCustoLeadsAdded: [],

  fetchingJumpstartTasklist: false,
  fetchingJumpstartTasklistError: false,
  jumpstartTasklistCount: {},

  fetchingMultiRegionRecordsCount: false,
  fetchingMultiRegionRecordsCountError: false,
  multiOrgRecords:[],

  fetchingdashCustoContactsAdded: false,
  fetchingdashCustoContactsAddedError: false,
  dashCustoContactsAdded: [],

  fetchingJumpstartTask2list: false,
  fetchingJumpstartTask2listError: false,
  jumpstartTask2listCount: {},

  fetchingJumpstartInvestor: false,
  fetchingJumpstartInvestorError: false,
  jumpstartInvestorCount: {},

  fetchingJumpstartInvestor2: false,
  fetchingJumpstartInvestor2Error: false,
  jumpstartInvestor2Count: {},

  fetchingJumpstartInvestor3: false,
  fetchingJumpstartInvestor3Error: false,
  jumpstartInvestor3Count: {},

  fetchingJumpstartInvestor4: false,
  fetchingJumpstartInvestor4Error: false,
  jumpstartInvestor4Count: {},

  gettingInvHotColdWarm: false,
  gettingInvHotColdWarmError: false,
  investorHotColdWarm: {},

  fetchingdashInvstPitchAdded: false,
  fetchingdashInvstPitchAddedError: false,
  dashInvstPitchAdded: [],
  fetchingdashInvstContactAdded: false,
  fetchingdashInvstContactAddedError: false,
  dashInvstContactAdded: [],

  openLeadQualified: false,
  fetchingLeadsQualified: false,
  fetchingLeadsQualifiedError: false,
  showQualifiedLeads: [],
  
  openLeadAdded: false,
  fetchingLeadsAdded: false,
  fetchingLeadsAddedError: false,
  showAddedLeads: [],

  fetchingProspectQuotation:false,
  fetchingProspectQuotationError:false,
  prospectQuotation:{},

  openOppoAdded: false,
  fetchingOppoAdded: false,
  fetchingOppoAddedError: false,
  showAddedOppo: [],

  clickOppoClosed: false,
  fetchingOppoClosed: false,
  fetchingOppoClosedError: false,
  showClosedOppo: [],

  openPitchQualified: false,
  fetchingPitchQualified: false,
  fetchingPitchQualifiedError: false,
  showQualifiedPitch: [],

  openDealAdded: false,
  fetchingDealAdded: false,
  fetchingDealAddedError: false,
  showAddedDeal: [],


  openDealClosed: false,
  fetchingDealClosed: false,
  fetchingDealClosedError: false,
  showClosedDeal: [],

  openLeadHCWdrawer: false,
  fetchingHottestLeads: false,
  fetchingHottestLeadsError: false,
  showHottestLeads: [],

  fetchingColdestLeads: false,
  fetchingColdestLeadsError: false,
  showColdestLeads: [],

  fetchingWarmedLeads: false,
  fetchingWarmedLeadsError: false,
  showWarmedLeads: [],

  openPitchHCWdrawer: false,
  fetchingHottestPitch: false,
  fetchingHottestPitchError: false,
  showHottestPitch: [],

  fetchingColdestPitch: false,
  fetchingColdestPitchError: false,
  showColdestPitch: [],

  fetchingQuotationDashboard:false,
  fetchingQuotationDashboardError:false,
  quotationDashboard:[],

  fetchingWarmedPitch: false,
  fetchingWarmedPitchError: false,
  showWarmedPitch: [],

  taskNameDrwr: false,
  fetchingTaskNamedrwr: false,
  fetchingTaskNamedrwrError: false,
  taskInameDrwr: [],

  fetchingDashboardCompletedTasks: false,
  fetchingDashboardCompletedTasksError: false,
  dashbCompletedTasks: [],
  completedtaskDrwr: false,

  fetchingCompletedTaskTypes: false,
  fetchingCompletedTaskTypesError: false,
  completedtypeTasks: [],

  fetchingProspectData:false,
  fetchingProspectDataError:false,
  prospectChart:{},

  fetchingJumpOrderCount: false,
  fetchingJumpOrderCountError: false,
  jumstartOrderCount: {},

  fetchingorderDetails: false,
  fetchingorderDetailsError: false,
  orderinDashboard: [],

  fetchingdistributorDetails: false,
  fetchingdistributorDetailsError: false,
  distributorinDashboard:[],


  prospectDrawerModal:false,

  fetchingJumpstartFinanceDetail: false,
  fetchingJumpstartFinanceDetailError: false,
  financeDetail: [],

  fetchingRepairDashboardOrderCancelled: false,
  fetchingRepairDashboardOrderCancelledError:false,
  repairDashboardOrderCancelled:[],

  fetchingCountByUserID: false,
  fetchingCountByUserIDError:false,
  countbyUserID:[],

  fetchingDistributorByUserID: false,
  fetchingDistributorByUserIDError:false,
  distributorbyUserID:[],

  fetchingSourceCountAcc: false,
                    sourceCountAcc: {},
                    fetchingSourceCountError:false,

                    fetchingCategoryCountAcc: false,
                    fetchingCategoryCountError:false,
                    categoryCountAcc:{},        

};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DASHBOARD_VIEW_TYPE:
      return { ...state, viewType: action.payload };
      case types.HANDLE_ORDER_ADDED_MODAL:
      return { ...state, orderAddedModal: action.payload };

      case types.HANDLE_CUSTOMER_ADDED_MODAL:
      return { ...state, customerAddedModal: action.payload };

      case types.HANDLE_CONTACT_ADDED_MODAL:
      return { ...state, contactAddedModal: action.payload };

    case types.GET_SKILLS_CLOUD_REQUEST:
      return { ...state, fetchingSkillsCloud: true };
    case types.GET_SKILLS_CLOUD_SUCCESS:
      return {
        ...state,
        fetchingSkillsCloud: false,
        skillsCloud: action.payload,
      };
    case types.GET_SKILLS_CLOUD_FAILURE:
      return {
        ...state,
        fetchingSkillsCloud: false,
        fetchingSkillsCloudError: true,
      };

    case types.CHANGE_SELECTED_TIME_INTERVAL_REPORT:
      return {
        ...state,
        dateRangeList: newDateRange(state.dateRangeList, action.payload),
        isCustomSelected: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        timeRangeType: action.payload.type,
      };

    case types.SET_TIME_INTERVAL_REPORT:
      return {
        ...state,
        isCustomSelected: true,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    case types.GET_ORDER_LIST_BY_ORDER_ID_REQUEST:
      return { ...state, fetchingOrderListByOrderId: true };
    case types.GET_ORDER_LIST_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        fetchingOrderListByOrderId: false,
        orderListByOrderId: action.payload,
      };
    case types.GET_ORDER_LIST_BY_ORDER_ID_FAILURE:
      return {
        ...state,
        fetchingOrderListByOrderId: false,
        fetchingOrderListByOrderIdError: true,
      };

    case types.SET_SELECTED_REPORT_TYPE:
      return {
        ...state,
        selectedReportType: action.payload,
        // selectedSubReportType: "order",
      };

    case types.GET_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingDatewiseReport: true };
    case types.GET_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingDatewiseReport: false,
        fetchingDatewiseReportError: false,
        showDatelist: action.payload,
      };
    case types.GET_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingDatewiseReport: false,
        fetchingDatewiseReportError: true,
        selectedReportType: "dashboard",
      };



      case types.GET_REPAIR_DASHBOARD_ORDER_ADDED_REQUEST:
        return { ...state, fetchingRepairDashboardOrderAdded: true };
      case types.GET_REPAIR_DASHBOARD_ORDER_ADDED_SUCCESS:
        return {
          ...state,
          fetchingRepairDashboardOrderAdded: false,
          repairDashboardOrderAdded:action.payload,
          // opportunityByUserId: action.payload,
  
         // opportunityByUserId: [...state.opportunityByUserId, ...action.payload],
        };
      case types.GET_REPAIR_DASHBOARD_ORDER_ADDED_FAILURE:
        return {
          ...state,
          fetchingRepairDashboardOrderAdded: false,
          fetchingRepairDashboardOrderAddedError: true,
        };

    case types.GET_DASHBOARD_TABLE_REQUEST:
      return { ...state, fetchingdashboardTable: true };
    case types.GET_DASHBOARD_TABLE_SUCCESS:
      return {
        ...state,
        fetchingdashboardTable: false,
        tableDashboard: action.payload,
      };
    case types.GET_DASHBOARD_TABLE_FAILURE:
      return {
        ...state,
        fetchingdashboardTable: false,
        fetchingdashboardTableError: true,
      };

    case types.GET_RECRUITER_DASHBOARD_LIST_REQUEST:
      return { ...state, fetchingRecruiterDashboardList: true };
    case types.GET_RECRUITER_DASHBOARD_LIST_SUCCESS:
      return {
        ...state,
        fetchingRecruiterDashboardList: false,
        listRecruiterDashboard: action.payload,
      };
    case types.GET_RECRUITER_DASHBOARD_LIST_FAILURE:
      return {
        ...state,
        fetchingRecruiterDashboardList: false,
        fetchingRecruiterDashboardListError: true,
      };

    case types.GET_DASHBOARD_TABLE_PROGRESS_REQUEST:
      return { ...state, fetchingdashboardTable2: true };
    case types.GET_DASHBOARD_TABLE_PROGRESS_SUCCESS:
      return {
        ...state,
        fetchingdashboardTable2: false,
        tableDashboard2: action.payload,
      };
    case types.GET_DASHBOARD_TABLE_PROGRESS_FAILURE:
      return {
        ...state,
        fetchingdashboardTable2: false,
        fetchingdashboardTable2Error: true,
      };

    case types.GET_DASHBOARD_COMMISSION_TABLE_REQUEST:
      return { ...state, fetchingdashBoardCommissionTable: true };
    case types.GET_DASHBOARD_COMMISSION_TABLE_SUCCESS:
      return {
        ...state,
        fetchingdashBoardCommissionTable: false,
        tableDashBoardCommission: action.payload,
      };
    case types.GET_DASHBOARD_COMMISSION_TABLE_FAILURE:
      return {
        ...state,
        fetchingdashBoardCommissionTable: false,
        fetchingdashBoardCommissionTableError: true,
      };

    case types.GET_DASHBOARD_CUSTOMER_CHART_REQUEST:
      return { ...state, fetchingdashBoardCustomerChart: true };
    case types.GET_DASHBOARD_CUSTOMER_CHART_SUCCESS:
      return {
        ...state,
        fetchingdashBoardCustomerChart: false,
        dashBoardCustomerChart: action.payload,
      };
    case types.GET_DASHBOARD_CUSTOMER_CHART_FAILURE:
      return {
        ...state,
        fetchingdashBoardCustomerChart: false,
        fetchingdashBoardCustomerChartError: true,
      };


      case types.HANDLE_ORDER_CLOSED_MODAL:
        return { ...state, orderClosedModal: action.payload };




      case types.GET_PROSPECT_LIFETIME_REQUEST:
        return { ...state, fetchingProspectLifetime: true };
      case types.GET_PROSPECT_LIFETIME_SUCCESS:
        return {
          ...state,
          fetchingProspectLifetime: false,
          prospectLifeTime: action.payload,
        };
      case types.GET_PROSPECT_LIFETIME_FAILURE:
        return {
          ...state,
          fetchingProspectLifetime: false,
          fetchingProspectLifetimeError: true,
        };


        case types.HANDLE_PROSPECT_DRAWER:
          return { ...state, prospectDrawerModal: action.payload };

    case types.GET_DASHBOARD_CLOSURE_RATIO_REQUEST:
      return { ...state, fetchingdashBoardClosureRatio: true };
    case types.GET_DASHBOARD_CLOSURE_RATIO_SUCCESS:
      return {
        ...state,
        fetchingdashBoardClosureRatio: false,
        dashBoardClosureRatio: action.payload,
      };
    case types.GET_DASHBOARD_CLOSURE_RATIO_FAILURE:
      return {
        ...state,
        fetchingdashBoardClosureRatio: false,
        fetchingdashBoardClosureRatioError: true,
      };



      case types.GET_PROSPECT_TABLE_DATA_REQUEST:
      return { ...state, fetchingProspectTableData: true };
    case types.GET_PROSPECT_TABLE_DATA_SUCCESS:
      return {
        ...state,
        fetchingProspectTableData: false,
        prospectTableData: action.payload,
      };
    case types.GET_PROSPECT_TABLE_DATA_FAILURE:
      return {
        ...state,
        fetchingProspectTableData: false,
        fetchingProspectTableDataError: true,
      };


    case types.GET_DASHBOARD_SUMMARY_CHART_REQUEST:
      return { ...state, fetchingdashBoardSummaryChart: true };
    case types.GET_DASHBOARD_SUMMARY_CHART_SUCCESS:
      return {
        ...state,
        fetchingdashBoardSummaryChart: false,
        dashBoardSummaryChart: action.payload,
      };
    case types.GET_DASHBOARD_SUMMARY_CHART_FAILURE:
      return {
        ...state,
        fetchingdashBoardSummaryChart: false,
        fetchingdashBoardSummaryChartError: true,
      };





      case types.GET_QUOTATION_DASHBOARD_REQUEST:
        return { ...state, fetchingQuotationDashboard: true };
      case types.GET_QUOTATION_DASHBOARD_SUCCESS:
        return {
          ...state,
          fetchingQuotationDashboard: false,
          quotationDashboard: action.payload,
        };
      case types.GET_QUOTATION_DASHBOARD_FAILURE:
        return {
          ...state,
          fetchingQuotationDashboard: false,
          fetchingQuotationDashboardError: true,
        };

    // case types.CHANGE_SELECTED_TODO_TIME_INTERVAL_REPORT:
    //   return {
    //     ...state,
    //     dateTodoRangeList: newDateRange(state.dateTodoRangeList, action.payload),
    //    // isCustomSelected: false,
    //     startDate: action.payload.startDate,
    //     endDate: action.payload.endDate,
    //     type: action.payload.type
    //   };

    case types.GET_TODOS_REQUEST:
      return { ...state, fetchingTodos: true, fetchingTodosError: false };
    case types.GET_TODOS_SUCCESS:
      return {
        ...state,
        fetchingTodos: false,
        fetchingTodosError: false,
        todos: action.payload,
      };
    case types.GET_TODOS_FAILURE:
      return { ...state, fetchingTodos: false, fetchingTodosError: true };

    case types.GET_TODOS_COUNT_REQUEST:
      return {
        ...state,
        fetchingTodosCount: true,
        fetchingTodosCountError: false,
      };
    case types.GET_TODOS_COUNT_SUCCESS:
      return {
        ...state,
        fetchingTodosCount: false,
        fetchingTodosCountError: false,
        todosCount: action.payload,
      };
    case types.GET_TODOS_COUNT_FAILURE:
      return {
        ...state,
        fetchingTodosCount: false,
        fetchingTodosCountError: true,
      };




      case types.GET_ORDER_OPEN_LIST_REQUEST:
        return { ...state, fetchingOrderOpenList: true };
      case types.GET_ORDER_OPEN_LIST_SUCCESS:
        return {
          ...state,
          fetchingOrderOpenList: false,
          orderOpenList: action.payload,
        };
      case types.GET_ORDER_OPEN_LIST_FAILURE:
        return {
          ...state,
          fetchingOrderOpenList: false,
          fetchingOrderOpenListError: true,
        };


    case types.GET_AVG_HOUR_REQUEST:
      return { ...state, fetchingAvgHour: true, fetchingAvgHourError: false };
    case types.GET_AVG_HOUR__SUCCESS:
      return {
        ...state,
        fetchingAvgHour: false,
        fetchingAvgHourError: false,
        avgHour: action.payload,
      };
    case types.GET_AVG_HOUR__FAILURE:
      return { ...state, fetchingAvgHour: false, fetchingAvgHourError: true };

    case types.GET_DASHBOARD_FUNNEL_REQUEST:
      return { ...state, fetchingDashBoardFunnel: true };
    case types.GET_DASHBOARD_FUNNEL_SUCCESS:
      return {
        ...state,
        fetchingDashBoardFunnel: false,
        dashboardFunnel: action.payload,
      };
    case types.GET_DASHBOARD_FUNNEL_FAILURE:
      return {
        ...state,
        fetchingDashBoardFunnel: false,
        fetchingDashBoardFunnelError: true,
      };

    case types.GET_DASHBOARD_INDICATOR_REQUEST:
      return { ...state, fetchingDashBoardIndicator: true };
    case types.GET_DASHBOARD_INDICATOR_SUCCESS:
      return {
        ...state,
        fetchingDashBoardIndicator: false,
        dashboardIndicator: action.payload,
      };
    case types.GET_DASHBOARD_INDICATOR_FAILURE:
      return {
        ...state,
        fetchingDashBoardIndicator: false,
        fetchingDashBoardIndicatorError: true,
      };

    case types.GET_SALES_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingSalesDatewiseReport: true };
    case types.GET_SALES_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingSalesDatewiseReport: false,
        fetchingSalesDatewiseReportError: false,
        showSalesDatelist: action.payload,
      };
    case types.GET_SALES_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingSalesDatewiseReport: false,
        fetchingSalesDatewiseReportError: true,
        // selectedReportType: "dashboard",
      };

    case types.GET_THIS_MONTH_TASK_GANTT_REQUEST:
      return { ...state, fetchingThisMonthTaskGantt: true };
    case types.GET_THIS_MONTH_TASK_GANTT_SUCCESS:
      return {
        ...state,
        fetchingThisMonthTaskGantt: false,
        thisMonthTaskGant: action.payload,
      };
    case types.GET_THIS_MONTH_TASK_GANTT_FAILURE:
      return {
        ...state,
        fetchingThisMonthTaskGantt: false,
        fetchingThisMonthTaskGanttError: true,
      };

    case types.GET_LEAVES_GANTT_REQUEST:
      return { ...state, fetchingLeavesGantt: true };
    case types.GET_LEAVES_GANTT_SUCCESS:
      return {
        ...state,
        fetchingLeavesGantt: false,
        leavesGantt: action.payload,
      };
    case types.GET_LEAVES_GANTT_FAILURE:
      return {
        ...state,
        fetchingLeavesGantt: false,
        fetchingLeavesGanttError: true,
      };

    case types.GET_JUMPSTART_FINANCE_DETAIL_REQUEST:
      return { ...state, fetchingJumpstartFinanceDetail: true };
    case types.GET_JUMPSTART_FINANCE_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingJumpstartFinanceDetail: false,
        financeDetail: action.payload,
      };
    case types.GET_JUMPSTART_FINANCE_DETAIL_FAILURE:
      return {
        ...state,
        fetchingJumpstartFinanceDetail: false,
        fetchingJumpstartFinanceDetailError: true,
      };



      case types.GET_REPAIR_DASHBOARD_ORDER_OPEN_REQUEST:
        return { ...state, fetchingRepairDashboardOrderOpenError: true };
      case types.GET_REPAIR_DASHBOARD_ORDER_OPEN_SUCCESS:
        return {
          ...state,
          fetchingRepairDashboardOrderOpenError: false,
          repairDashboardOrderOpen:action.payload,
          // opportunityByUserId: action.payload,
  
         // opportunityByUserId: [...state.opportunityByUserId, ...action.payload],
        };
      case types.GET_REPAIR_DASHBOARD_ORDER_OPEN_FAILURE:
        return {
          ...state,
          fetchingRepairDashboardOrderOpen: false,
          fetchingRepairDashboardOrderOpenError: true,
        };

    case types.GET_TASKS_DASHBOARD_GANTT_REQUEST:
      return { ...state, fetchingTaskDashboardGantt: true };
    case types.GET_TASKS_DASHBOARD_GANTT_SUCCESS:
      return {
        ...state,
        fetchingTaskDashboardGantt: false,
        tasksdashboardGantt: action.payload,
      };
    case types.GET_TASKS_DASHBOARD_GANTT_FAILURE:
      return {
        ...state,
        fetchingTaskDashboardGantt: false,
        fetchingTaskDashboardGanttError: true,
      };

    case types.UPDATE_TODO_CALL_BY_ID_REQUEST:
      return { ...state, updatingTodoCall: true };
    case types.UPDATE_TODO_CALL_BY_ID_SUCCESS:
      return {
        ...state,
        updatingTodoCall: false,
        todos: state.todos.map((item, i) => {
          ////debugger;
          if (item.taskId === action.payload.taskId) {
            ////debugger;
            return action.payload;
          } else {
            ////debugger;
            return item;
          }
        }),
      };
    case types.UPDATE_TODO_CALL_BY_ID_FAILURE:
      return { ...state, updatingCall: false, updatingCallError: false };

    case types.UPDATE_TODO_EVENT_BY_ID_REQUEST:
      return { ...state, updatingTodoEvent: true };
    case types.UPDATE_TODO_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        updatingTodoEvent: false,
        todos: state.todos.map((item, i) => {
          ////debugger;
          if (item.eventId === action.payload.eventId) {
            ////debugger;
            return action.payload;
          } else {
            ////debugger;
            return item;
          }
        }),
      };
    case types.UPDATE_TODO_EVENT_BY_ID_FAILURE:
      return {
        ...state,
        updatingTodoEvent: false,
        updatingTodoEventError: false,
      };

    case types.UPDATE_TODO_TASK_BY_ID_REQUEST:
      return { ...state, updatingTodoTask: true };
    case types.UPDATE_TODO_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        updatingTodoTask: false,
        todos: state.todos.map((item, i) => {
          ////debugger;
          if (item.taskId === action.payload.taskId) {
            ////debugger;
            return action.payload;
          } else {
            ////debugger;
            return item;
          }
        }),
      };
    case types.UPDATE_TODO_TASK_BY_ID_FAILURE:
      return {
        ...state,
        updatingTodoTask: false,
        updatingTodoTaskError: false,
      };

    case types.GET_ALL_SALES_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingAllSalesDatewiseReport: true };
    case types.GET_ALL_SALES_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingAllSalesDatewiseReport: false,
        fetchingAllSalesDatewiseReportError: false,
        showAllSalesDatelist: action.payload,
      };
    case types.GET_ALL_SALES_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingAllSalesDatewiseReport: false,
        fetchingAllSalesDatewiseReportError: true,
        // selectedReportType: "dashboard"
      };




      case types.GET_CUSTOMER_CHART_REQUEST:
        return { ...state, gettingCustomerChart: true };
  
      case types.GET_CUSTOMER_CHART_SUCCESS:
        return {
          ...state,
          gettingCustomerChart: false,
          customerDashboardChart: action.payload,
        };
  
      case types.GET_CUSTOMER_CHART_FAILURE:
        return {
          ...state,
          gettingCustomerChart: false,
          gettingCustomerChartError: true,
        };

    case types.GET_ALL_DATE_WISE_REPORT_REQUEST:
      return { ...state, fetchingAllDatewiseReport: true };
    case types.GET_ALL_DATE_WISE_REPORT_SUCCESS:
      return {
        ...state,
        fetchingAllDatewiseReport: false,
        fetchingAllDatewiseReportError: false,
        showAllDatelist: action.payload,
      };
    case types.GET_ALL_DATE_WISE_REPORT_FAILURE:
      return {
        ...state,
        fetchingAllDatewiseReport: false,
        fetchingAllDatewiseReportError: true,
        // selectedReportType: "dashboard"
      };

    case types.GET_ALL_DASHBOARD_CLOSURE_RATIO_REQUEST:
      return { ...state, fetchingalldashBoardClosureRatio: true };
    case types.GET_ALL_DASHBOARD_CLOSURE_RATIO_SUCCESS:
      return {
        ...state,
        fetchingalldashBoardClosureRatio: false,
        dashBoardallClosureRatio: action.payload,
      };
    case types.GET_ALL_DASHBOARD_CLOSURE_RATIO_FAILURE:
      return {
        ...state,
        fetchingalldashBoardClosureRatio: false,
        fetchingalldashBoardClosureRatioError: true,
      };

    case types.GET_ALL_DASHBOARD_CUSTOMER_CHART_REQUEST:
      return { ...state, fetchingalldashBoardCustomerChart: true };
    case types.GET_ALL_DASHBOARD_CUSTOMER_CHART_SUCCESS:
      return {
        ...state,
        fetchingalldashBoardCustomerChart: false,
        dashBoardallCustomerChart: action.payload,
      };
    case types.GET_ALL_DASHBOARD_CUSTOMER_CHART_FAILURE:
      return {
        ...state,
        fetchingalldashBoardCustomerChart: false,
        fetchingalldashBoardCustomerChartError: true,
      };

    case types.GET_ALL_DASHBOARD_TABLE_PROGRESS_REQUEST:
      return { ...state, fetchingalldashboardTable2: true };
    case types.GET_ALL_DASHBOARD_TABLE_PROGRESS_SUCCESS:
      return {
        ...state,
        fetchingalldashboardTable2: false,
        tableallDashboard2: action.payload,
      };
    case types.GET_ALL_DASHBOARD_TABLE_PROGRESS_FAILURE:
      return {
        ...state,
        fetchingalldashboardTable2: false,
        fetchingalldashboardTable2Error: true,
      };

    case types.GET_ALL_DASHBOARD_FUNNEL_REQUEST:
      return { ...state, fetchingallDashBoardFunnel: true };
    case types.GET_ALL_DASHBOARD_FUNNEL_SUCCESS:
      return {
        ...state,
        fetchingallDashBoardFunnel: false,
        alldashboardFunnel: action.payload,
      };
    case types.GET_ALL_DASHBOARD_FUNNEL_FAILURE:
      return {
        ...state,
        fetchingallDashBoardFunnel: false,
        fetchingallDashBoardFunnelError: true,
      };

    case types.GET_ACTION_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingActionNotifications: true };
    case types.GET_ACTION_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingActionNotifications: false,
        actionNotifications: action.payload,
      };
    case types.GET_ACTION_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingActionNotifications: false,
        fetchingActionNotificationsError: true,
      };

    case types.HANDLE_ADD_JOB_DETAIL_MODAL:
      return { ...state, addjobDetailModal: action.payload };

    case types.ADD_ACTION_NOTIFICATIONS_REQUEST:
      return { ...state, addingActionNotifications: true };
    case types.ADD_ACTION_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        addingActionNotifications: false,
        // actionNotifications: action.payload
      };
    case types.ADD_ACTION_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        addingActionNotifications: false,
        addingActionNotificationsError: true,
      };

    case types.GET_STAGE_ACTION_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingStageActionNotifications: true };
    case types.GET_STAGE_ACTION_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingStageActionNotifications: false,
        stageactionNotifications: action.payload,
      };
    case types.GET_STAGE_ACTION_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingStageActionNotifications: false,
        fetchingStageActionNotificationsError: true,
      };

    case types.HANDLE_ACTION_DRAWER_MODAL:
      return { ...state, addDrawerActionModal: action.payload };

    case types.GET_ACTION_STEPS_REQUEST:
      return { ...state, fetchingActionSteps: true };
    case types.GET_ACTION_STEPS_SUCCESS:
      return {
        ...state,
        fetchingActionSteps: false,
        actionSteps: action.payload,
      };
    case types.GET_ACTION_STEPS_FAILURE:
      return {
        ...state,
        fetchingActionSteps: false,
        fetchingActionStepsError: true,
      };

    // case types.UPDATE_REQUIREMENT_STAGE_REQUEST:
    //   return {
    //     ...state,
    //     updatingReqStage: true,
    //     //opportunities: updatedOpportunity(state.opportunities, action.payload),
    //   };
    // case types.UPDATE_REQUIREMENT_STAGE_SUCCESS:
    //   return { ...state, updatingReqStage: false };
    // case types.UPDATE_REQUIREMENT_STAGE_FAILURE:
    //   return { ...state };

    case types.GET_DETAILS_LIST_REQUEST:
      return { ...state, fetchingDetails: true };
    case types.GET_DETAILS_LIST_SUCCESS:
      return {
        ...state,
        fetchingDetails: false,
        detail: action.payload,
      };
    case types.GET_DETAILS_LIST_FAILURE:
      return {
        ...state,
        fetchingDetails: false,
        fetchingDetailsError: true,
      };
    case types.HANDLE_BILLABLE_CANDIDATE_MODAL:
      return {
        ...state,
        billableCandidateModal: action.payload,
        candidatesBillableAmount: [],
      };

    case types.GET_CANDIDATES_BILLABLE_AMOUNT_REQUEST:
      return { ...state, fetchingCandidateTotalBillableAmount: true };
    case types.GET_CANDIDATES_BILLABLE_AMOUNT_SUCCESS:
      return {
        ...state,
        fetchingCandidateTotalBillableAmount: false,
        candidatesBillableAmount: action.payload,
      };
    case types.GET_CANDIDATES_BILLABLE_AMOUNT_FAILURE:
      return {
        ...state,
        fetchingCandidateTotalBillableAmount: false,
        fetchingCandidateTotalBillableAmountError: true,
      };

    case types.GET_UPCOMING_EVENTS_REQUEST:
      return {
        ...state,
        fetchingUpcomingEvents: true,
        fetchingUpcomingEventsError: false,
      };
    case types.GET_UPCOMING_EVENTS_SUCCESS:
      return {
        ...state,
        fetchingUpcomingEvents: false,
        fetchingUpcomingEventsError: false,
        upcomingEvents: action.payload,
      };
    case types.GET_UPCOMING_EVENTS_FAILURE:
      return {
        ...state,
        fetchingUpcomingEvents: false,
        fetchingUpcomingEventsError: true,
      };

    case types.GET_TASK_PER_REQUEST:
      return { ...state, fetchingTaskper: true, fetchingTaskperError: false };
    case types.GET_TASK_PER_SUCCESS:
      return {
        ...state,
        fetchingTaskper: false,
        fetchingTaskperError: false,
        taskperCount: action.payload,
      };
    case types.GET_TASK_PER_FAILURE:
      return { ...state, fetchingTaskper: false, fetchingTaskperError: true };

    case types.GET_JUMPSTART_BULB_REQUEST:
      return {
        ...state,
        fetchingJumpstartBulb: true,
        fetchingJumpstartBulbError: false,
      };
    case types.GET_JUMPSTART_BULB_SUCCESS:
      return {
        ...state,
        fetchingJumpstartBulb: false,
        fetchingJumpstartBulbError: false,
        jumpstartBulbCount: action.payload,
      };
    case types.GET_JUMPSTART_BULB_FAILURE:
      return {
        ...state,
        fetchingJumpstartBulb: false,
        fetchingJumpstartBulbError: true,
      };

    case types.GET_JUMPSTART_BULB2_REQUEST:
      return {
        ...state,
        fetchingJumpstartBulb2: true,
        fetchingJumpstartBulb2Error: false,
      };
    case types.GET_JUMPSTART_BULB2_SUCCESS:
      return {
        ...state,
        fetchingJumpstartBulb2: false,
        fetchingJumpstartBulb2Error: false,
        jumpstartBulb2Count: action.payload,
      };
    case types.GET_JUMPSTART_BULB2_FAILURE:
      return {
        ...state,
        fetchingJumpstartBulb2: false,
        fetchingJumpstartBulb2Error: true,
      };
    case types.GET_JUMPSTART_BULB3_REQUEST:
      return {
        ...state,
        fetchingJumpstartBulb3: true,
        fetchingJumpstartBulb3Error: false,
      };
    case types.GET_JUMPSTART_BULB3_SUCCESS:
      return {
        ...state,
        fetchingJumpstartBulb3: false,
        fetchingJumpstartBulb3Error: false,
        jumpstartBulb3Count: action.payload,
      };
    case types.GET_JUMPSTART_BULB3_FAILURE:
      return {
        ...state,
        fetchingJumpstartBulb3: false,
        fetchingJumpstartBulb3Error: true,
      };

    case types.GET_DASHBOARD_USER_LIST_REQUEST:
      return { ...state, fetchingDashboardUserList: true };
    case types.GET_DASHBOARD_USER_LIST_SUCCESS:
      return {
        ...state,
        fetchingDashboardUserList: false,
        dashboardUserlist: action.payload,
      };
    case types.GET_DASHBOARD_USER_LIST_FAILURE:
      return {
        ...state,
        fetchingDashboardUserList: false,
        fetchingDashboardUserListError: true,
      };

    case types.GET_HOT_COLD_WARM_REQUEST:
      return { ...state, gettingHotColdWarm: true };

    case types.GET_HOT_COLD_WARM_SUCCESS:
      return {
        ...state,
        gettingHotColdWarm: false,
        showHotColdWarm: action.payload,
      };

    case types.GET_HOT_COLD_WARM_FAILURE:
      return {
        ...state,
        gettingHotColdWarm: false,
        gettingHotColdWarmError: true,
      };



      case types.GET_QUOTATION_DASHBOARD_COUNT_REQUEST:
        return { ...state, fetchingQuotationDashboardCount: true };
      case types.GET_QUOTATION_DASHBOARD_COUNT_SUCCESS:
        return {
          ...state,
          fetchingQuotationDashboardCount: false,
          quotationDashboardCount: action.payload,
        };
      case types.GET_QUOTATION_DASHBOARD_COUNT_FAILURE:
        return {
          ...state,
          fetchingQuotationDashboardCount: false,
          fetchingQuotationDashboardCountError: true,
        };

    case types.GET_JUMPSTART_CUSTOMER_LIST_REQUEST:
      return {
        ...state,
        fetchingJumpstartCustolist: true,
        fetchingJumpstartCustolistError: false,
      };
    case types.GET_JUMPSTART_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        fetchingJumpstartCustolist: false,
        fetchingJumpstartCustolistError: false,
        jumpstrtCUSTOCount: action.payload,
      };
    case types.GET_JUMPSTART_CUSTOMER_LIST_FAILURE:
      return {
        ...state,
        fetchingJumpstartCustolist: false,
        fetchingJumpstartCustolistError: true,
      };

    case types.GET_JUMPSTART_CUSTOMER2_LIST_REQUEST:
      return {
        ...state,
        fetchingJumpstartCusto2list: true,
        fetchingJumpstartCusto2listError: false,
      };
    case types.GET_JUMPSTART_CUSTOMER2_LIST_SUCCESS:
      return {
        ...state,
        fetchingJumpstartCusto2list: false,
        fetchingJumpstartCusto2listError: false,
        jumpstrtCUSTO2Count: action.payload,
      };
    case types.GET_JUMPSTART_CUSTOMER2_LIST_FAILURE:
      return {
        ...state,
        fetchingJumpstartCusto2list: false,
        fetchingJumpstartCusto2listError: true,
      };

    case types.GET_DASH_CUSTOMER_ADDED_LEADS_REQUEST:
      return { ...state, fetchingdashCustoLeadsAdded: true };
    case types.GET_DASH_CUSTOMER_ADDED_LEADS_SUCCESS:
      return {
        ...state,
        fetchingdashCustoLeadsAdded: false,
        dashCustoLeadsAdded: action.payload,
      };
    case types.GET_DASH_CUSTOMER_ADDED_LEADS_FAILURE:
      return {
        ...state,
        fetchingdashCustoLeadsAdded: false,
        fetchingdashCustoLeadsAddedError: true,
      };

    case types.GET_JUMPSTART_TASK_LIST_REQUEST:
      return {
        ...state,
        fetchingJumpstartTasklist: true,
        fetchingJumpstartTasklistError: false,
      };
    case types.GET_JUMPSTART_TASK_LIST_SUCCESS:
      return {
        ...state,
        fetchingJumpstartTasklist: false,
        fetchingJumpstartTasklistError: false,
        jumpstartTasklistCount: action.payload,
      };
    case types.GET_JUMPSTART_TASK_LIST_FAILURE:
      return {
        ...state,
        fetchingJumpstartTasklist: false,
        fetchingJumpstartTasklistError: true,
      };

    case types.GET_DASHBOARD_TASK_REQUEST:
      return { ...state, fetchingDashboardTasks: true };
    case types.GET_DASHBOARD_TASK_SUCCESS:
      return {
        ...state,
        fetchingDashboardTasks: false,
        dashboardTasks: action.payload,
      };
    case types.GET_DASHBOARD_TASK_FAILURE:
      return {
        ...state,
        fetchingDashboardTasks: false,
        fetchingDashboardTasksError: true,
      };

    case types.GET_DASH_CUSTOMER_ADDED_CONTACTS_REQUEST:
      return { ...state, fetchingdashCustoContactsAdded: true };
    case types.GET_DASH_CUSTOMER_ADDED_CONTACTS_SUCCESS:
      return {
        ...state,
        fetchingdashCustoContactsAdded: false,
        dashCustoContactsAdded: action.payload,
      };
    case types.GET_DASH_CUSTOMER_ADDED_CONTACTS_FAILURE:
      return {
        ...state,
        fetchingdashCustoContactsAdded: false,
        fetchingdashCustoContactsAddedError: true,
      };

    case types.GET_JUMPSTART_TASK_2_LIST_REQUEST:
      return {
        ...state,
        fetchingJumpstartTask2list: true,
        fetchingJumpstartTask2listError: false,
      };
    case types.GET_JUMPSTART_TASK_2_LIST_SUCCESS:
      return {
        ...state,
        fetchingJumpstartTask2list: false,
        fetchingJumpstartTask2listError: false,
        jumpstartTask2listCount: action.payload,
      };
    case types.GET_JUMPSTART_TASK_2_LIST_FAILURE:
      return {
        ...state,
        fetchingJumpstartTask2list: false,
        fetchingJumpstartTask2listError: true,
      };

    case types.GET_JUMPSTART_INVESTOR_REQUEST:
      return {
        ...state,
        fetchingJumpstartInvestor: true,
        fetchingJumpstartInvestorError: false,
      };
    case types.GET_JUMPSTART_INVESTOR_SUCCESS:
      return {
        ...state,
        fetchingJumpstartInvestor: false,
        fetchingJumpstartInvestorError: false,
        jumpstartInvestorCount: action.payload,
      };
    case types.GET_JUMPSTART_INVESTOR_FAILURE:
      return {
        ...state,
        fetchingJumpstartInvestor: false,
        fetchingJumpstartInvestorError: true,
      };

    case types.GET_JUMPSTART_INVESTOR_2_REQUEST:
      return {
        ...state,
        fetchingJumpstartInvestor2: true,
        fetchingJumpstartInvestor2Error: false,
      };
    case types.GET_JUMPSTART_INVESTOR_2_SUCCESS:
      return {
        ...state,
        fetchingJumpstartInvestor2: false,
        fetchingJumpstartInvestor2Error: false,
        jumpstartInvestor2Count: action.payload,
      };
    case types.GET_JUMPSTART_INVESTOR_2_FAILURE:
      return {
        ...state,
        fetchingJumpstartInvestor2: false,
        fetchingJumpstartInvestor2Error: true,
      };




      case types.GET_ORDER_CANCEL_LIST_REQUEST:
        return { ...state, fetchingOrderCancelList: true };
      case types.GET_ORDER_CANCEL_LIST_SUCCESS:
        return {
          ...state,
          fetchingOrderCancelList: false,
          orderCancelList: action.payload,
        };
      case types.GET_ORDER_CANCEL_LIST_FAILURE:
        return {
          ...state,
          fetchingOrderCancelList: false,
          fetchingOrdercancelListError: true,
        };

      case types.GET_ORDER_ADDED_LIST_REQUEST:
        return { ...state, fetchingOrderAddedList: true };
      case types.GET_ORDER_ADDED_LIST_SUCCESS:
        return {
          ...state,
          fetchingOrderAddedList: false,
          orderAddedList: action.payload,
        };
      case types.GET_ORDER_ADDED_LIST_FAILURE:
        return {
          ...state,
          fetchingOrderAddedList: false,
          fetchingOrderAddedListError: true,
        };


        case types.GET_CUSTOMER_ADDED_LIST_REQUEST:
        return { ...state, fetchingCustomerAddedList: true };
      case types.GET_CUSTOMER_ADDED_LIST_SUCCESS:
        return {
          ...state,
          fetchingCustomerAddedList: false,
          customerAddedList: action.payload,
        };
      case types.GET_CUSTOMER_ADDED_LIST_FAILURE:
        return {
          ...state,
          fetchingCustomerAddedList: false,
          fetchingCustomerAddedListError: true,
        };

        case types.GET_CONTACT_ADDED_LIST_REQUEST:
        return { ...state, fetchingContactAddedList: true };
      case types.GET_CONTACT_ADDED_LIST_SUCCESS:
        return {
          ...state,
          fetchingContactAddedList: false,
          contactAddedList: action.payload,
        };
      case types.GET_CONTACT_ADDED_LIST_FAILURE:
        return {
          ...state,
          fetchingContactAddedList: false,
          fetchingContactAddedListError: true,
        };

    case types.GET_JUMPSTART_INVESTOR_3_REQUEST:
      return {
        ...state,
        fetchingJumpstartInvestor3: true,
        fetchingJumpstartInvestor3Error: false,
      };
    case types.GET_JUMPSTART_INVESTOR_3_SUCCESS:
      return {
        ...state,
        fetchingJumpstartInvestor3: false,
        fetchingJumpstartInvestor3Error: false,
        jumpstartInvestor3Count: action.payload,
      };
    case types.GET_JUMPSTART_INVESTOR_3_FAILURE:
      return {
        ...state,
        fetchingJumpstartInvestor3: false,
        fetchingJumpstartInvestor3Error: true,
      };

    case types.GET_JUMPSTART_INVESTOR_4_REQUEST:
      return {
        ...state,
        fetchingJumpstartInvestor4: true,
        fetchingJumpstartInvestor4Error: false,
      };
    case types.GET_JUMPSTART_INVESTOR_4_SUCCESS:
      return {
        ...state,
        fetchingJumpstartInvestor4: false,
        fetchingJumpstartInvestor4Error: false,
        jumpstartInvestor4Count: action.payload,
      };
    case types.GET_JUMPSTART_INVESTOR_4_FAILURE:
      return {
        ...state,
        fetchingJumpstartInvestor4: false,
        fetchingJumpstartInvestor4Error: true,
      };

    case types.GET_INVSTR_HOT_COLD_WARM_REQUEST:
      return { ...state, gettingInvHotColdWarm: true };

    case types.GET_INVSTR_HOT_COLD_WARM_SUCCESS:
      return {
        ...state,
        gettingInvHotColdWarm: false,
        investorHotColdWarm: action.payload,
      };

    case types.GET_INVSTR_HOT_COLD_WARM_FAILURE:
      return {
        ...state,
        gettingInvHotColdWarm: false,
        gettingInvHotColdWarmError: true,
      };





      case types.GET_ORDER_CLOSED_LIST_REQUEST:
        return { ...state, fetchingOrderClosedList: true };
      case types.GET_ORDER_CLOSED_LIST_SUCCESS:
        return {
          ...state,
          fetchingOrderClosedList: false,
          orderClosedList: action.payload,
        };
      case types.GET_ORDER_CLOSED_LIST_FAILURE:
        return {
          ...state,
          fetchingOrderClosedList: false,
          fetchingOrderClosedListError: true,
        };




      case types.GET_QUOTATION_TABLE_DATA_REQUEST:
      return { ...state, fetchingQuotationTableData: true };
    case types.GET_QUOTATION_TABLE_DATA_SUCCESS:
      return {
        ...state,
        fetchingQuotationTableData: false,
        quotationTableData: action.payload,
      };
    case types.GET_QUOTATION_TABLE_DATA_FAILURE:
      return {
        ...state,
        fetchingQuotationTableData: false,
        fetchingQuotationTableDataError: true,
      };

    case types.GET_DASH_INVESTOR_ADDED_PITCH_REQUEST:
      return { ...state, fetchingdashInvstPitchAdded: true };
    case types.GET_DASH_INVESTOR_ADDED_PITCH_SUCCESS:
      return {
        ...state,
        fetchingdashInvstPitchAdded: false,
        dashInvstPitchAdded: action.payload,
      };
    case types.GET_DASH_INVESTOR_ADDED_PITCH_FAILURE:
      return {
        ...state,
        fetchingdashInvstPitchAdded: false,
        fetchingdashInvstPitchAddedError: true,
      };

    case types.GET_DASH_INVESTOR_ADDED_CONTACTINVEST_REQUEST:
      return { ...state, fetchingdashInvstContactAdded: true };
    case types.GET_DASH_INVESTOR_ADDED_CONTACTINVEST_SUCCESS:
      return {
        ...state,
        fetchingdashInvstContactAdded: false,
        dashInvstContactAdded: action.payload,
      };
    case types.GET_DASH_INVESTOR_ADDED_CONTACTINVEST_FAILURE:
      return {
        ...state,
        fetchingdashInvstContactAdded: false,
        fetchingdashInvstContactAddedError: true,
      };

    case types.HANDLE_LEAD_QUALIFIED_DRAWER:
      return { ...state, openLeadQualified: action.payload };

    case types.GET_LEADS_QUALIFIED_REQUEST:
      return { ...state, fetchingLeadsQualified: true };
    case types.GET_LEADS_QUALIFIED_SUCCESS:
      return {
        ...state,
        fetchingLeadsQualified: false,
        showQualifiedLeads: action.payload,
      };
    case types.GET_LEADS_QUALIFIED_FAILURE:
      return {
        ...state,
        fetchingLeadsQualified: false,
        fetchingLeadsQualifiedError: true,
      };

    case types.HANDLE_LEAD_ADDED_DRAWER:
      return { ...state, openLeadAdded: action.payload };

    case types.GET_LEADS_ADDED_REQUEST:
      return { ...state, fetchingLeadsAdded: true };
    case types.GET_LEADS_ADDED_SUCCESS:
      return {
        ...state,
        fetchingLeadsAdded: false,
        showAddedLeads: action.payload,
      };
    case types.GET_LEADS_ADDED_FAILURE:
      return {
        ...state,
        fetchingLeadsAdded: false,
        fetchingLeadsAddedError: true,
      };

    case types.HANDLE_OPPO_ADDED_DRAWER:
      return { ...state, openOppoAdded: action.payload };

    case types.GET_OPPO_ADDED_REQUEST:
      return { ...state, fetchingOppoAdded: true };
    case types.GET_OPPO_ADDED_SUCCESS:
      return {
        ...state,
        fetchingOppoAdded: false,
        showAddedOppo: action.payload,
      };
    case types.GET_OPPO_ADDED_FAILURE:
      return {
        ...state,
        fetchingOppoAdded: false,
        fetchingOppoAddedError: true,
      };

    case types.HANDLE_OPPO_CLOSED_DRAWER:
      return { ...state, clickOppoClosed: action.payload };

    case types.GET_OPPO_CLOSED_REQUEST:
      return { ...state, fetchingOppoClosed: true };
    case types.GET_OPPO_CLOSED_SUCCESS:
      return {
        ...state,
        fetchingOppoClosed: false,
        showClosedOppo: action.payload,
      };
    case types.GET_OPPO_CLOSED_FAILURE:
      return {
        ...state,
        fetchingOppoClosed: false,
        fetchingOppoClosedError: true,
      };

    case types.HANDLE_PITCH_QUALIFIED_DRAWER:
      return { ...state, openPitchQualified: action.payload };

    case types.GET_PITCH_QUALIFIED_REQUEST:
      return { ...state, fetchingPitchQualified: true };
    case types.GET_PITCH_QUALIFIED_SUCCESS:
      return {
        ...state,
        fetchingPitchQualified: false,
        showQualifiedPitch: action.payload,
      };
    case types.GET_PITCH_QUALIFIED_FAILURE:
      return {
        ...state,
        fetchingPitchQualified: false,
        fetchingPitchQualifiedError: true,
      };




      case types.GET_OPEN_QUOTATION_YEAR_REQUEST:
        return { ...state, fetchingOpenQuotationYear: true };
      case types.GET_OPEN_QUOTATION_YEAR_SUCCESS:
        return {
          ...state,
          fetchingOpenQuotationYear: false,
          openQuotationYear: action.payload,
        };
      case types.GET_OPEN_QUOTATION_YEAR_FAILURE:
        return {
          ...state,
          fetchingOpenQuotationYear: false,
          fetchingOpenQuotationYearError: true,
        };
  

    case types.HANDLE_PITCH_ADDED_DRAWER:
      return { ...state, openPitchAdded: action.payload };

    case types.GET_PITCH_ADDED_REQUEST:
      return { ...state, fetchingPitchAdded: true };
    case types.GET_PITCH_ADDED_SUCCESS:
      return {
        ...state,
        fetchingPitchAdded: false,
        showAddedPitch: action.payload,
      };
    case types.GET_PITCH_ADDED_FAILURE:
      return {
        ...state,
        fetchingPitchAdded: false,
        fetchingPitchAddedError: true,
      };

    case types.HANDLE_DEAL_ADDED_DRAWER:
      return { ...state, openDealAdded: action.payload };

    case types.GET_DEAL_ADDED_REQUEST:
      return { ...state, fetchingDealAdded: true };
    case types.GET_DEAL_ADDED_SUCCESS:
      return {
        ...state,
        fetchingDealAdded: false,
        showAddedDeal: action.payload,
      };
    case types.GET_DEAL_ADDED_FAILURE:
      return {
        ...state,
        fetchingDealAdded: false,
        fetchingDealAddedError: true,
      };

    case types.HANDLE_DEAL_CLOSED_DRAWER:
      return { ...state, openDealClosed: action.payload };

    case types.GET_DEAL_CLOSED_REQUEST:
      return { ...state, fetchingDealClosed: true };
    case types.GET_DEAL_CLOSED_SUCCESS:
      return {
        ...state,
        fetchingDealClosed: false,
        showClosedDeal: action.payload,
      };
    case types.GET_DEAL_CLOSED_FAILURE:
      return {
        ...state,
        fetchingDealClosed: false,
        fetchingDealClosedError: true,
      };




      case types.GET_REPAIR_DASHBOARD_ORDER_CLOSE_REQUEST:
        return { ...state, fetchingRepairDashboardOrderClose: true };
      case types.GET_REPAIR_DASHBOARD_ORDER_CLOSE_SUCCESS:
        return {
          ...state,
          fetchingRepairDashboardOrderClose: false,
          repairDashboardOrderClose:action.payload,
          // opportunityByUserId: action.payload,
  
         // opportunityByUserId: [...state.opportunityByUserId, ...action.payload],
        };
      case types.GET_REPAIR_DASHBOARD_ORDER_CLOSE_FAILURE:
        return {
          ...state,
          fetchingRepairDashboardOrderClose: false,
          fetchingRepairDashboardOrderCloseError: true,
        };


    case types.HANDLE_LEAD_HCW_DRAWER:
      return { ...state, openLeadHCWdrawer: action.payload };

    case types.GET_LEAD_HOTLIST_REQUEST:
      return { ...state, fetchingHottestLeads: true };
    case types.GET_LEAD_HOTLIST_SUCCESS:
      return {
        ...state,
        fetchingHottestLeads: false,
        showHottestLeads: action.payload,
      };
    case types.GET_LEAD_HOTLIST_FAILURE:
      return {
        ...state,
        fetchingHottestLeads: false,
        fetchingHottestLeadsError: true,
      };

    case types.GET_LEAD_COLDLIST_REQUEST:
      return { ...state, fetchingColdestLeads: true };
    case types.GET_LEAD_COLDLIST_SUCCESS:
      return {
        ...state,
        fetchingColdestLeads: false,
        showColdestLeads: action.payload,
      };
    case types.GET_LEAD_COLDLIST_FAILURE:
      return {
        ...state,
        fetchingColdestLeads: false,
        fetchingColdestLeadsError: true,
      };

    case types.GET_LEAD_WARMLIST_REQUEST:
      return { ...state, fetchingWarmedLeads: true };
    case types.GET_LEAD_WARMLIST_SUCCESS:
      return {
        ...state,
        fetchingWarmedLeads: false,
        showWarmedLeads: action.payload,
      };
    case types.GET_LEAD_WARMLIST_FAILURE:
      return {
        ...state,
        fetchingWarmedLeads: false,
        fetchingWarmedLeadsError: true,
      };

    case types.HANDLE_PITCH_HCW_DRAWER:
      return { ...state, openPitchHCWdrawer: action.payload };

    case types.GET_PITCH_HOTLIST_REQUEST:
      return { ...state, fetchingHottestPitch: true };
    case types.GET_PITCH_HOTLIST_SUCCESS:
      return {
        ...state,
        fetchingHottestPitch: false,
        showHottestPitch: action.payload,
      };
    case types.GET_PITCH_HOTLIST_FAILURE:
      return {
        ...state,
        fetchingHottestPitch: false,
        fetchingHottestPitchError: true,
      };

    case types.GET_PITCH_COLDLIST_REQUEST:
      return { ...state, fetchingColdestPitch: true };
    case types.GET_PITCH_COLDLIST_SUCCESS:
      return {
        ...state,
        fetchingColdestPitch: false,
        showColdestPitch: action.payload,
      };
    case types.GET_PITCH_COLDLIST_FAILURE:
      return {
        ...state,
        fetchingColdestPitch: false,
        fetchingColdestPitchError: true,
      };

    case types.GET_PITCH_WARMLIST_REQUEST:
      return { ...state, fetchingWarmedPitch: true };
    case types.GET_PITCH_WARMLIST_SUCCESS:
      return {
        ...state,
        fetchingWarmedPitch: false,
        showWarmedPitch: action.payload,
      };
    case types.GET_PITCH_WARMLIST_FAILURE:
      return {
        ...state,
        fetchingWarmedPitch: false,
        fetchingWarmedPitchError: true,
      };

    case types.HANDLE_TASK_NAME_DRAWER:
      return { ...state, taskNameDrwr: action.payload };

    case types.GET_TASK_NAME_REQUEST:
      return { ...state, fetchingTaskNamedrwr: true };
    case types.GET_TASK_NAME_SUCCESS:
      return {
        ...state,
        fetchingTaskNamedrwr: false,
        taskInameDrwr: action.payload,
      };
    case types.GET_TASK_NAME_FAILURE:
      return {
        ...state,
        fetchingTaskNamedrwr: false,
        fetchingTaskNamedrwrError: true,
      };

    case types.GET_DASHBOARD_COMPLETED_TASK_REQUEST:
      return { ...state, fetchingDashboardCompletedTasks: true };
    case types.GET_DASHBOARD_COMPLETED_TASK_SUCCESS:
      return {
        ...state,
        fetchingDashboardCompletedTasks: false,
        dashbCompletedTasks: action.payload,
      };
    case types.GET_DASHBOARD_COMPLETED_TASK_FAILURE:
      return {
        ...state,
        fetchingDashboardCompletedTasks: false,
        fetchingDashboardCompletedTasksError: true,
      };

    case types.HANDLE_COMPLETED_TASK_TYPE_DRAWER:
      return { ...state, completedtaskDrwr: action.payload };

    case types.GET_COMPLETED_TASK_TYPE_REQUEST:
      return { ...state, fetchingCompletedTaskTypes: true };
    case types.GET_COMPLETED_TASK_TYPE_SUCCESS:
      return {
        ...state,
        fetchingCompletedTaskTypes: false,
        completedtypeTasks: action.payload,
      };
    case types.GET_COMPLETED_TASK_TYPE_FAILURE:
      return {
        ...state,
        fetchingCompletedTaskTypes: false,
        fetchingCompletedTaskTypesError: true,
      };

    case types.GET_JUMPSTART_ORDER_COUNT_REQUEST:
      return { ...state, fetchingJumpOrderCount: true };
    case types.GET_JUMPSTART_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        fetchingJumpOrderCount: false,
        jumstartOrderCount: action.payload,
      };
    case types.GET_JUMPSTART_ORDER_COUNT_FAILURE:
      return {
        ...state,
        fetchingJumpOrderCount: false,
        fetchingJumpOrderCountError: true,
      };

    case types.GET_JUMPSTART_ORDER_DETAIL_REQUEST:
      return { ...state, fetchingorderDetails: true };
    case types.GET_JUMPSTART_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingorderDetails: false,
        orderinDashboard: action.payload,
      };
    case types.GET_JUMPSTART_ORDER_DETAIL_FAILURE:
      return {
        ...state,
        fetchingorderDetails: false,
        fetchingorderDetailsError: true,

      };

      case types.GET_FINACE_ORDER_DETAIL_REQUEST:
      return { ...state, fetchingFinaceorderDetails: true };
    case types.GET_FINACE_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingFinaceorderDetails: false,
        finaceOrderinDashboard: action.payload,
      };
    case types.GET_FINACE_ORDER_DETAIL_FAILURE:
      return {
        ...state,
        fetchingFinaceorderDetails: false,
        fetchingFinaceorderDetailsError: true,

      };

      case types.GET_ENTERPRISE_ORDER_DETAIL_REQUEST:
        return { ...state, fetchingEnterPriseorderDetails: true };
      case types.GET_ENTERPRISE_ORDER_DETAIL_SUCCESS:
        return {
          ...state,
          fetchingEnterPriseorderDetails: false,
          enterpriseOrderinDashboard: action.payload,
        };
      case types.GET_ENTERPRISE_ORDER_DETAIL_FAILURE:
        return {
          ...state,
          fetchingEnterPriseorderDetails: false,
          fetchingEnterPriseorderDetailsError: true,
  
        };

      case types.GET_JUMPSTART_DISTRIBUTOR_DETAIL_REQUEST:
        return { ...state, fetchingdistributorDetails: true };
      case types.GET_JUMPSTART_DISTRIBUTOR_DETAIL_SUCCESS:
        return {
          ...state,
          fetchingdistributorDetails: false,
          distributorinDashboard: action.payload,
        };
      case types.GET_JUMPSTART_DISTRIBUTOR_DETAIL_FAILURE:
        return {
          ...state,
          fetchingdistributorDetails: false,
          fetchingdistributorDetailsError: true,
  
        };



      case types.GET_PROSPECT_DATA_REQUEST:
      return { ...state, fetchingProspectData: true };
    case types.GET_PROSPECT_DATA_SUCCESS:
      return {
        ...state,
        fetchingProspectData: false,
        prospectChart: action.payload,
      };
    case types.GET_PROSPECT_DATA_FAILURE:
      return {
        ...state,
        fetchingProspectData: false,
        fetchingProspectDataError: true,
      };




      case types.GET_PROSPECT_QUOTATION_REQUEST:
        return { ...state, fetchingProspectQuotation: true };
      case types.GET_PROSPECT_QUOTATION_SUCCESS:
        return {
          ...state,
          fetchingProspectQuotation: false,
          prospectQuotation: action.payload,
        };
      case types.GET_PROSPECT_QUOTATION_FAILURE:
        return {
          ...state,
          fetchingProspectQuotation: false,
          fetchingProspectQuotationError: true,
        };


        case types.GET_REGION_RECORDS_REQUEST:
          return { ...state, fetchingRegionRecordsCount: true };
        case types.GET_REGION_RECORDS_SUCCESS:
          return { ...state, fetchingRegionRecordsCount: false, 
            regionRecords: action.payload };
        case types.GET_REGION_RECORDS_FAILURE:
          return {
            ...state,
            fetchingRegionRecordsCount: false,
            fetchingRegionRecordsCountError: true,
          };


          case types.GET_MULTI_ORG_REGION_RECORDS_REQUEST:
            return { ...state, fetchingMultiRegionRecordsCount: true };
          case types.GET_MULTI_ORG_REGION_RECORDS_SUCCESS:
            return { ...state, fetchingMultiRegionRecordsCount: false, 
              multiOrgRecords: action.payload };
          case types.GET_MULTI_ORG_REGION_RECORDS_FAILURE:
            return {
              ...state,
              fetchingMultiRegionRecordsCount: false,
              fetchingMultiRegionRecordsCountError: true,
            };
          case types.GET_DEVELOP_CHART_REQUEST:
            return { ...state, gettingDevelopChart: true };
      
          case types.GET_DEVELOP_CHART_SUCCESS:
            return {
              ...state,
              gettingDevelopChart: false,
              developChart: action.payload,
            };
      
          case types.GET_HOT_COLD_WARM_FAILURE:
            return {
              ...state,
              gettingDevelopChart: false,
              gettingDevelopChartError: true,
            };


            case types.GET_REPAIR_DASHBOARD_ORDER_CANCELLED_REQUEST:
              return { ...state, fetchingRepairDashboardOrderCancelledError: true };
            case types.GET_REPAIR_DASHBOARD_ORDER_CANCELLED_SUCCESS:
              return {
                ...state,
                fetchingRepairDashboardOrderCancelledError: false,
                repairDashboardOrderCancelled:action.payload,
              };
            case types.GET_REPAIR_DASHBOARD_ORDER_CANCELLED_FAILURE:
              return {
                ...state,
                fetchingRepairDashboardOrderCancelled: false,
                fetchingRepairDashboardOrderCancelledError: true,
              };

              case types.GET_DISTRIBUTOR_BY_USERID_REQUEST:
                return { ...state, fetchingDistributorByUserID: true };
              case types.GET_DISTRIBUTOR_BY_USERID_SUCCESS:
                return {
                  ...state,
                  fetchingDistributorByUserID: false,
                  distributorbyUserID:action.payload,
                };
              case types.GET_DISTRIBUTOR_BY_USERID_FAILURE:
                return {
                  ...state,
                  fetchingDistributorByUserID: false,
                  fetchingDistributorByUserIDError: true,
                };  

                case types.GET_SOURCE_COUNT_ACC_REQUEST:
                  return { ...state, fetchingSourceCountAcc: true };
                case types.GET_SOURCE_COUNT_ACC_SUCCESS:
                  return {
                    ...state,
                    fetchingSourceCountAcc: false,
                    sourceCountAcc: action.payload,
                  };
                case types.GET_SOURCE_COUNT_ACC_FAILURE:
                  return {
                    ...state,
                    fetchingSourceCountAcc: false,
                    fetchingSourceCountError: true,
                  };

                  case types.GET_CATEGORY_COUNT_ACC_REQUEST:
                    return { ...state, fetchingCategoryCountAcc: true };
                  case types.GET_CATEGORY_COUNT_ACC_SUCCESS:
                    return {
                      ...state,
                      fetchingCategoryCountAcc: false,
                      categoryCountAcc: action.payload,
                    };
                  case types.GET_CATEGORY_COUNT_ACC_FAILURE:
                    return {
                      ...state,
                      fetchingCategoryCountAcc: false,
                      fetchingCategoryCountError: true,
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
