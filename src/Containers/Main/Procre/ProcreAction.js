import * as types from "./ProcreActionTypes";
import axios from "axios";
import { base_url, base_url2 } from "../../../Config/Auth";
import moment from "moment";


/**
 * SET SHIPPER VIEW TYPE
 * TABLE VIEW/CARD VIEW/MAP VIEW
 */
export const setProcreViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_PROCRE_VIEW_TYPE,
    payload: viewType,
  });
};

