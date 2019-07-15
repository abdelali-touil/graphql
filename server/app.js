const express = require('express')
const graphqlHttp = require('express-graphql')
const schema = require('./graphql/schema')
const mongoose = require('mongoose')

const app = express()

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true });
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
