import * as types from "./MileageActionTypes";

const initialState = {
  addingMileage: false,
  addingMileageError: false,

  addMileageModal: false,

  fetchingMileageByUserId: false,
  fetchingMileageByUserIdError: false,
  MileageDat: [],

  fetchingMileageByVoucherId: false,
  fetchingMileageByVoucherIdError: false,
  mileageVoucherId: [],

  setEditingMileage:{},
  updateMileageModal:false,

  updatingMileage: false,
  updatingMileageError: false,

  deletingMileage: false,
  deletingMileageError: false,

  deletingMileageVoucher: false,
  deletingMileageVoucherError: false,
  
  mileageVoucherIdDrawer:false,
  
  viewType:"card",

  updateStatusMileageModal:false,

  fetchingMileageStatus: false,
  fetchingMileageStatusError: false,
  mileageStatus:[],

  fetchingPendingMileage: false,
  fetchingPendingMileageError:false,
  pendingMileages:[],
  fetchingApprovedMileage: false,
  fetchingApprovedMileageError:false,
  approvedMileages:[],
  fetchingRejectedMileage: false,
  fetchingRejectedMileageError:false,
  rejectedMileages:[],

};

export const mileageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HANDLE_MILEAGE_MODAL:
      return { ...state, addMileageModal: action.payload };

    case types.ADD_MILEAGE_REQUEST:
      return { ...state, addingMileage: true };
    case types.ADD_MILEAGE_SUCCESS:
      return { ...state, addingMileage: false, addMileageModal: false };
    case types.ADD_MILEAGE_FAILURE:
      return { ...state, addingMileage: false, addingMileageError: true };

    case types.GET_MILEAGE_BY_USER_ID_REQUEST:
      return { ...state, fetchingMileageByUserId: true };
    case types.GET_MILEAGE_BY_USER_ID_SUCCESS:
      return {
        ...state,
        fetchingMileageByUserId: false,
        MileageDat: action.payload,
      };
    case types.GET_MILEAGE_BY_USER_ID_FAILURE:
      return {
        ...state,
        fetchingMileageByUserId: false,
        fetchingMileageByUserIdError: true,
      };

    case types.GET_MILEAGE_BY_VOUCHER_ID_REQUEST:
      return { ...state, fetchingMileageByVoucherId: true };
    case types.GET_MILEAGE_BY_VOUCHER_ID_SUCCESS:
      return {
        ...state,
        fetchingMileageByVoucherId: false,
        mileageVoucherId: action.payload,
      };
    case types.GET_MILEAGE_BY_VOUCHER_ID_FAILURE:
      return {
        ...state,
        fetchingMileageByVoucherId: false,
        fetchingMileageByVoucherIdError: true,
      };

      case types.SET_MILEAGE_EDIT:
        return { ...state, setEditingMileage: action.payload };

        case types.HANDLE_UPDATE_MILEAGE_MODAL:
          return { ...state, updateMileageModal: action.payload };

          case types.UPDATE_MILEAGE_REQUEST:
            return { ...state, updatingMileage: true };
          case types.UPDATE_MILEAGE_SUCCESS:
            return {
              ...state,
              updatingMileage: false,
              updateMileageModal: false,
              mileageVoucherId: state.mileageVoucherId.map((item) => {
                if (item.mileageId === action.payload.mileageId) {
                  return action.payload;
                } else {
                  return item;
                }
              }),
            };
          case types.UPDATE_MILEAGE_FAILURE:
            return {
              ...state,
              updatingMileage: false,
              updatingMileageError: true,
            };

            case types.DELETE_MILEAGE_REQUEST:
              return { ...state, deletingMileage: true };
            case types.DELETE_MILEAGE_SUCCESS:
              return {
                ...state,
                deletingMileage: false,
                mileageVoucherId: state.mileageVoucherId.filter(
                  (item) => item.mileageId !== action.payload
                ),
              };
            case types.DELETE_MILEAGE_FAILURE:
              return { ...state, deletingMileage: false, deletingMileageError: false };
              
              case types.DELETE_MILEAGE_VOUCHER_REQUEST:
                return { ...state, deletingMileageVoucher: true };
              case types.DELETE_MILEAGE_VOUCHER_SUCCESS:
                return {
                  ...state,
                  deletingMileageVoucher: false,
                  MileageDat: state.MileageDat.filter(
                    (item) => item.voucherId !== action.payload
                  ),
                };
              case types.DELETE_MILEAGE_VOUCHER_FAILURE:
                return { ...state, deletingMileageVoucher: false, deletingMileageVoucherError: false };
            
                case types.HANDLE_MILEAGE_VOUCHERID_DRAWER:
              return {...state,mileageVoucherIdDrawer:action.payload}
            
              case types.SET_MILEAGE_VIEW_TYPE:
                return { ...state, viewType: action.payload };

                case types.GET_PENDING_MILEAGE_REQUEST:
                  return { ...state, fetchingPendingMileage: true };
                case types.GET_PENDING_MILEAGE_SUCCESS:
                  return { ...state, fetchingPendingMileage: false, pendingMileages: action.payload };
                case types.GET_PENDING_MILEAGE_FAILURE:
                  return {
                    ...state,
                    fetchingPendingMileage: false,
                    fetchingPendingMileageError: true,
                  };
                  case types.GET_APPROVED_MILEAGE_REQUEST:
                    return { ...state, fetchingApprovedMileage: true };
                  case types.GET_APPROVED_MILEAGE_SUCCESS:
                    return { ...state, fetchingApprovedMileage: false, approvedMileages: action.payload };
                  case types.GET_APPROVED_MILEAGE_FAILURE:
                    return {
                      ...state,
                      fetchingApprovedMileage: false,
                      fetchingApprovedMileageError: true,
                    };
                    case types.GET_REJECTED_MILEAGE_REQUEST:
                      return { ...state, fetchingRejectedMileage: true };
                    case types.GET_REJECTED_MILEAGE_SUCCESS:
                      return { ...state, fetchingRejectedMileage: false, rejectedMileages: action.payload };
                    case types.GET_REJECTED_MILEAGE_FAILURE:
                      return {
                        ...state,
                        fetchingRejectedMileage: false,
                        fetchingRejectedMileageError: true,
                      };

                      case types.HANDLE_STATUS_MILEAGE_MODAL:
                        return { ...state, updateStatusMileageModal: action.payload };


                        case types.GET_MILEAGE_STATUS_BY_MILEAGEID_REQUEST:
                          return { ...state, fetchingMileageStatus: true };
                      case types.GET_MILEAGE_STATUS_BY_MILEAGEID_SUCCESS:
                          return {
                              ...state,
                              fetchingMileageStatus: false,
                              mileageStatus: action.payload,
                          };
                      case types.GET_MILEAGE_STATUS_BY_MILEAGEID_FAILURE:
                          return {
                              ...state,
                              fetchingMileageStatus: false,
                              fetchingMileageStatusError: true,
                          };


            }         
  return state;
};
