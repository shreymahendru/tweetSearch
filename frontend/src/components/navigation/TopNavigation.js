import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";

const TopNavigation = ({ user, logoutUser}) => (
    <div>
        <Menu secondary pointing >
            <Menu.Item as={Link} to="/dashboard" >Dashboard</Menu.Item>
            <Menu.Menu position="right">
                <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => logoutUser()} >Logout</Dropdown.Item>
                    </Dropdown.Menu>    
                </Dropdown>
            </Menu.Menu>
        </Menu>
    </div>
)

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    logoutUser: PropTypes.func.isRequired
}; 

function mapStateToProps(state)
{
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {logoutUser: logout})(TopNavigation);