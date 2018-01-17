import React from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { searchBook } from "./../../actions/books";



class SearchBookForm extends React.Component {
    state = {
        query: "",
        loading: false,
        options: [],
        books: {}
    };
    
    onSearchChange = (e) => {
        clearTimeout(this.timer);
        this.setState({
            query: e.target.value
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    };
    
    onChange = (e, data) => {
        this.setState({ query: data.value });
        this.props.onBookSelect(this.state.books[data.value]);
    };
    
    fetchOptions = () => {
        
        if (!this.state.query) return;
        this.setState({
            loading: true
        });
        this.props.searchBook(this.state.query).then(books => {
            const options = [];
            const booksHash = {};
            books.forEach(book => {
                booksHash[book.goodreadsId] = book;
                options.push({
                    key: book.goodreadsId,
                    value: book.goodreadsId,
                    text: book.title
                });
            });
            this.setState({ loading: false, options, books: booksHash });
        });

        
    }
    
    render() { 
        return ( 
            <Form>
                <Dropdown
                    search
                    fluid
                    placeholder="Search for a book by title"
                    value={this.state.query}
                    onSearchChange={this.onSearchChange}
                    options={this.state.options}
                    loading={this.state.loading}
                    onChange={this.onChange}
                />
            </Form>
         )
    }
}

SearchBookForm.propTypes = {
    searchBook: PropTypes.func.isRequired,
    onBookSelect: PropTypes.func.isRequired
};
 
export default connect(null, { searchBook })(SearchBookForm);