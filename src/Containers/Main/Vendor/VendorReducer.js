import * as types from "./VendorActionType";

const initialState = {

    viewType: "card",

  
  };

  export const vendorReducer = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_VENDOR_VIEW_TYPE:
        return {
          ...state,
          viewType: action.payload,
        };

      default:
        return state;
    }
  };