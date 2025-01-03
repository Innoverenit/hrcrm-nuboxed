import * as types from "./InvestorActionTypes";
import dayjs from "dayjs";

const initialState = {
  viewType: "list",

  addInvestorActivityJumpstartModal:false,


  creatingDeal:false,
  creatingDealError:false,

  fetchingInvestors: false,
  fetchingInvestorsError: false,
  investorsbyId: [],

  addInvestorAddressModal:false,

  fetchingDeleteInvestors: false,
        fetchingDeleteInvestorsError: false,
        deleteInvestorList:[],

  fetchingDocumentList: false,
   fetchingDocumentListError: false,
   documentAllList:[],

   uploadingInvestorList: false,
   uploadingInvestorListError: false,

   uploadInvestorList:false,

  opencreateDealModal: false,

  fetchingInvestorActivityCount: false,
  fetchingInvestorActivityCountError: false,
  investorActivityCount:{},

  creatingInvestorDeal: false,
  creatingInvestorDealError: false,

  creatingUpdateInvestorShare: false,
  creatingUpdateInvestorShareError: false,

  creatingInvestorShare: false,
  creatingInvestorShareError: false,

  fetchingDialCode: false,
  fetchingDialCodeError: false,
  dialCodeList:[],

  fetchingWonINVWeightedValue: false,
  fetchingWonINVWeightedValueError: false,
  WonInvWeighted: {},
   

  addinginvestActivityTask: false,
  addinginvestActivityTaskError: false,

  addinginvestActivityCall: false,
  addinginvestActivityCallError: false,

  addinginvestActivityEvent:false,
  addinginvestActivityEventError:false,

  fetchingAllInvestors: false,
  fetchingAllInvestorsError: false,
  allInvestorsbyId: [],

  priceInvestorDrawer:false,

  fetchingInvestorRecords: false,
  fetchingInvestorRecordsError: false,
  investorRecord:[],

  fetchingInvestorOppValue: false,
  fetchingInvestorOppValueError: false,
  InvestOppValue: {},

  fetchingInvestorTeamRecords: false,
  fetchingInvestorTeamRecordsError: false,
  investorTeamRecord:{},

  fetchingInvestorSearchData: false,
  fetchingInvestorSearchDataError: false,
  investorSerachedData:[],

  fetchingInvestorsfilterdata: false,
  fetchingInvestorsfilterdataError: false,

  investorActivityModal:false,

  addDrawerInvestorContactModal:false,

  addDrawerInvestorPulseModal:false,

  addDrawerInvestorDocumentModal:false,

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord:[],

  deleteInvestorData: false, 
  deleteInvestorDataError: false ,

  updatingInvestorOwenership:false,
  updatingInvestorOwenershipError:false,

  fetchingWonInvPipelineValue: false,
  fetchingWonInvPipelineValueError: false,
  WonInvestorPipeline: {},

  fetchingWonInvestorOppValue: false,
  fetchingWonInvestorOppValueError: false,
  WonInvestOpp: {},

  fetchingInvPipelineValue: false,
  fetchingInvPipelineValueError: false,
  InvestorPipelineValue: {},

  fetchingInvContactValue: false,
  fetchingInvContactValueError: false,
  InvcontactValue: {},

  addingInvestor: false,
  addInvestorModal: false,
  updateInvestorModal: false,

  updateInvestorById: false,
  updateInvestorByIdError: false,

  fetchingInvestorDetailsById: false,
  fetchingInvestorDetailsByIdError: false,
  investorDetails: {},

  fetchingInvestorAllRecords: false,
  fetchingInvestorAllRecordsError: false,
  allinvestorRecord:{},

  fetchingInvestorActivityValue: false,
  fetchingInvestorActivityValueError: false,
  InvestActivityValue: {},

  fetchingINVWeightedValue: false,
  fetchingINVWeightedValueError: false,
  InvWeightedValue: {},

  fetchingInvestStatus: false,
  fetchingInvestStatusError: false,
  InvestorStatus:[],

  fetchingallEmployeeList: false,
  fetchingallEmployeeListError: false,
  allEmployeeList:[],

  fetchingsInvestorContact: false,
  fetchingsInvestorContactError: false,
  contactsbyInvestorId: [],

  fetchingTeamInvestor: false,
  fetchingTeamInvestorError: false,
  teamInvestor:[],



  fetchingInvenstoryShare: false,
        fetchingInvenstoryShareError: false,
        inventoryShare:[],

  fetchingInvestorDealsData: false,
  fetchingInvestorDealsDataError: false,
  investorDealsData:[],

  addDrawerInvestorNotesModal:false,

  fetchingDocumentsByInvestorId: false,
  fetchingDocumentsByInvestorIdError: false,
  documentsByInvestorId: [],

  fetchingNoteByInvestorId: false,
  fetchingNoteByInvestorIdError: false,
  investorNoteslist: [],
  addingNotesByInvestorId: false,
  addingNotesByInvestorIdError: false,

  fetchingInvoiceByInvestorId: false,
  fetchingInvoiceByInvestorIdError: false,
  invoiceOfInvestor: [],

  openInvestorContactModal:false,
  addingInvestorContact: false,
  addingInvestorContactError: false,

  opendocumentUploadModal:false,
  addingDocumentByInvestorId: false,
  addingDocumentByInvestorIdError: false,
  
  invstrContactUpdateModal:false,

  fetchingInvestorData: false,
  fetchingInvestorDataError:false,
  investorData:[],

};
export const investorReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_INVESTOR_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_INVESTORS_BY_ID_REQUEST:
      return { ...state, fetchingInvestors: true };
    case types.GET_INVESTORS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingInvestors: false,
        investorsbyId: [...state.investorsbyId, ...action.payload],
        // investorsbyId:action.payload,
        clearbit:null
      };
    case types.GET_INVESTORS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingInvestors: false,
        fetchingInvestorsError: true,
      };
      case types.GET_INVESTORS_DELETELIST_REQUEST:
      return { ...state, fetchingDeleteInvestors: true };
    case types.GET_INVESTORS_DELETELIST_SUCCESS:
      return {
        ...state,
        fetchingDeleteInvestors: false,
         deleteInvestorList:action.payload,
        
      };
    case types.GET_INVESTORS_DELETELIST_FAILURE:
      return {
        ...state,
        fetchingDeleteInvestors: false,
        fetchingDeleteInvestorsError: true,
      };

      case types.GET_ALL_INVESTORS_BY_ID_REQUEST:
        return { ...state, fetchingAllInvestors: true };
      case types.GET_ALL_INVESTORS_BY_ID_SUCCESS:
        return {
          ...state,
          fetchingAllInvestors: false,
          allInvestorsbyId: [
            ...state.allInvestorsbyId,
            ...action.payload],
          // allInvestorsbyId: [...state.investorsbyId, ...action.payload],
          clearbit:null
        };
      case types.GET_ALL_INVESTORS_BY_ID_FAILURE:
        return {
          ...state,
          fetchingAllInvestors: false,
          fetchingAllInvestorsError: true,
        };

      case types.GET_INVESTORS_FILTER_DATA_REQUEST:
        return { ...state, fetchingInvestorsfilterdata: true };
      case types.GET_INVESTORS_FILTER_DATA_SUCCESS:
        return {
          ...state,
          fetchingInvestorsfilterdata: false,
          investorsbyId: action.payload,
        };
      case types.GET_INVESTORS_FILTER_DATA_FAILURE:
        return {
          ...state,
          fetchingInvestorsfilterdata: false,
          fetchingInvestorsfilterdataError: true,
        };


    case types.EMPTY_INVESTOR_LIST:
      return { ...state, investorsbyId: [] };

    case types.ADD_INVESTOR_REQUEST:
      return { ...state, addingInvestor: true };
    case types.ADD_INVESTOR_SUCCESS:
      return {
        ...state,
        addingInvestor: false,
        addInvestorModal: false,
        investorsbyId: [action.payload, ...state.investorsbyId],
        allInvestorsbyId: [action.payload, ...state.allInvestorsbyId],
        clearbit: null
      };
    case types.ADD_INVESTOR_FAILURE:
      return { ...state, addingInvestor: false, addInvestorModal: false };

    case types.UPDATE_INVESTOR_BY_ID_REQUEST:
      return { ...state, addInvestorModal: action.payload };
    case types.HANDLE_INVESTOR_UPDATE_MODAL:
      return { ...state, updateInvestorModal: action.payload };

      case types.HANDLE_INVESTOR_MODAL:
      return { ...state, addInvestorModal: action.payload };

      case types.HANDLE_INVESTOR_ADDRESS_MODAL:
        return { ...state, addInvestorAddressModal: action.payload };

    case types.UPDATE_INVESTOR_BY_ID_REQUEST:
      return { ...state, updateInvestorById: true };
    case types.UPDATE_INVESTOR_BY_ID_SUCCESS:
      return {
        ...state,
        updateInvestorById: false,
        updateInvestorModal: false,
        investorsbyId: state.investorsbyId.map((item) => {
          if (item.investorId === action.payload.investorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
        teamInvestor: state.teamInvestor.map((item) => {
          if (item.investorId === action.payload.investorId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_INVESTOR_BY_ID_FAILURE:
      return {
        ...state,
        updateInvestorById: false,
        updateInvestorByIdError: true,
      };
    case types.GET_INVESTOR_DETAILS_BY_ID_REQUEST:
      return { ...state, fetchingInvestorDetailsById: true };
    case types.GET_INVESTOR_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingInvestorDetailsById: false,
        investorDetails: action.payload,
      };
    case types.GET_INVESTOR_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingInvestorDetailsById: false,
        fetchingInvestorDetailsByIdError: true,
      };

    case types.GET_INVESTOR_CONTACT_REQUEST:
      return { ...state, fetchingsInvestorContact: true };
    case types.GET_INVESTOR_CONTACT_SUCCESS:
      return {
        ...state,
        fetchingsInvestorContact: false,
        contactsbyInvestorId: action.payload,
      };
    case types.GET_INVESTOR_CONTACT_FAILURE:
      return {
        ...state,
        fetchingsInvestorContact: false,
        fetchingsInvestorContactError: true,
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

    case types.GET_NOTES_LIST_BY_INVESTOR_ID_REQUEST:
      return {
        ...state,
        fetchingNoteByInvestorId: true,
        fetchingNoteByInvestorIdError: false,
      };
    case types.GET_NOTES_LIST_BY_INVESTOR_ID_SUCCESS:
      return {
        ...state,
        fetchingNoteByInvestorId: false,
        fetchingNoteByInvestorIdError: false,
        investorNoteslist: action.payload,
      };
    case types.GET_NOTES_LIST_BY_INVESTOR_ID_FAILURE:
      return {
        ...state,
        fetchingNoteByInvestorId: false,
        fetchingNoteByInvestorIdError: true,
      };

      case types.ADD_INVESTOR_NOTES_REQUEST:
        return {
          ...state,
          addingNotesByInvestorId: true,
        };
      case types.ADD_INVESTOR_NOTES_SUCCESS:
        return {
          ...state,
          addingNotesByInvestorId: false,
          // addInvestorSpeechModal: false,
        };
      case types.ADD_INVESTOR_NOTES_FAILURE:
        return {
          ...state,
          addingNotesByInvestorId: false,
          addingNotesByInvestorIdError: true,
        };

        case types.GET_INVESTOR_INVOICE_REQUEST:
          return {
            ...state,
            fetchingInvoiceByInvestorId: true,
            fetchingInvoiceByInvestorIdError: false,
          };
        case types.GET_INVESTOR_INVOICE_SUCCESS:
          return {
            ...state,
            fetchingInvoiceByInvestorId: false,
            fetchingInvoiceByInvestorIdError: false,
            invoiceOfInvestor: action.payload,
          };
        case types.GET_INVESTOR_INVOICE_FAILURE:
          return {
            ...state,
            fetchingInvoiceByInvestorId: false,
            fetchingInvoiceByInvestorIdError: true,
          };
    
          case types.HANDLE_INVESTOR_CONTACT_MODAL:
            return { ...state, openInvestorContactModal: action.payload };

            case types.ADD_INVESTOR_CONTACT_REQUEST:
              return { ...state, addingInvestorContact: true };
            case types.ADD_INVESTOR_CONTACT_SUCCESS:
              return {
                ...state,
                addingInvestorContact: false,
                openInvestorContactModal: false,
                contactsbyInvestorId:[action.payload,...state.contactsbyInvestorId]
              };
            case types.ADD_INVESTOR_CONTACT_FAILURE:
              return {
                ...state,
                addingInvestorContactError: false,
                openInvestorContactModal: false,
              };        

              case types.HANDLE_INVESTOR_DOCUMENT_UPLOAD_MODAL:
                return { ...state, opendocumentUploadModal: action.payload };             
              
     case types.CREATE_INVESTOR_DOCUMENT_REQUEST:
                  return {
                    ...state,
                    addingDocumentByInvestorId: true,
                    addingDocumentByInvestorIdError: false,
                  };
                case types.CREATE_INVESTOR_DOCUMENT_SUCCESS:
                  return {
                    ...state,
                    addingDocumentByInvestorId: false,
                    addingDocumentByInvestorIdError: false,
                    opendocumentUploadModal:false,
                  };
                case types.CREATE_INVESTOR_DOCUMENT_FAILURE:
                  return {
                    ...state,
                    addingDocumentByInvestorId: false,
                    addingDocumentByInvestorIdError: true,
                  }; 
    
                  case types.HANDLE_UPDATE_INVESTOR_CONTACT_MODAL:
                    return { ...state, invstrContactUpdateModal: action.payload };             
              
                    case types.UPDATE_INVESTOR_CONTACT_BY_ID_REQUEST:
                      return { ...state, updateInvestorContactById: true };
                    case types.UPDATE_INVESTOR_CONTACT_BY_ID_SUCCESS:
                      return {
                        ...state,
                        updateInvestorContactById: false,
                        invstrContactUpdateModal: false,
                        contactsbyInvestorId: state.contactsbyInvestorId.map((item) => {
                          if (item.contactId === action.payload.contactId) {
                            return action.payload;
                          } else {
                            return item;
                          }
                        }),
                      };
                      case types.UPDATE_INVESTOR_CONTACT_BY_ID_FAILURE:
                        return {
                          ...state,
                          updateInvestorContactById: false,
                          updateInvestorContactByIdError: true,
                        };  




                        case types.UPDATE_INVESTOR_OWNERSHIP_REQUEST:
                          return { ...state, updatingInvestorOwenership: true };
                        case types.UPDATE_INVESTOR_OWNERSHIP_SUCCESS:
                          return {
                            ...state,
                            updatingInvestorOwenership: false,
                            // updateCandidateEmploymentModal: false,
                            // employmentDetails: state.employmentDetails.map((employment, i) => {
                            //   if (employment.id === action.payload.id) {
                            //     return action.payload;
                            //   } else {
                            //     return employment;
                            //   }investorsbyId
                            // }),

                            allInvestorsbyId:state.allInvestorsbyId.filter(
                              (item)=>{
                                console.log("abc",item,action.payload);
                    
                              return !action.payload.includes(item.investorId)  
                              }
                            ),
                            investorsbyId:state.investorsbyId.filter(
                              (item)=>{
                                console.log("abc",item,action.payload);
                    
                              return !action.payload.includes(item.investorId)  
                              }
                            ),
                            teamInvestor:state.teamInvestor.filter(
                              (item)=>{
                                console.log("abc",item,action.payload);
                    
                              return !action.payload.includes(item.investorId)  
                              }
                            ),
                          };
                        case types.UPDATE_INVESTOR_OWNERSHIP_FAILURE:
                          return {
                            ...state,
                            updatingInvestorOwenership: false,
                            updatingInvestorOwenershipError: true,
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

                          case types.GET_INVESTOR_RECORDS_REQUEST:
                            return { ...state, fetchingInvestorRecords: true };
                          case types.GET_INVESTOR_RECORDS_SUCCESS:
                            return {
                              ...state,
                              fetchingInvestorRecords: false,
                              investorRecord: action.payload,
                            };
                          case types.GET_INVESTOR_RECORDS_FAILURE:
                            return {
                              ...state,
                              fetchingInvestorRecords: false,
                              fetchingInvestorRecordsError: true,
                            };

                            case types.GET_INVESTOR_ALL_RECORDS_REQUEST:
                            return { ...state, fetchingInvestorAllRecords: true };
                          case types.GET_INVESTOR_ALL_RECORDS_SUCCESS:
                            return {
                              ...state,
                              fetchingInvestorAllRecords: false,
                              allinvestorRecord: action.payload,
                            };
                          case types.GET_INVESTOR_ALL_RECORDS_FAILURE:
                            return {
                              ...state,
                              fetchingInvestorAllRecords: false,
                              fetchingInvestorAllRecordsError: true,
                            };

                            
                          case types.GET_INVESTOR_TEAM_RECORDS_REQUEST:
                            return { ...state, fetchingInvestorTeamRecords: true };
                          case types.GET_INVESTOR_TEAM_RECORDS_SUCCESS:
                            return {
                              ...state,
                              fetchingInvestorTeamRecords: false,
                              investorTeamRecord: action.payload,
                            };
                          case types.GET_INVESTOR_TEAM_RECORDS_FAILURE:
                            return {
                              ...state,
                              fetchingInvestorTeamRecords: false,
                              fetchingInvestorTeamRecordsError: true,
                            };

                            case types.GET_INVESTOR_SEARCH_REQUEST:
                              return { ...state, fetchingInvestorSearchData: true };
                            case types.GET_INVESTOR_SEARCH_SUCCESS:
                              return {
                                ...state,
                                fetchingInvestorSearchData: false,
                               // investorsbyId: action.payload,
                                 investorSerachedData: action.payload,
                              };
                            case types.GET_INVESTOR_SEARCH_FAILURE:
                              return { ...state, fetchingInvestorSearchDataError: true };
                        
                              case types.HANDLE_INVESTOR_NOTES_DRAWER_MODAL:
                                return { ...state, addDrawerInvestorNotesModal: action.payload };                 


                                case types.GET_ALL_EMPLOYEE_LIST_REQUEST:
                                  return { ...state, fetchingallEmployeeList: true };
                                case types.GET_ALL_EMPLOYEE_LIST_SUCCESS:
                                  return {
                                    ...state,
                                    fetchingallEmployeeList: false,
                                    allEmployeeList: action.payload,
                                  };
                                case types.GET_ALL_EMPLOYEE_LIST_FAILURE:
                                  return {
                                    ...state,
                                    fetchingallEmployeeList: false,
                                    fetchingallEmployeeListError: true,
                                  };

                                  case types.HANDLE_ACTIVITY_MODAL:
        return { ...state, investorActivityModal: action.payload };
        case types.GET_INVEST_TIMELINE_REQUEST:
          return { ...state, fetchingInvestStatus: true };
      case types.GET_INVEST_TIMELINE_SUCCESS:
          return {
              ...state,
              fetchingInvestStatus: false,
              InvestorStatus: action.payload,
          };
      case types.GET_INVEST_TIMELINE_FAILURE:
          return {
              ...state,
              fetchingInvestStatus: false,
              fetchingInvestStatusError: true,
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

           
            


            case types.ADD_INVEST_ACTIVITY_CALL_REQUEST:
              return { ...state, addinginvestActivityCall: true };
            case types.ADD_INVEST_ACTIVITY_CALL_SUCCESS:
              return { ...state, addinginvestActivityCall: false,
                investorActivityModal: false,
                InvestorStatus:[action.payload,...state.InvestorStatus]
               };
            case types.ADD_INVEST_ACTIVITY_CALL_FAILURE:
              return {
                ...state,
                addinginvestActivityCall: false,
                investorActivityModal: false,
              };

              case types.ADD_INVEST_ACTIVITY_EVENT_REQUEST:
                return { ...state, addinginvestActivityEvent: true };
              case types.ADD_INVEST_ACTIVITY_EVENT_SUCCESS:
                return { ...state, addinginvestActivityEvent: false,
                  investorActivityModal: false,
                  InvestorStatus:[action.payload,...state.InvestorStatus]
                 };
              case types.ADD_INVEST_ACTIVITY_EVENT_FAILURE:
                return {
                  ...state,
                  addinginvestActivityEvent: false,
                  investorActivityModal: false,
                };  
  
                case types.ADD_INVEST_ACTIVITY_TASK_REQUEST:
                  return { ...state, addinginvestActivityTask: true };
                case types.ADD_INVEST_ACTIVITY_TASK_SUCCESS:
                  return { ...state, addinginvestActivityTask: false,
                    investorActivityModal: false,
                    InvestorStatus:[action.payload,...state.InvestorStatus]
                   };
                case types.ADD_INVEST_ACTIVITY_TASK_FAILURE:
                  return {
                    ...state,
                    addinginvestActivityTask: false,
                    investorActivityModal: false,
                  }; 
                  
                  
                  case types.GET_TEAM_INVESTOR_REQUEST:
                    return { ...state, fetchingTeamInvestor: true };
                  case types.GET_TEAM_INVESTOR_SUCCESS:
                    return {
                      ...state,
                      fetchingTeamInvestor: false,
                      teamInvestor: [
                        ...state.teamInvestor,
                        ...action.payload],
                  // teamInvestor:action.payload,
                    };
                  case types.GET_TEAM_INVESTOR_FAILURE:
                    return {
                      ...state,
                      fetchingTeamInvestor: false,
                      fetchingTeamInvestorError: true,
                    };

                    case types.HANDLE_CLAER_REDUCER_DATA_INVESTOR:
                      return { ...state, 
                        investorSerachedData: [], 
                        // deletedTruck: [] 
                      };


                      case types.HANDLE_INVESTOR_CONT_MODAL:
                        return { ...state, addDrawerInvestorContactModal: action.payload }; 


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


                        case types.GET_DIAL_CODE_REQUEST:

                          return { ...state, fetchingDialCode: true };
                        case types.GET_DIAL_CODE_SUCCESS:
                          return {
                            ...state,
                            fetchingDialCode: false,
                            dialCodeList: action.payload,
                          };
                        case types.GET_DIAL_CODE_FAILURE:
                          return {
                            ...state,
                            fetchingDialCode: false,
                            fetchingDialCodeError: true,
                          };

                          case types.HANDLE_INVESTOR_PULSE_DRAWER_MODAL:
                            return { ...state, addDrawerInvestorPulseModal: action.payload }; 

                            case types.HANDLE_INVESTOR_DOCUMENT_DRAWER_MODAL:
                              return { ...state, addDrawerInvestorDocumentModal: action.payload }; 


                            case types.GET_INVESTOR_OPP_VALUE_REQUEST:
                              return { ...state, fetchingInvestorOppValue: true, fetchingInvestorOppValueError: false };
                            case types.GET_INVESTOR_OPP_VALUE_SUCCESS:
                              return {
                                ...state,
                                fetchingInvestorOppValue: false,
                                fetchingInvestorOppValueError: false,
                                InvestOppValue: action.payload,
                              };
                            case types.GET_INVESTOR_OPP_VALUE_FAILURE:
                              return { ...state, fetchingInvestorOppValue: false, fetchingInvestorOppValueError: true };

                              case types.GET_WON_INVESTOR_OPP_VALUE_REQUEST:
                                return { ...state, fetchingWonInvestorOppValue: true, fetchingWonInvestorOppValueError: false };
                              case types.GET_WON_INVESTOR_OPP_VALUE_SUCCESS:
                                return {
                                  ...state,
                                  fetchingWonInvestorOppValue: false,
                                  fetchingWonInvestorOppValueError: false,
                                  WonInvestOpp: action.payload,
                                };
                              case types.GET_WON_INVESTOR_OPP_VALUE_FAILURE:
                                return { ...state, fetchingWonInvestorOppValue: false, fetchingWonInvestorOppValueError: true };
  


                              case types.GET_INVESTOR_PIPELINE_VALUE_REQUEST:
                                return { ...state, fetchingInvPipelineValue: true, fetchingInvPipelineValueError: false };
                              case types.GET_INVESTOR_PIPELINE_VALUE_SUCCESS:
                                return {
                                  ...state,
                                  fetchingInvPipelineValue: false,
                                  fetchingInvPipelineValueError: false,
                                  InvestorPipelineValue: action.payload,
                                };
                              case types.GET_INVESTOR_PIPELINE_VALUE_FAILURE:
                                return { ...state, fetchingInvPipelineValue: false, fetchingInvPipelineValueError: true };


                                case types.GET_WON_INVESTOR_PIPELINE_VALUE_REQUEST:
                                  return { ...state, fetchingWonInvPipelineValue: true, fetchingWonInvPipelineValueError: false };
                                case types.GET_WON_INVESTOR_PIPELINE_VALUE_SUCCESS:
                                  return {
                                    ...state,
                                    fetchingWonInvPipelineValue: false,
                                    fetchingWonInvPipelineValueError: false,
                                    WonInvestorPipeline: action.payload,
                                  };
                                case types.GET_WON_INVESTOR_PIPELINE_VALUE_FAILURE:
                                  return { ...state, fetchingWonInvPipelineValue: false, fetchingWonInvPipelineValueError: true };
  


                                case types.GET_INVESTOR_WEIGHTED_VALUE_REQUEST:
                                  return { ...state, fetchingINVWeightedValue: true, fetchingINVWeightedValueError: false };
                                case types.GET_INVESTOR_WEIGHTED_VALUE_SUCCESS:
                                  return {
                                    ...state,
                                    fetchingINVWeightedValue: false,
                                    fetchingINVWeightedValueError: false,
                                    InvWeightedValue: action.payload,
                                  };
                                case types.GET_INVESTOR_WEIGHTED_VALUE_FAILURE:
                                  return { ...state, fetchingINVWeightedValue: false, fetchingINVWeightedValueError: true };

                                  case types.GET_WON_INVESTOR_WEIGHTED_VALUE_REQUEST:
                                    return { ...state, fetchingWonINVWeightedValue: true, fetchingWonINVWeightedValueError: false };
                                  case types.GET_WON_INVESTOR_WEIGHTED_VALUE_SUCCESS:
                                    return {
                                      ...state,
                                      fetchingWonINVWeightedValue: false,
                                      fetchingWonINVWeightedValueError: false,
                                      WonInvWeighted: action.payload,
                                    };
                                  case types.GET_WON_INVESTOR_WEIGHTED_VALUE_FAILURE:
                                    return { ...state, fetchingWonINVWeightedValue: false, fetchingWonINVWeightedValueError: true };
  
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

                                  case types.GET_INVESTOR_CONTACT_VALUE_REQUEST:
                                    return { ...state, fetchingInvContactValue: true, fetchingInvContactValueError: false };
                                  case types.GET_INVESTOR_CONTACT_VALUE_SUCCESS:
                                    return {
                                      ...state,
                                      fetchingInvContactValue: false,
                                      fetchingInvContactValueError: false,
                                      InvcontactValue: action.payload,
                                    };
                                  case types.GET_INVESTOR_CONTACT_VALUE_FAILURE:
                                    return { ...state, fetchingInvContactValue: false, fetchingInvContactValueError: true };


                                    case types.GET_INVESTOR_ACTIVITY_RECORDS_REQUEST:
                                      return { ...state, fetchingInvestorActivityCount: true };
                                    case types.GET_INVESTOR_ACTIVITY_RECORDS_SUCCESS:
                                      return {
                                        ...state,
                                        fetchingInvestorActivityCount: false,
                                        investorActivityCount: action.payload,
                                      };
                                    case types.GET_INVESTOR_ACTIVITY_RECORDS_FAILURE:
                                      return {
                                        ...state,
                                        fetchingInvestorActivityCount: false,
                                        fetchingInvestorActivityCountError: true,
                                      };


                                      

                                      case types.CREATE_INVESTOR_DEAL_REQUEST:
                                        return { ...state, creatingInvestorDeal: true };
                                      case types.CREATE_INVESTOR_DEAL_SUCCESS:
                                        return {
                                          ...state,
                                          // creatingDeal: false,
                                          opencreateDealModal: false,
                                         investorDealsData:[action.payload,...state.investorDealsData],
                                        };
                                      case types.CREATE_INVESTOR_DEAL_FAILURE:
                                        return {
                                          ...state,
                                          creatingInvestorDeal: false,
                                          creatingInvestorDealError: true,
                                        };

                                        case types.HANDLE_DEAL_MODAL:
                                          return { ...state, opencreateDealModal: action.payload };


                                          case types.GET_INVESTOR_ACTIVITY_VALUE_REQUEST:
                                            return { ...state, fetchingInvestorActivityValue: true, fetchingInvestorOppValueError: false };
                                          case types.GET_INVESTOR_ACTIVITY_VALUE_SUCCESS:
                                            return {
                                              ...state,
                                              fetchingInvestorActivityValue: false,
                                              fetchingInvestorActivityValueError: false,
                                              InvestActivityValue: action.payload,
                                            };
                                          case types.GET_INVESTOR_ACTIVITY_VALUE_FAILURE:
                                            return { ...state, fetchingInvestorActivityValue: false, fetchingInvestorActivityValueError: true };


                                            case types.HANDLE_INVESTOR_ACTIVITY_JUMPSTART_MODAL:
                                              return { ...state, addInvestorActivityJumpstartModal: action.payload };
                              
              
                                              case types.DELETE_INVESTOR_DATA_REQUEST:
                                                return { ...state, deleteInvestorData: true };
                                              case types.DELETE_INVESTOR_DATA_SUCCESS:
                                                return {
                                                  ...state,
                                                  deleteInvestorData: false,
                                                  investorsbyId: state.investorsbyId.filter(
                                                    (item) => item.investorId !== action.payload
                                                ), 
                                                teamInvestor: state.teamInvestor.filter(
                                                  (item) => item.investorId !== action.payload
                                              ), 
                                              allInvestorsbyId: state.allInvestorsbyId.filter(
                                                (item) => item.investorId !== action.payload
                                            ), 
                                                };
                                              case types.DELETE_INVESTOR_DATA_FAILURE:
                                                return { ...state, deleteInvestorData: false, deleteInvestorDataError: false };
                                                   
                                                case types.HANDLE_INVESTORPRICE_DRAWER:
                                                  return { ...state, priceInvestorDrawer: action.payload };   

                                                  case types.INVESTOR_SHARE_REQUEST:
                                                    return { ...state, creatingInvestorShare: true };
                                                  case types.INVESTOR_SHARE_SUCCESS:
                                                    return {
                                                      ...state,
                                                      creatingInvestorShare: false,
                                                      inventoryShare: [action.payload, ...state.inventoryShare]
                                                    };
                                                  case types.INVESTOR_SHARE_FAILURE:
                                                    return {
                                                      ...state,
                                                      creatingInvestorShare: false,
                                                      creatingInvestorShareError: true,
                                                    };

                                                    case types.INVESTOR_SHARE_UPDATE_REQUEST:
                                                    return { ...state, creatingUpdateInvestorShare: true };
                                                  case types.INVESTOR_SHARE_UPDATE_SUCCESS:
                                                    return {
                                                      ...state,
                                                      creatingUpdateInvestorShare: false,
                                                      inventoryShare: state.inventoryShare.map((item) => {
                                                        if (item.investorsShareId === action.payload.investorsShareId) {
                                                          return action.payload;
                                                        } else {
                                                          return item;
                                                        }
                                                      }),
                                                      // inventoryShare: [action.payload, ...state.inventoryShare]
                                                    };
                                                  case types.INVESTOR_SHARE_UPDATE_FAILURE:
                                                    return {
                                                      ...state,
                                                      creatingUpdateInvestorShare: false,
                                                      creatingUpdateInvestorShareError: true,
                                                    };

        case types.GET_INVESTOR_SHARE_REQUEST:
      return {
        ...state,
        fetchingInvenstoryShare: true,
      };
    case types.GET_INVESTOR_SHARE_SUCCESS:
      return {
        ...state,
        fetchingInvenstoryShare: false,
        inventoryShare: action.payload,
      };
    case types.GET_INVESTOR_SHARE_FAILURE:
      return {
        ...state,
        fetchingInvenstoryShare: false,
        fetchingInvenstoryShareError: true,
      };

      case types.GET_DOCUMENT_ALLLIST_REQUEST:
        return {
          ...state,
          fetchingDocumentList: true,
        };
      case types.GET_DOCUMENT_ALLLIST_SUCCESS:
        return {
          ...state,
          fetchingDocumentList: false,
          documentAllList: action.payload,
        };
      case types.GET_DOCUMENT_ALLLIST_FAILURE:
        return {
          ...state,
          fetchingDocumentList: false,
          fetchingDocumentListError: true,
        };

        case types.LINK_INVESTOR_TOGGLE_REQUEST:
          return { ...state, addingInvestorToggle: true };
        case types.LINK_INVESTOR_TOGGLE_SUCCESS:
          return {
            ...state,
            addingInvestorToggle: false,
            documentAllList: state.documentAllList.map((item) => {
              if (item.documentTypeId === action.payload.documentTypeId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
        case types.LINK_INVESTOR_TOGGLE_FAILURE:
          return {
            ...state,
            addingInvestorToggle: false,
            addingInvestorToggleError: true,
          };


          case types.HANDLE_UPLOAD_INVESTOR_MODAL:
            return { ...state, uploadInvestorList: action.payload };    

            case types.UPLOAD_INVESTOR_LIST_REQUEST:
              return { ...state, uploadingInvestorList: true };
            case types.UPLOAD_INVESTOR_LIST_SUCCESS:
              return {
                ...state,
                uploadingInvestorList: false,
                uploadInvestorList: false
              };
            case types.UPLOAD_INVESTOR_LIST_FAILURE:
              return {
                ...state,
                uploadingInvestorList: false,
                uploadingInvestorListError: true,
              };

              case types.REINSTATE_TOGGLE_FOR_INVESTOR_REQUEST:
                return { ...state, reInstatedInvestor: true };
            case types.REINSTATE_TOGGLE_FOR_INVESTOR_SUCCESS:
                return {
                    ...state,
                    reInstatedInvestor: false,
                    deleteInvestorList: state.deleteInvestorList.filter(
                        (item) => item.investorId !== action.payload
                      ),
                 
                };
            case types.REINSTATE_TOGGLE_FOR_INVESTOR_FAILURE:
                return {
                    ...state,
                    reInstatedInvestor: false,
                    reInstatedInvestorError: true,
                };

default:
      return state;
  }
};
