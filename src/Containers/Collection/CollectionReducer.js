import * as types from "./CollectionActionTypes";
const initialState = {
  viewType: "distributor",

  subViewCustomer: "receive",

  subViewDistributor: "receive",

  fetchingTodayCustomer: false,
  fetchingTodayCustomerError: false,
  todayCustomer: [],

  fetchingCollection: false,
  fetchingCollectionError: false,
  CollectionCreditMemo:[],

  fetchingCloseCollection: false,
  fetchingCloseCollectionError: false,
  closeCreditMemo:[],

  fetchingAllCustomer: false,
  fetchingAllCustomerError: false,
  allCustomer: [],

  fetchingTodayDistributor: false,
  fetchingTodayDistributorError: false,
  todayDistributor: [],

  fetchingAllDistributor: false,
  fetchingAllDistributorError: false,
  allDistributor: [],

  paymentToggleCustomerToday: false,
  paymentToggleCustomerTodayError: false,

  paymentToggleCustomerAll: false,
  paymentToggleCustomerAllError: false,

  paymentToggleDistributorToday: false,
  paymentToggleDistributorTodayError: false,

  paymentToggleDistributorAll: false,
  paymentToggleDistributorAllError: false,

  linkingPaymentByFinance: false,
  linkingPaymentByFinanceError: false,

  linkingDistributorPaymentByFinance: false,
  linkingDistributorPaymentByFinanceError: false,

  fetchingRealTimeCollectionData: false,
  fetchingRealTimeCollectionDataError: false,

  fetchingAllCustomers: false,
  fetchingAllCustomersError: false,
  allCustomers: [],

  fetchingInputAllCustomerData: false,
  fetchingInputAllCustomerDataError: false,
  inputData1: [],

  fetchingInputReceivableCustomerData: false,
  fetchingInputReceivableCustomerDataError: false,
  inputData2: [],

  CustomerCollectionArchive: false,
  CustomerCollectionArchiveError: false,
  todayArchive: [],

  //Distributor
  DistributorCollectionArchive: false,
  DistributorCollectionArchiveError: false,
  todayDisArchive: [],

  fetchingAllDistributors: false,
  fetchingAllDistributorsError: false,
  allDistributors: [],

  fetchingInputAllDistributorData: false,
  fetchingInputAllDistributorDataError: false,
  inputDistributorData: [],

  fetchingInputReceivableDistributorData: false,
  fetchingInputReceivableDistributorDataError: false,
  inputDistributorData2: [],

  fetchingRealTimeCollectionToggleData: false,
  fetchingRealTimeCollectionToggleDataError: false,

  CustomerCollectionReceivable: false,
  CustomerCollectionReceivableError: false,

  DistributorCollectionReceivable: false,
  DistributorCollectionReceivableError: false,

  fetchingCustomerCreditMemo: false,
  fetchingCustomerCreditMemoError: false,
  customerCreditMemoData: [],

  fetchingDistributorCreditMemo: false,
  fetchingDistributorCreditMemoError: false,
  distributorCreditMemoData: [],

  fetchingRealTimeCustomerPaymentDelete: false,
  fetchingRealTimeCustomerPaymentDeleteError: false,

  fetchingRealTimeDeletedPayment: false,
  fetchingRealTimeDeletedPaymentError: false,

  customerCollectionReturn: false,
  customerCollectionReturnError: false,

  distributorCollectionReturn: false,
  distributorCollectionReturnError: false,

  collectionDistributorOrder: false,
};

