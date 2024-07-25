import * as types from "./PrmotionActionType";
const initialState = {
    addingpromotionModal:false ,
    viewType:"card",


   

  };
  export const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PROMOTION_VIEW_TYPE:
            return { ...state, viewType: action.payload };
            case types.HANDLE_PROMOTIOND_MODAL:
                return { ...state, addingpromotionModal: action.payload }; 


      default:
    return state;
      }
  };