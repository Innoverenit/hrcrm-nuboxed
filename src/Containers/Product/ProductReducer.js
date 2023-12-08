import * as types from "./ProductActionTypes";
import moment from "moment";
const initialState = {
  addWeightedModal: false,
  addAbsoluteModal: false,
  addWinModal: false,
  addWonModal: false,
  addCustomerModal: false,
  dateRangeList: [
    {
      id: 1,
      type: "year",
      value: "FY",
      starter: true,
      isSelected: true,
      startDate: moment()
        .startOf("year")
        .toISOString(),
      endDate: moment()
        .endOf("year")
        .toISOString(),
    },
    {
      id: 2,
      type: "quarter",
      value: "QTD",
      starter: false,
      isSelected: false,
      startDate: moment()
        .startOf("quarter")
        .toISOString(),
      endDate: moment()
        .endOf("quarter")
        .toISOString(),
    },
    {
      id: 3,
      type: "month",
      value: "MTD",
      starter: false,
      isSelected: false,
      startDate: moment()
        .startOf("month")
        .toISOString(),
      endDate: moment()
        .endOf("month")
        .toISOString(),
    },
    {
      id: 4,
      type: "week",
      value: "1W",
      starter: false,
      isSelected: false,
      startDate: moment()
        .startOf("week")
        .toISOString(),
      endDate: moment()
        .endOf("week")
        .toISOString(),
    },
  ],
  viewType: "grid",
  addProductModal: false,
  addServiceModal: false,
  addConfigureModal: false,
  addDetailsProductModal: false,

  addingProductCategory: false,
  addingProductCategoryError: false,

  addingService: false,
  addingServiceError: false,

  fetchingLatestProductsByOrganizationId: false,
  fetchingLatestProductsByOrganizationIdError: false,
  latestProductsByOrganizationId: [],

  fetchingProducts: false,
  fetchingProductsError: false,
  products: [],

  fetchingAllProducts: false,
  fetchingAllProductsError: false,
  allproducts: [],

  fetchingProductsById: false,
  fetchingProductsByIdError: false,
  productsById: {},

  fetchingService: false,
  fetchingServiceError: false,
  services: [],

  fetchingServiceById: false,
  fetchingServiceByIdError: false,
  serviceById: {},

  uploadProductList: false,

  uploadingProductList: false,
  uploadingProductListError: false,

  updateServiceById: false,
  updateServiceByIdError: false,

  updateProductById: false,
  updateProductByIdError: false,

  isCustomSelected: false,

  setEditingProducts: {},

  updateProductModal: false,

  addDiscountModal: false,

  addHistoryModal: false,
  addProductConfigureModal: false,

  fetchingDiscountHistory: false,
  fetchingDiscountHistoryError: false,
  discountHistory: [],

  addingDiscount: false,
  addingDiscountError: false,

  fetchingProductHistory: false,
  fetchingProductHistoryError: false,
  productsHistory: [],

  deletingProductData: false,
  deletingProductDataError: false,

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

  addProductOfferModal: false,

  addingOffer: false,
  addingOfferError: false,

  addingDistributorOffer: false,
  addingDistributorOfferError: false,

  fetchingCustomerOfferHistory: false,
  fetchingCustomerOfferHistoryError: false,
  customerOfferHistory: [],

  fetchingDistributorOfferHistory: false,
  fetchingDistributorOfferHistoryError: false,
  distributorOfferHistory: [],

  clearbitProduct: {},

  clearbitProductDistributor: {},

  updateCustomerOfferModal: false,

  setEditingCustomerOffer: {},

  updateDistributorOfferModal: false,

  setEditingDistributorOffer: {},

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
  addingProductError:false,

  proBuilderDrawer:false,

  fetchingProductBuilder: false,
  fetchingProductBuilderError: false,
  productBuilder:[],

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

    case types.GET_PROFESSIONALDUCTS_REQUEST:
      return { ...state, fetchingProducts: true, fetchingProductsError: false };
    case types.GET_PROFESSIONALDUCTS_SUCCESS:
      return { ...state, fetchingProducts: false, products: action.payload };
    case types.GET_PROFESSIONALDUCTS_FAILURE:
      return { ...state, fetchingProducts: false, fetchingProductsError: true };

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
      };

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

      case types.ADD_PRODUCT_CATEGORY_REQUEST:
        return { ...state, addingProductCategory: true, addingProductCategoryError: false };
      case types.ADD_PRODUCT_CATEGORY_SUCCESS:
        return { ...state, addingProductCategory: false, addConfigureModal: false,
          allproducts: [action.payload,...state.allproducts]
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
          return { ...state, addingProduct: false, addConfigureModal: false,
            products: [action.payload,...state.products]
          };
        case types.ADD_PROFESSIONALDUCT_FAILURE:
          return {
            ...state,
            addingProduct: false,
            addingProductError: true,
            addConfigureModal: false,
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

    default:
      return state;
  }
};
