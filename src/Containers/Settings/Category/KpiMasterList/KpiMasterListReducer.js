import * as types from "./KpiMasterListActionTypes";
import dayjs from "dayjs";

const initialState = {

    fetchingMasterKpi: false,
    fetchingMasterKpiError: false,
    masterKpiList: [],

    fetchingPerformanceCount: false,
    fetchingPerformanceCountError: false,
    masterKpiCount:{},


    addingMasterKpi: false,
    addingMasterKpiError: false,

    
    removingMasterKpi: false,
    removingMasterKpiError: false,

    updatingMasterKpi: false,
    updatingMasterKpiError: false,

    fetchingMasterKpiSearchData:false,
    fetchingMasterKpiSearchDataError:false,

   
};

export const masterKpiReducer = (state = initialState, action) => {
    switch (action.type) {

 //get opportunity customer

 case types.GET_MASTER_KPI_REQUEST:
    return { ...state, fetchingMasterKpi: true };
  case types.GET_MASTER_KPI_SUCCESS:
    return {
      ...state,
      fetchingMasterKpi: false,
      masterKpiList: action.payload,
    };
  case types.GET_MASTER_KPI_FAILURE:
    return {
      ...state,
      fetchingMasterKpi: false,
      fetchingMasterKpiError: true,
    };

 // add sector

 case types.ADD_MASTER_KPI_REQUEST:
    return { ...state, addingMasterKpi: true };
  case types.ADD_MASTER_KPI_SUCCESS:
    return {
      ...state,
      addingMasterKpi: false,
      masterKpiList:[action.payload,...state.masterKpiList]
      // masterKpiList: [...state.masterKpiList, action.payload],
      
    };
  case types.ADD_MASTER_KPI_FAILURE:
    return {
      ...state,
      addingMasterKpi: false,
      addingMasterKpiError: true,
    };



    case types.REMOVE_MASTER_KPI_REQUEST:
      return { ...state, removingMasterKpi: true };
    case types.REMOVE_MASTER_KPI_SUCCESS:
      return {
        ...state,
        removingMasterKpi: false,
        masterKpiList: state.masterKpiList.filter(
          (item) => item.performanceManagementId !== action.payload
      ), 
      };
    case types.REMOVE_MASTER_KPI_FAILURE:
      return {
        ...state,
        removingMasterKpi: false,
        removingMasterKpiError: true,
      };

    //   update an existing SECTOR 

    case types.UPDATE_MASTER_KPI_REQUEST:
      return { ...state, updatingMasterKpi: true };
    case types.UPDATE_MASTER_KPI_SUCCESS:
      // return { ...state, updatingCustomers: false, sources: [...state.sources, action.payload] };
      return {
        ...state,
        updatingMasterKpi: false,
        masterKpiList: state.masterKpiList.map((sector) =>
          sector.performanceManagementId === action.payload.performanceManagementId
            ? action.payload
            : sector
        ),
      };
    case types.UPDATE_MASTER_KPI_FAILURE:
      return {
        ...state,
        updatingMasterKpi: false,
        updatingMasterKpiError: true,
      };

      case types.GET_MASTER_KPI_SEARCH_REQUEST:
        return { ...state, fetchingMasterKpiSearchData: true };
      case types.GET_MASTER_KPI_SEARCH_SUCCESS:
        return {
          ...state,
          fetchingMasterKpiSearchData: false,
          masterKpiList: action.payload,
          // serachedData: action.payload,
        };
      case types.GET_MASTER_KPI_SEARCH_FAILURE:
        return { ...state, fetchingMasterKpiSearchDataError: true };

        case types.HANDLE_CLAER_REDUCER_DATA_MASTER_KPI:
          return { ...state, 
            masterKpiList: [], 
            // deletedTruck: [] 
          };


          case types.GET_MASTER_KPI_COUNT_REQUEST:
            return { ...state, fetchingPerformanceCount: true };
          case types.GET_MASTER_KPI_COUNT_SUCCESS:
            return { ...state, fetchingPerformanceCount: false, 
              masterKpiCount: action.payload };
          case types.GET_MASTER_KPI_COUNT_FAILURE:
            return {
              ...state,
              fetchingPerformanceCount: false,
              fetchingPerformanceCountError: true,
            };



        
    
    default:
        return state;
    }
  };