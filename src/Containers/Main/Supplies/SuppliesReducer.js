import * as types from "./SuppliesActionType";
import dayjs from "dayjs";
const initialState = {
    viewType: "all",

    addSuppliesModal: false,
    uploadingMaterialList:false,
    uploadingMaterialListError:false,

    fetchingbestBeforeEmailList: false,
    fetchingbestBeforeEmailListError: false,
    bestBeforeEmailList:[],

    deletingEmailList: false,
    deletingEmailListError: false,

    fetchingNewArrivalList: false,
    fetchingNewArrivalListError: false,
    newArrivalDataList:[],

    deletingNewArrival: false,
    deletingNewArrivalError: false,

    fetchingItemData: false,
    fetchingItemDataError: false,
    newStepItemData:[],

    fetchingbestBefore: false,
    fetchingbestBeforeError: false,
    bestBeforeData:[],

    bestBeforemodal:false,

    erpDocumentUploadModal:false,

    deletingSuppliesDocumentData: false,
    deletingSuppliesDocumentDataError: false,

    fetchingDocumentsBySupplies: false,
    fetchingDocumentsBySuppliesError: false,
    documentsBySuppliesId:[],

    addingLocationSuppliesValue:false,
    addingLocationSuppliesValueError:false,


    locationSuppliesModal:false,

    uploadImageListSupplies:false,

    newArivalmodal:false,

    addBrandModel: false,

    priceOpenModal:false,
    addSuppliesBrandModal:false,

    creatingMaterialCurrency: false,
    creatingMaterialCurrencyError: false,

    fetchingMaterialCurrency: false,
    fetchingMaterialCurrencyError: false,
    materialCurrency:[],


    uploadSuppliesList:false,

    materialCpmplementary: false,
    materialCpmplementaryError: false,

    fetchingComplementaryList: false,
    fetchingComplementaryListError: false,
    complementaryList:[],
    
    creatingMaterialDiscount: false,
    creatingMaterialDiscountError: false,

    fetchingMaterialDiscount: false,
          fetchingMaterialDiscountError: false,
          materialDiscount:[],


          fetchingMaterialDiscountB2C: false,
          fetchingMaterialDiscountB2CError: false,
          materialDiscountB2C:[],

          creatingMaterialDiscountB2C: false,
          creatingMaterialDiscountB2CError: false,

    addingMaterialToggle: false,
    addingMaterialToggleError: false,

    addingPurchase: false,
    addingPurchaseError: false,

    addingMasterList: false,
    addingMasterListError: false,


    updatingBrandMaterial:false,
    updatingBrandMaterialError:false,

    fetchingPurchaseList: false,
    fetchingPurchaseListError: false,
    purchaseList: [],

    fetchingBrandProductList:false,
    fetchingBrandProductListError:false,
    brandProductListData:[],

    updateSuppliesDrawer: false,

    setEditingSupplies: {},

    updateSuppliesById: false,
    updateSuppliesByIdError: false,

    fetchingSuppliesInputSearchData:false,
    fetchingSuppliesInputSearchDataError:false,

  

    fetchingSuppliesHistory: false,
    fetchingSuppliesHistoryError: false,
    suppliesHistory: [],


    addSuppliesLocationModal:false,

    addingMaterialFifoToggle: false,
    addingMaterialFifoToggleError: false,

    addDeleteFeedbackModal: false,

    deletingSuppliesData: false,
    deletingSuppliesDataError: false,


    fetchingSuppliesLocationItem:false,
    fetchingSuppliesLocationItemError:false,
    suppliesLocationItem:[],

    fetchingDeletedSuppliesHistory: false,
    fetchingDeletedSuppliesHistoryError: true,
    deleteSuppliesHistory: [],

    fetchingTaggedBrandById: false,
    fetchingTaggedBrandByIdError: false,
    taggedBrand: [],

    reInstatedSuppliesById: false,
    reInstatedSuppliesByIdError: false,

    updateMaterialImage:false,
    updateMaterialImageError:false,


    addingQualityCategory:false,
    addingQualityCategoryError:false,

    updateToCatalogue: false,
    updateToCatalogueError: false,

    addCurrencyValue: false,


    addingSuppliesBrand:false,
    addingSuppliesBrandError:false,

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

    fetchingBrandSupplies:false,
    fetchingBrandSuppliesError:false,
    brandSupplies:[],

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


    fetchingLocationSupplies:false,
    fetchingLocationSuppliesError:false,
    locationSupplies:[],

    updatingMaterialBuilder: false,
    updatingMaterialBuilderError: false,

    deletingSuppliesData: false,
    deletingSuppliesDataError: false,

    suppliersListDrwr: false,

    fetchingSupplieSupplerList: false,
    fetchingSupplieSupplerListError: false,
    supplieSupplerList: [],

    materialInveDawer: false,

    fetchingMaterialInventory: false,
    materialInventory:[],
    fetchingMaterialInventoryError: false,


    deleteSuppliesBrandData:false,
    deleteSuppliesBrandDataError:false,

    featuredMaterialToggle: false,
    featuredMaterialToggleError:false,

    fetchingMaterialCategory: false, materialCategorys:[],fetchingMaterialCategoryError: false,

    fetchingMaterialCatSrchError:true,

    uploadMaterialModal:false,

    fetchingMaterialsBySuppliesId: false,
                                  fetchingMaterialsBySuppliesIdError:false,
                                  materialsBySuppliesId:{},
                                  
                                  suppliesPUblishToggle: false,
                                      suppliesPUblishToggleError: false,

                                      materialRecommendingToggle: false,
                                        materialRecommendingToggleError:false,

                                        materialPriceType: false,
                                        materialPriceTypeError:false,   

};

