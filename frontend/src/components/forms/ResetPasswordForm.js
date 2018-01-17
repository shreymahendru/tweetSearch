import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Message } from "semantic-ui-react";
import InlineErrors from "./../messages/InlineErrors";

class ResetPasswordForm extends React.Component {
    state = {
        data: {
            token: this.props.token,
            password: "", 
            passwordConfirmation:""
        },
        loading: false,
        errors: {}
    }

    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        this.setState({ loading: true });
        if (Object.keys(errors).length === 0) {
            this.props
                .submit({newPassword: this.state.data.password, token: this.state.data.token})
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    }

    validate = (data) => {
        const errors = {};
        if (!data.password) errors.password = "Can't leave password blank";
        if (data.password !== data.passwordConfirmation) errors.global = "Passwords doesn't match";
        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading} >
                {errors.global && <Message negative >{errors.global}</Message>}    
                <Form.Field error={!!errors.password} >
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="new password"
                        value={data.password} 
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineErrors text={errors.password} />}
                </Form.Field>
                <Form.Field error={!!errors.passwordConfirmation}  >
                    <label htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        placeholder="Password Confirmation"
                        value={data.passwordConfirmation}
                        onChange={this.onChange}
                    />
                    {errors.passwordConfirmation && <InlineErrors text={errors.passwordConfirmation} />}
                </Form.Field> 
                <Button primary > Reset Password </Button>
            </Form>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
};

export default ResetPasswordForm;

