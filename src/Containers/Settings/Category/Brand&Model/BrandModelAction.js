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
            if (res.data.message) {
                Swal.fire({
                  icon: 'error',
                  title: res.data.message,
                  // showConfirmButton: false,
                  // timer: 1500
                });
              } else {
               
                Swal.fire({
                  icon: 'success',
                  title: 'BrandModel added Successfully!',
                  // showConfirmButton: false,
                  // timer: 1500
                });
              }
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
                title: 'BrandModel Updated Successfully!',
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

export const addModel = (model,orgId,cb) => (dispatch,getState) => {
    const orgId = getState().auth.userDetails.organizationId;
    dispatch({
      type: types.ADD_MODEL_REQUEST,
    });
    axios
      .post(`${base_url2}/`, model, 
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // message.error(model.message)
        if (res.data.message) {
          Swal.fire({
            icon: 'error',
            title: res.data.message,
            // showConfirmButton: false,
            // timer: 1500
          });
        } else {
         
          Swal.fire({
            icon: 'success',
            title: 'Model added Successfully!',
            // showConfirmButton: false,
            // timer: 1500
          });
        }
        // dispatch(getRoles(orgId));
        // dispatch(getRoleCount(orgId));
        console.log(res);
        dispatch({
          type: types.ADD_MODEL_SUCCESS,
          payload: { 
            ...model, 
           
          },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_MODEL_FAILURE,
        });
    
        cb();
      });
  };

  export const getModels = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_MODELS_REQUEST,
    });
    axios
      .get(`${base_url2}}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_MODELS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_MODELS_FAILURE,
          payload: err,
        });
      });
  };