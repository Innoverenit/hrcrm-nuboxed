import * as types from "./ErpNoteActionType";
import dayjs from "dayjs";

const initialState = {

    fetchingNotesListByCustomerId: false,
    fetchingNotesListByCustomerIdError: false,
    notesListByCustomerId: [],

    
  addingNotesByCustomerId: false,
  addingNotesByCustomerIdError: false,


  };

  export const erpNoteReducer = (state = initialState, action) => {
    switch (action.type) {
     
        case types.GET_NOTES_LIST_BY_CUSTOMER_ID_REQUEST:
            return { ...state, fetchingNotesListByCustomerId: true };
          case types.GET_NOTES_LIST_BY_CUSTOMER_ID_SUCCESS:
            return {
              ...state,
              fetchingNotesListByCustomerId: false,
              notesListByCustomerId: action.payload,
            };
          case types.GET_NOTES_LIST_BY_CUSTOMER_ID_FAILURE:
            return {
              ...state,
              fetchingNotesListByCustomerId: false,
              fetchingNotesListByCustomerIdError: true,
            };

            case types.ADD_CUSTOMER_NOTES_REQUEST:
                return {
                  ...state,
                  addingNotesByCustomerId: true,
                };
              case types.ADD_CUSTOMER_NOTES_SUCCESS:
                return {
                  ...state,
                  addingNotesByCustomerId: false,
                  addingNotesByCustomerId: false,
                  addCustomerSpeechModal: false,
                };
              case types.ADD_CUSTOMER_NOTES_FAILURE:
                return {
                  ...state,
                  addingNotesByCustomerId: false,
                  addingNotesByCustomerIdError: true,
                };
  
      default:
        return state;
    }
  };