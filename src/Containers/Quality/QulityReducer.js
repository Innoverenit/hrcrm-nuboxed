import * as types from "./QulityActionType";
import dayjs from "dayjs";

const initialState = {
    viewType: "production",

    

  };

  export const qualitysReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_QUALITY_VIEW_TYPE:
            return { ...state, viewType: action.payload };

  
      default:
        return state;
    }
  };