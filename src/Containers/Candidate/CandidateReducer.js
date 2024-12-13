import * as types from "./CandidateActionTypes";


const initialState = {

  type: null,

  addCandidateModal: false,
  addCandidateResumeModal: false,
  addCandidateFilterModal: false,
  addCandidateEducationModal: false,
  updateCandidateResumeModal:false,
  addDonotCallModal:false,
  updateCandidateModal: false,
  setEditingCandidate: {},


  fetchingCandidatesBluePagination:false,
  fetchingCandidatesBluePaginationError:false,

  addingCandidate: false,
  addingCandidateError: false,

  fetchingCandidates: false,
  fetchingCandidatesError: false,
  candidateByUserId: [],



  fetchingCandidatesPagination: false,
  fetchingCandidatesPaginationError: false,
  candidatePagination: [],

  fetchingAllCandidates: false,
  fetchingAllCandidatesError: false,
  allcandidatesByUserId: [],

  fetchingCandidateById: false,
  fetchingCandidateByIdError: false,
  candidate: {},

  fetchingPlacement: false,
  fetchingPlacementError: false,
  placement: [],

  addingCandidateEmail: false,
  addingCandidateEmailError: false,

  addDrawerRecruiterModal:false,

  addCandidateRowEmailModal: false,

  // candidate: {},
  addDrawerCandidateModal:false,

  updateCandidateById: false,
  updateCandidateByIdError: false,

  documentUploadModal: false,

  fetchingNotesListByCandidateId: false,
  fetchingNotesListByCandidateIdError: false,
  notesListByCandidateId: [],

  addingResumeForm: false,
  addingResumeFormError: false,
  resumeForm: [],

  fetchingCandidateTasksInfoDetails:false,
  fetchingCandidateTasksInfoDetailsError:false,
  candidateTasksInfoDetails:[],

  addingDocumentByCandidateId: false,
  addingDocumentByCandidateIdError: false,

  fetchingDocumentsByCandidateId: false,
  fetchingDocumentsByCandidateIdError: false,
  documentsByCandidateId: [],
  //skills
  fetchingTopicsByCandidateId: false,
  fetchingTopicsByCandidateIdError: false,
  topicsByCandidateId: [],

  fetchingCertificationByCandidateId: false,
  fetchingCertificationByCandidateIdError: false,
  certificationByCandidateId:[],

  // Experience get
  fetchingSkillExperince: false,
  fetchingSkillExperinceError: false,
  skillExperince: [],
  // Experience add
  addingSkillExperince: false,
  addingSkillExperinceError: false,
  //Experience update  
  updatingSkillExperince: false,
  updatingSkillExperinceError: false,

  fetchingCandidateCountSearchData:false,
  fetchingCandidateCountSearchDataError:false,
  candidateCountSearch:[],

  fetchingCandidateFilter: false,
  fetchingCandidateFilterError: false,

  fetchingBlacklistCandidate:false,
  fetchingBlacklistCandidateError:false,
  // remark: [],

  emaildrawermodal: false,
  //Experience delete
  deleteExperienceTable: false,

  //education
  addingCandidateEducationDetails: false,
  addingCandidateEducationDetailsError: false,

  addDrawerCandidatesTasksModal:false,
  //get edu
  fetchingCandidateEducationDetails: false,
  fetchingCandidateEducationDetailsError: false,
  eduCandidateDetails: [],
  //edit edu
  setEditingCandidateEducation: {},
  //delete edu
  deleteCandidateEducationTable: false,
  //update edu
  updatingCandidateEducationDetails: false,
  updateCandidateEducationModal: false,

  //Training modal
  addCandidateTrainingModal: false,
  //add training
  addingCandidateTrainingDetails: false,
  addingCandidateTrainingDetailsError: false,
  //fetch Training
  fetchingCandidateTrainingDetails: false,
  fetchingCandidateTrainingDetailsError: false,
  candidateTrainingDetails: [],
  //edit
  setCandidateEditingTraining: {},
  //update
  updatingCandidateTrainingDetails: false,
  updatingCandidateTrainingDetailsError: false,
  updateCandidateTrainingModal: false,
  //delete
  deleteCandidateTraining: false,
  deleteCandidateTrainingError: false,

  //Employment
  addCandidateEmploymentModal: false,
  addingCandidateEmploymentDetails: false,
  addingCandidateEmploymentDetailsError: false,
  fetchingCandidateEmploymentDetails: false,
  fetchingCandidateEmploymentDetailsError: false,
  candidateEmploymentDetails: [],
  setCandidateEditingEmployment: {},
  deleteCandidateEmployment: false,
  deleteCandidateEmploymentError: false,
  updateCandidateEmploymentModal: false,
  updatingCandidateEmploymentDetails: false,
  updatingCandidateEmploymentDetailsError: false,
  employmentDetails: [],


  //search
  fetchingCandidateInputSearchData: false,
  fetchingCandidateInputSearchDataError: false,
  inputData: [],

  fetchingCandidatesBlackList:false,
  fetchingCandidatesBlackListError:false,
  blackList:[],

  chooseCandidate: false,
  chooseCandidateError: false,
  chooseCandidateEmail:[],

  fetchingCandidateSort: false,
  fetchingCandidateSortError: false,
  // Candidatesort:{},


  //search Skill
  fetchingCandidateInputSkillSearchData: false,
  fetchingCandidateInputSkillSearchDataError: false,

  addCandidateBankModal: false,

  addingBankDetails: false,
  addingBankDetailsError: false,

  fetchingBankDetails: false,
  fetchingBankDetailsError: false,
  bankDetails: [],

  addingParsingForm:false,
  addingParsingFormError:false,
  parsingForm:{},

  fetchingFilteredContact:false,
  fetchingFilteredContactError:false,
  filteredContact:[],

  updateBankModal: false,
  addCandidateEmailModal:false,
  candidateEmailDrawerProps:{},

  updatingBankDetails: false,
  updatingBankDetailsError: false,

  deleteBank: false,
  deleteBankError: false,

  setEditingBank: {},

  fetchingPermissionsList: false,
  fetchingPermissionsListError: false,
  permissionsDataList: [],

  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData: {},

  //SHARE Candidate Permission
  addSharingCandidate: false,
  addSharingCandidateError: false,
  // candidateByUserId:[],

  linkingCandidateStatus: false,
  linkingCandidateStatusError: false,

  deleteDocument: false,
  deleteDocumentError: false,

  donotCall:false,
  donotCallError:false,

  addPlayerModal: false,

  addingNotesByCandidateId:false,
  addingNotesByCandidateIdError:false,

  viewType: "card",
  fetchingAllRecords: false,
  fetchingAllRecordsError: false,
  recordAllData: {},
  //Activity
  addCandidateActivityModal: false,
  addCandidateChoiceModal:false,
  //call
  addingCandidateCall: false,
  addingCandidateCallError: false,
  //event
  addingCandidateEvent: false,
  addingCandidateEventError: false,
  //task
  addingCandidateTask: false,
  addingCandidateTaskError: false,
  //activityTable
  fetchingActivityCandidate: false,
  fetchingActivityCandidateError: false,
  activityCandidate: [],


  updatePlacementModal:false,

  fetchingCandidatesTreeMap:false,
  fetchingCandidatesTreeMapError:false,
  candidateTreeMap:{},

  addCandidateActivityTableModal: false,

  clearbitCandidate: {},

  fetchingCandidatesCategory: false,
  fetchingCandidatesCategoryError: false,
  candidateByCategory: [],

  fetchingCandidatesWhitePagination:false,
  fetchingCandidatesWhitePaginationError:false,

  fetchingCandidateSort: false,
  fetchingCandidateSortError: false,
  Candidatesort:{},


fetchingCandidatesDollarTable:false,
fetchingCandidatesDollarTableError:false,
  candidateDollarTable:[],

  fetchingCandidateCategoryRecords: false,
  fetchingCandidateCategoryRecordsError: false,
  recordCandidateCategoryData: "",
  recordCandidateCategoryDataBlue: "",

  // fetchingCandidateCategoryBlueRecords: false,
  // fetchingCandidateCategoryBlueRecords: false,
  // recordCandidateCategoryBlueData: {},
  updatingCandidateOwenership: false,
  updatingCandidateOwenershipError: false,

  addCandidateSpeechModal:false,
  tablevalue:[],

  defultStatus: false,
  defultStatusError: false,

};
export const candidateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_CANDIDATE_MODAL:
      return { ...state, addCandidateModal: action.payload };
      case types.TABLE_DYNAMIC_VALUE_DATA:
      return { ...state, tablevalue: action.payload };
    case types.HANDLE_CANDIDATE_FILTER_MODAL:
      return { ...state, addCandidateFilterModal: action.payload };
    case types.HANDLE_CANDIDATE_RESUME_MODAL:
      return { ...state, addCandidateResumeModal: action.payload };

      case types.HANDLE_UPDATE_CANDIDATE_RESUME_MODAL:
        return { ...state, updateCandidateResumeModal: action.payload };

        case types.HANDLE_CHOICE_CANDIDATE_MODAL:
          return { ...state, addCandidateChoiceModal: action.payload };

          case types.HANDLE_RECRUITER_DRAWER_MODAL:
            return { ...state, addDrawerRecruiterModal: action.payload };

          case types.HANDLE_DONOT_CALL_MODAL:
            return { ...state, addDonotCallModal: action.payload };

    case types.HANDLE_UPDATE_CANDIDATE_MODAL:
      return { ...state, updateCandidateModal: action.payload };

      case types.HANDLE_CANDIDATE_EMAIL_MODAL:
        return { ...state,
           addCandidateEmailModal: action.payload ,
          candidateEmailDrawerProps: action.payload.props,

          };

    case types.SET_CANDIDATE_EDIT:
      return { ...state, setEditingCandidate: action.payload };

      case types.EMPTY_CANDIDATE_TABLE:
        return { ...state, candidateByUserId:[] };

    case types.ADD_CANDIDATE_REQUEST:
      return { ...state, addingCandidate: true };
    case types.ADD_CANDIDATE_SUCCESS:
      return { ...state, addingCandidate: false,
        addCandidateModal: false, 
        addCandidateResumeModal: false,

        candidateByUserId:[action.payload,...state.candidateByUserId]
      };
    case types.ADD_CANDIDATE_FAILURE:
      return { ...state, addingCandidate: false, addCandidateModal: false, addCandidateResumeModal: false };

    case types.GET_CANDIDATES_REQUEST:
      return { ...state, fetchingCandidates: true };
    case types.GET_CANDIDATES_SUCCESS:
      return {
        ...state,
        fetchingCandidates: false,
        candidateByUserId: [
          ...state.candidateByUserId,
          ...action.payload],
      };
    case types.GET_CANDIDATES_FAILURE:
      return {
        ...state,
        fetchingCandidates: false,
        fetchingCandidatesError: true,
      };

    case types.GET_CANDIDATE_BY_ID_REQUEST:
      return { ...state, fetchingCandidateById: true };
    case types.GET_CANDIDATE_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingCandidateById: false,
        candidate: action.payload,
      };
    case types.GET_CANDIDATE_BY_ID_FAILURE:
      return {
        ...state,
        fetchingCandidateById: false,
        fetchingCandidateByIdError: true,
      };

    /**
     * update a single candidate by its ID
     */
    case types.UPDATE_CANDIDATE_BY_ID_REQUEST:
      return { ...state, updateCandidateById: true };
    case types.UPDATE_CANDIDATE_BY_ID_SUCCESS:
      return {
        ...state,
        updateCandidateById: false,
        updateCandidateModal: false,
        updateCandidateResumeModal:false,
        candidateByUserId: state.candidateByUserId.map((item) => {
          if (item.candidateId === action.payload.candidateId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_CANDIDATE_BY_ID_FAILURE:
      return {
        ...state,
        updateCandidateById: false,
        updateCandidateByIdError: true,
      };

    case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

    /**
     * Candidate Notes
     */

    case types.GET_NOTES_LIST_BY_CANDIDATE_ID_REQUEST:
      return { ...state, fetchingNotesListByCandidateId: true };
    case types.GET_NOTES_LIST_BY_CANDIDATE_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByCandidateId: false,
        notesListByCandidateId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_CANDIDATE_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByCandidateId: false,
        fetchingNotesListByCandidateIdError: true,
      };

      case types.HANDLE_CANDIDATE_DRAWER_MODAL:
            return { ...state, addDrawerCandidateModal: action.payload };

    /* add/link Candidate document */
    case types.ADD_CANDIDATE_DOCUMENT_REQUEST:
      return {
        ...state,
        addingDocumentByCandidateId: true,
        addingDocumentByCandidateIdError: false,
      };
    case types.ADD_CANDIDATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingDocumentByCandidateId: false,
        addingDocumentByCandidateIdError: false,
      };
    case types.ADD_CANDIDATE_DOCUMENT_FAILURE:
      return {
        ...state,
        addingDocumentByCandidateId: false,
        addingDocumentByCandidateIdError: true,
      };

    /* get list of documents of an candidate */
    case types.GET_CANDIDATE_DOCUMENTS_REQUEST:
      return {
        ...state,
        fetchingDocumentsByCandidateId: true,
        fetchingDocumentsByCandidateIdError: false,
      };
    case types.GET_CANDIDATE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingDocumentsByCandidateId: false,
        fetchingDocumentsByCandidateIdError: false,
        documentsByCandidateId: action.payload,
      };
    case types.GET_CANDIDATE_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocumentsByCandidateId: false,
        fetchingDocumentsByCandidateIdError: true,
      };


      case types.EMPTY_WHITE_CANDIDATE_TABLE:
        return { ...state, candidateByCategory:[] };

    //Add,Edit & Delete Skills

    case types.GET_TOPICS_BY_CANDIDATE_ID_REQUEST:
      return { ...state, fetchingTopicsByCandidateId: true };
    case types.GET_TOPICS_BY_CANDIDATE_ID_SUCCESS:
      return {
        ...state,
        fetchingTopicsByCandidateId: false,
        topicsByCandidateId: action.payload,
      };
    case types.GET_TOPICS_BY_CANDIDATE_ID_FAILURE:
      return {
        ...state,
        fetchingTopicsByCandidateId: false,
        fetchingTopicsByCandidateIdError: true,
      };

    case types.ADD_TOPIC_BY_CANDIDATE_ID_REQUEST:
      return { ...state, addingTopicByCandidateId: true };
    case types.ADD_TOPIC_BY_CANDIDATE_ID_SUCCESS:
      // console.clear()
      // console.log(action.payload)
      return {
        ...state,
        addingTopicByCandidateId: false,
        topicsByCandidateId: [...state.topicsByCandidateId, action.payload],
      };
    case types.ADD_TOPIC_BY_CANDIDATE_ID_FAILURE:
      return {
        ...state,
        addingTopicByCandidateId: false,
        addingTopicByCandidateIdError: true,
      };

    case types.DELETE_TOPIC_BY_CANDIDATE_ID_REQUEST:
      return { ...state, deletingTopicByCandidateId: true };
    case types.DELETE_TOPIC_BY_CANDIDATE_ID_SUCCESS:
      return { ...state, deletingTopicByCandidateId: false };
    case types.DELETE_TOPIC_BY_CANDIDATE_ID_FAILURE:
      return {
        ...state,
        deletingTopicByCandidateId: false,
        deletingTopicByCandidateIdError: true,
      };
    //education tab
    case types.HANDLE_CANDIDATE_EDUCATION_MODAL:
      return { ...state, addCandidateEducationModal: action.payload };

    //ADD EDUCATION
    case types.ADD_CANDIDATE_EDUCATIONAL_DETAILS_REQUEST:
      return { ...state, addingCandidateEducationDetails: true };
    case types.ADD_CANDIDATE_EDUCATIONAL_DETAILS_SUCCESS:
      return {
        ...state,
        addingCandidateEducationDetails: false,
        addCandidateEducationModal: false,
      };
    case types.ADD_CANDIDATE_EDUCATIONAL_DETAILS_FAILURE:
      return {
        ...state,
        addingCandidateEducationDetails: false,
        addingCandidateEducationDetailsError: true,
        addCandidateEducationModal: false,
      };

    //get edu
    //FETCH CANDIDATE EDUCATION DETAILS
    case types.GET_CANDIDATE_EDUCATION_DETAILS_REQUEST:
      return { ...state, fetchingCandidateEducationDetails: true };
    case types.GET_CANDIDATE_EDUCATION_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingCandidateEducationDetails: false,
        eduCandidateDetails: action.payload,
      };
    case types.GET_CANDIDATE_EDUCATION_DETAILS_FAILURE:
      return {
        ...state,
        fetchingCandidateEducationDetails: false,
        fetchingCandidateEducationDetailsError: true,
      };
    case types.SET_EDIT_CANDIDATE_EDUCATION:
      return { ...state, setEditingCandidateEducation: action.payload };
    //delete edu
    case types.DELETE_CANDIDATE_EDUCATION_REQUEST:
      return { ...state, deleteCandidateEducationTable: true };
    case types.DELETE_CANDIDATE_EDUCATION_SUCCESS:
      return {
        ...state,
        deleteCandidateEducationTable: false,
        addCandidateEducationModal: false,
        eduCandidateDetails: state.eduCandidateDetails.filter(
          (item) => item.id !== action.payload
        ),
      };

    case types.DELETE_CANDIDATE_EDUCATION_FAILURE:
      return {
        ...state,
        deleteCandidateEducationTable: false,
        deleteCandidateEducationError: false,
      };

    //UPDATE EDUCATION
    case types.UPDATE_CANDIDATE_EDUCATIONAL_DETAILS_REQUEST:
      return { ...state, updatingCandidateEducationDetails: true };
    case types.UPDATE_CANDIDATE_EDUCATIONAL_DETAILS_SUCCESS:
      return {
        ...state,
        updatingCandidateEducationDetails: false,
        updateCandidateEducationModal: false,
        eduCandidateDetails: state.eduCandidateDetails.map((education, i) => {
          if (education.id === action.payload.id) {
            return action.payload;
          } else {
            return education;
          }
        }),
      };
    case types.UPDATE_CANDIDATE_EDUCATIONAL_DETAILS_FAILURE:
      return {
        ...state,
        updatingCandidateEducationDetails: false,
        updatingCandidateEducationDetailsError: true,
      };
    case types.HANDLE_UPDATE_CANDIDATE_EDUCATION_MODAL:
      return { ...state, updateCandidateEducationModal: action.payload };

    case types.HANDLE_CANDIDATE_TRAINING_MODAL:
      return { ...state, addCandidateTrainingModal: action.payload };

    //ADD TRAINING
    case types.ADD_CANDIDATE_TRAINING_DETAILS_REQUEST:
      return { ...state, addingCandidateTrainingDetails: true };
    case types.ADD_CANDIDATE_TRAINING_DETAILS_SUCCESS:
      return {
        ...state,
        addingCandidateTrainingDetails: false,
        addCandidateTrainingModal: false,
        addTrainingModal: false,
      };
    case types.ADD_CANDIDATE_TRAINING_DETAILS_FAILURE:
      return {
        ...state,
        addingCandidateTrainingDetails: false,
        addingCandidateTrainingDetailsError: true,
      };

    //FETCH CANDIDATE TRAINING DETAILS
    case types.GET_CANDIDATE_TRAINING_DETAILS_REQUEST:
      return { ...state, fetchingCandidateTrainingDetails: true };
    case types.GET_CANDIDATE_TRAINING_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingCandidateTrainingDetails: false,
        candidateTrainingDetails: action.payload,
      };
    case types.GET_CANDIDATE_TRAINING_DETAILS_FAILURE:
      return {
        ...state,
        fetchingCandidateTrainingDetails: false,
        fetchingCandidateTrainingDetailsError: true,
      };
    //UPDATE TRAINING
    case types.UPDATE_CANDIDATE_TRAINING_DETAILS_REQUEST:
      return { ...state, updatingCandidateTrainingDetails: true };
    case types.UPDATE_CANDIDATE_TRAINING_DETAILS_SUCCESS:
      return {
        ...state,
        updatingCandidateTrainingDetails: false,
        updateCandidateTrainingModal: false,
        candidateTrainingDetails: state.candidateTrainingDetails.map(
          (training, i) => {
            if (training.id === action.payload.id) {
              return action.payload;
            } else {
              return training;
            }
          }
        ),
      };
    case types.UPDATE_CANDIDATE_TRAINING_DETAILS_FAILURE:
      return {
        ...state,
        updatingCandidateTrainingDetails: false,
        updatingCandidateTrainingDetailsError: true,
      };

    case types.SET_CANDIDATE_TRAINING_EDIT:
      return { ...state, setCandidateEditingTraining: action.payload };

    case types.HANDLE_UPDATE_CANDIDATE_TRAINING_MODAL:
      return { ...state, updateCandidateTrainingModal: action.payload };

    //DELETE TRAINING
    case types.DELETE_CANDIDATE_TRAINING_REQUEST:
      return { ...state, deleteCandidateTraining: true };
    case types.DELETE_CANDIDATE_TRAINING_SUCCESS:
      return {
        ...state,
        deleteCandidateTraining: false,
        // addCallModal: false,
        candidateTrainingDetails: state.candidateTrainingDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_CANDIDATE_TRAINING_FAILURE:
      return {
        ...state,
        deleteCandidateTraining: false,
        deleteCandidateTrainingError: false,
      };

    //Training Modal
    case types.HANDLE_CANDIDATE_EMPLOYMENT_MODAL:
      return { ...state, addCandidateEmploymentModal: action.payload };

    //employment

    //ADD EMPLOYMENT
    case types.ADD_CANDIDATE_EMPLOYMENT_DETAILS_REQUEST:
      return { ...state, addingCandidateEmploymentDetails: true };
    case types.ADD_CANDIDATE_EMPLOYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        addingCandidateEmploymentDetails: false,
        addCandidateEmploymentModal: false,
      };
    case types.ADD_CANDIDATE_EMPLOYMENT_DETAILS_FAILURE:
      return {
        ...state,
        addingCandidateEmploymentDetails: false,
        addingCandidateEmploymentDetailsError: true,
      };


       case types.HANDLE_PLACEMENT_PULSE_MODAL:
              return { ...state, updatePlacementModal: action.payload };

    //FETCH CANDIDATE EMPLOYMENT DETAILS
    case types.GET_CANDIDATE_EMPLOYMENT_DETAILS_REQUEST:
      return { ...state, fetchingCandidateEmploymentDetails: true };
    case types.GET_CANDIDATE_EMPLOYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingCandidateEmploymentDetails: false,
        candidateEmploymentDetails: action.payload,
      };
    case types.GET_CANDIDATE_EMPLOYMENT_DETAILS_FAILURE:
      return {
        ...state,
        fetchingCandidateEmploymentDetails: false,
        fetchingCandidateEmploymentDetailsError: true,
      };
    case types.SET_CANDIDATE_EMPLOYMENT_EDIT:
      return { ...state, setCandidateEditingEmployment: action.payload };
    //DELETE
    case types.DELETE_CANDIDATE_EMPLOYMENT_REQUEST:
      return { ...state, deleteCandidateEmployment: true };
    case types.DELETE_CANDIDATE_EMPLOYMENT_SUCCESS:
      return {
        ...state,
        deleteEmployment: false,
        // addCallModal: false,
        candidateDetails: state.candidateDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_CANDIDATE_EMPLOYMENT_FAILURE:
      return {
        ...state,
        deleteCandidateEmployment: false,
        deleteCandidateEmploymentError: false,
      };

    case types.HANDLE_CANDIDATE_UPDATE_EMPLOYMENT_MODAL:
      return { ...state, updateCandidateEmploymentModal: action.payload };

    //UPDATE EMPLOYMENT
    case types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_REQUEST:
      return { ...state, updatingCandidateEmploymentDetails: true };
    case types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_SUCCESS:
      return {
        ...state,
        updatingCandidateEmploymentDetails: false,
        updateCandidateEmploymentModal: false,
        skillExperince:[action.payload,...state.skillExperince]
        // skillExperince: state.skillExperince.map((item) => {
        //   if (item.skillSetDetailsId === action.payload.skillSetDetailsId) {
        //     return action.payload;
        //   } else {
        //     return item;
        //   }
        // }),
      };
    case types.UPDATE_CANDIDATE_EMPLOYMENT_DETAILS_FAILURE:
      return {
        ...state,
        updatingCandidateEmploymentDetails: false,
        updatingCandidateEmploymentDetailsError: true,
      };

    //SEARCH
    case types.INPUT_CANDIDATE_SEARCH_DATA_REQUSET:
      return { ...state, fetchingCandidateInputSearchData: true };
    case types.INPUT_CANDIDATE_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingCandidateInputSearchData: false,
        candidateByUserId: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_CANDIDATE_SEARCH_DATA_FAILURE:
      return { ...state, fetchingCandidateInputSearchDataError: true };
    //SEARCH SKILL
    case types.INPUT_CANDIDATE_SKILL_SEARCH_DATA_REQUEST:
      return { ...state, fetchingCandidateInputSkillSearchData: true };
    case types.INPUT_CANDIDATE_SKILL_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingCandidateInputSkillSearchData: false,
        candidateByUserId: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_CANDIDATE_SEARCH_DATA_FAILURE:
      return { ...state, fetchingCandidateInputSkillSearchDataError: true };

    case types.HANDLE_CANDIDATE_BANK_MODAL:
      return { ...state, addCandidateBankModal: action.payload };

    //ADD BANK
    case types.ADD_BANK_DETAILS_REQUEST:
      return { ...state, addingBankDetails: true };
    case types.ADD_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        addingBankDetails: false,
        addCandidateBankModal: false,
      };
    case types.ADD_BANK_DETAILS_FAILURE:
      return {
        ...state,
        addingBankDetails: false,
        addingBankDetailsError: true,
      };

    //FETCH CANDIDATE BANK DETAILS
    case types.GET_CANDIDATE_BANK_DETAILS_REQUEST:
      return { ...state, fetchingBankDetails: true };
    case types.GET_CANDIDATE_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingBankDetails: false,
        bankDetails: action.payload,
      };
    case types.GET_CANDIDATE_BANK_DETAILS_FAILURE:
      return {
        ...state,
        fetchingBankDetails: false,
        fetchingBankDetailsError: true,
      };

    case types.HANDLE_UPDATE_BANK_MODAL:
      return { ...state, updateBankModal: action.payload };

    //UPDATE BANK

    case types.UPDATE_BANK_DETAILS_REQUEST:
      return { ...state, updatingBankDetails: true };
    case types.UPDATE_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        updatingBankDetails: false,
        updateBankModal: false,
        bankDetails: state.bankDetails.map((bank, i) => {
          if (bank.id === action.payload.id) {
            return action.payload;
          } else {
            return bank;
          }
        }),
      };
    case types.UPDATE_BANK_DETAILS_FAILURE:
      return {
        ...state,
        updatingBankDetails: false,
        updatingBankDetailsError: true,
      };

    case types.DELETE_BANK_REQUEST:
      return { ...state, deleteBank: true };
    case types.DELETE_BANK_SUCCESS:
      return {
        ...state,
        deleteBank: false,
        // addCallModal: false,
        bankDetails: state.bankDetails.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_BANK_FAILURE:
      return { ...state, deleteBank: false, deleteBankError: false };

    case types.SET_BANK_EDIT:
      return { ...state, setEditingBank: action.payload };

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

    //SHARE Candidate Permissiom
    case types.ADD_SHARE_CANDIDATE_PERMISSION_REQUEST:
      return { ...state, addSharingCandidate: true };

    case types.ADD_SHARE_CANDIDATE_PERMISSION_SUCCESS:
      return {
        ...state,
        addSharingCandidate: false,
        candidateByUserId:action.payload ,

      };

    case types.ADD_SHARE_CANDIDATE_PERMISSION_FAILURE:
      return {
        ...state,
        addSharingCandidate: false,
        addSharingCandidateError: true,
      };

    case types.LINK_CANDIDATE_STATUS_REQUEST:
      return { ...state, linkingCandidateStatus: true };
    case types.LINK_CANDIDATE_STATUS_SUCCESS:
      return {
        ...state,
        linkingCandidateStatus: false,
        // candidateByUserId: state.candidateByUserId.map((item) => {
        //   if (item.candidateId === action.payload.candidateId) {
        //     return { ...item, active: action.payload.active };
        //   } else {
        //     return item;
        //   }
        // }),
        // cancelOrder: action.payload,
        // candidateByUserId: action.payload,
        // addTeamTransferModal: false,
      };
    case types.LINK_CANDIDATE_STATUS_FAILURE:
      return {
        ...state,
        linkingCandidateStatus: false,
        linkingCandidateStatusError: true,
      };

    //get All Candidates
    case types.GET_ALL_CANDIDATES_REQUEST:
      return { ...state, fetchingAllCandidates: true };
    case types.GET_ALL_CANDIDATES_SUCCESS:
      return {
        ...state,
        fetchingAllCandidates: false,
        allcandidatesByUserId: action.payload,
      };
    case types.GET_ALL_CANDIDATES_FAILURE:
      return {
        ...state,
        fetchingAllCandidates: false,
        fetchingAllCandidatesError: true,
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

      case types.HANDLE_PLAYER_MODAL:
        return { ...state, addPlayerModal: action.payload };

    case types.DELETE_DOCUMENT_REQUEST:
      return { ...state, deleteDocument: true };
    case types.DELETE_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteTask: false,
        documentsByCandidateId: state.documentsByCandidateId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_DOCUMENT_FAILURE:
      return { ...state, deleteDocument: false, deleteDocumentError: false };

    case types.SET_CANDIDATE_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    //GET ALL RECORDS
    case types.GET_ALL_RECORDS_REQUEST:
      return { ...state, fetchingAllRecords: true };
    case types.GET_ALL_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingAllRecords: false,
        recordAllData: action.payload,
      };
    case types.GET_ALL_RECORDS_FAILURE:
      return {
        ...state,
        fetchingAllRecords: false,
        fetchingAllRecordsError: true,
      };

    //activity
    //modal
    case types.HANDLE_CANDIDATE_ACTIVITY_MODAL:
      return { ...state, addCandidateActivityModal: action.payload };
    //add call
    case types.ADD_CANDIDATE_CALL_REQUEST:
      return { ...state, addingCandidateCall: true };
    case types.ADD_CANDIDATE_CALL_SUCCESS:
      return {
        ...state,
        addingCandidateCall: false,
        addCandidateActivityModal: false,
      };
    case types.ADD_CANDIDATE_CALL_FAILURE:
      return {
        ...state,
        addingCandidateCall: false,
        addingCandidateCallError: false,
        addCandidateActivityModal: false,
      };
    /**
     * add event activity
     */
    case types.ADD_CANDIDATE_EVENT_REQUEST:
      return { ...state, addingCandidateEvent: true };
    case types.ADD_CANDIDATE_EVENT_SUCCESS:
      return {
        ...state,
        addingCandidateEvent: false,
        addCandidateActivityModal: false,
      };
    case types.ADD_CANDIDATE_EVENT_FAILURE:
      return {
        ...state,
        addingCandidateEvent: false,
        addingCandidateEventError: false,
        addCandidateActivityModal: false,
      };

    /**
     * add task activity
     */
    case types.ADD_CANDIDATE_TASK_REQUEST:
      return { ...state, addingCandidateTask: true };
    case types.ADD_CANDIDATE_TASK_SUCCESS:
      return {
        ...state,
        addingCandidateTask: false,
        addCandidateActivityModal: false,
      };
    case types.ADD_CANDIDATE_TASK_FAILURE:
      return {
        ...state,
        addingCandidateTask: false,
        addingCandidateTaskError: false,
        addCandidateActivityModal: false,
      };
    /**
     * get the list of all activity candidate
     */
    case types.GET_ACTIVITY_LIST_BY_CANDIDATEID_REQUEST:
      return { ...state, fetchingActivityCandidate: true };
    case types.GET_ACTIVITY_LIST_BY_CANDIDATEID_SUCCESS:
      return {
        ...state,
        fetchingActivityCandidate: false,
        activityCandidate: action.payload,
      };
    case types.GET_ACTIVITY_LIST_BY_CANDIDATEID_FAILURE:
      return {
        ...state,
        fetchingActivityCandidate: false,
        fetchingActivityCandidateError: true,
      };
    case types.SET_TYPE_CHOOSE_CANDIDATE_REQUEST:
      return { ...state };
    case types.SET_TYPE_CHOOSE_CANDIDATE_SUCCESS:
      return {
        ...state,
        addCandidateChoiceModal:false,

        type: action.payload,
      };

    case types.GET_PLACEMENT_REQUEST:
      return { ...state, fetchingPlacement: true };
    case types.GET_PLACEMENT_SUCCESS:
      return {
        ...state,
        fetchingPlacement: false,
        placement: action.payload,
      };
    case types.GET_PLACEMENT_FAILURE:
      return {
        ...state,
        fetchingPlacement: false,
        fetchingPlacementError: true,
      };

    case types.HANDLE_CANDIDATE_ACTIVITY_TABLE_MODAL:
      return {
        ...state,
        addCandidateActivityTableModal: action.payload,
      };

    case types.ADD_RESUME_FORM_REQUEST:
      return { ...state, addingResumeForm: true };
    case types.ADD_RESUME_FORM_SUCCESS:
      return {
        ...state,
        addingResumeForm: false,
        resumeForm: action.payload,
        // addOpportunityModal: false,
        // clearbit: null,
      };
    case types.ADD_RESUME_FORM_FAILURE:
      return {
        ...state,
        addingResumeForm: false,
        addingResumeFormError: true,
        // addOpportunityModal: false,
      };

    case types.SET_CLEARBIT_CANDIDATE_DATA:
      return { ...state, clearbitCandidate: action.payload };

    case types.GET_CANDIDATES_BY_CATEGORY_REQUEST:
      return { ...state, fetchingCandidatesCategory: true };
    case types.GET_CANDIDATES_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        fetchingCandidatesCategory: false,
        candidateByCategory: [
          ...state.candidateByCategory,
          ...action.payload],
      };
    case types.GET_CANDIDATES_BY_CATEGORY_FAILURE:
      return {
        ...state,
        fetchingCandidatesCategory: false,
        fetchingCandidatesCategoryError: true,
      };

    case types.GET_CANDIDATE_CATEGORY_RECORDS_REQUEST:
      return { ...state, fetchingCandidateCategoryRecords: true };
    case types.GET_CANDIDATE_CATEGORY_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingCandidateCategoryRecords: false,
        recordCandidateCategoryData: action.payload,
      };
    case types.GET_CANDIDATE_CATEGORY_RECORDS_BLUE_SUCCESS:
      return {
        ...state,
        fetchingCandidateCategoryRecords: false,
        recordCandidateCategoryDataBlue: action.payload,
      };

    case types.GET_CANDIDATE_CATEGORY_RECORDS_FAILURE:
      return {
        ...state,
        fetchingCandidateCategoryRecords: false,
        fetchingCandidateCategoryRecordsError: true,
      };


    // GET CANDIDATE EXPERIENCE DETAILS
    case types.GET_EXPERIENCE_BY_CANDIDATE_ID_REQUEST:
      return { ...state, fetchingSkillExperince: true };
    case types.GET_EXPERIENCE_BY_CANDIDATE_ID_SUCCESS:
      return {
        ...state,
        fetchingSkillExperince: false,
        skillExperince: action.payload, 
      };
    case types.GET_EXPERIENCE_BY_CANDIDATE_ID_FAILURE:
      return {
        ...state,
        fetchingSkillExperince: false,
        fetchingSkillExperinceError: true,
      };
