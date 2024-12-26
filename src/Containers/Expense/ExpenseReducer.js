import * as types from "./ExpenseActionType";

const initialState = {
  addExpenseModal: false,
  addingExpense: false,
  addingExpenseError: false,

  fetchingExpenseById: false,
  fetchingExpenseByIdError: false,
  Expenses: [],

  fetchingExpenseByOrgId: false,
  fetchingExpenseByOrgIdError: false,
  fetchingExpOrgId: {},

  setEditingExpense:{},
  updateExpenseModal: false,
  expenseById:[],

  updateExpense:false,
  updateExpenseError:false,

  fetchingExpenseByVoucherId: false,
  fetchingExpenseByVoucherIdError: false,
  expVoucherId: [],

  deleteExpense: false,
  deleteExpenseError: false,

  fetchingExpenseStatus: false,
  fetchingExpenseStatusError: false,
  expenseStatus:[],

  documentUploadModal: false,

  updateStatusExpenseModal:false,

  addingDocumentByExpenseId: false,
  addingDocumentByExpenseIdError: false,

  fetchingDocumentsByExpenseId: false,
  fetchingDocumentsByExpenseIdError: false,
  documentsByExpenseId:[],

  expenseVoucherIdDrawer:false,
  viewType:"card",

  pexpenseVoucherIdDrawer:false,

  fetchingExpenseSearchedList: false,
  fetchingExpenseSearchedListError: false,

};

