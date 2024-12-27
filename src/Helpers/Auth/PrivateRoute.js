// import React from "react";
// import { bindActionCreators } from "redux";
// import { connect } from "react-redux";
// import { Route, Redirect, withRouter } from "react-router-dom";
// import axios from "axios";
// import { message } from "antd";
// import {
  
//   setFiscalTimeIntervalReport,

// } from "../../Containers/Auth/AuthAction";
// class PrivateRoute extends React.Component {
//   componentDidMount() {
//     if (sessionStorage.getItem("userDetails")) {
     
//       this.props.setFiscalTimeIntervalReport(
//         JSON.parse(sessionStorage.getItem("userDetails"))
//       );
    
//     }
//     axios.interceptors.response.use(
//       (response) => {
//         return response;
//       },
//       (error) => {
//         //catches if the session ended!
//         if (error.response.status == 401) {
//           sessionStorage.clear();
//           // store.dispatch({ type: LOGOUT });
//           this.props.history.push("/login");
//           message.error("Your session has expired. Please re-login.");
//         }
//         return Promise.reject(error);
//       }
//     );
//     if (!this.props.token) {
//       this.props.history.push("/login");
//       message.error("Your session has expired. Please re-login.");
//     }
//     // if (sessionStorage.getItem('userDetails')) {
//     //     this.props.setFiscalTimeInterval(sessionStorage.getItem('userDetails'))
//     // }
//   }
//   componentWillUpdate(nextProps) {
//     if (!nextProps.token) {
//       this.props.history.push("/login");
//     }
//   }
//   render() {
//     const { component: Component, ...rest } = this.props;
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           sessionStorage.getItem("token") ? (
//             <Component {...props} />
//           ) : (
//             <Redirect to="/login" />
//           )
//         }
//       />
//     );
//   }
// }

// const mapStateToProps = ({ auth }) => {
//   return {
//     token: auth.token || JSON.stringify(sessionStorage.getItem("token")),
//   };
// };
// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       // setFiscalTimeInterval,
//       setFiscalTimeIntervalReport,
//       // setFiscalTimeIntervalTeam,
//       // setFiscalTimeIntervalViewport,
//     },
//     dispatch
//   );
// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
// );


import React, { useEffect } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { message } from "antd";
import axios from "axios";
import {
  setFiscalTimeIntervalReport,
} from "../../Containers/Auth/AuthAction";

const PrivateRoute = ({ token, setFiscalTimeIntervalReport, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set fiscal interval from session storage
    if (sessionStorage.getItem("userDetails")) {
      setFiscalTimeIntervalReport(
        JSON.parse(sessionStorage.getItem("userDetails"))
      );
    }

    // Axios interceptor for handling 401 errors
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          sessionStorage.clear();
          navigate("/login");
          message.error("Your session has expired. Please re-login.");
        }
        return Promise.reject(error);
      }
    );

    // Check for token
    if (!token) {
      sessionStorage.clear();
      navigate("/login");
      message.error("Your session has expired. Please re-login.");
    }

    // Cleanup interceptor
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [token, setFiscalTimeIntervalReport, navigate]);

  // Render children if token exists, otherwise redirect to login
  if (!sessionStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const mapStateToProps = ({ auth }) => ({
  token: auth.token || JSON.parse(sessionStorage.getItem("token")),
});

const mapDispatchToProps = {
  setFiscalTimeIntervalReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

