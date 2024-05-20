import * as types from "./DataRoomActionTypes";

const initialState = {
    viewType: "list",

    addDataroomModal:false,

    addDrawerDataroomNotesModal:false,

    fetchingDataroomList: false,
    fetchingDataroomListError: false,
    dataRoomlist:[]
  
  };

  export const dataRoomReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_DATAROOM_VIEW_TYPE:
        return { ...state, viewType: action.payload };
  
        case types.HANDLE_DATAROOM_MODAL:
      return { ...state, addDataroomModal: action.payload };

      case types.HANDLE_DATAROOM_NOTES_DRAWER_MODAL:
    return { ...state, addDrawerDataroomNotesModal: action.payload };

    case types.GET_DATAROOM_REQUEST:
      return { ...state, fetchingDataroomList: true };
    case types.GET_DATAROOM_SUCCESS:
      return {
        ...state,
        fetchingDataroomList: false,
        dataRoomlist: action.payload,
      };
    case types.GET_DATAROOM_FAILURE:
      return {
        ...state,
        fetchingDataroomList: false,
        fetchingDataroomListError: true,
      };


      default:
        return state;
    }
  };