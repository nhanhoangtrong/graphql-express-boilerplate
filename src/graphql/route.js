import { Router } from 'express';
import { graphqlExpress } from 'apollo-server-express';
import { printSchema } from 'graphql';
import { schema, rootResolver } from './schema';
import GraphQLContext from './Context';

const route = Router();

route.get('/schema', (req, res) => {
    res.type('text/plain').send(printSchema(schema));
}).use(graphqlExpress(req => ({
    schema,
    rootValue: rootResolver,
    context: new GraphQLContext(req),
    debug: process.env.NODE_ENV === 'development',
})));

export default route;
