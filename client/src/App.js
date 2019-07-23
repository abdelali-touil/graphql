import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// components
import BookList from './components/BookList'
import AddBook from './components/AddBook'

// twitter bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

function App() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <AddBook />
          <BookList />
        </div>
      </ApolloProvider>
    )
};

export default App
