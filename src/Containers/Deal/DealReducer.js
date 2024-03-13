import * as types from "./DealActionType";
import dayjs from "dayjs";

const initialState = {
  viewType: "table",

  fetchingInvestorDealsData: false,
  fetchingInvestorDealsDataError: false,
  investorDealsData:[],

  fetchingAllDelasRecords: false,
  fetchingAllDelasRecordsError: false,
  dealsAllRecord:{},

  fetchingDeal: false,
  fetchingDealError:false,
  dealsByuserId:[],

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord:[],

  fetchingDocumentsByDealId: false,
  fetchingDocumentsByDealIdError: false,
  documentsByInnOppId: [],

  fetchingDelasTeamRecords: false,
  fetchingDelasTeamRecordsError: false,
  dealsTeamRecord:{},

  addingDocumentByDealId: false,
  addingDocumentByDealIdError: false,

  documentUploadModal:false,

  updatingDealName: false,
  updatingDealNameError: false,

  updatingDealDragStage:false,

  fetchingLostRecords: false,
  fetchingLostRecordsError: false,
  lostDealData:{},

  fetchingNotesListByDealId: false,
  fetchingNotesListByDealIdError: false,
  notesListByDealId:[],

  fetchingLostDeals: false,
  fetchingLostDealsError: false,
  lostDeals:[],

  addDrawerDealsNotesModal:false,

  fetchingDealLinkedWorkflow: false,
  fetchingDealLinkedWorkflowError: false,
  dealLinkWorkflow:[],

  fetchingAllDealsData: false,
  fetchingAllDealsDataError: false,
  allDealsData:[],

  fetchingDealLinkedStages: false,
  fetchingDealLinkedStagesError: false,
  dealLinkStages:[],

  addingNotesByDealsId: false,
  addingNotesByDealsIdError: false,

  linkingDeal: false,
  linkingDealError: false,


  creatingDeal: false,
  creatingDealError: false,
  opencreateDealModal: false,

  fetchDealdetails: false,
  fetchDealdetailsError:false,
  dealDetailsbyID:{},

  removingDealDocument: false,
  removingDealDocumentError: false,

  fetchingDelasRecords: false,
  fetchingDelasRecordsError: false,
  dealsRecord:{},


  updateDealbyID: false,
  updateDealbyIDError: false,
  openupdateDealModal:false,

  fetchingAllDeals: false,
  fetchingAllDealsError:false,
  aLLdealsList:[],

  fetchingDealStages: false,
  fetchingStagesError:false,
  dealStages: [],

  openDealContactModal:false,

  fetchingDealContactList: false,
  fetchingDealContactListError:false,
  dealContactList:[],

  addingDealContact: false, 

  fetchingWonDeals: false,
  fetchingWonDealsError:false,
   wonDeals:[],

   sendingToWon: false,
sendingToWonError:false,

deleteDealData: false, deleteDealDataError: false

};

