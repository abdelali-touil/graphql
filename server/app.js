const express = require('express')
const graphqlHttp = require('express-graphql')
const schema = require('./graphql/schema')
const mongoose = require('mongoose')

const app = express()

// connect to mongodb
mongoose.connect('mongodb+srv://graphql:0000@cluster0-crhdb.mongodb.net/graphql?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to database')
})

app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true // enable GraphQL client interface
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
});
