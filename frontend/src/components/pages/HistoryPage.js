import React from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as moment from "moment";
import { Segment, List, Header, Icon } from "semantic-ui-react";
import { userHistory } from "./../../actions/tweets";


class HistoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            history: []
         }
    }
    
    componentDidMount() {
        this.props.userHistory(this.props.userId).then(newHistory => {
            
            const history = [];
            
            newHistory.map(t => history.push({
                id: t.id,
                searchTerm: {
                    id: t.searchTerm.id,
                    numberOfTimesSearched: t.searchTerm.numberOfTimesSearched,
                    term: t.searchTerm.term
                },
                time: t.time
            }));
            this.setState({ history, loading: false });
        })
    }
    /* eslint-disable */
    renderLisElement(term)
    {
        return (
            <List.Item key={term.id} >
                <Icon name='right triangle' />
                <List.Content>
                    <List.Header>{term.searchTerm.term}</List.Header>
                    <List.Description>
                        {`Searched on: ${moment.unix(term.time).format("DD/MM/YYYY")}; People have Searched this ${term.searchTerm.numberOfTimesSearched} times.`}
                    </List.Description>
                </List.Content>
            </List.Item>
        );
    }
    /* eslint-enable */
    render() { 
        return ( 
            <Segment loading={this.state.loading} >
                <Header> Your History. </Header>    
                <List>
                    {this.state.history.map(t => this.renderLisElement(t))}
                </List>
            </Segment>    
         );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {
        userId: state.user.id
    }
}

HistoryPage.propTypes = {
    userId: PropTypes.string.isRequired,
    userHistory: PropTypes.func.isRequired
}

 
export default connect(mapStateToProps, { userHistory } )(HistoryPage);