// import React, { Component, lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import "./App.css";
// import { BundleLoader } from "./Components/Placeholder";
// import PrivateRoute from "./Helpers/Auth/PrivateRoute";
// import AppLoginMessage from "./Containers/Auth/AppLoginMessage";
// import OnBoardOrganizationPage from "./Containers/Auth/OnBoardOrganizationPage";
// import NodataFoundPage from "./Helpers/ErrorBoundary/NodataFoundPage";

// /**
//  * lazy loaded compenents
//  */
// const Register = lazy(() => import("./Containers/Auth/Register"));

// const Login = lazy(() => import("./Containers/Auth/Login"));
// const EmailValidation = lazy(() => import("./Containers/Auth/EmailValidation"));

// const SetPassword = lazy(() => import("./Containers/Auth/SetPassword"));
// const ForgotPassword = lazy(() => import("./Containers/Auth/ForgotPassword"));
// const MainApp = lazy(() => import("./Containers/Main/MainApp"));

// class App extends Component {
//   render() {
//     const { fetchingUserDetails } = this.props;
//     return (
//       <div>
     
//         {/* <NodataFoundPage> */}
//           <Suspense fallback={<BundleLoader />}>
//             <Switch>
//               <Route exact path="/register/:type?" component={Register} />

//               {/* <Route exact path="/login/:username?/:password?" component={Login} /> */}
//               <Route exact path="/login" component={Login} /> 
//               <Route exact path="/mobilelogin" component={AppLoginMessage} />
//               <Route
//                 exact
//                 path="/activationEmail/:employeeId/:token/:emailId/:organizationId"
//                 component={EmailValidation}
//               />             
//               <Route exact path="/setPassword" component={SetPassword} />
//               <Route exact path="/onboard" component={OnBoardOrganizationPage} />
//               <Route exact path="/forgotPassword" component={ForgotPassword} />

//               {fetchingUserDetails ? (
//                 <BundleLoader />
//               ) : (
//                 <PrivateRoute path="/" component={MainApp} />
//               )}
//             </Switch>
//           </Suspense>
//         {/* </NodataFoundPage> */}
     
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ auth }) => ({
//   fetchingUserDetails: auth.fetchingUserDetails,
// });
// export default connect(mapStateToProps)(App);


import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { BundleLoader } from "./Components/Placeholder";
import PrivateRoute from "./Helpers/Auth/PrivateRoute"; // You might need to update this for v7
import AppLoginMessage from "./Containers/Auth/AppLoginMessage";
import OnBoardOrganizationPage from "./Containers/Auth/OnBoardOrganizationPage";
import NodataFoundPage from "./Helpers/ErrorBoundary/NodataFoundPage";

/**
 * Lazy loaded components
 */
const Register = lazy(() => import("./Containers/Auth/Register"));
const Login = lazy(() => import("./Containers/Auth/Login"));
const EmailValidation = lazy(() => import("./Containers/Auth/EmailValidation"));
const SetPassword = lazy(() => import("./Containers/Auth/SetPassword"));
const ForgotPassword = lazy(() => import("./Containers/Auth/ForgotPassword"));
const MainApp = lazy(() => import("./Containers/Main/MainApp"));

class App extends Component {
  render() {
    const { fetchingUserDetails } = this.props;

    // A wrapper to handle private routes in React Router v7
    // const PrivateRouteWrapper = ({ children }) => {
    //   console.log(children)
    //   return fetchingUserDetails ? (
    //     <BundleLoader />
    //   ) : (
    //     <PrivateRoute>{children}</PrivateRoute>
    //   );
    // };

    const PrivateRouteWrapper = ({ children }) => {
      console.log(children);
      return fetchingUserDetails ? (
        <BundleLoader />
      ) : (
        <PrivateRoute>{children}</PrivateRoute> // You need to make sure PrivateRoute works properly
      );
    };

    return (
      <div>
        <Suspense fallback={<BundleLoader />}>
        
          <Routes>
            <Route
              path="/register/:type?"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            {/* s */}
            <Route
              path="/activationEmail/:employeeId/:token/:emailId/:organizationId"
              element={<EmailValidation />}
            />
            <Route
              path="/setPassword"
              element={<SetPassword />}
            />
            <Route
              path="/onboard"
              element={<OnBoardOrganizationPage />}
            />
            <Route
              path="/forgotPassword"
              element={<ForgotPassword />}
            />
          
           
            <Route
             path="/*"
              element={
                
                <PrivateRouteWrapper>
                  <MainApp />
                </PrivateRouteWrapper>
              }
            />
          </Routes>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  fetchingUserDetails: auth.fetchingUserDetails,
});
export default connect(mapStateToProps)(App);