//ADD CANDIDATE EXPERIENCE DETAILS
case types.ADD_EXPERIENCE_BY_CANDIDATE_ID_REQUEST:
      return { ...state, addingSkillExperince: true };
    case types.ADD_EXPERIENCE_BY_CANDIDATE_ID_SUCCESS:
      return {
        ...state,
        addingSkillExperince: false,
       // addCandidateActivityModal: false,
      };
    case types.ADD_EXPERIENCE_BY_CANDIDATE_ID_FAILURE :
      return {
        ...state,
        addingSkillExperince: false,
        addingSkillExperinceError: false,
        //addCandidateActivityModal: false,
      };

       //UPDATE EXPERIENCE
    case types.UPDATE_EXPERIENCE_BY_CANDIDATE_ID_REQUEST:
      return { ...state, updatingSkillExperince: true };
    case types.UPDATE_EXPERIENCE_BY_CANDIDATE_ID_SUCCESS:
      return {
        ...state,
        updatingSkillExperince: false,        
        skillExperince: state.skillExperince.map((experience, i) => {
          if (experience.candidateId === action.payload.candidateId) {
            return action.payload;
          } else {
            return experience;
          }
        }),
      };
    case types.UPDATE_EXPERIENCE_BY_CANDIDATE_ID_FAILURE:
      return {
        ...state,
        updatingSkillExperince: false,
        updatingSkillExperinceError: true,
      };  
      
      case types.CANDIDATE_COUNT_SEARCH_DATA_REQUSET:
      return { ...state, fetchingCandidateCountSearchData: true };
    case types.CANDIDATE_COUNT_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingCandidateCountSearchData: false,
        candidateCountSearch: action.payload,
        // serachedData: action.payload,
      };
    case types.CANDIDATE_COUNT_SEARCH_DATA_FAILURE:
      return { ...state, fetchingCandidateCountSearchDataError: true };

      case types.HANDLE_CANDIDATES_TASKS_DRAWER_MODAL:
        return { ...state, addDrawerCandidatesTasksModal: action.payload };


      case types.GET_CANDIDATE_FILTER_REQUEST:
        return {
          ...state,
          fetchingCandidateFilter: true,
        };
  
      case types.GET_CANDIDATE_FILTER_SUCCESS:
        return {
          
          ...state,
          fetchingCandidateFilter: false,
          addCandidateFilterModal:false,
          candidateByUserId: action.payload,
      
          // remark: action.payload,
        };
  
      case types.GET_CANDIDATE_FILTER_FAILURE:
        return {
          ...state,
          fetchingCandidateFilterError: true,
        };

        case types.UPDATE_CANDIDATE_OWNERSHIP_REQUEST:
          return { ...state, updatingCandidateOwenership: true };
        case types.UPDATE_CANDIDATE_OWNERSHIP_SUCCESS:
          return {
            ...state,
            updatingCandidateOwenership: false,
            // updateCandidateEmploymentModal: false,
            // candidateByUserId: state.candidateByUserId.map((item) => {
            //   if (item.candidateId === action.payload.candidateId) {
            //     return action.payload;
            //   } else {
            //     return item;
            //   }
            // }),
            candidateByUserId:state.candidateByUserId.filter(
              (item)=>{
                console.log("abc",item,action.payload);

              return !action.payload.includes(item.candidateId)  
              }
            )
          };
        case types.UPDATE_CANDIDATE_OWNERSHIP_SUCCESS:
          return {
            ...state,
            updatingCandidateOwenership: false,
            updatingCandidateOwenershipError: true,
          };

          case types.HANDLE_CANDIDATE_REACT_SPEECH_MODAL:
            return { ...state, addCandidateSpeechModal: action.payload };

            case types.ADD_CANDIDATE_NOTES_REQUEST:
              return {
                ...state,
                addingNotesByCandidateId: true,          
              };
            case types.ADD_CANDIDATE_NOTES_SUCCESS:
              return {
                ...state,
                addingNotesByCandidateId: false,
                addingNotesByCandidateIdError: false,
                addCandidateSpeechModal:false,
              };
            case types.ADD_CANDIDATE_NOTES_FAILURE:
              return {
                ...state,
                addingNotesByCandidateId: false,
                addingNotesByCandidateIdError: true,
              }; 


              case types.CHOOSE_CANDIDATE_REQUEST:
                return { ...state, chooseCandidate: true };
              case types.CHOOSE_CANDIDATE_SUCCESS:
                return {
                  ...state,
                  chooseCandidateEmail: action.payload,
                  chooseCandidate: false,
                  addCandidateChoiceModal:false
                  // updateCandidateEmploymentModal: false,
                 
                };
              case types.CHOOSE_CANDIDATE_FAILURE:
                return {
                  ...state,
                  chooseCandidate: false,
                  chooseCandidateError: true,
                };


                case types.GET_BLACKLIST_CANDIDATE_REQUEST:
                  return { ...state, fetchingBlacklistCandidate: true };
                case types.GET_BLACKLIST_CANDIDATE_SUCCESS:
                  return {
                    ...state,
                    fetchingBlacklistCandidate: false,
                   
                    candidateByUserId: state.candidateByUserId.filter(
                      (item) => item.candidateId !== action.payload
                    ),
                    // recruiter: action.payload,
                  };
                case types.GET_BLACKLIST_CANDIDATE_FAILURE:
                  return {
                    ...state,
                    fetchingBlacklistCandidate: false,
                    fetchingBlacklistCandidateError: true,
                  };

                  case types.ADD_DONOT_CALL_REQUEST:
                    return {
                      ...state,
                      donotCall: true,
                    };
                  case types.ADD_DONOT_CALL_SUCCESS:
                    return {
                      ...state,
                      donotCall: false,
                      addDonotCallModal:false,
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
                  case types.ADD_DONOT_CALL_FAILURE:
                    return {
                      ...state,
                      donotCall: false,
                      donotCallError: true,
                    };


                    case types.GET_CANDIDATES_BLACKLIST_REQUEST:
                      return { ...state, fetchingCandidatesBlackList: true };
                    case types.GET_CANDIDATES_BLACKLIST_SUCCESS:
                      return {
                        ...state,
                        fetchingCandidatesBlackList: false,
                        blackList: action.payload,
                      };
                    case types.GET_CANDIDATES_BLACKLIST_FAILURE:
                      return {
                        ...state,
                        fetchingCandidatesBlackList: false,
                        fetchingCandidatesBlackListError: true,
                      };


                      case types.ADD_CANDIDATE_EMAIL_REQUEST:
                        return { ...state, addingCandidateEmail: true };
                      case types.ADD_CANDIDATE_EMAIL_SUCCESS:
                        return { ...state, addingCandidateEmail: false,  };
                      case types.ADD_CANDIDATE_EMAIL_FAILURE:
                        return { ...state, addingCandidateEmail: false, addingCandidateEmailError:false};


                        case types.GET_FILTERED_CONTACT_REQUEST:
                          return { ...state, fetchingFilteredContact: true };
                        case types.GET_FILTERED_CONTACT_SUCCESS:
                          return {
                            ...state,
                            fetchingFilteredContact: false,
                            filteredContact: action.payload,
                          };
                        case types.GET_FILTERED_CONTACT_FAILURE:
                          return {
                            ...state,
                            fetchingFilteredContact: false,
                            fetchingFilteredContactError: true,
                          };
                        case types.HANDLE_CANDIDATE_ROW_EMAIL_MODAL:
                        return { ...state, addCandidateRowEmailModal: action.payload };


                        case types.GET_CANDIDATES_TREE_MAP_REQUEST:
                          return { ...state, fetchingCandidatesTreeMap: true };
                        case types.GET_CANDIDATES_TREE_MAP_SUCCESS:
                          return {
                            ...state,
                            fetchingCandidatesTreeMap: false,
                            candidateTreeMap: action.payload,
                          };
                        case types.GET_CANDIDATES_TREE_MAP_FAILURE:
                          return {
                            ...state,
                            fetchingCandidatesTreeMap: false,
                            fetchingCandidatesTreeMapError: true,
                          };
                    
                          case types.LINK_EMPLOYEE_STATUS_REQUEST:
                            return { ...state, defultStatus: true };
                          case types.LINK_EMPLOYEE_STATUS_SUCCESS:
                            return {
                              ...state,
                              defultStatus: false,
                              // addTeamTransferModal: false,
                            };
                          case types.LINK_EMPLOYEE_STATUS_FAILURE:
                            return {
                              ...state,
                              defultStatus: false,
                              defultStatusError: true,
                            };
                            case types.UPDATE_EXPERIENCE_ROLE_REQUEST:
                              return { ...state };
                            case types.UPDATE_EXPERIENCE_ROLE_SUCCESS:
                              return {
                                ...state,
                                skillExperince: state.skillExperince.map(
                                  (item) =>{
                                  if (item.skillSetDetailsId === action.payload.skillSetDetailsId) {
                                    return action.payload;
                                  } else {
                                    return item;
                                  }
                                }),
                              };
                            case types.UPDATE_EXPERIENCE_ROLE_FAILURE:
                              return { ...state };



              
                              case types.GET_CANDIDATE_SORT_REQUEST:
                                return { ...state, fetchingCandidateSort: true };
                              case types.GET_CANDIDATE_SORT_SUCCESS:
                                return {
                                  ...state,
                                  fetchingCandidateSort: false,
                                  candidateByUserId: action.payload,
                                };
                              case types.GET_CANDIDATE_SORT_FAILURE:
                                return {
                                  ...state,
                                  fetchingCandidateSort: false,
                                  fetchingCandidateSortError: true,
                                };
      

                              case types.GET_CANDIDATE_SORT_REQUEST:
                                return { ...state, fetchingCandidateSort: true };
                              case types.GET_CANDIDATE_SORT_SUCCESS:
                                return {
                                  ...state,
                                  fetchingCandidateSort: false,
                                  Candidatesort: action.payload,
                                };
                              case types.GET_CANDIDATE_SORT_FAILURE:
                                return {
                                  ...state,
                                  fetchingCandidateSort: false,
                                  fetchingCandidateSortError: true,
                                };



                                case types.ADD_CERTIFICATION_BY_CANDIDATE_ID_REQUEST:
                                  return { ...state, addingCertificationByCandidateId: true };
                                case types.ADD_CERTIFICATION_BY_CANDIDATE_ID_SUCCESS:
                                  // console.clear()
                                  // console.log(action.payload)
                                  return {
                                    ...state,
                                    addingCertificationByCandidateId: false,
                                    certificationByCandidateId: [...state.certificationByCandidateId, action.payload],
                                  };
                                case types.ADD_CERTIFICATION_BY_CANDIDATE_ID_FAILURE:
                                  return {
                                    ...state,
                                    addingCertificationByCandidateId: false,
                                    addingCertificationByCandidateIdError: true,
                                  };

      case types.GET_CERTIFICATION_BY_CANDIDATE_ID_REQUEST:
      return { ...state, fetchingCertificationByCandidateId: true };
    case types.GET_CERTIFICATION_BY_CANDIDATE_ID_SUCCESS:
      return {
        ...state,
        fetchingCertificationByCandidateId: false,
        certificationByCandidateId: action.payload,
      };
    case types.GET_CERTIFICATION_BY_CANDIDATE_ID_FAILURE:
      return {
        ...state,
        fetchingCertificationByCandidateId: false,
        fetchingCertificationByCandidateIdError: true,
      };

      case types.DELETE_CERTIFICATION_BY_CANDIDATE_ID_REQUEST:
        return { ...state, deletingCertificationByCandidateId: true };
      case types.DELETE_CERTIFICATION_BY_CANDIDATE_ID_SUCCESS:
        return { ...state, deletingCertificationByCandidateId: false };
      case types.DELETE_CERTIFICATION_BY_CANDIDATE_ID_FAILURE:
        return {
          ...state,
          deletingCertificationByCandidateId: false,
          deletingCertificationByCandidateIdError: true,
        };

        case types.GET_CANDIDATES_PAGINATION_REQUEST:
          return { ...state, fetchingCandidatesPagination: true };
        case types.GET_CANDIDATES_PAGINATION_SUCCESS:
          return {
            ...state,
            fetchingCandidatesPagination: false,
            candidateByUserId:action.payload,
          };
        case types.GET_CANDIDATES_PAGINATION_FAILURE:
          return {
            ...state,
            fetchingCandidatesPagination: false,
            fetchingCandidatesPaginationError: true,
          };


          case types.GET_CANDIDATES_WHITE_PAGINATION_REQUEST:
            return { ...state, fetchingCandidatesWhitePagination: true };
          case types.GET_CANDIDATES_WHITE_PAGINATION_SUCCESS:
            return {
              ...state,
              fetchingCandidatesWhitePagination: false,
              candidateByCategory:action.payload,
              // candidatePagination: [
              //   ...state.candidatePagination,
              //   ...action.payload],
            };
          case types.GET_CANDIDATES_WHITE_PAGINATION_FAILURE:
            return {
              ...state,
              fetchingCandidatesWhitePagination: false,
              fetchingCandidatesWhitePaginationError: true,
            };


            case types.GET_CANDIDATES_BLUE_PAGINATION_REQUEST:
              return { ...state, fetchingCandidatesBluePagination: true };
            case types.GET_CANDIDATES_BLUE_PAGINATION_SUCCESS:
              return {
                ...state,
                fetchingCandidatesBluePagination: false,
                candidateByCategory:action.payload,
                // candidatePagination: [
                //   ...state.candidatePagination,
                //   ...action.payload],
              };
            case types.GET_CANDIDATES_BLUE_PAGINATION_FAILURE:
              return {
                ...state,
                fetchingCandidatesBluePagination: false,
                fetchingCandidatesBluePaginationError: true,
              };


              case types.GET_CANDIDATE_TASKS_INFO_REQUEST:
                return { ...state, fetchingCandidateTasksInfoDetails: true };
              case types.GET_CANDIDATE_TASKS_INFO_SUCCESS:
                return {
                  ...state,
                  fetchingCandidateTasksInfoDetails: false,
                  candidateTasksInfoDetails: action.payload,
                };
              case types.GET_CANDIDATE_TASKS_INFO_FAILURE:
                return {
                  ...state,
                  fetchingCandidateTasksInfoDetails: false,
                  fetchingCandidateTasksInfoDetailsError: true,
                }; 



              case types.GET_CANDIDATES_DOLLAR_TABLE_REQUEST:
                return { ...state, fetchingCandidatesDollarTable: true };
              case types.GET_CANDIDATES_DOLLAR_TABLE_SUCCESS:
                return {
                  ...state,
                  fetchingCandidatesDollarTable: false,
                  // candidateByUserId: [
                  //   ...state.candidateByUserId,
                  //   ...action.payload],
                  // candidateDollarTable:action.payload
                  candidateDollarTable: [
                    ...state.candidateDollarTable,
                    ...action.payload]
                };
              case types.GET_CANDIDATES_DOLLAR_TABLE_FAILURE:
                return {
                  ...state,
                  fetchingCandidatesDollarTable: false,
                  fetchingCandidatesDollarTableError: true,
                };


                case types.ADD_PARSING_FORM_REQUEST:
                  return { ...state, addingParsingForm: true };
                case types.ADD_PARSING_FORM_SUCCESS:
                  return {
                    ...state,
                    addingParsingForm: false,
                  parsingForm: action.payload,
                  addCandidateModal:true,
                  addCandidateResumeModal:false,
                    // addOpportunityModal: false,
                    // clearbit: null,
                  };
                case types.ADD_PARSING_FORM_FAILURE:
                  return {
                    ...state,
                    addingParsingForm: false,
                    addingParsingFormError: true,
                    // addOpportunityModal: false,
                  };

                  case types.HANDLE_CLAER_REDUCER_DATA_CANDIDATE:
                    return { ...state, 
                      candidateByUserId: [], 
                      // deletedTruck: [] 
                    };
                    case types.HANDLE_EMAIL_DRAWER_MODAL:
                      return { ...state, addemaildrawermodal: action.payload };
                
                      case types.HANDLE_CLAER_REDUCER_DATA_CANDIDATE:
                        return { ...state, 
                          topicsByCandidateId: [], 
                        }; 

    default:
      return state;
  }
};
