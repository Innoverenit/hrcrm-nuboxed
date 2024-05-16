import * as types from "./LocationActionType";
const initialState = {
    addlocationModal:false ,
    viewType:"card",


    fetchingCatalogueCell:false,
    fetchingCatalogueCellError:false,
    catalogueCell:[],

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


   fetchingCellCardList:false,
   fetchingCellCardListError:false,
   cellCardList:[],

   reInstatedLocationCellById: false,
   reInstatedLocationCellByIdError: false,


   fetchingUserListLocation:false,
   fetchingUserListLocationError:false,
   userListLocation:[],

   fetchingDeletedLocationCell: false,
   fetchingDeletedLocationCellError: false,
   deletedLoCell:[],

   fetchingUserCell:false,
   fetchingUserCellError:false,
   userCell:[],


   creatingMachine:false,
   creatingMachineError:false,

   fetchingAlLocShift: false,
   fetchingAlLocShiftError:false,
   alLocShift:[],

   creatingUserCell:false,

   fetchingLocationRecords: false,
   fetchingLocationRecordsError: false,
   recordData:{},

   clickLocDrwr:false,


   fetchingLocationMachineData:false,
   fetchingLocationMachineDataError:false,
   locationMachineData:[],

   creatingLocationCell: false,
creatingLocationCellError:false,

fetchingLocationCell: false,
fetchingLocationCellError:false,
showLoCell:[],

fetchingDeletedLocationHistory: false,
fetchingDeletedLocationHistoryError: false,
deletedLocationHistory:[],



deletingLocationCellData:false,
deletingLocationCellDataError:false,



fetchingLocationMachine:false,
fetchingLocationMachineError:false,
locationMachine:[],

fetchingCellCode:false,
fetchingCellCodeError:false,
cellCode:[],

reInstatedLocationById: false,
reInstatedLocationByIdError: false,

fetchingAllLocationCell: false,
fetchingAllLocationCellError:false,
allLoCell:[],

fetchingLocationDeletedcount: false, 
fetchingLocationDeletedcountError: false, 
locationDeletedCount:{},


deletingUserCellData:false,
deletingUserCellDataError:false,

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




                case types.DELETE_LOCATION_CELL_REQUEST:
        return { ...state, deletingLocationCellData: true };
      case types.DELETE_LOCATION_CELL_SUCCESS:
        return {
          ...state,
          deletingLocationCellData: false,
          showLoCell: state.showLoCell.filter(
            (item) => item.cellId !== action.payload
          ),
        };
      case types.DELETE_LOCATION_CELL_FAILURE:
        return {
          ...state,
          deletingLocationCellData: false,
          deletingLocationCellDataError: true,
        };




        case types.GET_CELL_CARD_LIST_REQUEST:
          return { ...state, fetchingCellCardList: true };
        case types.GET_CELL_CARD_LIST_SUCCESS:
          return {
            ...state,
            fetchingCellCardList: false,
            cellCardList: action.payload
          };
        case types.GET_CELL_CARD_LIST_FAILURE:
          return {
            ...state,
            fetchingCellCardList: false,
            fetchingCellCardListError: true,
          };






        case types.GET_USER_CELL_REQUEST:
                                                  return { ...state, fetchingUserCell: true };
                                                case types.GET_USER_CELL_SUCCESS:
                                                  return {
                                                    ...state,
                                                    fetchingUserCell: false,
                                                    userCell:action.payload
                                                    //showLoCell:[action.payload,...state.showLoCell]
                             
                                                  };
                                                case types.GET_USER_CELL_FAILURE:
                                                  return {
                                                    ...state,
                                                    fetchingUserCell: false,
                                                    fetchingUserCellError: true,
                                    
                                                  };


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




                                        case types.GET_CELL_CODE_REQUEST:
                                                        return { ...state, fetchingCellCode: true };
                                                      case types.GET_CELL_CODE_SUCCESS:
                                                        return {
                                                          ...state,
                                                          fetchingCellCode: false,
                                                          cellCode: action.payload
                                                        };
                                                      case types.GET_CELL_CODE_FAILURE:
                                                        return {
                                                          ...state,
                                                          fetchingCellCode: false,
                                                          fetchingCellCodeError: true,
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



                                                case types.CREATE_USER_CELL_REQUEST:
                                                  return { ...state, creatingUserCell: true };
                                                case types.CREATE_USER_CELL_SUCCESS:
                                                  return {
                                                    ...state,
                                                    creatingUserCell: false,
                                                    userCell:[action.payload,...state.userCell]
                             
                                                  };
                                                case types.CREATE_USER_CELL_FAILURE:
                                                  return {
                                                    ...state,
                                                    creatingUserCell: false,
                                                    creatingUserCellError: true,
                                    
                                                  };




                                                  case types.DELETE_USER_CELL_REQUEST:
        return { ...state, deletingUserCellData: true };
      case types.DELETE_USER_CELL_SUCCESS:
        return {
          ...state,
          deletingUserCellData: false,
          userCell: state.userCell.filter(
            (item) => item.cellChamberUserLinkId !== action.payload
          ),
        };
      case types.DELETE_USER_CELL_FAILURE:
        return {
          ...state,
          deletingUserCellData: false,
          deletingUserCellDataError: true,





        };




        case types.CREATE_MACHINARY_REQUEST:
                                                  return { ...state, creatingMachine: true };
                                                case types.CREATE_MACHINARY_SUCCESS:
                                                  return {
                                                    ...state,
                                                    creatingMachine: false,
                                                    locationMachineData:[action.payload,...state.locationMachineData]
                             
                                                  };
                                                case types.CREATE_MACHINARY_FAILURE:
                                                  return {
                                                    ...state,
                                                    creatingMachine: false,
                                                    creatingMachineError: true,
                                    
                                                  };

                                                                                  
                                                case types.HANDLE_LOCATION_CELL_DRAWER:
                                                  return { ...state, clickLocDrwr: action.payload };
                                
                                                  case types.CREATE_LOCATION_CELL_REQUEST:
                                                    return { ...state, creatingLocationCell: true };
                                                  case types.CREATE_LOCATION_CELL_SUCCESS:
                                                    return {
                                                      ...state,
                                                      creatingLocationCell: false,
                                                      showLoCell:[action.payload,...state.showLoCell]
                               
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


                                                      case types.GET_CATALOGUE_CELL_REQUEST:
                                                        return { ...state, fetchingCatalogueCell: true };
                                                      case types.GET_CATALOGUE_CELL_SUCCESS:
                                                        return {
                                                          ...state,
                                                          fetchingCatalogueCell: false,
                                                          catalogueCell: action.payload
                                                        };
                                                      case types.GET_CATALOGUE_CELL_FAILURE:
                                                        return {
                                                          ...state,
                                                          fetchingCatalogueCell: false,
                                                          fetchingCatalogueCellError: true,
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


                                                        case types.GET_USER_LIST_LOCATION_REQUEST:
                                                          return { ...state, fetchingUserListLocation: true };
                                                        case types.GET_USER_LIST_LOCATION_SUCCESS:
                                                          return {
                                                            ...state,
                                                            fetchingUserListLocation: false,
                                                            userListLocation: action.payload
                                                          };
                                                        case types.GET_USER_LIST_LOCATION_FAILURE:
                                                          return {
                                                            ...state,
                                                            fetchingUserListLocation: false,
                                                            fetchingUserListLocationError: true,
                                                          };

                                                        case types.LINK_CELL_WITH_PRODUCT_REQUEST:
            return { ...state };
        case types.LINK_CELL_WITH_PRODUCT_SUCCESS:
            return {
                ...state,
                // cellCardList: state.cellCardList.filter(
                //   (item) => item.cellChamberLinkId !== action.payload.cellChamberLinkId
                // ),
                cellCardList: state.cellCardList.map(
                    (item) => {
                        if (item.cellChamberLinkId === action.payload.cellChamberLinkId) {
                            return action.payload;
                        } else {
                            return item;
                        }
                    }),
            };
        case types.LINK_CELL_WITH_PRODUCT_FAILURE:
            return { ...state };

            case types.GET_LOCATION_DELETE_HISTORY_REQUEST:
              return { ...state, fetchingDeletedLocationHistory: true };
          case types.GET_LOCATION_DELETE_HISTORY_SUCCESS:
              return {
                  ...state,
                  fetchingDeletedLocationHistory: false,
                  deletedLocationHistory: action.payload,
              };
          case types.GET_LOCATION_DELETE_HISTORY_FAILURE:
              return {
                  ...state,
                  fetchingDeletedLocationHistory: false,
                  fetchingDeletedLocationHistoryError: true,
              };


              case types.GET_LOCATION_DELETED_COUNT_REQUEST:
                return { ...state, fetchingLocationDeletedcount: true };
            case types.GET_LOCATION_DELETED_COUNT_SUCCESS:
                return { ...state, fetchingLocationDeletedcount: false, locationDeletedCount: action.payload };
            case types.GET_LOCATION_DELETED_COUNT_FAILURE:
                return { ...state, fetchingLocationDeletedcount: false, fetchingLocationDeletedcountError: true };



                case types.GET_LOCATION_MACHINE_REQUEST:
        return { ...state, fetchingLocationMachine: true, 
          // fetchingProductionTable: false 
        };
      case types.GET_LOCATION_MACHINE_SUCCESS:
        return { ...state, fetchingLocationMachine: false, locationMachine: action.payload };
      case types.GET_LOCATION_MACHINE_FAILURE:
        return { ...state, fetchingLocationMachine: false, fetchingLocationMachineError: true };


                case types.REINSTATE_TOGGLE_FOR_LOCATION_REQUEST:
                  return { ...state, reInstatedLocationById: true };
              case types.REINSTATE_TOGGLE_FOR_LOCATION_SUCCESS:
                  return {
                      ...state,
                      reInstatedLocationById: false,
                      deletedLocationHistory: state.deletedLocationHistory.filter(
                          (item) => item.locationDetailsId !== action.payload
                        ),
                
                  };
              case types.REINSTATE_TOGGLE_FOR_LOCATION_FAILURE:
                  return {
                      ...state,
                      reInstatedLocationById: false,
                      reInstatedLocationByIdError: true,
                  };


                  case types.GET_DELETED_LOCATION_CELL_REQUEST:
                    return { ...state, fetchingDeletedLocationCell: true };
                  case types.GET_DELETED_LOCATION_CELL_SUCCESS:
                    return {
                      ...state,
                      fetchingDeletedLocationCell: false,
                      deletedLoCell: action.payload
                    };
                  case types.GET_DELETED_LOCATION_CELL_FAILURE:
                    return {
                      ...state,
                      fetchingDeletedLocationCell: false,
                      fetchingDeletedLocationCellError: true,
                    };


                    case types.REINSTATE_TOGGLE_FOR_LOC_CELL_REQUEST:
                      return { ...state, reInstatedLocationCellById: true };
                  case types.REINSTATE_TOGGLE_FOR_LOC_CELL_SUCCESS:
                      return {
                          ...state,
                          reInstatedLocationCellById: false,
                          deletedLoCell: state.deletedLoCell.filter(
                              (item) => item.cellId !== action.payload
                            ),
                       
                      };
                  case types.REINSTATE_TOGGLE_FOR_LOC_CELL_FAILURE:
                      return {
                          ...state,
                          reInstatedLocationCellById: false,
                          reInstatedLocationCellByIdError: true,
                      };




                      case types.GET_LOCATION_MACHINE_DATA_REQUEST:
                        return { ...state, fetchingLocationMachineData: true, 
                          // fetchingProductionTable: false 
                        };
                      case types.GET_LOCATION_MACHINE_DATA_SUCCESS:
                        return { ...state, fetchingLocationMachineData: false, locationMachineData: action.payload };
                      case types.GET_LOCATION_MACHINE_DATA_FAILURE:
                        return { ...state, fetchingLocationMachineData: false, fetchingLocationMachineDataError: true };

      default:
    return state;
      }
  };