import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment, List, Header, Icon } from "semantic-ui-react";
import { nMostSearched } from "./../../actions/tweets";

class TopTenPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            topTen: []
        }
    }

    componentDidMount() {
        this.props.nMostSearched(10).then(newTopTen => {

            const topTen = [];
            let cntr = 0;
            newTopTen.map(t => topTen.push({
                key: cntr++,
                term: t.term,
                timesSearched: t.timesSearched
            }));
            this.setState({ topTen, loading: false });
        })
    }
    /* eslint-disable */
    renderLisElement(term) {
        return (
            <List.Item key={term.key} >
                <Icon name='right triangle' />
                <List.Content>
                    <List.Header>{term.term}</List.Header>
                    <List.Description>
                        {`People have searched this ${term.timesSearched} times.`}
                    </List.Description>
                </List.Content>
            </List.Item>
        );
    }
    /* eslint-enable */
    render() {
        return (
            <Segment loading={this.state.loading} >
                <Header> Top 10 Most Searched Terms. </Header>
                <List>
                    {this.state.topTen.map(t => this.renderLisElement(t))}
                </List>
            </Segment>
        );
    }
}


TopTenPage.propTypes = {
    nMostSearched: PropTypes.func.isRequired
}


export default connect(null, { nMostSearched })(TopTenPage);