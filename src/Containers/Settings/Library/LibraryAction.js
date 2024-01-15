import * as types from "./LibraryActionTypes";
import axios from "axios";
import dayjs from "dayjs";
import { base_url } from "../../../Config/Auth";
import { message } from "antd";
/**
 * get all the Library
 */
 export const getLibrarys = (orgId) => (dispatch) => {
    dispatch({
      type: types.GET_LIBRARYS_REQUEST,
    });
    axios               
      .get(`${base_url}/candidate/defination/${orgId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({
          type: types.GET_LIBRARYS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.GET_LIBRARYS_FAILURE,
          payload: err,
        });
      });
  };


  /**
 * add a new LIBRARYS
 */
export const addLibrarys = (name) => (dispatch,getState) => {
  const orgId = getState().auth.userDetails.organizationId;
    //console.log(name);
    dispatch({
      type: types.ADD_LIBRARYS_REQUEST,
    });
    axios
      .post(`${base_url}/candidate/defination`, name, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("New Skills successfully added to Library!");
       
        dispatch(getLibrarys(orgId));
             dispatch({
            type: types.ADD_LIBRARYS_SUCCESS,
            payload: res.data,
          });
      
        console.log(res);
        })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_LIBRARYS_FAILURE,
        });
     
      });
  };



  
/**
 * remove a new LIBRARYS
 */
// export const removeLibrarys = (cb) => (dispatch) => {
//     // console.log(leadDocumentsId);
//     dispatch({
//       type: types.REMOVE_LIBRARYS_REQUEST,
//     });
//     axios
//       .delete(`${base_url}/documents`, {
//         headers: {
//           Authorization: "Bearer " + sessionStorage.getItem("token") || "",
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         dispatch({
//           type: types.REMOVE_LIBRARYS_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         dispatch({
//           type: types.REMOVE_LIBRARYS_FAILURE,
//         });
//       });
//   };
  


/**
 *update label of LIBRARYS
 */
 export const updateLibrarys = (definationId, name, cb) => (dispatch) => {
    // console.log(leadDocumentsId, DocumentsName);
    dispatch({
      type: types.UPDATE_LIBRARYS_REQUEST,
    });
    axios
      .put(
      // `${base_url}/libraryType`,
        `${base_url}/candidate/definations`,
        { definationId, name ,editInd:"true"
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token") || "",
          },
        }
      )
      .then((res) => {
        message.success("Skills Library has been updated successfully!");
        console.log(res);
        dispatch({
          type: types.UPDATE_LIBRARYS_SUCCESS,
          payload: res.data,
        });
        // message.warn(res.data.message)
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.UPDATE_LIBRARYS_FAILURE,
        });
      });
  };

  export const searchLibraryName = (name) => (dispatch) => {
    dispatch({
      type: types.GET_LIBRARY_SEARCH_REQUEST,
    });
    axios
      .get(`${base_url}/candidate/defination/search/${name}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success(res.data.message);
        dispatch({
          type: types.GET_LIBRARY_SEARCH_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: types.GET_LIBRARY_SEARCH_FAILURE,
          payload: err,
        });
      });
  };  

  export const removeSkills = ( definationId) => (dispatch) => {
    // console.log(typeId);
    dispatch({
      type: types.REMOVE_SKILLS_REQUEST,
    });
    axios
      .delete(`${base_url}/candidate/defination/${definationId}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        message.success("Skill has been deleted successfully!");
        console.log(res);
        dispatch({
          type: types.REMOVE_SKILLS_SUCCESS,
          payload:definationId,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.REMOVE_SKILLS_FAILURE,
        });
      });
  };


  export const ClearReducerDataOfLibrary = () => (dispatch) => {
    dispatch({
      type: types.HANDLE_CLAER_REDUCER_DATA_LIBRARY,
    });
  };
  