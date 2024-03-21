import * as types from "./LeadsActionTypes";
import dayjs from "dayjs"; 
const initialState = {
  viewType: "card",

  addLeadsModal:false,

  addingLeadsActivityCall: false,
  addingLeadsActivityCallError: false,

  addCallTaskModal:false,

  fetchingTeamLeads: false,
            fetchingTeamLeadsError: false,
            teamLeads:[],

  fetchingCallTimelineStatus: false,
  fetchingCallTimelineStatusError: false,
  callTimeline:[],

  updateLeadsContactById: false,
  updateLeadsContactByIdError: false,
  documentsByLeadsId: [],

  addDrawerLeadsNotesModal:false,

  linkingLeads: false,
  linkingLeadsError: false,


  fetchingDocumentsByLeadsId: false,
  fetchingDocumentsByLeadsIdError: false,

  updateLeadsById: false,
  updateLeadsByIdError: false,

  addUpdateLeadsContactModal:false,
  setEditingLeadsContact:{},

  addingLeads:false,
  addingLeadsError:false,

  fetchingLeadsTeamRecords: false,
  fetchingLeadsTeamRecordsError: false,
  leadsTeamCountData:{},

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord:[],

  fetchingLeads: false,
  fetchingLeadsError: false,
  leadsAllData:[],

  fetchingCrm: false,
  fetchingCrmError: false,
  crmAllData:[],

  fetchingLeadsActivityCount: false,
  fetchingLeadsActivityCountError: false,
  leadsActivityCount:{},


  addLeadsOpportunityModal:false,

  clearbit: {},

  addingNotesByLeadsId: false,
  addingNotesByLeadsIdError: false,


  fetchingLeadsInputSearchData: false,
  fetchingLeadsInputSearchDataError: false,
  inputData: [],

  fetchingCallList: true,
  fetchingCallListError: true,
  callList:[],

  addingDocumentByLeadsId: false,
  addingDocumentByLeadsIdError: false,

  addLeadsSpeechModal:false,

  addLeadsConfirmationModal:false,

  updateLeadsInitiativeModal:false,

  addingLeadsOpportunity: false,
  addingLeadsOpportunityError: false,

  updateLeadsInitiatives: false,
  updateLeadsInitiativesError: false,

  addDrawerLeadsEmailModal:false,

  addingLeadsActivityTask: false,
  addingLeadsActivityTaskError: false,

  addingLeadsContact: false,
  addingLeadsContactError: false,
  addLeadsContactModal: false,

  fetchingLeadsContact: false,
  fetchingLeadsContactError: false,
  contactByLeadsId: [],

  addingLeadsActivityEvent: false,
  addingLeadsActivityEventError: false,


  deleteLeadsDocument: false,
  deleteLeadsDocumentError: false,


  fetchingLeadDetailsById: false,
  fetchingLeadDetailsByIdError: false,
  lead: {},

  setEditingLeadsOpportunity:{},

  linkingCustomerStatus: false,
  linkingCustomerStatusError: false,

  deletingLeadsData: false,
  deletingLeadsDataError: false,


  

  fetchingLeadsOpportunity: false,
  fetchingLeadsOpportunityError: false,
  opportunityByLeadsId: [],

  setEditingLeads:{},

  setEditingLeadsInitiative:{},

  leadsDocumentUploadModal:false,

  updatingLeadsOpportunity: false,
  updatingLeadsOpportunityError: false,
  leadsOpportunityByUserId: [],
  addUpdateLeadsOpportunityModal:false,

  updateLeadsModal:false,

  addingInitiativeByLeadsId: false,
  addingInitiativeByLeadsIdError: false,


  fetchingInitiativeByLeadsId: false,
  fetchingInitiativeByLeadsIdError: false,
  initiativesByLeadsId: [],


  fetchingLeadsSkill: false,
  fetchingLeadsSkillError: false,
  leadsSkill:[],


  fetchingNotesListByLeadsId: false,
  fetchingNotesListByLeadsIdError: false,
  notesListByLeadsId: [],

  addingLeadsSkill: false,
  addingLeadsSkillError: false,

  fetchingLeadsPermissionsList: false,
  fetchingLeadsPermissionsListError: false,
  leadspermissionsDataList:[],

  addSharingLeads: false,
  addSharingLeadsError: false,

  updateTypeLeads: false,
  updateTypeLeadsError:false,

  fetchingJunkedLeads: false,
  fetchingJunkedLeadsError: false,
  junkedLeadsData:[],
  fetchingLeadsRecords: false,
  fetchingLeadsRecordsError: false,
  leadsCountData:[],
  fetchingJunkedLeadsRecords: false,
  fetchingJunkedLeadsRecordsError: false,
  leadsCountJunked:[],

  openCETmodal:false,

  
  fetchingAllLeads:false,
  fetchingAllLeadsError:false,
  allleadsInfo:[],
};
export const leadsReducer = (state = initialState, action) => {
    switch (action.type) {

  case types.SET_LEADS_VIEW_TYPE:
return { ...state, viewType: action.payload };

case types.HANDLE_LEADS_MODAL:
      return { ...state, addLeadsModal: action.payload };

      case types.HANDLE_LEADS_CONFIRMATION_MODAL:
      return { ...state, addLeadsConfirmationModal: action.payload };

     

      case types.ADD_LEADS_REQUEST:
        return { ...state, addingLeads: true };
      case types.ADD_LEADS_SUCCESS:
        return { ...state, 
          addingLeads: false, 
          addLeadsModal: false ,
          leadsAllData:[action.payload,...state.leadsAllData],
          allleadsInfo:[action.payload,...state.allleadsInfo]
        };
      case types.ADD_LEADS_FAILURE:
        return { ...state, addingLeads: false, addLeadsModal: false };    
 

        case types.GET_LEADS_REQUEST:
          return { ...state, fetchingLeads: true };
        case types.GET_LEADS_SUCCESS:
          return {
            ...state,
            fetchingLeads: false,
            leadsAllData: [...state.leadsAllData, ...action.payload],
            clearbit:null
          };
        case types.GET_LEADS_FAILURE:
          return {
            ...state,
            fetchingLeads: false,
            fetchingLeadsError: true,
          };

          case types.GET_CRM_REQUEST:
            return { ...state, fetchingCrm: true };
          case types.GET_CRM_SUCCESS:
            return {
              ...state,
              fetchingCrm: false,
              crmAllData: action.payload,           
            };
          case types.GET_CRM_FAILURE:
            return {
              ...state,
              fetchingCrm: false,
              fetchingCrmError: true,
            };

          case types.SET_CLEARBIT_DATA:
      return { ...state, clearbit: action.payload };

      case types.CONVERT_CUSTOMER_STATUS_REQUEST:
        return { ...state, linkingCustomerStatus: true };
      case types.CONVERT_CUSTOMER_STATUS_SUCCESS:
        return {
          ...state,
          linkingCustomerStatus: false,
          addLeadsConfirmationModal:false,
          leadsAllData: state.leadsAllData.filter(
            (item) => item.leadsId !== action.payload
          ),
        };
      case types.CONVERT_CUSTOMER_STATUS_FAILURE:
        return {
          ...state,
          linkingCustomerStatus: false,
          linkingCustomerStatusError: true,
        };


        
        case types.DELETE_LEADS_DATA_REQUEST:
          return { ...state, deletingLeadsData: true };
        case types.DELETE_LEADS_DATA_SUCCESS:
          return {
            ...state,
            deletingLeadsData: false,
            leadsAllData: state.leadsAllData.filter(
              (item) => item.leadsId !== action.payload
            ),
          };
        case types.DELETE_LEADS_DATA_FAILURE:
          return { ...state, deletingLeadsData: false, deletingLeadsDataError: false };


             //Customer Details
    case types.GET_LEAD_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingLeadDetailsById: true };
    case types.GET_LEAD_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingLeadDetailsById: false,
        lead: action.payload,
      };
    case types.GET_LEAD_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingLeadDetailsById: false,
        fetchingLeadDetailsByIdError: true,
      };

      case types.SET_LEADS_EDIT:
      return { ...state, setEditingLeads: action.payload };


      case types.HANDLE_UPDATE_LEADS_MODAL:
      return { ...state, updateLeadsModal: action.payload };

      case types.UPDATE_LEADS_BY_ID_REQUEST:
        return { ...state, updateLeadsById: true };
      case types.UPDATE_LEADS_BY_ID_SUCCESS:
        return {
          ...state,
          updateLeadsById: false,
          updateLeadsModal: false,
          leadsAllData: state.leadsAllData.map((item) => {
            if (item.leadsId === action.payload.leadsId) {
              return action.payload;
            } else {
              return item;
            }
          }),
        };
      case types.UPDATE_LEADS_BY_ID_FAILURE:
        return {
          ...state,
          updateLeadsById: false,
          updateLeadsByIdError: true,
        };

        case types.HANDLE_LEADS_EMAIL_DRAWER_MODAL:
                    return { ...state, addDrawerLeadsEmailModal: action.payload };

                    case types.HANDLE_LEADS_CONTACT_MODAL:
      return { ...state, addLeadsContactModal: action.payload };

      case types.ADD_LEADS_CONTACT_REQUEST:
        return { ...state, addingLeadsContact: true };
      case types.ADD_LEADS_CONTACT_SUCCESS:
        return {
          ...state,
          addingLeadsContact: false,
          addLeadsContactModal: false,
          contactByLeadsId:[action.payload,...state.contactByLeadsId]
        };
      case types.ADD_LEADS_CONTACT_FAILURE:
        return {
          ...state,
          addingLeadsContactError: false,
          addLeadsContactModal: false,
        };

        case types.GET_LEADS_CONTACT_REQUEST:
          return { ...state, fetchingLeadsContact: true };
        case types.GET_LEADS_CONTACT_SUCCESS:
          return {
            ...state,
            fetchingLeadsContact: false,
            contactByLeadsId: action.payload,
          };
        case types.GET_LEADS_CONTACT_FAILURE:
          return {
            ...state,
            fetchingLeadsContact: false,
            fetchingLeadsContactError: true,
          };

          case types.HANDLE_UPDATE_LEADS_CONTACT_MODAL:
      return { ...state, addUpdateLeadsContactModal: action.payload };

      case types.SET_EDIT_LEADS_CONTACT:
        return { ...state, setEditingLeadsContact: action.payload };


        case types.UPDATE_LEADS_CONTACT_BY_ID_REQUEST:
          return { ...state, updateLeadsContactById: true };
        case types.UPDATE_LEADS_CONTACT_BY_ID_SUCCESS:
          return {
            ...state,
            updateLeadsContactById: false,
            addUpdateLeadsContactModal: false,
            contactByLeadsId: state.contactByLeadsId.map((item) => {
              if (item.contactId === action.payload.contactId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
        case types.UPDATE_LEADS_CONTACT_BY_ID_FAILURE:
          return {
            ...state,
            updateLeadsContactById: false,
            updateLeadsContactByIdError: true,
          };


          case types.HANDLE_LEADS_OPPORTUNITY_MODAL:
      return { ...state, addLeadsOpportunityModal: action.payload };


      case types.ADD_LEADS_OPPORTUNITY_REQUEST:
        return { ...state, addingLeadsOpportunity: true };
      case types.ADD_LEADS_OPPORTUNITY_SUCCESS:
        return {
          ...state,
          addingLeadsOpportunity: false,
          addLeadsOpportunityModal: false,
          // clearbit: null,
        };
      case types.ADD_LEADS_OPPORTUNITY_FAILURE:
        return {
          ...state,
          addingLeadsOpportunity: false,
          addingLeadsOpportunityError: true,
          addLeadsOpportunityModal: false,
        };

        case types.GET_LEADS_OPPORTUNITY_REQUEST:
          return { ...state, fetchingLeadsOpportunity: true };
        case types.GET_LEADS_OPPORTUNITY_SUCCESS:
          return {
            ...state,
            fetchingLeadsOpportunity: false,
            opportunityByLeadsId: action.payload,
          };
        case types.GET_LEADS_OPPORTUNITY_FAILURE:
          return {
            ...state,
            fetchingLeadsOpportunity: false,
            fetchingLeadsOpportunityError: true,
          };

          case types.HANDLE_UPDATE_LEADS_OPPORTUNITY_MODAL:
      return { ...state, addUpdateLeadsOpportunityModal: action.payload };

      case types.SET_EDIT_LEADS_OPPORTUNITY:
      return { ...state, setEditingLeadsOpportunity: action.payload };


      case types.HANDLE_LEADS_DOCUMENT_UPLOAD_MODAL:
        return { ...state, leadsDocumentUploadModal: action.payload };

        case types.HANDLE_LEADS_REACT_SPEECH_MODAL:
          return { ...state, addLeadsSpeechModal: action.payload };

          case types.ADD_LEADS_DOCUMENT_REQUEST:
            return {
              ...state,
              addingDocumentByLeadsId: true,
              addingDocumentByLeadsIdError: false,
            };
          case types.ADD_LEADS_DOCUMENT_SUCCESS:
            return {
              ...state,
              addingDocumentByLeadsId: false,
              addingDocumentByLeadsIdError: false,
            };
          case types.ADD_LEADS_DOCUMENT_FAILURE:
            return {
              ...state,
              addingDocumentByLeadsId: false,
              addingDocumentByLeadsIdError: true,
            };


            case types.GET_LEADS_DOCUMENTS_REQUEST:
              return {
                ...state,
                fetchingDocumentsByLeadsId: true,
                fetchingDocumentsByLeadsIdError: false,
              };
            case types.GET_LEADS_DOCUMENTS_SUCCESS:
              return {
                ...state,
                fetchingDocumentsByLeadsId: false,
                fetchingDocumentsByLeadsIdError: false,
                documentsByLeadsId: action.payload,
              };
            case types.GET_LEADS_DOCUMENTS_FAILURE:
              return {
                ...state,
                fetchingDocumentsByLeadsId: false,
                fetchingDocumentsByLeadsIdError: true,
              };


              case types.ADD_INITIATIVE_BY_LEADS_ID_REQUEST:
                return { ...state, addingInitiativeByLeadsId: true };
              case types.ADD_INITIATIVE_BY_LEADS_ID_SUCCESS:
                // console.clear()
                // console.log(action.payload)
                return {
                  ...state,
                  addingInitiativeByLeadsId: false,
                 // topicsByCustomerId: [...state.topicsByCustomerId, action.payload],
                };
              case types.ADD_INITIATIVE_BY_LEADS_ID_FAILURE:
                return {
                  ...state,
                  addingInitiativeByLeadsId: false,
                  addingInitiativeByLeadsIdError: true,
                };

                case types.GET_INITIATIVE_BY_LEADS_ID_REQUEST:
                  return { ...state, fetchingInitiativeByLeadsId: true };
                case types.GET_INITIATIVE_BY_LEADS_ID_SUCCESS:
                  return {
                    ...state,
                    fetchingInitiativeByLeadsId: false,
                    initiativesByLeadsId: action.payload,
                  };
                case types.GET_INITIATIVE_BY_LEADS_ID_FAILURE:
                  return {
                    ...state,
                    fetchingInitiativeByLeadsId: false,
                    fetchingInitiativeByLeadsIdError: true,
                  };


                  case types.DELETE_LEADS_DOCUMENT_REQUEST:
      return { ...state, deleteLeadsDocument: true };
    case types.DELETE_LEADS_DOCUMENT_SUCCESS:
      return {
        ...state,
        deleteLeadsTask: false,
        documentsByLeadsId: state.documentsByLeadsId.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_LEADS_DOCUMENT_FAILURE:
      return { ...state, deleteLeadsDocument: false, deleteLeadsDocumentError: false };
     
      
      case types.ADD_LEADS_NOTES_REQUEST:
      return {
        ...state,
        addingNotesByLeadsId: true,
      };
    case types.ADD_LEADS_NOTES_SUCCESS:
      return {
        ...state,
        addingNotesByLeadsId: false,
        addingNotesByLeadsId: false,
        addLeadsSpeechModal: false,
      };
    case types.ADD_LEADS_NOTES_FAILURE:
      return {
        ...state,
        addingNotesByLeadsId: false,
        addingNotesByLeadsIdError: true,
      };


      case types.GET_NOTES_LIST_BY_LEADS_ID_REQUEST:
      return { ...state, fetchingNotesListByLeadsId: true };
    case types.GET_NOTES_LIST_BY_LEADS_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByLeadsId: false,
        notesListByLeadsId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_LEADS_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByLeadsId: false,
        fetchingNotesListByLeadsIdError: true,
      };

      case types.HANDLE_UPDATE_LEADS_INITIATIVE_MODAL:
      return { ...state, updateLeadsInitiativeModal: action.payload };

      case types.SET_EDIT_LEADS_INITIATIVE:
        return { ...state, setEditingLeadsInitiative: action.payload };

        case types.UPDATE_LEADS_OPPORTUNITY_REQUEST:
          return { ...state, updatingLeadsOpportunity: true };
        case types.UPDATE_LEADS_OPPORTUNITY_SUCCESS:
          return {
            ...state,
            updatingLeadsOpportunity: false,
            // addCustomerOpportunityModal: false,
            addUpdateLeadsOpportunityModal: false,
            opportunityByLeadsId: state.opportunityByLeadsId.map((item) => {
              if (item.leadsId === action.payload.leadsId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
    
        case types.UPDATE_LEADS_OPPORTUNITY_FAILURE:
          return {
            ...state,
            updatingLeadsOpportunity: true,
            updatingLeadsOpportunityError: false,
            // addCustomerOpportunityModal: false,
          };

          case types.UPDATE_LEADS_INITIATIVE_REQUEST:
            return { ...state, updateLeadsInitiatives: true };
          case types.UPDATE_LEADS_INITIATIVE_SUCCESS:
            return {
              ...state,
              updateLeadsInitiatives: false,
              updateLeadsInitiativeModal: false,
              initiativesByLeadsId: state.initiativesByLeadsId.map((item) => {
                if (item.initiativeDetailsId === action.payload.initiativeDetailsId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.UPDATE_LEADS_INITIATIVE_FAILURE:
            return {
              ...state,
              updateLeadsInitiatives: false,
              updateLeadsInitiativesError: true,
            };


            case types.ADD_LEADS_SKILL_REQUEST:
              return { ...state, addingLeadsSkill: true };
            case types.ADD_LEADS_SKILL_SUCCESS:
              return {
                ...state,
                addingLeadsSkill: false,
               
              };
            case types.ADD_LEADS_SKILL_FAILURE:
              return {
                ...state,
                addingLeadsSkill: false,
                addingLeadsSkillError: true,
              };


              case types.GET_LEADS_SKILL_REQUEST:
                return { ...state, fetchingLeadsSkill: true };
              case types.GET_LEADS_SKILL_SUCCESS:
                return {
                  ...state,
                  fetchingLeadsSkill: false,
                  leadsSkill: action.payload,
                };
              case types.GET_LEADS_SKILL_FAILURE:
                return {
                  ...state,
                  fetchingLeadsSkill: false,
                  fetchingLeadsSkillError: true,
                };


                case types.DELETE_LEADS_SKILL_REQUEST:
                  return { ...state, deletingLeadsSkill: true };
                case types.DELETE_LEADS_SKILL_SUCCESS:
                  return { ...state, deletingLeadsSkill: false };
                case types.DELETE_LEADS_SKILL_FAILURE:
                  return {
                    ...state,
                    deletingLeadsSkill: false,
                    deletingLeadsSkillError: true,
                  };


                  case types.INPUT_LEADS_SEARCH_DATA_REQUEST:
      return { ...state, fetchingLeadsInputSearchData: true };
    case types.INPUT_LEADS_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingLeadsInputSearchData: false,
        leadsAllData: action.payload,
        // serachedData: action.payload,
      };
    case types.INPUT_LEADS_SEARCH_DATA_FAILURE:
      return { ...state, fetchingLeadsInputSearchDataError: true };

      case types.GET_LEADS_PERMISSIONS_LIST_REQUEST:
        return { ...state, fetchingLeadsPermissionsList: true };
      case types.GET_LEADS_PERMISSIONS_LIST_SUCCESS:
        return {
          ...state,
          fetchingLeadsPermissionsList: false,
          leadspermissionsDataList: action.payload,
        };
      case types.GET_LEADS_PERMISSIONS_LIST_FAILURE:
        return {
          ...state,
          fetchingLeadsPermissionsList: false,
          fetchingLeadsPermissionsListError: true,
        };

        case types.ADD_SHARE_LEADS_PERMISSION_REQUEST:
          return { ...state, addSharingLeads: true };
    
        case types.ADD_SHARE_LEADS_PERMISSION_SUCCESS:
          return { ...state, addSharingLeads: false, leadsAllData: action.payload };
    
        case types.ADD_SHARE_LEADS_PERMISSION_FAILURE:
          return {
            ...state,
            addSharingLeads: false,
            addSharingLeadsError: true,
          };
          case types.UPDATE_TYPE_FOR_LEAD_REQUEST:
            return { ...state,updateTypeLeads: true };
          case types.UPDATE_TYPE_FOR_LEAD_SUCCESS:
            return {
              ...state,
              updateTypeLeads: false,
                 leadsAllData: state.leadsAllData.map((item) => {
                if (item.leadsId === action.payload.leadsId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.UPDATE_TYPE_FOR_LEAD_FAILURE:
            return { ...state, updateTypeLeads: false,updateTypeLeadsError:true, };

            case types.GET_JUNKED_LEADS_REQUEST:
              return { ...state, fetchingJunkedLeads: true };
            case types.GET_JUNKED_LEADS_SUCCESS:
              return {
                ...state,
                fetchingJunkedLeads: false,
                junkedLeadsData: action.payload,
              };
            case types.GET_JUNKED_LEADS_FAILURE:
              return {
                ...state,
                fetchingJunkedLeads: false,
                fetchingJunkedLeadsError: true,
              }; 

              case types.GET_LEADS_RECORDS_REQUEST:
                return { ...state, fetchingLeadsRecords: true };
              case types.GET_LEADS_RECORDS_SUCCESS:
                return {
                  ...state,
                  fetchingLeadsRecords: false,
                  leadsCountData: action.payload,
                };
              case types.GET_LEADS_RECORDS_FAILURE:
                return {
                  ...state,
                  fetchingLeadsRecords: false,
                  fetchingLeadsRecordsError: true,
                };

                case types.GET_LEADS_TEAM_RECORDS_REQUEST:
                  return { ...state, fetchingLeadsTeamRecords: true };
                case types.GET_LEADS_TEAM_RECORDS_SUCCESS:
                  return {
                    ...state,
                    fetchingLeadsTeamRecords: false,
                    leadsTeamCountData: action.payload,
                  };
                case types.GET_LEADS_TEAM_RECORDS_FAILURE:
                  return {
                    ...state,
                    fetchingLeadsTeamRecords: false,
                    fetchingLeadsTeamRecordsError: true,
                  };

                case types.GET_JUNKED_LEADS_RECORDS_REQUEST:
                return { ...state, fetchingJunkedLeadsRecords: true };
              case types.GET_JUNKED_LEADS_RECORDS_SUCCESS:
                return {
                  ...state,
                  fetchingJunkedLeadsRecords: false,
                  leadsCountJunked: action.payload,
                };
              case types.GET_JUNKED_LEADS_RECORDS_FAILURE:
                return {
                  ...state,
                  fetchingJunkedLeadsRecords: false,
                  fetchingJunkedLeadsRecordsError: true,
                };

                case types.REINSTATE_JUNKED_LEADS_REQUEST:
                  return { ...state, reInstateJunkedLeads: true };
                case types.REINSTATE_JUNKED_LEADS_SUCCESS:
                  return {
                    ...state,
                    reInstateJunkedLeads: false,
                    junkedLeadsData:action.payload,
                    // junkedLeadsData: state.junkedLeadsData.map((item) => {
                    //   if (item.leadsId === action.payload.leadsId) {
                    //     return action.payload;
                    //   } else {
                    //     return item;
                    //   }
                    // }),
                  };
                case types.REINSTATE_JUNKED_LEADS_FAILURE:
                  return {
                    ...state,
                    reInstateJunkedLeads: false,
                    reInstateJunkedLeadsError: true,
                  }; 
                         
                  case types.HANDLE_CET_MODAL:
                    return { ...state, openCETmodal: action.payload };

                    case types.GET_CALL_LIST_BY_REQUEST:
                      return { ...state, fetchingCallList: true };
                    case types.GET_CALL_LIST_BY_SUCCESS:
                      return {
                        ...state,
                        fetchingCallList: false,
                         callList: action.payload,
                      };
                    case types.GET_CALL_LIST_BY_FAILURE:
                      return {
                        ...state,
                        fetchingCallList: false,
                        fetchingCallListError: true,
                      };

                      case types.HANDLE_LEADS_CALL_MODAL:
                        return { ...state, addCallTaskModal: action.payload };

                        case types.GET_CALL_TIMELINE_REQUEST:
                          return { ...state, fetchingCallTimelineStatus: true };
                      case types.GET_CALL_TIMELINE_SUCCESS:
                          return {
                              ...state,
                              fetchingCallTimelineStatus: false,
                              callTimeline: action.payload,
                          };
                      case types.GET_CALL_TIMELINE_FAILURE:
                          return {
                              ...state,
                              fetchingCallTimelineStatus: false,
                              fetchingCallTimelineStatusError: true,
                          };

                          case types.HANDLE_LEADS_NOTES_DRAWER_MODAL:
    return { ...state, addDrawerLeadsNotesModal: action.payload };

    case types.GET_ALL_LEADS_REQUEST:
      return { ...state, fetchingAllLeads: true };
    case types.GET_ALL_LEADS_SUCCESS:
      return {
        ...state,
        fetchingAllLeads: false,
       allleadsInfo: [...state.allleadsInfo, ...action.payload],
        clearbit:null
      };
    case types.GET_ALL_LEADS_FAILURE:
      return {
        ...state,
        fetchingAllLeads: false,
        fetchingAllLeadsError: true,
      };

      case types.CONVERT_LEADS_REQUEST:
        return { ...state, linkingLeads: true };
      case types.CONVERT_LEADS_SUCCESS:
        return {
          ...state,
          linkingLeads: false,
          addLeadsConfirmationModal:false,
        };
      case types.CONVERT_LEADS_FAILURE:
        return {
          ...state,
          linkingLeads: false,
          linkingLeadsError: true,
        };

        case types.GET_TEAM_LEADS_REQUEST:
          return { ...state, fetchingTeamLeads: true };
        case types.GET_TEAM_LEADS_SUCCESS:
          return {
            ...state,
            fetchingTeamLeads: false,
        teamLeads:action.payload,
          };
        case types.GET_TEAM_LEADS_FAILURE:
          return {
            ...state,
            fetchingTeamLeads: false,
            fetchingTeamLeadsError: true,
          };


          case types.ADD_LEADS_ACTIVITY_EVENT_REQUEST:
            return { ...state, addingLeadsActivityEvent: true };
          case types.ADD_LEADS_ACTIVITY_EVENT_SUCCESS:
            return { ...state, addingLeadsActivityEvent: false,
              addCallTaskModal: false,
              // callTimeline:[action.payload,...state.callTimeline]
             };
          case types.ADD_LEADS_ACTIVITY_EVENT_FAILURE:
            return {
              ...state,
              addingLeadsActivityEvent: false,
              addCallTaskModal: false,
            }; 

            case types.ADD_LEADS_ACTIVITY_TASK_REQUEST:
              return { ...state, addingLeadsActivityTask: true };
            case types.ADD_LEADS_ACTIVITY_TASK_SUCCESS:
              return { ...state, addingLeadsActivityTask: false,
                addCallTaskModal: false,
                // callTimeline:[action.payload,...state.callTimeline]
               };
            case types.ADD_LEADS_ACTIVITY_TASK_FAILURE:
              return {
                ...state,
                addingLeadsActivityTask: false,
                addCallTaskModal: false,
              };  
              
              
              case types.ADD_LEADS_ACTIVITY_CALL_REQUEST:
                return { ...state, addingLeadsActivityCall: true };
              case types.ADD_LEADS_ACTIVITY_CALL_SUCCESS:
                return { ...state, addingLeadsActivityCall: false,
                  addCallTaskModal: false,
                  //  callTimeline:[action.payload,...state.callTimeline]
                 };
              case types.ADD_LEADS_ACTIVITY_CALL_FAILURE:
                return {
                  ...state,
                  addingLeadsActivityCall: false,
                  addCallTaskModal: false,
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

                  case types.HANDLE_CLAER_REDUCER_DATA_LEAD:
                    return { ...state, 
                      leadsAllData: [], 
                      // deletedTruck: [] 
                    };

                    case types.EMPTY_LEADS_LIST:
                      return { ...state, leadsAllData: [] }; 

                      case types.GET_LEADS_ACTIVITY_RECORDS_REQUEST:
                        return { ...state, fetchingLeadsActivityCount: true };
                      case types.GET_LEADS_ACTIVITY_RECORDS_SUCCESS:
                        return {
                          ...state,
                          fetchingLeadsActivityCount: false,
                          leadsActivityCount: action.payload,
                        };
                      case types.GET_LEADS_ACTIVITY_RECORDS_FAILURE:
                        return {
                          ...state,
                          fetchingLeadsActivityCount: false,
                          fetchingLeadsActivityCountError: true,
                        };

default:
return state;
}
};