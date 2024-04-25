import * as types from "./ProcreActionTypes";
import moment from "moment";

const initialState = {


  viewType: "card",
 
 



  
  
};

export const procreReducer = (state = initialState, action) => {
  switch (action.type) {
    //set view type
    case types.SET_PROCRE_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
        
      };

    


    default:
      return state;
  }
};
