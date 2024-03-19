import * as types from "./SectorsActionTypes";
import axios from "axios";
import Swal from 'sweetalert2'
import { base_url } from "../../../Config/Auth";
import { message } from "antd"

/**
 * get all the Sector
 */
 export const getSectors = () => (dispatch) => {
    dispatch({
      type: types.GET_SECTORS_REQUEST,
    });
    axios
    .get(`${base_url}/sector`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
      
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SECTORS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SECTORS_FAILURE,
          payload: err,
        });
      });
  };

  // /**
//  * add a new sector 
//  */
export const addSectors = (sectors, cb) => (dispatch) => {
    console.log(sectors);
    dispatch({
      type: types.ADD_SECTORS_REQUEST,
    });
    axios
      .post(`${base_url}/sector`, sectors, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // dispatch(getSectors());
        {res.data.message?  
          message.success(res.data.message):
          Swal.fire({
            icon: 'success',
            title: 'Sector has been added Successfully',
            showConfirmButton: false,
            // timer: 1500
          })
        // message.success("Sector has been added successfully!");
        }
        console.log(res);
        dispatch({
          type: types.ADD_SECTORS_SUCCESS,
          payload: { ...sectors, },
        });
        cb();
      })
      .catch((err) => {
        console.log(err);
     
        dispatch({
          type: types.ADD_SECTORS_FAILURE,
        });
        // message.success(res.data.message);
        cb();
      });
  };

  /**
 * remove a new sector
 */
export const removeSectors = ( sectorId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_SECTORS_REQUEST,
    });
    axios
      .delete(`${base_url}/sector/${sectorId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Sector has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_SECTORS_SUCCESS,
          payload:sectorId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_SECTORS_FAILURE,
        });
      });
  };

  /**
 *update label of sector
 */
export const updateSectors = ( sectorId,sectorName,cb) => (dispatch) => {
    
    dispatch({
      type: types.UPDATE_SECTORS_REQUEST,
    });
    axios
      .put(
        `${base_url}/sector/update`,
        { sectorName,sectorId,editInd:true },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Sector has been updated Successfully',
          showConfirmButton: false,
          // timer: 1500
        })
        // message.success("Sector has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_SECTORS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_SECTORS_FAILURE,
        });
      });
  };
  
  export const searchSectorName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_SECTOR_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/sector/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        // const actualData = res.data;
        // const filteredData = actualData.filter((item) => { return item.name !== null })
        message.success(res.data.message);
    
      
      
        dispatch({
          type: types.GET_SECTOR_SEARCH_SUCCESS,
          payload: res.data,
        });
  
      }
      )
      .catch((err) => {
        dispatch({
          type: types.GET_SECTOR_SEARCH_FAILURE,
          payload: err,
        });
      });
  }; 

  export const ClearReducerDataOfSector = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_SECTOR,
    });
  };

  export const getSectorCount = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_SECTOR_COUNT_REQUEST,
    });
    axios
      .get(`${base_url}/sector/count/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_SECTOR_COUNT_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_SECTOR_COUNT_FAILURE,
          payload: err,
        });
      });
  };