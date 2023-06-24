const { ApolloServer } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');


const gql = require('graphql-tag');
const mongoose = require('mongoose')

// importing dependencies

//we moved typeDefs to a separate folder for better organization
const typeDefs = require('./graphql/typeDefs.js')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')

// ORM library that lets us communicate with the database







const pubsub = new PubSub();

const server = new ApolloServer({

    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub })
});


mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
           console.log('MONGODB connected')
        return server.listen({ port: 3000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })