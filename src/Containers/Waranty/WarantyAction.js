



import * as types from "./WarantyActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import Swal from 'sweetalert2'
import { base_url,base_url2 } from "../../Config/Auth";
import { message } from "antd";




export const handleWarantyDrawerModal = (modalProps) => (dispatch) => {
    dispatch({
      type: types.HANDLE_WARANTY_DRAWER_MODAL,
      payload: modalProps,
    });
  };