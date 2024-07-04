import * as types from "./AccessmentActionTypes";
import dayjs from "dayjs"; 
const initialState = {
  viewType: "table",

  addAccessmentModal:false,

  addingAssessment: false,
  addingAssessmentError: false,

  fetchingAssessment: false,
  fetchingAssessmentError: false,
  assessment:[],


  creatingAccessmentQues:false,
  creatingAccessmentQuesError:false,

  fetchingAssessmentInputSearchData: false,
  assessmentName: [],
  
  fetchingRecordsByUserId: false,
  fetchingRecordsByUserIdError: false,
  recordData:{},
  fetchingAssessmentById: false,
  fetchingAssessmentByIdError: false,
  assessmentByAssessmentId:{},

  updatingPublishIndicator: false,
  updatingPublishIndicatorError: false,

  fetchingQuestionsList: false,
  fetchingQuestionsListError: false,
  questionsList:[],

  addingQuestions: false,
  addingQuestionsError: false,

  addQuestionModal:false,

  updateAssessmentModal:false,

  fetchingAccessQues:false,
  fetchingAccessQuesError:false,
  accesQues:[],

  updatingAssessmentById: false,
  updatingAssessmentByIdError: false,

  setEditingAssessment:{},

  deleteQuestionByQuestionId: false,
  deleteQuestionByQuestionIdError: false,

  updatingQuestionByQuestionId: false,
  updatingQuestionByQuestionIdError: false,

  FinalizingQuestions: false,
  FinalizingQuestionsError: false,

  fetchingFinalQstn: false,
  fetchingFinalQstnError: false,
  finalQuestions:[],

};
export const accessmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_ASSESSMENT_EDIT:
        return { ...state, setEditingAssessment: action.payload };
      case types.HANDLE_QUESTION_MODAL:
        return { ...state, addQuestionModal: action.payload };

        case types.HANDLE_UPDATE_ASSESSMENT_MODAL:
          return { ...state, updateAssessmentModal: action.payload };

  case types.SET_ACCESSMENT_VIEW_TYPE:
return { ...state, viewType: action.payload };

case types.HANDLE_ACCESSMENT_MODAL:
      return { ...state, addAccessmentModal: action.payload };

      case types.ADD_ASSESSMENT_DETAILS_REQUEST:
        return { ...state, addingAssessment: true };
      case types.ADD_ASSESSMENT_DETAILS_SUCCESS:
        return {
          ...state,
          addingAssessment: false,
          assessment:[action.payload,...state.assessment]
        };
      case types.ADD_ASSESSMENT_DETAILS_FAILURE:
        return {
          ...state,
          addingAssessment: false,
          addingAssessmentError: false,
        };

      case types.GET_ASSESSMENT_DETAILS_REQUEST:
        return { ...state, fetchingAssessment: true };
      case types.GET_ASSESSMENT_DETAILS_SUCCESS:
        return {
          ...state,
          fetchingAssessment: false,
          updateAssessmentModal:false,
          assessment: [...state.assessment, ...action.payload],
        };
      case types.GET_ASSESSMENT_DETAILS_FAILURE:
        return {
          ...state,
          fetchingAssessment: false,
          updateAssessmentModal:false,
          fetchingAssessmentError: true,
        };



        case types.GET_ACCESSMENT_QUES_REQUEST:
          return { ...state, fetchingAccessQues: true };
        case types.GET_ACCESSMENT_QUES_SUCCESS:
          return {
            ...state,
            fetchingAccessQues: false,
            accesQues: action.payload,
          };
        case types.GET_ACCESSMENT_QUES_FAILURE:
          return {
            ...state,
            fetchingAccessQues: false,
            fetchingAccessQuesError: true,
          };
        




        case types.CREATE_ACCESSMENT_QUES_REQUEST:
          return { ...state, creatingAccessmentQues: true };
        case types.CREATE_ACCESSMENT_QUES_SUCCESS:
          return {
            ...state,
            creatingAccessmentQues: false,
            accesQues:[action.payload,...state.accesQues]

          };
        case types.CREATE_ACCESSMENT_QUES_FAILURE:
          return {
            ...state,
            creatingAccessmentQues: false,
            creatingAccessmentQuesError: true,

          };
  
        case types.GET_RECORDS_REQUEST:
      return { ...state, fetchingRecordsByUserId: true };
    case types.GET_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        recordData: action.payload,
      };
    case types.GET_RECORDS_FAILURE:
      return {
        ...state,
        fetchingRecordsByUserId: false,
        fetchingRecordsByUserIdError: true,
      };

//SEARCH
case types.INPUT_ASSESSMENT_SEARCH_DATA_REQUEST:
  return { ...state, fetchingAssessmentInputSearchData: true };
case types.INPUT_ASSESSMENT_SEARCH_DATA_SUCCESS:
  return {
    ...state,
    fetchingAssessmentInputSearchData: false,
    assessmentName: action.payload,
    // serachedData: action.payload,
  };
