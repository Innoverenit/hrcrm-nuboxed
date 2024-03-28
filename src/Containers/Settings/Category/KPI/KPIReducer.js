import * as types from "./KPIActionTypes";

const initialState = {

    fetchingKpi: false,
    fetchingKpiError: false,
    kpiListData: [],

    fetchingKpiName: false,
    fetchingKpiNameError: false,
    kpiNames:[],

     addingKpi: false,
     addingKpiError: false,

     removingKpi: false,
     removingKpiError: false,

      updatingKpi: false,
      updatingKpiError: false,

     fetchingKpiSearchData:false,
     fetchingKpiSearchDataError:false,
   
};

export const kpiReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_KPI_REQUEST:
    return { ...state,  fetchingKpi: true };
  case types.GET_KPI_SUCCESS:
    return {
      ...state,
      fetchingKpi: false,
       kpiListData: action.payload,
    };
  case types.GET_KPI_FAILURE:
    return {
      ...state,
      fetchingKpi: false,
      fetchingKpiError: true,
    };

 // add sector

 case types.ADD_KPI_REQUEST:
    return { ...state,  addingKpi: true };
  case types.ADD_KPI_SUCCESS:
    return {
      ...state,
      addingKpi: false,
      kpiListData:[action.payload,...state.kpiListData]
      // kpiListData: [...state.kpiListData, action.payload],
      
    };
  case types.ADD_KPI_FAILURE:
    return {
      ...state,
      addingKpi: false,
      addingKpiError: true,
    };

     // remove sector

     case types.REMOVE_KPI_REQUEST:
        return { ...state,  removingKpi: true };
      case types.REMOVE_KPI_SUCCESS:
        return {
          ...state,
          removingKpi: false,
          kpiListData: state.kpiListData.filter(
            (item) => item.performanceManagementId !== action.payload
        ), 
        };
      case types.REMOVE_KPI_FAILURE:
        return {
          ...state,
          removingKpi: false,
          removingKpiError: true,
        };

      //   update an existing SECTOR 

      case types.UPDATE_KPI_REQUEST:
        return { ...state,   updatingKpi: true };
      case types.UPDATE_KPI_SUCCESS:
        // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
        return {
          ...state,
          updatingKpi: false,
          kpiListData: state.kpiListData.map((sector) =>
            sector.performanceManagementId === action.payload.performanceManagementId
              ? action.payload
              : sector
          ),
        };
      case types.UPDATE_KPI_FAILURE:
        return {
          ...state,
          updatingKpi: false,
          updatingKpiError: true,
        };

        case types.GET_KPI_SEARCH_REQUEST:
          return { ...state,  fetchingKpiSearchData: true };
        case types.GET_KPI_SEARCH_SUCCESS:
          return {
            ...state,
            fetchingKpiSearchData: false,
            kpiListData: action.payload,
            // serachedData: action.payload,
          };
        case types.GET_KPI_SEARCH_FAILURE:
          return { ...state,  fetchingKpiSearchDataError: true };


          case types.HANDLE_CLAER_REDUCER_DATA_KPI:
            return { ...state, 
                kpiListData: [], 
              // deletedTruck: [] 
            };  
            
            case types.GET_KPI_NAME_REQUEST:
              return { ...state,  fetchingKpiName: true };
            case types.GET_KPI_NAME_SUCCESS:
              return {
                ...state,
                fetchingKpiName: false,
                 kpiNames: action.payload,
              };
            case types.GET_KPI_NAME_FAILURE:
              return {
                ...state,
                fetchingKpiName: false,
                fetchingKpiNameError: true,
              };
    
    default:
        return state;
    }
  };