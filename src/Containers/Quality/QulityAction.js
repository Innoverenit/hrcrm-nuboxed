import * as types from "./QulityActionType";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import Swal from "sweetalert2";

export const setQualityViewType = (viewType) => (dispatch) =>
    dispatch({ type: types.SET_QUALITY_VIEW_TYPE, payload: viewType });
