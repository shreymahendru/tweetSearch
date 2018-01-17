import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ConfirmEmailMessage from "./../messages/ConfirmEmailMessage";
import AddBookCTA from "../ctas/AddBookCTA";
import { allBooksSelector } from "./../../reducers/books";

const DashboardPage = ( { isConfirmed, books }) => (
    <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {books.length === 0 && <AddBookCTA />}
    </div>
)

function mapStateToProps(state)
{
    return {
        isConfirmed: state.user.confirmed,
        books: allBooksSelector(state)
    }
}

DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
}

export default connect(mapStateToProps)(DashboardPage);