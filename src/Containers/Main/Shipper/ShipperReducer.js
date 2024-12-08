import * as types from "./ShipperActionType";
import dayjs from "dayjs";

const initialState = {
  dateRangeList: [
    {
      id: 1,
      type: "year",
      value: "FY",
      starter: true,
      isSelected: true,
      startDate: dayjs()
        .startOf("year")
        .toISOString(),
      endDate: dayjs()
        .endOf("year")
        .toISOString(),
    },
    {
      id: 2,
      type: "quarter",
      value: "QTD",
      starter: false,
      isSelected: false,
      startDate: dayjs()
        .startOf("quarter")
        .toISOString(),
      endDate: dayjs()
        .endOf("quarter")
        .toISOString(),
    },
    {
      id: 3,
      type: "month",
      value: "MTD",
      starter: false,
      isSelected: false,
      startDate: dayjs()
        .startOf("month")
        .toISOString(),
      endDate: dayjs()
        .endOf("month")
        .toISOString(),
    },
    {
      id: 4,
      type: "week",
      value: "1W",
      starter: false,
      isSelected: false,
      startDate: dayjs()
        .startOf("week")
        .toISOString(),
      endDate: dayjs()
        .endOf("week")
        .toISOString(),
    },
  ],
  todoDrawerVisible: false,
  timeRangeType: "year",
  isCustomSelected: false,
  startDate: dayjs()
    .startOf("year")
    .toISOString(),
  endDate: dayjs()
    .endOf("year")
    .toISOString(),

  viewType: "table",
  shipperDashboardType: "All",

  addShipperModal: false,
  setEditingShipper: {},

  addingShipper: false,
  addingShipperError: false,

  reInstatedShipperById: false,
  reInstatedShipperByIdError: false,

  fetchingInputShipperData: false,
  fetchingInputShipperDataError: false,
  shipperSerachedData:[],

  fetchingShipperByUserId: false,
  fetchingShipperByUserIdError: false,
  shipperByUserId: [],

  fetchingDeletedShipperRecords: false,
  fetchingDeletedShipperRecordsError: false,
  recordDeletedData:{},


  fetchingCostShipperList:false,
  fetchingCostShipperListError:false,
  costShipperList:[],


  addLinkShipperCostModal:false,

  fetchingAllShipper: false,
  fetchingAllShipperError: false,
  allShipperList: [],


  setEditingOrder: {},
  setEditingOrderDetail: {},


  addingShipperCost:false,
  addingShipperCostError:false,

  updateShipperCost:false,
  updateShipperCostError:false,

  fetchingPaymentHistory: false,
  fetchingPaymentHistoryError: false,
  paymentHistory: [],

  fetchingShipperDetailsByShipperId: false,
  fetchingShipperDetailsByShipperIdError: false,
  shipperDetailsByShipperId: [],

  addPaidButtonModal: false,
  addingPaidByShipperId: false,
  addingPaidByShipperIdError: false,

  addPauseButtonModal: false,
  linkingPauseByShipperId: false,
  linkingPauseByShipperIdError: false,

  clearbitOrder: {},

  addDeleteOrderModal: false,

  deletingShipperOrderData: false,
  deletingShipperOrderDataError: false,

  deletingShipperData: false,
  deletingShipperDataError: false,

  updateShipperModal: false,

  updatingShipperById: false,
  updatingShipperByIdError: false,

  fetchingFeedbackByShipperId: false,
  fetchingFeedbackByShipperIdError: false,
  feedbacks: [],

  fetchingOrderDetailsById: false,
  fetchingOrderDetailsByIdError: false,
  orderByOrderId: [],

  fetchingAwbShipper: false,
  fetchingAwbShipperError: false,
  awbShipper:[],

  feedbackModal: false,

  addShipperOrderModal: false,

  addLinkShipperOrderConfigureModal: false,

  fetchingFeedbackByOrderId: false,
  fetchingFeedbackByOrderIdError: false,
  orderFeedbacks: [],

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  updateShipperById: false,
  updateShipperByIdError: false,

  updateShipperOrderById: false,
  updateShipperOrderByIdError: false,

  fetchingShipperDeletedOrderById: false,
  fetchingShipperDeletedOrderByIdError: false,
  shipperDeletedOrder: [],

  fetchingAllRecords: false,
  fetchingAllRecordsError: false,
  recordAllData: {},

  fetchingDeletedShipper: false,
  fetchingDeletedShipperError: false,
  deletedShipper: [],

  addShipperSubscriptionConfigureModal: false,

  fetchingActivityShipper: false,
  fetchingActivityShipperError: false,
  activityShipper: [],

  addShipperActivityModal: false,

  addingShipperActivityCall: false,
  addingShipperActivityCallError: false,

  addingShipperActivityEvent: false,
  addingShipperActivityEventError: false,

  addingShipperActivityTask: false,
  addingShipperActivityTaskError: false,

  addShipperActivityTableModal: false,
  setEditingShipper: {},

  updateEventModal: false,
  updateCallModal: false,
  updateTaskModal: false,

  addShipperAddressModal:false,

  updatingShipperTaskCall: false,
  updatingShipperTaskCallError: false,

  updatingShipperTaskEvent: false,
  updatingShipperTaskEventError: false,

  updatingShipperTask: false,
  updatingShipperTaskError: false,

  fetchingNotesListByShipperId: false,
  fetchingNotesListByShipperIdError: false,
  notesListByShipperId: [],

  fetchingShipperHistory: false,
  fetchingShipperHistoryError: false,
  shipperHistory: [],

  fetchingOrderHistoryById: false,
  fetchingOrderHistoryByIdError: true,
  orderHistory: [],

  //document
  shipperDocumentUploadModal: false,
  //add document
  addingDocumentByShipperId: false,
  addingDocumentByShipperIdError: false,

  //get document
  fetchingDocumentsByShipperId: false,
  fetchingDocumentsByShipperIdError: false,
  documentsByShipperId: [],

  //ShipperOrder
  fetchingShipperOrder: false,
  fetchingShipperOrderError: false,
  orderForGenerating: [],

  fetchingShipperByShipperId: false,
  fetchingShipperByShipperIdError: false,
  shipperOrder: [],

  fetchingRenewOrderByOrderId: false,
  fetchingRenewOrderByOrderIdError: false,
  RenewOrder: [],

  addRenewalButtonModal: false,
  linkingRenewalByShipperId: false,
  linkingRenewalByShipperIdError: false,

  // get all shipper
  fetchingAllShipperList: false,
  fetchingAllShipperListError: false,
  allShipper: [],

  //ContactShipper
  shipperContactModal: false,

  addingContactShipper: false,
  addingContactShipperError: false,

  // fetchingContactsOfShipper: false,
  // fetchingContactsOfShipperError: false,

  //search dispatch item

  shipperContact: [],

  // //mode of ship
  // fetchingModeOfShip: false,
  // fetchingModeOfShipError: false,
  // modeOfShip: [],
  setEditingShipperContact: {},

  updateShipperContactModal: false,

  updateShipperContactById: false,
  updateShipperContactByIdError: false,
  fetchingShipperDispatch: false,
  fetchingShipperDispatchError: false,
  shipperDispatch: [],

  gettingCountRecordShipper: false,
  gettingCountRecordShipperError: false,
  shippeRecordCount: {},

  fetchingEmployeeAsErp: false,
  fetchingEmployeeAsErpError: false,
  employeeAsErp: [],
};
const newDateRange = (dateRange, newDate) =>
  dateRange.map((range) => {
    if (range.id === newDate.id) {
      return { ...range, isSelected: true };
    } else {
      return { ...range, isSelected: false };
    }
  });

