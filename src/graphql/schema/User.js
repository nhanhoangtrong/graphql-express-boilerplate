import UserType from './UserType';
import { connectionDefinitions, forwardConnectionArgs, cursorToOffset, connectionFromArraySlice } from 'graphql-relay';
import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { User } from '../../auth/models';

export const me = {
    type: UserType,
    description: 'Get your own information.',
    resolve(root, args, { user, loadUserById }) {
        return loadUserById.load(user._id.toString());
    },
};

const { connectionType } = connectionDefinitions({
    name: 'User',
    nodeType: UserType,
    connectionFields: {
        totalCount: {
            type: new GraphQLNonNull(GraphQLInt),
        },
    },
});

export const users = {
    type: connectionType,
    description: 'Get all users.',
    args: forwardConnectionArgs,
    async resolve(root, args) {
        const limit = parseInt(args.first, 10) || 10;
        const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

        const [data, totalCount ] = await Promise.all([
            User.find({}).sort('-createdAt').skip(offset).limit(limit).exec(),
            User.find({}).count().exec(),
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
