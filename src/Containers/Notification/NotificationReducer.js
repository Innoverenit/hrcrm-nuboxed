import * as types from "./NotificationActionTypes";
import Notificationdrawermodal from "./Notificationdrawermodal";

const initialState = {
  isError: false,
  error: {},
  isFetching: false,

  fetchingPastNotifications: false,
  fetchingPastNotificationsError: false,
  pastNotifications: [],

  updatingNotification: false,
  updatingNotificationError: false,

  fetchingPresentNotifications: false,
  fetchingPresentNotificationsError: false,
  presentNotifications: [],

  fetchingFutureNotifications: false,
  fetchingFutureNotificationsError: false,
  futureNotifications: [],

  Notificationdrawermodal: false,
};
export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCHING_NOTIFICATIONS:
      return { ...state, isFetching: true };
    case types.GET_PAST_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingPastNotifications: true };
    case types.GET_PAST_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingPastNotifications: false,
        pastNotifications: action.payload
      };
    case types.GET_PAST_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingPastNotifications: false,
        fetchingPastNotificationsError: true
      };

    case types.GET_PRESENT_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingPresentNotifications: true };
    case types.GET_PRESENT_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingPresentNotifications: false,
        presentNotifications: action.payload
      };
    case types.GET_PRESENT_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingPresentNotifications: false,
        fetchingPresentNotificationsError: true
      };

    case types.GET_FUTURE_NOTIFICATIONS_REQUEST:
      return { ...state, fetchingFutureNotifications: true };
    case types.GET_FUTURE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        fetchingFutureNotifications: false,
        futureNotifications: action.payload
      };
    case types.GET_FUTURE_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        fetchingFutureNotifications: false,
        fetchingFutureNotificationsError: true
      };

    case types.UPDATE_NOTIFICATION_BY_ID_REQUEST:
      return { ...state, updatingNotification: true };
    case types.UPDATE_NOTIFICATION_BY_ID_SUCCESS:
      return {
        ...state,
        updatingNotification: false,
        pastNotifications: state.pastNotifications.map(item => {
          //////debugger;
          if (item.notificationId === action.payload.notificationId) {
            return (item = action.payload);
          } else {
            return item;
          }
        }),
        presentNotifications: state.presentNotifications.map(item => {
          //////debugger;
          if (item.notificationId === action.payload.notificationId) {
            return (item = action.payload);
          } else {
            return item;
          }
        })
      };
    case types.UPDATE_NOTIFICATION_BY_ID_FAILURE:
      return {
        ...state,
        updatingNotification: false, 
        updatingNotificationError: false
      };

      case types.HANDLE_NOTIFICATION_DRAWER_MODAL:
        return { ...state, Notificationdrawermodal: action.payload };
    default:
      return state;
  }

  return state;
};
