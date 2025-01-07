import * as types from "./AccountActionType";

const initialState = {
  viewType: "list",

  clearbit: {},

  addingCODinventory: false, 
  addingCODinventoryError: false,
  codInventryorDr:{},

  fetchingSearchDistributor: false,
            fetchingSearchDistributorError: false,
            searchDistributor:[],

  updateAccountModal: false,

  addAccountAddressModal: false,

  fetchingimeiSearchPhoneData: false,
  fetchingimeiSearchPhoneDataError: false,

  fetchingOrderCustomer: false,
  fetchingOrderCustomerError: false,
  orderCustomerList:[],

  fetchingCoorderByUser: false,
          fetchingCoorderByUserError: false,
  coOrderListByUser: [],

  addingTicket:false,
  addingTicketError:false,

  fetchingPiByItem: false,
  fetchingPiByItemError: false,
  piByItem: [],

  fetchingPiFirststep: false,
  fetchingPiFirststepError: false,
  piFirstStep: [],

  showStatusDrwr: false,

  fetchingPilistByDistributor: false,
  fetchingPilistByDistributorError: false,
  piListByDistributor: [],

  fetchingPilistByOrder: false,
  fetchingPilistByOrderError: false,
  piListByOrder: [],

  piButtonModal: false,

  fetchingInputInvoiceData: false,
  fetchingInputInvoiceDataError: false,
  invoiceSearch: [],

  fetchingInvoiceCount: false,
  fetchingInvoiceCountError: false,
  invoiceCount: {},

  invoiceO: false,

  fetchingGeneratedInvoice: false,
  fetchingGeneratedInvoiceError: false,
  generatedInvoice: [],

  fetchingPaymentClick: false,
  fetchingPaymentClickError: false,
  paymentclick: {},

  fetchingQuatationClick: false,
  fetchingQuatationClickError: false,
  quatationClick: {},

  fetchingQuatationCheckout: false,
  fetchingQuatationCheckoutError: false,
  quatationCheckout: {},

  fetchingQuatationShipping: false,
  fetchingQuatationShippingError: false,
  quatationShipping: {},

  fetchingLoginCount: false,
  fetchingLoginCountError: false,
  loginCount: {},


  fetchingDistributorChartList:false,
  fetchingDistributorChartListError:false,
  distributorChartList:[],

  fetchingInvoiceL: false,
  fetchingInvoiceLError: true,
  invoiceL: [],

  fetchingAccountInvoice: false,
  fetchingAccountInvoiceError: false,
  accountInvoice: [],

  fetchingSpareListByPhoneTaskId: false,
  fetchingSpareListByPhoneTaskIdError: false,
  phoneTaskIdSpareList: [],

  fetchingOrderInvoice: false,
  fetchingOrderInvoiceError: false,

  updatingOrdrSuplrItems: false,
  updatingOrdrSuplrItemsError: false,

  addingAccountImportForm: false,
  addingAccountImportFormError: false,

  updateOrderModal: false,

  addDistributorModal: false,
  setEditingDistributor: {},

  checkingTaskCompletion: false,
  checkingTaskCompletionError: false,

  addingOrder: false,
  addingOrderError: false,
  orderDetailsId: {},

  fetchingOrderRecords: false,
  fetchingOrderRecordsError: false,
  orderRecordData: {},

  fetchingOpportunityUser: false,
  ffetchingOpportunityUserError: false,
  coOppoListByUser:[],

  fetchingProcureRecords: false,
  fetchingProcureRecordsError: false,
  procureRecordData: {},

  updateSuscription: false,
  updateSuscriptionError: false,

  addingDistributor: false,
  addingDistributorError: false,

  fetchingDistributorsByUserId: false,
  fetchingDistributorsByUserIdError: false,
  distributorsByUserId: [],

  fetchingDistributorDetailsByDistributorId: false,
  fetchingDistributorDetailsByDistributorIdError: false,
  distributorDetailsByDistributorId: [],

  addLinkDistributorOrderConfigureModal: false,

  addingOrderByDistributorId: false,
  addingOrderByDistributorIdError: false,

  clearbitOrder: {},

  addInventoryInOrder: false,

  fetchingDistributorOrder: false,
  fetchingDistributorOrderError: false,
  orderForGenerating: [],

  accountOrderProduction: false,

  setEdittingOrder: {},

  invoiceOrders: false,

  addDistributorSubscriptionConfigureModal: false,

  fetchingActivityDistributor: false,
  fetchingActivityDistributorError: false,
  activityDistributor: [],

  fetchingChatgpt: false,
  fetchingChatgptError: false,
  chatGpt: [],

  addDistributorActivityModal: false,

  addingDistributorActivityCall: false,
  addingDistributorActivityCallError: false,



  fetchingTicketList:false,
  fetchingTicketListError:false,
  ticketList:[],

  addingDistributorActivityEvent: false,
  addingDistributorActivityEventError: false,

  addingDistributorActivityTask: false,
  addingDistributorActivityTaskError: false,


  updateAccountUserModal:false,

  fetchingNotesListByDistributorId: false,
  fetchingNotesListByDistributorIdError: false,
  notesListByDistributorId: [],

  fetchingQuotationRepairOrder: false,
  fetchingQuotationRepairOrderError: true,
  quotationRepairOrder: [],

  fetchingBrand: false,
  fetchingBrandError: false,
  brand: [],

  fetchingAllProductList: false,
  fetchingAllProductListError: false,
  allProduct: [],

  generatingOrderByDistributorId: false,
  generatingOrderByDistributorIdError: false,

  fetchingDistributorByDistributorId: false,
  fetchingDistributorByDistributorIdError: false,
  distributorOrder: [],

  addingProductionLocationInOrder: false,
  addingProductionLocationInOrderError: false,

  addRenewalButtonModal: false,

  addOrderDetailsModal: false,

  updateDistributorModal: false,

  linkingRenewalByDistributorId: false,
  linkingRenewalByDistributorIdError: false,

  linkingPauseByDistributorId: false,
  linkingPauseByDistributorIdError: false,

  updateEventModal: false,
  updateCallModal: false,
  updateTaskModal: false,

  fetchingOrderById: false,
  fetchingOrderByIdError: false,
  orderShowById: [],

  fetchingAllDistributorCount: false,
  fetchingAllDistributorCountError: false,
  allDistributorCount: {},

  updateDisributorById: false,
  updateDisributorByIdError: false,

  fetchingInputDistributorData: false,
  fetchingInputDistributorDataError: false,
  distributorSearch: [],

  fetchingOrderDetailsById: false,
  fetchingOrderDetailsByIdError: false,
  orderByOrderId: [],

  fetchingAllDistributors: false,
  fetchingAllDistributorsError: false,
  allDistributors: [],

  addDistributorOrderModal: false,

  addDistributorActivityTableModal: false,

  setEditingOrder: {},

  updatingAccountPrice: false,
  updatingAccountPriceError: false,

  setEdittingProcure: {},

  updateOrderDetailModal: false,

  updateDisributorOrderById: false,
  updateDisributorOrderByIdError: false,

  fetchingProcureDetails: false,
  fetchingProcureDetailsError: false,
  procureDetails: [],

  fetchingOrderHistoryById: false,
  fetchingOrderHistoryByIdError: true,
  orderHistory: [],

  addSupplierTicketModal:false,

  fetchingModel: false,
  fetchingModelError: false.valueOf,
  model: [],

  updatingDistributorById: false,
  updatingDistributorByIdError: false,

  fetchingFeedbackByDistributorId: false,
  fetchingFeedbackByDistributorIdError: false,
  feedbacks: [],

  addingPi: false,
  addingPiError: false,
  piIdFromPreview: null,

  fetchingRecords: false,
  fetchingRecordsError: false,
  accountRecordData: {},

  fetchingDistributorOfHigh: false,
  fetchingDistributorOfHighError: false,
  highDistributorOrder: [],

  accountModal: false,

  addingLocationInOrder: false,
  addingLocationInOrderError: false,

  feedbackModal: false,

  fetchingLobList: false,
  fetchingLobListError: false,
  lobList: [],

  fetchingHighCompleteOrders: false,
  fetchingHighCompleteOrdersError: false,
  highCompleteOrder: [],

  addingOrderProcurement: false,
  addingOrderProcurementError: false,

  fetchingFeedbackByOrderId: false,
  fetchingFeedbackByOrderIdError: false,
  orderFeedbacks: [],

  fetchingProcureStatusItem: false,
  fetchingProcureStatusItemError: false,
  statusItems: {},

  fetchingDistributorHistory: false,
  fetchingDistributorHistoryError: true,
  distributorHistory: [],

  fetchingProductByDistributor: false,
  fetchingProductByDistributorError: false,
  productByDistributor: [],

  addAccountOpportunityModal: false,

  addPaidButtonModal: false,

  addingPaidByDistributorId: false,
  addingPaidByDistributorIdError: false,

  fetchingPaymentHistory: false,
  fetchingPaymentHistoryError: false,
  paymentHistory: [],

  addingQuotationCar: false,
  addingQuotationCarError: false,

  movingToProductionArchieve: false,
  movingToProductionArchieveError: false,

  addCatalogueOrderModal: false,

  generateOrderModal: false,

  updateAccountUserById:false,
  updateAccountUserByIdError:false,

  updatingOrderStep1: false,
  updatingOrderStep1Error: false,

  updatingOfferPriceOfOrder: false,
  updatingOfferPriceOfOrderError: false,

  deletingDistributorData: false,
  deletingDistributorDataError: false,

  updateOrderPaymentAmount: false,
  updateOrderPaymentAmountError: false,

  updatingDistributorCall: false,
  updatingDistributorCallError: false,

  fetchingMediumCompleteOrders: false,
  fetchingMediumCompleteOrdersError: false,
  mediumCompleteOrder: [],

  updateProcureDetailModal: false,

  updatingDistributorEvent: false,
  updatingDistributorEventError: false,

  updatingTicketStage:false,

  updatingDistributorTask: false,
  updatingDistributorTaskError: false,

  fetchingDeletedDistributors: false,
  fetchingDeletedDistributorsError: false,
  deletedDistributors: [],

  convertingQuotationToOrder: false,
  convertingQuotationToOrderError: false,

  fetchingLowCompleteOrders: false,
  fetchingLowCompleteOrdersError: false,
  lowCompleteOrder: [],

  fetchingDistributorOfMedium: false,
  fetchingDistributorOfMediumError: false,
  mediumDistributorOrder: [],

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  fetchingSuborderPhone: false,
  fetchingSuborderPhoneError: false,
  subOrderPhoneList: [],

  showSuborderPhoneList: false,

  fetchingPaymentMode: false,
  fetchingPaymentModeError: false,
  paymentModee: [],

  fetchingDistributorsDeletedOrderById: false,
  fetchingDistributorsDeletedOrderByIdError: false,
  distributorDeletedOrder: [],

  addDeleteOrderModal: false,

  deletingDistributorOrderData: false,
  deletingDistributorOrderDataError: false,

  fetchingAllRecords: false,
  fetchingAllRecordsError: false,
  recordAllData: {},

  addingSpareList: false,
  addingSpareListError: false,

  fetchingSpareListByPhoneId: false,
  fetchingSpareListByPhoneIdError: false,
  spareList: [],

  updateProductDetailModal: false,

  setEditingOrderDetail: {},

  addingNewList: false,
  addingNewListError: false,

  fetchingPhoneListById: false,
  fetchingPhoneListByIdError: false,
  phoneListById: [],

  fetchingDistributorOfLow: false,
  fetchingDistributorOfLowError: false,
  lowDistributorOrder: [],

  //document
  distributorDocumentUploadModal: false,
  //add document
  addingDocumentByDistributorId: false,
  addingDocumentByDistributorIdError: false,

  addingCar: false,
  addingCarError: false,

  addingProcureDetails: false,
  addingProcureDetailsError: false,

  //get document
  fetchingDocumentsByDistributorId: false,
  fetchingDocumentsByDistributorIdError: false,
  documentsByDistributorId: [],

  addingQuotationPhoneDetails: false,
  addingQuotationPhoneDetailsError: false,

  fetchingDocumentsByTable: false,
  fetchingDocumentsByTableError: false,
  documentTable: [],

  fetchingRenewOrderByOrderId: false,
  fetchingRenewOrderByOrderIdError: false,
  RenewOrder: [],

  updatingProcureDetails: false,
  updatingProcureDetailsError: false,

  updatingProcureStep1: false,
  updatingProcureStep1Error: false,

  fetchingOrderProcurement: false,
  fetchingOrderProcurementError: false,
  procurementOrder: [],

  showPulseModal: false,

  addLinkCustomerProcurementModal: false,

  showPaymentListModal: false,

  showRepairReasonModal: false,

  showPaymentHistoryModal: false,

  distributorContactModal: false,

  addingContactDistributor: false,
  addingContactDistributorError: false,

  fetchingQuotationExcelDetails: false,
  fetchingQuotationExcelDetailsError: false,
  quotationPhoneDetails: [],

  fetchingLocationList: false,
  fetchingLocationListError: false,
  locationlist: [],

  addingUnitForCatalogueItem: false,
  addingUnitForCatalogueItemError: false,

  setEditingDistributorContact: {},

  updateDistributorContactModal: false,

  updateDisributorContactById: false,
  updateDisributorContactByIdError: false,

  fetchingQuotationProcureOrder: false,
  fetchingQuotationProcureOrderError: false,
  quotationProcureOrder: [],

  setEditingPayment: {},

  updatePaymentModal: false,

  addAccountImportModal: false,

  updateOrderPayment: false,
  updateOrderPaymentError: false,

  deletingOrderPaymentData: false,
  deletingOrderPaymentDataError: false,

  fetchingRealTimeDistributorPayment: false,
  fetchingRealTimeDistributorPaymentError: false,

  updatingOrderDetails: false,
  updatingOrderDetailsError: false,

  reInstateToggleForOrder: false,
  reInstateToggleForOrderError: false,

  addBillToAddress: false,

  fetchingPulseList: false,
  fetchingPulseListError: false,
  pulseList: [],

  addingQuotationOrder: false,
  addingQuotationOrderError: false,

  fetchingBillingAddressById: false,
  fetchingBillingAddressByIdError: false,
  billAddress: {},

  addingBillingAddress: false,
  addingBillingAddressError: false,

  fetchingChoosenCurrencyId: false,
  fetchingChoosenCurrencyIdError: false,
  orderCurrency: {},

  addingCurrencyForOrder: false,
  addingCurrencyForOrderError: false,

  deletingDistributorById: false,
  deletingDistributorByIdError: false,

  fetchingProductByCurrency: false,
  fetchingProductByCurrencyError: false,
  currencyWiseProduct: [],

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord: [],

  receivingTaskCompletionByDispatch: false,
  receivingTaskCompletionByDispatchError: false,

  fetchingTaggedSuppliesByBrand: false,
  fetchingTaggedSuppliesByBrandError: false,
  spareByBrand: [],

  addProcureDetailsModal: false,

  fetchingDistributorByGroup: false,
  fetchingDistributorByGroupError: false,
  distributorGroup: [],

  generateQuoteInDistributor: false,

  fetchingDistributorQuoteByDistributorId: false,
  fetchingDistributorQuoteByDistributorIdError: false,
  distributorQuote: [],

  fetchingCustomerByUser: false,
  fetchingCustomerByUserError: true,
  customerListByUser: [],

  fetchingSuborderData: false,
  fetchingSuborderDataError: false,
  subOrderByOrderId: [],

  startingQcInStatus: false,
  startingQcInStatusError: false,

  startRepairingInStatus: false,
  startRepairingInStatusError: false,

  fetchingProductionOrderById: false,
  fetchingProductionOrderByIdError: false,
  productionOrder: [],

  fetchingProductionDetailById: false,
  fetchingProductionDetailByIdError: false,
  productionOrderDetail: [],

  addpickupLocation: false,

  fetchingUsersByDepartmentAndLocation: false,
  fetchingUsersByDepartmentAndLocationError: false,
  departmentUser: [],

  productionOrderId: {},

  creatingOrderForProduction: false,
  creatingOrderForProductionError: false,

  addNotesInOrder: false,
  fetchingNotesInOrders: false,
  fetchingNotesInOrdersError: false,
  notesInOrders: [],

  addLeadInOrder: false,

  deletingSpareList: false,
  deletingSpareListError: false,

  fetchingOrderStatus: false,
  fetchingOrderStatusError: false,
  orderStatus: {},

  fetchingProductById: false,
  fetchingProductByIdError: false,
  catalogueById: [],

  addStatusOfOrder: false,
  fetchingPhoNotesOrder: false,
  fetchingPhoNotesOrderError: false,
  phoNotesOrder: [],
  phoNotesOrderModal: false,

  fetchingPhoTasklist: false,
  fetchingPhoTasklist: false,
  phoTasklist: [],

  addingAllProductForOrder: false,
  addingAllProductForOrderError: false,

  orderCartDrawer: false,

  fetchingDispatchItemList: false,
  fetchingDispatchItemListError: true,
  searchedItem: [],

  showProductList: false,
  searchItemsInLocation: false,

  searchingItemInLocation: false,
  searchingItemInLocationError: true,

  updatingSuborderAwb: false,
  updatingSuborderAwbError: false,

  fetchingLocationByOrderId: false,
  fetchingLocationByOrderIdError: false,
  locationByProduct: [],

  fetchingCompleteOrders: false,
  fetchingCompleteOrdersError: true,
  completeOrder: [],

  addingSupervisor: false,
  addingSupervisorError: false,

  addNewModal: false,

  addingLead: false,
  addingLeadError: false,

  deletingProcureData: false,
  deletingProcureDataError: false,

  updatingSpareListItem: false,
  updatingSpareListItemError: false,

  fetchingLocationNamesByProductId: false,
  fetchingLocationNamesByProductIdError: false,
  locationNamesByProductId: [],

  distributorAccountCrediting: false,
  distributorAccountCreditingError: false,
  paidUnpaidToggling: false,
  paidUnpaidTogglingError: false,

  fetchingTimelineStatus: false,
  fetchingTimelineStatusError: false,
  statusActivityTimeline: [],

  fetchingCustomerOrderNo: false,
};


