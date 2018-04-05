const { Router } = require('express');
const { resolve } = require('path');
const { graphqlExpress } = require('apollo-server-express');
const { printSchema } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const GraphQLContext = require('./Context');

const typeDefs = importSchema(resolve(__dirname, 'schemas', 'index.graphql'));
const resolvers = require('./resolvers');
const schema = makeExecutableSchema({ typeDefs, resolvers });

const route = Router();
route
    .get('/schema', (req, res) => {
        res.type('text/plain').send(printSchema(schema));
    })
    .use(
        graphqlExpress((req) => ({
            schema,
            context: new GraphQLContext(req),
            debug: process.env.NODE_ENV === 'development',
        }))
    );

module.exports = route;
