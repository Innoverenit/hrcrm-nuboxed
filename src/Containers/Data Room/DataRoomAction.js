import * as types from "./DataRoomActionTypes";


export const setDataRoomViewType = (viewType) => (dispatch) =>
    dispatch({ type: types.SET_DATAROOM_VIEW_TYPE, payload: viewType });
  
export const handleDataroomModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DATAROOM_MODAL,
      payload: modalProps,
    });
  };

  export const handleDataroomNotesDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_DATAROOM_NOTES_DRAWER_MODAL,
      payload: modalProps,
    });
  };

