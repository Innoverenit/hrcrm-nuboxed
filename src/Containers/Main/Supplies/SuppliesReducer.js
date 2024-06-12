import * as types from "./SuppliesActionType";
import moment from "moment";
const initialState = {
    viewType: "all",

    addSuppliesModal: false,

    addBrandModel: false,

    addingMaterialToggle: false,
    addingMaterialToggleError: false,

    addingPurchase: false,
    addingPurchaseError: false,

    addingMasterList: false,
    addingMasterListError: false,

    fetchingPurchaseList: false,
    fetchingPurchaseListError: false,
    purchaseList: [],

    updateSuppliesDrawer: false,

    setEditingSupplies: {},

    updateSuppliesById: false,
    updateSuppliesByIdError: false,

    fetchingSuppliesInputSearchData:false,
    fetchingSuppliesInputSearchDataError:false,

  

    fetchingSuppliesHistory: false,
    fetchingSuppliesHistoryError: false,
    suppliesHistory: [],

    addingMaterialFifoToggle: false,
    addingMaterialFifoToggleError: false,

    addDeleteFeedbackModal: false,

    deletingSuppliesData: false,
    deletingSuppliesDataError: false,

    fetchingDeletedSuppliesHistory: false,
    fetchingDeletedSuppliesHistoryError: true,
    deleteSuppliesHistory: [],

    fetchingTaggedBrandById: false,
    fetchingTaggedBrandByIdError: false,
    taggedBrand: [],

    reInstatedSuppliesById: false,
    reInstatedSuppliesByIdError: false,

    updateToCatalogue: false,
    updateToCatalogueError: false,

    addCurrencyValue: false,

    addingPriceRate: false,
    addingPriceRateError: false,

    fetchingPurchaseByGroupId: false,
    fetchingPurchaseByGroupIdError: false,
    materialByGroup: [],

    fetchingMaterialPriceById: false,
    fetchingMaterialPriceByIdError: false,
    materialPrice: [],

    fetchingBrandModel: false,
    fetchingBrandModelError: false,
    brandModel: [],

    fetchingSuppliescount: false,
    fetchingSuppliescountError: false,
    suppliesCount: {},

    fetchingSuppliesDeletedcount: false,
     fetchingSuppliesDeletedcountError: false,
     suppliesDeletedCount:{},

    materialBuildrawer: false,

    addingMaterialBuilder: false,
    // addedMateriBuilder:{},
    addingMaterialBuilderError: false,

    fetchingMaterialBuilderbyId: false,
    builderMaterialbyId: [],
    fetchingMaterialBuilderbyIdError: false,

    fetchingSearchedMaterialBuilders: false,
    fetchingSearchedMaterialBuildersError: false,
    searchedMaterialBuilders: [],

    removingMaterialBuilder: false,
    removingMaterialBuilderError: false,

    updatingMaterialBuilder: false,
    updatingMaterialBuilderError: false,

    deletingSuppliesData: false,
    deletingSuppliesDataError: false,

    suppliersListDrwr: false,

    fetchingSupplieSupplerList: false,
    fetchingSupplieSupplerListError: false,
    supplieSupplerList: []
};

