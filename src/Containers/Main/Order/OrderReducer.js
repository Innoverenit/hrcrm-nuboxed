import * as types from "./OrderActionTypes";
import dayjs from "dayjs";

const initialState = {
  viewType: "production",

  addOrderModal: false,

  viewItemDrwr: false,

  fetchingProcureOrderDetails: false,
  fetchingProcureOrderDetailsError: false,
  orderProcureDetails: [],

  fetchingOrdrSuplrDetails: false,
  fetchingOrdrSuplrDetailsError:false,
  ordrSuplrItem:[],

  fetchingAllHighOrderList: false,
  fetchingAllHighOrderListError: false,
  allHighCompleteOrder:[],

  fetchingInputOrderNosrch: false,
  fetchingInputOrderNosrchError: false,
  orderSearch:[],

  fetchingAllLowOrderList: false,
  fetchingAllLowOrderListError: false,
  allLowCompleteOrder:[],

  addNotesInOrder: false,

  addStatusOfOrder: false,

  fetchingOrderCount: false,
  fetchingOrderCountError: false,
  orderCount: {},

  fetchingProductionHistoryOrder: false,
  fetchingProductionHistoryOrderError: false,
  productionHistoryOrder: [],

  fetchingProductionOrder: false,
  fetchingProductionOrderError: false,
  productionOrder: [],

  fetchingOrderList: false,
  fetchingOrderListError: false,
  orderList: [],

  fetchingALlCompleteOrderList: false,
  fetchingALlCompleteOrderListError: true,
  allCompleteOrder: [],

  fetchingRepairHighOrderList: false,
  fetchingRepairHighOrderListError: false,
  repairHighCompleteOrder:[],

  fetchingAllOrderCount: false,
  fetchingAllOrderCountError: false,
  allOrderCount: {},

  fetchingCompletedMediumOrderList: false,
  fetchingCompletedMediumOrderListError: false,
  completedMediumOrder:[],

  fetchingRepairLowOrderList: false,
  fetchingRepairLowOrderListError: false,
  repairLowCompleteOrder:[],

  fetchingDeletedHighOrderList: false,
  fetchingDeletedHighOrderListError: false,
  deletedHighOrder:[],

  fetchingRepairMediumOrderList: false,
  fetchingRepairMediumOrderListError: false,
  repairMediumCompleteOrder:[],


  fetchingDeletedLowOrderList: false,
  fetchingDeletedLowOrderListError: false,
  deletedLowOrder:[],


  fetchingCustomerList: false,
  fetchingCustomerListError: false,
  customerList: [],

  fetchingCompletedHighOrderList: false,
  fetchingCompletedHighOrderListError: false,
  completedHighOrder:[],


  fetchingCompletedLowOrderList: false,
  fetchingCompletedLowOrderListError: false,
  completedLowOrder:[],

  deletingOrderRepairData: false,
  deletingOrderRepairDataError: false,

  fetchingProductionAllOrder: false,
  fetchingProductionAllOrderError: false,
  productionAllOrder: [],


  fetchingDeletedMediumOrderList: false,
  fetchingDeletedMediumOrderListError: false,
  deletedMediumOrder:[],

  deleteOrderData: false, 
  deleteOrderDataError: false, 

  fetchingAllMediumOrderList: false,
  fetchingAllMediumOrderListError: false,
  allMediumCompleteOrder:[],

  fetchingDistributorList: false,
  fetchingDistributorListError: false,
  distributorList: [],

  addPaidButtonModal: false,

  fetchingCompleteOrders: false,
  fetchingCompleteOrdersError: false,
  comepletOrder: [],

  fetchingDistributorOrderList: false,
  fetchingDistributorOrderListError: false,
  distributororderList: [],

  DistributorDeliveryDate: false,
  DistributorDeliveryDateError: false,
  disDeliveryDate: [],

  CustomerDeliveryDate: false,
  CustomerDeliveryDateError: false,
  cusDeliveryDate: [],

  addOrderProductModal: false,

  addingCustomerOrderId: false,
  addingCustomerOrderIdError: false,

  fetchingAllOrderList: false,
  fetchingAllOrderListError: false,
  allOrderList: [],

  fetchingEcomList: false,
  fetchingEcomListError:false,
  ecomList:[],

  fetchingEcomStatusItem: false,
  fetchingEcomStatusItemError:false,
  statusEcomItems:{}
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORDER_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.HANDLE_ORDER_MODAL:
      return { ...state, addOrderModal: action.payload };

    case types.GET_ORDER_LIST_REQUEST:
      return { ...state, fetchingOrderList: true };
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetchingOrderList: false,
        orderList: action.payload,
      };
    case types.GET_ORDER_LIST_FAILURE:
      return {
        ...state,
        fetchingOrderList: false,
        fetchingOrderListError: true,
      };

    case types.GET_DISTRIBUTOR_LIST_REQUEST:
      return { ...state, fetchingDistributorList: true };
    case types.GET_DISTRIBUTOR_LIST_SUCCESS:
      return {
        ...state,
        fetchingDistributorList: false,
        distributorList: action.payload,
      };
    case types.GET_DISTRIBUTOR_LIST_FAILURE:
      return {
        ...state,
        fetchingDistributorList: false,
        fetchingDistributorListError: true,
      };


    case types.GET_CUSTOMER_LIST_REQUEST:
      return { ...state, fetchingCustomerList: true };
    case types.GET_CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        fetchingCustomerList: false,
        customerList: action.payload,
      };
    case types.GET_CUSTOMER_LIST_FAILURE:
      return {
        ...state,
        fetchingCustomerList: false,
        fetchingCustomerListError: true,
      };

    case types.GET_COMPLETE_ORDERS_REQUEST:
      return { ...state, fetchingCompleteOrders: true };
    case types.GET_COMPLETE_ORDERS_SUCCESS:
      return {
        ...state,
        fetchingCompleteOrders: false,
        comepletOrder: [
          ...state.comepletOrder,
          ...action.payload]
      };
    case types.GET_COMPLETE_ORDERS_FAILURE:
      return {
        ...state,
        fetchingCompleteOrders: false,
        fetchingCompleteOrdersError: true,
      };

    case types.GET_ALL_COMPLETE_ORDER_LIST_REQUEST:
      return { ...state, fetchingALlCompleteOrderList: true };
    case types.GET_ALL_COMPLETE_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetchingALlCompleteOrderList: false,
        allCompleteOrder: [
          ...state.allCompleteOrder,
          ...action.payload]
      };
    case types.GET_ALL_COMPLETE_ORDER_LIST_FAILURE:
      return {
        ...state,
        fetchingALlCompleteOrderList: false,
        fetchingALlCompleteOrderListError: true,

      };

    case types.GET_DISTRIBUTOR_ORDER_LIST_REQUEST:
      return { ...state, fetchingDistributorOrderList: true };
    case types.GET_DISTRIBUTOR_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetchingDistributorOrderList: false,
        distributororderList: action.payload,
      };
    case types.GET_DISTRIBUTOR_ORDER_LIST_FAILURE:
      return {
        ...state,
        fetchingDistributorOrderList: false,
        fetchingDistributorOrderListError: true,
      };

    //DISTRIBUTOR
    case types.DISTRIBUTOR_DELIVERY_DATE_REQUEST:
      return {
        ...state,
        DistributorDeliveryDate: true,
      };
    case types.DISTRIBUTOR_DELIVERY_DATE_SUCCESS:
      return {
        ...state,
        DistributorDeliveryDate: false,
        disDeliveryDate: action.payload,
      };
    case types.DISTRIBUTOR_DELIVERY_DATE_FAILURE:
      return {
        ...state,
        DistributorDeliveryDate: false,
        DistributorDeliveryDateError: true,
      };

    //CUSTOMER
    case types.CUSTOMER_DELIVERY_DATE_REQUEST:
      return {
        ...state,
        CustomerDeliveryDate: true,
      };
    case types.CUSTOMER_DELIVERY_DATE_SUCCESS:
      return {
        ...state,
        CustomerDeliveryDate: false,
        cusDeliveryDate: action.payload,
      };
    case types.CUSTOMER_DELIVERY_DATE_FAILURE:
      return {
        ...state,
        CustomerDeliveryDate: false,
        CustomerDeliveryDateError: true,
      };

    case types.HANDLE_ORDER_PRODUCT_MODAL:
      return { ...state, addOrderProductModal: action.payload };

    case types.SUBMIT_CUSTOMER_ORDER_ID_REQUEST:
      return {
        ...state,
        addingCustomerOrderId: true,
      };
    case types.SUBMIT_CUSTOMER_ORDER_ID_SUCCESS:
      return {
        ...state,
        addingCustomerOrderId: false,
      };
    case types.SUBMIT_CUSTOMER_ORDER_ID_FAILURE:
      return {
        ...state,
        addingCustomerOrderId: false,
        addingCustomerOrderIdError: true,
      };

    case types.EMPTY_ORDERS_LIST:
      return {
        ...state,
        comepletOrder: [],
        allCompleteOrder: [],
        allOrderList: [],
        orderShowById: [],
      };




    case types.GET_ALL_ORDER_LIST_REQUEST:
      return { ...state, fetchingAllOrderList: true };
    case types.GET_ALL_ORDER_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllOrderList: false,

        allCompleteOrder: [...state.allCompleteOrder, ...action.payload]
      };
    case types.GET_ALL_ORDER_LIST_FAILURE:
      return {
        ...state,
        fetchingAllOrderList: false,
        fetchingAllOrderListError: true,
      };


      case types.GET_ALL_HIGH_ORDER_LIST_REQUEST:
        return { ...state, fetchingAllHighOrderList: true };
      case types.GET_ALL_HIGH_ORDER_LIST_SUCCESS:
        return {
          ...state,
          fetchingAllHighOrderList: false,
  
          allHighCompleteOrder: [...state.allHighCompleteOrder, ...action.payload]
        };
      case types.GET_ALL_HIGH_ORDER_LIST_FAILURE:
        return {
          ...state,
          fetchingAllHighOrderList: false,
          fetchingAllHighOrderListError: true,
        };


        case types.GET_ALL_MEDIUM_ORDER_LIST_REQUEST:
          return { ...state, fetchingAllMediumOrderList: true };
        case types.GET_ALL_MEDIUM_ORDER_LIST_SUCCESS:
          return {
            ...state,
            fetchingAllMediumOrderList: false,
    
            allMediumCompleteOrder: [...state.allMediumCompleteOrder, ...action.payload]
          };
        case types.GET_ALL_MEDIUM_ORDER_LIST_FAILURE:
          return {
            ...state,
            fetchingAllMediumOrderList: false,
            fetchingAllMediumOrderListError: true,
          };


          case types.GET_ALL_LOW_ORDER_LIST_REQUEST:
            return { ...state, fetchingAllLowOrderList: true };
          case types.GET_ALL_LOW_ORDER_LIST_SUCCESS:
            return {
              ...state,
              fetchingAllLowOrderList: false,
      
              allLowCompleteOrder: [...state.allLowCompleteOrder, ...action.payload]
            };
          case types.GET_ALL_LOW_ORDER_LIST_FAILURE:
            return {
              ...state,
              fetchingAllLowOrderList: false,
              fetchingAllLowOrderListError: true,
            };

    case types.GET_ORDER_COUNT_REQUEST:
      return { ...state, fetchingOrderCount: true };
    case types.GET_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        fetchingOrderCount: false,
        orderCount: action.payload,
      };
    case types.GET_ORDER_COUNT_FAILURE:
      return {
        ...state,
        fetchingOrderCount: false,
        fetchingOrderCountError: true,
      };


    case types.GET_ALL_ORDER_COUNT_REQUEST:
      return { ...state, fetchingAllOrderCount: true };
    case types.GET_ALL_ORDER_COUNT_SUCCESS:
      return {
        ...state,
        fetchingAllOrderCount: false,
        allOrderCount: action.payload,
      };
    case types.GET_ALL_ORDER_COUNT_FAILURE:
      return {
        ...state,
        fetchingAllOrderCount: false,
        fetchingAllOrderCountError: true,
      };

    case types.HANDLE_NOTES_MODAL_IN_ORDER:
      return { ...state, addNotesInOrder: action.payload };

    case types.HANDLE_STATUS_OF_ORDER_MODAL:
      return { ...state, addStatusOfOrder: action.payload };

    case types.HANDLE_PAID_BUTTON_MODAL:
      return { ...state, addPaidButtonModal: action.payload };


    case types.GET_PRODUCTION_ORDER_REQUEST:
      return { ...state, fetchingProductionOrder: true };
    case types.GET_PRODUCTION_ORDER_SUCCESS:
      return {
        ...state,
        fetchingProductionOrder: false,
        productionOrder: [
          ...state.productionOrder,
          ...action.payload]
      };
    case types.GET_PRODUCTION_ORDER_FAILURE:
      return {
        ...state,
        fetchingProductionOrder: false,
        fetchingProductionOrderError: true,
      };

    case types.GET_PRODUCTION_HISTORY_ORDER_REQUEST:
      return { ...state, fetchingProductionHistoryOrder: true };
    case types.GET_PRODUCTION_HISTORY_ORDER_SUCCESS:
      return {
        ...state,
        fetchingProductionHistoryOrder: false,
        productionHistoryOrder: [
          ...state.productionHistoryOrder,
          ...action.payload]
      };
    case types.GET_PRODUCTION_HISTORY_ORDER_FAILURE:
      return {
        ...state,
        fetchingProductionHistoryOrder: false,
        fetchingProductionHistoryOrderError: true,
      };

    case types.GET_PRODUCTION_ALL_ORDER_REQUEST:
      return { ...state, fetchingProductionAllOrder: true };
    case types.GET_PRODUCTION_ALL_ORDER_SUCCESS:
      return {
        ...state,
        fetchingProductionAllOrder: false,
        productionAllOrder: [
          ...state.productionAllOrder,
          ...action.payload]
      };
    case types.GET_PRODUCTION_ALL_ORDER_FAILURE:
      return {
        ...state,
        fetchingProductionAllOrder: false,
        fetchingProductionAllOrderError: true,
      };


      case types.DELETE_ORDER_REPAIR_DATA_REQUEST:
        return { ...state, deletingOrderRepairData: true };
      case types.DELETE_ORDER_REPAIR_DATA_SUCCESS:
        return {
          ...state,
          deletingOrderRepairData: false,
          repairHighCompleteOrder: state.repairHighCompleteOrder.filter(
            (item) => item.orderId !== action.payload
          ),
          repairMediumCompleteOrder: state.repairMediumCompleteOrder.filter(
            (item) => item.orderId !== action.payload
          ),
          repairLowCompleteOrder: state.repairLowCompleteOrder.filter(
            (item) => item.orderId !== action.payload
          ),
        };
      case types.DELETE_ORDER_REPAIR_DATA_FAILURE:
        return {
          ...state,
          deletingOrderRepairData: false,
          deletingOrderRepairDataError: true,
        };



  
    
    
          case types.GET_REPAIR_HIGH_ORDER_LIST_REQUEST:
            return { ...state, fetchingRepairHighOrderList: true };
          case types.GET_REPAIR_HIGH_ORDER_LIST_SUCCESS:
            return {
              ...state,
              fetchingRepairHighOrderList: false,
      
              repairHighCompleteOrder: [...state.repairHighCompleteOrder, ...action.payload]
            };
          case types.GET_REPAIR_HIGH_ORDER_LIST_FAILURE:
            return {
              ...state,
              fetchingRepairHighOrderList: false,
              fetchingRepairHighOrderListError: true,
            };
    
    
            case types.GET_REPAIR_MEDIUM_ORDER_LIST_REQUEST:
              return { ...state, fetchingRepairMediumOrderList: true };
            case types.GET_REPAIR_MEDIUM_ORDER_LIST_SUCCESS:
              return {
                ...state,
                fetchingRepairMediumOrderList: false,
        
                repairMediumCompleteOrder: [...state.repairMediumCompleteOrder, ...action.payload]
              };
            case types.GET_REPAIR_MEDIUM_ORDER_LIST_FAILURE:
              return {
                ...state,
                fetchingRepairMediumOrderList: false,
                fetchingRepairMediumOrderListError: true,
              };

              case types.GET_REPAIR_LOW_ORDER_LIST_REQUEST:
                return { ...state, fetchingRepairLowOrderList: true };
              case types.GET_REPAIR_LOW_ORDER_LIST_SUCCESS:
                return {
                  ...state,
                  fetchingRepairLowOrderList: false,
          
                  repairLowCompleteOrder: [...state.repairLowCompleteOrder, ...action.payload]
                };
              case types.GET_REPAIR_LOW_ORDER_LIST_FAILURE:
                return {
                  ...state,
                  fetchingRepairLowOrderList: false,
                  fetchingRepairLowOrderListError: true,
                };


                case types.GET_DELETED_HIGH_ORDER_LIST_REQUEST:
                  return { ...state, fetchingDeletedHighOrderList: true };
                case types.GET_DELETED_HIGH_ORDER_LIST_SUCCESS:
                  return {
                    ...state,
                    fetchingDeletedHighOrderList: false,
                    deletedHighOrder: [
                      ...state.deletedHighOrder,
                      ...action.payload]
                  };
                case types.GET_DELETED_HIGH_ORDER_LIST_FAILURE:
                  return {
                    ...state,
                    fetchingDeletedHighOrderList: false,
                    fetchingDeletedHighOrderListError: true,
            
                  };


                  case types.GET_DELETED_MEDIUM_ORDER_LIST_REQUEST:
                    return { ...state, fetchingDeletedMediumOrderList: true };
                  case types.GET_DELETED_MEDIUM_ORDER_LIST_SUCCESS:
                    return {
                      ...state,
                      fetchingDeletedMediumOrderList: false,
                      deletedMediumOrder: [
                        ...state.deletedMediumOrder,
                        ...action.payload]
                    };
                  case types.GET_DELETED_MEDIUM_ORDER_LIST_FAILURE:
                    return {
                      ...state,
                      fetchingDeletedMediumOrderList: false,
                      fetchingDeletedMediumOrderListError: true,
              
                    };


                    case types.GET_DELETED_LOW_ORDER_LIST_REQUEST:
                      return { ...state, fetchingDeletedLowOrderList: true };
                    case types.GET_DELETED_LOW_ORDER_LIST_SUCCESS:
                      return {
                        ...state,
                        fetchingDeletedLowOrderList: false,
                        deletedLowOrder: [
                          ...state.deletedLowOrder,
                          ...action.payload]
                      };
                    case types.GET_DELETED_LOW_ORDER_LIST_FAILURE:
                      return {
                        ...state,
                        fetchingDeletedLowOrderList: false,
                        fetchingDeletedLowOrderListError: true,
                
                      };


                      case types.DELETE_ORDER_DATA_REQUEST:
                        return { ...state, deleteOrderData: true };
                      case types.DELETE_ORDER_DATA_SUCCESS:
                        return {
                          ...state,
                          deleteOrderData: false,
                          allCompleteOrder: state.allCompleteOrder.filter(
                            (item) => item.orderId !== action.payload
                        ), 
          
                        };
                      case types.DELETE_ORDER_DATA_FAILURE:
                        return { ...state, deleteOrderData: false, deleteOrderDataError: false };


                        
        case types.REINSTATE_TOGGLE_FOR_ORDER_REQUEST:
          return { ...state, reInstatedOrderById: true };
      case types.REINSTATE_TOGGLE_FOR_ORDER_SUCCESS:
          return {
              ...state,
              reInstatedOrderById: false,
              deletedHighOrder: state.deletedHighOrder.filter(
                  (item) => item.orderId !== action.payload
                ),
                deletedMediumOrder: state.deletedMediumOrder.filter(
                  (item) => item.orderId !== action.payload
                ),
                deletedLowOrder: state.deletedLowOrder.filter(
                  (item) => item.orderId !== action.payload
                ),
           
          };
      case types.REINSTATE_TOGGLE_FOR_ORDER_FAILURE:
          return {
              ...state,
              reInstatedOrderById: false,
              reInstatedOrderByIdError: true,
          };

          case types.EMPTY_MORDERS_LIST:
            return {
              ...state,
              deletedHighOrder: [],
              deletedMediumOrder: [],
              deletedLowOrder: [],
             
            };


            case types.GET_COMPLETED_HIGH_ORDER_LIST_REQUEST:
              return { ...state, fetchingCompletedHighOrderList: true };
            case types.GET_COMPLETED_HIGH_ORDER_LIST_SUCCESS:
              return {
                ...state,
                fetchingCompletedHighOrderList: false,
                completedHighOrder: [
                  ...state.completedHighOrder,
                  ...action.payload]
              };
            case types.GET_COMPLETED_HIGH_ORDER_LIST_FAILURE:
              return {
                ...state,
                fetchingCompletedHighOrderList: false,
                fetchingCompletedHighOrderListError: true,
        
              };


              case types.GET_COMPLETED_MEDIUM_ORDER_LIST_REQUEST:
                return { ...state, fetchingCompletedMediumOrderList: true };
              case types.GET_COMPLETED_MEDIUM_ORDER_LIST_SUCCESS:
                return {
                  ...state,
                  fetchingCompletedMediumOrderList: false,
                  completedMediumOrder: [
                    ...state.completedMediumOrder,
                    ...action.payload]
                };
              case types.GET_COMPLETED_MEDIUM_ORDER_LIST_FAILURE:
                return {
                  ...state,
                  fetchingCompletedMediumOrderList: false,
                  fetchingCompletedMediumOrderListError: true,
          
                };


                case types.GET_COMPLETED_LOW_ORDER_LIST_REQUEST:
                  return { ...state, fetchingCompletedLowOrderList: true };
                case types.GET_COMPLETED_LOW_ORDER_LIST_SUCCESS:
                  return {
                    ...state,
                    fetchingCompletedLowOrderList: false,
                    completedLowOrder: [
                      ...state.completedLowOrder,
                      ...action.payload]
                  };
                case types.GET_COMPLETED_LOW_ORDER_LIST_FAILURE:
                  return {
                    ...state,
                    fetchingCompletedLowOrderList: false,
                    fetchingCompletedLowOrderListError: true,
            
                  };


                  case types.EMPTY_COMPLETE_ORDERS_LIST:
                    return {
                      ...state,
                      completedHighOrder: [],
                      completedMediumOrder: [],
                      completedLowOrder: [],
                    
                    };

                    case types.INPUT_ORDER_NO_SEARCH_REQUEST:
                      return { ...state, fetchingInputOrderNosrch: true };
                    case types.INPUT_ORDER_NO_SEARCH_SUCCESS:
                      return {
                        ...state,
                        fetchingInputOrderNosrch: false,
                        // allHighCompleteOrder: action.payload,
                        // allMediumCompleteOrder: action.payload,
                        // allLowCompleteOrder: action.payload,
                        // completedHighOrder:action.payload,
                        // completedMediumOrder:action.payload,
                        // completedLowOrder:action.payload,
                        orderSearch:action.payload,
                      };
                    case types.INPUT_ORDER_NO_SEARCH_FAILURE:
                      return { ...state, fetchingInputOrderNosrchError: true };   
                      
                      case types.HANDLE_CLAER_SEARCHED_ORDER:
                        return { ...state, 
                          // allHighCompleteOrder: [], 
                          // allMediumCompleteOrder: [],
                          // allLowCompleteOrder: [],
                          // completedHighOrder:[],
                          // completedMediumOrder:[],
                          // completedLowOrder:[],
                          orderSearch:[],
                        };

                        case types.GET_ECOM_LIST_REQUEST:
                          return { ...state, fetchingEcomList: true };
                        case types.GET_ECOM_LIST_SUCCESS:
                          return {
                            ...state,
                            fetchingEcomList: false,
                            ecomList: [
                              ...state.ecomList,
                              ...action.payload]
                          };
                        case types.GET_ECOM_LIST_FAILURE:
                          return {
                            ...state,
                            fetchingEcomList: false,
                            fetchingEcomListError: true,
                          };     
                          
                          case types.GET_ECOM_STATUS_ITEM_REQUEST:
                            return { ...state, fetchingEcomStatusItem: true };
                          case types.GET_ECOM_STATUS_ITEM_SUCCESS:
                            return {
                              ...state,
                              fetchingEcomStatusItem: false,
                              statusEcomItems: action.payload,
                            };
                          case types.GET_ECOM_STATUS_ITEM_FAILURE:
                            return {
                              ...state,
                              fetchingEcomStatusItem: false,
                              fetchingEcomStatusItemError: true,
                            };  
                            

                            case types.GET_PROCURE_ORDER_DETAILS_REQUEST:
                              return { ...state, fetchingProcureOrderDetails: true };
                            case types.GET_PROCURE_ORDER_DETAILS_SUCCESS:
                              return {
                                ...state,
                                fetchingProcureOrderDetails: false,
                                orderProcureDetails: action.payload,
                              };
                            case types.GET_PROCURE_ORDER_DETAILS_FAILURE:
                              return {
                                ...state,
                                fetchingProcureOrderDetails: false,
                                fetchingProcureOrderDetailsError: true,
                              };

                              case types.GET_ORDR_SUPLR_DETAILS_REQUEST:
                                return { ...state, fetchingOrdrSuplrDetails: true };
                              case types.GET_ORDR_SUPLR_DETAILS_SUCCESS:
                                return {
                                  ...state,
                                  fetchingOrdrSuplrDetails: false,
                                  ordrSuplrItem: action.payload,
                                };
                              case types.GET_ORDR_SUPLR_DETAILS_FAILURE:
                                return {
                                  ...state,
                                  fetchingOrdrSuplrDetails: false,
                                  fetchingOrdrSuplrDetailsError: true,
                                };
                          
                            
    case types.HANDLE_ITEM_VIEW_DRAWER:
      return { ...state, viewItemDrwr: action.payload };
    
    default:
      return state;
  }
};