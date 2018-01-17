import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import Validator from "validator";
import InlineErrors from "./../messages/InlineErrors";

class ForgotPasswordForm extends React.Component {
    state = {
        data: {
            email: ""
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
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email";
        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;

        return (
            <Form onSubmit={this.onSubmit} loading={loading} >
                <Form.Field error={!!errors.email} >
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineErrors text={errors.email} />}
                </Form.Field>
                <Button primary > Send Email link </Button>
            </Form>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;

