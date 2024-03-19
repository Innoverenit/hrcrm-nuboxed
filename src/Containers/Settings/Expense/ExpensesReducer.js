import * as types from "./ExpenseActionTypes";
import dayjs from "dayjs";

const initialState = {
  fetchingExpenses: false,
  fetchingExpensesError: false,
  expenses: [],


  fetchingExpenseCount: false,
  fetchingExpenseCountError: false,
  expenseCount:{},

  addingExpenses: false,
  addingExpensesError: false,

  // removingSectors: false,
  // removingSectorsError: false,

  updatingExpenses: false,
  updatingExpensesError: false,

  removingExpenses: false,
  removingExpensesError: false,
};

export const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EXPENSE_REQUEST:
      return { ...state, fetchingExpenses: true };
    case types.GET_EXPENSE_SUCCESS:
      return {
        ...state,
        fetchingExpenses: false,
        expenses: action.payload,
      };
    case types.GET_EXPENSE_FAILURE:
      return {
        ...state,
        fetchingExpenses: false,
        fetchingExpensesError: true,
      };

    case types.ADD_EXPENSE_REQUEST:
      return { ...state, addingExpenses: true };
    case types.ADD_EXPENSE_SUCCESS:
      return {
        ...state,
        addingExpenses: false,
        expenses: [...state.expenses, action.payload],
      };
    case types.ADD_EXPENSE_FAILURE:
      return {
        ...state,
        addingExpenses: false,
        addingExpensesError: true,
      };

    case types.UPDATE_EXPENSE_REQUEST:
      return { ...state, updatingExpenses: true };
    case types.UPDATE_EXPENSE_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingExpenses: false,
        expenses: state.expenses.map((expense) =>
          expense.expenseTypeId === action.payload.expenseTypeId
            ? action.payload
            : expense
        ),
      };
    case types.UPDATE_EXPENSE_FAILURE:
      return {
        ...state,
        updatingExpenses: false,
        updatingExpensesError: true,
      };
    case types.GET_EXPENSE_SEARCH_REQUEST:
      return { ...state, fetchingDocumentSearchData: true };
    case types.GET_EXPENSE_SEARCH_SUCCESS:
      return {
        ...state,
        fetchingDocumentSearchData: false,
        expenses: action.payload,
      };
    case types.GET_EXPENSE_SEARCH_FAILURE:
      return { ...state, fetchingDocumentSearchDataError: true };

    case types.REMOVE_EXPENSE_REQUEST:
      return { ...state, removingExpenses: true };
    case types.REMOVE_EXPENSE_SUCCESS:
      return {
        ...state,
        removingExpenses: false,
        expenses: state.expenses.filter(
          (item) => item.expenseTypeId !== action.payload
        ),
      };
    case types.REMOVE_EXPENSE_FAILURE:
      return {
        ...state,
        removingExpenses: false,
        removingExpensesError: true,
      };

      case types.HANDLE_CLAER_REDUCER_DATA_EXPENSE:
        return { ...state, 
          expenses: [], 
          // deletedTruck: [] 
        };


        case types.GET_EXPENSE_COUNT_REQUEST:
          return { ...state, fetchingExpenseCount: true };
        case types.GET_EXPENSE_COUNT_SUCCESS:
          return { ...state, fetchingExpenseCount: false, 
            expenseCount: action.payload };
        case types.GET_EXPENSE_COUNT_FAILURE:
          return {
            ...state,
            fetchingExpenseCount: false,
            fetchingExpenseCountError: true,
          };

    default:
      return state;
  }
};
