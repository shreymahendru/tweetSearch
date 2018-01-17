import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Grid, Button, Image } from 'semantic-ui-react';
import InlineErrors from "./../messages/InlineErrors";

class BookForm extends React.Component {
    state = {
        data: {
            goodreadsId: this.props.book.goodreadsId,
            title: this.props.book.title,
            authors: this.props.book.authors,
            cover: this.props.book.covers[0],
            pages: this.props.book.pages
        },
        covers: this.props.book.covers,
        index: 0,
        loading: false, 
        errors: {}
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                goodreadsId: nextProps.book.goodreadsId,
                title: nextProps.book.title,
                authors: nextProps.book.authors,
                cover: nextProps.book.covers[0],
                pages: nextProps.book.pages
            },
            covers: nextProps.book.covers
        })
    }
    
    onChange = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onChangeNumber = e =>
        this.setState({
            data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
        });  
    
    validate = (data) => {
        const errors = {};
        if (!data.title) errors.title = "Can't be blank";
        if (!data.authors) errors.authors = "Can't be blank";
        // if (!data.cover) errors.cover = "Can't be blank";
        if (!data.pages) errors.pages = "Can't be blank";
        return errors;
        
    };
    
    changeCovers = () => {
        const { index, covers } = this.state;
        const newIndex = index + 1 > covers.length ? 0 : index + 1;
        this.setState({
            index: newIndex,
            data: { ...this.state.data, cover: covers[newIndex] }
        });
    }
    
    render() { 
        
        const { errors, data, loading } = this.state;
        
        return ( 
            <Segment>
                <Form loading={loading} >
                    <Grid columns={2} stackable >
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field error={!!errors.title} >
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        placeholder="Title"
                                        value={data.title}
                                        onChange={this.onChange}
                                    />
                                    {errors.title && <InlineErrors text={errors.title} />}
                                </Form.Field>
                                
                                <Form.Field error={!!errors.authors} >
                                    <label htmlFor="authors">Authors</label>
                                    <input
                                        type="text"
                                        id="authors"
                                        name="authors"
                                        placeholder="Authors"
                                        value={data.authors}
                                        onChange={this.onChange}
                                    />
                                    {errors.authors && <InlineErrors text={errors.authors} />}
                                </Form.Field>
                                
                                <Form.Field error={!!errors.pages} >
                                    <label htmlFor="authors">Pages</label>
                                    <input
                                        disabled={data.pages === undefined}    
                                        type="text"
                                        id="pages"
                                        name="pages"
                                        placeholder="Pages"
                                        value={data.pages !== undefined ? data.pages : "Loading..."}
                                        onChange={this.onChangeNumber}
                                    />
                                    {errors.pages && <InlineErrors text={errors.pages} />}
                                </Form.Field>
                                
                            </Grid.Column>
                            <Grid.Column>
                                <Image size="small" src={data.cover} />
                                {this.state.covers.length > 1 &&
                                    <a
                                        role="button"
                                        tabIndex={0}
                                        onClick={this.changeCover}>
                                        Another Cover
                                    </a>}
                            </Grid.Column>
                        </Grid.Row> 
                        <Grid.Row>
                            <Button primary onClick={this.props.submit} fluid >Save</Button>
                        </Grid.Row>
                    </Grid>
                </Form>    
            </Segment>
         )
    }
}

BookForm.propTypes = {
    submit: PropTypes.func.isRequired,
    
    book: PropTypes.shape({
        goodreadsId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.string.isRequired,
        covers: PropTypes.arrayOf(PropTypes.string).isRequired,
        pages: PropTypes.number
    }).isRequired
}
 
export default BookForm;