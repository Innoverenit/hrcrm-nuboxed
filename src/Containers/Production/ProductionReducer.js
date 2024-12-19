import * as types from "./ProductionActionType";

const initialState = {
  openProductiondrawer: false,
  viewType: "table",



  addSpareNotesDrawerModal:false,


  fetchingManufactureLinkData:false,
  fetchingManufactureLinkDataError:false,
  manufactureLinkData:[],



  fetchingManufactureDetailsData:false,
  fetchingManufactureDetailsDataError:false,
  manufactureDetailsData:{},



  fetchingProductionCellList:false,
  fetchingProductionCellListError:false,
  productionCellList:[],


  fetchingReassignProduct:false,
  fetchingReassignProductError:false,
  reassignProduct:{},


  addCreateManufactureCard:false,

  creatingProductionLink: false,
  creatingProductionLinkError: false,

  fetchingSearchedProduction: false,
  fetchingSearchedProductionError: false,
  searchedProduction: [],

  fetchingProductRecords: false,
  fetchingProductRecordsError: false,
  productrecordData:{},

  fetchingProductionLocId: false, fetchingProductionLocIdError: false,
  productionByLocsId: [],



  fetchingProductionSteps:false,
  fetchingProductionStepsError:false,
  productionTableSteps:[],


  

  openbUILDERProductiondrawer: false,
  clickedProductionIdrwr: false,

  fetchingProdNbldr: false,
  fetchingProdNbldrError: false,
  ProdNbldr: [],

  fetchingWorkflowList: false,
  fetchingWorkflowListError: true,
  workflowProduction: [],



  updateBatchData:false,
  updateBatchDataError:false,


  addSparePartsDrawerModal:false,


  productionQualityModal:false,

  fetchingArchieveProduction: false,
  fetchingArchieveProductionError: false,
  archieveProduction: [],
  updateProductionStatus:false,
  updateProductionStatusError:false,

  

  fetchingProductionTable:false,
  fetchingProductionTableError:false,

  productionTableData:[],

  fetchingProductionStage:false,
  fetchingProductionStageError:false,

  productionTableStage:[],


  updatingProductionStage:false,

  settingInpectdn: false,settingInpectdnError:false,

  fetchingAllProductionOrgId: false,productionAllByOrgId:[], fetchingAllProductionOrgIdError:false,

  updatingroomrackProdn: false,updatingroomrackProdnError:false,

  fetchingAllStageProduction: false, productionStageAll:[], fetchingAllStageProductionError: false,
  updatingProductionDragStage: false,

  fetchingStageList: false,
  fetchingStageListError:false,
  stageProduction:[],

  clickProdnDrwr:false,
  updatingroomrackWip: false,updatingroomrackWipError:false,
};

