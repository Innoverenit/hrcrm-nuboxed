
import * as types from "./PitchActionTypes";
import dayjs from "dayjs"; 

const initialState = {
  viewType: "card",
    fetchingPitch:false,
    fetchingPitchError:false,
    pitchData:[],

    fetchingPitchHot: false,
    fetchingPitchHotError: false,
    pitchDataHot:[],

    fetchingPitchWarm: false,
    fetchingPitchWarmError: false,
    pitchDataWarm:[],

    fetchingPitchCold: false,
    fetchingPitchColdError: false,
    pitchDataCold:[],


    fetchingOpportunityRecord: false,
    fetchingOpportunityRecordError: false,
    opportunityRecord:[],

    fetchingAllPitchRecords: false,
    fetchingAllPitchRecordsError: false,
    pitchAllRecord:{},

    fetchingTeamsPitchCount: false,
    fetchingTeamsPitchCountError: false,
    teamsPitchCount:{},

    fetchingAllPitch: false,
      fetchingAllPitchError: false,
      allPitchData:[],

      clearbit: {},

      addingPitchActivityEvent: false,
      addingPitchActivityEventError: false,

    fetchingNotesListByPitchId: false,
          fetchingNotesListByPitchIdError: false,
          notesListByPitchId:[],

          addPitchConvertModal:false,

    addingDocumentByPitchId:false,
    addingDocumentByPitchIdError:false,

    addingPitchActivityTask: false,
    addingPitchActivityTaskError: false,

    linkingPitchStatus:false,
    linkingPitchStatusError:false,

    fetchingPitchRecords: false,
    fetchingPitchRecordsError: false,
    pitchRecord:[],

    fetchingPitchCount: false,
    fetchingPitchCountError: false,
    pitchCount:{},

    fetchingTeamPitch: false,
    fetchingTeamPitchError: false,
    teamPitch:[],

    fetchingPitchStatus: false,
    fetchingPitchStatusError: false,
    pitchStatus:[],

    addingPitchActivityCall: false,
    addingPitchActivityCallError: false,


    addPitchactivityModal:false,


    updateTypePitch:false,
    updateTypePitchError:false,

    addDrawerPitchNotesModal:false,


    fetchingDocumentsByPitchId:false,
    fetchingDocumentsByPitchIdError:false,
    documentsByPitchId:[],

    fetchingPitchActivityCount: false,
    fetchingPitchActivityCountError: false,
    pitchActivityCount:{},


    updatePitchById:false,
    updatePitchByIdError:false,

    fetchingPitchSearchData:false,
    fetchingPitchSearchDataError:false,

    addingNotesByPitchId: false,
    addingNotesByPitchIdError: false,


    fetchingPitchOpportunity:false,
    fetchingPitchOpportunityError:false,
    opportunityByPitchId:[],


    addingPitchOpportunity:false,
    addingPitchOpportunityError:false,

    addPitchOpportunityModal:false,

    addPitchModal:false,
    updatePitchModal:false,
    fetchingPitchDetailsById:false,
    fetchingPitchDetailsByIdError:false,
    pitch:{},

    addingPitch:false,
    addingPitchError:false,

    deletingPitchData:false,
  deletingPitchDataError:false,

  openASSImodal:false,

  pitchDocumentUploadModal:false,

  setEditingPitch:{},
  };




export const pitchReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.HANDLE_PITCH_MODAL:
            return { ...state, addPitchModal: action.payload };



            case types.HANDLE_PITCH_DOCUMENT_UPLOAD_MODAL:
              return { ...state, pitchDocumentUploadModal: action.payload };


