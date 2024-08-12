import * as types from "./InvoiceActionTypes";
import dayjs from "dayjs";

const initialState = {
  viewType: "table",

  addInvoiceModal:false,

  fetchingInvoiceData: false,
  fetchingInvoiceDataError: false,
  invoiceList:[],

  updatingInvoiceData: false,
  updatingInvoiceDataError: false,

  fetchingCandidateTotalBillingForInvoice: false,
  fetchingCandidateTotalBillingForInvoiceError: false,
  candidateTotalBillingForInvoice:[],
};
export const invoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CANDIDATE_TOTAL_BILLING_FOR_INVOICE_REQUEST:
      return { ...state, fetchingCandidateTotalBillingForInvoice: true };
    case types.GET_CANDIDATE_TOTAL_BILLING_FOR_INVOICE_SUCCESS:
      return {
        ...state,
        fetchingCandidateTotalBillingForInvoice: false,
        candidateTotalBillingForInvoice: action.payload,
      };
    case types.GET_CANDIDATE_TOTAL_BILLING_FOR_INVOICE_FAILURE:
      return {
        ...state,
        fetchingCandidateTotalBillingForInvoice: false,
        fetchingCandidateTotalBillingForInvoiceError: true,
      };
      case types.SET_INVOICE_VIEW_TYPE:
        return {
            ...state,
            viewType: action.payload,
          
        };

        case types.HANDLE_INVOICE_MODAL:
          return { ...state, addInvoiceModal: action.payload,
            candidateTotalBillingForInvoice:[],
           };


          case types.UPDATE_INVOICE_DATA_REQUEST:
            return {
              ...state, updatingInvoiceData: true,
            };
          case types.UPDATE_INVOICE_DATA_SUCCESS:
            return {
              ...state,
              updatingInvoiceData: false,
              // addSupplierForAnalysis: false,
            };
          case types.UPDATE_INVOICE_DATA_FAILURE:
            return {
              ...state,
              updatingInvoiceData: false,
              updatingInvoiceDataError: true,
              // addSupplierForAnalysis: false,
            };
 

            case types.GET_INVOICE_REQUEST:
              return { ...state, fetchingInvoiceData: true };
            case types.GET_INVOICE_SUCCESS:
              return {
                ...state,
                fetchingInvoiceData: false,
                invoiceList: action.payload,
              };
            case types.GET_INVOICE_FAILURE:
              return {
                ...state,
                fetchingInvoiceData: false,
                fetchingInvoiceDataError: true,
              };

    default:
      return state;
  }
};
