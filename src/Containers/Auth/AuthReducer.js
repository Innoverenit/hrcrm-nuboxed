import * as types from "./AuthTypes";
const initialState = {
  env: "server",
  viewType: "table",
  registering: false,
  registeringError: false,
  registeringSuccess: false,
  user: {},
  fetchingUserDetails: false,
  fetchingUserDetailsError: null,
  updatingUserDetails: false,
  updatingUserDetailsError: null,
  userDetails: JSON.parse(sessionStorage.getItem("userDetails")) || {},
  fetchingOrganizationDetails: false,
  fetchingOrganizationDetailsError: null,
  organizationDetails: {},
  updatingOrganizationDetails: false,
  updatingOrganizationDetailsError: false,

  linkingOrgDocsPublish: false,
  linkingOrgDocsPublishError: false,

  linkingOrgDocsPrivate: false,
  linkingOrgDocsPrivateError: false,

  fetchingInvestorCurrency: false,
  fetchingInvestorCurrencyError: false,
  investorCurrencies:[],

  addDrawerActionModal: false,

  addingOrganization: false,
  addingOrganizationError: false,

  editingOrganizationDetails: false,
  editingOrganizationDetailsError: false,
  organizationDetails: {},

  fetchingIncludedOpportunity: false,
  fetchingIncludedOpportunityError: false,
  opportunityIncluded: [],

  fetchingRepositoryDocuments: false,
  fetchingRepositoryDocumentsError: false,
  repositoryData: [],

  changingPassword: false,
  changingPasswordError: false,
  logging: false,
  loginError: false,
  token: sessionStorage.getItem("token"),

  addingOnboard: false,
  addingOnboardError: false,
  token: sessionStorage.getItem("token"),

  updatingUserById: false,
  updatingUserByIdError: false,
  userDetails: JSON.parse(sessionStorage.getItem("userDetails")) || {},

  fetchingtimeZone: false,
  fetchingTimeZoneError: false,
  timeZone: [],

  fetchingTaskIncludedCount: false,
  fetchingTaskIncludedCountError: false,
  taskIncludedCount: {},

  fetchingIncludedDeals: false,
  fetchingIncludedDealsError: false,
  dealsIncluded: [],

  fetchingOrganization: false,
  fetchingOrganizationError: false,
  organizationDetailsList: [],


  fetchingCurrency: false,
  fetchingCurrencyError: false,
  currencies: [],


  addDrawerRepositoryDocumentModal:false,

  faqModal: false,

  fetchingIncludedTask: false,
  fetchingIncludedTaskError: false,
  taskIncluded: [],

  fetchingCountries: false,
  fetchingCountriesError: false,
  countries: [],

  fetchingActionRequiredCount: false,
  fetchingActionRequiredCountError: false,
  actionCount: [],

  addOrganizationModal: false,

  fetchingTopicsByUserId: false,
  fetchingTopicsByUserIdError: false,
  addingTopicsByUserId: false,
  addingTopicsByUserIdError: false,
  deletingTopicsByUserId: false,
  deletingTopicsByUserIdError: false,
  topicsByUserId: [],

  updateOrganizationModal: false,

  repositoryOrganizationModal: false,

  fetchingCallsListByUserId: false,
  fetchingCallsListByUserIdError: false,
  callsListByUserId: [],

  fetchingEventsListByUserId: false,
  fetchingEventsListByUserIdError: false,
  eventsListByUserId: [],

  fetchingOpportunityIncludedCount: false,
  fetchingOpportunityIncludedCountError: false,
  oppIncludedCount: {},


  updateRepositoryDocument:false,
  updateRepositoryDocumentError:false,

  fetchingDealsIncludedCount: false,
  fetchingDealsIncludedCountError: false,
  dealsIncludedCount: {},

  fetchingLeavesByUserId: false,
  fetchingLeavesByUserIdError: false,
  leavesListByUserId: [],

  deletingOrgDocData: false,
  deletingOrgDocDataError: false,

  fetchingTasksListByUserId: false,
  fetchingTasksListByUserIdError: false,
  tasksListByUserId: [],

  organizationDocumentDrawer: false,


  addingOrganizationDocument: false,

  addingOrgSignature: false,
  addingOrgSignatureError: false,

  fetchingOrgSignature: false,
  fetchingOrgSignatureError: false,
  orgSignatureData: [],
  addingPersonalSignature: false,
  addingPersonalSignatureError: false,

  fetchingPersonalSignature: false,
  fetchingPersonalSignatureError: false,
  personalSignatureData: [],

  generatingOtpByEmail: false,
  generatingOtpByEmailError: false,
  otpMsg: {},

  validatingOtpByEmail: false,
  validatingOtpByEmailError: false,
  validateMsg: {},

  fetchingSaleCurrency: false,
  fetchingSaleCurrencyError: true,
  saleCurrencies: [],

  settingPassword: false,
  settingPasswordError: false,

  updatingPreferedLang: false,
  updatingPreferedLangError: false,

  fetchingAllDialCode: false,
  fetchingAllDialCodeError: false,
  dialcodeList: [],

  verifyingEmail: false,
  verifyingEmailError: false,

  validatingOtp: false,
  validatingOtpError: false,
  validOtp: "",
  doResetpassword: false,
  doResetpasswordError: false,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_SERVER:
      return { ...state, env: action.payload };
    case types.REGISTER_REQUEST:
      return { ...state, registering: true, registeringError: false };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        registeringError: false,
        registeringSuccess: true,
        user: action.payload,
      };
    case types.UPDATE_USER_ADDRESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          address: state.userDetails.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };
    case types.REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        registeringError: true,
        registeringSuccess: false,
      };

    case types.GET_CURRENCY_REQUEST:
      return { ...state, fetchingCurrency: true };
    case types.GET_CURRENCY_SUCCESS:
      return { ...state, fetchingCurrency: false, currencies: action.payload };
    case types.GET_CURRENCY_FAILURE:
      return {
        ...state,
        fetchingCurrency: false,
        fetchingCurrencyError: true,
      };

    case types.GET_SALE_CURRENCY_REQUEST:
      return { ...state, fetchingSaleCurrency: true };
    case types.GET_SALE_CURRENCY_SUCCESS:
      return { ...state, fetchingSaleCurrency: false, saleCurrencies: action.payload };
    case types.GET_SALE_CURRENCY_FAILURE:
      return {
        ...state,
        fetchingSaleCurrency: false,
        fetchingSaleCurrencyError: true,

      };

    case types.GET_TIMEZONE_REQUEST:
      return { ...state, fetchingtimeZone: true };
    case types.GET_TIMEZONE_SUCCESS:
      return { ...state, fetchingtimeZone: false, timeZone: action.payload };
    case types.GET_TIMEZONE_FAILURE:
      return {
        ...state,
        fetchingtimeZone: false,
        fetchingtimeZoneError: true,
      };

    case types.GET_COUNTRIES_REQUEST:
      return { ...state, fetchingCountries: true };
    case types.GET_COUNTRIES_SUCCESS:
      return { ...state, fetchingCountries: false, countries: action.payload };
    case types.GET_COUNTRIES_FAILURE:
      return {
        ...state,
        fetchingCountries: false,
        fetchingCountriesError: true,
      };

    case types.VALIDATE_EMAIL_REQUEST:
      return { ...state };
    case types.VALIDATE_EMAIL_SUCCESS:
      return { ...state };
    case types.VALIDATE_EMAIL_FAILURE:
      return { ...state };


      case types.SET_REPOSITORY_EDIT:
        return { ...state, setEditingRepository: action.payload };

    case types.SET_PASSWORD_REQUEST:
      return { ...state, settingPassword: true, settingPasswordError: false };
    case types.SET_PASSWORD_SUCCESS:
      return {
        ...state,
        settingPassword: false, settingPasswordError: false
      };
    case types.SET_PASSWORD_FAILURE:
      return { ...state, settingPassword: true, settingPasswordError: false };

    case types.CHANGE_PASSWORD_REQUEST:
      return { ...state, changingPassword: true, changingPasswordError: false };
    case types.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        changingPasswordError: false,
      };
    case types.CHANGE_PASSWORD_FAILURE:
      return { ...state, changingPassword: false, changingPasswordError: true };

    case types.LOGIN_REQUEST:
      return { ...state, logging: true };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        logging: false,
        token: action.payload.token || sessionStorage.getItem("token"),
      };
    case types.LOGIN_FAILURE:
      return { ...state, logging: false, loginError: true };

    case types.GET_USER_DETAILS_REQUEST:
      return { ...state, fetchingUserDetails: true };
    case types.GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingUserDetails: false,
        userDetails:
          action.payload || JSON.parse(sessionStorage.getItem("userDetails")),
      };
    case types.GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        fetchingUserDetails: false,
        fetchingUserDetailsError: true,
      };

    case types.UPDATE_USER_DETAILS_REQUEST:
      return { ...state, updatingUserDetails: true };
    case types.UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        updatingUserDetails: false,
        userDetails:
          action.payload || JSON.parse(sessionStorage.getItem("userDetails")),
      };
    case types.UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        updatingUserDetails: false,
        updatingUserDetailsError: true,
      };

    case types.GET_ORGANIZATION_DETAILS_REQUEST:
      return { ...state, fetchingOrganizationDetails: true };
    case types.GET_ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingOrganizationDetails: false,
        organizationDetails: action.payload,
      };
    case types.GET_ORGANIZATION_DETAILS_FAILURE:
      return {
        ...state,
        fetchingOrganizationDetails: false,
        fetchingOrganizationDetailsError: true,
      };

    case types.UPDATE_ORGANIZATION_DETAILS_REQUEST:
      return { ...state, updatingOrganizationDetails: true };
    case types.UPDATE_ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        updatingOrganizationDetails: false,
        //   organizationDetails: state.organizationDetails.map((org) =>
        //   org.organizationId === action.payload.organizationId
        //     ? action.payload
        //     : org
        // ),
        organizationDetails: action.payload,
        userDetails: {
          ...state.userDetails,
          metaData: {
            ...state.userDetails.metaData,
            organization: action.payload,
          },
        },
      };
    case types.UPDATE_ORGANIZATION_DETAILS_FAILURE:
      return {
        ...state,
        updatingOrganizationDetails: false,
        updatingOrganizationDetailsError: true,
      };

    /**
     * update subscriptiontype inn userDetails to
     */
    case types.UPDATE_SUBSCRIPTION_TYPE:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          metaData: {
            ...state.userDetails.metaData,
            organization: {
              ...state.userDetails.metaData.organization,
              subscriptionType: action.payload,
            },
          },
        },
      };
    /**
     * this is for realtime updation of smartboost of loggedin user
     * is smartboost is updated from user drawer then, the user smartboost also get updated
     */
    case types.UPDATE_SMARTBOOST_SUCCESS:
      console.log(action.payload);
      function updateSmartBoost(userDetails, param) {
        if (userDetails.userId === param.userId) {
          return {
            ...userDetails,
            metaData: { ...userDetails.metaData, smartBoost: param.boostInd },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateSmartBoost(state.userDetails, action.payload),
      };
    /**
     * this is for realtime updation of product of loggedin user
     * is product is updated from user drawer then, the user product also get updated
     */
    case types.UPDATE_PROFESSIONALDUCT_SUCCESS:
      console.log(action.payload);
      function updateProduct(userDetails, param) {
        if (userDetails.userId === param.userId) {
          return {
            ...userDetails,
            metaData: {
              ...userDetails.metaData,
              productStatus: param.productStatus,
            },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateProduct(state.userDetails, action.payload),
      };
    /**
     * this is for realtime updation of viewport of loggedin user
     * is viewport is updated from user drawer then, the user viewport status also get updated
     */
    case types.UPDATE_VIEWPORT_SUCCESS:
      console.log(action.payload);
      function updateViewport(userDetails, status) {
        return {
          ...userDetails,
          metaData: { ...userDetails.metaData, viewportStatus: status },
        };
      }
      return {
        ...state,
        userDetails: updateViewport(state.userDetails, action.payload),
      };

    case types.UPDATE_USER_ADDRESS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          address: state.userDetails.address.map((item) => {
            if (item.addressId === action.payload.address.addressId) {
              return action.payload.address;
            } else {
              return item;
            }
          }),
        },
      };

    case types.UPDATE_LEGAL_SUCCESS:
      console.log(action.payload);
      function updateLegal(userDetails, param) {
        ////debugger;
        if (userDetails.organizationId === param.organizationId) {
          return {
            ...userDetails,
            metaData: { ...userDetails.metaData, legalInd: param.legalInd },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateLegal(state.userDetails, action.payload),
      };

    case types.UPDATE_FINANCE_SUCCESS:
      console.log(action.payload);
      function updateFinance(userDetails, param) {
        if (userDetails.organizationId === param.organizationId) {
          return {
            ...userDetails,
            metaData: { ...userDetails.metaData, financeInd: param.financeInd },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateFinance(state.userDetails, action.payload),
      };
    case types.UPDATE_RISKMANAGEMENT_SUCCESS:
      console.log(action.payload);
      function updateRisk(userDetails, param) {
        if (userDetails.organizationId === param.organizationId) {
          return {
            ...userDetails,
            metaData: {
              ...userDetails.metaData,
              riskManagementInd: param.riskManagementInd,
            },
          };
        } else {
          return userDetails;
        }
      }
      return {
        ...state,
        userDetails: updateRisk(state.userDetails, action.payload),
      };

    case types.UPDATE_USER_BY_ID_REQUEST:
      return { ...state, updatingUserById: true };
    case types.UPDATE_USER_BY_ID_SUCCESS:
      return {
        ...state, updatingUserById: false,
        userDetails: action.payload
      };
    case types.UPDATE_USER_BY_ID_FAILURE:
      return { ...state, updatingUserById: false, updatingUserByIdError: true };

    /**
     * topic of intrest of an user
     */


    case types.HANDLE_UPDATE_ORGANIZATION_MODAL:
      return { ...state, updateOrganizationModal: action.payload };
    case types.GET_TOPICS_BY_USER_ID_REQUEST:
      return { ...state, fetchingTopicsByUserId: true };
    case types.GET_TOPICS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingTopicsByUserId: false,
        topicsByUserId: action.payload,
      };
    case types.GET_TOPICS_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingTopicsByUserId: false,
        fetchingTopicsByUserIdError: true,
      };

    case types.ADD_TOPIC_BY_USER_ID_REQUEST:
      return { ...state, addingTopicByUserId: true };
    case types.ADD_TOPIC_BY_USER_ID_SUCCESS:
      return {
        ...state,
        addingTopicByUserId: false,
        topicsByUserId: [...state.topicsByUserId, action.payload],
      };
    case types.ADD_TOPIC_BY_USER_ID_FAILURE:
      return {
        ...state,
        addingTopicByUserId: false,
        addingTopicByUserIdError: true,
      };

    case types.DELETE_TOPIC_BY_USER_ID_REQUEST:
      return { ...state, deletingTopicByUserId: true };
    case types.DELETE_TOPIC_BY_USER_ID_SUCCESS:
      return { ...state, deletingTopicByUserId: false };
    case types.DELETE_TOPIC_BY_USER_ID_FAILURE:
      return {
        ...state,
        deletingTopicByUserId: false,
        deletingTopicByUserIdError: true,
      };

    /**
     * get calls list by userId
     */
    case types.GET_CALLS_LIST_BY_USER_ID_REQUEST:
      return { ...state, fetchingCallsListByUserId: true };
    case types.GET_CALLS_LIST_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingCallsListByUserId: false,
        callsListByUserId: action.payload,
      };
    case types.GET_CALLS_LIST_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingCallsListByUserId: false,
        fetchingCallsListByUserIdError: true,
      };

    /**
     * get events list by userId
     */
    case types.GET_EVENTS_LIST_BY_USER_ID_REQUEST:
      return { ...state, fetchingEventsListByUserId: true };
    case types.GET_EVENTS_LIST_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingEventsListByUserId: false,
        eventsListByUserId: action.payload,
      };
    case types.GET_EVENTS_LIST_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingEventsListByUserId: false,
        fetchingEventsListByUserIdError: true,
      };

    //GET LEAVES DETAILS
    case types.GET_LEAVES_BY_USER_ID_REQUEST:
      return { ...state, fetchingLeavesByUserId: true };
    case types.GET_LEAVES_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingLeavesByUserId: false,
        leavesListByUserId: action.payload,
      };
    case types.GET_LEAVES_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingLeavesByUserId: false,
        fetchingLeavesByUserIdError: true,
      };
    /**
     * get tasks list by userId
     */
    case types.GET_TASKS_LIST_BY_USER_ID_REQUEST:
      return { ...state, fetchingTasksListByUserId: true };
    case types.GET_TASKS_LIST_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingTasksListByUserId: false,
        tasksListByUserId: action.payload,
      };
    case types.GET_TASKS_LIST_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingTasksListByUserId: false,
        fetchingTasksListByUserIdError: true,
      };
    //signature organization
    case types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST:
      return {
        ...state,
        addingOrgSignature: true,
      };
    case types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        addingOrgSignature: false,

        orgSignatureData: action.payload,
      };
    case types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        addingOrgSignature: false,
        addingOrgSignatureError: true,
      };

    case types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST:
      return {
        ...state,
        fetchingOrgSignature: true,
        fetchingOrgSignatureError: false,
      };
    case types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS:
      return {
        ...state,
        fetchingOrgSignature: false,
        fetchingOrgSignatureError: false,
        orgSignatureData: action.payload,
      };
    case types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE:
      return {
        ...state,
        fetchingOrgSignature: false,
        fetchingOrgSignatureError: true,
      };
    //signature

    case types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST:
      return {
        ...state,
        addingPersonalSignature: true,
      };
    case types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        addingPersonalSignature: false,

        personalSignatureData: action.payload,
      };
    case types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE:
      return {
        ...state,
        addingPersonalSignature: false,
        addingPersonalSignatureError: true,
      };

    case types.GET_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST:
      return {
        ...state,
        fetchingPersonalSignature: true,
        fetchingPersonalSignatureError: false,
      };
    case types.GET_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingPersonalSignature: false,
        fetchingPersonalSignatureError: false,
        personalSignatureData: action.payload,
      };
    case types.GET_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingPersonalSignature: false,
        fetchingPersonalSignatureError: true,
      };

    case types.UPDATE_RECRUITMENT_ADVANCE_SUCCESS:
      console.log(action.payload);
      function recruitAdvance(userDetails, status) {
        return {
          ...userDetails,
          metaData: { ...userDetails.metaData, advanceRecruitInd: status },
        };
      }
      return {
        ...state,
        userDetails: recruitAdvance(state.userDetails, action.payload),
      };

    case types.GENERATE_OTP_BY_EMAIL_REQUEST:
      return { ...state, generatingOtpByEmail: true };
    case types.GENERATE_OTP_BY_EMAIL_SUCCESS:
      return {
        ...state,
        generatingOtpByEmail: false,
        otpMsg: action.payload
      };
    case types.GENERATE_OTP_BY_EMAIL_FAILURE:
      return {
        ...state,
        generatingOtpByEmail: false,
        generatingOtpByEmailError: true
      };



    case types.ADD_ORGANIZATION_DOCUMENT_REQUEST:
      return { ...state, addingOrganizationDocument: true };
    case types.ADD_ORGANIZATION_DOCUMENT_SUCCESS:
      return {
        ...state,
        addingOrganizationDocument: false,
        // updateOrganizationModal: false,
        organizationDocumentDrawer: false,
        repositoryData: [
          action.payload,
          ...state.repositoryData,
         ],

      };
    case types.ADD_ORGANIZATION_DOCUMENT_FAILURE:
      return {
        ...state, addingOrganizationDocument: false,
        // addCustomerModal: false 
      };

    case types.VALIDATE_OTP_BY_EMAIL_REQUEST:
      return { ...state, validatingOtpByEmail: true };
    case types.VALIDATE_OTP_BY_EMAIL_SUCCESS:
      return {
        ...state,
        validatingOtpByEmail: false,
        validateMsg: action.payload
      };
    case types.VALIDATE_OTP_BY_EMAIL_FAILURE:
      return {
        ...state,
        validatingOtpByEmail: false,
        validatingOtpByEmailError: true
      };

    case types.EDIT_ORGANIZATION_DETAILS_REQUEST:
      return { ...state, editingOrganizationDetails: true };
    case types.EDIT_ORGANIZATION_DETAILS_SUCCESS:
      return {
        ...state,
        editingOrganizationDetails: false,
        organizationDetails: action.payload,
        userDetails: {
          ...state.userDetails,
          metaData: {
            ...state.userDetails.metaData,
            organizationDetails: action.payload,
          },
        },
      };
    case types.EDIT_ORGANIZATION_DETAILS_FAILURE:
      return {
        ...state,
        editingOrganizationDetails: false,
        editingOrganizationDetailsError: true,
      };

    case types.GET_REPOSITORY_DOCUMENTS_REQUEST:
      return { ...state, fetchingRepositoryDocuments: true };
    case types.GET_REPOSITORY_DOCUMENTS_SUCCESS:
      return {
        ...state,
        fetchingRepositoryDocuments: false,
        repositoryData: action.payload,
      };
    case types.GET_REPOSITORY_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingRepositoryDocuments: false,
        fetchingRepositoryDocumentsError: true,
      };

    case types.HANDLE_REPOSITORY_ORGANIZATION_MODAL:
      return { ...state, repositoryOrganizationModal: action.payload };

    case types.HANDLE_ORGANIZATION_DOCUMENT_DRAWER:
      return { ...state, organizationDocumentDrawer: action.payload };

      case types.HANDLE_REPOSITORY_DOCUMENT_DRAWER_MODAL:
        return { ...state, addDrawerRepositoryDocumentModal: action.payload };

    case types.DELETE_ORG_DOC_DATA_REQUEST:
      return { ...state, deletingOrgDocData: true };
    case types.DELETE_ORG_DOC_DATA_SUCCESS:
      return {
        ...state,
        deletingOrgDocData: false,
        repositoryData: state.repositoryData.filter(
          (item) => item.documentId !== action.payload
        ),
      };
    case types.DELETE_ORG_DOC_DATA_FAILURE:
      return { ...state, deletingOrgDocData: false, deletingOrgDocDataError: false };


    case types.LINK_ORG_DOC_PUBLISH_REQUEST:
      return {
        ...state,
        linkingOrgDocsPublish: true,
      };
    case types.LINK_ORG_DOC_PUBLISH_SUCCESS:
      return {
        ...state,
        linkingOrgDocsPublish: false,
        repositoryData: state.repositoryData.map((item) => {
          if (
            item.documentId === action.payload.documentId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_ORG_DOC_PUBLISH_FAILURE:
      return {
        ...state,
        linkingOrgDocsPublish: false,
        linkingOrgDocsPublishError: true,
      };


    case types.LINK_ORG_DOC_PRIVATE_REQUEST:
      return {
        ...state,
        linkingOrgDocsPrivate: true,
      };
    case types.LINK_ORG_DOC_PRIVATE_SUCCESS:
      return {
        ...state,
        linkingOrgDocsPrivate: false,
        repositoryData: state.repositoryData.map((item) => {
          if (
            item.documentId === action.payload.documentId
          ) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.LINK_ORG_DOC_PRIVATE_FAILURE:
      return {
        ...state,
        linkingOrgDocsPrivate: false,
        linkingOrgDocsPrivateError: true,
      };
    case types.ADD_ONBOARD_REQUEST:
      return { ...state, addingOnboard: true };
    case types.ADD_ONBOARD_SUCCESS:
      return {
        ...state,
        addingOnboard: false,
        token: action.payload.token || sessionStorage.getItem("token"),
      };
    case types.ADD_ONBOARD_FAILURE:
      return { ...state, addingOnboard: false, addingOnboardError: true };

    case types.SET_ORGANIZATION_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.HANDLE_ORGANIZATION_MODAL:
      return { ...state, addOrganizationModal: action.payload };


    case types.ADD_ORGANIZATION_REQUEST:
      return { ...state, addingOrganization: true };
    case types.ADD_ORGANIZATION_SUCCESS:
      return {
        ...state,
        addingOrganization: false,
        addOrganizationModal: false,
        organizationDetailsList: [action.payload, ...state.organizationDetailsList]
      };
    case types.ADD_ORGANIZATION_FAILURE:
      return { ...state, addingOrganization: false, addOrganizationModal: false };

    case types.GET_ORGANIZATION_REQUEST:
      return { ...state, fetchingOrganization: true };
    case types.GET_ORGANIZATION_SUCCESS:
      return {
        ...state,
        fetchingOrganization: false,
        // customerByUserId: action.payload,
        organizationDetailsList: action.payload,

        // organizationDetailsList: [
        //   ...state.organizationDetailsList,
        //   ...action.payload],

      };
    case types.GET_ORGANIZATION_FAILURE:
      return {
        ...state,
        fetchingOrganization: false,
        fetchingOrganizationError: true,
      };


    case types.GET_ACTION_REQUIRED_COUNT_REQUEST:
      return { ...state, fetchingActionRequiredCount: true };
    case types.GET_ACTION_REQUIRED_COUNT_SUCCESS:
      return { ...state, fetchingActionRequiredCount: false, actionCount: action.payload };
    case types.GET_ACTION_REQUIRED_COUNT_FAILURE:
      return {
        ...state,
        fetchingActionRequiredCount: false,
        fetchingActionRequiredCountError: true,
      };


    case types.GET_OPPORTUNITY_INCLUDED_COUNT_REQUEST:
      return { ...state, fetchingOpportunityIncludedCount: true };
    case types.GET_OPPORTUNITY_INCLUDED_COUNT_SUCCESS:
      return { ...state, fetchingOpportunityIncludedCount: false, oppIncludedCount: action.payload };
    case types.GET_OPPORTUNITY_INCLUDED_COUNT_FAILURE:
      return {
        ...state,
        fetchingOpportunityIncludedCount: false,
        fetchingOpportunityIncludedCountError: true,
      };
    case types.HANDLE_ACTION_DRAWER_MODAL:
      return { ...state, addDrawerActionModal: action.payload };


    case types.UPDATE_PREFERED_LANG_REQUEST:
      return { ...state, updatingPreferedLang: true };
    case types.UPDATE_PREFERED_LANG_SUCCESS:
      return {
        ...state, updatingPreferedLang: false,
        userDetails: action.payload || JSON.parse(sessionStorage.getItem("userDetails")),
      };
    case types.UPDATE_PREFERED_LANG_FAILURE:
      return { ...state, updatingPreferedLang: false, updatingPreferedLangError: true };


    case types.GET_INCLUDED_OPPORTUNITY_REQUEST:
      return { ...state, fetchingIncludedOpportunity: true };
    case types.GET_INCLUDED_OPPORTUNITY_SUCCESS:
      return {
        ...state,
        fetchingIncludedOpportunity: false,
        // opportunityByUserId: action.payload,

        opportunityIncluded: [
          ...state.opportunityIncluded,
          ...action.payload],
      };
    case types.GET_INCLUDED_OPPORTUNITY_FAILURE:
      return {
        ...state,
        fetchingIncludedOpportunity: false,
        fetchingIncludedOpportunityError: true,
      };

    case types.EMPTY_INCLUDED_OPPORTUNITY_LIST:
      return { ...state, opportunityIncluded: [] };


    case types.GET_DEALS_INCLUDED_COUNT_REQUEST:
      return { ...state, fetchingDealsIncludedCount: true };
    case types.GET_DEALS_INCLUDED_COUNT_SUCCESS:
      return { ...state, fetchingDealsIncludedCount: false, dealsIncludedCount: action.payload };
    case types.GET_DEALS_INCLUDED_COUNT_FAILURE:
      return {
        ...state,
        fetchingDealsIncludedCount: false,
        fetchingDealsIncludedCountError: true,
      };


    case types.GET_TASK_INCLUDED_COUNT_REQUEST:
      return { ...state, fetchingTaskIncludedCount: true };
    case types.GET_TASK_INCLUDED_COUNT_SUCCESS:
      return { ...state, fetchingTaskIncludedCount: false, taskIncludedCount: action.payload };
    case types.GET_TASK_INCLUDED_COUNT_FAILURE:
      return {
        ...state,
        fetchingTaskIncludedCount: false,
        fetchingTaskIncludedCountError: true,
      };

    case types.GET_INCLUDED_DEALS_REQUEST:
      return { ...state, fetchingIncludedDeals: true };
    case types.GET_INCLUDED_DEALS_SUCCESS:
      return {
        ...state,
        fetchingIncludedDeals: false,
        // opportunityByUserId: action.payload,

        dealsIncluded: [
          ...state.dealsIncluded,
          ...action.payload],
      };
    case types.GET_INCLUDED_DEALS_FAILURE:
      return {
        ...state,
        fetchingIncludedDeals: false,
        fetchingIncludedDealsError: true,
      };


    case types.EMPTY_INCLUDED_DEALS_LIST:
      return { ...state, dealsIncluded: [] };

    case types.EMPTY_INCLUDED_TASK_LIST:
      return { ...state, taskIncluded: [] };




    case types.GET_INCLUDED_TASK_REQUEST:
      return { ...state, fetchingIncludedTask: true };
    case types.GET_INCLUDED_TASK_SUCCESS:
      return {
        ...state,
        fetchingIncludedTask: false,
        // opportunityByUserId: action.payload,

        taskIncluded: [
          ...state.taskIncluded,
          ...action.payload],
      };
    case types.GET_INCLUDED_TASK_FAILURE:
      return {
        ...state,
        fetchingIncludedTask: false,
        fetchingIncludedTaskError: true,
      };

    case types.GET_ALL_DIAL_CODE_LIST_REQUEST:
      return { ...state, fetchingAllDialCode: true };
    case types.GET_ALL_DIAL_CODE_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllDialCode: false,
        dialcodeList: action.payload,
      };
    case types.GET_ALL_DIAL_CODE_LIST_FAILURE:
      return {
        ...state,
        fetchingAllDialCode: false,
        fetchingAllDialCodeError: true,
      };

    case types.HANDLE_FAQ_MODAL:
      return { ...state, faqModal: action.payload };

    case types.VERIFY_EMAIL_REQUEST:
      return { ...state, verifyingEmail: true };
    case types.VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        verifyingEmail: false,
      };
    case types.VERIFY_EMAIL_FAILURE:
      return {
        ...state,
        verifyingEmail: false,
        verifyingEmailError: true,
      };

    case types.VALIDATE_OTP_REQUEST:
      return { ...state, validatingOtp: true };
    case types.VALIDATE_OTP_SUCCESS:
      return {
        ...state,
        validatingOtp: false,
        validOtp: action.payload
      };
    case types.VALIDATE_OTP_FAILURE:
      return {
        ...state,
        validatingOtp: false,
        validatingOtpError: true,
      };

    case types.FORGOT_PASSWORD_REQUEST:
      return { ...state, doResetpassword: true };
    case types.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        doResetpassword: false,
        doResetpasswordError: false,
      };
    case types.FORGOT_PASSWORD_FAILURE:



    case types.UPDATE_REPOSITORY_DOCUMENT_REQUEST:
      return { ...state, updateRepositoryDocument: true };
    case types.UPDATE_REPOSITORY_DOCUMENT_SUCCESS:
      return {
        ...state,
        updateRepositoryDocument: false,
        addDrawerRepositoryDocumentModal: false,
      
        repositoryData: state.repositoryData.map((item) => {
          if (item.organizationDocumentLinkId === action.payload.organizationDocumentLinkId) {
            return action.payload;
          } else {
            return item;
          }
        }),
       
      };
    case types.UPDATE_REPOSITORY_DOCUMENT_FAILURE:
      return {
        ...state,
        updateRepositoryDocument: false,
        updateRepositoryDocumentError: true,
      };

      case types.GET_INVESTOR_CURRENCY_REQUEST:
        return { ...state, fetchingInvestorCurrency: true };
      case types.GET_INVESTOR_CURRENCY_SUCCESS:
        return { ...state, fetchingInvestorCurrency: false, investorCurrencies: action.payload };
      case types.GET_INVESTOR_CURRENCY_FAILURE:
        return {
          ...state,
          fetchingInvestorCurrency: false,
          fetchingInvestorCurrencyError: true,
  
        };




    default:
      return state;
  }
  return state;
};
