import * as types from "./AuthTypes";
import { useNavigate } from "react-router-dom";
// import { SET_FISCAL_TIME_INTERVAL } from "../Dashboard/DashBoardActionTypes";
import { base_url, login_url } from "../../Config/Auth";
import axios from "axios";
import { message, notification } from "antd";
// import { createBrowserHistory } from "history";
import dayjs from "dayjs";

import {
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_FAILURE,
} from "./AuthTypes";
import { SET_FISCAL_TIME_INTERVAL_REPORT } from "../Reports/ReportActionType";
import Swal from "sweetalert2";
// import { SET_FISCAL_TIME_INTERVAL_TEAM } from "../Teams/TeamsActionTypes";
// import { SET_FISCAL_TIME_INTERVAL_VIEWPORT } from "../Viewport/ViewportActionTypes";
// const history = createBrowserHistory();


export const updateUserAddress = (userId, address) => (dispatch) => {
  console.log(userId, address);
  // dispatch(getUserDetails(token));
  dispatch({
    type: types.UPDATE_USER_ADDRESS,
    payload: {
      userId,
      address,
    },
  });
};

/**
 * toggle url to local or server
 */
export const toggleServer = (server) => (dispatch) => {
  dispatch({
    type: types.TOGGLE_SERVER,
    payload: server,
  });
};
/**
 * user registration goes here, any person can register .
 * after registration success the person will get an email to activate his/her account
 */
