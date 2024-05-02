import * as types from "./ProductionActionType";

const initialState = {
  openProductiondrawer: false,
  viewType: "table",

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


  

  openbUILDERProductiondrawer: false,
  clickedProductionIdrwr: false,

  fetchingProdNbldr: false,
  fetchingProdNbldrError: false,
  ProdNbldr: [],

  fetchingWorkflowList: false,
  fetchingWorkflowListError: true,
  workflowProduction: [],


  addSparePartsDrawerModal:false,

  fetchingArchieveProduction: false,
  fetchingArchieveProductionError: false,
  archieveProduction: [],
  updateProductionStatus:false,
  updateProductionStatusError:false,

  

  fetchingProductionTable:false,
  fetchingProductionTableError:false,

  productionTableData:{},

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

    case types.SET_PRODUCTION_VIEW_TYPE:
      return { ...state, viewType: action.payload };



      case types.ADD_SPARE_PARTS_DRAWER_MODAL:
                                          return { ...state, addSparePartsDrawerModal: action.payload };


    case types.CREATE_PRODUCTION_LINK_REQUEST:
      return { ...state, creatingProductionLink: true };
    case types.CREATE_PRODUCTION_LINK_SUCCESS:
      return {
        ...state,
        creatingProductionLink: false,
        openProductiondrawer: false,
        productionByLocsId: [action.payload, ...state.productionByLocsId]
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

    case types.REMOVE_PRODUCTION_REQUEST:
      return { ...state, removingProduction: true };
    case types.REMOVE_PRODUCTION_SUCCESS:
      return {
        ...state,
        removingProduction: false,
        productionByLocsId: state.productionByLocsId.filter(
          (item) => item.productionProductId !== action.payload.productionProductId
        ),
      };
    case types.REMOVE_PRODUCTION_FAILURE:
      return {
        ...state,
        removingProduction: false,
        removingProductionError: true,
      };

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
        };
      case types.UPDATE_PRODCUTION_STATUS_FAILURE:
        return { ...state, updateProductionStatus: false,updateProductionStatusError:true, };


        case types.SET_INSPECT_PRODN_REQUEST:
          return { ...state,settingInpectdn: true };
        case types.SET_INSPECT_PRODN_SUCCESS:
          return {
            ...state,
            settingInpectdn: false,
             
          };
        case types.SET_INSPECT_PRODN_FAILURE:
          return { ...state, settingInpectdn: false,settingInpectdnError:true, };
  
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