import * as types from "./DealActionType";
import dayjs from "dayjs";

const initialState = {
  viewType: "table",

  dealsByuserId:[],
  fetchingDeal: false,
  fetchingDealError:false,

  creatingDeal: false,
  creatingDealError: false,
  opencreateDealModal: false,

  fetchDealdetails: false,
  fetchDealdetailsError:false,
  dealDetailsbyID:{},

  updateDealbyID: false,
  updateDealbyIDError: false,
  openupdateDealModal:false,
};
export const dealReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DEAL_VIEW_TYPE:
      return { ...state, viewType: action.payload };

      case types.GET_DEAL_REQUEST:
        return { ...state, fetchingDeal: true };
      case types.GET_DEAL_SUCCESS:
        return {
          ...state,
          fetchingDeal: false,
          dealsByuserId: [...state.dealsByuserId,...action.payload],
        };
      case types.GET_DEAL_FAILURE:
        return {
          ...state,
          fetchingDeal: false,
          fetchingDealError: true,
        };

        case types.CREATE_DEAL_REQUEST:
          return { ...state, creatingDeal: true };
        case types.CREATE_DEAL_SUCCESS:
          return {
            ...state,
            creatingDeal: false,
            opencreateDealModal: false,
           dealsByuserId :[action.payload,...state.dealsByuserId]
          };
        case types.CREATE_DEAL_FAILURE:
          return {
            ...state,
            creatingDeal: false,
            creatingDealError: true,
          };
          case types.HANDLE_DEAL_MODAL:
            return { ...state, opencreateDealModal: action.payload };

            case types.GET_DEAL_DETAILS_BY_ID_REQUEST:
              return { ...state, fetchDealdetails: true };
            case types.GET_DEAL_DETAILS_BY_ID_SUCCESS:
              return {
                ...state,
                fetchDealdetails: false,
                dealDetailsbyID: action.payload,
              };
            case types.GET_DEAL_DETAILS_BY_ID_FAILURE:
              return {
                ...state,
                fetchDealdetails: false,
                fetchDealdetailsError: true,
              };
      
              case types.UPDATE_DEAL_BY_ID_REQUEST:
                return { ...state, updateDealbyID: true };
              case types.UPDATE_DEAL_BY_ID_SUCCESS:
                return {
                  ...state,
                  updateDealbyID: false,
                  openupdateDealModal: false,
                  dealsByuserId: state.dealsByuserId.map((item) => {
                    if (item.invOpportunityId === action.payload.invOpportunityId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.UPDATE_DEAL_BY_ID_FAILURE:
                return {
                  ...state,
                  updateDealbyID: false,
                  updateDealbyIDError: true,
                };      
      
                case types.HANDLE_UPDATE_DEAL_MODAL:
                  return { ...state, openupdateDealModal: action.payload };
                   
    default:
      return state;
  }
};
