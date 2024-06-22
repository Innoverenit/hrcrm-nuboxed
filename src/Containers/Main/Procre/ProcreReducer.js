import * as types from "./ProcreActionTypes";
import moment from "moment";

const initialState = {
  viewType: "card",

  fetchingAllProcure: false,
  fetchingAllProcureError: false,
  allProcure: [],

  fetchingNotesListByProcure: false,
  fetchingNotesListByProcureError: false,
  notesListByPrcure:[],

  procureToAccept: false,
  procureToAcceptError: false,

  addProcureOrderModal: false,

  addDrawerProcureNotesModal:false,

  addingNotesByProcure: false,
  addingNotesByProcureError: false,

  fetchingRecords: false,
  fetchingRecordsError: false,
  recordData: {},

  updatingProcures: false,
  updatingProcuresError: false,
};

export const procreReducer = (state = initialState, action) => {
  switch (action.type) {
    //set view type
    case types.SET_PROCRE_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };

    case types.GET_ALL_PROCURE_REQUEST:
      return { ...state, fetchingAllProcure: true };
    case types.GET_ALL_PROCURE_SUCCESS:
      return {
        ...state,
        fetchingAllProcure: false,
        allProcure: action.payload,
      };
    case types.GET_ALL_PROCURE_FAILURE:
      return {
        ...state,
        fetchingAllProcure: false,
        fetchingAllProcureError: true,
      };

    case types.EMPTY_PROCURE_LIST:
      return { ...state, allProcure: [] };

    case types.GET_RECORDS_REQUEST:
      return { ...state, fetchingRecords: true };
    case types.GET_RECORDS_SUCCESS:
      return {
        ...state,
        fetchingRecords: false,
        recordData: action.payload,
      };
    case types.GET_RECORDS_FAILURE:
      return {
        ...state,
        fetchingRecords: false,
        fetchingRecordsError: true,
      };

    case types.HANDLE_PROCURE_ORDER_MODAL:
      return {
        ...state,
        addProcureOrderModal: action.payload,
        phoneListById: [],
      };

    case types.UPDATE_PROCURES_REQUEST:
      return { ...state, updatingProcures: true };
    case types.UPDATE_PROCURES_SUCCESS:
      return {
        ...state,
        updatingProcures: false,
        allProcure: state.allProcure.map((item) => {
          if (item.iteamId == action.payload.iteamId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_PROCURES_FAILURE:
      return {
        ...state,
        updatingProcures: false,
        updatingProcuresError: true,
      };

      case types.HANDLE_PRCURE_NOTES_DRAWER_MODAL:
        return { ...state, addDrawerProcureNotesModal: action.payload };

        case types.ADD_PROCURE_NOTES_REQUEST:
          return {
            ...state,
            addingNotesByProcure: true,
          };
        case types.ADD_PROCURE_NOTES_SUCCESS:
          return {
            ...state,
            addingNotesByProcure: false,
            addingNotesByProcure: false,
            //addLeadsSpeechModal: false,
          };
        case types.ADD_PROCURE_NOTES_FAILURE:
          return {
            ...state,
            addingNotesByProcure: false,
            addingNotesByProcureError: true,
          };
    
          case types.GET_NOTES_LIST_BY_PROCURE_ID_REQUEST:
            return { ...state, fetchingNotesListByProcure: true };
          case types.GET_NOTES_LIST_BY_PROCURE_ID_SUCCESS:
            return {
              ...state,
              fetchingNotesListByProcure: false,
              notesListByPrcure: action.payload,
            };
          case types.GET_NOTES_LIST_BY_PROCURE_ID_FAILURE:
            return {
              ...state,
              fetchingNotesListByProcure: false,
              fetchingNotesListByProcureError: true,
            };

            case types.PROCURE_TO_ACCEPTED_REQUEST:
              return {
                ...state,
                procureToAccept: true,
              };
            case types.PROCURE_TO_ACCEPTED_SUCCESS:
              return {
                ...state,
                procureToAccept: false,
                //allProcure: [action.payload, ...state.allProcure],
                // allProcure: state.allProcure.map((item) => {
                //   if (item.iteamId === action.payload.iteamId) {
                //     return action.payload;
                //   } else {
                //     return item;
                //   }
                // }),
              };
            case types.PROCURE_TO_ACCEPTED_FAILURE:
              return {
                ...state,
                procureToAccept: false,
                procureToAcceptError: true,
              };


    default:
      return state;
  }
};
