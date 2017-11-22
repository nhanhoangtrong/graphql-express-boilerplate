import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';

export default new GraphQLObjectType({
    name: 'User',
    description: 'Contain user information.',
    interfaces: [nodeInterface],
    fields: {
        id: globalIdField(),
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
        },
        createdAt: {
            type: GraphQLString,
            resolve(user) {
                return user.createdAt.toString();
            }
        },
        updatedAt: {
            type: GraphQLString,
            resolve(user) {
                return user.updatedAt.toString();
            }
        },
    },
});