export const suppliesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_SUPPLIES_VIEW_TYPE:
            return { ...state, viewType: action.payload };

        case types.HANDLE_SUPPLIES_MODAL:
            return { ...state, addSuppliesModal: action.payload };

        case types.HANDLE_BRAND_MODEL:
            return { ...state, addBrandModel: action.payload };

        case types.ADD_SUPPLIES_REQUEST:
            return { ...state, addingPurchase: true };
        case types.ADD_SUPPLIES_SUCCESS:
            return {
                ...state, addingPurchase: false,
                purchaseList: [action.payload, ...state.purchaseList],
                addSuppliesModal: false
            };
        case types.ADD_SUPPLIES_FAILURE:
            return {
                ...state,
                addingPurchase: false,
                addingPurchaseError: true,
                addSuppliesModal: false,
            };

        case types.GET_SUPPLIES_LIST_REQUEST:
            return { ...state, fetchingPurchaseList: true };
        case types.GET_SUPPLIES_LIST_SUCCESS:
            return {
                ...state,
                fetchingPurchaseList: false,
                purchaseList: action.payload,
            };
        case types.GET_SUPPLIES_LIST_FAILURE:
            return {
                ...state,
                fetchingPurchaseList: false,
                fetchingPurchaseListError: true,
            };

        case types.HANDLE_UPDATE_SUPPLIES_DRAWER:
            return { ...state, updateSuppliesDrawer: action.payload };

        case types.SET_EDIT_SUPPLIES:
            return { ...state, setEditingSupplies: action.payload };

        case types.UPDATE_SUPPLIES_BY_ID_REQUEST:
            return { ...state, updateSuppliesById: true };
        case types.UPDATE_SUPPLIES_BY_ID_SUCCESS:
            return {
                ...state,
                updateSuppliesById: false,
                updateSuppliesDrawer: false,
                purchaseList: state.purchaseList.map((item) => {
                    if (item.suppliesId == action.payload.suppliesId) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
                materialByGroup: state.materialByGroup.map((item) => {
                    if (item.suppliesId == action.payload.suppliesId) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
            };
        case types.UPDATE_SUPPLIES_BY_ID_FAILURE:
            return {
                ...state,
                updateSuppliesById: false,
                updateSuppliesByIdError: true,
            };

        case types.GET_SUPPLIES_HISTORY_REQUEST:
            return { ...state, fetchingSuppliesHistory: true };
        case types.GET_SUPPLIES_HISTORY_SUCCESS:
            return {
                ...state,
                fetchingSuppliesHistory: false,
                suppliesHistory: action.payload,
            };
        case types.GET_SUPPLIES_HISTORY_FAILURE:
            return {
                ...state,
                fetchingSuppliesHistory: false,
                fetchingSuppliesHistoryError: true,
            };

        case types.HANDLE_DELETE_FEEDBACK_MODAL:
            return { ...state, addDeleteFeedbackModal: action.payload };

        //delete Purchase data

        case types.DELETE_PURCHASE_DATA_REQUEST:
            return { ...state, deletingSuppliesData: true };
        case types.DELETE_PURCHASE_DATA_SUCCESS:
            return {
                ...state,
                deletingSuppliesData: false,
                addDeleteSuppliesModal: false,
                purchaseList: state.purchaseList.filter(
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

        case types.GET_DELETE_HISTORY_REQUEST:
            return { ...state, fetchingDeletedSuppliesHistory: true };
        case types.GET_DELETE_HISTORY_SUCCESS:
            return {
                ...state,
                fetchingDeletedSuppliesHistory: false,
                deleteSuppliesHistory: action.payload,
            };
        case types.GET_DELETE_HISTORY_FAILURE:
            return {
                ...state,
                fetchingDeletedSuppliesHistory: false,
                fetchingDeletedSuppliesHistoryError: true,
            };

        case types.REINSTATE_TOGGLE_FOR_SUPPLIES_REQUEST:
            return { ...state, reInstatedSuppliesById: true };
        case types.REINSTATE_TOGGLE_FOR_SUPPLIES_SUCCESS:
            return {
                ...state,
                reInstatedSuppliesById: false,
                deleteSuppliesHistory: state.deleteSuppliesHistory.filter(
                    (item) => item.suppliesId !== action.payload
                  ),
                // updateSuppliesDrawer: false,
                // purchaseList: state.purchaseList.map((item) => {
                //     if (item.suppliesId == action.payload.suppliesId) {
                //         return action.payload;
                //     } else {
                //         return item;
                //     }
                // }),
            };
        case types.REINSTATE_TOGGLE_FOR_SUPPLIES_FAILURE:
            return {
                ...state,
                reInstatedSuppliesById: false,
                reInstatedSuppliesByIdError: true,
            };

        case types.ADD_TO_CATALOGUE_REQUEST:
            return { ...state, updateToCatalogue: true };
        case types.ADD_TO_CATALOGUE_SUCCESS:
            return {
                ...state,
                updateToCatalogue: false,
                purchaseList: state.purchaseList.map((item) => {
                    if (item.suppliesId == action.payload.suppliesId) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
            };
        case types.ADD_TO_CATALOGUE_FAILURE:
            return {
                ...state,
                updateToCatalogue: false,
                updateToCatalogueError: true,
            };

        case types.HANDLE_CURENCY_PRICE_MODAL:
            return { ...state, addCurrencyValue: action.payload };

        case types.ADD_PRICE_RATE_REQUEST:
            return { ...state, addingPriceRate: true };
        case types.ADD_PRICE_RATE_SUCCESS:
            return { ...state, addingPriceRate: false };
        case types.ADD_PRICE_RATE_FAILURE:
            return {
                ...state,
                addingPriceRate: false,
                addingPriceRateError: true,

            };

        case types.GET_SUPPLIES_BY_GROUP_ID_REQUEST:
            return { ...state, fetchingPurchaseByGroupId: true };
        case types.GET_SUPPLIES_BY_GROUP_ID_SUCCESS:
            return {
                ...state,
                fetchingPurchaseByGroupId: false,
                materialByGroup: action.payload,
            };
        case types.GET_SUPPLIES_BY_GROUP_ID_FAILURE:
            return {
                ...state,
                fetchingPurchaseByGroupId: false,
                fetchingPurchaseByGroupIdError: true,
            };

        case types.GET_MATERIAL_PRICE_BY_ID_REQUEST:
            return { ...state, fetchingMaterialPriceById: true };
        case types.GET_MATERIAL_PRICE_BY_ID_SUCCESS:
            return {
                ...state,
                fetchingMaterialPriceById: false,
                materialPrice: action.payload,
            };
        case types.GET_MATERIAL_PRICE_BY_ID_FAILURE:
            return {
                ...state,
                fetchingMaterialPriceById: false,
                fetchingMaterialPriceByIdError: true,
            };

        case types.ADD_MASTER_LIST_REQUEST:
            return { ...state, addingMasterList: true };
        case types.ADD_MASTER_LIST_SUCCESS:
            return {
                ...state,
                addingMasterList: false,
                addBrandModel: false,
                brandModel: [],
                purchaseList: state.purchaseList.map((item) => {
                    if (item.suppliesId == action.payload.suppliesId) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
            };
        case types.ADD_MASTER_LIST_FAILURE:
            return {
                ...state,
                addingMasterList: false,
                addingMasterListError: true,
                addBrandModel: false
            };

        case types.GET_TAGGED_BRAND_BY_ID_REQUEST:
            return { ...state, fetchingTaggedBrandById: true };
        case types.GET_TAGGED_BRAND_BY_ID_SUCCESS:
            return {
                ...state,
                fetchingTaggedBrandById: false,
                taggedBrand: action.payload
            };
        case types.GET_TAGGED_BRAND_BY_ID_FAILURE:
            return {
                ...state,
                fetchingTaggedBrandById: false,
                fetchingTaggedBrandByIdError: true,
            };

        case types.GET_BRAND_MODEL_REQUEST:
            return { ...state, fetchingBrandModel: true };
        case types.GET_BRAND_MODEL_SUCCESS:
            return { ...state, fetchingBrandModel: false, brandModel: action.payload };
        case types.GET_BRAND_MODEL_FAILURE:
            return { ...state, fetchingBrandModel: false, fetchingBrandModelError: true };

        case types.GET_SUPPLIES_COUNT_REQUEST:
            return { ...state, fetchingSuppliescount: true };
        case types.GET_SUPPLIES_COUNT_SUCCESS:
            return { ...state, fetchingSuppliescount: false, suppliesCount: action.payload };
        case types.GET_SUPPLIES_COUNT_FAILURE:
            return { ...state, fetchingSuppliescount: false, fetchingSuppliescountError: true };

            case types.GET_SUPPLIES_DELETED_COUNT_REQUEST:
                return { ...state, fetchingSuppliesDeletedcount: true };
            case types.GET_SUPPLIES_DELETED_COUNT_SUCCESS:
                return { ...state, fetchingSuppliesDeletedcount: false, suppliesDeletedCount: action.payload };
            case types.GET_SUPPLIES_DELETED_COUNT_FAILURE:
                return { ...state, fetchingSuppliesDeletedcount: false, fetchingSuppliesDeletedcountError: true };

        case types.HANDLE_MATERIAL_BUILDER_DRAWER:
            return { ...state, materialBuildrawer: action.payload };

        case types.ADD_MATERIAL_BUILDER_REQUEST:
            return { ...state, addingMaterialBuilder: true };
        case types.ADD_MATERIAL_BUILDER_SUCCESS:
            return {
                ...state,
                addingMaterialBuilder: false,
                //   addedMateriBuilder:action.payload,
                builderMaterialbyId: [action.payload, ...state.builderMaterialbyId]
            };
        case types.ADD_MATERIAL_BUILDER_FAILURE:
            return {
                ...state,
                addingMaterialBuilder: false,
                addingMaterialBuilderError: true,
            };

        case types.GET_MATERIAL_BUILDER_BYID_REQUEST:
            return {
                ...state,
                fetchingMaterialBuilderbyId: true,
                fetchingMaterialBuilderbyIdError: false,
            };
        case types.GET_MATERIAL_BUILDER_BYID_SUCCESS:
            return {
                ...state,
                fetchingMaterialBuilderbyId: false,
                builderMaterialbyId: action.payload,
            };
        case types.GET_MATERIAL_BUILDER_BYID_FAILURE:
            return {
                ...state,
                fetchingMaterialBuilderbyId: false,
                fetchingMaterialBuilderbyIdError: true,
            };

        case types.GET_SEARCH_MATERIAL_BUILDER_REQUEST:
            return { ...state, fetchingSearchedMaterialBuilders: true };
        case types.GET_SEARCH_MATERIAL_BUILDER_SUCCESS:
            return {
                ...state,
                fetchingSearchedMaterialBuilders: false,
                searchedMaterialBuilders: action.payload,
            };
        case types.GET_SEARCH_MATERIAL_BUILDER_FAILURE:
            return {
                ...state,
                fetchingSearchedMaterialBuilders: false,
                fetchingSearchedMaterialBuildersError: true,
            };

        case types.REMOVE_MATERIAL_BUILDER_REQUEST:
            return { ...state, removingMaterialBuilder: true };
        case types.REMOVE_MATERIAL_BUILDER_SUCCESS:
            return {
                ...state,
                removingMaterialBuilder: false,
                builderMaterialbyId: state.builderMaterialbyId.filter(
                    (item) => item.supplySupplyLinkId !== action.payload.supplySupplyLinkId
                ),
            };
        case types.REMOVE_MATERIAL_BUILDER_FAILURE:
            return {
                ...state,
                removingMaterialBuilder: false,
                removingMaterialBuilderError: true,
            };

        case types.UPDATE_MATERIAL_BUILDER_REQUEST:
            return { ...state, updatingMaterialBuilder: true };
        case types.UPDATE_MATERIAL_BUILDER_SUCCESS:
            return {
                ...state,
                updatingMaterialBuilder: false,
                builderMaterialbyId: state.builderMaterialbyId.map((item) => {
                    if (item.linkSuppliesId === action.payload.linkSuppliesId) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),

            };
        case types.UPDATE_MATERIAL_BUILDER_FAILURE:
            return {
                ...state,
                updatingMaterialBuilder: false,
                updatingMaterialBuilderError: true,
            };

        case types.DELETE_SUPPLIES_REQUEST:
            return { ...state, deletingSuppliesData: true };
        case types.DELETE_SUPPLIES_SUCCESS:
            return {
                ...state,
                deletingSuppliesData: false,
            };
        case types.DELETE_SUPPLIES_FAILURE:
            return {
                ...state,
                deletingSuppliesData: false,
                deletingSuppliesDataError: true,
            };

        case types.HANDLE_SUPPLIERSLIST_DRAWER:
            return { ...state, suppliersListDrwr: action.payload };

        case types.GET_SUPPLIES_SUPPLIERS_REQUEST:
            return { ...state, fetchingSupplieSupplerList: true };
        case types.GET_SUPPLIES_SUPPLIERS_SUCCESS:
            return {
                ...state,
                fetchingSupplieSupplerList: false,
                supplieSupplerList: action.payload,
            };
        case types.GET_SUPPLIES_SUPPLIERS_FAILURE:
            return {
                ...state,
                fetchingSupplieSupplerList: false,
                fetchingSupplieSupplerListError: true,
            };

        case types.SET_SUPPLIES_SUPPLIER_REQUEST:
            return { ...state };
        case types.SET_SUPPLIES_SUPPLIER_SUCCESS:
            return {
                ...state,
                supplieSupplerList: state.supplieSupplerList.map(
                    (item) => {
                        if (item.supplierId === action.payload.supplierId) {
                            return action.payload;
                        } else {
                            return item;
                        }
                    }),
            };
        case types.SET_SUPPLIES_SUPPLIER_FAILURE:
            return { ...state };



            case types.LINK_MATERIAL_TOGGLE_REQUEST:
                return { ...state, addingMaterialToggle: true };
              case types.LINK_MATERIAL_TOGGLE_SUCCESS:
                return {
                  ...state,
                  addingMaterialToggle: false,
                  purchaseList: state.purchaseList.map((item) => {
                    if (item.suppliesId === action.payload.suppliesId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.LINK_MATERIAL_TOGGLE_FAILURE:
                return {
                  ...state,
                  addingMaterialToggle: false,
                  addingMaterialToggleError: true,
                };


                
            case types.LINK_MATERIAL_FIFO_TOGGLE_REQUEST:
                return { ...state, addingMaterialFifoToggle: true };
              case types.LINK_MATERIAL_FIFO_TOGGLE_SUCCESS:
                return {
                  ...state,
                  addingMaterialFifoToggle: false,
                  purchaseList: state.purchaseList.map((item) => {
                    if (item.suppliesId === action.payload.suppliesId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.LINK_MATERIAL_FIFO_TOGGLE_FAILURE:
                return {
                  ...state,
                  addingMaterialFifoToggle: false,
                  addingMaterialFifoToggleError: true,
                };

                case types.INPUT_SUPPLIES_SEARCH_DATA_REQUEST:
                    return { ...state, fetchingSuppliesInputSearchData: true };
                  case types.INPUT_SUPPLIES_SEARCH_DATA_SUCCESS:
                    return {
                      ...state,
                      fetchingSuppliesInputSearchData: false,
                      purchaseList: action.payload,
                       deleteSuppliesHistory: action.payload,
                   
                    };
                  case types.INPUT_SUPPLIES_SEARCH_DATA_FAILURE:
                    return { ...state, fetchingSuppliesInputSearchDataError: true };
                  
                    case types.HANDLE_CLAER_REDUCER_DATA_MATERIAL:
                        return {
                          ...state,
                          purchaseList: [],
                          // deletedTruck: []
                        };   


        default:
            return state;
    }
};