const mergeFiscalAndQuarter = (dateRange, newDate) => {
  return dateRange.map((date) => {
    // let q1s = newDate.metaData.fiscalMapper.q1StartDate;
    // let q1e = newDate.metaData.fiscalMapper.q1EndDate;
    // let q2s = newDate.metaData.fiscalMapper.q2StartDate;
    // let q2e = newDate.metaData.fiscalMapper.q2EndDate;
    // let q3s = newDate.metaData.fiscalMapper.q3StartDate;
    // let q3e = newDate.metaData.fiscalMapper.q3EndDate;
    // let q4s = newDate.metaData.fiscalMapper.q4StartDate;
    // let q4e = newDate.metaData.fiscalMapper.q4EndDate;

    if (date.value === "QTD") {
      return {
        ...date,
        startDate:
          newDate.metaData.fiscalMapper.metaData.currentQuarterStartDate +
          "T00:00:00Z",
        endDate:
          newDate.metaData.fiscalMapper.metaData.currentQuarterEndDate +
          "T00:00:00Z",
      };
    } else if (date.value === "FY") {
      return {
        ...date,
        startDate: newDate.metaData.fiscalMapper.fiscalStartDate,
        endDate: newDate.metaData.fiscalMapper.fiscalEndDate,
      };
    } else {
      return date;
    }
  });
};

