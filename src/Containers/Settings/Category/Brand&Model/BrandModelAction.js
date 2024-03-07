import * as types from "./BrandModelType";
import { base_url2 } from "../../../../Config/Auth";
import axios from "axios";
import Swal from 'sweetalert2'

export const addBrandModel = (brand) => (dispatch) => {
    dispatch({
        type: types.ADD_BRAND_MODEL_REQUEST,
    });
    axios
        .post(`${base_url2}/masterlist/saveMasterList`, brand, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'BrandModel has been added Successfully',
                showConfirmButton: false,
                // timer: 1500
              })
            console.log(res);
            dispatch({
                type: types.ADD_BRAND_MODEL_SUCCESS,
                payload: { ...brand },
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.ADD_BRAND_MODEL_FAILURE,
            });
        });
};

/**
 * get all the reasons
 */
export const getBrandModel = () => (dispatch) => {
    dispatch({
        type: types.GET_BRAND_MODEL_REQUEST,
    });
    axios
        .get(`${base_url2}/masterlist/masterList`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token") || "",
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: types.GET_BRAND_MODEL_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.GET_BRAND_MODEL_FAILURE,
                payload: err,
            });
        });
};

//update Reasons
export const updateBrandModel = (phoneMasterListId, brand, model) => (dispatch) => {
    dispatch({
        type: types.UPDATE_BRAND_MODEL_REQUEST,
    });
    axios
        .put(
            `${base_url2}/${phoneMasterListId}`,
            { phoneMasterListId, brand, model },
            {
                headers: {
                    Authorization: "Bearer" + sessionStorage.getItem("token") || "",
                },
            }
        )
        .then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'BrandModel has been Updated Successfully',
                showConfirmButton: false,
                // timer: 1500
              })
            dispatch({
                type: types.UPDATE_BRAND_MODEL_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.UPDATE_BRAND_MODEL_FAILURE,
            });
        });
};