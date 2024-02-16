//call to local or server

export const TOGGLE_SERVER = "TOGGLE_SERVER";

// register action types
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

// login request types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// set password action types
export const SET_PASSWORD_REQUEST = "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_SUCCESS = "SET_PASSWORD_SUCCESS";
export const SET_PASSWORD_FAILURE = "SET_PASSWORD_FAILURE";

// change password action types
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

// validate email action types
export const VALIDATE_EMAIL_REQUEST = "VALIDATE_EMAIL_REQUEST";
export const VALIDATE_EMAIL_SUCCESS = "VALIDATE_EMAIL_SUCCESS";
export const VALIDATE_EMAIL_FAILURE = "VALIDATE_EMAIL_FAILURE";

//opportunity action types
export const GET_CURRENCY_REQUEST = "GET_CURRENCY_REQUEST";
export const GET_CURRENCY_SUCCESS = "GET_CURRENCY_SUCCESS";
export const GET_CURRENCY_FAILURE = "GET_CURRENCY_FAILURE";

//task action types
export const GET_TIMEZONE_REQUEST = "GET_TIMEZONE_REQUEST ";
export const GET_TIMEZONE_SUCCESS = "GET_TIMEZONE_SUCCESS";
export const GET_TIMEZONE_FAILURE = "GET_TIMEZONE_FAILURE";

//
export const GET_COUNTRIES_REQUEST = "GET_COUNTRIES_REQUEST";
export const GET_COUNTRIES_SUCCESS = "GET_COUNTRIES_SUCCESS";
export const GET_COUNTRIES_FAILURE = "GET_COUNTRIES_FAILURE";

// validate email action types
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

// get user details action types
export const GET_USER_DETAILS_REQUEST = "GET_USER_DETAILS_REQUEST";
export const GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS";
export const GET_USER_DETAILS_FAILURE = "GET_USER_DETAILS_FAILURE";

// update user details action types
export const UPDATE_USER_DETAILS_REQUEST = "UPDATE_USER_DETAILS_REQUEST";
export const UPDATE_USER_DETAILS_SUCCESS = "UPDATE_USER_DETAILS_SUCCESS";
export const UPDATE_USER_DETAILS_FAILURE = "UPDATE_USER_DETAILS_FAILURE";

//update address of user.
export const UPDATE_USER_ADDRESS = "UPDATE_USER_ADDRESS";

// get organization details action types
export const GET_ORGANIZATION_DETAILS_REQUEST =
  "GET_ORGANIZATION_DETAILS_REQUEST";
export const GET_ORGANIZATION_DETAILS_SUCCESS =
  "GET_ORGANIZATION_DETAILS_SUCCESS";
export const GET_ORGANIZATION_DETAILS_FAILURE =
  "GET_ORGANIZATION_DETAILS_FAILURE";

// update organization details action types
export const UPDATE_ORGANIZATION_DETAILS_REQUEST =
  "UPDATE_ORGANIZATION_DETAILS_REQUEST";
export const UPDATE_ORGANIZATION_DETAILS_SUCCESS =
  "UPDATE_ORGANIZATION_DETAILS_SUCCESS";
export const UPDATE_ORGANIZATION_DETAILS_FAILURE =
  "UPDATE_ORGANIZATION_DETAILS_FAILURE";

// update organization details action types
// update subscription type on organization
export const UPDATE_SUBSCRIPTION_TYPE = "UPDATE_SUBSCRIPTION_TYPE";

// update smartBoost enable/disable
export const UPDATE_SMARTBOOST_SUCCESS = "UPDATE_SMARTBOOST_SUCCESS";

// update smartBoost enable/disable
export const UPDATE_PROFESSIONALDUCT_SUCCESS =
  "UPDATE_PROFESSIONALDUCT_SUCCESS";

// update viewport enable/disable
export const UPDATE_VIEWPORT_SUCCESS = "UPDATE_VIEWPORT_SUCCESS";

// update delivery enable/disable
export const UPDATE_DELIVERY_SUCCESS = "UPDATE_DELIVERY_SUCCESS";

// update finance enable/disable
export const UPDATE_FINANCE_SUCCESS = "UPDATE_FINANCE_SUCCESS";

// update legal enable/disable
export const UPDATE_LEGAL_SUCCESS = "UPDATE_LEGAL_SUCCESS";


