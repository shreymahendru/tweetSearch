import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import TopNavigation from "./components/navigation/TopNavigation";
import HistoryPage from "./components/pages/HistoryPage";
import TopTenPage from "./components/pages/TopTenPage";
 
const App = ({ location, isAuthenticated }) => <div className="ui container" > 
    {isAuthenticated && <TopNavigation />   } 
    <Route
        location={location}
        path="/"
        exact
        component={HomePage} />
    <Route
        location={location}
        path="/confirmation/:token"
        exact
        component={ConfirmationPage} />
    
    <GuestRoute
        location={location}
        path="/login"
        exact
        component={LoginPage}  />
    <GuestRoute 
        location={location}
        path="/signup"
        exact
        component={SignupPage} />
    <GuestRoute
        location={location}
        path="/forgot_password"
        exact
        component={ForgotPasswordPage} />
    <GuestRoute
        location={location}
        path="/reset_password/:token"
        exact
        component={ResetPasswordPage} />
    <UserRoute
        location={location}
        path="/dashboard"
        exact
        component={DashboardPage} />
    <UserRoute
        location={location}
        path="/history"
        exact
        component={HistoryPage} />
    <UserRoute
        location={location}
        path="/top_ten"
        exact
        component={TopTenPage} />
</div>

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state)
{
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(App);
 