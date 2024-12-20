import * as types from "./CustomerActionTypes";
import dayjs from "dayjs";
const initialState = {
  viewType: "table",
  addCustomerModal: false,

  fetchingHeader:false,
  fetchingHeaderError:false,
  headerdata:[],

  addCustomerContactJumpstartModal: false,

  fetchingTeamUserList: false,
  fetchingTeamUserListError: false,
  teamUserList:[],

  fetchingContactCount: false,
  fetchingContactCountError: false,
  contactCount:{},

  fetchingDocumentsCount: false,
  fetchingDocumentsCountError: false,
  documentsByCount:{},


  fetchingWonCusmWeightedValue: false,
  fetchingWonCusmWeightedValueError: false,
  WonCustomerWeighted: {},

  addAddressCustomerModal:false,

  fetchingSelectdrop: false,
  fetchingSelectdropError: false,
  selectDrop: [],

  fetchingDocumentsByInvestorId: false,
  fetchingDocumentsByInvestorIdError: false,
  documentsByInvestorId: [],

  addingCustomerActivityEvent: false,
  addingCustomerActivityEventError: false,

  addingCustomer: false,
  addingCustomerError: false,

  customerContractStatus: false,
  customerContractStatusError: false,

  addDrawerCustomerPulseModal: false,

  addDrawerCustomerNotesModal: false,

  addDrawerCustomerEmailModal: false,

  customerProjectModal: false,

  addCustomerActivityJumpstartModal: false,

  fetchingFilterCustomers: false,
  fetchingFilterCustomersError: false,

  deletingCustomerById: false,
  deletingCustomerByIdError: false,

  addingCustomerActivityCall: false,
  addingCustomerActivityCallError: false,

  addingAttendence: false,
  addingAttendenceError: false,

  fetchingCustomerProject: false,
  fetchingCustomerProjectError: false,
  customerProject: [],

  updatingActivityTaskForm: false,
  updatingActivityTaskFormError: false,


  fetchingCustOpenOppJumpstart: false,
  fetchingCustOpenOppJumpstartError: false,
  openOppOfCustJumpstart: [],

  addCustomerOpenOppJumpstartModal: false,

  addingCustomerContact: false,
  addingCustomerContactError: false,
  addCustomerContactModal: false,


  fetchingCustContactsJumpstart: false,
  fetchingCustContactsJumpstartError: false,
  contactOfCustJumpstart: [],

  fetchinglatestCustomer: false,
  fetchinglatestCustomerError: false,
  latestCustomer: [],

  fetchingAllCustomersData: false,
  fetchingAllCustomersDataError: false,
  allCustomerData: [],

  fetchingWeightedValue: false,
  fetchingWeightedValueError: false,
  WeightedValue: {},

  fetchingAllCustomerByPosition: false,
  fetchingAllCustomerByPosition: false,




  fetchingCustomerRequirement: false,
  fetchingCustomerRequirementError: false,
  customerRequirement: [],

  fetchingCustomerAllRecords: false,
  fetchingCustomerAllRecordsError: false,
  customerAllRecordData: {},

  fetchingDocumentsByDealId: false,
  fetchingDocumentsByDealIdError: false,
  documentsByInnOppId: [],

  callActivityModal: false,

  fetchingCustomers: false,
  fetchingCustomersError: false,
  customerByUserId: [],
  startDate: dayjs().toISOString(),
  endDate: dayjs().toISOString(),
  dateTodoRangeList: [
    // {
    //   id: 8,
    //   type: "All",
    //   value: "All",
    //   starter: true,
    //   isSelected: true,
    //   startDate: dayjs()
    //     .toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    {
      id: 1,
      type: "Today",
      value: "Today",
      starter: true,
      isSelected: true,
      startDate: dayjs()
        // .subtract(1, "days")
        .toISOString(),
      endDate: dayjs().toISOString(),
    },
    {
      id: 2,
      type: "Yesterday",
      value: "Yesterday",
      starter: false,
      isSelected: false,
      endDate: dayjs()
        .subtract(1, "days")

        .toISOString(),
      startDate: dayjs().toISOString(),
    },
    // {
    //   id: 3,
    //   type: "Last7days",
    //   value: "Last 7 days",
    //   starter: false,
    //   isSelected: false,
    //   endDate: dayjs()
    //   .subtract(7, "days")

    //   .toISOString(),
    // startDate: dayjs().toISOString(),
    //   // startDate: dayjs()
    //   //   .subtract(7, "days")

    //   //   .toISOString(),
    //   // endDate: dayjs().toISOString(),
    // },

    // {
    //   id: 4,
    //   type: "Last30days",
    //   value: "Last 30 days",
    //   starter: false,
    //   isSelected: false,
    //   endDate: dayjs()
    //   .subtract(30, "days")

    //   .toISOString(),
    // startDate: dayjs().toISOString(),
    //   // startDate: dayjs()
    //   //   .subtract(30, "days")

    //   //   .toISOString(),
    //   // endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 5,
    //   type: "Thismonth",
    //   value: "This month",
    //   starter: false,
    //   isSelected: false,
    //   endDate: dayjs()
    //   .startOf("week").toISOString(),
    // startDate: dayjs().toISOString(),

    // },
    // {
    //   id: 6,
    //   type: "Lastmonth",
    //   value: "Last month",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs().startOf("month").toISOString(),
    //   endDate: dayjs().toISOString(),
    // },
    // {
    //   id: 8,
    //   type: "DateRange",
    //   value: "Date Range",
    //   starter: false,
    //   isSelected: false,
    //   startDate: dayjs().startOf("year").toISOString,
    //   endDate: dayjs().endOf("year").toISOString(),
    // },
  ],

  clearbit: {},

  addCustomerWonOppJumpstartModal: false,

  fetchingAllCustomers: false,
  fetchingAllCustomersError: false,
  allcustomersByUserId: [],

  fetchingWonCustomerOppValue: false,
  fetchingWonCustomerOppValueError: false,
  WonCustomerOpp: {},

  fetchingDocumentsByContactId: false,
   fetchingDocumentsByContactIdError: false,
   documentsByContactId:[],

   fetchingCustomerInputSearchData:false,

  fetchingCustomerById: false,
  fetchingCustomerByIdError: false,
  customerById: [],

  fetchingCustomerDetailsById: false,
  fetchingCustomerDetailsByIdError: false,
  customer: {},

  fetchingOppValue: false,
  fetchingOppValueError: false,
  OppValue: {},

  fetchingPipelineValue: false,
  fetchingPipelineValueError: false,
  pipelineValue: {},

  fetchingWonCusPipelineValue: false,
  fetchingWonCusPipelineValueError: false,
  WonCustomerPipeline: {},

  addingLocationDetails: false,

  documentUploadModal: false,

  addingDocumentByCustomerId: false,
  addingDocumentByCustomerIdError: false,

  addingDocumentByHospital: false,
  addingDocumentByHospitalError: false,

  fetchingDocumentsByCustomerId: false,
  fetchingDocumentsByCustomerIdError: false,
  documentsByCustomerId: [],

  fetchingCusActivityTimelineStatus: false,
  fetchingCusActivityTimelineStatusError: false,
  customerActivityTimeline: [],

  fetchingCustWonOppJumpstart: false,
  fetchingCustWonOppJumpstartError: false,
  wonOppOfCustJumpstart: [],

  addDrawerCustomerOpportunityModal: false,

  deleteDocument: false,
  deleteDocumentError: false,

  updatingActivityCallForm: false,
  updatingActivityCallFormError: false,

  addCustomerSpeechModal: false,
  addDrawerCustomerModal: false,
  customerDrawerProps: {},

  updateDrawerCustomerModal: false,
  updateCustomerDrawerProps: {},

  fetchingNotesListByCustomerId: false,
  fetchingNotesListByCustomerIdError: false,
  notesListByCustomerId: [],

  updateCustomerModal: false,

  updateCustomerInitiativeModal: false,

  setEditingCustomer: {},

  setEditingCustomerCard: {},

  updateCustomerById: false,
  updateCustomerByIdError: false,

  updateCustomerInitiatives: false,
  updateCustomerInitiativesError: false,

  fetchingCustomerOpportunity: false,
  fetchingCustomerOpportunityError: false,
  opportunityByCustomerId: [],

  fetchingCustomerContact: false,
  fetchingCustomerContactError: false,
  contactByCustomerId: [],

  fetchingCustomerRecruit: false,
  fetchingCustomerRecruitError: false,
  customerRecruit: [],

  setActivityEditingEvents:{},

  fetchingAllCustomerByCloser: false,
  fetchingAllCustomerByCloserError: false,

  fetchingCommercialsByCustomer: false,
  fetchingCommercialsByCustomerError: false,
  commercialsByCustomerId: [],

  fetchingContactValue: false,
  fetchingContactValueError: false,
  contactValue: {},


  fetchingCustomerDonut:false,
  fetchingCustomerDonutError:false,

  customerDonut:{},

  updatingActivityEventForm: false,
  updatingActivityEventFormError: false,

  linkedProjectTask: false,
  linkedProjectTaskError: false,
  linkedcustomerProjectTask: [],


  fetchingCustomerNoteList: false,
  fetchingCustomerNoteListError: false,
  customerNoteList: [],

  addingCommercials: false,
  addingCommercialsError: false,


  addingCustomerImportForm:false,

  addingCustomerOpportunity: false,
  addingCustomerOpportunityError: false,
  addingCustomerOpportunityModal: false,

  addingInvoice: false,
  addingInvoiceError: false,

  convertingCustomerToAccount: false,
  convertingCustomerToAccountError: false,

  fetchingInvoiceByCustomer: false,
  fetchingInvoiceByCustomerError: false,
  invoiceByCustomerId: [],

  fetchingCustomerActivityCount: false,
  fetchingCustomerActivityCountError: false,
  customerActivityCount: {},


  updateProspectUserById:false,
  updateProspectUserByIdError:false,

  fetchingCustomerCloser: false,
  fetchingCustomerCloserError: false,
  customerCloser: [],

  //search
  fetchingCustomerInputSearchData: false,
  fetchingCustomerInputSearchDataError: false,
  customerSearch: [],

  addingNotesByCustomerId: false,
  addingNotesByCustomerIdError: false,

  //SHARE Contact Permission of customer
  addSharingCustomer: false,
  addSharingCustomerError: false,

  addingCustomerActivityTask: false,
  addingCustomerActivityTaskError: false,

  fetchingPermissionsListCustomer: false,
  fetchingPermissionsListCustomerError: false,
  permissionsDataListCustomer: [],

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  fetchingCustomerTeamRecordsByUserId: false,
  fetchingCustomerTeamRecordsByUserIdError: false,
  customerTeamRecordData: {},

  addingInitiativeByCustomerId: false,
  addingInitiativeByCustomerIdError: false,

  addingInitiatives: false,
  addingInitiativesError: false,

  fetchingInitiativeByCustomerId: false,
  fetchingInitiativeByCustomerIdError: false,
  topicsByCustomerId: [],

  deleteInitiativeData: false,
  deleteInitiativeDataError: false,

  fetchingInitiatives: false,
  fetchingInitiativesError: false,
  initiatives: [],

  addRecruitModal: false,

  addFileRecruitModal: false,

  addTagProfileModal: false,

  linkingRecruitToCustomer: false,
  linkingRecruitToCustomerError: false,

  fetchingCustomersData: false,
  fetchingCustomersDataError: false,
  customerData: [],

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord: [],

  fetchingInvestorData: false,
  fetchingInvestorDataError: false,
  investorData: [],

  fetchingRecruitToCustomer: false,
  fetchingRecruitToCustomerError: false,
  recruitByCustomerId: [],

  linkingProfileToCustomer: false,
  linkingProfileToCustomerError: false,
  profileRecruit: [],

  fetchingDocumentsByOpportunityId: false,
  fetchingDocumentsByOpportunityIdError: false,
  documentsByOpportunityId: [],

  fetchingAllCustomerByAlphabet: false,
  fetchingAllCustomerByAlphabetError: false,

  fetchingCustomersList: false,
  fetchingCustomersListError: false,
  customerByList: [],

  addCustomerActivityDrawerModal:false,

  fetchingAttendanceList: false,
  fetchingAttendanceListError: false,
  attendanceByList: {},

  addingRecruitmentProfile: false,
  addingRecruitmentProfileError: false,

  updateCustomerContactById: false,
  updateCustomerContactByIdError: false,

  fetchingCustomerPagination: false,
  fetchingCustomerPaginationError: false,

  currentRecruitmentData: {},
  addSponsorModal: false,

  updatingCustomerOpportunity: false,
  updatingCustomerOpportunityError: false,
  addCustomerOpportunityModal: false,


  addCustomerNoteDrawerModal: false,

  addCustomerProjectDrawer: false,
  customeropportunityByUserId: [],
  addUpdateCustomerOpportunityModal: false,
  setEditingCustomerOpportunity: {},
  setEditingCustomerInitiative: {},

  fetchingTeamCustomer: false,
  fetchingTeamCustomerError: false,
  teamCustomer: [],

  setEditingCustomerContact: {},
  addUpdateCustomerContactModal: false,

  addDrawerCustomerContactModal: false,

  puttingCustContcToggle: false,
  puttingCustContcToggleError: false,

  fetchingCustomersCategory: false,
  fetchingCustomersCategoryError: false,
  customerByCategory: [],

  fetchingCustomerKeySkill: false,
  fetchingCustomerKeySkillError: false,
  customerKeySkill: {},

  fetchingCategoryRecords: false,
  fetchingCategoryRecordsError: false,
  recordCategoryData: "",
  recordCategoryDataBlue: "",

  updatingCustomerOwenership: false,
  updatingCustomerOwenershipError: false,

  fetchingAllCustomerList: false,
  fetchingAllCustomerListError: false,
  allCustomers: [],

  openCampaigndrwr: false,
  addingCustomerEvent: false,
  addingCustomerEventError: false,

  addingCustomerCampaignEvent: false,
  addingCustomerCampaignEventError: false,
  fetchingCustomerCampaign: false,
  fetchingCustomerCampaignError: false,
  customerCampaign: [],
};

