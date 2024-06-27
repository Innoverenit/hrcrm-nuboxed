import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { BundleLoader } from "./Components/Placeholder";
import PrivateRoute from "./Helpers/Auth/PrivateRoute";
import AppErrorBoundary from "./Helpers/ErrorBoundary/AppErrorBoundary";
import AppLoginMessage from "./Containers/Auth/AppLoginMessage";
import OnBoardOrganizationPage from "./Containers/Auth/OnBoardOrganizationPage";
import OnBoardUserPage from "./Containers/Auth/OnBoardUserPage";



/**
 * lazy loaded compenents
 */
const Register = lazy(() => import("./Containers/Auth/Register"));

const Login = lazy(() => import("./Containers/Auth/Login"));
const EmailValidation = lazy(() => import("./Containers/Auth/EmailValidation"));
const ForgotPasswordVerification = lazy(() =>
  import("./Containers/Auth/ForgotPasswordVerification")
);
const SetPassword = lazy(() => import("./Containers/Auth/SetPassword"));
const ForgotPassword = lazy(() => import("./Containers/Auth/ForgotPassword"));
const MainApp = lazy(() => import("./Containers/Main/MainApp"));

class App extends Component {
  render() {
    const { fetchingUserDetails } = this.props;
    return (
      <div>
        {/* <Offline>
          <div className="wrapper">
            <p>You're offline right now. Check your connection.</p>
          </div>
        </Offline> 
        <Online> */}
        <AppErrorBoundary>
          <Suspense fallback={<BundleLoader />}>
            <Switch>
              <Route exact path="/register/:type?" component={Register} />

              {/* <Route exact path="/login/:username?/:password?" component={Login} /> */}
              <Route exact path="/login" component={Login} /> 
              <Route exact path="/mobilelogin" component={AppLoginMessage} />
              <Route
                exact
                path="/activationEmail/:employeeId/:token/:emailId/:organizationId"
                component={EmailValidation}
              />
              <Route
                exact
                path="/forgotPasswordVerification/:employeeId/:token/:emailId/:organizationId"
                component={ForgotPasswordVerification}
              />
              <Route exact path="/setPassword" component={SetPassword} />
              {/* <Route exact path="/onboardUser" component={OnBoardUserPage}  /> */}
              <Route exact path="/onboard" component={OnBoardOrganizationPage} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />

              {fetchingUserDetails ? (
                <BundleLoader />
              ) : (
                <PrivateRoute path="/" component={MainApp} />
              )}
            </Switch>
          </Suspense>
        </AppErrorBoundary>
        {/* </Online> */}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  fetchingUserDetails: auth.fetchingUserDetails,
});
export default connect(mapStateToProps)(App);
