import * as types from "./ClubActionType";
import dayjs from "dayjs";

const initialState = {
    viewType: "table",

    

  };
  export const clubReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_CLUB_VIEW_TYPE:
            return { ...state, viewType: action.payload };

           
    
  
      default:
        return state;
    }
  };