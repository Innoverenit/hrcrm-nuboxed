import * as types from "./ClubActionType";
import { base_url, base_url2 } from "../../../Config/Auth";
import axios from "axios";
import moment from "moment";
import { message } from "antd";
import Swal from "sweetalert2";

export const setClubViewType = (viewType) => (dispatch) =>
    dispatch({ type: types.SET_CLUB_VIEW_TYPE, payload: viewType });