export const register = (user) => (dispatch) => {
  console.log(user);
  dispatch({
    type: types.REGISTER_REQUEST,
  });

  axios
    .post(`${base_url}/registration`, { ...user })
    .then((res) => {
      console.log(res);
      if (res.data.emailInd === true) {
        message.error("Account cannot be created using this user name");
        dispatch({
          type: types.REGISTER_FAILURE,
        });
      } else {
        message.success(
          "Thank you for registering on Korero, Success in closing Opportunities."
        );
        dispatch({
          type: types.REGISTER_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      message.error("Something went wrong!");
      dispatch({
        type: types.REGISTER_FAILURE,
      });
    });
};

/**
 * Email validation goes here
 * this method is a called when user click on the email activation link
 * this method verify the email and if user is verified it send them to set Password page
 */
export const validateEmail =
  (employeeId, token, emailId, organizationId, navigate) => (dispatch) => {
    console.log(employeeId, token, emailId, organizationId);
    dispatch({
      type: types.VALIDATE_EMAIL_REQUEST,
    });

    axios
      .post(`${base_url}/emailValidation`, {
        empId: employeeId,
        token: token,
        emailId: emailId,

        organizationId: organizationId,
      })
      .then((res) => {
        console.log(res);
        if (res.data === true) {
          console.log("email is valid");
          message.success("Your email has been validated successfully.");
          // history.push({
          //   pathname: "/setPassword",
          //   state: {
          //     employeeId: employeeId,
          //     emailId: emailId,
          //     organizationId: organizationId,
          //     token: token,
          //   },
          // });
          
          navigate("/setPassword", {
            state: {
              employeeId: employeeId,
              emailId: emailId,
              organizationId: organizationId,
              token: token,
            },
          });


          dispatch({
              type: types.VALIDATE_EMAIL_SUCCESS,
          })
        }
      })
      .catch((err) => {
        console.log(err);
        // dispatch({
        //     type: types.VALIDATE_EMAIL_FAILURE
        // })
      });
  };
/**
 * reset password
 * this method is a called when user click on the forgot password link
 * this method verify the email and if user is verified it send them to set Password page
 */
export const resetPassword =
  (userId, employeeId, token, emailId, organizationId, history) =>
    (dispatch) => {
      console.log(userId, token, emailId, organizationId);

      axios
        .post(`${base_url}/emailValidation`, {
          employeeId: employeeId,
          emailId: emailId,
          token: token,
          organizationId: organizationId,
        })
        .then((res) => {
          console.log(res);
          if (res.data === true) {
            // history.push({
            //   pathname: "/setPassword",
            //   state: {
            //     employeeId: employeeId,
            //     emailId: emailId,
            //     organizationId: organizationId,
            //     token: token,
            //   },
            // });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
/**
 * Set Password goes here
 * password is set here and after password set it redirect to login page
 */


export const setPassword =
  (userId, organizationId, emailId, password, navigate) => (dispatch) => {
    console.log(userId, organizationId, emailId, password);
    axios
      .post(`${base_url}/setPassword`, {
        userId: userId,
        organizationId: organizationId,
        emailId: emailId,
        password: password,
        ipAddress: "103.72.61.3",
      })
      .then((res) => {
        console.log(res);
        if (res.data === true) {
          message.success("Your password has been saved successfully.");
          // history.push("/login");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

/**
 * change Password goes here
 *change your existing password with a new password
 */
export const changePassword = (data, cb) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.CHANGE_PASSWORD_REQUEST });
  axios
    .post(`${base_url}/changePassword`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({ type: types.CHANGE_PASSWORD_SUCCESS });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.CHANGE_PASSWORD_FAILURE });
      cb();
    });
};

/**
 * forgot Password goes here
 * password is set here and after password set it redirect to login page
 */
export const forgotPassword = (email) => (dispatch) => {
  axios
    .get(`${base_url}/forgotPassword?email=${email}`, email)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * login request with username(email) and password
 * after successfull login it store the recieved token to local storage sends to dashboard
 */
export const login =
  ({ userName, password }, navigate, cb) =>
    (dispatch) => {
      dispatch({
        type: types.LOGIN_REQUEST,
      });
      axios
        .post(`${login_url}/token/generate-token`, {
          username: userName,
          password: password,
        })
        .then((res) => {
          // message.success('Welcome to FokusWork, great to have you here.')
          console.log(res);
          sessionStorage.setItem("token", res.data.token);

          dispatch(getUserDetails(res.data.token));
         
          navigate("/dashboard");
          dispatch({
            type: types.LOGIN_SUCCESS,
            payload: res.data,
          });
          cb && cb("success");
        })
        .catch((err) => {
          console.log(err && err.response && err.response.data);
          cb && cb("failure");

          if (
            err &&
            err.response &&
            err.response.data ===
            "You have entered an invalid username or password "
          ) {
            message.error("You have entered an invalid username or password ");
          } else {
            message.error(err.response.data);
            console.log(err);
            navigate("/");
            // history.push({
            //   pathname: "/",
            // });
          }
          dispatch({
            type: types.LOGIN_FAILURE,
            payload: err,
          });
        });
    };

export const getCurrency = () => (dispatch) => {
  dispatch({
    type: types.GET_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url}/currencies`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CURRENCY_FAILURE,
        payload: err,
      });
    });
};

export const getCategory = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_CATEGORY_REQUEST,
  });
  axios
    .get(`${base_url}/category/all/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CATEGORY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CATEGORY_FAILURE,
        payload: err,
      });
    });
};

export const getTimeZone = () => (dispatch) => {
  dispatch({
    type: types.GET_TIMEZONE_REQUEST,
  });
  axios
    .get(`${base_url}/timezones`)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TIMEZONE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TIMEZONE_FAILURE,
        payload: err,
      });
    });
};

export const getCountries = () => (dispatch) => {
  dispatch({
    type: types.GET_COUNTRIES_REQUEST,
  });
  axios
    .get(`${base_url}/countries`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_COUNTRIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_COUNTRIES_FAILURE,
        payload: err,
      });
    });
};