export const shipperReducer = (state = initialState, action) => {
  switch (action.type) {
    //set view type
    case types.SET_SHIPPER_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
        shipperDashboardType: "All",
      };

    case types.HANDLE_SHIPPER_MODAL:
      return { ...state, addShipperModal: action.payload };

    /**
     * Add a Shipper
     */
    case types.ADD_SHIPPER_REQUEST:
      return { ...state, addingShipper: true };
    case types.ADD_SHIPPER_SUCCESS:
      return {
        ...state,
        addingShipper: false,
        addShipperModal: false,
        // shipperByUserId: state.shipperByUserId.map((item) => {
        //   if (item.shipperId === action.payload.shipperId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
        shipperByUserId: [action.payload, ...state.shipperByUserId],
      };
    case types.ADD_SHIPPER_FAILURE:
      return {
        ...state,
        addingShipper: false,
        addingShipperError: true,
        addShipperModal: false,
      };

    /**
     * get the list of all SHIPPER
     */
    case types.GET_SHIPPER_BY_USER_ID_REQUEST:
      return { ...state, fetchingShipperByUserId: true };
    case types.GET_SHIPPER_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingShipperByUserId: false,
        shipperByUserId: action.payload,
      };
    case types.GET_SHIPPER_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingShipperByUserId: false,
        fetchingShipperByUserIdError: true,
      };

    case types.GET_SHIPPER_BY_SHIPPER_ID_REQUEST:
      return { ...state, fetchingShipperDetailsByShipperId: true };
    case types.GET_SHIPPER_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        fetchingShipperDetailsByShipperId: false,
        shipperDetailsByShipperId: action.payload,
      };
    case types.GET_SHIPPER_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        fetchingShipperDetailsByShipperId: false,
        fetchingShipperDetailsByShipperIdError: true,
      };

    /**
     * handle order modal
     */
    case types.HANDLE_LINK_ORDER_CONFIGURE_MODAL:
      return {
        ...state,
        addLinkShipperOrderConfigureModal: action.payload,
      };
    /**
     * link product
     */
    case types.LINK_ORDER_BY_SHIPPER_ID_REQUEST:
      return {
        ...state,
        addingOrderByShipperId: true,
      };
    case types.LINK_ORDER_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        addingOrderByShipperId: false,
        addLinkShipperOrderConfigureModal: false,
      };
    case types.LINK_ORDER_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        addingOrderByShipperId: false,
        addingOrderByShipperIdError: true,
        addLinkShipperOrderConfigureModal: false,
      };





      case types.UPDATE_SHIPPER_COST_REQUEST:
        return {
          ...state,
          updateShipperCost: true,
          updateShipperCostError: false,
        };
      case types.UPDATE_SHIPPER_COST_SUCCESS:
        return {
          ...state,
          updateShipperCost: false,
          updateShipperCostError: false,
          costShipperList: state.costShipperList.map((item) => {
            if (item.shippingTransferCostId === action.payload.shippingTransferCostId) {
              return action.payload;
            } else {
              return item;
            }
          })
         // addLinkShipperCostModal: false,
        };
      case types.UPDATE_SHIPPER_COST_FAILURE:
        return {
          ...state,
          updateShipperCost: false,
          updateShipperCostError: true,
          // supplierDocumentUploadModal: false,
        };



    case types.SET_CLEARBIT_ORDER_DATA:
      return { ...state, clearbitOrder: action.payload };

    case types.HANDLE_SHIPPER_ORDER_MODAL:
      return {
        ...state,
        addShipperOrderModal: action.payload,
      };

    case types.UPDATE_SHIPPER_CARD_REQUEST:
      return { ...state, updatingShipperById: true };
    case types.UPDATE_SHIPPER_CARD_SUCCESS:
      return {
        ...state,
        updatingShipperById: false,
        shipperByUserId: action.payload,
      };
    case types.UPDATE_SHIPPER_CARD_FAILURE:
      return {
        ...state,
        updatingShipperById: false,
        updatingShipperByIdError: true,
      };

    case types.SET_SHIPPER_EDIT:
      return { ...state, setEditingShipper: action.payload };

    //GET RECORDS
    case types.GET_RECORDS_REQUEST:
      return { ...state, fetchingRecordsByUserId: true };
    case types.GET_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        recordData: action.payload,
      };
    case types.GET_RECORDS_FAILURE:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        fetchingRecordsByUserIdError: true,
      };

    //GET ALL RECORDS
    case types.GET_ALL_RECORDS_REQUEST:
      return { ...state, fetchingAllRecords: true };
    case types.GET_ALL_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingAllRecords: false,
        recordAllData: action.payload,
      };
    case types.GET_ALL_RECORDS_FAILURE:
      return {
        ...state,
        fetchingAllRecords: false,
        fetchingAllRecordsError: true,
      };


      case types.GET_DELETED_SHIPPER_RECORDS_REQUEST:
        return { ...state, fetchingDeletedShipperRecords: true };
      case types.GET_DELETED_SHIPPER_RECORDS_SUCCESS:
        return {
          ...state,
          fetchingDeletedShipperRecords: false,
          recordDeletedData: action.payload,
        };
      case types.GET_DELETED_SHIPPER_RECORDS_FAILURE:
        return {
          ...state,
          fetchingDeletedShipperRecords: false,
          fetchingDeletedShipperRecordsError: true,
        };

    /**
     * handle order modal
     */
    case types.HANDLE_SHIPPER_ACTIVITY_MODAL:
      return { ...state, addShipperActivityModal: action.payload };

    /**
     * get the list of all activity Shipper
     */
    case types.GET_ACTIVITY_LIST_BY_SHIPPERID_REQUEST:
      return { ...state, fetchingActivityShipper: true };
    case types.GET_ACTIVITY_LIST_BY_SHIPPERID_SUCCESS:
      return {
        ...state,
        fetchingActivityShipper: false,
        activityShipper: action.payload,
      };
    case types.GET_ACTIVITY_LIST_BY_SHIPPERID_FAILURE:
      return {
        ...state,
        fetchingActivityShipper: false,
        fetchingActivityShipperError: true,
      };

    /**
     * add call activity
     */
    case types.ADD_SHIPPER_ACTIVITY_CALL_REQUEST:
      return { ...state, addingShipperActivityCall: true };
    case types.ADD_SHIPPER_ACTIVITY_CALL_SUCCESS:
      return {
        ...state,
        addingShipperActivityCall: false,
        addShipperActivityModal: false,
      };
    case types.ADD_SHIPPER_ACTIVITY_CALL_FAILURE:
      return {
        ...state,
        addingShipperActivityCall: false,
        addingShipperActivityCallError: false,
        addShipperActivityModal: false,
      };

    /**
     * add event activity
     */
    case types.ADD_SHIPPER_ACTIVITY_EVENT_REQUEST:
      return { ...state, addingShipperActivityEvent: true };
    case types.ADD_SHIPPER_ACTIVITY_EVENT_SUCCESS:
      return {
        ...state,
        addingShipperActivityEvent: false,
        addShipperActivityModal: false,
      };
    case types.ADD_SHIPPER_ACTIVITY_EVENT_FAILURE:
      return {
        ...state,
        addingShipperActivityEvent: false,
        addingShipperActivityEventError: false,
        addShipperActivityModal: false,
      };

    /**
     * add task activity
     */
    case types.ADD_SHIPPER_ACTIVITY_TASK_REQUEST:
      return { ...state, addingShipperActivityTask: true };
    case types.ADD_SHIPPER_ACTIVITY_TASK_SUCCESS:
      return {
        ...state,
        addingShipperActivityTask: false,
        addShipperActivityModal: false,
      };
    case types.ADD_SHIPPER_ACTIVITY_TASK_FAILURE:
      return {
        ...state,
        addingShipperActivityTask: false,
        addingShipperActivityTaskError: false,
        addShipperActivityModal: false,
      };
    /**
     * update event modal
     */
    case types.HANDLE_UPDATE_EVENT_MODAL:
      return { ...state, updateEventModal: action.payload };

    /**
     * update call modal
     */
    case types.HANDLE_UPDATE_CALL_MODAL:
      return { ...state, updateCallModal: action.payload };

    /**
     * update task modal
     */
    case types.HANDLE_UPDATE_TASK_MODAL:
      return { ...state, updateTaskModal: action.payload };
    //////
    case types.UPDATE_SHIPPER_CALL_BY_ID_REQUEST:
      return { ...state, updatingShipperCall: true };
    case types.UPDATE_SHIPPER_CALL_BY_ID_SUCCESS:
      return {
        ...state,
        updatingShipperCall: false,
        updateCallModal: false,
        activityShipper: state.activitShipper.map((item) => {
          if (item.callId === action.payload.callId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SHIPPER_CALL_BY_ID_FAILURE:
      return {
        ...state,
        updatingShipperCall: false,
        updatingShipperCallError: true,
      };

    case types.UPDATE_SHIPPER_EVENT_BY_ID_REQUEST:
      return { ...state, updatingShipperEvent: true };
    case types.UPDATE_SHIPPER_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        updatingShipperEvent: false,
        updateEventModal: false,
        activityShipper: state.activityShipper.map((item) => {
          if (item.eventId === action.payload.eventId) return action.payload;
          else {
            return item;
          }
        }),
      };
    case types.UPDATE_SHIPPER_EVENT_BY_ID_FAILURE:
      return {
        ...state,
        updatingShipperEvent: false,
        updatingShipperEventError: true,
      };

    case types.UPDATE_SHIPPER_TASK_BY_ID_REQUEST:
      return { ...state, updatingShipperTask: true };
    case types.UPDATE_SHIPPER_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        updatingShipperTask: false,
        updateTaskModal: false,
        activityShipper: state.activityShipper.map((item) => {
          if (item.taskId === action.payload.taskId) return action.payload;
          else {
            return item;
          }
        }),
      };
    case types.UPDATE_SHIPPER_TASK_BY_ID_FAILURE:
      return {
        ...state,
        updatingShipperTask: false,
        updatingShipperTaskError: true,
      };
    case types.SET_SHIPPER_ORDER_EDIT:
      return { ...state, setEditingOrder: action.payload };

    case types.HANDLE_SHIPPER_ACTIVITY_TABLE_MODAL:
      return {
        ...state,
        addShipperActivityTableModal: action.payload,
      };
    /**
     * get notes list by shipperId
     */
    case types.GET_NOTES_LIST_BY_SHIPPER_ID_REQUEST:
      return { ...state, fetchingNotesListByShipperId: true };
    case types.GET_NOTES_LIST_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByShipperId: false,
        notesListByShipperId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByShipperId: false,
        fetchingNotesListByShipperIdError: true,
      };

    //documentSHIPPER
    case types.HANDLE_SHIPPER_DOCUMENT_UPLOAD_MODAL:
      return { ...state, shipperDocumentUploadModal: action.payload };

    /* add/link shipper document */
    case types.ADD_SHIPPER_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByShipperId: true,
        addingDocumentByShipperIdError: false,
      };
    case types.ADD_SHIPPER_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByShipperId: false,
        addingDocumentByShipperIdError: false,
        shipperDocumentUploadModal: false,
      };
    case types.ADD_SHIPPER_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByShipperId: false,
        addingDocumentByShipperIdError: true,
        shipperDocumentUploadModal: false,
      };
    /**
     * get list of documents of a SHIPPER
     */
    case types.GET_SHIPPER_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByShipperId: true,
      };
    case types.GET_SHIPPER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByShipperId: false,
        documentsByShipperId: action.payload,
      };
    case types.GET_SHIPPER_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByShipperId: false,
        fetchingDocumentsByShipperIdError: true,
      };
    //ShipperOrder
    case types.FETCHING_NEW_SHIPPER_ORDER_REQUEST:
      return {
        ...state,
        fetchingShipperOrder: true,
      };
    case types.FETCHING_NEW_SHIPPER_ORDER_SUCCESS:
      return {
        ...state,
        fetchingShipperOrder: false,
        orderForGenerating: action.payload,
      };
    case types.FETCHING_NEW_SHIPPER_ORDER_FAILURE:
      return {
        ...state,
        fetchingShipperOrder: false,
        fetchingShipperOrderError: true,
      };
    /**
     * get the list of all order Shipper
     */
    case types.GET_SHIPPER_ORDER_BY_SHIPPER_ID_REQUEST:
      return { ...state, fetchingShipperByShipperId: true };
    case types.GET_SHIPPER_ORDER_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        fetchingShipperByShipperId: false,
        shipperOrder: action.payload,
      };
    case types.GET_SHIPPER_ORDER_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        fetchingShipperByShipperId: false,
        fetchingShipperByShipperIdError: true,
      };

    /**
     * SHIPPER Feedback
     */

    case types.GET_FEEDBACK_BY_SHIPPER_ID_REQUEST:
      return { ...state, fetchingFeedbackByShipperId: true };
    case types.GET_FEEDBACK_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        fetchingFeedbackByShipperId: false,
        feedbacks: action.payload,
      };
    case types.GET_FEEDBACK_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        fetchingFeedbackByShipperId: false,
        fetchingFeedbackByShipperIdError: true,
      };

    /**
     * feedback-card modal
     */
    case types.HANDLE_FEEDBACK_MODAL:
      return { ...state, feedbackModal: action.payload };

    /**
     * SHIPPER order Feedback
     */

    case types.GET_FEEDBACK_BY_ORDER_ID_REQUEST:
      return { ...state, fetchingFeedbackByOrderId: true };
    case types.GET_FEEDBACK_BY_ORDER_ID_SUCCESS:
      return {
        ...state,
        fetchingFeedbackByOrderId: false,
        orderFeedbacks: action.payload,
      };
    case types.GET_FEEDBACK_BY_ORDER_ID_FAILURE:
      return {
        ...state,
        fetchingFeedbackByOrderId: false,
        fetchingFeedbackByOrderIdError: true,
      };

    /**
     * update Shipper modal
     */
    case types.HANDLE_UPDATE_SHIPPER_MODAL:
      return { ...state, updateShipperModal: action.payload };

    /**
     * update a single Shipper by its ID
     */
    case types.UPDATE_SHIPPER_BY_ID_REQUEST:
      return { ...state, updateShipperById: true };
    case types.UPDATE_SHIPPER_BY_ID_SUCCESS:
      return {
        ...state,
        updateShipperById: false,
        updateShipperModal: false,
        shipperByUserId: state.shipperByUserId.map((item) => {
          if (item.shipperId == action.payload.shipperId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SHIPPER_BY_ID_FAILURE:
      return {
        ...state,
        updateShipperById: false,
        updateShipperByIdError: true,
      };

    /**
     * update SHIPPER Order modal
     */
    case types.HANDLE_UPDATE_SHIPPER_ORDER_MODAL:
      return { ...state, updateOrderDetailModal: action.payload };

    /**
     * get history of Shipper
     */
    case types.GET_SHIPPER_HISTORY_REQUEST:
      return { ...state, fetchingShipperHistory: true };
    case types.GET_SHIPPER_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingShipperHistory: false,
        shipperHistory: action.payload,
      };
    case types.GET_SHIPPER_HISTORY_FAILURE:
      return {
        ...state,
        fetchingShipperHistory: false,
        fetchingShipperHistoryError: true,
      };

    case types.GET_RENEW_ORDER_REQUEST:
      return { ...state, fetchingRenewOrderByOrderId: true };
    case types.GET_RENEW_ORDER_SUCCESS:
      return {
        ...state,
        fetchingRenewOrderByOrderId: false,
        RenewOrder: action.payload,
      };
    case types.GET_RENEW_ORDER_FAILURE:
      return {
        ...state,
        fetchingRenewOrderByOrderId: false,
        fetchingRenewOrderByOrderIdError: true,
      };

    /**
     * handle subscription modal
     */
    case types.HANDLE_SHIPPER_SUBSCRIPTION_MODAL:
      return {
        ...state,
        addShipperSubscriptionConfigureModal: action.payload,
      };

    /**
     * generate order with subscription
     */

    case types.GENERATE_ORDER_BY_SHIPPER_ID_REQUEST:
      return {
        ...state,
        generatingOrderByShipperId: true,
      };
    case types.GENERATE_ORDER_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        generatingOrderByShipperId: false,
        addShipperSubscriptionConfigureModal: false,
      };
    case types.GENERATE_ORDER_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        generatingOrderByShipperId: false,
        generatingOrderByShipperIdError: true,
        addShipperSubscriptionConfigureModal: false,
      };






      case types.ADD_SHIPPER_COST_REQUEST:
        return {
          ...state,
          addingShipperCost: true,
          addingShipperCostError: false,
        };
      case types.ADD_SHIPPER_COST_SUCCESS:
        return {
          ...state,
          addingShipperCost: false,
          addingShipperCostError: false,
          addLinkShipperCostModal: false,
        };
      case types.ADD_SHIPPER_COST_FAILURE:
        return {
          ...state,
          addingShipperCost: false,
          addingShipperCostError: true,
          // supplierDocumentUploadModal: false,
        };





        case types.GET_COST_SHIPPER_LIST_REQUEST:
          return { ...state, fetchingCostShipperList: true };
        case types.GET_COST_SHIPPER_LIST_SUCCESS:
          return {
            ...state,
            fetchingCostShipperList: false,
            costShipperList: action.payload,
          };
        case types.GET_COST_SHIPPER_LIST_FAILURE:
          return {
            ...state,
            fetchingCostShipperList: false,
            fetchingCostShipperListError: true,
          };

    case types.GET_ORDER_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingOrderDetailsById: true };
    case types.GET_ORDER_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingOrderDetailsById: false,
        orderByOrderId: action.payload,
      };
    case types.GET_ORDER_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingOrderDetailsById: false,
        fetchingOrderDetailsByIdError: true,
      };

    /**get the list of all Shipper*/
    case types.GET_ALL_SHIPPER_LIST_REQUEST:
      return { ...state, fetchingAllShipperList: true };
    case types.GET_ALL_SHIPPER_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllShipperList: false,
        allShipper: action.payload,
      };
    case types.GET_ALL_SHIPPER_LIST_FAILURE:
      return {
        ...state,
        fetchingAllShipperList: false,
        fetchingAllShipperListError: true,
      };


      case types.HANDLE_SHIPPER_COST_MODAL:
        return {
          ...state,
          addLinkShipperCostModal: action.payload,
        };

    /**
     * update product detail modal
     */
    case types.HANDLE_UPDATE_PRODUCT_DETAIL_MODAL:
      return { ...state, updateProductDetailModal: action.payload };

    case types.SET_ORDER_DETAIL_EDIT:
      return { ...state, setEditingOrderDetail: action.payload };

    /**
     * paid modal
     */
    case types.HANDLE_PAID_BUTTON_MODAL:
      return { ...state, addPaidButtonModal: action.payload };

    /**
     * post paid form
     */

    case types.ADD_PAID_BY_SHIPPER_ID_REQUEST:
      return {
        ...state,
        addingPaidByShipperId: true,
      };
    case types.ADD_PAID_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        addingPaidByShipperId: false,
        addPaidButtonModal: false,
      };
    case types.ADD_PAID_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        addingPaidByShipperId: false,
        addingPaidByShipperIdError: true,
        addPaidButtonModal: false,
      };

    /**
     * Pause modal
     */
    case types.HANDLE_PAUSE_BUTTON_MODAL:
      return { ...state, addPauseButtonModal: action.payload };
    /**
     * renewal modal
     */
    case types.HANDLE_RENEWAL_BUTTON_MODAL:
      return { ...state, addRenewalButtonModal: action.payload };

    /**
     * post renwal form
     */

    case types.LINK_RENEWAL_BY_SHIPPER_ID_REQUEST:
      return {
        ...state,
        linkingRenewalByShipperId: true,
      };
    case types.LINK_RENEWAL_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        linkingRenewalByShipperId: false,
        addRenewalButtonModal: false,
        shipperOrder: state.shipperOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_RENEWAL_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        linkingRenewalByShipperId: false,
        linkingRenewalByShipperIdError: true,
        addRenewalButtonModal: false,
      };
    /**
     * post pause form
     */

    case types.LINK_PAUSE_BY_SHIPPER_ID_REQUEST:
      return {
        ...state,
        linkingPauseByShipperId: true,
      };
    case types.LINK_PAUSE_BY_SHIPPER_ID_SUCCESS:
      return {
        ...state,
        linkingPauseByShipperId: false,
        addPauseButtonModal: false,
        shipperOrder: state.shipperOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_PAUSE_BY_SHIPPER_ID_FAILURE:
      return {
        ...state,
        linkingPauseByShipperId: false,
        linkingPauseByShipperIdError: true,
        addPauseButtonModal: false,
      };

    /**
     * get Payment history of Shipper
     */
    case types.FETCHING_SHIPPER_PAYMENT_HISTORY_REQUEST:
      return { ...state, fetchingPaymentHistory: true };
    case types.FETCHING_SHIPPER_PAYMENT_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingPaymentHistory: false,
        paymentHistory: action.payload,
      };
    case types.FETCHING_SHIPPER_PAYMENT_HISTORY_FAILURE:
      return {
        ...state,
        fetchingPaymentHistory: false,
        fetchingPaymentHistoryError: true,
      };
    /**
     * handle delete order modal
     */
    case types.HANDLE_DELETE_ORDER_MODAL:
      return {
        ...state,
        addDeleteOrderModal: action.payload,
      };

    case types.DELETE_SHIPPER_ORDER_DATA_REQUEST:
      return { ...state, deletingShipperOrderData: true };
    case types.DELETE_SHIPPER_ORDER_DATA_SUCCESS:
      return {
        ...state,
        deletingShipperOrderData: false,
        addDeleteOrderModal: false,
        shipperOrder: state.shipperOrder.filter(
          (item) => item.orderId !== action.payload
        ),
      };
    case types.DELETE_SHIPPER_ORDER_DATA_FAILURE:
      return {
        ...state,
        deletingShipperOrderData: false,
        deletingShipperOrderDataError: true,
      };

    case types.FETCHING_SHIPPER_DELETED_ORDER_BY_ID_REQUEST:
      return { ...state, fetchingShipperDeletedOrderById: true };
    case types.FETCHING_SHIPPER_DELETED_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingShipperDeletedDeletedOrderById: false,
        shipperDeletedOrder: action.payload,
      };
    case types.FETCHING_SHIPPER_DELETED_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        fetchingShipperDeletedOrderById: false,
        fetchingShipperDeletedOrderByIdError: true,
      };

    //deleteSHIPPER
    case types.GET_DELETED_SHIPPER_REQUEST:
      return { ...state, fetchingDeletedShipper: true };
    case types.GET_DELETED_SHIPPER_SUCCESS:
      return {
        ...state,
        fetchingDeletedShipper: false,
        deletedShipper: action.payload,
      };
    case types.GET_DELETED_SHIPPER_FAILURE:
      return {
        ...state,
        fetchingDeletedShipper: false,
        fetchingDeletedShipperError: true,
      };

    case types.FETCHING_SHIPPER_ORDER_HISTORY_REQUEST:
      return { ...state, fetchingOrderHistoryById: true };
    case types.FETCHING_SHIPPER_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingOrderHistoryById: false,
        orderHistory: action.payload,
      };
    case types.FETCHING_SHIPPER_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        fetchingOrderHistoryById: false,
        fetchingOrderHistoryByIdError: true,
      };

    case types.INPUT_SEARCH_DATA_REQUEST:
      return { ...state, fetchingInputShipperData: true };
    case types.INPUT_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingInputShipperData: false,
        // shipperByUserId: state.viewType === "all" ? null : action.payload,
        // allShipper: state.viewType === "all" ? action.payload : null,
         shipperSerachedData: action.payload,
      };
    case types.INPUT_SEARCH_DATA_FAILURE:
      return { ...state, fetchingInputShipperDataError: true };

      case types.HANDLE_CLAER_REDUCER_DATA_SHIPPER:
        return { ...state, 
          shipperSerachedData: [], 
        };

    ///DLELTESHHHHH
    case types.DELETE_SHIPPER_DATA_REQUEST:
      return { ...state, deletingShipperData: true };
    case types.DELETE_SHIPPER_DATA_SUCCESS:
      return {
        ...state,
        deletingShipperData: false,
        shipperByUserId: state.shipperByUserId.filter(
          (item) => item.shipperId !== action.payload
        ),
      };
    case types.DELETE_SHIPPER_DATA_FAILURE:
      return {
        ...state,
        deletingShipperData: false,
        deletingShipperDataError: true,
      };




    ///handle contact shipper
    case types.HANDLE_SHIPPER_CONTACT_MODAL:
      return { ...state, shipperContactModal: action.payload };

    /**
     * add  Shipper's contact
     */

    case types.ADD_CONTACT_SHIPPER_REQUEST:
      return { ...state, addingContactShipper: true };
    case types.ADD_CONTACT_SHIPPER_SUCCESS:
      return {
        ...state,
        addingContactShipper: false,
        shipperContactModal: false,
      };
    case types.ADD_CONTACT_SHIPPER_FAILURE:
      return {
        ...state,
        addingContactShipper: false,
        addingContactShipperError: true,
        shipperContactModal: false,
      };

    /**
     * get  Shipper's contact list
     */


    // //get contacts of shipper
    // case types.GET_CONTACTS_OF_SHIPPER_REQUEST:
    //   return { ...state, fetchingContactsOfShipper: true };
    // case types.GET_CONTACTS_OF_SHIPPER_SUCCESS:
    //   return {
    //     ...state,
    //     fetchingContactsOfShipper: false,
    //     shipperContact: action.payload,
    //   };
    // case types.GET_CONTACTS_OF_SHIPPER_FAILURE:
    //   return {
    //     ...state,
    //     fetchingContactsOfShipper: false,
    //     fetchingContactsOfShipperError: true,
    //   };



    // //get mode of ship

    // case types.GET_MODE_OF_SHIP_REQUEST:
    //   return { ...state, fetchingModeOfShip: true };
    // case types.GET_MODE_OF_SHIP_SUCCESS:
    //   return {
    //     ...state,
    //     fetchingModeOfShip: false,
    //     modeOfShip: action.payload,
    //   };
    // case types.GET_MODE_OF_SHIP_FAILURE:
    //   return {
    //     ...state,
    //     fetchingModeOfShip: false,
    //     fetchingModeOfShipError: true,
    //   };
    case types.SET_SHIPPER_CONTACT_EDIT:
      return { ...state, setEditingShipperContact: action.payload };

    case types.HANDLE_UPDATE_SHIPPER_CONTACT_MODAL:
      return { ...state, updateShipperContactModal: action.payload };

    case types.UPDATE_SHIPPER_CONTACT_BY_ID_REQUEST:
      return { ...state, updateShipperContactById: true };
    case types.UPDATE_SHIPPER_CONTACT_BY_ID_SUCCESS:
      return {
        ...state,
        updateShipperContactById: false,
        updateShipperContactModal: false,
        contactShipper: state.contactShipper.map((item) => {
          if (item.contactPersonId == action.payload.contactPersonId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SHIPPER_CONTACT_BY_ID_FAILURE:
      return {
        ...state,
        updateShipperContactById: false,
        updateShipperContactByIdError: true,
        updateShipperContactModal: false,
      };
    /**
     * set Shipper dashboard to ALl or individual
     */
    case types.SET_SHIPPER_DASHBOARD_TYPE:
      console.log(action.payload);
      return { ...state, shipperDashboardType: action.payload };

    case types.CHANGE_SELECTED_TIME_INTERVAL:
      return {
        ...state,
        dateRangeList: newDateRange(state.dateRangeList, action.payload),
        isCustomSelected: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        timeRangeType: action.payload.type,
      };
    case types.SET_TIME_INTERVAL:
      return {
        ...state,
        // dateRangeList: newDateRangeHighlight(
        //   state.dateRangeList,
        //   action.payload
        // ),
        isCustomSelected: true,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };
    case types.SET_FISCAL_TIME_INTERVAL:
      return {
        ...state,
        dateRangeList: mergeFiscalAndQuarter(
          state.dateRangeList,
          action.payload
        ),
        startDate: action.payload.metaData.fiscalMapper.fiscalStartDate,
        endDate: action.payload.metaData.fiscalMapper.fiscalEndDate,
      };

    //getShipperDispatch

    case types.GET_SHIPPER_DISPATCH_REQUEST:
      return { ...state, fetchingShipperDispatch: true };
    case types.GET_SHIPPER_DISPATCH_SUCCESS:
      return {
        ...state,
        fetchingShipperDispatch: false,
        shipperDispatch: action.payload,
      };
    case types.GET_SHIPPER_DISPATCH_FAILURE:
      return {
        ...state,
        fetchingShipperDispatch: false,
        fetchingShipperDispatchError: true,
      };


    //get all shipper
    case types.GET_ALL_SHIPPER_REQUEST:
      return { ...state, fetchingAllShipper: true };
    case types.GET_ALL_SHIPPER_SUCCESS:
      return {
        ...state,
        fetchingAllShipper: false,
        allShipperList: action.payload,
      };
    case types.GET_ALL_SHIPPER_FAILURE:
      return {
        ...state,
        fetchingAllShipper: false,
        fetchingAllShipperError: true,
      };

    case types.GET_SHIPPER_RECORDS_REQUEST:
      return {
        ...state,
        gettingCountRecordShipper: true,
      };
    case types.GET_SHIPPER_RECORDS_SUCCESS:
      return {
        ...state,
        gettingCountRecordShipper: false,
        shippeRecordCount: action.payload,
      };
    case types.GET_SHIPPER_RECORDS_FAILURE:
      return {
        ...state,
        gettingCountRecordShipper: false,
        gettingCountRecordShipperError: true,
      };

    case types.GET_EMPLOYEE_LIST_AS_ERP_REQUEST:
      return { ...state, fetchingEmployeeAsErp: true };
    case types.GET_EMPLOYEE_LIST_AS_ERP_SUCCESS:
      return {
        ...state,
        fetchingEmployeeAsErp: false,
        employeeAsErp: action.payload,
      };
    case types.GET_EMPLOYEE_LIST_AS_ERP_FAILURE:
      return {
        ...state,
        fetchingEmployeeAsErp: false,
        fetchingEmployeeAsErpError: true,
      };


      case types.GET_AWB_LIST_BY_SHIPPERID_REQUEST:
        return { ...state, fetchingAwbShipper: true };
      case types.GET_AWB_LIST_BY_SHIPPERID_SUCCESS:
        return {
          ...state,
          fetchingAwbShipper: false,
          awbShipper: action.payload,
        };
      case types.GET_AWB_LIST_BY_SHIPPERID_FAILURE:
        return {
          ...state,
          fetchingAwbShipper: false,
          fetchingAwbShipperError: true,
        };


        case types.REINSTATE_TOGGLE_FOR_SHIPPER_REQUEST:
          return { ...state, reInstatedShipperById: true };
      case types.REINSTATE_TOGGLE_FOR_SHIPPER_SUCCESS:
          return {
              ...state,
              reInstatedShipperById: false,
              deletedShipper: state.deletedShipper.filter(
                  (item) => item.shipperId !== action.payload
                ),
           
          };
      case types.REINSTATE_TOGGLE_FOR_SHIPPER_FAILURE:
          return {
              ...state,
              reInstatedShipperById: false,
              reInstatedShipperByIdError: true,
          };

          case types.HANDLE_SHIPPER_ADDRESS_MODAL:
            return { ...state, addShipperAddressModal: action.payload };  


    default:
      return state;
  }
};