export const suppliesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_SUPPLIES_VIEW_TYPE:
            return { ...state, viewType: action.payload };


            case types.HANDLE_SUPPLIES_BRAND_MODAL:
              return { ...state, addSuppliesBrandModal: action.payload };

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
          const newsupplieslist = action.payload.filter(
            (item) =>
              !state.purchaseList.some(
                (existingItem) => existingItem.suppliesId === item.suppliesId
              )
          );
            return {
                ...state,
                fetchingPurchaseList: false,
                purchaseList: [...state.purchaseList, ...newsupplieslist],
                // purchaseList: action.payload,
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


            case types.GET_SUPPLIES_LOCATION_ITEM_REQUEST:
        return { ...state, fetchingSuppliesLocationItem: true };
      case types.GET_SUPPLIES_LOCATION_ITEM_SUCCESS:
        return {
          ...state,
          fetchingSuppliesLocationItem: false,
        suppliesLocationItem: action.payload
        };
      case types.GET_SUPPLIES_LOCATION_ITEM_FAILURE:
        return {
          ...state,
          fetchingSuppliesLocationItem: false,
          fetchingSuppliesLocationItemError: true,
        };


        case types.GET_ITEM_DATA_REQUEST:
          return { ...state, fetchingItemData: true };
        case types.GET_ITEM_DATA_SUCCESS:
          return {
            ...state,
            fetchingItemData: false,
         newStepItemData: action.payload
          };
        case types.GET_ITEM_DATA_FAILURE:
          return {
            ...state,
            fetchingItemData: false,
            fetchingItemDataError: true,
          };

          case types.GET_BEST_BEFORE_REQUEST:
            return { ...state, fetchingbestBefore: true };
          case types.GET_BEST_BEFORE_SUCCESS:
            return {
              ...state,
              fetchingbestBefore: false,
           bestBeforeData: action.payload
            };
          case types.GET_BEST_BEFORE_FAILURE:
            return {
              ...state,
              fetchingbestBefore: false,
              fetchingbestBeforeError: true,
            };
  
            case types.GET_BEST_BEFORE_EMAILLIST_REQUEST:
              return { ...state, fetchingbestBeforeEmailList: true };
            case types.GET_BEST_BEFORE_EMAILLIST_SUCCESS:
              return {
                ...state,
                fetchingbestBeforeEmailList: false,
             bestBeforeEmailList: action.payload
              };
            case types.GET_BEST_BEFORE_EMAILLIST_FAILURE:
              return {
                ...state,
                fetchingbestBeforeEmailList: false,
                fetchingbestBeforeEmailListError: true,
              };


              case types.GET_NEW_ARRIVALLIST_REQUEST:
                return { ...state, fetchingNewArrivalList: true };
              case types.GET_NEW_ARRIVALLIST_SUCCESS:
                return {
                  ...state,
                  fetchingNewArrivalList: false,
               newArrivalDataList: action.payload
                };
              case types.GET_NEW_ARRIVALLIST_FAILURE:
                return {
                  ...state,
                  fetchingNewArrivalList: false,
                  fetchingNewArrivalListError: true,
                };


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


            case types.HANDLE_UPLOAD_MATERIAL_MODAL:
      return { ...state, uploadMaterialModal: action.payload };

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

            case types.DELETE_SUPPLIES_DATA_REQUEST:
              return { ...state, deletingSuppliesDocumentData: true };
          case types.DELETE_SUPPLIES_DATA_SUCCESS:
              return {
                  ...state,
                  deletingSuppliesDocumentData: false,
                  //addDeleteSuppliesModal: false,
                  documentsBySuppliesId: state.documentsBySuppliesId.filter(
                      (item) => item.documentId !== action.payload
                  ),
              };
          case types.DELETE_SUPPLIES_DATA_FAILURE:
              return {
                  ...state,
                  deletingSuppliesDocumentData: false,
                  deletingSuppliesDocumentDataError: true,
                  //addDeleteSuppliesModal: false,
              };





              case types.ADD_QUALITY_CATEGORY_REQUEST:
                return { ...state, addingQualityCategory: true };
              case types.ADD_QUALITY_CATEGORY_SUCCESS:
                return {
                  ...state, addingQualityCategory: false, 
                  materialCategorys: state.materialCategorys.map((item) => {
                    if (item.categoryId === action.payload.categoryId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                  //materialCategorys: [action.payload, ...state.materialCategorys]
                };
              case types.ADD_QUALITY_CATEGORY_FAILURE:
                return {
                  ...state,
                  addingQualityCategory: false,
                  addingQualityCategoryError: true,
                }
                  

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




            case types.GET_LOCATION_SUPPLIES_REQUEST:
              return { ...state, fetchingLocationSupplies: true };
            case types.GET_LOCATION_SUPPLIES_SUCCESS:
              return {
                ...state,
                fetchingLocationSupplies: false,
                locationSupplies: action.payload,
              };
            case types.GET_LOCATION_SUPPLIES_FAILURE:
              return {
                ...state,
                fetchingLocationSupplies: false,
                fetchingLocationSuppliesError: true,
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



            case types.UPLOAD_MATERIAL_LIST_REQUEST:
                return { ...state, uploadingMaterialList: true };
              case types.UPLOAD_MATERIAL_LIST_SUCCESS:
                return {
                  ...state,
                  uploadingMaterialList: false,
                //   uploadProductList: false
                };
              case types.UPLOAD_MATERIAL_LIST_FAILURE:
                return {
                  ...state,
                  uploadingMaterialList: false,
                  uploadingMaterialListError: true,
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


            case types.HANDLE_SUPPLIES_LOCATION_MODAL:
              return { ...state, addSuppliesLocationModal: action.payload };

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




            case types.GET_BRAND_PRODUCT_LIST_REQUEST:
      return { ...state, fetchingBrandProductList: true, fetchingBrandProductListError: false };
    case types.GET_BRAND_PRODUCT_LIST_SUCCESS:
      //const newData = action.payload.filter(item => !state.products.includes(item));
      return { ...state, fetchingBrandProductList: false, 
        // products: [
        // ...state.products,
        // ...action.payload] };
        brandProductListData: action.payload
      }
    case types.GET_BRAND_PRODUCT_LIST_FAILURE:
      return { ...state, fetchingBrandProductList: false, fetchingBrandProductError: true };




      case types.DELETE_SUPPLIES_BRAND_DATA_REQUEST:
        return { ...state, deleteSuppliesBrandData: true };
      case types.DELETE_SUPPLIES_BRAND_DATA_SUCCESS:
        return {
          ...state,
          deleteSuppliesBrandData: false,
          brandSupplies: state.brandSupplies.filter(
            (item) => item.suppliesBrandId !== action.payload
          ),
        };
      case types.DELETE_SUPPLIES_BRAND_DATA_FAILURE:
        return {
          ...state,
          deleteSuppliesBrandData: false,
          deleteSuppliesBrandDataError: false,
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


                case types.HANDLE_LOCATION_SUPPLIES_MODAL:
                  return { ...state, locationSuppliesModal: action.payload };
                case types.HANDLE_UPLOAD_SUPPLIES_MODAL:
                  return { ...state, uploadSuppliesList: action.payload };



                  case types.UPDATE_MATERIAL_IMAGE_REQUEST:
                    return { ...state, updateMaterialImage: true };
                  case types.UPDATE_MATERIAL_IMAGE_SUCCESS:
                    return {
                      ...state,
                      updateMaterialImage: false,
                      //updatePartnerModal: false,
                      // partnerByUserId: state.partnerByUserId.map((item) => {
                      //   if (item.partnerId === action.payload.partnerId) {
                      //     return action.payload;
                      //   } else {
                      //     return item;
                      //   }
                      // }),
                    };
                  case types.UPDATE_MATERIAL_IMAGE_FAILURE:
                    return {
                      ...state,
                      updateMaterialImage: false,
                      updateMaterialImageError: true,
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



                    case types.ADD_LOCATION_SUPPLIES_VALUE_REQUEST:
                      return { ...state, addingLocationSuppliesValue: true };
                    case types.ADD_LOCATION_SUPPLIES_VALUE_SUCCESS:
                      return {
                        ...state,
                        addingLocationSuppliesValue: false,
                        // regiondata:action.payload,
                        //regions:[action.payload,...state.regions],
                        // documents: [...state.documents, action.payload],
                      };
                    case types.ADD_LOCATION_SUPPLIES_VALUE_FAILURE:
                      return { ...state, addingLocationSuppliesValue: false, addingLocationSuppliesValueError: true };
                  
                    case types.HANDLE_CLAER_REDUCER_DATA_MATERIAL:
                        return {
                          ...state,
                          purchaseList: [],
                          materialCategorys:[],
                          // deletedTruck: []
                        };   
                        case types.HANDLE_MATERIAL_INVENTORY:
                            return { ...state, materialInveDawer: action.payload };

                            case types.GET_MATERIAL_INVENTORY_REQUEST:
                                return { ...state, fetchingMaterialInventory: true };
                              case types.GET_MATERIAL_INVENTORY_SUCCESS:
                                return {
                                  ...state,
                                  fetchingMaterialInventory: false,
                                  materialInventory: action.payload,
                               
                                };
                              case types.GET_MATERIAL_INVENTORY_FAILURE:
                                return { ...state, fetchingMaterialInventoryError: true };
                              
                                case types.HANDLE_PRICE_MODAL:
                                    return { ...state, priceOpenModal: action.payload };



       case types.CREATE_MATERIAL_CURRENCY_REQUEST:
      return { ...state, creatingMaterialCurrency: true };
    case types.CREATE_MATERIAL_CURRENCY_SUCCESS:
      return {
        ...state,
        creatingMaterialCurrency: false,
        materialCurrency: [action.payload, ...state.materialCurrency]
      };
    case types.CREATE_MATERIAL_CURRENCY_FAILURE:
      return {
        ...state,
        creatingMaterialCurrency: false,
        creatingMaterialCurrencyError: true,
      };

      case types.GET_MATERIAL_CURRENCY_REQUEST:
      return {
        ...state,
        fetchingMaterialCurrency: true,
      };
    case types.GET_MATERIAL_CURRENCY_SUCCESS:
      return {
        ...state,
        fetchingMaterialCurrency: false,
        materialCurrency: action.payload,
      };
    case types.GET_MATERIAL_CURRENCY_FAILURE:
      return {
        ...state,
        fetchingMaterialCurrency: false,
        fetchingMaterialCurrencyError: true,
      };
          
      case types.CREATE_MATERIAL_DISCOUNT_REQUEST:
        return { ...state, creatingMaterialDiscount: true };
      case types.CREATE_MATERIAL_DISCOUNT_SUCCESS:
        return {
          ...state,
          creatingMaterialDiscount: false,
          materialDiscount: [action.payload, ...state.materialDiscount]
        };
      case types.CREATE_MATERIAL_DISCOUNT_FAILURE:
        return {
          ...state,
          creatingMaterialDiscount: false,
          creatingMaterialDiscountError: true,
        };



        case types.GET_BRAND_SUPPLIES_REQUEST:
      return { ...state, fetchingBrandSupplies: true, fetchingBrandProduct: false };
    case types.GET_BRAND_SUPPLIES_SUCCESS:
      //const newData = action.payload.filter(item => !state.products.includes(item));
      return { ...state, fetchingBrandSupplies: false, 
        // products: [
        // ...state.products,
        // ...action.payload] };
        brandSupplies: action.payload
      }
    case types.GET_BRAND_SUPPLIES_FAILURE:
      return { ...state, fetchingBrandSupplies: false, fetchingBrandSuppliesError: true };
  
        case types.GET_MATERIAL_DISCOUNT_REQUEST:
        return {
          ...state,
          fetchingMaterialDiscount: true,
        };
      case types.GET_MATERIAL_DISCOUNT_SUCCESS:
        return {
          ...state,
          fetchingMaterialDiscount: false,
          materialDiscount: action.payload,
        };
      case types.GET_MATERIAL_DISCOUNT_FAILURE:
        return {
          ...state,
          fetchingMaterialDiscount: false,
          fetchingMaterialDiscountError: true,
        };

        case types.CREATE_MATERIAL_DISCOUNTB2C_REQUEST:
            return { ...state, creatingMaterialDiscountB2C: true };
          case types.CREATE_MATERIAL_DISCOUNTB2C_SUCCESS:
            return {
              ...state,
              creatingMaterialDiscountB2C: false,
              materialDiscountB2C: [action.payload, ...state.materialDiscountB2C]
            };
          case types.CREATE_MATERIAL_DISCOUNTB2C_FAILURE:
            return {
              ...state,
              creatingMaterialDiscountB2C: false,
              creatingMaterialDiscountB2CError: true,
            };
      
            case types.GET_MATERIAL_DISCOUNTB2C_REQUEST:
            return {
              ...state,
              fetchingMaterialDiscountB2C: true,
            };
          case types.GET_MATERIAL_DISCOUNTB2C_SUCCESS:
            return {
              ...state,
              fetchingMaterialDiscountB2C: false,
              materialDiscountB2C: action.payload,
            };
          case types.GET_MATERIAL_DISCOUNTB2C_FAILURE:
            return {
              ...state,
              fetchingMaterialDiscountB2C: false,
              fetchingMaterialDiscountB2CError: true,
            };

            case types.FEATURED_MATERIAL_TOGGLE_REQUEST:
                return { ...state, featuredMaterialToggle: true };
              case types.FEATURED_MATERIAL_TOGGLE_SUCCESS:
                return {
                  ...state,
                  featuredMaterialToggle: false,
                  purchaseList: state.purchaseList.map((item) => {
                    if (item.suppliesId === action.payload.suppliesId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.FEATURED_MATERIAL_TOGGLE_FAILURE:
                return {
                  ...state,
                  featuredMaterialToggle: false,
                  featuredMaterialToggleError: true,
                };

                case types.GET_MATERIAL_CATEGORY_REQUEST:
                    return { ...state, fetchingMaterialCategory: true, fetchingMaterialCategoryError: false };
                  case types.GET_MATERIAL_CATEGORY_SUCCESS:
                    return { ...state, fetchingMaterialCategory: false, materialCategorys: action.payload };
                  case types.GET_MATERIAL_CATEGORY_FAILURE:
                    return { ...state, fetchingMaterialCategory: false, fetchingMaterialCategoryError: true };
              
                    case types.ADD_MATERIAL_CATEGORY_REQUEST:
                        return { ...state, addingMaterialCategory: true };
                      case types.ADD_MATERIAL_CATEGORY_SUCCESS:
                        return {
                          ...state, addingMaterialCategory: false, 
                          materialCategorys: [action.payload, ...state.materialCategorys]
                        };
                      case types.ADD_MATERIAL_CATEGORY_FAILURE:
                        return {
                          ...state,
                          addingMaterialCategory: false,
                          addingMaterialCategoryError: true,
                          
                        };

                        case types.MATERIAL_CATEGORY_SEARCH_REQUEST:
                            return { ...state, fetchingMaterialCatSrch: true };
                          case types.MATERIAL_CATEGORY_SEARCH_SUCCESS:
                            return {
                              ...state,
                              fetchingMaterialCatSrch: false,
                              materialCategorys: action.payload,
                           
                            };
                          case types.MATERIAL_CATEGORY_SEARCH_FAILURE:
                            return { ...state, fetchingMaterialCatSrchError: true };   
                            
                            
                            case types.GET_MATERIALS_BY_SUPPLIES_ID_REQUEST:
                                return {
                                  ...state,
                                  fetchingMaterialsBySuppliesId: true,
                                  fetchingMaterialsBySuppliesIdError: false,
                                };
                              case types.GET_MATERIALS_BY_SUPPLIES_ID_SUCCESS:
                                return {
                                  ...state,
                                  fetchingMaterialsBySuppliesId: false,
                                  materialsBySuppliesId: action.payload,
                                };
                              case types.GET_MATERIALS_BY_SUPPLIES_ID_FAILURE:
                                return {
                                  ...state,
                                  fetchingMaterialsBySuppliesId: false,
                                  fetchingMaterialsBySuppliesIdError: true,
                                };                                      

                                case types.GET_COMPLEMENTARY_LIST_REQUEST:
                                return {
                                  ...state,
                                  fetchingComplementaryList: true,
                                  fetchingComplementaryListError: false,
                                };
                              case types.GET_COMPLEMENTARY_LIST_SUCCESS:
                                return {
                                  ...state,
                                  fetchingComplementaryList: false,
                                  complementaryList: action.payload,
                                };
                              case types.GET_COMPLEMENTARY_LIST_FAILURE:
                                return {
                                  ...state,
                                  fetchingComplementaryList: false,
                                  fetchingComplementaryListError: true,
                                };

                                case types.SUPPLIES_PUNBLISH_TOGGLE_REQUEST:
                                    return { ...state, suppliesPUblishToggle: true };
                                  case types.SUPPLIES_PUNBLISH_TOGGLE_SUCCESS:
                                    return {
                                      ...state,
                                      suppliesPUblishToggle: false,
                                      materialCategorys: state.materialCategorys.map((item) => {
                                        if (item.categoryId === action.payload.categoryId) {
                                          return action.payload;
                                        } else {
                                          return item;
                                        }
                                      }),
                                    };
                                  case types.SUPPLIES_PUNBLISH_TOGGLE_FAILURE:
                                    return {
                                      ...state,
                                      suppliesPUblishToggle: false,
                                      suppliesPUblishToggleError: true,
                                    };

                                    case types.MATERIAL_RECOMMEND_TOGGLE_REQUEST:
                                      return { ...state, materialRecommendingToggle: true };
                                    case types.MATERIAL_RECOMMEND_TOGGLE_SUCCESS:
                                      return {
                                        ...state,
                                        materialRecommendingToggle: false,
                                        purchaseList: state.purchaseList.map((item) => {
                                          if (item.suppliesId === action.payload.suppliesId) {
                                            return action.payload;
                                          } else {
                                            return item;
                                          }
                                        }),
                                      };
                                    case types.MATERIAL_RECOMMEND_TOGGLE_FAILURE:
                                      return {
                                        ...state,
                                        materialRecommendingToggle: false,
                                        materialRecommendingToggleError: true,
                                      };
                                      case types.MATERIAL_PRICE_TYPE_REQUEST:
                                        return { ...state, materialPriceType: true };
                                      case types.MATERIAL_PRICE_TYPE_SUCCESS:
                                        return {
                                          ...state,
                                          materialPriceType: false,
                                          materialCurrency: state.materialCurrency.map((item) => {
                                            if (item.id === action.payload.id) {
                                              return action.payload;
                                            } else {
                                              return item;
                                            }
                                          }),
                                        };
                                      case types.MATERIAL_PRICE_TYPE_FAILURE:
                                        return {
                                          ...state,
                                          materialPriceType: false,
                                          materialPriceTypeError: true,
                                        };

                                        case types.MATERIAL_COMPLEMENTARY_REQUEST:
                                          return { ...state, materialCpmplementary: true };
                                        case types.MATERIAL_COMPLEMENTARY_SUCCESS:
                                          return {
                                            ...state,
                                            materialCpmplementary: false,
                                            complementaryList: state.complementaryList.map((item) => {
                                              if (item.suppliesId === action.payload.suppliesId) {
                                                return action.payload;
                                              } else {
                                                return item;
                                              }
                                            }),
                                          };
                                        case types.MATERIAL_COMPLEMENTARY_FAILURE:
                                          return {
                                            ...state,
                                            materialCpmplementary: false,
                                            materialCpmplementaryError: true,
                                          };




                                          case types.ADD_SUPPLIES_BRAND_REQUEST:
      return { ...state, addingSuppliesBrand: true };
    case types.ADD_SUPPLIES_BRAND_SUCCESS:
      return {
        ...state, addingSuppliesBrand: false, 
        // addConfigureModal: false,
        brandSupplies: [action.payload, ...state.brandSupplies]
      };
    case types.ADD_SUPPLIES_BRAND_FAILURE:
      return {
        ...state,
        addingSuppliesBrand: false,
        addingSuppliesBrandError: true,
        // addConfigureModal: false,
      };




      case types.UPDATE_BRAND_MATERIAL_REQUEST:
        return { ...state, updatingBrandMaterial: true };
      case types.UPDATE_BRAND_MATERIAL_SUCCESS:
        // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
        return {
          ...state,
          updatingBrandMaterial: false,
          brandSupplies: state.brandSupplies.map((document) =>
            document.brand === action.payload.brand
              ? action.payload
              : document
          ),
        };
      case types.UPDATE_BRAND_MATERIAL_FAILURE:
        return {
          ...state,
          updatingBrandMaterial: false,
          updatingBrandMaterialError: true,
        };

        case types.GET_SUPPLIES_DOCUMENTS_REQUEST:
          return {
            ...state,
            fetchingDocumentsBySupplies: true,
                   };
        case types.GET_SUPPLIES_DOCUMENTS_SUCCESS:
          return {
            ...state,
            fetchingDocumentsBySupplies: false,
            documentsBySuppliesId: action.payload,
          };
        case types.GET_SUPPLIES_DOCUMENTS_FAILURE:
          return {
            ...state,
            fetchingDocumentsBySupplies: false,
            fetchingDocumentsBySuppliesError: true,
          };

        case types.HANDLE_IMAGE_SUPPLIES_MODAL:
          return { ...state, uploadImageListSupplies: action.payload };

          case types.HANDLE_NEWARRIVAL_MODAL:
            return { ...state, newArivalmodal: action.payload };

            case types.HANDLE_BESTBEFORE_MODAL:
              return { ...state, bestBeforemodal: action.payload };
  
          case types.HANDLE_ERP_DOCUMENT_UPLOAD_MODAL:
            return { ...state, erpDocumentUploadModal: action.payload };

            case types.DELETE_EMAILLIST_REQUEST:
              return { ...state, deletingEmailList: true };
          case types.DELETE_EMAILLIST_SUCCESS:
              return {
                  ...state,
                  deletingEmailList: false,
                  bestBeforeEmailList: state.bestBeforeEmailList.filter(
                      (item) => item.orgId !== action.payload
                  ),
              };
          case types.DELETE_EMAILLIST_FAILURE:
              return {
                  ...state,
                  deletingEmailList: false,
                  deletingEmailListError: true,
              };
  
              case types.DELETE_NEWARRIVAL_REQUEST:
                return { ...state, deletingNewArrival: true };
            case types.DELETE_NEWARRIVAL_SUCCESS:
                return {
                    ...state,
                    deletingNewArrival: false,
                    newArrivalDataList: state.newArrivalDataList.filter(
                        (item) => item.orgId !== action.payload
                    ),
                };
            case types.DELETE_NEWARRIVAL_FAILURE:
                return {
                    ...state,
                    deletingNewArrival: false,
                    deletingNewArrivalError: true,
                };
    


        default:
            return state;
    }
};