export const getSaleCurrency = () => (dispatch) => {
  dispatch({
    type: types.GET_SALE_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url}/currencies/sales`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_SALE_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_SALE_CURRENCY_FAILURE,
        payload: err,
      });
    });
};
/**

 * get user details after login
 */
export const getUserDetails = (token,navigate) => (dispatch) => {
  dispatch({
    type: types.GET_USER_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/employee/profile`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      sessionStorage.setItem("userDetails", JSON.stringify(res.data));
      dispatch({
        type: types.GET_USER_DETAILS_SUCCESS,
        payload: res.data,
      });

      dispatch(setFiscalTimeIntervalReport(res.data));
      // dispatch(setFiscalTimeIntervalTeam(res.data));
      // dispatch(setFiscalTimeIntervalViewport(res.data));

      // dispatch(setFiscalTimeInterval(res.data));

      // dispatch(getLoginDetails(res.data.userId));
    })
    .catch((err) => {
      // message.error("Oops, something went wrong during getting user details.");
      console.log(err);
     
      navigate("/");
      dispatch({
        type: types.GET_USER_DETAILS_FAILURE,
        payload: err,
      });
    });
};
// export const setFiscalTimeInterval = (data) => (dispatch) => {
//   dispatch({
//     type: SET_FISCAL_TIME_INTERVAL,
//     payload: data,
//   });
// };
export const setFiscalTimeIntervalReport = (data) => (dispatch) => {
  dispatch({
    type: SET_FISCAL_TIME_INTERVAL_REPORT,
    payload: data,
  });
};


export const handleRepositoryDocumentDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REPOSITORY_DOCUMENT_DRAWER_MODAL,
    payload: modalProps,
  });
};


export const setEditRepositoryList = (name) => (dispatch) => {
  dispatch({
    type: types.SET_REPOSITORY_EDIT,
    payload: name,
  });
};

// export const setFiscalTimeIntervalTeam = (data) => (dispatch) => {
//   //////////debugger;
//   dispatch({
//     type: SET_FISCAL_TIME_INTERVAL_TEAM,
//     payload: data,
//   });
// };
// export const setFiscalTimeIntervalViewport = (data) => (dispatch) => {
//   //////////debugger;
//   dispatch({
//     type: SET_FISCAL_TIME_INTERVAL_VIEWPORT,
//     payload: data,
//   });
// };
/**
 * update contact address
 * @param {string} userId
 * @param {address object} address
 */

/**
 * get user details after login
 */
export const getOrganizationDetails = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ORGANIZATION_DETAILS_REQUEST,
  });
  axios
    .get(`${base_url}/organization/get/${orgId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORGANIZATION_DETAILS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORGANIZATION_DETAILS_FAILURE,
        payload: err,
      });
    });
};

export const handleUpdateOrganizationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_UPDATE_ORGANIZATION_MODAL,
    payload: modalProps,
  });
};

/**
 * update user details after login
 */
/**
 * update user details after login
 */
export const updateOrganizationDetails = (orgId, data, cb) => (dispatch) => {
  console.log(data);
  console.log(orgId);
  dispatch({
    type: types.UPDATE_ORGANIZATION_DETAILS_REQUEST,
  });
  axios
    .put(
      `${base_url}/organization/update/${orgId}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      // dispatch(getOrganizationDetails());
      dispatch(getOrganizationDetails(orgId));
      dispatch(getOrganizationList());
      dispatch({
        type: types.UPDATE_ORGANIZATION_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_ORGANIZATION_DETAILS_FAILURE,
        payload: err,
      });
    });
};

/**
 * update oraganization subscription type STARTER/PROFESSIONAL
 */
export const updateSubscriptionType = (subscriptionType) => (dispatch) =>
  dispatch({ type: types.UPDATE_SUBSCRIPTION_TYPE, payload: subscriptionType });

/**
 * get last login detail
 */
export const getLoginDetails = (userId) => (dispatch) => {
  axios
    .get(`${base_url}/loginDetails/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      notification.open({
        placement: "bottomRight",
        message: "Welcome to Korero, great to have you here.",
        description:
          "Last logged on " +
          dayjs(res.data && res.data[1] && res.data[1].loginDate).format("LLL"),
        style: {
          // backgroundColor: '#1890ff',
          // color: '#fff',
          width: 600,
          marginLeft: 335 - 600,
        },
      });
    })
    .catch((err) => console.log(err));
};
/**
 * logout the user
 * clear token from sessionStorage
 * redirect to login
 */
export const logout = (navigate) => (dispatch) => {
  window.sessionStorage.clear();
 
  navigate("/login");
  dispatch({ type: types.LOGOUT });
  message.success("You have successfully logged out. See you soon.");
};

export const updateUserById = (data, userId, cb) => (dispatch, getState) => {
  console.log(data);
  const { userId } = getState().auth.userDetails;
  // if (employeeId === userId) {
  //   //debugger
  //   dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
  // }
  dispatch({ type: types.UPDATE_USER_BY_ID_REQUEST });
  axios
    .put(
      `${base_url}/employee/${userId}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (userId === userId) {
        dispatch({ type: UPDATE_USER_DETAILS_SUCCESS, payload: res.data });
        sessionStorage.setItem("userDetails", JSON.stringify(res.data));
      }
      dispatch({
        type: types.UPDATE_USER_BY_ID_SUCCESS,
        payload: res.data,
      });
      cb && cb();
    })
    .catch((err) => {
      console.log(err);
      // if (employeeId === userId) {
      // dispatch({ type: UPDATE_USER_DETAILS_FAILURE });
      // }
      dispatch({
        type: types.UPDATE_USER_BY_ID_FAILURE,
        payload: err,
      });
    });
};

