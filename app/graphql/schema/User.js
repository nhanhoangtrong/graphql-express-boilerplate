const UserType = require('./UserType');
const knex = require('../../../db/knex');
const { GraphQLNonNull, GraphQLInt } = require('graphql');
const {
    connectionDefinitions,
    forwardConnectionArgs,
    connectionFromArraySlice,
    cursorToOffset,
} = require('graphql-relay');

exports.me = {
    type: UserType,
    description: 'Get your own profile if you have logged in.',
    resolve(root, args, { user, loadUserById }) {
        return loadUserById.load(user.id);
    },
};

const { connectionType: UserConnection } = connectionDefinitions({
    name: 'User',
    nodeType: UserType,
    connectionFields: {
        totalCount: {
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
});

exports.users = {
    type: UserConnection,
    description: 'Fetch users object using Connection.',
    args: forwardConnectionArgs,
    async resolve(root, args) {
        const limit = typeof args.first === 'undefined' ? '10' : args.first;
        const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

        const [data, totalCount] = await Promise.all([
            knex
                .table('users')
                .orderBy('created_at', 'desc')
                .limit(limit)
                .offset(offset),
            knex
                .table('users')
                .count()
                .then((x) => x[0].count),
        ]);

        return {
            ...connectionFromArraySlice(data, args, {
                sliceStart: offset,
                arrayLength: totalCount,
            }),
            totalCount,
        };
    },
};
