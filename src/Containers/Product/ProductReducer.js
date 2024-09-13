import * as types from "./ProductActionTypes";
import dayjs from "dayjs";
const initialState = {
  addWeightedModal: false,
  addAbsoluteModal: false,
  addWinModal: false,
  addWonModal: false,
  addCustomerModal: false,


  fetchingProductBrandDetails:false,
  fetchingProductBrandDetailsError:false,
  productBrandDetails:[],


  fetchingQualityProducts:false,
  fetchingQualityProductsError:false,

  qualityProducts:[],
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
  viewType: "grid",
  addProductModal: false,
  addServiceModal: false,
  addConfigureModal: false,
  addDetailsProductModal: false,


  fetchingProductionSpareData:false,
  fetchingProductionSpareDataError:false,
  productionSpareData:[],

  addingProductCategory: false,
  addingProductCategoryError: false,

  addingService: false,
  addingServiceError: false,

  fetchingdeleteProducts: false,
  fetchingdeleteProductsError: false,
  deleteproducts:[],


  aadingDragQuality:false,
  aadingDragQualityError:false,

  addDrawerProductNotesModal:false,

  fetchingLatestProductsByOrganizationId: false,
  fetchingLatestProductsByOrganizationIdError: false,
  latestProductsByOrganizationId: [],

  fetchingProducts: false,
  fetchingProductsError: false,
  products: [],

  fetchingCategory:false,
  fetchingCategoryError:false,
  categoryProducts:[],

  fetchingAllProducts: false,
  fetchingAllProductsError: false,
  allproducts: [
//     {
//       "id": "PCD7617397754982024",
//       "categoryName": "Phulka",
//       "imageId": null
//   },
//   {
//       "id": "PCD7856330229422024",
//       "categoryName": "king",
//       "imageId": null
//   },
//   {
//       "id": "PCD793500819122024",
//       "categoryName": "Dry Powder",
//       "imageId": null
//   },
//   {
//       "id": "PCD8213713670282024",
//       "categoryName": "iPad ",
//       "imageId": null
//   },
// {
//       "id": "PCD6068749460382024",
//       "categoryName": "Dough",
//       "imageId": null
//   },
//   {
//       "id": "PCD9509139668222024",
//       "categoryName": "Fruits",
//       "imageId": null
//   },
  ],

  fetchingProductsById: false,
  fetchingProductsByIdError: false,
  productsById: {},

  fetchingService: false,
  fetchingServiceError: false,
  services: [],

  uploadingCatalogueList: false,
  uploadingCatalogueListError: false,

  fetchingServiceById: false,
  fetchingServiceByIdError: false,
  serviceById: {},


  updateProductQuality:false,
  updateProductQualityError:false,

  uploadProductList: false,

  uploadingProductList: false,
  uploadingProductListError: false,

  updateServiceById: false,
  updateServiceByIdError: false,



  fetchingBrandCatalogueList:false,
  fetchingBrandCatalogueListError:false,
  brandCatalogueListData:[],

  fetchingProductsDesc:false,
  fetchingProductsDescError:false,
  productsDesc:[],

  updateProductById: false,
  updateProductByIdError: false,

  isCustomSelected: false,

  setEditingProducts: {},

  updateProductModal: false,

  categoryProductModal:false,


  addProductBrandModal:false,

  addDiscountModal: false,

  addHistoryModal: false,
  addProductConfigureModal: false,

  fetchingDiscountHistory: false,
  fetchingDiscountHistoryError: false,
  discountHistory: [],

  fetchingProductHsn: false,
  fetchingProductHsnError: false,
  productHsn:[],

  fetchingDeletedProductRecords: false,
  fetchingDeletedProductRecordsError: false,
  deletedProductCount:{},

  addingDiscount: false,
  addingDiscountError: false,

  fetchingProductHistory: false,
  fetchingProductHistoryError: false,
  productsHistory: [],


  addingBrandProductList:false,
  addingBrandProductListError:false,

  deletingProductData: false,
  deletingProductDataError: false,

  deletingCatalogData: false,
  deletingCatalogDataError: false,

  fetchingSuspendProducts: false,
  fetchingSuspendProductsError: false,
  suspendProducts: [],
  //configure
  addCatalogueConfigureModal: false,
  addingCatalogueConfigure: false,
  addingCatalogueConfigureError: false,
  //get
  fetchingCatalogueConfigure: false,
  fetchingCatalogueConfigureError: false,
  catalogueConfigure: [],
  viewType: "table",

  addingDiscountDistributor: false,
  addingDiscountDistributorError: false,

  fetchingDistributorDiscountHistory: false,
  fetchingDistributorDiscountHistoryError: false,
  distributorDiscount: [],

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  productQualityDrawer:false,

  fetchingBrandProduct:false,
  fetchingBrandProductError:false,
  brandProduct:[],

  addProductOfferModal: false,

  addingOffer: false,
  addingOfferError: false,

  addingDistributorOffer: false,
  addingDistributorOfferError: false,

  fetchingCustomerOfferHistory: false,
  fetchingCustomerOfferHistoryError: false,
  customerOfferHistory: [],


  fetchingBrandDeleteProduct:false,
  fetchingBrandDeleteProductError:false,
  brandDeleteProduct:[],

  fetchingDistributorOfferHistory: false,
  fetchingDistributorOfferHistoryError: false,
  distributorOfferHistory: [],

  clearbitProduct: {},

  clearbitProductDistributor: {},



  deleteQualityProductData:false,
  deleteQualityProductDataError:false,

  updateCustomerOfferModal: false,

  setEditingCustomerOffer: {},

  updateDistributorOfferModal: false,

  setEditingDistributorOffer: {},

  addingProductBrand:false,
  addingProductBrandError:false,

  updateCustomerOfferById: false,
  updateCustomerOfferByIdError: false,

  updateDistributorOfferById: false,
  updateDistributorOfferByIdError: false,

  //Wip
  addCatalogueWipModal: false,
  //CategoryImage
  addCategoryImageModal: false,

  addingCategoryImage: false,
  addingCategoryImageError: false,

  fetchingCategoryImage: false,
  fetchingCategoryImageError: false,
  CategoryImage: [],

  publishingProductToggle: false,
  publishingProductToggleError: false,

  fetchingProductByGroup: false,
  fetchingProductByGroupError: false,
  productByGroup: [],

  updateMaterialById: false,
  updateMaterialByIdError: true,

  addingProduct: false,
  addingProductError: false,

  addingCategory: false,
  addingCategoryError: false,

  proBuilderDrawer: false,

  fetchingProductBuilder: false,
  fetchingProductBuilderError: false,
  productBuilder: [],


  movingProductQuality:false,
  movingProductQualityError:false,


  creatingQualityProduct:false,
  creatingQualityProductError:false,

  addingProductBuilder: false,
  addingProductBuilderError: false,
  addedProBuilder: [],


  addingProductDesc:false,
  addingProductDescError:false,

  fetchingBuilderByProductId: false,
  fetchingBuilderByProductIdError: false,
  builderbyProductId: [],

  priceOpenDrawer: false,

  removingProductBuilder: false,
  removingProductBuilderError: false,

  fetchingProductCurrency: false,
  fetchingProductCurrencyError: false,
  ProductCurrency: [],

  deleteProductBrandData:false,
  deleteProductBrandDataError:false,

  creatingProductCurrency: false,
  creatingProductCurrencyError: false,

  fetchingSearchedBuilders: false,
  fetchingSearchedBuildersError: false,
  searchedBuilders: [],

  fetchingAllProducts: false,
  fetchingAllProductsError: false,
  productAlls: [],

  postingProductionBldr: false,
  postingProductionBldrError: false,

  clickProdclDrwr:false,
  removingProductPrice: false,
  removingProductPriceError:false,

  reInstatingProducts: false,
  reInstatingProductsError:false,

  fetchingNotesofProducts: false, 
  fetchingNotesofProductsError:false,
  notesofPRoducts:[],

  addingNotesOfProducts: false,
  addingNotesOfProductsError: false,

  updatingNotesOfProducts: false,
  updatingNotesOfProductsError:false,
  removingNotesOfProducts: false,
  removingNotesOfProductsError:false,

  fetchingCatalogueCatSrch: false,
  fetchingCatalogueCatSrchError: false,

  fetchingProductsByProductId: false,
  fetchingProductsByProductIdError: false,
  productsByproductId: {},


  updatingBrandProduct:false,
  updatingBrandProductError:false,

  productPUblishToggle: false,
  productPUblishToggleError:false,

  warrentyProductToggle: false,
  warrentyProductToggleError:false,

  updateDateYearProduct: false,
  updateDateYearProductError:false,
  
};
const newDateRange = (dateRange, newDate) =>
  dateRange.map((range) => {
    if (range.id === newDate.id) {
      return { ...range, isSelected: true };
    } else {
      return { ...range, isSelected: false };
    }
  });
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_BY_ID_REQUEST:
      return {
        ...state,
        fetchingProductsById: true,
        fetchingProductsByIdError: false,
      };
    case types.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingProductsById: false,
        productsById: action.payload,
      };
    case types.GET_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        fetchingProductsById: false,
        fetchingProductsByIdError: true,
      };

    case types.GET_SERVICE_BY_ID_REQUEST:
      return {
        ...state,
        fetchingServiceById: true,
        fetchingServiceByIdError: false,
      };
    case types.GET_SERVICE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingServiceById: false,
        serviceById: action.payload,
      };
    case types.GET_SERVICE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingServiceById: false,
        fetchingServiceByIdError: true,
      };

    /**
     * update a single contact by its ID
     */
    case types.UPDATE_SERVICE_BY_ID_REQUEST:
      return { ...state, updateServiceById: true };
    case types.UPDATE_SERVICE_BY_ID_SUCCESS:
      return {
        ...state,
        updateServiceById: false,
        serviceById: action.payload,
      };
    case types.UPDATE_SERVICE_BY_ID_FAILURE:
      return {
        ...state,
        updateServiceById: false,
        updateServiceByIdError: true,
      };




      case types.ADD_BRAND_PRODUCT_LIST_REQUEST:
        return { ...state, addingBrandProductList: true };
      case types.ADD_BRAND_PRODUCT_LIST_SUCCESS:
        // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
        return {
          ...state,
          addingBrandProductList: false,
          // brandProduct: state.brandProduct.map((document) =>
          //   document.brand === action.payload.brand
          //     ? action.payload
          //     : document
          // ),
        };
      case types.ADD_BRAND_PRODUCT_LIST_FAILURE:
        return {
          ...state,
          addingBrandProductList: false,
          addingBrandProductListError: true,
        };



      case types.EMPTY_PRODUCT_LIST:
        return { ...state, products: [] };

    case types.UPDATE_PRODUCT_BY_ID_REQUEST:
      return { ...state, updateProductById: true };
    case types.UPDATE_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        updateProductById: false,
        updateProductModal: false,
        products: state.products.map((item) => {
          if (item.productId == action.payload.productId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        productByGroup: state.productByGroup.map((item) => {
          if (item.productId == action.payload.productId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PRODUCT_BY_ID_FAILURE:
      return {
        ...state,
        updateProductById: false,
        updateProductByIdError: true,
      };


      case types.HANDLE_PRODUCT_QUALITY_DRAWER:
                  return { ...state, productQualityDrawer: action.payload };

    case types.GET_PROFESSIONALDUCTS_REQUEST:
      return { ...state, fetchingProducts: true, fetchingProductsError: false };
    case types.GET_PROFESSIONALDUCTS_SUCCESS:
      //const newData = action.payload.filter(item => !state.products.includes(item));
      return { ...state, fetchingProducts: false, 
        // products: [
        // ...state.products,
        // ...action.payload] };
        products: action.payload
      }
    case types.GET_PROFESSIONALDUCTS_FAILURE:
      return { ...state, fetchingProducts: false, fetchingProductsError: true };



      case types.DELETE_QUALITY_PRODUCT_DATA_REQUEST:
        return { ...state, deleteQualityProductData: true };
      case types.DELETE_QUALITY_PRODUCT_DATA_SUCCESS:
        return {
          ...state,
          deleteQualityProductData: false,
          qualityProducts: state.qualityProducts.filter(
            (item) => item.qualityCheckBuilderId !== action.payload
          ),
        };
      case types.DELETE_QUALITY_PRODUCT_DATA_FAILURE:
        return {
          ...state,
          deleteQualityProductData: false,
          deleteQualityProductDataError: false,
        };





        case types.UPDATE_QUALITY_PRODUCT_REQUEST:
          return { ...state, updateProductQuality: true };
        case types.UPDATE_QUALITY_PRODUCT_SUCCESS:
          return {
            ...state,
            updateProductQuality: false,
            //qualityProducts:[action.payload,...state.qualityProducts]
            qualityProducts: state.qualityProducts.map((item) => {
              if (item.qualityCheckBuilderId === action.payload.qualityCheckBuilderId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
        case types.UPDATE_QUALITY_PRODUCT_FAILURE:
          return {
            ...state,
            updateProductQuality: false,
            updateProductQualityError: true,
  
          };


      case types.ADD_DRAG_QUALITY_REQUEST:
        return { ...state, aadingDragQuality: true };
      case types.ADD_DRAG_QUALITY_SUCCESS:
        return {
          ...state,
          aadingDragQuality: false,
          //qualityProducts:[action.payload,...state.qualityProducts]

        };
      case types.ADD_DRAG_QUALITY_FAILURE:
        return {
          ...state,
          aadingDragQuality: false,
          aadingDragQualityError: true,

        };


      case types.GET_DELETEPRODUCTS_REQUEST:
      return { ...state, fetchingdeleteProducts: true, fetchingdeleteProductsError: false };
    case types.GET_DELETEPRODUCTS_SUCCESS:
      return { ...state, fetchingdeleteProducts: false, deleteproducts: action.payload };
    case types.GET_DELETEPRODUCTS_FAILURE:
      return { ...state, 
        fetchingdeleteProducts: false,
         fetchingdeleteProductsError: true };





         case types.GET_PRODUCTION_SPARE_DATA_REQUEST:
          return { ...state, fetchingProductionSpareData: true };
        case types.GET_PRODUCTION_SPARE_DATA_SUCCESS:
          return {
            ...state,
            fetchingProductionSpareData: false,
            // productionSpareData: action.payload
            productionSpareData: [
              ...state.productionSpareData,
              ...action.payload] 
          };
        case types.GET_PRODUCTION_SPARE_DATA_FAILURE:
          return {
            ...state,
            fetchingProductionSpareData: false,
            fetchingProductionSpareDataError: true,
          };

      case types.GET_CATEGORY_REQUEST:
      return { ...state, fetchingCategory: true, fetchingCategoryError: false };
    case types.GET_CATEGORY_SUCCESS:
      return { ...state, fetchingCategory: false, categoryProducts: action.payload };
    case types.GET_CATEGORY_FAILURE:
      return { ...state, fetchingCategory: false, fetchingCategoryError: true };

    case types.GET_SERVICE_REQUEST:
      return { ...state, fetchingService: true, fetchingServiceError: false };
    case types.GET_SERVICE_SUCCESS:
      return { ...state, fetchingService: false, services: action.payload };
    case types.GET_SERVICE_FAILURE:
      return { ...state, fetchingService: false, fetchingServiceError: true };


    case types.ADD_SERVICE_REQUEST:
      return { ...state, addingService: true, addingServiceError: false };
    case types.ADD_SERVICE_SUCCESS:
      return { ...state, addingService: false, addConfigureModal: false };
    case types.ADD_SERVICE_FAILURE:
      return {
        ...state,
        addingService: false,
        addingServiceError: true,
        addConfigureModal: false,
      };


      case types.ADD_PRODUCT_DESC_REQUEST:
        return { ...state, addingProductDesc: true };
      case types.ADD_PRODUCT_DESC_SUCCESS:
        return {
          ...state, addingProductDesc: false, 
          // addConfigureModal: false,
          productsDesc: [action.payload, ...state.productsDesc]
        };
      case types.ADD_PRODUCT_DESC_FAILURE:
        return {
          ...state,
          addingProductDesc: false,
          addingProductDescError:false,
          // addingProductDesc: true,
          // addConfigureModal: false,
        };

    case types.GET_LATEST_PRODUCTS_BY_ORGANIZATION_ID_REQUEST:
      return { ...state, fetchingLatestProductsByOrganizationId: true };
    case types.GET_LATEST_PRODUCTS_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        fetchingLatestProductsByOrganizationId: false,
        latestProductsByOrganizationId: action.payload,
      };
    case types.GET_LATEST_PRODUCTS_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        fetchingLatestProductsByOrganizationId: false,
        fetchingLatestProductsByOrganizationIdError: true,
      };

    case types.HANDLE_PROFESSIONALDUCT_MODAL:
      return { ...state, addProductModal: action.payload };
    case types.HANDLE_SERVICE_MODAL:
      return { ...state, addServiceModal: action.payload };
    case types.HANDLE_CONFIGURE_MODAL:
      return { ...state, addConfigureModal: action.payload };
    case types.HANDLE_DETAILSFORM_MODAL:
      return { ...state, addDetailsProductModal: action.payload };

    case types.SET_PROFESSIONALDUCT_VIEW_TYPE:
      return { ...state, viewType: action.payload };
    case types.CHANGE_SELECTED_TIME_INTERVAL_CATALOGUE:
      return {
        ...state,
        dateRangeList: newDateRange(state.dateRangeList, action.payload),
        isCustomSelected: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        timeRangeType: action.payload.type,
      };
    case types.SET_TIME_INTERVAL_CATALOGUE:
      return {
        ...state,
        isCustomSelected: true,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    case types.HANDLE_WEIGHTED_MODAL:
      return { ...state, addWeightedModal: action.payload };

    case types.HANDLE_WIN_MODAL:
      return { ...state, addWinModal: action.payload };

    case types.HANDLE_WON_MODAL:
      return { ...state, addWonModal: action.payload };

    case types.HANDLE_CUSTOMER_MODAL:
      return { ...state, addCustomerModal: action.payload };

    case types.HANDLE_ABSOLUTE_MODAL:
      return { ...state, addAbsoluteModal: action.payload };

    case types.SET_EDIT_PRODUCTS:
      return { ...state, setEditingProducts: action.payload };

    /**
     * update product modal
     */
    case types.HANDLE_UPDATE_PRODUCT_MODAL:
      return { ...state, updateProductModal: action.payload };

      case types.HANDLE_CATEGORY_MODAL:
      return { ...state, categoryProductModal: action.payload };

    case types.HANDLE_DISCOUNT_BUTTON_MODAL:
      return { ...state, addDiscountModal: action.payload };

    /**
     * get the discount history of product
     */
    case types.GET_DISCOUNT_HISTORY_REQUEST:
      return { ...state, fetchingDiscountHistory: true };
    case types.GET_DISCOUNT_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingDiscountHistory: false,
        discountHistory: action.payload,
      };
    case types.GET_DISCOUNT_HISTORY_FAILURE:
      return {
        ...state,
        fetchingDiscountHistory: false,
        fetchingDiscountHistoryError: true,
      };

    case types.ADD_DISCOUNT_REQUEST:
      return { ...state, addingDiscount: true, addingDiscountError: false };
    case types.ADD_DISCOUNT_SUCCESS:
      return { ...state, addingDiscount: false, addDiscountModal: false };
    case types.ADD_DISCOUNT_FAILURE:
      return {
        ...state,
        addingDiscount: false,
        addingDiscountError: true,
        addDiscountModal: false,
      };

    case types.HANDLE_PRODUCT_HISTORY_MODAL:
      return { ...state, addHistoryModal: action.payload };

    case types.GET_PRODUCT_HISTORY_REQUEST:
      return { ...state, fetchingProductHistory: true };
    case types.GET_PRODUCT_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingProductHistory: false,
        productsHistory: action.payload,
      };
    case types.GET_PRODUCT_HISTORY_FAILURE:
      return {
        ...state,
        fetchingProductHistory: false,
        fetchingProductHistoryError: true,
      };

    //suspend
    case types.SUSPEND_PRODUCT_REQUEST:
      return { ...state, suspendedProduct: true };
    case types.SUSPEND_PRODUCT_SUCCESS:
      return {
        ...state,
        suspendedProduct: false,
      };
    case types.SUSPEND_PRODUCT_FAILURE:
      return {
        ...state,
        suspendedProduct: false,
        suspendedProductError: true,
      };

    case types.DELETE_PRODUCT_DATA_REQUEST:
      return { ...state, deletingProductData: true };
    case types.DELETE_PRODUCT_DATA_SUCCESS:
      return {
        ...state,
        deletingProductData: false,
        products: state.products.filter(
          (item) => item.productId !== action.payload
        ),
      };
    case types.DELETE_PRODUCT_DATA_FAILURE:
      return {
        ...state,
        deletingProductData: false,
        deletingProductDataError: true,
      };

      case types.DELETE_CATALOG_DATA_REQUEST:
        return { ...state, deletingCatalogData: true };
      case types.DELETE_CATALOG_DATA_SUCCESS:
        return {
          ...state,
          deletingCatalogData: false,
          products: state.products.filter((item) => item.productId !== action.payload),
          deleteproducts: state.deleteproducts.filter((item) => item.productId !== action.payload),
        };
      case types.DELETE_CATALOG_DATA_FAILURE:
        return {
          ...state,
          deletingCatalogData: false,
          deletingCatalogDataError: true,
        };

    case types.GET_SUSPEND_PRODUCT_REQUEST:
      return {
        ...state,
        fetchingSuspendProducts: true,
        fetchingSuspendProductsError: false,
      };
    case types.GET_SUSPEND_PRODUCT_SUCCESS:
      return {
        ...state,
        fetchingSuspendProducts: false,
        suspendProducts: action.payload,
      };
    case types.GET_SUSPEND_PRODUCT_FAILURE:
      return {
        ...state,
        fetchingSuspendProducts: false,
        fetchingSuspendProductsError: true,
      };

    case types.HANDLE_CATALOGUE_CONFIGURE_MODAL:
      return { ...state, addCatalogueConfigureModal: action.payload };
    //add configure
    case types.ADD_CATALOGUE_CONFIGURE_REQUEST:
      return { ...state, addingCatalogueConfigure: true };
    case types.ADD_CATALOGUE_CONFIGURE_SUCCESS:
      return {
        ...state,
        addingCatalogueConfigure: false,
        addCatalogueConfigureModal: false,
        // clearbit: null,
      };
    case types.ADD_CATALOGUE_CONFIGURE_FAILURE:
      return {
        ...state,
        addingCatalogueConfigure: false,
        addingCatalogueConfigureError: true,
      };

    /**get the list of all configure*/
    case types.GET_CATALOGUE_CONFIGURE_LIST_REQUEST:
      return { ...state, fetchingCatalogueConfigure: true };
    case types.GET_CATALOGUE_CONFIGURE_LIST_SUCCESS:
      return {
        ...state,
        fetchingCatalogueConfigure: false,
        catalogueConfigure: action.payload,
      };
    case types.GET_CATALOGUE_CONFIGURE_LIST_FAILURE:
      return {
        ...state,
        fetchingCatalogueConfigure: false,
        fetchingCatalogueConfigureError: true,
      };

    case types.ADD_DISCOUNT_DISTRIBUTOR_REQUEST:
      return { ...state, addingDiscountDistributor: true, addingDiscountDistributorError: false };
    case types.ADD_DISCOUNT_DISTRIBUTOR_SUCCESS:
      return { ...state, addingDiscountDistributor: false, addDiscountModal: false };
    case types.ADD_DISCOUNT_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        addingDiscountDistributor: false,
        addingDiscountDistributorError: true,
        addDiscountModal: false,
      };

    case types.GET_DISTRIBUTOR_DISCOUNT_HISTORY_REQUEST:
      return { ...state, fetchingDistributorDiscountHistory: true };
    case types.GET_DISTRIBUTOR_DISCOUNT_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingDistributorDiscountHistory: false,
        distributorDiscount: action.payload,
      };
    case types.GET_DISTRIBUTOR_DISCOUNT_HISTORY_FAILURE:
      return {
        ...state,
        fetchingDistributorDiscountHistory: false,
        fetchingDistributorDiscountHistoryError: true,
      };

    case types.GET_RECORDS_REQUEST:
      return { ...state, fetchingRecordsByUserId: true };
    case types.GET_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        recordData: action.payload,
      };
    case types.GET_RECORDS_FAILURE:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        fetchingRecordsByUserIdError: true,
      };


      case types.GET_DELETED_PRODUCT_RECORDS_REQUEST:
        return { ...state, fetchingDeletedProductRecords: true };
      case types.GET_DELETED_PRODUCT_RECORDS_SUCCESS:
        return {
          ...state,
          fetchingDeletedProductRecords: false,
          deletedProductCount: action.payload,
        };
      case types.GET_DELETED_PRODUCT_RECORDS_FAILURE:
        return {
          ...state,
          fetchingDeletedProductRecords: false,
          fetchingDeletedProductRecordsError: true,
        };

    case types.GET_ALL_PRODUCT_REQUEST:
      return { ...state, fetchingAllProducts: true, fetchingAllProductsError: false };
    case types.GET_ALL_PRODUCT_SUCCESS:
      return { ...state, fetchingAllProducts: false, allproducts: action.payload };
    case types.GET_ALL_PRODUCT_FAILURE:
      return { ...state, fetchingAllProducts: false, fetchingAllProductsError: true };

    case types.HANDLE_OFFER_BUTTON_MODAL:
      return { ...state, addProductOfferModal: action.payload };

    case types.ADD_CUSTOMER_OFFER_REQUEST:
      return { ...state, addingOffer: true, addingOfferError: false };
    case types.ADD_CUSTOMER_OFFER_SUCCESS:
      return { ...state, addingOffer: false, addProductOfferModal: false };
    case types.ADD_CUSTOMER_OFFER_FAILURE:
      return {
        ...state,
        addingOffer: false,
        addingOfferError: true,
        addProductOfferModal: false,
      };

    case types.ADD_DISTRIBUTOR_OFFER_REQUEST:
      return { ...state, addingDistributorOffer: true, addingDistributorOfferError: false };
    case types.ADD_DISTRIBUTOR_OFFER_SUCCESS:
      return { ...state, addingDistributorOffer: false, addProductOfferModal: false };
    case types.ADD_DISTRIBUTOR_OFFER_FAILURE:
      return {
        ...state,
        addingDistributorOffer: false,
        addingDistributorOfferError: true,
        addProductOfferModal: false,
        addProductBrandDetailsModal:false,
      };



      case types.GET_PRODUCT_BRAND_DETAILS_REQUEST:
        return { ...state, fetchingProductBrandDetails: true };
      case types.GET_PRODUCT_BRAND_DETAILS_SUCCESS:
        return {
          ...state,
          fetchingProductBrandDetails: false,
          productBrandDetails: action.payload,
          // opportunityByUserId: action.payload,
  
          //opportunityByUserId: [...state.opportunityByUserId, ...action.payload],
        };
      case types.GET_PRODUCT_BRAND_DETAILS_FAILURE:
        return {
          ...state,
          fetchingProductBrandDetails: false,
          fetchingProductBrandDetailsError: true,
        };

      case types.HANDLE_PRODUCT_BRAND_DETAILS_MODAL:
        return { ...state, addProductBrandDetailsModal: action.payload };

    case types.GET_CUSTOMER_OFFER_HISTORY_REQUEST:
      return { ...state, fetchingCustomerOfferHistory: true };
    case types.GET_CUSTOMER_OFFER_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingCustomerOfferHistory: false,
        customerOfferHistory: action.payload,
      };
    case types.GET_CUSTOMER_OFFER_HISTORY_FAILURE:
      return {
        ...state,
        fetchingCustomerOfferHistory: false,
        fetchingCustomerOfferHistoryError: true,
      };

    case types.GET_DISTRIBUTOR_OFFER_HISTORY_REQUEST:
      return { ...state, fetchingDistributorOfferHistory: true };
    case types.GET_DISTRIBUTOR_OFFER_HISTORY_SUCCESS:
      return {
        ...state,
        fetchingDistributorOfferHistory: false,
        distributorOfferHistory: action.payload,
      };
    case types.GET_DISTRIBUTOR_OFFER_HISTORY_FAILURE:
      return {
        ...state,
        fetchingDistributorOfferHistory: false,
        fetchingDistributorOfferHistoryError: true,
      };

    case types.SET_CLEARBIT_PRODUCT_DATA:
      return { ...state, clearbitProduct: action.payload };

    /**
* update Customer Offer modal
*/
    case types.HANDLE_UPDATE_CUSTOMER_OFFER_MODAL:
      return { ...state, updateCustomerOfferModal: action.payload };

    case types.SET_EDIT_CUSTOMER_OFFER:
      return { ...state, setEditingCustomerOffer: action.payload };

    case types.UPDATE_CUSTOMER_OFFER_REQUEST:
      return { ...state, updateCustomerOfferById: true };
    case types.UPDATE_CUSTOMER_OFFER_SUCCESS:
      return {
        ...state,
        updateCustomerOfferById: false,
        updateCustomerOfferModal: false,
        customerOfferHistory: state.customerOfferHistory.map((item) => {
          if (item.contactOfferId == action.payload.contactOfferId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_CUSTOMER_OFFER_FAILURE:
      return {
        ...state,
        updateCustomerOfferById: false,
        updateCustomerOfferByIdError: true,
      };

    /**
* update Distributor Offer modal
*/
    case types.HANDLE_UPDATE_DISTRIBUTOR_OFFER_MODAL:
      return { ...state, updateDistributorOfferModal: action.payload };

    case types.SET_EDIT_DISTRIBUTOR_OFFER:
      return { ...state, setEditingDistributorOffer: action.payload };

    case types.SET_CLEARBIT_PRODUCT_DISTRIBUTOR_DATA:
      return { ...state, clearbitProductDistributor: action.payload };

    case types.UPDATE_DISTRIBUTOR_OFFER_REQUEST:
      return { ...state, updateDistributorOfferById: true };
    case types.UPDATE_DISTRIBUTOR_OFFER_SUCCESS:
      return {
        ...state,
        updateDistributorOfferById: false,
        updateDistributorOfferModal: false,
        distributorOfferHistory: state.distributorOfferHistory.map((item) => {
          if (item.distributorOfferId == action.payload.distributorOfferId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_DISTRIBUTOR_OFFER_FAILURE:
      return {
        ...state,
        updateDistributorOfferById: false,
        updateDistributorOfferByIdError: true,
      };

    case types.HANDLE_CATALOGUE_WIP_MODAL:
      return { ...state, addCatalogueWipModal: action.payload };

    case types.HANDLE_CATEGORYIMAGE_MODAL:
      return { ...state, addCategoryImageModal: action.payload };

    case types.ADD_CATEGORY_IMAGE_REQUEST:
      return { ...state, addingCategoryImage: true };
    case types.ADD_CATEGORY_IMAGE_SUCCESS:
      return {
        ...state,
        addingCategoryImage: false,
        CategoryImage: [...state.CategoryImage, action.payload],
      };
    case types.ADD_CATEGORY_IMAGE_FAILURE:
      return {
        ...state,
        addingCategoryImage: false,
        addingCategoryImageError: true,
      };

    case types.GET_CATEGORY_IMAGE_REQUEST:
      return { ...state, fetchingCategoryImage: true, fetchingCategoryImageError: false };
    case types.GET_CATEGORY_IMAGE_SUCCESS:
      return { ...state, fetchingCategoryImage: false, CategoryImage: action.payload };
    case types.GET_CATEGORY_IMAGE_FAILURE:
      return { ...state, fetchingCategoryImage: false, fetchingCategoryImageError: true };

    case types.PRODUCT_PUBLISH_TOGGLE_REQUEST:
      return { ...state, publishingProductToggle: true };
    case types.PRODUCT_PUBLISH_TOGGLE_SUCCESS:
      return {
        ...state,
        publishingProductToggle: false,
        // todayCustomer: state.todayCustomer.filter(
        //   (item) => item.paymentId !== action.payload.paymentId
        // ),
      };
    case types.PRODUCT_PUBLISH_TOGGLE_FAILURE:
      return {
        ...state,
        publishingProductToggle: false,
        publishingProductToggleError: true,
      };

    case types.GET_PRODUCT_BY_GROUP_REQUEST:
      return {
        ...state,
        fetchingProductByGroup: true,
        fetchingProductByGroupError: false,
      };
    case types.GET_PRODUCT_BY_GROUP_SUCCESS:
      return {
        ...state,
        fetchingProductByGroup: false,
        productByGroup: action.payload,
      };
    case types.GET_PRODUCT_BY_GROUP_FAILURE:
      return {
        ...state,
        fetchingProductByGroup: false,
        fetchingProductByGroupError: true,
      };

    case types.ADD_TO_MATERIAL_REQUEST:
      return { ...state, updateMaterialById: true };
    case types.ADD_TO_MATERIAL_SUCCESS:
      return {
        ...state,
        updateMaterialById: false,
        // serviceById: action.payload,
      };
    case types.ADD_TO_MATERIAL_FAILURE:
      return {
        ...state,
        updateMaterialById: false,
        updateMaterialByIdError: true,
      };

    case types.HANDLE_UPLOAD_PRODUCT_MODAL:
      return { ...state, uploadProductList: action.payload };

    case types.UPLOAD_PRODUCT_LISTS_REQUEST:
      return { ...state, uploadingProductList: true };
    case types.UPLOAD_PRODUCT_LISTS_SUCCESS:
      return {
        ...state,
        uploadingProductList: false,
        uploadProductList: false
      };
    case types.UPLOAD_PRODUCT_LISTS_FAILURE:
      return {
        ...state,
        uploadProductList: false,
        uploadingProductList: false,
        uploadingProductListError: true,
      };


      case types.MOVE_PRODUCT_QUALITY_REQUEST:
        return { ...state, movingProductionQuality: true };
      case types.MOVE_PRODUCT_QUALITY_SUCCESS:
        return {
          ...state,
          movingProductQuality: false,
         
          qualityProducts: state.qualityProducts.map((item) => {
            if (item.qualityCheckBuilderId === action.payload.qualityCheckBuilderId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };
      case types.MOVE_PRODUCT_QUALITY_FAILURE:
        return {
          ...state,
          movingProductQuality: false,
          movingProductQualityError: true,
        };

    case types.ADD_PRODUCT_CATEGORY_REQUEST:
      return { ...state, addingProductCategory: true, addingProductCategoryError: false };
    case types.ADD_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state, addingProductCategory: false, addConfigureModal: false,
        allproducts: [action.payload, ...state.allproducts]
      };
    case types.ADD_PRODUCT_CATEGORY_FAILURE:
      return {
        ...state,
        addingProductCategory: false,
        addingProductCategoryError: true,
      };

    case types.ADD_PROFESSIONALDUCT_REQUEST:
      return { ...state, addingProduct: true };
    case types.ADD_PROFESSIONALDUCT_SUCCESS:
      return {
        ...state, addingProduct: false, addConfigureModal: false,
        products: [action.payload, ...state.products]
      };
    case types.ADD_PROFESSIONALDUCT_FAILURE:
      return {
        ...state,
        addingProduct: false,
        addingProductError: true,
        addConfigureModal: false,
      };




      case types.DELETE_PRODUCT_BRAND_DATA_REQUEST:
        return { ...state, deleteProductBrandData: true };
      case types.DELETE_PRODUCT_BRAND_DATA_SUCCESS:
        return {
          ...state,
          deleteProductBrandData: false,
          brandProduct: state.brandProduct.filter(
            (item) => item.productBrandId !== action.payload
          ),
        };
      case types.DELETE_PRODUCT_BRAND_DATA_FAILURE:
        return {
          ...state,
          deleteProductBrandData: false,
          deleteProductBrandDataError: false,
        };


        case types.UPDATE_BRAND_PRODUCT_REQUEST:
        return { ...state, updatingBrandProduct: true };
      case types.UPDATE_BRAND_PRODUCT_SUCCESS:
        // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
        return {
          ...state,
          updatingBrandProduct: false,
          brandProduct: state.brandProduct.map((document) =>
            document.brand === action.payload.brand
              ? action.payload
              : document
          ),
        };
      case types.UPDATE_BRAND_PRODUCT_FAILURE:
        return {
          ...state,
          updatingBrandProduct: false,
          updatingBrandProductError: true,
        };




        case types.GET_BRAND_PRODUCT_REQUEST:
          return { ...state, fetchingBrandProduct: true, fetchingBrandProduct: false };
        case types.GET_BRAND_PRODUCT_SUCCESS:
          //const newData = action.payload.filter(item => !state.products.includes(item));
          return { ...state, fetchingBrandProduct: false, 
            // products: [
            // ...state.products,
            // ...action.payload] };
            brandProduct: action.payload
          }
        case types.GET_BRAND_PRODUCT_FAILURE:
          return { ...state, fetchingBrandProduct: false, fetchingBrandProductError: true };

      case types.GET_BRAND_DELETE_PRODUCT_REQUEST:
      return { ...state, fetchingBrandDeleteProduct: true,  };
    case types.GET_BRAND_DELETE_PRODUCT_SUCCESS:
      //const newData = action.payload.filter(item => !state.products.includes(item));
      return { ...state, fetchingBrandDeleteProduct: false, 
        // products: [
        // ...state.products,
        // ...action.payload] };
        brandDeleteProduct: action.payload
      }
    case types.GET_BRAND_DELETE_PRODUCT_FAILURE:
      return { ...state, fetchingBrandDeleteProduct: false, fetchingBrandDeleteProductError: true };




      case types.GET_BRAND_CATALOGUE_LIST_REQUEST:
      return { ...state, fetchingBrandCatalogueList: true, fetchingBrandCatalogueListError: false };
    case types.GET_BRAND_CATALOGUE_LIST_SUCCESS:
      //const newData = action.payload.filter(item => !state.products.includes(item));
      return { ...state, fetchingBrandCatalogueList: false, 
        // products: [
        // ...state.products,
        // ...action.payload] };
        brandCatalogueListData: action.payload
      }
    case types.GET_BRAND_CATALOGUE_LIST_FAILURE:
      return { ...state, fetchingBrandCatalogueList: false, fetchingBrandCatalogueListError: true };




      case types.HANDLE_PRODUCT_BRAND_MODAL:
        return { ...state, addProductBrandModal: action.payload };


      case types.ADD_CATEGORY_REQUEST:
        return { ...state, addingCategory: true };
      case types.ADD_CATEGORY_SUCCESS:
        return {
          ...state, addingCategory: false, 
          categoryProductModal:false,
          categoryProducts: [action.payload, ...state.categoryProducts]
        };
      case types.ADD_CATEGORY_FAILURE:
        return {
          ...state,
          addingCategory: false,
          addingCategoryError: true,
          categoryProductModal:false,
          
        };

    case types.HANDLE_PRODUCT_BUILDER_DRAWER:
      return { ...state, proBuilderDrawer: action.payload };

    case types.GET_PRODUCT_BUILDER_REQUEST:
      return {
        ...state,
        fetchingProductBuilder: true,
        fetchingProductBuilderError: false,
      };
    case types.GET_PRODUCT_BUILDER_SUCCESS:
      return {
        ...state,
        fetchingProductBuilder: false,
        productBuilder: action.payload,
      };
    case types.GET_PRODUCT_BUILDER_FAILURE:
      return {
        ...state,
        fetchingProductBuilder: false,
        fetchingProductBuilderError: true,
      };

    case types.ADD_PRODUCT_BUILDER_REQUEST:
      return { ...state, addingProductBuilder: true };
    case types.ADD_PRODUCT_BUILDER_SUCCESS:
      return {
        ...state,
        addingProductBuilder: false,
        addedProBuilder: action.payload,
        // searchedBuilders: state.searchedBuilders.map((item) => {
        //   if (item.suppliesId == action.payload.suppliesId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
        // builderbyProductId:[action.payload,...state.builderbyProductId]
      };
    case types.ADD_PRODUCT_BUILDER_FAILURE:
      return {
        ...state,
        addingProductBuilder: false,
        addingProductBuilderError: true,
      };





      case types.GET_QUALITY_PRODUCTS_REQUEST:
        return { ...state, fetchingQualityProducts: true, fetchingQualityProductsError: false };
      case types.GET_QUALITY_PRODUCTS_SUCCESS:
        return { ...state, fetchingQualityProducts: false, 
          qualityProducts: action.payload
        }
      case types.GET_QUALITY_PRODUCTS_FAILURE:
        return { ...state, fetchingQualityProducts: false, fetchingQualityProductsError: true };

    case types.GET_BUILDER_BY_PRODUCT_ID_REQUEST:
      return {
        ...state,
        fetchingBuilderByProductId: true,
        fetchingBuilderByProductIdError: false,
      };
    case types.GET_BUILDER_BY_PRODUCT_ID_SUCCESS:
      return {
        ...state,
        fetchingBuilderByProductId: false,
        builderbyProductId: action.payload,
      };
    case types.GET_BUILDER_BY_PRODUCT_ID_FAILURE:
      return {
        ...state,
        fetchingBuilderByProductId: false,
        fetchingBuilderByProductIdError: true,
      };

    case types.HANDLE_PRICE_DRAWER:
      return { ...state, priceOpenDrawer: action.payload };

    case types.UPLOAD_CATALOGUE_LIST_REQUEST:
      return { ...state, uploadingCatalogueList: true };
    case types.UPLOAD_CATALOGUE_LIST_SUCCESS:
      return {
        ...state,
        uploadingCatalogueList: false,
        uploadProductList: false
      };
    case types.UPLOAD_CATALOGUE_LIST_FAILURE:
      return {
        ...state,
        uploadingCatalogueList: false,
        uploadingCatalogueListError: true,
      };


      case types.GET_PRODUCT_DESC_REQUEST:
        return { ...state, fetchingProductsDesc: true, fetchingProductsDescError: false };
      case types.GET_PRODUCT_DESC_SUCCESS:
        return { ...state, fetchingProductsDesc: false, productsDesc: action.payload };
      case types.GET_PRODUCT_DESC_FAILURE:
        return { ...state, fetchingProductsDesc: false, fetchingProductsDescError: true };

    case types.REMOVE_PRODUCT_BUILDER_REQUEST:
      return { ...state, removingProductBuilder: true };
    case types.REMOVE_PRODUCT_BUILDER_SUCCESS:
      return {
        ...state,
        removingProductBuilder: false,
        builderbyProductId: state.builderbyProductId.filter((item) => item.productionBuilderId !== action.payload),
      };
    case types.REMOVE_PRODUCT_BUILDER_FAILURE:
      return {
        ...state,
        removingProductBuilder: false,
        removingProductBuilderError: true,
      };




      case types.ADD_PRODUCT_BRAND_REQUEST:
      return { ...state, addingProductBrand: true };
    case types.ADD_PRODUCT_BRAND_SUCCESS:
      return {
        ...state, addingProductBrand: false, 
        // addConfigureModal: false,
        brandProduct: [action.payload, ...state.brandProduct]
      };
    case types.ADD_PRODUCT_BRAND_FAILURE:
      return {
        ...state,
        addingProductBrand: false,
        addingProductBrandError: true,
        // addConfigureModal: false,
      };


    case types.UPDATE_PRO_SUPPL_BUILDER_REQUEST:
      return { ...state, addingProductBuilder: true };
    case types.UPDATE_PRO_SUPPL_BUILDER_SUCCESS:
      return {
        ...state,
        addingProductBuilder: false,
        // builderbyProductId:[action.payload, ...state.builderbyProductId],
        builderbyProductId: state.builderbyProductId.map((item) => {
          if (item.suppliesId == action.payload.suppliesId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PRO_SUPPL_BUILDER_FAILURE:
      return {
        ...state,
        addingProductBuilder: false,
        addingProductBuilderError: true,
      };

    case types.GET_PRODUCT_CURRENCY_REQUEST:
      return {
        ...state,
        fetchingProductCurrency: true,
      };
    case types.GET_PRODUCT_CURRENCY_SUCCESS:
      return {
        ...state,
        fetchingProductCurrency: false,
        ProductCurrency: action.payload,
      };
    case types.GET_PRODUCT_CURRENCY_FAILURE:
      return {
        ...state,
        fetchingProductCurrency: false,
        fetchingProductCurrencyError: true,
      };

    case types.CREATE_PRODUCT_CURRENCY_REQUEST:
      return { ...state, creatingProductCurrency: true };
    case types.CREATE_PRODUCT_CURRENCY_SUCCESS:
      return {
        ...state,
        creatingProductCurrency: false,
        ProductCurrency: [action.payload, ...state.ProductCurrency]
      };
    case types.CREATE_PRODUCT_CURRENCY_FAILURE:
      return {
        ...state,
        creatingProductCurrency: false,
        creatingProductCurrencyError: true,
      };

    case types.GET_SEARCH_BUILDER_REQUEST:
      return { ...state, fetchingSearchedBuilders: true };
    case types.GET_SEARCH_BUILDER_SUCCESS:
      return {
        ...state,
        fetchingSearchedBuilders: false,
        searchedBuilders: action.payload,
      };
    case types.GET_SEARCH_BUILDER_FAILURE:
      return {
        ...state,
        fetchingSearchedBuilders: false,
        fetchingSearchedBuildersError: true,
      };

    case types.GET_ALL_PRODUCT_LIST_REQUEST:
      return { ...state, fetchingAllProducts: true, fetchingAllProductsError: false };
    case types.GET_ALL_PRODUCT_LIST_SUCCESS:
      return { ...state, fetchingAllProducts: false, productAlls: action.payload };
    case types.GET_ALL_PRODUCT_LIST_FAILURE:
      return { ...state, fetchingAllProducts: false, fetchingAllProductsError: true };

    case types.POST_PRODUCTION_BUILDER_REQUEST:
      return { ...state, postingProductionBldr: true };
    case types.POST_PRODUCTION_BUILDER_SUCCESS:
      return {
        ...state,
        postingProductionBldr: false,
        productionSpareData: state.productionSpareData.map((item) => {
          if (item.suppliesId == action.payload.suppliesId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.POST_PRODUCTION_BUILDER_FAILURE:
      return {
        ...state,
        postingProductionBldr: false,
        postingProductionBldrError: true,
      };

                case types.HANDLE_PRODUCT_CELL_DRAWER:
                  return { ...state, clickProdclDrwr: action.payload };

                  case types.UPDATE_PROD_SUPPLR_BILDR_REQUEST:
                    return { ...state, addingProductBuilder: true };
                  case types.UPDATE_PROD_SUPPLR_BILDR_SUCCESS:
                    return {
                      ...state,
                      addingProductBuilder: false,
                      builderbyProductId: state.builderbyProductId.map((item) => {
                        if (item.productionBuilderId == action.payload.productionBuilderId) {
                          return action.payload;
                        } else {
                          return item;
                        }
                      }),
                    };




                    case types.CREATE_QUALITY_PRODUCT_REQUEST:
                      return { ...state, creatingQualityProduct: true };
                    case types.CREATE_QUALITY_PRODUCT_SUCCESS:
                      return {
                        ...state,
                        creatingQualityProduct: false,
                        qualityProducts:[action.payload,...state.qualityProducts]
 
                      };
                    case types.CREATE_QUALITY_PRODUCT_FAILURE:
                      return {
                        ...state,
                        creatingQualityProduct: false,
                        creatingQualityProductError: true,
        
                      };

                  case types.UPDATE_PROD_SUPPLR_BILDR_FAILURE:
                    return {
                      ...state,
                      addingProductBuilder: false,
                      addingProductBuilderError: true,
                    };

                    case types.REMOVE_PRODUCT_PRICE_REQUEST:
                      return { ...state, removingProductPrice: true };
                    case types.REMOVE_PRODUCT_PRICE_SUCCESS:
                      return {
                        ...state,
                        removingProductPrice: false,
                        ProductCurrency: state.ProductCurrency.filter((item) => item.productCurrencyId !== action.payload),
                      };
                    case types.REMOVE_PRODUCT_PRICE_FAILURE:
                      return {
                        ...state,
                        removingProductPrice: false,
                        removingProductPriceError: true,
                      };

                      case types.HANDLE_PRODUCT_NOTES_DRAWER_MODAL:
                        return { ...state, addDrawerProductNotesModal: action.payload };

                        // case types.REINSTATE_DELETED_PRODUCTS_REQUEST:
                        //   return { ...state, reInstatingProducts: true };
                        // case types.REINSTATE_DELETED_PRODUCTS_SUCCESS:
                        //   return {
                        //     ...state,
                        //     reInstatingProducts: false,
                        //     deleteproducts: state.deleteproducts.filter((item) => item.productId !== action.payload),
                        //   };
                        // case types.REINSTATE_DELETED_PRODUCTS_FAILURE:
                        //   return {
                        //     ...state,
                        //     reInstatingProducts: false,
                        //     reInstatingProductsError: true,
                        //   }; 

                          case types.GET_NOTES_OF_PRODUCT_REQUEST:
                            return { ...state, fetchingNotesofProducts: true, fetchingNotesofProductsError: false };
                          case types.GET_NOTES_OF_PRODUCT_SUCCESS:
                            return { ...state, fetchingNotesofProducts: false, notesofPRoducts: action.payload };
                          case types.GET_NOTES_OF_PRODUCT_FAILURE:
                            return { ...state, fetchingNotesofProducts: false, fetchingNotesofProductsError: true };

        
                              case types.ADD_NOTES_OF_PRODUCT_REQUEST:
                                return {
                                  ...state,
                                  addingNotesOfProducts: true,

                                };
                              case types.ADD_NOTES_OF_PRODUCT_SUCCESS:
                                return {
                                  ...state,
                                  addingNotesOfProducts: false,
                                  notesofPRoducts:action.payload,
                                };
                              case types.ADD_NOTES_OF_PRODUCT_FAILURE:
                                return {
                                  ...state,
                                  addingNotesOfProducts: false,
                                  addingNotesOfProductsError: true,
                                };

                                case types.UPDATE_NOTES_OF_PRODUCT_REQUEST:
                                  return {
                                    ...state,
                                    updatingNotesOfProducts: true,
                                  };
                                case types.UPDATE_NOTES_OF_PRODUCT_SUCCESS:
                                  return {
                                    ...state,
                                    updatingNotesOfProducts: false,
                                    notesofPRoducts:state.notesofPRoducts.map((item) => {
                                      if (item.productId == action.payload.productId) {
                                        return action.payload;
                                      } else {
                                        return item;
                                      }
                                    }),
                                  };
                                case types.UPDATE_NOTES_OF_PRODUCT_FAILURE:
                                  return {
                                    ...state,
                                    updatingNotesOfProducts: false,
                                    updatingNotesOfProductsError: true,
                                  };

                                  case types.REMOVE_NOTES_OF_PRODUCT_REQUEST:
                                    return { ...state, removingNotesOfProducts: true };
                                  case types.REMOVE_NOTES_OF_PRODUCT_SUCCESS:
                                    const { notesId } = action.payload;
                                      return {
                                        ...state,
                                        removingNotesOfProducts: false,
                                        notesofPRoducts: state.notesofPRoducts.filter(item => item.notesId !== notesId),
                                        
                                      };
                                    
                                  case types.REMOVE_NOTES_OF_PRODUCT_FAILURE:
                                    return {
                                      ...state,
                                      removingNotesOfProducts: false,
                                      removingNotesOfProductsError: true,
                                    };



                                    case types.GET_PRODUCT_HSN_REQUEST:
                                      return {
                                        ...state,
                                        fetchingProductHsn: true,
                                        fetchingProductHsnError: false,
                                      };
                                    case types.GET_PRODUCT_HSN_SUCCESS:
                                      return {
                                        ...state,
                                        fetchingProductHsn: false,
                                        productHsn: action.payload,
                                      };
                                    case types.GET_PRODUCT_HSN_FAILURE:
                                      return {
                                        ...state,
                                        fetchingProductHsn: false,
                                        fetchingProductHsnError: true,
                                      };

                                      case types.FEATURED_PRODUCT_TOGGLE_REQUEST:
                                        return { ...state, featuredProductToggle: true };
                                      case types.FEATURED_PRODUCT_TOGGLE_SUCCESS:
                                        return {
                                          ...state,
                                          featuredProductToggle: false,
                                          products: state.products.map((item) => {
                                            if (item.productId === action.payload.productId) {
                                              return action.payload;
                                            } else {
                                              return item;
                                            }
                                          }),
                                        };
                                      case types.FEATURED_PRODUCT_TOGGLE_FAILURE:
                                        return {
                                          ...state,
                                          featuredProductToggle: false,
                                          featuredProductToggleError: true,
                                        };

                                        case types.CATALOGUE_CATEGORY_SEARCH_REQUEST:
                                          return { ...state, fetchingCatalogueCatSrch: true };
                                        case types.CATALOGUE_CATEGORY_SEARCH_SUCCESS:
                                          return {
                                            ...state,
                                            fetchingCatalogueCatSrch: false,
                                            categoryProducts: action.payload,
                                         
                                          };
                                        case types.CATALOGUE_CATEGORY_SEARCH_FAILURE:
                                          return { ...state, fetchingCatalogueCatSrchError: true };                     

      
                                          case types.GET_PRODUCTS_BY_PRODUCTID_REQUEST:
                                            return {
                                              ...state,
                                              fetchingProductsByProductId: true,
                                              fetchingProductsByProductIdError: false,
                                            };
                                          case types.GET_PRODUCTS_BY_PRODUCTID_SUCCESS:
                                            return {
                                              ...state,
                                              fetchingProductsByProductId: false,
                                              productsByproductId: action.payload,
                                            };
                                          case types.GET_PRODUCTS_BY_PRODUCTID_FAILURE:
                                            return {
                                              ...state,
                                              fetchingProductsByProductId: false,
                                              fetchingProductsByProductIdError: true,
                                            };   

                                            case types.PRODUCT_PUNBLISH_TOGGLE_REQUEST:
                                              return { ...state, productPUblishToggle: true };
                                            case types.PRODUCT_PUNBLISH_TOGGLE_SUCCESS:
                                              return {
                                                ...state,
                                                productPUblishToggle: false,
                                                categoryProducts: state.categoryProducts.map((item) => {
                                                  if (item.categoryId === action.payload.categoryId) {
                                                    return action.payload;
                                                  } else {
                                                    return item;
                                                  }
                                                }),
                                              };
                                            case types.PRODUCT_PUNBLISH_TOGGLE_FAILURE:
                                              return {
                                                ...state,
                                                productPUblishToggle: false,
                                                productPUblishToggleError: true,
                                              };

                                              case types.WARRENTY_PRODUCT_TOGGLE_REQUEST:
                                                return { ...state, warrentyProductToggle: true };
                                              case types.WARRENTY_PRODUCT_TOGGLE_SUCCESS:
                                                return {
                                                  ...state,
                                                  warrentyProductToggle: false,
                                                  products: state.products.map((item) => {
                                                    if (item.productId === action.payload.productId) {
                                                      return action.payload;
                                                    } else {
                                                      return item;
                                                    }
                                                  }),
                                                };
                                              case types.WARRENTY_PRODUCT_TOGGLE_FAILURE:
                                                return {
                                                  ...state,
                                                  warrentyProductToggle: false,
                                                  warrentyProductToggleError: true,
                                                };
                                                case types.UPDATE_DATE_YEAR_PRODUCT_REQUEST:
                                                  return { ...state, updateDateYearProduct: true };
                                                case types.UPDATE_DATE_YEAR_PRODUCT_SUCCESS:
                                                  return {
                                                    ...state,
                                                    updateDateYearProduct: false,
                                                    products: state.products.map((item) => {
                                                      if (item.productId === action.payload.productId) {
                                                        return action.payload;
                                                      } else {
                                                        return item;
                                                      }
                                                    }),
                                                  };
                                                case types.UPDATE_DATE_YEAR_PRODUCT_FAILURE:
                                                  return {
                                                    ...state,
                                                    updateDateYearProduct: false,
                                                    updateDateYearProductError: true,
                                                  };
  

    default:
      return state;
  }
};