/**
 * get topics of interest by contactId
 */
export const getTopicsByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_TOPICS_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/topic/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TOPICS_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TOPICS_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * add topic of a userId
 */
export const addTopicByUserId = (topic) => (dispatch) => {
  console.log(topic);
  dispatch({
    type: types.ADD_TOPIC_BY_USER_ID_REQUEST,
  });
  axios
    .post(`${base_url}/topic`, topic, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.ADD_TOPIC_BY_USER_ID_SUCCESS,
        payload: { ...topic, topicId: res.data },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_TOPIC_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get topics of interest by userId
 */
export const deleteTopicByUserId = (topicId, userId) => (dispatch) => {
  dispatch({
    type: types.DELETE_TOPIC_BY_USER_ID_REQUEST,
  });
  axios
    .delete(`${base_url}/topic/${topicId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.DELETE_TOPIC_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_TOPIC_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getCallsListByUserId = (userId) => (dispatch) => {
  console.log(userId);
  dispatch({
    type: types.GET_CALLS_LIST_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/call/employee/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_CALLS_LIST_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_CALLS_LIST_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get task list by userId
 */
export const getTasksListByUserId = (employeeId, pageNo) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.GET_TASKS_LIST_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/task/employee/${employeeId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASKS_LIST_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASKS_LIST_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
/**
 * get event list by userId
 */
export const getEventsListByUserId = (employeeId) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.GET_EVENTS_LIST_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/event/employee/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_EVENTS_LIST_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_EVENTS_LIST_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getLeavesByUserId = (employeeId) => (dispatch) => {
  console.log(employeeId);
  dispatch({
    type: types.GET_LEAVES_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/employee/leaves/${employeeId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_LEAVES_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_LEAVES_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};
export const addOrganizationSignatureByOrgId =
  (data) => (dispatch, getState) => {
    const { organizationId } = getState().auth.userDetails;
    dispatch({
      type: types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST,
    });
    axios
      .put(`${base_url}/organization/signature`, data, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        dispatch(getOrganizationSignatureByOrgId(organizationId));
        dispatch({
          type: types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE,
          payload: err,
        });
      });
  };

export const getOrganizationSignatureByOrgId = (orgId) => (dispatch) => {
  dispatch({
    type: types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_REQUEST,
  });
  axios
    .get(`${base_url}/organization/signature`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ORGANIZATION_SIGNATUE_BY_ORGANIZATION_ID_FAILURE,
        payload: err,
      });
    });
};

export const addPersonalSignatureByUserId = (data) => (dispatch, getState) => {
  const { userId } = getState().auth.userDetails;
  dispatch({
    type: types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST,
  });
  axios
    .put(`${base_url}/user/signature`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch(getPersonalSignatureByUserId(userId));
      dispatch({
        type: types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const getPersonalSignatureByUserId = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_PERSONAL_SIGNATUE_BY_USER_ID_REQUEST,
  });
  axios
    .get(`${base_url}/user/signature`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_PERSONAL_SIGNATUE_BY_USER_ID_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_PERSONAL_SIGNATUE_BY_USER_ID_FAILURE,
        payload: err,
      });
    });
};

export const generateOtpByEmail = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.GENERATE_OTP_BY_EMAIL_REQUEST });
  axios
    .post(`${base_url}/api/otp/generateOTP`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GENERATE_OTP_BY_EMAIL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.GENERATE_OTP_BY_EMAIL_FAILURE });
    });
};

export const validateOtp = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: types.VALIDATE_OTP_BY_EMAIL_REQUEST });
  axios
    .post(`${base_url}/api/otp/validateOtp`, data)
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.VALIDATE_OTP_BY_EMAIL_SUCCESS,
        payload: res.data,
      });
      message.success(res.data.status);
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: types.VALIDATE_OTP_BY_EMAIL_FAILURE });
    });
};

export const editOrganizationDetails = (orgId, data, cb) => (dispatch) => {
  console.log(data);
  console.log(orgId);
  dispatch({
    type: types.EDIT_ORGANIZATION_DETAILS_REQUEST,
  });
  axios
    .put(
      `${base_url}/organization/${orgId}`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      dispatch(editOrganizationDetails(orgId));
      dispatch({
        type: types.EDIT_ORGANIZATION_DETAILS_SUCCESS,
        payload: res.data,
      });
      cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.EDIT_ORGANIZATION_DETAILS_FAILURE,
        payload: err,
      });
    });
};

export const addOrganizationDocument =
  (customer, orgId) => (dispatch, getState) => {
    const userId = getState().auth.userDetails.userId;

    // const opportunityId = getState().opportunity.opportunity.opportunityId;
    console.log("inside add customer");
    dispatch({
      type: types.ADD_ORGANIZATION_DOCUMENT_REQUEST,
    });

    axios
      .post(`${base_url}/organization/document`, customer, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      })
      .then((res) => {
        console.log(res);
        //dispatch(getRepositoryDocuments(userId));
        const startDate = dayjs().startOf("month").toISOString();
        const endDate = dayjs().endOf("month").toISOString();
        // dispatch(getRecords(userId));
        // dispatch(getLatestCustomers(userId, startDate, endDate));
        // dispatch(getCustomerListByUserId(userId));

        dispatch({
          type: types.ADD_ORGANIZATION_DOCUMENT_SUCCESS,
          payload: res.data,
        });
        // cb && cb();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: types.ADD_ORGANIZATION_DOCUMENT_FAILURE,
          payload: err,
        });
        // cb && cb();
      });
  };

export const getRepositoryDocuments = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_REPOSITORY_DOCUMENTS_REQUEST,
  });
  axios
    .get(`${base_url}/organization/document/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_REPOSITORY_DOCUMENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_REPOSITORY_DOCUMENTS_FAILURE,
        payload: err,
      });
    });
};