const updateDragdDeal = (item, newProps) => {
  return item.map((opp, index) => {
    console.log("Author7",opp);
    console.log("Author8",newProps);
    if (opp.invOpportunityId === newProps.invOpportunityId) {
      console.log("inside opp");
      opp.invOpportunityStagesId = newProps.invOpportunityStagesId;
    }
    return opp;
  });
};
export const dealReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DEAL_VIEW_TYPE:
      return { ...state, viewType: action.payload };

      case types.GET_DEAL_REQUEST:
        return { ...state, fetchingDeal: true };
      case types.GET_DEAL_SUCCESS:
        return {
          ...state,
          fetchingDeal: false,
          dealsByuserId: [...state.dealsByuserId,...action.payload],
        };
      case types.GET_DEAL_FAILURE:
        return {
          ...state,
          fetchingDeal: false,
          fetchingDealError: true,
        };

        case types.GET_INVESTOR_DEALS_DATA_REQUEST:

          return { ...state, fetchingInvestorDealsData: true };
        case types.GET_INVESTOR_DEALS_DATA_SUCCESS:
          return {
            ...state,
            fetchingInvestorDealsData: false,
            investorDealsData: action.payload,
          };
        case types.GET_INVESTOR_DEALS_DATA_FAILURE:
          return {
            ...state,
            fetchingInvestorDealsData: false,
            fetchingInvestorDealsDataError: true,
          };

        case types.CREATE_DEAL_REQUEST:
          return { ...state, creatingDeal: true };
        case types.CREATE_DEAL_SUCCESS:
          return {
            ...state,
            creatingDeal: false,
            opencreateDealModal: false,
           dealsByuserId :[action.payload,...state.dealsByuserId],
           allDealsData :[action.payload,...state.allDealsData],
          //  investorDealsData:[action.payload,...state.investorDealsData],
          };
        case types.CREATE_DEAL_FAILURE:
          return {
            ...state,
            creatingDeal: false,
            creatingDealError: true,
          };
          case types.HANDLE_DEAL_MODAL:
            return { ...state, opencreateDealModal: action.payload };

            case types.GET_DEAL_DETAILS_BY_ID_REQUEST:
              return { ...state, fetchDealdetails: true };
            case types.GET_DEAL_DETAILS_BY_ID_SUCCESS:
              return {
                ...state,
                fetchDealdetails: false,
                dealDetailsbyID: action.payload,
              };
            case types.GET_DEAL_DETAILS_BY_ID_FAILURE:
              return {
                ...state,
                fetchDealdetails: false,
                fetchDealdetailsError: true,
              };
      
              case types.UPDATE_DEAL_BY_ID_REQUEST:
                return { ...state, updateDealbyID: true };
              case types.UPDATE_DEAL_BY_ID_SUCCESS:
                return {
                  ...state,
                  updateDealbyID: false,
                  openupdateDealModal: false,
                  dealsByuserId: state.dealsByuserId.map((item) => {
                    if (item.invOpportunityId === action.payload.invOpportunityId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.UPDATE_DEAL_BY_ID_FAILURE:
                return {
                  ...state,
                  updateDealbyID: false,
                  updateDealbyIDError: true,
                };      
      
                case types.HANDLE_UPDATE_DEAL_MODAL:
                  return { ...state, openupdateDealModal: action.payload };
                  
                  case types.GET_ALL_DEALS_REQUEST:
                    return { ...state, fetchingAllDeals: true };
                  case types.GET_ALL_DEALS_SUCCESS:
                    return {
                      ...state,
                      fetchingAllDeals: false,
                      aLLdealsList: action.payload,
                    };
                  case types.GET_ALL_DEALS_FAILURE:
                    return {
                      ...state,
                      fetchingAllDeals: false,
                      fetchingAllDealsError: true,
                    };  

                    case types.EMPTY_DEALS_LIST:
                      return { ...state, dealsByuserId: [] }; 
      
                      case types.GET_ALL_DEAL_STAGES_REQUEST:
                        return { ...state, fetchingDealStages: true };
                      case types.GET_ALL_DEAL_STAGES_SUCCESS:
                        return {
                          ...state,
                          fetchingDealStages: false,
                          dealStages: action.payload,
                        };
                      case types.GET_ALL_DEAL_STAGES_FAILURE:
                        return {
                          ...state,
                          fetchingStages: false,
                          fetchingStagesError: true,
                        };        
                        case types.HANDLE_DEAL_CONTACT_MODAL:
                          return { ...state, openDealContactModal: action.payload };                      
                        
                          case types.GET_DEALS_CONTACT_LIST_REQUEST:
                            return { ...state, fetchingDealContactList: true };
                          case types.GET_DEALS_CONTACT_LIST_SUCCESS:
                            return {
                              ...state,
                              fetchingDealContactList: false,
                              dealContactList: action.payload,
                            };
                          case types.GET_DEALS_CONTACT_LIST_FAILURE:
                            return {
                              ...state,
                              fetchingDealContactList: false,
                              fetchingDealContactListError: true,
                            };
                    
                            case types.ADD_DEAL_CONTACT_REQUEST:
                              return { ...state, addingDealContact: true };
                            case types.ADD_DEAL_CONTACT_SUCCESS:
                              return { ...state, addingDealContact: false, 
                                openDealContactModal: false,
                                dealContactList:[action.payload,...state.dealContactList]
                               };
                            case types.ADD_DEAL_CONTACT_FAILURE:
                              return { ...state, addingDealContact: false, openDealContactModal: false };


                              case types.GET_DEAL_LINKED_STAGES_REQUEST:
                                return { ...state, fetchingDealLinkedStages: true };
                              case types.GET_DEAL_LINKED_STAGES_SUCCESS:
                                return {
                                  ...state,
                                  fetchingDealLinkedStages: false,
                                  dealLinkStages: action.payload,
                                };
                              case types.GET_DEAL_LINKED_STAGES_FAILURE:
                                return {
                                  ...state,
                                  fetchingDealLinkedStages: false,
                                  fetchingDealLinkedStagesError: true,
                                };

                                case types.GET_DEAL_LINKED_WORKFLOW_REQUEST:
                                  return { ...state, fetchingDealLinkedWorkflow: true };
                                case types.GET_DEAL_LINKED_WORKFLOW_SUCCESS:
                                  return {
                                    ...state,
                                    fetchingDealLinkedWorkflow: false,
                                    dealLinkWorkflow: action.payload,
                                  };
                                case types.GET_DEAL_LINKED_WORKFLOW_FAILURE:
                                  return {
                                    ...state,
                                    fetchingDealLinkedWorkflow: false,
                                    fetchingDealLinkedWorkflowError: true,
                                  };

           case types.GET_DEALS_RECORDS_REQUEST:
          return { ...state, fetchingDelasRecords: true };
        case types.GET_DEALS_RECORDS_SUCCESS:
          return {
            ...state,
            fetchingDelasRecords: false,
            dealsRecord: action.payload,
          };
        case types.GET_DEALS_RECORDS_FAILURE:
          return {
            ...state,
            fetchingDelasRecords: false,
            fetchingDelasRecordsError: true,
          };

          case types.GET_DEALS_TEAM_RECORDS_REQUEST:
            return { ...state, fetchingDelasTeamRecords: true };
          case types.GET_DEALS_TEAM_RECORDS_SUCCESS:
            return {
              ...state,
              fetchingDelasTeamRecords: false,
              dealsTeamRecord: action.payload,
            };
          case types.GET_DEALS_TEAM_RECORDS_FAILURE:
            return {
              ...state,
              fetchingDelasTeamRecords: false,
              fetchingDelasTeamRecordsError: true,
            };


          
          case types.GET_DEALS_ALL_RECORDS_REQUEST:
            return { ...state, fetchingAllDelasRecords: true };
          case types.GET_DEALS_ALL_RECORDS_SUCCESS:
            return {
              ...state,
              fetchingAllDelasRecords: false,
              dealsAllRecord: action.payload,
            };
          case types.GET_DEALS_ALL_RECORDS_FAILURE:
            return {
              ...state,
              fetchingAllDelasRecords: false,
              fetchingAllDelasRecordsError: true,
            };
          case types.HANDLE_DEALS_NOTES_DRAWER_MODAL:
            return { ...state, addDrawerDealsNotesModal: action.payload };


            case types.LINK_DEAL_REQUEST:
              return {
                ...state,
                linkingDeal: true,
              };
            case types.LINK_DEAL_SUCCESS:
              return {
                ...state,
                linkingDeal: false,
               // addTagProfileModal: false,
               dealsByuserId: state.dealsByuserId.map(
                  (recruit, i) => {
                    if (recruit.invOpportunityId === action.payload.invOpportunityId) {
                      return action.payload;
                    } else {
                      return recruit;
                    }
                  }
                ),
              };
              case types.LINK_DEAL_FAILURE:
             return {
               ...state,
               linkingDeal: false,
               linkingDealError: true,
             };

             case types.ADD_DEALS_NOTES_REQUEST:
              return {
                ...state,
                addingNotesByDealsId: true,          
              };
            case types.ADD_DEALS_NOTES_SUCCESS:
              return {
                ...state,
                addingNotesByDealsId: false,
                addingNotesByDealsId: false,
                // addDrawerDealsNotesModal:false,
              };
            case types.ADD_DEALS_NOTES_FAILURE:
              return {
                ...state,
                addingNotesByDealsId: false,
                addingNotesByDealsIdError: true,
              }; 


              case types.GET_NOTES_LIST_BY_DEAL_ID_REQUEST:
                return { ...state, fetchingNotesListByDealId: true };
              case types.GET_NOTES_LIST_BY_DEAL_ID_SUCCESS:
                return {
                  ...state,
                  fetchingNotesListByDealId: false,
                  notesListByDealId: action.payload,
                };
              case types.GET_NOTES_LIST_BY_DEAL_ID_FAILURE:
                return {
                  ...state,
                  fetchingNotesListByDealId: false,
                  fetchingNotesListByDealIdError: true,
                };

                case types.GET_WON_DEALS_REQUEST:
                  return { ...state, fetchingWonDeals: true };
                case types.GET_WON_DEALS_SUCCESS:
                  return {
                    ...state,
                    fetchingWonDeals: false,
                    wonDeals: [
                      ...state.wonDeals,
                      ...action.payload],
                  };
                case types.GET_WON_DEALS_FAILURE:
                  return {
                    ...state,
                    fetchingWonDeals: false,
                    fetchingWonDealsError: true,
                  };
                  case types.SEND_WON_TO_REQUEST:
                    return {
                      ...state,
                      sendingToWon: true,
                    };
                  case types.SEND_WON_TO_SUCCESS:
                    return {
                      ...state,
                      sendingToWon: false,
                      dealsByuserId: state.dealsByuserId.map((opp) =>
                      opp.invOpportunityId === action.payload.invOpportunityId
                        ? action.payload
                        : opp
                    ),
                    };
                  case types.SEND_WON_TO_FAILURE:
                    return {
                      ...state,
                      sendingToWon: false,
                      sendingToWonError: true,
                    };

                    case types.UPDATE_DEAL_NAME_REQUEST:
                      return { ...state, updatingDealName: true };
                    case types.UPDATE_DEAL_NAME_SUCCESS:
                      return {
                        ...state,
                        updatingDealName: false,
                        updateOpportunityModal: false,
                        dealDetailsbyID:action.payload,
                        // opportunity: state.opportunity.map((item) => {
                        //   if (item.opportunityId === action.payload.opportunityId) {
                        //     return action.payload;
                        //   } else {
                        //     return item;
                        //   }
                        // }),
                      };
                    case types.UPDATE_DEAL_NAME_FAILURE:
                      return {
                        ...state,
                        updatingDealName: false,
                        updatingDealNameError: true,
                      };


                      case types.GET_ALL_DEALS_DATA_REQUEST:

                        return { ...state, fetchingAllDealsData: true };
                      case types.GET_ALL_DEALS_DATA_SUCCESS:
                        return {
                          ...state,
                          fetchingAllDealsData: false,
                          allDealsData: action.payload,
                        };
                      case types.GET_ALL_DEALS_DATA_FAILURE:
                        return {
                          ...state,
                          fetchingAllDealsData: false,
                          fetchingAllDealsDataError: true,
                        };

                        case types.UPDATE_DEAL_DRAG_STAGE_REQUEST:
                          return {
                            ...state,
                            updatingDealDragStage: true,
                          
                            // candidateRequirement: action.payload,
                          };
                        case types.UPDATE_DEAL_DRAG_STAGE_SUCCESS:
                          return { ...state, 
                            updatingDealDragStage: false ,
                            dealsByuserId: updateDragdDeal(state.dealsByuserId, action.payload),
                           // candidateRequirement: [action.payload]

                          };
                        case types.UPDATE_DEAL_DRAG_STAGE_FAILURE:
                          return { ...state };  

                          case types.HANDLE_DOCUMENT_UPLOAD_MODAL:
      return { ...state, documentUploadModal: action.payload };

      
      
      case types.ADD_DEAL_DOCUMENT_REQUEST:
        return {
          ...state,
          addingDocumentByDealId: true,
          addingDocumentByDealIdError: false,
        };
      case types.ADD_DEAL_DOCUMENT_SUCCESS:
        return {
          ...state,
          addingDocumentByDealId: false,
          addingDocumentByDealIdError: false,
          documentUploadModal:false,
          documentsByInnOppId:[action.payload,...state.documentsByInnOppId],
        };
      case types.ADD_DEAL_DOCUMENT_FAILURE:
        return {
          ...state,
          addingDocumentByDealId: false,
          addingDocumentByDealIdError: true,
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

            case types.DELETE_DEAL_DATA_REQUEST:
              return { ...state, deleteDealData: true };
            case types.DELETE_DEAL_DATA_SUCCESS:
              return {
                ...state,
                deleteDealData: false,
                dealsByuserId: state.dealsByuserId.filter(
                  (item) => item.invOpportunityId !== action.payload
              ), 

              };
            case types.DELETE_DEAL_DATA_FAILURE:
              return { ...state, deleteDealData: false, deleteDealDataError: false };


              case types.REMOVE_DEAL_DOCUMENT_REQUEST:
                return { ...state, removingDealDocument: true };
              case types.REMOVE_DEAL_DOCUMENT_SUCCESS:
                return {
                  ...state,
                  removingDealDocument: false,
                  documentsByInnOppId: state.documentsByInnOppId.filter(
                    (item) => item.documentId !== action.payload
                ), 
                };
              case types.REMOVE_DEAL_DOCUMENT_FAILURE:
                return {
                  ...state,
                  removingDealDocument: false,
                  removingDealDocumentError: true,
                };


                case types.UPDATE_CONTACT_ROLE_BY_DEAL_ID_REQUEST:
                  return { ...state };
                case types.UPDATE_CONTACT_ROLE_BY_DEAL_ID_SUCCESS:
                  return {
                    ...state,
                    dealContactList: state.dealContactList.map(
                      (item) =>{
                      if (item.contactId === action.payload.contactId) {
                        return action.payload;
                      } else {
                        return item;
                      }
                    }),
                  };
                case types.UPDATE_CONTACT_ROLE_BY_DEAL_ID_FAILURE:
                  return { ...state };


                  case types.GET_LOST_DEALS_REQUEST:
                  return { ...state, fetchingLostDeals: true };
                case types.GET_LOST_DEALS_SUCCESS:
                  return {
                    ...state,
                    fetchingLostDeals: false,
                    lostDeals: [
                      ...state.lostDeals,
                      ...action.payload],
                  };
                case types.GET_LOST_DEALS_FAILURE:
                  return {
                    ...state,
                    fetchingLostDeals: false,
                    fetchingLostDealsError: true,
                  };

                  case types.GET_LOST_RECORDS_REQUEST:
                    return { ...state, fetchingLostRecords: true };
                  case types.GET_LOST_RECORDS_SUCCESS:
                    return {
                      ...state,
                      fetchingLostRecords: false,
                      lostDealData: action.payload,
                    };
                  case types.GET_LOST_RECORDS_FAILURE:
                    return {
                      ...state,
                      fetchingLostRecords: false,
                      fetchingLostRecordsError: true,
                    };

    default:
      return state;
  }
};
