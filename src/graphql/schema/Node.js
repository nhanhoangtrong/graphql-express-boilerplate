import { nodeDefinitions, fromGlobalId } from 'graphql-relay';
import { assignTypeFn, getGraphQLType } from '../utils';
import UserType from './UserType';

export const { nodeInterface, nodeField: node, nodesField: nodes } = nodeDefinitions((globalId, context) => {
    const { id, type } = fromGlobalId(globalId);

    switch (type) {
        case 'User':
            return context.loadUserById.load(id).then(assignTypeFn('User'));
        default:
            return null;
    }
}, (obj) => {
    // Resolve object
    switch (getGraphQLType(obj)) {
        case 'User':
            return UserType;
        default:
            return null;
    }
});
