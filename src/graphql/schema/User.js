import UserType from './UserType';
import {
    fromGlobalId,
    connectionDefinitions,
    forwardConnectionArgs,
    cursorToOffset,
    connectionFromArraySlice,
    mutationWithClientMutationId,
} from 'graphql-relay';
import {
    GraphQLInt,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
} from 'graphql';
import validator from 'validator';
import {
    User
} from '../../auth/models';

export const me = {
    type: UserType,
    description: 'Get your own information.',
    resolve(root, args, {
        user,
        loadUserById
    }) {
        return loadUserById.load(user._id.toString());
    },
};

const {
    connectionType
} = connectionDefinitions({
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

        const [data, totalCount] = await Promise.all([
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

export const editUser = mutationWithClientMutationId({
    name: 'EditUser',
    inputFields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
    },
    outputFields: {
        user: {
            type: UserType,
        },
    },
    async mutateAndGetPayload(input, context) {
        const { firstName, lastName } = input;
        if (!validator.isLength(firstName + '', {max: 100, min: 1}) && !validator.isLength(lastName + '', {max: 100, min:1})) {
            throw new Error('First name or last name must be provided.');
        }

        const { id, type } = fromGlobalId(input.id);

        if (type !== 'User') {
            throw new Error('The User ID is invalid.');
        }

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        }).exec();
        if (!user) {
            throw new Error(`Couldn't find user with id: "${id}".`);
        }

        return context.loadUserById.load(id).then(x => ({user: x}));
    },
});