case types.GET_PITCH_REQUEST:

    return { ...state, fetchingPitch: true };
  case types.GET_PITCH_SUCCESS:
    return {
      ...state,
      fetchingPitch: false,
      pitchData: [...state.pitchData, ...action.payload],
      clearbit:null
    };
  case types.GET_PITCH_FAILURE:
    return {
      ...state,
      fetchingPitch: false,
      fetchingPitchError: true,
    };

    case types.GET_PITCHHOT_REQUEST:

    return { ...state, fetchingPitchHot: true };
  case types.GET_PITCHHOT_SUCCESS:
    return {
      ...state,
      fetchingPitchHot: false,
      pitchDataHot: action.payload,
      clearbit:null
    };
  case types.GET_PITCHHOT_FAILURE:
    return {
      ...state,
      fetchingPitchHot: false,
      fetchingPitchHotError: true,
    };


    case types.GET_PITCHWARM_REQUEST:

    return { ...state, fetchingPitchWarm: true };
  case types.GET_PITCHWARM_SUCCESS:
    return {
      ...state,
      fetchingPitchWarm: false,
      pitchDataWarm: action.payload,
      clearbit:null
    };
  case types.GET_PITCHWARM_FAILURE:
    return {
      ...state,
      fetchingPitchWarm: false,
      fetchingPitchWarmError: true,
    };

    case types.GET_PITCHCOLD_REQUEST:

    return { ...state, fetchingPitchCold: true };
  case types.GET_PITCHCOLD_SUCCESS:
    return {
      ...state,
      fetchingPitchCold: false,
      pitchDataCold: action.payload,
      clearbit:null
    };
  case types.GET_PITCHCOLD_FAILURE:
    return {
      ...state,
      fetchingPitchCold: false,
      fetchingPitchColdError: true,
    };



    case types.HANDLE_UPDATE_PITCH_MODAL:
        return { ...state, updatePitchModal: action.payload };



    case types.ADD_PITCH_REQUEST:
        return { ...state, addingPitch: true };
      case types.ADD_PITCH_SUCCESS:
        return { ...state, 
            addingPitch: false, 
            addPitchModal: false ,
            pitchData:[action.payload,...state.pitchData],
            allPitchData:[action.payload,...state.allPitchData],
            pitchDataHot: action.payload.type === 'hot' ? 
          [action.payload, ...state.pitchDataHot] : state.pitchDataHot,
          pitchDataWarm: action.payload.type === 'warm' ? 
          [action.payload, ...state.pitchDataWarm] : state.pitchDataWarm,
          pitchDataCold: action.payload.type === 'cold' ? 
          [action.payload, ...state.pitchDataCold] : state.pitchDataCold,
        };
      case types.ADD_PITCH_FAILURE:
        return { ...state, addingPitch: false,  };  




        case types.ADD_PITCH_DOCUMENT_REQUEST:
            return {
              ...state,
              addingDocumentByPitchId: true,
              addingDocumentByPitchIdError: false,
            };
          case types.ADD_PITCH_DOCUMENT_SUCCESS:
            return {
              ...state,
              addingDocumentByPitchId: false,
              addingDocumentByPitchIdError: false,
            };
          case types.ADD_PITCH_DOCUMENT_FAILURE:
            return {
              ...state,
              addingDocumentByPitchId: false,
              addingDocumentByPitchIdError: true,
            };
        
        

        case types.SET_PITCH_EDIT:
            return { ...state, setEditingPitch: action.payload };

            case types.HANDLE_PITCH_OPPORTUNITY_MODAL:
              return { ...state, addPitchOpportunityModal: action.payload };


            case types.UPDATE_PITCH_BY_ID_REQUEST:
                return { ...state, updatePitchById: true };
              case types.UPDATE_PITCH_BY_ID_SUCCESS:
                return {
                  ...state,
                  updatePitchById: false,
                   updatePitchModal: false,
                   pitchData: state.pitchData.map((item) => {
                    if (item.investorLeadsId === action.payload.investorLeadsId) {
                      return action.payload;
                    } else {
                      return item;
                    }
                  }),
                };
              case types.UPDATE_PITCH_BY_ID_FAILURE:
                return {
                  ...state,
                  updatePitchById: false,
                  updatePitchByIdError: true,
                };



                case types.CONVERT_PITCH_STATUS_REQUEST:
                  return { ...state, linkingPitchStatus: true };
                case types.CONVERT_PITCH_STATUS_SUCCESS:
                  return {
                    ...state,
                    linkingPitchStatus: false,
                    addPitchConvertModal:false,
                    pitchData: state.pitchData.filter(
                      (item) => item.investorLeadsId !== action.payload
                    ),
                   
                  };
                case types.CONVERT_PITCH_STATUS_FAILURE:
                  return {
                    ...state,
                    linkingPitchStatus: false,
                    linkingPitchStatusError: true,
                  };




                case types.GET_PITCH_DETAILS_BY_ID_REQUEST:
                  return { ...state, fetchingPitchDetailsById: true };
                case types.GET_PITCH_DETAILS_BY_ID_SUCCESS:
                  return {
                    ...state,
                    fetchingPitchDetailsById: false,
                    pitch: action.payload,
                  };
                case types.GET_PITCH_DETAILS_BY_ID_FAILURE:
                  return {
                    ...state,
                    fetchingPitchDetailsById: false,
                    fetchingPitchDetailsByIdError: true,
                  };



                  case types.GET_PITCH_DOCUMENTS_REQUEST:
                    return {
                      ...state,
                      fetchingDocumentsByPitchId: true,
                      fetchingDocumentsByPitchIdError: false,
                    };
                  case types.GET_PITCH_DOCUMENTS_SUCCESS:
                    return {
                      ...state,
                      fetchingDocumentsByPitchId: false,
                      fetchingDocumentsByPitchIdError: false,
                      documentsByPitchId: action.payload,
                    };
                  case types.GET_PITCH_DOCUMENTS_FAILURE:
                    return {
                      ...state,
                      fetchingDocumentsByPitchId: false,
                      fetchingDocumentsByPitchIdError: true,
                    };



                  case types.ADD_PITCH_OPPORTUNITY_REQUEST:
                    return { ...state, addingPitchOpportunity: true };
                  case types.ADD_PITCH_OPPORTUNITY_SUCCESS:
                    return {
                      ...state,
                      addingPitchOpportunity: false,
                      addPitchOpportunityModal: false,
                      // clearbit: null,
                    };
                  case types.ADD_PITCH_OPPORTUNITY_FAILURE:
                    return {
                      ...state,
                      addingPitchOpportunity: false,
                      addingPitchOpportunityError: true,
                      // addLeadsOpportunityModal: false,
                    };



                case types.UPDATE_TYPE_FOR_PITCH_REQUEST:
                    return { ...state,updateTypePitch: true };
                  case types.UPDATE_TYPE_FOR_PITCH_SUCCESS:
                    return {
                      ...state,
                      updateTypePitch: false,                  
                      pitchData: state.pitchData.map((item) => {
                        if (item.investorLeadsId === action.payload.investorLeadsId) {
                          return action.payload;
                        } else {
                          return item;
                        }
                      }),
                      pitchDataHot: state.pitchDataHot.map((item) => {
                        if (item.investorLeadsId === action.payload.investorLeadsId) {
                          return action.payload;
                        } else {
                          return item;
                        }
                      }),
                      pitchDataWarm: state.pitchDataWarm.map((item) => {
                        if (item.investorLeadsId === action.payload.investorLeadsId) {
                          return action.payload;
                        } else {
                          return item;
                        }
                      }),
                      pitchDataCold: state.pitchDataCold.map((item) => {
                        if (item.investorLeadsId === action.payload.investorLeadsId) {
                          return action.payload;
                        } else {
                          return item;
                        }
                      }),
                    };
                  case types.UPDATE_TYPE_FOR_PITCH_FAILURE:
                    return { ...state, updateTypePitch: false,updateTypePitchError:true, };




                    case types.GET_PITCH_OPPORTUNITY_REQUEST:
                      return { ...state, fetchingPitchOpportunity: true };
                    case types.GET_PITCH_OPPORTUNITY_SUCCESS:
                      return {
                        ...state,
                        fetchingPitchOpportunity: false,
                        opportunityByPitchId: action.payload,
                      };
                    case types.GET_PITCH_OPPORTUNITY_FAILURE:
                      return {
                        ...state,
                        fetchingPitchOpportunity: false,
                        fetchingPitchOpportunityError: true,
                      };
        




        case types.DELETE_PITCH_DATA_REQUEST:
            return { ...state, deletingPitchData: true };
          case types.DELETE_PITCH_DATA_SUCCESS:
            return {
              ...state,
              deletingPitchData: false,
              pitchData: state.pitchData.filter(
                (item) => item.investorLeadsId !== action.payload
              ),
            };
          case types.DELETE_PITCH_DATA_FAILURE:
            return { ...state, deletingPitchData: false, deletingPitchDataError: false };

            case types.GET_PITCH_RECORDS_REQUEST:
              return { ...state, fetchingPitchRecords: true };
            case types.GET_PITCH_RECORDS_SUCCESS:
              return {
                ...state,
                fetchingPitchRecords: false,
                pitchRecord: action.payload,
              };
            case types.GET_PITCH_RECORDS_FAILURE:
              return {
                ...state,
                fetchingPitchRecords: false,
                fetchingPitchRecordsError: true,
              };

              
            case types.GET_PITCH_ALL_RECORDS_REQUEST:
              return { ...state, fetchingAllPitchRecords: true };
            case types.GET_PITCH_ALL_RECORDS_SUCCESS:
              return {
                ...state,
                fetchingAllPitchRecords: false,
                pitchAllRecord: action.payload,
              };
            case types.GET_PITCH_ALL_RECORDS_FAILURE:
              return {
                ...state,
                fetchingAllPitchRecords: false,
                fetchingAllPitchRecordsError: true,
              };
  
              case types.HANDLE_ASSI_MODAL:
                return { ...state, openASSImodal: action.payload };


                case types.GET_PITCH_TIMELINE_REQUEST:
                  return { ...state, fetchingPitchStatus: true };
              case types.GET_PITCH_TIMELINE_SUCCESS:
                  return {
                      ...state,
                      fetchingPitchStatus: false,
                      pitchStatus: action.payload,
                  };
              case types.GET_PITCH_TIMELINE_FAILURE:
                  return {
                      ...state,
                      fetchingPitchStatus: false,
                      fetchingPitchStatusError: true,
                  };

                  case types.GET_PITCH_SEARCH_REQUEST:
                    return { ...state, fetchingPitchSearchData: true };
                  case types.GET_PITCH_SEARCH_SUCCESS:
                    return {
                      ...state,
                      fetchingPitchSearchData: false,
                      pitchData: action.payload,
                      // serachedData: action.payload,
                    };
                  case types.GET_PITCH_SEARCH_FAILURE:
                    return { ...state, fetchingPitchSearchDataError: true };

                    case types.HANDLE_PITCH_NOTES_DRAWER_MODAL:
                      return { ...state, addDrawerPitchNotesModal: action.payload };

                      case types.ADD_PITCH_NOTES_REQUEST:
                        return {
                          ...state,
                          addingNotesByPitchId: true,
                        };
                      case types.ADD_PITCH_NOTES_SUCCESS:
                        return {
                          ...state,
                          addingNotesByPitchId: false,
                          addingNotesByPitchId: false,
                          // addDrawerPitchNotesModal: false,
                        };
                      case types.ADD_PITCH_NOTES_FAILURE:
                        return {
                          ...state,
                          addingNotesByPitchId: false,
                          addingNotesByPitchIdError: true,
                        };

                        
      case types.GET_NOTES_LIST_BY_PITCH_ID_REQUEST:
        return { ...state, fetchingNotesListByPitchId: true };
      case types.GET_NOTES_LIST_BY_PITCH_ID_SUCCESS:
        return {
          ...state,
          fetchingNotesListByPitchId: false,
          notesListByPitchId: action.payload,
        };
      case types.GET_NOTES_LIST_BY_PITCH_ID_FAILURE:
        return {
          ...state,
          fetchingNotesListByPitchId: false,
          fetchingNotesListByPitchIdError: true,
        };
              
        case types.HANDLE_PITCH_ACTIVITY_MODAL:
          return { ...state, addPitchactivityModal: action.payload };  
          
          
          case types.GET_PITCH_COUNT_REQUEST:
            return { ...state, fetchingPitchCount: true };
          case types.GET_PITCH_COUNT_SUCCESS:
            return {
              ...state,
              fetchingPitchCount: false,
              pitchCount: action.payload,
            };
          case types.GET_PITCH_COUNT_FAILURE:
            return {
              ...state,
              fetchingPitchCount: false,
              fetchingPitchCountError: true,
            };

            case types.GET_TEAMSPITCH_COUNT_REQUEST:
            return { ...state, fetchingTeamsPitchCount: true };
          case types.GET_TEAMSPITCH_COUNT_SUCCESS:
            return {
              ...state,
              fetchingTeamsPitchCount: false,
              teamsPitchCount: action.payload,
            };
          case types.GET_TEAMSPITCH_COUNT_FAILURE:
            return {
              ...state,
              fetchingTeamsPitchCount: false,
              fetchingTeamsPitchCountError: true,
            };

            case types.SET_PITCH_VIEW_TYPE:
              return { ...state, viewType: action.payload };

              case types.GET_ALL_PITCH_REQUEST:

    return { ...state, fetchingAllPitch: true };
  case types.GET_ALL_PITCH_SUCCESS:
    return {
      ...state,
      fetchingAllPitch: false,
      allPitchData: action.payload,
      clearbit:null
    };
  case types.GET_ALL_PITCH_FAILURE:
    return {
      ...state,
      fetchingAllPitch: false,
      fetchingAllPitchError: true,
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

      case types.ADD_PITCH_ACTIVITY_CALL_REQUEST:
        return { ...state, addingPitchActivityCall: true };
      case types.ADD_PITCH_ACTIVITY_CALL_SUCCESS:
        return { ...state, addingPitchActivityCall: false,
          addPitchactivityModal: false,
          pitchStatus:[action.payload,...state.pitchStatus]
         };
      case types.ADD_PITCH_ACTIVITY_CALL_FAILURE:
        return {
          ...state,
          addingPitchActivityCall: false,
          addPitchactivityModal: false,
        };


        case types.ADD_PITCH_ACTIVITY_EVENT_REQUEST:
          return { ...state, addingPitchActivityEvent: true };
        case types.ADD_PITCH_ACTIVITY_EVENT_SUCCESS:
          return { ...state, addingPitchActivityEvent: false,
            addPitchactivityModal: false,
            pitchStatus:[action.payload,...state.pitchStatus]
           };
        case types.ADD_PITCH_ACTIVITY_EVENT_FAILURE:
          return {
            ...state,
            addingPitchActivityEvent: false,
            addPitchactivityModal: false,
          };

          case types.ADD_PITCH_ACTIVITY_TASK_REQUEST:
            return { ...state, addingPitchActivityTask: true };
          case types.ADD_PITCH_ACTIVITY_TASK_SUCCESS:
            return { ...state, addingPitchActivityTask: false,
              addPitchactivityModal: false,
              pitchStatus:[action.payload,...state.pitchStatus]
             };
          case types.ADD_PITCH_ACTIVITY_TASK_FAILURE:
            return {
              ...state,
              addingPitchActivityTask: false,
              addPitchactivityModal: false,
            };

            case types.GET_TEAM_PITCH_REQUEST:
              return { ...state, fetchingTeamPitch: true };
            case types.GET_TEAM_PITCH_SUCCESS:
              return {
                ...state,
                fetchingTeamPitch: false,
            teamPitch:action.payload,
              };
            case types.GET_TEAM_PITCH_FAILURE:
              return {
                ...state,
                fetchingTeamPitch: false,
                fetchingTeamPitchError: true,
              };

              case types.HANDLE_PITCH_CONVERT_MODAL:
                return { ...state, addPitchConvertModal: action.payload };

                case types.HANDLE_CLAER_REDUCER_DATA_PITCH:
                  return { ...state, 
                    pitchData: [], 
                    // deletedTruck: [] 
                  };

                  case types.SET_CLEARBIT_DATA:
                    return { ...state, clearbit: action.payload };


                    case types.GET_PITCH_ACTIVITY_RECORDS_REQUEST:
                      return { ...state, fetchingPitchActivityCount: true };
                    case types.GET_PITCH_ACTIVITY_RECORDS_SUCCESS:
                      return {
                        ...state,
                        fetchingPitchActivityCount: false,
                        pitchActivityCount: action.payload,
                      };
                    case types.GET_PITCH_ACTIVITY_RECORDS_FAILURE:
                      return {
                        ...state,
                        fetchingPitchActivityCount: false,
                        fetchingPitchActivityCountError: true,
                      };

    default:
return state;
}
};
