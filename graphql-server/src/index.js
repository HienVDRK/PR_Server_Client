const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const models = require('../models')
const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }  
})
const app = express();
server.applyMiddleware({ app });

app.listen(PORT, () => {
    console.log(`The server started on port http://localhost:${PORT}` + server.graphqlPath);
});