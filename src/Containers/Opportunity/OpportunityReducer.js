import * as types from "./OpportunityActionTypes";
import dayjs from "dayjs";
const initialState = {
  viewType: "table",

  addOpportunityModal: false,
  addRecruiterModal: false,

  updatePulseModal:false,

  fetchingAllOpportunityData: false,
  fetchingAllOpportunityDataError: false,
  allOpportunityData: [],

  fetchingWonRecords: false,
  fetchingWonRecordsError: false,
  wonOpportunityData: {},

  fetchingInitiativeSkills: false,
  fetchingInitiativeSkillsError: false,
  initiativeSkills: [],

  deleteOpportunity: false,
  deleteOpportunityError: false,

  addMonsterModal: false,

  addDrawerOpportunityModal: false,

  //email stage
  emailingStage: false,
  emailingStageError: false,

  addingWebsite: false,
  addingWebsiteError: false,

  fetchingRecruiterRequirement: false,
  fetchingRecruiterRequirementError: false,
  recruiterRequirement: [],

  fetchingJobOccupation: false,
  fetchingJobOccupationError: false,
  jobOccupation: [],

  linkClosedOpportunity: false,
  linkClosedOpportunityError: false,
  opportunityByUserId: {},

  statusRecruitToOpportunity: false,
  statusRecruitToOpportunityError: false,
  // unpublishSummary: false,
  // unpublishSummaryError: false,

  loststatusRecruitToOpportunity: false,
  loststatusRecruitToOpportunityError: false,

  addRemarksModal: false,
  addRequirementDetailModal: false,
  setAddRequirement: {},

  addSentimentModal: false,

  addingOpportunity: false,
  addingOpportunityError: false,

  selectingOpportunity: false,
  selectingOpportunityError: false,

  opportunityContractStatus: false,
  opportunityContractStatusError: false,

  reInstateToggleForlost: false,
  reInstateToggleForlostError: false,

  fetchingJobBoardName: false,
  fetchingJobBoardNameError: false,
  jobBoardName: [],

  fetchingOpportunityTeamRecordsByUserId: false,
  fetchingOpportunityTeamRecordsByUserIdError: false,
  opportunityTeamRecordData: {},

  linkingtagCustomerOpportunity: false,
  linkingtagCustomerOpportunityError: false,

  fetchingOpportunity: false,
  fetchingOpportunityError: false,
  opportunityByUserId: [],

  fetchingAllOpportunities: false,
  fetchingAllOpportunitiesError: false,
  allopportunitiesByUserId: [],

  currentOpportunityRecruitmentData: null,
  currentRecruiterData: {},

  updateRemarkModal: false,

  // publishSummary: false,
  // publishSummaryError: false,

  fetchingOpportunityDetailsById: false,
  fetchingOpportunityDetailsByIdError: false,
  opportunity: {},

  fetchingAllRecords: false,
  fetchingAllRecordsError: false,
  allOpportunityRecords: {},

  documentUploadModal: false,
  addSponsorModal: false,

  fetchingNotesListByOpportunityId: false,
  fetchingNotesListByOpportunityIdError: false,
  notesListByOpportunityId: [],

  fetchingAllRecruitmentPositionByOppId: false,
  fetchingAllRecruitmentPositionByOppIdError: false,
  allRecruitmentPositionByOppId: "",

  fetchingSkillsCount: false,
  fetchingSkillsCountError: true,
  skillsCount: [],

  setEditingRemark: {},

  addRecruitModal: false,

  addCustomerModal: false,

  addingSentiment: false,
  addingSentimentError: false,
  sentiment: {},

  addTagProfileModal: false,

  updateOpportunityModal: false,

  setEditingOpportunity: {},

  updateOpportunityById: false,
  updateOpportunityByIdError: false,

  linkingMonster: false,
  linkingMonsterError: false,

  fetchingAllRecruitmentByOppId: false,
  fetchingAllRecruitmentByOppIdError: false,
  allRecruitmentByOppId: "",

  addingDocumentByOpportunityId: false,
  addingDocumentByOpportunityIdError: false,

  fetchingDocumentsByOpportunityId: false,
  fetchingDocumentsByOpportunityIdError: false,
  documentsByOpportunityId: [],
  //search
  fetchingOpportunityInputSearchData: false,
  fetchingOpportunityInputSearchDataError: false,
  ooportunitySerachedData: [],

  addRequirementModal: false,

  updatingReqStage: false,

  fetchingContactListByOpportunityId: false,
  fetchingContactListByOpportunityIdError: false,
  contactListByOpportunityId: [],

  fetchingClosedRequirement: false,
  fetchingClosedRequirement: false,
  closedRequiremnt: [],

  linkClosedRequirement: false,
  linkClosedRequirementError: false,

  addDrawerOpportunityNotesModal: false,

  linkingRecruitToOpportunity: false,
  linkingRecruitToOpportunityError: false,

  fetchingRecruitToOpportunity: false,
  fetchingRecruitToOpportunityError: false,
  recruitByOpportunityId: [],

  addingOpportunitySkills: false,
  addingOpportunitySkillsError: false,
  addedOpportunity:{},

  updateRemark: false,
  updateRemarkError: false,

  fetchingCandidateRequirement: false,
  fetchingCandidateRequirementError: false,
  candidateRequirement: [],

  fetchingInitiative: false,
  fetchingInitiativeError: false,
  initiatives: [],

  fetchingWorkflow: false,
  fetchingWorkflowError: false,
  workflow: [],

  fetchingStages: false,
  fetchingStagesError: false,
  stages: [],

  fetchingDeleteRecords: false,
  fetchingDeleteRecordsError: false,
  recorddeleteOpportunityData: {},

  fetchingCloseRecords: false,
  fetchingCloseRecordsError: false,
  closeOpportunityData: {},

  fetchingLostRecords: false,
  fetchingLostRecordsError: false,
  lostOpportunityData: {},

  fetchinglostOpportunity: false,
  fetchinglostOpportunityError: false,
  lostOpportunity: [],

  fetchingOppLinkedStages: false,
  fetchingOppLinkedStagesError: false,
  oppLinkStages: [],

  addOpportunityRowEmailModal: false,

  fetchingCloseOpportunity: false,
  fetchingCloseOpportunityError: false,
  closeOpportunity: [],

  fetchingOpportunityForecast: false,
  fetchingOpportunityForecastError: false,
  opportunityForecast: [],

  linkLostOpportunity: false,
  linkLostOpportunityError: false,

  deleteLostOpportunity: false,
  deleteLostOpportunityError: false,

  deleteOpportunityData: false,
  deleteOpportunityDataError: false,

  fetchingAllRecruitmentPositionFilledByOppId: false,
  fetchingAllRecruitmentPositionFilledByOppIdError: false,
  allRecruitmentPositionFilledByOppId: "",

  fetchingDeletedOpportunity: false,
  fetchingDeletedOpportunityError: false,
  deletedOpportunity: [],

  fetchingRegionalQuotationSalesList: false,
  fetchingRegionalQuotationSalesListError: false,
  regionQuotationSalesList: [],

  fetchingPermissionsList: false,
  fetchingPermissionsListError: false,
  permissionsDataList: [],

  candidateDate: false,
  candidateDateError: false,

  deleteRequirementData: false,
  deleteRequirementDataError: false,

  //SHARE Opportunity Permission
  addSharingOpportunity: false,
  addSharingOpportunityError: false,

  linkingProfileToOpportunity: false,
  linkingProfileToOpportunityError: false,
  profileRecruit: [],

  fetchingTeamOpportunity: false,
  fetchingTeamOpportunityError: false,
  teamOpportunity: [],

  addingRecruitmentProfile: false,
  addingRecruitmentProfileError: false,

  fetchingAllRecruitmentDetailsByOppId: false,
  fetchingAllRecruitmentDetailsByOppIdError: false,
  allRecruitmentDetailsByOppId: [],

  fetchingOpportunitySkills: false,
  fetchingOpportunitySkillsError: false,
  opportunitySkills: [],

  addRemarksModal: false,
  addingRemark: false,
  addingRemarkError: false,

  fetchingRemark: false,
  fetchingRemarkError: false,
  remark: [],

  addingMoreContact:false,
  addingMoreContactError:false,

  fetchingOppLinkedWorkflow: false,
  fetchingOppLinkedWorkflowError: false,
  oppLinkWorkflow: [],

  fetchingOpportunitySkillsInitiativesDetails: false,
  fetchingOpportunitySkillsInitiativesDetailsError: false,
  opportunityInitiativesSkillsDetails: [],

  fetchingCurrency: false,
  fetchingCurrencyError: false,
  currencies: [],

  linkingContactsToOpportunityId: false,
  linkingContactsToOpportunityIdError: false,

  linkingCheckContactsToOpportunityId: false,
  linkingCheckContactsToOpportunityIdError: false,

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  fetchingJobCategory: false,
  fetchingJobCategoryError: false,
  jobCategory: [],

  fetchingJobBoardIndustry: false,
  fetchingJobBoardIndustryError: false,
  jobBoardIndustry: [],

  fetchingOppPulseData:false,
  fetchingOppPulseDataError:false,

  OPPPulseDataList:[],

  updateOpportunityName: false,
  updateOpportunityNameError: false,

  linkingSkillsRecruitToOpportunity: false,
  linkingSkillsRecruitToOpportunityError: false,

  fetchingWonOpportunity: false,
  fetchingWonOpportunityError: false,
  wonOpportunity: [],

  linkingCandidateRecruitToOpportunity: false,
  linkingCandidateRecruitToOpportunityError: false,

  linkingSatgeRecruitToOpportunity: false,
  linkingSatgeRecruitToOpportunityError: false,

  linkingStatusRecruitToOpportunity: false,
  linkingStatusRecruitToOpportunityError: false,

  deleteDocument: false,
  deleteDocumentError: false,

  fetchingSkillSetList: false,
  fetchingSkillSetListError: false,
  SkillList: [],

  fetchingRecruiterName: false,
  fetchingRecruiterNameError: true,
  recruiterName: [],

  fetchingRecruiter: false,
  fetchingRecruiterError: false,
  recruiter: [],

  fetchingRecruiterList: false,
  fetchingRecruiterListError: false,
  recruiterList: [],

  fetchingSales: false,
  fetchingSalesError: false,
  sales: [],

  updatingRecruitment: false,
  updatingRecruitmentError: false,

  addingNotesByOpportunityId: false,
  addingNotesByOpportunityIdError: false,

  addSpeechModal: false,
  addRequirementModal: false,

  reInstateToggleFordeletedOpportunity: false,
  reInstateToggleFordeletedOpportunityError: false,

  showBarChartModal: false,

  fetchingRecruitToRecruiter: false,
  fetchingRecruitToRecruiterError: true,
  recruitByRecruiterId: [],

  fetchingRecruitDelete: false,
  fetchingRecruitDeleteError: true,
  recruitDelete: [],

  linkingOpportunity: false,
  linkingOpportunityError: false,

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord: [],

  updatingOpportunityOwenership: false,
  updatingOpportunityOwenershipError: false,

  updatingDragStage: false,

  addCandidateDateModal: false,

  fetchingAllRecruitmentAvgTimeByOppId: false,
  fetchingAllRecruitmentAvgTimeByOppIdError: false,
  allRecruitmentAvgTimeByOppId: [],

  fetchingRequirementOwner: false,
  fetchingRequirementOwnerError: false,
  requirementOwner: [],

  linkOpenedRequirement: false,
  linkOpenedRequirementError: false,

  fetchingJobOrderSearchData: false,
  fetchingJobOrderSearchDataError: false,
  jobOrderdata: [],
  addMessageModal: false,
  isCustomSelected: false,

  startDate: dayjs().toISOString(),
  endDate: dayjs().startOf("month").add(1, "days").toISOString(),

  dateClosureRangeList: [
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
      id: 3,
      type: "Thismonth",
      value: "This month",
      starter: true,
      isSelected: true,

      endDate: dayjs().startOf("month").add(1, "days").toISOString(),
      startDate: dayjs().toISOString(),
    },
    {
      id: 4,
      type: "Lastmonth",
      value: "Last month",
      starter: false,
      isSelected: false,
      endDate: dayjs().startOf("month").subtract(30, "days").toISOString(),
      startDate: dayjs().toISOString(),
      // startDate: dayjs().startOf("month").toISOString(),
      // endDate: dayjs().toISOString(),
    },
  ],

  allOpportunity: [],
  fetchingAllOpportunity: false,
  fetchingAllOpportunityError: false,

  linkingProductOpportunity: false,
  linkingProductOpportunityError: false,

  getlinkingProductOpportunity: false,
  getlinkingProductOpportunityError: false,
  linkedProdOppolist:[],

  serachingAllCatalogue: false,
  serachingAllCatalogueError:false,
  searchedCatalogue:[],
};

