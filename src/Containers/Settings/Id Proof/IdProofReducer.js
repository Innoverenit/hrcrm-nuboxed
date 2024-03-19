import * as types from "./IdProofActionTypes";
import dayjs from "dayjs";

const initialState = {
  fetchingIdProofs: false,
  fetchingIdProofsError: false,
  idProofs: [],

  fetchingIdProofCount: false,
  fetchingIdProofCountError: false,
  idProofCount:{},

  addingIdProofs: false,
  addingIdProofsError: false,

  updatingIdProofs: false,
  updatingIdProofsError: false,

  fetchingIdProofSearchData: false,
  fetchingIdProofSearchDataError: false,

  removingIdProof: false,
  removingIdProofError: false,
};

export const idProofsReducer = (state = initialState, action) => {
  switch (action.type) {
    /**
     * get the list of all Designation
     */
    case types.GET_ID_PROOF_REQUEST:
      return { ...state, fetchingIdProofs: true };
    case types.GET_ID_PROOF_SUCCESS:
      return { ...state, fetchingIdProofs: false, idProofs: action.payload };
    case types.GET_ID_PROOF_FAILURE:
      return { ...state, fetchingIdProofs: false, fetchingIdProofsError: true };

    /**
     * add a new document
     */
    case types.ADD_ID_PROOF_REQUEST:
      return { ...state, addingIdProofs: true };
    case types.ADD_ID_PROOF_SUCCESS:
      return {
        ...state,
        addingIdProofs: false,
        idProofs:[action.payload,...state.idProofs],
        // idProofs: [...state.idProofs, action.payload],
      };
    case types.ADD_ID_PROOF_FAILURE:
      return {
        ...state,
        addingIdProofs: false,
        addingIdProofsError: true,
      };

    /**
     * update an existing DESIGNATIONS
     */
    case types.UPDATE_ID_PROOF_REQUEST:
      return { ...state, updatingIdProofs: true };
    case types.UPDATE_ID_PROOF_SUCCESS:
      // return { ...state, updatingDesignations: false, Designations: [...state.Designations, action.payload] };
      return {
        ...state,
        updatingIdProofs: false,
        idProofs: state.idProofs.map((task) =>
        task.IdProofTypeId === action.payload.IdProofTypeId
            ? action.payload
            : task
        ),
        // idProofs: state.idProofs.map((idProof) =>
        //   idProof.idProofTypeId === action.payload.idProofTypeId
        //     ? action.payload
        //     : idProof
        // ),
      };
    case types.UPDATE_ID_PROOF_FAILURE:
      return {
        ...state,
        updatingIdProofs: false,
        updatingIdProofsError: true,
      };

    case types.GET_IDPROOF_SEARCH_REQUEST:
      return { ...state, fetchingIdProofSearchData: true };
    case types.GET_IDPROOF_SEARCH_SUCCESS:
      return {
        ...state,
        fetchingIdProofSearchData: false,
        idProofs: action.payload,
      };
    case types.GET_IDPROOF_SEARCH_FAILURE:
      return { ...state, fetchingIdProofSearchDataError: true };

    case types.REMOVE_ID_PROOF_REQUEST:
      return { ...state, removingIdProof: true };
    case types.REMOVE_ID_PROOF_SUCCESS:
      return {
        ...state,
        removingIdProof: false,
        idProofs: state.idProofs.filter((item) => item.IdProofTypeId !== action.payload),
      };
    case types.REMOVE_ID_PROOF_FAILURE:
      return {
        ...state,
        removingIdProof: false,
        removingIdProofError: true,
      };

      case types.HANDLE_CLAER_REDUCER_DATA_ID_PROOF:
        return { ...state, 
          idProofs: [], 
          // deletedTruck: [] 
        };


        case types.GET_ID_PROOF_COUNT_REQUEST:
          return { ...state, fetchingIdProofCount: true };
        case types.GET_ID_PROOF_COUNT_SUCCESS:
          return { ...state, fetchingIdProofCount: false, 
            idProofCount: action.payload };
        case types.GET_ID_PROOF_COUNT_FAILURE:
          return {
            ...state,
            fetchingIdProofCount: false,
            fetchingIdProofCountError: true,
          };

    default:
      return state;
  }
};