export const handleRepositoryOrganizationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_REPOSITORY_ORGANIZATION_MODAL,
    payload: modalProps,
  });
};

export const handleOrganizationDocumentDrawer = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORGANIZATION_DOCUMENT_DRAWER,
    payload: modalProps,
  });
};

export const deleteOrgDocata = (documentId, orgId) => (dispatch, getState) => {
  const { userId } = getState("auth").auth.userDetails;
  // console.log("inside deleteCall", callId);
  dispatch({
    type: types.DELETE_ORG_DOC_DATA_REQUEST,
  });
  axios
    .delete(`${base_url}/organization/document/${documentId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      //  dispatch(getScheduler(orgId));
      dispatch({
        type: types.DELETE_ORG_DOC_DATA_SUCCESS,
        payload: documentId,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.DELETE_ORG_DOC_DATA_FAILURE,
        payload: err,
      });
    });
};

export const LinkOrgDocPublish = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_ORG_DOC_PUBLISH_REQUEST });

  axios
    .put(`${base_url}/organization/publishInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_ORG_DOC_PUBLISH_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ORG_DOC_PUBLISH_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const LinkOrgDocPrivate = (data, cb) => (dispatch) => {
  dispatch({ type: types.LINK_ORG_DOC_PRIVATE_REQUEST });

  axios
    .put(`${base_url}/organization/publicInd`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })

    .then((res) => {
      console.log(res);
      dispatch({
        type: types.LINK_ORG_DOC_PRIVATE_SUCCESS,
        payload: res.data,
      });
      cb && cb("Success", res.data);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.LINK_ORG_DOC_PRIVATE_FAILURE,
      });
      cb && cb("Failure");
    });
};

