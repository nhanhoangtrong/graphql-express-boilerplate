const { Router } = require('express');
const { graphqlExpress } = require('apollo-server-express');
const { printSchema } = require('graphql');
const schema = require('./schema');
const GraphQLContext = require('./Context');

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