export const ADD_ORGANIZATION_DOCUMENT_REQUEST = "ADD_ORGANIZATION_DOCUMENT_REQUEST";
export const ADD_ORGANIZATION_DOCUMENT_SUCCESS = "ADD_ORGANIZATION_DOCUMENT_SUCCESS";
export const ADD_ORGANIZATION_DOCUMENT_FAILURE = "ADD_ORGANIZATION_DOCUMENT_FAILURE";


export const HANDLE_UPDATE_ORGANIZATION_MODAL="HANDLE_UPDATE_ORGANIZATION_MODAl"

// update riskManagement enable/disable
export const UPDATE_RISKMANAGEMENT_SUCCESS = "UPDATE_RISKMANAGEMENT_SUCCESS";

//logout and reset the redux store
export const LOGOUT = "LOGOUT";

//unauth user on timeout and token expiration
export const UNAUTH_USER = "UNAUTH_USER";

export const UPDATE_USER_BY_ID_REQUEST = "UPDATE_USER_BY_ID_REQUEST";
export const UPDATE_USER_BY_ID_SUCCESS = "UPDATE_USER_BY_ID_SUCCESS";
export const UPDATE_USER_BY_ID_FAILURE = "UPDATE_USER_BY_ID_FAILURE";

export const GET_TOPICS_BY_USER_ID_REQUEST = "GET_TOPICS_BY_USER_ID_REQUEST";
export const GET_TOPICS_BY_USER_ID_SUCCESS = "GET_TOPICS_BY_USER_ID_SUCCESS";
export const GET_TOPICS_BY_USER_ID_FAILURE = "GET_TOPICS_BY_USER_ID_FAILURE";

export const ADD_TOPIC_BY_USER_ID_REQUEST = "ADD_TOPIC_BY_USER_ID_REQUEST";
export const ADD_TOPIC_BY_USER_ID_SUCCESS = "ADD_TOPIC_BY_USER_ID_SUCCESS";
export const ADD_TOPIC_BY_USER_ID_FAILURE = "ADD_TOPIC_BY_USER_ID_FAILURE";

export const GET_TOPIC_BY_USER_ID_REQUEST = "GET_TOPIC_BY_USER_ID_REQUEST";
export const GET_TOPIC_BY_USER_ID_SUCCESS = "GET_TOPIC_BY_USER_ID_SUCCESS";
export const GET_TOPIC_BY_USER_ID_FAILURE = "GET_TOPIC_BY_USER_ID_FAILURE";

export const DELETE_TOPIC_BY_USER_ID_REQUEST =
  "DELETE_TOPIC_BY_USER_ID_REQUEST";
export const DELETE_TOPIC_BY_USER_ID_SUCCESS =
  "DELETE_TOPIC_BY_USER_ID_SUCCESS";
export const DELETE_TOPIC_BY_USER_ID_FAILURE =
  "DELETE_TOPIC_BY_USER_ID_FAILURE";

export const GET_CALLS_LIST_BY_USER_ID_REQUEST =
  "GET_CALLS_LIST_BY_USER_ID_REQUEST";
export const GET_CALLS_LIST_BY_USER_ID_SUCCESS =
  "GET_CALLS_LIST_BY_USER_ID_SUCCESS";
export const GET_CALLS_LIST_BY_USER_ID_FAILURE =
  "GET_CALLS_LIST_BY_USER_ID_FAILURE";

export const GET_TASKS_LIST_BY_USER_ID_REQUEST =
  "GET_TASKS_LIST_BY_USER_ID_REQUEST";
export const GET_TASKS_LIST_BY_USER_ID_SUCCESS =
  "GET_TASKS_LIST_BY_USER_ID_SUCCESS";
export const GET_TASKS_LIST_BY_USER_ID_FAILURE =
  "GET_TASKS_LIST_BY_USER_ID_FAILURE";

export const GET_EVENTS_LIST_BY_USER_ID_REQUEST =
  "GET_EVENTS_LIST_BY_USER_ID_REQUEST";
export const GET_EVENTS_LIST_BY_USER_ID_SUCCESS =
  "GET_EVENTS_LIST_BY_USER_ID_SUCCESS";
export const GET_EVENTS_LIST_BY_USER_ID_FAILURE =
  "GET_EVENTS_LIST_BY_USER_ID_FAILURE";

