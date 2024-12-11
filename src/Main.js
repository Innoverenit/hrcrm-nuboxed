import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import BundleLoader from './Components/Placeholder/BundleLoader';
import OnBoardOrganizationPage from './Containers/Auth/OnBoardOrganizationPage';
import PrivateRoute from './Helpers/Auth/PrivateRoute';

/**
 * lazy loaded compenents
 */
const Register = lazy(() => import('./Containers/Auth/Register'));
const Login = lazy(() => import('./Containers/Auth/Login'));
const EmailValidation = lazy(() => import('./Containers/Auth/EmailValidation'));
const SetPassword = lazy(() => import('./Containers/Auth/SetPassword'));
const MainApp = lazy(() => import('./Containers/Main/MainApp'));

class App extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<BundleLoader />}>
          <Switch>
            <Route exact path="/register" component={() => <Register />} />

            <Route exact path="/login" component={() => <Login />} />
            <Route exact path="/onboard" component={() => <OnBoardOrganizationPage />} />
           
            <Route exact path="/salesXL/activationEmail/:userId/:token/:emailId/:organizationId" component={() => <EmailValidation />} />
            <Route exact path="/setPassword" component={() => <SetPassword />} />
            <PrivateRoute path="/" component={() => <MainApp />} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default App;