export const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_VENDOR_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.SET_CUSTOMER_SUB_VIEW_TYPE:
      return { ...state, subViewCustomer: action.payload };

    // case types.HANDLE_CUSTOMER_PRODUCT_MODAL:
    //   return { ...state, collectionCustomerOrder: action.payload };

    case types.HANDLE_DISTRIBUTOR_PRODUCT_MODAL:
      return { ...state, collectionDistributorOrder: action.payload };

    case types.SET_DISTRIBUTOR_SUB_VIEW_TYPE:
      return { ...state, subViewDistributor: action.payload };

    /* Today Customer list */
    case types.GET_TODAY_CUSTOMER_REQUEST:
      return { ...state, fetchingTodayCustomer: true };
    case types.GET_TODAY_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingTodayCustomer: false,
        todayCustomer: action.payload.map((item) => {
          return { ...item, color: null };
        }),
      };
    case types.GET_TODAY_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingTodayCustomer: false,
        fetchingTodayCustomerError: true,
      };

    /* All customer-list */
    case types.GET_ALL_CUSTOMER_REQUEST:
      return { ...state, fetchingAllCustomer: true };
    case types.GET_ALL_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingAllCustomer: false,
        allCustomer: action.payload,
      };
    case types.GET_ALL_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingAllCustomer: false,
        fetchingAllCustomerError: true,
      };

    /* Today Distributor list */

    case types.GET_TODAY_DISTRIBUTOR_REQUEST:
      return { ...state, fetchingTodayDistributor: true };
    case types.GET_TODAY_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        fetchingTodayDistributor: false,
        todayDistributor: action.payload.map((item) => {
          return { ...item, color: null };
        }),
      };
    case types.GET_TODAY_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        fetchingTodayDistributor: false,
        fetchingTodayDistributorError: true,
      };

    /* All Distributor list */

    case types.GET_ALL_DISTRIBUTOR_REQUEST:
      return { ...state, fetchingAllDistributor: true };
    case types.GET_ALL_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        fetchingAllDistributor: false,
        allDistributor: action.payload,
      };
    case types.GET_ALL_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        fetchingAllDistributor: false,
        fetchingAllDistributorError: true,
      };

    /* today customer toggle */
    case types.PAYMENT_TOGGLE_CUSTOMER_TODAY_REQUEST:
      return { ...state, paymentToggleCustomerToday: true };
    case types.PAYMENT_TOGGLE_CUSTOMER_TODAY_SUCCESS:
      return {
        ...state,
        paymentToggleCustomerToday: false,
        // todayCustomer: state.todayCustomer.map((item) => {
        //   if (item.vendorId === action.payload.vendorId)
        //     return { ...item, cobtInd: action.payload.cobtInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.PAYMENT_TOGGLE_CUSTOMER_TODAY_FAILURE:
      return {
        ...state,
        paymentToggleCustomerToday: false,
        paymentToggleCustomerTodayError: true,
      };

    /* customer all toggle */

    case types.PAYMENT_TOGGLE_CUSTOMER_ALL_REQUEST:
      return { ...state, paymentToggleCustomerAll: true };
    case types.PAYMENT_TOGGLE_CUSTOMER_ALL_SUCCESS:
      return {
        ...state,
        paymentToggleCustomerAll: false,
        // allCustomer: state.allCustomer.map((item) => {
        //   if (item.vendorId === action.payload.vendorId)
        //     return { ...item, cobtInd: action.payload.cobtInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.PAYMENT_TOGGLE_CUSTOMER_ALL_FAILURE:
      return {
        ...state,
        paymentToggleCustomerAll: false,
        paymentToggleCustomerAllError: true,
      };

    /* distributor today toggle */

    case types.PAYMENT_TOGGLE_DISTRIBUTOR_TODAY_REQUEST:
      return { ...state, paymentToggleDistributorToday: true };
    case types.PAYMENT_TOGGLE_DISTRIBUTOR_TODAY_SUCCESS:
      return {
        ...state,
        paymentToggleDistributorToday: false,
        // todayDistributor: state.todayDistributor.map((item) => {
        //   if (item.vendorId === action.payload.vendorId)
        //     return { ...item, cobtInd: action.payload.cobtInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.PAYMENT_TOGGLE_DISTRIBUTOR_TODAY_FAILURE:
      return {
        ...state,
        paymentToggleDistributorToday: false,
        paymentToggleDistributorTodayError: true,
      };

    /* distributor all toggle */

    case types.PAYMENT_TOGGLE_DISTRIBUTOR_ALL_REQUEST:
      return { ...state, paymentToggleDistributorAll: true };
    case types.PAYMENT_TOGGLE_DISTRIBUTOR_ALL_SUCCESS:
      return {
        ...state,
        paymentToggleDistributorAll: false,
        // allDistributor: state.allDistributor.map((item) => {
        //   if (item.vendorId === action.payload.vendorId)
        //     return { ...item, cobtInd: action.payload.cobtInd };
        //   else {
        //     return item;
        //   }
        // }),
      };
    case types.PAYMENT_TOGGLE_DISTRIBUTOR_ALL_FAILURE:
      return {
        ...state,
        paymentToggleDistributorAll: false,
        paymentToggleDistributorAllError: true,
      };

    case types.GET_ALL_CUSTOMER_LIST_REQUEST:
      return { ...state, fetchingAllCustomers: true };
    case types.GET_ALL_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllCustomers: false,
        allCustomers: action.payload,
      };
    case types.GET_ALL_CUSTOMER_LIST_FAILURE:
      return {
        ...state,
        fetchingAllCustomers: false,
        fetchingAllCustomersError: true,
      };

    case types.LINK_PAYMENT_BY_FINANCE_REQUEST:
      return { ...state, linkingPaymentByFinance: true };
    case types.LINK_PAYMENT_BY_FINANCE_SUCCESS:
      return {
        ...state,
        linkingPaymentByFinance: false,
        todayCustomer: state.todayCustomer.filter(
          (item) => item.paymentId !== action.payload.paymentId
        ),
      };
    case types.LINK_PAYMENT_BY_FINANCE_FAILURE:
      return {
        ...state,
        linkingPaymentByFinance: false,
        linkingPaymentByFinanceError: true,
      };

    case types.LINK_DISTRIBUTOR_PAYMENT_BY_FINANCE_REQUEST:
      return { ...state, linkingDistributorPaymentByFinance: true };
    case types.LINK_DISTRIBUTOR_PAYMENT_BY_FINANCE_SUCCESS:
      return {
        ...state,
        linkingDistributorPaymentByFinance: false,
        todayDistributor: state.todayDistributor.filter(
          (item) => item.paymentId !== action.payload.paymentId
        ),
        // addTeamTransferModal: false,
      };
    case types.LINK_DISTRIBUTOR_PAYMENT_BY_FINANCE_FAILURE:
      return {
        ...state,
        linkingDistributorPaymentByFinance: false,
        linkingDistributorPaymentByFinanceError: true,
      };

    case types.INPUT_CUSTOMER_ALL_SEARCH_DATA_REQUEST:
      return { ...state, fetchingInputAllCustomerData: true };
    case types.INPUT_CUSTOMER_ALL_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingInputAllCustomerData: false,
        allCustomers: action.payload,
      };
    case types.INPUT_CUSTOMER_ALL_SEARCH_DATA_FAILURE:
      return { ...state, fetchingInputAllCustomerDataError: true };

    case types.INPUT_CUSTOMER_RECEIVABLE_SEARCH_DATA_REQUEST:
      return { ...state, fetchingInputReceivableCustomerData: true };
    case types.INPUT_CUSTOMER_RECEIVABLE_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingInputReceivableCustomerData: false,
        todayCustomer: action.payload,
      };
    case types.INPUT_CUSTOMER_RECEIVABLE_SEARCH_DATA_FAILURE:
      return { ...state, fetchingInputReceivableCustomerDataError: true };

    // REAL TIME COLLECTION DATA

    case types.GET_REAL_TIME_COLLECTION_DATA_REQUEST:
      return { ...state, fetchingRealTimeCollectionData: true };
    case types.GET_REAL_TIME_COLLECTION_DATA_SUCCESS:
      return {
        ...state,
        fetchingRealTimeCollectionData: false,
        todayDistributor: [
          { ...action.payload, color: "tomato" },
          ...state.todayDistributor,
        ],
      };
    case types.GET_REAL_TIME_COLLECTION_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        fetchingRealTimeCollectionData: false,
        todayCustomer: [
          { ...action.payload, color: "tomato" },
          ...state.todayCustomer,
        ],
        // action.payload,
      };
    case types.GET_REAL_TIME_COLLECTION_DATA_FAILURE:
      return {
        ...state,
        fetchingRealTimeCollectionData: false,
        fetchingRealTimeCollectionDataError: true,
      };

    case types.CUSTOMER_COLLECTION_ARCHIVE_REQUEST:
      return {
        ...state,
        CustomerCollectionArchive: true,
      };
    case types.CUSTOMER_COLLECTION_ARCHIVE_SUCCESS:
      return {
        ...state,
        CustomerCollectionArchive: false,
        todayArchive: action.payload,
      };
    case types.CUSTOMER_COLLECTION_ARCHIVE_FAILURE:
      return {
        ...state,
        CustomerCollectionArchive: false,
        CustomerCollectionArchiveError: true,
      };
    //DISTRIBUTOR
    case types.DISTRIBUTOR_COLLECTION_ARCHIVE_REQUEST:
      return {
        ...state,
        DistributorCollectionArchive: true,
      };
    case types.DISTRIBUTOR_COLLECTION_ARCHIVE_SUCCESS:
      return {
        ...state,
        DistributorCollectionArchive: false,
        todayDisArchive: action.payload,
      };
    case types.DISTRIBUTOR_COLLECTION_ARCHIVE_FAILURE:
      return {
        ...state,
        DistributorCollectionArchive: false,
        DistributorCollectionArchiveError: true,
      };
    /**get the list of all distributors*/
    case types.GET_ALL_DISTRIBUTORS_LIST_REQUEST:
      return { ...state, fetchingAllDistributors: true };
    case types.GET_ALL_DISTRIBUTORS_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllDistributors: false,
        allDistributors: action.payload,
      };
    case types.GET_ALL_DISTRIBUTORS_LIST_FAILURE:
      return {
        ...state,
        fetchingAllDistributors: false,
        fetchingAllDistributorsError: true,
      };

    case types.INPUT_DISTRIBUTOR_ALL_SEARCH_DATA_REQUEST:
      return { ...state, fetchingInputAllDistributorData: true };
    case types.INPUT_DISTRIBUTOR_ALL_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingInputAllDistributorData: false,
        allDistributors: action.payload,
      };
    case types.INPUT_DISTRIBUTOR_ALL_SEARCH_DATA_FAILURE:
      return { ...state, fetchingInputAllDistributorDataError: true };

    case types.INPUT_DISTRIBUTOR_RECEIVABLE_SEARCH_DATA_REQUEST:
      return { ...state, fetchingInputReceivableDistributorData: true };
    case types.INPUT_DISTRIBUTOR_RECEIVABLE_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingInputReceivableDistributorData: false,
        todayDistributor: action.payload,
      };
    case types.INPUT_DISTRIBUTOR_RECEIVABLE_SEARCH_DATA_FAILURE:
      return { ...state, fetchingInputReceivableDistributorDataError: true };

    case types.CUSTOMER_COLLECTION_RECEIVABLE_REQUEST:
      return {
        ...state,
        CustomerCollectionReceivable: true,
      };
    case types.CUSTOMER_COLLECTION_RECEIVABLE_SUCCESS:
      return {
        ...state,
        CustomerCollectionReceivable: false,
        todayCustomer: action.payload,
      };
    case types.CUSTOMER_COLLECTION_RECEIVABLE_FAILURE:
      return {
        ...state,
        CustomerCollectionReceivable: false,
        CustomerCollectionReceivableError: true,
      };

    case types.DISTRIBUTOR_COLLECTION_RECEIVABLE_REQUEST:
      return {
        ...state,
        DistributorCollectionReceivable: true,
      };
    case types.DISTRIBUTOR_COLLECTION_RECEIVABLE_SUCCESS:
      return {
        ...state,
        DistributorCollectionReceivable: false,
        todayDistributor: action.payload,
      };
    case types.DISTRIBUTOR_COLLECTION_RECEIVABLE_FAILURE:
      return {
        ...state,
        DistributorCollectionReceivable: false,
        DistributorCollectionReceivableError: true,
      };

    case types.GET_CUSTOMER_CREDIT_MEMO_REQUEST:
      return { ...state, fetchingCustomerCreditMemo: true };
    case types.GET_CUSTOMER_CREDIT_MEMO_SUCCESS:
      return {
        ...state,
        fetchingCustomerCreditMemo: false,
        customerCreditMemoData: action.payload,
      };
    case types.GET_CUSTOMER_CREDIT_MEMO_FAILURE:
      return {
        ...state,
        fetchingCustomerCreditMemo: false,
        fetchingCustomerCreditMemoError: true,
      };
    case types.GET_DISTRIBUTOR_CREDIT_MEMO_REQUEST:
      return { ...state, fetchingDistributorCreditMemo: true };
    case types.GET_DISTRIBUTOR_CREDIT_MEMO_SUCCESS:
      return {
        ...state,
        fetchingDistributorCreditMemo: false,
        distributorCreditMemoData: action.payload,
      };
    case types.GET_DISTRIBUTOR_CREDIT_MEMO_FAILURE:
      return {
        ...state,
        fetchingDistributorCreditMemo: false,
        fetchingDistributorCreditMemoError: true,
      };

      case types.GET_COLLECTION_REQUEST:
        return { ...state, fetchingCollection: true };
      case types.GET_COLLECTION_SUCCESS:
        return {
          ...state,
          fetchingCollection: false,
          CollectionCreditMemo: action.payload,
        };
      case types.GET_COLLECTION_FAILURE:
        return {
          ...state,
          fetchingCollection: false,
          fetchingCollectionError: true,
        };

        case types.GET_CLOSE_COLLECTION_REQUEST:
          return { ...state, fetchingCloseCollection: true };
        case types.GET_CLOSE_COLLECTION_SUCCESS:
          return {
            ...state,
            fetchingCloseCollection: false,
            closeCreditMemo: action.payload,
          };
        case types.GET_CLOSE_COLLECTION_FAILURE:
          return {
            ...state,
            fetchingCloseCollection: false,
            fetchingCloseCollectionError: true,
          };

    case types.GET_REAL_TIME_COLLECTION_TOGGLE_DATA_REQUEST:
      return { ...state, fetchingRealTimeCollectionToggleData: true };
    case types.GET_REAL_TIME_COLLECTION_TOGGLE_DATA_SUCCESS:
      return {
        ...state,
        fetchingRealTimeCollectionToggleData: false,
        todayDistributor: state.todayDistributor.filter(
          (item) => item.paymentId !== action.payload.paymentId
        ),
      };
    case types.GET_REAL_TIME_COLLECTION_TOGGLE_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        fetchingRealTimeCollectionToggleData: false,
        todayCustomer: state.todayCustomer.filter(
          (item) => item.paymentId !== action.payload.paymentId
        ),
      };
    case types.GET_REAL_TIME_COLLECTION_TOGGLE_DATA_FAILURE:
      return {
        ...state,
        fetchingRealTimeCollectionToggleData: false,
        fetchingRealTimeCollectionToggleDataError: true,
      };

    case types.GET_REAL_TIME_CUSTOMER_PAYMENT_DELETE_REQUEST:
      return { ...state, fetchingRealTimeDeletedPayment: true };
    case types.GET_REAL_TIME_DISTRIBUTOR_PAYMENT_DELETE_SUCCESS:
      return {
        ...state,
        fetchingRealTimeDeletedPayment: false,
        todayDistributor: state.todayDistributor.filter(
          (item) => item.paymentId !== action.payload.paymentId
        ),
      };
    case types.GET_REAL_TIME_CUSTOMER_PAYMENT_DELETE_SUCCESS:
      return {
        ...state,
        fetchingRealTimeDeletedPayment: false,
        todayCustomer: state.todayCustomer.filter(
          (item) => item.paymentId !== action.payload.paymentId
        ),
      };
    case types.GET_REAL_TIME_CUSTOMER_PAYMENT_DELETE_FAILURE:
      return {
        ...state,
        fetchingRealTimeDeletedPayment: false,
        fetchingRealTimeDeletedPaymentError: true,
      };

    case types.CUSTOMER_COLLECTION_RETURN_REQUEST:
      return {
        ...state,
        customerCollectionReturn: true,
      };
    case types.CUSTOMER_COLLECTION_RETURN_SUCCESS:
      return {
        ...state,
        customerCollectionReturn: false,
        customerCreditMemoData: action.payload,
      };
    case types.CUSTOMER_COLLECTION_RETURN_FAILURE:
      return {
        ...state,
        customerCollectionReturn: false,
        customerCollectionReturnError: true,
      };

    case types.DISTRIBUTOR_COLLECTION_RETURN_REQUEST:
      return {
        ...state,
        distributorCollectionReturn: true,
      };
    case types.DISTRIBUTOR_COLLECTION_RETURN_SUCCESS:
      return {
        ...state,
        distributorCollectionReturn: false,
        distributorCreditMemoData: action.payload,
      };
    case types.DISTRIBUTOR_COLLECTION_RETURN_FAILURE:
      return {
        ...state,
        distributorCollectionReturn: false,
        distributorCollectionReturnError: true,
      };

    default:
      return state;
  }
};