export const GET_LEAVES_BY_USER_ID_REQUEST = "GET_LEAVES_BY_USER_ID_REQUEST";
export const GET_LEAVES_BY_USER_ID_SUCCESS = "GET_LEAVES_BY_USER_ID_SUCCESS";
export const GET_LEAVES_BY_USER_ID_FAILURE = "GET_LEAVES_BY_USER_ID_FAILURE";
export const ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST =
  "ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST";
export const ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS =
  "ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS";
export const ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE =
  "ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE";

export const GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST =
  "GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST";
export const GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS =
  "GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS";
export const GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE =
  "GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE";

export const ADD_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST =
  "ADD_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST";
export const ADD_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS =
  "ADD_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS";
export const ADD_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE =
  "ADD_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE";

export const GET_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST =
  "GET_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST";
export const GET_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS =
  "GET_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS";
export const GET_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE =
  "GET_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE";

// update recruitpro Advance enable
// export const UPDATE_RECRUITMENT_ADVANCE_SUCCESS =
//   "UPDATE_RECRUITMENT_ADVANCE_SUCCESS";

// update recruitpro Advance enable
export const UPDATE_RECRUITMENT_ADVANCE_SUCCESS =
  "UPDATE_RECRUITMENT_ADVANCE_SUCCESS";
export const UPDATE_INVENTORY_SUCCESS = "UPDATE_INVENTORY_SUCCESS";
export const UPDATE_FASHION_SUCCESS = "UPDATE_FASHION_SUCCESS";

export const GENERATE_OTP_BY_EMAIL_REQUEST = "GENERATE_OTP_BY_EMAIL_REQUEST";
export const GENERATE_OTP_BY_EMAIL_SUCCESS = "GENERATE_OTP_BY_EMAIL_SUCCESS";
export const GENERATE_OTP_BY_EMAIL_FAILURE = "GENERATE_OTP_BY_EMAIL_FAILURE";

export const VALIDATE_OTP_BY_EMAIL_REQUEST = "VALIDATE_OTP_BY_EMAIL_REQUEST";
export const VALIDATE_OTP_BY_EMAIL_SUCCESS = "VALIDATE_OTP_BY_EMAIL_SUCCESS";
export const VALIDATE_OTP_BY_EMAIL_FAILURE = "VALIDATE_OTP_BY_EMAIL_FAILURE";

export const EDIT_ORGANIZATION_DETAILS_REQUEST =
  "EDIT_ORGANIZATION_DETAILS_REQUEST";
export const EDIT_ORGANIZATION_DETAILS_SUCCESS =
  "EDIT_ORGANIZATION_DETAILS_SUCCESS";
export const EDIT_ORGANIZATION_DETAILS_FAILURE =
  "EDIT_ORGANIZATION_DETAILS_FAILURE";

  export const GET_REPOSITORY_DOCUMENTS_REQUEST = "GET_REPOSITORY_DOCUMENTS_REQUEST";
export const GET_REPOSITORY_DOCUMENTS_SUCCESS = "GET_REPOSITORY_DOCUMENTS_SUCCESS";
export const GET_REPOSITORY_DOCUMENTS_FAILURE = "GET_REPOSITORY_DOCUMENTS_FAILURE";

export const HANDLE_REPOSITORY_ORGANIZATION_MODAL="HANDLE_REPOSITORY_ORGANIZATION_MODAl"

export const HANDLE_ORGANIZATION_DOCUMENT_DRAWER="HANDLE_ORGANIZATION_DOCUMENT_DRAWER"

export const DELETE_ORG_DOC_DATA_REQUEST = "DELETE_ORG_DOC_DATA_REQUEST";
export const DELETE_ORG_DOC_DATA_SUCCESS = "DELETE_ORG_DOC_DATA_SUCCESS";
export const DELETE_ORG_DOC_DATA_FAILURE = "DELETE_ORG_DOC_DATA_FAILURE";

export const LINK_ORG_DOC_PUBLISH_REQUEST =
"LINK_ORG_DOC_PUBLISH_REQUEST";
export const LINK_ORG_DOC_PUBLISH_SUCCESS =
"LINK_ORG_DOC_PUBLISH_SUCCESS";
export const LINK_ORG_DOC_PUBLISH_FAILURE =
"LINK_ORG_DOC_PUBLISH_FAILURE";