export const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_EXPENSE_MODAL:
      return { ...state, addExpenseModal: action.payload };
    case types.ADD_EXPENSE_REQUEST:
      return { ...state, addingExpense: true };
    case types.ADD_EXPENSE_SUCCESS:
      return { ...state, addingExpense: false, addExpenseModal: false };
    case types.ADD_EXPENSE_FAILURE:
      return { ...state, addingExpense: false, addingExpenseError: true };

    case types.GET_EXPENSE_BY_USER_ID_REQUEST:
      return { ...state, fetchingExpenseById: true };
    case types.GET_EXPENSE_BY_USER_ID_SUCCESS:
      return { ...state, fetchingExpenseById: false, Expenses: action.payload };
    case types.GET_EXPENSE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingExpenseById: false,
        fetchingExpenseByIdError: true,
      };

    case types.GET_EXPENSE_BY_ORGID_REQUEST:
      return { ...state, fetchingExpenseByOrgId: true };
    case types.GET_EXPENSE_BY_ORGID_SUCCESS:
      return { ...state, fetchingExpenseByOrgId: false };
    case types.GET_EXPENSE_BY_ORGID_FAILURE:
      return {
        ...state,
        fetchingExpenseByOrgId: false,
        fetchingExpenseByOrgIdError: true,
      };

    case types.GET_EXPENSE_BY_VOUCHER_ID_REQUEST:
      return { ...state, fetchingExpenseByVoucherId: true };
    case types.GET_EXPENSE_BY_VOUCHER_ID_SUCCESS:
      return {
        ...state,
        fetchingExpenseByVoucherId: false,
        expVoucherId: action.payload,
      };
    case types.GET_EXPENSE_BY_VOUCHER_ID_FAILURE:
      return {
        ...state,
        fetchingExpenseByVoucherId: false,
        fetchingExpenseByVoucherIdError: true,
      };
      case types.SET_EXPENSE_EDIT:
        return { ...state, setEditingExpense: action.payload };

        case types.HANDLE_UPDATE_EXPENSE_MODAL:
          return { ...state, updateExpenseModal: action.payload };

          case types.UPDATE_EXPENSE_REQUEST:
            return { ...state, updateExpense: true };
          case types.UPDATE_EXPENSE_SUCCESS:
            return {
              ...state,
              updateExpense: false,
              updateExpenseModal: false,
              expenseById: state.expenseById.map((item) => {
                if (item.expenseId === action.payload.expenseId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
              // Expenses: state.Expenses.map((item) => {
              //   if (item.amount === action.payload.amount) {
              //     return action.payload;
              //   } else {
              //     return item;
              //   }
              // }),
              // Expenses: action.payload
            };
          case types.UPDATE_EXPENSE_FAILURE:
            return {
              ...state,
              updateExpense: false,
              updateExpenseError: true,
            };

            case types.DELETE_EXPENSE_REQUEST:
              return { ...state, deleteExpense: true };
            case types.DELETE_EXPENSE_SUCCESS:
              return {
                ...state,
                deleteExpense: false,
                expVoucherId: state.expVoucherId.filter(
                  (item) => item.voucherId !== action.payload
                ),
              };
            case types.DELETE_EXPENSE_FAILURE:
              return { ...state, deleteExpense: false, deleteExpenseError: false };
        


              case types.DELETE_EXPENSE_DRAWER_REQUEST:
                return { ...state, deleteExpense: true };
              case types.DELETE_EXPENSE_DRAWER_SUCCESS:
                return {
                  ...state,
                  deleteExpense: false,
                  expVoucherId: state.expVoucherId.filter(
                    (item) => item.expenseId !== action.payload
                  ),
                };
              case types.DELETE_EXPENSE_DRAWER_FAILURE:
                return { ...state, deleteExpense: false, deleteExpenseError: false };


  //document
  case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
    return { ...state, documentUploadModal: action.payload };

  /* add/link Expense document */
  case types.ADD_EXPENSE_DOCUMENT_REQUEST:
    return {
      ...state,
      addingDocumentByExpenseId: true,
      addingDocumentByExpenseIdError: false,
    };
  case types.ADD_EXPENSE_DOCUMENT_SUCCESS:
    return {
      ...state,
      addingDocumentByExpenseId: false,
      addingDocumentByExpenseIdError: false,
      documentUploadModal: false,
    };
  case types.ADD_EXPENSE_DOCUMENT_FAILURE:
    return {
      ...state,
      addingDocumentByExpenseId: false,
      addingDocumentByExpenseIdError: true,
      documentUploadModal: false,
    };
  /**
   * get list of documents of a Expense
   */
  case types.GET_EXPENSE_DOCUMENTS_REQUEST:
    return {
      ...state,
      fetchingDocumentsByExpenseId: true,
      fetchingDocumentsByExpenseIdError: false,
    };
  case types.GET_EXPENSE_DOCUMENTS_SUCCESS:
    return {
      ...state,
      fetchingDocumentsByExpenseId: false,
      fetchingDocumentsByExpenseIdError: false,
      documentsByExpenseId: action.payload,
    };
  case types.GET_EXPENSE_DOCUMENTS_FAILURE:
    return {
      ...state,
      fetchingDocumentsByExpenseId: false,
      fetchingDocumentsByExpenseIdError: true,
    };

    case types.HANDLE_EXPENSE_VOUCHERID_DRAWER:
      return {...state,expenseVoucherIdDrawer:action.payload}

      case types.SET_EXPENSE_VIEW_TYPE:
        return { ...state, viewType: action.payload };

              case types.HANDLE_STATUS_EXPENSE_MODAL:
                return { ...state, updateStatusExpenseModal: action.payload };


                case types.GET_EXPENSE_STATUS_BY_EXPENSEID_REQUEST:
                  return { ...state, fetchingExpenseStatus: true };
              case types.GET_EXPENSE_STATUS_BY_EXPENSEID_SUCCESS:
                  return {
                      ...state,
                      fetchingExpenseStatus: false,
                      expenseStatus: action.payload,
                  };
              case types.GET_EXPENSE_STATUS_BY_EXPENSEID_FAILURE:
                  return {
                      ...state,
                      fetchingExpenseStatus: false,
                      fetchingExpenseStatusError: true,
                  };
                 
                  case types.HANDLE_PEXPENSE_VOUCHERID_DRAWER:
                    return {...state,pexpenseVoucherIdDrawer:action.payload}
    
                    case types.SEARCH_EXPENSE_LIST_REQUEST:
                      return { ...state, fetchingExpenseSearchedList: true };
                    case types.SEARCH_EXPENSE_LIST_SUCCESS:
                      return {
                        ...state,
                        fetchingExpenseSearchedList: false,
                        Expenses: action.payload,
                        
                      };
                    case types.SEARCH_EXPENSE_LIST_FAILURE:
                      return { ...state, fetchingExpenseSearchedListError: true };
    
                    default:
  return state;
    }
};