const updatedOpportunity = (item, newProps) => {
  return item.map((opp, index) => {
    console.log("Author", opp);
    console.log("Author1", newProps);
    if (opp.profileId === newProps.opportunityId) {
      console.log("inside opp");
      opp.stageId = newProps.destinationStageId;
    }
    return opp;
  });
};

const updatedDragOpportunity = (item, newProps) => {
  return item.map((opp, index) => {
    console.log("Author7", opp);
    console.log("Author8", newProps);
    if (opp.opportunityId === newProps.opportunityId) {
      console.log("inside opp");
      opp.opportunityStagesId = newProps.opportunityStagesId;
    }
    return opp;
  });
};

const updatedDragQuotation = (item, newProps) => {
  return item.map((opp, index) => {
    console.log("Author7", opp);
    console.log("Author8", newProps);
    if (opp.opportunityId === newProps.opportunityId) {
      console.log("inside opp");
      opp.opportunityStagesId = newProps.opportunityStagesId;
    }
    return opp;
  });
};

export const OpportunityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_REDUCER_STATE:
      return { ...state, opportunity: {}, recruitByOpportunityId: [] };

    //set view type
    case types.SET_OPPORTUNITY_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.HANDLE_BAR_CHART_ORDER_MODAL:
      return { ...state, showBarChartModal: action.payload };

    /* handle Opportunity form modal */
    case types.HANDLE_OPPORTUNITY_MODAL:
      return { ...state, addOpportunityModal: action.payload };

    case types.HANDLE_OPPORTUNITY_DRAWER_MODAL:
      return { ...state, addDrawerOpportunityModal: action.payload };

    /* Add a opportunity */
    case types.ADD_OPPORTUNITY_REQUEST:
      return { ...state, addingOpportunity: true };
    case types.ADD_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        addingOpportunity: false,
        addOpportunityModal: false,
        addedOpportunity:action.payload,
        opportunityByUserId: [action.payload, ...state.opportunityByUserId],
        // clearbit: null,
      };
    case types.ADD_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addingOpportunity: false,
        addingOpportunityError: true,
        //addOpportunityModal: false,
      };








      case types.ADD_MORE_CONTACT_REQUEST:
      return { ...state, addingOpportunity: true };
    case types.ADD_MORE_CONTACT_SUCCESS:
      return {
        ...state,
        addingMoreContact: false,
        //addOpportunityModal: false,
        //addedOpportunity:action.payload,
        //opportunityByUserId: [action.payload, ...state.opportunityByUserId],
        // clearbit: null,
      };
    case types.ADD_MORE_CONTACT_FAILURE:
      return {
        ...state,
        addingMoreContact: false,
        addingMoreContactError: true,
        //addOpportunityModal: false,
      };

      case types.HANDLE_OPPORTUNITY_PULSE_MODAL:
        return { ...state, updatePulseModal: action.payload };

    /* Get a opportunity  */
    case types.GET_OPPORTUNITY_REQUEST:
      return { ...state, fetchingOpportunity: true };
    case types.GET_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingOpportunity: false,
        // opportunityByUserId: action.payload,

        opportunityByUserId: [...state.opportunityByUserId, ...action.payload],
      };
    case types.GET_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingOpportunity: false,
        fetchingOpportunityError: true,
      };

    //Opportunity Details
    case types.GET_OPPORTUNITY_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingOpportunityDetailsById: true };
    case types.GET_OPPORTUNITY_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingOpportunityDetailsById: false,
        opportunity: action.payload,
      };
    case types.GET_OPPORTUNITY_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingOpportunityDetailsById: false,
        fetchingOpportunityDetailsByIdError: true,
      };

    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

    /*Opportunity Notes */
    case types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_REQUEST:
      return { ...state, fetchingNotesListByOpportunityId: true };
    case types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByOpportunityId: false,
        notesListByOpportunityId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_OPPORTUNITY_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByOpportunityId: false,
        fetchingNotesListByOpportunityIdError: true,
      };

    case types.HANDLE_ADD_REQUIREMENT_MODAL:
      return { ...state, addRequirementModal: action.payload };

    case types.HANDLE_UPDATE_REMARK_MODAL:
      return { ...state, updateRemarkModal: action.payload };

    // Add Recruit Modal
    case types.HANDLE_RECRUIT_MODAL:
      return { ...state, addRecruitModal: action.payload };

    case types.HANDLE_CUSTOMER_MODAL:
      return { ...state, addCustomerModal: action.payload };

    // Add Profile Modal
    case types.HANDLE_TAGPROFILE_MODAL:
      return { ...state, addTagProfileModal: action.payload };

    // Update Opportunity Modal
    case types.HANDLE_UPDATE_OPPORTUNITY_MODAL:
      return { ...state, updateOpportunityModal: action.payload };

    case types.SET_OPPORTUNITY_EDIT:
      return { ...state, setEditingOpportunity: action.payload };

    case types.UPDATE_OPPORTUNITY_BY_ID_REQUEST:
      return { ...state, updateOpportunityById: true };
    case types.UPDATE_OPPORTUNITY_BY_ID_SUCCESS:
      return {
        ...state,
        updateOpportunityById: false,
        // updateOpportunityModal: false,
        // opportunity:action.payload,
        opportunityByUserId: state.opportunityByUserId.map((item) => {
          if (item.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        allOpportunity: state.allOpportunity.map((item) => {
          if (item.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_OPPORTUNITY_BY_ID_FAILURE:
      return {
        ...state,
        updateOpportunityById: false,
        updateOpportunityByIdError: true,
      };

    /* add/link opportunity document */
    case types.ADD_OPPORTUNITY_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByOpportunityId: true,
        addingDocumentByOpportunityIdError: false,
      };
    case types.ADD_OPPORTUNITY_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByOpportunityId: false,
        addingDocumentByOpportunityIdError: false,
      };
    case types.ADD_OPPORTUNITY_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByOpportunityId: false,
        addingDocumentByOpportunityIdError: true,
      };

    case types.SET_REMARK_EDIT:
      return { ...state, setEditingRemark: action.payload };

    case types.HANDLE_REMARKS_MODAL:
      return { ...state, addRemarksModal: action.payload };

    /* get list of documents of an opportunity */
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
    //SEARCH
    case types.INPUT_OPPORTUNITY_SEARCH_DATA_REQUEST:
      return { ...state, fetchingOpportunityInputSearchData: true };
    case types.INPUT_OPPORTUNITY_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingOpportunityInputSearchData: false,
         ooportunitySerachedData: action.payload,
      };
    case types.INPUT_OPPORTUNITY_SEARCH_DATA_FAILURE:
      return { ...state, fetchingOpportunityInputSearchDataError: true };

    /**
     * get contact list by opportunityId
     */
    case types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_REQUEST:
      return { ...state, fetchingContactListByOpportunityId: true };
    case types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        fetchingContactListByOpportunityId: false,
        contactListByOpportunityId: action.payload,
      };
    case types.GET_CONTACT_LIST_BY_OPPORTUNITY_ID_FAILURE:
      return {
        ...state,
        fetchingContactListByOpportunityId: false,
        fetchingContactListByOpportunityIdError: true,
      };

    //add recruit
    case types.LINK_RECRUIT_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingRecruitToOpportunity: true,
      };
    case types.LINK_RECRUIT_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingRecruitToOpportunity: false,
        addRecruitModal: false,
        recruitByOpportunityId: [
          action.payload,
          ...state.recruitByOpportunityId,
        ],
      };
    case types.LINK_RECRUIT_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingRecruitToOpportunity: false,
        linkingRecruitToOpportunityError: true,
      };

    //get recruit
    case types.GET_RECRUIT_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        fetchingRecruitToOpportunity: true,
      };
    case types.GET_RECRUIT_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingRecruitToOpportunity: false,
        recruitByOpportunityId: action.payload,
      };
    case types.GET_RECRUIT_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingRecruitToOpportunity: false,
        fetchingRecruitToOpportunityError: true,
      };

    case types.DELETE_OPPORTUNITY_DATA_REQUEST:
      return { ...state, deleteOpportunityData: true };
    case types.DELETE_OPPORTUNITY_DATA_SUCCESS:
      return {
        ...state,
        deleteOpportunityData: false,
        opportunityByUserId: state.opportunityByUserId.filter(
          (item) => item.opportunityId !== action.payload
        ),
      };
    case types.DELETE_OPPORTUNITY_DATA_FAILURE:
      return {
        ...state,
        deleteOpportunityData: false,
        deleteOpportunityDataError: false,
      };

    //delete opportunity list

    case types.GET_DELETED_OPPORTUNITY_REQUEST:
      return { ...state, fetchingDeletedOpportunity: true };
    case types.GET_DELETED_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingDeletedOpportunity: false,
        // deletedOpportunity: action.payload,

        deletedOpportunity: [...state.deletedOpportunity, ...action.payload],
      };
    case types.GET_DELETED_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingDeletedOpportunity: false,
        fetchingDeletedOpportunityError: true,
      };

    case types.GET_PERMISSIONS_LIST_REQUEST:
      return { ...state, fetchingPermissionsList: true };
    case types.GET_PERMISSIONS_LIST_SUCCESS:
      return {
        ...state,
        fetchingPermissionsList: false,
        permissionsDataList: action.payload,
      };
    case types.GET_PERMISSIONS_LIST_FAILURE:
      return {
        ...state,
        fetchingPermissionsList: false,
        fetchingPermissionsListError: false,
      };

    //SHARE Opportunity Permissiom
    case types.ADD_SHARE_OPPORTUNITY_PERMISSION_REQUEST:
      return { ...state, addSharingOpportunity: true };

    case types.ADD_SHARE_OPPORTUNITY_PERMISSION_SUCCESS:
      return {
        ...state,
        addSharingOpportunity: false,
        shareOpportunity: action.payload,
      };

    case types.ADD_SHARE_OPPORTUNITY_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingOpportunity: false,
        addSharingOpportunityError: true,
      };

    case types.LINK_PROFILE_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingProfileToOpportunity: true,
      };

    case types.LINK_PROFILE_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingProfileToOpportunity: false,
        profileRecruit: action.payload,
      };

    case types.LINK_PROFILE_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingProfileToOpportunity: false,
        linkingProfileToOpportunityError: true,
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

    case types.ADD_REMARK_REQUEST:
      return {
        ...state,
        addingRemark: true,
      };

    case types.ADD_REMARK_SUCCESS:
      return {
        ...state,
        addingRemark: false,
        addRemarksModal: false,
      };

    case types.ADD_REMARK_FAILURE:
      return {
        ...state,
        addingRemarkError: true,
        addRemarksModal: false,
      };

    case types.HANDLE_ADD_REQUIREMENT_DETAIL_MODAL:
      return { ...state, addRequirementDetailModal: action.payload };

    case types.SET_ADD_REQUIREMENT:
      return { ...state, setAddRequirement: action.payload };

    case types.GET_REMARK_REQUEST:
      return {
        ...state,
        fetchingRemark: true,
      };

    case types.GET_REMARK_SUCCESS:
      return {
        ...state,
        fetchingRemark: false,
        remark: action.payload,
      };

    case types.GET_REMARK_FAILURE:
      return {
        ...state,
        fetchingRemarkkError: true,
      };

    case types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingSkillsRecruitToOpportunity: true,
      };
    case types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingSkillsRecruitToOpportunity: false,
        // recruitByOpportunityId: state.recruitByOpportunityId.map(
        //   (recruit, i) => {
        //     if (recruit.profileId === action.payload.profileId) {
        //       return action.payload;
        //     } else {
        //       return recruit;
        //     }
        //   }
        // ),
      };
    case types.LINK_RECRUIT_SKILLS_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingSkillsRecruitToOpportunity: false,
        linkingSkillsRecruitToOpportunityError: true,
      };
    case types.SET_CURRENT_OPPORTUNITY_RECRUITMENT_DATA:
      return { ...state, currentOpportunityRecruitmentData: action.payload };
    case types.SET_CURRENT_RECRUITER_DATA:
      return { ...state, currentRecruiterData: action.payload };

    case types.HANDLE_SELECT_SPONSOR_MODAL:
      return { ...state, addSponsorModal: action.payload };

    case types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingCandidateRecruitToOpportunity: true,
      };
    case types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingCandidateRecruitToOpportunity: false,
        addRecruiterModal: false,
        recruitByOpportunityId: state.recruitByOpportunityId.map((item, i) => {
          if (item.recruitmentId === action.payload.recruitmentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        // recruitByRecruiterId: state.recruitByRecruiterId.map(
        //   (item, i) => {
        //     if (item.recruitmentId === action.payload.recruitmentId) {
        //       return action.payload;
        //     } else {
        //       return item;
        //     }
        //   }
        // ),
      };
    case types.LINK_RECRUIT_CANDIDATE_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        addRecruiterModal: false,
        linkingCandidateRecruitToOpportunity: false,
        linkingCandidateRecruitToOpportunityError: true,
      };

    case types.HANDLE_CANDIDATE_DATE_MODAL:
      return { ...state, addCandidateDateModal: action.payload };

    case types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingSatgeRecruitToOpportunity: true,
      };
    case types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingSatgeRecruitToOpportunity: false,
        addTagProfileModal: false,
        candidateRequirement: state.candidateRequirement.map((recruit, i) => {
          if (recruit.profileId === action.payload.profileId) {
            return action.payload;
          } else {
            return recruit;
          }
        }),
      };
    case types.LINK_RECRUIT_STAGE_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingSatgeRecruitToOpportunity: false,
        linkingSatgeRecruitToOpportunityError: true,
      };

    case types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingStatusRecruitToOpportunity: true,
      };
    case types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingStatusRecruitToOpportunity: false,
        // opportunityByUserId: state.opportunityByUserId.filter(
        //                             (item) => item.opportunityId !== action.payload
        //                           ),
        opportunityByUserId: state.opportunityByUserId.map((opp) =>
          opp.opportunityId === action.payload.opportunityId
            ? action.payload
            : opp
        ),
      };
    case types.LINK_RECRUIT_STATUS_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingStatusRecruitToOpportunity: false,
        linkingStatusRecruitToOpportunityError: true,
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

    case types.GET_OPPORTUNITY_TEAM_RECORDS_REQUEST:
      return { ...state, fetchingOpportunityTeamRecordsByUserId: true };
    case types.GET_OPPORTUNITY_TEAM_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingOpportunityTeamRecordsByUserId: false,
        opportunityTeamRecordData: action.payload,
      };
    case types.GET_OPPORTUNITY_TEAM_RECORDS_FAILURE:
      return {
        ...state,
        fetchingOpportunityTeamRecordsByUserId: false,
        fetchingOpportunityTeamRecordsByUserIdError: true,
      };

    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByOpportunityId: state.documentsByOpportunityId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    case types.GET_CURRENCY_REQUEST:
      return { ...state, fetchingCurrency: true };
    case types.GET_CURRENCY_SUCCESS:
      return { ...state, fetchingCurrency: false, currencies: action.payload };
    case types.GET_CURRENCY_FAILURE:
      return {
        ...state,
        fetchingCurrency: false,
        fetchingCurrencyError: true,
      };

    case types.SKILL_SET_LIST_REQUEST:
      return { ...state, fetchingSkillSetList: true };
    case types.SKILL_SET_LIST_SUCCESS:
      return {
        ...state,
        fetchingSkillSetList: false,
        SkillList: action.payload,
      };
    case types.SKILL_SET_LIST_FAILURE:
      return { ...state, fetchingSkillSetListError: true };

    case types.HANDLE_RECRUITER_MODAL:
      return { ...state, addRecruiterModal: action.payload };

    case types.GET_RECRUITER_NAME_REQUEST:
      return { ...state, fetchingRecruiterName: true };
    case types.GET_RECRUITER_NAME_SUCCESS:
      return {
        ...state,
        fetchingRecruiterName: false,
        recruiterName: action.payload,
      };
    case types.GET_RECRUITER_NAME_FAILURE:
      return {
        ...state,
        fetchingRecruiterName: false,
        fetchingRecruiterNameError: true,
      };

    //get Recruiter
    case types.GET_RECRUITER_REQUEST:
      return { ...state, fetchingRecruiter: true };
    case types.GET_RECRUITER_SUCCESS:
      return {
        ...state,
        fetchingRecruiter: false,
        recruiter: action.payload,
      };
    case types.GET_RECRUITER_FAILURE:
      return {
        ...state,
        fetchingRecruiter: false,
        fetchingRecruiterError: true,
      };

    case types.GET_RECRUITER_LIST_REQUEST:
      return { ...state, fetchingRecruiterList: true };
    case types.GET_RECRUITER_LIST_SUCCESS:
      return {
        ...state,
        fetchingRecruiterList: false,
        recruiterList: action.payload,
      };
    case types.GET_RECRUITER_LIST_FAILURE:
      return {
        ...state,
        fetchingRecruiterList: false,
        fetchingRecruiterListError: true,
      };

    case types.GET_SALES_LIST_REQUEST:
      return { ...state, fetchingSales: true };
    case types.GET_SALES_LIST_SUCCESS:
      return {
        ...state,
        fetchingSales: false,
        sales: action.payload,
      };
    case types.GET_SALES_LIST_FAILURE:
      return {
        ...state,
        fetchingSales: false,
        fetchingSalesError: true,
      };

    case types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_REQUEST:
      return { ...state, linkingCheckContactsToOpportunityId: true };
    case types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        linkingCheckContactsToOpportunityId: false,
      };
    case types.LINK_CONTACTS_TO_CHECK_OPPORTUNITY_ID_FAILURE:
      return {
        ...state,
        linkingCheckContactsToOpportunityId: false,
        linkingCheckContactsToOpportunityIdError: true,
      };

    case types.GET_ALL_RECRUITMENT_BY_OPP_ID_REQUEST:
      return {
        ...state,
        fetchingAllRecruitmentByOppId: true,
      };

    case types.GET_ALL_RECRUITMENT_BY_OPP_ID_SUCCESS:
      return {
        ...state,
        fetchingAllRecruitmentByOppId: false,
        allRecruitmentByOppId: action.payload,
      };

    case types.GET_ALL_RECRUITMENT_BY_OPP_ID_FAILURE:
      return {
        ...state,
        fetchingAllRecruitmentByOppIdError: true,
      };

    case types.CHANGE_SELECTED_CLOSURE_TIME_INTERVAL_REPORT:
      return {
        ...state,
        dateClosureRangeList: newDateRange(
          state.dateClosureRangeList,
          action.payload
        ),
        isCustomSelected: false,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
      };

    case types.GET_RECRUITMENT_POSITION_BY_OPP_ID_REQUEST:
      return {
        ...state,
        fetchingAllRecruitmentPositionByOppId: true,
      };

    case types.GET_RECRUITMENT_POSITION_BY_OPP_ID_SUCCESS:
      return {
        ...state,
        fetchingAllRecruitmentPositionByOppId: false,
        allRecruitmentPositionByOppId: action.payload,
      };

    case types.GET_RECRUITMENT_POSITION_BY_OPP_ID_FAILURE:
      return {
        ...state,
        fetchingAllRecruitmentPositionByOppIdError: true,
      };

    case types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_REQUEST:
      return {
        ...state,
        fetchingAllRecruitmentPositionFilledByOppId: true,
      };

    case types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_SUCCESS:
      return {
        ...state,
        fetchingAllRecruitmentPositionFilledByOppId: false,
        allRecruitmentPositionFilledByOppId: action.payload,
      };

    case types.GET_RECRUITMENT_POSITION_FILLED_BY_OPP_ID_FAILURE:
      return {
        ...state,
        fetchingAllRecruitmentPositionFilledByOppIdError: true,
      };

    case types.GET_ALL_OPPORTUNITIES_REQUEST:
      return { ...state, fetchingAllOpportunities: true };
    case types.GET_ALL_OPPORTUNITIES_SUCCESS:
      return {
        ...state,
        fetchingAllOpportunities: false,
        opportunityByUserId: action.payload,
      };
    case types.GET_ALL_OPPORTUNITIES_FAILURE:
      return {
        ...state,
        fetchingAllOpportunities: false,
        fetchingAllOpportunitiesError: true,
      };

    case types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_REQUEST:
      return {
        ...state,
        fetchingAllRecruitmentDetailsByOppId: true,
      };

    case types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_SUCCESS:
      return {
        ...state,
        fetchingAllRecruitmentDetailsByOppId: false,
        allRecruitmentDetailsByOppId: action.payload,
      };

    case types.GET_ALL_RECRUITMENT_DETAILS_BY_OPP_ID_FAILURE:
      return {
        ...state,
        fetchingAllRecruitmentDetailsByOppIdError: true,
      };

    case types.GET_REGION_SALES_QUOTATION_LIST_REQUEST:
      return { ...state, fetchingRegionalQuotationSalesList: true };
    case types.GET_REGION_SALES_QUOTATION_LIST_SUCCESS:
      return {
        ...state,
        fetchingRegionalQuotationSalesList: false,
        regionQuotationSalesList: action.payload,
      };
    case types.GET_REGION_SALES_QUOTATION_LIST_FAILURE:
      return {
        ...state,
        fetchingRegionalQuotationSalesList: false,
        fetchingRegionalQuotationSalesListError: true,
      };

    case types.GET_SKILLS_COUNT_REQUEST:
      return { ...state, fetchingSkillsCount: true };
    case types.GET_SKILLS_COUNT_SUCCESS:
      return {
        ...state,
        fetchingSkillsCount: false,
        skillsCount: action.payload,
      };
    case types.GET_SKILLS_COUNT_FAILURE:
      return {
        ...state,
        fetchingSkillsCount: false,
        fetchingSkillsCountError: true,
      };

    case types.DELETE_REQUIREMENT_DATA_REQUEST:
      return { ...state, deleteRequirementData: true };
    case types.DELETE_REQUIREMENT_DATA_SUCCESS:
      return {
        ...state,
        deleteRequirementData: false,
        recruitByOpportunityId: state.recruitByOpportunityId.filter(
          (item) => item.recruitmentId !== action.payload
        ),
      };
    case types.DELETE_REQUIREMENT_DATA_FAILURE:
      return {
        ...state,
        deleteRequirementData: false,
        deleteRequirementDataError: false,
      };

    case types.UPDATE_RECRUITMENT_REQUEST:
      return {
        ...state,
        updatingRecruitment: true,
      };
    case types.UPDATE_RECRUITMENT_SUCCESS:
      return {
        ...state,
        updatingRecruitment: false,
        addRequirementModal: false,

        recruitByOpportunityId: state.recruitByOpportunityId.map((item) => {
          if (item.recruitmentId === action.payload.recruitmentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_RECRUITMENT_FAILURE:
      return {
        ...state,
        updatingRecruitment: false,
        updatingRecruitmentError: true,
      };

   

    case types.HANDLE_REACT_SPEECH_MODAL:
      return { ...state, addSpeechModal: action.payload };

    case types.ADD_OPPORTUNITY_NOTES_REQUEST:
      return {
        ...state,
        addingNotesByOpportunityId: true,
      };
    case types.ADD_OPPORTUNITY_NOTES_SUCCESS:
      return {
        ...state,
        addingNotesByOpportunityId: false,
        addingNotesByOpportunityIdError: false,
        addSpeechModal: false,
      };
    case types.ADD_OPPORTUNITY_NOTES_FAILURE:
      return {
        ...state,
        addingNotesByOpportunityId: false,
        addingNotesByOpportunityIdError: true,
      };

    case types.ADD_WEBSITE_REQUEST:
      return { ...state, addingWebsite: true };
    case types.ADD_WEBSITE_SUCCESS:
      return { ...state, addingWebsite: false };
    case types.ADD_WEBSITE_FAILURE:
      return { ...state, addingWebsite: false };

    //reinstate

    case types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_REQUEST:
      return { ...state, reInstateToggleFordeletedOpportunity: true };
    case types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        reInstateToggleFordeletedOpportunity: false,
        deletedOpportunity: state.deletedOpportunity.filter(
          (item) => item.opportunityId !== action.payload
        ),
      };
    case types.REINSTATE_TOGGLE_FOR_OPPORTUNITY_FAILURE:
      return {
        ...state,
        reInstateToggleFordeletedOpportunity: false,
        reInstateToggleFordeletedOpportunityError: true,
      };

    //email sendfor stage

    case types.SEND_EMAIL_STAGE_UPDATE_REQUEST:
      return { ...state, emailingStage: true };
    case types.SEND_EMAIL_STAGE_UPDATE_SUCCESS:
      return {
        ...state,
        emailingStage: false,
      };
    case types.SEND_EMAIL_STAGE_UPDATE_FAILURE:
      return { ...state, emailingStage: false, emailingStageError: true };

    // case types.PUBLISH_SUMMARY_REQUEST:
    //   return { ...state, publishSummary: true };
    // case types.PUBLISH_SUMMARY_SUCCESS:
    //   return {
    //     ...state,
    //     publishSummary: false,
    //     allRecruitmentDetailsByOppId: action.payload,
    //     // addTeamTransferModal: false,
    //   };
    // case types.PUBLISH_SUMMARY_FAILURE:
    //   return {
    //     ...state,
    //     publishSummary: false,
    //     publishSummaryError: true,
    //   };

    // case types.UNPUBLISH_SUMMARY_REQUEST:
    //   return { ...state, unpublishSummary: true };
    // case types.UNPUBLISH_SUMMARY_SUCCESS:
    //   return {
    //     ...state,
    //     unpublishSummary: false,

    //     // addTeamTransferModal: false,
    //   };
    // case types.UNPUBLISH_SUMMARY_FAILURE:
    //   return {
    //     ...state,
    //     unpublishSummary: false,
    //     unpublishSummaryError: true,
    //   };

    case types.GET_RECRUIT_TO_REQUIREMENT_REQUEST:
      return {
        ...state,
        fetchingRecruitToRecruiter: true,
      };
    case types.GET_RECRUIT_TO_REQUIREMENT_SUCCESS:
      return {
        ...state,
        fetchingRecruitToRecruiter: false,
        recruitByRecruiterId: action.payload,
      };
    case types.GET_RECRUIT_TO_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchingRecruitToRecruiter: false,
        fetchingRecruitToRecruiterError: true,
      };

    case types.GET_RECRUITER_REQUIREMENT_REQUEST:
      return { ...state, fetchingRecruiterRequirement: true };
    case types.GET_RECRUITER_REQUIREMENT_SUCCESS:
      return {
        ...state,
        fetchingRecruiterRequirement: false,
        recruiterRequirement: action.payload,
      };
    case types.GET_RECRUITER_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchingRecruiterRequirement: false,
        fetchingRecruiterRequirementError: true,
      };

      case types.GET_TEAM_USERLIST_REQUEST:
        return {
          ...state,
          fetchingTeamUserList: true,
          fetchingTeamUserListError: false,
        }; 
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

    case types.GET_CANDIDATE_REQUIREMENT_REQUEST:
      return { ...state, fetchingCandidateRequirement: true };
    case types.GET_CANDIDATE_REQUIREMENT_SUCCESS:
      return {
        ...state,
        fetchingCandidateRequirement: false,
        candidateRequirement: action.payload,
      };
    case types.GET_CANDIDATE_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchingCandidateRequirement: false,
        fetchingCandidateRequirementError: true,
      };

    case types.ADD_CANDIDATE_DATE_REQUEST:
      return {
        ...state,
        candidateDate: true,
      };
    case types.ADD_CANDIDATE_DATE_SUCCESS:
      return {
        ...state,
        candidateDate: false,
        addCandidateDateModal: false,
        candidateRequirement: state.candidateRequirement.map((recruit, i) => {
          if (recruit.profileId === action.payload.profileId) {
            return action.payload;
          } else {
            return recruit;
          }
        }),
        // todayCustomer: action.payload,
      };
    case types.ADD_CANDIDATE_DATE_FAILURE:
      return {
        ...state,
        candidateDate: false,
        candidateDateError: true,
      };

    case types.UPDATE_REMARK_REQUEST:
      return { ...state, updateRemark: true };
    case types.UPDATE_REMARK_SUCCESS:
      return {
        ...state,
        updateRemark: false,
        updateRemarkModal: false,
        remark: state.remark.map((item) => {
          if (
            item.recruitmentStageNoteId ===
            action.payload.recruitmentStageNoteId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_REMARK_FAILURE:
      return {
        ...state,
        updateRemark: false,
        updateRemarkError: true,
      };

    case types.UPDATE_OPPORTUNITY_OWNERSHIP_REQUEST:
      return { ...state, updatingOpportunityOwenership: true };
    case types.UPDATE_OPPORTUNITY_OWNERSHIP_SUCCESS:
      return {
        ...state,
        updatingOpportunityOwenership: false,
        // updateCandidateEmploymentModal: false,
        employmentDetails: state.employmentDetails.map((employment, i) => {
          if (employment.id === action.payload.id) {
            return action.payload;
          } else {
            return employment;
          }
        }),
      };
    case types.UPDATE_OPPORTUNITY_OWNERSHIP_SUCCESS:
      return {
        ...state,
        updatingOpportunityOwenership: false,
        updatingOpportunityOwenershipError: true,
      };

    case types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_REQUEST:
      return { ...state, fetchingAllRecruitmentAvgTimeByOppId: true };
    case types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_SUCCESS:
      return {
        ...state,
        fetchingAllRecruitmentAvgTimeByOppId: false,
        allRecruitmentAvgTimeByOppId: action.payload,
      };
    case types.GET_ALL_RECRUITMENT_AVG_TIME_BY_OPPID_FAILURE:
      return {
        ...state,
        fetchingAllRecruitmentAvgTimeByOppId: false,
        fetchingAllRecruitmentAvgTimeByOppIdError: true,
      };

    case types.INPUT_JOB_ORDER_SEARCH_DATA_REQUEST:
      return { ...state, fetchingJobOrderSearchData: true };
    case types.INPUT_JOB_ORDER_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingJobOrderSearchData: false,
        // recruiterRequirement: action.payload,
        // serachedData: action.payload,
        recruiterRequirement: state.recruiterRequirement.map((item) => {
          if (item.recruitmentId === action.payload.recruitmentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.INPUT_JOB_ORDER_SEARCH_DATA_FAILURE:
      return { ...state, fetchingJobOrderSearchDataError: true };

    case types.LINK_CLOSE_REQUIREMENT_REQUEST:
      return {
        ...state,
        linkClosedRequirement: true,
      };
    case types.LINK_CLOSE_REQUIREMENT_SUCCESS:
      return {
        ...state,
        linkClosedRequirement: false,
        // addDonotCallModal:false,
        // candidateRequirement: state.candidateRequirement.map(
        //   (recruit, i) => {
        //     if (recruit.profileId === action.payload.profileId) {
        //       return action.payload;
        //     } else {
        //       return recruit;
        //     }
        //   }
        // ),
        // todayCustomer: action.payload,
      };
    case types.LINK_CLOSE_REQUIREMENT_FAILURE:
      return {
        ...state,
        linkClosedRequirement: false,
        linkClosedRequirementError: true,
      };

    case types.GET_CLOSED_REQUIREMENT_REQUEST:
      return {
        ...state,
        fetchingClosedRequirement: true,
      };
    case types.GET_CLOSED_REQUIREMENT_SUCCESS:
      return {
        ...state,
        fetchingClosedRequirement: false,
        closedRequiremnt: action.payload,
      };
    case types.GET_CLOSED_REQUIREMENT_FAILURE:
      return {
        ...state,
        fetchingClosedRequirement: false,
        fetchingClosedRequirementError: true,
      };

    case types.HANDLE_SENTIMENT_MODAL:
      return { ...state, addSentimentModal: action.payload };

    case types.ADD_SENTIMENT_REQUEST:
      return {
        ...state,
        addingSentiment: true,
      };

    case types.ADD_SENTIMENT_SUCCESS:
      return {
        ...state,
        addingSentiment: false,
        sentiment: action.payload,
        addSentimentModal: false,
        addRemarksModal: true,
      };

    case types.ADD_SENTIMENT_FAILURE:
      return {
        ...state,
        addingSentimentError: true,
        // addSentimentModal: false,
      };

    case types.LINK_OPENED_REQUIREMENT_REQUEST:
      return {
        ...state,
        linkOpenedRequirement: true,
      };
    case types.LINK_OPENED_REQUIREMENT_SUCCESS:
      return {
        ...state,
        linkOpenedRequirement: false,
        // addDonotCallModal:false,
        // candidateRequirement: state.candidateRequirement.map(
        //   (recruit, i) => {
        //     if (recruit.profileId === action.payload.profileId) {
        //       return action.payload;
        //     } else {
        //       return recruit;
        //     }
        //   }
        // ),
        // todayCustomer: action.payload,
      };
    case types.LINK_OPENED_REQUIREMENT_FAILURE:
      return {
        ...state,
        linkOpenedRequirement: false,
        linkOpenedRequirementError: true,
      };

    case types.HANDLE_MONSTER_MODAL:
      return { ...state, addMonsterModal: action.payload };

    case types.GET_JOB_CATEGORY_REQUEST:
      return {
        ...state,
        fetchingJobCategory: true,
      };
    case types.GET_JOB_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchingJobCategory: false,
        jobCategory: action.payload,
      };
    case types.GET_JOB_CATEGORY_FAILURE:
      return {
        ...state,
        fetchingJobCategory: false,
        fetchingJobCategoryError: true,
      };

    case types.GET_JOB_BOARD_NAME_REQUEST:
      return {
        ...state,
        fetchingJobBoardName: true,
      };
    case types.GET_JOB_BOARD_NAME_SUCCESS:
      return {
        ...state,
        fetchingJobBoardName: false,
        jobBoardName: action.payload,
      };
    case types.GET_JOB_BOARD_NAME_FAILURE:
      return {
        ...state,
        fetchingJobBoardName: false,
        fetchingJobBoardNameError: true,
      };

    case types.GET_JOB_OCCUPATION_REQUEST:
      return {
        ...state,
        fetchingJobOccupation: true,
      };
    case types.GET_JOB_OCCUPATION_SUCCESS:
      return {
        ...state,
        fetchingJobOccupation: false,
        jobOccupation: action.payload,
      };
    case types.GET_JOB_OCCUPATION_FAILURE:
      return {
        ...state,
        fetchingJobOccupation: false,
        fetchingJobOccupationError: true,
      };

    case types.GET_JOB_BOARD_INDUSTRY_REQUEST:
      return {
        ...state,
        fetchingJobBoardIndustry: true,
      };
    case types.GET_JOB_BOARD_INDUSTRY_SUCCESS:
      return {
        ...state,
        fetchingJobBoardIndustry: false,
        jobBoardIndustry: action.payload,
      };
    case types.GET_JOB_BOARD_INDUSTRY_FAILURE:
      return {
        ...state,
        fetchingJobBoardIndustry: false,
        fetchingJobBoardIndustryError: true,
      };

    case types.LINK_MONSTER_REQUEST:
      return {
        ...state,
        linkingMonster: true,
      };
    case types.LINK_RECRUIT_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingMonster: false,

        // addRecruitModal: false,
      };
    case types.LINK_MONSTER_FAILURE:
      return {
        ...state,
        linkingMonster: false,
        linkingMonsterError: true,
      };

    case types.GET_REQUIREMENT_OWNER_REQUEST:
      return { ...state, fetchingRequirementOwner: true };
    case types.GET_REQUIREMENT_OWNER_SUCCESS:
      return {
        ...state,
        fetchingRequirementOwner: false,
        requirementOwner: action.payload,
      };
    case types.GET_REQUIREMENT_OWNER_FAILURE:
      return {
        ...state,
        fetchingRequirementOwner: false,
        fetchingRequirementOwnerError: true,
      };

    case types.UPDATE_CONTACT_ROLE_BY_OPPORTUNITY_ID_REQUEST:
      return { ...state };
    case types.UPDATE_CONTACT_ROLE_BY_OPPORTUNITY_ID_SUCCESS:
      return {
        ...state,
        contactListByOpportunityId: state.contactListByOpportunityId.map(
          (item) => {
            if (item.contactId === action.payload.contactId) {
              return action.payload;
            } else {
              return item;
            }
          }
        ),
      };
    case types.UPDATE_CONTACT_ROLE_BY_OPPORTUNITY_ID_FAILURE:
      return { ...state };

    case types.UPDATE_OPPORTUNITY_NAME_REQUEST:
      return { ...state, updateOpportunityName: true };
    case types.UPDATE_OPPORTUNITY_NAME_SUCCESS:
      return {
        ...state,
        updateOpportunityName: false,
        // updateCandidateModal: false,
        // updateCandidateResumeModal:false,
        opportunityByUserId: state.opportunityByUserId.map((item) => {
          if (item.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_OPPORTUNITY_NAME_FAILURE:
      return {
        ...state,
        updateOpportunityName: false,
        updateOpportunityNameError: true,
      };





      case types.GET_RECRUITER_LIST_REQUEST:
        return { ...state, fetchingOppPulseData: true };
      case types.GET_OPP_PULSE_DATA_SUCCESS:
        return {
          ...state,
          fetchingOppPulseData: false,
          OPPPulseDataList: action.payload,
        };
      case types.GET_OPP_PULSE_DATA_FAILURE:
        return {
          ...state,
          fetchingOppPulseData: false,
          fetchingOppPulseDataError: true,
        };

    case types.GET_RECRUIT_DELETE_REQUEST:
      return {
        ...state,
        fetchingRecruitDelete: true,
      };
    case types.GET_RECRUIT_DELETE_SUCCESS:
      return {
        ...state,
        fetchingRecruitDelete: false,
        recruitDelete: action.payload,
      };
    case types.GET_RECRUIT_DELETE_FAILURE:
      return {
        ...state,
        fetchingRecruitDelete: false,
        fetchingRecruitDeleteError: true,
      };

    case types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        fetchinCandidateRecruit: true,
      };
    case types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingCandidateRecruit: false,
        addRecruiterModal: false,
        recruiterRequirement: state.recruiterRequirement.map((item, i) => {
          console.log("if", item.recruitmentId);
          if (item.recruitmentId === action.payload.recruitmentId) {
            console.log("hello");
            return action.payload;
          } else {
            console.log("hello1");
            return item;
          }
        }),
        //Delete: actRECRUIT_ion.payload,
      };
    case types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingCandidateRecruit: false,
        fetchingCandidateRecruitError: true,
      };

    case types.GET_INITITATIVE_SKILLS_REQUEST:
      return { ...state, fetchingInitiativeSkills: true };
    case types.GET_INITITATIVE_SKILLS_SUCCESS:
      return {
        ...state,
        fetchingInitiativeSkills: false,
        initiativeSkills: action.payload,
      };
    case types.GET_INITITATIVE_SKILLS_FAILURE:
      return {
        ...state,
        fetchingInitiativeSkills: false,
        fetchingInitiativeSkillsError: true,
      };

    case types.GET_INITIATIVE_REQUEST:
      return { ...state, fetchingInitiative: true };
    case types.GET_INITIATIVE_SUCCESS:
      return {
        ...state,
        fetchingInitiative: false,
        initiatives: action.payload,
      };
    case types.GET_INITIATIVE_FAILURE:
      return {
        ...state,
        fetchingInitiative: false,
        fetchingInitiativeError: true,
      };

    case types.GET_OPPORTUNITY_SKILLS_REQUEST:
      return { ...state, fetchingOpportunitySkills: true };
    case types.GET_OPPORTUNITY_SKILLS_SUCCESS:
      return {
        ...state,
        fetchingOpportunitySkills: false,
        opportunitySkills: action.payload,
      };
    case types.GET_OPPORTUNITY_SKILLS_FAILURE:
      return {
        ...state,
        fetchingOpportunitySkills: false,
        fetchingOpportunitySkillsError: true,
      };

    case types.HANDLE_MESSAGE_MODAL:
      return { ...state, addMessageModal: action.payload };

    case types.ADD_OPPORTUNITY_SKILLS_REQUEST:
      return {
        ...state,
        addingOpportunitySkills: true,
      };
    case types.ADD_OPPORTUNITY_SKILLS_SUCCESS:
      return {
        ...state,
        addingOpportunitySkills: false,

        // addRecruitModal: false,
      };
    case types.ADD_OPPORTUNITY_SKILLS_FAILURE:
      return {
        ...state,
        addingOpportunitySkills: false,
        addingOpportunitySkillsError: true,
      };

    case types.GET_DELETE_RECORDS_REQUEST:
      return { ...state, fetchingDeleteRecords: true };
    case types.GET_DELETE_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingDeleteRecords: false,
        recorddeleteOpportunityData: action.payload,
      };
    case types.GET_DELETE_RECORDS_FAILURE:
      return {
        ...state,
        fetchingDeleteRecords: false,
        fetchingDeleteRecordsError: true,
      };

    case types.GET_CLOSE_RECORDS_REQUEST:
      return { ...state, fetchingCloseRecords: true };
    case types.GET_CLOSE_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingCloseRecords: false,
        closeOpportunityData: action.payload,
      };
    case types.GET_CLOSE_RECORDS_FAILURE:
      return {
        ...state,
        fetchingCloseRecords: false,
        fetchingCloseRecordsError: true,
      };

    case types.GET_ALL_RECORDS_REQUEST:
      return { ...state, fetchingAllRecords: true };
    case types.GET_ALL_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingAllRecords: false,
        allOpportunityRecords: action.payload,
      };
    case types.GET_ALL_RECORDS_FAILURE:
      return {
        ...state,
        fetchingAllRecords: false,
        fetchingAllRecordsError: true,
      };

    case types.GET_LOST_RECORDS_REQUEST:
      return { ...state, fetchingLostRecords: true };
    case types.GET_LOST_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingLostRecords: false,
        lostOpportunityData: action.payload,
      };
    case types.GET_LOST_RECORDS_FAILURE:
      return {
        ...state,
        fetchingLostRecords: false,
        fetchingLostRecordsError: true,
      };

    case types.LINK_CLOSE_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkClosedOpportunity: true,
      };
    case types.LINK_CLOSE_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkClosedOpportunity: false,

        closeOpportunity: state.closeOpportunity.filter(
          (item) => item.opportunityId !== action.payload
        ),
        // linkClosedOpportunity: false,
        // opportunityByUserId: state.opportunityByUserId.filter(
        //   (item) => item.opportunityId !== action.payload.opportunityId
        // ),
      };
    case types.LINK_CLOSE_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkClosedOpportunity: false,
        linkClosedOpportunityError: true,
      };

    case types.RECRUIT_STATUS_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        statusRecruitToOpportunity: true,
      };
    case types.RECRUIT_STATUS_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        statusRecruitToOpportunity: false,
        opportunityByUserId: state.opportunityByUserId.filter(
          (item) => item.opportunityId !== action.payload
        ),
      };
    case types.RECRUIT_STATUS_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        statusRecruitToOpportunity: false,
        statusRecruitToOpportunityError: true,
      };

    case types.RECRUIT_LOST_STATUS_TO_OPPORTUNITY_REQUEST:
      return {
        ...state,
        loststatusRecruitToOpportunity: true,
      };
    case types.RECRUIT_LOST_STATUS_TO_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        loststatusRecruitToOpportunity: false,
        opportunityByUserId: state.opportunityByUserId.filter(
          (item) => item.opportunityId !== action.payload
        ),
        // opportunityByUserId: state.opportunityByUserId.map(
        //   (recruit, i) => {
        //     if (recruit.opportunityId === action.payload.opportunityId) {
        //       return action.payload;
        //     } else {
        //       return recruit;
        //     }
        //   }
        // ),
      };
    case types.RECRUIT_LOST_STATUS_TO_OPPORTUNITY_FAILURE:
      return {
        ...state,
        loststatusRecruitToOpportunity: false,
        loststatusRecruitToOpportunityError: true,
      };

    case types.LINK_TAG_CUSTOMER_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingtagCustomerOpportunity: true,
      };
    case types.LINK_TAG_CUSTOMER_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingtagCustomerOpportunity: false,
        // opportunityByUserId: state. opportunityByUserId.map(
        //   (recruit, i) => {
        //     if (recruit.opportunityId === action.payload.opportunityId) {
        //       return action.payload;
        //     } else {
        //       return recruit;
        //     }
        //   }
        // ),
      };
    case types.LINK_TAG_CUSTOMER_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingtagCustomerOpportunity: false,
        linkingtagCustomerOpportunityError: true,
      };

    case types.GET_LOST_OPPORTUNITY_REQUEST:
      return { ...state, fetchinglostOpportunity: true };
    case types.GET_LOST_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchinglostOpportunity: false,
        // lostOpportunity:action.payload

        lostOpportunity: [...state.lostOpportunity, ...action.payload],
      };
    case types.GET_LOST_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchinglostOpportunity: false,
        fetchinglostOpportunityError: true,
      };

    case types.GET_CLOSE_OPPORTUNITY_REQUEST:
      return { ...state, fetchingCloseOpportunity: true };
    case types.GET_CLOSE_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingCloseOpportunity: false,
        // closeOpportunity:action.payload

        closeOpportunity: [...state.closeOpportunity, ...action.payload],
      };
    case types.GET_CLOSE_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingCloseOpportunity: false,
        fetchingCloseOpportunityError: true,
      };

    case types.GET_OPPORTUNITY_FORECAST_REQUEST:
      return { ...state, fetchingOpportunityForecast: true };
    case types.GET_OPPORTUNITY_FORECAST_SUCCESS:
      return {
        ...state,
        fetchingOpportunityForecast: false,
        opportunityForecast: action.payload,
      };
    case types.GET_OPPORTUNITY_FORECAST_FAILURE:
      return {
        ...state,
        fetchingOpportunityForecast: false,
        fetchingOpportunityForecastError: true,
      };

    case types.GET_WORKFLOW_REQUEST:
      return { ...state, fetchingWorkflow: true };
    case types.GET_WORKFLOW_SUCCESS:
      return {
        ...state,
        fetchingWorkflow: false,
        workflow: action.payload,
      };
    case types.GET_WORKFLOW_FAILURE:
      return {
        ...state,
        fetchingWorkflow: false,
        fetchingWorkflowError: true,
      };

    case types.GET_STAGES_REQUEST:
      return { ...state, fetchingStages: true };
    case types.GET_STAGES_SUCCESS:
      return {
        ...state,
        fetchingStages: false,
        stages: action.payload,
      };
    case types.GET_STAGES_FAILURE:
      return {
        ...state,
        fetchingStages: false,
        fetchingStagesError: true,
      };

    case types.DELETE_OPPORTUNITY_REQUEST:
      return { ...state, deleteOpportunity: true };
    case types.DELETE_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        deleteOpportunity: false,
      };

    case types.DELETE_OPPORTUNITY_FAILURE:
      return {
        ...state,
        deleteOpportunity: false,
        deleteOpportunityError: false,
      };

    case types.SELECT_OPPORTUNITY_REQUEST:
      return { ...state, selectingOpportunity: true };
    case types.SELECT_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        selectingOpportunity: false,

        opportunityForecast: [action.payload, ...state.opportunityForecast],
        // clearbit: null,
      };
    case types.SELECT_OPPORTUNITY_FAILURE:
      return {
        ...state,
        selectingOpportunity: false,
        selectingOpportunityError: true,
      };

    case types.LINK_LOST_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkLostOpportunity: true,
      };
    case types.LINK_LOST_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkLostOpportunity: false,
        lostOpportunity: state.opportunityByUserId.filter(
          (item) => item.opportunityId !== action.payload.opportunityId
        ),
      };
    case types.LINK_LOST_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkLostOpportunity: false,
        linkLostOpportunityError: true,
      };

    case types.DELETE_LOST_OPPORTUNITY_REQUEST:
      return {
        ...state,
        deleteLostOpportunity: true,
      };
    case types.DELETE_LOST_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        deleteLostOpportunity: false,
        lostOpportunity: state.opportunityByUserId.filter(
          (item) => item.opportunityId !== action.payload.opportunityId
        ),
      };
    case types.DELETE_LOST_OPPORTUNITY_FAILURE:
      return {
        ...state,
        deleteLostOpportunity: false,
        deleteLostOpportunityError: true,
      };

    case types.UPDATE_OPPORTUNITY_DRAG_STAGE_REQUEST:
      return {
        ...state,
        updatingDragStage: true,

        // candidateRequirement: action.payload,
      };
    case types.UPDATE_OPPORTUNITY_DRAG_STAGE_SUCCESS:
      return {
        ...state,
        updatingDragStage: false,
        opportunityByUserId: updatedDragOpportunity(
          state.opportunityByUserId,
          action.payload
        ),
        regionQuotationSalesList: updatedDragQuotation(
          state.regionQuotationSalesList,
          action.payload
        ),
        // candidateRequirement: [action.payload]
      };
    case types.UPDATE_OPPORTUNITY_DRAG_STAGE_FAILURE:
      return { ...state };

    case types.GET_OPPORTUNITY_INITIATIVES_SKILLS_DETAILS_REQUEST:
      return { ...state, fetchingOpportunitySkillsInitiativesDetails: true };
    case types.GET_OPPORTUNITY_INITIATIVES_SKILLS_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingOpportunitySkillsInitiativesDetails: false,
        opportunityInitiativesSkillsDetails: action.payload,
      };
    case types.GET_OPPORTUNITY_INITIATIVES_SKILLS_DETAILS_FAILURE:
      return {
        ...state,
        fetchingOpportunitySkillsInitiativesDetails: false,
        fetchingOpportunitySkillsInitiativesDetailsError: true,
      };

    case types.REINSTATE_TOGGLE_FOR_LOST_REQUEST:
      return { ...state, reInstateToggleForlost: true };
    case types.REINSTATE_TOGGLE_FOR_LOST_SUCCESS:
      return {
        ...state,
        reInstateToggleForlost: false,
        lostOpportunity: state.lostOpportunity.filter(
          (item) => item.opportunityId !== action.payload
        ),
      };
    case types.REINSTATE_TOGGLE_FOR_LOST_FAILURE:
      return {
        ...state,
        reInstateToggleForlost: false,
        reInstateToggleForlostError: true,
      };

    case types.LINK_OPPORTUNITY_REQUEST:
      return {
        ...state,
        linkingOpportunity: true,
      };
    case types.LINK_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingOpportunity: false,
        // addTagProfileModal: false,
        opportunityByUserId: state.opportunityByUserId.map((recruit, i) => {
          if (recruit.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return recruit;
          }
        }),
        teamOpportunity: state.teamOpportunity.map((recruit, i) => {
          if (recruit.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return recruit;
          }
        }),
        allOpportunity: state.allOpportunity.map((recruit, i) => {
          if (recruit.opportunityId === action.payload.opportunityId) {
            return action.payload;
          } else {
            return recruit;
          }
        }),
      };
    case types.LINK_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingOpportunity: false,
        linkingOpportunityError: true,
      };
    case types.HANDLE_RECRUITMENT_EMAIL_DRAWER_MODAL:
      return { ...state, addDrawerRecruitmentEmailModal: action.payload };

    case types.UPDATE_REQUIREMENT_STAGE_REQUEST:
      return {
        ...state,
        updatingReqStage: true,
        candidateRequirement: updatedOpportunity(
          state.candidateRequirement,
          action.payload
        ),
        // candidateRequirement: action.payload,
      };
    case types.UPDATE_REQUIREMENT_STAGE_SUCCESS:
      return {
        ...state,
        updatingReqStage: false,
        // candidateRequirement: [action.payload]
      };
    case types.UPDATE_REQUIREMENT_STAGE_FAILURE:
      return { ...state };

    case types.GET_WON_OPPORTUNITY_REQUEST:
      return { ...state, fetchingWonOpportunity: true };
    case types.GET_WON_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingWonOpportunity: false,
        // lostOpportunity:action.payload

        wonOpportunity: [...state.wonOpportunity, ...action.payload],
      };
    case types.GET_WON_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingWonOpportunity: false,
        fetchingWonOpportunityError: true,
      };

    case types.GET_WON_RECORDS_REQUEST:
      return { ...state, fetchingWonRecords: true };
    case types.GET_WON_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingWonRecords: false,
        wonOpportunityData: action.payload,
      };
    case types.GET_WON_RECORDS_FAILURE:
      return {
        ...state,
        fetchingWonRecords: false,
        fetchingWonRecordsError: true,
      };

    case types.GET_OPP_LINKED_STAGES_REQUEST:
      return { ...state, fetchingOppLinkedStages: true };
    case types.GET_OPP_LINKED_STAGES_SUCCESS:
      return {
        ...state,
        fetchingOppLinkedStages: false,
        oppLinkStages: action.payload,
      };
    case types.GET_OPP_LINKED_STAGES_FAILURE:
      return {
        ...state,
        fetchingOppLinkedStages: false,
        fetchingOppLinkedStagesError: true,
      };

    case types.GET_OPP_LINKED_WORKFLOW_REQUEST:
      return { ...state, fetchingOppLinkedWorkflow: true };
    case types.GET_OPP_LINKED_WORKFLOW_SUCCESS:
      return {
        ...state,
        fetchingOppLinkedWorkflow: false,
        oppLinkWorkflow: action.payload,
      };
    case types.GET_OPP_LINKED_WORKFLOW_FAILURE:
      return {
        ...state,
        fetchingOppLinkedWorkflow: false,
        fetchingOppLinkedWorkflowError: true,
      };

    case types.GET_ALL_OPPORTUNITY_DATA_REQUEST:
      return { ...state, fetchingAllOpportunityData: true };
    case types.GET_ALL_OPPORTUNITY_DATA_SUCCESS:
      return {
        ...state,
        fetchingAllOpportunityData: false,
        allOpportunityData: action.payload,
      };
    case types.GET_ALL_OPPORTUNITY_DATA_FAILURE:
      return {
        ...state,
        fetchingAllOpportunityData: false,
        fetchingAllOpportunityDataError: true,
      };

    case types.HANDLE_OPPORTUNITY_NOTES_DRAWER_MODAL:
      return { ...state, addDrawerOpportunityNotesModal: action.payload };

    case types.GET_ALL_OPPORTUNITY_REQUEST:
      return { ...state, fetchingAllOpportunity: true };
    case types.GET_ALL_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingAllOpportunity: false,
        allOpportunity: action.payload,
      };
    case types.GET_ALL_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingAllOpportunity: false,
        fetchingAllOpportunityError: true,
      };

    case types.GET_TEAM_OPPORTUNITY_REQUEST:
      return { ...state, fetchingTeamOpportunity: true };
    case types.GET_TEAM_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingTeamOpportunity: false,
        teamOpportunity: action.payload,
      };
    case types.GET_TEAM_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingTeamOpportunity: false,
        fetchingTeamOpportunityError: true,
      };

    case types.EMPTY_OPPORTUNITY_LIST:
      return { ...state, opportunityByUserId: [] };

    case types.LINK_OPPORTUNITY_CONTRACT_REQUEST:
      return { ...state, opportunityContractStatus: true };
    case types.LINK_OPPORTUNITY_CONTRACT_SUCCESS:
      return {
        ...state,
        contractOppStatus: false,
        // addTeamTransferModal: false,
      };
    case types.LINK_OPPORTUNITY_CONTRACT_FAILURE:
      return {
        ...state,
        opportunityContractStatus: false,
        opportunityContractStatusError: true,
      };

    case types.HANDLE_OPPOORTUNITY_ROW_EMAIL_MODAL:
      return { ...state, addOpportunityRowEmailModal: action.payload };

    case types.LINK_PRODUCT_WITH_OPPORTUNITY_REQUEST:
      return { ...state, linkingProductOpportunity: true };
    case types.LINK_PRODUCT_WITH_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        linkingProductOpportunity: false,
      };
    case types.LINK_PRODUCT_WITH_OPPORTUNITY_FAILURE:
      return {
        ...state,
        linkingProductOpportunity: false,
        linkingProductOpportunityError: true,
      };
      case types.GET_LINK_PRODUCT_WITH_OPPORTUNITY_REQUEST:
        return { ...state, getlinkingProductOpportunity: true };
      case types.GET_LINK_PRODUCT_WITH_OPPORTUNITY_SUCCESS:
        return {
          ...state,
          getlinkingProductOpportunity: false,
          linkedProdOppolist:action.payload,
        };
      case types.GET_LINK_PRODUCT_WITH_OPPORTUNITY_FAILURE:
        return {
          ...state,
          getlinkingProductOpportunity: false,
          getlinkingProductOpportunityError: true,
        };

        case types.GET_ALL_CATALOGUE_SEARCH_REQUEST:
          return { ...state, serachingAllCatalogue: true };
        case types.GET_ALL_CATALOGUE_SEARCH_SUCCESS:
          return {
            ...state,
            serachingAllCatalogue: false,
            searchedCatalogue: action.payload,
          };
          case types.GET_ALL_CATALOGUE_SEARCH_FAILURE:
            return {
              ...state,
              serachingAllCatalogue: false,
              serachingAllCatalogueError: true,
            }; 

            case types.HANDLE_CLAER_SEARCHED_DATA_OPPORTUNITY:
              return { ...state, 
                ooportunitySerachedData: [],            
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
