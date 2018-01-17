import React from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
import InlineErrors from "./../messages/InlineErrors";

class TweetSearchForm extends React.Component {
    state = {
        data: {
            searchTerm: ""   
        },
        errors: {
            
        }
    }

    onChange = e => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props
                .submit(this.state.data);
        }
    }

    validate = (data) => {
        const errors = {};
        if (!data.searchTerm.trim()) errors.searchTerm = "Can't leave this blank";
        return errors;
    }

    render() {
        const { data, errors } = this.state;

        return (
            <Form onSubmit={this.onSubmit} >
                <Form.Field error={!!errors.searchTerm} >
                    <label htmlFor="searchTerm">Search here.</label>
                    <input
                        type="text"
                        id="searchTerm"
                        name="searchTerm"
                        placeholder="your term here"
                        value={data.searchTerm}
                        onChange={this.onChange}
                    />
                    {errors.searchTerm && <InlineErrors text={errors.searchTerm} />}
                </Form.Field>
                <Button primary > Search </Button>
            </Form>
        );
    }
}

TweetSearchForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default TweetSearchForm;

