import * as types from "./CallActionTypes";

const initialState = {
  addCallModal: false,
  addNoteModal: false,
  addTimeZoneModal: false,
  addingCall: false,
  addingCallError: false,
  deleteCall: false,
  deleteCallError: false,
  updatingCall: false,
  updatingCallError: false,

  fetchingOpportunityRecord: false,
  fetchingOpportunityRecordError: false,
  opportunityRecord:[],

  viewType: "table",

  addingNotesByCallId: false,
  addingNotesByCallIdError: false,

  addDrawerCallNotesModal:false,

  fetchingCallListRangeByUserId: false,
  fetchingCallListRangeByUserIdError: false,
  callListRangeByUserId: [],


  addCallLocation:false,
  addCallLocationError:false,

  fetchingCallListRangeByUserIdForReport: false,
  fetchingCallListRangeByUserIdForReportError: false,
  callListRangeByUserIdForReport: [],

  fetchingCallListRangeOfAllusers: false,
  fetchingCallListRangeOfAllusersError: false,
  callListRangeOfAllUsers: [],

  fetchingNotesListByCallId: false,
  fetchingNotesListByCallIdError: false,
  notesListByCallId: [],

  setEditingNote: {},

  addNotesSpeechModal:false,

  fetchingAllUserByOraganizationId: false,
  fetchingAllUserByOraganizationIdError: false,
  allUsersListByOrganizationId: [],
};
export const callReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_USER_LIST_BY_ORGANIZATION_ID_REQUEST:
      return { ...state, fetchingAllUserByOraganizationId: true };
    case types.GET_ALL_USER_LIST_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        fetchingAllUserByOraganizationId: false,
        allUsersListByOrganizationId: action.payload,
      };
    case types.GET_ALL_USER_LIST_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        fetchingAllUserByOraganizationId: false,
        fetchingAllUserByOraganizationIdError: true,
      };

    case types.HANDLE_CALL_MODAL:
      return { ...state, addCallModal: action.payload };

    case types.HANDLE_TIME_ZONE_MODAL:
      return { ...state, addTimeZoneModal: action.payload };

    case types.ADD_CALL_REQUEST:
      return { ...state, addingCall: true };
    case types.ADD_CALL_SUCCESS:
      return { ...state, addingCall: false,
         addCallModal: false,
         addCallTaskModal:false,
         addPitchactivityModal:false,
        //  openCETmodal:false,
        callListRangeByUserId:[action.payload,...state.callListRangeByUserId]
       };
    case types.ADD_CALL_FAILURE:
      return {
        ...state,
        addingCall: false,
        addCallModal: false,
      };
    /**
     * delete a call permanently
     */
    case types.DELETE_CALL_REQUEST:
      return { ...state, deleteCall: true };
    case types.DELETE_CALL_SUCCESS:
      return {
        ...state,
        deleteCall: false,
        addCallModal: false,
        callListRangeByUserId: state.callListRangeByUserId.filter(
          (item) => item.callId !== action.payload
      ), 
        // callListRangeByUserId: state.callListRangeByUserId.filter(
        //   (item) => item.callId !== action.payload
        // ),
      };
    case types.DELETE_CALL_FAILURE:
      return { ...state, deleteCall: false, deleteCallError: false };
    /**
     * update a call
     */
    case types.UPDATE_CALL_BY_ID_REQUEST:
      return { ...state, updatingCall: true };
    case types.UPDATE_CALL_BY_ID_SUCCESS:
      return {
        ...state,
        updatingCall: false,
        callListRangeByUserId: state.callListRangeByUserId.map((item, i) => {
          //debugger;
          if (item.callId === action.payload.callId) {
            //debugger;
            return action.payload;
          } else {
            //debugger;
            return item;
          }
        }),
      };
    case types.UPDATE_CALL_BY_ID_FAILURE:
      return { ...state, updatingCall: false, updatingCallError: false };
    /**
     * get calls list by userId
     */
    case types.GET_CALL_LIST_RANGE_BY_USER_ID_REQUEST:
      return { ...state, fetchingCallListRangeByUserId: true };
    case types.GET_CALL_LIST_RANGE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingCallListRangeByUserId: false,
        // callListRangeByUserId: action.payload,

        callListRangeByUserId: [
          ...state.callListRangeByUserId,
          ...action.payload],
      };
    case types.GET_CALL_LIST_RANGE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingCallListRangeByUserId: false,
        fetchingCallListRangeByUserIdError: true,
      };





      case types.ADD_CALL_LOCATION_REQUEST:
        return { ...state, addCallLocation: true };
      case types.ADD_CALL_LOCATION_SUCCESS:
        return {
          ...state,
          addCallLocation: false,
          //updateEventModal: false,
          callListRangeByUserId: state.callListRangeByUserId.map((event) =>
      event.callId === action.payload.callId
         ? action.payload
            : event
         ),
          
        };
      case types.ADD_CALL_LOCATION_FAILURE:
        return { ...state, addCallLocation: false, addCallLocationError: false };

    case types.GET_CALL_LIST_RANGE_BY_USER_ID_FOR_REPORT_REQUEST:
      return { ...state, fetchingCallListRangeByUserIdForReport: true };
    case types.GET_CALL_LIST_RANGE_BY_USER_ID_FOR_REPORT_SUCCESS:
      return {
        ...state,
        fetchingCallListRangeByUserIdForReport: false,
        callListRangeByUserIdForReport: action.payload,
      };
    case types.GET_CALL_LIST_RANGE_BY_USER_ID_FOR_REPORT_FAILURE:
      return {
        ...state,
        fetchingCallListRangeByUserIdForReport: false,
        fetchingCallListRangeByUserIdForReportError: true,
      };

    case types.HANDLE_NOTE_MODAL:
      return { ...state, addNoteModal: action.payload };

    /**
     * get calls list by userId
     */
    case types.GET_CALL_LIST_RANGE_OF_ALL_USERS_REQUEST:
      return { ...state, fetchingCallListRangeOfAllUsers: true };
    case types.GET_CALL_LIST_RANGE_OF_ALL_USERS_SUCCESS:
      return {
        ...state,
        fetchingCallListRangeOfAllUsers: false,
        callListRangeOfAllUsers: action.payload,
      };
    case types.GET_CALL_LIST_RANGE_OF_ALL_USERS_FAILURE:
      return {
        ...state,
        fetchingCallListRangeOfAllUsers: false,
        fetchingCallListRangeOfAllUsersError: true,
      };

    /**
     * get notes list by calltId
     */
    case types.GET_NOTES_LIST_BY_CALL_ID_REQUEST:
      return { ...state, fetchingNotesListByCallId: true };
    case types.GET_NOTES_LIST_BY_CALL_ID_SUCCESS:
      return {
        ...state,
        fetchingNotesListByCallId: false,
        notesListByCallId: action.payload,
      };
    case types.GET_NOTES_LIST_BY_CALL_ID_FAILURE:
      return {
        ...state,
        fetchingNotesListByCallId: false,
        fetchingNotesListByCallIdError: true,
      };

    case types.SET_NOTE_EDIT:
      return { ...state, setEditingNote: action.payload };


 case types.HANDLE_CALL_NOTES_MODAL:
   return { ...state, addNotesSpeechModal: action.payload };

   case types.HANDLE_CALL_NOTES_DRAWER_MODAL:
    return { ...state, addDrawerCallNotesModal: action.payload };

    case types.ADD_CALL_NOTES_REQUEST:
      return {
        ...state,
        addingNotesByCallId: true,          
      };
    case types.ADD_CALL_NOTES_SUCCESS:
      return {
        ...state,
        // addDrawerCallNotesModal:false,
        addingNotesByCallId: false,

      };
    case types.ADD_CALL_NOTES_FAILURE:
      return {
        ...state,
        addingNotesByCallId: false,
        addingNotesByCallIdError: true,
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
     
        case types.EMPTY_CALL_LIST:
          return { ...state, callListRangeByUserId: [] }; 

    default:
      return state;
  }
  return state;
};
