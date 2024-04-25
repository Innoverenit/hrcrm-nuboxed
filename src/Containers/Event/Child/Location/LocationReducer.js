import * as types from "./LocationActionType";
const initialState = {
    addlocationModal:false ,
    viewType:"card",

    fetchingLocationData: false,
    fetchingLocationDataError: false,
    showLocation:[],

    locationCustomerdrawr:false,

    locationSupplierdrawr:false,

    addingLocation: false, 
    addingLocationError: false,

    locShiftDrawer:false,
    locationUpdatedrawr:false,

    updatingLocations: false, updatingLocationsError: false,
    deletingLocations: false, deletingLocationsError: false,

    fetchingShoftlocs: false,
    fetchingShoftlocsError: false,
    shiftLocs:[],
    createShiftDrawer:false,
    creatingShiftLocation: false, 
  
   creatingShiftLocationError:false,

   fetchingAlLocShift: false,
   fetchingAlLocShiftError:false,
   alLocShift:[],

   fetchingLocationRecords: false,
   fetchingLocationRecordsError: false,
   recordData:{},

   clickLocDrwr:false,

   creatingLocationCell: false,
creatingLocationCellError:false,

fetchingLocationCell: false,
fetchingLocationCellError:false,
showLoCell:[],

fetchingAllLocationCell: false,
fetchingAllLocationCellError:false,
allLoCell:[],

  };

  export const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOCATION_VIEW_TYPE:
            return { ...state, viewType: action.payload };
            case types.HANDLE_LOCATION_MODAL:
                return { ...state, addlocationModal: action.payload }; 
                
                
                case types.GET_LOCATION_DATA_REQUEST:
                  return { ...state, fetchingLocationData: true };
                // case types.GET_LOCATION_DATA_SUCCESS:
                //   return {
                //     ...state,
                //     fetchingLocationData: false,
                //     showLocation: [...state.showLocation,...action.payload]
                //   };
                case types.GET_LOCATION_DATA_SUCCESS:
                  return { ...state, fetchingLocationData: false, showLocation: action.payload };
                case types.GET_LOCATION_DATA_FAILURE:
                  return {
                    ...state,
                    fetchingLocationData: false,
                    fetchingLocationDataError: true,
                  };
            
                  case types.ADD_LOCATION_REQUEST:
                    return { ...state, addingLocation: true };
                  case types.ADD_LOCATION_SUCCESS:
                    return { ...state, addingLocation: false, addlocationModal: false };
                  case types.ADD_LOCATION_FAILURE:
                    return { ...state, addingLocation: false, 
                                    addingLocationError: true };

            case types.HANDLE_LOCATION_SHIFT_DRAWER:
                return { ...state, locShiftDrawer: action.payload }; 
               
          case types.HANDLE_UPDATE_LOCATION_DRAWER:
            return { ...state, locationUpdatedrawr: action.payload }; 

            case types.UPDATE_LOCATIONS_REQUEST:
              return { ...state, updatingLocations: true };
            case types.UPDATE_LOCATIONS_SUCCESS:
              return {
                ...state,
                locationUpdatedrawr: false,
                updatingLocations: false,
                showLocation: state.showLocation.map((LOCS) =>
                LOCS.locationDetailsId === action.payload.locationDetailsId
                  ? action.payload
                  : LOCS
              ),
              };
            case types.UPDATE_LOCATIONS_FAILURE:
              return { ...state, updatingLocations: false, updatingLocationsError: true };         
               
              case types.DELETE_LOCATIONS_REQUEST:
                return { ...state, deletingLocations: true };
              case types.DELETE_LOCATIONS_SUCCESS:
                return {
                  ...state,
                  deletingLocations: false,
                  showLocation: state.showLocation.filter(
                    (item) => item.locationDetailsId !== action.payload
                  ),
                };
              case types.DELETE_LOCATIONS_FAILURE:
                return { ...state, deletingLocations: false, deletingLocationsError: false };


                case types.CREATE_SHIFT_LOCATION_REQUEST:
                  return { ...state, creatingShiftLocation: true };
                case types.CREATE_SHIFT_LOCATION_SUCCESS:
                  return { ...state, creatingShiftLocation: false, 
                    createShiftDrawer:false,
                    // shiftLocs:action.payload, 
                   
                  };
                case types.CREATE_SHIFT_LOCATION_FAILURE:
                  return { ...state, creatingShiftLocation: false, 

                                  creatingShiftLocationError: true };      

                case types.GET_SHIFT_LOCATION_REQUEST:
                  return { ...state, fetchingShoftlocs: true };
                case types.GET_SHIFT_LOCATION_SUCCESS:
                  return { ...state, fetchingShoftlocs: false, 
                    shiftLocs:action.payload, 
                   };
                case types.GET_SHIFT_LOCATION_FAILURE:
                  return {
                    ...state,
                    fetchingShoftlocs: false,
                    fetchingShoftlocsError: true,
                  };
                  case types.HANDLE_CREATE_SHIFT_DRAWER:
                    return { ...state, createShiftDrawer: action.payload }; 

                   
                                    
                                      case types.GET_ALLOCTION_SHIFT_REQUEST:
                                        return { ...state, fetchingAlLocShift: true };
                                      case types.GET_ALLOCTION_SHIFT_SUCCESS:
                                        return { ...state, fetchingAlLocShift: false, alLocShift: action.payload };
                                      case types.GET_ALLOCTION_SHIFT_FAILURE:
                                        return {
                                          ...state,
                                          fetchingAlLocShift: false,
                                          fetchingAlLocShiftError: true,
                                        }; 
                                        
                                        case types.HANDLE_LOCATION_CUSTOMER_DRAWER:
                                          return { ...state, locationCustomerdrawr: action.payload }; 
                              
                                          case types.HANDLE_LOCATION_SUPPLER_DRAWER:
                                            return { ...state, locationSupplierdrawr: action.payload }; 



                                            case types.GET_LOCATION_RECORDS_REQUEST:
                                              return { ...state, fetchingLocationRecords: true };
                                            case types.GET_LOCATION_RECORDS_SUCCESS:
                                              return {
                                                ...state,
                                                fetchingLocationRecords: false,
                                                recordData: action.payload,
                                              };
                                            case types.GET_LOCATION_RECORDS_FAILURE:
                                              return {
                                                ...state,
                                                fetchingLocationRecords: false,
                                                fetchingLocationRecordsError: true,
                                              };

                                              case types.ADDING_LOCATION_TOGGLE_REQUEST:
                                                return { ...state, addingLocationToggle: true };
                                              case types.ADDING_LOCATION_TOGGLE_SUCCESS:
                                                return {
                                                  ...state,
                                                  addingLocationToggle: false,
                                                  // showLocation: state.showLocation.map((item) =>{
                                                  //   if (item.locationDetailsId
                                                  //     === action.payload.locationDetailsId
                                                  //   ) {
                                                  //     return action.payload;
                                                  //   } else {
                                                  //     return item;
                                                  //   } 
                                                  // })
                                                }
                                              case types.ADDING_LOCATION_TOGGLE_FAILURE:
                                                return {
                                                  ...state,
                                                  addingLocationToggle: false,
                                                  addingLocationToggleError: true,
                                                };
                                                                                  
                                                case types.HANDLE_LOCATION_CELL_DRAWER:
                                                  return { ...state, clickLocDrwr: action.payload };
                                
                                                  case types.CREATE_LOCATION_CELL_REQUEST:
                                                    return { ...state, creatingLocationCell: true };
                                                  case types.CREATE_LOCATION_CELL_SUCCESS:
                                                    return {
                                                      ...state,
                                                      creatingLocationCell: false,
                               
                                                    };
                                                  case types.CREATE_LOCATION_CELL_FAILURE:
                                                    return {
                                                      ...state,
                                                      creatingLocationCell: false,
                                                      creatingLocationCellError: true,
                                      
                                                    };
       
                                                    case types.GET_LOCATION_CELL_REQUEST:
                                                      return { ...state, fetchingLocationCell: true };
                                                    case types.GET_LOCATION_CELL_SUCCESS:
                                                      return {
                                                        ...state,
                                                        fetchingLocationCell: false,
                                                        showLoCell: action.payload
                                                      };
                                                    case types.GET_LOCATION_CELL_FAILURE:
                                                      return {
                                                        ...state,
                                                        fetchingLocationCell: false,
                                                        fetchingLocationCellError: true,
                                                      };

                                                      case types.GET_ALL_LOCATION_CELL_REQUEST:
                                                        return { ...state, fetchingAllLocationCell: true };
                                                      case types.GET_ALL_LOCATION_CELL_SUCCESS:
                                                        return {
                                                          ...state,
                                                          fetchingAllLocationCell: false,
                                                          allLoCell: action.payload
                                                        };
                                                      case types.GET_ALL_LOCATION_CELL_FAILURE:
                                                        return {
                                                          ...state,
                                                          fetchingAllLocationCell: false,
                                                          fetchingAllLocationCellError: true,
                                                        };

                                                        case types.LINK_CELL_WITH_PRODUCT_REQUEST:
            return { ...state };
        case types.LINK_CELL_WITH_PRODUCT_SUCCESS:
            return {
                ...state,
                allLoCell: state.allLoCell.map(
                    (item) => {
                        if (item.supplierId === action.payload.supplierId) {
                            return action.payload;
                        } else {
                            return item;
                        }
                    }),
            };
        case types.LINK_CELL_WITH_PRODUCT_FAILURE:
            return { ...state };


      default:
    return state;
      }
  };