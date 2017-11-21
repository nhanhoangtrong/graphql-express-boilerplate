import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { node, nodes } from './Node';
import { me, users } from './User';

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            node,
            nodes,
            me,
            users,
        },
    })
});
