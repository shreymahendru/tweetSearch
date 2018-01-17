import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import LoginForm from "../forms/LoginForm";
import { login } from "../../actions/auth";


class LoginPage extends React.Component
{
    submit = (data) => this.props.login(data).then(() => this.props.history.push("/dashboard"))
    
    
    render()
    {
        return (
            <div className="login-page" style={{ height: "100%" }} >
                
                <Grid
                    style={{ height: "100%" }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        
                        <h1>Login Page</h1>
                        <LoginForm submit={this.submit} />
                        <Link to="/forgot_password"> Forgot Password</Link>
                    </Grid.Column>    
                    
                </Grid>    
                
                
            </div>
            
            
            
        );
    }
    
}    

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);