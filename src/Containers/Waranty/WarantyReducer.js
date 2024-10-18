
import * as types from "./WarantyActionTypes";
import dayjs from "dayjs";








const initialState = {
    addDrawerWarantyModal:false,
  };


  export const WarantyReducer = (state = initialState, action) => {
    switch (action.type) {

case types.HANDLE_WARANTY_DRAWER_MODAL:
    return { ...state, addDrawerWarantyModal: action.payload };

    default:
        return state;
}
};
