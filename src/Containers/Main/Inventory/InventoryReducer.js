import * as types from "./InventoryActionType";

const initialState = {
  viewType: "repair",
  addInventoryModal: false,

  addPackData:false,

  addPackDataID:false,

  fetchingWasteMaterial: false,
            fetchingWasteMaterialError: false,
            westMaterial:[],

            fetchingWasteMaterialLocation: false,
            fetchingWasteMaterialLocationError: false,
            westMaterialLocation:[],

  fetchingCompleteDispatchSearch: false,
fetchingCompleteDispatchSearchError: false,

  fetchingSubList: false,
  fetchingSubListError: false,
  subList:[],

  addingMaterialStockToggle: false,
  addingMaterialStockToggleError: false,

  fetchingRepairSubList: false,
  fetchingRepairSubListError: false,
  repairSubList:[ 
//     {
//     "company": "Trustmi",
//     "model": "Wireless",
//     "color": "",
//     "conditions": "",
//     "qcInspectionInd": 0,
//     "inspectionInd": 2,
//     "dispatchInspectionInd": 2,
//     "qcStartTime": null,
//     "qcEndTime": null,
//     "estimateQcTimeHours": null,
//     "estimateQcTimeMinutes": null,
//     "estimateQcTimeSeconds": null,
//     "repairStartTime": null,
//     "repairEndTime": null,
//     "estimateRepairTimeHours": 0.0,
//     "estimateRepairTimeMinutes": 0.0,
//     "totalTimeTaken": 0.0,
//     "totalhours": 0.0,
//     "totalExtraCost": 0.0,
//     "totalSpares": 0.0,
//     "totalPrice": 0.0,
//     "newTotalPrice": 0.0,
//     "qcStatus": "Complete",
//     "repairStatus": "Complete",
//     "qcStartInd": 3,
//     "qrCodeId": 0,
//     "repairTechnicianName": "Test Technician",
//     "dispatchPhoneUserName": "Abinash Dash",
//     "cannotRepairInd": false,
//     "dispatchPhoneInd": true,
//     "mismatchInd": false,
//     "phRepairInd": true,
//     "phTechInd": true,
//     "receivePhoneInd": true,
//     "creationDate": "2024-11-14T04:13:23.812Z",
//     "dispatchPhoneDate": "2024-11-30T07:02:48.218Z",
//     "receivePhoneDate": "2024-11-14T04:14:15.148Z",
//     "dispatchPhoneUser": "EMP56515361090282024",
//     "distributorId": "DS92473354933292024",
//     "issue": "",
//     "orderPhoneId": "ORDPG38583598521142024",
//     "phoneId": "PHNG92559708110142024",
//     "receivePhoneUser": "EMP56515361090282024",
//     "userId": "EMP16818052295222021",
//     "pageCount": 0,
//     "dataCount": 0,
//     "listCount": 0,
//     "showQualityInspectionInd": true,
//     "totalCompleteTaskCount": 0,
//     "taskInCompleteCount": 0,
//     "totalTaskCount": 0,
//     "itemValue": 0.0,
//     "imei": 1234,
//     "os": "",
//     "gb": ""
// },
// {
//     "company": "Apple",
//     "model": "iPhone 11",
//     "color": "",
//     "conditions": "dead",
//     "qcInspectionInd": 0,
//     "inspectionInd": 2,
//     "dispatchInspectionInd": 2,
//     "qcStartTime": null,
//     "qcEndTime": null,
//     "estimateQcTimeHours": null,
//     "estimateQcTimeMinutes": null,
//     "estimateQcTimeSeconds": null,
//     "repairStartTime": null,
//     "repairEndTime": null,
//     "estimateRepairTimeHours": 0.0,
//     "estimateRepairTimeMinutes": 0.0,
//     "totalTimeTaken": 0.0,
//     "totalhours": 0.0,
//     "totalExtraCost": 0.0,
//     "totalSpares": 0.0,
//     "totalPrice": 0.0,
//     "newTotalPrice": 0.0,
//     "qcStatus": "Complete",
//     "repairStatus": "Complete",
//     "qcStartInd": 3,
//     "qrCodeId": 0,
//     "repairTechnicianName": "Test Technician",
//     "dispatchPhoneUserName": "Abinash Dash",
//     "cannotRepairInd": false,
//     "dispatchPhoneInd": true,
//     "mismatchInd": false,
//     "phRepairInd": true,
//     "phTechInd": true,
//     "receivePhoneInd": true,
//     "creationDate": "2024-11-14T04:13:23.776Z",
//     "dispatchPhoneDate": "2024-11-30T07:02:51.197Z",
//     "receivePhoneDate": "2024-11-14T04:14:17.030Z",
//     "dispatchPhoneUser": "EMP56515361090282024",
//     "distributorId": "DS92473354933292024",
//     "issue": "",
//     "orderPhoneId": "ORDPG38583598521142024",
//     "phoneId": "PHNG15618748932142024",
//     "receivePhoneUser": "EMP56515361090282024",
//     "userId": "EMP16818052295222021",
//     "pageCount": 0,
//     "dataCount": 0,
//     "listCount": 0,
//     "showQualityInspectionInd": true,
//     "totalCompleteTaskCount": 1,
//     "taskInCompleteCount": 0,
//     "totalTaskCount": 1,
//     "itemValue": 0.0,
//     "imei": 0,
//     "os": "",
//     "gb": ""
// },
// {
//     "company": "Apple",
//     "model": "iPhone 4S",
//     "color": "",
//     "conditions": "dead",
//     "qcInspectionInd": 0,
//     "inspectionInd": 2,
//     "dispatchInspectionInd": 2,
//     "qcStartTime": null,
//     "qcEndTime": null,
//     "estimateQcTimeHours": null,
//     "estimateQcTimeMinutes": null,
//     "estimateQcTimeSeconds": null,
//     "repairStartTime": null,
//     "repairEndTime": null,
//     "estimateRepairTimeHours": 0.0,
//     "estimateRepairTimeMinutes": 0.0,
//     "totalTimeTaken": 0.0,
//     "totalhours": 0.0,
//     "totalExtraCost": 0.0,
//     "totalSpares": 0.0,
//     "totalPrice": 0.0,
//     "newTotalPrice": 0.0,
//     "qcStatus": "Complete",
//     "repairStatus": "Complete",
//     "qcStartInd": 3,
//     "qrCodeId": 0,
//     "repairTechnicianName": "Test Technician",
//     "dispatchPhoneUserName": "Abinash Dash",
//     "cannotRepairInd": false,
//     "dispatchPhoneInd": true,
//     "mismatchInd": false,
//     "phRepairInd": true,
//     "phTechInd": true,
//     "receivePhoneInd": true,
//     "creationDate": "2024-11-14T04:13:23.739Z",
//     "dispatchPhoneDate": "2024-11-30T07:02:53.350Z",
//     "receivePhoneDate": "2024-11-14T04:14:18.912Z",
//     "dispatchPhoneUser": "EMP56515361090282024",
//     "distributorId": "DS92473354933292024",
//     "issue": "",
//     "orderPhoneId": "ORDPG38583598521142024",
//     "phoneId": "PHNG13573021448142024",
//     "receivePhoneUser": "EMP56515361090282024",
//     "userId": "EMP16818052295222021",
//     "pageCount": 0,
//     "dataCount": 0,
//     "listCount": 0,
//     "showQualityInspectionInd": true,
//     "totalCompleteTaskCount": 0,
//     "taskInCompleteCount": 0,
//     "totalTaskCount": 0,
//     "itemValue": 0.0,
//     "imei": 13589006288721,
//     "os": "",
//     "gb": ""
// }, 
],

  fetchingPackTrack: false,
  fetchingPackTrackError: false,
  packTrack:[],

  addingStockImportForm: false,
  addingStockImportFormError:false,

  fetchingCompleteDispatchList: false,
  fetchingCompleteDispatchListError: false,
  completeDispatchList:[],

  fetchingPackData: false,
  fetchingPackDataError: false,
  packData:[],

  fetchingPackNo: false,
  fetchingPackNoError: false,
  packNo:{},

  fetchingMaterialDamageData:false,
  fetchingMaterialDamageDataError:false,
  materialDamageData:[],

  fetchingCommerceList: false,
  fetchingCommerceListError: false,
  allCommerceList:[],

  addingInventory: false,
  addingInventoryError: false,

  inventoryExpandList:false,

  inventoryExpandTask:false,

  fetchingScanReceivedData:false,
  fetchingScanReceivedDataError:false,
  receivedScanData:{},

  fetchingQualityManufactureData:false,
  fetchingQualityManufactureDataError:false,
  qualityManufactureData:[],

 

  removingProductionQuality:false,
  removingProductionQualityError:false,

  fetchingInventoryList: false,
  fetchingInventoryListError: false,
  inventory: [],

  addMaterialReceived: false,

  addQualityManufactureDrawerModal:false,

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

  fetchingReceivedUser: false,
  fetchingReceivedUserError: false,
  allReceivedUser: [],

  fetchingCellNumber: false,
  fetchingCellNumberError: false,
  cellById: [],

  fetchingCellData: false,
  fetchingCellDataError: false,
  cellData: [],

  updatingValidationInRecive: false,
  updatingValidationInReciveError: false,

  fetchingItemHistoryDataInStock:false,
  fetchingItemHistoryDataInStockError:false,
  itemHistoryDataInStock:[],


  inventoryDispatchModal:false,

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

  linkDispatchStatus:false,
  linkDispatchStatusError:false,

  updatingReceivedDamagedUnit: false,
  updatingReceivedDamagedUnitError: false,
  //edit
  setEditingInventory: {},
  //received
  addingReceivedUser: false,
  addingReceivedUserError: false,
  receivedModal: false,


  addReceivedScanModal:false,
  //addrecivedAwb:{},

  //file damaged
  fileDamagedModal: false,

  //add dispatch

  setEdittingPhone: {},

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


  addingRepairData:false,
  addingRepairDataError:false,

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

  updatingRepairStatus: false,
  updatingRepairStatusError: false,

  addReceiveUnit: false,

  //dispatchModal
  dispatchModal: false,
  //receivedItem
  addingRecievedItem: false,
  addingRecievedItemError: false,
  //damagedItem
  addingDamagedItem: false,
  addingDamagedItemError: false,

  fetchingMaterialBestBefore:false,
  fetchingMaterialBestBeforeError:false,
  materialBestBefore:[],

  //pickupdatemodal
  openPickupDateModal: false,
  //add dispatch modal
  addDispatchModal: false,

  mismatchPhoneModal: false,

  addingDispatchFinalData: false,
  addingDispatchFinalDataError: false,

  //outputReasonModal
  outputReasonModal: false,
  //addReason
  addingReason: false,
  addingReasonError: false,
  setEditingInventoryOutput: {},

  fetchingItemInCellStock: false,
  fetchingItemInCellStockError: false,
  cellStock: [],

  fetchingMaterialUnitsData:false,
  fetchingMaterialUnitsDataError:false,
  materialUnitsData:[],

  fetchingItemHistoryInStock: false,
  fetchingItemHistoryInStockError: false,
  itemHistoryInStock: [],

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



  fetchingScanData:false,
  fetchingScanDataError:false,



  updateQualityStatus:false,
  updateQualityStatusError:false,
  //getshipperDetailsList
  fetchingShipperDetailsList: false,
  fetchingShipperDetailsListError: false,
  shipperDetailsList: [],

  fetchingQualityManufactureUserData:false,

  fetchingQualityManufactureUserDataError:false,
  qualityManufactureUserData:[],

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


  fetchingRejectManufactureDataError:false,
  fetchingRejectManufactureDataError:false,
  rejectManufactureData:[],

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



  addingDamagedCredit:false,
  addingDamagedCreditError:false,

  updatingDispatchReceivePhone: false,
  updatingDispatchReceivePhoneError: false,

  fetchingShipperUpdateList: false,
  fetchingShipperUpdateListError: false,


  movingRejectToggle:false,
  movingRejectToggleError:false,

  addingAirWayBillInShipper: false,
  addingAirWayBillInShipperError: false,

  receivedOrdeIdModal: false,
  invenReceivedNoteOrderModal: false,
  phoNoteReceivedOrderIdModal: false,



  addingAsileInBest:false,
  addingAsileInBestError:false,

  updatingDispatchInspectionButton: false,
  updatingDispatchInspectionButtonError: false,

  dispatchMismatchData: false,

  dispatchPhoneData: false,

  fetchingRefurbishProduct: false,
  fetchingRefurbishProductError: false,
  refurbishProduct: [],

  updatingOrderReceive: false,
  updatingOrderReceiveError: false,

  fetchingMaterialReceiveData: false,
  fetchingMaterialReceiveDataError: false,
  materialReceiveData: [],

  fetchingMaterialReceiveDetailData: false,
  fetchingMaterialReceiveDetailDataError: false,
  receivedDetailData: [],

  fetchingInventoryLocationRecords: false,
  fetchingInventoryLocationRecordsError: false,
  inventoryLocationCount: {},

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


  linkingManufactureStatus:false,
  linkingManufactureStatusError:false,
  


  addingDeliverDate: false,
  addingDeliverDateError: false,

  showGrnListOfPo: false,

  showStockItem: false,

  fetchingProductionQualityData:false,
  fetchingProductionQualityDataError:false,
  productionQualityData:[],

  fetchingDispatchProductionLocId: false, fetchingDispatchProductionLocIdError: false,
  productionDispatchByLocsId: [],

  stockUseDrwr: false,

  fetchingArchieveProductionLocId: false,
  fetchingArchieveProductionLocIdError: true,
  archieveInProduction: [],


  addingToWaste:false,
  addingToWasteError:false,

  addScanModal:false,

  addStockModal:false,

  roomRackbyLoc: [],
  fetchingRoomRack: false,
  fetchingRoomRackByIdError: false,

  fetchingRacklist: false,
  fetchingRacklistError: false,
  rackList: [],

  fetchingRejectManufactureData:false,
  fetchingRejectManufactureDataError:false,
  rejectManufactureData:[],

  rejectPhoneList: false,
  rejectPhoneListError: false,

  rejectedReasonModal: false,

  custoModal:false,

  fetchingOpenOrdeReceived: false,
  fetchingOpenOrdeReceivedError: false,
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


      case types.HANDLE_QUALITY_MANUFACTURE_DRAWER_MODAL:
        return { ...state, addQualityManufactureDrawerModal: action.payload };

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


      case types.HANDLE_RECEIVE_SCAN_MODAL:
        return { ...state, addReceivedScanModal: action.payload };



      case types.HANDLE_INVENTORY_DISPATCH_MODAL:
        return {
          ...state,
          inventoryDispatchModal: action.payload,
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




      case types.GET_MATERIAL_DAMAGE_DATA_REQUEST:
        return { ...state, fetchingMaterialDamageData: true };
      case types.GET_MATERIAL_DAMAGE_DATA_SUCCESS:
        return {
          ...state,
          fetchingMaterialDamageData: false,
          materialDamageData: action.payload
        };
      case types.GET_MATERIAL_DAMAGE_DATA_FAILURE:
        return {
          ...state,
          fetchingMaterialDamageData: false,
          fetchingMaterialDamageDataError: true,
        };

        case types.GET_PACK_DATA_REQUEST:
          return { ...state, fetchingPackData: true };
        case types.GET_PACK_DATA_SUCCESS:
          return {
            ...state,
            fetchingPackData: false,
            packData: action.payload
          };
        case types.GET_PACK_DATA_FAILURE:
          return {
            ...state,
            fetchingPackData: false,
            fetchingPackDataError: true,
          };

          case types.GET_PACK_NO_REQUEST:
            return { ...state, fetchingPackNo: true };
          case types.GET_PACK_NO_SUCCESS:
            return {
              ...state,
              fetchingPackNo: false,
              packNo: action.payload
            };
          case types.GET_PACK_NO_FAILURE:
            return {
              ...state,
              fetchingPackNo: false,
              fetchingPackNoError: true,
            };

            case types.GET_PACK_TRACK_REQUEST:
            return { ...state, fetchingPackTrack: true };
          case types.GET_PACK_TRACK_SUCCESS:
            return {
              ...state,
              fetchingPackTrack: false,
              packTrack: action.payload
            };
          case types.GET_PACK_TRACK_FAILURE:
            return {
              ...state,
              fetchingPackTrack: false,
              fetchingPackTrackError: true,
            };

            case types.GET_SUB_LIST_REQUEST:
            return { ...state, fetchingSubList: true };
          case types.GET_SUB_LIST_SUCCESS:
            return {
              ...state,
              fetchingSubList: false,
              subList: action.payload
            };
          case types.GET_SUB_LIST_FAILURE:
            return {
              ...state,
              fetchingSubList: false,
              fetchingSubListError: true,
            };
            case types.GET_REPAIR_SUB_LIST_REQUEST:
              return { ...state, fetchingRepairSubList: true };
            case types.GET_REPAIR_SUB_LIST_SUCCESS:
              return {
                ...state,
                fetchingRepairSubList: false,
                repairSubList: action.payload
              };
            case types.GET_REPAIR_SUB_LIST_FAILURE:
              return {
                ...state,
                fetchingRepairSubList: false,
                fetchingRepairSubListError: true,
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


      case types.ADD_SCAN_RECEIVED_DATA_REQUEST:
        return { ...state, fetchingScanReceivedData: true };
      case types.ADD_SCAN_RECEIVED_DATA_SUCCESS:
        return {
          ...state,
          fetchingScanReceivedData: false,
          addReceivedScanModal:false,
          receivedScanData: action.payload
        };
      case types.ADD_SCAN_RECEIVED_DATA_FAILURE:
        return {
          ...state,
          fetchingScanReceivedData: false,
          fetchingScanReceivedDataError: true,
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
        //addrecivedAwb: action.payload 
        // addCreateAwb: false,
         addAwbNo: true
      };
    case types.ADD_RECEIVED_FAILURE:
      return {
        ...state,
        addingReceivedUser: false,
        addingReceivedUserError: true,
        // addCreateAwb: false,
      };


    case types.SENT_ITEM_TO_STOCK_REQUEST:
      return { ...state, sendingItemToStock: true };
    case types.SENT_ITEM_TO_STOCK_SUCCESS:
      return {
        ...state,
        sendingItemToStock: false,
        stockUseDrwr: false,
        poGrnList: state.poGrnList.map((item) =>
          item.poSupplierSuppliesId === action.payload.poSupplierSuppliesId
            ? action.payload : item
        ),

      };
    case types.SENT_ITEM_TO_STOCK_FAILURE:
      return {
        ...state,
        sendingItemToStock: false,
        sendingItemToStockError: true,
        stockUseDrwr: false,
      };
    //get received
    case types.GET_ITEM_HISTORY_IN_STOCK_REQUEST:
      return { ...state, fetchingItemHistoryInStock: true };
    case types.GET_ITEM_HISTORY_IN_STOCK_SUCCESS:
      return {
        ...state,
        fetchingItemHistoryInStock: false,
        itemHistoryInStock: action.payload,
      };
    case types.GET_ITEM_HISTORY_IN_STOCK_FAILURE:
      return {
        ...state,
        fetchingItemHistoryInStock: false,
        fetchingItemHistoryInStockError: true,

      };




      case types.EMPTY_QUALITY_MANUFACTURE_DATA:
        return { ...state, qualityManufactureData: [] };






      case types.GET_PRODUCTION_QUALITY_DATA_REQUEST:
        return { ...state, fetchingProductionQualityData: true, fetchingDispatchProductionLocIdError: false };
      case types.GET_PRODUCTION_QUALITY_DATA_SUCCESS:
        return { ...state, fetchingProductionQualityData: false, productionQualityData: action.payload };
      case types.GET_PRODUCTION_QUALITY_DATA_FAILURE:
        return { ...state, fetchingProductionQualityData: false, fetchingProductionQualityDataError: true };

    case types.HANDLE_FILE_DAMAGED_MODAL:
      return { ...state, fileDamagedModal: action.payload };

    //add dispatch


    case types.LINK_MANUFACTURE_STATUS_REQUEST:
      return { ...state, linkingManufactureStatus: true };
    case types.LINK_MANUFACTURE_STATUS_SUCCESS:
      return {
        ...state,
        linkingManufactureStatus: false,
        qualityManufactureData: state.qualityManufactureData.map((item) => {
          if (item.qualityCheckBuilderId === action.payload.qualityCheckBuilderId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        // addTeamTransferModal: false,
      };
    case types.LINK_MANUFACTURE_STATUS_FAILURE:
      return {
        ...state,
        linkingManufactureStatus: false,
        linkingManufactureStatusError: true,
      };



      case types.HANDLE_SCAN_MODAL:
        return { ...state, addScanModal: action.payload };

        case types.HANDLE_STOCK_MODAL:
          return { ...state, addStockModal: action.payload };

    case types.UPDATE_QUALITY_STATUS_REQUEST:
      return { ...state,updateQualityStatus: true };
    case types.UPDATE_QUALITY_STATUS_SUCCESS:
      return {
        ...state,
        updateQualityStatus: false,
        productionQualityData: state.productionQualityData.map((item) => {
          if (item.productionProductId === action.payload.productionProductId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        // productionTableData: state.productionTableData.map((item) => {
        //   if (item.productionProductId === action.payload.productionProductId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };

      case types.UPDATE_QUALITY_STATUS_FAILURE:
      return { ...state,updateQualityStatus: false,updateQualityStatusError:true, };

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





      case types.MOVE_REJECT_TOGGLE_REQUEST:
      return { ...state, movingRejectToggle: true };
    case types.MOVE_REJECT_TOGGLE_SUCCESS:
      return {
        ...state,
        movingRejectToggle: false,
        productionQualityData: state.productionQualityData.filter(
          (item) => item.cellChamberLinkId !== action.payload
        ),
        addQualityManufactureDrawerModal:false,
       
        // productionTableData: state.productionTableData.filter(
        //   (item) => item.productionProductId !== action.payload.productionProductId
        // ),
      };
    case types.MOVE_REJECT_TOGGLE_FAILURE:
      return {
        ...state,
        movingRejectToggle: false,
        movingRejectToggleError: true,
      };





      case types.GET_QUALITY_MANUFACTURE_DATA_REQUEST:
        return { ...state, fetchingQualityManufactureData: true, fetchingQualityManufactureDataError: false };
      case types.GET_QUALITY_MANUFACTURE_DATA_SUCCESS:
        return { ...state, fetchingQualityManufactureData: false, qualityManufactureData: action.payload };
      case types.GET_QUALITY_MANUFACTURE_DATA_FAILURE:
        return { ...state, fetchingQualityManufactureData: false, fetchingQualityManufactureDataError: true };

    //get dispatchList
    case types.GET_DISPATCH_LIST_REQUEST:
      return { ...state, fetchingDispatchList: true };
    case types.GET_DISPATCH_LIST_SUCCESS:
      return {
        ...state,
        fetchingDispatchList: false,
        allDispatchList: [...state.allDispatchList, ...action.payload],
      };
    case types.GET_DISPATCH_LIST_FAILURE:
      return {
        ...state,
        fetchingDispatchList: false,
        fetchingDispatchListError: true,
      };

      case types.GET_COMPLETE_DISPATCH_LIST_REQUEST:
      return { ...state, fetchingCompleteDispatchList: true };
    case types.GET_COMPLETE_DISPATCH_LIST_SUCCESS:
      return {
        ...state,
        fetchingCompleteDispatchList: false,
        completeDispatchList: [...state.completeDispatchList, ...action.payload],
      };
    case types.GET_COMPLETE_DISPATCH_LIST_FAILURE:
      return {
        ...state,
        fetchingCompleteDispatchList: false,
        fetchingCompleteDispatchListError: true,
      };

      case types.GET_COMPLETE_DISPATCH_SEARCH_REQUEST:
      return { ...state, fetchingCompleteDispatchSearch: true };
    case types.GET_COMPLETE_DISPATCH_SEARCH_SUCCESS:
      return {
        ...state,
        fetchingCompleteDispatchSearch: false,
        allDispatchList: action.payload,
      };
    case types.GET_COMPLETE_DISPATCH_SEARCH_FAILURE:
      return {
        ...state,
        fetchingCompleteDispatchSearch: false,
        fetchingCompleteDispatchSearchError: true,
      };

      case types.GET_COMMERCE_LIST_REQUEST:
        return { ...state, fetchingCommerceList: true };
      case types.GET_COMMERCE_LIST_SUCCESS:
        return {
          ...state,
          fetchingCommerceList: false,
          allCommerceList: [...state.allCommerceList, ...action.payload],
        };
      case types.GET_COMMERCE_LIST_FAILURE:
        return {
          ...state,
          fetchingCommerceList: false,
          fetchingCommerceListError: true,
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



      case types.ADD_SCAN_DATA_REQUEST:
            return { ...state, fetchingScanData: true };
          case types.ADD_SCAN_DATA_SUCCESS:
            return {
              ...state,
              fetchingScanData: false,
              addScanModal:false,

              subList: state.subList.map((item) => {
                if (item.productId === action.payload.productId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),

              //subList: action.payload
            };
          case types.ADD_SCAN_DATA_FAILURE:
            return {
              ...state,
              fetchingScanData: false,
              fetchingScanDataError: true,
            };

    case types.HANDLE_DISPTCH_MODAL:
      return {
        ...state,
        dispatchModal: action.payload,
      };

    //addReceivedItem
    case types.ADD_TOTAL_RECEIVED_ITEM_REQUEST:
      return { ...state, addingRecievedItem: true };
    case types.ADD_TOTAL_RECEIVED_ITEM_SUCCESS:
      return {
        ...state,
        addingRecievedItem: false,
        receivedModal: false,
      };
    case types.ADD_TOTAL_RECEIVED_ITEM_FAILURE:
      return {
        ...state,
        addingRecievedItem: false,
        addingRecievedItemError: false,
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




      case types.GET_REJECT_MANUFACTURE_DATA_REQUEST:
        return { ...state, fetchingRejectManufactureData: true, fetchingRejectManufactureDataError: false };
      case types.GET_REJECT_MANUFACTURE_DATA_SUCCESS:
        return { ...state, fetchingRejectManufactureData: false, rejectManufactureData: action.payload };
      case types.GET_REJECT_MANUFACTURE_DATA_FAILURE:
        return { ...state, fetchingRejectManufactureData: false, fetchingRejectManufactureDataError: true };

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





      case types.GET_ITEM_HISTORY_DATA_IN_STOCK_REQUEST:
      return { ...state, fetchingItemHistoryDataInStock: true };
    case types.GET_ITEM_HISTORY_DATA_IN_STOCK_SUCCESS:
      return {
        ...state,
        fetchingItemHistoryDataInStock: false,
        itemHistoryDataInStock: action.payload,
      };
    case types.GET_ITEM_HISTORY_DATA_IN_STOCK_FAILURE:
      return {
        ...state,
        fetchingItemHistoryDataInStock: false,
        fetchingItemHistoryDataInStockError: true,

      };

        case types.LINK_DISPATCH_STATUS_REQUEST:
                        return { ...state, linkDispatchStatus: true };
                      case types.LINK_DISPATCH_STATUS_SUCCESS:
                        return {
                          ...state,
                          linkDispatchStatus: false,
                          allDispatchList: state.allDispatchList.filter(
                            (item) => item.orderPhoneId !== action.payload
                          ),

                          // allDispatchList
                          //updatePartnerModal: false,
                          // partnerByUserId: state.partnerByUserId.map((item) => {
                          //   if (item.partnerId === action.payload.partnerId) {
                          //     return action.payload;
                          //   } else {
                          //     return item;
                          //   }
                          // }),
                        };
                      case types.LINK_DISPATCH_STATUS_FAILURE:
                        return {
                          ...state,
                          linkDispatchStatus: false,
                          linkDispatchStatusError: true,
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
        ...state, addingDeliverDate: true,
      };
    case types.ADD_DELIVERY_DATE_SUCCESS:
      return {
        ...state,
        addDeliverDate: false,
        allReceivedUser: state.allReceivedUser.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload : item
        ),
        addingDeliverDate: false,
      };
    case types.ADD_DELIVERY_DATE_FAILURE:
      return {
        ...state,
        addingDeliverDate: false,
        addingDeliverDateError: true,
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





      case types.GET_MATERIAL_UNITS_DATA_REQUEST:
      return { ...state, fetchingMaterialUnitsData: true };
    case types.GET_MATERIAL_UNITS_DATA_SUCCESS:
      return {
        ...state,
        fetchingMaterialUnitsData: false,
        materialUnitsData: action.payload
      };
    case types.GET_MATERIAL_UNITS_DATA_FAILURE:
      return {
        ...state,
        fetchingMaterialUnitsData: false,
        fetchingMaterialUnitsDataError: true,
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
        phoneListById: []
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
        // addroomrackininventory: false,
        // roomRackbyLoc:action.payload
      };
    case types.ADD_ROOM_AND_RACK_IN_INVENTORY_FAILURE:
      return {
        ...state,
        addingRoomAndRackInInventory: false,
        addingRoomAndRackInInventoryError: true,
        // addroomrackininventory: false,
      };

    case types.UPDATE_VALIDATION_IN_RECEIVE_REQUEST:
      return { ...state, updatingValidationInRecive: true };
    case types.UPDATE_VALIDATION_IN_RECEIVE_SUCCESS:
      return {
        ...state,
        updatingValidationInRecive: false,
        addReceivePhone: false,
        phoneListById: state.phoneListById.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload : item
        ),
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
        receivedOrdeIdModal: false,
        allReceivedUser: state.allReceivedUser.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload : item
        ),
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
        phoneListById: [...state.phoneListById, ...action.payload]
      };
    case types.GET_PHONE_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingPhoneListById: false,
        fetchingPhoneListByIdError: true,
      };

    case types.GET_CELL_NUMBER_REQUEST:
      return { ...state, fetchingCellNumber: true };
    case types.GET_CELL_NUMBER_SUCCESS:
      return {
        ...state,
        fetchingCellNumber: false,
        cellById: action.payload,
      };
    case types.GET_CELL_NUMBER_FAILURE:
      return {
        ...state,
        fetchingCellNumber: false,
        fetchingCellNumberError: true,

      };

    case types.GET_CELL_DATA_REQUEST:
      return { ...state, fetchingCellData: true };
    case types.GET_CELL_DATA_SUCCESS:
      return {
        ...state,
        fetchingCellData: false,
        cellData: action.payload,
      };
    case types.GET_CELL_DATA_FAILURE:
      return {
        ...state,
        fetchingCellData: false,
        fetchingCellDataError: true,

      };

    case types.SET_PHONELIST_EDIT:
      return { ...state, setEdittingPhone: action.payload };


    case types.SET_DISPATCH_PHONELIST_EDIT:
      return { ...state, dispatchPhoneData: action.payload };

    case types.UPDATE_DISPATCH_INSPECTION_BUTTON_REQUEST:
      return { ...state, updatingDispatchInspectionButton: true };
    case types.UPDATE_DISPATCH_INSPECTION_BUTTON_SUCCESS:
      return {
        ...state,
        updatingDispatchInspectionButton: false,
        openPickupDateModal: false,
        allDispatchList: state.allDispatchList.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload : item
        ),
        phoneListById: state.phoneListById.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload : item
        ),
        
      };




      case types.REMOVE_PRODUCTION_QUALITY_REQUEST:
        return { ...state, removingProductionQuality: true };
      case types.REMOVE_PRODUCTION_QUALITY_SUCCESS:
        return {
          ...state,
          removingProductionQuality: false,
         
          productionQualityData: state.productionQualityData.filter(
            (item) => item.productionProductId !== action.payload
          ),
        };
      case types.REMOVE_PRODUCTION_QUALITY_FAILURE:
        return {
          ...state,
          removingProductionQuality: false,
          removingProductionQualityError: true,
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
        updateDispatchList: state.updateDispatchList.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload : item
        ),
      };
    case types.UPDATE_DISPATCH_RECEIVE_PHONE_FAILURE:
      return {
        ...state,
        updatingDispatchReceivePhone: false,
        updatingDispatchReceivePhoneError: true,
      };





      case types.ADD_DAMAGED_CREDIT_REQUEST:
        return { ...state, addingDamagedCredit: true };
      case types.ADD_DAMAGED_CREDIT_SUCCESS:
        return {
          ...state,
          addingDamagedCredit: false,
          materialDamageData: state.materialDamageData.map((item) => {
            if (item.poSupplierSuppliesId === action.payload.poSupplierSuppliesId) {
              return action.payload;
            } else {
              return item;
            }
          }),
          // regiondata:action.payload,
          //regions:[action.payload,...state.regions],
          // documents: [...state.documents, action.payload],
        };
      case types.ADD_DAMAGED_CREDIT_FAILURE:
        return { ...state, addingDamagedCredit: false, addingDamagedCreditError: true };

    case types.HANDLE_DISPATCH_RECEIVE_PHONE_MODAL:
      return { ...state, dispatchMismatchData: action.payload };

    case types.HANDLE_PICKUP_MODAL:
      return { ...state, pickUpModal: action.payload };

    case types.HANDLE_MISMATCH_PHONE_MODAL:
      return { ...state, mismatchPhoneModal: action.payload };

    case types.EMPTY_INVENTORY_LIST:
      return { ...state, allReceivedUser: [], allDispatchList: [] };

    case types.HANDLE_ADD_AWB_MODAL:
      return { ...state, addAwbNo: action.payload };

    case types.HANDLE_CREATE_AWB_MODAL:
      return { ...state, addCreateAwb: action.payload };

      case types.HANDLE_CREATE_PACK_MODAL:
        return { ...state, addPackData: action.payload };

        case types.HANDLE_CREATE_PACK_ID:
          return { ...state, addPackDataID: action.payload };

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




      case types.ADD_ASILE_IN_BEST_REQUEST:
        return { ...state, addingAsileInBest: true };
      case types.ADD_ASILE_IN_BEST_SUCCESS:
        return {
          ...state,
          addingAsileInBest: false,
         // addCustomerModal: false,
         
          // customerByUserId: state.customerByUserId.map((item) => {
          //   if (item.customerId === action.payload.customerId) {
          //     return action.payload;
          //   } else {
          //     return item;
          //   }
          // }),
        };
      case types.ADD_ASILE_IN_BEST_FAILURE:
        return { ...state,addingAsileInBest : false, addingAsileInBestError: false };



      case types.GET_MATERIAL_BEST_BEFORE_REQUEST:
        return { ...state, fetchingMaterialBestBefore: true };
      case types.GET_MATERIAL_BEST_BEFORE_SUCCESS:
        return {
          ...state,
          fetchingMaterialBestBefore: false,
          materialBestBefore: action.payload
        };
      case types.GET_MATERIAL_BEST_BEFORE_FAILURE:
        return {
          ...state,
          fetchingMaterialBestBefore: false,
          fetchingMaterialBestBeforeError: true,
        };

        case types.GET_WASTE_MATERIAL_REQUEST:
          return { ...state, fetchingWasteMaterial: true };
        case types.GET_WASTE_MATERIAL_SUCCESS:
          return {
            ...state,
            fetchingWasteMaterial: false,
            westMaterial: action.payload
          };
        case types.GET_WASTE_MATERIAL_FAILURE:
          return {
            ...state,
            fetchingWasteMaterial: false,
            fetchingWasteMaterialError: true,
          };

 case types.GET_WASTE_MATERIAL_LOCATION_REQUEST:
          return { ...state, fetchingWasteMaterialLocation: true };
        case types.GET_WASTE_MATERIAL_LOCATION_SUCCESS:
          return {
            ...state,
            fetchingWasteMaterialLocation: false,
            westMaterialLocation: action.payload
          };
        case types.GET_WASTE_MATERIAL_LOCATION_FAILURE:
          return {
            ...state,
            fetchingWasteMaterialLocation: false,
            fetchingWasteMaterialLocationError: true,
          };

        case types.ADD_TO_WASTE_REQUEST:
      return { ...state, addingToWaste: true };
    case types.ADD_TO_WASTE_SUCCESS:
      return {
        ...state,
        addingToWaste: false,
       // addCustomerModal: false,
       
        // customerByUserId: state.customerByUserId.map((item) => {
        //   if (item.customerId === action.payload.customerId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
        materialBestBefore: state.materialBestBefore.filter(
          (item) => item.poSupplierSuppliesId !== action.payload
        ),
      };
    case types.ADD_TO_WASTE_FAILURE:
      return { ...state,addingToWaste : false, addingToWasteError: false };


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

    case types.GET_ARCHIEVE_PRODUCTION_BYLOC_ID_REQUEST:
      return {
        ...state,
        fetchingArchieveProductionLocId: true, fetchingArchieveProductionLocIdError: false
      };
    case types.GET_ARCHIEVE_PRODUCTION_BYLOC_ID_SUCCESS:
      return {
        ...state, fetchingArchieveProductionLocId: false,
        archieveInProduction: action.payload
      };
    case types.GET_ARCHIEVE_PRODUCTION_BYLOC_ID_FAILURE:
      return {
        ...state, fetchingArchieveProductionLocId: false,
        fetchingArchieveProductionLocIdError: true,

      };


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

    case types.GET_ITEM_IN_CELL_STOCK_REQUEST:
      return { ...state, fetchingItemInCellStock: true };
    case types.GET_ITEM_IN_CELL_STOCK_SUCCESS:
      return {
        ...state,
        fetchingItemInCellStock: false,
        cellStock: action.payload
      };
    case types.GET_ITEM_IN_CELL_STOCK_FAILURE:
      return {
        ...state,
        fetchingItemInCellStock: false,
        fetchingItemInCellStockError: true,

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
        poGrnList: state.poGrnList.map((item) =>
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

    case types.GET_RECEIVED_REQUEST:
      return { ...state, fetchingReceivedUser: true };
    case types.GET_RECEIVED_SUCCESS:
      return {
        ...state,
        fetchingReceivedUser: false,
        allReceivedUser: [...state.allReceivedUser, ...action.payload]
      };
    case types.GET_RECEIVED_FAILURE:
      return {
        ...state,
        fetchingReceivedUser: false,
        fetchingReceivedUserError: true,

      };

    case types.UPDATE_ORDER_RECEIVE_REQUEST:
      return { ...state, updatingOrderReceive: true };
    case types.UPDATE_ORDER_RECEIVE_SUCCESS:
      return {
        ...state,
        updatingOrderReceive: false,
        allReceivedUser: state.allReceivedUser.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload : item
        ),
      };
    case types.UPDATE_ORDER_RECEIVE_FAILURE:
      return {
        ...state,
        updatingOrderReceive: false,
        updatingOrderReceiveError: true,
      };



    case types.UPDATE_REPAIR_STATUS_REQUEST:
      return { ...state, updatingRepairStatus: true };
    case types.UPDATE_REPAIR_STATUS_SUCCESS:
      return {
        ...state,
        updatingRepairStatus: false,
        phoneListById: state.phoneListById.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload : item
        ),
      };
    case types.UPDATE_REPAIR_STATUS_FAILURE:
      return {
        ...state,
        updatingRepairStatus: false,
        updatingRepairStatusError: true,
      };


    case types.HANDLE_STOCK_USED_DRAWER:
      return { ...state, stockUseDrwr: action.payload };

    case types.GET_ROOM_RACK_BY_LOCID_REQUEST:
      return { ...state, fetchingRoomRack: true };
    case types.GET_ROOM_RACK_BY_LOCID_SUCCESS:
      return {
        ...state,
        fetchingRoomRack: false,
        roomRackbyLoc: action.payload
      };
    case types.GET_ROOM_RACK_BY_LOCID_FAILURE:
      return {
        ...state,
        fetchingRoomRack: false,
        fetchingRoomRackByIdError: true,
      };

    case types.UPDATE_ROOM_RACK_ID_REQUEST:
      return { ...state, updatingRoomRackId: true };
    case types.UPDATE_ROOM_RACK_ID_SUCCESS:
      return {
        ...state,
        updatingRoomRackId: false,
        roomRackbyLoc: state.roomRackbyLoc.map((item) =>
          item.roomRackChamberLinkId === action.payload.roomRackChamberLinkId
            ? action.payload : item
        ),
      };
    case types.UPDATE_ROOM_RACK_ID_FAILURE:
      return {
        ...state,
        updatingRoomRackId: false,
        updatingRoomRackIdError: true,
      };





      case types.ADD_REPAIR_DATA_REQUEST:
        return { ...state, addingRepairData: true };
      case types.ADD_REPAIR_DATA_SUCCESS:
        return {
          ...state,
          addingRepairData: false,
          materialDamageData: state.materialDamageData.map((item) => {
            if (item.poSupplierSuppliesId === action.payload.poSupplierSuppliesId) {
              return action.payload;
            } else {
              return item;
            }
          }),
          // regiondata:action.payload,
          //regions:[action.payload,...state.regions],
          // documents: [...state.documents, action.payload],
        };
      case types.ADD_REPAIR_DATA_FAILURE:
        return { ...state, addingRepairData: false, addingRepairDataError: true };

    case types.GET_RACK_LIST_REQUEST:
      return { ...state, fetchingRacklist: true };
    case types.GET_RACK_LIST_SUCCESS:
      return {
        ...state,
        fetchingRacklist: false,
        rackList: action.payload
      };
    case types.GET_RACK_LIST_FAILURE:
      return {
        ...state,
        fetchingRacklist: false,
        fetchingRacklistError: true,
      };

    case types.HANDLE_REJECTED_REASON_MODAL:
      return { ...state, rejectedReasonModal: action.payload };

    case types.REJECT_PHONE_REQUEST:
      return { ...state, rejectPhoneList: true };
    case types.REJECT_PHONE_SUCCESS:
      return {
        ...state,
        rejectPhoneList: false,
        rejectedReasonModal: false,
        updateDispatchList: state.updateDispatchList.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload : item
        ),

      };
    case types.REJECT_PHONE_FAILURE:
      return {
        ...state,
        rejectPhoneList: false,
        rejectPhoneListError: true,
        rejectedReasonModal: false,
      };



      case types.GET_QUALITY_MANUFACTURE_USER_DATA_REQUEST:
        return { ...state, fetchingQualityManufactureUserData: true, fetchingQualityManufactureUserDataError: false };
      case types.GET_QUALITY_MANUFACTURE_USER_DATA_SUCCESS:
        return { ...state, fetchingQualityManufactureUserData: false, qualityManufactureUserData: action.payload };
      case types.GET_QUALITY_MANUFACTURE_USER_DATA_FAILURE:
        return { ...state, fetchingQualityManufactureUserData: false, fetchingQualityManufactureUserDataError: true };



    case types.GET_INVENTORY_LOCATION_RECORDS_REQUEST:
      return { ...state, fetchingInventoryLocationRecords: true };
    case types.GET_INVENTORY_LOCATION_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingInventoryLocationRecords: false,
        inventoryLocationCount: action.payload,
      };
    case types.GET_INVENTORY_LOCATION_RECORDS_FAILURE:
      return {
        ...state,
        fetchingInventoryLocationRecords: false,
        fetchingInventoryLocationRecordsError: true,
      };
      case types.HANDLE_INVENTORY_EXPAND:
        return { ...state, inventoryExpandList: action.payload };

        case types.HANDLE_INVENTORY_TASK:
          return { ...state, inventoryExpandTask: action.payload };
      
    case types.HANDLE_CUSTOM_MODAL:
      return { ...state, custoModal: action.payload };


      case types.SEARCH_OPEN_ORDER_RECEIVED_REQUEST:
        return { ...state, fetchingOpenOrdeReceived: true };
      case types.SEARCH_OPEN_ORDER_RECEIVED_SUCCESS:
        return {
          ...state,
          fetchingOpenOrdeReceived: false,
          phoneListById: action.payload,
        };
      case types.SEARCH_OPEN_ORDER_RECEIVED_FAILURE:
        return { ...state, fetchingOpenOrdeReceivedError: true };
      

        case types.CLAER_REDUCERS_DATA:
          return {
            ...state,
            phoneListById: [],
          };   

          case types.CLAER_DISPATCH_DATA:
            return {
              ...state,
              allDispatchList: [],
            };

            case types.CLAER_COMPLETE_DISPATCH_DATA:
            return {
              ...state,
              completeDispatchList: [],
            };

            case types.ADD_STOCK_IMPORT_FORM_REQUEST:
              return { ...state, addingStockImportForm: true };
            case types.ADD_STOCK_IMPORT_FORM_SUCCESS:
              return {
                ...state,
                addingStockImportForm: false,
                addStockModal: false,
               
              };
            case types.ADD_STOCK_IMPORT_FORM_FAILURE:
              return {
                ...state,
                addingStockImportForm: false,
                addingStockImportFormError:true,
              }; 

              case types.INVENTORY_PACKED_UNPACKED_TOGGLE_REQUEST:
                return { ...state };
            case types.INVENTORY_PACKED_UNPACKED_TOGGLE_SUCCESS:
                return {
                    ...state,
                    packData: state.packData.map(
                        (item) => {
                            if (item.dispatchPackingId === action.payload.dispatchPackingId) {
                                return action.payload;
                            } else {
                                return item;
                            }
                        }),
                };
            case types.INVENTORY_PACKED_UNPACKED_TOGGLE_FAILURE:
                return { ...state };


                case types.LINK_MATERIAL_STOCK_TOGGLE_REQUEST:
                  return { ...state, addingMaterialStockToggle: true };
                case types.LINK_MATERIAL_STOCK_TOGGLE_SUCCESS:
                  return {
                    ...state,
                    addingMaterialStockToggle: false,
                    materialUnitsData: state.materialUnitsData.map((item) => {
                      if (item.suppliesId === action.payload.suppliesId) {
                        return action.payload;
                      } else {
                        return item;
                      }
                    }),
                  };
                case types.LINK_MATERIAL_STOCK_TOGGLE_FAILURE:
                  return {
                    ...state,
                    addingMaterialStockToggle: false,
                    addingMaterialStockToggleError: true,
                  };

    
    default:
      return state;
  }
};
