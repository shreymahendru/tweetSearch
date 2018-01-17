import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Segment } from "semantic-ui-react";
import ConfirmEmailMessage from "./../messages/ConfirmEmailMessage";
import TweetSearchForm from "./../forms/TweetSearchForm";
import { searchTweet } from "./../../actions/tweets";
import TweetList  from "./../lists/TweetList";

// import SearchBookForm from "../forms/SearchBookForm";

// import AddBookCTA from "../ctas/AddBookCTA";
// import { allBooksSelector } from "./../../reducers/books";


class DashboardPage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = { 
            tweets: [], 
            loading: false
         }
    }
    
    search = data => {
        this.setState({ tweets: this.state.tweets, loading: true });
        this.props.searchTweet(data.searchTerm)
            .then((searchResults) => {
                const tweets = [];
                searchResults.forEach(t => tweets.push({
                    id: t.id,
                    text: t.text,
                    link: t.link,
                    username: t.username,
                    profile_pic: t.profile_pic
                }));
                this.setState({ tweets, loading: false });
            });   
    }
    
    
    render() { 
        return (
            <div >
                {!this.props.isConfirmed && <ConfirmEmailMessage />}
                <Segment >
                    <h1>TweetSearch</h1>
                    {/* <SearchBookForm onBookSelect={this.onBookSelect} /> */}
                    <TweetSearchForm submit={this.search} />
                    {this.state.tweets.length > 0 &&  <TweetList tweets={this.state.tweets} />}
                </Segment>
            </div>
        )
    }
}

function mapStateToProps(state)
{
    return {
        isConfirmed: state.user.isConfirmed
    }
}

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    searchTweet: PropTypes.func.isRequired
    // books: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         title: PropTypes.string.isRequired
    //     }).isRequired
    // ).isRequired
}

export default connect(mapStateToProps, { searchTweet })(DashboardPage);