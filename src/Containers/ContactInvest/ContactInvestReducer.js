import * as types from "./ContactInvestActionType";
import moment from "moment";
const initialState = {
    viewType:"card",

    addingContactInvest: false, 
    addContactInvestModal: false,

    addDrawerContactInvestPulseModal:false,

    addingContactinvestActivityEvent: false,
    addingContactinvestActivityEventError: false,


    fetchingContactInvestAllRecords: false,
    fetchingContactInvestAllRecordsError: false,
    contactInvestAllRecord:{},

    uploadingContactInvestList: false,
    uploadingContactInvestListError: false,

    uploadContactInvestList:false,


    addingContactinvestActivityCall:false,
    addingContactinvestActivityCallError:false,

    addingContactinvestActivityTask: false,
    addingContactinvestActivityTaskError: false,

    fetchingOpportunityRecord: false,
    fetchingOpportunityRecordError: false,
    opportunityRecord:[],
    fetchingContactInvestStatus: false,
    fetchingContactInvestStatusError: false,
    contactInvestStatus:[],

    fetchingAllContactInvest: false,
    fetchingAllContactInvestError: false,
    allContactInvestData:[],

    fetchingTeamsContactInvest: false,
    fetchingTeamsContactInvestError: false,
    teamsContactInvestData:[],

    contactInvestorActivityModal:false,

    addDrawerContactInvestNotesModal:false,

    fetchingInvestorContactSearchData:false,
    fetchingInvestorContactSearchDataError:false,

    fetchingFilterContactsInvest: false,
    fetchingFilterContactsInvestError: false,

    fetchingContactsInvest: false,
    fetchingContactsInvestError: false,
    contactiNVESTbyId:[],

    fetchingContactInvestRecords: false,
            fetchingContactInvestRecordsError: false,
            contactInvest:[],

            fetchingTeamContactInvestRecords: false,
            fetchingTeamContactInvestRecordsError: false,
            teamContactInvest:{},

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
        contactiNVESTbyId:[action.payload,...state.contactiNVESTbyId],
        allContactInvestData:[action.payload,...state.allContactInvestData]
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
          }}),
          teamsContactInvestData: state.teamsContactInvestData.map((item) => {
            if (item.contactId === action.payload.contactId) {
              return action.payload;
            } else {
              return item;
            }}),
        };
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

          case types.GET_TEAM_CONTACTINVEST_RECORDS_REQUEST:
            return { ...state, fetchingTeamContactInvestRecords: true };
          case types.GET_TEAM_CONTACTINVEST_RECORDS_SUCCESS:
            return {
              ...state,
              fetchingTeamContactInvestRecords: false,
              teamContactInvest: action.payload,
            };
          case types.GET_TEAM_CONTACTINVEST_RECORDS_FAILURE:
            return {
              ...state,
              fetchingTeamContactInvestRecords: false,
              fetchingTeamContactInvestRecordsError: true,
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


              
              case types.GET_ALL_CONTACT_INVEST_REQUEST:

    return { ...state, fetchingAllContactInvest: true };
  case types.GET_ALL_CONTACT_INVEST_SUCCESS:
    return {
      ...state,
      fetchingAllContactInvest: false,
      allContactInvestData: action.payload,
    };
  case types.GET_ALL_CONTACT_INVEST_FAILURE:
    return {
      ...state,
      fetchingAllContactInvest: false,
      fetchingAllContactInvestError: true,
    };

    case types.GET_TEAMS_CONTACT_INVEST_REQUEST:

    return { ...state, fetchingTeamsContactInvest: true };
  case types.GET_TEAMS_CONTACT_INVEST_SUCCESS:
    return {
      ...state,
      fetchingTeamsContactInvest: false,
      teamsContactInvestData: action.payload,
    };
  case types.GET_TEAMS_CONTACT_INVEST_FAILURE:
    return {
      ...state,
      fetchingTeamsContactInvest: false,
      fetchingTeamsContactInvestError: true,
    };
  
    case types.HANDLE_CONTACT_INVEST_ACTIVITY_MODAL:
      return { ...state, contactInvestorActivityModal: action.payload };
      case types.GET_CONTACT_INVEST_TIMELINE_REQUEST:
        return { ...state, fetchingContactInvestStatus: true };
    case types.GET_CONTACT_INVEST_TIMELINE_SUCCESS:
        return {
            ...state,
            fetchingContactInvestStatus: false,
            contactInvestStatus: action.payload,
        };
    case types.GET_CONTACT_INVEST_TIMELINE_FAILURE:
        return {
            ...state,
            fetchingContactInvestStatus: false,
            fetchingContactInvestStatusError: true,
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


          case types.ADD_CONTACT_INVEST_ACTIVITY_CALL_REQUEST:
            return { ...state, addingContactinvestActivityCall: true };
          case types.ADD_CONTACT_INVEST_ACTIVITY_CALL_SUCCESS:
            return { ...state, addingContactinvestActivityCall: false,
              contactInvestorActivityModal: false,
              contactInvestStatus:[action.payload,...state.contactInvestStatus]
             };
          case types.ADD_CONTACT_INVEST_ACTIVITY_CALL_FAILURE:
            return {
              ...state,
              addingContactinvestActivityCall: false,
              contactInvestorActivityModal: false,
            };

            case types.ADD_CONTACT_INVEST_ACTIVITY_EVENT_REQUEST:
              return { ...state, addingContactinvestActivityEvent: true };
            case types.ADD_CONTACT_INVEST_ACTIVITY_EVENT_SUCCESS:
              return { ...state, addingContactinvestActivityEvent: false,
                contactInvestorActivityModal: false,
                contactInvestStatus:[action.payload,...state.contactInvestStatus]
               };
            case types.ADD_CONTACT_INVEST_ACTIVITY_EVENT_FAILURE:
              return {
                ...state,
                addingContactinvestActivityEvent: false,
                contactInvestorActivityModal: false,
              };  

              case types.ADD_CONTACT_INVEST_ACTIVITY_TASK_REQUEST:
                return { ...state, addingContactinvestActivityTask: true };
              case types.ADD_CONTACT_INVEST_ACTIVITY_TASK_SUCCESS:
                return { ...state, addingContactinvestActivityTask: false,
                  contactInvestorActivityModal: false,
                  contactInvestStatus:[action.payload,...state.contactInvestStatus]
                 };
              case types.ADD_CONTACT_INVEST_ACTIVITY_TASK_FAILURE:
                return {
                  ...state,
                  addingContactinvestActivityTask: false,
                  contactInvestorActivityModal: false,
                }; 
                
                case types.HANDLE_CLAER_REDUCER_DATA_CONTACT_INVEST:
                  return { ...state, 
                    contactiNVESTbyId: [], 
                    // deletedTruck: [] 
                  };

                  case types.HANDLE_CONTACT_INVEST_PULSE_DRAWER_MODAL:
                    return { ...state, addDrawerContactInvestPulseModal: action.payload }; 
                    
                    
                    case types.GET_CONTACT_INVEST_ALL_RECORDS_REQUEST:
                      return { ...state, fetchingContactInvestAllRecords: true };
                    case types.GET_CONTACT_INVEST_ALL_RECORDS_SUCCESS:
                      return {
                        ...state,
                        fetchingContactInvestAllRecords: false,
                        contactInvestAllRecord: action.payload,
                      };
                    case types.GET_CONTACT_INVEST_ALL_RECORDS_FAILURE:
                      return {
                        ...state,
                        fetchingContactInvestAllRecords: false,
                        fetchingContactInvestAllRecordsError: true,
                      };


                      case types.HANDLE_UPLOAD_CONTACTINVEST_MODAL:
                        return { ...state, uploadContactInvestList: action.payload };    

                        case types.UPLOAD_CONTACTINVEST_LIST_REQUEST:
                          return { ...state, uploadingContactInvestList: true };
                        case types.UPLOAD_CONTACTINVEST_LIST_SUCCESS:
                          return {
                            ...state,
                            uploadingContactInvestList: false,
                            uploadContactInvestList: false
                          };
                        case types.UPLOAD_CONTACTINVEST_LIST_FAILURE:
                          return {
                            ...state,
                            uploadingContactInvestList: false,
                            uploadingContactInvestListError: true,
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