export const LINK_ORG_DOC_PRIVATE_REQUEST =
"LINK_ORG_DOC_PRIVATE_REQUEST";
export const LINK_ORG_DOC_PRIVATE_SUCCESS =
"LINK_ORG_DOC_PRIVATE_SUCCESS";
export const LINK_ORG_DOC_PRIVATE_FAILURE =
"LINK_ORG_DOC_PRIVATE_FAILURE";


export const SET_ORGANIZATION_VIEW_TYPE = "SET_ORGANIZATION_VIEW_TYPE";

export const ADD_ONBOARD_REQUEST = "ADD_ONBOARD_REQUEST";
export const ADD_ONBOARD_SUCCESS = "ADD_ONBOARD_SUCCESS";
export const ADD_ONBOARD_FAILURE = "ADD_ONBOARD_FAILURE";


export const HANDLE_ORGANIZATION_MODAL = "HANDLE_ORGANIZATION_MODAL";

export const ADD_ORGANIZATION_REQUEST = "ADD_ORGANIZATION_REQUEST";
export const ADD_ORGANIZATION_SUCCESS = "ADD_ORGANIZATION_SUCCESS";
export const ADD_ORGANIZATION_FAILURE = "ADD_ORGANIZATION_FAILURE";

export const GET_ORGANIZATION_REQUEST = "GET_ORGANIZATION_REQUEST";
export const GET_ORGANIZATION_SUCCESS = "GET_ORGANIZATION_SUCCESS";
export const GET_ORGANIZATION_FAILURE = "GET_ORGANIZATION_FAILURE";


export const UPDATE_PREFERED_LANG_REQUEST = "UPDATE_PREFERED_LANG_REQUEST";
export const UPDATE_PREFERED_LANG_SUCCESS = "UPDATE_PREFERED_LANG_SUCCESS";
export const UPDATE_PREFERED_LANG_FAILURE = "UPDATE_PREFERED_LANG_FAILURE";

export const HANDLE_ACTION_DRAWER_MODAL = "HANDLE_ACTION_DRAWER_MODAL";

export const GET_ACTION_REQUIRED_COUNT_REQUEST = "GET_ACTION_REQUIRED_COUNT_REQUEST";
export const GET_ACTION_REQUIRED_COUNT_SUCCESS = "GET_ACTION_REQUIRED_COUNT_SUCCESS";
export const GET_ACTION_REQUIRED_COUNT_FAILURE = "GET_ACTION_REQUIRED_COUNT_FAILURE";

export const GET_OPPORTUNITY_INCLUDED_COUNT_REQUEST = "GET_OPPORTUNITY_INCLUDED_COUNT_REQUEST";
export const GET_OPPORTUNITY_INCLUDED_COUNT_SUCCESS = "GET_OPPORTUNITY_INCLUDED_COUNT_SUCCESS";
export const GET_OPPORTUNITY_INCLUDED_COUNT_FAILURE = "GET_OPPORTUNITY_INCLUDED_COUNT_FAILURE";


export const GET_INCLUDED_OPPORTUNITY_REQUEST = "GET_INCLUDED_OPPORTUNITY_REQUEST";
export const GET_INCLUDED_OPPORTUNITY_SUCCESS = "GET_INCLUDED_OPPORTUNITY_SUCCESS";
export const GET_INCLUDED_OPPORTUNITY_FAILURE = "GET_INCLUDED_OPPORTUNITY_FAILURE";

export const EMPTY_INCLUDED_OPPORTUNITY_LIST="EMPTY_INCLUDED_OPPORTUNITY_LIST";

export const GET_DEALS_INCLUDED_COUNT_REQUEST = "GET_DEALS_INCLUDED_COUNT_REQUEST";
export const GET_DEALS_INCLUDED_COUNT_SUCCESS = "GET_DEALS_INCLUDED_COUNT_SUCCESS";
export const GET_DEALS_INCLUDED_COUNT_FAILURE = "GET_DEALS_INCLUDED_COUNT_FAILURE";

export const EMPTY_INCLUDED_DEALS_LIST="EMPTY_INCLUDED_DEALS_LIST";

export const GET_INCLUDED_DEALS_REQUEST = "GET_INCLUDED_DEALS_REQUEST";
export const GET_INCLUDED_DEALS_SUCCESS = "GET_INCLUDED_DEALS_SUCCESS";
export const GET_INCLUDED_DEALS_FAILURE = "GET_INCLUDED_DEALS_FAILURE";






