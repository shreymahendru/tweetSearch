import React from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import SearchBookForm from "./../forms/SearchBookForm"; 
import BookForm from "./../forms/BookForm";
import { fetchPages } from "./../../actions/books";


class NewBookPage extends React.Component {
    state = {
        book: null
    }
    
        
    onBookSelect = (book) => {
        this.setState({ book });
        this.props.fetchPages(book.goodreadsId).then(pages => this.setState({
            book: { ...book, pages }
        }));
    }
    
    addBook = () => console.log("hasd");
    
    render() { 
        return (
            <Segment >
                <h1>Add new Book to your collection</h1>
                <SearchBookForm onBookSelect={this.onBookSelect} />    
                {this.state.book && <BookForm submit={this.addBook} book={this.state.book} />}
        </Segment>
        );
    }
}

NewBookPage.propTypes = {
    fetchPages: PropTypes.func.isRequired
};
 
export default connect(null, { fetchPages })(NewBookPage);