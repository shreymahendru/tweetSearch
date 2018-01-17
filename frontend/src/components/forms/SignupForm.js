import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import Validator from "validator";
import InlineErrors from "./../messages/InlineErrors";

class SignupForm extends React.Component
{
    state = {
        data: {
            name: "",
            email: "",
            password: ""
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
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }   
    }
    
    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Invalid Email"
        if (!data.password) errors.password = "Can't leave password blank";
        if (!data.name) errors.name = "Can't leave username blank";
        return errors;
    }
    
    render() {
        const { data, errors, loading } = this.state;
                    
        return (
            <Form onSubmit={this.onSubmit} loading={loading} >
                <Form.Field error={!!errors.name} >
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="username"
                        value={data.name}
                        onChange={this.onChange}
                    />
                    {errors.name && <InlineErrors text={errors.name} />}
                </Form.Field>
                
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
                <Form.Field error={!!errors.password}  >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineErrors text={errors.password} />}
                </Form.Field>
                <Button primary > Sign UP </Button>
            </Form>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;

