import * as types from "./DataRoomActionTypes";

const initialState = {
    viewType: "list",

    addDataroomModal:false,

    addDrawerDataroomNotesModal:false,

    fetchingProspectSourceOpen:false,
    fetchingProspectSourceOpenError:false,
    prospectSourceOpen:[],

    fetchingDataroomList: false,
    fetchingDataroomListError: false,
    dataRoomlist:[],


    fetchingProspectOppOpenTask:false,
    fetchingProspectOppOpenTaskError:false,
    prospectOppOpenTask:[],


    fetchingProspectSectorOppWonTask:false,
    fetchingProspectSectorOppWonTaskError:false,
    prospectSectorOppWonTask:[],

    updatingDragStage: false,

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

    fetchingProspectSectorOppLostTask:false,
    fetchingProspectSectorOppLostTaskError:false,
    prospectSectorOppLostTask:[],

    fetchingProspectSourceOppWonTask:false,
    fetchingProspectSourceOppWonTaskError:false,
    prospectSourceOppWonTask:[],

    fetchingProspectSourceOppLostTask:false,
    fetchingProspectSourceOppLostTaskError:false,
    prospectSourceOppLostTask:[],

    fetchingProspectOppWonTask:false,
    fetchingProspectOppWonTaskError:false,

    prospectOppWonTask:[],
    
  };

  const updatedDragOpportunity = (item, newProps) => {
    return item.map((opp, index) => {
      console.log("Author7", opp);
      console.log("Author8", newProps);
      if (opp.opportunityId === newProps.opportunityId) {
        console.log("inside opp");
        opp.opportunityStagesId = newProps.opportunityStagesId;
      }
      return opp;
    });
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





      case types.UPDATE_OPPORTUNITY_DRAG_STAGE_REQUEST:
        return {
          ...state,
          updatingDragStage: true,
  
          // candidateRequirement: action.payload,
        };
      case types.UPDATE_OPPORTUNITY_DRAG_STAGE_SUCCESS:
        return {
          ...state,
          updatingDragStage: false,
          prospectOppOpenTask: updatedDragOpportunity(
            state.prospectOppOpenTask,
            action.payload
          ),

          prospectSectorOpen: updatedDragOpportunity(
            state.prospectSectorOpen,
            action.payload
          ),

          prospectSourceOpen: updatedDragOpportunity(
            state.prospectSourceOpen,
            action.payload
          ),
        
          // candidateRequirement: [action.payload]prospectSectorOpen
        };
      case types.UPDATE_OPPORTUNITY_DRAG_STAGE_FAILURE:
        return { ...state };


        case types.GET_PROSPECT_SOURCE_OPP_LOST_REQUEST:
          return { ...state, fetchingProspectSourceOppLostTask: true };
        case types.GET_PROSPECT_SOURCE_OPP_LOST_SUCCESS:
          return {
            ...state,
            fetchingProspectSourceOppLostTask: false,
            prospectSourceOppLostTask: action.payload,
          };
        case types.GET_PROSPECT_SOURCE_OPP_LOST_FAILURE:
          return {
            ...state,
            fetchingProspectSourceOppLostTask: false,
            fetchingProspectSourceOppLostTaskError: true,
          };
      


      case types.GET_PROSPECT_SECTOR_OPEN_REQUEST:
        return { ...state, fetchingProspectSectorOpen: true };
      case types.GET_PROSPECT_SECTOR_OPEN_SUCCESS:
        return {
          ...state,
          fetchingProspectSectorOpen: false,
          prospectSectorOpen: action.payload,
        
        };
      case types.GET_PROSPECT_SECTOR_OPEN_FAILURE:
        return {
          ...state,
          fetchingProspectSectorOpen: false,
          fetchingProspectSectorOpenError: true,
        };





        case types.GET_PROSPECT_SECTOR_OPP_LOST_REQUEST:
          return { ...state, fetchingProspectSectorOppLostTask: true };
        case types.GET_PROSPECT_SECTOR_OPP_LOST_SUCCESS:
          return {
            ...state,
            fetchingProspectSectorOppLostTask: false,
            prospectSectorOppLostTask: action.payload,
          };
        case types.GET_PROSPECT_SECTOR_OPP_LOST_FAILURE:
          return {
            ...state,
            fetchingProspectSectorOppLostTask: false,
            fetchingProspectSectorOppLostTaskError: true,
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
    

        case types.GET_PROSPECT_SOURCE_OPP_WON_REQUEST:
          return { ...state, fetchingProspectSourceOppWonTask: true };
        case types.GET_PROSPECT_SOURCE_OPP_WON_SUCCESS:
          return {
            ...state,
            fetchingProspectSourceOppWonTask: false,
            prospectSourceOppWonTask: action.payload,
          };
        case types.GET_PROSPECT_SOURCE_OPP_WON_FAILURE:
          return {
            ...state,
            fetchingProspectSourceOppWonTask: false,
            fetchingProspectSourceOppWonTaskError: true,
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





        case types.GET_PROSPECT_SECTOR_OPP_WON_REQUEST:
          return { ...state, fetchingProspectSectorOppWonTask: true };
        case types.GET_PROSPECT_SECTOR_OPP_WON_SUCCESS:
          return {
            ...state,
            fetchingProspectSectorOppWonTask: false,
            prospectSectorOppWonTask: action.payload,
          };
        case types.GET_PROSPECT_SECTOR_OPP_WON_FAILURE:
          return {
            ...state,
            fetchingProspectSectorOppWonTask: false,
            fetchingProspectSectorOppWonTaskError: true,
          };
      






        case types.GET_PROSPECT_SOURCE_OPEN_REQUEST:
        return { ...state, fetchingProspectSourceOpen: true };
      case types.GET_PROSPECT_SOURCE_OPEN_SUCCESS:
        return {
          ...state,
          fetchingProspectSourceOpen: false,
          prospectSourceOpen: action.payload
        
        };
      case types.GET_PROSPECT_SOURCE_OPEN_FAILURE:
        return {
          ...state,
          fetchingProspectSourceOpen: false,
          fetchingProspectSourceOpenError: true,
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