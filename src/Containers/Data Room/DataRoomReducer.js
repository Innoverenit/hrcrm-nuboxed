import * as types from "./DataRoomActionTypes";

const initialState = {
    viewType: "list",

    addDataroomModal:false,

    addDrawerDataroomNotesModal:false,

    fetchingDataroomList: false,
    fetchingDataroomListError: false,
    dataRoomlist:[],


    fetchingProspectOppOpenTask:false,
    fetchingProspectOppOpenTaskError:false,
    prospectOppOpenTask:[],

    fetchingProspectOpenTask:false,
    fetchingProspectOpenTaskError:false,
    prospectOpenTask:[],
  
    addingDataroom: false, 
    addingDataroomError: false,

    fetchingUserList: false,
    fetchingUserListError: false,
    userRoomlist:[],


    fetchingProspectSectorOpen:false,
    fetchingProspectSectorOpenError:false,
    prospectSectorOpen:[],

    fetchingProspectOppCloseTask:false,
    fetchingProspectOppCloseTaskError:false,
    prospectOppCloseTask:[],

    fetchingProspectOppWonTask:false,
    fetchingProspectOppWonTaskError:false,

    prospectOppWonTask:[],
    
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





        case types.GET_PROSPECT_OPEN_TASK_REQUEST:
      return { ...state, fetchingProspectOpenTask: true };
    case types.GET_PROSPECT_OPEN_TASK_SUCCESS:
      return {
        ...state,
        fetchingProspectOpenTask: false,
        prospectOpenTask: action.payload,
      };
    case types.GET_PROSPECT_OPEN_TASK_FAILURE:
      return {
        ...state,
        fetchingProspectOpenTask: false,
        fetchingProspectOpenTaskError: true,
      };





      case types.GET_PROSPECT_SECTOR_OPEN_REQUEST:
        return { ...state, fetchingProspectSectorOpen: true };
      case types.GET_PROSPECT_SECTOR_OPEN_SUCCESS:
        return {
          ...state,
          fetchingProspectSectorOpen: false,
          prospectSectorOpen: [...state.prospectSectorOpen, ...action.payload],
        
        };
      case types.GET_PROSPECT_SECTOR_OPEN_FAILURE:
        return {
          ...state,
          fetchingProspectSectorOpen: false,
          fetchingProspectSectorOpenError: true,
        };





      case types.GET_PROSPECT_OPP_CLOSE_TASK_REQUEST:
        return { ...state, fetchingProspectOppCloseTask: true };
      case types.GET_PROSPECT_OPP_CLOSE_TASK_SUCCESS:
        return {
          ...state,
          fetchingProspectOppCloseTask: false,
          prospectOppCloseTask: action.payload,
        };
      case types.GET_PROSPECT_OPP_CLOSE_TASK_FAILURE:
        return {
          ...state,
          fetchingProspectOppCloseTask: false,
          fetchingProspectOppCloseTaskError: true,
        };
    




      case types.GET_PROSPECT_OPP_OPEN_TASK_REQUEST:
        return { ...state, fetchingProspectOppOpenTask: true };
      case types.GET_PROSPECT_OPP_OPEN_TASK_SUCCESS:
        return {
          ...state,
          fetchingProspectOppOpenTask: false,
          prospectOppOpenTask: action.payload,
        };
      case types.GET_PROSPECT_OPP_OPEN_TASK_FAILURE:
        return {
          ...state,
          fetchingProspectOppOpenTask: false,
          fetchingProspectOppOpenTaskError: true,
        };



        case types.GET_PROSPECT_OPP_WON_REQUEST:
          return { ...state, fetchingProspectOppWonTask: true };
        case types.GET_PROSPECT_OPP_WON_SUCCESS:
          return {
            ...state,
            fetchingProspectOppWonTask: false,
            prospectOppWonTask: action.payload,
          };
        case types.GET_PROSPECT_OPP_WON_FAILURE:
          return {
            ...state,
            fetchingProspectOppWonTask: false,
            fetchingProspectOppWonTaskError: true,
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