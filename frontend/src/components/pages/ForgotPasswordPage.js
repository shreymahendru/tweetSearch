import React from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ForgotPasswordFrom from "./../forms/ForgotPasswordFrom";
import { resetPasswordRequest } from "./../../actions/auth";


class ForgotPasswordPage extends React.Component
{
    state = {
        success: false
    };
    
    submit = data =>
        this.props.resetPasswordRequest(data)
            .then(() => this.setState({success: true}));
    
    render()
    {
        return (
            <div>
                {this.state.success ?
                    <Message>Email has been sent. <Link to="/login">Go to Login</Link> </Message> :
                <ForgotPasswordFrom submit={this.submit} />}
            </div>
        )
    }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
};

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);