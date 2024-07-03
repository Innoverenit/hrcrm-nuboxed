import * as types from "./InvestorListActionType";
import dayjs from "dayjs";

const initialState = {

  fetchingInvestorList: false,
  fetchingInvestorListError: false,
  investorListData: [],

  addingInvestorImportForm: false,
  addingInvestorImportFormError: false,

  addInvestorImportModal:false,

  addingInvestorData: false,
  addingInvestorDataError: false,
  duplicateInvestorDataError:false,

  removingInvestor: false,
  removingInvestorError: false,

  fetchingInvestorCount: false,
  fetchingInvestorCountError: false,
  investorCount:{},

  updatingInvestor: false,
  updatingInvestorError: false,

     fetchingCustomerearchData:false,
     fetchingCustomerearchDataError:false,
   
};

export const investorListReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_INVESTOR_LIST_REQUEST:
    return { ...state,  fetchingInvestorList: true };
  case types.GET_INVESTOR_LIST_SUCCESS:
    return {
      ...state,
      fetchingInvestorList: false,
       investorListData: action.payload,
    };
  case types.GET_INVESTOR_LIST_FAILURE:
    return {
      ...state,
      fetchingInvestorList: false,
      fetchingInvestorListError: true,
    };

 // add sector

//  case types.ADD_INVESTOR_DATA_REQUEST:
//     return { ...state,  addingInvestorData: true };
//   case types.ADD_INVESTOR_DATA_SUCCESS:
//     return {
//       ...state,
//       addingInvestorData: false,
//       investorListData:[action.payload,...state.investorListData]
//       // investorListData: [...state.investorListData, action.payload],
      
//     };
//   case types.ADD_INVESTOR_DATA_FAILURE:
//     return {
//       ...state,
//       addingInvestorData: false,
//       addingInvestorDataError: true,
//     };




case types.ADD_INVESTOR_DATA_REQUEST:
  return { ...state, addingInvestorData: true };

case types.ADD_INVESTOR_DATA_SUCCESS:
  return {
    ...state,
    addingInvestorData: false,
    investorListData: [action.payload, ...state.investorListData],
  };

case types.ADD_INVESTOR_DATA_FAILURE:
  return {
    ...state,
    addingInvestorData: false,
    addingInvestorDataError: true,
  };

case types.ADD_INVESTOR_DATA_DUPLICATE:
  return {
    ...state,
    addingInvestorData: false,
    duplicateInvestorDataError: true,
  };


   

     // remove sector

     case types.REMOVE_INVESTOR_REQUEST:
        return { ...state,  removingInvestor: true };
      case types.REMOVE_INVESTOR_SUCCESS:
        return {
          ...state,
          removingInvestor: false,
          investorListData: state.investorListData.filter(
            (item) => item.investorCategoryId !== action.payload
        ), 
        };
      case types.REMOVE_INVESTOR_FAILURE:
        return {
          ...state,
          removingInvestor: false,
          removingInvestorError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_INVESTOR_REQUEST:
        return { ...state,   updatingInvestor: true };
      case types.UPDATE_INVESTOR_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingInvestor: false,
          investorListData: state.investorListData.map((sector) =>
            sector.investorCategoryId === action.payload.investorCategoryId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_INVESTOR_FAILURE:
        return {
          ...state,
          updatingInvestor: false,
          updatingInvestorError: true,
        };

        case types.GET_CUSTOMER_SEARCH_REQUEST:
          return { ...state,  fetchingCustomerearchData: true };
        case types.GET_CUSTOMER_SEARCH_SUCCESS:
          return {
            ...state,
             fetchingCustomerearchData: false,
             customerListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_CUSTOMER_SEARCH_FAILURE:
          return { ...state,  fetchingInvestorTypeInputSearchData: true };


          case types.GET_INVESTORTYPE_SEARCH_REQUEST:
            return { ...state, fetchingInvestorTypeInputSearchData: true };
          case types.GET_INVESTORTYPE_SEARCH_SUCCESS:
            return {
              ...state,
              fetchingInvestorTypeInputSearchData: false,
              investorListData: action.payload,
              // serachedData: action.payload,
            };
          case types.GET_INVESTORTYPE_SEARCH_FAILURE:
            return { ...state, fetchingInvestorTypeInputSearchDataError: true };

            case types.HANDLE_CLAER_REDUCER_DATA_INVESTORTYPE:
              return { ...state, 
                investorListData: [], 
                // deletedTruck: [] 
              }; 
              
              
              case types.GET_INVESTOR_COUNT_REQUEST:
              return { ...state, fetchingInvestorCount: true };
            case types.GET_INVESTOR_COUNT_SUCCESS:
              return { ...state, fetchingInvestorCount: false, 
                investorCount: action.payload };
            case types.GET_INVESTOR_COUNT_FAILURE:
              return {
                ...state,
                fetchingInvestorCount: false,
                fetchingInvestorCountError: true,
              };


              case types.HANDLE_INVESTOR_IMPORT_MODAL:
                return { ...state, addInvestorImportModal: action.payload };


                
      case types.ADD_INVESTOR_IMPORT_FORM_REQUEST:
        return { ...state, addingInvestorImportForm: true };
      case types.ADD_INVESTOR_IMPORT_FORM_SUCCESS:
        return {
          ...state,
          addingInvestorImportForm: false,
          addInvestorImportModal: false,
  
        };
      case types.ADD_INVESTOR_IMPORT_FORM_FAILURE:
        return {
          ...state, addingInvestorImportForm: false,
          // addCustomerModal: false 
        };
          
    
    default:
        return state;
    }
  };