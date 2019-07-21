import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo'
import { getAuthorsQuery } from '../queries/author'
import { addBookMutation, getBooksQuery } from '../queries/book'

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            genre: '',
            authorId: ''                
        }
    }

    displayAuthors() {
        let data = this.props.getAuthorsQuery
        if (data.loading) {
            return (<option disabled>Loading authors...</option>)
        } else {
            return data.authors.map(author => {
                return (
                    <option key={ author.id } value={ author.id }>{ author.name }</option>
                )
            })
        }
    }

    submit(e) {
        e.preventDefault();
        this.props.addBookMutation({
            variables: {
                name: this.state.name,
                genre: this.state.genre,
                authorId: this.state.authorId
            },
            refetchQueries: [{ query: getBooksQuery }]
        })
    }

    render() {
        return (
            <div>
                <h3>Add new book</h3>
                <form id="add-book" onSubmit={ this.submit.bind(this) }>
                    <div className="field form-group">
                        <label>Book name:</label>
                        <input type="text" className="form-control" onChange={ (e) => this.setState({ name: e.target.value }) } />
                    </div>
                    <div className="field form-group">
                        <label>Genre:</label>
                        <input type="text" className="form-control" onChange={(e) => this.setState({ genre: e.target.value })} />
                    </div>
                    <div className="field form-group">
                        <label>Author:</label>
                        <select className="form-control" onChange={(e) => this.setState({ authorId: e.target.value })}>
                            <option> Select author </option>
                            {this.displayAuthors()}
                        </select>
                    </div>
                    <button className="btn btn-primary">Add book</button>
                </form>
            </div>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook)
    