case types.INPUT_ASSESSMENT_SEARCH_DATA_FAILURE:
  return { ...state, 
    fetchingAssessmentInputSearchDataError: true };

    case types.GET_ASSESSMENT_BY_ID_REQUEST:
      return { ...state, fetchingAssessmentById: true };
    case types.GET_ASSESSMENT_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingAssessmentById: false,
       assessmentByAssessmentId: action.payload,
      };
    case types.GET_ASSESSMENT_BY_ID_FAILURE:
      return {
        ...state,
        fetchingAssessmentById: false,
        fetchingAssessmentByIdError: true,
      };

      case types.UPDATE_PUBLISH_IND_REQUEST:
        return {
          ...state,
         updatingPublishIndicator: true,
        };
      case types.UPDATE_PUBLISH_IND_SUCCESS:
        return {
          ...state,
         updatingPublishIndicator: false,
         assessment: state.assessment.filter(
          (item) => item.assessmentId !== action.payload.assessmentId
        ),       
        };
      case types.UPDATE_PUBLISH_IND_FAILURE:
        return {
          ...state,
         updatingPublishIndicator: false,
         updatingPublishIndicatorError: true,
        };

        //questions Add
        case types.ADD_QUESTION_DETAILS_REQUEST:
          return { ...state, addingQuestions: true };
        case types.ADD_QUESTION_DETAILS_SUCCESS:
          return {
            ...state,
            addingQuestions: false,
          };
        case types.ADD_QUESTION_DETAILS_FAILURE:
          return {
            ...state,
            addingQuestions: false,
            addingQuestionsError: false,
          };
  //get questions
        case types.GET_QUESTION_LIST_BY_ID_REQUEST:
          return { ...state, fetchingQuestionsList: true };
        case types.GET_QUESTION_LIST_BY_ID_SUCCESS:
          return {
            ...state,
            fetchingQuestionsList: false,
            addQuestionModal:false,
            questionsList: action.payload,
          };
        case types.GET_QUESTION_LIST_BY_ID_FAILURE:
          return {
            ...state,
            fetchingQuestionsList: false,
            addQuestionModal:false,
            fetchingQuestionsListError: true,
          };
          case types.UPDATE_ASSESSMENT_BY_ID_REQUEST:
            return {
              ...state,
             updatingAssessmentById: true,
            };
          case types.UPDATE_ASSESSMENT_BY_ID_SUCCESS:
            return {
              ...state,
              updatingAssessmentById: false,
             assessment: state.assessment.filter(
              (item) => item.assessmentId !== action.payload.assessmentId
            ),       
            };
          case types.UPDATE_ASSESSMENT_BY_ID_FAILURE:
            return {
              ...state,
             updatingAssessmentById: false,
             updatingAssessmentByIdError: true,
            };

            case types.DELETE_ASSESSMENT_ID_REQUEST:
      return { ...state, deleteQuestionByQuestionId: true };
    case types.DELETE_ASSESSMENT_ID_SUCCESS:
      return {
        ...state,
        deleteQuestionByQuestionId: false,
        questionsList: state.questionsList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case types.DELETE_ASSESSMENT_ID_FAILURE:
      return {
        ...state,
        deleteQuestionByQuestionId: false,
        deleteQuestionByQuestionIdError: true,};
        
        case types.UPDATE_QUESTION_BY_ID_REQUEST:
          return {
            ...state,
           updatingQuestionByQuestionId: true,
          };
        case types.UPDATE_QUESTION_BY_ID_SUCCESS:
          return {
            ...state,
            updatingQuestionByQuestionId: false,
           questionsList: state.questionsList.filter(
            (item) => item.id !== action.payload.id
          ),       
          };
        case types.UPDATE_QUESTION_BY_ID_FAILURE:
          return {
            ...state,
           updatingQuestionByQuestionId: false,
           updatingQuestionByQuestionIdError: true,
          };

          case types.FINALIZE_QUESTION_REQUEST:
            return { ...state, FinalizingQuestions: true };
          case types.FINALIZE_QUESTION_SUCCESS:
            return {
              ...state,
              FinalizingQuestions: false,
            };
          case types.FINALIZE_QUESTION_FAILURE:
            return {
              ...state,
              FinalizingQuestions: false,
              FinalizingQuestionsError: true,
            };
            
            case types.GET_FINAL_QUESTIONS_REQUEST:
              return { ...state, fetchingFinalQstn: true };
            case types.GET_FINAL_QUESTIONS_SUCCESS:
              return {
                ...state,
                fetchingFinalQstn: false,
                // addQuestionModal:false,
                finalQuestions: action.payload,
              };
            case types.GET_FINAL_QUESTIONS_FAILURE:
              return {
                ...state,
                fetchingFinalQstn: false,
                // addQuestionModal:false,
                fetchingFinalQstnError: true,
              };
default:
return state;
}
};