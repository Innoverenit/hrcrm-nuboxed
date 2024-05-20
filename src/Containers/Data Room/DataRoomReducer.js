import * as types from "./DataRoomActionTypes";

const initialState = {
    viewType: "list",

    addDataroomModal:false,

    addDrawerDataroomNotesModal:false,
  
  };

  export const dataRoomReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_DATAROOM_VIEW_TYPE:
        return { ...state, viewType: action.payload };
  
        case types.HANDLE_DATAROOM_MODAL:
      return { ...state, addDataroomModal: action.payload };

      case types.HANDLE_DATAROOM_NOTES_DRAWER_MODAL:
    return { ...state, addDrawerDataroomNotesModal: action.payload };

      default:
        return state;
    }
  };