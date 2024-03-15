import * as types from "./ServiceLineActionTypes";
import dayjs from "dayjs";

const initialState = {
  fetchingServiceLine: false,
  fetchingServiceLineError: false,
  serviceLine: [],

  addingServiceLine:false,
  addingServiceLineError:false,

  updatingServiceLine:false,
  updatingServiceLineError:false,


  fetchingServiceLineCount:false,
  fetchingServiceLineCountError:false,
  serviceLineCount:{}


 
  
};

export const serviceLineReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * get the list of all documents
     */
    case types.GET_SERVICELINE_REQUEST:
      return { ...state, fetchingServiceLine: true };
    case types.GET_SERVICELINE_SUCCESS:
      return { ...state, fetchingServiceLine: false, serviceLine: action.payload };
    case types.GET_SERVICELINE_FAILURE:
      return {
        ...state,
        fetchingServiceLine: false,
        fetchingServiceLineError: false,
      };



      case types.ADD_SERVICELINE_REQUEST:
        return { ...state, addingServiceLine: true };
      case types.ADD_SERVICELINE_SUCCESS:
        return {
          ...state,
          addingServiceLine: false,
          serviceLine:[action.payload,...state.serviceLine],
          // documents: [...state.documents, action.payload],
        };
      case types.ADD_SERVICELINE_FAILURE:
        return { ...state, addingServiceLine: false, addingServiceLineError: true };




        case types.UPDATE_SERVICELINK_REQUEST:
            return { ...state, updatingServiceLine: true };
          case types.UPDATE_SERVICELINK_SUCCESS:
            // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
            return {
              ...state,
              updatingServiceLine: false,
              serviceLine: state.serviceLine.map((document) =>
                document.serviceLineId === action.payload.serviceLineId
                  ? action.payload
                  : document
              ),
            };
          case types.UPDATE_SERVICELINK_FAILURE:
            return {
              ...state,
              updatingServiceLine: false,
              updatingServiceLineError: true,
            };



            case types.REMOVE_SERVICELINE_REQUEST:
                return { ...state, removingServiceLine: true };
              case types.REMOVE_SERVICELINE_SUCCESS:
                return {
                  ...state,
                  removingServiceLine: false,
                  serviceLine: state.serviceLine.filter(
                    (item) => item.serviceLineId !== action.payload
                ),
                };
              case types.REMOVE_SERVICELINE_FAILURE:
                return {
                  ...state,
                  removingServiceLine: false,
                  removingServiceLineError: true,
                };




                case types.GET_SERVICE_LINE_COUNT_REQUEST:
                    return { ...state, fetchingServiceLineCount: true };
                  case types.GET_SERVICE_LINE_COUNT_SUCCESS:
                    return { ...state, fetchingServiceLineCount: false, 
                      serviceLineCount: action.payload };
                  case types.GET_SERVICE_LINE_COUNT_FAILURE:
                    return {
                      ...state,
                      fetchingServiceLineCount: false,
                      fetchingServiceLineCountError: true,
                    };

 
        
    

    default:
      return state;
  }
};