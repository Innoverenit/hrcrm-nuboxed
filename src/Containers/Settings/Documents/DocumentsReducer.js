import * as types from "./DocumentsActionTypes";
import dayjs from "dayjs";

const initialState = {
  fetchingDocuments: false,
  fetchingDocumentsError: false,
  documents: [],


  fetchingAllDocuments: false,
  fetchingAllDocumentsError: false,
  allDocuments: [],

  addingDocumentToggle: false,
  addingDocumentToggleError: false,

  addingTypeToggle: false,
  addingTypeToggleError: false,

  fetchingDocumentCount: false,
  fetchingDocumentCountError: false,
  documentCount:{},


  addingWorkflowDocumentToggle:false,
  addingWorkflowDocumentToggleError:false,

  addingDocuments: false,
  addingDocumentsError: false,

  removingDocuments: false,
  removingDocumentsError: false,

  updatingDocuments: false,
  updatingDocumentsError: false,

  fetchingDocumentSearchData:false,
  fetchingDocumentSearchDataError:false,
};

export const documentsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * get the list of all documents
     */
    case types.GET_DOCUMENTS_REQUEST:
      return { ...state, fetchingDocuments: true };
    case types.GET_DOCUMENTS_SUCCESS:
      return { ...state, fetchingDocuments: false, documents: action.payload };
    case types.GET_DOCUMENTS_FAILURE:
      return {
        ...state,
        fetchingDocuments: false,
        fetchingDocumentsError: true,
      };

    /**
     * add a new document
     */
    case types.ADD_DOCUMENTS_REQUEST:
      return { ...state, addingDocuments: true };
    case types.ADD_DOCUMENTS_SUCCESS:
      return {
        ...state,
        addingDocuments: false,
        documents:[action.payload,...state.documents],
        // documents: [...state.documents, action.payload],
      };
    case types.ADD_DOCUMENTS_FAILURE:
      return { ...state, addingDocuments: false, addingDocumentsError: true };

    /**
     * remove an existing document
     */
    case types.REMOVE_DOCUMENTS_REQUEST:
      return { ...state, removingDocuments: true };
    case types.REMOVE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        removingDocuments: false,
        documents: state.documents.filter(
          (item) => item.documentTypeId !== action.payload
      ),
      };
    case types.REMOVE_DOCUMENTS_FAILURE:
      return {
        ...state,
        removingDocuments: false,
        removingDocumentsError: true,
      };

    /**
     * update an existing document
     */
    case types.UPDATE_DOCUMENTS_REQUEST:
      return { ...state, updatingDocuments: true };
    case types.UPDATE_DOCUMENTS_SUCCESS:
      // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
      return {
        ...state,
        updatingDocuments: false,
        documents: state.documents.map((document) =>
          document.documentTypeId === action.payload.documentTypeId
            ? action.payload
            : document
        ),
      };
    case types.UPDATE_DOCUMENTS_FAILURE:
      return {
        ...state,
        updatingDocuments: false,
        updatingDocumentsError: true,
      };
      
      case types.GET_DOCUMENT_SEARCH_REQUEST:
        return { ...state, fetchingDocumentSearchData: true };
      case types.GET_DOCUMENT_SEARCH_SUCCESS:
        return {
          ...state,
          fetchingDocumentSearchData: false,
          documents: action.payload,
        };
      case types.GET_DOCUMENT_SEARCH_FAILURE:
        return { ...state, fetchingDocumentSearchDataError: true };

        case types.LINK_DOCUMENT_TOGGLE_REQUEST:
          return { ...state, addingDocumentToggle: true };
        case types.LINK_DOCUMENT_TOGGLE_SUCCESS:
          return {
            ...state,
            addingDocumentToggle: false,
            documents: state.documents.map((item) => {
              if (item.documentTypeId === action.payload.documentTypeId) {
                return action.payload;
              } else {
                return item;
              }
            }),
          };
        case types.LINK_DOCUMENT_TOGGLE_FAILURE:
          return {
            ...state,
            addingDocumentToggle: false,
            addingDocumentToggleError: true,
          };



          case types.LINK_WORKFLOW_DOCUMENT_TOGGLE_REQUEST:
            return { ...state, addingWorkflowDocumentToggle: true };
          case types.LINK_WORKFLOW_DOCUMENT_TOGGLE_SUCCESS:
            return {
              ...state,
              addingWorkflowDocumentToggle: false,
              allDocuments: state.allDocuments.map((item) => {
                if (item.documentTypeId === action.payload.documentTypeId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.LINK_WORKFLOW_DOCUMENT_TOGGLE_FAILURE:
            return {
              ...state,
              addingWorkflowDocumentToggle: false,
              addingWorkflowDocumentToggleError: true,
            };


          case types.GET_ALL_DOCUMENTS_TYPE_REQUEST:
            return { ...state, fetchingAllDocuments: true };
          case types.GET_ALL_DOCUMENTS_TYPE_SUCCESS:
            return { ...state, fetchingAllDocuments: false, allDocuments: action.payload };
          case types.GET_ALL_DOCUMENTS_TYPE_FAILURE:
            return {
              ...state,
              fetchingAllDocuments: false,
              fetchingAllDocumentsError: true,
            };

            case types.LINK_TYPE_TOGGLE_REQUEST:
              return { ...state, addingTypeToggle: true };
            case types.LINK_TYPE_TOGGLE_SUCCESS:
              return {
                ...state,
                addingTypeToggle: false,
                documents: state.documents.map((item) => {
                  if (item.documentTypeId === action.payload.documentTypeId) {
                    return action.payload;
                  } else {
                    return item;
                  }
                }),
              };
            case types.LINK_TYPE_TOGGLE_FAILURE:
              return {
                ...state,
                addingTypeToggle: false,
             addingTypeToggleError: true,
              };

              case types.HANDLE_CLAER_REDUCER_DATA_DOCUMENT:
                return { ...state, 
                  documents: [], 
                  // deletedTruck: [] 
                };


                case types.GET_DOCUMENT_COUNT_REQUEST:
                  return { ...state, fetchingDocumentCount: true };
                case types.GET_DOCUMENT_COUNT_SUCCESS:
                  return { ...state, fetchingDocumentCount: false, 
                    documentCount: action.payload };
                case types.GET_DOCUMENT_COUNT_FAILURE:
                  return {
                    ...state,
                    fetchingDocumentCount: false,
                    fetchingDocumentCountError: true,
                  };
      

    default:
      return state;
  }
};
