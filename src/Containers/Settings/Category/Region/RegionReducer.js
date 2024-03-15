import * as types from "./RegionActionTypes";
import dayjs from "dayjs";

const initialState = {
  fetchingRegions: false,
  fetchingRegionsError: false,
  regions: [],

  addingRegions:false,
  addingRegionsError:false,

  updatingRegions:false,
  updatingRegionsError:false,

  fetchingDropdownRegions: false,
  fetchingDropdownRegionsError:false,
  regionsDropDown:[],


  removingRegions:false,
  removingRegionsError:false,
  
};

export const regionsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * get the list of all documents
     */
    case types.GET_REGIONS_REQUEST:
      return { ...state, fetchingRegions: true };
    case types.GET_REGIONS_SUCCESS:
      return { ...state, fetchingRegions: false, regions: action.payload };
    case types.GET_REGIONS_FAILURE:
      return {
        ...state,
        fetchingRegions: false,
        fetchingRegions: true,
      };

      case types.ADD_REGIONS_REQUEST:
      return { ...state, addingRegions: true };
    case types.ADD_REGIONS_SUCCESS:
      return {
        ...state,
        addingRegions: false,
        regions:[action.payload,...state.regions],
        // documents: [...state.documents, action.payload],
      };
    case types.ADD_REGIONS_FAILURE:
      return { ...state, addingRegions: false, addingRegionsError: true };

case types.GET_DROPDOWN_REGIONS_REQUEST:
      return { ...state, fetchingDropdownRegions: true };
    case types.GET_DROPDOWN_REGIONS_SUCCESS:
      return { ...state, fetchingDropdownRegions: false, regionsDropDown: action.payload };
    case types.GET_DROPDOWN_REGIONS_FAILURE:
      return {
        ...state,
        fetchingDropdownRegions: false,
        fetchingDropdownRegionsError: true,
      };




      case types.UPDATE_REGIONS_REQUEST:
        return { ...state, updatingRegions: true };
      case types.UPDATE_REGIONS_SUCCESS:
        // return { ...state, updatingDocuments: false, Documents: [...state.Documents, action.payload] };
        return {
          ...state,
          updatingRegions: false,
          regions: state.regions.map((document) =>
            document.regionsId === action.payload.regionsId
              ? action.payload
              : document
          ),
        };
      case types.UPDATE_REGIONS_FAILURE:
        return {
          ...state,
          updatingRegions: false,
          updatingRegionsError: true,
        };



        case types.REMOVE_REGIONS_REQUEST:
      return { ...state, removingRegions: true };
    case types.REMOVE_REGIONS_SUCCESS:
      return {
        ...state,
        removingRegions: false,
        regions: state.regions.filter(
          (item) => item.regionsId !== action.payload
      ),
      };
    case types.REMOVE_REGIONS_FAILURE:
      return {
        ...state,
        removingRegions: false,
        removingRegionsError: true,
      };
        
    

    default:
      return state;
  }
};