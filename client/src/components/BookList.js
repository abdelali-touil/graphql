import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/book'

// components
import BookDetails from './BookDetails'

class BookList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: null
        }
    }

    displayBooks() {
        let data = this.props.data
        if (data.loading) {
            return (<tr><td colSpan="3" align="center">Loading books...</td></tr>)
        } else {
            return data.books.map(book => {
                return (
                    <tr key={book.id} onClick={(e) => { this.setState({ selected: book.id }) }}>
                        <td> {book.name} </td>
                        <td> {book.genre} </td>
                        <td> {book.author.name} </td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <table id="book-list" className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Genre</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.displayBooks() }
                    </tbody>
                </table>
                <BookDetails bookId={ this.state.selected } />
            </div>
        )
    }
}

export default graphql(getBooksQuery)(BookList)
