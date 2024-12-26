import * as types from "./RequirementActionTypes";
import dayjs from "dayjs";

const initialState = {

    type : null,
    viewType: "card",

    fetchingRequirementRecord: false,
  fetchingRequirementRecordError: false,
  requirementRecord:{},

  fetchingRequirementOrg: false,
  fetchingRequirementOrgError: false,
  requirementOrg:[],


  updateRecruiterData:false,
  updateRecruiterDataError:false,

  linkingNwRecruitToOpportunity: false,
  linkingNwRecruitToOpportunityError: false,

  addRecruiterModal: false,

  addNwRecruitModal:false,

  fetchingAllRequirementTable:false,
  fetchingAllRequirementTableError:false,
  requirementTable:[],


  fetchingCandidateRecruit:false,
  fetchingCandidateRecruitError:false,
};
export const requirementReducer = (state = initialState, action) => {
  switch (action.type) {
    
 case types.SET_REQUIREMENT_VIEW_TYPE:
    return { ...state, viewType: action.payload };

        case types.HANDLE_RECRUITER_MODAL:
          return { ...state, addRecruiterModal: action.payload };

   
   
      case types.GET_REQUIREMENT_RECORD_REQUEST:
        return { ...state, fetchingRequirementRecord: true };
      case types.GET_REQUIREMENT_RECORD_SUCCESS:
        return { ...state, fetchingRequirementRecord: false,
           requirementRecord: action.payload };
      case types.GET_REQUIREMENT_RECORD_FAILURE:
        return {
          ...state,
          fetchingRequirementRecord: false,
          fetchingRequirementRecordError: true,
        }; 

        case types.GET_REQUIREMENT_ORG_REQUEST:
          return { ...state, fetchingRequirementOrg: true };
        case types.GET_REQUIREMENT_ORG_SUCCESS:
          return { ...state, fetchingRequirementOrg: false,
             requirementOrg: action.payload };
        case types.GET_REQUIREMENT_ORG_FAILURE:
          return {
            ...state,
            fetchingRequirementOrg: false,
            fetchingRequirementOrgError: true,
          }; 

        case types. GET_ALL_REQUIREMENT_TABLE_REQUEST:
          return {
            ...state,
            fetchingAllRequirementTable: true,
          };
        case types. GET_ALL_REQUIREMENT_TABLE_SUCCESS:
          return {
            ...state,
            fetchingAllRequirementTable: false,
            // requirementTable: action.payload,
            requirementTable: [...state.requirementTable, ...action.payload],
          };
        case types. GET_ALL_REQUIREMENT_TABLE_FAILURE:
          return {
            ...state,
            fetchingAllRequirementTable: false,
            fetchingAllRequirementTableError: true,
          };

 case types.UPDATE_RECRUITER_DATA_REQUEST:
      return { ...state, updateRecruiterData: true };
    case types.UPDATE_RECRUITER_DATA_SUCCESS:
      return {
        ...state,
        updateRecruiterData: false,
        // updateOpportunityModal: false,
        // opportunity:action.payload,
       
        requirementTable: state.requirementTable.map((item) => {
          if (item.recruitmentId === action.payload.recruitmentId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_RECRUITER_DATA_FAILURE:
      return {
        ...state,
        updateRecruiterData: false,
        updateRecruiterDataError: true,
      };


             case types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_REQUEST:
                return {
                  ...state,
                  fetchinCandidateRecruit: true,
                };
              case types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_SUCCESS:
                return {
                  ...state,
                  fetchingCandidateRecruit: false,
                  addRecruiterModal: false,
                  requirementTable: state.requirementTable.map((item, i) => {
                    console.log("if", item.recruitmentId);
                    if (item.recruitmentId === action.payload.recruitmentId) {
                      console.log("hello");
                      return action.payload;
                    } else {
                      console.log("hello1");
                      return item;
                    }
                  }),
                  //Delete: actRECRUIT_ion.payload,
                };
              case types.LINK_CANDIDATE_RECRUIT_TO_OPPORTUNITY_FAILURE:
                return {
                  ...state,
                  fetchingCandidateRecruit: false,
                  fetchingCandidateRecruitError: true,
                };
        
          case types.HANDLE_CLAER_REDUCER_DATA_REQUIREMENT:
            return { ...state, 
              requirementTable: [], 
              // deletedTruck: [] 
            };

            case types.HANDLE_NWRECRUIT_MODAL:
              return { ...state, addNwRecruitModal: action.payload };


              case types.LINK_NW_RECRUIT_TO_OPPORTUNITY_REQUEST:
                return {
                  ...state,
                  linkingNwRecruitToOpportunity: true,
                };
              case types.LINK_NW_RECRUIT_TO_OPPORTUNITY_SUCCESS:
                return {
                  ...state,
                  linkingNwRecruitToOpportunity: false,
                  addNwRecruitModal: false,
                  requirementTable: [
                    action.payload,
                    ...state.requirementTable,
                  ],
                };
              case types.LINK_NW_RECRUIT_TO_OPPORTUNITY_FAILURE:
                return {
                  ...state,
                  linkingNwRecruitToOpportunity: false,
                  linkingNwRecruitToOpportunityError: true,
                };   

      default:
        return state;
    }
  };
     