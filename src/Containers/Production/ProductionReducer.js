import * as types from "./ProductionActionType";

const initialState = {
  openProductiondrawer: false,
  viewType: "card",

  creatingProductionLink: false,
  creatingProductionLinkError: false,

  fetchingSearchedProduction: false,
  fetchingSearchedProductionError: false,
  searchedProduction: [],

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

  fetchingArchieveProduction: false,
  fetchingArchieveProductionError: false,
  archieveProduction: []

};
export const productionReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.HANDLE_CREATE_PRODUCTION_DRAWER:
      return { ...state, openProductiondrawer: action.payload, searchedProduction: [] };

    case types.SET_PRODUCTION_VIEW_TYPE:
      return { ...state, viewType: action.payload };


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


    default:
      return state;
  }
};