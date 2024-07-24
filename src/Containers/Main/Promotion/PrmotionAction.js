import * as types from "./PrmotionActionType";
import axios from "axios";
import { message } from "antd";
import Swal from 'sweetalert2';

export const handlePromotionsDrawer = (modalProps) => (dispatch) => {
    dispatch({ type: types.HANDLE_PROMOTIOND_MODAL, payload: modalProps });
  };
  

  export const setPromotionViewType = (viewType) => (dispatch) => {
    dispatch({
      type: types.SET_PROMOTION_VIEW_TYPE,
      payload: viewType,
    });
  };