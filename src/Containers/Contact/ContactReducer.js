import * as types from "./ContactActionTypes";
import dayjs from "dayjs";


const initialState = {
  addContactModal: false,
  linkContactModal: false,
  addingContact: false,
  addingContactError: false,

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord:[],

  fetchingContactrecruit: false,
  fetchingContactrecruitError: true,
  contactRecruit:[],

  fetchingContactDistributor: false,
                fetchingContactDistributorError: false,
                contactDistributor:[],

  fetchingContactRecords: false,
  fetchingContactRecordsError: true,
  contactRecord:[],

  addingContactAddress:false,
  addingContactAddressError:false,

  fetchingContactData:false,
  fetchingContactDataError:false,
  contactData:[],

  addDrawerContactPulseModal:false,

  addDrawerContactNotesModal:false,

  fetchingDelasContactData: false,
  fetchingDelasContactDataError: false,
  dealsContactData:[],

  fetchingContactAllRecords: false,
  fetchingContactAllRecordsError: false,
  contactAllRecord:{},


  fetchingTeamContact: false,
  fetchingTeamContactError: false,
  teamContact:[],

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

  hospitalUploadModal:false,

  addDrawerContactEmailModal:false,

  addingDocumentByContactId: false,
  addingDocumentByContactIdError: false,

  fetchingDocumentsByContactId: false,
  fetchingDocumentsByContactIdError: false,
  documentsByContactId: [],

  fetchingContactTeamRecords: false,
  fetchingContactTeamRecordsError: false,
  contactTeamRecord:{},

  fetchingFilterContacts: false,
   fetchingFilterContactsError: false,

  deleteDocument: false,
  deleteDocumentError: false,

  fetchingNotesListByContactId: false,
  fetchingNotesListByContactIdError: false,
  notesListByContactId: [],

  fetchingContactOpportunity: false,
  fetchingContactOpportunityError: false,
  opportunityByContactId: [],


  fetchingContactActivityCount: false,
  fetchingContactActivityCountError: false,
  contactActivityCount:{},

  updateContactAddress:false,
  updateContactAddressError:false,

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
  startDate: dayjs().toISOString(),
  endDate: dayjs().startOf("month"). add(1, "days").toISOString(),
  dateStackedRangeList: [
    // {
    //   id: 1,
    //   type: "year",
    //   value: "FY",
    //   starter: true,
    //   isSelected: true,
    //   startDate: dayjs()
    //     .startOf("year")
    //     .toISOString(),
    //   endDate: dayjs()
    //     .endOf("year")
    //     .toISOString(),
    // },
    // {
    //     id: 1,
    //     type: "Today",
    //     value: "Today",
    //     starter: false,
    //     isSelected: true,
    //     startDate: dayjs()
    //         // .subtract(1, "days")
    //         .toISOString(),
    //     endDate: dayjs().toISOString(),
    // },
    // {
    //     id: 2,
    //     type: "Yesterday",
    //     value: "Yesterday",
    //     starter: false,
    //     isSelected: false,
    //     startDate: dayjs()
    //         .subtract(1, "days")

    //         .toISOString(),
    //     endDate: dayjs().toISOString(),
    // },
    // {
    //     id: 3,
    //     type: "Last7days",
    //     value: "Last 7 days",
    //     starter: false,
    //     isSelected: false,
    //     startDate: dayjs()
    //         .subtract(7, "days")

    //         .toISOString(),
    //     endDate: dayjs().toISOString(),
    // },

    // {
    //     id: 4,
    //     type: "Last30days",
    //     value: "Last 30 days",
    //     starter: false,
    //     isSelected: false,
    //     startDate: dayjs()
    //         .subtract(30, "days")

    //         .toISOString(),
    //     endDate: dayjs().toISOString(),
    // },
    {
        id: 5,
        type: "Thismonth",
        value: "This month",
        starter: true,
        isSelected: true,
        endDate: dayjs().startOf("month"). add(1, "days").toISOString(),
        startDate: dayjs().toISOString(),
        
    },
    {
        id: 6,
        type: "Lastmonth",
        value: "Last month",
        starter: false,
        isSelected: false,
        endDate: dayjs().startOf("month") .subtract(30, "days").toISOString(),
        startDate: dayjs().toISOString(),
        
    },
],

addingNotesByContactId:false,
  addingNotesByContactIdError:false,

  addContactImportModal:false,


  fetchingContactAddress:false,
  fetchingContactAddressError:false,
  contactAddress:[],



  removeAddressData:false,
  removeAddressDataError:false,

  uploadingContactList: false,
  uploadingContactListError: false,

  addingContactLinkByOpportunityId: false,

  //SHARE Contact Permission of partner
  addSharingContactPartner: false,
  addSharingContactPartnerError: false,

  addContactSpeechModal:false,

  addDrawerContactAddressModal:false,

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

  fetchingAllContacts: false,
  fetchingAllContactsError:false,
   allContacts:[],

   contactCETdrawer:false,
   clickCETcontactActivity:false,



   addingContactMand:false,
   addingContactMandError:false,

   addingContactActivityCall: false,
   addingContactActivityEvent: false,
   addingContactActivityTask: false,
   fetchingContactsCETimeline: false,
  fetchingContactsCETimelineError:false,
  contactCETimeline:[],

  fetchingContactsCETRecord: false,
  fetchingContactsCETRecordError:false,
  contactCETRecord:{},
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CONTACT_MODAL:
      return { ...state, addContactModal: action.payload };

      case types.HANDLE_CONTACT_IMPORT_MODAL:
        return { ...state, addContactImportModal: action.payload };
    //opp modal
    case types.HANDLE_CONTACT_OPPORTUNITY_MODAL:
      return { ...state, addContactOpportunityModal: action.payload };
    case types.ADD_CONTACT_REQUEST:
      return { ...state, addingContact: true };
    case types.ADD_CONTACT_SUCCESS:
      return { ...state, addingContact: false, 
        addContactModal: false,
        contactByUserId:[action.payload,...state.contactByUserId],
        allContacts:[action.payload,...state.allContacts]
       };
    case types.ADD_CONTACT_FAILURE:
      return { ...state, addingContact: false, addContactModal: false };


      case types.HANDLE_CONTACT_ADDRESS_DRAWER_MODAL:
        return { ...state, addDrawerContactAddressModal: action.payload };


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

      case types.HANDLE_HOSPITAL_UPLOAD_MODAL:
        return { ...state, hospitalUploadModal: action.payload };

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
        documentUploadModal:false,
        documentsByContactId:[action.payload,...state.documentsByContactId]
        // addingDocumentByContactIdError: false,
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




      case types.UPDATE_CONTACT_ADDRESS_REQUEST:
        return { ...state, updateContactAddress: true };
      case types.UPDATE_CONTACT_ADDRESS_SUCCESS:
        return {
          ...state,
          //contactAddress
          updateContactAddress: false,
          contactAddress: state.contactAddress.map((item) => {
            if (item.addressId === action.payload.addressId) {
              return action.payload;
            } else {
              return item;
            }
          }),
          //sectors:[action.payload,...state.sectors]
          // sectors: [...state.sectors, action.payload],
          
        };
      case types.UPDATE_CONTACT_ADDRESS_FAILURE:
        return {
          ...state,
          updateContactAddress: false,
          updateContactAddressError: true,
        };
    

    /* Add a contact opportunity */
    case types.ADD_CONTACT_OPPORTUNITY_REQUEST:
      return { ...state, addingContactOpportunity: true };
    case types.ADD_CONTACT_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingContactOpportunity: false,
        addContactOpportunityModal: false,
        opportunityByContactId: [action.payload, ...state.opportunityByContactId],
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




      
      case types.REMOVE_ADDRESS_DATA_REQUEST:
        return { ...state, removeAddressData: true };
      case types.REMOVE_ADDRESS_DATA_SUCCESS:
        return {
          ...state,
          removeAddressData: false,
          contactAddress: state.contactAddress.filter(
            (item) => item.addressId !== action.payload
          ),
        };
      case types.REMOVE_ADDRESS_DATA_FAILURE:
        return {
          ...state,
          removeAddressData: false,
          removeAddressDataError: false,
        };

    //SEARCH
    case types.INPUT_CONTACT_SEARCH_DATA_REQUEST:
      return { ...state, fetchingContactInputSearchData: true };
    case types.INPUT_CONTACT_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingContactInputSearchData: false,
        contactByUserId: action.payload,
        allContacts:action.payload,
        teamContact:action.payload,
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




        case types.ADD_CONTACT_ADDRESS_REQUEST:
    return { ...state, addingContactAddress: true };
  case types.ADD_CONTACT_ADDRESS_SUCCESS:
    return {
      ...state,
      addingContactAddress: false,
      contactAddress:[action.payload,...state.contactAddress]
      // sectors: [...state.sectors, action.payload],
      
    };
  case types.ADD_CONTACT_ADDRESS_FAILURE:
    return {
      ...state,
      addingContactAddress: false,
      addingContactAddressError: true,
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

            case types.GET_CONTACT_DISTRIBUTOR_REQUEST:
              return { ...state, fetchingContactDistributor: true };
            case types.GET_CONTACT_DISTRIBUTOR_SUCCESS:
              return {
                ...state,
                fetchingContactDistributor: false,
                 contactDistributor: action.payload,
              };
            case types.GET_CONTACT_DISTRIBUTOR_FAILURE:
              return {
                ...state,
                fetchingContactDistributor: false,
                fetchingContactDistributorError: true,
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

              
        case types.GET_CONTACT_RECORDS_REQUEST:
          return { ...state, fetchingContactRecords: true };
        case types.GET_CONTACT_RECORDS_SUCCESS:
          return {
            ...state,
            fetchingContactRecords: false,
            contactRecord: action.payload,
          };
        case types.GET_CONTACT_RECORDS_FAILURE:
          return {
            ...state,
            fetchingContactRecords: false,
            fetchingContactRecordsError: true,
          };

          case types.GET_CONTACT_TEAM_RECORDS_REQUEST:
            return { ...state, fetchingContactTeamRecords: true };
          case types.GET_CONTACT_TEAM_RECORDS_SUCCESS:
            return {
              ...state,
              fetchingContactTeamRecords: false,
              contactTeamRecord: action.payload,
            };
          case types.GET_CONTACT_TEAM_RECORDS_FAILURE:
            return {
              ...state,
              fetchingContactTeamRecords: false,
              fetchingContactTeamRecordsError: true,
            };

          case types.GET_FILTER_CONTACTS_REQUEST:
            return { ...state, fetchingFilterContacts: true };
          case types.GET_FILTER_CONTACTS_SUCCESS:
            return {
              ...state,
              fetchingFilterContacts: false,
              contactByUserId:action.payload,
              // contactByUserId: [
              //   ...state.contactByUserId,
              //   ...action.payload],
            
            };
          case types.GET_FILTER_CONTACTS_FAILURE:
            return { ...state, fetchingFilterContacts: false, fetchingFilterContactsError: true };


            case types.HANDLE_CONTACT_NOTES_DRAWER_MODAL:
                      return { ...state, addDrawerContactNotesModal: action.payload };

                      case types.HANDLE_CONTACT_PULSE_DRAWER_MODAL:
                        return { ...state, addDrawerContactPulseModal: action.payload };                   

    
                        case types.GET_ALL_CONTACT_REQUEST:
                          return { ...state, fetchingAllContacts: true };
                        case types.GET_ALL_CONTACT_SUCCESS:
                          return {
                            ...state,
                            fetchingAllContacts: false,
                            allContacts: [
                              ...state.allContacts,
                              ...action.payload],
                          
                          };
                        case types.GET_ALL_CONTACT_FAILURE:
    
    
                        return { ...state, fetchingAllContacts: false, fetchingAllContactsError: true }; 




                        case types.ADD_CONTACT_MAND_REQUEST:
                          return { ...state, addingContactMand: true };
                        case types.ADD_CONTACT_MAND_SUCCESS:
                          return {
                            ...state,
                            addingContactMand: false,
                            //sectors:[action.payload,...state.sectors]
                            // sectors: [...state.sectors, action.payload],
                            
                          };
                        case types.ADD_CONTACT_MAND_FAILURE:
                          return {
                            ...state,
                            addingContactMand: false,
                            addingContactMandError: true,
                          };
                      
                        case types.GET_CONTACT_ADDRESS_DATA_REQUEST:
                          return { ...state, fetchingContactAddress: true };
                        case types.GET_CONTACT_ADDRESS_DATA_SUCCESS:
                          return {
                            ...state,
                            fetchingContactAddress: false,
                            contactAddress: action.payload,
                          };
                        case types.GET_CONTACT_ADDRESS_DATA_FAILURE:
                          return {
                            ...state,
                            fetchingContactAddress: false,
                            fetchingContactAddressError: true,
                          };
                      



                        case types.GET_TEAM_CONTACT_REQUEST:
                          return { ...state, fetchingTeamContact: true };
                        case types.GET_TEAM_CONTACT_SUCCESS:
                          return {
                            ...state,
                            fetchingTeamContact: false,
                        teamContact:action.payload,
                          };
                        case types.GET_TEAM_CONTACT_FAILURE:
                          return {
                            ...state,
                            fetchingTeamContact: false,
                            fetchingTeamContactError: true,
                          };

                                  
          case types.GET_OPPORTUNITY_RECORD_REQUEST:
            return { ...state, fetchingOpportunityRecord: true };
          case types.GET_OPPORTUNITY_RECORD_SUCCESS:
            return { ...state, fetchingOpportunityRecord: false, 
              opportunityRecord: action.payload };
          case types.GET_OPPORTUNITY_RECORD_FAILURE:
            return {
              ...state,
              fetchingOpportunityRecord: false,
              fetchingOpportunityRecordError: true,
            };

            case types.HANDLE_CLAER_REDUCER_DATA_CONTACT:
              return { ...state, 
                contactByUserId: [], 
                allContacts:[],
                teamContact:[]
              };
              case types.HANDLE_CONTACT_CET_DRAWER:
                return { ...state, contactCETdrawer: action.payload };

                case types.HANDLE_CET_ACTIVITY_CONTACT_MODAL:
                  return { ...state, clickCETcontactActivity: action.payload };
  
                  case types.ADD_CONTACT_ACTIVITY_CALL_REQUEST:
                    return { ...state, addingContactActivityCall: true };
                  case types.ADD_CONTACT_ACTIVITY_CALL_SUCCESS:
                    return { ...state, addingContactActivityCall: false,
                      clickCETcontactActivity: false,
                      contactCETimeline:[action.payload,...state.contactCETimeline]
                     };
                  case types.ADD_CONTACT_ACTIVITY_CALL_FAILURE:
                    return {
                      ...state,
                      addingContactActivityCall: false,
                      clickCETcontactActivity: false,
                    };

                    case types.ADD_CONTACT_ACTIVITY_EVENT_REQUEST:
                      return { ...state, addingContactActivityEvent: true };
                    case types.ADD_CONTACT_ACTIVITY_EVENT_SUCCESS:
                      return { ...state, addingContactActivityEvent: false,
                        clickCETcontactActivity: false,
                        contactCETimeline:[action.payload,...state.contactCETimeline]
                       };
                    case types.ADD_CONTACT_ACTIVITY_EVENT_FAILURE:
                      return {
                        ...state,
                        addingContactActivityEvent: false,
                        clickCETcontactActivity: false,
                      }; 

                      case types.ADD_CONTACT_ACTIVITY_TASK_REQUEST:
                        return { ...state, addingContactActivityTask: true };
                      case types.ADD_CONTACT_ACTIVITY_TASK_SUCCESS:
                        return { ...state, addingContactActivityTask: false,
                          clickCETcontactActivity: false,
                          contactCETimeline:[action.payload,...state.contactCETimeline]
                         };
                      case types.ADD_CONTACT_ACTIVITY_TASK_FAILURE:
                        return {
                          ...state,
                          addingContactActivityTask: false,
                          clickCETcontactActivity: false,
                        };  

                        case types.GET_CONTACT_CET_TIMELINE_REQUEST:
                          return { ...state, fetchingContactsCETimeline: true };
                      case types.GET_CONTACT_CET_TIMELINE_SUCCESS:
                          return {
                              ...state,
                              fetchingContactsCETimeline: false,
                              contactCETimeline: action.payload,
                          };
                      case types.GET_CONTACT_CET_TIMELINE_FAILURE:
                          return {
                              ...state,
                              fetchingContactsCETimeline: false,
                              fetchingContactsCETimelineError: true,
                          };

                          case types.GET_CONTACT_CET_RECORD_REQUEST:
                            return { ...state, fetchingContactsCETRecord: true };
                        case types.GET_CONTACT_CET_RECORD_SUCCESS:
                            return {
                                ...state,
                                fetchingContactsCETRecord: false,
                                contactCETRecord: action.payload,
                            };
                        case types.GET_CONTACT_CET_RECORD_FAILURE:
                            return {
                                ...state,
                                fetchingContactsCETRecord: false,
                                fetchingContactsCETRecordError: true,
                            };


                               
    case types.GET_CONTACT_ACTIVITY_RECORDS_REQUEST:
      return { ...state, fetchingContactActivityCount: true };
    case types.GET_CONTACT_ACTIVITY_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingContactActivityCount: false,
        contactActivityCount: action.payload,
      };
    case types.GET_CONTACT_ACTIVITY_RECORDS_FAILURE:
      return {
        ...state,
        fetchingContactActivityCount: false,
        fetchingContactActivityCountError: true,
      };
      case types.GET_TEAM_USERLIST_REQUEST:
        return {
          ...state,
          fetchingTeamUserList: true,
          fetchingTeamUserListError: false,
        };

      case types.GET_CONTACT_ALL_RECORDS_REQUEST:
        return { ...state, fetchingContactAllRecords: true };
      case types.GET_CONTACT_ALL_RECORDS_SUCCESS:
        return {
          ...state,
          fetchingContactAllRecords: false,
          contactAllRecord: action.payload,
        };
      case types.GET_CONTACT_ALL_RECORDS_FAILURE:
        return {
          ...state,
          fetchingContactAllRecords: false,
          fetchingContactAllRecordsError: true,
        };

        case types.GET_CONTACT_RECRUIT_REQUEST:
        return { ...state, fetchingContactrecruit: true };
      case types.GET_CONTACT_RECRUIT_SUCCESS:
        return {
          ...state,
          fetchingContactrecruit: false,
          contactRecruit: action.payload,
        };
      case types.GET_CONTACT_RECRUIT_FAILURE:
        return {
          ...state,
          fetchingContactrecruit: false,
          fetchingContactrecruitError: true,
        };

        case types.UPLOAD_CONTACT_LIST_REQUEST:
          return { ...state, uploadingContactList: true };
        case types.UPLOAD_CONTACT_LIST_SUCCESS:
          return {
            ...state,
            uploadingContactList: false,
            addContactImportModal: false
          };
        case types.UPLOAD_CONTACT_LIST_FAILURE:
          return {
            ...state,
            uploadingContactList: false,
            uploadingContactListError: true,
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