export const addOnboard = (data, cb) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;
  dispatch({
    type: types.ADD_ONBOARD_REQUEST,
  });

  axios
    .post(`${base_url}/registration`, data)
    .then((res) => {
      console.log(res);
      sessionStorage.setItem("token", res.data.token);

      dispatch(getUserDetails(res.data.token));

      dispatch({
        type: types.ADD_ONBOARD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ONBOARD_FAILURE,
        payload: err,
      });
    });
};

export const setOrganizationViewType = (viewType) => (dispatch) => {
  dispatch({
    type: types.SET_ORGANIZATION_VIEW_TYPE,
    payload: viewType,
  });
};

export const handleOrganizationModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ORGANIZATION_MODAL,
    payload: modalProps,
  });
};

export const addOrganization = (org) => (dispatch, getState) => {
  const userId = getState().auth.userDetails.userId;

  // const opportunityId = getState().opportunity.opportunity.opportunityId;
  console.log("inside add leads");
  dispatch({
    type: types.ADD_ORGANIZATION_REQUEST,
  });

  axios
    .post(`${base_url}/organization/save`, org, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);

      //  dispatch(getOrganizationList());

      dispatch({
        type: types.ADD_ORGANIZATION_SUCCESS,
        payload: res.data,
      });
      // cb && cb();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.ADD_ORGANIZATION_FAILURE,
        payload: err,
      });
      // cb && cb();
    });
};

export const getOrganizationList = (userId, pageNo, filter) => (dispatch) => {
  dispatch({
    type: types.GET_ORGANIZATION_REQUEST,
  });
  axios
    .get(`${base_url}/organization/get/all/organization`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ORGANIZATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ORGANIZATION_FAILURE,
        payload: err,
      });
    });
};

export const updatePreferLang = (data) => (dispatch) => {
  dispatch({ type: types.UPDATE_PREFERED_LANG_REQUEST });
  axios
    .put(
      `${base_url}/employee/update/preferedLanguage`,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token") || "",
        },
      }
    )
    .then((res) => {
      console.log(res);
      // dispatch(getUserDetails());
      dispatch({
        type: types.UPDATE_PREFERED_LANG_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.UPDATE_PREFERED_LANG_FAILURE,
        payload: err,
      });
    });
};

export const handleActionDrawerModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_ACTION_DRAWER_MODAL,
    payload: modalProps,
  });
};

export const handlePromotion = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_PROMOTION_MODAL,
    payload: modalProps,
  });
};

export const getActionRequiredCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_ACTION_REQUIRED_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/action-required/record/today/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ACTION_REQUIRED_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_ACTION_REQUIRED_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getOpportunityIncludedCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_OPPORTUNITY_INCLUDED_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/included/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_OPPORTUNITY_INCLUDED_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_OPPORTUNITY_INCLUDED_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getIncludedOpportunityList = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_INCLUDED_OPPORTUNITY_REQUEST,
  });
  axios
    .get(`${base_url}/opportunity/included/user/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INCLUDED_OPPORTUNITY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_INCLUDED_OPPORTUNITY_FAILURE,
        payload: err,
      });
    });
};

export const emptyIncludedOpportunity = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_INCLUDED_OPPORTUNITY_LIST,
  });
};

export const emptyIncludedDeals = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_INCLUDED_DEALS_LIST,
  });
};

export const emptyIncludedTask = () => (dispatch) => {
  dispatch({
    type: types.EMPTY_INCLUDED_TASK_LIST,
  });
};

export const getDealsIncludedCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_DEALS_INCLUDED_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/included/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_DEALS_INCLUDED_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_DEALS_INCLUDED_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getTaskIncludedCount = (userId) => (dispatch) => {
  dispatch({
    type: types.GET_TASK_INCLUDED_COUNT_REQUEST,
  });
  axios
    .get(`${base_url}/task/included/record/count/${userId}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_TASK_INCLUDED_COUNT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_TASK_INCLUDED_COUNT_FAILURE,
        payload: err,
      });
    });
};

