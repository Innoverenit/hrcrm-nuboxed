import * as types from "./SuppliersActionType";
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

  viewType: "card",
  suppliersDashboardType: "All",

  addSuppliersModal: false,

  addingContactMand:false,
  addingContactMandError:false,

  removeAddressData:false,
  removeAddressDataError:false,

  updateContactAddress:false,
  updateContactAddressError:false,

  addSuppliersAddressModal:false,

  addingContactAddress:false,
  addingContactAddressError:false,
 
  fetchingContactAddress:false,
  fetchingContactAddressError:false,
  contactAddress:[],

  addingSuppliers: false,
  addingSuppliersError: false,

  fetchingSupplierList: false,
  fetchingSupplierListError: false,
  supplierList: [],

  fetchingDeletedSupplierCount: false,
  fetchingDeletedSupplierCountError: false,
  deletedCountSupplier:{},

  fetchingSupplierPriceList: false,
  fetchingSupplierPriceListError: false,
  supplierPriceList:[],

  updatingQualitySuppliers: false,
  updatingQualitySuppliersError: false,

  pOSupplierDetailsId: "",

  addLinkSuppliersOrderConfigureModal: false,

  clearbitPurchase: {},

  suppliersPriceOpenDrawer:false,

  clearbitPurchaseProduct: {},
  addPoListmModal: false,

  addTermsnCondition: false,

  clearbitPurchaseSupplier: {},

  addingPurchaseSuppliers: false,
  addingPurchaseSuppliersError: false,

  deletingSupplierData: false,
  deletingSupplierDataError: false,

  fetchingGeneratorSupplierList: false,
  fetchingGeneratorSupplierListError: false,
  generatorSuppliers: [],

  addSupplierInventoryImportModal:false,

  moveToInventory: false,
  moveToInventoryError: false,

  addSupplierSubscriptionModal: false,

  fetchingPurchaseSupplierList: false,
  fetchingPurchaseSupplierListError: false,
  purchaseList: [],

  fetchingTermsnConditionOfPO: false,
  fetchingTermsnConditionOfPOError: true,
  termsnconditionofpo: [],

  setEditingSuppliers: {},

  addSupplierCatalogueModal: false,

  updateSupplierModal: false,

  fetchingSupplierDetailsBySupplierId: false,
  fetchingSupplierDetailsBySupplierIdError: true,
  supplierDetailById: [],

  updateSuppliersById: false,
  updateSuppliersByIdError: false,

  setEditingSupplier: {},

  addSuppliersSuppliesConfigureModal: false,

  addingSuppliesToSupplier: false,
  addingSuppliesToSupplierError: false,

  reInstatedSupplierById: false,
  reInstatedSupplierByIdError: false,

  fetchingSuppliesList: false,
  fetchingSuppliesListError: false,
  suppliesList: [],

  fetchingMaterialWiseQuality: false,
   fetchingMaterialWiseQualityError: false ,
   materialwiseQuality:[],

   addingSupplierApproval: false,
   addingSupplierApprovalError: false,

   fetchingSupplierCountNot: false,
   fetchingSupplierCountNotError: false,
   countSupplierNot:{},

  suppliersListOpenDrawer:false,

  fetchingSuppliesListById: false,
  fetchingSuppliesListByIdError: false,
  suppliesBySupplier: [],

  addingSuppliersToggle: false,
  addingSuppliersToggleError: false,

  addingSuppliersInvetoryToggle: false,
  addingSuppliersInvetoryToggleError: false,

  addingManual: false,
  addingManualError:false,

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

  applyingForLoginInContact: false,
  applyingForLoginInContactError: false,

  addingSuppliersActivityTask: false,
  addingSuppliersActivityTaskError: false,

  updateSuppliersModal: false,

  updateEventModal: false,
  updateCallModal: false,
  updateTaskModal: false,

  addSuppliersActivityTableModal: false,

  updatingSuppliersCall: false,
  updatingSuppliersCallError: false,

  fetchingInventorylist: false,
  fetchingInventorylistError: false,
  inventoryList:[],

  fetchingCategorylist: false,
                        fetchingCategorylistError: false,
                        categoryList:[],

                        updatingPoContactValue: false,
                        updatingPoContactValueError: false,

  updatingSuppliersEvent: false,
  updatingSuppliersEventError: false,

  updatingSuppliersTask: false,
  updatingSuppliersTaskError: false,

  fetchingSupplierDeletedList: false,
  fetchingSupplierDeletedListError: false,
  supplierDeletedList: [],

  fetchingAllSupplierListById: false,
  fetchingAllSupplierListByIdError: false,
  allSupplierList: [],

  fetchingInputSupplierData: false,
  fetchingInputSupplierDataError: false,
  searchSupplierList:[],

  updateSupplierById: false,
  updateSupplierByIdError: false,

  fetchingSupplierNoteById: false,
  fetchingSupplierNoteByIdError: false,
  supplierNote: [],

  generatingOrderBySupplierId: false,
  generatingOrderBySupplierIdError: false,
  //document
  supplierDocumentUploadModal: false,

  supplierExcleUploadModal:false,
  //add document
  addingDocumentBySupplierId: false,
  addingDocumentBySupplierIdError: false,

  addDeleteSuppliesModal: false,

  updatePriceSupplierListItem: false,
  updatePriceSupplierListItemError: false,

  deletingSuppliesData: false,
  deletingSuppliesDataError: false,

  fetchingDeletedSuppliesBySuppliesId: false,
  fetchingDeletedSuppliesBySuppliesIdError: false,

  addDeletePurchaseModal: false,

  fetchingDeletedPurchaseById: false,
  fetchingDeletedPurchaseByIdError: false,

  deletingSuppliesData: false,
  deletingSuppliesDataError: false,

  fetchingContactShipperById: false,
  fetchingContactShipperByIdError: false,
  contactShipper: [],

  //get document
  fetchingDocumentsBySupplierId: false,
  fetchingDocumentsBySupplierIdError: false,
  documentsBySupplierId: [],

  addSupplierContactModal: false,


  removingSupplierNotApproval:false,
  removingSupplierNotApprovalError:false,

  addingContactSupplier: false,
  addingContactSupplierError: false,

  fetchingSupplierContactListById: false,
  fetchingSupplierContactListByIdError: false,
  contactSupplier: [],


  addingSupplierInventoryImportForm:false,
  addingSupplierInventoryImportFormError:false,

  fetchingInventoryAlllist: false,
  fetchingInventoryAlllistError: false,
  inventoryAllList:[],

  //getAllsuplr
  fetchingAllSupplier: false,
  fetchingAllSupplierError: false,
  allSupplier: false,

  //search dispatch item
  searchDispatchItem: false,
  searchDispatchItemError: false,
  supplierContact: [],

  fetchingContactDistributorsById: false,
  fetchingContactDistributorsByIdError: false,
  contactDistributor: [],


  fetchingNotApprovalSupplierList:false,
  fetchingNotApprovalSupplierListError:false,
  notApprovalSupplierList:[],

  fetchingContactSupplierById: false,
  fetchingContactSupplierByIdError: false,
  contactSupplier: [],

  fetchingSupplierHistory: false,
  fetchingSupplierHistoryrror: false,
  supplierHistory: false,

  addingTermsnCondition: false,
  addingTermsnConditionError: false,

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

  updatePriceByPoListItem: false,
  updatePriceByPoListItemError: false,

  updatingInStockSupplierSuppliesById: false,
  updatingInStockSupplierSuppliesByIdError: false,

  fetchingProductList: false,
  fetchingProductListError: false,
  productList: [],

  addingCurrencyInPo: false,
  addingCurrencyInPoError: false,

  fetchingGeneratorCatalogueSupplierList: false,
  fetchingGeneratorCatalogueSupplierListError: false,
  generatorCatalogueSuppliers: [],

  fetchingPoDetailsList: false,
  fetchingPoDetailsListError: false,
  poDetails: [],

  fetchingPurchaseOrder: false,
  fetchingPurchaseOrderError: false,
  poBySupplier: [],

  supplierSuppliesdrwr: false,

  fetchingSupplierSupplies: false,
  fetchingSupplierSuppliesError: false,
  supplierSuppliesList: [],

  fetchingSupplierCount: false,
  fetchingSupplierCountError: false,
  countSupplier: {},
  fetchingAllSupplierCount: false,
  fetchingAllSupplierCountError: false,
  allCountSupplier: {},

  fetchingSupplierSuppliesQuality: false,
  fetchingSupplierSuppliesQualityError: false,
  supplierSuppliesQuality: [],

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
      // if (dayjs().isBetween(dayjs(q1s), dayjs(q1e))) {
      //   return { ...date, startDate: q1s, endDate: q1e };
      // }
      // if (dayjs().isBetween(dayjs(q2s), dayjs(q2e))) {
      //   return { ...date, startDate: q2s, endDate: q2e };
      // }
      // if (dayjs().isBetween(dayjs(q3s), dayjs(q3e))) {
      //   return { ...date, startDate: q3s, endDate: q3e };
      // }
      // if (dayjs().isBetween(dayjs(q4s), dayjs(q4e))) {
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


      case types.EMPTY_NOT_APPROVED_SUPPLIER_LIST:
      return { ...state, notApprovalSupplierList: [] };


      case types.HANDLE_SUPPLIER_INVENTORY_IMPORT_MODAL:
        return { ...state, addSupplierInventoryImportModal: action.payload };

    case types.ADD_SUPPLIERS_REQUEST:
      return { ...state, addingSuppliers: true };
    case types.ADD_SUPPLIERS_SUCCESS:
      return {
        ...state, addingSuppliers: false, addSuppliersModal: false,
        supplierList: [action.payload, ...state.supplierList].filter(supplier => supplier.approvedInd !== false)
        //supplierList: [action.payload, ...state.supplierList]
      };
    case types.ADD_SUPPLIERS_FAILURE:
      return {
        ...state,
        addingSuppliers: false,
        addingSuppliersError: true,
        addSuppliersModal: false,
      };




      case types.ADD_SUPPLIER_INVENTORY_IMPORT_FORM_REQUEST:
      return { ...state, addingSupplierInventoryImportForm: true };
    case types.ADD_SUPPLIER_INVENTORY_IMPORT_FORM_SUCCESS:
      return {
        ...state,
        addingSupplierInventoryImportForm: false,
        addSupplierInventoryImportModal: false,
        // organizationDocumentDrawer: false,
        // repositoryData: [
        //   action.payload,
        //   ...state.repositoryData,
        //  ],

      };
    case types.ADD_SUPPLIER_INVENTORY_IMPORT_FORM_FAILURE:
      return {
        ...state, addingSupplierInventoryImportForm: false,
        addingSupplierInventoryImportFormError:true,
        // addCustomerModal: false 
      };

      case types.UPDATE_QUALITY_SUPPLIERS_REQUEST:
        return { ...state, updatingQualitySuppliers: true };
      case types.UPDATE_QUALITY_SUPPLIERS_SUCCESS:
        return {
          ...state, updatingQualitySuppliers: false, suppliersListOpenDrawer: false,
          // supplierList: [action.payload, ...state.supplierList]
        };
      case types.UPDATE_QUALITY_SUPPLIERS_FAILURE:
        return {
          ...state,
          updatingQualitySuppliers: false,
          updatingQualitySuppliersError: true,
          suppliersListOpenDrawer: false,
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


      case types.GET_SUPPLIERS_PRICE_LIST_REQUEST:
        return { ...state, fetchingSupplierPriceList: true };
      case types.GET_SUPPLIERS_PRICE_LIST_SUCCESS:
        return {
          ...state,
          fetchingSupplierPriceList: false,
          supplierPriceList: [...state.supplierPriceList, ...action.payload]
        };
      case types.GET_SUPPLIERS_PRICE_LIST_FAILURE:
        return {
          ...state,
          fetchingSupplierPriceList: false,
          fetchingSupplierPriceListError: true,
        };
  

    case types.GET_SUPPLIES_LIST_BY_SUPPLIER_REQUEST:
      return { ...state, fetchingSuppliesListById: true };
    case types.GET_SUPPLIES_LIST_BY_SUPPLIER_SUCCESS:
      return {
        ...state,
        fetchingSuppliesListById: false,
        suppliesBySupplier: action.payload
      };
    case types.GET_SUPPLIES_LIST_BY_SUPPLIER_FAILURE:
      return {
        ...state,
        fetchingSuppliesListById: false,
        fetchingSuppliesListByIdError: true,

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
        generatorSuppliers: [],
        pOSupplierDetailsId: ""
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

    case types.GET_PURCHASE_ORDER_REQUEST:
      return { ...state, fetchingPurchaseOrder: true };
    case types.GET_PURCHASE_ORDER_SUCCESS:
      return {
        ...state,
        fetchingPurchaseOrder: false,
        poBySupplier: action.payload,
      };
    case types.GET_PURCHASE_ORDER_FAILURE:
      return {
        ...state,
        fetchingPurchaseOrder: false,
        fetchingPurchaseOrderError: true,
      };

    case types.MOVE_TO_INVENTORY_REQUEST:
      return { ...state, moveToInventory: true };
    case types.MOVE_TO_INVENTORY_SUCCESS:
      return {
        ...state,
        moveToInventory: false,
        addlocationInPo: false
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

    case types.HANDLE_PO_LIST_MODAL:
      return { ...state, addPoListmModal: action.payload };

    case types.HANDLE_TERMS_CONDITION_MODAL:
      return { ...state, addTermsnCondition: action.payload };

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
        // supplierList: state.viewType === "dashboard" ? null : action.payload,
        // allSupplierList: state.viewType === "dashboard" ? action.payload : null,
        searchSupplierList: action.payload,
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



    case types.REMOVE_SUPPLIER_NOT_APPROVAL_REQUEST:
      return { ...state, removingSupplierNotApproval: true };
    case types.REMOVE_SUPPLIER_NOT_APPROVAL_SUCCESS:
      return {
        ...state,
        removingSupplierNotApproval: false,
       
        notApprovalSupplierList: state.notApprovalSupplierList.filter(
          (item) => item.supplierId !== action.payload
        ),
      };
    case types.REMOVE_SUPPLIER_NOT_APPROVAL_FAILURE:
      return {
        ...state,
        removingSupplierNotApproval: false,
        removingSupplierNotApprovalError: true,
      };


      case types.ADDING_SUPPLIER_APPROVAL_REQUEST:
        return { ...state, addingSupplierApproval: true };
      case types.ADDING_SUPPLIER_APPROVAL_SUCCESS:
        return {
          ...state,
          addingSupplierApproval: false,
          // supplierList: state.supplierList.map((item) => {
          //   if (item.supplierId === action.payload.supplierId) {
          //     return action.payload;
          //   } else {
          //     return item;
          //   }
          // }),
          supplierList: state.supplierList.filter(
            (item) => item.supplierId !== action.payload
          ),
        };
      case types.ADDING_SUPPLIER_APPROVAL_FAILURE:
        return {
          ...state,
          addingSupplierApproval: false,
          addingSupplierApprovalError: true,
        };


    case types.GET_SUPPLIERS_NOT_APPROVAL_LIST_REQUEST:
      return { ...state, fetchingNotApprovalSupplierList: true };
    case types.GET_SUPPLIERS_NOT_APPROVAL_LIST_SUCCESS:
      return {
        ...state,
        fetchingNotApprovalSupplierList: false,
        notApprovalSupplierList: [...state.notApprovalSupplierList, ...action.payload]
      };
    case types.GET_SUPPLIERS_NOT_APPROVAL_LIST_FAILURE:
      return {
        ...state,
        fetchingNotApprovalSupplierList: false,
        fetchingNotApprovalSupplierListError: true,
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

    //document
    case types.HANDLE_SUPPLIER_DOCUMENT_UPLOAD_MODAL:
      return { ...state, supplierDocumentUploadModal: action.payload };

      case types.HANDLE_SUPPLIER_EXCLE_UPLOAD_MODAL:
        return { ...state, supplierExcleUploadModal: action.payload };
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
    case types.GET_CONTACT_SHIPPER_LIST_BY_ID_REQUEST:
      return { ...state, fetchingContactShipperById: true };
    case types.GET_CONTACT_SHIPPER_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingContactShipperById: false,
        contactShipper: action.payload,
      };
    case types.GET_CONTACT_SHIPPER_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingContactShipperById: false,
        fetchingContactShipperByIdError: true,
      };

    case types.ADD_SUPPLIER_CONTACT_REQUEST:
      return { ...state, addingContactSupplier: true };
    case types.ADD_SUPPLIER_CONTACT_SUCCESS:
      return {
        ...state,
        addingContactSupplier: false,
        addSupplierContactModal: false,
        contactDistributor: [action.payload, ...state.contactDistributor],
        contactSupplier: [action.payload, ...state.contactSupplier],
        contactShipper: [action.payload, ...state.contactShipper]
      };
    case types.ADD_SUPPLIER_CONTACT_FAILURE:
      return {
        ...state,
        addingContactSupplier: false,
        addingContactSupplierError: true,
        addSupplierContactModal: false,
      };

    case types.APPLY_FOR_LOGIN_IN_CONTACT_REQUEST:
      return { ...state, applyingForLoginInContact: true };
    case types.APPLY_FOR_LOGIN_IN_CONTACT_SUCCESS:
      return {
        ...state,
        applyingForLoginInContact: false,
        contactSupplier: state.contactSupplier.map((item) => {
          if (item.contactPersonId === action.payload.contactPersonId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.APPLY_FOR_LOGIN_IN_CONTACT_FAILURE:
      return {
        ...state,
        applyingForLoginInContact: false,
        applyingForLoginInContactError: true,
      };

    case types.GET_CONTACT_DISTRIBUTORS_LIST_BY_ID_REQUEST:
      return { ...state, fetchingContactDistributorsById: true };
    case types.GET_CONTACT_DISTRIBUTORS_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingContactDistributorsById: false,
        contactDistributor: action.payload,
      };
    case types.GET_CONTACT_DISTRIBUTORS_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingContactDistributorsById: false,
        fetchingContactDistributorsByIdError: true,
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


    case types.UPDATE_PRICE_OF_PO_ITEM_REQUEST:
      return { ...state, updatePriceByPoListItem: true };
    case types.UPDATE_PRICE_OF_PO_ITEM_SUCCESS:
      return {
        ...state,
        updatePriceByPoListItem: false,
        poDetails: state.poDetails.map((item) => {
          if (item.suppliesId == action.payload.suppliesId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PRICE_OF_PO_ITEM_FAILURE:
      return {
        ...state,
        updatePriceByPoListItem: false,
        updatePriceByPoListItemError: true,
      };

    case types.ADD_TERMS_N_CONDITION_REQUEST:
      return { ...state, addingTermsnCondition: true };
    case types.ADD_TERMS_N_CONDITION_SUCCESS:
      return {
        ...state,
        addingTermsnCondition: false,

      };
    case types.ADD_TERMS_N_CONDITION_FAILURE:
      return {
        ...state,
        addingTermsnCondition: false,
        addingTermsnConditionError: true,
      };

    case types.ADD_CURRENCY_IN_PO_REQUEST:
      return { ...state, addingCurrencyInPo: true };
    case types.ADD_CURRENCY_IN_PO_SUCCESS:
      return {
        ...state,
        addingCurrencyInPo: false,
        purchaseList: state.purchaseList.map((item) => {
          if (item.poSupplierDetailsId == action.payload.poSupplierDetailsId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.ADD_CURRENCY_IN_PO_FAILURE:
      return {
        ...state,
        addingCurrencyInPo: false,
        addingCurrencyInPoError: true,
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

    case types.GET_TERMS_AND_CONDITION_OF_PO_REQUEST:
      return { ...state, fetchingTermsnConditionOfPO: true };
    case types.GET_TERMS_AND_CONDITION_OF_PO_SUCCESS:
      return {
        ...state,
        fetchingTermsnConditionOfPO: false,
        termsnconditionofpo: action.payload,
      };
    case types.GET_TERMS_AND_CONDITION_OF_PO_FAILURE:
      return {
        ...state,
        fetchingTermsnConditionOfPO: false,
        fetchingTermsnConditionOfPOError: true,

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

      case types.EMPTY_SUPPLIER_PRICE_LIST:
        return { ...state, supplierPriceList: [] };

    case types.HANDLE_SUPPLIERS_SUPPLIES_DRAWER:
      return { ...state, supplierSuppliesdrwr: action.payload };

    case types.GET_SUPPLIER_SUPPLIES_REQUEST:
      return {
        ...state,
        fetchingSupplierSupplies: true,
        fetchingSupplierSuppliesError: false,
      };
    case types.GET_SUPPLIER_SUPPLIES_SUCCESS:
      return {
        ...state,
        fetchingSupplierSupplies: false,
        fetchingSupplierSuppliesError: false,
        supplierSuppliesList: action.payload,
      };
    case types.GET_SUPPLIER_SUPPLIES_FAILURE:
      return {
        ...state,
        fetchingSupplierSupplies: false,
        fetchingSupplierSuppliesError: true,
      };

    case types.SET_SUPPLIER_SUPPLIES_REQUEST:
      return { ...state };
    case types.SET_SUPPLIER_SUPPLIES_SUCCESS:
      return {
        ...state,
        supplierSuppliesList: state.supplierSuppliesList.map(
          (item) => {
            if (item.suppliesId === action.payload.suppliesId) {
              return action.payload;
            } else {
              return item;
            }
          }),
      };
    case types.SET_SUPPLIER_SUPPLIES_FAILURE:
      return { ...state };


    case types.GET_SUPPLIER_COUNT_REQUEST:
      return { ...state, fetchingSupplierCount: true };
    case types.GET_SUPPLIER_COUNT_SUCCESS:
      return {
        ...state,
        fetchingSupplierCount: false,
        countSupplier: action.payload,
      };
    case types.GET_SUPPLIER_COUNT_FAILURE:
      return {
        ...state,
        fetchingSupplierCount: false,
        fetchingSupplierCountError: true,
      };

      case types.GET_SUPPLIER_COUNT_NOT_REQUEST:
      return { ...state, fetchingSupplierCountNot: true };
    case types.GET_SUPPLIER_COUNT_NOT_SUCCESS:
      return {
        ...state,
        fetchingSupplierCountNot: false,
        countSupplierNot: action.payload,
      };
    case types.GET_SUPPLIER_COUNT_NOT_FAILURE:
      return {
        ...state,
        fetchingSupplierCountNot: false,
        fetchingSupplierCountNotError: true,
      };

    case types.GET_ALL_SUPPLIER_COUNT_REQUEST:
      return { ...state, fetchingAllSupplierCount: true };
    case types.GET_ALL_SUPPLIER_COUNT_SUCCESS:
      return {
        ...state,
        fetchingAllSupplierCount: false,
        allCountSupplier: action.payload,
      };
    case types.GET_ALL_SUPPLIER_COUNT_FAILURE:
      return {
        ...state,
        fetchingAllSupplierCount: false,
        fetchingAllSupplierCountError: true,
      };


      case types.GET_DELETED_SUPPLIER_COUNT_REQUEST:
        return { ...state, fetchingDeletedSupplierCount: true };
      case types.GET_DELETED_SUPPLIER_COUNT_SUCCESS:
        return {
          ...state,
          fetchingDeletedSupplierCount: false,
          deletedCountSupplier: action.payload,
        };
      case types.GET_DELETED_SUPPLIER_COUNT_FAILURE:
        return {
          ...state,
          fetchingDeletedSupplierCount: false,
          fetchingDeletedSupplierCountError: true,
        };

    case types.GET_SUPPLIER_SUPPLIES_QUALITY_REQUEST:
      return {
        ...state,
        fetchingSupplierSuppliesQuality: true,
        fetchingSupplierSuppliesQualityError: false,
      };
    case types.GET_SUPPLIER_SUPPLIES_QUALITY_SUCCESS:
      return {
        ...state,
        fetchingSupplierSuppliesQuality: false,
        fetchingSupplierSuppliesQualityError: false,
        supplierSuppliesQuality: action.payload,
      };
    case types.GET_SUPPLIER_SUPPLIES_QUALITY_FAILURE:
      return {
        ...state,
        fetchingSupplierSuppliesQuality: false,
        fetchingSupplierSuppliesQualityError: true,
      };

    case types.DELETE_SUPPLIER_DATA_REQUEST:
      return { ...state, deletingSupplierData: true };
    case types.DELETE_SUPPLIER_DATA_SUCCESS:
      return {
        ...state,
        deletingSupplierData: false,
        supplierList: state.supplierList.filter(
          (item) => item.supplierId !== action.payload
        ),
      };
    case types.DELETE_SUPPLIER_DATA_FAILURE:
      return {
        ...state,
        deletingSupplierData: false,
        deletingSupplierDataError: true,
      };

    case types.UPDATE_SUPPLIERS_BY_ID_REQUEST:
      return { ...state, updateSuppliersById: true };
    case types.UPDATE_SUPPLIERS_BY_ID_SUCCESS:
      return {
        ...state,
        updateSuppliersById: false,
        updateSupplierModal: false,
        supplierList: state.supplierList.map((item) => {
          if (item.supplierId == action.payload.supplierId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_SUPPLIERS_BY_ID_FAILURE:
      return {
        ...state,
        updateSuppliersById: false,
        updateSuppliersByIdError: true,
      };

    case types.SET_SUPPLIERS_EDIT:
      return { ...state, setEditingSuppliers: action.payload };


    case types.GET_SUPPLIERS_DELETED_LIST_REQUEST:
      return { ...state, fetchingSupplierDeletedList: true };
    case types.GET_SUPPLIERS_DELETED_LIST_SUCCESS:
      return {
        ...state,
        fetchingSupplierDeletedList: false,
        supplierDeletedList: action.payload,
      };
    case types.GET_SUPPLIERS_DELETED_LIST_FAILURE:
      return {
        ...state,
        fetchingSupplierDeletedList: false,
        fetchingSupplierDeletedListError: true,
      };


      case types.HANDLE_SUPPLIERS_PRICE_DRAWER:
        return { ...state, suppliersPriceOpenDrawer: action.payload };

        case types.HANDLE_SUPPLIERS_LIST_DRAWER:
          return { ...state, suppliersListOpenDrawer: action.payload };



          case types.UPDATE_PRICE_OF_SUPPLIER_REQUEST:
            return { ...state, updatePriceSupplierListItem: true };
          case types.UPDATE_PRICE_OF_SUPPLIER_SUCCESS:
            return {
              ...state,
              updatePriceSupplierListItem: false,
              supplierPriceList: state.supplierPriceList.map((item) => {
                if (item.suppliesId == action.payload.suppliesId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.UPDATE_PRICE_OF_SUPPLIER_FAILURE:
            return {
              ...state,
              updatePriceSupplierListItem: false,
              updatePriceSupplierListItemError: true,
            };


            case types.GET_SUPPLIER_WISE_QUALITY_REQUEST:
              return { ...state, fetchingMaterialWiseQuality: true };
            case types.GET_SUPPLIER_WISE_QUALITY_SUCCESS:
              return { ...state, fetchingMaterialWiseQuality: false, materialwiseQuality: action.payload };
            case types.GET_SUPPLIER_WISE_QUALITY_FAILURE:
              return { ...state, fetchingMaterialWiseQuality: false, fetchingMaterialWiseQualityError: true };



              case types.REINSTATE_TOGGLE_FOR_SUPPLIER_REQUEST:
                return { ...state, reInstatedSupplierById: true };
            case types.REINSTATE_TOGGLE_FOR_SUPPLIER_SUCCESS:
                return {
                    ...state,
                    reInstatedSupplierById: false,
                    supplierDeletedList: state.supplierDeletedList.filter(
                        (item) => item.supplierId !== action.payload
                      ),
                 
                };
            case types.REINSTATE_TOGGLE_FOR_SUPPLIER_FAILURE:
                return {
                    ...state,
                    reInstatedSupplierById: false,
                    reInstatedSupplierByIdError: true,
                };

                case types.ADD_MANUAL_REQUEST:
                  return { ...state, addingManual: true };
                case types.ADD_MANUAL_SUCCESS:
                  return {
                    ...state,
                    addingManual: false,
                    supplierExcleUploadModal: false,
                    inventoryList: [...action.payload, ...state.inventoryList],
                    
                    // inventoryList: state.inventoryList.map((item) => {
                    //   if (item.userId === action.payload.userId) {
                    //     return action.payload;
                    //   } else {
                    //     return item;
                    //   }
                    // }),
                  };
                case types.ADD_MANUAL_FAILURE:
                  return {
                    ...state,
                     addingManual: false,
                     addingManualError:true,
                    
                  };

                  case types.GET_INVENTORYLIST_REQUEST:
                    return { ...state, fetchingInventorylist: true };
                  case types.GET_INVENTORYLIST_SUCCESS:
                    return {
                      ...state,
                      fetchingInventorylist: false,
                      inventoryList: action.payload,
                    };
                  case types.GET_INVENTORYLIST_FAILURE:
                    return {
                      ...state,
                      fetchingInventorylist: false,
                      fetchingInventorylistError: true,
                    };

                    case types.GET_INVENTORYALLLIST_REQUEST:
                    return { ...state, fetchingInventoryAlllist: true };
                  case types.GET_INVENTORYALLLIST_SUCCESS:
                    return {
                      ...state,
                      fetchingInventoryAlllist: false,
                      inventoryAllList: action.payload,
                    };
                  case types.GET_INVENTORYALLLIST_FAILURE:
                    return {
                      ...state,
                      fetchingInventoryAlllist: false,
                      fetchingInventoryAlllistError: true,
                    };

                    case types.GET_CATEGORYLIST_REQUEST:
                      return { ...state, fetchingCategorylist: true };
                    case types.GET_CATEGORYLIST_SUCCESS:
                      return {
                        ...state,
                        fetchingCategorylist: false,
                        categoryList: action.payload,
                      };
                    case types.GET_CATEGORYLIST_FAILURE:
                      return {
                        ...state,
                        fetchingCategorylist: false,
                        fetchingCategorylistError: true,
                      };

                      case types.UPDATE_PO_CONTACT_REQUEST:
                        return { ...state, updatingPoContactValue: true };
                      case types.UPDATE_PO_CONTACT_SUCCESS:
                        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
                        return {
                          ...state,
                          updatingPoContactValue: false,
                          purchaseList: state.purchaseList.map((item) => {
                            if (item.poSupplierDetailsId == action.payload.poSupplierDetailsId) {
                              return action.payload;
                            } else {
                              return item;
                            }
                          }),
                        };
                      case types.UPDATE_PO_CONTACT_FAILURE:
                        return {
                          ...state,
                          updatingPoContactValue: false,
                          updatingPoContactValueError: true,
                        };

                        case types.GET_SEARCH_INVENTORY_REQUEST:
                          return { ...state, fetchingTradeSearchData: true };
                        case types.GET_SEARCH_INVENTORY_SUCCESS:
                          return {
                            ...state,
                            fetchingTradeSearchData: false,
                            inventoryList: action.payload,
                           
                          };
                        case types.GET_SEARCH_INVENTORY_FAILURE:
                          return { ...state, fetchingTradeSearchDataError: true };
                  
                          case types.HANDLE_CLAER_REDUCER_DATA_INVENTORY:
                                    return { ...state, 
                                      inventoryList: [], 
                                    };

                                    case types.LINK_SUPPLIERS_TOGGLE_REQUEST:
                                      return { ...state, addingSuppliersToggle: true };
                                    case types.LINK_SUPPLIERS_TOGGLE_SUCCESS:
                                      return {
                                        ...state,
                                        addingSuppliersToggle: false,
                                        supplierList: state.supplierList.map((item) => {
                                          if (item.supplierId === action.payload.supplierId) {
                                            return action.payload;
                                          } else {
                                            return item;
                                          }
                                        }),
                                      };
                                    case types.LINK_SUPPLIERS_TOGGLE_FAILURE:
                                      return {
                                        ...state,
                                        addingSuppliersToggle: false,
                                        addingSuppliersToggleError: true,
                                      };

                                      case types.LINK_SUPPLIERS_INVENTORY_TOGGLE_REQUEST:
                                        return { ...state, addingSuppliersInvetoryToggle: true };
                                      case types.LINK_SUPPLIERS_INVENTORY_TOGGLE_SUCCESS:
                                        return {
                                          ...state,
                                          addingSuppliersInvetoryToggle: false,
                                          inventoryList: state.inventoryList.map((item) => {
                                            if (item.inventorySupplieId === action.payload.inventorySupplieId) {
                                              return action.payload;
                                            } else {
                                              return item;
                                            }
                                          }),
                                        };
                                      case types.LINK_SUPPLIERS_INVENTORY_TOGGLE_FAILURE:
                                        return {
                                          ...state,
                                          addingSuppliersInvetoryToggle: false,
                                          addingSuppliersInvetoryToggleError: true,
                                        };

                                      case types.HANDLE_CLAER_SEARCHED_DATA_SUPPLIER:
                                        return { ...state, 
                                          searchSupplierList: [], 
                                        }; 

                                        case types.ADD_CONTACT_ADDRESS_REQUEST:
                                          return { ...state, addingContactAddress: true };
                                        case types.ADD_CONTACT_ADDRESS_SUCCESS:
                                          return {
                                            ...state,
                                            addingContactAddress: false,
                                            contactAddress:[action.payload,...state.contactAddress]
                                            // sectors: [...state.sectors, action.payload],
                                            
                                          };
                                        case types.ADD_CONTACT_ADDRESS_FAILURE:
                                          return {
                                            ...state,
                                            addingContactAddress: false,
                                            addingContactAddressError: true,
                                          };       
                                        
                                          return { ...state, fetchingContactAddress: true };
                                          case types.GET_CONTACT_ADDRESS_DATA_SUCCESS:
                                            return {
                                              ...state,
                                              fetchingContactAddress: false,
                                              contactAddress: action.payload,
                                            };
                                          case types.GET_CONTACT_ADDRESS_DATA_FAILURE:
                                            return {
                                              ...state,
                                              fetchingContactAddress: false,
                                              fetchingContactAddressError: true,
                                            };

                                            case types.UPDATE_CONTACT_ADDRESS_REQUEST:
        return { ...state, updateContactAddress: true };
      case types.UPDATE_CONTACT_ADDRESS_SUCCESS:
        return {
          ...state,
          //contactAddress
          updateContactAddress: false,
          contactAddress: state.contactAddress.map((item) => {
            if (item.addressId === action.payload.addressId) {
              return action.payload;
            } else {
              return item;
            }
          }),
          //sectors:[action.payload,...state.sectors]
          // sectors: [...state.sectors, action.payload],
          
        };
      case types.UPDATE_CONTACT_ADDRESS_FAILURE:
        return {
          ...state,
          updateContactAddress: false,
          updateContactAddressError: true,
        };


        case types.REMOVE_ADDRESS_DATA_REQUEST:
          return { ...state, removeAddressData: true };
        case types.REMOVE_ADDRESS_DATA_SUCCESS:
          return {
            ...state,
            removeAddressData: false,
            contactAddress: state.contactAddress.filter(
              (item) => item.addressId !== action.payload
            ),
          };
        case types.REMOVE_ADDRESS_DATA_FAILURE:
          return {
            ...state,
            removeAddressData: false,
            removeAddressDataError: false,
          };
  
          case types.ADD_CONTACT_MAND_REQUEST:
            return { ...state, addingContactMand: true };
          case types.ADD_CONTACT_MAND_SUCCESS:
            return {
              ...state,
              addingContactMand: false,
              //sectors:[action.payload,...state.sectors]
              // sectors: [...state.sectors, action.payload],
              
            };
          case types.ADD_CONTACT_MAND_FAILURE:
            return {
              ...state,
              addingContactMand: false,
              addingContactMandError: true,
            };
        

            case types.HANDLE_SUPPLIERS_ADDRESS_MODAL:
              return { ...state, addSuppliersAddressModal: action.payload };

              case types.INPUT_SEARCH_PO_REQUEST:
                return { ...state, fetchingSearchPo: true };
              case types.INPUT_SEARCH_PO_SUCCESS:
                return {
                  ...state,
                  fetchingSearchPo: false,
                  purchaseList: action.payload,
                };
              case types.INPUT_SEARCH_PO_FAILURE:
                return { ...state, fetchingSearchPoError: true };
        
                case types.HANDLE_CLAER_PO_DATA_PROCESS:
                  return { ...state, 
                    purchaseList: [], 
                  };



    default:
      return state;
  }
};
