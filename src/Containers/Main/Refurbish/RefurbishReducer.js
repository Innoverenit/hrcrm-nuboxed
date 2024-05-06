import * as types from "./RefurbishActionTypes";
import dayjs from "dayjs";
import moment from "moment";

const initialState = {
  viewType: "list",
  fetchingTodayProduction: false,
  fetchingTodayProductionError: false,
  production: [],

  fetchingNoOfRepairTechnicianById: false,
  fetchingNoOfRepairTechnicianByIdError: false,
  repairByTechnician: [],

  showAssignRepairModal: false,

  fetchingRemainingPhoneList: false,
  fetchingRemainingPhoneListError: true,
  remainingPhoneById: [],

  showProductBuilderList: false,

  fetchingCatalogueByUser: false,
  fetchingCatalogueByUserError: false,
  catalogueByUser: [],

  fetchingALlSPareList: false,
  fetchingALlSPareListError: false,
  allSpareById: [],

  showRepairPhoneList: false,

  fetchingRepairorderById: false,
  fetchingRepairorderByIdError: false,
  repairOrder: [],

  fetchingTomorrowProduction: false,
  fetchingTomorrowProductionError: false,
  productiontomorrow: [],

  linkDateToProduction: false,
  linkDateToProductionError: false,
  productionData: [],
  //add consumption
  addingProduction: false,
  addingProductionError: false,
  //get consumption
  fetchingAllProductionConsumption: false,
  fetchingAllProductionConsumptionError: false,
  allConsumption: [],

  fetchingRejectedPhoneList: false,
  fetchingRejectedPhoneListError: false,
  rejectPhoneById: [],

  updatingCantRepairQc: false,
  updatingCantRepairQcError: false,

  addingProductBuilderById: false,
  addingProductBuilderByIdError: false,

  addingTaskByPhoneById: false,
  addingTaskByPhoneByIdError: false,

  fetchingTaskByPhoneId: false,
  fetchingTaskByPhoneIdError: false,
  taskByPhone: [],

  fetchingProductBuilderById: false,
  fetchingProductBuilderByIdError: false,
  builderByManufatureId: [],

  //get output
  fetchingAllProductionOutput: false,
  fetchingAllProductionOutputError: false,
  allProductionOutput: [],
  //add output
  addingProductionOutput: false,
  addingProductionOutputError: false,

  fetchingNoOfPhoneInQcById: false,
  fetchingNoOfPhoneInQcByIdError: false,
  phoneByTechId: [],

  fetchingPhoneDetails: false,
  fetchingPhoneDetailsError: false,
  phoneDetails: {},

  updatingPauseStatus: false,
  updatingPauseStatusError: false,

  updatingSparePacket: false,
  updatingSparePacketError: false,

  fetchingShiftsByUserId: false,
  fetchingShiftsByUserIdError: false,
  shiftsData: [],

  choosingCatalogueItem: false,
  choosingCatalogueItemError: false,

  updatingQcInspectionButton: false,
  updatingQcInspectionButtonError: false,

  fetchingNoofTecnician: false,
  fetchingNoofTecnicianError: false,
  technicianByID: [],

  updatingRepairInspectionButton: false,
  updatingRepairInspectionButtonError: false,

  addOrderPhone: false,

  updatingTechnicianForRepair: false,
  updatingTechnicianForRepairError: false,

  updatingRepairStatus: false,
  updatingRepairStatusError: false,

  showPhoneList: false,

  fetchingSpareListById: false,
  fetchingSpareListByIdError: false,
  rcvSpareList: [],

  updatingSpareReceives: false,
  updatingSpareReceivesError: false,

  deletingTaskList: false,
  deletingTaskListError: false,

  fetchingNoOfPhoneInRepair: false,
  fetchingNoOfPhoneInRepairError: true,
  repairPhoneByTechId: [],

  fetchingProductionUserById: false,
  fetchingProductionUserByIdError: false,
  productionUser: [],

  updatingFarGlassInProduction: false,
  updatingFarGlassInProductionError: false,

  updatingtechnicianByPhone: false,
  updatingtechnicianByPhoneError: false,

  //split output
  addingSplitProductionOutput: false,
  addingSplitProductionOutputError: false,
  //delete Output
  fetchingProductionOrederId: false,
  fetchingProductionOrederIdError: true,
  productionOrder: [],

  fetchingPhoneListByUser: false,
  fetchingPhoneListByUserError: false,
  phoneByUser: [],

  fetchingTaskListByPhone: false,
  fetchingTaskListByPhoneError: false,
  taskListByPhone: [],

  deleteProductionOutput: false,
  deleteProductionOutputError: false,
  //split output
  splitOutputModal: false,
  setEditingOutputProduction: {},

  approveSpareModal: false,

  productioNoteModal: false,

  showTechnicianModal: false,

  assignOrderById: false,
  productionOrderIdModal: false,

  addingLead: false,
  addingLeadError: false,

  phoNoteProductionModal: false,

  updatingCatalogueInRefurbish: false,
  updatingCatalogueInRefurbishError: false,

  fetchingNoOfPhonesById: false,
  fetchingNoOfPhonesByIdError: false,
  noOfPhoneById: [],

  phoneByTechnician: false,

  productBuilderList: false,
  addOrderPhone: false,

  reassignRejectItem: false,

  fetchingRepairPhoneByUser: false,
  fetchingRepairPhoneByUserError: false,
  repairPhone: [],

  fetchingOrderIdByUserId: false,
  fetchingOrderIdByUserIdError: false,
  orderPhoneList: [],

  updatingQCStatus: false,
  updatingQCStatusError: false,

  fetchingOrderByUser: false,
  fetchingOrderByUserError: false,
  orderByUser: [],

  fetchingAllManufaturedId: false,
  fetchingAllManufaturedIdError: false,
  allProductsByOrder: [],

  addingProduction: false,
  addingProductionError: false,

  fetchingOpenRepairByUser: false,
  fetchingOpenRepairByUserError: false,
  openRepair: [],

  fetchingOpenQc: false,
  fetchingOpenQcError: false,
  openQc: [],

  fetchingProductionNotesInOrders: false,
  fetchingProductionNotesInOrdersError: false,
  notesProdInOrders: [],

  fetchingRepairPhoneById: false,
  fetchingRepairPhoneByIdError: false,
  repairPhoneByOrder: [],

  phoNotesRepairOrderModal: false,
  phoNotesQCOrderModal: false,

  fetchingChoosenCatalogue: false,
  fetchingChoosenCatalogueError: false,
  choosenOrderCatalogue: [],

  fetchingCatalogueListInReurbish: false,
  fetchingCatalogueListInReurbishError: false,
  catalogueInRefurbish: [],

  fetchingCatalogueByTechnician: false,
  fetchingCatalogueByTechnicianError: false,
  catalogueByTechnician: [],

  addingCatalogueByTechnician: false,
  addingCatalogueByTechnicianError: false,

  clickTagInDrawr: false,
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),

  addingTagInProcess: false,
  addingTagInProcessError: false,

  fetchingTagInProcess: false,
  fetchingTagInProcessError: false,
  tagInPros: [],

  approvingSpare: false,
  approvingSpareError: false,

  showPhoneData: false,

  showRefurbishLead: false,

  updatingProcessTask: false,
  updatingProcessTaskError: false,

  reassigningPhones: false,
  reassigningPhonesError: false,

  fetchingCompletedPhones: false,
  fetchingCompletedPhonesError: false,
  completedPhone: [],

  fetchingRemainingPhones: false,
  fetchingRemainingPhonesError: false,
  remainingPhones: [],

  fetchingItemTaskCount: false,
  fetchingItemTaskCountError: false,
  itemTaskcount: {},

  refurbhsReject: false,

  reassigningRejectedPhones: false,
  reassigningRejectedPhonesError: false,

  reassigningrejectedphone: false,
  reassigningrejectedphoneError: false,

  fetchingRejectedPhonesByTechnician: false,
  fetchingRejectedPhonesByTechnicianError: false,
  rejectPhoneByUser: []

};

