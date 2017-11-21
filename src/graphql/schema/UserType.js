import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { nodeInterface } from './Node';

const UserType = new GraphQLObjectType({
    name: 'User',
    interfaces: [nodeInterface],
    description: 'User for authentication.',
    fields: {
        id: globalIdField(),
        firstName: {
            type: GraphQLString,
            resolve(user) {
                return user.first_name;
            },
        },
        lastName: {
            type: GraphQLString,
            resolve(user) {
                return user.last_name;
            },
        },
        email: {
            type: GraphQLString,
        },
    },
});

export default UserType;