export const getIncludedDealsList = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_INCLUDED_DEALS_REQUEST,
  });
  axios
    .get(`${base_url}/investorOpportunity/included/user/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INCLUDED_DEALS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_INCLUDED_DEALS_FAILURE,
        payload: err,
      });
    });
};

export const getIncludedTaskList = (userId, pageNo) => (dispatch) => {
  dispatch({
    type: types.GET_INCLUDED_TASK_REQUEST,
  });
  axios
    .get(`${base_url}/task/included/user/${userId}/${pageNo}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INCLUDED_TASK_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_INCLUDED_TASK_FAILURE,
        payload: err,
      });
    });
};

export const getAllDialCodeList = () => (dispatch) => {
  dispatch({
    type: types.GET_ALL_DIAL_CODE_LIST_REQUEST,
  });
  axios
    .get(`${base_url}/countries/all/dail-code/list`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_ALL_DIAL_CODE_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: types.GET_ALL_DIAL_CODE_LIST_FAILURE,
        payload: err,
      });
    });
};

export const verifyEmailurL = (data) => (dispatch) => {
  dispatch({
    type: types.VERIFY_EMAIL_REQUEST,
  });
  axios
    .post(`${base_url}/otp/user/generateOTP`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      dispatch({
        type: types.VERIFY_EMAIL_SUCCESS,
        payload: res.data,
      });
      Swal.fire({
        icon: 'success',
        title: 'OTP sent successfully to the provided Email account',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      dispatch({
        type: types.VERIFY_EMAIL_FAILURE,
        payload: err,
      });
    });
};
export const validateOtpurL = (data, cb) => (dispatch) => {
  dispatch({
    type: types.VALIDATE_OTP_REQUEST,
  });
  axios
    .post(`${base_url}/api/otp/validateOtp`, data)
    .then((res) => {
      dispatch({
        type: types.VALIDATE_OTP_SUCCESS,
        payload: res.data,
      });
      cb && cb("success");
      Swal.fire({
        icon: 'success',
        title: 'OTP validiated successfully!',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {
      dispatch({
        type: types.VALIDATE_OTP_FAILURE,
        payload: err,
      });
      cb && cb("failure");
      Swal.fire({
        icon: 'error',
        title: 'OTP is not matching with input!',
        showConfirmButton: false,
        timer: 1500,
      })
    });
};
export const forgotUserPassword = (data, cb) => (dispatch) => {

  dispatch({ type: types.FORGOT_PASSWORD_REQUEST });
  axios
    .post(`${base_url}/setPassword`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {


      dispatch({
        type: types.FORGOT_PASSWORD_SUCCESS,

      });
      cb && cb("success")
      Swal.fire({
        icon: 'success',
        title: 'You have successfully reset your password!',
        showConfirmButton: false,
        timer: 1500,
      })
    })
    .catch((err) => {

      dispatch({ type: types.FORGOT_PASSWORD_FAILURE });
      cb && cb("failure");
    });
};

export const handleFAQModal = (modalProps) => (dispatch) => {
  dispatch({
    type: types.HANDLE_FAQ_MODAL,
    payload: modalProps,
  });
};




export const updateRepositoryDocument = (data, organizationDocumentLinkId) => (
  dispatch,
) => {

  dispatch({ type: types.UPDATE_REPOSITORY_DOCUMENT_REQUEST });
  axios
    .put(`${base_url}/organization/document/${organizationDocumentLinkId}`, data, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {

      console.log(res);
      //  dispatch(getOpportunityListByUserId(userId,0));
      dispatch({
        type: types.UPDATE_REPOSITORY_DOCUMENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.UPDATE_REPOSITORY_DOCUMENT_FAILURE,
        payload: err,
      });
    });
};

export const getInvestorCurrency = () => (dispatch) => {
  dispatch({
    type: types.GET_INVESTOR_CURRENCY_REQUEST,
  });
  axios
    .get(`${base_url}/currencies/investor`,{
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token") || "",
      },
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: types.GET_INVESTOR_CURRENCY_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.GET_INVESTOR_CURRENCY_FAILURE,
        payload: err,
      });
    });
};