const updatedDragTicket = (item, newProps) => {
  return item.map((opp, index) => {
    console.log("Author7", opp);
    console.log("Author8", newProps);
    if (opp.tckId === newProps.tckId) {
      console.log("inside opp");
      opp.stageId = newProps.stageId;
    }
    return opp;
  });
};

export const distributorReducer = (state = initialState, action) => {
  switch (action.type) {
    //set view type
    case types.SET_DISTRIBUTOR_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.HANDLE_DISTRIBUTOR_MODAL:
      return { ...state, addDistributorModal: action.payload };

    case types.HANDLE_OPENNEW_MODAL:
      return { ...state, addNewModal: action.payload };


      case types.HANDLE_SUPPLIER_TICKET_MODAL:
        return { ...state, addSupplierTicketModal: action.payload };

    case types.HANDLE_ACCOUNT_IMPORT_MODAL:
      return { ...state, addAccountImportModal: action.payload };


      case types.HANDLE_UPDATE_ACCOUNT_USER_MODAL:
        return { ...state, updateAccountUserModal: action.payload };

    /**
     * Add a distributor
     */
    case types.ADD_DISTRIBUTOR_REQUEST:
      return { ...state, addingDistributor: true };
    case types.ADD_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        addingDistributor: false,
        addDistributorModal: false,
        customerListByUser: [action.payload, ...state.customerListByUser],
      };
    case types.ADD_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        addingDistributor: false,
        addingDistributorError: true,
        addDistributorModal: false,
      };

    case types.ADD_PI_REQUEST:
      return { ...state, addingPi: true };
    case types.ADD_PI_SUCCESS:
      return {
        ...state,
        addingPi: false,
        piIdFromPreview: action.payload,
        //addDistributorModal: false,
        //customerListByUser: [action.payload, ...state.customerListByUser]
      };
    case types.ADD_PI_FAILURE:
      return {
        ...state,
        addingPi: false,
        addingPiError: true,
        // addDistributorModal: false,
      };

    case types.EMPTY_DISTRIBUTOR_LIST:
      return {
        ...state,
        allDistributors: [],
        customerListByUser: [],
        distributorOrder: [],
        productionOrder: [],
        contactDistributor: [],
        distributorDetailsByDistributorId: [],
      };

    /**
     * get the list of all distributors
     */
    case types.GET_DISTRIBUTORS_BY_USER_ID_REQUEST:
      return { ...state, fetchingDistributorsByUserId: true };
    case types.GET_DISTRIBUTORS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingDistributorsByUserId: false,
        distributorsByUserId: action.payload,
      };
    case types.GET_DISTRIBUTORS_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingDistributorsByUserId: false,
        fetchingDistributorsByUserIdError: true,
      };

      case types.GET_CUSTOMER_ORDER_REQUEST:
        return { ...state, fetchingOrderCustomer: true };
      case types.GET_CUSTOMER_ORDER_SUCCESS:
        return {
          ...state,
          fetchingOrderCustomer: false,
          orderCustomerList: [...state.orderCustomerList, ...action.payload],
          //  orderCustomerList: action.payload,
        };




        case types.GET_TICKET_LIST_REQUEST:
          return { ...state, fetchingTicketList: true };
        case types.GET_TICKET_LIST_SUCCESS:
          return {
            ...state,
            fetchingTicketList: false,
            ticketList: action.payload,
          };
        case types.GET_TICKET_LIST_FAILURE:
          return {
            ...state,
            fetchingTicketList: false,
            fetchingTicketListError: true,
          };
      case types.GET_CUSTOMER_ORDER_FAILURE:
        return {
          ...state,
          fetchingOrderCustomer: false,
          fetchingOrderCustomerError: true,
        };

    case types.GET_PI_BY_ITEM_REQUEST:
      return { ...state, fetchingPiByItem: true };
    case types.GET_PI_BY_ITEM_SUCCESS:
      return {
        ...state,
        fetchingPiByItem: false,
        piByItem: action.payload,
      };
    case types.GET_PI_BY_ITEM_FAILURE:
      return {
        ...state,
        fetchingPiByItem: false,
        fetchingPiByItemError: true,
      };

    case types.GET_PI_FIRSTSTEP_REQUEST:
      return { ...state, fetchingPiFirststep: true };
    case types.GET_PI_FIRSTSTEP_SUCCESS:
      return {
        ...state,
        fetchingPiFirststep: false,
        piFirstStep: action.payload,
      };
    case types.GET_PI_FIRSTSTEP_FAILURE:
      return {
        ...state,
        fetchingPiFirststep: false,
        fetchingPiFirststepError: true,
      };

    case types.GET_DISTRIBUTOR_BY_DISTRIBUTOR_ID_REQUEST:
      return { ...state, fetchingDistributorDetailsByDistributorId: true };
    case types.GET_DISTRIBUTOR_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        fetchingDistributorDetailsByDistributorId: false,
        distributorDetailsByDistributorId: action.payload,
      };
    case types.GET_DISTRIBUTOR_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        fetchingDistributorDetailsByDistributorId: false,
        fetchingDistributorDetailsByDistributorIdError: true,
      };

    /**
     * handle order modal
     */
    case types.HANDLE_LINK_ORDER_CONFIGURE_MODAL:
      return {
        ...state,
        addLinkDistributorOrderConfigureModal: action.payload,
        orderDetailsId: {},
      };

    case types.HANDLE_LINK_CUSTOMER_PROCUREMENT_MODAL:
      return {
        ...state,
        addLinkCustomerProcurementModal: action.payload,
        // orderDetailsId: {}
      };
    /**
     * link product
     */
    case types.LINK_ORDER_BY_DISTRIBUTOR_ID_REQUEST:
      return {
        ...state,
        addingOrderByDistributorId: true,
      };
    case types.LINK_ORDER_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        addingOrderByDistributorId: false,
        addLinkDistributorOrderConfigureModal: false,
      };
    case types.LINK_ORDER_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        addingOrderByDistributorId: false,
        addingOrderByDistributorIdError: true,
        addLinkDistributorOrderConfigureModal: false,
      };

    case types.SET_CLEARBIT_ORDER_DATA:
      return { ...state, clearbitOrder: action.payload };

    case types.FETCHING_NEW_DISTRIBUTOR_ORDER_REQUEST:
      return {
        ...state,
        fetchingDistributorOrder: true,
      };
    case types.FETCHING_NEW_DISTRIBUTOR_ORDER_SUCCESS:
      return {
        ...state,
        fetchingDistributorOrder: false,
        orderForGenerating: action.payload,
      };
    case types.FETCHING_NEW_DISTRIBUTOR_ORDER_FAILURE:
      return {
        ...state,
        fetchingDistributorOrder: false,
        fetchingDistributorOrderError: true,
      };
    /**
     * handle subscription modal
     */
    case types.HANDLE_DISTRIBUTOR_SUBSCRIPTION_MODAL:
      return {
        ...state,
        addDistributorSubscriptionConfigureModal: action.payload,
      };

    /**
     * get the list of all activity distributors
     */
    case types.GET_ACTIVITY_LIST_BY_DISTRIBUTORID_REQUEST:
      return { ...state, fetchingActivityDistributor: true };
    case types.GET_ACTIVITY_LIST_BY_DISTRIBUTORID_SUCCESS:
      return {
        ...state,
        fetchingActivityDistributor: false,
        activityDistributor: action.payload,
      };
    case types.GET_ACTIVITY_LIST_BY_DISTRIBUTORID_FAILURE:
      return {
        ...state,
        fetchingActivityDistributor: false,
        fetchingActivityDistributorError: true,
      };
    /**
     * handle order modal
     */
    case types.HANDLE_DISTRIBUTOR_ACTIVITY_MODAL:
      return { ...state, addDistributorActivityModal: action.payload };

    /**
     * add call activity
     */
    case types.ADD_DISTRIBUTOR_ACTIVITY_CALL_REQUEST:
      return { ...state, addingDistributorActivityCall: true };
    case types.ADD_DISTRIBUTOR_ACTIVITY_CALL_SUCCESS:
      return {
        ...state,
        addingDistributorActivityCall: false,
        addDistributorActivityModal: false,
      };
    case types.ADD_DISTRIBUTOR_ACTIVITY_CALL_FAILURE:
      return {
        ...state,
        addingDistributorActivityCall: false,
        addingDistributorActivityCallError: false,
        addDistributorActivityModal: false,
      };

    /**
     * add event activity
     */
    case types.ADD_DISTRIBUTOR_ACTIVITY_EVENT_REQUEST:
      return { ...state, addingDistributorActivityEvent: true };
    case types.ADD_DISTRIBUTOR_ACTIVITY_EVENT_SUCCESS:
      return {
        ...state,
        addingDistributorActivityEvent: false,
        addDistributorActivityModal: false,
      };
    case types.ADD_DISTRIBUTOR_ACTIVITY_EVENT_FAILURE:
      return {
        ...state,
        addingDistributorActivityEvent: false,
        addingDistributorActivityEventError: false,
        addDistributorActivityModal: false,
      };

    /**
     * add task activity
     */
    case types.ADD_DISTRIBUTOR_ACTIVITY_TASK_REQUEST:
      return { ...state, addingDistributorActivityTask: true };
    case types.ADD_DISTRIBUTOR_ACTIVITY_TASK_SUCCESS:
      return {
        ...state,
        addingDistributorActivityTask: false,
        addDistributorActivityModal: false,
      };
    case types.ADD_DISTRIBUTOR_ACTIVITY_TASK_FAILURE:
      return {
        ...state,
        addingDistributorActivityTask: false,
        addingDistributorActivityTaskError: false,
        addDistributorActivityModal: false,
      };

    /**
     * get notes list by distributorId
     */
    case types.GET_NOTES_LIST_BY_DISTRIBUTOR_ID_REQUEST:
      return { ...state, fetchingNotesListByDistributorId: true };
    case types.GET_NOTES_LIST_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByDistributorId: false,
        notesListByDistributorId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByDistributorId: false,
        fetchingNotesListByDistributorIdError: true,
      };
    /**
     * generate order with subscription
     */

    case types.GENERATE_ORDER_BY_DISTRIBUTOR_ID_REQUEST:
      return {
        ...state,
        generatingOrderByDistributorId: true,
      };
    case types.GENERATE_ORDER_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        generatingOrderByDistributorId: false,
        addDistributorSubscriptionConfigureModal: false,
      };
    case types.GENERATE_ORDER_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        generatingOrderByDistributorId: false,
        generatingOrderByDistributorIdError: true,
        addDistributorSubscriptionConfigureModal: false,
      };
    /**
     * get the list of all order distributors
     */
    case types.GET_DISTRIBUTOR_ORDER_BY_DISTRIBUTOR_ID_REQUEST:
      return { ...state, fetchingDistributorByDistributorId: true };
    case types.GET_DISTRIBUTOR_ORDER_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        fetchingDistributorByDistributorId: false,
        distributorOrder: [...state.distributorOrder, ...action.payload],
      };
    case types.GET_DISTRIBUTOR_ORDER_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        fetchingDistributorByDistributorId: false,
        fetchingDistributorByDistributorIdError: true,
      };

    case types.GET_DISTRIBUTOR_ORDER_OF_HIGH_REQUEST:
      return { ...state, fetchingDistributorOfHigh: true };
    case types.GET_DISTRIBUTOR_ORDER_OF_HIGH_SUCCESS:
      return {
        ...state,
        fetchingDistributorOfHigh: false,
        highDistributorOrder: [
          ...state.highDistributorOrder,
          ...action.payload,
        ],
      };
    case types.GET_DISTRIBUTOR_ORDER_OF_HIGH_FAILURE:
      return {
        ...state,
        fetchingDistributorOfHigh: false,
        fetchingDistributorOfHighError: true,
      };

    case types.GET_DISTRIBUTOR_ORDER_OF_MEDIUM_REQUEST:
      return { ...state, fetchingDistributorOfMedium: true };
    case types.GET_DISTRIBUTOR_ORDER_OF_MEDIUM_SUCCESS:
      return {
        ...state,
        fetchingDistributorOfMedium: false,
        mediumDistributorOrder: [
          ...state.mediumDistributorOrder,
          ...action.payload,
        ],
      };
    case types.GET_DISTRIBUTOR_ORDER_OF_MEDIUM_FAILURE:
      return {
        ...state,
        fetchingDistributorOfMedium: false,
        fetchingDistributorOfMediumError: true,
      };

    case types.GET_DISTRIBUTOR_ORDER_OF_LOW_REQUEST:
      return { ...state, fetchingDistributorOfLow: true };
    case types.GET_DISTRIBUTOR_ORDER_OF_LOW_SUCCESS:
      return {
        ...state,
        fetchingDistributorOfLow: false,
        lowDistributorOrder: [...state.lowDistributorOrder, ...action.payload],
      };
    case types.GET_DISTRIBUTOR_ORDER_OF_LOW_FAILURE:
      return {
        ...state,
        fetchingDistributorOfLow: false,
        fetchingDistributorOfLowError: true,
      };
    /**
     * renewal modal
     */
    case types.HANDLE_RENEWAL_BUTTON_MODAL:
      return { ...state, addRenewalButtonModal: action.payload };

    /**
     * Pause modal
     */
    case types.HANDLE_PAUSE_BUTTON_MODAL:
      return {
        ...state,
        addOrderDetailsModal: action.payload,
        phoneListById: [],
      };

    /**
     * post renwal form
     */

    case types.LINK_RENEWAL_BY_DISTRIBUTOR_ID_REQUEST:
      return {
        ...state,
        linkingRenewalByDistributorId: true,
      };
    case types.LINK_RENEWAL_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        linkingRenewalByDistributorId: false,
        addRenewalButtonModal: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_RENEWAL_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        linkingRenewalByDistributorId: false,
        linkingRenewalByDistributorIdError: true,
        addRenewalButtonModal: false,
      };

    /**
     * post pause form
     */

    case types.LINK_PAUSE_BY_DISTRIBUTOR_ID_REQUEST:
      return {
        ...state,
        linkingPauseByDistributorId: true,
      };
    case types.LINK_PAUSE_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        linkingPauseByDistributorId: false,
        addOrderDetailsModal: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_PAUSE_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        linkingPauseByDistributorId: false,
        linkingPauseByDistributorIdError: true,
        addOrderDetailsModal: false,
      };
    case types.ADD_ACCOUNT_IMPORT_FORM_REQUEST:
      return { ...state, addingAccountImportForm: true };
    case types.ADD_ACCOUNT_IMPORT_FORM_SUCCESS:
      return {
        ...state,
        addingAccountImportForm: false,
        //addLeadsImportModal: false,
        // organizationDocumentDrawer: false,
        // repositoryData: [
        //   action.payload,
        //   ...state.repositoryData,
        //  ],
      };
    case types.ADD_ACCOUNT_IMPORT_FORM_FAILURE:
      return {
        ...state,
        addingAccountImportForm: false,
        //addingLeadsImportFormError:true,
        // addCustomerModal: false
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

    case types.SET_DISTRIBUTOR_EDIT:
      return { ...state, setEditingDistributor: action.payload };

    case types.SET_ORDER_EDIT:
      return { ...state, setEdittingOrder: action.payload };
    /**
     * update distributor modal
     */
    case types.HANDLE_UPDATE_DISTRIBUTOR_MODAL:
      return { ...state, updateDistributorModal: action.payload };

    /**
     * update a single distributor by its ID
     */
    case types.UPDATE_DISTRIBUTOR_BY_ID_REQUEST:
      return { ...state, updateDisributorById: true };
    case types.UPDATE_DISTRIBUTOR_BY_ID_SUCCESS:
      return {
        ...state,
        updateDisributorById: false,
        updateAccountModal: false,
        customerListByUser: state.customerListByUser.map((item) => {
          if (item.distributorId == action.payload.distributorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        distributorsByUserId: state.distributorsByUserId.map((item) => {
          if (item.distributorId == action.payload.distributorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_DISTRIBUTOR_BY_ID_FAILURE:
      return {
        ...state,
        updateDisributorById: false,
        updateDisributorByIdError: true,
      };
    case types.UPDATE_ORDER_PAYMENT_AMOUNT_REQUEST:
      return { ...state, updateOrderPaymentAmount: true };
    case types.UPDATE_ORDER_PAYMENT_AMOUNT_SUCCESS:
      return {
        ...state,
        updateOrderPaymentAmount: false,
        updateAccountModal: false,
        paymentHistory: state.paymentHistory.map((item) => {
          if (item.paymentId == action.payload.paymentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_ORDER_PAYMENT_AMOUNT_FAILURE:
      return {
        ...state,
        updateOrderPaymentAmount: false,
        updateOrderPaymentAmountError: true,
      };

    case types.GET_ORDER_BY_ID_REQUEST:
      return { ...state, fetchingOrderById: true };
    case types.GET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingOrderById: false,
        orderShowById: [...state.orderShowById, ...action.payload],
      };
    case types.GET_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        fetchingOrderById: false,
        fetchingOrderByIdError: true,
      };

    case types.INPUT_SEARCH_DATA_REQUEST:
      return { ...state, fetchingInputDistributorData: true };
    case types.INPUT_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingInputDistributorData: false,
        customerListByUser: action.payload,
        // allDistributors:action.payload,
        // deletedDistributors:action.payload,
        distributorSearch: action.payload,
        // distributorsByUserId: state.viewType === "all" ? null : action.payload,
        // allDistributors: state.viewType === "all" ? action.payload : null,
        // serachedData: action.payload,
      };
    case types.INPUT_SEARCH_DATA_FAILURE:
      return { ...state, fetchingInputDistributorDataError: true };

    case types.INPUT_SEARCH_INVOICE_REQUEST:
      return { ...state, fetchingInputInvoiceData: true };
    case types.INPUT_SEARCH_INVOICE_SUCCESS:
      return {
        ...state,
        fetchingInputInvoiceData: false,
        invoiceSearch: action.payload,
      };
    case types.INPUT_SEARCH_INVOICE_FAILURE:
      return { ...state, fetchingInputInvoiceDataError: true };

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

    /**get the list of all distributors*/
    case types.GET_ALL_DISTRIBUTORS_LIST_REQUEST:
      return { ...state, fetchingAllDistributors: true };
    case types.GET_ALL_DISTRIBUTORS_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllDistributors: false,
        allDistributors: [...state.allDistributors, ...action.payload],
        clearbit: null,
        // allDistributors: action.payload,
      };
    case types.GET_ALL_DISTRIBUTORS_LIST_FAILURE:
      return {
        ...state,
        fetchingAllDistributors: false,
        fetchingAllDistributorsError: true,
      };

    case types.HANDLE_DISTRIBUTOR_ORDER_MODAL:
      return {
        ...state,
        addDistributorOrderModal: action.payload,
      };

    case types.HANDLE_DISTRIBUTOR_ACTIVITY_TABLE_MODAL:
      return {
        ...state,
        addDistributorActivityTableModal: action.payload,
      };

    case types.SET_DISTRIBUTOR_ORDER_EDIT:
      return { ...state, setEditingOrder: action.payload };
    /**
     * update Order distributor modal
     */
    case types.HANDLE_UPDATE_DISTRIBUTOR_ORDER_MODAL:
      return { ...state, updateOrderDetailModal: action.payload };

    case types.UPDATE_DISTRIBUTOR_ORDER_BY_ID_REQUEST:
      return { ...state, updateDisributorOrderById: true };
    case types.UPDATE_DISTRIBUTOR_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        updateDisributorOrderById: false,
        updateOrderDetailModal: false,
        orderForGenerating: state.orderForGenerating.map((item) => {
          if (item.productId == action.payload.productId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_DISTRIBUTOR_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        updateDisributorOrderById: false,
        updateDisributorOrderByIdError: true,
      };

    case types.UPDATE_SUSCRIPTION_REQUEST:
      return { ...state, updateSuscription: true };
    case types.UPDATE_SUSCRIPTION_SUCCESS:
      return {
        ...state,
        updateSuscription: false,
        //updateOrderDetailModal: false,
        // orderForGenerating: state.orderForGenerating.map((item) => {
        //   if (item.productId == action.payload.productId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };
    case types.UPDATE_SUSCRIPTION_FAILURE:
      return {
        ...state,
        updateSuscription: false,
        updateSuscriptionError: true,
      };

    case types.FETCHING_DISTRIBUTOR_ORDER_HISTORY_REQUEST:
      return { ...state, fetchingOrderHistoryById: true };
    case types.FETCHING_DISTRIBUTOR_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingOrderHistoryById: false,
        orderHistory: action.payload,
      };
    case types.FETCHING_DISTRIBUTOR_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        fetchingOrderHistoryById: false,
        fetchingOrderHistoryByIdError: true,
      };



      case types.ADD_TICKET_REQUEST:
      return { ...state, addingTicket: true };
    case types.ADD_TICKET_SUCCESS:
      return {
        ...state,
        addSupplierTicketModal:false,
       
        ticketList: [action.payload, ...state.ticketList],
        
      };
    case types.ADD_TICKET_FAILURE:
      return { ...state, addingTicket: false, addingTicketError: false };



      case types.UPDATE_TICKET_STAGE_REQUEST:
        return {
          ...state,
          updatingTicketStage: true,
  
          // candidateRequirement: action.payload,
        };
      case types.UPDATE_TICKET_STAGE_SUCCESS:
        return {
          ...state,
          updatingTicketStage: false,
          ticketList: updatedDragTicket(
            state.ticketList,
            action.payload
          ),
          // regionQuotationSalesList: updatedDragQuotation(
          //   state.regionQuotationSalesList,
          //   action.payload
          // ),
          // candidateRequirement: [action.payload]
        };
      case types.UPDATE_TICKET_STAGE_FAILURE:
        return { ...state };


    case types.UPDATE_DISTRIBUTOR_CARD_REQUEST:
      return { ...state, updatingDistributorById: true };
    case types.UPDATE_DISTRIBUTOR_CARD_SUCCESS:
      return {
        ...state,
        updatingDistributorById: false,
        distributorsByUserId: action.payload,
      };
    case types.UPDATE_DISTRIBUTOR_CARD_FAILURE:
      return {
        ...state,
        updatingDistributorById: false,
        updatingDistributorByIdError: true,
      };

    /**
     * Distributor Feedback
     */

    case types.GET_FEEDBACK_BY_DISTRIBUTOR_ID_REQUEST:
      return { ...state, fetchingFeedbackByDistributorId: true };
    case types.GET_FEEDBACK_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        fetchingFeedbackByDistributorId: false,
        feedbacks: action.payload,
      };
    case types.GET_FEEDBACK_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        fetchingFeedbackByDistributorId: false,
        fetchingFeedbackByDistributorIdError: true,
      };

    /**
     * feedback-card modal
     */
    case types.HANDLE_FEEDBACK_MODAL:
      return { ...state, feedbackModal: action.payload };

    /**
     * Distributor order Feedback
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
     * get history of distributor
     */
    case types.GET_DISTRIBUTOR_HISTORY_REQUEST:
      return { ...state, fetchingDistributorHistory: true };
    case types.GET_DISTRIBUTOR_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingDistributorHistory: false,
        distributorHistory: action.payload,
      };
    case types.GET_DISTRIBUTOR_HISTORY_FAILURE:
      return {
        ...state,
        fetchingDistributorHistory: false,
        fetchingDistributorHistoryError: true,
      };
    /**
     * paid modal
     */

    case types.HANDLE_ACCOUNT_UPDATE_MODAL:
      return { ...state, updateAccountModal: action.payload };

    case types.HANDLE_ACCOUNT_MODAL:
      return { ...state, accountModal: action.payload };

    case types.HANDLE_PAID_BUTTON_MODAL:
      return { ...state, addPaidButtonModal: action.payload };

    case types.HANDLE_PI_MODAL:
      return { ...state, piButtonModal: action.payload };

    /**
     * post paid form
     */

    case types.ADD_PAID_BY_DISTRIBUTOR_ID_REQUEST:
      return {
        ...state,
        addingPaidByDistributorId: true,
      };
    case types.ADD_PAID_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        addingPaidByDistributorId: false,
      };
    case types.ADD_PAID_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        addingPaidByDistributorId: false,
        addingPaidByDistributorIdError: true,
      };

    /**
     * get Payment history of distributor
     */
    case types.FETCHING_DISTRIBUTOR_PAYMENT_HISTORY_REQUEST:
      return { ...state, fetchingPaymentHistory: true };
    case types.FETCHING_DISTRIBUTOR_PAYMENT_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingPaymentHistory: false,
        paymentHistory: action.payload,
      };
    case types.FETCHING_DISTRIBUTOR_PAYMENT_HISTORY_FAILURE:
      return {
        ...state,
        fetchingPaymentHistory: false,
        fetchingPaymentHistoryError: true,
      };

    case types.DELETE_DISTRIBUTOR_DATA_REQUEST:
      return { ...state, deletingDistributorData: true };
    case types.DELETE_DISTRIBUTOR_DATA_SUCCESS:
      return {
        ...state,
        deletingDistributorData: false,
        distributorsByUserId: state.distributorsByUserId.filter(
          (item) => item.distributorId !== action.payload
        ),
      };
    case types.DELETE_DISTRIBUTOR_DATA_FAILURE:
      return {
        ...state,
        deletingDistributorData: false,
        deletingDistributorDataError: true,
      };

    case types.UPDATE_DISTRIBUTOR_CALL_BY_ID_REQUEST:
      return { ...state, updatingDistributorCall: true };
    case types.UPDATE_DISTRIBUTOR_CALL_BY_ID_SUCCESS:
      return {
        ...state,
        updatingDistributorCall: false,
        updateCallModal: false,
        activityDistributor: state.activityDistributor.map((item) => {
          if (item.callId === action.payload.callId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_DISTRIBUTOR_CALL_BY_ID_FAILURE:
      return {
        ...state,
        updatingDistributorCall: false,
        updatingDistributorCallError: true,
      };

    case types.UPDATE_DISTRIBUTOR_EVENT_BY_ID_REQUEST:
      return { ...state, updatingDistributorEvent: true };
    case types.UPDATE_DISTRIBUTOR_EVENT_BY_ID_SUCCESS:
      return {
        ...state,
        updatingDistributorEvent: false,
        updateEventModal: false,
        activityDistributor: state.activityDistributor.map((item) => {
          if (item.eventId === action.payload.eventId) return action.payload;
          else {
            return item;
          }
        }),
      };
    case types.UPDATE_DISTRIBUTOR_EVENT_BY_ID_FAILURE:
      return {
        ...state,
        updatingDistributorEvent: false,
        updatingDistributorEventError: true,
      };

    case types.UPDATE_DISTRIBUTOR_TASK_BY_ID_REQUEST:
      return { ...state, updatingDistributorTask: true };
    case types.UPDATE_DISTRIBUTOR_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        updatingDistributorTask: false,
        updateTaskModal: false,
        activityDistributor: state.activityDistributor.map((item) => {
          if (item.taskId === action.payload.taskId) return action.payload;
          else {
            return item;
          }
        }),
      };
    case types.UPDATE_DISTRIBUTOR_TASK_BY_ID_FAILURE:
      return {
        ...state,
        updatingDistributorTask: false,
        updatingDistributorTaskError: true,
      };

    //deleteDISTRIBUTORS

    case types.GET_DELETED_DISTRIBUTORS_REQUEST:
      return { ...state, fetchingDeletedDistributors: true };
    case types.GET_DELETED_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        fetchingDeletedDistributors: false,
        deletedDistributors: action.payload,
      };
    case types.GET_DELETED_DISTRIBUTORS_FAILURE:
      return {
        ...state,
        fetchingDeletedDistributors: false,
        fetchingDeletedDistributorsError: true,
      };

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

    case types.GET_LOCATION_BY_PRODUCTID_REQUEST:
      return { ...state, fetchingLocationByOrderId: true };
    case types.GET_LOCATION_BY_PRODUCTID_SUCCESS:
      return {
        ...state,
        fetchingLocationByOrderId: false,
        locationByProduct: action.payload,
      };
    case types.GET_LOCATION_BY_PRODUCTID_FAILURE:
      return {
        ...state,
        fetchingLocationByOrderId: false,
        fetchingLocationByOrderIdError: true,
      };

    case types.FETCHING_DISTRIBUTOR_DELETED_ORDER_BY_ID_REQUEST:
      return { ...state, fetchingDistributorsDeletedOrderById: true };
    case types.FETCHING_DISTRIBUTOR_DELETED_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingDistributorsDeletedOrderById: false,
        distributorDeletedOrder: action.payload,
      };
    case types.FETCHING_DISTRIBUTOR_DELETED_ORDER_BY_ID_FAILURE:
      return {
        ...state,
        fetchingDistributorsDeletedOrderById: false,
        fetchingDistributorsDeletedOrderByIdError: true,
      };

    /**
     * handle delete order modal
     */
    case types.HANDLE_DELETE_ORDER_MODAL:
      return {
        ...state,
        addDeleteOrderModal: action.payload,
      };

    case types.DELETE_DISTRIBUTOR_ORDER_DATA_REQUEST:
      return { ...state, deletingDistributorOrderData: true };
    case types.DELETE_DISTRIBUTOR_ORDER_DATA_SUCCESS:
      return {
        ...state,
        deletingDistributorOrderData: false,
        addDeleteOrderModal: false,
        distributorOrder: state.distributorOrder.filter(
          (item) => item.orderId !== action.payload
        ),
      };
    case types.DELETE_DISTRIBUTOR_ORDER_DATA_FAILURE:
      return {
        ...state,
        deletingDistributorOrderData: false,
        deletingDistributorOrderDataError: true,
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

    case types.ADD_CAR_REQUEST:
      return { ...state, addingCar: true };
    case types.ADD_CAR_SUCCESS:
      return {
        ...state,
        addingCar: false,
        updateOrderModal: false,
        addAccountOpportunityModal:false,
        addLinkDistributorOrderConfigureModal: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADD_CAR_FAILURE:
      return {
        ...state,
        addingCar: false,
        // addCustomerModal: false
      };

    case types.ADD_PROCURE_DETAILS_REQUEST:
      return { ...state, addingProcureDetails: true };
    case types.ADD_PROCURE_DETAILS_SUCCESS:
      return {
        ...state,
        addingProcureDetails: false,
        // updateOrderModal: false,
        // addLinkDistributorOrderConfigureModal: false,
        // distributorOrder: state.distributorOrder.map((item) => {
        //   if (item.orderId == action.payload.orderId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };
    case types.ADD_PROCURE_DETAILS_FAILURE:
      return {
        ...state,
        addingProcureDetails: false,
        addingProcureDetailsError: true,
        // addCustomerModal: false
      };

    /**
     * update product detail modal
     */
    case types.HANDLE_UPDATE_PRODUCT_DETAIL_MODAL:
      return { ...state, updateProductDetailModal: action.payload };

    case types.SET_ORDER_DETAIL_EDIT:
      return { ...state, setEditingOrderDetail: action.payload };

    //document
    case types.HANDLE_DISTRIBUTOR_DOCUMENT_UPLOAD_MODAL:
      return { ...state, distributorDocumentUploadModal: action.payload };

    /* add/link distributor document */
    case types.ADD_DISTRIBUTOR_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByDistributorId: true,
        addingDocumentByDistributorIdError: false,
      };
    case types.ADD_DISTRIBUTOR_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByDistributorId: false,
        addingDocumentByDistributorIdError: false,
        distributorDocumentUploadModal: false,
      };
    case types.ADD_DISTRIBUTOR_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByDistributorId: false,
        addingDocumentByDistributorIdError: true,
        distributorDocumentUploadModal: false,
      };

    case types.ADD_ORDER_REQUEST:
      return { ...state, addingOrder: true };
    case types.ADD_ORDER_SUCCESS:
      return {
        ...state,
        addingOrder: false,

        // distributorOrder: [action.payload, ...state.distributorOrder],
        highDistributorOrder:
          action.payload.priority === "High"
            ? [action.payload, ...state.highDistributorOrder]
            : state.highDistributorOrder,
        mediumDistributorOrder:
          action.payload.priority === "Medium"
            ? [action.payload, ...state.mediumDistributorOrder]
            : state.mediumDistributorOrder,
        lowDistributorOrder:
          action.payload.priority === "Low"
            ? [action.payload, ...state.lowDistributorOrder]
            : state.lowDistributorOrder,
        // highDistributorOrder: [action.payload, ...state.highDistributorOrder],
        // mediumDistributorOrder: [action.payload, ...state.mediumDistributorOrder],
        // lowDistributorOrder: [action.payload, ...state.lowDistributorOrder],
        orderDetailsId: action.payload,
        // addDriverModal: false,
      };
    case types.ADD_ORDER_FAILURE:
      return {
        ...state,
        addingOrder: false,
        addingOrderError: true,
        // addCustomerModal: false
      };

    case types.ADD_QUOTATION_ORDER_REQUEST:
      return { ...state, addingQuotationOrder: true };
    case types.ADD_QUOTATION_ORDER_SUCCESS:
      return {
        ...state,
        addingQuotationOrder: false,
        quotationRepairOrder:
          action.payload.orderType === "Repair"
            ? [action.payload, ...state.quotationRepairOrder]
            : state.quotationRepairOrder,
        quotationProcureOrder:
          action.payload.orderType === "Procure"
            ? [action.payload, ...state.quotationProcureOrder]
            : state.quotationProcureOrder,
        // quotationRepairOrder: [action.payload, ...state.quotationRepairOrder],
        // quotationProcureOrder: [action.payload, ...state.quotationProcureOrder],
        orderDetailsId: action.payload,
      };
    case types.ADD_QUOTATION_ORDER_FAILURE:
      return {
        ...state,
        addingQuotationOrder: false,
        addingQuotationOrderError: true,
        // addCustomerModal: false
      };
    /**
     * get list of documents of a DISTRIBUTOR
     */
    case types.GET_DISTRIBUTOR_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByDistributorId: true,
      };
    case types.GET_DISTRIBUTOR_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByDistributorId: false,
        documentsByDistributorId: action.payload,
      };
    case types.GET_DISTRIBUTOR_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByDistributorId: false,
        fetchingDocumentsByDistributorIdError: true,
      };

    case types.GET_DISTRIBUTOR_TABLE_REQUEST:
      return {
        ...state,
        fetchingDocumentsByTable: true,
      };
    case types.GET_DISTRIBUTOR_TABLE_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByTable: false,
        documentTable: action.payload,
      };
    case types.GET_DISTRIBUTOR_TABLE_FAILURE:
      return {
        ...state,
        fetchingDocumentsByTable: false,
        fetchingDocumentsByTableError: true,
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

    case types.HANDLE_DISTRIBUTOR_CONTACT_MODAL:
      return { ...state, distributorContactModal: action.payload };

    /**
     * add  distributor's contact
     */

    case types.ADD_CONTACT_DISTRIBUTOR_REQUEST:
      return { ...state, addingContactDistributor: true };
    case types.ADD_CONTACT_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        addingContactDistributor: false,
        distributorContactModal: false,
      };
    case types.ADD_CONTACT_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        addingContactDistributor: false,
        addingContactDistributorError: true,
        distributorContactModal: false,
      };

    case types.START_QC_STATUS_REQUEST:
      return { ...state, startingQcInStatus: true };
    case types.START_QC_STATUS_SUCCESS:
      return {
        ...state,
        startingQcInStatus: false,
        addStatusOfOrder: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.START_QC_STATUS_FAILURE:
      return {
        ...state,
        startingQcInStatus: false,
        startingQcInStatusError: true,
      };

    case types.START_REPAIR_IN_STATUS_REQUEST:
      return { ...state, startRepairingInStatus: true };
    case types.START_REPAIR_IN_STATUS_SUCCESS:
      return {
        ...state,
        startRepairingInStatus: false,
        addStatusOfOrder: false,
        showRepairReasonModal: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.START_REPAIR_IN_STATUS_FAILURE:
      return {
        ...state,
        startRepairingInStatus: false,
        startRepairingInStatusError: true,
      };
    /**
     * get  distributor's contact list
     */

    case types.SET_DISTRIBUTOR_CONTACT_EDIT:
      return { ...state, setEditingDistributorContact: action.payload };

    case types.HANDLE_UPDATE_DISTRIBUTOR_CONTACT_MODAL:
      return { ...state, updateDistributorContactModal: action.payload };

    case types.SET_EDIT_PAYMENT_DATA:
      return { ...state, setEditingPayment: action.payload };

    case types.HANDLE_ORDER_PAYMENT_MODAL:
      return { ...state, updatePaymentModal: action.payload };

    case types.UPDATE_ORDER_PAYMENT_REQUEST:
      return { ...state, updateOrderPayment: true };
    case types.UPDATE_ORDER_PAYMENT_SUCCESS:
      return {
        ...state,
        updateOrderPayment: false,
        updatePaymentModal: false,
        paymentHistory: state.paymentHistory.map((item) => {
          if (item.paymentId === action.payload.paymentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_ORDER_PAYMENT_FAILURE:
      return {
        ...state,
        updateOrderPayment: false,
        updateOrderPaymentError: true,
        updatePaymentModal: false,
      };
    case types.DELETE_ORDER_PAYMENT_DATA_REQUEST:
      return { ...state, deletingOrderPaymentData: true };
    case types.DELETE_ORDER_PAYMENT_DATA_SUCCESS:
      return {
        ...state,
        deletingOrderPaymentData: false,
        paymentHistory: state.paymentHistory.filter(
          (item) => item.paymentId !== action.payload
        ),
      };
    case types.DELETE_ORDER_PAYMENT_DATA_FAILURE:
      return {
        ...state,
        deletingOrderPaymentData: false,
        deletingOrderPaymentDataError: true,
      };

    case types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_REQUEST:
      return { ...state, fetchingRealTimeDistributorPayment: true };
    case types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_SUCCESS:
      return {
        ...state,
        fetchingRealTimeDistributorPayment: false,
        paymentHistory: [action.payload],
        // action.payload,
      };

    case types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_FAILURE:
      return {
        ...state,
        fetchingRealTimeDistributorPayment: false,
        fetchingRealTimeDistributorPaymentError: true,
      };

    case types.UPDATE_ORDER_DETAILS_REQUEST:
      return { ...state, updatingOrderDetails: true };
    case types.UPDATE_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        updatingOrderDetails: false,
        updateProductDetailModal: false,
        orderByOrderId: state.orderByOrderId.map((item) => {
          if (item.productId == action.payload.productId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        updatingOrderDetails: false,
        updatingOrderDetailsError: true,
        updateProductDetailModal: false,
      };

    case types.REINSTATE_TOGGLE_FOR_ORDER_REQUEST:
      return { ...state, reInstateToggleForOrder: true };
    case types.REINSTATE_TOGGLE_FOR_ORDER_SUCCESS:
      return {
        ...state,
        reInstateToggleForOrder: false,
        distributorDeletedOrder: state.distributorDeletedOrder.filter(
          (item) => item.orderId !== action.payload.orderId
        ),
      };
    case types.REINSTATE_TOGGLE_FOR_ORDER_FAILURE:
      return {
        ...state,
        reInstateToggleForOrder: false,
        reInstateToggleForOrderError: true,
      };

    case types.HANDLE_BILLING_ADDRESS_MODAL:
      return { ...state, addBillToAddress: action.payload };

    case types.ADD_BILLING_ADDRESS_DISTRIBUTOR_REQUEST:
      return { ...state, addingBillingAddress: true };
    case types.ADD_BILLING_ADDRESS_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        addingBillingAddress: false,
        // addBillToAddress: false,
      };
    case types.ADD_BILLING_ADDRESS_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        addingBillingAddress: false,
        addingBillingAddressError: true,
        // addBillToAddress: false,
      };

    /**
     * get the list of all distributors
     */
    case types.GET_BILLING_ADDRESS_BY_ID_REQUEST:
      return { ...state, fetchingBillingAddressById: true };
    case types.GET_BILLING_ADDRESS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingBillingAddressById: false,
        billAddress: action.payload,
      };
    case types.GET_BILLING_ADDRESS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingBillingAddressById: false,
        fetchingBillingAddressByIdError: true,
      };

    case types.ADD_CURRENCY_FOR_ORDER_REQUEST:
      return { ...state, addingCurrencyForOrder: true };
    case types.ADD_CURRENCY_FOR_ORDER_SUCCESS:
      return {
        ...state,
        addingCurrencyForOrder: false,
      };
    case types.ADD_CURRENCY_FOR_ORDER_FAILURE:
      return {
        ...state,
        addingCurrencyForOrder: false,
        addingCurrencyForOrderError: true,
      };

    /**
     * get the list of all distributors
     */
    case types.GET_CHOOSEN_CURRENCYID_REQUEST:
      return { ...state, fetchingChoosenCurrencyId: true };
    case types.GET_CHOOSEN_CURRENCYID_SUCCESS:
      return {
        ...state,
        fetchingChoosenCurrencyId: false,
        orderCurrency: action.payload,
      };
    case types.GET_CHOOSEN_CURRENCYID_FAILURE:
      return {
        ...state,
        fetchingChoosenCurrencyId: false,
        fetchingChoosenCurrencyIdError: true,
      };




      case types.GET_DISTRIBUTION_BAR_CHART_REQUEST:
        return { ...state, fetchingDistributorChartList: true };
      case types.GET_DISTRIBUTION_BAR_CHART_SUCCESS:
        return {
          ...state,
          fetchingDistributorChartList: false,
          distributorChartList: action.payload,
  
          //opportunityByUserId: [...state.opportunityByUserId, ...action.payload],
        };
      case types.GET_DISTRIBUTION_BAR_CHART_FAILURE:
        return {
          ...state,
          fetchingDistributorChartList: false,
          fetchingDistributorChartListError: true,
        };

        case types.GET_SEARCH_DISTRIBUTIOR_REQUEST:
          return { ...state, fetchingSearchDistributor: true };
        case types.GET_SEARCH_DISTRIBUTIOR_SUCCESS:
          return {
            ...state,
            fetchingSearchDistributor: false,
            searchDistributor: action.payload,
          };
        case types.GET_SEARCH_DISTRIBUTIOR_FAILURE:
          return {
            ...state,
            fetchingSearchDistributor: false,
            fetchingSearchDistributorError: true,
          };

    case types.GET_PRODUCT_BY_CURRENCY_REQUEST:
      return { ...state, fetchingProductByCurrency: true };
    case types.GET_PRODUCT_BY_CURRENCY_SUCCESS:
      return {
        ...state,
        fetchingProductByCurrency: false,
        currencyWiseProduct: action.payload,
      };
    case types.GET_PRODUCT_BY_CURRENCY_FAILURE:
      return {
        ...state,
        fetchingProductByCurrency: false,
        fetchingProductByCurrencyError: true,
      };

    case types.GET_DISTRIBUTOR_BY_GROUP_REQUEST:
      return { ...state, fetchingDistributorByGroup: true };
    case types.GET_DISTRIBUTOR_BY_GROUP_SUCCESS:
      return {
        ...state,
        fetchingDistributorByGroup: false,
        distributorGroup: action.payload,
      };
    case types.GET_DISTRIBUTOR_BY_GROUP_FAILURE:
      return {
        ...state,
        fetchingDistributorByGroup: false,
        fetchingDistributorByGroupError: true,
      };

    case types.HANDLE_ORDER_PICKUP_MODAL:
      return {
        ...state,
        addpickupLocation: action.payload,
      };

    case types.GET_DISTRIBUTOR_QUOTE_BY_DISTRIBUTOR_ID_REQUEST:
      return { ...state, fetchingDistributorQuoteByDistributorId: true };
    case types.GET_DISTRIBUTOR_QUOTE_BY_DISTRIBUTOR_ID_SUCCESS:
      return {
        ...state,
        fetchingDistributorQuoteByDistributorId: false,
        generateQuoteInDistributor: false,
        distributorQuote: action.payload,
      };
    case types.GET_DISTRIBUTOR_QUOTE_BY_DISTRIBUTOR_ID_FAILURE:
      return {
        ...state,
        fetchingDistributorQuoteByDistributorId: false,
        fetchingDistributorQuoteByDistributorIdError: true,
        generateQuoteInDistributor: false,
      };

    case types.HANDLE_INVENTORY_LOCATION_IN_ORDER_MODAL:
      return { ...state, addInventoryInOrder: action.payload };

    case types.ADD_LOCATION_IN_ORDER_REQUEST:
      return { ...state, addingLocationInOrder: true };
    case types.ADD_LOCATION_IN_ORDER_SUCCESS:
      return {
        ...state,
        addingLocationInOrder: false,
        addpickupLocation: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        highDistributorOrder: state.highDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        lowDistributorOrder: state.lowDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        mediumDistributorOrder: state.mediumDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADD_LOCATION_IN_ORDER_FAILURE:
      return {
        ...state,
        addingLocationInOrder: false,
        addingLocationInOrderError: true,
        addInventoryInOrder: false,
      };

    case types.UPDATE_SUBORDER_AWB_REQUEST:
      return { ...state, updatingSuborderAwb: true };
    case types.UPDATE_SUBORDER_AWB_SUCCESS:
      return {
        ...state,
        updatingSuborderAwb: false,
        subOrderByOrderId: state.subOrderByOrderId.map((item) => {
          if (item.orderPhoneAwbId == action.payload.orderPhoneAwbId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SUBORDER_AWB_FAILURE:
      return {
        ...state,
        updatingSuborderAwb: false,
        updatingSuborderAwbError: true,
      };

    case types.DELETE_DISTRIBUTOR_REQUEST:
      return { ...state, deletingDistributorById: true };
    case types.DELETE_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        deletingDistributorById: false,
        customerListByUser: state.customerListByUser.filter(
          (item) => item.distributorId !== action.payload.distributorId
        ),
      };
    case types.DELETE_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        deletingDistributorById: false,
        deletingDistributorByIdError: true,
      };

    case types.GET_PHONE_LIST_BY_ID_REQUEST:
      return { ...state, fetchingPhoneListById: true };
    case types.GET_PHONE_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingPhoneListById: false,
        phoneListById: [...state.phoneListById, ...action.payload],
      };
    case types.GET_PHONE_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingPhoneListById: false,
        fetchingPhoneListByIdError: true,
      };

    case types.HANDLE_NOTES_MODAL_IN_ORDER:
      return { ...state, addNotesInOrder: action.payload };

    case types.HANDLE_LEAD_MODAL:
      return { ...state, addLeadInOrder: action.payload };

    case types.GET_NOTES_LIST_IN_ORDER_REQUEST:
      return { ...state, fetchingNotesInOrders: true };
    case types.GET_NOTES_LIST_IN_ORDER_SUCCESS:
      return {
        ...state,
        fetchingNotesInOrders: false,
        notesInOrders: action.payload,
      };
    case types.GET_NOTES_LIST_IN_ORDER_FAILURE:
      return {
        ...state,
        fetchingNotesInOrders: false,
        fetchingNotesInOrdersError: true,
      };

    case types.HANDLE_STATUS_OF_ORDER_MODAL:
      return { ...state, addStatusOfOrder: action.payload };

    case types.GET_ORDER_PHONE_NOTE_REQUEST:
      return { ...state, fetchingPhoNotesOrder: true };
    case types.GET_ORDER_PHONE_NOTE_SUCCESS:
      return {
        ...state,
        fetchingPhoNotesOrder: false,
        phoNotesOrder: action.payload,
      };
    case types.GET_ORDER_PHONE_NOTE_FAILURE:
      return {
        ...state,
        fetchingPhoNotesOrder: false,
        fetchingPhoNotesOrderError: true,
      };

    case types.HANDLE_PHONE_NOTES_ORDER_MODAL:
      return { ...state, phoNotesOrderModal: action.payload };

    case types.GET_PHONE_TASK_LIST_REQUEST:
      return { ...state, fetchingPhoTasklist: true };
    case types.GET_PHONE_TASK_LIST_SUCCESS:
      return {
        ...state,
        fetchingPhoTasklist: false,
        phoTasklist: action.payload,
      };
    case types.GET_PHONE_TASK_LIST_FAILURE:
      return {
        ...state,
        fetchingPhoTasklist: false,
        fetchingPhoTasklistError: true,
      };

    case types.ADD_SPARE_LIST_REQUEST:
      return { ...state, addingSpareList: true };
    case types.ADD_SPARE_LIST_SUCCESS:
      return {
        ...state,
        addingSpareList: false,
      };
    case types.ADD_SPARE_LIST_FAILURE:
      return {
        ...state,
        addingSpareList: false,
        addingSpareListError: true,
      };

    case types.GET_SPARE_LIST_BY_PHONEID_REQUEST:
      return { ...state, fetchingSpareListByPhoneId: true };
    case types.GET_SPARE_LIST_BY_PHONEID_SUCCESS:
      return {
        ...state,
        fetchingSpareListByPhoneId: false,
        spareList: action.payload,
      };
    case types.GET_SPARE_LIST_BY_PHONEID_FAILURE:
      return {
        ...state,
        fetchingSpareListByPhoneId: false,
        fetchingSpareListByPhoneIdError: true,
      };

    case types.GET_SPARE_LIST_BY_PHONETASKID_REQUEST:
      return { ...state, fetchingSpareListByPhoneTaskId: true };
    case types.GET_SPARE_LIST_BY_PHONETASKID_SUCCESS:
      return {
        ...state,
        fetchingSpareListByPhoneTaskId: false,
        phoneTaskIdSpareList: action.payload,
      };
    case types.GET_SPARE_LIST_BY_PHONETASKID_FAILURE:
      return {
        ...state,
        fetchingSpareListByPhoneTaskId: false,
        fetchingSpareListByPhoneTaskIdError: true,
      };

    case types.GET_SUBORDER_DATA_REQUEST:
      return { ...state, fetchingSuborderData: true };
    case types.GET_SUBORDER_DATA_SUCCESS:
      return {
        ...state,
        fetchingSuborderData: false,
        subOrderByOrderId: action.payload,
      };
    case types.GET_SUBORDER_DATA_FAILURE:
      return {
        ...state,
        fetchingSuborderData: false,
        fetchingSuborderDataError: true,
      };

    case types.UPDATE_OFFER_PRICE_REQUEST:
      return { ...state, updatingOfferPriceOfOrder: true };
    case types.UPDATE_OFFER_PRICE_SUCCESS:
      return {
        ...state,
        updatingOfferPriceOfOrder: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        highDistributorOrder: state.highDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        mediumDistributorOrder: state.mediumDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        lowDistributorOrder: state.lowDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        highCompleteOrder: state.highCompleteOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        mediumCompleteOrder: state.mediumCompleteOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        lowCompleteOrder: state.lowCompleteOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_OFFER_PRICE_FAILURE:
      return {
        ...state,
        updatingOfferPriceOfOrder: false,
        updatingOfferPriceOfOrderError: true,
      };

    case types.UPDATE_ACCOUNT_PRICE_REQUEST:
      return { ...state, updatingAccountPrice: true };
    case types.UPDATE_ACCOUNT_PRICE_SUCCESS:
      return {
        ...state,
        updatingAccountPrice: false,
        customerListByUser: state.customerListByUser.map((item) => {
          if (item.distributorId == action.payload.distributorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_ACCOUNT_PRICE_FAILURE:
      return {
        ...state,
        updatingAccountPrice: false,
        updatingAccountPriceError: true,
      };

    case types.CHECK_TASK_COMPLETION_REQUEST:
      return { ...state, checkingTaskCompletion: true };
    case types.CHECK_TASK_COMPLETION_SUCCESS:
      return {
        ...state,
        checkingTaskCompletion: false,
      };
    case types.CHECK_TASK_COMPLETION_FAILURE:
      return {
        ...state,
        checkingTaskCompletion: false,
        checkingTaskCompletionError: true,
      };

    case types.GET_TAGGED_SUPPLIES_BYBRAND_REQUEST:
      return { ...state, fetchingTaggedSuppliesByBrand: true };
    case types.GET_TAGGED_SUPPLIES_BYBRAND_SUCCESS:
      return {
        ...state,
        fetchingTaggedSuppliesByBrand: false,
        spareByBrand: action.payload,
      };
    case types.GET_TAGGED_SUPPLIES_BYBRAND_FAILURE:
      return {
        ...state,
        fetchingTaggedSuppliesByBrand: false,
        fetchingTaggedSuppliesByBrandError: true,
      };

    case types.RECEIVE_TASK_BY_DISPATCH_REQUEST:
      return { ...state, receivingTaskCompletionByDispatch: true };
    case types.RECEIVE_TASK_BY_DISPATCH_SUCCESS:
      return {
        ...state,
        receivingTaskCompletionByDispatch: false,
      };
    case types.RECEIVE_TASK_BY_DISPATCH_FAILURE:
      return {
        ...state,
        receivingTaskCompletionByDispatch: false,
        receivingTaskCompletionByDispatchError: true,
      };

    case types.HANDLE_ORDER_CART_MODAL:
      return { ...state, orderCartDrawer: action.payload };

    case types.GET_LOCATION_LIST_REQUEST:
      return { ...state, fetchingLocationList: true };
    case types.GET_LOCATION_LIST_SUCCESS:
      return {
        ...state,
        fetchingLocationList: false,
        locationlist: action.payload,
      };
    case types.GET_LOCATION_LIST_FAILURE:
      return {
        ...state,
        fetchingLocationList: false,
        fetchingLocationListError: true,
      };

    case types.SET_CLEARBIT_DATA:
      return { ...state, clearbit: action.payload };

    case types.GET_ACCOUNT_RECORDS_REQUEST:
      return { ...state, fetchingRecords: true };
    case types.GET_ACCOUNT_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingRecords: false,
        accountRecordData: action.payload,
      };
    case types.GET_ACCOUNT_RECORDS_FAILURE:
      return {
        ...state,
        fetchingRecords: false,
        fetchingRecordsError: true,
      };

    case types.GET_ORDER_RECORDS_REQUEST:
      return { ...state, fetchingOrderRecords: true };
    case types.GET_ORDER_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingOrderRecords: false,
        orderRecordData: action.payload,
      };
    case types.GET_ORDER_RECORDS_FAILURE:
      return {
        ...state,
        fetchingOrderRecords: false,
        fetchingOrderRecordsError: true,
      };

    case types.GET_PROCURE_RECORDS_REQUEST:
      return { ...state, fetchingProcureRecords: true };
    case types.GET_PROCURE_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingProcureRecords: false,
        procureRecordData: action.payload,
      };
    case types.GET_PROCURE_RECORDS_FAILURE:
      return {
        ...state,
        fetchingProcureRecords: false,
        fetchingProcureRecordsError: true,
      };

    case types.HANDLE_REPAIR_REASON_MODAL:
      return { ...state, showRepairReasonModal: action.payload };

    case types.HANDLE_PAYMENT_HISTORY_MODAL:
      return { ...state, showPaymentHistoryModal: action.payload };

    case types.GET_DISTRIBUTOR_COUNT_REQUEST:
      return { ...state, fetchingAllDistributorCount: true };
    case types.GET_DISTRIBUTOR_COUNT_SUCCESS:
      return {
        ...state,
        fetchingAllDistributorCount: false,
        allDistributorCount: action.payload,
      };
    case types.GET_DISTRIBUTOR_COUNT_FAILURE:
      return {
        ...state,
        fetchingAllDistributorCount: false,
        fetchingAllDistributorCountError: true,
      };

    case types.GET_OPPORTUNITY_RECORD_REQUEST:
      return { ...state, fetchingOpportunityRecord: true };
    case types.GET_OPPORTUNITY_RECORD_SUCCESS:
      return {
        ...state,
        fetchingOpportunityRecord: false,
        opportunityRecord: action.payload,
      };
    case types.GET_OPPORTUNITY_RECORD_FAILURE:
      return {
        ...state,
        fetchingOpportunityRecord: false,
        fetchingOpportunityRecordError: true,
      };
    case types.HANDLE_ADD_ORDER_MODAL:
      return {
        ...state,
        addCatalogueOrderModal: action.payload,
        productByDistributor: [],
        productionOrderId: {},
      };

    case types.HANDLE_UPDATE_ORDER_MODAL:
      return { ...state, updateOrderModal: action.payload };

    case types.HANDLE_ORDER_GENERATE_MODAL:
      return { ...state, generateOrderModal: action.payload };

    case types.GET_ALL_PRODUCT_LIST_REQUEST:
      return { ...state, fetchingAllProductList: true };
    case types.GET_ALL_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllProductList: false,
        allProduct: action.payload,
      };
    case types.GET_ALL_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        fetchingAllProductList: false,
        fetchingAllProductListError: true,
      };

    case types.SAVE_UNIT_FOR_CATALOGUE_ITEM_REQUEST:
      return { ...state, addingUnitForCatalogueItem: true };
    case types.SAVE_UNIT_FOR_CATALOGUE_ITEM_SUCCESS:
      return {
        ...state,
        addingUnitForCatalogueItem: false,
        productByDistributor: state.productByDistributor.map((item) => {
          if (item.productId == action.payload.productId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.SAVE_UNIT_FOR_CATALOGUE_ITEM_FAILURE:
      return {
        ...state,
        addingUnitForCatalogueItem: false,
        addingUnitForCatalogueItemError: true,
      };

    case types.GET_PRODUCT_BY_DISTRIBUTOR_REQUEST:
      return { ...state, fetchingProductByDistributor: true };
    case types.GET_PRODUCT_BY_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        fetchingProductByDistributor: false,
        productByDistributor: action.payload,
      };
    case types.GET_PRODUCT_BY_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        fetchingProductByDistributor: false,
        fetchingProductByDistributorError: true,
      };

    case types.ADD_ALL_PRODUCT_FOR_ORDER_REQUEST:
      return { ...state, addingAllProductForOrder: true };
    case types.ADD_ALL_PRODUCT_FOR_ORDER_SUCCESS:
      return {
        ...state,
        addingAllProductForOrder: false,
        addCatalogueOrderModal: false,
        productionOrder: state.productionOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADD_ALL_PRODUCT_FOR_ORDER_FAILURE:
      return {
        ...state,
        addingAllProductForOrder: false,
        addingAllProductForOrderError: true,
      };

    case types.HANDLE_ACCOUNT_PRODUCTION_MODAL:
      return { ...state, accountOrderProduction: action.payload };

    case types.ADD_PRODUCTION_LOCATION_IN_ORDER_REQUEST:
      return { ...state, addingProductionLocationInOrder: true };
    case types.ADD_PRODUCTION_LOCATION_IN_ORDER_SUCCESS:
      return {
        ...state,
        addingProductionLocationInOrder: false,
        accountOrderProduction: false,
        distributorOrder: [action.payload, ...state.distributorOrder],
      };
    case types.ADD_PRODUCTION_LOCATION_IN_ORDER_FAILURE:
      return {
        ...state,
        addingProductionLocationInOrder: false,
        addingProductionLocationInOrderError: true,
        accountOrderProduction: false,
      };




      case types.UPDATE_ACCOUNT_USER_REQUEST:
        return { ...state, updateAccountUserById: true };
      case types.UPDATE_ACCOUNT_USER_SUCCESS:
        return {
          ...state,
          updateAccountUserById: false,
          updateAccountUserModal: false,
          allDistributors: state.allDistributors.map((item) => {
            if (item.distributorId === action.payload.distributorId) {
              return action.payload;
            } else {
              return item;
            }
          }),



         
        };
      case types.UPDATE_ACCOUNT_USER_FAILURE:
        return {
          ...state,
          updateAccountUserById: false,
          updateAccountUserByIdError: true,
        };

    case types.GET_PAYMENT_MODE_REQUEST:
      return { ...state, fetchingPaymentMode: true };
    case types.GET_PAYMENT_MODE_SUCCESS:
      return {
        ...state,
        fetchingPaymentMode: false,
        paymentModee: action.payload,
      };
    case types.GET_PAYMENT_MODE_FAILURE:
      return {
        ...state,
        fetchingPaymentMode: false,
        fetchingPaymentModeError: true,
      };

    case types.GET_DISTRIBUTORS_BY_USER_ID_REQUEST:
      return { ...state, fetchingProductById: true };
    case types.GET_DISTRIBUTORS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingProductById: false,
        catalogueById: action.payload,
      };
    case types.GET_DISTRIBUTORS_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingProductById: false,
        fetchingProductByIdError: true,
      };

    case types.UPDATE_ORDER_STEP1_REQUEST:
      return { ...state, updatingOrderStep1: true };
    case types.UPDATE_ORDER_STEP1_SUCCESS:
      return {
        ...state,
        updatingOrderStep1: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_ORDER_STEP1_FAILURE:
      return {
        ...state,
        updatingOrderStep1: false,
        updatingOrderStep1Error: true,
      };

    case types.REMOVE_ORDER_ACC_REQUEST:
      return { ...state, removingOrderAcc: true };
    case types.REMOVE_ORDER_ACC_SUCCESS:
      return {
        ...state,
        removingOrderAcc: false,
        highDistributorOrder: state.highDistributorOrder.map((item) => {
          if (item.orderPhoneId == action.payload.orderPhoneId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        mediumDistributorOrder: state.mediumDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        lowDistributorOrder: state.lowDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        // highDistributorOrder: state.highDistributorOrder.filter(
        //   (item) => item.orderId !== action.payload.orderId
        // ),
        // mediumDistributorOrder: state.mediumDistributorOrder.filter(
        //   (item) => item.orderId !== action.payload.orderId
        // ),
        // lowDistributorOrder: state.lowDistributorOrder.filter(
        //   (item) => item.orderId !== action.payload.orderId
        // ),
      };
    case types.REMOVE_ORDER_ACC_FAILURE:
      return {
        ...state,
        removingOrderAcc: false,
        removingOrderAccError: true,
      };

    case types.HANDLE_PRODUCT_ORDER_DETAIL_MODAL:
      return { ...state, showProductList: action.payload };

    case types.HANDLE_SEARCH_ITEMS_MODAL:
      return {
        ...state,
        searchItemsInLocation: action.payload,
        searchedItem: [],
      };

    case types.CREATE_ORDER_FOR_PRODUCTION_REQUEST:
      return { ...state, creatingOrderForProduction: true };
    case types.CREATE_ORDER_FOR_PRODUCTION_SUCCESS:
      return {
        ...state,
        creatingOrderForProduction: false,
        productionOrder: [action.payload, ...state.productionOrder],
        // orderDetailsId: action.payload
        productionOrderId: action.payload,
      };
    case types.CREATE_ORDER_FOR_PRODUCTION_FAILURE:
      return {
        ...state,
        creatingOrderForProduction: false,
        creatingOrderForProductionError: true,
      };

    case types.GET_PRODUCTION_ORDER_REQUEST:
      return { ...state, fetchingProductionOrderById: true };
    case types.GET_PRODUCTION_ORDER_SUCCESS:
      return {
        ...state,
        fetchingProductionOrderById: false,
        productionOrder: action.payload,
      };
    case types.GET_PRODUCTION_ORDER_FAILURE:
      return {
        ...state,
        fetchingProductionOrderById: false,
        fetchingProductionOrderByIdError: true,
      };

    case types.GET_PRODUCTION_ORDER_DETAIL_REQUEST:
      return { ...state, fetchingProductionDetailById: true };
    case types.GET_PRODUCTION_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        fetchingProductionDetailById: false,
        productionOrderDetail: action.payload,
      };
    case types.GET_PRODUCTION_ORDER_DETAIL_FAILURE:
      return {
        ...state,
        fetchingProductionDetailById: false,
        fetchingProductionDetailByIdError: true,
      };

    case types.GET_USERS_BY_DEPARTMENT_LOCATION_REQUEST:
      return { ...state, fetchingUsersByDepartmentAndLocation: true };
    case types.GET_USERS_BY_DEPARTMENT_LOCATION_SUCCESS:
      return {
        ...state,
        fetchingUsersByDepartmentAndLocation: false,
        departmentUser: action.payload,
      };
    case types.GET_USERS_BY_DEPARTMENT_LOCATION_FAILURE:
      return {
        ...state,
        fetchingUsersByDepartmentAndLocation: false,
        fetchingUsersByDepartmentAndLocationError: true,
      };

    case types.GET_CUSTOMER_BY_USER_REQUEST:
      return { ...state, fetchingCustomerByUser: true };
    case types.GET_CUSTOMER_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingCustomerByUser: false,
        customerListByUser: [...state.customerListByUser, ...action.payload],
      };
    case types.GET_CUSTOMER_BY_USER_FAILURE:
      return {
        ...state,
        fetchingCustomerByUser: false,
        fetchingCustomerByUserError: true,
      };

      case types.GET_COORDER_BY_USER_REQUEST:
        return { ...state, fetchingCoorderByUser: true };
      case types.GET_COORDER_BY_USER_SUCCESS:
        return {
          ...state,
          fetchingCoorderByUser: false,
          coOrderListByUser: [...state.coOrderListByUser, ...action.payload],
        };
      case types.GET_COORDER_BY_USER_FAILURE:
        return {
          ...state,
          fetchingCoorderByUser: false,
          fetchingCoorderByUserError: true,
        };

        case types.GET_OPPORTUNITY_BY_USER_REQUEST:
          return { ...state, fetchingOpportunityUser: true };
        case types.GET_OPPORTUNITY_BY_USER_SUCCESS:
          return {
            ...state,
            fetchingOpportunityUser: false,
            coOppoListByUser: action.payload,
          };
        case types.GET_OPPORTUNITY_BY_USER_FAILURE:
          return {
            ...state,
            fetchingOpportunityUser: false,
            ffetchingOpportunityUserError: true,
          };
  


    case types.GET_COMPLETE_ORDERS_REQUEST:
      return { ...state, fetchingCompleteOrders: true };
    case types.GET_COMPLETE_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingCompleteOrders: false,
        completeOrder: [...state.completeOrder, ...action.payload],
      };
    case types.GET_COMPLETE_ORDERS_FAILURE:
      return {
        ...state,
        fetchingCompleteOrders: false,
        fetchingCompleteOrdersError: true,
      };

    case types.GET_HIGH_COMPLETE_ORDERS_REQUEST:
      return { ...state, fetchingHighCompleteOrders: true };
    case types.GET_HIGH_COMPLETE_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingHighCompleteOrders: false,
        highCompleteOrder: [...state.highCompleteOrder, ...action.payload],
      };
    case types.GET_HIGH_COMPLETE_ORDERS_FAILURE:
      return {
        ...state,
        fetchingHighCompleteOrders: false,
        fetchingHighCompleteOrdersError: true,
      };

    case types.GET_MEDIUM_COMPLETE_ORDERS_REQUEST:
      return { ...state, fetchingMediumCompleteOrders: true };
    case types.GET_MEDIUM_COMPLETE_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingMediumCompleteOrders: false,
        mediumCompleteOrder: [...state.mediumCompleteOrder, ...action.payload],
      };
    case types.GET_MEDIUM_COMPLETE_ORDERS_FAILURE:
      return {
        ...state,
        fetchingMediumCompleteOrders: false,
        fetchingMediumCompleteOrdersError: true,
      };

    case types.GET_LOW_COMPLETE_ORDERS_REQUEST:
      return { ...state, fetchingLowCompleteOrders: true };
    case types.GET_LOW_COMPLETE_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingLowCompleteOrders: false,
        lowCompleteOrder: [...state.lowCompleteOrder, ...action.payload],
      };
    case types.GET_LOW_COMPLETE_ORDERS_FAILURE:
      return {
        ...state,
        fetchingLowCompleteOrders: false,
        fetchingLowCompleteOrdersError: true,
      };

    case types.SEARCH_ITEM_IN_LOCATION_REQUEST:
      return { ...state, searchingItemInLocation: true };
    case types.SEARCH_ITEM_IN_LOCATION_SUCCESS:
      return {
        ...state,
        searchingItemInLocation: false,
      };
    case types.SEARCH_ITEM_IN_LOCATION_FAILURE:
      return {
        ...state,
        searchingItemInLocation: false,
        searchingItemInLocationError: true,
      };

    case types.MOVE_TO_PRODUCTION_ARCHIEVE_REQUEST:
      return { ...state, movingToProductionArchieve: true };
    case types.MOVE_TO_PRODUCTION_ARCHIEVE_SUCCESS:
      return {
        ...state,
        movingToProductionArchieve: false,
        searchedItem: state.searchedItem.map((item) => {
          if (item.productionProductId == action.payload.productionProductId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.MOVE_TO_PRODUCTION_ARCHIEVE_FAILURE:
      return {
        ...state,
        movingToProductionArchieve: false,
        movingToProductionArchieveError: true,
      };

    case types.HANDLE_ACCOUNT_PULSE:
      return { ...state, showPulseModal: action.payload };

    case types.HANDLE_PRODUCTION_PAYMENT_MODAL:
      return { ...state, showPaymentListModal: action.payload };

    case types.DELETE_SPARE_LIST_REQUEST:
      return { ...state, deletingSpareList: true };
    case types.DELETE_SPARE_LIST_SUCCESS:
      return {
        ...state,
        deletingSpareList: false,
        spareList: state.spareList.filter(
          (item) => item.phoneTaskId !== action.payload.phoneTaskId
        ),
        // orderPhoneList: state.orderPhoneList.map((item) => {
        //   if (item.phoneId == action.payload.phoneId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };
    case types.DELETE_SPARE_LIST_FAILURE:
      return {
        ...state,
        deletingSpareList: false,
        deletingSpareListError: true,
      };

    case types.UPDATE_SPARELIST_ITEM_REQUEST:
      return { ...state, updatingSpareListItem: true };
    case types.UPDATE_SPARELIST_ITEM_SUCCESS:
      return {
        ...state,
        updatingSpareListItem: false,
        spareList: state.spareList.map((item) => {
          if (item.phoneSpareId == action.payload.phoneSpareId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SPARELIST_ITEM_FAILURE:
      return {
        ...state,
        updatingSpareListItem: false,
        updatingSpareListItemError: true,
      };

    case types.GET_SUB_ORDER_PHONE_LIST_REQUEST:
      return { ...state, fetchingSuborderPhone: true };
    case types.GET_SUB_ORDER_PHONE_LIST_SUCCESS:
      return {
        ...state,
        fetchingSuborderPhone: false,
        subOrderPhoneList: action.payload,
      };
    case types.GET_SUB_ORDER_PHONE_LIST_FAILURE:
      return {
        ...state,
        fetchingSuborderPhone: false,
        fetchingSuborderPhoneError: true,
      };

    case types.HANDLE_SUBORDER_PHONE:
      return { ...state, showSuborderPhoneList: action.payload };

    case types.ADD_SUPERVISOR_REQUEST:
      return { ...state, addingSupervisor: true };
    case types.ADD_SUPERVISOR_SUCCESS:
      return {
        ...state,
        addingSupervisor: false,
        addInventoryInOrder: false,
        distributorOrder: state.distributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        highDistributorOrder: state.highDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        lowDistributorOrder: state.lowDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        mediumDistributorOrder: state.mediumDistributorOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADD_SUPERVISOR_FAILURE:
      return {
        ...state,
        addingSupervisor: false,
        addingSupervisorError: true,
      };

    case types.ADD_LEAD_REQUEST:
      return { ...state, addingLead: true };
    case types.ADD_LEAD_SUCCESS:
      return {
        ...state,
        addingLead: false,
        addLeadInOrder: false,
        orderShowById: state.orderShowById.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADD_LEAD_FAILURE:
      return {
        ...state,
        addingLead: false,
        addingLeadError: true,
      };

    case types.GET_LOB_LIST_REQUEST:
      return { ...state, fetchingLobList: true };
    case types.GET_LOB_LIST_SUCCESS:
      return {
        ...state,
        fetchingLobList: false,
        lobList: action.payload,
      };
    case types.GET_LOB_LIST_FAILURE:
      return {
        ...state,
        fetchingLobList: false,
        fetchingLobListError: true,
      };

    case types.GET_DISPATCH_ITEM_LIST_REQUEST:
      return { ...state, fetchingDispatchItemList: true };
    case types.GET_DISPATCH_ITEM_LIST_SUCCESS:
      return {
        ...state,
        fetchingDispatchItemList: false,
        searchedItem: action.payload,
      };
    case types.GET_DISPATCH_ITEM_LIST_FAILURE:
      return {
        ...state,
        fetchingDispatchItemList: false,
        fetchingDispatchItemListError: true,
      };

    case types.GET_PULSE_LIST_REQUEST:
      return { ...state, fetchingPulseList: true };
    case types.GET_PULSE_LIST_SUCCESS:
      return {
        ...state,
        fetchingPulseList: false,
        pulseList: action.payload,
      };
    case types.GET_PULSE_LIST_FAILURE:
      return {
        ...state,
        fetchingPulseList: false,
        fetchingPulseListError: true,
      };

    case types.UPDATE_CONTACT_ROLE_BY_ACCOUNT_REQUEST:
      return { ...state };
    case types.UPDATE_CONTACT_ROLE_BY_ACCOUNT_SUCCESS:
      return {
        ...state,
        contactDistributor: state.contactDistributor.map((item) => {
          if (item.contactPersonId === action.payload.contactPersonId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_CONTACT_ROLE_BY_ACCOUNT_FAILURE:
      return { ...state };

    case types.GET_ORDER_STATUS_REQUEST:
      return { ...state, fetchingOrderStatus: true };
    case types.GET_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        fetchingOrderStatus: false,
        orderStatus: action.payload,
      };
    case types.GET_ORDER_STATUS_FAILURE:
      return {
        ...state,
        fetchingOrderStatus: false,
        fetchingOrderStatusError: true,
      };

    case types.ADD_ORDER_PROCUREMENT_REQUEST:
      return { ...state, addingOrderProcurement: true };
    case types.ADD_ORDER_PROCUREMENT_SUCCESS:
      return {
        ...state,
        addingOrderProcurement: false,
        highDistributorOrder:
          action.payload.priority === "High"
            ? [action.payload, ...state.highDistributorOrder]
            : state.highDistributorOrder,
        mediumDistributorOrder:
          action.payload.priority === "Medium"
            ? [action.payload, ...state.mediumDistributorOrder]
            : state.mediumDistributorOrder,
        lowDistributorOrder:
          action.payload.priority === "Low"
            ? [action.payload, ...state.lowDistributorOrder]
            : state.lowDistributorOrder,
        // procurementOrder: [action.payload, ...state.procurementOrder],
        orderDetailsId: action.payload,
        // addLinkCustomerProcurementModal: false,
      };
    case types.ADD_ORDER_PROCUREMENT_FAILURE:
      return {
        ...state,
        addingOrderProcurement: false,
        addingOrderProcurementError: true,
      };

    case types.GET_ORDER_PROCUREMENT_REQUEST:
      return { ...state, fetchingOrderProcurement: true };
    case types.GET_ORDER_PROCUREMENT_SUCCESS:
      return {
        ...state,
        fetchingOrderProcurement: false,
        procurementOrder: [...state.procurementOrder, ...action.payload],
      };
    case types.GET_ORDER_PROCUREMENT_FAILURE:
      return {
        ...state,
        fetchingOrderProcurement: false,
        fetchingOrderProcurementError: true,
      };

    case types.GET_CHATGPT_REQUEST:
      return { ...state, fetchingChatgpt: true };
    case types.GET_CHATGPT_SUCCESS:
      return {
        ...state,
        fetchingChatgpt: false,
        chatGpt: action.payload,
      };
    case types.GET_CHATGPT_FAILURE:
      return {
        ...state,
        fetchingChatgpt: false,
        fetchingChatgptError: true,
      };

    case types.HANDLE_UPDATE_PROCURE_ORDER_MODAL:
      return { ...state, updateProcureDetailModal: action.payload };

    case types.SET_PROCURE_EDIT:
      return { ...state, setEdittingProcure: action.payload };

    case types.UPDATE_PROCURE_STEP1_REQUEST:
      return { ...state, updatingProcureStep1: true };
    case types.UPDATE_PROCURE_STEP1_SUCCESS:
      return {
        ...state,
        updatingProcureStep1: false,
        updateProcureDetailModal: false,
        procurementOrder: state.procurementOrder.map((item) => {
          if (item.orderId == action.payload.orderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PROCURE_STEP1_FAILURE:
      return {
        ...state,
        updatingProcureStep1: false,
        updatingProcureStep1Error: true,
      };

    case types.EMPTY_CLEARBIT_TABLE:
      return { ...state, clearbit: {} };

    case types.HANDLE_ACCOUNT_OPPORTUNITY_MODAL:
      return { ...state, addAccountOpportunityModal: action.payload };

    case types.GET_BRAND_REQUEST:
      return { ...state, fetchingBrand: true };
    case types.GET_BRAND_SUCCESS:
      return { ...state, fetchingBrand: false, brand: action.payload };
    case types.GET_BRAND_FAILURE:
      return { ...state, fetchingBrand: false, fetchingBrandError: true };

    case types.GET_MODEL_REQUEST:
      return { ...state, fetchingModel: true };
    case types.GET_MODEL_SUCCESS:
      return { ...state, fetchingModel: false, model: action.payload };
    case types.GET_MODEL_FAILURE:
      return { ...state, fetchingModel: false, fetchingModelError: true };

    case types.GET_PROCURE_DETAILS_REQUEST:
      return { ...state, fetchingProcureDetails: true };
    case types.GET_PROCURE_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingProcureDetails: false,
        procureDetails: action.payload,
      };
    case types.GET_PROCURE_DETAILS_FAILURE:
      return {
        ...state,
        fetchingProcureDetails: false,
        fetchingProcureDetailsError: true,
      };

    case types.GET_QUOTATION_EXCEL_DETAILS_REQUEST:
      return { ...state, fetchingQuotationExcelDetails: true };
    case types.GET_QUOTATION_EXCEL_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingQuotationExcelDetails: false,
        quotationPhoneDetails: action.payload,
      };
    case types.GET_QUOTATION_EXCEL_DETAILS_FAILURE:
      return {
        ...state,
        fetchingQuotationExcelDetails: false,
        fetchingQuotationExcelDetailsError: true,
      };

    case types.DELETE_PROCURE_DATA_REQUEST:
      return { ...state, deletingProcureData: true };
    case types.DELETE_PROCURE_DATA_SUCCESS:
      return {
        ...state,
        deletingProcureData: false,
        procureDetails: state.procureDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_PROCURE_DATA_FAILURE:
      return {
        ...state,
        deletingProcureData: false,
        deletingProcureDataError: false,
      };

    case types.UPDATE_PROCURE_DETAILS_REQUEST:
      return { ...state, updatingProcureDetails: true };
    case types.UPDATE_PROCURE_DETAILS_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingProcureDetails: false,
        procureDetails: state.procureDetails.map((sector) =>
          sector.id === action.payload.id ? action.payload : sector
        ),
      };
    case types.UPDATE_PROCURE_DETAILS_FAILURE:
      return {
        ...state,
        updatingProcureDetails: false,
        updatingProcureDetailsError: true,
      };

    case types.HANDLE_PROCURE_DETAILS_MODAL:
      return {
        ...state,
        addProcureDetailsModal: action.payload,
        phoneListById: [],
      };

    case types.GET_QUOTATION_REPAIR_ORDER_REQUEST:
      return { ...state, fetchingQuotationRepairOrder: true };
    case types.GET_QUOTATION_REPAIR_ORDER_SUCCESS:
      return {
        ...state,
        fetchingQuotationRepairOrder: false,
        quotationRepairOrder: [
          ...state.quotationRepairOrder,
          ...action.payload,
        ],
      };
    case types.GET_QUOTATION_REPAIR_ORDER_FAILURE:
      return {
        ...state,
        fetchingQuotationRepairOrder: false,
        fetchingQuotationRepairOrderError: true,
      };

    case types.GET_QUOTATION_PROCURE_ORDER_REQUEST:
      return { ...state, fetchingQuotationProcureOrder: true };
    case types.GET_QUOTATION_PROCURE_ORDER_SUCCESS:
      return {
        ...state,
        fetchingQuotationProcureOrder: false,
        quotationProcureOrder: [
          ...state.quotationProcureOrder,
          ...action.payload,
        ],
      };
    case types.GET_QUOTATION_PROCURE_ORDER_FAILURE:
      return {
        ...state,
        fetchingQuotationProcureOrder: false,
        fetchingQuotationProcureOrderError: true,
      };

    case types.ADD_QUOTATION_CAR_REQUEST:
      return { ...state, addingQuotationCar: true };
    case types.ADD_QUOTATION_CAR_SUCCESS:
      return {
        ...state,
        addingQuotationCar: false,
        addAccountOpportunityModal: false,
        // addLinkDistributorOrderConfigureModal: false,
        quotationRepairOrder: state.quotationRepairOrder.map((item) => {
          if (item.quotationId == action.payload.quotationId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADD_QUOTATION_CAR_FAILURE:
      return {
        ...state,
        addingQuotationCar: false,
        // addCustomerModal: false
      };

    case types.ADD_QUOTATION_PHONE_DETAILS_REQUEST:
      return { ...state, addingQuotationPhoneDetails: true };
    case types.ADD_QUOTATION_PHONE_DETAILS_SUCCESS:
      return {
        ...state,
        addingQuotationPhoneDetails: false,
      };
    case types.ADD_QUOTATION_PHONE_DETAILS_FAILURE:
      return {
        ...state,
        addingQuotationPhoneDetails: false,
        addingQuotationPhoneDetailsError: true,
        // addCustomerModal: false
      };

    case types.QUOTATION_TO_ORDER_CONVERT_REQUEST:
      return {
        ...state,
        convertingQuotationToOrder: true,
      };
    case types.QUOTATION_TO_ORDER_CONVERT_SUCCESS:
      return {
        ...state,
        convertingQuotationToOrder: false,
        quotationRepairOrder: state.quotationRepairOrder.filter(
          (item) => item.quotationId !== action.payload
        ),
        quotationProcureOrder: state.quotationProcureOrder.filter(
          (item) => item.quotationId !== action.payload
        ),
      };
    case types.QUOTATION_TO_ORDER_CONVERT_FAILURE:
      return {
        ...state,
        convertingQuotationToOrder: false,
        convertingQuotationToOrderError: true,
      };

    case types.HANDLE_CLAER_SEARCHED_DATA_ACCOUNT:
      return {
        ...state,
        distributorSearch: [],
        // deletedTruck: []
      };

    case types.HANDLE_CLAER_SEARCHED_INVOICE:
      return {
        ...state,
        invoiceSearch: [],
        // deletedTruck: []
      };

    case types.HANDLE_STATUS_SHOW_DRAWER:
      return { ...state, showStatusDrwr: action.payload };

    case types.HANDLE_INVOICE_ORDER_DRAWER:
      return { ...state, invoiceOrders: action.payload };

    case types.HANDLE_INVOICE_DRAWER:
      return { ...state, invoiceO: action.payload };

    case types.GET_PROCURE_STATUS_ITEM_REQUEST:
      return { ...state, fetchingProcureStatusItem: true };
    case types.GET_PROCURE_STATUS_ITEM_SUCCESS:
      return {
        ...state,
        fetchingProcureStatusItem: false,
        statusItems: action.payload,
      };
    case types.GET_PROCURE_STATUS_ITEM_FAILURE:
      return {
        ...state,
        fetchingProcureStatusItem: false,
        fetchingProcureStatusItemError: true,
      };

    case types.UPDATE_ORDR_SUPLR_ITEMS_REQUEST:
      return {
        ...state,
        updatingOrdrSuplrItems: true,
      };

    case types.UPDATE_ORDR_SUPLR_ITEMS_SUCCESS:
      return {
        ...state,
        updatingOrdrSuplrItems: false,
        // orderListData: state.orderListData.map((item) => {
        //   if (item.orderId === action.payload.orderId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };
    case types.UPDATE_ORDR_SUPLR_ITEMS_FAILURE:
      return {
        ...state,
        updatingOrdrSuplrItems: false,
        updatingOrdrSuplrItemsError: true,
      };

    case types.GET_LOCATION_NAMES_BY_PRODUCTID_REQUEST:
      return { ...state, fetchingLocationNamesByProductId: true };
    case types.GET_LOCATION_NAMES_BY_PRODUCTID_SUCCESS:
      return {
        ...state,
        fetchingLocationNamesByProductId: false,
        locationNamesByProductId: action.payload,
      };
    case types.GET_LOCATION_NAMES_BY_PRODUCTID_FAILURE:
      return {
        ...state,
        fetchingLocationNamesByProductId: false,
        fetchingLocationNamesByProductIdError: true,
      };

    case types.GET_ACCOUNT_INVOICE_REQUEST:
      return { ...state, fetchingAccountInvoice: true };
    case types.GET_ACCOUNT_INVOICE_SUCCESS:
      return {
        ...state,
        fetchingAccountInvoice: false,
        accountInvoice: action.payload,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
      };
    case types.GET_ACCOUNT_INVOICE_FAILURE:
      return {
        ...state,
        fetchingAccountInvoice: false,
        fetchingAccountInvoiceError: true,
      };

    case types.GET_GENERATED_INVOICE_REQUEST:
      return { ...state, fetchingGeneratedInvoice: true };
    case types.GET_GENERATED_INVOICE_SUCCESS:
      return {
        ...state,
        fetchingGeneratedInvoice: false,
        generatedInvoice: action.payload,
      };
    case types.GET_GENERATED_INVOICE_FAILURE:
      return {
        ...state,
        fetchingGeneratedInvoice: false,
        fetchingGeneratedInvoiceError: true,
      };

    case types.ORDER_INVOICE_REQUEST:
      return { ...state, fetchingOrderInvoice: true };
    case types.ORDER_INVOICE_SUCCESS:
      return {
        ...state,
        fetchingOrderInvoice: false,

        accountInvoice: state.accountInvoice.map((item) => {
          if (item.paymentId == action.payload.paymentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ORDER_INVOICE_FAILURE:
      return {
        ...state,
        fetchingOrderInvoice: false,
        fetchingOrderInvoiceError: true,
      };

    case types.GET_INVOICEL_REQUEST:
      return { ...state, fetchingInvoiceL: true };
    case types.GET_INVOICEL_SUCCESS:
      return {
        ...state,
        fetchingInvoiceL: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        invoiceL: action.payload,
      };
    case types.GET_INVOICEL_FAILURE:
      return {
        ...state,
        fetchingInvoiceL: false,
        fetchingInvoiceLError: true,
      };

    case types.GET_PAYMENTCLICK_REQUEST:
      return { ...state, fetchingPaymentClick: true };
    case types.GET_PAYMENTCLICK_SUCCESS:
      return {
        ...state,
        fetchingPaymentClick: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        paymentclick: action.payload,
      };
    case types.GET_PAYMENTCLICK_FAILURE:
      return {
        ...state,
        fetchingPaymentClick: false,
        fetchingPaymentClickError: true,
      };

    case types.GET_QUATATIONCLICK_REQUEST:
      return { ...state, fetchingQuatationClick: true };
    case types.GET_QUATATIONCLICK_SUCCESS:
      return {
        ...state,
        fetchingQuatationClick: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        quatationClick: action.payload,
      };
    case types.GET_QUATATIONCLICK_FAILURE:
      return {
        ...state,
        fetchingQuatationClick: false,
        fetchingQuatationClickError: true,
      };

    case types.GET_QUATATIONCHECKOUT_REQUEST:
      return { ...state, fetchingQuatationCheckout: true };
    case types.GET_QUATATIONCHECKOUT_SUCCESS:
      return {
        ...state,
        fetchingQuatationCheckout: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        quatationCheckout: action.payload,
      };
    case types.GET_QUATATIONCHECKOUT_FAILURE:
      return {
        ...state,
        fetchingQuatationCheckout: false,
        fetchingQuatationCheckoutError: true,
      };

    case types.GET_QUATATIONSHIPPING_REQUEST:
      return { ...state, fetchingQuatationShipping: true };
    case types.GET_QUATATIONSHIPPING_SUCCESS:
      return {
        ...state,
        fetchingQuatationShipping: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        quatationShipping: action.payload,
      };
    case types.GET_QUATATIONSHIPPING_FAILURE:
      return {
        ...state,
        fetchingQuatationShipping: false,
        fetchingQuatationShippingError: true,
      };

    case types.GET_LOGINCOUNT_REQUEST:
      return { ...state, fetchingLoginCount: true };
    case types.GET_LOGINCOUNT_SUCCESS:
      return {
        ...state,
        fetchingLoginCount: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        loginCount: action.payload,
      };
    case types.GET_LOGINCOUNT_FAILURE:
      return {
        ...state,
        fetchingLoginCount: false,
        fetchingLoginCountError: true,
      };

    case types.GET_INVOICECOUNT_REQUEST:
      return { ...state, fetchingInvoiceCount: true };
    case types.GET_INVOICECOUNT_SUCCESS:
      return {
        ...state,
        fetchingInvoiceCount: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        invoiceCount: action.payload,
      };
    case types.GET_INVOICECOUNT_FAILURE:
      return {
        ...state,
        fetchingInvoiceCount: false,
        fetchingInvoiceCountError: true,
      };

    case types.GET_PILISTBY_DISTRIBUTOR_REQUEST:
      return { ...state, fetchingPilistByDistributor: true };
    case types.GET_PILISTBY_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        fetchingPilistByDistributor: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        piListByDistributor: action.payload,
      };
    case types.GET_PILISTBY_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        fetchingPilistByDistributor: false,
        fetchingPilistByDistributorError: true,
      };

    case types.GET_PILISTBY_ORDER_REQUEST:
      return { ...state, fetchingPilistByOrder: true };
    case types.GET_PILISTBY_ORDER_SUCCESS:
      return {
        ...state,
        fetchingPilistByOrder: false,
        // accountInvoice: [...state.accountInvoice, ...action.payload]
        piListByOrder: action.payload,
      };
    case types.GET_PILISTBY_ORDER_FAILURE:
      return {
        ...state,
        fetchingPilistByOrder: false,
        fetchingPilistByOrderError: true,
      };

    case types.ADD_NEWLIST_REQUEST:
      return { ...state, addingNewList: true };
    case types.ADD_NEWLIST_SUCCESS:
      return {
        ...state,
        addingNewList: false,
        addNewModal: false,
        addLinkDistributorOrderConfigureModal: false,
        //inventoryList: [...action.payload, ...state.inventoryList],
      };
    case types.ADD_NEWLIST_FAILURE:
      return {
        ...state,
        addingNewList: false,
        addingNewListError: true,
      };

    case types.DISTRIBUTOR_ACCOUNT_CREDIT_TOGGLE_REQUEST:
      return { ...state, distributorAccountCrediting: true };
    case types.DISTRIBUTOR_ACCOUNT_CREDIT_TOGGLE_SUCCESS:
      return {
        ...state,
        distributorAccountCrediting: false,
        customerListByUser: state.customerListByUser.map((item) => {
          if (item.distributorId === action.payload.distributorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.DISTRIBUTOR_ACCOUNT_CREDIT_TOGGLE_FAILURE:
      return {
        ...state,
        distributorAccountCrediting: false,
        distributorAccountCreditingError: true,
      };

    case types.PAID_UNPAID_TOGGLE_REQUEST:
      return { ...state, paidUnpaidToggling: true };
    case types.PAID_UNPAID_TOGGLE_SUCCESS:
      return {
        ...state,
        paidUnpaidToggling: false,
        generatedInvoice: state.generatedInvoice.map((item) => {
          if (
            item.procureOrderInvoiceId === action.payload.procureOrderInvoiceId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.PAID_UNPAID_TOGGLE_FAILURE:
      return {
        ...state,
        paidUnpaidToggling: false,
        paidUnpaidTogglingError: true,
      };

    case types.GET_STATUS_TIMELINE_REQUEST:
      return { ...state, fetchingTimelineStatus: true };
    case types.GET_STATUS_TIMELINE_SUCCESS:
      return {
        ...state,
        fetchingTimelineStatus: false,
        statusActivityTimeline: action.payload,
      };
    case types.GET_STATUS_TIMELINE_FAILURE:
      return {
        ...state,
        fetchingTimelineStatus: false,
        fetchingTimelineStatusError: true,
      };

    case types.HANDLE_ACCOUNT_ADDRESS_MODAL:
      return { ...state, addAccountAddressModal: action.payload };
    case types.GET_SEARCH_IMEIPHONE_REQUEST:
      return { ...state, fetchingimeiSearchPhoneData: true };
    case types.GET_SEARCH_IMEIPHONE_SUCCESS:
      return {
        ...state,
        fetchingimeiSearchPhoneData: false,
        phoneListById: action.payload,
      };
    case types.GET_SEARCH_IMEIPHONE_FAILURE:
      return { ...state, fetchingimeiSearchPhoneDataError: true };

    case types.HANDLE_CLAER_PHONEREDUCER_DATA_REFURBISH:
      return { ...state, phoneListById: [] };

    case types.CLAER_REDUCERS_DATA:
      return {
        ...state,
        highDistributorOrder: [],
        lowDistributorOrder: [],
      };

    case types.SEARCH_CUSTOMER_ORDERNO_DATA_REQUEST:
      return { ...state, fetchingCustomerOrderNo: true };
    case types.SEARCH_CUSTOMER_ORDERNO_DATA_SUCCESS:
      return {
        ...state,
        fetchingCustomerOrderNo: false,
        highDistributorOrder: action.payload,
        lowDistributorOrder: action.payload,
      };
    case types.SEARCH_CUSTOMER_ORDERNO_DATA_FAILURE:
      return { ...state, fetchingCustomerOrderNoError: true };

      case types.ADD_COD_INVENTORY_REQUEST:
        return { ...state, addingCODinventory: true };
      case types.ADD_COD_INVENTORY_SUCCESS:
        return { ...state, addingCODinventory: false, codInventryorDr: action.payload };
      case types.ADD_COD_INVENTORY_FAILURE:
        return { ...state, addingCODinventory: false, addingCODinventoryError: true };

    default:
      return state;
  }
};