export const refurbishReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PRODUCTION_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.REFURBISH_REJECT_PHONE:
      return { ...state, refurbhsReject: action.payload };

    case types.HANDLE_REJECT_REASSIGN_MODAL:
      return { ...state, reassignRejectItem: action.payload };

    case types.GET_TODAY_PRODUCTION_REQUEST:
      return { ...state, fetchingTodayProduction: true };
    case types.GET_TODAY_PRODUCTION_SUCCESS:
      return {
        ...state,
        fetchingTodayProduction: false,
        production: action.payload,
      };
    case types.GET_TODAY_PRODUCTION_FAILURE:
      return {
        ...state,
        fetchingTodayProduction: false,
        fetchingTodayProductionError: true,
      };

    case types.GET_REJECTED_PHONE_LIST_REQUEST:
      return { ...state, fetchingRejectedPhoneList: true };
    case types.GET_REJECTED_PHONE_LIST_SUCCESS:
      return {
        ...state,
        fetchingRejectedPhoneList: false,
        rejectPhoneById: action.payload,
      };
    case types.GET_REJECTED_PHONE_LIST_FAILURE:
      return {
        ...state,
        fetchingRejectedPhoneList: false,
        fetchingRejectedPhoneListError: true,
      };

    case types.UPDATE_SPARE_PACKET_REQUEST:
      return { ...state, updatingSparePacket: true };
    case types.UPDATE_SPARE_PACKET_SUCCESS:
      return {
        ...state,
        updatingSparePacket: false,
      };
    case types.UPDATE_SPARE_PACKET_FAILURE:
      return {
        ...state,
        updatingSparePacket: false,
        updatingSparePacketError: true,
      };

    case types.GET_TOMORROW_PRODUCTION_REQUEST:
      return { ...state, fetchingTomorrowProduction: true };
    case types.GET_TOMORROW_PRODUCTION_SUCCESS:
      return {
        ...state,
        fetchingTomorrowProduction: false,
        productiontomorrow: action.payload,
      };
    case types.GET_TOMORROW_PRODUCTION_FAILURE:
      return {
        ...state,
        fetchingTomorrowProduction: false,
        fetchingTomorrowProductionError: true,
      };

    case types.LINK_DATE_TO_PRODUCTION_REQUEST:
      return { ...state, linkDateToProduction: true };
    case types.LINK_DATE_TO_PRODUCTION_SUCCESS:
      return {
        ...state,
        linkDateToProduction: false,
        productionData: action.payload,
      };
    case types.LINK_DATE_TO_PRODUCTION_FAILURE:
      return {
        ...state,
        linkDateToProduction: false,
        linkDateToProductionError: true,
      };

    /**get the list of all consumption*/
    case types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_REQUEST:
      return { ...state, fetchingAllProductionConsumption: true };
    case types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllProductionConsumption: false,
        allConsumption: action.payload,
      };
    case types.GET_ALL_PRODUCTION_CONSUMPTION_LIST_FAILURE:
      return {
        ...state,
        fetchingAllProductionConsumption: false,
        fetchingAllProductionConsumptionError: true,
      };

    /**get the list of all output*/
    case types.GET_ALL_PRODUCTION_OUTPUT_LIST_REQUEST:
      return { ...state, fetchingAllProductionOutput: true };
    case types.GET_ALL_PRODUCTION_OUTPUT_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllProductionOutput: false,
        allProductionOutput: action.payload,
      };
    case types.GET_ALL_PRODUCTION_OUTPUT_LIST_FAILURE:
      return {
        ...state,
        fetchingAllProductionOutput: false,
        fetchingAllProductionOutputError: true,
      };

    case types.ADD_PRODUCTION_REQUEST:
      return { ...state, addingProduction: true };
    case types.ADD_PRODUCTION_SUCCESS:
      return {
        ...state,
        addingProduction: false,
        addProductionModal: false,
        // clearbit: null,
      };
    case types.ADD_PRODUCTION_FAILURE:
      return {
        ...state,
        addingProduction: false,
        addingProductionError: true,
      };

    //add output
    case types.ADD_PRODUCTION_OUTPUT_REQUEST:
      return { ...state, addingProductionOutput: true };
    case types.ADD_PRODUCTION_OUTPUT_SUCCESS:
      return {
        ...state,
        addingProductionOutput: false,
        addProductionModal: false,
        // clearbit: null,
      };
    case types.ADD_PRODUCTION_OUTPUT_FAILURE:
      return {
        ...state,
        addingProductionOutput: false,
        addingProductionOutputError: true,
      };

    case types.GET_PHONE_DETAILS_REQUEST:
      return { ...state, fetchingPhoneDetails: true };
    case types.GET_PHONE_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingPhoneDetails: false,
        phoneDetails: action.payload,
      };
    case types.GET_PHONE_DETAILS_FAILURE:
      return {
        ...state,
        fetchingPhoneDetails: false,
        fetchingPhoneDetailsError: true,

      };

    //transfer output
    case types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_REQUEST:
      return { ...state };
    case types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_SUCCESS:
      return {
        ...state,
        allProductionOutput: state.allProductionOutput.map((item) =>
          item.locationDetailsId === action.payload.locationDetailsId
            ? action.payload
            : item
        ),
      };

    case types.EMPTY_REFURBISH_LIST:
      return {
        ...state,
        productionOrder: [],
        orderByUser: [],
        repairOrder: [],
      };
    case types.TRANSFER_PRODUCTION_OUTPUT_TO_INVENTORY_FAILURE:
      return { ...state };
    //split output
    case types.ADD_SPLIT_PRODUCTION_OUTPUT_REQUEST:
      return { ...state, addingSplitProductionOutput: true };
    case types.ADD_SPLIT_PRODUCTION_OUTPUT_SUCCESS:
      return {
        ...state,
        addingSplitProductionOutput: false,
        // splitProductionOutput: action.payload,
        splitOutputModal: false,
      };
    case types.ADD_SPLIT_PRODUCTION_OUTPUT_FAILURE:
      return {
        ...state,
        addingSplitProductionOutput: false,
        addingSplitProductionOutputError: true,
      };
    //delete output
    case types.DELETE_PRODUCTION_OUTPUT_REQUEST:
      return { ...state, deleteProductionOutput: true };
    case types.DELETE_PRODUCTION_OUTPUT_SUCCESS:
      return {
        ...state,
        deleteProductionOutput: false,
        allProductionOutput: state.allProductionOutput.filter(
          (item) => item.productionProductId !== action.payload
        ),
      };
    case types.DELETE_PRODUCTION_OUTPUT_FAILURE:
      return {
        ...state,
        deleteProductionOutput: false,
        deleteProductionOutputError: false,
      };

    case types.HANDLE_SPLIT_OUTPUT_MODAL:
      return { ...state, splitOutputModal: action.payload };
    case types.SET_EDIT_OUTPUT_PRODUCTION:
      return { ...state, setEditingOutputProduction: action.payload };

    case types.GET_PRODUCTION_ORDER_ID_REQUEST:
      return { ...state, fetchingProductionOrederId: true };
    case types.GET_PRODUCTION_ORDER_ID_SUCCESS:
      return {
        ...state,
        fetchingProductionOrederId: false,
        productionOrder: action.payload,
      };
    case types.GET_PRODUCTION_ORDER_ID_FAILURE:
      return {
        ...state,
        fetchingProductionOrederId: false,
        fetchingProductionOrederIdError: true,
      };

    case types.GET_NO_OF_REPAIR_TECHNICIAN_BY_ID_REQUEST:
      return { ...state, fetchingNoOfRepairTechnicianById: true };
    case types.GET_NO_OF_REPAIR_TECHNICIAN_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingNoOfRepairTechnicianById: false,
        repairByTechnician: action.payload,
      };
    case types.GET_NO_OF_REPAIR_TECHNICIAN_BY_ID_FAILURE:
      return {
        ...state,
        fetchingNoOfRepairTechnicianById: false,
        fetchingNoOfRepairTechnicianByIdError: true,
      };

    case types.HANDLE_PRODUCTION_NOTES_MODAL:
      return { ...state, productioNoteModal: action.payload };

    case types.HANDLE_ALL_SPARE_MODAL:
      return { ...state, approveSpareModal: action.payload };

    case types.GET_PRODUCTION_USER_BYID_REQUEST:
      return { ...state, fetchingProductionUserById: true };
    case types.GET_PRODUCTION_USER_BYID_SUCCESS:
      return {
        ...state,
        fetchingProductionUserById: false,
        productionUser: action.payload,
      };
    case types.GET_PRODUCTION_USER_BYID_FAILURE:
      return {
        ...state,
        fetchingProductionUserById: false,
        fetchingProductionUserByIdError: true,
      };

    case types.HANDLE_ASSIGN_ORDER_BY_ID_MODAL:
      return { ...state, assignOrderById: action.payload };

    case types.HANDLE_PRODUCTION_ORDERID_MODAL:
      return { ...state, productionOrderIdModal: action.payload };

    case types.HANDLE_PHONE_NOTE_PRODUCTION_MODAL:
      return { ...state, phoNoteProductionModal: action.payload };

    case types.UPDATE_TECHNICIAN_BY_PHONE_REQUEST:
      return { ...state, updatingtechnicianByPhone: true };
    case types.UPDATE_TECHNICIAN_BY_PHONE_SUCCESS:
      return {
        ...state,
        updatingtechnicianByPhone: false,
        assignOrderById: false,
        productionOrder: state.productionOrder.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload
            : item
        ),
      };
    case types.UPDATE_TECHNICIAN_BY_PHONE_FAILURE:
      return {
        ...state,
        updatingtechnicianByPhone: false,
        updatingtechnicianByPhoneError: true,
      };

    case types.GET_NO_OF_PHONE_BY_ID_REQUEST:
      return { ...state, fetchingNoOfPhonesById: true };
    case types.GET_NO_OF_PHONE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingNoOfPhonesById: false,
        noOfPhoneById: action.payload
      };
    case types.GET_NO_OF_PHONE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingNoOfPhonesById: false,
        fetchingNoOfPhonesByIdError: true,
      };

    case types.HANDLE_TECHNICIAN_MODAL_MODAL:
      return { ...state, showTechnicianModal: action.payload };

    case types.GET_NO_OF_TECHNICIAN_BY_ID_REQUEST:
      return { ...state, fetchingNoofTecnician: true };
    case types.GET_NO_OF_TECHNICIAN_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingNoofTecnician: false,
        technicianByID: action.payload
      };
    case types.GET_NO_OF_TECHNICIAN_BY_ID_FAILURE:
      return {
        ...state,
        fetchingNoofTecnician: false,
        fetchingNoofTecnicianError: true,
      };

    case types.GET_NO_OF_PHONE_IN_QC_BYID_REQUEST:
      return { ...state, fetchingNoOfPhoneInQcById: true };
    case types.GET_NO_OF_PHONE_IN_QC_BYID_SUCCESS:
      return {
        ...state,
        fetchingNoOfPhoneInQcById: false,
        phoneByTechId: action.payload
      };
    case types.GET_NO_OF_PHONE_IN_QC_BYID_FAILURE:
      return {
        ...state,
        fetchingNoOfPhoneInQcById: false,
        fetchingNoOfPhoneInQcByIdError: true,

      };

    case types.GET_NO_OF_PHONE_IN_REPAIR_REQUEST:
      return { ...state, fetchingNoOfPhoneInRepair: true };
    case types.GET_NO_OF_PHONE_IN_REPAIR_SUCCESS:
      return {
        ...state,
        fetchingNoOfPhoneInRepair: false,
        repairPhoneByTechId: action.payload
      };
    case types.GET_NO_OF_PHONE_IN_REPAIR_FAILURE:
      return {
        ...state,
        fetchingNoOfPhoneInRepair: false,
        fetchingNoOfPhoneInRepairError: true,
      };

    case types.GET_REMAINING_PHONES_LIST_REQUEST:
      return { ...state, fetchingRemainingPhoneList: true };
    case types.GET_REMAINING_PHONES_LIST_SUCCESS:
      return {
        ...state,
        fetchingRemainingPhoneList: false,
        remainingPhoneById: action.payload
      };
    case types.GET_REMAINING_PHONES_LIST_FAILURE:
      return {
        ...state,
        fetchingRemainingPhoneList: false,
        fetchingRemainingPhoneListError: true,

      };

    case types.GET_TASK_LIST_BY_PHONE_REQUEST:
      return { ...state, fetchingTaskListByPhone: true };
    case types.GET_TASK_LIST_BY_PHONE_SUCCESS:
      return {
        ...state,
        fetchingTaskListByPhone: false,
        taskListByPhone: action.payload
      };
    case types.GET_TASK_LIST_BY_PHONE_FAILURE:
      return {
        ...state,
        fetchingTaskListByPhone: false,
        fetchingTaskListByPhoneError: true,


      };

    case types.HANDLE_PHONE_BY_TECHNICIAN_MODAL:
      return { ...state, phoneByTechnician: action.payload };

    case types.HANDLE_PHONE_DETAILS_MODAL:
      return { ...state, showPhoneData: action.payload };

    case types.HANDLE_REFURBISH_LEAD:
      return { ...state, showRefurbishLead: action.payload };

    case types.HANDLE_ASSIGN_REPAIR_MODAL:
      return { ...state, showAssignRepairModal: action.payload, catalogueInRefurbish: [] };

    case types.GET_PHONE_LIST_BY_USER_REQUEST:
      return { ...state, fetchingPhoneListByUser: true };
    case types.GET_PHONE_LIST_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingPhoneListByUser: false,
        phoneByUser: action.payload
      };
    case types.GET_PHONE_LIST_BY_USER_FAILURE:
      return {
        ...state,
        fetchingPhoneListByUser: false,
        fetchingPhoneListByUserError: true,
      };

    case types.UPDATE_FINAL_PRICE_REQUEST:
      return { ...state, addingProduction: true };
    case types.UPDATE_FINAL_PRICE_SUCCESS:
      return {
        ...state,
        addingProduction: false,
      };
    case types.UPDATE_FINAL_PRICE_FAILURE:
      return {
        ...state,
        addingProduction: false,
        addingProductionError: true,
      };
    case types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_REQUEST:
      return { ...state, fetchingProductionNotesInOrders: true };
    case types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_SUCCESS:
      return {
        ...state,
        fetchingProductionNotesInOrders: false,
        notesProdInOrders: action.payload,
      };
    case types.GET_PRODUCTION_NOTES_LIST_IN_ORDER_FAILURE:
      return {
        ...state,
        fetchingProductionNotesInOrders: false,
        fetchingProductionNotesInOrdersError: true,
      };

    case types.HANDLE_ORDER_PHONE:
      return { ...state, addOrderPhone: action.payload };

    case types.GET_ORDER_BY_USER_REQUEST:
      return { ...state, fetchingOrderByUser: true };
    case types.GET_ORDER_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOrderByUser: false,
        // orderByUser: state.orderByUser.map((item) =>
        //   item.orderPhoneId !== null
        //     ? action.payload
        //     : action.payload
        // ),
        orderByUser: action.payload,
        // orderByUser: state.orderByUser.filter(
        //   (item) => item.orderPhoneId !== action.payload
        // ),
      };
    case types.GET_ORDER_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOrderByUser: false,
        fetchingOrderByUserError: true,
      };

    case types.HANDLE_ORDER_PHONE_MODAL:
      return { ...state, showPhoneList: action.payload, orderPhoneList: [] };

    case types.GET_ORDERID_BY_USER_REQUEST:
      return { ...state, fetchingOrderIdByUserId: true };
    case types.GET_ORDERID_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOrderIdByUserId: false,
        orderPhoneList: action.payload,
      };
    case types.GET_ORDERID_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOrderIdByUserId: false,
        fetchingOrderIdByUserIdError: true,
      };
    case types.UPDATE_REPAIR_STATUS_REQUEST:
      return { ...state, updatingRepairStatus: true };
    case types.UPDATE_REPAIR_STATUS_SUCCESS:
      return {
        ...state,
        updatingRepairStatus: false,
        repairPhone: state.repairPhone.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload
            : item
        ),

      };
    case types.UPDATE_REPAIR_STATUS_FAILURE:
      return {
        ...state,
        updatingRepairStatus: false,
        updatingRepairStatusError: true,
      };

    case types.UPDATE_CANT_REPAIR_QC_REQUEST:
      return { ...state, updatingCantRepairQc: true };
    case types.UPDATE_CANT_REPAIR_QC_SUCCESS:
      return {
        ...state,
        updatingCantRepairQc: false,
        orderPhoneList: state.orderPhoneList.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload
            : item
        ),

      };
    case types.UPDATE_CANT_REPAIR_QC_FAILURE:
      return {
        ...state,
        updatingCantRepairQc: false,
        updatingCantRepairQcError: true,
      };

    case types.GET_REPAIR_PHONE_BY_USER_REQUEST:
      return { ...state, fetchingRepairPhoneByUser: true };
    case types.GET_REPAIR_PHONE_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingRepairPhoneByUser: false,
        repairPhone: action.payload,
      };
    case types.GET_REPAIR_PHONE_BY_USER_FAILURE:
      return {
        ...state,
        fetchingRepairPhoneByUser: false,
        fetchingRepairPhoneByUserError: true,
      };

    case types.GET_REPAIR_PHONE_BY_ID_REQUEST:
      return { ...state, fetchingRepairPhoneById: true };
    case types.GET_REPAIR_PHONE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingRepairPhoneById: false,
        repairPhoneByOrder: action.payload,
      };
    case types.GET_REPAIR_PHONE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingRepairPhoneById: false,
        fetchingRepairPhoneByIdError: true,
      };

    case types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_REQUEST:
      return { ...state, updatingTechnicianForRepair: true };
    case types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_SUCCESS:
      return {
        ...state,
        updatingTechnicianForRepair: false,
        showAssignRepairModal: false,
        productionOrder: state.productionOrder.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload
            : item
        ),
      };
    case types.UPDATE_TECHNICIAN_FOR_REPAIR_PHONE_FAILURE:
      return {
        ...state,
        updatingTechnicianForRepair: false,
        updatingTechnicianForRepairError: true,
      };

    case types.HANDLE_REPAIR_PHONE_MODAL:
      return { ...state, showRepairPhoneList: action.payload, repairPhone: [] };

    case types.GET_REPAIR_ORDER_BY_USER_REQUEST:
      return { ...state, fetchingRepairorderById: true };
    case types.GET_REPAIR_ORDER_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingRepairorderById: false,
        repairOrder: action.payload,
      };
    case types.GET_REPAIR_ORDER_BY_USER_FAILURE:
      return {
        ...state,
        fetchingRepairorderById: false,
        fetchingRepairorderByIdError: true,
      };
    case types.HANDLE_REPAIR_PHONE_NOTES_ORDER_MODAL:
      return { ...state, phoNotesRepairOrderModal: action.payload };

    case types.HANDLE_QC_PHONE_NOTES_ORDER_MODAL:
      return { ...state, phoNotesQCOrderModal: action.payload };

    case types.UPDATE_QC_INSPECTION_BUTTON_REQUEST:
      return { ...state, updatingQcInspectionButton: true };
    case types.UPDATE_QC_INSPECTION_BUTTON_SUCCESS:
      return {
        ...state,
        updatingQcInspectionButton: false,
        orderByUser: state.orderByUser.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload
            : item
        ),
      };
    case types.UPDATE_QC_INSPECTION_BUTTON_FAILURE:
      return {
        ...state,
        updatingQcInspectionButton: false,
        updatingQcInspectionButtonError: true,
      };

    case types.UPDATE_QC_STATUS_REQUEST:
      return { ...state, updatingQCStatus: true };
    case types.UPDATE_QC_STATUS_SUCCESS:
      return {
        ...state,
        updatingQCStatus: false,
        orderPhoneList: state.orderPhoneList.map((item) => {
          if (item.phoneId == action.payload.phoneId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_QC_STATUS_FAILURE:
      return {
        ...state,
        updatingQCStatus: false,
        updatingQCStatusError: true,
      };

    case types.UPDATE_REPAIR_INSPECTION_BUTTON_REQUEST:
      return { ...state, updatingRepairInspectionButton: true };
    case types.UPDATE_REPAIR_INSPECTION_BUTTON_SUCCESS:
      return {
        ...state,
        updatingRepairInspectionButton: false,
        repairOrder: state.repairOrder.map((item) =>
          item.orderPhoneId === action.payload.orderPhoneId
            ? action.payload
            : item
        ),
      };
    case types.UPDATE_REPAIR_INSPECTION_BUTTON_FAILURE:
      return {
        ...state,
        updatingRepairInspectionButton: false,
        updatingRepairInspectionButtonError: true,
      };

    case types.GET_OPEN_USER_BY_USER_REQUEST:
      return { ...state, fetchingOpenRepairByUser: true };
    case types.GET_OPEN_USER_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOpenRepairByUser: false,
        openRepair: action.payload,
      };
    case types.GET_OPEN_USER_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOpenRepairByUser: false,
        fetchingOpenRepairByUserError: true,
      };

    case types.GET_OPEN_QC_BY_USER_REQUEST:
      return { ...state, fetchingOpenQc: true };
    case types.GET_OPEN_QC_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingOpenQc: false,
        openQc: action.payload,
      };
    case types.GET_OPEN_QC_BY_USER_FAILURE:
      return {
        ...state,
        fetchingOpenQc: false,
        fetchingOpenQcError: true,
      };

    case types.GET_ALL_SPARE_LIST_REQUEST:
      return { ...state, fetchingALlSPareList: true };
    case types.GET_ALL_SPARE_LIST_SUCCESS:
      return {
        ...state,
        fetchingALlSPareList: false,
        allSpareById: action.payload,
      };
    case types.GET_ALL_SPARE_LIST_FAILURE:
      return {
        ...state,
        fetchingALlSPareList: false,
        fetchingALlSPareListError: true,
      };

    case types.HANDLE_PRODUCT_BUILDER_MODAL:
      return { ...state, productBuilderList: action.payload };

    case types.HANDLE_PRODUCT_BUILDER_IN_PROCESS_MODAL:
      return { ...state, showProductBuilderList: action.payload };

    case types.SET_CLOSE_REPAIR_MODAL:
      return { ...state, showAssignRepairModal: false, assignOrderById: false };

    case types.GET_CATALOGUE_LIST_IN_REFURBISH_REQUEST:
      return { ...state, fetchingCatalogueListInReurbish: true };
    case types.GET_CATALOGUE_LIST_IN_REFURBISH_SUCCESS:
      return {
        ...state,
        fetchingCatalogueListInReurbish: false,
        catalogueInRefurbish: action.payload,
      };
    case types.GET_CATALOGUE_LIST_IN_REFURBISH_FAILURE:
      return {
        ...state,
        fetchingCatalogueListInReurbish: false,
        fetchingCatalogueListInReurbishError: true,
      };

    case types.UPDATE_CATALOGUE_IN_REFURBISH_REQUEST:
      return { ...state, updatingCatalogueInRefurbish: true };
    case types.UPDATE_CATALOGUE_IN_REFURBISH_SUCCESS:
      return {
        ...state,
        updatingCatalogueInRefurbish: false,
      };
    case types.UPDATE_CATALOGUE_IN_REFURBISH_FAILURE:
      return {
        ...state,
        updatingCatalogueInRefurbish: false,
        updatingCatalogueInRefurbishError: true,
      };

    case types.GET_CATALOGUE_BY_USER_REQUEST:
      return { ...state, fetchingCatalogueByUser: true };
    case types.GET_CATALOGUE_BY_USER_SUCCESS:
      return {
        ...state,
        fetchingCatalogueByUser: false,
        catalogueByUser: action.payload,
      };
    case types.GET_CATALOGUE_BY_USER_FAILURE:
      return {
        ...state,
        fetchingCatalogueByUser: false,
        fetchingCatalogueByUserError: true,
      };

    case types.CHOOSE_CATALOGUE_ITEM_REQUEST:
      return { ...state, choosingCatalogueItem: true };
    case types.CHOOSE_CATALOGUE_ITEM_SUCCESS:
      return {
        ...state,
        choosingCatalogueItem: false,
      };
    case types.CHOOSE_CATALOGUE_ITEM_FAILURE:
      return {
        ...state,
        choosingCatalogueItem: false,
        choosingCatalogueItemError: true,
      };

    case types.GET_CHOOSEN_CATALOGUE_ITEM_REQUEST:
      return { ...state, fetchingChoosenCatalogue: true };
    case types.GET_CHOOSEN_CATALOGUE_ITEM_SUCCESS:
      return {
        ...state,
        fetchingChoosenCatalogue: false,
        choosenOrderCatalogue: action.payload,
      };
    case types.GET_CHOOSEN_CATALOGUE_ITEM_FAILURE:
      return {
        ...state,
        fetchingChoosenCatalogue: false,
        fetchingChoosenCatalogueError: true,
      };

    case types.ADD_PRODUCT_BUILDER_BYID_REQUEST:
      return { ...state, addingProductBuilderById: true };
    case types.ADD_PRODUCT_BUILDER_BYID_SUCCESS:
      return {
        ...state,
        addingProductBuilderById: false,
      };
    case types.ADD_PRODUCT_BUILDER_BYID_FAILURE:
      return {
        ...state,
        addingProductBuilderById: false,
        addingProductBuilderByIdError: true,

      };

    case types.GET_PRODUCT_BUILDER_BYID_REQUEST:
      return { ...state, fetchingProductBuilderById: true };
    case types.GET_PRODUCT_BUILDER_BYID_SUCCESS:
      return {
        ...state,
        fetchingProductBuilderById: false,
        builderByManufatureId: action.payload,
      };
    case types.GET_PRODUCT_BUILDER_BYID_FAILURE:
      return {
        ...state,
        fetchingProductBuilderById: false,
        fetchingProductBuilderByIdError: true,
      };

    case types.GET_ALL_MANUFATUREID_REQUEST:
      return { ...state, fetchingAllManufaturedId: true };
    case types.GET_ALL_MANUFATUREID_SUCCESS:
      return {
        ...state,
        fetchingAllManufaturedId: false,
        allProductsByOrder: action.payload,
      };
    case types.GET_ALL_MANUFATUREID_FAILURE:
      return {
        ...state,
        fetchingAllManufaturedId: false,
        fetchingAllManufaturedIdError: true,
      };

    case types.ADD_CATALOGUE_BY_TECHNICIAN_REQUEST:
      return { ...state, addingCatalogueByTechnician: true };
    case types.ADD_CATALOGUE_BY_TECHNICIAN_SUCCESS:
      return {
        ...state,
        addingCatalogueByTechnician: false,
      };
    case types.ADD_CATALOGUE_BY_TECHNICIAN_FAILURE:
      return {
        ...state,
        addingCatalogueByTechnician: false,
        addingCatalogueByTechnicianError: true,

      };

    case types.GET_CATALOGUE_BY_TECHNICIAN_REQUEST:
      return { ...state, fetchingCatalogueByTechnician: true };
    case types.GET_CATALOGUE_BY_TECHNICIAN_SUCCESS:
      return {
        ...state,
        fetchingCatalogueByTechnician: false,
        catalogueByTechnician: action.payload,
      };
    case types.GET_CATALOGUE_BY_TECHNICIAN_FAILURE:
      return {
        ...state,
        fetchingCatalogueByTechnician: false,
        fetchingCatalogueByTechnicianError: true,

      };
    case types.UPDATE_FAR_GLASS_IN_PRODUCTION_REQUEST:
      return { ...state, updatingFarGlassInProduction: true };
    case types.UPDATE_FAR_GLASS_IN_PRODUCTION_SUCCESS:
      return {
        ...state,
        catalogueByTechnician: state.catalogueByTechnician.map((item) =>
          item.productRepurbishId === action.payload.productRepurbishId
            ? action.payload
            : item
        ),
        updatingFarGlassInProduction: false,
      };
    case types.UPDATE_FAR_GLASS_IN_PRODUCTION_FAILURE:
      return {
        ...state,
        updatingFarGlassInProduction: false,
        updatingFarGlassInProductionError: true,

      };
    case types.HANDLE_INTAG_MODAL:
      return { ...state, clickTagInDrawr: action.payload };

    case types.ADD_TAGIN_PROCESS_REQUEST:
      return { ...state, addingTagInProcess: true };
    case types.ADD_TAGIN_PROCESS_SUCCESS:
      return {
        ...state,
        addingTagInProcess: false,
      };
    case types.ADD_TAGIN_PROCESS_FAILURE:
      return {
        ...state,
        addingTagInProcess: false,
        addingTagInProcessError: true,
      };
    case types.GET_TAGIN_PROCESS_REQUEST:
      return { ...state, fetchingTagInProcess: true };
    case types.GET_TAGIN_PROCESS_SUCCESS:
      return {
        ...state,
        fetchingTagInProcess: false,
        tagInPros: action.payload,
      };
    case types.GET_TAGIN_PROCESS_FAILURE:
      return {
        ...state,
        fetchingTagInProcess: false,
        fetchingTagInProcessError: true,
      };

    case types.ADD_TASK_BY_PHONE_ID_REQUEST:
      return { ...state, addingTaskByPhoneById: true };
    case types.ADD_TASK_BY_PHONE_ID_SUCCESS:
      return {
        ...state,
        addingTaskByPhoneById: false,
      };
    case types.ADD_TASK_BY_PHONE_ID_FAILURE:
      return {
        ...state,
        addingTaskByPhoneById: false,
        addingTaskByPhoneByIdError: true,
      };

    case types.GET_TASK_BY_PHONEID_REQUEST:
      return { ...state, fetchingTaskByPhoneId: true };
    case types.GET_TASK_BY_PHONEID_SUCCESS:
      return {
        ...state,
        fetchingTaskByPhoneId: false,
        taskByPhone: action.payload
      };
    case types.GET_TASK_BY_PHONEID_FAILURE:
      return {
        ...state,
        fetchingTaskByPhoneId: false,
        fetchingTaskByPhoneIdError: true,
      };

    case types.APPROVE_SPARE_REQUEST:
      return { ...state, approvingSpare: true };
    case types.APPROVE_SPARE_SUCCESS:
      return {
        ...state,
        approvingSpare: false,
        allSpareById: state.allSpareById.filter(
          (item) => item.phoneSpareId !== action.payload.phoneSpareId
        ),
      };
    case types.APPROVE_SPARE_FAILURE:
      return {
        ...state,
        approvingSpare: false,
        approvingSpareError: true,
      };

    case types.UPDATE_PROCESS_TASK_REQUEST:
      return { ...state, updatingProcessTask: true };
    case types.UPDATE_PROCESS_TASK_SUCCESS:
      return {
        ...state,
        updatingProcessTask: false,
        taskByPhone: state.taskByPhone.map((item) => {
          if (item.phoneTaskId == action.payload.phoneTaskId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PROCESS_TASK_FAILURE:
      return {
        ...state,
        updatingProcessTask: false,
        updatingProcessTaskError: true,
      };

    case types.GET_TASK_ITEM_COUNT_REQUEST:
      return { ...state, fetchingItemTaskCount: true };
    case types.GET_TASK_ITEM_COUNT_SUCCESS:
      return {
        ...state,
        fetchingItemTaskCount: false,
        itemTaskcount: action.payload,
      };
    case types.GET_TASK_ITEM_COUNT_FAILURE:
      return {
        ...state,
        fetchingItemTaskCount: false,
        fetchingItemTaskCountError: true,
      };



    case types.DELETE_TASK_LIST_REQUEST:
      return { ...state, deletingTaskList: true };
    case types.DELETE_TASK_LIST_SUCCESS:
      return {
        ...state,
        deletingTaskList: false,
        taskByPhone: state.taskByPhone.filter(
          (item) => item.phoneTaskId !== action.payload.phoneTaskId
        ),


      };
    case types.DELETE_TASK_LIST_FAILURE:
      return {
        ...state,
        deletingTaskList: false,
        deletingTaskListError: true,
      };

    case types.GET_COMPLETED_PHONES_REQUEST:
      return { ...state, fetchingCompletedPhones: true };
    case types.GET_COMPLETED_PHONES_SUCCESS:
      return {
        ...state,
        fetchingCompletedPhones: false,
        completedPhone: action.payload,
      };
    case types.GET_COMPLETED_PHONES_FAILURE:
      return {
        ...state,
        fetchingCompletedPhones: false,
        fetchingCompletedPhonesError: true,

      };

    case types.REASSIGN_PHONES_REQUEST:
      return { ...state, reassigningPhones: true };
    case types.REASSIGN_PHONES_SUCCESS:
      return {
        ...state,
        reassigningPhones: false,
        // taskByPhone: state.taskByPhone.map((item) => {
        //   if (item.phoneTaskId == action.payload.phoneTaskId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };
    case types.REASSIGN_PHONES_FAILURE:
      return {
        ...state,
        reassigningPhones: false,
        reassigningPhonesError: true,
      };

    case types.GET_REMAINING_PHONES_REQUEST:
      return { ...state, fetchingRemainingPhones: true };
    case types.GET_REMAINING_PHONES_SUCCESS:
      return {
        ...state,
        fetchingRemainingPhones: false,
        remainingPhones: action.payload,
      };
    case types.GET_REMAINING_PHONES_FAILURE:
      return {
        ...state,
        fetchingRemainingPhones: false,
        fetchingRemainingPhonesError: true,

      };

    case types.UPDATE_PAUSE_STATUS_REQUEST:
      return { ...state, updatingPauseStatus: true };
    case types.UPDATE_PAUSE_STATUS_SUCCESS:
      return {
        ...state,
        updatingPauseStatus: false,
        repairPhone: state.repairPhone.map((item) =>
          item.phoneId === action.payload.phoneId
            ? action.payload
            : item
        ),

      };
    case types.UPDATE_PAUSE_STATUS_FAILURE:
      return {
        ...state,
        updatingPauseStatus: false,
        updatingPauseStatusError: true,
      };

    case types.ADD_LEAD_REQUEST:
      return { ...state, addingLead: true };
    case types.ADD_LEAD_SUCCESS:
      return {
        ...state,
        addingLead: false,
        showRefurbishLead: false,
        productionOrder: state.productionOrder.map((item) => {
          if (item.orderPhoneId == action.payload.orderPhoneId) {
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


    case types.GET_REJECTED_PHONES_REQUEST:
      return { ...state, fetchingRejectedPhonesByTechnician: true };
    case types.GET_REJECTED_PHONES_SUCCESS:
      return {
        ...state,
        fetchingRejectedPhonesByTechnician: false,
        rejectPhoneByUser: action.payload,
      };
    case types.GET_REJECTED_PHONES_FAILURE:
      return {
        ...state,
        fetchingRejectedPhonesByTechnician: false,
        fetchingRejectedPhonesByTechnicianError: true,

      };

    case types.ASSIGN_REJECTED_PHONES_REQUEST:
      return { ...state, reassigningrejectedphone: true };
    case types.ASSIGN_REJECTED_PHONES_SUCCESS:
      return {
        ...state,
        reassigningrejectedphone: false,
      };
    case types.ASSIGN_REJECTED_PHONES_FAILURE:
      return {
        ...state,
        reassigningrejectedphone: false,
        reassigningrejectedphoneError: true,
      };

    case types.GET_SPARE_LIST_BY_ID_REQUEST:
      return { ...state, fetchingSpareListById: true };
    case types.GET_SPARE_LIST_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingSpareListById: false,
        rcvSpareList: action.payload,
      };
    case types.GET_SPARE_LIST_BY_ID_FAILURE:
      return {
        ...state,
        fetchingSpareListById: false,
        fetchingSpareListByIdError: true,
      };

    case types.UPDATE_SPARE_RECEIVE_REQUEST:
      return { ...state, updatingSpareReceives: true };
    case types.UPDATE_SPARE_RECEIVE_SUCCESS:
      return {
        ...state,
        updatingSpareReceives: false,
      };
    case types.UPDATE_SPARE_RECEIVE_FAILURE:
      return {
        ...state,
        updatingSpareReceives: false,
        updatingSpareReceivesError: true,
      };

    case types.REASSIGN_REJECTED_PHONE_REQUEST:
      return { ...state, reassigningRejectedPhones: true };
    case types.REASSIGN_REJECTED_PHONE_SUCCESS:
      return {
        ...state,
        reassigningRejectedPhones: false,
      };
    case types.REASSIGN_REJECTED_PHONE_FAILURE:
      return {
        ...state,
        reassigningRejectedPhones: false,
        reassigningRejectedPhonesError: true,
      };
    default:
      return state;
  }
};
