import * as types from "./PrmotionActionType";
const initialState = {
    addingpromotionModal:false ,
    viewType:"card",

    addingPrmotions: false,
    addingPrmotionsError:false,

    addingProuctToggle: false,
    addingProuctToggleError: false,

    addingMaterialToggle: false,
    addingMaterialToggleError: false,

    updatingPrmotion: false,
     updatingPrmotionError: false,

    addingDiscountToggle: false,
    addingDiscountToggleError: false,

    prmotionUpdatedrawr:false,

    addingSuppliesToggle: false,
    addingSuppliesToggleError: false,

    fetchingPromotionsData: false,
    fetchingPromotionsDataError: false,
    promotionsData:[]

  };
  export const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_PROMOTION_VIEW_TYPE:
            return { ...state, viewType: action.payload };
            case types.HANDLE_PROMOTIOND_MODAL:
                return { ...state, addingpromotionModal: action.payload }; 


                case types.ADD_PROMOTIONS_REQUEST:
                  return { ...state, addingPrmotions: true };
                case types.ADD_PROMOTIONS_SUCCESS:
                  return { ...state, 
                    addingPrmotions: false, 
                    addingpromotionModal: false ,
                    promotionsData:[action.payload,...state.promotionsData]
                  };
                case types.ADD_PROMOTIONS_FAILURE:
                  return { ...state, 
                    addingPrmotions: false,
                    addingPrmotionsError:true,
                    addingpromotionModal: false };    
           
                    case types.GET_PRMOTION_DATA_REQUEST:
                      return { ...state, fetchingPromotionsData: true };
                    case types.GET_PRMOTION_DATA_SUCCESS:     
                      return {
                        ...state,
                        fetchingPromotionsData: false,
                       // promotionsData:[action.payload,...state.promotionsData] 
                       promotionsData: action.payload             
                      };
                    case types.GET_PRMOTION_DATA_FAILURE:
                      return {
                        ...state,
                        fetchingPromotionsData: false,
                        fetchingPromotionsDataError: true,
                      };

                      case types.ADDING_PRODUCT_TOGGLE_REQUEST:
                        return { ...state, addingProuctToggle: true };
                      case types.ADDING_PRODUCT_TOGGLE_SUCCESS:
                        return {
                          ...state,
                          addingProuctToggle: false,
                          promotionsData: state.promotionsData.map((item) => {
                            if (item.promoCodeId === action.payload.promoCodeId) {
                              return action.payload;
                            } else {
                              return item;
                            }
                          }),
                        }
                      case types.ADDING_PRODUCT_TOGGLE_FAILURE:
                        return {
                          ...state,
                          addingProuctToggle: false,
                          addingProuctToggleError: true,
                        };

                        case types.ADDING_MATERIAL_TOGGLE_REQUEST:
                          return { ...state, addingMaterialToggle: true };
                        case types.ADDING_MATERIAL_TOGGLE_SUCCESS:
                          return {
                            ...state,
                            addingMaterialToggle: false,
                            promotionsData: state.promotionsData.map((item) => {
                              if (item.promoCodeId === action.payload.promoCodeId) {
                                return action.payload;
                              } else {
                                return item;
                              }
                            }),
                          }
                        case types.ADDING_MATERIAL_TOGGLE_FAILURE:
                          return {
                            ...state,
                            addingMaterialToggle: false,
                            addingMaterialToggleError: true,
                          };

                          case types.ADDING_SUPPLIES_TOGGLE_REQUEST:
                            return { ...state, addingSuppliesToggle: true };
                          case types.ADDING_SUPPLIES_TOGGLE_SUCCESS:
                            return {
                              ...state,
                              addingSuppliesToggle: false,
                              promotionsData: state.promotionsData.map((item) => {
                                if (item.promoCodeId === action.payload.promoCodeId) {
                                  return action.payload;
                                } else {
                                  return item;
                                }
                              }),
                            }
                          case types.ADDING_SUPPLIES_TOGGLE_FAILURE:
                            return {
                              ...state,
                              addingSuppliesToggle: false,
                              addingSuppliesToggleError: true,
                            };

                            case types.ADDING_DISCOUNT_TOGGLE_REQUEST:
                              return { ...state, addingDiscountToggle: true };
                            case types.ADDING_DISCOUNT_TOGGLE_SUCCESS:
                              return {
                                ...state,
                                addingDiscountToggle: false,
                                promotionsData: state.promotionsData.map((item) => {
                                  if (item.promoCodeId === action.payload.promoCodeId) {
                                    return action.payload;
                                  } else {
                                    return item;
                                  }
                                }),
                              }
                            case types.ADDING_DISCOUNT_TOGGLE_FAILURE:
                              return {
                                ...state,
                                addingDiscountToggle: false,
                                addingDiscountToggleError: true,
                              };

                              case types.HANDLE_UPDATE_PROMOTION_DRAWER:
                                return { ...state, prmotionUpdatedrawr: action.payload }; 

                                case types.UPDATE_PRMOTIONS_REQUEST:
                                  return { ...state, updatingPrmotion: true };
                                case types.UPDATE_PRMOTIONS_SUCCESS:
                                  return {
                                    ...state,
                                    prmotionUpdatedrawr: false,
                                    updatingPrmotion: false,
                                    promotionsData: state.promotionsData.map((LOCS) =>
                                    LOCS.promoCodeId === action.payload.promoCodeId
                                      ? action.payload
                                      : LOCS
                                  ),
                                  };
                                case types.UPDATE_PRMOTIONS_FAILURE:
                                  return { ...state, updatingPrmotion: false, updatingPrmotionError: true };         




      default:
    return state;
      }
  };