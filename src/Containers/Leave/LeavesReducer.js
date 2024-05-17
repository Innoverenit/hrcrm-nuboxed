import * as types from "./LeavesActionType";

const initialState = {
  viewType: "tile",
  addLeaveModal: false,
  addingLeaves: false,
  addingLeavesError: false,

  fetchingLeaveListRangeByUserId: false,
  fetchingLeaveListRangeByUserIdError: false,
  leaveListRangeByUserId: [],

  fetchingLeaveLeftSideData: false,
  fetchingLeaveLeftSideDataError: false,
  leaveFetching: [],

  setEditingLeave: {},
  updateLeaveModal: false,

  updateStatusLeaveModal: false,

  updatingLeave: false,
  updatingLeaveError: false,

  fetchingLeaveStatus: false,
  fetchingLeaveStatusError: true,
  leaveStatus: [],

  noteLeaveDrawer: false,

  addingLeaveNote: false,
  addingLeaveNoteError: false,

  fetchingLeavesNotes: false,
  fetchingLeavesNotesError: false,
  leavesNotes: [],
};

export const LeavesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_LEAVES_MODAL:
      return { ...state, addLeaveModal: action.payload };

    case types.ADD_LEAVES_REQUEST:
      return {
        ...state,
        addingLeaves: true,
        addingLeavesError: false,
      };
    case types.ADD_LEAVES_SUCCESS:
      return {
        ...state,
        addingLeaves: false,
        addLeaveModal: false,
      };
    case types.ADD_LEAVES_FAILURE:
      return {
        ...state,
        addingLeaves: false,
        addingLeavesError: true,
      };
    //GET LEAVES DETAILS

    case types.GET_LEAVE_LIST_RANGE_BY_USER_ID_REQUEST:
      return { ...state, fetchingLeaveListRangeByUserId: true };
    case types.GET_LEAVE_LIST_RANGE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingLeaveListRangeByUserId: false,
        leaveListRangeByUserId: action.payload,
      };
    case types.GET_LEAVE_LIST_RANGE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingLeaveListRangeByUserId: false,
        fetchingLeaveListRangeByUserIdError: true,
      };

    case types.GET_LEAVE_LEFT_SIDE_DETAILS_REQUEST:
      return { ...state, fetchingLeaveLeftSideData: true };
    case types.GET_LEAVE_LEFT_SIDE_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingLeaveLeftSideData: false,
        leaveFetching: action.payload,
      };
    case types.GET_LEAVE_LEFT_SIDE_DETAILS_FAILURE:
      return {
        ...state,
        fetchingLeaveLeftSideData: false,
        fetchingLeaveLeftSideDataError: true,
      };
    case types.SET_LEAVE_EDIT:
      return { ...state, setEditingLeave: action.payload };

    case types.HANDLE_UPDATE_LEAVE_MODAL:
      return { ...state, updateLeaveModal: action.payload };

    case types.HANDLE_STATUS_LEAVE_MODAL:
      return { ...state, updateStatusLeaveModal: action.payload };

    case types.UPDATE_LEAVE_REQUEST:
      return { ...state, updatingLeave: true };
    case types.UPDATE_LEAVE_SUCCESS:
      return {
        ...state,
        updatingLeave: false,
        updateLeaveModal: false,
        leaveListRangeByUserId: state.leaveListRangeByUserId.map((item) => {
          if (item.leaveId === action.payload.leaveId) {
            return action.payload;
          } else {
            return item;
          }
        }),
      };
    case types.UPDATE_LEAVE_FAILURE:
      return {
        ...state,
        updatingLeave: false,
        updatingLeaveError: true,
      };

    case types.DELETE_LEAVES_REQUEST:
      return { ...state, deleteLeaves: true };
    case types.DELETE_LEAVES_SUCCESS:
      return {
        ...state,
        deleteLeaves: false,
        leaveListRangeByUserId: state.leaveListRangeByUserId.filter(
          (item) => item.LEAVESId !== action.payload
        ),
      };
    case types.DELETE_LEAVES_FAILURE:
      return { ...state, deleteLeaves: false, deleteLeavesError: false };

    case types.SET_LEAVES_VIEW_TYPE:
      return { ...state, viewType: action.payload };

    case types.GET_LEAVE_STATUS_BY_LEAVEID_REQUEST:
      return { ...state, fetchingLeaveStatus: true };
    case types.GET_LEAVE_STATUS_BY_LEAVEID_SUCCESS:
      return {
        ...state,
        fetchingLeaveStatus: false,
        leaveStatus: action.payload,
      };
    case types.GET_LEAVE_STATUS_BY_LEAVEID_FAILURE:
      return {
        ...state,
        fetchingLeaveStatus: false,
        fetchingLeaveStatusError: true,
      };

    case types.HANDLE_LEAVE_NOTE_DRAWER:
      return { ...state, noteLeaveDrawer: action.payload };

    case types.ADD_LEAVE_NOTE_REQUEST:
      return {
        ...state,
        addingLeaveNote: true,
        addingLeaveNoteError: false,
      };
    case types.ADD_LEAVE_NOTE_SUCCESS:
      return {
        ...state,
        addingLeaveNote: false,
        // leavesNotes:[action.payload,...state.leavesNotes]
        // leavesNotes:[...state.leavesNotes],
      };
    case types.ADD_LEAVE_NOTE_FAILURE:
      return {
        ...state,
        addingLeaveNote: false,
        addingLeaveNoteError: true,
      };

    case types.GET_LEAVE_NOTES_REQUEST:
      return { ...state, fetchingLeavesNotes: true };
    case types.GET_LEAVE_NOTES_SUCCESS:
      return {
        ...state,
        fetchingLeavesNotes: false,
        leavesNotes: action.payload,
      };
    case types.GET_LEAVE_NOTES_FAILURE:
      return {
        ...state,
        fetchingLeavesNotes: false,
        fetchingLeavesNotesError: true,
      };
  }
  return state;
};
