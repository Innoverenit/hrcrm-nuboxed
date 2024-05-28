import * as types from "./DataRoomActionTypes";

const initialState = {
    viewType: "list",

    addDataroomModal:false,

    addDrawerDataroomNotesModal:false,

    fetchingDataroomList: false,
    fetchingDataroomListError: false,
    dataRoomlist:[],
  
    addingDataroom: false, 
    addingDataroomError: false,

    fetchingUserList: false,
    fetchingUserListError: false,
    userRoomlist:[],
    
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

      case types.GET_USERLIST_REQUEST:
        return { ...state, fetchingUserList: true };
      case types.GET_USERLIST_SUCCESS:
        return {
          ...state,
          fetchingUserList: false,
          userRoomlist: action.payload,
        };
      case types.GET_USERLIST_FAILURE:
        return {
          ...state,
          fetchingUserList: false,
          fetchingUserListError: true,
        };
  

      case types.ADD_DATAROOM_REQUEST:
        return { ...state, addingDataroom: true };
      case types.ADD_DATAROOM_SUCCESS:
        return { ...state, 
          addingDataroom: false, 
          // addLeadsModal: false ,
          // leadsAllData:[action.payload,...state.leadsAllData],
          // allleadsInfo:[action.payload,...state.allleadsInfo]
        };
      case types.ADD_DATAROOM_FAILURE:
        return { ...state,
           addingDataroom: false, 
          addingDataroomError: false };    


      default:
        return state;
    }
  };