import * as types from "./TradeActionType";
import dayjs from "dayjs";

const initialState = {
    viewType: "table",

    fetchingTradeSearchData:false,
    fetchingTradeSearchDataError:false,

    fetchingInventoryAlllist: false,
    fetchingInventoryAlllistError: false,
    inventoryAllList:[],

  };

  export const tradeReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_TRADE_VIEW_TYPE:
            return { ...state, viewType: action.payload };

            case types.GET_SEARCH_TRADE_REQUEST:
              return { ...state, fetchingTradeSearchData: true };
            case types.GET_SEARCH_TRADE_SUCCESS:
              return {
                ...state,
                fetchingTradeSearchData: false,
                orderPhoneList: action.payload,
               
              };
            case types.GET_SEARCH_TRADE_FAILURE:
              return { ...state, fetchingTradeSearchDataError: true };
      
              case types.HANDLE_CLAER_REDUCER_DATA_TRADE:
                        return { ...state, 
                          orderPhoneList: [], 
                        };
                        case types.GET_INVENTORYALLLIST_REQUEST:
                          return { ...state, fetchingInventoryAlllist: true };
                        case types.GET_INVENTORYALLLIST_SUCCESS:
                          return {
                            ...state,
                            fetchingInventoryAlllist: false,
                            inventoryAllList: action.payload,
                          };
                        case types.GET_INVENTORYALLLIST_FAILURE:
                          return {
                            ...state,
                            fetchingInventoryAlllist: false,
                            fetchingInventoryAlllistError: true,
                          };
    
  
      default:
        return state;
    }
  };
