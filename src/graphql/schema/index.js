import { me, users, editUser } from './User';
import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import { node, nodes } from './Node';

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            me,
            node,
            nodes,
            users,
        },
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: {
            editUser,
        },
    })
});