export const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * handle Customer form modal
     */

    case types.HANDLE_CUSTOMER_IMPORT_MODAL:
      return { ...state, addCustomerImportModal: action.payload };
    case types.HANDLE_CUSTOMER_MODAL:
      return { ...state, addCustomerModal: action.payload };

    case types.EMPTY_CUSTOMER_TABLE:
      return { ...state, customerByUserId: [] };
    case types.HANDLE_CUSTOMER_CONTACT_MODAL:
      return { ...state, addCustomerContactModal: action.payload };

    case types.ADD_CUSTOMER_REQUEST:
      return { ...state, addingCustomer: true };
    case types.ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        addingCustomer: false,
        addCustomerModal: false,
        customerByUserId: [action.payload, ...state.customerByUserId],
        allCustomers: [action.payload, ...state.allCustomers],
        // customerByUserId: state.customerByUserId.map((item) => {
        //   if (item.customerId === action.payload.customerId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };
    case types.ADD_CUSTOMER_FAILURE:
      return { ...state, addingCustomer: false, addCustomerModal: false };

    case types.GET_CUSTOMERS_REQUEST:
      return { ...state, fetchingCustomers: true };
    case types.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        fetchingCustomers: false,
        customerByUserId: [...state.customerByUserId, ...action.payload],
        clearbit: null,
      };
    case types.GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        fetchingCustomers: false,
        fetchingCustomersError: true,
      };

    case types.GET_CUSTOMER_BY_ID_REQUEST:
      return { ...state, fetchingCustomerById: true };
    case types.GET_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingCustomerById: false,
        customerById: action.payload,
      };
    case types.GET_CUSTOMER_BY_ID_FAILURE:
      return {
        ...state,
        fetchingCustomerById: false,
        fetchingCustomerByIdError: true,
      };

    //Customer Details
    case types.GET_CUSTOMER_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingCustomerDetailsById: true };
    case types.GET_CUSTOMER_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingCustomerDetailsById: false,
        customer: action.payload,
      };
    case types.GET_CUSTOMER_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingCustomerDetailsById: false,
        fetchingCustomerDetailsByIdError: true,
      };

    case types.GET_SELECT_DROP_REQUEST:
      return { ...state, fetchingSelectdrop: true };
    case types.GET_SELECT_DROP_SUCCESS:
      return {
        ...state,
        fetchingSelectdrop: false,
        selectDrop: action.payload,
      };
    case types.GET_SELECT_DROP_FAILURE:
      return {
        ...state,
        fetchingSelectdrop: false,
        fetchingSelectdropError: true,
      };

    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };
    case types.HANDLE_INVOICE_MODAL:
      return { ...state, invoiceModal: action.payload };

    case types.HANDLE_CALL_ACTIVITY_MODAL:
      return { ...state, callActivityModal: action.payload };
    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByCustomerId: state.documentsByCustomerId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    /**
     * Customer Notes
     */

    case types.GET_NOTES_LIST_BY_CUSTOMER_ID_REQUEST:
      return { ...state, fetchingNotesListByCustomerId: true };
    case types.GET_NOTES_LIST_BY_CUSTOMER_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByCustomerId: false,
        notesListByCustomerId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByCustomerId: false,
        fetchingNotesListByCustomerIdError: true,
      };

    case types.HANDLE_UPDATE_CUSTOMER_MODAL:
      return { ...state, updateCustomerModal: action.payload };

    case types.HANDLE_UPDATE_CUSTOMER_INITIATIVE_MODAL:
      return { ...state, updateCustomerInitiativeModal: action.payload };

    case types.SET_CUSTOMER_EDIT:
      return { ...state, setEditingCustomer: action.payload };

    case types.SET_CUSTOMER_CARD_EDIT:
      return { ...state, setEditingCustomerCard: action.payload };

    case types.CHANGE_SELECTED_TODO_TIME_INTERVAL_REPORT:
      return {
        ...state,
        dateTodoRangeList: newDateRange(
          state.dateTodoRangeList,
          action.payload
        ),
        // isCustomSelected: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        type: action.payload.type,
      };

    case types.UPDATE_CUSTOMER_BY_ID_REQUEST:
      return { ...state, updateCustomerById: true };
    case types.UPDATE_CUSTOMER_BY_ID_SUCCESS:
      return {
        ...state,
        updateCustomerById: false,
        updateCustomerModal: false,
        customerByUserId: state.customerByUserId.map((item) => {
          if (item.customerId === action.payload.customerId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        teamCustomer: state.teamCustomer.map((item) => {
          if (item.customerId === action.payload.customerId) {
            return action.payload;
          } else {
            return item;
          }
        }),

        allCustomers: state.allCustomers.map((item) => {
          if (item.customerId === action.payload.customerId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_CUSTOMER_BY_ID_FAILURE:
      return {
        ...state,
        updateCustomerById: false,
        updateCustomerByIdError: true,
      };


      case types.UPDATE_DOCUMENT_BY_ID_REQUEST:
      return { ...state, updateDocumentById: true };
    case types.UPDATE_DOCUMENT_BY_ID_SUCCESS:
      return {
        ...state,
        updateDocumentById: false,
        documentsByCustomerId: state.documentsByCustomerId.map((item) => {
          if (item.documentId === action.payload.documentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_DOCUMENT_BY_ID_FAILURE:
      return {
        ...state,
        updateDocumentById: false,
        updateDocumentByIdError: true,
      };

    /*add/link customer document */
    case types.ADD_CUSTOMER_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByCustomerId: true,
        addingDocumentByCustomerIdError: false,
      };
    case types.ADD_CUSTOMER_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByCustomerId: false,
        addingDocumentByCustomerIdError: false,
        documentUploadModal:false,
        documentsByCustomerId: [action.payload, ...state.documentsByCustomerId],
        documentsByContactId: [action.payload, ...state.documentsByContactId],
        documentsByOpportunityId: [action.payload, ...state.documentsByOpportunityId],
        documentsByInnOppId: [action.payload, ...state.documentsByInnOppId],
        documentsByInvestorId: [action.payload, ...state.documentsByInvestorId]
      };
    case types.ADD_CUSTOMER_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByCustomerId: false,
        addingDocumentByCustomerIdError: true,
      };


      case types.ADD_HOSPITAL_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByHospital: true,
        addingDocumentByHospitalError: false,
      };
    case types.ADD_HOSPITAL_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByHospital: false,
        addingDocumentByHospitalError: false,
       // documentUploadModal:false,
        documentsByCustomerId: [action.payload, ...state.documentsByCustomerId],
        documentsByContactId: [action.payload, ...state.documentsByContactId],
        documentsByOpportunityId: [action.payload, ...state.documentsByOpportunityId],
        documentsByInnOppId: [action.payload, ...state.documentsByInnOppId],
        documentsByInvestorId: [action.payload, ...state.documentsByInvestorId]
      };
    case types.ADD_HOSPITAL_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByHospital: false,
        addingDocumentByHospitalError: true,
      };
    /*get list of documents of an Customer */
    case types.GET_CUSTOMER_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByCustomerId: true,
        fetchingDocumentsByCustomerIdError: false,
      };
    case types.GET_CUSTOMER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByCustomerId: false,
        fetchingDocumentsByCustomerIdError: false,
        documentsByCustomerId: action.payload,
      };
    case types.GET_CUSTOMER_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByCustomerId: false,
        fetchingDocumentsByCustomerIdError: true,
      };


      case types.GET_DOCUMENTS_COUNT_REQUEST:
      return {
        ...state,
        fetchingDocumentsCount: true,
      };
    case types.GET_DOCUMENTS_COUNT_SUCCESS:
      return {
        ...state,
        fetchingDocumentsCount: false,
        documentsByCount: action.payload,
      };
    case types.GET_DOCUMENTS_COUNT_FAILURE:
      return {
        ...state,
        fetchingDocumentsCount: false,
        fetchingDocumentsCountError: true,
      };

      
    case types.ADD_LOCATION_DETAILS_REQUEST:
      return { ...state, addingLocationDetails: true };
    case types.ADD_LOCATION_DETAILS_SUCCESS:
      return { ...state, addingLocationDetails: false };
    case types.ADD_LOCATION_DETAILS_FAILURE:
      return { ...state, addingLocationDetails: false };

    /* Get customer opportunity  */
    case types.GET_CUSTOMER_OPPORTUNITY_REQUEST:
      return { ...state, fetchingCustomerOpportunity: true };
    case types.GET_CUSTOMER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingCustomerOpportunity: false,
        opportunityByCustomerId: action.payload,
      };
    case types.GET_CUSTOMER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingCustomerOpportunity: false,
        fetchingCustomerOpportunityError: true,
      };

    /* Get a opportunity  */
    case types.GET_CUSTOMER_CONTACT_REQUEST:
      return { ...state, fetchingCustomerContact: true };
    case types.GET_CUSTOMER_CONTACT_SUCCESS:
      return {
        ...state,
        fetchingCustomerContact: false,
        contactByCustomerId: action.payload,
      };
    case types.GET_CUSTOMER_CONTACT_FAILURE:
      return {
        ...state,
        fetchingCustomerContact: false,
        fetchingCustomerContactError: true,
      };

    //add contact
    case types.ADD_CUSTOMER_CONTACT_REQUEST:
      return { ...state, addingCustomerContact: true };
    case types.ADD_CUSTOMER_CONTACT_SUCCESS:
      return {
        ...state,
        addingCustomerContact: false,
        addCustomerContactModal: false,
        contactByCustomerId: [action.payload, ...state.contactByCustomerId],
      };
    case types.ADD_CUSTOMER_CONTACT_FAILURE:
      return {
        ...state,
        addingCustomerContactError: false,
        addCustomerContactModal: false,
      };

    /* handle Customer Opportunity form modal */
    case types.HANDLE_CUSTOMER_OPPORTUNITY_MODAL:
      return { ...state, addCustomerOpportunityModal: action.payload };

    case types.HANDLE_CUSTOMER_PROJECT_DRAWER:
      return { ...state, addCustomerProjectDrawer: action.payload };

    case types.HANDLE_CUSTOMER_REACT_SPEECH_MODAL:
      return { ...state, addCustomerSpeechModal: action.payload };

    case types.HANDLE_UPDATE_CUSTOMER_OPPORTUNITY_MODAL:
      return { ...state, addUpdateCustomerOpportunityModal: action.payload };

    case types.HANDLE_UPDATE_CUSTOMER_CONTACT_MODAL:
      return { ...state, addUpdateCustomerContactModal: action.payload };

    /* Add a customer opportunity */
    case types.ADD_CUSTOMER_OPPORTUNITY_REQUEST:
      return { ...state, addingCustomerOpportunity: true };
    case types.ADD_CUSTOMER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingCustomerOpportunity: false,
        addCustomerOpportunityModal: false,
        opportunityByCustomerId: [
          action.payload,
          ...state.opportunityByCustomerId,
        ],
        // clearbit: null,
      };
    case types.ADD_CUSTOMER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingCustomerOpportunity: false,
        addingCustomerOpportunityError: true,
        addingCustomerOpportunityModal: false,
      };

    //SEARCH
    case types.INPUT_CUSTOMER_SEARCH_DATA_REQUEST:
      return { ...state, fetchingCustomerInputSearchData: true };
    case types.INPUT_CUSTOMER_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingCustomerInputSearchData: false,
        // customerByUserId: action.payload,
        // latestCustomer: action.payload,
        // customerCloser: action.payload,
        // teamCustomer: action.payload,
        customerSearch: action.payload,

      };
    case types.INPUT_CUSTOMER_SEARCH_DATA_FAILURE:
      return { ...state, fetchingCustomerInputSearchDataError: true };

    case types.HANDLE_CUSTOMER_PROJECT_MODAL:
      return { ...state, customerProjectModal: action.payload };

    //SHARE Contact Customer Permissiom
    case types.ADD_SHARE_CUSTOMER_PERMISSION_REQUEST:
      return { ...state, addSharingCustomer: true };

    case types.ADD_SHARE_CUSTOMER_PERMISSION_SUCCESS:
      return {
        ...state,
        addSharingCustomer: false,
        customerByUserId: action.payload,
      };

    case types.ADD_SHARE_CUSTOMER_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingCustomer: false,
        addSharingCustomerError: true,
      };

    case types.GET_PERMISSIONS_LIST_CUSTOMER_REQUEST:
      return { ...state, fetchingPermissionsListCustomer: true };
    case types.GET_PERMISSIONS_LIST_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingPermissionsListCustomer: false,
        permissionsDataListCustomer: action.payload,
      };
    case types.GET_PERMISSIONS_LIST_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingPermissionsListCustomer: false,
        fetchingPermissionsListCustomerError: false,
      };

    //get All Customers
    case types.GET_ALL_CUSTOMERS_REQUEST:
      return { ...state, fetchingAllCustomers: true };
    case types.GET_ALL_CUSTOMERS_SUCCESS:
      return {
        ...state,
        fetchingAllCustomers: false,
        customerByUserId: action.payload,
      };
    case types.GET_ALL_CUSTOMERS_FAILURE:
      return {
        ...state,
        fetchingAllCustomers: false,
        fetchingAllCustomersError: true,
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

    case types.GET_CUSTOMER_TEAM_RECORDS_REQUEST:
      return { ...state, fetchingCustomerTeamRecordsByUserId: true };
    case types.GET_CUSTOMER_TEAM_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingCustomerTeamRecordsByUserId: false,
        customerTeamRecordData: action.payload,
      };
    case types.GET_CUSTOMER_TEAM_RECORDS_FAILURE:
      return {
        ...state,
        fetchingCustomerTeamRecordsByUserId: false,
        fetchingCustomerTeamRecordsByUserIdError: true,
      };

    // Add Recruit Modal
    case types.HANDLE_RECRUIT_MODAL:
      return { ...state, addRecruitModal: action.payload };

    // Add Profile Modal
    case types.HANDLE_TAGPROFILE_MODAL:
      return { ...state, addTagProfileModal: action.payload };

    //add recruit
    case types.LINK_RECRUIT_TO_CUSTOMER_REQUEST:
      return {
        ...state,
        linkingRecruitToCustomer: true,
      };
    case types.LINK_RECRUIT_TO_CUSTOMER_SUCCESS:
      return {
        ...state,
        linkingRecruitToCustomer: false,

        addRecruitModal: false,
      };
    case types.LINK_RECRUIT_TO_CUSTOMER_FAILURE:
      return {
        ...state,
        linkingRecruitToCustomer: false,
        linkingRecruitToCustomerError: true,
      };

    //get recruit
    case types.GET_RECRUIT_TO_CUSTOMER_REQUEST:
      return {
        ...state,
        fetchingRecruitToCustomer: true,
      };
    case types.GET_RECRUIT_TO_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingRecruitToCustomer: false,
        recruitByCustomerId: action.payload,
      };
    case types.GET_RECRUIT_TO_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingRecruitToCustomer: false,
        fetchingRecruitToCustomerError: true,
      };

    case types.LINK_PROFILE_TO_CUSTOMER_REQUEST:
      return {
        ...state,
        linkingProfileToCustomer: true,
      };

    case types.LINK_PROFILE_TO_CUSTOMER_SUCCESS:
      return {
        ...state,
        linkingProfileToCustomer: false,
        profileRecruit: action.payload,
      };

    case types.LINK_PROFILE_TO_CUSTOMER_FAILURE:
      return {
        ...state,
        linkingProfileToCustomer: false,
        linkingProfileToCustomerError: true,
      };

    case types.ADD_RECRUITMENT_PROFILE_REQUEST:
      return {
        ...state,
        addingRecruitmentProfile: true,
      };
    case types.ADD_RECRUITMENT_PROFILE_SUCCESS:
      return {
        ...state,
        addingRecruitmentProfile: false,
        addTagProfileModal: false,
      };
    case types.ADD_RECRUITMENT_PROFILE_FAILURE:
      return {
        ...state,
        addingRecruitmentProfile: false,
        addingRecruitmentProfileError: true,
      };


      case types.GET_HEADER_REQUEST:
        return { ...state, fetchingHeader: true };
      case types.GET_HEADER_SUCCESS:
        return {
          ...state,
          fetchingHeader: false,
          headerdata: action.payload,
        };
      case types.GET_HEADER_FAILURE:
        return {
          ...state,
          fetchingHeader: false,
          fetchingHeaderError: true,
        };
  
      case types.UPDATE_PROSPECT_USER_REQUEST:
        return { ...state, updateProspectUserById: true };
      case types.UPDATE_PROSPECT_USER_SUCCESS:
        return {
          ...state,
          updateProspectUserById: false,
          updateUserModal: false,
          teamCustomer: state.teamCustomer.map((item) => {
            if (item.customerId === action.payload.customerId) {
              return action.payload;
            } else {
              return item;
            }
          }),



          allCustomers: state.allCustomers.map((item) => {
            if (item.customerId === action.payload.customerId) {
              return action.payload;
            } else {
              return item;
            }
          }),


          customerByUserId: state.customerByUserId.map((item) => {
            if (item.customerId === action.payload.customerId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };
      case types.UPDATE_PROSPECT_USER_FAILURE:
        return {
          ...state,
          updateProspectUserById: false,
          updateProspectUserByIdError: true,
        };
  
      case types.GET_CUSTOMER_DONUT_REQUEST:
        return { ...state, fetchingCustomerDonut: true };
      case types.GET_CUSTOMER_DONUT_SUCCESS:
        return {
          ...state,
          fetchingCustomerDonut: false,
        customerDonut: action.payload,
  
          //opportunityByUserId: [...state.opportunityByUserId, ...action.payload],
        };
      case types.GET_CUSTOMER_DONUT_FAILURE:
        return {
          ...state,
          fetchingCustomerDonut: false,
          fetchingCustomerDonutError: true,
        };
  

    case types.SET_CURRENT_RECRUITMENT_DATA:
      return { ...state, currentRecruitmentData: action.payload };

    case types.HANDLE_SELECT_SPONSOR_MODAL:
      return { ...state, addSponsorModal: action.payload };

    case types.UPDATE_CUSTOMER_OPPORTUNITY_REQUEST:
      return { ...state, updatingCustomerOpportunity: true };
    case types.UPDATE_CUSTOMER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        updatingCustomerOpportunity: false,
        // addCustomerOpportunityModal: false,
        addUpdateCustomerOpportunityModal: false,
        opportunityByCustomerId: state.opportunityByCustomerId.map((item) => {
          if (item.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };

    case types.UPDATE_CUSTOMER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        updatingCustomerOpportunity: true,
        updatingCustomerOpportunityError: false,
        // addCustomerOpportunityModal: false,
      };

    case types.SET_EDIT_CUSTOMER_OPPORTUNITY:
      return { ...state, setEditingCustomerOpportunity: action.payload };
    case types.SET_EDIT_CUSTOMER_INITIATIVE:
      return { ...state, setEditingCustomerInitiative: action.payload };

    case types.SET_EDIT_CUSTOMER_CONTACT:
      return { ...state, setEditingCustomerContact: action.payload };
    // Add File Recruit Modal
    case types.HANDLE_FILE_RECRUIT_MODAL:
      return { ...state, addFileRecruitModal: action.payload };
      case types.EMPTY_CLEARBIT_TABLE:
        return { ...state,  clearbit: {} };
    case types.ADD_ATTENDENCE_REQUEST:
      return { ...state, addingAttendence: true };
    case types.ADD_ATTENDENCE_SUCCESS:
      return { ...state, addingAttendence: false };
    case types.ADD_ATTENDENCE_FAILURE:
      return { ...state, addingAttendence: false };

    case types.PUT_CUSTO_CONTACT_TOGGLE_REQUEST:
      return {
        ...state,
        puttingCustContcToggle: true,
      };
    case types.PUT_CUSTO_CONTACT_TOGGLE_SUCCESS:
      return {
        ...state,
        puttingCustContcToggle: false,
        contactByCustomerId: state.contactByCustomerId.map((item) => {
          if (item.contactPersonId === action.payload.contactPersonId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.PUT_CUSTO_CONTACT_TOGGLE_FAILURE:
      return {
        ...state,
        puttingCustContcToggle: false,
        puttingCustContcToggleError: true,
      };

    case types.SET_CUSTOMER_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_CUSTOMERS_BY_CATEGORY_REQUEST:
      return { ...state, fetchingCustomersCategory: true };
    case types.GET_CUSTOMERS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchingCustomersCategory: false,
        customerByCategory: action.payload,
      };
    case types.GET_CUSTOMERS_BY_CATEGORY_FAILURE:
      return {
        ...state,
        fetchingCustomersCategory: false,
        fetchingCustomersCategoryError: true,
      };

    case types.GET_CATEGORY_RECORDS_REQUEST:
      return { ...state, fetchingCategoryRecords: true };
    case types.GET_CATEGORY_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingCategoryRecords: false,
        recordCategoryData: action.payload,
      };
    case types.GET_CATEGORY_RECORDS_BLUE_SUCCESS:
      return {
        ...state,
        fetchingCategoryRecords: false,
        recordCategoryDataBlue: action.payload,
      };
    case types.GET_CATEGORY_RECORDS_FAILURE:
      return {
        ...state,
        fetchingCategoryRecords: false,
        fetchingCategoryRecordsError: true,
      };

    //ADD COMMERCIALS

    case types.ADD_COMMERCIALS_BY_CUSTOMER_ID_REQUEST:
      return {
        ...state,
        addingCommercials: true,
      };
    case types.ADD_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS:
      return {
        ...state,
        addingCommercials: false,
      };
    case types.ADD_COMMERCIALS_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        addingCommercials: false,
        addingCommercialsError: true,
      };
    // GET CUSTOMER COMMERCIALS DETAILS
    case types.GET_COMMERCIALS_BY_CUSTOMER_ID_REQUEST:
      return {
        ...state,
        fetchingCommercialsByCustomer: true,
      };
    case types.GET_COMMERCIALS_BY_CUSTOMER_ID_SUCCESS:
      return {
        ...state,
        fetchingCommercialsByCustomer: false,
        commercialsByCustomerId: action.payload,
      };
    case types.GET_COMMERCIALS_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        fetchingCommercialsByCustomer: false,
        fetchingCommercialsByCustomerError: true,
      };

    //ADD INVOICE

    case types.ADD_INVOICE_BY_CUSTOMER_ID_REQUEST:
      return {
        ...state,
        addingInvoice: true,
      };
    case types.ADD_INVOICE_BY_CUSTOMER_ID_SUCCESS:
      return {
        ...state,
        addingInvoice: false,
      };
    case types.ADD_INVOICE_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        addingInvoice: false,
        addingInvoiceError: true,
      };
    // GET INVOICE DETAILS
    case types.GET_INVOICE_BY_CUSTOMER_ID_REQUEST:
      return {
        ...state,
        fetchingInvoiceByCustomer: true,
      };
    case types.GET_INVOICE_BY_CUSTOMER_ID_SUCCESS:
      return {
        ...state,
        fetchingInvoiceByCustomer: false,
        invoiceByCustomerId: action.payload,
      };
    case types.GET_INVOICE_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        fetchingInvoiceByCustomer: false,
        fetchingInvoiceByCustomerError: true,
      };

    case types.UPDATE_CUSTOMER_OWNERSHIP_REQUEST:
      return { ...state, updatingCustomerOwenership: true };
    case types.UPDATE_CUSTOMER_OWNERSHIP_SUCCESS:
      return {
        ...state,
        updatingCustomerOwenership: false,
        // updateCandidateEmploymentModal: false,
        // employmentDetails: state.employmentDetails.map((employment, i) => {
        //   if (employment.id === action.payload.id) {
        //     return action.payload;
        //   } else {
        //     return employment;
        //   }
        // }),

        customerByUserId:state.customerByUserId.filter(
          (item)=>{
            console.log("abc",item,action.payload);

          return !action.payload.includes(item.customerId)  
          }
        ),

        teamCustomer:state.teamCustomer.filter(
          (item)=>{
            console.log("abc",item,action.payload);

          return !action.payload.includes(item.customerId)  
          }
        ),



        allCustomers:state.allCustomers.filter(
          (item)=>{
            console.log("abc",item,action.payload);

          return !action.payload.includes(item.customerId)  
          }
        )
      };
    case types.UPDATE_CUSTOMER_OWNERSHIP_FAILURE:
      return {
        ...state,
        updatingCustomerOwenership: false,
        updatingCustomerOwenershipError: true,
      };

    case types.ADD_CUSTOMER_NOTES_REQUEST:
      return {
        ...state,
        addingNotesByCustomerId: true,
      };
    case types.ADD_CUSTOMER_NOTES_SUCCESS:
      return {
        ...state,
        addingNotesByCustomerId: false,
        addingNotesByCustomerId: false,
        addCustomerSpeechModal: false,
      };
    case types.ADD_CUSTOMER_NOTES_FAILURE:
      return {
        ...state,
        addingNotesByCustomerId: false,
        addingNotesByContactIdError: true,
      };
    case types.HANDLE_CUSTOMER_DRAWER_MODAL:
      return {
        ...state,
        // addDrawerCustomerModal: action.payload
        addDrawerCustomerModal: action.payload.isVisible,
        customerDrawerProps: action.payload.props,
      };

    case types.HANDLE_UPDATE_CUSTOMER_DRAWER_MODAL:
      return {
        ...state,
        // addDrawerCustomerModal: action.payload
        updateDrawerCustomerModal: action.payload.isVisible,
        updateCustomerDrawerProps: action.payload.props,
      };

    case types.GET_CUSTOMER_KEY_SKILL_REQUEST:
      return {
        ...state,
        fetchingCustomerKeySkill: true,
        fetchingCustomerKeySkillError: false,
      };
    case types.GET_CUSTOMER_KEY_SKILL_SUCCESS:
      return {
        ...state,
        fetchingCustomerKeySkill: false,
        //fetchingCustomerKeySkillError: false,
        customerKeySkill: action.payload,
      };
    case types.GET_CUSTOMER_KEY_SKILL_FAILURE:
      return {
        ...state,
        fetchingCustomerKeySkill: false,
        fetchingCustomerKeySkillError: true,
      };

    case types.SET_CLEARBIT_DATA:
      return { ...state, clearbit: action.payload };

    case types.UPDATE_CUSTOMER_CONTACT_BY_ID_REQUEST:
      return { ...state, updateCustomerContactById: true };
    case types.UPDATE_CUSTOMER_CONTACT_BY_ID_SUCCESS:
      return {
        ...state,
        updateCustomerContactById: false,
        addUpdateCustomerContactModal: false,
        contactByCustomerId: state.contactByCustomerId.map((item) => {
          if (item.contactId === action.payload.contactId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };

    case types.GET_CUSTOMERS_DATA_REQUEST:
      return { ...state, fetchingCustomersData: true };
    case types.GET_CUSTOMERS_DATA_SUCCESS:
      return {
        ...state,
        fetchingCustomersData: false,
        customerData: action.payload,
      };
    case types.GET_CUSTOMERS_DATA_FAILURE:
      return {
        ...state,
        fetchingCustomersData: false,
        fetchingCustomersDataError: true,
      };

    case types.GET_INVESTOR_DATA_REQUEST:
      return { ...state, fetchingInvestorData: true };
    case types.GET_INVESTOR_DATA_SUCCESS:
      return {
        ...state,
        fetchingInvestorData: false,
        investorData: action.payload,
      };
    case types.GET_INVESTOR_DATA_FAILURE:
      return {
        ...state,
        fetchingInvestorData: false,
        fetchingInvestorDataError: true,
      };

    case types.UPDATE_CUSTOMER_CONTACT_BY_ID_FAILURE:
      return {
        ...state,
        updateCustomerContactById: false,
        updateCustomerContactByIdError: true,
      };
    case types.ADD_INITIATIVE_BY_CUSTOMER_ID_REQUEST:
      return { ...state, addingInitiativeByCustomerId: true };
    case types.ADD_INITIATIVE_BY_CUSTOMER_ID_SUCCESS:
      // console.clear()
      // console.log(action.payload)
      return {
        ...state,
        addingInitiativeByCustomerId: false,
        // topicsByCustomerId: [...state.topicsByCustomerId, action.payload],
      };
    case types.ADD_INITIATIVE_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        addingInitiativeByCustomerId: false,
        addingInitiativeByCustomerIdError: true,
      };

    case types.GET_INITIATIVE_BY_CUSTOMER_ID_REQUEST:
      return { ...state, fetchingInitiativeByCustomerId: true };
    case types.GET_INITIATIVE_BY_CUSTOMER_ID_SUCCESS:
      return {
        ...state,
        fetchingInitiativeByCustomerId: false,
        topicsByCustomerId: action.payload,
      };
    case types.GET_INITIATIVE_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        fetchingInitiativeByCustomerId: false,
        fetchingInitiativeByCustomerIdError: true,
      };

    case types.DELETE_TOPIC_BY_CUSTOMER_ID_REQUEST:
      return { ...state, deletingTopicByCustomerId: true };
    case types.DELETE_TOPIC_BY_CUSTOMER_ID_SUCCESS:
      return { ...state, deletingTopicByCustomerId: false };
    case types.DELETE_TOPIC_BY_CUSTOMER_ID_FAILURE:
      return {
        ...state,
        deletingTopicByCustomerId: false,
        deletingTopicByCustomerIdError: true,
      };

    case types.GET_CUSTOMER_PROJECT_REQUEST:
      return { ...state, fetchingCustomerProject: true };
    case types.GET_CUSTOMER_PROJECT_SUCCESS:
      return {
        ...state,
        fetchingCustomerProject: false,
        customerProject: action.payload,
      };
    case types.GET_CUSTOMER_PROJECT_FAILURE:
      return {
        ...state,
        fetchingCustomerProject: false,
        fetchingCustomerProjectError: true,
      };

    //get recruit
    case types.GET_CUSTOMER_RECRUIT_REQUEST:
      return {
        ...state,
        fetchingCustomerRecruit: true,
      };
    case types.GET_CUSTOMER_RECRUIT_SUCCESS:
      return {
        ...state,
        fetchingCustomerRecruit: false,
        customerRecruit: action.payload,
      };
    case types.GET_CUSTOMER_RECRUIT_FAILURE:
      return {
        ...state,
        fetchingCustomerRecruit: false,
        fetchingCustomerRecruitError: true,
      };

    case types.GET_LATEST_CUSTOMER_REQUEST:
      return { ...state, fetchinglatestCustomer: true };
    case types.GET_LATEST_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchinglatestCustomer: false,
        latestCustomer: action.payload,
      };
    case types.GET_LATEST_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchinglatestCustomer: false,
        fetchinglatestCustomerError: true,
      };

    case types.GET_CUSTOMER_REQUIREMENT_REQUEST:
      return {
        ...state,
        fetchingCustomerRequirement: true,
      };
    case types.GET_CUSTOMER_REQUIREMENT_SUCCESS:
      return {
        ...state,
        fetchingCustomerRequirement: false,
        customerRequirement: action.payload,
      };
    case types.GET_CUSTOMER_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchingCustomerRequirement: false,
        fetchingCustomerRequirementError: true,
      };

    case types.GET_CUSTOMER_CLOSER_REQUEST:
      return {
        ...state,
        fetchingCustomerCloser: true,
      };
    case types.GET_CUSTOMER_CLOSER_SUCCESS:
      return {
        ...state,
        fetchingCustomerCloser: false,
        customerCloser: action.payload,
      };
    case types.GET_CUSTOMER_CLOSER_FAILURE:
      return {
        ...state,
        fetchingCustomerCloser: false,
        fetchingCustomerCloserError: true,
      };




    case types.GET_CUSTOMER_NOTE_LIST_REQUEST:
      return {
        ...state,
        fetchingCustomerNoteList: true,
      };
    case types.GET_CUSTOMER_NOTE_LIST_SUCCESS:
      return {
        ...state,
        fetchingCustomerNoteList: false,
        customerNoteList: action.payload,
      };
    case types.GET_CUSTOMER_NOTE_LIST_FAILURE:
      return {
        ...state,
        fetchingCustomerNoteList: false,
        fetchingCustomerNoteListError: true,
      };

    case types.UPDATE_CUSTOMER_INITIATIVE_REQUEST:
      return { ...state, updateCustomerInitiatives: true };
    case types.UPDATE_CUSTOMER_INITIATIVE_SUCCESS:
      return {
        ...state,
        updateCustomerInitiatives: false,
        updateCustomerInitiativeModal: false,
        initiatives: state.initiatives.map((item) => {
          if (item.initiativeDetailsId === action.payload.initiativeDetailsId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_CUSTOMER_INITIATIVE_FAILURE:
      return {
        ...state,
        updateCustomerInitiatives: false,
        updateCustomerInitiativesError: true,
      };

    case types.GET_ALL_CUSTOMER_BY_ALPHABET_REQUEST:
      return { ...state, fetchingAllCustomerByAlphabet: true };
    case types.GET_ALL_CUSTOMER_BY_ALPHABET_SUCCESS:
      return {
        ...state,
        fetchingAllCustomerByAlphabet: false,
        latestCustomer: [...action.payload],
      };
    case types.GET_ALL_CUSTOMER_BY_ALPHABET_FAILURE:
      return {
        ...state,
        fetchingAllCustomerByAlphabet: false,
        fetchingAllCustomerByAlphabetError: true,
      };

    case types.GET_ALL_CUSTOMER_BY_POSITION_REQUEST:
      return { ...state, fetchingAllCustomerByPosition: true };
    case types.GET_ALL_CUSTOMER_BY_POSITION_SUCCESS:
      return {
        ...state,
        fetchingAllCustomerByPosition: false,
        customerRequirement: [...action.payload],
      };
    case types.GET_ALL_CUSTOMER_BY_POSITION_FAILURE:
      return {
        ...state,
        fetchingAllCustomerByPosition: false,
        fetchingAllCustomerByPositionError: true,
      };

    case types.GET_ALL_CUSTOMER_BY_CLOSER_REQUEST:
      return { ...state, fetchingAllCustomerByCloser: true };
    case types.GET_ALL_CUSTOMER_BY_CLOSER_SUCCESS:
      return {
        ...state,
        fetchingAllCustomerByCloser: false,
        customerCloser: [...action.payload],
      };
    case types.GET_ALL_CUSTOMER_BY_CLOSER_FAILURE:
      return {
        ...state,
        fetchingAllCustomerByCloser: false,
        fetchingAllCustomerByCloserError: true,
      };





      case types.ADD_CUSTOMER_IMPORT_FORM_REQUEST:
        return { ...state, addingCustomerImportForm: true };
      case types.ADD_CUSTOMER_IMPORT_FORM_SUCCESS:
        return {
          ...state,
          addingCustomerImportForm: false,
          addCustomerImportModal: false,
          // organizationDocumentDrawer: false,
          // repositoryData: [
          //   action.payload,
          //   ...state.repositoryData,
          //  ],
  
        };
      case types.ADD_CUSTOMER_IMPORT_FORM_FAILURE:
        return {
          ...state, addingCustomerImportForm: false,
          addingCustomerImportFormError:true,
          // addCustomerModal: false 
        };

    case types.HANDLE_CUSTOMER_EMAIL_DRAWER_MODAL:
      return { ...state, addDrawerCustomerEmailModal: action.payload };

    case types.ADD_INITIATIVES_REQUEST:
      return { ...state, addingInitiatives: true };
    case types.ADD_INITIATIVES_SUCCESS:
      return {
        ...state,
        addingInitiatives: false,
      };
    case types.ADD_INITIATIVES_FAILURE:
      return {
        ...state,
        addingInitiatives: false,
        addingInitiativesError: true,
      };

    case types.GET_INITIATIVES_REQUEST:
      return { ...state, fetchingInitiatives: true };
    case types.GET_INITIATIVES_SUCCESS:
      return {
        ...state,
        fetchingInitiatives: false,
        initiatives: action.payload,
      };
    case types.GET_INITIATIVES_FAILURE:
      return {
        ...state,
        fetchingInitiatives: false,
        fetchingInitiativesError: true,
      };

    case types.DELETE_INITIATIVE_DATA_REQUEST:
      return { ...state, deleteInitiativeData: true };
    case types.DELETE_INITIATIVE_DATA_SUCCESS:
      return {
        ...state,
        deleteInitiativeData: false,
        // initiatives:action.payload,

        initiatives: state.initiatives.filter(
          // console.log("item",item),
          (item) => item.initiativeDetailsId !== action.payload
        ),
      };
    case types.DELETE_INITIATIVE_DATA_FAILURE:
      return {
        ...state,
        deleteInitiativeData: false,
        deleteInitiativeDataError: true,
      };

    case types.GET_CUSTOMER_PAGINATION_REQUEST:
      return { ...state, fetchingCustomerPagination: true };
    case types.GET_CUSTOMER_PAGINATION_SUCCESS:
      return {
        ...state,
        fetchingCustomerPagination: false,
        // partnerPagination: [
        //   ...state.partnerPagination,
        //   ...action.payload],
        customerByUserId: action.payload,
      };
    case types.GET_CUSTOMER_PAGINATION_FAILURE:
      return {
        ...state,
        fetchingCustomerPagination: false,
        fetchingCustomerPaginationError: true,
      };

    // case types.GET_CUSTOMERS_LIST_REQUEST:
    //   return { ...state, fetchingCustomersList: true };
    // case types.GET_CUSTOMERS_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     fetchingCustomersList: false,
    //      customerByList: action.payload,

    //   };
    // case types.GET_CUSTOMERS_LIST_FAILURE:
    //   return {
    //     ...state,
    //     fetchingCustomersList: false,
    //     fetchingCustomersListError: true,
    //   };

    case types.LINKED_PROJECT_TASK_REQUEST:
      return { ...state, linkedProjectTask: true };
    case types.LINKED_PROJECT_TASK_SUCCESS:
      return {
        ...state,
        linkedProjectTask: false,
        linkedcustomerProjectTask: action.payload,
      };
    case types.LINKED_PROJECT_TASK_FAILURE:
      return {
        ...state,
        linkedProjectTask: false,
        linkedProjectTaskError: true,
      };

    case types.GET_ATTENDANCE_LIST_REQUEST:
      return { ...state, fetchingAttendanceList: true };
    case types.GET_ATTENDANCE_LIST_SUCCESS:
      return {
        ...state,
        fetchingAttendanceList: false,
        attendanceByList: action.payload,
      };
    case types.GET_ATTENDANCE_LIST_FAILURE:
      return {
        ...state,
        fetchingAttendanceList: false,
        fetchingAttendanceListError: true,
      };

    case types.GET_CUSTOMERS_FILTER_DATA_REQUEST:
      return { ...state, fetchingFilterCustomers: true };
    case types.GET_CUSTOMERS_FILTER_DATA_SUCCESS:
      return {
        ...state,
        fetchingFilterCustomers: false,
        customerByUserId: action.payload,

        // customerByUserId: [
        //   ...state.customerByUserId,
        //   ...action.payload],
      };
    case types.GET_CUSTOMERS_FILTER_DATA_FAILURE:
      return {
        ...state,
        fetchingFilterCustomers: false,
        fetchingFilterCustomersError: true,
      };

    case types.GET_ALL_CUSTOMERS_DATA_REQUEST:
      return { ...state, fetchingAllCustomersData: true };
    case types.GET_ALL_CUSTOMERS_DATA_SUCCESS:
      return {
        ...state,
        fetchingAllCustomersData: false,
        allCustomerData: action.payload,
      };
    case types.GET_ALL_CUSTOMERS_DATA_FAILURE:
      return {
        ...state,
        fetchingAllCustomersData: false,
        fetchingAllCustomersDataError: true,
      };

    case types.HANDLE_CUSTOMER_NOTES_DRAWER_MODAL:
      return { ...state, addDrawerCustomerNotesModal: action.payload };

    case types.HANDLE_CUSTOMER_PULSE_DRAWER_MODAL:
      return { ...state, addDrawerCustomerPulseModal: action.payload };

    case types.HANDLE_CUSTOMER_CONTACT_DRAWER_MODAL:
      return { ...state, addDrawerCustomerContactModal: action.payload };

    case types.HANDLE_CUSTOMER_OPPORTUNITY_DRAWER_MODAL:
      return { ...state, addDrawerCustomerOpportunityModal: action.payload };

      case types.HANDLE_ADDRESS_CUSTOMER_MODAL:
        return { ...state, addAddressCustomerModal: action.payload };

    case types.GET_OPPORTUNITY_RECORD_REQUEST:
      return { ...state, fetchingOpportunityRecord: true };
    case types.GET_OPPORTUNITY_RECORD_SUCCESS:
      return {
        ...state,
        fetchingOpportunityRecord: false,
        opportunityRecord: action.payload,
      };
    case types.GET_OPPORTUNITY_RECORD_FAILURE:
      return {
        ...state,
        fetchingOpportunityRecord: false,
        fetchingOpportunityRecordError: true,
      };

    case types.GET_CUSTOMER_ACTIVITY_TIMELINE_REQUEST:
      return { ...state, fetchingCusActivityTimelineStatus: true };
    case types.GET_CUSTOMER_ACTIVITY_TIMELINE_SUCCESS:
      return {
        ...state,
        fetchingCusActivityTimelineStatus: false,
        customerActivityTimeline: action.payload,
      };
    case types.GET_CUSTOMER_ACTIVITY_TIMELINE_FAILURE:
      return {
        ...state,
        fetchingCusActivityTimelineStatus: false,
        fetchingCusActivityTimelineStatusError: true,
      };



    case types.HANDLE_CUSTOMER_NOTE_DRAWER_MODAL:
      return { ...state, addCustomerNoteDrawerModal: action.payload };

    case types.CUSTOMER_TO_ACCOUNT_CONVERT_REQUEST:
      return {
        ...state,
        convertingCustomerToAccount: true,
      };
    case types.CUSTOMER_TO_ACCOUNT_CONVERT_SUCCESS:
      return {
        ...state,
        convertingCustomerToAccount: false,
        customerByUserId: state.customerByUserId.filter(
          (item) => item.customerId !== action.payload
        ),
      };
    case types.CUSTOMER_TO_ACCOUNT_CONVERT_FAILURE:
      return {
        ...state,
        convertingCustomerToAccount: false,
        convertingCustomerToAccountError: true,
      };

    case types.GET_ALL_CUSTOMERS_LIST_REQUEST:
      return { ...state, fetchingAllCustomerList: true };
    case types.GET_ALL_CUSTOMERS_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllCustomerList: false,
        allCustomers: action.payload,
      };
    case types.GET_ALL_CUSTOMERS_LIST_FAILURE:
      return {
        ...state,
        fetchingAllCustomerList: false,
        fetchingAllCustomerListError: true,
      };

      case types.DELETE_CUSTOMER_REQUEST:
      return { ...state, deletingCustomerById: true };
    case types.DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        deletingCustomerById: false,
        customerByUserId: state.customerByUserId.filter(
          (item) => item.customerId !== action.payload.customerId
        ),
      };
    case types.DELETE_CUSTOMER_FAILURE:
      return {
        ...state,
        deletingCustomerById: false,
        deletingCustomerByIdError: true,
      };

    case types.ADD_CUSTOMER_ACTIVITY_CALL_REQUEST:
      return { ...state, addingCustomerActivityCall: true };
    case types.ADD_CUSTOMER_ACTIVITY_CALL_SUCCESS:
      return {
        ...state,
        addDistributorActivityModal:false,
        addingCustomerActivityCall: false,
        callActivityModal: false,
        activityDistributor:action.payload,
        customerActivityTimeline: [
          action.payload,
          ...state.customerActivityTimeline,
        ],
      };
    case types.ADD_CUSTOMER_ACTIVITY_CALL_FAILURE:
      return {
        ...state,
        addingCustomerActivityCall: false,
        callActivityModal: false,
      };

    case types.ADD_CUSTOMER_ACTIVITY_EVENT_REQUEST:
      return { ...state, addingCustomerActivityEvent: true };
    case types.ADD_CUSTOMER_ACTIVITY_EVENT_SUCCESS:
      return {
        ...state,
        addingCustomerActivityEvent: false,
        addDistributorActivityModal:false,
        callActivityModal: false,
        customerActivityTimeline: [
          action.payload,
          ...state.customerActivityTimeline,
        ],
      };
    case types.ADD_CUSTOMER_ACTIVITY_EVENT_FAILURE:
      return {
        ...state,
        addingCustomerActivityEvent: false,
        callActivityModal: false,
      };
    case types.ADD_CUSTOMER_ACTIVITY_TASK_REQUEST:
      return { ...state, addingCustomerActivityTask: true };
    case types.ADD_CUSTOMER_ACTIVITY_TASK_SUCCESS:
      return {
        ...state,
        addingCustomerActivityTask: false,
        callActivityModal: false,

        customerActivityTimeline: [
          action.payload,
          ...state.customerActivityTimeline,
        ],
      };
    case types.ADD_CUSTOMER_ACTIVITY_TASK_FAILURE:
      return {
        ...state,
        addingCustomerActivityTask: false,
        callActivityModal: false,
      };

    case types.GET_TEAM_CUSTOMER_REQUEST:
      return { ...state, fetchingTeamCustomer: true };
    case types.GET_TEAM_CUSTOMER_SUCCESS:
      return {
        ...state,
        fetchingTeamCustomer: false,
        teamCustomer: action.payload,
      };
    case types.GET_TEAM_CUSTOMER_FAILURE:
      return {
        ...state,
        fetchingTeamCustomer: false,
        fetchingTeamCustomerError: true,
      };
    case types.HANDLE_CLAER_REDUCER_DATA_CUSTOMER:
      return {
        ...state,
        customerSearch: [],
        // deletedTruck: []
      };

    case types.LINK_CUSTOMER_CONTRACT_REQUEST:
      return { ...state, customerContractStatus: true };
    case types.LINK_CUSTOMER_CONTRACT_SUCCESS:
      return {
        ...state,
        contractCusStatus: false,
        // addTeamTransferModal: false,
      };
    case types.LINK_CUSTOMER_CONTRACT_FAILURE:
      return {
        ...state,
        customerContractStatus: false,
        customerContractStatusError: true,
      };

    case types.GET_PROSPECT_WEIGHTED_VALUE_REQUEST:
      return {
        ...state,
        fetchingWeightedValue: true,
        fetchingWeightedValueError: false,
      };
    case types.GET_PROSPECT_WEIGHTED_VALUE_SUCCESS:
      return {
        ...state,
        fetchingWeightedValue: false,
        fetchingWeightedValueError: false,
        WeightedValue: action.payload,
      };
    case types.GET_PROSPECT_WEIGHTED_VALUE_FAILURE:
      return {
        ...state,
        fetchingWeightedValue: false,
        fetchingWeightedValueError: true,
      };

    case types.GET_PROSPECT_OPP_VALUE_REQUEST:
      return { ...state, fetchingOppValue: true, fetchingOppValueError: false };
    case types.GET_PROSPECT_OPP_VALUE_SUCCESS:
      return {
        ...state,
        fetchingOppValue: false,
        fetchingOppValueError: false,
        OppValue: action.payload,
      };
    case types.GET_PROSPECT_OPP_VALUE_FAILURE:
      return { ...state, fetchingOppValue: false, fetchingOppValueError: true };

    case types.GET_PROSPECT_PIPELINE_VALUE_REQUEST:
      return {
        ...state,
        fetchingPipelineValue: true,
        fetchingPipelineValueError: false,
      };
    case types.GET_PROSPECT_PIPELINE_VALUE_SUCCESS:
      return {
        ...state,
        fetchingPipelineValue: false,
        fetchingPipelineValueError: false,
        pipelineValue: action.payload,
      };
    case types.GET_PROSPECT_PIPELINE_VALUE_FAILURE:
      return {
        ...state,
        fetchingPipelineValue: false,
        fetchingPipelineValueError: true,
      };

    case types.GET_PROSPECT_CONTACT_VALUE_REQUEST:
      return {
        ...state,
        fetchingContactValue: true,
        fetchingContactValueError: false,
      };
    case types.GET_PROSPECT_CONTACT_VALUE_SUCCESS:
      return {
        ...state,
        fetchingContactValue: false,
        fetchingContactValueError: false,
        contactValue: action.payload,
      };
    case types.GET_PROSPECT_CONTACT_VALUE_FAILURE:
      return {
        ...state,
        fetchingContactValue: false,
        fetchingContactValueError: true,
      };

      case types.GET_PROSPECT_CONTACT_COUNT_REQUEST:
      return {
        ...state,
        fetchingContactCount: true,
        fetchingContactCountError: false,
      };
    case types.GET_PROSPECT_CONTACT_COUNT_SUCCESS:
      return {
        ...state,
        fetchingContactCount: false,
        fetchingContactCountError: false,
        contactCount: action.payload,
      };
    case types.GET_PROSPECT_CONTACT_COUNT_FAILURE:
      return {
        ...state,
        fetchingContactCount: false,
        fetchingContactCountError: true,
      };

    case types.GET_CUSTOMER_ACTIVITY_RECORDS_REQUEST:
      return { ...state, fetchingCustomerActivityCount: true };
    case types.GET_CUSTOMER_ACTIVITY_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingCustomerActivityCount: false,
        customerActivityCount: action.payload,
      };
    case types.GET_CUSTOMER_ACTIVITY_RECORDS_FAILURE:
      return {
        ...state,
        fetchingCustomerActivityCount: false,
        fetchingCustomerActivityCountError: true,
      };

    case types.GET_WON_CUSTOMER_OPP_VALUE_REQUEST:
      return {
        ...state,
        fetchingWonCustomerOppValue: true,
        fetchingWonInvestorOppValueError: false,
      };
    case types.GET_WON_CUSTOMER_OPP_VALUE_SUCCESS:
      return {
        ...state,
        fetchingWonCustomerOppValue: false,
        fetchingWonCustomerOppValueError: false,
        WonCustomerOpp: action.payload,
      };
    case types.GET_WON_CUSTOMER_OPP_VALUE_FAILURE:
      return {
        ...state,
        fetchingWonCustomerOppValue: false,
        fetchingWonCustomerOppValueError: true,
      };

    case types.GET_WON_CUSTOMER_PIPELINE_VALUE_REQUEST:
      return {
        ...state,
        fetchingWonCusPipelineValue: true,
        fetchingWonInvPipelineValueError: false,
      };
    case types.GET_WON_CUSTOMER_PIPELINE_VALUE_SUCCESS:
      return {
        ...state,
        fetchingWonCusPipelineValue: false,
        fetchingWonCusPipelineValueError: false,
        WonCustomerPipeline: action.payload,
      };
    case types.GET_WON_CUSTOMER_PIPELINE_VALUE_FAILURE:
      return {
        ...state,
        fetchingWonCusPipelineValue: false,
        fetchingWonCusPipelineValueError: true,
      };

    case types.GET_WON_CUSTOMER_WEIGHTED_VALUE_REQUEST:
      return {
        ...state,
        fetchingWonCusmWeightedValue: true,
        fetchingWonINVWeightedValueError: false,
      };
    case types.GET_WON_CUSTOMER_WEIGHTED_VALUE_SUCCESS:
      return {
        ...state,
        fetchingWonCusmWeightedValue: false,
        fetchingWonCusmWeightedValueError: false,
        WonCustomerWeighted: action.payload,
      };
    case types.GET_WON_CUSTOMER_WEIGHTED_VALUE_FAILURE:
      return {
        ...state,
        fetchingWonCusmWeightedValue: false,
        fetchingWonCusmWeightedValueError: true,
      };

    case types.HANDLE_CAMPAIGN_DRAWER:
      return { ...state, openCampaigndrwr: action.payload };

    case types.ADD_CUSTOMER_EVENT_REQUEST:
      return {
        ...state,
        addingCustomerEvent: true,
      };
    case types.ADD_CUSTOMER_EVENT_SUCCESS:
      return {
        ...state,
        openCampaigndrwr: false,
        addingCustomerEvent: false,
        addingCustomerEventError: false,
        // customerCampaign:[action.payload,...state.customerCampaign],
      };
    case types.ADD_CUSTOMER_EVENT_FAILURE:
      return {
        ...state,
        addingCustomerEvent: false,
        addingCustomerEventError: true,
      };

    case types.ADD_CUSTOMER_CAMPAIGN_EVENT_REQUEST:
      return {
        ...state,
        addingCustomerCampaignEvent: true,
        fetchingWonInvPipelineValueError: false,
      };
    case types.ADD_CUSTOMER_CAMPAIGN_EVENT_SUCCESS:
      return {
        ...state,
        addingCustomerCampaignEvent: false,
        addingCustomerCampaignEventError: false,

      };
    case types.ADD_CUSTOMER_CAMPAIGN_EVENT_FAILURE:
      return {
        ...state,
        addingCustomerCampaignEvent: false,
        addingCustomerCampaignEventError: true,
      };

    case types.GET_CUSTOMER_CAMPAIGN_EVENT_REQUEST:
      return {
        ...state,
        fetchingCustomerCampaign: true,
      };
    case types.GET_CUSTOMER_CAMPAIGN_EVENT_SUCCESS:
      return {
        ...state,
        fetchingCustomerCampaign: false,
        customerCampaign: action.payload,
      };
    case types.GET_CUSTOMER_CAMPAIGN_EVENT_FAILURE:
      return {
        ...state,
        fetchingCustomerCampaign: false,
        fetchingCustomerCampaignError: true,
      };

    case types.GET_CUSTOMER_ALL_RECORDS_REQUEST:
      return { ...state, fetchingCustomerAllRecords: true };
    case types.GET_CUSTOMER_ALL_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingCustomerAllRecords: false,
        customerAllRecordData: action.payload,
      };
    case types.GET_CUSTOMER_ALL_RECORDS_FAILURE:
      return {
        ...state,
        fetchingCustomerAllRecords: false,
        fetchingCustomerAllRecordsError: true,
      };


    case types.HANDLE_CUSTOMER_CONTACT_JUMPSTART_MODAL:
      return { ...state, addCustomerContactJumpstartModal: action.payload };

    case types.HANDLE_CUSTOMER_ACTIVITY_JUMPSTART_MODAL:
      return { ...state, addCustomerActivityJumpstartModal: action.payload };

    case types.HANDLE_CUSTOMER_OPEN_OPPORTUNITY_JUMPSTART_MODAL:
      return { ...state, addCustomerOpenOppJumpstartModal: action.payload };

    case types.HANDLE_CUSTOMER_WON_OPPORTUNITY_JUMPSTART_MODAL:
      return { ...state, addCustomerWonOppJumpstartModal: action.payload };


    case types.GET_CONTACTS_OF_JUMPSTART_REQUEST:
      return { ...state, fetchingCustContactsJumpstart: true };
    case types.GET_CONTACTS_OF_JUMPSTART_SUCCESS:
      return {
        ...state,
        fetchingCustContactsJumpstart: false,
        contactOfCustJumpstart: action.payload,
        // contactByUserId: [
        //   ...state.contactByUserId,
        //   ...action.payload],

      };
    case types.GET_CONTACTS_OF_JUMPSTART_FAILURE:
      return { ...state, fetchingCustContactsJumpstart: false, fetchingCustContactsJumpstartError: true };

    case types.GET_OPEN_OPP_OF_JUMPSTART_REQUEST:
      return { ...state, fetchingCustOpenOppJumpstart: true };
    case types.GET_OPEN_OPP_OF_JUMPSTART_SUCCESS:
      return {
        ...state,
        fetchingCustOpenOppJumpstart: false,
        openOppOfCustJumpstart: action.payload,
        // contactByUserId: [
        //   ...state.contactByUserId,
        //   ...action.payload],

      };
    case types.GET_OPEN_OPP_OF_JUMPSTART_FAILURE:
      return { ...state, fetchingCustOpenOppJumpstart: false, fetchingCustOpenOppJumpstartError: true };



    case types.GET_WON_OPP_OF_JUMPSTART_REQUEST:
      return { ...state, fetchingCustWonOppJumpstart: true };
    case types.GET_WON_OPP_OF_JUMPSTART_SUCCESS:
      return {
        ...state,
        fetchingCustWonOppJumpstart: false,
        wonOppOfCustJumpstart: action.payload,
        // contactByUserId: [
        //   ...state.contactByUserId,
        //   ...action.payload],

      };
    case types.GET_WON_OPP_OF_JUMPSTART_FAILURE:
      return { ...state, fetchingCustWonOppJumpstart: false, fetchingCustWonOppJumpstartError: true };

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

      case types.GET_OPPORTUNITY_DOCUMENTS_REQUEST:
        return {
          ...state,
          fetchingDocumentsByOpportunityId: true,
          fetchingDocumentsByOpportunityIdError: false,
        };
      case types.GET_OPPORTUNITY_DOCUMENTS_SUCCESS:
        return {
          ...state,
          fetchingDocumentsByOpportunityId: false,
          fetchingDocumentsByOpportunityIdError: false,
          documentsByOpportunityId: action.payload,
        };
      case types.GET_OPPORTUNITY_DOCUMENTS_FAILURE:
        return {
          ...state,
          fetchingDocumentsByOpportunityId: false,
          fetchingDocumentsByOpportunityIdError: true,
        };


        case types.GET_DEAL_DOCUMENTS_REQUEST:
          return {
            ...state,
            fetchingDocumentsByDealId: true,
            fetchingDocumentsByDealIdError: false,
          };
        case types.GET_DEAL_DOCUMENTS_SUCCESS:
          return {
            ...state,
            fetchingDocumentsByDealId: false,
            fetchingDocumentsByDealIdError: false,
            documentsByInnOppId: action.payload,
          };
        case types.GET_DEAL_DOCUMENTS_FAILURE:
          return {
            ...state,
            fetchingDocumentsByDealId: false,
            fetchingDocumentsByDealIdError: true,
          };

          case types.GET_INVESTOR_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByInvestorId: true,
        fetchingDocumentsByInvestorIdError: false,
      };
    case types.GET_INVESTOR_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByInvestorId: false,
        fetchingDocumentsByInvestorIdError: false,
        documentsByInvestorId: action.payload,
      };
    case types.GET_INVESTOR_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByInvestorId: false,
        fetchingDocumentsByInvestorIdError: true,
      };

      case types.GET_TEAM_USERLIST_REQUEST:
      return {
        ...state,
        fetchingTeamUserList: true,
        fetchingTeamUserListError: false,
      };
    case types.GET_TEAM_USERLIST_SUCCESS:
      return {
        ...state,
        fetchingTeamUserList: false,
        fetchingTeamUserListError: false,
        teamUserList: action.payload,
      };
    case types.GET_TEAM_USERLIST_FAILURE:
      return {
        ...state,
        fetchingTeamUserList: false,
        fetchingTeamUserListError: true,
      };


      case types.HANDLE_CUSTOMER_ACTIVITY_MODAL:
        return { ...state, addCustomerActivityDrawerModal: action.payload };


        case types.UPDATE_ACTIVITY_CALL_FORM_REQUEST:
          return { ...state, updatingActivityCallForm: true };
      case types.UPDATE_ACTIVITY_CALL_FORM_SUCCESS:
          return {
              ...state,
              updatingActivityCallForm: false,
              addCustomerActivityDrawerModal: false,
              customerActivityTimeline: state.customerActivityTimeline.map((item) => {
                  if (item.callId == action.payload.callId) {
                      return action.payload;
                  } else {
                      return item;
                  }
              }),
        
          };
      case types.UPDATE_ACTIVITY_CALL_FORM_FAILURE:
          return {
              ...state,
              updatingActivityCallForm: false,
              updatingActivityCallFormError: true,
          };


          
        case types.UPDATE_ACTIVITY_TASK_FORM_REQUEST:
          return { ...state, updatingActivityTaskForm: true };
      case types.UPDATE_ACTIVITY_TASK_FORM_SUCCESS:
          return {
              ...state,
              updatingActivityTaskForm: false,
              addCustomerActivityDrawerModal: false,
              customerActivityTimeline: state.customerActivityTimeline.map((item) => {
                  if (item.taskId == action.payload.taskId) {
                      return action.payload;
                  } else {
                      return item;
                  }
              }),
        
          };
      case types.UPDATE_ACTIVITY_TASK_FORM_FAILURE:
          return {
              ...state,
              updatingActivityTaskForm: false,
              updatingActivityTaskFormError: true,
          };

          case types.UPDATE_ACTIVITY_EVENT_FORM_REQUEST:
            return { ...state, updatingActivityEventForm: true };
        case types.UPDATE_ACTIVITY_EVENT_FORM_SUCCESS:
            return {
                ...state,
                updatingActivityEventForm: false,
                addCustomerActivityDrawerModal: false,
                customerActivityTimeline: state.customerActivityTimeline.map((item) => {
                    if (item.eventId == action.payload.eventId) {
                        return action.payload;
                    } else {
                        return item;
                    }
                }),
          
            };
        case types.UPDATE_ACTIVITY_EVENT_FORM_FAILURE:
            return {
                ...state,
                updatingActivityEventForm: false,
                updatingActivityEventFormError: true,
            };

            case types.SET_ACTIVITY_EVENTS_EDIT:
              return { ...state, setActivityEditingEvents: action.payload };
        
    
  

    default:
      return state;
  }
};

const newDateRange = (dateRange, newDate) =>
  dateRange.map((range) => {
    console.log(newDate);
    if (range.id === newDate.id) {
      return { ...range, isSelected: true };
    } else {
      return { ...range, isSelected: false };
    }
  });