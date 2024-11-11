import * as types from "./ActivityActionTypes";
import dayjs from "dayjs";
const initialState = {


  addingActivityCall: false,
  addingActivityCallError: false,



  addEventLocation:false,
  addEventLocationError:false,


  addingActivityEvent:false,



  addingActivityTask:false,

  callActivityModal:false,


  fetchingActivityTimelineStatus:false,
  fetchingActivityTimelineStatusError:false,
  activityTimeline:[]

  
};

export const activityReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * handle Customer form modal
     */
    case types.HANDLE_CALL_ACTIVITY_MODAL:
        return { ...state, callActivityModal: action.payload };


    case types.ADD_ACTIVITY_CALL_REQUEST:
      return { ...state, addingActivityCall: true };
    case types.ADD_ACTIVITY_CALL_SUCCESS:
      return {
        ...state,
       // addDistributorActivityModal:false,
       addingActivityCall: false,
        callActivityModal: false,
        // activityDistributor:action.payload,
        activityTimeline: [
          action.payload,
          ...state.activityTimeline,
        ],
      };
    case types.ADD_ACTIVITY_CALL_FAILURE:
      return {
        ...state,
        addingActivityCall: false,
       // callActivityModal: false,
      };

    case types.ADD_ACTIVITY_EVENT_REQUEST:
      return { ...state, addingActivityEvent: true };
    case types.ADD_ACTIVITY_EVENT_SUCCESS:
      return {
        ...state,
        addingActivityEvent: false,
        //addDistributorActivityModal:false,
        callActivityModal: false,
        activityTimeline: [
          action.payload,
          ...state.activityTimeline,
        ],
      };
    case types.ADD_ACTIVITY_EVENT_FAILURE:
      return {
        ...state,
        addingActivityEvent: false,
        //callActivityModal: false,
      };
    
    
    
    case types.ADD_ACTIVITY_TASK_REQUEST:
      return { ...state, addingActivityTask: true };
    case types.ADD_ACTIVITY_TASK_SUCCESS:
      return {
        ...state,
        addingActivityTask: false,
        callActivityModal: false,

        activityTimeline: [
          action.payload,
          ...state.activityTimeline,
        ],
      };
    case types.ADD_ACTIVITY_TASK_FAILURE:
      return {
        ...state,
        addingActivityTask: false,
        //callActivityModal: false,
      };




      case types.ADD_EVENT_LOCATION_REQUEST:
            return { ...state, addEventLocation: true };
          case types.ADD_EVENT_LOCATION_SUCCESS:
            return {
              ...state,
              addEventLocation: false,
              //updateEventModal: false,
              activityTimeline: state.activityTimeline.map((event) =>
              event.eventId === action.payload.eventId
                ? action.payload
                : event
            ),
              
            };
          case types.ADD_EVENT_LOCATION_FAILURE:
            return { ...state, addEventLocation: false, addEventLocationError: false };





      case types.GET_ACTIVITY_TIMELINE_REQUEST:
      return { ...state, fetchingActivityTimelineStatus: true };
    case types.GET_ACTIVITY_TIMELINE_SUCCESS:
      return {
        ...state,
        fetchingActivityTimelineStatus: false,
        activityTimeline: action.payload,
      };
    case types.GET_ACTIVITY_TIMELINE_FAILURE:
      return {
        ...state,
        fetchingActivityTimelineStatus: false,
        fetchingActivityTimelineStatusError: true,
      };

   
    
  

    default:
      return state;
  }
};

