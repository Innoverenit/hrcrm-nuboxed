import * as types from "./ContactInvestActionType";
import moment from "moment";
const initialState = {
    viewType:"card",

    addingContactInvest: false, 
    addContactInvestModal: false,

    addDrawerContactInvestNotesModal:false,

    fetchingInvestorContactSearchData:false,
    fetchingInvestorContactSearchDataError:false,

    fetchingFilterContactsInvest: false,
    fetchingFilterContactsInvestError: false,

    fetchingContactsInvest: false,
    fetchingContactsInvestError: false,
    contactiNVESTbyId:[],

    fetchingContactInvestRecords: false,
            fetchingContactInvestRecordsError: true,
            contactInvest:[],

    updateContactInvestModal:false,
    updateContactInvestById: false,

    fetchingContactInvestByContactId: false,
   fetchingContactInvestByContactIdError: false,
   contactInVestDetail:{},

  };

export const contactInvestReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_CONTACT_INVEST_VIEW_TYPE:
        return { ...state, viewType: action.payload };

    case types.HANDLE_CONTACT_INVEST_MODAL:
        return { ...state, addContactInvestModal: action.payload };
        
    case types.ADD_CONTACT_INVEST_REQUEST:
      return { ...state, addingContactInvest: true };
    case types.ADD_CONTACT_INVEST_SUCCESS:
      return { ...state, addingContactInvest: false, 
        addingContactInvest: false,
        addContactInvestModal:false,
        contactiNVESTbyId:[action.payload,...state.contactiNVESTbyId]
       };
    case types.ADD_CONTACT_INVEST_FAILURE:
      return { ...state, addingContactInvest: false, addContactInvestModal: false };

      case types.GET_CONTACTS_INVEST_REQUEST:
        return { ...state, fetchingContactsInvest: true };
      case types.GET_CONTACTS_INVEST_SUCCESS:
        return {
          ...state,
          fetchingContactsInvest: false,
          contactiNVESTbyId: [
            ...state.contactiNVESTbyId,
            ...action.payload],
        };
      case types.GET_CONTACTS_INVEST_FAILURE:
        return { ...state, fetchingContactsInvest: false, fetchingContactsInvestError: true };


        case types.GET_CONTACTS_INVEST_FILTER_DATA_REQUEST:
          return { ...state, fetchingFilterContactsInvest: true };
        case types.GET_CONTACTS_INVEST_FILTER_DATA_SUCCESS:
          return {
            ...state,
            fetchingFilterContactsInvest: false,
            contactiNVESTbyId: action.payload,
            // contactiNVESTbyId: [
            //   ...state.contactiNVESTbyId,
            //   ...action.payload],
          };
        case types.GET_CONTACTS_INVEST_FILTER_DATA_FAILURE:
          return { ...state, fetchingFilterContactsInvest: false,
                             fetchingFilterContactsInvestError: true };

        case types.EMPTY_CONTACT_INVEST_LIST:
            return { ...state, contactiNVESTbyId:[] };
    
            case types.HANDLE_UPDATE_CONTACT_INVEST_MODAL:
            return {...state, updateContactInvestModal: action.payload}

    case types.UPDATE_CONTACT_INVEST_REQUEST:
      return { ...state, updateContactInvestById: true };
    case types.UPDATE_CONTACT_INVEST_SUCCESS:
      return {
        ...state,
        updateContactInvestById: false,
        updateContactInvestModal: false,
        contactiNVESTbyId: state.contactiNVESTbyId.map((item) => {
          if (item.contactId === action.payload.contactId) {
            return action.payload;
          } else {
            return item;
          }}),};
    case types.UPDATE_CONTACT_INVEST_FAILURE:
      return {
        ...state,
        updateContactInvestById: false,
        updateContactInvestByIdError: true,
      };

      case types.GET_CONTACT_INVEST_BY_CONTACT_ID_REQUEST:
        return { ...state, fetchingContactInvestByContactId: true };
      case types.GET_CONTACT_INVEST_BY_CONTACT_ID_SUCCESS:
        return {
          ...state,
          fetchingContactInvestByContactId: false,
          contactInVestDetail: action.payload,
        };
      case types.GET_CONTACT_INVEST_BY_CONTACT_ID_FAILURE:
        return {
          ...state,
          fetchingContactInvestByContactId: false,
          fetchingContactInvestByContactIdError: true,
        }; 

        case types.GET_CONTACTINVEST_RECORDS_REQUEST:
          return { ...state, fetchingContactInvestRecords: true };
        case types.GET_CONTACTINVEST_RECORDS_SUCCESS:
          return {
            ...state,
            fetchingContactInvestRecords: false,
            contactInvest: action.payload,
          };
        case types.GET_CONTACTINVEST_RECORDS_FAILURE:
          return {
            ...state,
            fetchingContactInvestRecords: false,
            fetchingContactInvestRecordsError: true,
          };


          case types.GET_INVESTOR_CONTACT_SEARCH_REQUEST:
            return { ...state, fetchingInvestorContactSearchData: true };
          case types.GET_INVESTOR_CONTACT_SEARCH_SUCCESS:
            return {
              ...state,
              fetchingInvestorContactSearchData: false,
              contactiNVESTbyId: action.payload,
              // serachedData: action.payload,
            };
          case types.GET_INVESTOR_CONTACT_SEARCH_FAILURE:
            return { ...state, fetchingInvestorContactSearchDataError: true };
      

            case types.HANDLE_CONTACT_INVEST_NOTES_DRAWER_MODAL:
              return { ...state, addDrawerContactInvestNotesModal: action.payload };


  
   
      default:
      return state;
  }
};

const newDateRange = (dateRange, newDate) =>
    dateRange.map((range) => {
        if (range.id === newDate.id) {
            return { ...range, isSelected: true };
        } else {
            return { ...range, isSelected: false };
        }
    });
