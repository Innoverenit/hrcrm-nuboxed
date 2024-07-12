import * as types from "./ClubActionType";
import dayjs from "dayjs";

const initialState = {
    viewType: "table",

    fetchingClub: false,
    fetchingClubError: false,
    clubAllData:[]

  };
  export const clubReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_CLUB_VIEW_TYPE:
            return { ...state, viewType: action.payload };

            case types.GET_CLUB_ALLLIST_REQUEST:
          return { ...state, fetchingClub: true };
        case types.GET_CLUB_ALLLIST_SUCCESS:
          return {
            ...state,
            fetchingClub: false,
            clubAllData: [...state.clubAllData, ...action.payload],
          };
        case types.GET_CLUB_ALLLIST_FAILURE:
          return {
            ...state,
            fetchingClub: false,
            fetchingClubError: true,
          }; 
    
  
      default:
        return state;
    }
  };