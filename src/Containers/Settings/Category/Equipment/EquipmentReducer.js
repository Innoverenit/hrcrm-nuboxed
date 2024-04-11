import * as types from "./EquipmentActionTypes";

const initialState = {

    fetchingEquipment: false,
    fetchingEquipmentError: false,
    equipmentListData: [],

    fetchingEquipmentCount: false,
    fetchingEquipmentCountError: false,
    equipmentCount:{},

     addingEquipment: false,
     addingEquipmentError: false,

     removingEquipment: false,
     removingEquipmentError: false,

      updatingEquipment: false,
      updatingEquipmentError: false,

     fetchingEquipmentSearchData:false,
     fetchingEquipmentSearchDataError:false,
   
};

export const equipmentReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_EQUIPMENT_REQUEST:
    return { ...state,  fetchingEquipment: true };
  case types.GET_EQUIPMENT_SUCCESS:
    return {
      ...state,
      fetchingEquipment: false,
      equipmentListData: action.payload,
    };
  case types.GET_EQUIPMENT_FAILURE:
    return {
      ...state,
      fetchingEquipment: false,
      fetchingEquipmentError: true,
    };

 // add sector

 case types.ADD_EQUIPMENT_REQUEST:
    return { ...state,  addingEquipment: true };
  case types.ADD_EQUIPMENT_SUCCESS:
    return {
      ...state,
      addingEquipment: false,
      equipmentListData:[action.payload,...state.equipmentListData],
      
      // equipmentListData: [...state.equipmentListData, action.payload],
      
    };
  case types.ADD_EQUIPMENT_FAILURE:
    return {
      ...state,
      addingEquipment: false,
      addingEquipmentError: true,
    };

     // remove sector

     case types.REMOVE_EQUIPMENT_REQUEST:
        return { ...state,  removingEquipment: true };
      case types.REMOVE_EQUIPMENT_SUCCESS:
        return {
          ...state,
          removingEquipment: false,
          equipmentListData: state.equipmentListData.filter(
            (item) => item.equipmentId !== action.payload
        ), 
        };
      case types.REMOVE_EQUIPMENT_FAILURE:
        return {
          ...state,
          removingEquipment: false,
          removingEquipmentError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_EQUIPMENT_REQUEST:
        return { ...state,   updatingEquipment: true };
      case types.UPDATE_EQUIPMENT_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingEquipment: false,
          equipmentListData: state.equipmentListData.map((sector) =>
            sector.equipmentId === action.payload.equipmentId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_EQUIPMENT_FAILURE:
        return {
          ...state,
          updatingEquipment: false,
          updatingEquipmentError: true,
        };

        case types.GET_EQUIPMENT_SEARCH_REQUEST:
          return { ...state,  fetchingEquipmentSearchData: true };
        case types.GET_EQUIPMENT_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingEquipmentSearchData: false,
            equipmentListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_EQUIPMENT_SEARCH_FAILURE:
          return { ...state,  fetchingEquipmentSearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_EQUIPMENT:
            return { ...state, 
                equipmentListData: [], 
              // deletedTruck: [] 
            }; 
            
            
            case types.GET_EQUIPMENT_COUNT_REQUEST:
              return { ...state, fetchingEquipmentCount: true };
            case types.GET_EQUIPMENT_COUNT_SUCCESS:
              return { ...state, fetchingEquipmentCount: false, 
                equipmentCount: action.payload };
            case types.GET_EQUIPMENT_COUNT_FAILURE:
              return {
                ...state,
                fetchingEquipmentCount: false,
                fetchingEquipmentCountError: true,
              };
    
    default:
        return state;
    }
  };