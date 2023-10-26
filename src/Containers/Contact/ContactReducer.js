import * as types from "./ContactActionTypes";
import moment from "moment";


const initialState = {
  addContactModal: false,
  linkContactModal: false,
  addingContact: false,
  addingContactError: false,


  fetchingContactData:false,
  fetchingContactDataError:false,
  contactData:[],

  fetchingDelasContactData: false,
  fetchingDelasContactDataError: false,
  dealsContactData:[],

  fetchingVendorContactData: false,
  fetchingVendorContactDataError: false,
  vendorContactData:[],

  fetchingContacts: false,
  fetchingContactsError: false,
  contactByUserId: [],

  addDrawerContactModal:false,

  fetchingContactById: false,
  fetchingContactByIdError: false,
  contactById: [],

  fetchingAllContacts: false,
  fetchingAllContactsError: false,
  allcontactsByUserId: [],

  fetchingContactByContactId: false,
  fetchingContactByContactIdError: false,
  contact: {},

  documentUploadModal: false,

  addDrawerContactEmailModal:false,

  addingDocumentByContactId: false,
  addingDocumentByContactIdError: false,

  fetchingDocumentsByContactId: false,
  fetchingDocumentsByContactIdError: false,
  documentsByContactId: [],

  deleteDocument: false,
  deleteDocumentError: false,

  fetchingNotesListByContactId: false,
  fetchingNotesListByContactIdError: false,
  notesListByContactId: [],

  fetchingContactOpportunity: false,
  fetchingContactOpportunityError: false,
  opportunityByContactId: [],

  updateContactModal: false,

  linkingOpportunityContact:false,
  linkingOpportunityContactError:false,

  fetchingContactPagination:false,
  fetchingContactPaginationError:false,

  setEditingContact: {},

  updateContactById: false,
  updateContactByIdError: false,

  fetchingContactInputSearchData: false,
  fetchingContactInputSearchDataError: false,
  inputData: [],

  fetchingContactPartnerInputSearchData: false,
  fetchingContactPartnerInputSearchDataError: false,
  inputData: [],

  addingContactOpportunity: false,
  addingContactOpportunityError: false,
  addContactOpportunityModal: false,
  viewType: "table",

  fetchingContactsPartner: false,
  fetchingContactsPartnerError: false,
  contactPartnerByUserId: [],

  fetchingPartnerContactPagination:false,
  fetchingPartnerContactPaginationError:false,

  fetchingAllContactsPartner: false,
  fetchingAllContactsPartnerError: false,
  allcontactPartnerByUserId: [],
  startDate: moment().toISOString(),
  endDate: moment().startOf("month"). add(1, "days").toISOString(),
  dateStackedRangeList: [
    // {
    //   id: 1,
    //   type: "year",
    //   value: "FY",
    //   starter: true,
    //   isSelected: true,
    //   startDate: moment()
    //     .startOf("year")
    //     .toISOString(),
    //   endDate: moment()
    //     .endOf("year")
    //     .toISOString(),
    // },
    // {
    //     id: 1,
    //     type: "Today",
    //     value: "Today",
    //     starter: false,
    //     isSelected: true,
    //     startDate: moment()
    //         // .subtract(1, "days")
    //         .toISOString(),
    //     endDate: moment().toISOString(),
    // },
    // {
    //     id: 2,
    //     type: "Yesterday",
    //     value: "Yesterday",
    //     starter: false,
    //     isSelected: false,
    //     startDate: moment()
    //         .subtract(1, "days")

    //         .toISOString(),
    //     endDate: moment().toISOString(),
    // },
    // {
    //     id: 3,
    //     type: "Last7days",
    //     value: "Last 7 days",
    //     starter: false,
    //     isSelected: false,
    //     startDate: moment()
    //         .subtract(7, "days")

    //         .toISOString(),
    //     endDate: moment().toISOString(),
    // },

    // {
    //     id: 4,
    //     type: "Last30days",
    //     value: "Last 30 days",
    //     starter: false,
    //     isSelected: false,
    //     startDate: moment()
    //         .subtract(30, "days")

    //         .toISOString(),
    //     endDate: moment().toISOString(),
    // },
    {
        id: 5,
        type: "Thismonth",
        value: "This month",
        starter: true,
        isSelected: true,
        endDate: moment().startOf("month"). add(1, "days").toISOString(),
        startDate: moment().toISOString(),
        
    },
    {
        id: 6,
        type: "Lastmonth",
        value: "Last month",
        starter: false,
        isSelected: false,
        endDate: moment().startOf("month") .subtract(30, "days").toISOString(),
        startDate: moment().toISOString(),
        
    },
],

addingNotesByContactId:false,
  addingNotesByContactIdError:false,


  addingContactLinkByOpportunityId: false,

  //SHARE Contact Permission of partner
  addSharingContactPartner: false,
  addSharingContactPartnerError: false,

  addContactSpeechModal:false,

  //SHARE Contact Permission of customer
  addSharingContactCustomer: false,
  addSharingContactCustomerError: false,

  fetchingPermissionsListPartner: false,
  fetchingPermissionsListPartnerError: false,
  permissionsDataListPartner: [],

  fetchingPermissionsListCustomer: false,
  fetchingPermissionsListCustomerError: false,
  permissionsDataListContactCustomer: [],

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  fetchingCustomerRecordsByUserId:false,
  fetchingCustomerRecordsByUserIdError:false,
  customerRecordData:{},

  updatingContactOwenership:false,
  updatingContactOwenershipError:false,

  
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CONTACT_MODAL:
      return { ...state, addContactModal: action.payload };
    //opp modal
    case types.HANDLE_CONTACT_OPPORTUNITY_MODAL:
      return { ...state, addContactOpportunityModal: action.payload };
    case types.ADD_CONTACT_REQUEST:
      return { ...state, addingContact: true };
    case types.ADD_CONTACT_SUCCESS:
      return { ...state, addingContact: false, 
        addContactModal: false,
        contactByUserId:[action.payload,...state.contactByUserId]
       };
    case types.ADD_CONTACT_FAILURE:
      return { ...state, addingContact: false, addContactModal: false };


      case types.EMPTY_CONTACT_TABLE:
        return { ...state, contactByUserId:[] };

    case types.GET_CONTACTS_REQUEST:
      return { ...state, fetchingContacts: true };
    case types.GET_CONTACTS_SUCCESS:
      return {
        ...state,
        fetchingContacts: false,
        contactByUserId: [
          ...state.contactByUserId,
          ...action.payload],
      
      };
    case types.GET_CONTACTS_FAILURE:
      return { ...state, fetchingContacts: false, fetchingContactsError: true };

    case types.GET_CONTACT_BY_ID_REQUEST:
      return { ...state, fetchingContactById: true };
    case types.GET_CONTACT_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingContactById: false,
        contactById: action.payload,
      };
    case types.GET_CONTACT_BY_ID_FAILURE:
      return {
        ...state,
        fetchingContactById: false,
        fetchingContactByIdError: true,
      };

    //Contact Details.
    case types.GET_CONTACT_BY_CONTACT_ID_REQUEST:
      return { ...state, fetchingContactByContactId: true };
    case types.GET_CONTACT_BY_CONTACT_ID_SUCCESS:
      return {
        ...state,
        fetchingContactByContactId: false,
        contact: action.payload,
      };
    case types.GET_CONTACT_BY_CONTACT_ID_FAILURE:
      return {
        ...state,
        fetchingContactByContactId: false,
        fetchingContactByContactIdError: true,
      };

    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

      case types.HANDLE_CONTACT_REACT_SPEECH_MODAL:
        return { ...state, addContactSpeechModal: action.payload };

      case types.HANDLE_LINK_CONTACT_MODAL:
        return { ...state, linkContactModal: action.payload };

        case types.CHANGE_SELECTED_STACKED_TIME_INTERVAL_REPORT:
            return {
                ...state,
                dateStackedRangeList: newDateRange(state.dateStackedRangeList, action.payload),
                //isCustomSelected: false,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
            };

    /* add/link Contact document */
    case types.ADD_CONTACT_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByContactId: true,
        addingDocumentByContactIdError: false,
      };
    case types.ADD_CONTACT_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByContactId: false,
        addingDocumentByContactIdError: false,
      };
    case types.ADD_CONTACT_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByContactId: false,
        addingDocumentByContactIdError: true,
      };

    /**
     * get list of documents of a contact
     */
    case types.GET_CONTACT_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByContactId: true,
        fetchingDocumentsByContactIdError: false,
      };
    case types.GET_CONTACT_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByContactId: false,
        fetchingDocumentsByContactIdError: false,
        documentsByContactId: action.payload,
      };
    case types.GET_CONTACT_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByContactId: false,
        fetchingDocumentsByContactIdError: true,
      };

    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByContactId: state.documentsByContactId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    /**
     * Contact Notes
     */

    case types.GET_NOTES_LIST_BY_CONTACT_ID_REQUEST:
      return { ...state, fetchingNotesListByContactId: true };
    case types.GET_NOTES_LIST_BY_CONTACT_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByContactId: false,
        notesListByContactId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_CONTACT_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByContactId: false,
        fetchingNotesListByContactIdError: true,
      };

    /* Add a contact opportunity */
    case types.ADD_CONTACT_OPPORTUNITY_REQUEST:
      return { ...state, addingContactOpportunity: true };
    case types.ADD_CONTACT_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingContactOpportunity: false,
        addContactOpportunityModal: false,
        // clearbit: null,
      };
    case types.ADD_CONTACT_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingContactOpportunity: false,
        addingContactOpportunityError: true,
        addContactOpportunityModal: false,
      };
    //contact get opportunity
    case types.GET_CONTACT_OPPORTUNITY_REQUEST:
      return { ...state, fetchingContactOpportunity: true };
    case types.GET_CONTACT_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingContactOpportunity: false,
        opportunityByContactId: action.payload,
      };
    case types.GET_CONTACT_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingContactOpportunity: false,
        fetchingContactOpportunityError: true,
      };

    case types.HANDLE_UPDATE_CONTACT_MODAL:
      return { ...state, updateContactModal: action.payload };

    case types.SET_CONTACT_EDIT:
      return { ...state, setEditingContact: action.payload };

    case types.UPDATE_CONTACT_BY_ID_REQUEST:
      return { ...state, updateContactById: true };
    case types.UPDATE_CONTACT_BY_ID_SUCCESS:
      return {
        ...state,
        updateContactById: false,
        updateContactModal: false,
        contactByUserId: state.contactByUserId.map((item) => {
          if (item.contactId === action.payload.contactId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_CONTACT_BY_ID_FAILURE:
      return {
        ...state,
        updateContactById: false,
        updateContactByIdError: true,
      };

    //SEARCH
    case types.INPUT_CONTACT_SEARCH_DATA_REQUEST:
      return { ...state, fetchingContactInputSearchData: true };
    case types.INPUT_CONTACT_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingContactInputSearchData: false,
        contactByUserId: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_CONTACT_SEARCH_DATA_FAILURE:
      return { ...state, fetchingContactInputSearchDataError: true };

    //SEARCH
    case types.INPUT_CONTACT_PARTNER_SEARCH_DATA_REQUEST:
      return { ...state, fetchingContactPartnerInputSearchData: true };
    case types.INPUT_CONTACT_PARTNER_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingContactPartnerInputSearchData: false,
        contactPartner: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_CONTACT_PARTNER_SEARCH_DATA_FAILURE:
      return { ...state, fetchingContactPartnerInputSearchDataError: true };
    //header icons
    case types.SET_CUSTOMER_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_CONTACTS_PARTNER_REQUEST:
      return { ...state, fetchingContactsPartner: true };
    case types.GET_CONTACTS_PARTNER_SUCCESS:
      return {
        ...state,
        fetchingContactsPartner: false,
        
        contactPartnerByUserId: [
          ...state.contactPartnerByUserId,
          ...action.payload],
      
      
      };
    case types.GET_CONTACTS_PARTNER_FAILURE:
      return { ...state, fetchingContactsPartner: false, fetchingContactsPartnerError: true };

      case types.GET_ALL_CONTACTS_PARTNER_REQUEST:
        return { ...state, fetchingAllContactsPartner: true };
      case types.GET_ALL_CONTACTS_PARTNER_SUCCESS:
        return {
          ...state,
          fetchingAllContactsPartner: false,
          allcontactPartnerByUserId: action.payload,
        };
      case types.GET_ALL_CONTACTS_PARTNER_FAILURE:
        return { ...state, fetchingAllContactsPartner: false, fetchingAllContactsPartnerError: true };

    case types.ADD_LINK_CONTACT_BY_OPPORTUNITY_ID_REQUEST:
      return { ...state, addingContactLinkByOpportunityId: true };
    case types.ADD_LINK_CONTACT_BY_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        addingContactLinkByOpportunityId: false,
        addContactModal: false,
      };
    case types.ADD_LINK_CONTACT_BY_OPPORTUNITY_ID_FAILURE:
      return {
        ...state,
        addingContactLinkByOpportunityId: false,
        addContactModal: false,
      };

      case types.GET_PERMISSIONS_LIST_PARTNER_REQUEST:
        return { ...state, fetchingPermissionsListPartner: true };
      case types.GET_PERMISSIONS_LIST_PARTNER_SUCCESS:
        return {
          ...state,
          fetchingPermissionsListPartner: false,
          permissionsDataListPartner: action.payload,
        };
      case types.GET_PERMISSIONS_LIST_PARTNER_FAILURE:
        return {
          ...state,
          fetchingPermissionsListPartner: false,
          fetchingPermissionsListPartnerError: false,
        };


        case types.GET_PERMISSIONS_LIST_CUSTOMER_REQUEST:
          return { ...state, fetchingPermissionsListCustomer: true };
        case types.GET_PERMISSIONS_LIST_CUSTOMER_SUCCESS:
          return {
            ...state,
            fetchingPermissionsListCustomer: false,
            permissionsDataListContactCustomer: action.payload,
          };
        case types.GET_PERMISSIONS_LIST_CUSTOMER_FAILURE:
          return {
            ...state,
            fetchingPermissionsListCustomer: false,
            fetchingPermissionsListCustomerError: false,
          };
  
    //SHARE Contact partner Permissiom
    case types.ADD_SHARE_CONTACT_PARTNER_PERMISSION_REQUEST:
      return { ...state, addSharingContactPartner: true };

    case types.ADD_SHARE_CONTACT_PARTNER_PERMISSION_SUCCESS:
      return { ...state, addSharingContactPartner: false, contactPartnerByUserId: action.payload };

    case types.ADD_SHARE_CONTACT_PARTNER_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingContactPartner: false,
        addSharingContactPartnerError: true,
      };


    //SHARE Contact Customer Permissiom
    case types.ADD_SHARE_CONTACT_CUSTOMER_PERMISSION_REQUEST:
      return { ...state, addSharingContactCustomer: true };

    case types.ADD_SHARE_CONTACT_CUSTOMER_PERMISSION_SUCCESS:
      return { ...state, addSharingContactCustomer: false, contactByUserId: action.payload };

    case types.ADD_SHARE_CONTACT_CUSTOMER_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingContactCustomer: false,
        addSharingContactCustomerError: true,
      };

      case types.GET_ALL_CONTACTS_REQUEST:
        return { ...state, fetchingAllContacts: true };
      case types.GET_ALL_CONTACTS_SUCCESS:
        return {
          ...state,
          fetchingAllContacts: false,
          allcontactsByUserId: action.payload,
        };
      case types.GET_ALL_CONTACTS_FAILURE:
        return {
          ...state,
          fetchingAllContacts: false,
          fetchingAllContactsError: true,
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


          case types.GET_CUSTOMER_RECORDS_REQUEST:
            return { ...state, fetchingCustomerRecordsByUserId: true };
          case types.GET_CUSTOMER_RECORDS_SUCCESS:
            return {
              ...state,
              fetchingCustomerRecordsByUserId: false,
              customerRecordData: action.payload,
            };
          case types.GET_CUSTOMER_RECORDS_FAILURE:
            return {
              ...state,
              fetchingCustomerRecordsByUserId: false,
              fetchingCustomerRecordsByUserIdError: true,
            };

            case types.LINK_OPPORTUNITY_CONTACT_REQUEST:
              return { ...state, linkingOpportunityContact: true };
            case types.LINK_OPPORTUNITY_CONTACT_SUCCESS:
              return { ...state, linkingOpportunityContact: false,linkContactModal:false };
            case types.LINK_OPPORTUNITY_CONTACT_FAILURE:
              return { ...state, linkingOpportunityContact: false,linkContactModal:false };

         
              case types.UPDATE_CONTACT_OWNERSHIP_REQUEST:
                return { ...state, updatingContactOwenership: true };
              case types.UPDATE_CONTACT_OWNERSHIP_SUCCESS:
                return {
                  ...state,
                  updatingContactOwenership: false,
                  // updateCandidateEmploymentModal: false,
                  employmentDetails: state.employmentDetails.map((employment, i) => {
                    if (employment.id === action.payload.id) {
                      return action.payload;
                    } else {
                      return employment;
                    }
                  }),
                };
              case types.UPDATE_CONTACT_OWNERSHIP_SUCCESS:
                return {
                  ...state,
                  updatingContactOwenership: false,
                  updatingContactOwenershipError: true,
                };

                case types.ADD_CONTACT_NOTES_REQUEST:
                  return {
                    ...state,
                    addingNotesByContactId: true,          
                  };
                case types.ADD_CONTACT_NOTES_SUCCESS:
                  return {
                    ...state,
                    addingNotesByContactId: false,
                    addingNotesByContactId: false,
                    addContactSpeechModal:false,
                  };
                case types.ADD_CONTACT_NOTES_FAILURE:
                  return {
                    ...state,
                    addingNotesByContactId: false,
                    addingNotesByContactIdError: true,
                  }; 

                  case types.HANDLE_CONTACT_DRAWER_MODAL:
      return { ...state, addDrawerContactModal: action.payload };
         
      case types.HANDLE_CONTACT_EMAIL_DRAWER_MODAL:
                    return { ...state, addDrawerContactEmailModal: action.payload };


                    case types.GET_CONTACT_PAGINATION_REQUEST:
        return { ...state, fetchingContactPagination: true };
      case types.GET_CONTACT_PAGINATION_SUCCESS:
        return {
          ...state,
          fetchingContactPagination: false,
          // partnerPagination: [
          //   ...state.partnerPagination,
          //   ...action.payload],
          contactByUserId:action.payload,
        };
      case types.GET_CONTACT_PAGINATION_FAILURE:
        return {
          ...state,
          fetchingContactPagination: false,
          fetchingContactPaginationError: true,
        };


        case types.GET_PARTNER_CONTACT_PAGINATION_REQUEST:
          return { ...state, fetchingPartnerContactPagination: true };
        case types.GET_PARTNER_CONTACT_PAGINATION_SUCCESS:
          return {
            ...state,
            fetchingPartnerContactPagination: false,
            // partnerPagination: [
            //   ...state.partnerPagination,
            //   ...action.payload],
            contactPartnerByUserId:action.payload,
          };
        case types.GET_PARTNER_CONTACT_PAGINATION_FAILURE:
          return {
            ...state,
            fetchingPartnerContactPagination: false,
            fetchingPartnerContactPaginationError: true,
          };


          case types.GET_CONTACT_DATA_REQUEST:
            return { ...state, fetchingContactData: true };
          case types.GET_CONTACT_DATA_SUCCESS:
            return {
              ...state,
              fetchingContactData: false,
               contactData: action.payload,
            };
          case types.GET_CONTACT_DATA_FAILURE:
            return {
              ...state,
              fetchingContactData: false,
              fetchingContactDataError: true,
            };

            case types.GET_DEALS_CONTACT_DATA_REQUEST:
              return { ...state, fetchingDelasContactData: true };
            case types.GET_DEALS_CONTACT_DATA_SUCCESS:
              return {
                ...state,
                fetchingDelasContactData: false,
                 dealsContactData: action.payload,
              };
            case types.GET_DEALS_CONTACT_DATA_FAILURE:
              return {
                ...state,
                fetchingDelasContactData: false,
                fetchingDelasContactDataError: true,
              };
  


            case types.GET_VENDOR_CONTACT_DATA_REQUEST:
              return { ...state, fetchingVendorContactData: true };
            case types.GET_VENDOR_CONTACT_DATA_SUCCESS:
              return {
                ...state,
                fetchingVendorContactData: false,
                 vendorContactData: action.payload,
        
               
              
              };
            case types.GET_VENDOR_CONTACT_DATA_FAILURE:
              return {
                ...state,
                fetchingVendorContactData: false,
                fetchingVendorContactDataError: true,
              };

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
