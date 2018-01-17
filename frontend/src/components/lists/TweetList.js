import React from 'react';
import { List, Segment } from "semantic-ui-react";
import PropTypes from 'prop-types';
import Tweet from "../list-elements/Tweet";


const TweetList = ({ tweets }) => (
    <Segment  >
        <List divided >
            {tweets.map(tweet =>
                <Tweet key={tweet.id} tweet={tweet} />
            )}
        </List> 
    </Segment>    
)


TweetList.propTypes = {
    
    tweets: PropTypes.arrayOf({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        profile_pic: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
};

export default TweetList;