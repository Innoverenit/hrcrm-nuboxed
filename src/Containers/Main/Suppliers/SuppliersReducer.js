import * as types from "./SuppliersActionType";
import moment from "moment";
const initialState = {
  dateRangeList: [
    {
      id: 1,
      type: "year",
      value: "FY",
      starter: true,
      isSelected: true,
      startDate: moment()
        .startOf("year")
        .toISOString(),
      endDate: moment()
        .endOf("year")
        .toISOString(),
    },
    {
      id: 2,
      type: "quarter",
      value: "QTD",
      starter: false,
      isSelected: false,
      startDate: moment()
        .startOf("quarter")
        .toISOString(),
      endDate: moment()
        .endOf("quarter")
        .toISOString(),
    },
    {
      id: 3,
      type: "month",
      value: "MTD",
      starter: false,
      isSelected: false,
      startDate: moment()
        .startOf("month")
        .toISOString(),
      endDate: moment()
        .endOf("month")
        .toISOString(),
    },
    {
      id: 4,
      type: "week",
      value: "1W",
      starter: false,
      isSelected: false,
      startDate: moment()
        .startOf("week")
        .toISOString(),
      endDate: moment()
        .endOf("week")
        .toISOString(),
    },
  ],
  todoDrawerVisible: false,
  timeRangeType: "year",
  isCustomSelected: false,
  startDate: moment()
    .startOf("year")
    .toISOString(),
  endDate: moment()
    .endOf("year")
    .toISOString(),

  viewType: "card",
  suppliersDashboardType: "All",

  addSuppliersModal: false,

  addingSuppliers: false,
  addingSuppliersError: false,

  fetchingSupplierList: false,
  fetchingSupplierListError: false,
  supplierList: [],

  pOSupplierDetailsId: "",

  addLinkSuppliersOrderConfigureModal: false,

  clearbitPurchase: {},

  clearbitPurchaseProduct: {},

  clearbitPurchaseSupplier: {},

  addingPurchaseSuppliers: false,
  addingPurchaseSuppliersError: false,

  fetchingGeneratorSupplierList: false,
  fetchingGeneratorSupplierListError: false,
  generatorSuppliers: [],

  moveToInventory: false,
  moveToInventoryError: false,

  addSupplierSubscriptionModal: false,

  fetchingPurchaseSupplierList: false,
  fetchingPurchaseSupplierListError: false,
  purchaseList: [],

  addSupplierCatalogueModal: false,

  updateSupplierModal: false,

  fetchingSupplierDetailsBySupplierId: false,
  fetchingSupplierDetailsBySupplierIdError: true,
  supplierDetailById: [],

  setEditingSupplier: {},

  addSuppliersSuppliesConfigureModal: false,

  addingSuppliesToSupplier: false,
  addingSuppliesToSupplierError: false,

  fetchingSuppliesList: false,
  fetchingSuppliesListError: false,
  suppliesList: [],

  feedbackModal: false,

  fetchingFeedbackBySupplierId: false,
  fetchingFeedbackBySupplierIdError: false,
  feedbacks: [],

  addSuppliersActivityModal: false,

  addlocationInPo: false,

  addingSuppliersActivityCall: false,
  addingSuppliersActivityCallError: false,

  addingSuppliersActivityEvent: false,
  addingSuppliersActivityEventError: false,

  addingSuppliersActivityTask: false,
  addingSuppliersActivityTaskError: false,

  updateSuppliersModal: false,

  updateEventModal: false,
  updateCallModal: false,
  updateTaskModal: false,

  addSuppliersActivityTableModal: false,

  updatingSuppliersCall: false,
  updatingSuppliersCallError: false,

  updatingSuppliersEvent: false,
  updatingSuppliersEventError: false,

  updatingSuppliersTask: false,
  updatingSuppliersTaskError: false,

  fetchingAllSupplierListById: false,
  fetchingAllSupplierListByIdError: false,
  allSupplierList: [],

  fetchingInputSupplierData: false,
  fetchingInputSupplierDataError: false,

  updateSupplierById: false,
  updateSupplierByIdError: false,

  fetchingSupplierNoteById: false,
  fetchingSupplierNoteByIdError: false,
  supplierNote: [],

  generatingOrderBySupplierId: false,
  generatingOrderBySupplierIdError: false,
  //document
  supplierDocumentUploadModal: false,
  //add document
  addingDocumentBySupplierId: false,
  addingDocumentBySupplierIdError: false,

  addDeleteSuppliesModal: false,

  deletingSuppliesData: false,
  deletingSuppliesDataError: false,

  fetchingDeletedSuppliesBySuppliesId: false,
  fetchingDeletedSuppliesBySuppliesIdError: false,

  addDeletePurchaseModal: false,

  fetchingDeletedPurchaseById: false,
  fetchingDeletedPurchaseByIdError: false,

  deletingSuppliesData: false,
  deletingSuppliesDataError: false,

  //get document
  fetchingDocumentsBySupplierId: false,
  fetchingDocumentsBySupplierIdError: false,
  documentsBySupplierId: [],

  addSupplierContactModal: false,

  addingContactSupplier: false,
  addingContactSupplierError: false,

  fetchingSupplierContactListById: false,
  fetchingSupplierContactListByIdError: false,
  contactSupplier: [],

  //getAllsuplr
  fetchingAllSupplier: false,
  fetchingAllSupplierError: false,
  allSupplier: false,

  //search dispatch item
  searchDispatchItem: false,
  searchDispatchItemError: false,
  supplierContact: [],

  // fetchingContactsOfSupplier: false,
  //fetchingContactsOfSupplierError: false,

  fetchingContactSupplierById: false,
  fetchingContactSupplierByIdError: false,
  contactSupplier: [],

  fetchingSupplierHistory: false,
  fetchingSupplierHistoryrror: false,
  supplierHistory: false,

  fetchingActivitySupplier: false,
  fetchingActivitySupplierError: false,
  activitySupplier: [],

  updateSupplierContactModal: false,

  setEditingSupplierContact: {},

  updateSupplierContactById: false,
  updateSupplierContactByIdError: false,

  updateSupplierSuppliesModal: false,

  setEditingSupplierSupplies: {},

  addSupplierPurchaseCatalogueModal: false,

  updateSupplierSuppliesById: false,
  updateSupplierSuppliesByIdError: false,

  updatingInStockSupplierSuppliesById: false,
  updatingInStockSupplierSuppliesByIdError: false,

  fetchingProductList: false,
  fetchingProductListError: false,
  productList: [],

  fetchingGeneratorCatalogueSupplierList: false,
  fetchingGeneratorCatalogueSupplierListError: false,
  generatorCatalogueSuppliers: [],

  fetchingPoDetailsList: false,
  fetchingPoDetailsListError: false,
  poDetails: []
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
      // if (moment().isBetween(moment(q1s), moment(q1e))) {
      //   return { ...date, startDate: q1s, endDate: q1e };
      // }
      // if (moment().isBetween(moment(q2s), moment(q2e))) {
      //   return { ...date, startDate: q2s, endDate: q2e };
      // }
      // if (moment().isBetween(moment(q3s), moment(q3e))) {
      //   return { ...date, startDate: q3s, endDate: q3e };
      // }
      // if (moment().isBetween(moment(q4s), moment(q4e))) {
      //   return { ...date, startDate: q4s, endDate: q4e };
      // }
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

export const suppliersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SUPPLIERS_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
        suppliersDashboardType: "All",
      };

    case types.HANDLE_SUPPLIERS_MODAL:
      return { ...state, addSuppliersModal: action.payload };

    case types.ADD_SUPPLIERS_REQUEST:
      return { ...state, addingSuppliers: true };
    case types.ADD_SUPPLIERS_SUCCESS:
      return {
        ...state, addingSuppliers: false, addSuppliersModal: false,
        supplierList: [action.payload, ...state.supplierList]
      };
    case types.ADD_SUPPLIERS_FAILURE:
      return {
        ...state,
        addingSuppliers: false,
        addingSuppliersError: true,
        addSuppliersModal: false,
      };

    case types.GET_SUPPLIERS_LIST_REQUEST:
      return { ...state, fetchingSupplierList: true };
    case types.GET_SUPPLIERS_LIST_SUCCESS:
      return {
        ...state,
        fetchingSupplierList: false,
        supplierList: [...state.supplierList, ...action.payload]
      };
    case types.GET_SUPPLIERS_LIST_FAILURE:
      return {
        ...state,
        fetchingSupplierList: false,
        fetchingSupplierListError: true,
      };

    case types.GET_SUPPLIER_BY_SUPPLIER_ID_REQUEST:
      return { ...state, fetchingSupplierDetailsBySupplierId: true };
    case types.GET_SUPPLIER_BY_SUPPLIER_ID_SUCCESS:
      return {
        ...state,
        fetchingSupplierDetailsBySupplierId: false,
        supplierDetailById: action.payload,
      };
    case types.GET_SUPPLIER_BY_SUPPLIER_ID_FAILURE:
      return {
        ...state,
        fetchingSupplierDetailsBySupplierId: false,
        fetchingSupplierDetailsBySupplierIdError: true,
      };

    /**
     * handle order modal
     */
    case types.HANDLE_LINK_ORDER_CONFIGURE_MODAL:
      return {
        ...state,
        addLinkSuppliersOrderConfigureModal: action.payload,
        generatorSuppliers: []
      };

    case types.SET_CLEARBIT_PURCHASE_DATA:
      return { ...state, clearbitPurchase: action.payload };

    case types.SET_CLEARBIT_PURCHASE_PRODUCT_DATA:
      return { ...state, clearbitPurchaseProduct: action.payload };

    case types.LINK_PURCHASE_SUPPLIERS_REQUEST:
      return { ...state, addingPurchaseSuppliers: true };
    case types.LINK_PURCHASE_SUPPLIERS_SUCCESS:
      return {
        ...state,
        addingPurchaseSuppliers: false,
        pOSupplierDetailsId: action.payload,

      };
    case types.LINK_PURCHASE_SUPPLIERS_FAILURE:
      return {
        ...state,
        addingPurchaseSuppliers: false,
        addingPurchaseSuppliersError: true,
        addLinkSuppliersOrderConfigureModal: false,
        addSupplierPurchaseCatalogueModal: false
      };

    // suppliers generator

    case types.GET_GENERATOR_SUPPLIERS_LIST_REQUEST:
      return { ...state, fetchingGeneratorSupplierList: true };
    case types.GET_GENERATOR_SUPPLIERS_LIST_SUCCESS:
      return {
        ...state,
        fetchingGeneratorSupplierList: false,
        generatorSuppliers: action.payload,
      };
    case types.GET_GENERATOR_SUPPLIERS_LIST_FAILURE:
      return {
        ...state,
        fetchingGeneratorSupplierList: false,
        fetchingGeneratorSupplierListError: true,
      };

    case types.MOVE_TO_INVENTORY_REQUEST:
      return { ...state, moveToInventory: true };
    case types.MOVE_TO_INVENTORY_SUCCESS:
      return {
        ...state,
        moveToInventory: false,
      };
    case types.MOVE_TO_INVENTORY_FAILURE:
      return {
        ...state,
        moveToInventory: false,
        moveToInventoryError: true,
      };

    case types.GET_GENERATOR_CATALOGUE_SUPPLIERS_LIST_REQUEST:
      return { ...state, fetchingGeneratorCatalogueSupplierList: true };
    case types.GET_GENERATOR_CATALOGUE_SUPPLIERS_LIST_SUCCESS:
      return {
        ...state,
        fetchingGeneratorCatalogueSupplierList: false,
        generatorCatalogueSuppliers: action.payload,
      };
    case types.GET_GENERATOR_CATALOGUE_SUPPLIERS_LIST_FAILURE:
      return {
        ...state,
        fetchingGeneratorCatalogueSupplierList: false,
        fetchingGeneratorCatalogueSupplierListError: true,
      };

    case types.HANDLE_SUPPLIERS_SUBSCRIPTION_MODAL:
      return { ...state, addSupplierSubscriptionModal: action.payload };

    case types.HANDLE_PO_LOCATION_MODAL:
      return { ...state, addlocationInPo: action.payload };

    case types.GET_PURCHASE_SUPPLIERS_LIST_REQUEST:
      return { ...state, fetchingPurchaseSupplierList: true };
    case types.GET_PURCHASE_SUPPLIERS_LIST_SUCCESS:
      return {
        ...state,
        fetchingPurchaseSupplierList: false,
        purchaseList: action.payload,
      };
    case types.GET_PURCHASE_SUPPLIERS_LIST_FAILURE:
      return {
        ...state,
        fetchingPurchaseSupplierList: false,
        fetchingPurchaseSupplierListError: true,
      };

    case types.HANDLE_UPDATE_SUPPLIERS_MODAL:
      return { ...state, updateSupplierModal: action.payload };

    case types.SET_SUPPLIER_EDIT:
      return { ...state, setEditingSupplier: action.payload };

    case types.HANDLE_LINK_SUPPLIES_CONFIGURE_MODAL:
      return {
        ...state,
        addSuppliersSuppliesConfigureModal: action.payload,
      };

    case types.HANDLE_LINK_CATALOGUE_CONFIGURE_MODAL:
      return {
        ...state,
        addSupplierCatalogueModal: action.payload,
      };

    case types.ADD_SUPPLIES_TO_SUPPLIER_REQUEST:
      return { ...state, addingSuppliesToSupplier: true };
    case types.ADD_SUPPLIES_TO_SUPPLIER_SUCCESS:
      return {
        ...state,
        addSupplierCatalogueModal: false,
        addingSuppliesToSupplier: false,
        addSuppliersSuppliesConfigureModal: false,
      };
    case types.ADD_SUPPLIES_TO_SUPPLIER_FAILURE:
      return {
        ...state,
        addSupplierCatalogueModal: false,
        addingSuppliesToSupplier: false,
        addingSuppliesToSupplierError: true,
        addSuppliersSuppliesConfigureModal: false,
      };

    case types.GET_SUPPLIES_LIST_REQUEST:
      return { ...state, fetchingSuppliesList: true };
    case types.GET_SUPPLIES_LIST_SUCCESS:
      return {
        ...state,
        fetchingSuppliesList: false,
        suppliesList: action.payload,
      };
    case types.GET_SUPPLIES_LIST_FAILURE:
      return {
        ...state,
        fetchingSuppliesList: false,
        fetchingSuppliesListError: true,
      };

    case types.HANDLE_FEEDBACK_MODAL:
      return { ...state, feedbackModal: action.payload };

    case types.GET_FEEDBACK_BY_SUPPLIER_ID_REQUEST:
      return { ...state, fetchingFeedbackBySupplierId: true };
    case types.GET_FEEDBACK_BY_SUPPLIER_ID_SUCCESS:
      return {
        ...state,
        fetchingFeedbackBySupplierId: false,
        feedbacks: action.payload,
      };
    case types.GET_FEEDBACK_BY_SUPPLIER_ID_FAILURE:
      return {
        ...state,
        fetchingFeedbackBySupplierId: false,
        fetchingFeedbackBySupplierIdError: true,
      };

    /**
     * handle order modal
     */
    case types.HANDLE_SUPPLIERS_ACTIVITY_MODAL:
      return { ...state, addSuppliersActivityModal: action.payload };

    /**
     * add call activity
     */
    case types.ADD_SUPPLIERS_ACTIVITY_CALL_REQUEST:
      return { ...state, addingSuppliersActivityCall: true };
    case types.ADD_SUPPLIERS_ACTIVITY_CALL_SUCCESS:
      return {
        ...state,
        addingSuppliersActivityCall: false,
        addSuppliersActivityModal: false,
      };
    case types.ADD_SUPPLIERS_ACTIVITY_CALL_FAILURE:
      return {
        ...state,
        addingSuppliersActivityCall: false,
        addingSuppliersActivityCallError: false,
        addSuppliersActivityModal: false,
      };

    /**
     * add event activity
     */
    case types.ADD_SUPPLIERS_ACTIVITY_EVENT_REQUEST:
      return { ...state, addingSuppliersActivityEvent: true };
    case types.ADD_SUPPLIERS_ACTIVITY_EVENT_SUCCESS:
      return {
        ...state,
        addingSuppliersActivityEvent: false,
        addSuppliersActivityModal: false,
      };
    case types.ADD_SUPPLIERS_ACTIVITY_EVENT_FAILURE:
      return {
        ...state,
        addingSuppliersActivityEvent: false,
        addingSuppliersActivityEventError: false,
        addSuppliersActivityModal: false,
      };

    /**
     * add task activity
     */
    case types.ADD_SUPPLIERS_ACTIVITY_TASK_REQUEST:
      return { ...state, addingSuppliersActivityTask: true };
    case types.ADD_SUPPLIERS_ACTIVITY_TASK_SUCCESS:
      return {
        ...state,
        addingSuppliersActivityTask: false,
        addSuppliersActivityModal: false,
      };
    case types.ADD_SUPPLIERS_ACTIVITY_TASK_FAILURE:
      return {
        ...state,
        addingSuppliersActivityTask: false,
        addingSuppliersActivityTaskError: false,
        addSuppliersActivityModal: false,
      };

    case types.GET_ALL_SUPPLIERS_LIST_REQUEST:
      return { ...state, fetchingAllSupplierListById: true };
    case types.GET_ALL_SUPPLIERS_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllSupplierListById: false,
        allSupplierList: action.payload,
      };
    case types.GET_ALL_SUPPLIERS_LIST_FAILURE:
      return {
        ...state,
        fetchingAllSupplierListById: false,
        fetchingAllSupplierListByIdError: true,
      };

    case types.INPUT_SEARCH_DATA_REQUEST:
      return { ...state, fetchingInputSupplierData: true };
    case types.INPUT_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingInputSupplierData: false,
        supplierList: state.viewType === "dashboard" ? null : action.payload,
        allSupplierList: state.viewType === "dashboard" ? action.payload : null,
      };
    case types.INPUT_SEARCH_DATA_FAILURE:
      return {
        ...state,
        fetchingInputSupplierData: false,
        fetchingInputSupplierDataError: true,
      };

    case types.UPDATE_SUPPLIER_BY_ID_REQUEST:
      return { ...state, updateSupplierById: true };
    case types.UPDATE_SUPPLIER_BY_ID_SUCCESS:
      return {
        ...state,
        updateSupplierById: false,
        updateSupplierModal: false,
        supplierList: state.supplierList.map((item) => {
          if (item.supplierId == action.payload.supplierId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SUPPLIER_BY_ID_FAILURE:
      return {
        ...state,
        updateSupplierById: false,
        updateSupplierByIdError: true,
      };

    case types.GET_NOTES_LIST_BY_SUPPLIER_ID_REQUEST:
      return { ...state, fetchingSupplierNoteById: true };
    case types.GET_NOTES_LIST_BY_SUPPLIER_ID_SUCCESS:
      return {
        ...state,
        fetchingSupplierNoteById: false,
        supplierNote: action.payload,
        // serachedData: action.payload,
      };
    case types.GET_NOTES_LIST_BY_SUPPLIER_ID_FAILURE:
      return {
        ...state,
        fetchingSupplierNoteById: false,
        fetchingSupplierNoteByIdError: true,
      };

    case types.SET_CLEARBIT_PURCHASE_SUPPLIER_DATA:
      return { ...state, clearbitPurchaseSupplier: action.payload };

    /**
     * generate order with subscription
     */

    case types.GENERATE_ORDER_BY_SUPPLIER_ID_REQUEST:
      return {
        ...state,
        generatingOrderBySupplierId: true,
      };
    case types.GENERATE_ORDER_BY_SUPPLIER_ID_SUCCESS:
      return {
        ...state,
        generatingOrderBySupplierId: false,
        addSupplierSubscriptionModal: false,
      };
    case types.GENERATE_ORDER_BY_SUPPLIER_ID_FAILURE:
      return {
        ...state,
        generatingOrderBySupplierId: false,
        generatingOrderBySupplierIdError: true,
        addSupplierSubscriptionModal: false,
      };

    //document
    case types.HANDLE_SUPPLIER_DOCUMENT_UPLOAD_MODAL:
      return { ...state, supplierDocumentUploadModal: action.payload };
    /* add/link Supplier document */
    case types.ADD_SUPPLIER_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentBySupplierId: true,
        addingDocumentBySupplierIdError: false,
      };
    case types.ADD_SUPPLIER_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentBySupplierId: false,
        addingDocumentBySupplierIdError: false,
        supplierDocumentUploadModal: false,
      };
    case types.ADD_SUPPLIER_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentBySupplierId: false,
        addingDocumentBySupplierIdError: true,
        supplierDocumentUploadModal: false,
      };
    /**
     * get list of documents of a Supplier
     */
    case types.GET_SUPPLIER_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsBySupplierId: true,
        fetchingDocumentsBySupplierIdError: false,
      };
    case types.GET_SUPPLIER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsBySupplierId: false,
        fetchingDocumentsBySupplierIdError: false,
        documentsBySupplierId: action.payload,
      };
    case types.GET_SUPPLIER_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsBySupplierId: false,
        fetchingDocumentsBySupplierIdError: true,
      };

    case types.GENERATE_ORDER_BY_SUPPLIER_ID_REQUEST:
      return {
        ...state,
        generatingOrderBySupplierId: true,
      };
    case types.GENERATE_ORDER_BY_SUPPLIER_ID_SUCCESS:
      return {
        ...state,
        generatingOrderBySupplierId: false,
        addSupplierSubscriptionModal: false,
      };
    case types.GENERATE_ORDER_BY_SUPPLIER_ID_FAILURE:
      return {
        ...state,
        generatingOrderBySupplierId: false,
        generatingOrderBySupplierIdError: true,
        addSupplierSubscriptionModal: false,
      };

    case types.HANDLE_SUPPLIES_DELETE_MODAL:
      return { ...state, addDeleteSuppliesModal: action.payload };

    //delete supplies data

    case types.DELETE_SUPLLIES_DATA_REQUEST:
      return { ...state, deletingSuppliesData: true };
    case types.DELETE_SUPLLIES_DATA_SUCCESS:
      return {
        ...state,
        deletingSuppliesData: false,
        addDeleteSuppliesModal: false,
        suppliesList: state.suppliesList.filter(
          (item) => item.suppliesId !== action.payload
        ),
      };
    case types.DELETE_SUPLLIES_DATA_FAILURE:
      return {
        ...state,
        deletingSuppliesData: false,
        deletingSuppliesDataError: true,
        addDeleteSuppliesModal: false,
      };
    // get deleted supplies list

    case types.GET_DELETED_SUPPLIES_BY_SUPPLIES_ID_REQUEST:
      return { ...state, fetchingDeletedSuppliesBySuppliesId: true };
    case types.GET_DELETED_SUPPLIES_BY_SUPPLIES_ID_SUCCESS:
      return {
        ...state,
        fetchingDeletedSuppliesBySuppliesId: false,
        deletedSupplies: action.payload,
      };
    case types.GET_DELETED_SUPPLIES_BY_SUPPLIES_ID_FAILURE:
      return {
        ...state,
        fetchingDeletedSuppliesBySuppliesId: false,
        fetchingDeletedSuppliesBySuppliesIdError: true,
      };

    case types.HANDLE_PURCHASE_DELETE_MODAL:
      return { ...state, addDeletePurchaseModal: action.payload };

    //delete Purchase data

    case types.DELETE_PURCHASE_DATA_REQUEST:
      return { ...state, deletingSuppliesData: true };
    case types.DELETE_PURCHASE_DATA_SUCCESS:
      return {
        ...state,
        deletingSuppliesData: false,
        addDeleteSuppliesModal: false,
        suppliesList: state.suppliesList.filter(
          (item) => item.suppliesId !== action.payload
        ),
      };
    case types.DELETE_PURCHASE_DATA_FAILURE:
      return {
        ...state,
        deletingSuppliesData: false,
        deletingSuppliesDataError: true,
        addDeleteSuppliesModal: false,
      };
    // get deleted purchase list

    case types.GET_DELETED_PURCHASE_BY_ID_REQUEST:
      return { ...state, fetchingDeletedPurchaseById: true };
    case types.GET_DELETED_PURCHASE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingDeletedPurchaseById: false,
        deletedPurchase: action.payload,
      };
    case types.GET_DELETED_PURCHASE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingDeletedPurchaseById: false,
        fetchingDeletedPurchaseByIdError: true,
      };

    case types.HANDLE_SUPPLIER_CONTACT_MODAL:
      return { ...state, addSupplierContactModal: action.payload };

    /**
     * add  supplier's contact
     */

    case types.ADD_SUPPLIER_CONTACT_REQUEST:
      return { ...state, addingContactSupplier: true };
    case types.ADD_SUPPLIER_CONTACT_SUCCESS:
      return {
        ...state,
        addingContactSupplier: false,
        addSupplierContactModal: false,
      };
    case types.ADD_SUPPLIER_CONTACT_FAILURE:
      return {
        ...state,
        addingContactSupplier: false,
        addingContactSupplierError: true,
        addSupplierContactModal: false,
      };

    /**
     * get  supplier's contact list
     */
    case types.GET_SUPPLIER_CONTACT_LIST_BY_ID_REQUEST:
      return { ...state, fetchingSupplierContactListById: true };
    case types.GET_SUPPLIER_CONTACT_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingSupplierContactListById: false,
        contactSupplier: action.payload,
      };
    case types.GET_SUPPLIER_CONTACT_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingSupplierContactListById: false,
        fetchingSupplierContactListByIdError: true,
      };

    //get all Supplier
    case types.GET_ALL_SUPPLIER_REQUEST:
      return { ...state, fetchingAllSupplier: true };
    case types.GET_ALL_SUPPLIER_SUCCESS:
      return {
        ...state,
        fetchingAllSupplier: false,
        allSupplier: action.payload,
      };
    case types.GET_ALL_SUPPLIER_FAILURE:
      return {
        ...state,
        fetchingAllSupplier: false,
        fetchingAllSupplierError: true,
      };

    case types.SEARCH_DISPATCH_ITEM_REQUEST:
      return { ...state, searchDispatchItem: true };
    case types.SEARCH_DISPATCH_ITEM_SUCCESS:
      return {
        ...state,
        searchDispatchItem: false,
        supplierContact: action.payload,
      };
    case types.SEARCH_DISPATCH_ITEM_FAILURE:
      return {
        ...state,
        searchDispatchItem: false,
        searchDispatchItemError: true,
      };

    // //get contacts of Supplier
    // case types.GET_CONTACTS_OF_SUPPLIER_REQUEST:
    //   return { ...state, fetchingContactsOfSupplier: true };
    // case types.GET_CONTACTS_OF_SUPPLIER_SUCCESS:
    //   return {
    //     ...state,
    //     fetchingContactsOfSupplier: false,
    //     supplierContact: action.payload,
    //   };
    // case types.GET_CONTACTS_OF_SUPPLIER_FAILURE:
    //   return {
    //     ...state,
    //     fetchingContactsOfSupplier: false,
    //     fetchingContactsOfSupplierError: true,
    //   };
    /**
     * get  SUPPLIER's contact list
     */
    case types.GET_CONTACT_SUPPLIER_LIST_BY_ID_REQUEST:
      return { ...state, fetchingContactSupplierById: true };
    case types.GET_CONTACT_SUPPLIER_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingContactSupplierById: false,
        contactSupplier: action.payload,
      };
    case types.GET_CONTACT_SUPPLIER_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingContactSupplierById: false,
        fetchingContactSupplierByIdError: true,
      };

    /**
     * set Supplier dashboard to ALl or individual
     */
    case types.SET_SUPPLIER_DASHBOARD_TYPE:
      console.log(action.payload);
      return { ...state, suppliersDashboardType: action.payload };

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
    /**
      * get history of Supplier
      */
    case types.GET_SUPPLIER_HISTORY_REQUEST:
      return { ...state, fetchingSupplierHistory: true };
    case types.GET_SUPPLIER_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingSupplierHistory: false,
        supplierHistory: action.payload,
      };
    case types.GET_SUPPLIER_HISTORY_FAILURE:
      return {
        ...state,
        fetchingSupplierHistory: false,
        fetchingSupplierHistoryError: true,
      };

    /**
        * get the list of all activity Supplier
        */
    case types.GET_ACTIVITY_LIST_BY_SUPPLIERID_REQUEST:
      return { ...state, fetchingActivitySupplier: true };
    case types.GET_ACTIVITY_LIST_BY_SUPPLIERID_SUCCESS:
      return {
        ...state,
        fetchingActivitySupplier: false,
        activitySupplier: action.payload,
      };
    case types.GET_ACTIVITY_LIST_BY_SUPPLIERID_FAILURE:
      return {
        ...state,
        fetchingActivitySupplier: false,
        fetchingActivitySupplierError: true,
      };

    case types.HANDLE_UPDATE_SUPPLIERS_CONTACT_MODAL:
      return { ...state, updateSupplierContactModal: action.payload };


    case types.SET_SUPPLIER_CONTACT_EDIT:
      return { ...state, setEditingSupplierContact: action.payload };


    case types.UPDATE_SUPPLIER_CONTACT_REQUEST:
      return { ...state, updateSupplierContactById: true };
    case types.UPDATE_SUPPLIER_CONTACT_SUCCESS:
      return {
        ...state,
        updateSupplierContactById: false,
        updateSupplierContactModal: false,
        contactSupplier: state.contactSupplier.map((item) => {
          if (item.contactPersonId == action.payload.contactPersonId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SUPPLIER_CONTACT_FAILURE:
      return {
        ...state,
        updateSupplierContactById: false,
        updateSupplierContactByIdError: true,
        updateSupplierContactModal: false,
      };

    case types.HANDLE_UPDATE_SUPPLIERS_SUPPLIES_MODAL:
      return { ...state, updateSupplierSuppliesModal: action.payload };


    case types.SET_SUPPLIER_SUPPLIES_EDIT:
      return { ...state, setEditingSupplierSupplies: action.payload };


    case types.UPDATE_SUPPLIER_SUPPLIES_REQUEST:
      return { ...state, updateSupplierSuppliesById: true };
    case types.UPDATE_SUPPLIER_SUPPLIES_SUCCESS:
      return {
        ...state,
        updateSupplierSuppliesById: false,
        updateSupplierSuppliesModal: false,
        suppliesList: state.suppliesList.map((item) => {
          if (item.suppliesId == action.payload.suppliesId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SUPPLIER_SUPPLIES_FAILURE:
      return {
        ...state,
        updateSupplierSuppliesById: false,
        updateSupplierSuppliesByIdError: true,
      };

    case types.UPDATE_INSTOCK_SUPPLIES_REQUEST:
      return { ...state, updatingInStockSupplierSuppliesById: true };
    case types.UPDATE_INSTOCK_SUPPLIES_SUCCESS:
      return {
        ...state,
        updatingInStockSupplierSuppliesById: false,
        suppliesList: state.suppliesList.map((item) => {
          if (item.suppliesId == action.payload.suppliesId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_INSTOCK_SUPPLIES_FAILURE:
      return {
        ...state,
        updatingInStockSupplierSuppliesById: false,
        updatingInStockSupplierSuppliesByIdError: true,
      };

    case types.GET_PRODUCT_LIST_REQUEST:
      return { ...state, fetchingProductList: true };
    case types.GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        fetchingProductList: false,
        productList: action.payload,
      };
    case types.GET_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        fetchingProductList: false,
        fetchingProductListError: true,
      };

    case types.HANDLE_LINK_SUPPLIER_CATALOGUE_MODAL:
      return { ...state, addSupplierPurchaseCatalogueModal: action.payload };

    case types.GET_PURCHASE_ORDER_DETAILS_LIST_REQUEST:
      return { ...state, fetchingPoDetailsList: true };
    case types.GET_PURCHASE_ORDER_DETAILS_LIST_SUCCESS:
      return {
        ...state,
        fetchingPoDetailsList: false,
        poDetails: action.payload,
      };
    case types.GET_PURCHASE_ORDER_DETAILS_LIST_FAILURE:
      return {
        ...state,
        fetchingPoDetailsList: false,
        fetchingPoDetailsListError: true,
      };

    case types.EMPTY_SUPPLIER_LIST:
      return { ...state, supplierList: [] };



    default:
      return state;
  }
};
