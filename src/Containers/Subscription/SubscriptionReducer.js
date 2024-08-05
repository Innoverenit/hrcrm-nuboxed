import * as types from "./SubscriptionActionTypes";

const initialState = {
    createSubscriptiondrawer:false,

    addingSuscrpitionModal:false,

    addingSuscrptions: false,
    addingSuscrptionsError:false,

    updatingSuscrption: false,
    updatingSuscrptionError: false,

    fetchingSuscrption: false,
    fetchingSuscrptionError: false,
    suscrptionData:{},


    fetchingSubscriptions:false,
    fetchingSubscriptionsError:false,
    subscriptionsFormData:[],
   

    addingNewSubscription: false,
    addingNewSubscriptionError:false,
    fetchingSuscrption: false,
    fetchingSuscrptionError:false,
    newSubscriptionList:[]
};
export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
  
    case types.HANDLE_CREATE_SUBSCRIPTION_DRAWER:
        return { ...state, createSubscriptiondrawer: action.payload };
  
        case types.UPDATE_SUSCRIPTION_REQUEST:
          return { ...state, updatingSuscrption: true };
        case types.UPDATE_SUSCRIPTION_SUCCESS:
          return {
            ...state,
            updatingSuscrption: false,
            createSubscriptiondrawer: false,
            // employees: state.employees.map((item) => {
            //   if (item.employeeId === action.payload.employeeId) {
            //     return action.payload;
            //   } else {
            //     return item;
            //   }
            // }),
          };
        case types.UPDATE_SUSCRIPTION_FAILURE:
          return {
            ...state,
            updatingSuscrption: false,
            updatingSuscrptionError: true,
          };
          case types.GET_SUSCRIPTION_REQUEST:
            return { ...state, fetchingSuscrption: true };
          case types.GET_SUSCRIPTION_SUCCESS:
            return {
              ...state,
              fetchingSuscrption: false,
              suscrptionData: action.payload,
            };
          case types.GET_SUSCRIPTION_FAILURE:
            return {
              ...state,
              fetchingSuscrption: false,
              fetchingSuscrptionError: true,
            };



            case types.GET_SUBSCRIPTIONS_REQUEST:
              return { ...state, fetchingSubscriptions: true };
            case types.GET_SUBSCRIPTIONS_SUCCESS:
              return {
                ...state,
                fetchingSubscriptions: false,
                //customerByUserId: [...state.customerByUserId, ...action.payload],
             subscriptionsFormData:action.payload
              };
            case types.GET_SUBSCRIPTIONS_FAILURE:
              return {
                ...state,
                fetchingSubscriptions: false,
                fetchingSubscriptionsError: true,
              };

            case types.UPDATE_SUSCRIPTION_FAILURE:
              return {
                ...state,
                updatingSuscrption: false,
                updatingSuscrptionError: true,
              };

              case types.GET_SUSCRIPTION_REQUEST:
                return { ...state, fetchingSuscrption: true };
              case types.GET_SUSCRIPTION_SUCCESS:
                return {
                  ...state,
                  fetchingSuscrption: false,
                  suscrptionData: action.payload,
                };
              case types.GET_SUSCRIPTION_FAILURE:
                return {
                  ...state,
                  fetchingSuscrption: false,
                  fetchingSuscrptionError: true,
                };

                case types.ADD_NEW_SUBSCRIPTION_REQUEST:
                  return { ...state, addingNewSubscription: true };
                case types.ADD_NEW_SUBSCRIPTION_SUCCESS:
                  return {
                    ...state,
                    addingNewSubscription: false,
                    // distributorContactModal: false,
                  };
                case types.ADD_NEW_SUBSCRIPTION_FAILURE:
                  return {
                    ...state,
                    addingNewSubscription: false,
                    addingNewSubscriptionError: true,
                    // distributorContactModal: false,
                  };
                
                case types.GET_NEW_SUBSCRIPTION_REQUEST:
                  return { ...state, fetchingSuscrption: true };
                case types.GET_NEW_SUBSCRIPTION_SUCCESS:
                  return {
                    ...state,
                    fetchingSuscrption: false,
                    newSubscriptionList: action.payload,
                  };
                case types.GET_NEW_SUBSCRIPTION_FAILURE:
                  return {
                    ...state,
                    fetchingSuscrption: false,
                    fetchingSuscrptionError: true,
                  };

                  case types.HANDLE_SUSCRIPTION_MODAL:
                    return { ...state, addingSuscrpitionModal: action.payload }; 

                    case types.ADD_SUSCRIPTIONS_REQUEST:
                      return { ...state, addingSuscrptions: true };
                    case types.ADD_SUSCRIPTIONS_SUCCESS:
                      const existingSubscriptionIndex = state.subscriptionsFormData.findIndex(item => item.subscriptionId === action.payload);

                      let updatedSubscriptionsFormData;
                      if (existingSubscriptionIndex !== -1) {
                        // Update the existing subscription
                        updatedSubscriptionsFormData = state.subscriptionsFormData.map((item, index) => {
                          if (index === existingSubscriptionIndex) {
                            return action.payload;
                          }
                          return item;
                        });
                      } else {
                        // Add the new subscription
                        updatedSubscriptionsFormData = [...state.subscriptionsFormData, action.payload];
                      }
                      return { ...state, 
                        addingSuscrptions: false, 
                        subscriptionsFormData: updatedSubscriptionsFormData,
                        // subscriptionsFormData: state.subscriptionsFormData.map((item) => {
                        //   if (item.subscriptionId === action.payload.subscriptionId) {
                        //     return action.payload;
                        //   } else {
                        //     return item;
                        //   }
                        // }),
                        //addingSuscrpitionModal: false ,
                        //newSubscriptionList:[action.payload,...state.newSubscriptionList]
                      };
                    case types.ADD_SUSCRIPTIONS_FAILURE:
                      return { ...state, 
                        addingSuscrptions: false,
                        addingSuscrptionsError:true,
                        addingSuscrpitionModal: false };    


    default:
      return state;
}
};