const updateDragdpROD = (item, newProps) => {
  return item.map((opp, index) => {
    if (opp.manufactureId === newProps.manufactureId) {
      console.log("inside opp");
      opp.productionStagesId = newProps.productionStagesId;
    }
    return opp;
  });
};
export const productionReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.HANDLE_CREATE_PRODUCTION_DRAWER:
      return { ...state, openProductiondrawer: action.payload, searchedProduction: [] };



      case types.HANDLE_PRODUCTION_QUALITY_MODAL:
        return { ...state, productionQualityModal: action.payload };

    case types.SET_PRODUCTION_VIEW_TYPE:
      return { ...state, viewType: action.payload };



      case types.ADD_CREATE_MANUFACTURE_CARD_MODAL:
        return { ...state, addCreateManufactureCard: action.payload };



      case types.ADD_SPARE_PARTS_DRAWER_MODAL:
                                          return { ...state, addSparePartsDrawerModal: action.payload };


    case types.CREATE_PRODUCTION_LINK_REQUEST:
      return { ...state, creatingProductionLink: true };
    case types.CREATE_PRODUCTION_LINK_SUCCESS:
      return {
        ...state,
        creatingProductionLink: false,
        openProductiondrawer: false,
        productionTableData: [action.payload, ...state.productionTableData]
      };
    case types.CREATE_PRODUCTION_LINK_FAILURE:
      return {
        ...state,
        creatingProductionLink: false,
        creatingProductionLinkError: true,
      };

    case types.GET_SEARCH_PRODOCTION_REQUEST:
      return { ...state, fetchingSearchedProduction: true };
    case types.GET_SEARCH_PRODOCTION_SUCCESS:
      return {
        ...state,
        fetchingSearchedProduction: false,
        searchedProduction: action.payload,
      };
    case types.GET_SEARCH_PRODOCTION_FAILURE:
      return {
        ...state,
        fetchingSearchedProduction: false,
        fetchingSearchedProductionError: true,
      };

    case types.GET_WORKFLOW_LIST_REQUEST:
      return { ...state, fetchingWorkflowList: true };
    case types.GET_WORKFLOW_LIST_SUCCESS:
      return {
        ...state,
        fetchingWorkflowList: false,
        workflowProduction: action.payload,
      };
    case types.GET_WORKFLOW_LIST_FAILURE:
      return {
        ...state,
        fetchingWorkflowList: false,
        fetchingWorkflowListError: true,

      };

    case types.GET_PRODUCTION_BYLOC_ID_REQUEST:
      return { ...state, fetchingProductionLocId: true, fetchingProductionLocIdError: false };
    case types.GET_PRODUCTION_BYLOC_ID_SUCCESS:
      return { ...state, fetchingProductionLocId: false, productionByLocsId: action.payload };
    case types.GET_PRODUCTION_BYLOC_ID_FAILURE:
      return { ...state, fetchingProductionLocId: false, fetchingProductionLocIdError: true };



      case types.GET_PRODUCTION_TABLE_REQUEST:
        return { ...state, fetchingProductionTable: true, fetchingProductionTable: false };
      case types.GET_PRODUCTION_TABLE_SUCCESS:
        return { ...state, fetchingProductionTable: false, productionTableData: action.payload };
      case types.GET_PRODUCTION_TABLE_FAILURE:
        return { ...state, fetchingProductionTable: false, fetchingProductionTableError: true };



        case types.ADD_SPARE_NOTES_DRAWER_MODAL:
                                          return { ...state, addSpareNotesDrawerModal: action.payload };


        case types.UPDATE_PRODUCTION_PAUSE_STATUS_REQUEST:
          return { ...state, updatingProductionPauseStatus: true };
        case types.UPDATE_PRODUCTION_PAUSE_STATUS_SUCCESS:
          return {
            ...state,
            updatingProductionPauseStatus: false,
            productionTableData: state.productionTableData.map((item) =>
              item.productionProductId === action.payload.productionProductId
                ? action.payload
                : item
            ),
    
          };
        case types.UPDATE_PRODUCTION_PAUSE_STATUS_FAILURE:
          return {
            ...state,
            updatingProductionPauseStatus: false,
            updatingProductionPauseStatusError: true,
          };
        case types.GET_PRODUCTION_STAGE_REQUEST:
          return { ...state, fetchingProductionStage: true, fetchingProductionStageError: false };
        case types.GET_PRODUCTION_STAGE_SUCCESS:
          return { ...state, fetchingProductionStage: false, productionTableStage: action.payload };
        case types.GET_PRODUCTION_STAGE_FAILURE:
          return { ...state, fetchingProductionStage: false, fetchingProductionStageError: true };

    case types.REMOVE_PRODUCTION_REQUEST:
      return { ...state, removingProduction: true };
    case types.REMOVE_PRODUCTION_SUCCESS:
      return {
        ...state,
        removingProduction: false,
        productionByLocsId: state.productionByLocsId.filter(
          (item) => item.productionProductId !== action.payload.productionProductId
        ),
        productionTableData: state.productionTableData.filter(
          (item) => item.productionProductId !== action.payload.productionProductId
        ),
      };
    case types.REMOVE_PRODUCTION_FAILURE:
      return {
        ...state,
        removingProduction: false,
        removingProductionError: true,
      };



      // case types.EMPTY_MANUFACTURE_LINK:
      //   return { ...state, manufactureLinkData: [] };




        case types.GET_MANUFACTURE_DETAILS_DATA_REQUEST:
          return { ...state, fetchingManufactureDetailsData: true };
        case types.GET_MANUFACTURE_DETAILS_DATA_SUCCESS:
          //const newData1 = action.payload.filter(item => !state.manufactureDetailsData.includes(item));
          return {
            ...state,
            fetchingManufactureDetailsData: false,
            manufactureDetailsData: action.payload
            //clearbit: null,
          };
        case types.GET_MANUFACTURE_DETAILS_DATA_FAILURE:
          return {
            ...state,
            fetchingManufactureDetailsData: false,
            fetchingManufactureDetailsDataError: true,
          };



      case types.GET_MANUFACTURE_LINK_DATA_REQUEST:
        return { ...state, fetchingManufactureLinkData: true };
      case types.GET_MANUFACTURE_LINK_DATA_SUCCESS:
        //const newData = action.payload.filter(item => !state.manufactureLinkData.includes(item));
        return {
          ...state,
          fetchingManufactureLinkData: false,
          //manufactureLinkData: [...state.manufactureLinkData, ...action.payload]
          //clearbit: null,
          manufactureLinkData:action.payload
        };
      case types.GET_MANUFACTURE_LINK_DATA_FAILURE:
        return {
          ...state,
          fetchingManufactureLinkData: false,
          fetchingManufactureLinkDataError: true,
        };





      case types.UPDATE_PRODUCTION_STAGE_REQUEST:
        return {
          ...state,
          updatingProductionStage: true,
        
          // candidateRequirement: action.payload,
        };
      case types.UPDATE_PRODUCTION_STAGE_SUCCESS:
        return { ...state, 
          updatingProductionStage: false ,
          //userStageList: updatedDragUser(state.userStageList, action.payload),
         // candidateRequirement: [action.payload]

        };
      case types.UPDATE_PRODUCTION_STAGE_FAILURE:
        return { ...state };  

    case types.HANDLE_BUILDER_PRODUCTION_DRAWER:
      return { ...state, openbUILDERProductiondrawer: action.payload };

    case types.HANDLE_PRODUCTIONID_DRAWER:
      return { ...state, clickedProductionIdrwr: action.payload };

    case types.GET_PRODUCTION_BUILDER_REQUEST:
      return {
        ...state,
        fetchingProdNbldr: true,
        fetchingProdNbldrError: false,
      };
    case types.GET_PRODUCTION_BUILDER_SUCCESS:
      return {
        ...state,
        fetchingProdNbldr: false,
        ProdNbldr: action.payload,
      };
    case types.GET_PRODUCTION_BUILDER_FAILURE:
      return {
        ...state,
        fetchingProdNbldr: false,
        fetchingProdNbldrError: true,
      };




      case types.GET_REASSIGN_PRODUCT_REQUEST:
        return { ...state, fetchingReassignProduct: true, fetchingReassignProduct: false };
      case types.GET_REASSIGN_PRODUCT_SUCCESS:
        return { ...state, fetchingReassignProduct: false, reassignProduct: action.payload };
      case types.GET_REASSIGN_PRODUCT_FAILURE:
        return { ...state, fetchingReassignProduct: false, fetchingReassignProductError: true };

    case types.GET_ARCHIEVE_PRODOCTION_LIST_REQUEST:
      return {
        ...state,
        fetchingArchieveProduction: true,
      };
    case types.GET_ARCHIEVE_PRODOCTION_LIST_SUCCESS:
      return {
        ...state,
        fetchingArchieveProduction: false,
        archieveProduction: action.payload,
      };
    case types.GET_ARCHIEVE_PRODOCTION_LIST_FAILURE:
      return {
        ...state,
        fetchingArchieveProduction: false,
        fetchingArchieveProductionError: true,
      };

      case types.UPDATE_PRODCUTION_STATUS_REQUEST:
        return { ...state,updateProductionStatus: true };
      case types.UPDATE_PRODCUTION_STATUS_SUCCESS:
        return {
          ...state,
          updateProductionStatus: false,
             productionByLocsId: state.productionByLocsId.map((item) => {
            if (item.productionProductId === action.payload.productionProductId) {
              return action.payload;
            } else {
              return item;
            }
          }),
          productionTableData: state.productionTableData.map((item) => {
            if (item.productionProductId === action.payload.productionProductId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };



        case types.GET_PRODUCTION_CELL_LIST_REQUEST:
          return { ...state, fetchingProductionCellList: true, fetchingProductionCellList: false };
        case types.GET_PRODUCTION_CELL_LIST_SUCCESS:
          return { ...state, fetchingProductionCellList: false, productionCellList: action.payload };
        case types.GET_PRODUCTION_CELL_LIST_FAILURE:
          return { ...state, fetchingProductionCellList: false, fetchingProductionCellListError: true };
      case types.UPDATE_PRODCUTION_STATUS_FAILURE:
        return { ...state, updateProductionStatus: false,updateProductionStatusError:true, };


        case types.SET_INSPECT_PRODN_REQUEST:
          return { ...state,settingInpectdn: true };
        case types.SET_INSPECT_PRODN_SUCCESS:
          return {
            ...state,
            settingInpectdn: false,
            productionTableData: state.productionTableData.map((item) => {
              if (item.productionProductId === action.payload.productionProductId) {
                return action.payload;
              } else {
                return item;
              }
            }),
             
          };
        case types.SET_INSPECT_PRODN_FAILURE:
          return { ...state, settingInpectdn: false,settingInpectdnError:true, };




          case types.GET_PRODUCTION_STEPS_REQUEST:
        return { ...state, fetchingProductionSteps: true, 
          // fetchingProductionTable: false 
        };
      case types.GET_PRODUCTION_STEPS_SUCCESS:
        return { ...state, fetchingProductionSteps: false, productionTableSteps: action.payload };
      case types.GET_PRODUCTION_STEPS_FAILURE:
        return { ...state, fetchingProductionSteps: false, fetchingProductionStepsError: true };
  
          case types.GET_ALL_PRODUCTION_BYORG_ID_REQUEST:
            return { ...state, fetchingAllProductionOrgId: true, fetchingAllProductionOrgIdError: false };
          case types.GET_ALL_PRODUCTION_BYORG_ID_SUCCESS:
            return { ...state, fetchingAllProductionOrgId: false, productionAllByOrgId: action.payload };
          case types.GET_ALL_PRODUCTION_BYORG_ID_FAILURE:
            return { ...state, fetchingAllProductionOrgId: false, fetchingAllProductionOrgIdError: true };
      
         
        case types.GET_PRODUCT_RECORDS_REQUEST:
          return { ...state, fetchingProductRecords: true };
        case types.GET_PRODUCT_RECORDS_SUCCESS:
          return {
            ...state,
            fetchingProductRecords: false,
            productrecordData: action.payload,
          };
        case types.GET_PRODUCT_RECORDS_FAILURE:
          return {
            ...state,
            fetchingProductRecords: false,
            fetchingProductRecordsError: true,
          };

case types.UPDATE_ROOM_RACK_PRODN_REQUEST:
          return { ...state,updatingroomrackProdn: true };
        case types.UPDATE_ROOM_RACK_PRODN_SUCCESS:
          return {
            ...state,
            updatingroomrackProdn: false,
            productionByLocsId: state.productionByLocsId.map((item) => {
              if (item.productionProductId === action.payload.productionProductId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
        case types.UPDATE_ROOM_RACK_PRODN_FAILURE:
          return { ...state, updatingroomrackProdn: false,updatingroomrackProdnError:true, };




          case types.UPDATE_BATCH_DATA_REQUEST:
            return { ...state,updateBatchData: true };
          case types.UPDATE_BATCH_DATA_SUCCESS:
            return {
              ...state,
              updateBatchData: false,
              productionAllByOrgId: state.productionAllByOrgId.map((item) => {
                if (item.productionProductId === action.payload.productionProductId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            
            };
            
          case types.UPDATE_BATCH_DATA_FAILURE:
            return { ...state,updateBatchData: false, updateBatchDataError:false,};
    

          case types.GET_ALL_STAGE_PRODUCTION_REQUEST:
            return { ...state, fetchingAllStageProduction: true, fetchingAllStageProductionError: false };
          case types.GET_ALL_STAGE_PRODUCTION_SUCCESS:
            return { ...state, fetchingAllStageProduction: false, productionStageAll: action.payload };
          case types.GET_ALL_STAGE_PRODUCTION_FAILURE:
            return { ...state, fetchingAllStageProduction: false, fetchingAllStageProductionError: true };


            case types.UPDATE_PRODUCTION_DRAG_STAGE_REQUEST:
              return {
                ...state,
                updatingProductionDragStage: true,
              
                // candidateRequirement: action.payload,
              };
            case types.UPDATE_PRODUCTION_DRAG_STAGE_SUCCESS:
              return { ...state, 
                updatingProductionDragStage: false ,
                productionByLocsId: updateDragdpROD(state.productionByLocsId, action.payload),
               // candidateRequirement: [action.payload]

              };
            case types.UPDATE_PRODUCTION_DRAG_STAGE_FAILURE:
              return { ...state };  

   
   
              case types.GET_STAGE_LIST_REQUEST:
                return { ...state, fetchingStageList: true };
              case types.GET_STAGE_LIST_SUCCESS:
                return {
                  ...state,
                  fetchingStageList: false,
                  stageProduction: action.payload,
                };
              case types.GET_STAGE_LIST_FAILURE:
                return {
                  ...state,
                  fetchingStageList: false,
                  fetchingStageListError: true,
          
                };  
                   case types.UPDATE_ROOM_RACK_WIP_REQUEST:
                  return { ...state,updatingroomrackWip: true };
                case types.UPDATE_ROOM_RACK_PRODN_SUCCESS:
                  return {
                    ...state,
                    updatingroomrackWip: false,
                    productionByLocsId: state.productionByLocsId.map((item) => {
                      if (item.productionProductId === action.payload.productionProductId) {
                        return action.payload;
                      } else {
                        return item;
                      }
                    }),
                  };
                case types.UPDATE_ROOM_RACK_WIP_FAILURE:
                  return { ...state, updatingroomrackWip: false,updatingroomrackWipError:true, };

              default:
      return state;
  }
};