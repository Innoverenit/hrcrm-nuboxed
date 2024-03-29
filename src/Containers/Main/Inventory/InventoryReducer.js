import * as types from "./InventoryActionType";

const initialState = {
  viewType: "table",
  addInventoryModal: false,

  addingInventory: false,
  addingInventoryError: false,

  fetchingInventoryList: false,
  fetchingInventoryListError: false,
  inventory: [],

  addMaterialReceived: false,

  addAwbNo: false,
  addingpickupdate: false,
  addingpickupdateError: false,

  fetchingPhoneListById: false,
  fetchingPhoneListByIdError: false,
  phoneListById: [],

  //inventory by id (details)
  fetchingInventoryById: false,
  fetchingInventoryByIdError: false,
  inventoryDetailById: [],

  fetchingPartNoByItem: false,
  fetchingPartNoByItemError: false,
  partNoByitem: [],

  // add inventory output
  addingInventoryOutput: false,
  addingInventoryOutputError: false,

  addCreateAwb: false,

  updatingValidationInRecive: false,
  updatingValidationInReciveError: false,

  transferingPoGrnToStock: false,
  transferingPoGrnToStockError: false,
  //output table
  fetchingAllInventoryOutput: false,
  fetchingAllInventoryOutputError: false,
  allInventoryOutput: [],

  generatingGrnForPo: false,
  generatingGrnForPoError: false,

  //consumption table
  fetchingAllInventoryConsumption: false,
  fetchingAllInventoryConsumptionError: false,
  allInventoryConsumption: [],

  // add consumption
  addingInventoryConsumption: false,
  addingInventoryConsumptionError: false,

  updatingReceivedDamagedUnit: false,
  updatingReceivedDamagedUnitError: false,
  //edit
  setEditingInventory: {},
  //received
  addingReceivedUser: false,
  addingReceivedUserError: false,
  receivedModal: false,
  //get received
  fetchingReceivedUserList: false,
  fetchingReceivedUserListError: false,
  allReceivedUser: [],
  //file damaged
  fileDamagedModal: false,

  //add dispatch

  phoneListData: {},

  addingDispatch: false,
  addingDispatchError: false,
  //get dispatch
  fetchingDispatch: false,
  fetchingDispatchError: false,
  dispatch: [],

  //shipper checkbox
  linkingShipperContact: false,
  linkingShipperContactError: false,
  setEditingShipperContactData: {},

  updatingInspection: false,
  updatingInspectionError: false,

  //get DispatchList
  fetchingDispatchList: false,
  fetchingDispatchListError: false,
  allDispatchList: [],

  addingRoomAndRackInInventory: false,
  addingRoomAndRackInInventoryError: false,

  addroomrackininventory: false,

  //get received details list
  fetchingReceivedDetailsList: false,
  fetchingReceivedDetailsListError: false,
  receivedDetailsList: [],

  addReceiveUnit: false,

  //dispatchModal
  dispatchModal: false,
  //receivedItem
  addRecievedItem: false,
  addRecievedItemError: false,
  //damagedItem
  addingDamagedItem: false,
  addingDamagedItemError: false,

  //pickupdatemodal
  openPickupDateModal: false,
  //add dispatch modal
  addDispatchModal: false,
  //dispatchFinalDataSave
  addingDispatchFinalData: false,
  addingDispatchFinalDataError: false,

  //outputReasonModal
  outputReasonModal: false,
  //addReason
  addingReason: false,
  addingReasonError: false,
  setEditingInventoryOutput: {},
  //output reason list
  // fetchingOutputReasonList: false,
  // fetchingOutputReasonListError: false,
  // outputReasonList: [],
  //consumptionReasonModal
  consumptionReasonModal: false,
  //addReason
  addingConsumptionReason: false,
  addingConsumptionReasonError: false,
  setEditingInventoryConsumption: {},
  //consumption reason list
  fetchingConsumptionReasonList: false,
  fetchingConsumptionReasonListError: false,
  consumptionReasonList: [],
  //output plus
  addOutputReasonModal: false,
  addingOutputPlusReason: false,
  addingOutputPlusReasonError: false,
  fetchingOutputPlusReasonList: false,
  fetchingOutputPlusReasonListError: false,
  outputPlusReasonList: [],
  //getshipperDetailsList
  fetchingShipperDetailsList: false,
  fetchingShipperDetailsListError: false,
  shipperDetailsList: [],

  viewType1: "repair",

  //delivery date
  addDeliverDate: false,
  setEditingReceivedDetails: {},
  setEditingReceiveInventory: {},

  //update Dispatch
  setEditingDispatch: {},
  fetchingUpdateDispatchList: false,
  fetchingUpdateDispatchListError: false,
  updateDispatchList: [],

  addReceivePhone: false,

  fetchingInventoryOutputReports: false,
  fetchingInventoryOutputReportsError: false,
  inventoryReports: [],

  deletingDispatchProductList: false,
  deletingDispatchProductListError: false,

  updatingDispatchShipping: false,
  updatingDispatchShippingError: false,

  fetchingDispatchShipperList: false,
  fetchingDispatchShipperListError: false,
  dispatchShipperList: [],

  fetchingInventoryDispatchProductList: false,
  fetchingInventoryDispatchProductListError: false,
  dispatchProductList: [],

  updatingShipperContact: false,
  updatingShipperContactError: false,

  searchingDispatchItem: false,
  searchingDispatchItemError: false,
  updatedShipper: [],

  updatingDispatchReceivePhone: false,
  updatingDispatchReceivePhoneError: false,

  fetchingShipperUpdateList: false,
  fetchingShipperUpdateListError: false,

  addingAirWayBillInShipper: false,
  addingAirWayBillInShipperError: false,

  receivedOrdeIdModal: false,
  invenReceivedNoteOrderModal: false,
  phoNoteReceivedOrderIdModal: false,

  updatingDispatchInspectionButton: false,
  updatingDispatchInspectionButtonError: false,

  dispatchMismatchData: false,

  dispatchPhoneData: false,

  fetchingRefurbishProduct: false,
  fetchingRefurbishProductError: false,
  refurbishProduct: [],

  fetchingMaterialReceiveData: false,
  fetchingMaterialReceiveDataError: false,
  materialReceiveData: [],

  fetchingMaterialReceiveDetailData: false,
  fetchingMaterialReceiveDetailDataError: false,
  receivedDetailData: [],

  fetchingGrnListOfAPo: false,
  fetchingGrnListOfAPoError: false,
  poGrnList: [],

  fetchingGrnNoByPoId: false,
  fetchingGrnNoByPoIdError: true,
  grnNoByPo: [],

  updatingPartIdOfAnItem: false,
  updatingPartIdOfAnItemError: false,

  fetchingReceivedUnitOfAnItem: false,
  fetchingReceivedUnitOfAnItemError: false,
  reciveUnitData: [],

  showGrnListOfPo: false,

  showStockItem: false,

  fetchingDispatchProductionLocId: false, fetchingDispatchProductionLocIdError: false,
  productionDispatchByLocsId: [],
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INVENTORY_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.SET_INVENTORY_DETAIL_VIEW_TYPE:
      return {
        ...state,
        viewType1: action.payload
      };

    case types.HANDLE_INVENTORY_MODAL:
      return { ...state, addInventoryModal: action.payload };

    case types.HANDLE_RECEIVED_UNIT_MODAL:
      return { ...state, addReceiveUnit: action.payload };

    case types.HANDLE_MATERIAL_RECEIVED_MODAL:
      return { ...state, addMaterialReceived: action.payload };

    //add Inventory

    case types.ADD_INVENTORY_REQUEST:
      return { ...state, addingInventory: true };
    case types.ADD_INVENTORY_SUCCESS:
      return {
        ...state,
        addingInventory: false,
        addInventoryModal: false,
      };
    case types.ADD_INVENTORY_FAILURE:
      return {
        ...state,
        addingInventory: false,
        addingInventoryError: true,
        addInventoryModal: false,
      };

    // get inventory

    case types.GET_INVENTORY_REQUEST:
      return { ...state, fetchingInventoryList: true };
    case types.GET_INVENTORY_SUCCESS:
      return {
        ...state,
        fetchingInventoryList: false,
        inventory: action.payload,
      };
    case types.GET_INVENTORY_FAILURE:
      return {
        ...state,
        fetchingInventoryList: false,
        fetchingInventoryListError: true,
      };

    //inventory by id
    case types.GET_INVENTORY_BY_ID_REQUEST:
      return { ...state, fetchingInventoryById: true };
    case types.GET_INVENTORY_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingInventoryById: false,
        inventoryDetailById: action.payload,
      };
    case types.GET_INVENTORY_BY_ID_FAILURE:
      return {
        ...state,
        fetchingInventoryById: false,
        fetchingInventoryByIdError: true,
      };
    //add output
    case types.ADD_INVENTORY_OUTPUT_REQUEST:
      return { ...state, addingInventoryOutput: true };
    case types.ADD_INVENTORY_OUTPUT_SUCCESS:
      return {
        ...state,
        addingInventoryOutput: false,
        // allInventoryOutput: state.allInventoryOutput.map((item) => {
        //   if (item.locationDetailsId == action.payload.locationDetailsId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),

        // allInventoryOutput
        // addInventoryModal: false,
        // clearbit: null,
      };
    case types.ADD_INVENTORY_OUTPUT_FAILURE:
      return {
        ...state,
        addingInventoryOutput: false,
        addingInventoryOutputError: true,
      };

    /**get the list of all output*/
    case types.GET_ALL_INVENTORY_OUTPUT_LIST_REQUEST:
      return { ...state, fetchingAllInventoryOutput: true };
    case types.GET_ALL_INVENTORY_OUTPUT_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllInventoryOutput: false,
        allInventoryOutput: action.payload,
      };
    case types.GET_ALL_INVENTORY_OUTPUT_LIST_FAILURE:
      return {
        ...state,
        fetchingAllInventoryOutput: false,
        fetchingAllInventoryOutputError: true,
      };

    /**get the list of all consumption*/
    case types.GET_ALL_INVENTORY_CONSUMPTION_LIST_REQUEST:
      return { ...state, fetchingAllInventoryConsumption: true };
    case types.GET_ALL_INVENTORY_CONSUMPTION_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllInventoryConsumption: false,
        allInventoryConsumption: action.payload,
      };
    case types.GET_ALL_INVENTORY_CONSUMPTION_LIST_FAILURE:
      return {
        ...state,
        fetchingAllInventoryConsumption: false,
        fetchingAllInventoryConsumptionError: true,
      };

    case types.ADD_INVENTORY_CONSUMPTION_REQUEST:
      return { ...state, addingInventoryConsumption: true };
    case types.ADD_INVENTORY_CONSUMPTION_SUCCESS:
      return {
        ...state,
        addingInventoryConsumption: false,
        // addProductionModal: false,
        // clearbit: null,
      };
    case types.ADD_INVENTORY_CONSUMPTION_FAILURE:
      return {
        ...state,
        addingInventoryConsumption: false,
        addingInventoryConsumptionError: true,
      };

    //edit particular row
    case types.SET_EDIT_INVENTORY:
      return { ...state, setEditingInventory: action.payload };
    case types.HANDLE_RECEIVED_MODAL:
      return { ...state, receivedModal: action.payload };

    //add received
    case types.ADD_RECEIVED_REQUEST:
      return { ...state, addingReceivedUser: true };
    case types.ADD_RECEIVED_SUCCESS:
      return {
        ...state,
        addingReceivedUser: false,
        addCreateAwb: false,
        addAwbNo: false
      };
    case types.ADD_RECEIVED_FAILURE:
      return {
        ...state,
        addingReceivedUser: false,
        addingReceivedUserError: true,
        addCreateAwb: false,
      };

    //get received
    case types.GET_RECEIVED_REQUEST:
      return { ...state, fetchingReceivedUserList: true };
    case types.GET_RECEIVED_SUCCESS:
      return {
        ...state,
        fetchingReceivedUserList: false,
        allReceivedUser: action.payload,
      };
    case types.GET_RECEIVED_FAILURE:
      return {
        ...state,
        fetchingReceivedUserList: false,
        fetchingReceivedUserListError: true,
      };

    case types.HANDLE_FILE_DAMAGED_MODAL:
      return { ...state, fileDamagedModal: action.payload };

    //add dispatch

    case types.ADD_DISPATCH_REQUEST:
      return { ...state, addingDispatch: true };
    case types.ADD_DISPATCH_SUCCESS:
      return {
        ...state,
        addingDispatch: false,
      };
    case types.ADD_DISPATCH_FAILURE:
      return {
        ...state,
        addingDispatch: false,
        addingDispatchError: true,
      };

    // get dispatch

    case types.GET_DISPATCH_REQUEST:
      return { ...state, fetchingDispatch: true };
    case types.GET_DISPATCH_SUCCESS:
      return {
        ...state,
        fetchingDispatch: false,
        dispatch: action.payload,
      };
    case types.GET_DISPATCH_FAILURE:
      return {
        ...state,
        fetchingDispatch: false,
        fetchingDispatchError: true,
      };

    case types.COMPLETE_SHIPPER_CONTACT_REQUEST:
      return { ...state, linkingShipperContact: true };
    case types.COMPLETE_SHIPPER_CONTACT_SUCCESS:
      return {
        ...state,
        linkingShipperContact: false,
        // addTeamTransferModal: false,
      };
    case types.COMPLETE_SHIPPER_CONTACT_FAILURE:
      return {
        ...state,
        linkingShipperContact: false,
        linkingShipperContactError: true,
      };

    //setEditShipperContactData
    case types.SET_EDIT_SHIPPER_CONTACT_DATA:
      return {
        ...state,
        setEditingShipperContactData: action.payload,
      };

    //get dispatchList
    case types.GET_DISPATCH_LIST_REQUEST:
      return { ...state, fetchingDispatchList: true };
    case types.GET_DISPATCH_LIST_SUCCESS:
      return {
        ...state,
        fetchingDispatchList: false,
        allDispatchList: action.payload,
      };
    case types.GET_DISPATCH_LIST_FAILURE:
      return {
        ...state,
        fetchingDispatchList: false,
        fetchingDispatchListError: true,
      };

    //get received details List
    case types.GET_RECEIVED_DETAILS_REQUEST:
      return { ...state, fetchingReceivedDetailsList: true };
    case types.GET_RECEIVED_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingReceivedDetailsList: false,
        receivedDetailsList: action.payload,
      };
    case types.GET_RECEIVED_DETAILS_FAILURE:
      return {
        ...state,
        fetchingReceivedDetailsList: false,
        fetchingReceivedDetailsListError: true,
      };

    case types.HANDLE_DISPTCH_MODAL:
      return {
        ...state,
        dispatchModal: action.payload,
      };

    //addReceivedItem
    case types.ADD_TOTAL_RECEIVED_ITEM_REQUEST:
      return { ...state, addRecievedItem: true };
    case types.ADD_TOTAL_RECEIVED_ITEM_SUCCESS:
      return {
        ...state,
        addRecievedItem: false,
        receivedModal: false,
      };
    case types.ADD_TOTAL_RECEIVED_ITEM_FAILURE:
      return {
        ...state,
        addRecievedItem: false,
        addRecievedItemError: false,
        receivedModal: false,
      };
    //addDamagedItem
    case types.ADD_TOTAL_DAMAGED_ITEM_REQUEST:
      return { ...state, addingDamagedItem: true };
    case types.ADD_TOTAL_DAMAGED_ITEM_SUCCESS:
      return {
        ...state,
        addingDamagedItem: false,
        fileDamagedModal: false,
      };
    case types.ADD_TOTAL_DAMAGED_ITEM_FAILURE:
      return {
        ...state,
        addingDamagedItem: false,
        addingDamagedItemError: false,
        fileDamagedModal: false,
      };

    //handlePickupdateModal
    case types.HANDLE_PICKUP_DATE_MODAL:
      return {
        ...state,
        openPickupDateModal: action.payload,
      };
    //dispatch add modal
    case types.HANDLE_ADD_DISPATCH_MODAL:
      return { ...state, addDispatchModal: action.payload, dispatch: [], updatedShipper: [] };

    //addFinalDataInLocation
    case types.ADD_FINAL_DATA_IN_THIRDSTEP_REQUEST:
      return { ...state, addingDispatchFinalData: true };
    case types.ADD_FINAL_DATA_IN_THIRDSTEP_SUCCESS:
      return {
        ...state,
        addingDispatchFinalData: false,
        addDispatchModal: false,
      };
    case types.ADD_FINAL_DATA_IN_THIRDSTEP_FAILURE:
      return {
        ...state,
        addingDispatchFinalData: false,
        addingDispatchFinalDataError: true,
        addDispatchModal: false,
      };
    //outputReasonIconModal
    case types.HANDLE_OUTPUT_REASON_MODAL:
      return {
        ...state,
        outputReasonModal: action.payload,
      };

    //add reason
    case types.ADD_REASON_REQUEST:
      return { ...state, addingReason: true };
    case types.ADD_REASON_SUCCESS:
      return {
        ...state,
        addingReason: false,
        outputReasonModal: false,
        addOutputReasonModal: false,
      };
    case types.ADD_REASON_FAILURE:
      return {
        ...state,
        addingReason: false,
        addingReasonError: true,
        outputReasonModal: false,
        addOutputReasonModal: false,
      };
    case types.SET_EDIT_INVENTORY_OUTPUT:
      return { ...state, setEditingInventoryOutput: action.payload };

    //get output reason list
    // case types.GET_OUTPUT_REASON_LIST_REQUEST:
    //   return { ...state, fetchingOutputReasonList: true };
    // case types.GET_OUTPUT_REASON_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     fetchingOutputReasonList: false,
    //     outputReasonList: action.payload,
    //   };
    // case types.GET_OUTPUT_REASON_LIST_FAILURE:
    //   return {
    //     ...state,
    //     fetchingOutputReasonList: false,
    //     fetchingOutputReasonListError: true,
    //   };
    //CONSUMPTION
    case types.SET_EDIT_INVENTORY_CONSUMPTION:
      return { ...state, setEditingInventoryConsumption: action.payload };

    case types.HANDLE_CONSUMPTION_REASON_MODAL:
      return {
        ...state,
        consumptionReasonModal: action.payload,
      };

    //add consumption reason
    case types.ADD_CONSUMPTION_REASON_REQUEST:
      return { ...state, addingConsumptionReason: true };
    case types.ADD_CONSUMPTION_REASON_SUCCESS:
      return {
        ...state,
        addingConsumptionReason: false,
        consumptionReasonModal: false,
      };
    case types.ADD_CONSUMPTION_REASON_FAILURE:
      return {
        ...state,
        addingConsumptionReason: false,
        addingConsumptionReasonError: true,
        consumptionReasonModal: false,
      };

    //get consumption reason list
    case types.GET_CONSUMPTION_REASON_LIST_REQUEST:
      return { ...state, fetchingConsumptionReasonList: true };
    case types.GET_CONSUMPTION_REASON_LIST_SUCCESS:
      return {
        ...state,
        fetchingConsumptionReasonList: false,
        consumptionReasonList: action.payload,
      };
    case types.GET_CONSUMPTION_REASON_LIST_FAILURE:
      return {
        ...state,
        fetchingConsumptionReasonList: false,
        fetchingConsumptionReasonListError: true,
      };
    //output plus
    case types.HANDLE_ADD_OUTPUT_REASON_MODAL:
      return { ...state, addOutputReasonModal: action.payload };

    //add output plus reason
    case types.ADD_OUTPUT_PLUS_REASON_REQUEST:
      return { ...state, addingOutputPlusReason: true };
    case types.ADD_OUTPUT_PLUS_REASON_SUCCESS:
      return {
        ...state,
        addingOutputPlusReason: false,
        addOutputReasonModal: false,
      };
    case types.ADD_OUTPUT_PLUS_REASON_FAILURE:
      return {
        ...state,
        addingOutputPlusReason: false,
        addingOutputPlusReasonError: true,
        addOutputReasonModal: false,
      };

    //get output plus reason list
    case types.GET_OUTPUT_PLUS_REASON_LIST_REQUEST:
      return { ...state, fetchingOutputPlusReasonList: true };
    case types.GET_OUTPUT_PLUS_REASON_LIST_SUCCESS:
      return {
        ...state,
        fetchingOutputPlusReasonList: false,
        outputPlusReasonList: action.payload,
      };
    case types.GET_OUTPUT_PLUS_REASON_LIST_FAILURE:
      return {
        ...state,
        fetchingOutputPlusReasonList: false,
        fetchingOutputPlusReasonListError: true,
      };

    //pickupDate
    case types.ADD_PICKUP_DATE_REQUEST:
      return { ...state, addingpickupdate: true };
    case types.ADD_PICKUP_DATE_SUCCESS:
      return {
        ...state,
        allDispatchList: state.allDispatchList.map((item) =>
          item.dispatchId === action.payload.dispatchId ? action.payload : item
        ),
        pickUpModal: false,
        addingpickupdate: false,

      };
    case types.ADD_PICKUP_DATE_FAILURE:
      return {
        ...state,
        pickUpModal: false,
        addingpickupdate: false,
        addingpickupdateError: true
      };

    //received delivery date

    case types.SET_EDIT_RECEIVED_DETAILS:
      return { ...state, setEditingReceivedDetails: action.payload };

    //get shipperdetails list
    case types.GET_SHIPPER_DETAILS_LIST_REQUEST:
      return { ...state, fetchingShipperDetailsList: true };
    case types.GET_SHIPPER_DETAILS_LIST_SUCCESS:
      return {
        ...state,
        fetchingShipperDetailsList: false,
        shipperDetailsList: action.payload,
      };
    case types.GET_SHIPPER_DETAILS_LIST_FAILURE:
      return {
        ...state,
        fetchingShipperDetailsList: false,
        fetchingShipperDetailsListError: true,
      };
    case types.ADD_DELIVERY_DATE_REQUEST:
      return {
        ...state,
      };
    case types.ADD_DELIVERY_DATE_SUCCESS:
      return {
        ...state,
        // allReceivedUser: state.allReceivedUser.map((item) =>
        //   item.dispatchId === action.payload.dispatchId ? action.payload : item
        // ),
        addDeliverDate: false,
      };
    case types.ADD_DELIVERY_DATE_FAILURE:
      return {
        ...state,
        addDeliverDate: false,
      };
    case types.HANDLE_DELIVERY_DATE_MODAL:
      return { ...state, addDeliverDate: action.payload };

    //edit receive particular row
    case types.SET_EDIT_RECEIVE_INVENTORY:
      return { ...state, setEditingReceiveInventory: action.payload };

    //dispatch Update
    case types.SET_EDIT_DISPATCH:
      return { ...state, setEditingDispatch: action.payload };

    //get shipperdetails list
    case types.GET_DISPATCH_UPDATE_REQUEST:
      return { ...state, fetchingUpdateDispatchList: true };
    case types.GET_DISPATCH_UPDATE_SUCCESS:
      return {
        ...state,
        fetchingUpdateDispatchList: false,
        updateDispatchList: action.payload,
      };
    case types.GET_DISPATCH_UPDATE_FAILURE:
      return {
        ...state,
        fetchingUpdateDispatchList: false,
        fetchingUpdateDispatchListError: true,
      };

    case types.GET_INVENTORY_REPORTS_REQUEST:
      return { ...state, fetchingInventoryOutputReports: true };
    case types.GET_INVENTORY_REPORTS_SUCCESS:
      return {
        ...state,
        fetchingInventoryOutputReports: false,
        inventoryReports: action.payload,
      };
    case types.GET_INVENTORY_REPORTS_FAILURE:
      return {
        ...state,
        fetchingInventoryOutputReports: false,
        fetchingInventoryOutputReportsError: true,
      };

    case types.DELETE_DISPATCH_PRODUCT_LIST_REQUEST:
      return { ...state, deletingDispatchProductList: true };
    case types.DELETE_DISPATCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        deletingDispatchProductList: false,
        dispatch: state.dispatch.filter(
          (item) => item.dispatchSuppliesDetailsId !== action.payload
        ),
      };
    case types.DELETE_DISPATCH_PRODUCT_LIST_FAILURE:
      return {
        ...state,
        deletingDispatchProductList: false,
        deletingDispatchProductListError: true,
      };

    case types.UPDATE_DISPATCH_SHIPPING_REQUEST:
      return { ...state, updatingDispatchShipping: true };
    case types.UPDATE_DISPATCH_SHIPPING_SUCCESS:
      return {
        ...state,
        updatingDispatchShipping: false,
        dispatchModal: false,
      };
    case types.UPDATE_DISPATCH_SHIPPING_FAILURE:
      return {
        ...state,
        updatingDispatchShipping: false,
        updatingDispatchShippingError: true,
        dispatchModal: false,
      };

    case types.GET_DISPATCH_SHIPPER_REQUEST:
      return { ...state, fetchingDispatchShipperList: true };
    case types.GET_DISPATCH_SHIPPER_SUCCESS:
      return {
        ...state,
        fetchingDispatchShipperList: false,
        dispatchShipperList: action.payload,
      };
    case types.GET_DISPATCH_SHIPPER_FAILURE:
      return {
        ...state,
        fetchingDispatchShipperList: false,
        fetchingDispatchShipperListError: true,
      };

    case types.GET_INVENTORY_DISPATCH_PRODUCT_REQUEST:
      return { ...state, fetchingInventoryDispatchProductList: true };
    case types.GET_INVENTORY_DISPATCH_PRODUCT_SUCCESS:
      return {
        ...state,
        fetchingInventoryDispatchProductList: false,
        dispatchProductList: action.payload,
      };
    case types.GET_INVENTORY_DISPATCH_PRODUCT_FAILURE:
      return {
        ...state,
        fetchingInventoryDispatchProductList: false,
        fetchingInventoryDispatchProductListError: true,
      };

    case types.UPDATE_SHIPPER_CONTACT_REQUEST:
      return { ...state, updatingShipperContact: true };
    case types.UPDATE_SHIPPER_CONTACT_SUCCESS:
      return {
        ...state,
        updatingShipperContact: false,
        // addTeamTransferModal: false,
      };
    case types.UPDATE_SHIPPER_CONTACT_FAILURE:
      return {
        ...state,
        updatingShipperContact: false,
        updatingShipperContactError: true,
      };

    case types.SEARCH_DISPATCH_ITEM_REQUEST:
      return { ...state, searchingDispatchItem: true };
    case types.SEARCH_DISPATCH_ITEM_SUCCESS:
      return {
        ...state,
        searchingDispatchItem: false,
        updatedShipper: action.payload,
      };
    case types.SEARCH_DISPATCH_ITEM_FAILURE:
      return {
        ...state,
        searchingDispatchItem: false,
        searchingDispatchItemError: true,
      };

    case types.GET_DISPATCH_SHIPPER_UPDATE_REQUEST:
      return { ...state, fetchingShipperUpdateList: true };
    case types.GET_DISPATCH_SHIPPER_UPDATE_SUCCESS:
      return {
        ...state,
        fetchingShipperUpdateList: false,
        updatedShipper: action.payload,
      };
    case types.GET_DISPATCH_SHIPPER_UPDATE_FAILURE:
      return {
        ...state,
        fetchingShipperUpdateList: false,
        fetchingShipperUpdateListError: true,
      };

    case types.ADD_AIR_WAY_BILL_IN_SHIPPER_REQUEST:
      return { ...state, addingAirWayBillInShipper: true };
    case types.ADD_AIR_WAY_BILL_IN_SHIPPER_SUCCESS:
      return {
        ...state,
        addingAirWayBillInShipper: false,
        updatedShipper: state.updatedShipper.map((item) =>
          item.dispatchShipperId === action.payload.dispatchShipperId
            ? action.payload : item
        ),
      };
    case types.ADD_AIR_WAY_BILL_IN_SHIPPER_FAILURE:
      return {
        ...state,
        addingAirWayBillInShipper: false,
        addingAirWayBillInShipperError: true,
      };
    case types.HANDLE_RECEIVED_ORDERID_MODAL:
      return {
        ...state,
        receivedOrdeIdModal: action.payload,
      };

    case types.HANDLE_INVENTORY_RECEIVED_NOTE_ORDER_MODAL:
      return { ...state, invenReceivedNoteOrderModal: action.payload }

    case types.HANDLE_RECEIVED_ORDERID_PHONE_NOTE_MODAL:
      return { ...state, phoNoteReceivedOrderIdModal: action.payload }

    case types.HANDLE_INVENTORY_ROOM_RACK_MODAL:
      return { ...state, addroomrackininventory: action.payload };

    case types.ADD_ROOM_AND_RACK_IN_INVENTORY_REQUEST:
      return { ...state, addingRoomAndRackInInventory: true };
    case types.ADD_ROOM_AND_RACK_IN_INVENTORY_SUCCESS:
      return {
        ...state,
        addingRoomAndRackInInventory: false,
        addroomrackininventory: false,
      };
    case types.ADD_ROOM_AND_RACK_IN_INVENTORY_FAILURE:
      return {
        ...state,
        addingRoomAndRackInInventory: false,
        addingRoomAndRackInInventoryError: true,
        addroomrackininventory: false,
      };

    case types.UPDATE_VALIDATION_IN_RECEIVE_REQUEST:
      return { ...state, updatingValidationInRecive: true };
    case types.UPDATE_VALIDATION_IN_RECEIVE_SUCCESS:
      return {
        ...state,
        updatingValidationInRecive: false,
        addReceivePhone: false
      };
    case types.UPDATE_VALIDATION_IN_RECEIVE_FAILURE:
      return {
        ...state,
        updatingValidationInRecive: false,
        updatingValidationInReciveError: true,
      };

    case types.HANDLE_RECEIVE_PHONE_MODAL:
      return {
        ...state,
        addReceivePhone: action.payload,
      };

    case types.UPDATE_INSPECTION_REQUEST:
      return { ...state, updatingInspection: true };
    case types.UPDATE_INSPECTION_SUCCESS:
      return {
        ...state,
        updatingInspection: false,
        receivedOrdeIdModal: false
      };
    case types.UPDATE_INSPECTION_FAILURE:
      return {
        ...state,
        updatingInspection: false,
        updatingInspectionError: true,
      };

    case types.GET_PHONE_LIST_BY_ID_REQUEST:
      return { ...state, fetchingPhoneListById: true };
    case types.GET_PHONE_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingPhoneListById: false,
        phoneListById: action.payload
      };
    case types.GET_PHONE_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingPhoneListById: false,
        fetchingPhoneListByIdError: true,
      };

    case types.SET_PHONELIST_EDIT:
      return { ...state, phoneListData: action.payload };

    case types.SET_DISPATCH_PHONELIST_EDIT:
      return { ...state, dispatchPhoneData: action.payload };

    case types.UPDATE_DISPATCH_INSPECTION_BUTTON_REQUEST:
      return { ...state, updatingDispatchInspectionButton: true };
    case types.UPDATE_DISPATCH_INSPECTION_BUTTON_SUCCESS:
      return {
        ...state,
        updatingDispatchInspectionButton: false,
        openPickupDateModal: false
      };
    case types.UPDATE_DISPATCH_INSPECTION_BUTTON_FAILURE:
      return {
        ...state,
        updatingDispatchInspectionButton: false,
        updatingDispatchInspectionButtonError: true,
      };

    case types.UPDATE_DISPATCH_RECEIVE_PHONE_REQUEST:
      return { ...state, updatingDispatchReceivePhone: true };
    case types.UPDATE_DISPATCH_RECEIVE_PHONE_SUCCESS:
      return {
        ...state,
        updatingDispatchReceivePhone: false,
      };
    case types.UPDATE_DISPATCH_RECEIVE_PHONE_FAILURE:
      return {
        ...state,
        updatingDispatchReceivePhone: false,
        updatingDispatchReceivePhoneError: true,
      };

    case types.HANDLE_DISPATCH_RECEIVE_PHONE_MODAL:
      return { ...state, dispatchMismatchData: action.payload };

    case types.HANDLE_PICKUP_MODAL:
      return { ...state, pickUpModal: action.payload };

    case types.HANDLE_ADD_AWB_MODAL:
      return { ...state, addAwbNo: action.payload };

    case types.HANDLE_CREATE_AWB_MODAL:
      return { ...state, addCreateAwb: action.payload };

    case types.GET_PRODUCT_REFURBISH_REQUEST:
      return { ...state, fetchingRefurbishProduct: true };
    case types.GET_PRODUCT_REFURBISH_SUCCESS:
      return {
        ...state,
        fetchingRefurbishProduct: false,
        refurbishProduct: action.payload
      };
    case types.GET_PRODUCT_REFURBISH_FAILURE:
      return {
        ...state,
        fetchingRefurbishProduct: false,
        fetchingRefurbishProductError: true,
      };

    case types.GET_MATERIAL_RECEIVE_DATA_REQUEST:
      return { ...state, fetchingMaterialReceiveData: true };
    case types.GET_MATERIAL_RECEIVE_DATA_SUCCESS:
      return {
        ...state,
        fetchingMaterialReceiveData: false,
        materialReceiveData: action.payload
      };
    case types.GET_MATERIAL_RECEIVE_DATA_FAILURE:
      return {
        ...state,
        fetchingMaterialReceiveData: false,
        fetchingMaterialReceiveDataError: true,
      };

    case types.GET_MATERIAL_RECEIVE_DETAIL_DATA_REQUEST:
      return { ...state, fetchingMaterialReceiveDetailData: true };
    case types.GET_MATERIAL_RECEIVE_DETAIL_DATA_SUCCESS:
      return {
        ...state,
        fetchingMaterialReceiveDetailData: false,
        receivedDetailData: action.payload
      };
    case types.GET_MATERIAL_RECEIVE_DETAIL_DATA_FAILURE:
      return {
        ...state,
        fetchingMaterialReceiveDetailData: false,
        fetchingMaterialReceiveDetailDataError: true,

      };

    case types.UPDATE_RECEIVED_DAMAGED_UNIT_REQUEST:
      return { ...state, updatingReceivedDamagedUnit: true };
    case types.UPDATE_RECEIVED_DAMAGED_UNIT_SUCCESS:
      return {
        ...state,
        updatingReceivedDamagedUnit: false,
        receivedDetailData: state.receivedDetailData.map((item) =>
          item.suppliesId === action.payload.suppliesId
            ? action.payload : item
        ),
      };
    case types.UPDATE_RECEIVED_DAMAGED_UNIT_FAILURE:
      return {
        ...state,
        updatingReceivedDamagedUnit: false,
        updatingReceivedDamagedUnitError: true,
      };



    case types.GET_DISPATCH_PRODUCTION_BYLOC_ID_REQUEST:
      return { ...state, fetchingDispatchProductionLocId: true, fetchingDispatchProductionLocIdError: false };
    case types.GET_DISPATCH_PRODUCTION_BYLOC_ID_SUCCESS:
      return { ...state, fetchingDispatchProductionLocId: false, productionDispatchByLocsId: action.payload };
    case types.GET_DISPATCH_PRODUCTION_BYLOC_ID_FAILURE:
      return { ...state, fetchingDispatchProductionLocId: false, fetchingDispatchProductionLocIdError: true };

    case types.GENERATE_GRN_FOR_PO_REQUEST:
      return { ...state, generatingGrnForPo: true };
    case types.GENERATE_GRN_FOR_PO_SUCCESS:
      return {
        ...state,
        generatingGrnForPo: false,
        addMaterialReceived: false
      };
    case types.GENERATE_GRN_FOR_PO_FAILURE:
      return {
        ...state,
        generatingGrnForPo: false,
        generatingGrnForPoError: true,
      };

    case types.GET_PART_NO_BY_ITEM_REQUEST:
      return { ...state, fetchingPartNoByItem: true };
    case types.GET_PART_NO_BY_ITEM_SUCCESS:
      return {
        ...state,
        fetchingPartNoByItem: false,
        partNoByitem: action.payload
      };
    case types.GET_PART_NO_BY_ITEM_FAILURE:
      return {
        ...state,
        fetchingPartNoByItem: false,
        fetchingPartNoByItemError: true,

      };

    case types.HANDLE_GRN_LIST_MODAL:
      return { ...state, showGrnListOfPo: action.payload };

    case types.HANDLE_STOCK_ITEM_MODAL:
      return { ...state, showStockItem: action.payload };

    case types.GET_GRN_LIST_OF_A_PO_REQUEST:
      return { ...state, fetchingGrnListOfAPo: true };
    case types.GET_GRN_LIST_OF_A_PO_SUCCESS:
      return {
        ...state,
        fetchingGrnListOfAPo: false,
        poGrnList: action.payload
      };
    case types.GET_GRN_LIST_OF_A_PO_FAILURE:
      return {
        ...state,
        fetchingGrnListOfAPo: false,
        fetchingGrnListOfAPoError: true,

      };

    case types.TRANSFER_PO_GRN_TO_STOCK_REQUEST:
      return { ...state, transferingPoGrnToStock: true };
    case types.TRANSFER_PO_GRN_TO_STOCK_SUCCESS:
      return {
        ...state,
        transferingPoGrnToStock: false,
        receivedDetailData: state.receivedDetailData.map((item) =>
          item.poSupplierSuppliesId === action.payload.poSupplierSuppliesId ? action.payload : item
        ),
      };
    case types.TRANSFER_PO_GRN_TO_STOCK_FAILURE:
      return {
        ...state,
        transferingPoGrnToStock: false,
        transferingPoGrnToStockError: true,
      };

    case types.GET_RECEIVED_UNIT_OF_AN_ITEM_REQUEST:
      return { ...state, fetchingReceivedUnitOfAnItem: true };
    case types.GET_RECEIVED_UNIT_OF_AN_ITEM_SUCCESS:
      return {
        ...state,
        fetchingReceivedUnitOfAnItem: false,
        reciveUnitData: action.payload
      };
    case types.GET_RECEIVED_UNIT_OF_AN_ITEM_FAILURE:
      return {
        ...state,
        fetchingReceivedUnitOfAnItem: false,
        fetchingReceivedUnitOfAnItemError: true,
      };

    case types.UPDATE_PART_ID_OF_AN_ITEM_REQUEST:
      return { ...state, updatingPartIdOfAnItem: true };
    case types.UPDATE_PART_ID_OF_AN_ITEM_SUCCESS:
      return {
        ...state,
        updatingPartIdOfAnItem: false,
        reciveUnitData: state.reciveUnitData.map((item) =>
          item.supplierSuppliesUniqueNumberId === action.payload.supplierSuppliesUniqueNumberId
            ? action.payload : item
        ),
      };
    case types.UPDATE_PART_ID_OF_AN_ITEM_FAILURE:
      return {
        ...state,
        updatingPartIdOfAnItem: false,
        updatingPartIdOfAnItemError: true,
      };

    case types.GET_GRN_NO_BY_PO_ID_REQUEST:
      return { ...state, fetchingGrnNoByPoId: true };
    case types.GET_GRN_NO_BY_PO_ID_SUCCESS:
      return {
        ...state,
        fetchingGrnNoByPoId: false,
        grnNoByPo: action.payload
      };
    case types.GET_GRN_NO_BY_PO_ID_FAILURE:
      return {
        ...state,
        fetchingGrnNoByPoId: false,
        fetchingGrnNoByPoIdError: true,

      };
    default:
      return state;
  }
};
