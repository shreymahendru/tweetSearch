import { List, Image } from "semantic-ui-react";
import React from "react";
import PropTypes from 'prop-types';

const Tweet = ({ tweet }) => 
    (
        <List.Item>
            {/* <List.Icon name='comment' size='large' verticalAlign='middle' /> */}
            <Image avatar src={tweet.profile_pic} />
            <List.Content>
                <List.Header as='a'> {`@${tweet.username}`}</List.Header>
                <List.Description>{tweet.text}</List.Description>
            </List.Content>
        </List.Item>
    );

Tweet.propTypes = {
    tweet: PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        profile_pic: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }).isRequired,
}
    
export default Tweet;